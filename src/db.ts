import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";


dotenv.config();
const pool: Pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  password: process.env.DB_PASS,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

export interface QueryFunction {
  (text: string, params?: any[]): Promise<QueryResult<any>>;
}

const query: QueryFunction = async (text, params) => {
  return await pool.query(text, params);
};

export default query;
