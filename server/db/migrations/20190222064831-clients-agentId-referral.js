'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const agentId = queryInterface.addColumn('Clients', 'agentId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Agents',
        key: 'id'
      }
    });

    const referralCode =  queryInterface.addColumn('Clients', 'referralCode', {
      type: Sequelize.STRING,
    });
    
    const isActive = queryInterface.addColumn('Clients', 'isActive', {
      type: Sequelize.BOOLEAN,
    });

    return Promise.all([referralCode, agentId, isActive]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Clients', 'referralCode'),
      queryInterface.removeColumn('Clients', 'agentId'),
      queryInterface.removeColumn('Clients', 'isActive')
    ]);
  }
};
