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

Template.imageView.helpers({
    profileImage: function () {
        return getImageUrl();
    }
});