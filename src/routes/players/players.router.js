const { validateMongoDbId } = require("../validations");
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
playersRouter.post("/", httpSavePlayer);
playersRouter.put("/:id", validateMongoDbId(), httpUpdatePlayer);
playersRouter.delete("/:id", validateMongoDbId(), httpDeletePlayer);

module.exports = playersRouter;
