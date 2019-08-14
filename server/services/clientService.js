const  { webBaseUrl }  = require('../envConfig');

const { EMAIL_TYPE } = require('../constants');
const { mapGiftPayStatus } = require('./giftService');

const getClientReferralUrl = clientReferralCode => {
  return `${webBaseUrl}/invite/${clientReferralCode}`;
};

const getMessageLink = (clientReferralCode, channelType) => {
  return `${webBaseUrl}/message?referralCode=${clientReferralCode}&channel=${channelType}`;
};

const getProspectDetailUrl = prospectId => {
  return `${webBaseUrl}/app/prospects/${prospectId}`;
};

const generateReferralCode = ({ firstName, id }) => {
  return `${firstName.toLowerCase()}-${id}`;
};

const mapDateToText = ({ deliveredAt, openedAt, emailType }) => {
  const prefix = emailType == EMAIL_TYPE.GIFT_EMAIL
    ? 'Gift Email'
    : 'Welcome Email';

  if (openedAt) {
    return `${prefix} Sent and Viewed`
  }

  if (deliveredAt) {
    return `${prefix} Sent`
  }

  return `${prefix} Sending...`
};

const mapEmailToInteraction = ({ id, deliveredAt, openedAt, createdAt, emailType }) => ({
  id,
  description: mapDateToText({ deliveredAt, openedAt, emailType }),
  type: 'email',
  date: openedAt || deliveredAt || createdAt
});

const mapProspectToInteraction = ({ id, firstName, lastName, createdAt }) => ({
  id,
  description: `${firstName} ${lastName}`,
  type: 'prospect',
  date: createdAt
});

const mapGiftToInteraction = ({ id, createdAt, giftpayStatus, value }) => ({
  id,
  description: `Gift - Value $${value / 100} [status: ${mapGiftPayStatus(giftpayStatus)}]`,
  type: 'gift',
  date: createdAt
});

const createInteractions = ({ emails, prospects, gifts }) => {
  return [
    ...emails.map(mapEmailToInteraction),
    ...prospects.map(mapProspectToInteraction),
    ...gifts.map(mapGiftToInteraction)
  ].sort((a, b) => b.date - a.date);
};

module.exports = {
  createInteractions,
  getClientReferralUrl,
  getMessageLink,
  getProspectDetailUrl,
  generateReferralCode  
};
