const {httpGetAllPlayers, httpGetPlayerById, httpSavePlayer, httpUpdatePlayer} = require("./players.controller");
const express = require("express");

const playersRouter = express.Router();

playersRouter.get("/", httpGetAllPlayers);
playersRouter.get("/:id", httpGetPlayerById);
playersRouter.post("/", httpSavePlayer);
playersRouter.put("/:id", httpUpdatePlayer);

module.exports = playersRouter;
