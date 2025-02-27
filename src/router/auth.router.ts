import { Router } from 'express'
import wrap from '../util/wrapError'
import { loginService, registerService } from '../service/auth.service'
import { validateRequest } from '../util/validationRequest'
import { loginSchema, registerSchema } from '../validation/auth.validation'

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
   *       409:
   *         description: username already exist
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: username already exist, please try again
   *
   */
  router.post(
    '/register',
    validateRequest(registerSchema),
    wrap(registerService)
  )

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Authenticate user
   *     description: Login with username/email and password
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             oneOf:
   *               - type: object
   *                 required:
   *                   - username
   *                   - password
   *                 properties:
   *                   username:
   *                     type: string
   *                     description: Username for login
   *                     example: "johndoe123"
   *                   password:
   *                     type: string
   *                     format: password
   *                     description: User's password
   *                     example: "StrongPassword123!"
   *               - type: object
   *                 required:
   *                   - email
   *                   - password
   *                 properties:
   *                   email:
   *                     type: string
   *                     format: email
   *                     description: Email address for login
   *                     example: "johndoe@example.com"
   *                   password:
   *                     type: string
   *                     format: password
   *                     description: User's password
   *                     example: "StrongPassword123!"
   *           examples:
   *             username_login:
   *               summary: Login with username
   *               description: Login using username and password
   *               value:
   *                 username: "johndoe123"
   *                 password: "StrongPassword123!"
   *             email_login:
   *               summary: Login with email
   *               description: Login using email and password
   *               value:
   *                 username: "johndoe@example.com"
   *                 password: "StrongPassword123!"
   *     responses:
   *       '200':
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               required:
   *                 - success
   *                 - message
   *                 - user
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Login successful"
   *                 user:
   *                   type: object
   *                   required:
   *                     - id
   *                     - username
   *                     - full_name
   *                     - email
   *                     - age
   *                     - gender
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 1
   *                     username:
   *                       type: string
   *                       example: "johndoe123"
   *                     full_name:
   *                       type: string
   *                       example: "John Doe"
   *                     email:
   *                       type: string
   *                       format: email
   *                       example: "johndoe@example.com"
   *                     age:
   *                       type: integer
   *                       minimum: 13
   *                       maximum: 120
   *                       example: 25
   *                     gender:
   *                       type: string
   *                       enum: [male, female, other]
   *                       example: "male"
   *       '400':
   *         description: Bad request - validation error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               required:
   *                 - success
   *                 - message
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: "Validation error"
   *       '401':
   *         description: Unauthorized - invalid credentials
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               required:
   *                 - success
   *                 - message
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: "Invalid credentials"
   */
  router.post('/login', validateRequest(loginSchema), wrap(loginService))

  return router
}

export default getAuthRouter
