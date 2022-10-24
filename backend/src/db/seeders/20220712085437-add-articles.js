module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('articles', [
      {
        title: 'Travel Makes You Smarter',
        content: `As you take in the sights, smells, and sensations of a new destination, you’re doing more than making memories. Travel experiences are known to prompt your brain to think differently and more creatively too!
        You’re also creating new neural pathways, which can help refine your problem-solving and reasoning skills.`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Travel Can Strengthen Your Heart',
        content: `When you carry extra tension around, it negatively affects more than your mental health.
        That stress can also take its toll on your heart, making you more prone to cardiovascular incidents. In fact, researchers found that men who skip an annual vacation have a 30% greater chance of suffering a heart attack.
        The good news? Vacations can help lower that risk! One study found that after only a day or two away, nearly 90% of people reported lower stress levels.`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Tourism Keeps the Economy Churning',
        content: `Did you know that one in 9 American jobs depend on tourism? In the U.K., the travel industry alone offers nearly four million jobs. 
        The next time you book a trip, keep this fun travel trivia in mind and know you’re contributing to your local economy!`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const { Op } = Sequelize;
    await queryInterface.bulkDelete('articles', { id: { [Op.in]: [1, 2, 3] } }, {});
  },
};
