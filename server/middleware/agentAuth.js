const { Agent } = require('../db');
const logger = require('../logger');

module.exports = function (req, res, next) {
  const userAuthId = req.user.sub;
  Agent.findOne({
    where: {
      userAuthId
    }
  }).then(agent => {
    logger.info(`Found agent ${agent.id}`);
    req.agent = agent;
    next();
  }).error(() => {
    res.status(403).json({ error: 'Not Authorized' });
  });
}