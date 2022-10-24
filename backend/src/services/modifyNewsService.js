import { Article } from '../models/Article';

async function deleteById(newsId) {
  await Article.destroy({
    where: {
      id: newsId,
    },
  });
}
export const deleteNewsData = {
  async deleteNews(req) {
    const { id } = req.params;
    await deleteById(id);
  },
};
async function validateInput(title, content) {
  if (!title || !content) {
    throw Error('Both fields are required.');
  }
}
async function modifyNews(newsId, newTitle, newContent) {
  await Article.upsert({ id: newsId, title: newTitle, content: newContent });
}
async function modifiedNews(id) {
  const article = await Article.findByPk(id);
  return article;
}
export const modifyNewsData = {
  async modifyNews(req) {
    const { title, content } = req.body;
    const { id } = req.params;
    await validateInput(title, content);
    await modifyNews(id, title, content);
    const article = await modifiedNews(id);
    return article;
  },
};
