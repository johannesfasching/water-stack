Meteor.methods({
    'addPinCode': function (usrObj) {
        var retObj = {}
        console.log(usrObj)
        var result = db.Pin.findOne({pin: usrObj.pin})
        console.log(result)



        if (result === undefined) {
            retObj.error = true
            retObj.message = "Die PIN gibt es nicht"
        }
        else {
            if (result.userId === undefined) {
                retObj.error = false
                retObj.message = "Die PIN wurde erfolgreich zugewiesen"
                //if (usrObj.teamCode != "") {
                //    db.Pin.update(result._id, {userId: usrObj.userId, pin: usrObj.pin, teamCode: usrObj.teamCode}, { selector: { type: 'user' } })
                //}
                //else {
                    db.Pin.update(
                        result._id,
                        { $set: {
                            userId: usrObj.userId
                        }})
                //}
            }
            else {
                retObj.error = true
                retObj.message = "Die PIN wurde bereits verwendet"
            }
        }
        return retObj;
    }
});