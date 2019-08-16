const Sequelize = require('sequelize');
const { database } = require('../../client/src/envConfig');

// dv: First initialise the connection then load the models
const db = new Sequelize(database.connectionString, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: database.useSsl
  }
});

const Account = require('./models/Account')(db, Sequelize);
const AccountTxn = require('./models/AccountTxn')(db, Sequelize);
const Agent = require('./models/Agent')(db, Sequelize);
const Client = require('./models/Client')(db, Sequelize);
const Prospect = require('./models/Prospect')(db, Sequelize);
const Email = require('./models/Email')(db, Sequelize);
const Gift = require('./models/Gift')(db, Sequelize);

const models = {
  Account,
  AccountTxn,
  Agent,
  Client,
  Prospect,
  Email,
  Gift,
  db
};

Client.associate(models);
Prospect.associate(models);
Account.associate(models);

module.exports = models;
