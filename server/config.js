const logger = require('./logger');

const {  
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT
} = process.env;

let dbUserPassword = PGUSER;

if (PGPASSWORD) {
  dbUserPassword += `:${PGPASSWORD}`;
}
 
const conf = {
  portNumber: process.env.PORT || 5000,
  connectionString: `postgres://${dbUserPassword}@${PGHOST}:${PGPORT}/${PGDATABASE}`
}

logger.info(`Configuration: ${JSON.stringify(conf)}`);

module.exports = conf;