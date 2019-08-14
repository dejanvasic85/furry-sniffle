const { Agent } = require('../db');
const logger = require('../logger');
const { isDevelopment } = require('../envConfig');

const withAsync = require('./withAsync');

const HEADERS = Object.freeze({
  AGENT_ID: 'AgentId'
});

module.exports = withAsync(async (req, res, next) => {
  if (isDevelopment && req.get(HEADERS.AGENT_ID)) {
    // dv: JWT auth can be skipped. Just using AgentId in the header
    const id = req.get(HEADERS.AGENT_ID);
    req.agent = await Agent.findOne({ where: { id } });
  } else {
    const userAuthId = req.user.sub;
    req.agent = await Agent.findOne({ where: { userAuthId } });
    if (!req.agent) {
      logger.warn(`agentAuth: Agent not found. Not authorized. userAuthId:${userAuthId}`);
    }
  }

  if (req.agent === null) {
    logger.warn('agentAuth: Agent not found. Not authorized.');
    res.status(401).json({ error: 'Not Authorized' });
  } else {
    next();
  }  
});