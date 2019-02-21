'use strict';

const constraintName = 'clients_unique_email';
const clientTable = 'Clients';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const addConstraint = queryInterface.addConstraint(clientTable, ['email'], {
      type: 'unique',
      name: constraintName
    });

    const addAgentIdColumn = queryInterface.addColumn(clientTable, 'agentId', {
      type: Sequelize.INTEGER
    });

    return Promise.all([addConstraint, addAgentIdColumn])
  },

  down: (queryInterface, Sequelize) => {
    const removeConstraint = queryInterface.removeConstraint(clientTable, constraintName);
    const removeAgentId = queryInterface.removeColumn(clientTable, 'agentId');

    return Promise.all(removeConstraint, removeAgentId);
  }
};
