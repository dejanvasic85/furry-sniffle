const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const { db, Agent } = require('../db');
const agentAuth = require('../security/agentAuth');

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

router.put('/:id', agentAuth, (req, res) => {
  const agentId = parseInt(req.params.id);
  console.log(`Agent ${ req.agentId } attempting to update agent ${ agentId }`);

  if (req.agentId !== agentId) {
    res.status(401).json({
      error: 'Not authorized'
    });
    return;
  }

  console.log(`agents/update/${ req.params.id }`);
  const { firstName, lastName, phone, businessName, abn } = req.body;

  Agent.update({
    firstName,
    lastName,
    phone,
    businessName,
    abn
  }, {
      where: {
        id: agentId
      },
      returning: true
    }).spread((recordsAffected, result) => {
      if (recordsAffected === 0) {
        res.status(400).json({ error: `Update failed. Agent ${agentId} may not be found` });
      } else {
        res.status(200).json(result);
      }
    }).catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;