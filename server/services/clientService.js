const { webBaseUrl } = require('../config');

const getClientReferralUrl = (agentId, clientReferralCode) => {
  return `${webBaseUrl}/invite/${clientReferralCode}`;
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
  getProspectDetailUrl,
  generateReferralCode
};
