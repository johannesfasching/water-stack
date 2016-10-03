function getImageUrl() {
    return Images.findOne({_id:Meteor.user().profile.picture}).url();
}


Template.profile.events({
    'change #imagesProfile': function(event, template) {
        FS.Utility.eachFile(event, function(file) {

            Images.insert(file, function (err, fileObj) {
                Meteor.users.update(
                    {_id:Meteor.userId()},
                    {$set: {'profile.picture':fileObj._id} }

                );

            });


        });
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

Template.profile.helpers({
    assignedPins: function() {
        result = []
        var pin = db.Pin.find({userId:Meteor.userId()}).fetch();
        console.log(pin)

        pin.forEach(function(item) {
            console.log(item)
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

        console.log("assignedPins",result)

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
        return getImageUrl();
    },

    profileName: function () {
        return Meteor.user().profile.userName;
    },

    profileEmail: function () {
        return Meteor.user().profile.email;
    }


})