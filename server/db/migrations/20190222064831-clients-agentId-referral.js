'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Clients', 'agentId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Agents',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Clients', 'agentId');
  }
};
