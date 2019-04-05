const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const { Agent } = require('../db');
const logger = require('../logger');
const agentAuth = require('../middleware/agentAuth');
const jwtAuth = require('../middleware/jwtAuth');
const { getUserInfo } = require('../services/auth0client');

router.get('/', jwtAuth, (req, res) => {
  const userAuthId = req.user.sub; // user is the subject of the token
  logger.info(`getAgent sub: ${userAuthId}`)
  return Agent.findOne({ where : { userAuthId } })
    .then(agent => {
      res.json(agent);
    });
});

router.post('/', jwtAuth, (req, res) => {
  const userAuthId = req.user.sub;
  const accessToken = req.get('Authorization');

  getUserInfo(accessToken).then(authResponse => {
    
    const newAgent = {
      userAuthId: userAuthId,
      email: authResponse.email
    };

    Agent.findOrCreate({
      where: { email: newAgent.email },
      defaults: newAgent
    }).spread((agent, created) => {
      if (!created) {
        res.status(400).json({ error: 'Agent with email already registered' });
        return;
      }
      res.status(201).json(agent);
      return;
    }).catch(err => {
      res.status(500).json(err);
    });
  }).catch(err => {
    res.status(500).json({ error: err })
  });
});

router.put('/', jwtAuth, (req, res) => {
  const userAuthId = req.user.sub;
  logger.info(`Agent ${userAuthId} attempting to update details`);
  const { firstName, lastName, phone, businessName, abn } = req.body;
  Agent.update({ firstName, lastName, phone, businessName, abn }, {
    where: { userAuthId }, returning: true
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