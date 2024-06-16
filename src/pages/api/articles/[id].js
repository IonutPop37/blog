const Article = require('../../../models/Article');

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const article = await Article.findByPk(id);
      if (!article) {
        res.status(404).json({ error: 'Article not found' });
      } else {
        res.status(200).json(article);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch article' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const article = await Article.findByPk(id);
      if (!article) {
        res.status(404).json({ error: 'Article not found' });
      } else {
        await article.destroy();
        res.status(200).json({ message: 'Article deleted successfully' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete article' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
