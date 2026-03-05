const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: process.env.SWAGGER_TITLE || 'Task Manager API',
      description: process.env.SWAGGER_DESCRIPTION || 'API for Task Manager Application',
      version: process.env.SWAGGER_VERSION || '1.0.0',
      contact: {
        name: 'Support Team',
        email: 'support@taskmanager.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://api.taskmanager.com',
        description: 'Production server'
      }
    ]
  },
  apis: [
    './src/routes/*.js',
    './src/controllers/*.js'
  ]
};

const specs = swaggerJSDoc(options);

const swaggerMiddleware = (app) => {
  app.use(
    process.env.SWAGGER_PATH || '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
};

module.exports = swaggerMiddleware;