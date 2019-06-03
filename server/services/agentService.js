module.exports = {
  agentRequiresSetup: agent => {
    return !agent.firstName || !agent.lastName || !agent.businessName || !agent.abn || !agent.phone;
  }
};
