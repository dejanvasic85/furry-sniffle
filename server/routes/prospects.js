const express = require('express');
const router = express.Router();

const { db } = require('../db');
const logger = require('../logger');

router.post('/', (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'Missing body' });
    return;
  }

  const prospect = req.body;
  logger.info(`Saving prospect ${prospect}`);
  res.status(201).json(prospect);
});

module.exports = router;