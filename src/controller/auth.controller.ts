import { and, eq } from 'drizzle-orm'
import { tblUser, tblUserInfo } from '../schema/user.tbl'
import { getDBclient } from '../database/connection'
import bcrypt from 'bcrypt'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'

let db: NodePgDatabase

// Initialize function to be called after database connection
export const initializeController = async (dbClient: NodePgDatabase) => {
  db = dbClient
}

export const addNewUser = async ({
  username,
  password,
  full_name,
  gender,
  email,
  age
}: {
  username: string
  password: string
  full_name: string
  email: string
  gender: string
  age: number
}) => {
  try {
    const checkUser = await db
      .select()
      .from(tblUser)
      .innerJoin(tblUserInfo, eq(tblUserInfo.user_id, tblUser.id))
      .where(and(eq(tblUser.username, username), eq(tblUserInfo.email, email)))
    if (checkUser.length > 0) {
      return {
        message: 'username or email already exist, please try again'
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const rsUser = await db
        .insert(tblUser)
        .values({
          username: username,
          password: hashedPassword,
          role_id: 1
        })
        .returning({
          id: tblUser.id,
          username: tblUser.username
        })
      const rsUserInfo = await db
        .insert(tblUserInfo)
        .values({
          user_id: rsUser[0].id,
          full_name: full_name,
          email: email,
          age: age,
          gender: gender
        })
        .returning({
          user_id: tblUserInfo.user_id,
          full_name: tblUserInfo.full_name,
          email: tblUserInfo.email,
          age: tblUserInfo.age,
          gender: tblUserInfo.gender
        })

      return {
        id: rsUser[0].id,
        username: rsUser[0].username,
        full_name: rsUserInfo[0].full_name,
        email: rsUserInfo[0].email,
        age: rsUserInfo[0].age,
        gender: rsUserInfo[0].gender
      }
    }
  } catch (error) {
    console.log('error: ', error)
  }
}

export const checkUser = async ({
  username,
  password
}: {
  username: string
  password: string
}) => {}
