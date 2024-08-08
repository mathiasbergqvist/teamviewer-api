const swaggerAutogen = require('swagger-autogen')();
const playerModel = require('./src/models/player.mongo');
const teamModel = require('./src/models/teams.mongo');

const generateSwaggerSchema = (model) => {
    const paths = model.schema.paths;
    const swaggerSchema = {
        type: 'object',
        properties: {},
    };

    Object.keys(paths).forEach((key) => {
        if (key === '_id' || key === '__v') return; // Skip internal Mongoose fields
        const path = paths[key];
        swaggerSchema.properties[key] = {
            type: path.instance.toLowerCase(),
        };
        if (path.isRequired) {
            swaggerSchema.required = swaggerSchema.required || [];
            swaggerSchema.required.push(key);
        }
    });

    return swaggerSchema;
};

const swaggerDefinition = {
    info: {
        title: 'TeamViewer API',
        version: '1.0.0',
        description: 'API for TeamViewer',
    },
    host: 'https://teamviewerapi.se',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    basePath: 'v1/',
    definitions: {
        Player: generateSwaggerSchema(playerModel),
        Team: generateSwaggerSchema(teamModel),
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/api.js'];

const swaggerSpec = swaggerAutogen(outputFile, endpointsFiles, swaggerDefinition);

module.exports = swaggerSpec;
