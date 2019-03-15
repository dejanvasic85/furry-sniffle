'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Emails', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      agentId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      deliveredAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      openedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Emails');
  }
};
