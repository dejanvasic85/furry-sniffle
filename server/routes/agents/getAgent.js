const { Agent } = require('../../db');

const getAgent = async (req, res) => {
  const agent = await Agent.findOne({
    where: { userAuthId: req.user.sub }
  });

  res.json(agent);
};

module.exports = getAgent;