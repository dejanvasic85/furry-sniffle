'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AccountTxns', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      accountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Accounts',
          key: 'id'
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      paymentReference: { 
        allowNull: true,
        type: Sequelize.STRING
      },
      amount: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      fee: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      totalAmount: {
        allowNull: false,
        type: Sequelize.BIGINT
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
    return queryInterface.dropTable('AccountTxns');
  }
};