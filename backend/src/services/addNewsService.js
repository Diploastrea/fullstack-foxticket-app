import { Article } from '../models/Article';

async function validateInput(title, content) {
  if (!title || !content) {
    throw Error('Both fields are required.');
  }
}
async function publishNews(newTitle, newContent) {
  const titleExists = await Article.findAll({
    where: {
      title: newTitle,
    },
  });
  if (titleExists[0]) {
    throw Error('News title already exists.');
  } else {
    await Article.create({ title: newTitle, content: newContent });
  }
}
async function publishedNews(newTitle) {
  const article = await Article.findOne({
    where: {
      title: newTitle,
    },
  });
  return article;
}
export const addNewsData = {
  async addNews(req) {
    const { title, content } = req.body;
    await validateInput(title, content);
    await publishNews(title, content);
    const article = await publishedNews(title);
    return article;
  },
};
