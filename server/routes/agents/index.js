const express = require('express');
const router = express.Router();
const { agentAuth, jwtAuth, withAsync } = require('../../middleware');

router.get('/', jwtAuth, agentAuth, withAsync(require('./getAgent')));
router.post('/login', jwtAuth, withAsync(require('./login')));
router.put('/', jwtAuth, withAsync(require('./updateAgent')));
router.post('/deposit', jwtAuth, agentAuth, withAsync(require('./deposit')));

module.exports = router;