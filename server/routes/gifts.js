const express = require('express');
const router = express.Router();

const { Gift } = require('../db');
const { withAsync } = require('../middleware');

const logger = require('../logger');

router.get(
  '/',
  withAsync(async (req, res) => {
    const agentId = req.agent.id;
    logger.info(`Fetch gifts by agentId: ${agentId}`);
    const gifts = await Gift.findAll({
      where: {
        agentId
      },
      order: [['createdAt', 'DESC']]
    });

    res.json(gifts);
  })
);

module.exports = router;
