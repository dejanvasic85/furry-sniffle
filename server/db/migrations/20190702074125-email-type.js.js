module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Emails', 'emailType', {
      type: Sequelize.STRING
    }).then(() => {
      return queryInterface.sequelize.query(`UPDATE "Emails" set "emailType" = 'welcome_email'`);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Emails', 'emailType');
  }
};
