module.exports = (client, DataTypes) => {
  const users = client.define(
    'users',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );

  users.associate = models => {
    users.hasMany(models.accounts, { foreignKey: 'userId' });
  };

  return users;
};
