const express = require('express');
const router = express.Router();

const { Email } = require('../db');

const processEvent = async singleEvent => {
  const { event, email, emailId, timestamp, custom_args } = singleEvent;

  if (!emailId) {
    console.info(
      `Skipping email event : no emailId...Unable to link to sent email. Event: ${event}, email: ${email}`
    );
    return;
  }

  if (event !== 'open' && event !== 'delivered') {
    console.info(
      `Skipping email event : [${emailId}] Event: ${event}, email: ${email}`
    );
    return;
  }

  console.info(
    `Processing email event : [${emailId}] Event: ${event}, email: ${email}`
  );

  const now = new Date();
  const fieldsToUpdate =
    event === 'open' ? { openedAt: now } : { deliveredAt: now };

  await Email.update(fieldsToUpdate, {
    where: { id: emailId },
    returning: true
  });

  console.info(
    `Updated email. event : [${emailId}] to status: ${event}, email: ${email}`
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
