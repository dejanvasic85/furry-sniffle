const logger = require('./logger');

const {
  AUTH0_URI,
  AUTH0_AUDIENCE,
  PORT,
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
  portNumber: PORT || 5000,
  connectionString: `postgres://${dbUserPassword}@${PGHOST}:${PGPORT}/${PGDATABASE}`,
  auth0: {
    baseUri: AUTH0_URI,
    audience: AUTH0_AUDIENCE
  }
};

logger.info(`Configuration: ${JSON.stringify(conf)}`);

module.exports = conf;