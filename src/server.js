const http = require('http');
const app = require('./app');
const { mongoConnect } = require('./services/mongo');
require('dotenv').config();

const PORT = process.env.PORT || 7001;

const server = http.createServer(app);

const startServer = async () => {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`🚀 Listening on port ${PORT}`);
    });
};

startServer();
