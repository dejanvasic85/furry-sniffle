const { Account, AccountTxn, Agent } = require('../db');
const logger = require('../logger');
const { PAYMENT_METHOD } = require('../constants');

const debit = async ({ accountId, amount, description }) => {
  const account = await Account.findOne({ where: { id: accountId } });
  const amountToDeduct = -Number(amount);
  logger.info(`Deducting amount ${amountToDeduct}`);

  await AccountTxn.create({
    accountId,
    description,
    amount: amountToDeduct,
    fee: 0,
    totalAmount: amountToDeduct,
    paymentMethod: PAYMENT_METHOD.ACCOUNT
  });

  await account.update({
    balance: account.balance - amount,
    availableFunds: account.availableFunds - amount
  });
};

const updateOrCreateAccount = async ({ agentId, accountId, amount }) => {
  if (!accountId) {
    const account = await Account.create({ balance: amount, availableFunds: 0 });
    logger.info(`Update agent Id ${agentId} with accountId ${account.id}`);

    const [recordsAffected, agent] = await Agent.update(
      { accountId: account.id },
      { where: { id: agentId }, returning: true }
    );

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

const createTransaction = async ({
  accountId,
  description,
  paymentMethod,
  paymentReference,
  total,
  fee,
  amount
}) => {
  return await AccountTxn.create({
    accountId,
    description,
    paymentReference,
    paymentMethod,
    amount,
    fee,
    totalAmount: total
  });
};

module.exports = {
  createTransaction,
  updateOrCreateAccount,
  debit
};
