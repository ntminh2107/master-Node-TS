import { Role } from './auth'

export interface User {
  id: number
  username: string
  password: string
  role: Role
  information: UserInfo
  address: UserAddress
}

export interface UserInfo {
  id: number
  user_id: number
  full_name: string
  email: string
  age: number
  gender: string
}

export interface UserAddress {
  id: number
  user_id: number
  zip_code: string
  city: string
  country: string
}
