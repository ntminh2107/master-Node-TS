import { Request, Response } from 'express'
import { HttpStatusCode } from '../util/httpStatusCode'
import { addNewUser, checkUserLogin } from '../controller/auth.controller'

export const registerService = async (req: Request, res: Response) => {
  try {
    const { username, password, full_name, gender, email, age } = req.body
    const rs = await addNewUser({
      username: username,
      password: password,
      full_name: full_name,
      gender: gender,
      email: email,
      age: age
    })
    if (rs.success === false) {
      return res.status(HttpStatusCode.CONFLICT).json(rs)
    }
    return res.status(HttpStatusCode.OK).json(rs)
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const loginService = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const rs = await checkUserLogin({
      username: username,
      password: password
    })
    if (rs.success === false) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json(rs)
    }
    return res.status(HttpStatusCode.ACCEPTED).json(rs)
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
