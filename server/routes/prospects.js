const express = require('express');
const router = express.Router();

const { db, Prospect, Client, Agent } = require('../db');
const logger = require('../logger');

router.post('/', (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'Missing body' });
    return;
  }

  const prospect = req.body;
  prospect.status = 'New';

  Prospect.create(prospect).then(p => {
    res.status(201).json(p);
  }).catch(err => {
    res.status(500).json({ err });
  });
});

router.post('/invite', (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'Missing body' });
    return;
  }

  const { agentId, referralCode } = req.body;
  Client.findOne({
    where: { referralCode, agentId, isActive: true }
  }).then(client => {
    if (!client) {
      res.status(404).json({ error: 'Client Not Found' });
    } else {
      Agent.findOne({
        where: { id: agentId }
      }).then(agent => {
        if (!agent) {
          res.status(404).json({ error: 'Agent Not Found' });
        } else {
          res.json({
            invite: {
              clientId: client.id,
              clientName: client.firstName,
              agentId: agent.id,
              agentName: agent.firstName
            }
          });
        }
      });
    }
  });
  
});

module.exports = router;