module.exports = (client, DataTypes) => {
  const accounts = client.define(
    'accounts',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      frozen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    {
      paranoid: true,
    }
  );

  accounts.associate = models => {
    accounts.belongsTo(models.users, { foreignKey: 'userId' });
  };

  accounts.findByNumberAndPin = (number, pin) =>
    accounts.findOne({
      where: { number, pin },
      include: {
        model: client.models.users,
        as: 'user',
      },
    });

  return accounts;
};
