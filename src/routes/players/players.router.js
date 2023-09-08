const { validateMongoDbId, validatePlayer, validateIdAndPlayer } = require("../validations");
const {
    httpGetAllPlayers,
    httpGetPlayerById,
    httpSavePlayer,
    httpUpdatePlayer,
    httpDeletePlayer
} = require("./players.controller");
const express = require("express");

const playersRouter = express.Router();


playersRouter.get("/", httpGetAllPlayers);
playersRouter.get("/:id", validateMongoDbId(), httpGetPlayerById);
playersRouter.post("/", validatePlayer(), httpSavePlayer);
playersRouter.put("/:id", validateIdAndPlayer(), httpUpdatePlayer);
playersRouter.delete("/:id", validateMongoDbId(), httpDeletePlayer);

module.exports = playersRouter;
