const {
    getAllPlayers,
    getPlayerById,
    savePlayer,
    updatePlayer,
    deletePlayer,
} = require('../../models/player.model');
const { validationResult } = require('express-validator');

const httpGetAllPlayers = async (_, res) => {
    try {
        const allPlayers = await getAllPlayers();

        res.set('Cache-Control', 'public, max-age=60');
        return res.status(200).json(allPlayers);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Error from httpGetAllPlayers' });
    }
};

const httpGetPlayerById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const playerId = req.params.id;
        const playerById = await getPlayerById(playerId);
        if (playerById) {
            res.set('Cache-Control', 'public, max-age=60');
            return res.status(200).json(playerById);
        }

        return res.status(404).json({ error: 'Player not found' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Error from httpGetPlayerById' });
    }
};

const httpSavePlayer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const newPlayer = req.body;
        const savedPlayer = await savePlayer(newPlayer);
        return res.status(201).json(savedPlayer);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Error from httpSavePlayer' });
    }
};

const httpUpdatePlayer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const playerId = req.params.id;
        const playerToUpdate = req.body;
        const updatedPlayer = await updatePlayer(playerId, playerToUpdate);
        if (updatedPlayer) {
            return res.status(200).json(updatedPlayer);
        }

        return res.status(404).json({ error: 'Player not found' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Error from httpUpdatePlayer' });
    }
};

const httpDeletePlayer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const playerId = req.params.id;
        const deletedPlayer = await deletePlayer(playerId);
        if (deletedPlayer) {
            return res.status(200).json(deletedPlayer);
        }

        return res.status(404).json({ error: 'Player not found' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Error from httpDeletePlayer' });
    }
};

module.exports = {
    httpGetAllPlayers,
    httpGetPlayerById,
    httpSavePlayer,
    httpUpdatePlayer,
    httpDeletePlayer,
};
