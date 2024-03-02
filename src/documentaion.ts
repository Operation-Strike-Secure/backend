import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'OSS Backend Application',
      version: '1.0.0',
      description:
            'the OSS Backend Application, a RESTful API for OSS to manage the data of the application and user requests',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      }
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Local server'
      }
    ]
  },
  apis: ['src/**/*.ts']
}

const swaggerSpec = swaggerJSDoc(options)

export const swagger = {
  serve: swaggerUI.serve,
  setup: swaggerUI.setup(swaggerSpec)
}
