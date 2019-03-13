const { webBaseUrl } = require('../config');

const getClientReferralUrl = (agentId, clientReferralCode) => {
  return `${webBaseUrl}/invite/${agentId}/code/${clientReferralCode}`;
};

module.exports = {
  getClientReferralUrl
};