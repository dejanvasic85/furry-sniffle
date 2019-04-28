// dv: We can load this again because it's not being used in the API.js which is the entrypoint for the api.
// instead that uses the config.js
require('dotenv').config();

console.log('env VAR', process.env.DATABASE_URL);

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
