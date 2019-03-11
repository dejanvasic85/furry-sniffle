const express = require('express');
const router = express.Router();
const { db, Client, Agent } = require('../db');
const Sequelize = require('sequelize');
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
  let newClient = Object.assign({}, req.body, {
    agentId,
    isActive: true
  });

  const referralEmailPrefix = newClient.email.substring(0, newClient.email.indexOf('@'));
  const randomNumber = Math.floor(Math.random() * Math.floor(999));
  const referralCode = `${referralEmailPrefix}-${randomNumber}`;
  newClient.referralCode = referralCode;
  

  Client.findOrCreate({
    where: {
      email: newClient.email,
      isActive: true,
      agentId: newClient.agentId
    },
    defaults: newClient
  }).spread((client, created) => {
    if (created === true) {
      emails.newClient(req.agent, client).then(() => {
        res.status(201).json(client);
      }).catch(error => {
        throw new Error(error);
      });
      
    } else {
      res.status(400).json({ error: `Unable to save client. Email ${ newClient.email } may already exist` });
    }
  }).catch(err => {
    res.status(500).json(err)
  });

});

module.exports = router;