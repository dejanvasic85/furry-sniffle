module.exports = (sequelize, type) => {
  const Account =  sequelize.define('Account', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    balance: {
      allowNull: false,
      type: type.BIGINT
    },
    availableFunds: { 
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

  Account.associate = function(models) {
    models.Account.hasMany(models.AccountTxn, { foreignKey: 'accountId'} );
  };

  return Account;
};