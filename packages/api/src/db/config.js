require('../dotenv');

const defaultOpts = {
  dialect: 'postgres',
  migrationStorageTableName: 'sequelize_migrations',
  url: process.env.DATABASE_URL,
  logging: false,
  define: {
    underscored: true,
  },
};

module.exports = {
  development: defaultOpts,
  test: Object.assign({}, defaultOpts, {
    url: process.env.TEST_DATABASE_URL,
  }),
  production: Object.assign({}, defaultOpts, {
    ssl: true,
  }),
};
