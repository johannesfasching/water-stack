Meteor.publish('userData', function() {
    //if(!this.userId) return null;
    return Meteor.users.find({}, {fields: {
        emails: 1,
        profile: 1
    }});
});