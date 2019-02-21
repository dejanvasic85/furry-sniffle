const express = require('express');
const router = express.Router();
const Client = require('../db/models/client');
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

  const client = Client.create(req.body).then();
  res.status(200).json({ created: true, client });
});

module.exports = router;