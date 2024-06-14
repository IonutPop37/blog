import pool from '../../lib/db';

export default async function handler(req, res) {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    res.status(200).json({ success: true, message: 'Connected to the database successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to connect to the database', error: err.message });
  }
}
