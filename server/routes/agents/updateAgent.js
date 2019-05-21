const { Agent } = require('../../db');
const logger = require('../../logger');

const updateAgent = async (req, res) => {
  const userAuthId = req.user.sub;
  logger.info(`Agent ${userAuthId} attempting to update details`);
  const { firstName, lastName, phone, businessName, abn } = req.body;
  const [recordsAffected, result] = await Agent.update(
    { firstName, lastName, phone, businessName, abn },
    { where: { userAuthId }, returning: true });
    
  if (recordsAffected === 0) {
    res.status(400).json({ error: `Update failed. Agent may not be found` });
  } else {
    res.status(200).json(result);
  }
};

module.exports = updateAgent;