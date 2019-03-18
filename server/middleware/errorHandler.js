const logger = require('../logger');

module.exports = function (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  logger.error(err);
  res.status(500).json({
    error: err.message,
    stack: err.stack
  });
};