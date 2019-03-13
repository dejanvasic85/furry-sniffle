const logger = require('./logger');

const {
  AUTH0_URI,
  AUTH0_AUDIENCE,
  PORT,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT,
  SENDGRID_BASEURL,
  SENDGRID_APIKEY,
  WEB_BASE_URL,
  PGDATABASE_URL
} = process.env;

let dbUserPassword = PGUSER;

if (PGPASSWORD) {
  dbUserPassword += `:${PGPASSWORD}`;
}

const connectionString =
  DATABASE_URL ||
  `postgres://${dbUserPassword}@${PGHOST}:${PGPORT}/${PGDATABASE}`;
if (DATABASE_URL) {
  logger.info('Using DATABASE_URL - ignoring PGHOST,PGPORT,PGDATABASE');
}

const conf = {
  portNumber: PORT || 5000,
  webBaseUrl: WEB_BASE_URL || 'http://localhost:3000',
  connectionString: connectionString,
  auth0: {
    baseUri: AUTH0_URI,
    audience: AUTH0_AUDIENCE
  },
  sendGrid: {
    baseUrl: SENDGRID_BASEURL,
    apiKey: SENDGRID_APIKEY
  }
};

logger.info(`Configuration: ${JSON.stringify(conf)}`);
logger.info(`DATABASE_URL: ${DATABASE_URL}`);

module.exports = conf;
