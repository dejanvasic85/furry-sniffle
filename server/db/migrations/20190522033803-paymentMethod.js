'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('AccountTxns', 'paymentMethod', {
      type: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('AccountTxns', 'paymentMethod');
  }
};
