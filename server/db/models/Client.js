module.exports = (sequelize, type) => {
  return sequelize.define('Client', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    agentId: {
      type: type.INTEGER,
      references: {
        model: 'Agents',
        id: 'id'
      },
      allowNull: false,
    },
    referralCode: {
      type: type.STRING,
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
    createdAt: type.DATE,
    updatedAt: type.DATE
  }, {});
};