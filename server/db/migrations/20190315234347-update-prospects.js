module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Prospects', 'agentId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Agents',
        id: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Prospects', 'agentId');
  }
};
