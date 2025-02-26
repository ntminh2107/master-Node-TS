import { Router } from 'express'

const getAuthRouter = () => {
  const router = Router()

  /**
   * @swagger
   * /auth/hello:
   *   get:
   *     summary: Returns a greeting message
   *     responses:
   *       200:
   *         description: A successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Hello, world!"
   */
  router.get('/hello', (req, res) => {
    res.json({ message: 'Hello, world!' })
  })
  return router
}

export default getAuthRouter
