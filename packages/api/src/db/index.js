const Sequelize = require('sequelize');

const config = require('./config');

const models = require('./models');

module.exports = () => {
  const sequelizeConfig = config[process.env.NODE_ENV];

  const client = new Sequelize(
    sequelizeConfig.url,
    sequelizeConfig,
  );

  // Set up models
  Object.keys(models).forEach(name => {
    client.models.name = models[name](client, Sequelize.DataTypes);
  });

  // Set up relations
  Object.values(client.models).forEach(model => {
    if ('associate' in model) {
      model.associate(client.models);
    }
  });

  return client;
};
