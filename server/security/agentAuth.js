const notAuthorized = {
  error: 'not authorized'
};

module.exports = function(req, res, next) {
  if (!req.get('authorization')) {
    res.status(403).json(notAuthorized);
  }

  // Todo - read the agent auth token instead of just an id in the header
  const agentId = parseInt(req.get('authorization'));
  req.agentId = agentId;

  next();
};