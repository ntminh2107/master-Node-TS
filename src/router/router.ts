import { Request, Response, Router } from 'express'
import getAuthRouter from './auth.router'
import wrap from '../util/wrapError'

const getRouter = () => {
  const router = Router()

  router.use('/auth', getAuthRouter())

  router.get(
    '/healthcheck',
    wrap((req: Request, res: Response) => {
      res.json('Hello, Express with TypeScript!')
    })
  )

  return router
}

export default getRouter
