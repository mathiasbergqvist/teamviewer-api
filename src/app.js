const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const api = require('./routes/api');
const basicAuth = require('express-basic-auth');
const toobusy = require('toobusy-js');
const hpp = require('hpp');
require('dotenv').config();

const username = process.env.BASIC_AUTH_USERNAME;
const password = process.env.BASIC_AUTH_PASSWORD;
const clientUrl = process.env.CLIENT_URL;
const users = {};
users[username] = password;

const app = express();
app.use(helmet());
app.use(
    cors({
        origin: clientUrl,
        optionsSuccessStatus: 200,
    })
);
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
if (process.env.API_ENV !== 'test') {
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
    process.exit(); // exit the process to avoid unknown state
});

module.exports = app;
