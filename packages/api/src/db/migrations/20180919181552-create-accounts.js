module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      frozen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX accounts_number_idx ON accounts (number) WHERE deleted_at IS NULL'
    );
  },

  down: async queryInterface => {
    await queryInterface.dropTable('accounts');
  },
};
