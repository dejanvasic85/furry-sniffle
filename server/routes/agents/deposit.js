const { stripeConfig } = require('../../config');
const logger = require('../../logger');
const stripe = require("stripe")(stripeConfig.secret);

const deposit = async (req, res) => {
  try {
    const { amount, stripeToken } = req.body;
    const { agentId, firstName, lastName } = req.agent;

    logger.info(`Depositing money using stripe for Agent ${agentId}`);
    const { status } = await stripe.charges.create({
      amount: amount,
      currency: 'aud',
      description: `Agent Deposit by ${firstName} ${lastName}`,
      source: stripeToken
    });

    res.json({ status });
  } catch (err) {
    logger.error(`Stripe Payment failed. Request ${JSON.stringify(req.body)}`);
    logger.error(err);
    throw err;
  }
};

module.exports = deposit;