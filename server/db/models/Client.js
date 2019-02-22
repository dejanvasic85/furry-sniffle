module.exports = (sequelize, type) => {
  return sequelize.define('Client', {
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
    firstName: {
      type: type.STRING,
      allowNull: false
    },
    email: {
      type: type.STRING,
      unique: true
    },
    phone: type.STRING,
    agentId: {
      type: type.INTEGER
    },
    createdAt: type.DATE,
    updatedAt: type.DATE
  }, {});
};