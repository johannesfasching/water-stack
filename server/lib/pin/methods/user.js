Meteor.methods({
    'addPinCode': function (usrObj) {
        var retObj = {}
        console.log(usrObj)
        var result = db.Pin.findOne({pin: usrObj.pin})
        console.log(result)



        if (result === undefined || result === null || result ===false) {
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
    },
    'deleteDoublePins': function(bla) {
        var pins = db.Pin.find({},{sort:{pin:1}}).fetch()
        var old = {}
        _.forEach(pins, function(item) {
            if(item.pin === old.pin) {
                console.log(old.pin, old.teamCode, old.userId,item.pin, item.teamCode, item.userId)
                if(!old.teamCode && !old.userId) {
                    console.log("delete old")
                    db.Pin.remove(old._id)
                }
                else if(!item.teamCode && !item.userId) {
                    console.log("delete new")
                    db.Pin.remove(item._id)
                }
                else if(item.teamCode == old.teamCode && item.userId == old.userId) {
                    console.log("delete old2")
                    db.Pin.remove(old._id)
                }
                //if(item.teamCode && item.userId) {
                //    console.log("delete old")
                //}
            }

            old=item
        })
        return true;
    }
});