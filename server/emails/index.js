const sgMail = require('@sendgrid/mail');
const uuidv4 = require('uuid/v4');
const { MESSAGE_CHANNEL, EMAIL_TYPE } = require('../constants');
const { sendGrid } = require('../config');
const {
  getClientReferralUrl,
  getProspectDetailUrl,
  getMessageLink
} = require('../services/clientService');
const logger = require('../logger');

const { Email } = require('../db');
sgMail.setApiKey(sendGrid.apiKey);

const FROM_EMAIL = 'no-reply@bizrewarder.com.au';
const FROM_NAME = 'Biz Rewarder';
const getFullName = ({firstName, lastName}) => `${firstName} ${lastName}`;

const TEMPLATE_IDS = Object.freeze({
  NEW_GIFT: 'd-5fe940ad2ade4e86b3539bb95136ace5',
  NEW_CLIENT: 'd-3cd3de0b1a7345d384e9662fbd7ebbe1',
  NEW_PROSPECT_TO_AGENT: 'd-c6180b01dff24b8fade2161cf208b564',
  NEW_PROSPECT_TO_CLIENT: 'd-d8c4d75f58da43a697f32f5d3ff53b5f',
  NEW_PROSPECT_TO_PROSPECT: 'd-00046fce544b48fb87f30666435197e2'
});

const createEmailMsg = ({ templateId, templateData, from, to }) => ({
  to: to,
  from: from,
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
  subject: 'Hello World',
  templateId: templateId,
  dynamic_template_data: templateData
});

const sendAndTrackEmail = async (msg, clientId, agentId, emailType, customEmailId) => {
  const emailId = customEmailId || uuidv4().toString();
  const msgWithId = {
    ...msg,
    customArgs: { emailId }
  };

  logger.info(`Sending email with message Id: ${JSON.stringify(msgWithId)}`);

  await sgMail.send(msgWithId);
  return await Email.create({
    id: emailId,
    clientId: clientId,
    agentId: agentId,
    emailType
  });
};

const sendNewGiftEmail = async (agent, client, message, giftValue, giftUrl, emailId) => {
  const msg = createEmailMsg({
    from: {
      email: FROM_EMAIL,
      name: getFullName(agent)
    },
    to: client.email,
    subject: `$${giftValue} gift card for you as a thank you`,
    templateId: TEMPLATE_IDS.NEW_GIFT,
    templateData: {
      agentName: agent.firstName,
      clientName: client.firstName,
      message: message,
      giftValue: giftValue,
      giftUrl: giftUrl
    }
  });

  return await sendAndTrackEmail(msg, client.id, agent.id, EMAIL_TYPE.GIFT_EMAIL, emailId);
};

const sendNewClientEmail = async (agent, client) => {
  const msg = createEmailMsg({
    from: {
      email: FROM_EMAIL,
      name: getFullName(agent)
    },
    to: client.email,
    templateId: TEMPLATE_IDS.NEW_CLIENT,
    templateData: {
      agentName: agent.firstName,
      businessName: agent.businessName,
      clientName: client.firstName,
      clientReferralUrl: getClientReferralUrl(client.referralCode),
      inviteLinkWhatsApp: getMessageLink(client.referralCode, MESSAGE_CHANNEL.WHATSAPP),
      inviteLinkEmail: getMessageLink(client.referralCode, MESSAGE_CHANNEL.EMAIL)
    }
  });

  return await sendAndTrackEmail(msg, client.id, agent.id, EMAIL_TYPE.WELCOME_EMAIL);
};

const sendWelcomeEmailToClients = async (agent, clients) => {
  const personalizations = clients.map(({ email, firstName, referralCode, emailId }) => ({
    to: email,
    customArgs: { emailId },
    dynamic_template_data: {
      agentName: agent.firstName,
      businessName: agent.businessName,
      clientName: firstName,
      clientReferralUrl: getClientReferralUrl(referralCode),
      inviteLinkWhatsApp: getMessageLink(referralCode, MESSAGE_CHANNEL.WHATSAPP),
      inviteLinkEmail: getMessageLink(referralCode, MESSAGE_CHANNEL.EMAIL)
    }
  }));

  const msg = {
    personalizations,
    from: {
      email: FROM_EMAIL,
      name: getFullName(agent)
    },
    subject: 'Will be replaced',
    text: 'Will be replaced',
    html: '<p>Will be replaced</p>',
    templateId: 'd-3cd3de0b1a7345d384e9662fbd7ebbe1'
  };

  await sgMail.send(msg);
}

const sendNewProspectEmail = async (prospect, client, agent) => {
  const emailToAgent = createEmailMsg({
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME
    },
    to: agent.email,
    templateId: TEMPLATE_IDS.NEW_PROSPECT_TO_AGENT,
    templateData: {
      clientName: client.firstName,
      prospectName: prospect.firstName,
      prospectUrl: getProspectDetailUrl(prospect.id)
    }
  });
  await sgMail.send(emailToAgent);

  const emailToClient = createEmailMsg({
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME
    },
    to: client.email,
    templateId: TEMPLATE_IDS.NEW_PROSPECT_TO_CLIENT,
    templateData: {
      prospectName: prospect.firstName,
      agentName: agent.firstName,
      businessName: agent.businessName
    }
  });
  await sgMail.send(emailToClient);

  const emailToProspect = createEmailMsg({
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME
    },
    to: prospect.email,
    templateId: TEMPLATE_IDS.NEW_PROSPECT_TO_PROSPECT,
    templateData: {
      agentName: agent.firstName
    }
  });
  await sgMail.send(emailToProspect);
};

module.exports = {
  sendWelcomeEmailToClients,
  sendNewClientEmail,
  sendNewProspectEmail,
  sendNewGiftEmail
};
