import { Router } from 'express'
import wrap from '../util/wrapError'
import { registerService } from '../service/auth.service'

const getAuthRouter = () => {
  const router = Router()
  /**
   * @swagger
   * tags:
   *   - name: Authentication
   *     description: APIs related to authentication
   */

  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Register a new user
   *     description: Creates a new user account
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - password
   *               - full_name
   *               - email
   *             properties:
   *               username:
   *                 type: string
   *                 example: johndoe
   *               password:
   *                 type: string
   *                 example: "StrongPassword123!"
   *               full_name:
   *                 type: string
   *                 example: "John Doe"
   *               gender:
   *                 type: string
   *                 enum: [male, female, other]
   *                 example: "male"
   *               email:
   *                 type: string
   *                 format: email
   *                 example: "johndoe@example.com"
   *               age:
   *                 type: integer
   *                 example: 25
   *     responses:
   *       200:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 rs:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 1
   *                     username:
   *                       type: string
   *                       example: johndoe
   *                     full_name:
   *                       type: string
   *                       example: "John Doe"
   *                     email:
   *                       type: string
   *                       example: "johndoe@example.com"
   *                     age:
   *                       type: integer
   *                       example: 25
   *                     gender:
   *                       type: string
   *                       example: "male"
   *       400:
   *         description: Bad request, invalid input
   */
  router.post('/register', wrap(registerService))

  return router
}

export default getAuthRouter
