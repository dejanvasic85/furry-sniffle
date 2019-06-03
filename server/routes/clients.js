const express = require('express');
const router = express.Router();

const { Account, Client, Email, Gift, Prospect } = require('../db');
const { withAsync } = require('../middleware');
const { getClientReferralUrl, generateReferralCode } = require('../services/clientService');

const { generateGiftLink } = require('../services/giftpayClient');

const emails = require('../emails');
const logger = require('../logger');

router.get(
  '/',
  withAsync(async (req, res) => {
    const agentId = req.agent.id;
    logger.info(`Fetch client by agentId: ${agentId}`);
    const clients = await Client.findAll({
      where: {
        agentId,
        isActive: true
      }
    });

    res.json(clients);
  })
);

router.get(
  '/:id',
  withAsync(async (req, res) => {
    const agentId = req.agent.id;
    const id = req.params.id;

    logger.info(`Fetch by client id ${id}, agentId: ${agentId}`);
    const client = await Client.findOne({ where: { id, agentId } });
    if (!client) {
      res.status(404).json({ error: 'unknown client id' });
      return;
    }

    const sentEmails = await Email.findAll({
      where: { clientId: id },
      order: [['createdAt', 'DESC']]
    });

    const sentGifts = await Gift.findAll({
      where: { clientId: id },
      order: [['createdAt', 'DESC']]
    });

    const prospects = await Prospect.findAll({
      where: { clientId: id, agentId: agentId },
      include: [
        {
          model: Client,
          required: true
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const response = {
      ...client.dataValues,
      referralUrl: getClientReferralUrl(client.referralCode),
      emails: sentEmails,
      gifts: sentGifts,
      prospects: prospects
    };

    res.json(response);
  })
);

router.post(
  '/:id/sendEmail',
  withAsync(async (req, res) => {
    const agentId = req.agent.id;
    const id = req.params.id;

    logger.info(`Send email to client: ${id}, agentId: ${agentId}`);
    const client = await Client.findOne({ where: { id, agentId } });
    if (!client) {
      res.status(404).json({ error: 'unknown client id' });
      return;
    }

    const sentEmail = await emails.sendNewClientEmail(req.agent, client);
    res.json(sentEmail);
  })
);

router.post(
  '/:id/gift',
  withAsync(async (req, res) => {
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

    const account = Account.findOne({ where: { id: accountId } });
  
    let maxValue = account.availableFunds / 100;
    if (maxValue > 100) {
      // dv: Maximum allowed to gift is 100?? Alex?
      maxValue = 100;
    }

    if (!giftValue || !Number.isInteger(giftValue) || giftValue > maxValue) {
      res.status(404).json({ error: `gift value is invalid ${giftValue}` });
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

    logger.info(
      `Gift persisted: ${generatedGift.clientRef}, value:${giftValue}, message:${message}`
    );

    await emails.sendNewGiftEmail(req.agent, client, message, giftValue, generatedGift.giftUrl);

    logger.info(`Gift emailed: ${generatedGift.clientRef}, value:${giftValue}, message:${message}`);

    res.json({
      id: generatedGift.giftUrl
    });
  })
);

router.put(
  '/:id',
  withAsync(async (req, res) => {
    if (!req.body) {
      res.status(400).json({ error: 'missing body' });
      return;
    }

    const id = req.params.id;
    const { firstName, lastName, phone, email } = req.body;

    logger.info(`Updating client ${id}`);

    const updateResult = await Client.update(
      { firstName, lastName, phone, email },
      {
        where: { id },
        returning: true
      }
    );

    const recordsUpdated = 1;
    updateResult[0] === recordsUpdated
      ? res.status(200).json({ recordsUpdated })
      : res.status(400).json({ error: 'Unable to update the client' });
  })
);

router.post(
  '/',
  withAsync(async (req, res) => {
    if (!req.body) {
      res.status(400).json({ error: 'missing client details in request body' });
      return;
    }

    const agentId = req.agent.id;
    const details = req.body;

    const existingClient = await Client.findOne({
      where: {
        agentId: agentId,
        email: details.email
      }
    });

    if (existingClient) {
      console.log('Unable to create client as it already exists.', details.email);
      res.status(400).json({
        error: `Client with email ${details.email} already exists`
      });
      return;
    }

    const createClientRequest = Object.assign({}, details, {
      agentId,
      isActive: true,
      referralCode: 'temp'
    });

    const createResult = await Client.create(createClientRequest);

    const createdClient = createResult.dataValues;
    const referalCode = generateReferralCode(createdClient);

    // Now that we have an id, we can create a new client with referral code
    await Client.update({ referralCode: referalCode }, { where: { id: createdClient.id } });

    createdClient.referralCode = referalCode;

    if (createClientRequest.sendEmail === true) {
      logger.info(`Sending email to ${createdClient.email}`);
      await emails.sendNewClientEmail(req.agent, createdClient);
    }

    res.status(201).json({ createdClient });
  })
);

module.exports = router;
