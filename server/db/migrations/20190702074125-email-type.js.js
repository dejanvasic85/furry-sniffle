module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Emails', 'emailType', {
      type: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Emails', 'emailType');
  }
};
