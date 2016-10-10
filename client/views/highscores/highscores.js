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

Tracker.autorun(function() {
    var teamCode = Session.get("selectedTeamId")
    console.log("calling teams...")

    Meteor.call("highscore_team",{timerange:"week", teamCode:teamCode}, function(err, result) {
        Session.set('highscore_1_week_team', result);
    });

    Meteor.call("highscore_team",{timerange:"all", teamCode:teamCode}, function(err, result) {
        Session.set('highscore_1_all_team', result);
    });

    Meteor.call("highscore23_team",{timerange:"week", stationId:"station2", teamCode:teamCode}, function(err, result) {
        Session.set('highscore_2_week_team', result);
    });

    Meteor.call("highscore23_team",{timerange:"all", stationId:"station2", teamCode:teamCode}, function(err, result) {
        Session.set('highscore_2_all_team', result);
    });

    Meteor.call("highscore23_team",{timerange:"week", stationId:"station3", teamCode:teamCode}, function(err, result) {
        Session.set('highscore_3_week_team', result);
    });

    Meteor.call("highscore23_team",{timerange:"all", stationId:"station3", teamCode:teamCode}, function(err, result) {
        Session.set('highscore_3_all_team', result);
    });

    Meteor.call("highscore23_team",{timerange:"week", stationId:"station4", teamCode:teamCode}, function(err, result) {
        Session.set('highscore_4_week_team', result);
    });

    Meteor.call("highscore23_team",{timerange:"all", stationId:"station4", teamCode:teamCode}, function(err, result) {
        Session.set('highscore_4_all_team', result);
    });
})

Template.highscores_tablerow.helpers({
    profileImage: function (id) {
        return getimagebyid(id);
    }

})

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
    highscore_1_team: function() {
        var table = {}
        table.title = "Wasser-Quiz"
        table.scoresWeek = Session.get('highscore_1_week_team')
        table.scoresAll = Session.get('highscore_1_all_team')
        return table;
    },
    highscore_2_team: function() {
        var table = {}
        table.title = "Wasser-Ziehen"
        table.scoresWeek = Session.get('highscore_2_week_team')
        table.scoresAll = Session.get('highscore_2_all_team')
        return table;
    },
    highscore_3_team: function() {
        var table = {}
        table.title = "Wasser-Bohren"
        table.scoresWeek = Session.get('highscore_3_week_team')
        table.scoresAll = Session.get('highscore_3_all_team')
        return table;
    },
    highscore_4_team: function() {
        var table = {}
        table.title = "Wasser-Tragen"
        table.scoresWeek = Session.get('highscore_4_week_team')
        table.scoresAll = Session.get('highscore_4_all_team')
        return table;
    },

    highscore: function() {
        return highscore_1()
    },


    profileImage: function (id) {
        return getimagebyid(id);
    },

    //profileName: function () {
    //    return Meteor.user().profile.userName;
    //},
    //
    //profileEmail: function () {
    //    return Meteor.user().emails[0].address;
    //},
    //
    //teamUpdate: function() {
    //    var a = db.Team.findOne({teamCode:Session.get("selectedTeamId")});
    //    return a
    //},
    //
    //teamId: function() {
    //    return db.Team.findOne({teamCode:Session.get("selectedTeamId")})._id;
    //},

    teamss: function() {
        var pin = db.Pin.find( {userId:Meteor.userId()});
        var teamCodes = []
        pin.forEach(function(item) {
            if(item.teamCode !== undefined && item.teamCode !== null)
                teamCodes.push(item.teamCode)
        })
        console.log("teamCodes", teamCodes, Meteor.userId())

        var teams = db.Team.find( {teamCode: {$in:teamCodes} } ).fetch();

        console.log("teams", teams)
        return teams
    },

    //hasOwnedTeams: function() {
    //    return  db.Team.find({creatorId:Meteor.userId()}).count()
    //}
    //
})


Template.highscores.events({
    'click .team-row': function (e) {
        console.log(this.teamCode)
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