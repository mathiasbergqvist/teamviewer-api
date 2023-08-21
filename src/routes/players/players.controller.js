const {getAllPlayers, getPlayerById, savePlayer} = require("../../models/player.model");

const httpGetAllPlayers = async (req, res) => {
    try {
        const allPlayers = await getAllPlayers();
        return res.status(200).json(allPlayers);
    } catch (error) {
        return res.status(400).json({error});
    }
};

const httpGetPlayerById = async (req, res) => {
    try {
        const playerId = req.params.id;
        const playerById = await getPlayerById(playerId);
        if (playerById) {
            return res.status(200).json(playerById);
        } else {
            return res.status(404).json({error: "Player not found"});
        }
    } catch (error) {
        return res.status(400).json({error});
    }
};

const httpSavePlayer = async (req, res) => {
    try {
        const newPlayer = req.body;
        const savedPlayer = await savePlayer(newPlayer);
        return res.status(201).json(savedPlayer);
    } catch (error) {
        return res.status(400).json({error});
    }
};

module.exports = {
    httpGetAllPlayers,
    httpGetPlayerById,
    httpSavePlayer
};

