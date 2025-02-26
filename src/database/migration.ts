import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import dotenv from 'dotenv'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { tblRole } from '../schema/role.schema'

dotenv.config()
export const migrationDB = async () => {
  try {
    const client = new Client({
      host: process.env.DB_HOST || '',
      port: 5432,
      user: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || ''
    })

    await client.connect()

    console.log('connect to db success')
    const db = drizzle(client)

    await migrate(db, { migrationsFolder: 'drizzle' })

    const checkRole = await db.select().from(tblRole)
    if (checkRole.length === 0) {
      await db
        .insert(tblRole)
        .values([
          { role_name: 'user' },
          { role_name: 'admin' },
          { role_name: 'super_admin' }
        ])
      console.log('✅ Default roles seeded')
    } else {
      console.log('ℹ️ Roles already exist, skipping seed')
    }
    await client.end()
  } catch (err) {
    console.error('cannot connect to db')
  }
}

migrationDB()
