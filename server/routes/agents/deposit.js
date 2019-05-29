const { feeConfiguration, stripeConfig } = require('../../config');
const stripe = require('stripe')(stripeConfig.secret);
const logger = require('../../logger');
const { calculateFee } = require('../../services/feeCalculator');
const { updateOrCreateAccount, createTransaction } = require('../../services/accountService');
const { STRIPE, PAYMENT_METHOD } = require('../../constants');

const calculateDepositFee = () => {
  return 1;
};

const deposit = async (req, res) => {
  try {
    const { amount, stripeToken } = req.body;
    const { id: agentId, accountId, firstName, lastName } = req.agent;

    if (amount <= 0) {
      res.json({ error: 'The amount must be greater than zero.' });
      return;
    }

    logger.info(`Depositing money using stripe for Agent ${agentId}`);

    const amountWithFee = calculateFee(amount, feeConfiguration);

    const { id, status } = await stripe.charges.create({
      amount: amountWithFee.total,
      currency: 'aud',
      description: `Agent Deposit by ${firstName} ${lastName}`,
      source: stripeToken
    });

    if (status !== STRIPE.STATUS.SUCCEEDED) {
      res.json({ error: 'Stripe failed to process payment. Check stripe logs.' });
      return;
    }

    const account = await updateOrCreateAccount({ agentId, accountId, amount });
    const txn = await createTransaction({
      accountId: account.id,
      description: 'Credit Card via Stripe',
      paymentMethod: PAYMENT_METHOD.CREDIT_CARD,
      paymentReference: id,
      ...amountWithFee
    });

    res.json({ status, account });

  } catch (err) {
    logger.error(`Stripe Payment failed. Request ${JSON.stringify(req.body)}`);
    logger.error(err);
    throw err;
  }
};

module.exports = deposit;