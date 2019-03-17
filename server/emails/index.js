const sgMail = require('@sendgrid/mail');
const uuidv4 = require('uuid/v4');
const { webBaseUrl, sendGrid } = require('../config');
const { getClientReferralUrl } = require('../services/clientService');
const logger = require('../logger');

const { Email } = require('../db');
sgMail.setApiKey(sendGrid.apiKey);

const sendAndTrackEmail = async (msg, clientId, agentId) => {
  const emailId = uuidv4();
  const msgWithId = { ...msg, customArgs: { emailId: emailId } };

  logger.info(`Sending email ${msgWithId}`);

  await sgMail.send(msg);
  await Email.create({
    id: emailId,
    clientId: clientId,
    agentId: agentId
  });
};

module.exports = {
  send: async (agent, client) => {
    const templateData = {
      agentName: agent.firstName,
      clientName: client.firstName,
      clientReferralUrl: getClientReferralUrl(agent.id, client.referralCode)
    };

    const msg = {
      to: client.email,
      from: 'noreply@agentum.com',
      text: 'Hello plain world!',
      html: '<p>Hello HTML world!</p>',
      subject: 'Hello World',
      templateId: 'd-3cd3de0b1a7345d384e9662fbd7ebbe1',
      dynamic_template_data: templateData
    };

    await sendAndTrackEmail(msg, client.id, agent.id);
  }
};
