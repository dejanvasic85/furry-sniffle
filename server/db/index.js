const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres@localhost:54320/agento');

const Agent = require('./models/Agent')(db, Sequelize);
const Client = require('./models/Client')(db, Sequelize);

module.exports = {
  db,
  Agent,
  Client
};