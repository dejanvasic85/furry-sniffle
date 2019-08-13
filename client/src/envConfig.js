// this file shall not contain any secrets. secrets are stored in .env file locally
// or in Heroku settings
const envConfig = {
  local: {
    stripe: {
      depositFeePercent: 3,
      depositFeeCents: 50,
      apiKey: "pk_test_up5zZ6Vfb5BBGawIb2ugkN0o00ezT4zWqH"
    },
    auth0: {
      domain: "foxrewarder.au.auth0.com",
      audience: "https://www.foxrewarder.com.au/api",
      clientId: "WgWzBgqXpTQn2DPJKlmYVllf6OHu3fjJ",
      callback: "http://localhost:3000/callback"
    },
  },

  dev: {
    stripe: {
      depositFeePercent: 3,
      depositFeeCents: 50,
      apiKey: "pk_test_up5zZ6Vfb5BBGawIb2ugkN0o00ezT4zWqH"
    },
    auth0: {
      domain: "paramount.au.auth0.com",
      audience: "http://localhost:5000",
      clientId: "vBP5pNdN3pg0AF7cPTd6UlqolKxbD335",
      callback: "https://fox-rewarder.herokuapp.com/callback"
    }
  },

  production: {
    stripe: {
      depositFeePercent: 3,
      depositFeeCents: 50,
      apiKey: "pk_live_x4W1DAyEBwy21HSNl3YXKbsi00qejINn0h"
    },
    auth0: {
      domain: "bizrewarder.au.auth0.com",
      audience: "https://www.bizrewarder.com.au/api",
      clientId: "GsbxpQ5tdkq8KGntRJOv33mKQbWtSZ77",
      callback: "https://www.bizrewarder.com.au/callback"
    }
  }
};


const loadConfig = () => {

  const envName = process.env.REACT_APP_CONFIG_ENV_NAME;
  console.log('loading config ...',envName);
  if (!envName) {
    console.error('Unable to start. REACT_APP_CONFIG_ENV_NAME is not set');
    throw new Error('Unable to start. REACT_APP_CONFIG_ENV_NAME is not set');
  }

  return  envConfig[envName];
}

export default loadConfig;

