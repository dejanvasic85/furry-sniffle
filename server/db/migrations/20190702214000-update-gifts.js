module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Gifts', 'emailId', {
      type: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Gifts', 'emailId');
  }
};
