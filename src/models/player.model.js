const Player = require('./player.mongo');

const getAllPlayers = async () => await Player.find({});

const getPlayerById = async (playerId) => await Player.findById(playerId);

const savePlayer = async (newPlayer) => {
    const { name, number, position, countryUnicode } = newPlayer;
    const playerToSave = new Player({
        name,
        number,
        position,
        countryUnicode,
    });
    return await Player.create(playerToSave);
};

const updatePlayer = async (playerId, updatedPlayer) =>
    await Player.findByIdAndUpdate(playerId, updatedPlayer);

const deletePlayer = async (playerId) => await Player.findOneAndDelete({ _id: playerId });

module.exports = {
    getAllPlayers,
    getPlayerById,
    savePlayer,
    updatePlayer,
    deletePlayer,
};
