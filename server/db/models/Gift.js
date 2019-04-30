module.exports = (sequelize, type) => {
  return sequelize.define(
    'Gift',
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
      message: type.STRING,
      from: type.STRING,
      value: type.INTEGER,
      giftpayId: type.STRING,
      giftpayStatus: type.STRING,
      createdAt: type.DATE,
      updatedAt: type.DATE
    },
    {}
  );
};