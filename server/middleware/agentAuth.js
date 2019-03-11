const { Agent } = require('../db');

module.exports = function (req, res, next) {
  const agentAuthId = req.user.sub;
  Agent.findOne({
    where: {
      agentAuthId
    }
  }).then(agent => {
    req.agent = agent;
    next();
  }).error(() => {
    res.status(403).json({ error: 'Not Authorized' });
  });
}