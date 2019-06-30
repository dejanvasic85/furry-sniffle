const express = require('express');
const router = express.Router();

const { withAsync } = require('../../middleware');

router.get('/', withAsync(require('./getClientsForAgent')));
router.get('/:id', withAsync(require('./getClient')));
router.get('/emails/list', withAsync(require('./getEmailsForClients')));
router.post('/:id/sendEmail', withAsync(require('./sendEmail')));
router.post('/sendBatchClientEmails', withAsync(require('./sendBatchClientEmails')));
router.post('/:id/gift', withAsync(require('./gift')));
router.put('/:id', withAsync(require('./updateClient')));
router.post('/', withAsync(require('./createClient')));

module.exports = router;
