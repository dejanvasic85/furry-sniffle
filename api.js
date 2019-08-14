const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const { port } = require('./client/src/envConfig');
const gifts = require('./server/routes/gifts');
const { db } = require('./server/db');
const logger = require('./server/logger');

const { agentAuth, jwtAuth, errorHandler, requireHttps } = require('./server/middleware');

app.use(requireHttps);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/prospects', require('./server/routes/prospects')); // todo: why prospects are not protected?
app.use('/api/agents', require('./server/routes/agents')); // todo: why agents are not protected?
app.use('/api/accounts', jwtAuth, agentAuth, require('./server/routes/accounts'));
app.use('/api/email', require('./server/routes/emailWebhook'));
app.use('/api/clients', jwtAuth, agentAuth, require('./server/routes/clients'));
app.use('/api/dashboard', jwtAuth, agentAuth, require('./server/routes/dashboard'));

app.use('/api/gifts', jwtAuth, agentAuth, gifts);
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
  app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
  });
});
