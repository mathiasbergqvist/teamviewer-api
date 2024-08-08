const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'TeamViewer API',
        version: '1.0.0',
        description: 'API for TeamViewer',
    },
};

const options = {
    swaggerDefinition,
    apis: [
        './src/routes/api.js',
        './src/routes/players/players.controller.js',
        './src/routes/teams/teams.controller.js',
    ],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
