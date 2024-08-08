const express = require('express');
const teamsRouter = require('./teams/teams.router');
const playersRouter = require('./players/players.router');

const api = express.Router();

api.use('/teams', teamsRouter);
api.use('/players', playersRouter);
api.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok' });
});
api.use('*', (_, res) => {
    res.sendStatus(404);
});

module.exports = api;
