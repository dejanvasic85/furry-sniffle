const sgMail = require('@sendgrid/mail');
const uuidv4 = require('uuid/v4');
const { webBaseUrl, sendGrid } = require('../config');
const { getClientReferralUrl, getProspectDetailUrl } = require('../services/clientService');
const logger = require('../logger');

const { Email } = require('../db');
sgMail.setApiKey(sendGrid.apiKey);

const FROM_EMAIL = 'no-reply@foxrewarder.com';
const TEMPLATE_IDS = Object.freeze({
  NEW_CLIENT: 'd-3cd3de0b1a7345d384e9662fbd7ebbe1',
  NEW_PROSPECT_TO_AGENT: 'd-c6180b01dff24b8fade2161cf208b564',
  NEW_PROSPECT_TO_CLIENT: 'd-d8c4d75f58da43a697f32f5d3ff53b5f',
  NEW_PROSPECT_TO_PROSPECT: 'd-00046fce544b48fb87f30666435197e2'
});

const createEmailMsg = ({ templateId, templateData, to }) => ({
  to: to,
  from: FROM_EMAIL,
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
  subject: 'Hello World',
  templateId: templateId,
  dynamic_template_data: templateData
});

const sendAndTrackEmail = async (msg, clientId, agentId) => {
  const emailId = uuidv4();
  const msgWithId = { ...msg, customArgs: { emailId: emailId } };

  logger.info(`Sending email ${msgWithId}`);

  await sgMail.send(msg);
  return await Email.create({
    id: emailId,
    clientId: clientId,
    agentId: agentId
  });
};

const sendNewClientEmail = async (agent, client) => {
  const msg = createEmailMsg({
    to: client.email,
    templateId: TEMPLATE_IDS.NEW_CLIENT,
    templateData: {
      agentName: agent.firstName,
      clientName: client.firstName,
      clientReferralUrl: getClientReferralUrl(agent.id, client.referralCode)
    }
  });

  return await sendAndTrackEmail(msg, client.id, agent.id);
};

const sendNewProspectEmail = async (prospect, client, agent) => {
  const emailToAgent = createEmailMsg({
    to: agent.email,
    templateId: TEMPLATE_IDS.NEW_PROSPECT_TO_AGENT,
    templateData: {
      clientName: client.firstName,
      prospectName: prospect.firstName,
      prospectDetailUrl: getProspectDetailUrl(prospect.id)
    }
  });
  await sgMail.send(emailToAgent);
  
  const emailToClient = createEmailMsg({
    to: client.email,
    templateId: TEMPLATE_IDS.NEW_PROSPECT_TO_CLIENT,
    templateData: {
      prospectName: prospect.firstName,
      agentName: agent.firstName
    }
  });
  await sgMail.send(emailToClient);

  const emailToProspect = createEmailMsg({
    to: prospect.email,
    templateId: TEMPLATE_IDS.NEW_PROSPECT_TO_PROSPECT,
    templateData: {
      agentName: agent.firstName
    }
  });
  await sgMail.send(emailToProspect);
};

module.exports = {
  sendNewClientEmail,
  sendNewProspectEmail
};
