module.exports = (sequelize, type) => {
  return sequelize.define('Agent', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userAuthId: {
      type: type.STRING,
      allowNull: false
    },
    firstName: {
      type: type.STRING
    },
    lastName: {
      type: type.STRING
    },
    email: {
      type: type.STRING,
      allowNull: false
    },
    businessName: type.STRING,
    abn: type.STRING,
    phone: type.STRING,
    accountId: type.INTEGER,
    createdAt: type.DATE,
    updatedAt: type.DATE
  }, {});
};