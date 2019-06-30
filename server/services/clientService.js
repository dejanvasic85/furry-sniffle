const { webBaseUrl } = require('../config');

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

const mapDateToText = ({ deliveredAt, openedAt }) => {
  if (openedAt) {
    return 'Welcome Email Sent and Viewed'
  }

  if (deliveredAt) {
    return 'Welcome Email Sent'
  }

  return 'Welcome Email Sending...'
};

const mapEmailToInteraction = ({ id, deliveredAt, openedAt, createdAt }) => ({
  id,
  description: mapDateToText({ deliveredAt, openedAt }),
  type: 'email',
  date: openedAt || deliveredAt || createdAt
});

const mapProspectToInteraction = ({ id, firstName, lastName, createdAt }) => ({
  id,
  description: `${firstName} ${lastName}`,
  type: 'prospect',
  date: createdAt
});

const mapGiftToInteraction = ({ id, createdAt, value }) => ({
  id,
  description: `Gift - Value $${value / 100}`,
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
