const express = require('express');
const router = express.Router();
const { db, Agent } = require('../db');
const Sequelize = require('sequelize');

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
  console.log(`agents/update/${ req.params.id }`);
  const { firstName } = req.body;

  Agent.update({ firstName: firstName }, {
    where: {
      id: req.params.id
    },
    returning: true
  }).spread((recordsAffected, result) => {
    if (recordsAffected === 0) {
      res.status(400).json({ error: 'Update failed' });
    }
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;