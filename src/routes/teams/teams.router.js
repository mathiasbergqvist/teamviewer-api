const { validateMongoDbId, validateTeam, validateIdAndTeam } = require('../validations');
const {
    httpGetAllTeams,
    httpGetTeamById,
    httpSaveTeam,
    httpUpdateTeam,
    httpDeleteTeam,
} = require('./teams.controller');
const express = require('express');

const teamsRouter = express.Router();

teamsRouter.get('/', httpGetAllTeams);
teamsRouter.get('/:id', validateMongoDbId(), httpGetTeamById);
teamsRouter.post('/', validateTeam(), httpSaveTeam);
teamsRouter.put('/:id', validateIdAndTeam(), httpUpdateTeam);
teamsRouter.delete('/:id', validateMongoDbId(), httpDeleteTeam);

module.exports = teamsRouter;
