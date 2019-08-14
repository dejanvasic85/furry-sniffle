
// this file shall not contain any secrets. secrets are stored in .env file locally
// or in Heroku settings
const envConfig = {
  local: {
    stripe: {
      depositFeePercent: 3,
      depositFeeCents: 50,
      apiKey: "pk_test_up5zZ6Vfb5BBGawIb2ugkN0o00ezT4zWqH",
      secret: null, 
    },
    auth0: {
      domain: "foxrewarder.au.auth0.com",
      baseUri: `https://foxrewarder.au.auth0.com/`,
      audience: "https://www.foxrewarder.com.au/api",
      clientId: "WgWzBgqXpTQn2DPJKlmYVllf6OHu3fjJ",
      callback: "http://localhost:3000/callback"
    },
    sendGrid:{
      baseUrl:  'https://api.sendgrid.com/v3',
      proxyEmailHooksTo: null,
      apiKey:  null,
    },
    giftPay: {
      baseUrl: 'https://sandbox.express.giftpay.com',
      apiKey:  null,
    },
    webBaseUrl: 'http://localhost:3000',
    isDevelopment: true,
  },

  dev: {
    stripe: {
      depositFeePercent: 3,
      depositFeeCents: 50,
      apiKey: "pk_test_up5zZ6Vfb5BBGawIb2ugkN0o00ezT4zWqH",
      secret: null,
    },
    auth0: {
      domain: "paramount.au.auth0.com",
      baseUri: `https://paramount.au.auth0.com/`,
      audience: "http://localhost:5000",
      clientId: "vBP5pNdN3pg0AF7cPTd6UlqolKxbD335",
      callback: "https://fox-rewarder.herokuapp.com/callback"
    },
    sendGrid:{
      baseUrl:  'https://api.sendgrid.com/v3',
      proxyEmailHooksTo: null,
      apiKey:  null,
    },
    giftPay: {
      baseUrl: 'https://sandbox.express.giftpay.com',
      apiKey:  null,
    },
    webBaseUrl: '"https://fox-rewarder.herokuapp.com',
    isDevelopment: false,
    

  },

  production: {
    stripe: {
      depositFeePercent: 3,
      depositFeeCents: 50,
      apiKey: "pk_live_x4W1DAyEBwy21HSNl3YXKbsi00qejINn0h",
      secret: null, 
    },
    auth0: {
      domain: "bizrewarder.au.auth0.com",
      baseUri: `https://bizrewarder.au.auth0.com/`,
      audience: "https://www.bizrewarder.com.au/api",
      clientId: "GsbxpQ5tdkq8KGntRJOv33mKQbWtSZ77",
      callback: "https://www.bizrewarder.com.au/callback"
    },
    sendGrid:{
      baseUrl:  'https://api.sendgrid.com/v3',
      proxyEmailHooksTo: 'https://fox-rewarder.herokuapp.com/api/email/webhook',
      apiKey:  null, 
    },
    giftPay: {
      baseUrl: 'https://express.giftpay.com',
      apiKey:  null,
    },
    webBaseUrl: "https://www.bizrewarder.com.au",
    isDevelopment: false,
  }
};


require('dotenv').config();

const getEnvValue = (key) => {
  const value = process.env[key];
  if (!value) {
    const errorMessage = `${key} is not defined. Non complete configuration`;
    console.warn(errorMessage);
  }
  return value;
}

const envName = getEnvValue('REACT_APP_CONFIG_ENV_NAME');
if(!envName){
  throw new Error('REACT_APP_CONFIG_ENV_NAME is crucial tp start app');
}

let selectedConfigSet = envConfig[envName]
console.log(`loaded config for:${envName}`, JSON.stringify(selectedConfigSet));

// the below config is only applicable for Server side

if (typeof window === 'undefined') {
  selectedConfigSet.stripe.apiKey  = getEnvValue('STRIPE_SECRET');
  selectedConfigSet.giftPay.apiKey  = getEnvValue('GIFTPAY_APIKEY');
  selectedConfigSet.sendGrid.apiKey  = getEnvValue('SENDGRID_APIKEY');
  selectedConfigSet.connectionString = getEnvValue('DATABASE_URL');
  selectedConfigSet.port = getEnvValue('PORT') || 5000;
}

module.exports = selectedConfigSet;

