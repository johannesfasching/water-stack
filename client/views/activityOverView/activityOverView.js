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



Template.activityOverView.helpers({

    counter: function () {
        return Session.get("Counter")
    }
});