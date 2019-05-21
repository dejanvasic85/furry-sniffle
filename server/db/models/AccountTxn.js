module.exports = (sequelize, type) => {
  const AccountTxn =  sequelize.define('AccountTxn', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    accountId: {
      allowNull: false,
      type: type.INTEGER,
      references: {
        model: 'Accounts',
        key: 'id'
      }
    },
    description: {
      allowNull: false,
      type: type.STRING
    },
    paymentReference: { 
      allowNull: true,
      type: type.STRING
    },
    amount: {
      allowNull: false,
      type: type.BIGINT
    },
    fee: {
      allowNull: false,
      type: type.BIGINT
    },
    totalAmount: {
      allowNull: false,
      type: type.BIGINT
    },
    createdAt: {
      allowNull: false,
      type: type.DATE
    },
    updatedAt: {
      allowNull: false,
      type: type.DATE
    }
  }, {});

  return AccountTxn;
};