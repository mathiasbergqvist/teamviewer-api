const Team = require('./teams.mongo');

const getAllTeams = async () => await Team.find({}).populate('players');

const getTeamById = async (teamId) => await Team.findById(teamId).populate('players');

const saveTeam = async (newTeam) => {
    const { name, stadium, manager, league, playerIds } = newTeam;
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

const updateTeam = async (teamId, updatedTeam) =>
    await Team.findByIdAndUpdate(teamId, {
        name: updatedTeam.name,
        stadium: updatedTeam.stadium,
        manager: updatedTeam.manager,
        players: updatedTeam.playerIds,
    });

const deleteTeam = async (teamId) => await Team.findByIdAndDelete(teamId);

module.exports = {
    getAllTeams,
    getTeamById,
    saveTeam,
    updateTeam,
    deleteTeam,
};
