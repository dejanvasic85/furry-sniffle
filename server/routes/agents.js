const express = require('express');
const router = express.Router();
const { db, Agent } = require('../db');
const Sequelize = require('sequelize');

router.post('/', (req, res) => {
  if (!req.body) {
    res.status(401).json({ message: 'missing client details in request bodyu' });
    return;
  }

  const newAgent = Object.assign({}, req.body, { agentId: req.agentId });
  Agent.findOrCreate({
    where: {
      email: newAgent.email
    },
    defaults: newAgent
  }).spread((agent, created) => {
    if (!created) {
      res.status(400).json({ error: 'Agent with email already registered' });
    }
    res.status(201).json(agent);
  }).catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;