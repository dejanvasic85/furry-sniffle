const express = require('express');
const router = express.Router();

const { db, Client } = require('../db');
const logger = require('../logger');

router.get('/validate/:agentId/code/:referralCode', (req, res) => {
  const agentId = req.params.agentId;
  const referralCode = req.params.referralCode;
  logger.info(`validating agent ${agentId} and client referral Code: ${referralCode}`);

  Client.findOne({
    where: { referralCode, agentId, isActive: true }
  }).then(client => {
    if (!client) {
      res.status(404).json({ error: 'Not Found' });
    } else {
      res.json({ status: 'ok' });
    }
  });
});

module.exports = router;