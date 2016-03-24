HTTP.methods({
    '/api/getStation': {
        get: function (data) {
            return db.Competition.find().fetch()
        }
    },
    '/api/startTeam': {
        post: function (data) {
            console.log("data",JSON.stringify(data))

            return ("data "+JSON.stringify(data))
        }
    },
    '/api/addCompetition': {
        post: function (data) {
            var postData = JSON.parse(data);
            console.log("data", postData)
            db.Competition.insert({
                pin:postData.pin,
                stationId:postData.stationId,
                timeStarted:postData.timeStarted,
                timeEnded:postData.timeEnded,
                gamePoints:postData.gamePoints,
                timePoints:postData.timePoints})
            return ("data " + JSON.stringify(postData))
        }
    }
});