const express = require('express');
const router = express.Router();

const { Prospect, Client, Agent } = require('../db');
const emailer = require('../emails');
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
      res.json({ error: 'Client Not Found' }).status(404);
    } else {
      Agent.findOne({
        where: { id: agentId }
      }).then(agent => {
        if (!agent) {
          res.json({ error: 'Agent Not Found' }).status(404);
        } else {
          // dv: Todo - record event for client referral opening this invite
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