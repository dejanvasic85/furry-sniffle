const logger = require('../logger');

module.exports = function (err, req, res, next) {
  logger.error(err);
  
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: err.message,
    stack: err.stack
  });
};