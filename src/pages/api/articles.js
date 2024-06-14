import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, author } = req.body;

    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO article (title, description, autor) VALUES ($1, $2, $3) RETURNING *',
        [title, description, author]
      );
      client.release();
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert article' });
    }
  } else if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM article');
      client.release();
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch articles' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      const client = await pool.connect();
      const result = await client.query('DELETE FROM article WHERE id = $1 RETURNING *', [id]);
      client.release();

      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Article not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete article' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
