const express = require('express');
const router = express.Router();

const { Client, Email, Gift, Prospect } = require('../db');
const { withAsync } = require('../middleware');
const { getClientReferralUrl } = require('../services/clientService');

const emails = require('../emails');
const logger = require('../logger');

router.get('/', withAsync(require('./clients/getClientsForAgent')));
router.get('/:id', withAsync(require('./clients/getClient')));

router.post(
  '/:id/sendEmail',
  withAsync(async (req, res) => {
    const agentId = req.agent.id;
    const id = req.params.id;

    logger.info(`Send email to client: ${id}, agentId: ${agentId}`);
    const client = await Client.findOne({ where: { id, agentId } });
    if (!client) {
      res.status(404).json({ error: 'unknown client id' });
      return;
    }

    const sentEmail = await emails.sendNewClientEmail(req.agent, client);
    res.json(sentEmail);
  })
);

router.post('/:id/gift', withAsync(require('./clients/gift')));

router.put(
  '/:id',
  withAsync(async (req, res) => {
    if (!req.body) {
      res.status(400).json({ error: 'missing body' });
      return;
    }

    const id = req.params.id;
    const { firstName, lastName, phone, email } = req.body;

    logger.info(`Updating client ${id}`);

    const updateResult = await Client.update(
      { firstName, lastName, phone, email },
      {
        where: { id },
        returning: true
      }
    );

    const recordsUpdated = 1;
    updateResult[0] === recordsUpdated
      ? res.status(200).json({ recordsUpdated })
      : res.status(400).json({ error: 'Unable to update the client' });
  })
);

router.post('/', withAsync(require('./clients/createClient')));

module.exports = router;
