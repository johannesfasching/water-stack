Meteor.methods({
    'teamCodeIsAvailable': function (teamCode) {


        result = db.Pin.findOne({teamCode: teamCode})
        if (result == undefined) {
            return true;
        }
        else {
            return false;
        }
    },

    'insertTeamCodes': function(teamCodes){

        console.log("insert")
        if(teamCodes == undefined) {
            console.log("insert")
            for(var i=0; i<50; i++) {
                console.log("insert",i)
                t = "t"+i
                result = db.Team.findOne({teamCode:t})
                console.log(result)
                if(result == undefined) {
                    console.log(result)
                    db.Team.insert({title:"Team "+t, teamCode:t})
                }
                else {
                    console.log(t,"already existing")
                }
            }
        }

        else {
            _.forEach(teamCodes, function (t) {
                console.log(t)
                result = db.Team.findOne({teamCode: t})
                if (result == undefined) {
                    console.log(result)
                    db.Team.insert({teamCode: t})
                }
                else {
                    console.log(t, "already existing")
                }
            });
        }
    },

    'copyGroupIdToTeamCode': function() {
        var comps = db.Competition23.find({groupId:{ $exists: true }}).fetch()
        _.forEach(comps, function(item){
            var teamCode = db.Team.findOne({teamCode: item.groupId});
            if(teamCode !== undefined && teamCode !== null) {
                console.log("modifying old/new", item.teamCode, item.groupId)
                db.Competition23.update({_id:item._id}, {$set:{teamCode:item.groupId}})
            }
        })
    }
});