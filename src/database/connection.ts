import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

let dbClient: NodePgDatabase | null = null

export const connectionDB = async () => {
  try {
    const client = new Client({
      host: process.env.DB_HOST || '',
      port: 5432,
      user: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || ''
    })
    await client.connect()
    console.log('=== CONNECT TO DB SUCCESS ===')
    dbClient = drizzle(client)
  } catch (err) {
    console.error(err)
  }
}

export const getDBclient = () => {
  if (dbClient === null) {
    throw new Error('Database connection not initialized')
  }
  return dbClient
}
