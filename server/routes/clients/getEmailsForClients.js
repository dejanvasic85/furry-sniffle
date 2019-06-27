const { db } = require('../../db');
const logger = require('../../logger');

module.exports = async (req, res) => {
  const agentId = req.agent.id;
  const ids = req.query.ids;
  if (!ids) {
    res.status(400).json({ error: 'ids is required' });
    return;
  }

  logger.info(`Fetch email list for agentId: ${agentId}. Client ids ${JSON.stringify(ids)}`);

  if (ids !== 'unnotified') {
    const [results] = await db.query(`
      select "id", "firstName", "lastName", "email"
      from "Clients" 
      where "agentId" = ${agentId}
      and "id" in (${ids})
    `);
    res.json({ clients: results });
  } else {
    const [results] = await db.query(`
      select "id", "firstName", "lastName", "email"
      from "Clients" 
      where id not in (select "clientId" from "Emails")
      and "agentId" = ${agentId}
    `);
    res.json({ clients: results });
  }
};