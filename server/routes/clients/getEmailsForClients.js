const { Client, db } = require('../../db');
const logger = require('../../logger');

module.exports = async (req, res) => {
  const agentId = req.agent.id;
  logger.info(`Fetch email list for agentId: ${agentId}. Client ids ${JSON.stringify(req.query)}`);
  
  const [results] = await db.query(`
    select email
    from "Clients" 
    where "agentId" = ${agentId}
    and "id" in (${req.query.ids})
  `);

  res.json({ emails: results.map(c => c.email) });
};