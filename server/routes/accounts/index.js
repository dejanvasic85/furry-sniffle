const express = require('express');
const router = express.Router();
const { withAsync } = require('../../middleware');

router.get('/:id', jwtAuth, agentAuth, withAsync(require('./getAccount')));

module.exports = router;
