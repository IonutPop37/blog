const Article = require('../../models/Article');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, author } = req.body;

    try {
      const article = await Article.create({ title, description, author });
      res.status(200).json(article);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert article' });
    }
  } else if (req.method === 'GET') {
    try {
      const articles = await Article.findAll();
      res.status(200).json(articles);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch articles' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
