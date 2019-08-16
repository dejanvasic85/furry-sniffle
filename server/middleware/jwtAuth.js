const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const { auth0, isDevelopment }  = require('../../client/src/envConfig');

const logger = require('../logger');

const HEADERS = Object.freeze({
  AUTHORIZATION: 'Authorization',
  AGENT_ID: 'AgentId'
});

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${auth0.baseUri}.well-known/jwks.json`
  }),
  audience: auth0.audience,
  issuer: auth0.baseUri,
  algorithms: ['RS256']
});

module.exports = (req, res, next) => {
  if (req.get(HEADERS.AUTHORIZATION)) {    
    jwtCheck(req, res, next);
    return;
  }

  // In development you can now just simply pass the agent id in the header (skip jwt)
  if (isDevelopment && req.get(HEADERS.AGENT_ID)) {
    next();
    return;
  }

  logger.error('jwtAuth: Missing JWT authentication');
  res.status(401).json({ error: 'Not Authorized' });
};