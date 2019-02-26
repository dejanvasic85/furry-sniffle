const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const config = require('./server/config');

const clients = require('./server/routes/clients');
const agents = require('./server/routes/agents');

const {db} = require('./server/db');
const logger = require('./server/logger');

const auth = require('./server/security/agentAuth');
const jwtAuth = require('./server/security/jwtAuth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Some basic logging
app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('method: POST, body: ', req.body);
  }
  next();
});

// Routes
app.use('/clients', auth, clients);
app.use('/agents', agents);
app.get('/health', (req, res) => { res.send('ok'); });

console.log('DB Authenticating..');
db.authenticate().then(() => {
  console.log('DB Authentication successful');
  app.listen(config.portNumber, () => {
    logger.info(`Listening on port ${ config.portNumber }`);
  });
});