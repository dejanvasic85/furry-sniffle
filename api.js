const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const config = require('./server/config');
const clients = require('./server/routes/clients');
const emailWebhook = require('./server/routes/emailWebhook');
const agents = require('./server/routes/agents');
const prospects = require('./server/routes/prospects');
const { db } = require('./server/db');
const logger = require('./server/logger');

const { agentAuth, jwtAuth, errorHandler } = require('./server/middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/prospects', prospects);
app.use('/api/agents', agents);
app.use('/api/email', emailWebhook);
app.use('/api/clients', jwtAuth, agentAuth, clients);
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/landing/index.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/landing/index.html'));
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'landing')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Error handling must come last
app.use(errorHandler);

logger.info('DB Authenticating..');
db.authenticate().then(() => {
  logger.info('DB Authentication successful');
  app.listen(config.portNumber, () => {
    logger.info(`Listening on port ${config.portNumber}`);
  });
});
