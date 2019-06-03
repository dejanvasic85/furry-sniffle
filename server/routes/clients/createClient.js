const { Client } = require('../../db');
const emails = require('../../emails');
const { generateReferralCode } = require('../../services/clientService');
const { agentRequiresSetup } = require('../../services/agentService');
const logger = require('../../logger');

module.exports = async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'missing client details in request body' });
    return;
  }

  if (agentRequiresSetup(req.agent)) {
    res.status(400).json({ error: 'Agent requires to complete signup first.' });
    return;
  }

  const agentId = req.agent.id;
  const details = req.body;

  const existingClient = await Client.findOne({
    where: {
      agentId: agentId,
      email: details.email
    }
  });

  if (existingClient) {
    const msg = `Client with email ${details.email} already exists`;
    logger.info(msg);
    res.status(400).json({
      error: msg
    });
    return;
  }

  const createClientRequest = Object.assign({}, details, {
    agentId,
    isActive: true,
    referralCode: 'temp'
  });

  const createResult = await Client.create(createClientRequest);

  const createdClient = createResult.dataValues;
  const referalCode = generateReferralCode(createdClient);

  // Now that we have an id, we can create a new client with referral code
  await Client.update({ referralCode: referalCode }, { where: { id: createdClient.id } });

  createdClient.referralCode = referalCode;

  if (createClientRequest.sendEmail === true) {
    logger.info(`Sending email to ${createdClient.email}`);
    await emails.sendNewClientEmail(req.agent, createdClient);
  }

  res.status(201).json({ createdClient });
};
