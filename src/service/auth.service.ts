import { Request, Response } from 'express'
import { HttpStatusCode } from '../util/httpStatusCode'
import { addNewUser } from '../controller/auth.controller'

export const Register = async (req: Request, res: Response) => {
  try {
    const { username, password, full_name, gender, email } = req.body
    await addNewUser({
      username: username,
      password: password,
      full_name: full_name,
      gender: gender,
      email: email
    })
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ error: error })
  }
}
