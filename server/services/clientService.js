const { webBaseUrl } = require('../config');

const getClientReferralUrl = (clientReferralCode) => {
  return `${webBaseUrl}/invite/${clientReferralCode}`;
};

const getMessageLink = (clientReferralCode, channelType) => {
  return `${webBaseUrl}/message?referralCode=${clientReferralCode}&channel=${channelType}`;
};

const getProspectDetailUrl = (prospectId) => {
  return `${webBaseUrl}/app/prospects/${prospectId}`;
};

const generateReferralCode = client => {
  return Object.assign({}, client, {
    referralCode: `${client.firstName.toLowerCase()}-${client.id}`
  });
}

module.exports = {
  getClientReferralUrl,
  getMessageLink,
  getProspectDetailUrl,
  generateReferralCode
};
