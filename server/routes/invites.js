const express = require('express');
const router = express.Router();

const { db, Client, Agent } = require('../db');
const logger = require('../logger');

router.get('/validate/:agentId/code/:referralCode', (req, res) => {
  const agentId = req.params.agentId;
  const referralCode = req.params.referralCode;
  logger.info(`validating agent ${agentId} and client referral Code: ${referralCode}`);

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
              clientName: client.firstName,
              agentName: agent.firstName
            }
          });
        }
      });
    }
  });
});

module.exports = router;