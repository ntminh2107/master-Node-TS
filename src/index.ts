import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { connectionDB } from './database/connection'
import cors from 'cors'
import applyMiddlewares from './middleware/middleware'
import getRouter from './router/router'
import swaggerDocs from './util/swagger'

const app = express()
const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    await connectionDB() // Ensure database connection is established before starting server

    app.use(applyMiddlewares())
    app.use(cors())

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`)
      app.use(getRouter())
      swaggerDocs(app, Number(PORT))
    })
  } catch (err) {
    console.error('❌ Error starting server:', err)
    process.exit(1) // Exit process if there's a critical failure
  }
}

startServer()
