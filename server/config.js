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
  STRIPE_SECRET
} = process.env;

const conf = {
  isDevelopment: NODE_ENV !== 'production',
  portNumber: PORT || 5000,
  webBaseUrl: WEB_BASE_URL || 'http://localhost:3000',
  connectionString: DATABASE_URL,
  feeConfiguration: {
    depositFeePercent: DEPOSIT_FEE_PERCENT,
    depositFeeCents: DEPOSIT_FEE_CENTS,
  },
  auth0: {
    baseUri: AUTH0_URI || 'https://foxrewarder.au.auth0.com/',
    audience: AUTH0_AUDIENCE || 'https://www.foxrewarder.com.au/api'
  },
  sendGrid: {
    baseUrl: SENDGRID_BASEURL || 'https://api.sendgrid.com/v3',
    apiKey: SENDGRID_APIKEY
  },
  giftPay: {
    apiKey: GIFTPAY_APIKEY,
    baseUrl: GIFTPAY_BASEURL || 'https://sandbox.express.giftpay.com'
  },
  stripeConfig: {
    key: STRIPE_KEY,
    secret: STRIPE_SECRET
  }
};

logger.info(`Configuration: ${JSON.stringify(conf)}`);

module.exports = conf;
