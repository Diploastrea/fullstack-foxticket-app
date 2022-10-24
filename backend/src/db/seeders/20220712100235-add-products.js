module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Day ticket',
        price: '360',
        duration: '24',
        description: 'You can use this ticket for a whole day!',
        type: 'ticket',
      },
      {
        name: '2 Day ticket',
        price: '660',
        duration: '48',
        description: 'You can use this ticket for whole 2 days!',
        type: 'ticket',
      },
      {
        name: '1 Day pass',
        price: '460',
        duration: '24',
        description: 'You can use this pass for a whole day!',
        type: 'pass',
      },
      {
        name: '3 Day pass',
        price: '960',
        duration: '72',
        description: 'You can use this pass for whole 3 days!',
        type: 'pass',
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    const { Op } = Sequelize;
    await queryInterface.bulkDelete('products', { id: { [Op.in]: [1, 2, 3, 4] } });
  },
};
