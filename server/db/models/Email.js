module.exports = (sequelize, type) => {
  return sequelize.define(
    'Email',
    {
      id: {
        type: type.STRING,
        primaryKey: true,
        allowNull: false
      },
      clientId: {
        type: type.INTEGER,
        allowNull: false
      },
      agentId: {
        type: type.INTEGER,
        allowNull: false
      },
      emailType: type.STRING, 
      deliveredAt: type.DATE,
      openedAt: type.DATE,
      createdAt: type.DATE,
      updatedAt: type.DATE
    },
    {}
  );
};
