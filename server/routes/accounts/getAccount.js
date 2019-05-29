const { Account } = require('../../db');

module.exports = async (req, res) => {
  const { accountId } = req.agent;

  if (!accountId) {
    res.json({ balance: 0, availableFunds: 0})
    return;
  }

  const account = await Account.findOne({
    where: { id: accountId }
  });

  res.json({
    account
  });
};
