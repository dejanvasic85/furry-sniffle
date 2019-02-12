const Sequelize = require('sequelize');
// Or you can simply use a connection uri
const db = new Sequelize('postgres://postgres@localhost:54320/agento');

module.exports = db;