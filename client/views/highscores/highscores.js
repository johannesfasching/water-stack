/**
 * Created by hannes on 23.03.16.
 */

Session.set('highscore_1_week', []);
Session.set('highscore_1_all', []);
Session.set('highscore_2_week', []);
Session.set('highscore_2_all', []);
Session.set('highscore_3_week', []);
Session.set('highscore_3_all', []);
Session.set('highscore_4_week', []);
Session.set('highscore_4_all', []);


Meteor.call("highscore",{timerange:"week"}, function(err, result) {
    Session.set('highscore_1_week', result);
});

Meteor.call("highscore",{timerange:"all"}, function(err, result) {
    Session.set('highscore_1_all', result);
});

Meteor.call("highscore23",{timerange:"week", stationId:"station2"}, function(err, result) {
    Session.set('highscore_2_week', result);
});

Meteor.call("highscore23",{timerange:"all", stationId:"station2"}, function(err, result) {
    Session.set('highscore_2_all', result);
});

Meteor.call("highscore23",{timerange:"week", stationId:"station3"}, function(err, result) {
    Session.set('highscore_3_week', result);
});

Meteor.call("highscore23",{timerange:"all", stationId:"station3"}, function(err, result) {
    Session.set('highscore_3_all', result);
});

Meteor.call("highscore23",{timerange:"week", stationId:"station4"}, function(err, result) {
    Session.set('highscore_4_week', result);
});

Meteor.call("highscore23",{timerange:"all", stationId:"station4"}, function(err, result) {
    Session.set('highscore_4_all', result);
});


Template.highscores.helpers({
    highscore_1: function() {
        var table = {}
        table.title = "Wasser-Quiz"
        table.scoresWeek = Session.get('highscore_1_week')
        table.scoresAll = Session.get('highscore_1_all')
        return table;
    },
    highscore_2: function() {
        var table = {}
        table.title = "Wasser-Ziehen"
        table.scoresWeek = Session.get('highscore_2_week')
        table.scoresAll = Session.get('highscore_2_all')
        return table;
    },
    highscore_3: function() {
        var table = {}
        table.title = "Wasser-Bohren"
        table.scoresWeek = Session.get('highscore_3_week')
        table.scoresAll = Session.get('highscore_3_all')
        return table;
    },
    highscore_4: function() {
        var table = {}
        table.title = "Wasser-Tragen"
        table.scoresWeek = Session.get('highscore_4_week')
        table.scoresAll = Session.get('highscore_4_all')
        return table;
    },

    highscore: function() {
        return highscore_1()
    }
})


