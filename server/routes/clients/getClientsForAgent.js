const { Client, db } = require('../../db');
const logger = require('../../logger');

module.exports = async (req, res) => {
  const agentId = req.agent.id;
  logger.info(`Fetch clients by agentId: ${agentId}`);
  const clients = await Client.findAll({
    where: {
      agentId,
      isActive: true
    }
  });

  const [[results]] = await db.query(`
    select count(id) 
    from "Clients" 
    where id not in (select "clientId" from "Emails")
  `);

  res.json({ clients, clientsWithoutEmails: Number(results.count) });
};