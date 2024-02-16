const { validationResult } = require('express-validator');
const { saveTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } = require('../../models/teams.model');

const httpGetAllTeams = async (req, res) => {
    try {
        const allTeams = await getAllTeams();
        return res.status(200).json(allTeams);
    } catch (error) {
        return res.status(400).json({ error: 'Error from httpGetAllTeams' });
    }
};

const httpGetTeamById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const id = req.params.id;
        const team = await getTeamById(id);

        if (team) {
            return res.status(200).json(team);
        }

        return res.status(404).json({ error: 'Team not found' });
    } catch (error) {
        return res.status(400).json({ error: 'Error from httpGetTeamById' });
    }
};

const httpSaveTeam = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const newTeam = req.body;
        const savedTeam = await saveTeam(newTeam);
        return res.status(201).json(savedTeam);
    } catch (error) {
        return res.status(400).json({ error: 'Error from httpSaveTeam' });
    }
};

const httpUpdateTeam = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const id = req.params.id;
        const teamToUpdate = req.body;
        const updatedTeam = await updateTeam(id, teamToUpdate);
        if (updatedTeam) {
            return res.status(200).json(updatedTeam);
        }
        return res.status(404).json({ error: 'Team not found' });
    } catch (error) {
        return res.status(400).json({ error: 'Error from httpUpdateTeam' });
    }
};

const httpDeleteTeam = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const teamId = req.params.id;
        const deletedTeam = deleteTeam(teamId);
        if (deletedTeam) {
            return res.status(200).json(deletedTeam);
        }

        return res.status(404).json({ error: 'Team not found' });
    } catch (error) {
        return res.status(400).json({ error: 'Error from httpDeleteTeam' });
    }
};

module.exports = { httpGetAllTeams, httpSaveTeam, httpGetTeamById, httpUpdateTeam, httpDeleteTeam };
