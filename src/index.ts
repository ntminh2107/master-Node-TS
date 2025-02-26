import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import { connectionDB } from './database/connection'
import cors from 'cors'
import applyMiddlewares from './middleware/middleware'
import getRouter from './router/router'
import swaggerDocs from './util/swagger'

const app = express()
const PORT = process.env.PORT || 3000

const start = async () => {
  app.use(applyMiddlewares())
  app.use(cors())

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    app.use(getRouter())
    swaggerDocs(app, Number(PORT))
  })
}

Promise.all([connectionDB()])
  .then(async () => await start())
  .catch((err) => console.log(err))
