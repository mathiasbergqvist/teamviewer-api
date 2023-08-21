const {httpGetAllPlayers, httpGetPlayerById, httpSavePlayer} = require("./players.controller");
const express = require("express");

const playersRouter = express.Router();

playersRouter.get("/", httpGetAllPlayers);
playersRouter.get("/:id", httpGetPlayerById);
playersRouter.post("/", httpSavePlayer);

module.exports = playersRouter;
