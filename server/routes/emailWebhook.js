const express = require('express');
const router = express.Router();

const { Email } = require('../db');

const processEvent = async singleEvent => {
  const { event, email, timestamp, custom_args } = singleEvent;
  const id = custom_args.emailId;

  if (event !== 'open' && event !== 'delivered') {
    console.info(
      `Skipping email event : [${id}] Event: ${event}, email: ${email}`
    );
    return;
  }

  console.info(
    `Processing email event : [${id}] Event: ${event}, email: ${email}`
  );

  const now = new Date();
  const fieldsToUpdate =
    event === 'open' ? { openedAt: now } : { deliveredAt: now };

  await Email.update(fieldsToUpdate, {
    where: { id },
    returning: true
  });

  console.info(
    `Updated email. event : [${id}] to status: ${event}, email: ${email}`
  );
};

router.post('/webhook', async (req, res) => {
  console.info(`Received email webhook`, req.body);
  const events = req.body;
  if (!Array.isArray(events)) {
    console.error(
      'Received invalid email webhook payload. Expected array',
      req.body
    );
    res.status(400).json({ error: 'Expected array' });
    return;
  }
  throw new Error('aaa');

  try {
    for (let i = 0; i < events.length; i++) {
      await processEvent(events[i]);
    }
  } catch (e) {
    console.error('Failure', e);
  }
  res.status(200).json({});
});

module.exports = router;
