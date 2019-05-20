
module.exports = (sequelize, type) => {
  const Prospect =  sequelize.define(
    'Prospect',
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

  Prospect.associate = function (models) {
    models.Prospect.belongsTo(models.Client, {
      foreignKey: "clientId"
    });
  };

  return Prospect;
};

