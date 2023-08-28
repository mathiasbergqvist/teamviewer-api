const { httpGetAllTeams, httpSaveTeam } = require("./teams.controller");

const express = require("express");

const teamsRouter = express.Router();

teamsRouter.get("/", httpGetAllTeams);
teamsRouter.post("/", httpSaveTeam);

module.exports = teamsRouter;