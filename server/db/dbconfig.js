// dv: We can load this again because it's not being used in the API.js which is the entrypoint for the api.
// instead that uses the config.js
require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "host": process.env.PGHOST,
    "port": process.env.PGPORT,
    "dialect": "postgres"
  }
}