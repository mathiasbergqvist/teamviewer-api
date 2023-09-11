const request = require("supertest");
const mockingoose = require('mockingoose');
const Player = require('../../models/player.mongo');
const app = require("../../app");

describe("Players API", () => {

    const mockedPlayer = {
        "_id": "64e3c4c4c1a6bf8a6f961fb2",
        "name": "Ziggy Stardust",
        "number": 99,
        "position": "forward",
        "league": "Premier League",
        "countryUnicode": "1F3C1",
        "__v": 0
    };

    const mockedPlayers = [mockedPlayer];

    mockingoose(Player).toReturn(mockedPlayers, 'find');
    mockingoose(Player).toReturn(mockedPlayer, 'findOne');
    mockingoose(Player).toReturn({}, 'create');
    mockingoose(Player).toReturn(mockedPlayer, 'findOneAndUpdate');
    mockingoose(Player).toReturn({}, 'findOneAndDelete');

    describe("GET /players", () => {
        it("should respond with 200 success", async () => {
            const response = await request(app)
                .get("/v1/players")
                .expect("Content-Type", /json/)
                .expect(200);

            expect(response.body).toStrictEqual(mockedPlayers);
        });
    });

    describe("GET /player/:id", () => {
        it("should respond with 200 success", async () => {
            const response = await request(app)
                .get("/v1/players/64e3c4c4c1a6bf8a6f961fb2")
                .expect("Content-Type", /json/)
                .expect(200);

            expect(response.body).toStrictEqual(mockedPlayer);
        });

        it("should catch missing required properties", async () => {
            const response = await request(app)
                .get("/v1/players/invlaidId")
                .expect(400);
      
            expect(response.body.error[0].msg).toStrictEqual("Invalid ID");
        });

        it("should respond with 404 not found if player is missing", async () => {
            mockingoose(Player).toReturn(null, 'findOne');
            await request(app)
                .get("/v1/players/64e3c4c4c1a6bf8a6f961fb2")
                .expect(404);
        });
    });

    describe("POST /player", () => {
        it("should respond with 201 created", async () => {
            const response = await request(app)
              .post("/v1/players")
              .send(mockedPlayer)
              .expect("Content-Type", /json/)
              .expect(201);
      
            expect(response.ok).toBeTruthy();
        });

        it("should catch missing required properties", async () => {
            const mockedPlayerNotComplete = {
                "name": "Ziggy Stardust"
            };
            
            const response = await request(app)
              .post("/v1/players")
              .send(mockedPlayerNotComplete)
              .expect("Content-Type", /json/)
              .expect(400);
      
            expect(response.body.error.length).toBe(6);
        });
    });

    describe("PUT /player", () => {
        it("should respond with 200 success", async () => {
            const response = await request(app)
              .put("/v1/players/64e3c4c4c1a6bf8a6f961fb2")
              .send(mockedPlayer)
              .expect("Content-Type", /json/)
              .expect(200);
      
            expect(response.ok).toBeTruthy();
        });

        it("should catch missing required properties", async () => {
            const response = await request(app)
                .put("/v1/players/invlaidId")
                .send(mockedPlayer)
                .expect("Content-Type", /json/)
                .expect(400);
      
              expect(response.body.error[0].msg).toStrictEqual("Invalid ID");
        });
    });

    describe("DELETE /player", () => {
        it("should respond with 200 success", async () => {
            const response = await request(app)
              .delete("/v1/players/64e3c4c4c1a6bf8a6f961fb2")
              .expect("Content-Type", /json/)
              .expect(200);
      
            expect(response.ok).toBeTruthy();
        });

        it("should catch missing required properties", async () => {
            const response = await request(app)
                .delete("/v1/players/invlaidId")
                .send(mockedPlayer)
                .expect("Content-Type", /json/)
                .expect(400);
      
              expect(response.body.error[0].msg).toStrictEqual("Invalid ID");
        });

        it("should respond with 404 not found if player is missing", async () => {
            mockingoose(Player).toReturn(null, 'findOneAndDelete');
            await request(app)
                .delete("/v1/players/64e3c4c4c1a6bf8a6f961fb2")
                .expect(404);
        });
    });
});