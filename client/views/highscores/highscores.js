/**
 * Created by hannes on 23.03.16.
 */

Meteor.call("highscore23","{\"timerange\":\"week\",\"stationId\":\"station1\"}", function(err, result) {
    Session.set('highscore_1_week', result);
});

Meteor.call("highscore23","{\"timerange\":\"all\",\"stationId\":\"station1\"}", function(err, result) {
    Session.set('highscore_1_all', result);
});

Meteor.call("highscore23","{\"timerange\":\"week\",\"stationId\":\"station2\"}", function(err, result) {
    Session.set('highscore_2_week', result);
});

Meteor.call("highscore23","{\"timerange\":\"all\",\"stationId\":\"station2\"}", function(err, result) {
    Session.set('highscore_2_all', result);
});


Template.highscores.helpers({
    highscore_1_week: function() {
        return Session.get('highscore_1_week');
    },
    highscore_1_all: function() {
        return Session.get('highscore_1_all');
    },
    highscore_2_week: function() {
        return Session.get('highscore_2_week');
    },
    highscore_2_all: function() {
        return Session.get('highscore_2_all');
    }
})


