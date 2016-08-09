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

            if(postData.pin && postData.stationId && postData.timeStarted && postData.timeEnded && postData.gamePoints) {

                db.Competition.insert({
                    pin: postData.pin,
                    stationId: postData.stationId,
                    timeStarted: postData.timeStarted,
                    timeEnded: postData.timeEnded,
                    gamePoints: postData.gamePoints,
                    timePoints: postData.timePoints,
                    questionPoints: postData.questionPoints
                })

                return ("data " + JSON.stringify(postData))
            }
            else {
                this.setStatusCode(402);
                return 'Missing Data'
            }

        }
    },
    '/api/addCompetition23': {
        post: function (data) {
            var postData = JSON.parse(data);
            console.log("data", postData)

            if(postData.pin && postData.stationId && postData.level && postData.meter && postData.gamePoints && postData.usedTime) {

                db.Competition23.insert({
                    pin: postData.pin,
                    stationId: postData.stationId,
                    level: postData.level,
                    meter: postData.meter,
                    gamePoints: postData.gamePoints,
                    usedTime: postData.usedTime
                })

                return ("data " + JSON.stringify(postData))
            }
            else {
                this.setStatusCode(402);
                return 'Missing Data'
            }

        }
    }

});