const { Agent } = require('../../db');
const logger = require('../../logger');

const updateAgent = async (req, res) => {
  const userAuthId = req.user.sub;
  logger.info(`Agent ${userAuthId} attempting to update details`);
  const { firstName, lastName, phone, businessName, abn } = req.body;
  const [recordsAffected, result] = await Agent.update(
    { firstName, lastName, phone, businessName, abn },
    { where: { userAuthId }, returning: true });

  res.status(200).json(result);
};

module.exports = updateAgent;