function getImageUrl() {
    return Images.findOne({_id:Meteor.user().profile.picture}).url();
}

ShareIt.configure({
    sites: {                // nested object for extra configurations
        'facebook': {
            'appId': 1008589855934836   // use sharer.php when it's null, otherwise use share dialog
        },
        'twitter': {},
        'googleplus': {},
        'pinterest': {}
    },
    classes: "large btn", // string (default: 'large btn')
                          // The classes that will be placed on the sharing buttons, bootstrap by default.
    iconOnly: false,      // boolean (default: false)
                          // Don't put text on the sharing buttons
    applyColors: true,     // boolean (default: true)
    // apply classes to inherit each social networks background color
    faSize: '',            // font awesome size
    faClass: ''       // font awesome classes like square
});

getimagebyid = function(userId) {
    if(!userId) {
        return "./assets/images/anonym.png"
    }
    console.log("userId", userId)
    var user = Meteor.users.findOne(userId);
    if(!user) {
        return "./assets/images/anonym.png"
    }

    if (user.services) {
        if (user.services.facebook) {
            console.log("FACEBOOK")
            return "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=square"
        }
        else if (user.services.google) {
            console.log("GOOGLE")
            return user.services.google.picture;
        }
        else {
            var img = Images.findOne({_id: user.profile.picture}).url();
            if (img)
                return img
            else
                return "./assets/images/anonym.png"

        }
    }
    else
        return "./assets/images/anonym.png"
};



Template.profile.events({
    'change #imagesProfile': function(event, template) {
        FS.Utility.eachFile(event, function(file) {

            console.log(file)

            Images.insert(file, function (err, fileObj) {
                Meteor.users.update(
                    {_id:Meteor.userId()},
                    {$set: {'profile.picture':fileObj._id} }
                );
            });
        });
    },

    'click .ui.key-value.view>li>.action': function(event, template) {
        //clicked = console.log(event.currentTarget.sibling("input"))

        $(event.currentTarget)
            .siblings(".valueEdit").removeClass("hidden")
            .siblings(".valueShow").addClass("hidden")

        $(event.currentTarget)
            .find("svg").removeClass("edit").addClass("check")
            .find("use").attr("href","./assets/images/icons.svg#check")

        $(event.currentTarget)
            .parent().parent().addClass("edit").removeClass("view")
    },

    'click .ui.key-value.edit>li>.action': function(event, template) {
        //clicked = console.log(event.currentTarget.sibling("input"))

        $(event.currentTarget)
            .siblings(".valueEdit").addClass("hidden")
            .siblings(".valueShow").removeClass("hidden")

        $(event.currentTarget)
            .find("svg").removeClass("check").addClass("edit")
            .find("use").attr("href","./assets/images/icons.svg#edit")

        $(event.currentTarget)
            .parent().parent().addClass("view").removeClass("edit")



        if($(event.currentTarget).siblings(".key").text() === "Benutzername") {
            var userName = $(event.currentTarget).siblings("input").val();
            Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.userName": userName}});
            Meteor.users.update({_id: Meteor.userId()}, {$set: {"username": userName}});
        }
        else if($(event.currentTarget).siblings(".key").text() === "Email-Adresse") {
            var email = $(event.currentTarget).siblings("input").val();
            if (Meteor.users.findOne({'emails.address': email, id: {$not: Meteor.userId}})) {
                console.log("already existing");
                //error.push({name: "email", type: "exist"});
            }
            else
                Meteor.users.update({_id: Meteor.userId()}, {$set: {'emails.0.address': email}});
        }
        else if($(event.currentTarget).siblings(".key").text() === "Passwort") {
            var pass = $(event.currentTarget).siblings("input").val();
            Meteor.call("changePW", pass)
        }
        else if($(event.currentTarget).siblings(".key").text() === "Alter") {
            var selectedId = $('input[name="age"]:checked').attr("id")
            var selectedOption = 0;
            _.forEach(ages, function(val, nr) {
                if(selectedId == val.id) {
                    selectedOption = nr;
                }
            });
            console.log(selectedOption)
            Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.age': selectedOption}});
        }
        else if($(event.currentTarget).siblings(".key").text() === "Geschlecht") {
            var selectedId = $('input[name="sex"]:checked').attr("id")
            console.log("SEX",selectedId)
            var selectedOption = 0;
            _.forEach(sexes, function(val, nr) {
                if(selectedId == val.id) {
                    selectedOption = nr;
                }
            });
            console.log(selectedOption)
            Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.sex': selectedOption}});
        }
    },

    'click #addPinCodeSubmitButton': function(e) {
        console.log("WUHUUUUUUU")
        var userObj = {}
        userObj.userId = Meteor.userId();
        userObj.username = Meteor.userId().username;
        userObj.pin = $("#teamCodeInput").val()
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

    'click #addTeamCodeSubmitButton22': function(e) {
        e.preventDefault()
        var userObj = {}
        userObj.userId = Meteor.userId();
        userObj.username = Meteor.userId().username;
        userObj.pin = Session.get("pinToAssignTeam");
        userObj.teamCode = $("#teamCodeInput").val()
        Meteor.call("addTeamCode", userObj, function(error, retObj) {
            console.log("DONE")
            if(retObj.error) {
                $("#teamError").addClass("error");
                $("#teamError").removeClass("success hidden")
                $("#teamErrorMessage").text(retObj.message)
            }
            else {
                $("#teamError").addClass("success");
                $("#teamError").removeClass("error hidden")
                $("#teamErrorMessage").text(retObj.message)
            }
            console.log(retObj)
        })
    }
});

//Template.imageView.helpers({
//    profileImage: function () {
//        return getImageUrl();
//    }
//});

//Template.profile.doc = function () {
//    return Meteor.user();
//};
//
//Template.imageView.helpers({
//    profileImage: function () {
//        return getImageUrl();
//    }
//});
//
//Template.profile.rendered = function () {
//    $("[name='profile.age']").val(Meteor.user().profile.age);
//    $("[name='profile.sex']").val(Meteor.user().profile.sex);
//}

var ages = [
    {label: "0-6 Jahre", id: "age_1", name:"age"},
    {label: "6-10 Jahre", id: "age_2", name:"age"},
    {label: "10-14 Jahre", id: "age_3", name:"age"},
    {label: "14-18 Jahre", id: "age_4", name:"age"},
    {label: "18-35 Jahre", id: "age_5", name:"age"},
    {label: "35-99+ Jahre", id: "age_6", name:"age"},
    {label: "Geheim", id: "age_7", name:"age"}
]

var sexes = [
    {label: "Geheim", id: "sex_1", name:"sex"},
    {label: "Weiblich", id: "sex_2", name:"sex"},
    {label: "Männlich", id: "sex_3", name:"sex"}
]

Tracker.autorun(function() {
    Session.get("assignedPinsss")
    Meteor.setTimeout(function() {
        $("#addTeam").modal("attach events", ".add-team");
        $(".add-team").click(function() {
            $("#teamError").addClass('hidden')
        })
    },500)

})

Tracker.autorun(function () {

    var pins = db.Pin.find({userId: Meteor.userId()});
    var pinList = [];
    pins.forEach( function(item) {
        pinList.push(item.pin)
    });
    console.log("pins",pinList);


    Session.set("pins", pinList);

    Meteor.call("countStations",{pins: Session.get("pins")}, function(err, data) {
        console.log("counter", data)
        Session.set("Counter",data)
    })
});

Template.profile.helpers({
    assignedPins: function() {
        result = []
        var pin = db.Pin.find({userId:Meteor.userId()},{sort: {pin: -1}}).fetch();

        pin.forEach(function(item) {
            var team = {}
            var teamMembersAtPIN = {}
            var teamMembers = []


            if(item.teamCode!=undefined && item.teamCode!="") {
                team = db.Team.findOne({teamCode:item.teamCode});

                var teamMembersAtPIN = db.Pin.find({teamCode:item.teamCode}).fetch();
                teamMembersAtPIN.forEach(function teamMember(teamMemb) {
                    var user = Meteor.users.findOne({_id:teamMemb.userId});
                    teamMembers.push(user);
                });
            }
            result.push({pin:item, team:team, teamMembers:teamMembers })
        })

        Session.set("assignedPinsss",result)

        return result
    },

    assignedTeamMembers: function(teamCode) {

        pin.forEach(function(item) {
            console.log(item)
            var team = {}
            if(item.teamCode!=undefined && item.teamCode!="") {
                team = db.Team.findOne({teamCode:item.teamCode});
            }
            result.push({pin:item, team:team })
        })
        console.log()

    },

    profileImage: function () {
        return getimagebyid(Meteor.userId());
    },

    profileName: function () {
        return Meteor.user().profile.userName;
    },

    profileEmail: function () {
        return Meteor.user().emails[0].address;
    },

    ageData: function() {
        return ages;
    },

    sexData: function() {
        return sexes;
    },

    profileAge: function() {
        return ages[Meteor.user().profile.age].label
    },

    profileSex: function() {
        var sex = Meteor.user().profile.sex
        if(sex===2)
            return "Männlich"
        else if(sex===1)
            return "Weiblich"
        else
            return "Geheim"
    },

    pinToAssignTeam: function() {
        return Session.get("pinToAssignTeam")
    },

    scores: function () {
        var counter = Session.get("Counter")
        return "Ich hab " + String(counter.countSum) + " mal gespielt und dabei insgesamt " + String(counter.allEarnedPoints) + " Punkte erreicht"
    }




})

Template.addedPinsRow.events({
    'click .add-team': function(event, template) {
        Session.set("pinToAssignTeam",this.pin.pin)
    }
})