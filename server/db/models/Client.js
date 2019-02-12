const Sequelize = require('sequelize');

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email : {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  }
});

module.exports = User;