import { Response } from 'express'
import { CookieOptions } from '../type/cookie'

const defaultOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/'
}

const tokenOptions = {
  access: {
    ...defaultOptions,
    maxAge: 60 * 1000 // 15 minutes
  },
  refresh: {
    ...defaultOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}

export const setAuthTokens = (
  res: Response,
  { accessToken, refreshToken }: { accessToken: string; refreshToken: string }
): void => {
  setCookie(res, 'accessToken', accessToken, tokenOptions.access)
  setCookie(res, 'refreshToken', refreshToken, tokenOptions.refresh)
}

export const clearAuthTokens = (res: Response): void => {
  clearCookie(res, 'accessToken')
  clearCookie(res, 'refreshToken')
}

export const setCookie = (
  res: Response,
  name: string,
  value: string,
  options: Partial<CookieOptions> = {}
): void => {
  const cookieOptions = {
    ...defaultOptions,
    ...options
  }

  res.cookie(name, value, cookieOptions)
}

export const clearCookie = (
  res: Response,
  name: string,
  options: Partial<CookieOptions> = {}
): void => {
  const cookieOptions = {
    ...defaultOptions,
    ...options
  }

  res.clearCookie(name, cookieOptions)
}
