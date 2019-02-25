module.exports = (sequelize, type) => {
  return sequelize.define('Agent', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firstName: {
      type: type.STRING,
      allowNull: false
    },
    lastName: {
      type: type.STRING,
      allowNull: false
    },
    email: {
      type: type.STRING,
      allowNull: false
    },
    businessName: type.STRING,
    abn: type.STRING,
    phone: type.STRING,
    createdAt: type.DATE,
    updatedAt: type.DATE
  }, {});
};