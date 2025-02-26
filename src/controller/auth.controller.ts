import { getDBclient } from '../database/connection'

const db = getDBclient()

export const addNewUser = ({
  username,
  password,
  full_name,
  gender,
  email
}: {
  username: string
  password: string
  full_name: string
  email: string
  gender: string
}) => {}
