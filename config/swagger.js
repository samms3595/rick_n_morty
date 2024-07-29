const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Rick and Morty Character API',
        version: '1.0.0',
        description: 'A simple API to get information about Rick and Morty characters',
      },
      servers: [
        {
          url: 'http://localhost:4000',
          description: 'Local server',
        },
      ],
      components: {
        schemas: {
          Character: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'Character ID',
              },
              name: {
                type: 'string',
                description: 'Character name',
              },
              status: {
                type: 'string',
                description: 'Character status',
              },
              species: {
                type: 'string',
                description: 'Character species',
              },
              gender: {
                type: 'string',
                description: 'Character gender',
              },
              origin: {
                type: 'string',
                description: 'Character origin',
              },
              image: {
                type: 'string',
                description: 'Character image URL',
              },
            },
          },
        },
      },
    },
    apis: ['app.js'], // Ruta a los archivos donde se documentan las rutas
  };

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
