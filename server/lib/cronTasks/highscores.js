

function getTeamHighscore(call, teamCode, stationId, timeRange, showPin) {
    Meteor.call(call, {
        timerange: timeRange,
        stationId: stationId,
        teamCode: teamCode,
        limit: 100
    }, function (err, result) {
        console.log(result)
        results = []
        _.forEach(result, function (item) {
            results.push({
                    rank: item.rank,
                    totalPoints: item.totalPoints,
                    time: item.time,
                    userName: item.userName,
                    pin: item.pin,
                    userId: item.userId,
                    showPin: showPin
                }
            )
        });

        db.TeamHighscores.upsert({teamCode: teamCode, timerange:timeRange, stationId:stationId}, {$set: {highscores:results}} )

        //highscores = db.HighScores3.find().fetch();
        //db.TeamHighscores
        //db.Team.update({teamCode:"1233"},{$set:{highscores3:highscores}})
        //console.log(highscores)
    });
}

Meteor.startup(
    function() {
        console.log("wuhu")
        //
        //Meteor.call("highscore23_team", {
        //    timerange: "all",
        //    stationId: "station2",
        //    teamCode: "1233",
        //    limit: 100
        //}, function (err, result) {
        //    console.log(result)
        //    _.forEach(result, function (item) {
        //        db.HighScores2.upsert(
        //            {rank: item.rank},
        //            { $set: item}
        //        )
        //    });
        //    highscores = db.HighScores2.find().fetch();
        //    db.Team.update({teamCode:"1233"},{$set:{highscores2:highscores}})
        //    console.log(highscores)
        //
        //});

        //var entry = { rank:rank, totalPoints:item.totalPoints, time:item.time, userName:userName, pin:item.pin, userId: userId, showPin: true }

        var teams = db.Team.find({});
        teamCodes = []
        teams.forEach(function(item) {
            teamCodes.push(item.teamCode)
        })

        _.forEach(teamCodes, function(teamCode) {
            getTeamHighscore("highscore_team", teamCode, "station1", "all", true);
            getTeamHighscore("highscore_team", teamCode, "station1", "week", true);
            getTeamHighscore("highscore23_team", teamCode, "station2", "all", true);
            getTeamHighscore("highscore23_team", teamCode, "station2", "week", true);
            getTeamHighscore("highscore23_team", teamCode, "station3", "all", true);
            getTeamHighscore("highscore23_team", teamCode, "station3", "week", true);
            getTeamHighscore("highscore23_team", teamCode, "station4", "all", true);
            getTeamHighscore("highscore23_team", teamCode, "station4", "week", true);
        })






        //Meteor.call("highscore23_team", {
        //    timerange: "all",
        //    stationId: "station4",
        //    teamCode: "1233",
        //    limit: 100
        //}, function (err, result) {
        //    console.log(result)
        //    _.forEach(result, function (item) {
        //        db.HighScores4.upsert(
        //            {rank: item.rank},
        //            { $set: item}
        //
        //        )
        //    });
        //    highscores = db.HighScores4.find().fetch();
        //    db.Team.update({teamCode:"1233"},{$set:{highscores4:highscores}})
        //    console.log(highscores)
        //});
})
