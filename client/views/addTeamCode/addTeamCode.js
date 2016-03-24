Template.addPinCode.events({
    'click .addTeamCodeSubmitButton': function(e) {
        console.log(this.pin.pin)
        var userObj = {}
        userObj.userId = Meteor.userId();
        userObj.username = Meteor.userId().username;
        userObj.pin = this.pin.pin
        userObj.teamCode = $("#teamIDInput").val()
        Meteor.call("addTeamCode", userObj, function(error, retObj) {
            if(retObj.error) {
                $("#pinCodeError").addClass("error");
                $("#pinCodeError").removeClass("success hidden")
                $("#pinCodeErrorMessage").text(retObj.message)
            }
            else {
                $("#pinCodeError").addClass("success");
                $("#pinCodeError").removeClass("error hidden")
                $("#pinCodeErrorMessage").text(retObj.message)
            }
            console.log(retObj)
        })
    }

});