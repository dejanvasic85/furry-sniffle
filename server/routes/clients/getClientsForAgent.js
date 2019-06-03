const { Client } = require('../../db');
const logger = require('../../logger');

module.exports = async (req, res) => {
  const agentId = req.agent.id;
  logger.info(`Fetch client by agentId: ${agentId}`);
  const clients = await Client.findAll({
    where: {
      agentId,
      isActive: true
    }
  });

  res.json(clients);
};