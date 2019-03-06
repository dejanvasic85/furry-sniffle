export const agentRequiresSetup = agent => {
  return !agent.firstName || 
    !agent.lastName || 
    !agent.businessName || 
    !agent.abn ||
    !agent.phone;
}