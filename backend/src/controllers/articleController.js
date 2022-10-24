import { articleService } from '../services/articleService';

export const articleController = {
  async getArticles(req, res) {
    try {
      const articles = await articleService.getArticles(req);
      res.status(200).json(articles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
