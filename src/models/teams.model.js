const Team = require("./teams.mongo");

const saveTeam = async (newTeam) => {
    const {name, stadium, manager, league, playerIds} = newTeam;
    const teamToSave = new Team({
        name,
        stadium,
        manager,
        league,
    });
    playerIds.map((id) => {
        teamToSave.players.push(id);
    });
    return await Team.create(teamToSave);
};

const getAllTeams = async () => await Team.find({}).populate('players');

module.exports = {
    saveTeam,
    getAllTeams,
};