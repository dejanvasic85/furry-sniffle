const logger = require('../../logger');
const { Client } = require('../../db');

module.exports = async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'missing body' });
    return;
  }

  const id = req.params.id;
  const { firstName, lastName, phone, email } = req.body;

  logger.info(`Updating client ${id}`);

  const [recordsAffected, result] = await Client.update(
    { firstName, lastName, phone, email },
    {
      where: { id },
      returning: true
    }
  );

  res.json({ client: result });
};
