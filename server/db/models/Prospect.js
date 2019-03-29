module.exports = (sequelize, type) => {
  return sequelize.define(
    'Prospects',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      agentId: {
        type: type.INTEGER,
        references: {
          model: 'Agents',
          id: 'id'
        },
        allowNull: false
      },
      clientId: {
        type: type.INTEGER,
        references: {
          model: 'Clients',
          id: 'id'
        },
        allowNull: false
      },
      status: {
        // dv: E.g. MeetingPending not sure how to do types
        type: type.STRING,
        allowNull: false
      },
      firstName: {
        type: type.STRING,
        allowNull: false
      },
      lastName: {
        type: type.STRING,
        allowNull: false
      },
      email: {
        type: type.STRING,
        allowNull: false
      },
      phone: type.STRING,
      message: type.STRING,
      createdAt: type.DATE,
      updatedAt: type.DATE
    },
    {}
  );
};
