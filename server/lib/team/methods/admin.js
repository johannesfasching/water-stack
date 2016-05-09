Meteor.methods({
    'teamCodeIsAvailable': function (teamCode) {


        result = db.Pin.findOne({teamCode: teamCode})
        if (result == undefined) {
            return true;
        }
        else {
            return false;
        }

        var currentUserId = Meteor.userId();
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
                    db.Team.insert({title:"Team "+t, teamCode:t}, { selector: { type: 'admin' } })
                }
                else {
                    console.log(t,"already existing")
                }
            }
        }

        else {
            _.forEach(teamCodes, function (t) {
                console.log(t)
                result = db.Team.findOne({teamCode: t}, { selector: { type: 'admin' } })
                if (result == undefined) {
                    console.log(result)
                    db.Team.insert({teamCode: t})
                }
                else {
                    console.log(t, "already existing")
                }
            });
        }

        var currentUserId = Meteor.userId();
    }
});