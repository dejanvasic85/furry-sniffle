const express = require('express');
require('dotenv').config(); // dv: Loads any environment variables from .env file
const bodyParser = require('body-parser');
const app = express();
const config = require('./server/config');
const clients = require('./server/clients');
const db = require('./server/db');
const logger = require('./server/logger');

const port = config.portNumber;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/clients', clients);

app.listen(port, () => {
  logger.info('Testing db connection');
  db.query('select now()', (err, res) => {
     if (err) {
       throw new Error("Database connnection failed", err);
     }
     console.log('res', res);
  });
  logger.info(`Listening on port ${port}`);
});