export interface CookieOptions {
  httpOnly: boolean
  secure: boolean
  sameSite: boolean | 'lax' | 'strict' | 'none'
  domain?: string
  path?: string
}
