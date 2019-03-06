const { sendGrid } = require('../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendGrid.apiKey);

const msg = {
  to: 'dejanvasic24@gmail.com',
  from: 'support@agento.com',
  subject: 'You have an invitation',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
  templateId: 'd-3cd3de0b1a7345d384e9662fbd7ebbe1',
  dynamic_template_data: {
    agentName: 'Alex',
    agentRewardsUrl: 'http://google.com.au',
    clientName: 'FooBar',
    clientReferralUrl: 'http://google.com.au'
  },
};

module.exports = {
  newClient: () => {
    return sgMail.send(msg);
  }
};