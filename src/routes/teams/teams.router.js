const { validateMongoDbId } = require("../validations");
const { 
    httpGetAllTeams,
    httpGetTeamById,
    httpSaveTeam,
    httpUpdateTeam,
    httpDeleteTeam
} = require("./teams.controller");

const express = require("express");

const teamsRouter = express.Router();

teamsRouter.get("/", httpGetAllTeams);
teamsRouter.get("/:id", validateMongoDbId(), httpGetTeamById);
teamsRouter.post("/", httpSaveTeam);
teamsRouter.put("/:id", validateMongoDbId(), httpUpdateTeam);
teamsRouter.delete("/:id", validateMongoDbId(), httpDeleteTeam);

module.exports = teamsRouter;