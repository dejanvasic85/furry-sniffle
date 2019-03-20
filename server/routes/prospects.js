const express = require('express');
const router = express.Router();

const { Prospect, Client, Agent } = require('../db');
const { jwtAuth, agentAuth, withAsync } = require('../middleware');
const emailer = require('../emails');
const logger = require('../logger');

const PROSPECT_STATE = Object.freeze({
  NEW: 'New'
});

router.post('/', withAsync(async (req, res) => {
  if (!req.body) {
    res.json({ error: 'Missing body' }).status(400);
    return;
  }

  const newProspect = req.body;
  newProspect.status = 'New'; // dv: todo - move to constants

  const agent = await Agent.findOne({ where: { id: newProspect.agentId } });
  const client = await Client.findOne({ where: { id: newProspect.clientId } });
  const prospect = await Prospect.create(newProspect);
  // Should we even await this?
  await emailer.sendNewProspectEmail(newProspect, client, agent);
  res.status(201).json({ prospect });
}));

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