const express = require('express');
const router = express.Router();
const { withAsync } = require('../../middleware');

router.get('/', withAsync(require('./getAccount')));

module.exports = router;
