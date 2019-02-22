'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Clients', ['email'], {
      type: 'unique',
      name: 'clients_unique_email'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Clients', 'clients_unique_email');
  }
};
