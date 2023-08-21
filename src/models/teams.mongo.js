const mongoose = require('mongoose');

const teamsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    stadium: {
        type: String,
        required: true,
    },
    manager: {
        type: String,
        required: true,
    },
    league: {
        type: String,
        required: true,
    },
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        },
    ],
});

module.exports = mongoose.model('Team', teamsSchema);
