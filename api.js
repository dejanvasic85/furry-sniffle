const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const config = require('./server/config');
const clients = require('./server/routes/clients');
const db = require('./server/db');
const logger = require('./server/logger');

const port = config.portNumber;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('method: POST, body: ', req.body);
  }
  next();
})
app.use('/clients', clients);

app.get('/health', (req, res) => { res.send('ok'); });

console.log('DB Authenticating..');
db.authenticate().then(() => {
  console.log('DB Authentication successful');
  app.listen(port, () => {
    logger.info(`Listening on port ${ port }`);
  });
});