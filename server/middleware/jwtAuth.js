const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const { auth0 } = require('../config');

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

module.exports = jwtCheck;
