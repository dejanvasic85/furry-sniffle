const express = require('express');
const { stripeConfig } = require('../../config');
const stripe = require("stripe")(stripeConfig.secret);
const router = express.Router();

const { Agent } = require('../../db');
const logger = require('../../logger');
const { getUserInfo } = require('../../services/auth0client');
const { agentAuth, jwtAuth, withAsync } = require('../../middleware');

const deposit = require('./deposit');

router.get('/', jwtAuth, agentAuth, withAsync(async (req, res) => {
  const agent = await Agent.findOne({
    where: { userAuthId: req.user.sub }
  });

  res.json(agent);
}));

router.post('/login', jwtAuth, withAsync(async (req, res) => {
  logger.info(`Login. Token verified. Checking agent in database`);
  const userAuthId = req.user.sub;
  const agent = await Agent.findOne({ where: { userAuthId } });
  if (agent) {
    logger.info('Agent found');
    res.json(agent);
    return;
  }

  const accessToken = req.get('Authorization');
  const authResponse = await getUserInfo(accessToken);
  const newAgent = {
    userAuthId: userAuthId,
    email: authResponse.email
  };

  const [createdAgent] = await Agent.findOrCreate({
    where: { email: newAgent.email },
    defaults: newAgent
  });
  logger.info('Agent created successfully');
  res.status(201).json(createdAgent);
}));

router.put('/', jwtAuth, withAsync(async (req, res) => {
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
}));

router.post('/deposit', jwtAuth, agentAuth, withAsync(deposit));

module.exports = router;