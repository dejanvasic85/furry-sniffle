const express = require('express');
const router = express.Router();

const { Prospect, Client, Agent } = require('../db');
const { jwtAuth, agentAuth, withAsync } = require('../middleware');
const emailer = require('../emails');
const logger = require('../logger');

const PROSPECT_STATE = Object.freeze({
  NEW: 'New'
});

router.get(
  '/',
  jwtAuth,
  agentAuth,
  withAsync(async (req, res) => {
    const agentId = req.agent.id;
    logger.info(`Fetching all prospects for agentId ${agentId}`);
    const prospects = await Prospect.findAll({
      where: { agentId }
    });

    res.json(prospects);
  })
);

router.get(
  '/:id',
  jwtAuth,
  agentAuth,
  withAsync(async (req, res) => {
    const agentId = req.agent.id;
    const id = req.params.id;
    logger.info(`Fetching prospect id: ${id} for agentId: ${agentId}`);
    const prospect = await Prospect.findOne({
      where: { id, agentId }
    });
    if (!prospect) {
      res.status(404).json({ error: 'Not Found' });
      return;
    }

    res.json(prospect);
  })
);

router.put(
  '/:id',
  jwtAuth,
  agentAuth,
  withAsync(async (req, res) => {
    const agentId = req.agent.id;
    const id = req.params.id;
    const { status } = req.body;

    let prospect = await Prospect.findOne({
      where: { id, agentId }
    });

    if (!prospect) {
      res.status(404).json({ error: 'Not Found' });
      return;
    }

    prospect = await prospect.update({
      status
    });

    res.status(204).json(prospect);
  })
);

router.post(
  '/',
  withAsync(async (req, res) => {
    if (!req.body) {
      res.json({ error: 'Missing body' }).status(400);
      return;
    }

    const newProspect = req.body;
    newProspect.status = 'New'; // dv: todo - move to constants

    const agent = await Agent.findOne({ where: { id: newProspect.agentId } });
    const client = await Client.findOne({
      where: { id: newProspect.clientId }
    });
    const prospect = await Prospect.create(newProspect);
    // Should we even await this?
    await emailer.sendNewProspectEmail(newProspect, client, agent);
    res.status(201).json({ prospect });
  })
);

router.post(
  '/invite',
  withAsync(async (req, res) => {
    if (!req.body) {
      res.status(400).json({ error: 'Missing body' });
      return;
    }

    const { referralCode } = req.body;
    const client = await Client.findOne({
      where: { referralCode, isActive: true }
    });
    if (!client) {
      res.status(404).json({ error: 'Client not found' });
      return;
    }

    const agent = await Agent.findOne({
      where: { id: client.agentId }
    });

    if (!agent) {
      res.status(404).json({ error: 'Agent not found' });
      return;
    }

    res.json({
      invite: {
        clientId: client.id,
        clientName: client.firstName,
        agentId: agent.id,
        agentName: agent.firstName
      }
    });
  })
);

module.exports = router;
