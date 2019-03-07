const sgMail = require('@sendgrid/mail');

const { webBaseUrl, sendGrid } = require('../config');
const { getClientReferralUrl } = require('../services/clientService');

sgMail.setApiKey(sendGrid.apiKey);

module.exports = {
  newClient: (agent, client) => {
    const msg = {
      to: client.email,
      templateId: 'd-3cd3de0b1a7345d384e9662fbd7ebbe1',
      dynamic_template_data: {
        agentName: agent.firstName,
        // Todo - not sure whether we need to send this right now
        agentRewardsUrl: `${webBaseUrl}/agent/${agent.id}`,
        clientName: client.firstName,
        clientReferralUrl: getClientReferralUrl(agent.id, client.referralCode)
      }
    }
    return sgMail.send(msg);
  }
};