Meteor.methods({
    'insertPINs': function(pins){

        if(pins == undefined) {



            for(var i=0; i<2000; i++) {
                var strI = String(i)
                while(strI.length < 8)
                    strI = "0"+strI;
                p = strI
                result = db.Pin.findOne({pin:p})
                if(result == undefined) {
                    console.log(result)
                    db.Pin.insert({pin:p}, { selector: { type: 'admin' } })
                }
                else {
                    console.log(p,"already existing")
                }
            }
        }

        else {
            _.forEach(pins, function(pin) {
                console.log(pin)
                result = db.Pin.findOne({pin:pin})
                if(result == undefined) {
                    console.log(result)
                    db.Pin.insert({pin:pin}, { selector: { type: 'admin' } })
                }
                else {
                    console.log(pin,"already existing")
                }
            });
        }
        var currentUserId = Meteor.userId();
    }
});

