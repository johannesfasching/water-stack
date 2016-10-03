Meteor.methods({
    'highscore23':
         function (data) {
            var postData = JSON.parse(data);
            //console.log("data", postData)
            if(!postData.stationId)
                return "Error: no stationId provided"
            if(!postData.timerange)
                return "Error: alltime or week not provided"

            var startDate
            if(postData.timerange === "week")
                startDate = moment().startOf('week').add(-6, 'days').toDate();
             if(postData.timerange === "all")
                 startDate = moment().startOf('week').add(-10, 'years').toDate();

            var endDate = moment().add(10, 'days').toDate();

            var result = db.Competition23.aggregate([

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

            //console.log("XXXXX", JSON.stringify(result) )


            var res = []
            var rank = 1

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

                var entry = { rank:rank, totalPoints:item.totalPoints, time:item.time, userName:userName, pin:item.pin }
                res.push( entry )
                rank++
            });

            //return res;
             console.log("result:",JSON.stringify(res))
            return res;
        },
    'countStations':
        function (data) {
            if(!data.pin)
                return "Error: no stationId provided"

            var cntStat1 = db.Competition.find({pin:data.pin, stationId:"station1"}).count();
            var cntStat2 = db.Competition.find({pin:data.pin, stationId:"station1"}).count();
            var cntStat3 = db.Competition.find({pin:data.pin, stationId:"station1"}).count();

            return { countStation1:cntStat1, countStation2:cntStat2, countStation2:cntStat3  };
        }

});