import { User } from '../type/user'
import jwt from 'jsonwebtoken'
const access_token = process.env.ACCESS_TOKEN_SECRET || ''
const refresh_token = process.env.REFRESH_TOKEN_SECRET || ''

export const generateAccessToken = (user_id: number, role: string) => {
  const payload = { user_id: user_id, role: role }
  return jwt.sign(payload, access_token, { expiresIn: '1h' })
}

export const generateRefreshToken = (user_id: number, role: string) => {
  const payload = { user_id: user_id, role: role }
  return jwt.sign(payload, refresh_token, { expiresIn: '1w' })
}
