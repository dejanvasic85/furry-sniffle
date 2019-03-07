const { webBaseUrl } = require('../config');

const getClientReferralUrl = (agentId, clientReferralCode) => {
  return `${webBaseUrl}/refer/${agentId}/code/${clientReferralCode}`;
};

module.exports = {
  getClientReferralUrl
};