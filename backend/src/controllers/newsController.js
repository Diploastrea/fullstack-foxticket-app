import { addNewsData, deleteNewsData, modifyNewsData } from '../services';

export const newsController = {
  async addNews(req, res) {
    try {
      const addedData = await addNewsData.addNews(req);
      res.status(200).json(addedData);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  async modifyNews(req, res) {
    try {
      const addedData = await modifyNewsData.modifyNews(req);
      res.status(200).json(addedData);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  async deleteNews(req, res) {
    try {
      await deleteNewsData.deleteNews(req);
      res.status(200).send({ message: 'Article deleted.' });
    } catch (err) {
      res.status(500).send({ error: 'Database error' });
    }
  },
};
