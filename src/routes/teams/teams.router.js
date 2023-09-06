const { httpGetAllTeams, httpGetTeamById, httpSaveTeam, httpUpdateTeam, httpDeleteTeam } = require("./teams.controller");

const express = require("express");

const teamsRouter = express.Router();

teamsRouter.get("/", httpGetAllTeams);
teamsRouter.get("/:id", httpGetTeamById);
teamsRouter.post("/", httpSaveTeam);
teamsRouter.put("/:id", httpUpdateTeam);
teamsRouter.delete("/:id", httpDeleteTeam);

module.exports = teamsRouter;