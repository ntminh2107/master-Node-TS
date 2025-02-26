import { Request, Response, Router } from 'express'
import getAuthRouter from './auth.router'
import wrap from '../util/wrapError'

const getRouter = () => {
  const router = Router()

  router.use('/auth', getAuthRouter())

  /**
   * @swagger
   * tags:
   *   - name: HealthCheck
   *     description: API health monitoring
   *
   * /healthcheck:
   *   get:
   *     summary: Check the health of the API
   *     tags: [HealthCheck]
   *     responses:
   *       200:
   *         description: API is up and running
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Hello, Express with TypeScript!"
   */
  router.get(
    '/healthcheck',
    wrap((req: Request, res: Response) => {
      res.json('Hello, Express with TypeScript!')
    })
  )

  return router
}

export default getRouter
