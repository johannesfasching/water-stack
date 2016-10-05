function getImageUrl() {
    return Images.findOne({_id:Meteor.user().profile.picture}).url();
}

Template.createTeam.helpers({

    profileImage: function () {
        return getImageUrl();
    },

    profileName: function () {
        return Meteor.user().profile.userName;
    },

    profileEmail: function () {
        return Meteor.user().emails[0].address;
    },

    teamUpdate: function() {
        var a = db.Team.findOne({teamCode:Session.get("selectedTeamId")});
        return a
    },

    teamId: function() {
        return db.Team.findOne({teamCode:Session.get("selectedTeamId")})._id;
    },

    ownedTeams: function() {
        return db.Team.find({creatorId:Meteor.userId()});
    },

    hasOwnedTeams: function() {
        return  db.Team.find({creatorId:Meteor.userId()}).count()
    },

    assignedTeamMembers: function() {
        console.log("search team id", Session.get("selectedTeamId"))
        var pin = db.Pin.find({teamCode:Session.get("selectedTeamId")}).fetch();
        var pins = []
        pin.forEach(function(item) {
            pins.push(item.userId)
        })
        var users = Meteor.users.find({_id:{$in:pins}}).fetch();

        //Session.set("assignedPins",pin)

        return users
    }


})

Template.createTeam.events({
    'click .team-row': function (e) {
        console.log(this.teamCode)
        Session.set("selectedTeamId", this.teamCode);
        Session.set("selectedTeamId", this.teamCode);
        $(".team-row").removeClass("active")
        $(e.target).parent().addClass("active")
    },
    'click .updateSubmit,deleteSubmit': function (e) {
        delete Session.keys['selectedTeamId']
    },
    'click .newTeamButton': function (e) {
        $(".newTeam").removeClass("hidden")
    }
});