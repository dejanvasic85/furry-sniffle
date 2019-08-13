const { Agent } = require('../../db');
const logger = require('../../logger');
const { getUserInfo } = require('./auth0client');

const login = async (req, res) => {
  logger.info(`Login. Token verified. Checking agent in database`);
  const userAuthId = req.user.sub;
  const agent = await Agent.findOne({ where: { userAuthId } });
  if (agent) {
    logger.info(`Agent found ${userAuthId}`);
    res.json(agent);
    return;
  }

  const accessToken = req.get('Authorization');
  const authResponse = await getUserInfo(accessToken);
  const newAgent = {
    userAuthId: userAuthId,
    email: authResponse.email
  };

  const [createdAgent] = await Agent.findOrCreate({
    where: { email: newAgent.email },
    defaults: newAgent
  });
  logger.info(`Agent created successfully ${newAgent.email} ${newAgent.newAgent}`);
  res.status(201).json(createdAgent);
};

module.exports = login;