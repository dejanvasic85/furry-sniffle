export const authConfig = {
  audience:
    process.env.REACT_APP_AUTH_AUDIENCE || "https://www.bizrewarder.com.au/api",

  domain: process.env.REACT_APP_AUTH_DOMAIN || "bizrewarder.au.auth0.com",

  clientId:
    process.env.REACT_APP_AUTH_CLIENT_ID || "WgWzBgqXpTQn2DPJKlmYVllf6OHu3fjJ",

  callbackUrl:
    process.env.REACT_APP_AUTH_CALLBACK_URL || "http://localhost:3000/callback"
};
