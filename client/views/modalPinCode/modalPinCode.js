Template.modalPinCode.events({
    'click #addPinCodeSubmitButton2': function(e) {
        e.preventDefault();
        console.log("CLICKEEEE");
        alert("wuhuu");
        //var userObj = {};
        //userObj.userId = Meteor.userId();
        //userObj.username = Meteor.userId().username;
        //userObj.pin = $("#pinCodeInput").val()
        //Meteor.call("addPinCode", userObj, function(error, retObj) {
        //    if(retObj.error) {
        //        $("#pinError").addClass("error");
        //        $("#pinError").removeClass("success hidden")
        //        $("#pinErrorMessage").text(retObj.message)
        //    }
        //    else {
        //        $("#pinError").addClass("success");
        //        $("#pinError").removeClass("error hidden")
        //        $("#pinErrorMessage").text(retObj.message)
        //    }
        //    console.log(retObj)
        //})
    }
});

