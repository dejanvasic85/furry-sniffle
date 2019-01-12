const { Pool } = require('pg');
const logger = require('../logger');

const pool = new Pool();

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      logger.info(`db query text: ${text}, duration: ${duration}`);
      if (callback) {
        callback(err, res);
      }
    });
  }
};