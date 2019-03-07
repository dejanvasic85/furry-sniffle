const express = require('express');
const router = express.Router();
const { db, Client } = require('../db');
const Sequelize = require('sequelize');
const emailer = require('../emails');

const Op = Sequelize.Op;

router.get('/', (req, res) => {
  console.log('clients.getAll agentId:', req.agentId);
  Client.findAll({
    where: {
      agentId: req.agentId,
      isActive: true
    }
  }).then(results => {
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  console.log('client.getById', req.params.id, 'agentId: ', req.agentId);
  Client.findOne({ where: { id: req.params.id } }).then(client => {
    res.json(client);
  });
});

router.post('/', (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'missing client details in request bodyu' });
    return;
  }

  const newClient = Object.assign({}, req.body, {
    agentId: req.agentId,
    isActive: true
  });

  console.log('Adding newClient', newClient);

  Client.findOrCreate({
    where: {
      email: newClient.email,
      isActive: true,
      agentId: newClient.agentId
    },
    defaults: newClient
  }).spread((client, created) => {
    if (created === true) {
      res.status(201).json(client);
    } else {
      res.status(400).json({ error: `Unable to save client. Email ${ newClient.email } may already exist` });
    }
  }).catch(err => {
    res.status(500).json(err)
  });

});

module.exports = router;