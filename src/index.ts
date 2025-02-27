import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { connectionDB } from './database/connection'
import cors from 'cors'
import applyMiddlewares from './middleware/middleware'
import getRouter from './router/router'
import swaggerDocs from './util/swagger'
import { initializeController } from './controller/auth.controller'

const app = express()
const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    const dbClient = await connectionDB()
    await initializeController(dbClient)

    app.use(applyMiddlewares())
    app.use(cors())

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`)
      app.use('/api', getRouter())
      swaggerDocs(app, Number(PORT))
    })
  } catch (err) {
    console.error('❌ Error starting server:', err)
    process.exit(1) // Exit process if there's a critical failure
  }
}

startServer()
