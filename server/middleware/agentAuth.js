const notAuthorized = {
  error: 'not authorized'
};

module.exports = function (req, res, next) {
  console.log('authorizing', req.headers, req.method);
  if (req.method === 'OPTIONS') {
    res.send(200);
    return;
  }

  if (!req.get('Authorization')) {
    res.status(401).json(notAuthorized);
  } else {

    // Todo - read the agent auth token instead of just an id in the header
    const agentId = parseInt(req.get('Authorization'));
    req.agentId = agentId;

    next();
  }
};