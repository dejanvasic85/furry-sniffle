'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Gifts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Clients',
          id: 'id'
        }
      },
      agentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Agents',
          key: 'id'
        }
      },
      message: {
        allowNull: true,
        type: Sequelize.STRING
      },
      from: {
        allowNull: true,
        type: Sequelize.STRING
      },
      value: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      giftpayId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      giftpayStatus: {
        allowNull: true,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Gifts');
  }
};
