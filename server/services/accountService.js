const { Account, AccountTxn, Agent } = require('../db');
const logger = require('../logger');

const updateOrCreateAccount = async ({ agentId, accountId, amount }) => {
  if (!accountId) {
    const account = await Account.create({ balance: amount, availableFunds: 0 });
    logger.info(`Update agent Id ${agentId} with accountId ${account.id}`);
    
    const [recordsAffected, agent] = await Agent.update(
      { accountId: account.id },
      { where: { id: agentId }, returning: true });

    if (recordsAffected === 0) {
      throw new Error(`Boom, could not update agent. ${recordsAffected} ${agent}`);
    }

    return account;
  } else {
    const account = await Account.findOne({ where: { id: accountId } });
    const balance = Number(account.balance) + Number(amount);
    account.update({ balance });

    return account;
  }
};

const createTransaction = async({ accountId, description, paymentMethod, paymentReference, total, fee, amount }) => {
  return await AccountTxn.create({ 
    accountId,
    description,
    paymentReference,
    amount,
    fee, 
    totalAmount: total
  });
};

module.exports = {
  createTransaction,
  updateOrCreateAccount
};