const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const api = require("./routes/api");
const basicAuth = require("express-basic-auth");
require("dotenv").config();

const username = process.env.BASIC_AUTH_USERNAME;
const password = process.env.BASIC_AUTH_PASSWORD;
const users = {};
users[username] = password;

const app = express();
app.use(helmet());
app.use(
    cors({
        origin: "http://localhost:4001",
        optionsSuccessStatus: 200,
    })
);
app.use(morgan("combined"));
app.use(express.json());
if (process.env.API_ENV !== "test") {
    app.use(
        basicAuth({
            users,
            unauthorizedResponse: {
            message: "Unauthorized",
        },
        })
    );
}
app.use("/v1", api);

module.exports = app;
