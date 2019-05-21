const { feeConfiguration, stripeConfig } = require('../../config');
const stripe = require('stripe')(stripeConfig.secret);
const logger = require('../../logger');
const { Account, AccountTxn, Agent } = require('../../db');
const { calculateFee } = require('../../services/feeCalculator');

const STRIPE_CONSTANTS = Object.freeze({
  STATUS: {
    SUCCEEDED: 'succeeded'
  }
});

const updateOrCreateAccount = async ({ agentId, accountId, amount }) => {
  if (!accountId) {
    const account = await Account.create({ balance: amount, availableFunds: 0 });
    await Agent.update(
      { accountId: account.id }, 
      { where: { id: agentId } });

    return account;
  } else {
    const account = await Account.findOne({ where: { id: accountId }});
    const balance = account.balance + amount;
    account.update({ balance });
    
    return account;
  }
};

const calculateDepositFee = () => {
  return 1;
};

const deposit = async (req, res) => {
  try {
    const { amount, stripeToken } = req.body;
    const { agentId, accountId, firstName, lastName } = req.agent;

    if (amount <= 0) {
      res.json({ error: 'The amount must be greater than zero.' });
      return;
    }

    logger.info(`Depositing money using stripe for Agent ${agentId}`);

    const amountWithFee = calculateFee(amount, ...feeConfiguration);

    const { id, status } = await stripe.charges.create({
      amount: amountWithFee.total,
      currency: 'aud',
      description: `Agent Deposit by ${firstName} ${lastName}`,
      source: stripeToken
    });

    if (status !== STRIPE_CONSTANTS.STATUS.SUCCEEDED) {
      res.json({ error: 'Stripe failed to process payment. Check stripe logs.' });
      return;
    }

    updateOrCreateAccount({ agentId, accountId, amount });

    res.json({ status });

  } catch (err) {
    logger.error(`Stripe Payment failed. Request ${JSON.stringify(req.body)}`);
    logger.error(err);
    throw err;
  }
};

module.exports = deposit;