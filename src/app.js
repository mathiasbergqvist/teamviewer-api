const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const api = require('./routes/api');
const basicAuth = require('express-basic-auth');
const toobusy = require('toobusy-js');
const hpp = require('hpp');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
require('dotenv').config();

const username = process.env.BASIC_AUTH_USERNAME;
const password = process.env.BASIC_AUTH_PASSWORD;
const clientUrl = process.env.CLIENT_URL;
const users = {};
users[username] = password;

const app = express();
app.use(helmet());
if (process.env.API_ENV !== 'dev') {
    app.use(
        cors({
            origin: clientUrl,
            optionsSuccessStatus: 200,
        })
    );
} else {
    app.use(cors('*'));
}

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true, limit: '1kb' }));
app.use(express.json({ limit: '1kb' }));
app.use(hpp());
app.use((_, res, next) => {
    if (toobusy()) {
        res.status(503).send('Server Too Busy');
    } else {
        next();
    }
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

if (process.env.API_ENV !== 'dev') {
    app.use(
        basicAuth({
            users,
            unauthorizedResponse: {
                message: 'Unauthorized',
            },
        })
    );
}
app.use('/v1', api);

// catches uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(`uncaughtException: ${err}`);
    throw new Error(`uncaughtException: ${err}`);
});

module.exports = app;
