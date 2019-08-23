const selectedConfigSet = require('../../client/src/envConfig');
const { database } = selectedConfigSet;

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: database.useSsl
    }
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
     ssl: database.useSsl
    }
  }
};
