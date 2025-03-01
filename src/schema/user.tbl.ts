import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { tblRole } from './role.tbl'

export const tblUser = pgTable('user', {
  id: serial().primaryKey(),
  username: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  role_id: integer().references(() => tblRole.id)
})

export const tblUserInfo = pgTable('user_info', {
  id: integer().primaryKey(),
  user_id: integer().references(() => tblUser.id),
  full_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  age: integer(),
  gender: varchar({ length: 255 })
})

export const tblUserAddress = pgTable('user_address', {
  id: integer().primaryKey(),
  user_id: integer().references(() => tblUser.id),
  zip_code: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 255 }),
  country: varchar({ length: 255 })
})
