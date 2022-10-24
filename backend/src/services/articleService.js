import { Article } from '../models/Article';

export const articleService = {
  async getArticles(req) {
    const { number } = req.params;
    const articles = await Article.findAll({
      limit: parseInt(number, 10),
      order: [
        ['id', 'DESC'],
      ],
    });
    if (articles.length === 0) {
      throw Error('There is no available article.');
    }
    return articles;
  },
};
