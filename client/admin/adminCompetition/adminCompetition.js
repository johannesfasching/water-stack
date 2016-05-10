


Template.adminCompetition.rendered = function () {
    $("[name='stationId']").val(db.Competition.findOne({_id:FlowRouter.getParam("_id")}).stationId);
    $("[name='profile.sex']").val(Meteor.user().profile.sex);
}

Template.adminCompetition.helpers({
    getData: function () {
        return db.Competition.findOne({_id:FlowRouter.getParam("_id")});
    }
});