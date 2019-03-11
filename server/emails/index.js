const sgMail = require('@sendgrid/mail');

const { webBaseUrl, sendGrid } = require('../config');
const { getClientReferralUrl } = require('../services/clientService');
const logger = require('../logger');

sgMail.setApiKey(sendGrid.apiKey);

module.exports = {
  newClient: (agent, client) => {
    const templateData = {
      agentName: agent.firstName,
      // Todo - not sure whether we need to send this right now
      agentRewardsUrl: `${webBaseUrl}/agent/${agent.id}`,
      clientName: client.firstName,
      clientReferralUrl: getClientReferralUrl(agent.id, client.referralCode)
    };

    logger.info(`templateData ${templateData}`);

    const msg = {
      to: client.email,
      from: 'noreply@agentum.com',
      text: 'Hello plain world!',
      html: '<p>Hello HTML world!</p>',
      subject: 'Hello World',
      templateId: 'd-3cd3de0b1a7345d384e9662fbd7ebbe1',
      dynamic_template_data: templateData
    }
    return sgMail.send(msg).then(res => {
      logger.info(`Sendgrid response: ${res}`);
    }).catch(err => {
      logger.info(`Sendgrid ERROR: ${err}`);
      throw err;
    });
  }
};