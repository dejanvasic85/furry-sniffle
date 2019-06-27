const logger = require('../../logger');
const { db } = require('../../db');
const { sendWelcomeEmailToClients } = require('../../emails');

module.exports = async (req, res) => {
  const agent = req.agent;
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    res.status(400).json({ error: 'ids for clients is required in the body of the request' });
    return;
  }

  const idList = ids.join(',');

  const [results] = await db.query(`
    select "firstName", "email", "referralCode"
    from "Clients" 
    where "agentId" = ${agent.id}
    and "id" in (${idList})
  `);

  const clients = [{
    firstName: 'dejan',
    email: 'dejanvasic24@gmail.com',
    referralCode: '123'
  }, {
    firstName: 'bobby',
    email: 'dejanvasic@outlook.com',
    referralCode: '456'
  }];

  await sendWelcomeEmailToClients(agent, clients);

  res.json(true);
};

