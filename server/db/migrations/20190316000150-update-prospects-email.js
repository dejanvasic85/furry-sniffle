'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Prospects', 'Prospects_email_key');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Prospects', 'email', {
      unique: true
    });
  }
};
