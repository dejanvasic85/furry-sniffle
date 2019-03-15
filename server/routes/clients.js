const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const { db, Client, Agent } = require('../db');
const emails = require('../emails');
const logger = require('../logger');

const Op = Sequelize.Op;

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

router.get('/:id', (req, res) => {
  const agentId = req.agent.id;
  const id = req.params.id;
  logger.info(`Fetch by client id ${id}, agentId: ${agentId}`);
  Client.findOne({ where: { id, agentId } }).then(client => {
    res.json(client);
  });
});

router.post('/', (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'missing client details in request body' });
    return;
  }

  const agentId = req.agent.id;
  let createClientRequest = Object.assign({}, req.body, {
    agentId,
    isActive: true
  });

  const referralEmailPrefix = createClientRequest.email.substring(0, createClientRequest.email.indexOf('@'));
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
  }).spread((client, created) => {
    logger.info(`Client saved ${created}`);
    if (created === true) {

      if (createClientRequest.sendEmail === true) {
        logger.info(`Sending email to ${client.email}`);
        emails.newClient(req.agent, client).then(() => {
          res.status(201).json(client);
        })
      } else {
        res.status(200).json({
          client
        });
      }

    } else {
      res.status(400).json({ error: `Unable to save client. Email ${createClientRequest.email} may already exist` });
    }
  }).catch(err => {
    res.status(500).json(err)
  });
});

module.exports = router;