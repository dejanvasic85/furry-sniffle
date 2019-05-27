const { Account } = require('../../db');

module.exports = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404);
    return;
  }

  const account = await Account.findOne({
    where: { id }
  });

  res.json({
    account
  });
};
