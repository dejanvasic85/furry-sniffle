const express = require('express');
const router = express.Router();
const { db, Client } = require('../db');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

router.get('/', (req, res) => {
  console.log('clients.getAll agentId:', req.agentId);
  Client.findAll({
    where: {
      createdAt: {
        [Op.ne]: null
      }
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
    res.status(401).json({ message: 'missing client details in request bodyu' });
    return;
  }

  const newClient = Object.assign({}, req.body, { agentId: req.agentId });
  console.log('Adding newClient', newClient);

  // db.transaction(t => {
  //console.log('Transaction', t);
  Client.findOrCreate({
    where: {
      email: newClient.email,
    },
    defaults: newClient
  }).spread((client, created) => {
    console.log('client', client, ' created ', created);
    res.status(201).json(client);
  }).catch(err => {
    console.log('what the ', err);
    res.status(500).json(err) 
  });

});

module.exports = router;