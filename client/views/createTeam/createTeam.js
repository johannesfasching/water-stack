Template.createTeam.helpers({

    profileImage: function () {
        return getImageUrl();
    },

    profileName: function () {
        return Meteor.user().profile.userName;
    },

    profileEmail: function () {
        return Meteor.user().emails[0].address;
    }

})
