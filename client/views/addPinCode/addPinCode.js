Template.addPinCode.events({
    'click #addPinCodeSubmitButton': function(e) {
        var userObj = {}
        userObj.userId = Meteor.userId();
        userObj.username = Meteor.userId().username;
        userObj.pin = $("#pinCodeInput").val()
        Meteor.call("addPinCode", userObj, function(error, retObj) {
            if(retObj.error) {
                $("#pinError").addClass("error");
                $("#pinError").removeClass("success hidden")
                $("#pinErrorMessage").text(retObj.message)
            }
            else {
                $("#pinError").addClass("success");
                $("#pinError").removeClass("error hidden")
                $("#pinErrorMessage").text(retObj.message)
            }
            console.log(retObj)
        })
    },
    //
    //'click .addTeamCodeSubmitButton': function(e) {
    //    console.log(this.pin.pin)
    //    var userObj = {}
    //    userObj.userId = Meteor.userId();
    //    userObj.username = Meteor.userId().username;
    //    userObj.pin = this.pin.pin
    //    userObj.teamCode = $("#teamIDInput").val()
    //    Meteor.call("addTeamCode", userObj, function(error, retObj) {
    //        if(retObj.error) {
    //            $("#pinError").addClass("error");
    //            $("#pinError").removeClass("success hidden")
    //            $("#pinErrorMessage").text(retObj.message)
    //        }
    //        else {
    //            $("#pinError").addClass("success");
    //            $("#pinError").removeClass("error hidden")
    //            $("#pinErrorMessage").text(retObj.message)
    //        }
    //        console.log(retObj)
    //    })
    //}

});

Template.addPinCode.helpers({
    assignedPins: function() {
        result = []
        var pin = db.Pin.find({userId:Meteor.userId()}).fetch();
        console.log(pin)

        pin.forEach(function(item) {
            console.log(item)
            var team = {}
            if(item.teamCode!=undefined && item.teamCode!="") {
                team = db.Team.findOne({teamCode:item.teamCode});
            }
            result.push({pin:item, team:team })
        })

        console.log("assignedPins",result)

        return result
    }


})
