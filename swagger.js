const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'Exemplo de REST API com Swagger e Azure',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
      {
        url: 'https://restapi20200666.azurewebsites.net',
      },
    ],
  },
  apis: ['./routes/*.js'], // Onde estão as anotações Swagger
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
