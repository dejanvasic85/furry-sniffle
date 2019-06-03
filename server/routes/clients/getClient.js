const { Client, Email, Gift, Prospect } = require('../../db');
const logger = require('../../logger');
const { getClientReferralUrl } = require('../../services/clientService');

module.exports = async (req, res) => {
  const agentId = req.agent.id;
  const id = req.params.id;

  logger.info(`Fetch by client id ${id}, agentId: ${agentId}`);
  const client = await Client.findOne({ where: { id, agentId } });
  if (!client) {
    res.status(404).json({ error: 'unknown client id' });
    return;
  }

  const sentEmails = await Email.findAll({
    where: { clientId: id },
    order: [['createdAt', 'DESC']]
  });

  const sentGifts = await Gift.findAll({
    where: { clientId: id },
    order: [['createdAt', 'DESC']]
  });

  const prospects = await Prospect.findAll({
    where: { clientId: id, agentId: agentId },
    include: [
      {
        model: Client,
        required: true
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  const response = {
    ...client.dataValues,
    referralUrl: getClientReferralUrl(client.referralCode),
    emails: sentEmails,
    gifts: sentGifts,
    prospects: prospects
  };

  res.json(response);
};
