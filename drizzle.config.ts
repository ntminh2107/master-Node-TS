import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: './src/schema',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST ?? '',
    port: Number(process.env.DB_PORT ?? 0),
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? '',
    ssl: false
  },
  verbose: true,
  strict: true
})
