const express = require('express');
const router = express.Router();

const { Client, Email } = require('../db');
const emails = require('../emails');
const logger = require('../logger');
const { getClientReferralUrl } = require('../services/clientService');

router.get('/', (req, res) => {
  const agentId = req.agent.id;
  logger.info(`Fetch client by agentId: ${agentId}`);
  Client.findAll({
    where: {
      agentId: agentId,
      isActive: true
    }
  }).then(results => {
    res.json(results);
  });
});

router.get('/:id', async (req, res) => {
  const agentId = req.agent.id;
  const id = req.params.id;

  logger.info(`Fetch by client id ${id}, agentId: ${agentId}`);
  const client = await Client.findOne({ where: { id, agentId } });
  if (!client) {
    res.json({ error: 'unknown client id' }).status(404);
    return;
  }

  const sentEmails = await Email.findAll({ where: { clientId: id } });

  const response = {
    ...client.dataValues,
    referralUrl: getClientReferralUrl(client.agentId, client.referralCode),
    emails: sentEmails
  };

  res.json(response);
});

router.post('/:id/sendEmail', async (req, res) => {
  const agentId = req.agent.id;
  const id = req.params.id;

  logger.info(`Send email to client: ${id}, agentId: ${agentId}`);
  const client = await Client.findOne({ where: { id, agentId } });
  if (!client) {
    res.json({ error: 'unknown client id' }).status(404);
    return;
  }

  await emails.send(req.agent, client);
  const sentEmails = await Email.findAll({ where: { clientId: id } });
  res.json(sentEmails);
});

router.put('/:id', (req, res) => {
  if (!req.body) {
    res.json({ error: 'missing body' }).status(400);
    return;
  }

  const id = req.params.id;
  const { firstName, lastName, phone, email } = req.body;

  logger.info(`Updating client ${id}`);

  Client.update(
    { firstName, lastName, phone, email },
    {
      where: { id },
      returning: true
    }
  ).spread((recordsAffected, result) => {
    if (recordsAffected === 0) {
      res.json({ error: `Update failed. ${id} may not be found` }).status(400);
    } else {
      res.json(result).status(204);
    }
  });
});

router.post('/', (req, res) => {
  if (!req.body) {
    res.json({ error: 'missing client details in request body' }.status(400));
    return;
  }

  const agentId = req.agent.id;
  let createClientRequest = Object.assign({}, req.body, {
    agentId,
    isActive: true
  });

  const referralEmailPrefix = createClientRequest.email.substring(
    0,
    createClientRequest.email.indexOf('@')
  );
  const randomNumber = Math.floor(Math.random() * Math.floor(999));
  const referralCode = `${referralEmailPrefix}-${randomNumber}`;
  createClientRequest.referralCode = referralCode;

  Client.findOrCreate({
    where: {
      email: createClientRequest.email,
      isActive: true,
      agentId: createClientRequest.agentId
    },
    defaults: createClientRequest
  })
    .spread((client, created) => {
      logger.info(`Client saved ${created}`);
      if (created === true) {
        if (createClientRequest.sendEmail === true) {
          logger.info(`Sending email to ${client.email}`);
          emails.send(req.agent, client).then(() => {
            res.json(client).status(201);
          });
        } else {
          res.json({ client }).status(201);
        }
      } else {
        res
          .json({
            error: `Unable to save client. Email ${
              createClientRequest.email
            } may already exist`
          })
          .status(400);
      }
    })
    .catch(err => {
      res.json(err).status(500);
    });
});

module.exports = router;
