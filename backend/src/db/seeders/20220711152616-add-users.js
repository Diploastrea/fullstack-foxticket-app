module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'user1',
        email: 'user1@example.com',
        password:
          '$2a$10$oPkv6gkGZVJ/YjO1/sFKxuKdRblgvT1iMluSn9sn.MgfHtjDXGkOq',
        isAdmin: 0,
      },
      {
        name: 'user2',
        email: 'user2@example.com',
        password:
          '$2a$10$Ac77ODYOKWUw5CJnAx1xA.217A7ovc5lkA8Pnv7JLB77EwzymV.tO',
        isAdmin: 0,
      },
      {
        name: 'user3',
        email: 'user3@example.com',
        password:
          '$2a$10$IKxnHNKoPe5HE7U065nb6.T8Sphl8d2VzyISbVWgQFudMG6MJmLxC',
        isAdmin: 0,
      },
      {
        name: 'admin',
        email: 'admin@admin.com',
        password:
          '$2a$10$XPcuaqW5f7B22OwS66xpB.laWPwJMjG/18ZKqIQt6JWrGjWtrCCBa',
        isAdmin: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const { Op } = Sequelize;
    await queryInterface.bulkDelete('users', { id: { [Op.in]: [1, 2, 3, 4] } }, {});
  },
};
