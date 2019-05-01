export const authConfig = {
  audience: 'https://www.foxrewarder.com.au/api',
  domain: 'foxrewarder.au.auth0.com',
  clientId: 'WgWzBgqXpTQn2DPJKlmYVllf6OHu3fjJ',
  callbackUrl:
    process.env.REACT_APP_AUTH_CALLBACK_URL || 'http://localhost:3000/callback'
};
