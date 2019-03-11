const agentAuth = require('./agentAuth');
const jwtAuth = require('./jwtAuth');
const errorHandler = require('./errorHandler');

module.exports = {
  agentAuth,
  errorHandler,
  jwtAuth,
};