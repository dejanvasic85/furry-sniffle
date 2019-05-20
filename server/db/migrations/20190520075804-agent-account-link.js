'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Agents', 'accountId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Accounts',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Agents', 'accountId');
  }
};
