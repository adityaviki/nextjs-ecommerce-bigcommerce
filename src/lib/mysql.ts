import { createPool, PoolOptions } from "mysql2";
import { promisify } from "util";
import { SessionProps, StoreData } from "../types";

const MYSQL_CONFIG: PoolOptions = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  ...(process.env.MYSQL_PORT && { port: Number(process.env.MYSQL_PORT) }),
};

const pool = createPool(MYSQL_CONFIG);
const db = pool.promise();

export async function setUser({ user }: SessionProps) {
  if (!user) return null;

  const { email, id, username } = user;
  const userData = {
    email,
    userId: id,
    username,
  };
  return await db.query("REPLACE INTO users SET ?", userData);
}
