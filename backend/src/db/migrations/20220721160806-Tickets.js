module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tickets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      status: {
        type: Sequelize.STRING,
      },
      paidDate: {
        type: Sequelize.DATE,
      },
      expirationDate: {
        type: Sequelize.DATE,
      },
      productName: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tickets');
  },
};
