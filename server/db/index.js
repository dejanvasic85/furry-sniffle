const Sequelize = require('sequelize');
const { connectionString } = require('../config');

// dv: First initialise the connection / pg then load the models
const db = new Sequelize(connectionString);
const Agent = require('./models/Agent')(db, Sequelize);
const Client = require('./models/Client')(db, Sequelize);
const Prospect = require('./models/Prospect')(db, Sequelize);
const Email = require('./models/Email')(db, Sequelize);
const Gift = require('./models/Gift')(db, Sequelize);


const models = {
  Agent,
  Client,
  Prospect,
  Email,
  Gift,
  db
};

Client.associate(models);
Prospect.associate(models);

module.exports = models;
