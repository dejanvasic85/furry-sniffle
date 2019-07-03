const uuidv4 = require('uuid/v4');

const { Account, Client, Gift } = require('../../db');
const { debit } = require('../../services/accountService');
const { generateGiftLink } = require('../../services/giftpayClient');
const { encrypt } = require('../../services/security');
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
    // am: just insurance. will make it conmfigurable per Agent later
    maxValue = 100;
  }

  if (!giftValue || !Number.isInteger(giftValue) || giftValue > maxValue) {
    logger.error(
      `Invalid gift value. agentId: ${agentId}, value:${giftValue}, maxValue:${maxValue}`
    );

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
    `Link generated clientRef: ${generatedGift.clientRef}, value:${giftValue}, message:${message}, url: ${generateGiftLink.giftUrl}`
  );

  // URL is not stored in DB yet (sensitive information)
  const giftValueInCents = giftValue * AUD_BASE_VALUE;
  const emailId = uuidv4().toString();
  const secureGiftUrl = encrypt(generateGiftLink.giftUrl);

  await Gift.create({
    id: generatedGift.clientRef,
    agentId,
    clientId: id,
    message,
    amountToDeduct: giftValueInCents,
    from: from,
    value: giftValueInCents,
    giftpayId: generatedGift.giftId,
    giftpayStatus: generatedGift.status,
    emailId,
    secureGiftUrl
  });

  await debit({ accountId, amount: giftValueInCents, description: 'Gift' });

  logger.info(
    `Gift persisted: ${generatedGift.clientRef}, value:${giftValue}, message:${message}.`
  );

  await emails.sendNewGiftEmail(req.agent, client, message, giftValue, generatedGift.giftUrl, emailId);
  logger.info(`Gift emailed: ${generatedGift.clientRef}, value:${giftValue}, message:${message}`);

  res.json({
    id: generatedGift.giftUrl
  });
};
