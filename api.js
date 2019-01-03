const express = require('express');
require('dotenv').config(); // dv: Loads any environment variables from .env file
const bodyParser = require('body-parser');
const app = express();
const config = require('./server/config');

console.log('config loaded', config);

const downloads = require('./server/downloads');
const port = config.portNumber;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/downloads', (req, res) => {
  const currentDownloads = downloads.getFilesAndFolders();
  res.json({ currentDownloads });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));