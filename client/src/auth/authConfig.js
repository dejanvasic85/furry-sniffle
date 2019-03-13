export const authConfig = {
  audience: 'http://localhost:5000',
  domain: 'paramount.au.auth0.com',
  clientId: 'vBP5pNdN3pg0AF7cPTd6UlqolKxbD335',
  callbackUrl:
    process.env.REACT_APP_AUTH_CALLBACK_URL || 'http://localhost:3000/callback'
};
