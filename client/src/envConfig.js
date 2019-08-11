const envConfig = {
  ['local']: {
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
    }
  },

  ['dev']: {
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
    }
  },

  ['production']: {
    stripe: {
      depositFeePercent: 3,
      depositFeeCents: 50,
      apiKey: "{some other key here}"
    },
    auth0: {
      domain: "bizrewarder.au.auth0.com",
      audience: "https://www.biz-rewarder.com.au/api",
      clientId: "PROD CLIENT ID",
      callback: "PROD CALLABCK"
    }
  }
};

const envName = process.env.REACT_APP_CONFIG_ENV_NAME;
if (!envName) {
  console.error('Unable to start. REACT_APP_CONFIG_ENV_NAME is not set (local,dev or producation?)')
  throw new Error('Unable to start. REACT_APP_CONFIG_ENV_NAME is not set');
}

export default loadConfig = () => {
  return envConfig[envName];
}

// the consumers will use `import { loadConfig } from '/envConfig';
// loadConfig.auth0.domain etc..
