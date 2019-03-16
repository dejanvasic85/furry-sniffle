const sgMail = require('@sendgrid/mail');
const uuidv4 = require('uuid/v4');
const { webBaseUrl, sendGrid } = require('../config');
const { getClientReferralUrl } = require('../services/clientService');
const logger = require('../logger');

const { Email } = require('../db');
sgMail.setApiKey(sendGrid.apiKey);

module.exports = {
  newClient: (agent, client) => {
    const templateData = {
      agentName: agent.firstName,
      clientName: client.firstName,
      clientReferralUrl: getClientReferralUrl(agent.id, client.referralCode)
    };

    const emailId = uuidv4();
    logger.info(`templateData ${templateData}, emailId:${emailId}`);
    const msg = {
      to: client.email,
      from: 'noreply@agentum.com',
      text: 'Hello plain world!',
      html: '<p>Hello HTML world!</p>',
      subject: 'Hello World',
      templateId: 'd-3cd3de0b1a7345d384e9662fbd7ebbe1',
      dynamic_template_data: templateData,

      customArgs: { emailId: emailId }
    };
    return sgMail
      .send(msg)
      .then(res => {
        return Email.create({
          id: emailId,
          clientId: client.id,
          agentId: agent.id
        });
      })
      .catch(err => {
        logger.info(`Sendgrid ERROR`, err);
        throw err;
      });
  }
};
