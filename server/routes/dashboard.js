const express = require('express');
const router = express.Router();
var subDays = require('date-fns/sub_days');

const Sequelize = require('sequelize');

const { Client, Email, Gift, Prospect } = require('../db');
const { withAsync } = require('../middleware');

const logger = require('../logger');
const X_DAYS_AGO = 7;

router.get(
  '/',
  withAsync(async (req, res) => {
    const agentId = req.agent.id;
    logger.info(`Fetch dashboard by agentId: ${agentId}`);

    const xDaysAgo = req.query.xdaysago || X_DAYS_AGO;
    
    const today = new Date();
    const dateBefore = subDays(today, xDaysAgo);

    const clientsToday = await Client.count({
      where: {
        agentId,
        isActive: true,
      },
    });

    const clientsXDaysAgo = await Client.count({
      where: {
        agentId,
        isActive: true,
        createdAt: { [Sequelize.Op.lt]: dateBefore.toUTCString() },
      },
    });

    const emailsToday = await Email.count({
      where: {
        agentId,
      },
    });

    const emailsXDaysAgo = await Email.count({
      where: {
        agentId,
        createdAt: { [Sequelize.Op.lt]: dateBefore.toUTCString() },
      },
    });

    const emailsOpenedToday = await Email.count({
      where: {
        agentId,
        openedAt: { [Sequelize.Op.ne]: null },
      },
    });

    const emailsOpenedXDaysAgo = await Email.count({
      where: {
        agentId,
        openedAt: { [Sequelize.Op.lt]: dateBefore.toUTCString() },
      },
    });

    const giftsToday = await Gift.count({
      where: {
        agentId,
      },
    });

    const giftsXDaysAgo = await Gift.count({
      where: {
        agentId,
        createdAt: { [Sequelize.Op.lt]: dateBefore.toUTCString() },
      },
    });

    const prospectsToday = await Prospect.count({
      where: {
        agentId,
      },
    });

    const prospectsXDaysAgo = await Prospect.count({
      where: {
        agentId,
        createdAt: { [Sequelize.Op.lt]: dateBefore.toUTCString() },
      },
    });

    res.json({
      clients: {
        daysCount: xDaysAgo,
        now: clientsToday,
        before: clientsXDaysAgo,
      },
      emails: {
        daysCount: xDaysAgo,
        now: emailsToday,
        before: emailsXDaysAgo,
      },
      emailsOpened: {
        daysCount: xDaysAgo,
        now: emailsOpenedToday,
        before: emailsOpenedXDaysAgo,
      },
      gifts: {
        daysCount: xDaysAgo,
        now: giftsToday,
        before: giftsXDaysAgo,
      },
      prospects: {
        daysCount: xDaysAgo,
        now: prospectsToday,
        before: prospectsXDaysAgo,
      },
    });
  })
);

module.exports = router;
