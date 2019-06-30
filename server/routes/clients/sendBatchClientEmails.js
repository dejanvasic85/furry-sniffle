const uuidv4 = require('uuid/v4');
const logger = require('../../logger');
const { db, Email } = require('../../db');
const { sendWelcomeEmailToClients } = require('../../emails');

module.exports = async (req, res) => {
  const agent = req.agent;
  const { ids } = req.body;
  
  if (!ids || !Array.isArray(ids)) {
    res.status(400).json({ error: 'ids for clients is required in the body of the request' });
    return;
  }

  const idList = ids.join(',');

  const [clientsToBeEmailed] = await db.query(`
    select "id", "firstName", "email", "referralCode"
    from "Clients" 
    where "agentId" = ${agent.id}
    and "id" in (${idList})
  `);

  const clientsWithEmailId = clientsToBeEmailed.map(c => ({
    ...c, 
    emailId: uuidv4().toString()
  }));

  await sendWelcomeEmailToClients(agent, clientsWithEmailId);

  await Promise.all(clientsWithEmailId.map(({ emailId, id }) => {
    // save the email record
    return Email.create({
      id: emailId,
      clientId: id,
      agentId: agent.id
    });
  }));

  res.json(true);
};

