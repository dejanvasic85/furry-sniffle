const logger = require('./logger');

const {
  AUTH0_URI,
  AUTH0_AUDIENCE,
  DEPOSIT_FEE_PERCENT,
  DEPOSIT_FEE_CENTS,
  NODE_ENV,
  PORT,
  SENDGRID_BASEURL,
  SENDGRID_APIKEY,
  WEB_BASE_URL,
  DATABASE_URL,
  GIFTPAY_BASEURL,
  GIFTPAY_APIKEY,
  STRIPE_KEY,
  STRIPE_SECRET,
  PROXY_EMAIL_HOOKS_TO,
  USE_DB_SSL
} = process.env;

const conf = {
  isDevelopment: NODE_ENV !== 'production',
  portNumber: PORT || 5000,
  webBaseUrl: WEB_BASE_URL || 'http://localhost:3000',
  connectionString: DATABASE_URL,
  useDbSSL: USE_DB_SSL || false,
  feeConfiguration: {
    depositFeePercent: DEPOSIT_FEE_PERCENT || 3,
    depositFeeCents: DEPOSIT_FEE_CENTS || 50,
  },
  auth0: {
    baseUri: `https://${AUTH0_URI}/` || 'https://bizrewarder.au.auth0.com/',
    audience: AUTH0_AUDIENCE || 'https://www.bizrewarder.com.au/api'
  },
  proxyEmailHooksTo:PROXY_EMAIL_HOOKS_TO || 'https://fox-rewarder.herokuapp.com/api/email/webhook',
  sendGrid: {
    baseUrl: SENDGRID_BASEURL || 'https://api.sendgrid.com/v3',
    apiKey: SENDGRID_APIKEY
  },
  giftPay: {
    apiKey: GIFTPAY_APIKEY,
    baseUrl: GIFTPAY_BASEURL || 'https://sandbox.express.giftpay.com'
  },
  stripeConfig: {
    key: STRIPE_KEY || 'pk_test_up5zZ6Vfb5BBGawIb2ugkN0o00ezT4zWqH',
    secret: STRIPE_SECRET
  }
};

logger.info(`Configuration: ${JSON.stringify(conf)}`);

module.exports = conf;
