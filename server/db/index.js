const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres@localhost:54320/agento');

const ClientModel = require('./models/client');
const Client = ClientModel(db, Sequelize);

module.exports = {
  db,
  Client
};