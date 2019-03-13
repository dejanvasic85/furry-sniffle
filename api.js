const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const config = require('./server/config');

const clients = require('./server/routes/clients');
const agents = require('./server/routes/agents');
const path = require('path');

const { db } = require('./server/db');
const logger = require('./server/logger');

const { agentAuth, jwtAuth, errorHandler } = require('./server/middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.method === 'POST') {
    logger.info(
      `method: POST, path: ${req.path}, body: ${JSON.stringify(req.body)}`
    );
  }
  next();
});
app.use('/api/agents', agents);
app.use('/api/clients', jwtAuth, agentAuth, clients);
app.get('/api/health', jwtAuth, (req, res) => {
  console.log('HEALTH user', req.user);
  res.send('ok');
});
app.use(errorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

console.log('DB Authenticating..');
db.authenticate().then(() => {
  console.log('DB Authentication successful');
  app.listen(config.portNumber, () => {
    logger.info(`Listening on port ${config.portNumber}`);
  });
});
