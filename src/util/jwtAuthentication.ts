import jwt from 'jsonwebtoken'

interface TokenPayload {
  user_id: number
  role: string
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('JWT secrets must be defined in environment variables')
}

export const generateAccessToken = (user_id: number, role: string): string => {
  const payload: TokenPayload = {
    user_id,
    role
  }

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: '15m', // Shorter lifetime for access tokens
    algorithm: 'HS256' // Explicitly specify the algorithm
  })
}

export const generateRefreshToken = (user_id: number, role: string): string => {
  const payload: TokenPayload = {
    user_id,
    role
  }

  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: '7d', // 7 days for refresh token
    algorithm: 'HS256'
  })
}

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload
  } catch (error) {
    throw new Error('Invalid access token')
  }
}

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload
  } catch (error) {
    throw new Error('Invalid refresh token')
  }
}
