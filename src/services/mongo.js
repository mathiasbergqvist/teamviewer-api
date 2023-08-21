const mongoose = require('mongoose');
require('dotenv').config();

const MOGO_DB_URL = process.env.MOGO_DB_URL;

mongoose.connection.once('open', () => {
    console.log('🔌 MongoDB connection ready');
});

mongoose.connection.on('error', (error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
});

const mongoConnect = async () => {
    await mongoose.connect(MOGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const mongoDisconnect = async () => {
    await mongoose.disconnect();
};

module.exports = {
    mongoConnect,
    mongoDisconnect,
};
