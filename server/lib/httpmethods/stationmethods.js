HTTP.methods({

// *******************************************************************
//
//             get all competitions Quizzstation
//
// *******************************************************************
    '/api/getStation': {
        get: function (data) {
            return db.Competition.find().fetch()
        }
    },



// *******************************************************************
//
//             Add Competition from Station1 (Quizzstation)
//
// *******************************************************************
    '/api/addCompetition': {
        post: function (data) {
            var postData = JSON.parse(data);
            console.log("API: addCompetition - Data", postData)

            if(postData.pin && postData.stationId && postData.timeStarted && postData.timeEnded && postData.gamePoints) {


                var id = db.Competition.insert({
                    pin: postData.pin,
                    stationId: postData.stationId,
                    timeStarted: postData.timeStarted,
                    timeEnded: postData.timeEnded,
                    gamePoints: postData.gamePoints,
                    timePoints: postData.timePoints,
                    questionPoints: postData.questionPoints
                })

                // Assign Team to Pin if teamCode exists
                if(postData.groupId) {
                    var teamCode = db.Team.findOne({teamCode:postData.groupId})
                    if( teamCode != null && teamCode != undefined) {
                        teamCode = teamCode.teamCode
                        if( teamCode != null && teamCode != undefined) {
                            db.Pin.update(
                                {pin: postData.pin},
                                {$set: {teamCode: postData.groupId}}
                            )
                        }
                    }
                    var teamCode = db.Pin.findOne({pin:postData.pin})
                    if( teamCode != null && teamCode != undefined) {
                        teamCode = teamCode.teamCode
                        if( teamCode != null && teamCode != undefined) {
                            db.Competition.update({_id: id}, {$set: {teamCode: teamCode}})
                        }
                    }
                }


                // Assign Teamcode to competition if Pin has already teamcode


                return (JSON.stringify(postData))
            }
            else {
                this.setStatusCode(402);
                return 'Missing Data'
            }

        }
    },

// *******************************************************************
//
//             Add Competition from Station2,3,4
//
// *******************************************************************
    '/api/addCompetition23': {
        post: function (data) {
            var postData = JSON.parse(data);
            console.log("API: addCompetition23 - Data", postData)

            if(postData.pin) {

                var id = db.Competition23.insert({
                    teamCode: postData.groupId,
                    pin: postData.pin,
                    stationId: postData.stationId,
                    level: postData.level,
                    meter: postData.meter,
                    totalPoints: postData.totalPoints,
                    time: postData.time,
                    timeStarted: postData.timeStarted,
                    timeEnded: postData.timeEnded
                })

                // Assign Team to Pin if teamCode exists
                if(postData.groupId) {
                    var teamCode = db.Team.findOne({teamCode:postData.groupId}).teamCode
                    if( teamCode != null && teamCode != undefined) {
                        db.Pin.update(
                            { pin:postData.pin },
                            { $set: {teamCode: postData.groupId} }
                        )
                    }
                }



                //var teamCode = db.Pin.findOne({pin:postData.pin}).teamCode
                //if( teamCode != null && teamCode != undefined) {
                //    db.Competition23.update({_id: id},{$set:{teamCode:teamCode}})
                //}

                return (JSON.stringify(postData))
            }
            else {
                this.setStatusCode(402);
                return 'Missing Data'
            }

        }
    },

// *******************************************************************
//
//            Api for stationRanking - Station2,3,4
//            Ranks Players for Station X, including anonymous - Results in One Entry per Pin (including -1)
//
// *******************************************************************
    '/api/station': {
        post: function (data) {
            var postData = JSON.parse(data);
            console.log("API: station - Data", postData)
            if(!postData.stationId)
                return "Error: no stationId provided"


            var result = db.Competition23.aggregate([

                    {   $match:
                        {
                            stationId:postData.stationId
                        }
                    },
                    { "$sort":
                        {
                            "totalPoints": -1
                        }
                    },
                    {    $group:
                        {
                            _id: "$pin",
                            totalPoints: { $max: "$totalPoints" },
                            pin : { $first: '$pin' },
                            time : { $first: '$time' }
                        }
                    },
                    { "$sort":
                        {
                            "totalPoints": -1
                        }
                    }

                ]
            )



            var res = []

            _.forEach(result, function(item){
                var userPin = db.Pin.findOne({pin:item.pin});
                var userName = "anonymous";
                if(userPin && userPin.userId) {
                    var mUser = Meteor.users.findOne(
                        {_id:userPin.userId}
                    )
                    if(mUser && mUser.profile && mUser.profile.userName) {
                        userName = mUser.profile.userName;
                    }
                }

                var entry = { totalPoints:item.totalPoints, time:item.time, userName:userName, pin:item.pin }
                res.push( entry )
            });

            return ("{\"data\":" + JSON.stringify(res) + "}" )
        }
    },

    '/api/station_new': {
        post: function (data) {
            var postData = JSON.parse(data);
            console.log("API: station - Data", postData)
            if(!postData.stationId)
                return "Error: no stationId provided"

            var highscores = db.Highscores.find(
                {stationId:postData.stationId},
                {fields: {_id:0, userId:0}}).fetch()


            return ("{\"data\":" + JSON.stringify(highscores) + "}" )
        }
    },

// *******************************************************************
//
//            Api for stationRanking - Station2,3,4
//
// *******************************************************************
    '/api/user': {
        post: function (data) {
            var postData = JSON.parse(data);
            console.log("API: user - Data", postData)
            if(!postData.pin || !postData.stationId)
                return "Error: no pin provided"

            var result = db.Competition23.aggregate([

                    {   $match:
                        {
                            stationId:postData.stationId
                        }
                    },
                    { "$sort":
                        {
                            "totalPoints": -1
                        }
                    },
                    {    $group:
                        {
                            _id: "$pin",
                            totalPoints: { $max: "$totalPoints" },
                            pin : { $first: '$pin' },
                            time : { $first: '$time' }
                        }
                    },
                    { "$sort":
                        {
                            "totalPoints": -1
                        }
                    }

                ]
            )

            console.log("XXXXX1", JSON.stringify(result) )


            var rank = 1
            var data;

            _.forEach(result, function(item){
                console.log(1)
                if(item.pin == postData.pin) {
                    console.log(2)
                    var userPin = db.Pin.findOne({pin: item.pin});
                    var userName = "anonymous";
                    if (userPin && userPin.userId) {
                        console.log(3)
                        var mUser = Meteor.users.findOne(
                            {_id: userPin.userId}
                        )
                        if (mUser && mUser.profile && mUser.profile.userName) {
                            userName = mUser.profile.userName;
                        }
                    }

                    var entry = {
                        totalPoints: item.totalPoints,
                        time: item.time,
                        userName: userName,
                        pin: item.pin,
                        rank: rank,
                        stationId: postData.stationId
                    }

                    console.log("XXXXX2", JSON.stringify(entry) )

                    data = entry;
                    return;

                    //return ("{\"data\":" + JSON.stringify(entry) + "}" )
                }
                else
                    rank++;
            });

            //var result = db.Competition23.findOne({
            //        pin:postData.pin,
            //        stationId: postData.stationId
            //    },
            //    {
            //        fields: {
            //            totalPoints: 1,
            //            time:1,
            //            stationId:1,
            //            _id:0
            //        },
            //        sort: {
            //            totalPoints: -1
            //        },
            //        limit: 50
            //    }
            //);
            return ("{\"data\":" + JSON.stringify(data) + "}" )
        }
    },

// *******************************************************************
//
//            Api for stationRanking - Station2,3,4
//
// *******************************************************************
    '/api/ranking': {
        post: function (data) {
            var postData = JSON.parse(data);
            console.log("API: ranking - Data", postData)
            if(!postData.stationId)
                return "Error: no stationId provided"

            var lastNoName = db.Competition23.findOne(
                {pin:"-1"}, {sort: {createdAt: -1}}

            )

            if(!lastNoName) {
                return ("{\"data\":false}" )
            }

            var result = db.Competition23.aggregate([

                    {   $match:
                    {
                        stationId:postData.stationId
                    }
                    },
                    { "$sort":
                    {
                        "totalPoints": -1
                    }
                    },
                    {    $group:
                    {
                        _id: "$pin",
                        totalPoints: { $max: "$totalPoints" },
                        pin : { $first: '$pin' },
                        time : { $first: '$time' }
                    }
                    },
                    { "$sort":
                    {
                        "totalPoints": -1
                    }
                    }

                ]
            )

            if(!result) {
                return ("{\"data\":\"ranking\": 1}" )
            }

            console.log("XXXXX1", JSON.stringify(result) )


            var rank = 1
            var data;

            _.forEach(result, function(item){
                console.log(1)
                if( lastNoName.totalPoints >= item.totalPoints ) {
                    console.log(2)


                    var entry = {
                        totalPoints: lastNoName.totalPoints,
                        time: lastNoName.time,
                        ranking: rank,
                    }

                    console.log("XXXXX2", JSON.stringify(entry) )

                    data = entry;
                    return;

                    //return ("{\"data\":" + JSON.stringify(entry) + "}" )
                }
                else
                    rank++;
            });

            return ("{\"data\":" + JSON.stringify(data) + "}" )
        }
    }
});