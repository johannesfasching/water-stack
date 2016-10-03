Tracker.autorun(function () {
    var pins = db.Pin.find({userId: Meteor.userId()});
    var pinList = [];
    pins.forEach( function(item) {
        pinList.push(item.pin)
    });
    console.log("pins",pinList);
    Session.set("pins", pinList);
});

Template.activityOverView.helpers({

    countStation1: function () {
        var pins = Session.get("pins");
        return db.Competition.find({pin: {$in: pins}, stationId: "station1"}).count();
    },
    countStation2: function () {
        var pins = Session.get("pins");
        return db.Competition23.find({pin: {$in: pins}, stationId: "station2"}).count();
    },
    countStation3: function () {
        var pins = Session.get("pins");
        return db.Competition23.find({pin: {$in: pins}, stationId: "station3"}).count();
    },
    countStation4: function () {
        var pins = Session.get("pins");
        return db.Competition23.find({pin: {$in: pins}, stationId: "station4"}).count();
    }
});