import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const tblRole = pgTable('role', {
  id: serial().primaryKey(),
  role_name: varchar({ length: 255 }).notNull()
})
