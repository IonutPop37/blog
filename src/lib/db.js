import { Pool } from 'pg';

const pool = new Pool({
  user: 'root',
  host: '92.118.159.12',
  database: 'blog',
  password: '',
  port: 26257,
  ssl: false,
});

export default pool;