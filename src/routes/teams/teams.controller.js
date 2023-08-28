const {saveTeam, getAllTeams} = require("../../models/teams.model");

const httpGetAllTeams = async (req, res) => {
    try {
        const allTeams = await getAllTeams();
        return res.status(200).json(allTeams);
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Error from httpGetAllTeams"});
    }
};

const httpSaveTeam = async (req, res) => {
    try {
        const newTeam = req.body;
        const savedTeam = await saveTeam(newTeam);
        return res.status(201).json(savedTeam);
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: "Error from httpSaveTeam"});
    }
};

module.exports = { httpGetAllTeams, httpSaveTeam };