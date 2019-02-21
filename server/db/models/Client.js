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
    phone: DataTypes.STRING,
    agentId: {
      type: type.INTEGER
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
};