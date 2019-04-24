const logger = require('./logger');

const {
  AUTH0_URI,
  AUTH0_AUDIENCE,
  NODE_ENV,
  PORT,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT,
  SENDGRID_BASEURL,
  SENDGRID_APIKEY,
  WEB_BASE_URL,
  DATABASE_URL,
  GIFTPAY_BASEURL,
  GIFTPAY_APIKEY
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
  isDevelopment: NODE_ENV !== 'production',
  portNumber: PORT || 5000,
  webBaseUrl: WEB_BASE_URL || 'http://localhost:3000',
  connectionString: connectionString,
  auth0: {
    baseUri: AUTH0_URI || 'https://paramount.au.auth0.com/',
    audience: AUTH0_AUDIENCE || 'http://localhost:5000'
  },
  sendGrid: {
    baseUrl: SENDGRID_BASEURL || 'https://api.sendgrid.com/v3',
    apiKey: SENDGRID_APIKEY
  },
  giftPay: {
    apiKey: GIFTPAY_APIKEY,
    baseUrl: GIFTPAY_BASEURL || 'https://sandbox.express.giftpay.com'
  }
};

logger.info(`Configuration: ${JSON.stringify(conf)}`);
logger.info(`DATABASE_URL: ${DATABASE_URL}`);

module.exports = conf;
