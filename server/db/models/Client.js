
const DataTypes = require('sequelize');
const db = require('../index');

const Client = db.define('Client', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {});
Client.associate = function (models) {
  // associations can be defined here
};

module.exports = Client;