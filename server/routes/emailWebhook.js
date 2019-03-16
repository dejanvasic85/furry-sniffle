const express = require('express');
const router = express.Router();

const { Email } = require('../db');
const logger = require('../logger');

router.post('/email-webhook', async (req, res) => {
  const events = req.body;
  if (!Array.isArray(req.body)) {
    logger.error(
      'Received invalid email webhook payload. Expected array',
      req.body
    );
    return;
  }

  for (let i = 0; i < events.length; i++) {
    const { event, email, timestamp, custom_args } = events[i];
    const id = custom_args.emailId;

    logger.info(
      `Received email event : [${id}] Event: ${event}, email: ${email}`
    );

    if (event === 'open') {
      const openedAt = new Date();
      await Email.update(
        { openedAt },
        {
          where: { id },
          returning: true
        }
      );
    } else if (event === 'delivered') {
      const deliveredAt = new Date();
      await Email.update(
        { deliveredAt },
        {
          where: { id },
          returning: true
        }
      );
    }
  }
});

module.exports = router;
