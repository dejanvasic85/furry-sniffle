const { Account, Client, Gift } = require('../../db');
const { debit } = require('../../services/accountService');
const { generateGiftLink } = require('../../services/giftpayClient');
const logger = require('../../logger');
const emails = require('../../emails');
const { PAYMENT_METHOD } = require('../../constants');

const AUD_BASE_VALUE = 100;

module.exports = async (req, res) => {
  const { id: agentId, accountId } = req.agent;
  const id = req.params.id;
  const { giftValue, message, from } = req.body;

  if (!accountId) {
    res
      .status(400)
      .json({ error: `Agent ${agentId} needs to deposit some money first. No account found.` });
    return;
  }

  const client = await Client.findOne({ where: { id, agentId } });
  if (!client) {
    res.status(404).json({ error: 'unknown client id' });
    return;
  }

  const account = await Account.findOne({ where: { id: accountId } });

  logger.info(
    `Account Balance : ${account.availableFunds}. Gift Value ${giftValue}. ${JSON.stringify(
      account
    )}`
  );

  let maxValue = account.availableFunds / AUD_BASE_VALUE;
  if (maxValue > 100) {
    // dv: Maximum allowed to gift is 100?? Alex?
    maxValue = 100;
  }

  if (!giftValue || !Number.isInteger(giftValue) || giftValue > maxValue) {
    res
      .status(404)
      .json({ error: `gift value is invalid ${giftValue}. Check the amount or account balance.` });
    return;
  }

  logger.info(
    `Sending gift to client: ${id}, agentId: ${agentId}, value:${giftValue}, message:${message}`
  );

  // generate Gift URL
  const generatedGift = await generateGiftLink(from, client.email, giftValue, message);

  logger.info(
    `Link generated clientRef: ${generatedGift.clientRef}, value:${giftValue}, message:${message}`
  );

  // URL is not stored in DB yet (sensitive information)
  const createGiftCommand = {
    id: generatedGift.clientRef,
    agentId,
    clientId: id,
    message,
    giftValue,
    from: from,
    value: giftValue,
    giftpayId: generatedGift.giftId,
    giftpayStatus: generatedGift.status
  };

  await Gift.create(createGiftCommand);

  const amountToDeduct = giftValue * AUD_BASE_VALUE;
  await debit({ accountId, amount: amountToDeduct, description: 'Gift' });

  logger.info(
    `Gift persisted: ${generatedGift.clientRef}, value:${giftValue}, message:${message}.`
  );

  await emails.sendNewGiftEmail(req.agent, client, message, giftValue, generatedGift.giftUrl);
  logger.info(`Gift emailed: ${generatedGift.clientRef}, value:${giftValue}, message:${message}`);

  res.json({
    id: generatedGift.giftUrl
  });
};
