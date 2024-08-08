const express = require('express');
const teamsRouter = require('./teams/teams.router');
const playersRouter = require('./players/players.router');

const api = express.Router();

api.use('/teams', teamsRouter);
api.use('/players', playersRouter);
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API.
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
api.use('/health', (_, res) => {
    res.status(200).json({ status: 'ok' });
});
api.use('*', (_, res) => {
    res.sendStatus(404);
});

module.exports = api;
