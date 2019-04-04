const express = require('express');
const router = express.Router();

const { Client, Email } = require('../db');
const { withAsync } = require('../middleware');
const { getClientReferralUrl, generateReferralCode } = require('../services/clientService');
const emails = require('../emails');
const logger = require('../logger');

router.get('/', withAsync(async (req, res) => {
  const agentId = req.agent.id;
  logger.info(`Fetch client by agentId: ${agentId}`);
  const clients = await Client.findAll({
    where: {
      agentId,
      isActive: true
    }
  });

  res.json(clients);
}));

router.get('/:id', withAsync(async (req, res) => {
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

  const response = {
    ...client.dataValues,
    referralUrl: getClientReferralUrl(client.agentId, client.referralCode),
    emails: sentEmails
  };

  res.json(response);
}));

router.post('/:id/sendEmail', withAsync(async (req, res) => {
  const agentId = req.agent.id;
  const id = req.params.id;

  logger.info(`Send email to client: ${id}, agentId: ${agentId}`);
  const client = await Client.findOne({ where: { id, agentId } });
  if (!client) {
    res.status(404).json({ error: 'unknown client id' });
    return;
  }

  await emails.sendNewClientEmail(req.agent, client);
  const sentEmails = await Email.findAll({ where: { clientId: id } });
  res.json(sentEmails);
}));

router.put('/:id', withAsync(async (req, res) => {
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

}));

router.post('/', withAsync(async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'missing client details in request body' });
    return;
  }

  const agentId = req.agent.id;
  const createClientRequest = Object.assign({}, req.body, {
    agentId,
    isActive: true,
    referralCode: 'temp'
  });

  const createResult = await Client.findOrCreate({
    where: {
      email: createClientRequest.email,
      isActive: true,
      agentId
    },
    defaults: createClientRequest
  });

  const created = createResult[1];
  if (!created) {
    res.status(400).json({ error: `Client with email ${createClientRequest.email} already exists` });
    return;
  }

  const clientWithoutReferralCode = createResult[0].dataValues;

  // Now that we have an id, we can create a new client with referral code
  const client = generateReferralCode(clientWithoutReferralCode);
  await Client.update(
    { referralCode: clientWithoutReferralCode.referralCode },
    { where: { id: clientWithoutReferralCode.id } }
  );

  if (createClientRequest.sendNewClientEmail === true) {
    logger.info(`Sending email to ${client.email}`);
    await emails.sendNewClientEmail(req.agent, client);
  }

  res.status(201).json({ client });
}));

module.exports = router;
