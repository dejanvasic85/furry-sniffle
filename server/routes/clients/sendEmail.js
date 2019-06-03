const logger = require('../../logger');
const { Client } = require('../../db');
const emails = require('../../emails');

module.exports = async (req, res) => {
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
};
