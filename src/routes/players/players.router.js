const {httpGetAllPlayers, httpGetPlayerById, httpSavePlayer, httpUpdatePlayer, httpDeletePlayer} = require("./players.controller");
const express = require("express");

const playersRouter = express.Router();

playersRouter.get("/", httpGetAllPlayers);
playersRouter.get("/:id", httpGetPlayerById);
playersRouter.post("/", httpSavePlayer);
playersRouter.put("/:id", httpUpdatePlayer);
playersRouter.delete("/:id", httpDeletePlayer);

module.exports = playersRouter;
