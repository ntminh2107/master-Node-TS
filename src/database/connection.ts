import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Client } from "pg";

let dbClient: NodePgDatabase | null = null;

export const getDBclient = () => {
  if (dbClient === null) return console.log("can not connect to database");
  return dbClient;
};

export const connectionDB = async () => {
  try {
    const client = new Client({
      host: process.env.DB_HOST || "",
      port: 5432,
      user: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "",
    });
    await client.connect();
    console.log("=== CONNECT TO DB SUCCESS ===");
    dbClient = drizzle(client);
  } catch (err) {
    console.error(err);
  }
};
