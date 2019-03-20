const { webBaseUrl } = require('../config');

const getClientReferralUrl = (agentId, clientReferralCode) => {
  return `${webBaseUrl}/invite/${agentId}/code/${clientReferralCode}`;
};

const getProspectDetailUrl = (prospectId) => {
  return `${webBaseUrl}/app/prospects/${prospectId}`;
};

const generateReferralCode = ({ email }) => {
  const referralEmailPrefix = email.substring(
    0,
    email.indexOf('@')
  );
  const randomNumber = Math.floor(Math.random() * Math.floor(999));
  return `${referralEmailPrefix}-${randomNumber}`;
}

module.exports = {
  getClientReferralUrl,
  getProspectDetailUrl,
  generateReferralCode
};
