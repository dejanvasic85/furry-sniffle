const express = require('express');
const router = express.Router();

const { db, Prospect } = require('../db');
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

module.exports = router;