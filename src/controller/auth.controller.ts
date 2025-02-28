import { and, eq, or } from 'drizzle-orm'
import { tblUser, tblUserInfo } from '../schema/user.schema'
import { getDBclient } from '../database/connection'
import bcrypt from 'bcrypt'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { setAuthTokens, setCookie } from '../util/cookieStore'
import { Response } from 'express'
import {
  generateAccessToken,
  generateRefreshToken
} from '../util/jwtAuthentication'
import { tblRole } from '../schema/role.schema'

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
        success: false,
        message: 'User already existed, pls try another username and email !!!'
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
        success: true,
        message: 'Registered successful!!!',
        user: {
          id: rsUser[0].id,
          username: rsUser[0].username,
          full_name: rsUserInfo[0].full_name,
          email: rsUserInfo[0].email,
          age: rsUserInfo[0].age,
          gender: rsUserInfo[0].gender
        }
      }
    }
  } catch (error) {
    console.log('error: ', error)
    return {
      success: false,
      message: 'An error occurred during register',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const checkUserLogin = async ({
  username,
  password,
  response
}: {
  username: string
  password: string
  response: Response
}) => {
  try {
    const checkUser = await db
      .select({
        id: tblUser.id,
        username: tblUser.username,
        password: tblUser.password,
        full_name: tblUserInfo.full_name,
        email: tblUserInfo.email,
        age: tblUserInfo.age,
        role_name: tblRole.role_name,
        gender: tblUserInfo.gender
      })
      .from(tblUser)
      .innerJoin(tblUserInfo, eq(tblUser.id, tblUserInfo.user_id))
      .innerJoin(tblRole, eq(tblRole.id, tblUser.role_id))
      .where(
        or(eq(tblUser.username, username), eq(tblUserInfo.email, username))
      )

    if (checkUser.length <= 0 && !checkUser) {
      return {
        success: false,
        message: `User ${username} can not be found !!!`
      }
    }

    const isValidPassword = await bcrypt.compare(
      password,
      checkUser[0].password
    )

    if (!isValidPassword) {
      return {
        success: false,
        message: 'Invalid password'
      }
    }

    const accessToken = generateAccessToken(
      checkUser[0].id,
      checkUser[0].role_name
    )

    const refreshToken = generateRefreshToken(
      checkUser[0].id,
      checkUser[0].role_name
    )

    setAuthTokens(response, { accessToken, refreshToken })

    const { password: _, ...userInformation } = checkUser[0]

    return {
      success: true,
      message: 'Login successful',
      user: userInformation
    }
  } catch (error) {
    console.log('error: ', error)
    return {
      success: false,
      message: 'An error occurred during login',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
