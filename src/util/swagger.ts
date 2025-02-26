import { Express, Request, Response } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'A description of your API'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ]
  },
  apis: ['./src/router/*.ts', './src/schema/*.schema.ts'] // Path to the API docs
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app: Express, port: number) => {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  console.info(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs
