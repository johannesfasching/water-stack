Meteor.methods({
    'myScores':
        function(postData) {
            console.log("starting myScores ", postData)

            var pin = db.Pin.find( {userId:Meteor.userId()});
            var pins = []
            pin.forEach(function(item) {
                pins.push(item.pin)
            })

            var stat1 = db.Competition.findOne({pin: {$in: pins}},{sort: {"gamePoints": -1}})
            var stat2 = db.Competition23.findOne({pin: {$in: pins}, stationId: "station1"},{sort: {"totalPoints": -1}})
            var stat3 = db.Competition23.findOne({pin: {$in: pins}, stationId: "station2"},{sort: {"totalPoints": -1}})
            var stat4 = db.Competition23.findOne({pin: {$in: pins}, stationId: "station3"},{sort: {"totalPoints": -1}})

            return {scoreStat1:stat1, scoreStat2:stat2, scoreStat3:stat3, scoreStat4:stat4}
        },

    'myHighscore':
        function (postData) {
            //console.log("data", postData)
            console.log("starting myhighscore ", postData)


            if(postData.timerange === undefined)
                return "Error: alltime or week not provided"

            var startDate
            if(postData.timerange === "week")
                startDate = moment().startOf('isoWeek').toDate();
            if(postData.timerange === "all")
                startDate = moment().add(-10, 'years').toDate();

            var endDate = moment().add(10, 'days').toDate();

            var result = db.Competition.aggregate([

                    {   $match:
                    {
                        createdAt: {
                            $gte: startDate,
                            $lt: endDate
                        }
                    }
                    },
                    { "$sort":
                    {
                        "gamePoints": -1
                    }
                    },
                    {    $group:
                    {
                        _id: "$pin",
                        totalPoints: { $max: "$gamePoints" },
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

            var rank = 1

            var myId = this.userId;
            var resss = { rank:-1, totalPoints:0, time:0, pin:0, hasPlayed:false };

            _.forEach(result, function(item){
                var userPin = db.Pin.findOne({pin:item.pin});
                //console.log(userPin)
                if(userPin && userPin.userId) {
                    if(myId == userPin.userId) {
                        resss = { rank:rank, totalPoints:item.totalPoints, pin:item.pin, hasPlayed:true }
                        return;
                    }
                }
                rank++
            });

            return resss;
        },

    'myHighscore23':
        function (postData) {
            console.log("starting MYhighscore23 ", postData)

            //console.log("data", postData)
            //console.log("data", postData.stationId)

            if(postData.stationId === undefined)
                return "Error: no stationId provided"
            if(postData.timerange === undefined)
                return "Error: alltime or week not provided"

            var startDate
            if(postData.timerange === "week")
                startDate = moment().startOf('isoWeek').toDate();
            if(postData.timerange === "all")
                startDate = moment().add(-10, 'years').toDate();

            var endDate = moment().add(10, 'days').toDate();

            var result = db.Competition23.aggregate([

                    {   $match:
                    {
                        stationId:postData.stationId,
                        createdAt: {
                            $gte: startDate,
                            $lt: endDate
                        }

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


            var rank = 1

            var myId = this.userId;
            var resss = { rank:-1, totalPoints:0, time:0, pin:0, hasPlayed:false };

            _.forEach(result, function(item){
                var userPin = db.Pin.findOne({pin:item.pin});
                //console.log(userPin)
                if(userPin && userPin.userId) {
                    if(myId == userPin.userId) {
                        resss = { rank:rank, totalPoints:item.totalPoints, time:item.time, pin:item.pin, hasPlayed:true }
                        return;
                    }
                }
                rank++
            });

            return resss;
        },

    'highscore23':
         function (postData) {
             console.log("starting highscore23 ", postData)

             //console.log("data", postData)
            if(!postData.stationId)
                return "Error: no stationId provided"
            if(!postData.timerange)
                return "Error: alltime or week not provided"

             var limit = 10
             if(postData.limit) {
                 limit = postData.limit
             }



            var startDate
            if(postData.timerange === "week")
                startDate = moment().startOf('isoWeek').toDate();
             if(postData.timerange === "all")
                 startDate = moment().add(-10, 'years').toDate();

            var endDate = moment().add(10, 'days').toDate();



            var result = db.Competition23.aggregate([

                    {   $match:
                    {
                        stationId:postData.stationId,
                        createdAt: {
                            $gte: startDate,
                            $lt: endDate
                        }

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
                    },
                    {
                        $limit:limit
                    }

                ]
            )

            var res = []
            var rank = 1

             //console.log("user:",this.userId)

             var myId = this.userId;

            _.forEach(result, function(item){
                var userPin = db.Pin.findOne({pin:item.pin});
                var userName = "anonymous";
                var userId;
                if(userPin && userPin.userId) {
                    var mUser = Meteor.users.findOne(
                        {_id:userPin.userId}
                    )
                    if(mUser && mUser.profile && mUser.profile.userName) {
                        userName = mUser.profile.userName;
                        userId =  mUser._id;
                    }
                }

                var entry = { rank:rank, totalPoints:item.totalPoints, time:item.time, userName:userName, pin:item.pin, userId: userId, owned: myId===userId }
                res.push( entry )
                rank++
            });

            //return res;
            // console.log("result:",JSON.stringify(res))
            return res;
        },

    'highscore23_team':
        function (postData) {
            console.log("starting team 23 ", postData.stationId)

            //console.log("data", postData)
            if(!postData.stationId)
                return "Error: no stationId provided"
            if(!postData.timerange)
                return "Error: alltime or week not provided"
            if(!postData.teamCode)
                return "Error: teamCode not provided"


            var limit = 10
            if(postData.limit) {
                limit = postData.limit
            }

            var startDate
            if(postData.timerange === "week")
                startDate = moment().startOf('isoWeek').toDate();
            if(postData.timerange === "all")
                startDate = moment().add(-10, 'years').toDate();

            var endDate = moment().add(10, 'days').toDate();

            var result = db.Competition23.aggregate([

                    {   $match:
                    {
                        stationId:postData.stationId,
                        teamCode: postData.teamCode,
                        createdAt: {
                            $gte: startDate,
                            $lt: endDate
                        }

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
            var rank = 1

            _.forEach(result, function(item){
                var userPin = db.Pin.findOne({pin:item.pin});
                var userName = "anonymous";
                var userId
                if(userPin && userPin.userId) {
                    var mUser = Meteor.users.findOne(
                        {_id:userPin.userId}
                    )
                    if(mUser && mUser.profile && mUser.profile.userName) {
                        userName = mUser.profile.userName;
                        userId =  mUser._id;

                    }
                }

                var entry = { rank:rank, totalPoints:item.totalPoints, time:item.time, userName:userName, pin:item.pin, userId: userId, showPin: true }
                res.push( entry )
                rank++
            });

            console.log("finish team 23 ", postData.stationId)


            //return res;
            //console.log("result:",JSON.stringify(res))
            return res;
        },

    'highscore':
        function (postData) {
            console.log("starting highscore ", postData)

            if(!postData.timerange)
                return "Error: alltime or week not provided"
            //if(!postData.teamCode)
            //    return "Error: teamCode not provided"

            var limit = 10
            if(postData.limit) {
                limit = postData.limit
            }

            //console.log("MeteorMethod: highscore_team", postData)

            var startDate
            if(postData.timerange === "week")
                startDate = moment().startOf('isoWeek').toDate();
            if(postData.timerange === "all")
                startDate = moment().add(-10, 'years').toDate();

            var endDate = moment().add(10, 'days').toDate();

            var result = db.Competition.aggregate([

                    {   $match:
                    {
                        stationId:"station1",
                        createdAt: {
                            $gte: startDate,
                            $lt: endDate
                        }
                    }
                    },
                    { "$sort":
                    {
                        "gamePoints": -1
                    }
                    },
                    {    $group:
                    {
                        _id: "$pin",
                        totalPoints: { $max: "$gamePoints" },
                        pin : { $first: '$pin' }
                    }
                    },
                    { "$sort":
                    {
                        "totalPoints": -1
                    }
                    },
                    {
                        $limit:limit
                    }

                ]
            )

            //console.log("XXXXX", JSON.stringify(result) )


            var res = []
            var rank = 1

            _.forEach(result, function(item){
                var userPin = db.Pin.findOne({pin:item.pin});
                var userName = "anonymous";
                var userId;

                if(userPin && userPin.userId) {
                    var mUser = Meteor.users.findOne(
                        {_id:userPin.userId}
                    )
                    if(mUser && mUser.profile && mUser.profile.userName) {
                        userName = mUser.profile.userName;
                        userId =  mUser._id;
                    }
                }

                var entry = { rank:rank, totalPoints:item.totalPoints, userName:userName, pin:item.pin, userId: userId }
                res.push( entry )
                rank++
            });

            //return res;
            //console.log("result:",JSON.stringify(res))
            return res;
        },



    'highscore_team':
        function (postData) {
            console.log("starting highscoreTeam ", postData)

            if(!postData.timerange)
                return "Error: alltime or week not provided"
            if(!postData.teamCode)
                return "Error: teamCode not provided"

            //console.log("MeteorMethod: highscore_team", postData)

            var startDate
            if(postData.timerange === "week")
                startDate = moment().startOf('isoWeek').toDate();
            if(postData.timerange === "all")
                startDate = moment().add(-10, 'years').toDate();

            var endDate = moment().add(10, 'days').toDate();

            var limit = 10
            if(postData.limit) {
                limit = postData.limit
            }

            var result = db.Competition.aggregate([

                    {   $match:
                    {
                        stationId:"station1",
                        createdAt: {
                            $gte: startDate,
                            $lt: endDate
                        },
                        teamCode: postData.teamCode

                    }
                    },
                    { "$sort":
                    {
                        "gamePoints": -1
                    }
                    },
                    {    $group:
                    {
                        _id: "$pin",
                        totalPoints: { $max: "$gamePoints" },
                        pin : { $first: '$pin' }
                    }
                    },
                    { "$sort":
                    {
                        "totalPoints": -1
                    }
                    }

                ]
            )

            //console.log("XXXXX", JSON.stringify(result) )


            var res = []
            var rank = 1

            _.forEach(result, function(item){
                var userPin = db.Pin.findOne({pin:item.pin});
                var userName = "anonymous";
                var userId;
                if(userPin && userPin.userId) {
                    var mUser = Meteor.users.findOne(
                        {_id:userPin.userId}
                    )
                    if(mUser && mUser.profile && mUser.profile.userName) {
                        userName = mUser.profile.userName;
                        userId = mUser._id
                    }
                }

                var entry = { rank:rank, totalPoints:item.totalPoints, userName:userName, pin:item.pin, userId: userId, showPin: true }
                res.push( entry )
                rank++
            });

            //return res;
            //console.log("result:",JSON.stringify(res))
            return res;
        },

    'countStations':
        function (data) {
            console.log("starting countStations ", data)

            //console.log(data)
            if(data.pins === undefined || data.pins.length == 0)
                return "Error: no stationIds provided"



            var cntStat1 = db.Competition.find({pin: {$in: data.pins}}).count();
            var cntStat2 = db.Competition23.find({pin: {$in: data.pins}, stationId:"station2"}).count();
            var cntStat3 = db.Competition23.find({pin: {$in: data.pins}, stationId:"station3"}).count();
            var cntStat4 = db.Competition23.find({pin: {$in: data.pins}, stationId:"station4"}).count();

            var cntSum = cntStat1 + cntStat2 + cntStat3 + cntStat4

            var result1 = db.Competition.aggregate([
                    {   $match:
                    {
                        pin:{$in: data.pins},
                    }
                    },
                    {    $group:
                    {
                        _id: null,
                        totalPoints: { $sum: "$gamePoints" }
                    }
                    }
                ]
            )

            var result2 = db.Competition23.aggregate([
                    {   $match:
                    {
                        pin:{$in: data.pins},
                    }
                    },
                    {    $group:
                    {
                        _id: null,
                        totalPoints: { $sum: "$totalPoints" }
                    }
                    }
                ]
            )

            //console.log("result1", result1)
            //console.log("result2", result2)



            var res1 = result1[0]!=null?result1[0].totalPoints:0
            var res2 = result2[0]!=null?result2[0].totalPoints:0

            //console.log("res1", res1)
            //console.log("res2", res2)
            var allEarnedPoints = res1+res2
            //console.log("counts",cntStat1, cntStat2, cntStat3, cntStat4,  allEarnedPoints)


            return { countStation1:cntStat1, countStation2:cntStat2, countStation3:cntStat3, countStation4:cntStat4, allEarnedPoints: allEarnedPoints, countSum:cntSum  }
        }

});