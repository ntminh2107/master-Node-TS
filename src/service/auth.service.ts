import { Request, Response } from 'express'
import { HttpStatusCode } from '../util/httpStatusCode'
import { addNewUser } from '../controller/auth.controller'

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
    res.status(HttpStatusCode.OK).json(rs)
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ error: error })
  }
}
