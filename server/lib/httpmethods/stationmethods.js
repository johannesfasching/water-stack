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
    },
    '/api/station': {
        post: function (data) {
            var postData = JSON.parse(data);
            console.log("data", postData)
            if(!postData.stationId)
                return "Error: no stationId provided"
            var result = db.Competition23.find({
                    stationId:postData.stationId
                },
                {
                    fields: {
                        pin: 1,
                        gamePoints: 1,
                        usedTime:1,
                        _id:0
                    },
                    sort: {
                        gamePoints: -1
                    },
                    limit: 50
                }
            ).fetch();
            return ("{\"data:\"" + JSON.stringify(result) + "}" )
        }
    },
    '/api/user': {
        post: function (data) {
            var postData = JSON.parse(data);
            console.log("data", postData)
            if(!postData.pin || !postData.stationId)
                return "Error: no pin provided"
            var result = db.Competition23.find({
                    pin:postData.pin,
                    stationId: postData.stationId
                },
                {
                    fields: {
                        gamePoints: 1,
                        usedTime:1,
                        stationId:1,
                        _id:0
                    },
                    sort: {
                        gamePoints: -1
                    },
                    limit: 50
                }
            ).fetch();
            return ("{\"data:\"" + JSON.stringify(result) + "}" )
        }
    }


});