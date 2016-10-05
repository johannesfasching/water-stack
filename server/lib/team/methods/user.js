Meteor.methods({
    'addTeamCode': function (usrObj) {
        var retObj = {}
        console.log("INPUT:::",   usrObj)

        var team = db.Team.findOne({teamCode: usrObj.teamCode})
        var pin = db.Pin.findOne({pin: usrObj.pin})
        console.log("team: ", team)
        console.log("pin: ", pin)

        if (team == undefined) {
            retObj.error = true
            retObj.message = "Den TeamCode gibt es nicht"
        }
        else {
            db.Pin.update(
                pin._id,
                {
                    $set: {
                        teamCode: usrObj.teamCode
                    }
                },
                {selector: {type: 'user'}})
            retObj.error = false
            retObj.message = "Erfolgreich zugewiesen"
        }


    console.log(retObj)
    return retObj;
}
})
;