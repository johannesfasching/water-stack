function getTeamHighscore(call, teamCode, stationId, timeRange) {
    Meteor.call(call, {
        timerange: timeRange,
        stationId: stationId,
        teamCode: teamCode,
        limit: 1000
    }, function (err, result) {
        results = []
        _.forEach(result, function (item) {
            results.push({
                    rank: item.rank,
                    totalPoints: item.totalPoints,
                    time: item.time,
                    userName: item.userName,
                    pin: item.pin,
                    userId: item.userId
                }
            )
        });

        db.TeamHighscores.upsert({teamCode: teamCode, timerange:timeRange, stationId:stationId}, {$set: {highscores:results}} )
    });
}

function getTeamHighscores() {
    console.log("getTeamHighscores")
    var teams = db.Team.find({});
    teamCodes = []
    teams.forEach(function(item) {
        teamCodes.push(item.teamCode)
    })

    _.forEach(teamCodes, function(teamCode) {
        getTeamHighscore("highscore_team", teamCode, "station1", "all");
        getTeamHighscore("highscore_team", teamCode, "station1", "week");
        getTeamHighscore("highscore23_team", teamCode, "station2", "all");
        getTeamHighscore("highscore23_team", teamCode, "station2", "week");
        getTeamHighscore("highscore23_team", teamCode, "station3", "all");
        getTeamHighscore("highscore23_team", teamCode, "station3", "week");
        getTeamHighscore("highscore23_team", teamCode, "station4", "all");
        getTeamHighscore("highscore23_team", teamCode, "station4", "week");
    })
}

Meteor.setInterval(
    function() {
        getTeamHighscores()
    }, 10*60*1000)


function getHighscore(call, stationId, timeRange) {
    Meteor.call(call, {
        timerange: timeRange,
        stationId: stationId
    }, function (err, result) {
        results = []
        _.forEach(result, function (item) {
            results.push({
                    rank: item.rank,
                    totalPoints: item.totalPoints,
                    time: item.time,
                    userName: item.userName,
                    pin: item.pin,
                    userId: item.userId
                }
            )
        });


        db.Highscores.upsert({ timerange:timeRange, stationId:stationId}, {$set: {highscores:results}} )
    });
}

function getHighscores() {
    console.log("getHighscores")
    getHighscore("highscore", "station1", "all");
    getHighscore("highscore", "station1", "week");
    getHighscore("highscore23", "station2", "all");
    getHighscore("highscore23", "station2", "week");
    getHighscore("highscore23", "station3", "all");
    getHighscore("highscore23", "station3", "week");
    getHighscore("highscore23", "station4", "all");
    getHighscore("highscore23", "station4", "week");
}

Meteor.setInterval(
    function() {
        getHighscores()
    }, 12*60*1000)


Meteor.startup(function() {
    //getHighscores()
    //getTeamHighscores()
})

Meteor.methods({
    'updateScores':function() {
        getHighscores()
        getTeamHighscores()
    }
})