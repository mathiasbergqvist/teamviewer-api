const { httpGetAllTeams } = require("./teams.controller");

const express = require("express");

const teamsRouter = express.Router();

teamsRouter.get("/", httpGetAllTeams);

module.exports = teamsRouter;