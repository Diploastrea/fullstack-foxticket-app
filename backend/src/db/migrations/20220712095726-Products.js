module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: false,
      },
      price: {
        type: Sequelize.INTEGER,
        unique: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        unique: false,
      },
      description: {
        type: Sequelize.STRING,
        unique: false,
      },
      type: {
        type: Sequelize.STRING,
        unique: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('products');
  },
};
