module.exports = (sequelize, type) => {
  const Client =  sequelize.define('Client', {
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
    isActive: type.BOOLEAN,
    referralCode: {
      type: type.STRING,
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
      unique: true
    },
    phone: type.STRING,
    createdAt: type.DATE,
    updatedAt: type.DATE
  }, {});

  Client.associate = function(models) {
    models.Client.hasMany(models.Prospect,
      { foreignKey: 'clientId'} );
  };

  return Client;
};