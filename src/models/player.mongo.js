const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    position: {
        type: String,
        enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Squad'],
        required: true,
    },
    league: {
        type: String,
        required: true,
    },
    countryUnicode: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Player', playerSchema);
