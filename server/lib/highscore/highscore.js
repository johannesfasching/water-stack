Meteor.methods({
    'highscore23':
         function (postData) {
            //console.log("data", postData)
            if(!postData.stationId)
                return "Error: no stationId provided"
            if(!postData.timerange)
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
                    },
                    {
                        $limit:100
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

                var entry = { rank:rank, totalPoints:item.totalPoints, time:item.time, userName:userName, pin:item.pin, userId: userId }
                res.push( entry )
                rank++
            });

            //return res;
             console.log("result:",JSON.stringify(res))
            return res;
        },

    'highscore23_team':
        function (postData) {
            console.log("data", postData)
            if(!postData.stationId)
                return "Error: no stationId provided"
            if(!postData.timerange)
                return "Error: alltime or week not provided"
            if(!postData.teamCode)
                return "Error: teamCode not provided"




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
                    },
                    {
                        $limit:100
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

                var entry = { rank:rank, totalPoints:item.totalPoints, time:item.time, userName:userName, pin:item.pin, userId: userId }
                res.push( entry )
                rank++
            });

            //return res;
            console.log("result:",JSON.stringify(res))
            return res;
        },

    'highscore_team':
        function (postData) {
            if(!postData.timerange)
                return "Error: alltime or week not provided"
            if(!postData.teamCode)
                return "Error: teamCode not provided"

            console.log("MeteorMethod: highscore_team", postData)

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
                        $limit:100
                    }

                ]
            )

            console.log("XXXXX", JSON.stringify(result) )


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
            console.log("result:",JSON.stringify(res))
            return res;
        },



    'highscore_team':
        function (postData) {
            if(!postData.timerange)
                return "Error: alltime or week not provided"
            if(!postData.teamCode)
                return "Error: teamCode not provided"

            console.log("MeteorMethod: highscore_team", postData)

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
                    },
                    {
                        $limit:100
                    }

                ]
            )

            console.log("XXXXX", JSON.stringify(result) )


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

                var entry = { rank:rank, totalPoints:item.totalPoints, userName:userName, pin:item.pin, userId: userId }
                res.push( entry )
                rank++
            });

            //return res;
            console.log("result:",JSON.stringify(res))
            return res;
        },

    'countStations':
        function (data) {
            //console.log(data)
            if(!data.pins || data.pins.length == 0)
                return "Error: no stationIds provided"



            var cntStat1 = db.Competition.find({pin: {$in: data.pins}}).count();
            var cntStat2 = db.Competition23.find({pin: {$in: data.pins}, stationId:"station2"}).count();
            var cntStat3 = db.Competition23.find({pin: {$in: data.pins}, stationId:"station3"}).count();
            var cntStat4 = db.Competition23.find({pin: {$in: data.pins}, stationId:"station4"}).count();

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
                        totalPoints: { $sum: "totalPoints" }
                    }
                    }
                ]
            )

            console.log("result1", result1)
            console.log("result2", result2)

            var res1 = result1[0]?result1[0].totalPoints:0
            var res2 = result2[0]?result2[0].totalPoints:0


            var allEarnedPoints = res1+res2

            return { countStation1:cntStat1, countStation2:cntStat2, countStation3:cntStat3, countStation4:cntStat4, allEarnedPoints: allEarnedPoints  }
        }

});