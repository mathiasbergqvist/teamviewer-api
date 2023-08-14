
const httpGetAllTeams = async (req, res) => (
    res.status(200).json({
        teams: [
            {
                name: "Manchester United"
            },
            {
                name: "Arsenal"
            },
            {
                name: "Tottenham"
            }
        ]
    })
);

module.exports = { httpGetAllTeams };