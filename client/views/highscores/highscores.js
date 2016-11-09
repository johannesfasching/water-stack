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

Session.set('highscore_1_week_team', []);
Session.set('highscore_1_all_team', []);
Session.set('highscore_2_week_team', []);
Session.set('highscore_2_all_team', []);
Session.set('highscore_3_week_team', []);
Session.set('highscore_3_all_team', []);
Session.set('highscore_4_week_team', []);
Session.set('highscore_4_all_team', []);

Session.set('Limit_1_Week', 10);
Session.set('Limit_1_All', 10);
Session.set('Limit_2_Week', 10);
Session.set('Limit_2_All', 10);
Session.set('Limit_3_Week', 10);
Session.set('Limit_3_All', 10);
Session.set('Limit_4_Week', 10);
Session.set('Limit_4_All', 10);

Session.set('Limit_1_Week_t', 10);
Session.set('Limit_1_All_t', 10);
Session.set('Limit_2_Week_t', 10);
Session.set('Limit_2_All_t', 10);
Session.set('Limit_3_Week_t', 10);
Session.set('Limit_3_All_t', 10);
Session.set('Limit_4_Week_t', 10);
Session.set('Limit_4_All_t', 10);

Tracker.autorun(function() {
    if(Meteor.user()) {

        // **** My Highscores
        Meteor.call("myHighscore", {timerange: "all"}, function (err, result) {
            Session.set('myHS1_a', result);
        });

        Meteor.call("myHighscore23", {timerange: "all", stationId: "station2"}, function (err, result) {
            Session.set('myHS2_a', result);
        });

        Meteor.call("myHighscore23", {timerange: "all", stationId: "station3"}, function (err, result) {
            Session.set('myHS3_a', result);
        });

        Meteor.call("myHighscore23", {timerange: "all", stationId: "station4"}, function (err, result) {
            Session.set('myHS4_a', result);
        });


        Meteor.call("myHighscore", {timerange: "week"}, function (err, result) {
            Session.set('myHS1_w', result);
        });

        Meteor.call("myHighscore23", {timerange: "week", stationId: "station2"}, function (err, result) {
            Session.set('myHS2_w', result);
        });

        Meteor.call("myHighscore23", {timerange: "week", stationId: "station3"}, function (err, result) {
            Session.set('myHS3_w', result);
        });

        Meteor.call("myHighscore23", {timerange: "week", stationId: "station4"}, function (err, result) {
            Session.set('myHS4_w', result);
        });
    }
})

// **** Single Highscores


Tracker.autorun(function() {
    var l1_w = Session.get('Limit_1_Week');
    if(Meteor.user()) {
        var high = db.Highscores.findOne({timerange: "week", stationId: "station1"})
        if (high)
            Session.set('highscore_1_week', high.highscores)
    }
})

Tracker.autorun(function() {
    var l1_a = Session.get('Limit_1_All');
    if(Meteor.user()) {
        var high = db.Highscores.findOne({timerange: "all", stationId: "station1"})
        if (high)
            Session.set('highscore_1_all', high.highscores)
    }
})

Tracker.autorun(function() {
    var l2_w = Session.get('Limit_2_Week');
    if(Meteor.user()) {
        var high = db.Highscores.findOne({timerange: "week", stationId: "station2"})
        if (high)
            Session.set('highscore_2_week', high.highscores)
    }
})

Tracker.autorun(function() {
    var l2_a = Session.get('Limit_2_All');
    if(Meteor.user()) {
        var high = db.Highscores.findOne({timerange: "all", stationId: "station2"})
        if (high)
            Session.set('highscore_2_all', high.highscores)
    }
})

Tracker.autorun(function() {
    var l3_w = Session.get('Limit_3_Week');
    if(Meteor.user()) {
        var high = db.Highscores.findOne({timerange: "week", stationId: "station3"})
        if (high)
            Session.set('highscore_3_all', high.highscores)
    }
})

Tracker.autorun(function() {
    var l3_a = Session.get('Limit_3_All');
    if(Meteor.user()) {
        var high = db.Highscores.findOne({timerange: "all", stationId: "station3"})
        if (high)
            Session.set('highscore_3_all', high.highscores)
    }
})

Tracker.autorun(function() {
    var l4_w = Session.get('Limit_4_Week');
    if(Meteor.user()) {
        var high = db.Highscores.findOne({timerange: "week", stationId: "station4"})
        if (high)
            Session.set('highscore_4_week', high.highscores)
    }
})

Tracker.autorun(function() {
    var l4_a = Session.get('Limit_4_All');
    if(Meteor.user()) {
        var high = db.Highscores.findOne({timerange: "all", stationId: "station4"})
        if (high)
            Session.set('highscore_4_all', high.highscores)
    }
})





Tracker.autorun(function() {



    //Meteor.setTimeout(function() {
    //    //console.log("starting semantic funticon")
    //    semanticStartUpFunction();
    //}, 50)

    var l1_w_t = Session.get('Limit_1_Week_t');
    var l1_a_t = Session.get('Limit_1_All_t');
    var l2_w_t =  Session.get('Limit_2_Week_t');
    var l2_a_t = Session.get('Limit_2_All_t');
    var l3_w_t = Session.get('Limit_3_Week_t');
    var l3_a_t = Session.get('Limit_3_All_t');
    var l4_w_t = Session.get('Limit_4_Week_t');
    var l4_a_t = Session.get('Limit_4_All_t');



    var teamCode = Session.get("selectedTeamId")

    console.log("calling teams with TeamCode:", teamCode)
    if(teamCode === undefined){
        console.log("returning...")
        return
    }


    //// **** Team Highscores
    //var ladi = Meteor.call("highscore_team",{timerange:"week", teamCode:teamCode, limit:l1_w_t}, function(err, result) {
    //    //console.log("highscore_team",result, err)
    //    Session.set('highscore_1_week_team', result);
    //});
    //console.log(ladi)


    var result = db.TeamHighscores.findOne({
        timerange:"all", teamCode:teamCode, stationId:"station1"
    });
    Session.set('highscore_1_all_team', result.highscores);

    result = db.TeamHighscores.findOne({
        timerange:"week", teamCode:teamCode, stationId:"station1"
    });
    Session.set('highscore_1_week_team', result.highscores);

    result = db.TeamHighscores.findOne({
        timerange:"all", teamCode:teamCode, stationId:"station2"
    });
    Session.set('highscore_2_all_team', result.highscores);

    result = db.TeamHighscores.findOne({
        timerange:"week", teamCode:teamCode, stationId:"station2"
    });
    Session.set('highscore_2_week_team', result.highscores);

    result = db.TeamHighscores.findOne({
        timerange:"all", teamCode:teamCode, stationId:"station3"
    });
    Session.set('highscore_3_all_team', result.highscores);

    result = db.TeamHighscores.findOne({
        timerange:"week", teamCode:teamCode, stationId:"station3"
    });
    Session.set('highscore_3_week_team', result.highscores);

    result = db.TeamHighscores.findOne({
        timerange:"all", teamCode:teamCode, stationId:"station4"
    });
    Session.set('highscore_4_all_team', result.highscores);

    result = db.TeamHighscores.findOne({
        timerange:"week", teamCode:teamCode, stationId:"station4"
    });
    Session.set('highscore_4_week_team', result.highscores);


    //Meteor.call("highscore_team",{timerange:"all", teamCode:teamCode, limit:l1_a_t}, function(err, result) {
    //    Session.set('highscore_1_all_team', result);
    //});
    //
    //Meteor.call("highscore23_team",{timerange:"week", stationId:"station2", teamCode:teamCode, limit:l2_w_t}, function(err, result) {
    //    Session.set('highscore_2_week_team', result);
    //});
    //
    //Meteor.call("highscore23_team",{timerange:"all", stationId:"station2", teamCode:teamCode, limit:l2_a_t}, function(err, result) {
    //    Session.set('highscore_2_all_team', result);
    //});
    //
    //Meteor.call("highscore23_team",{timerange:"week", stationId:"station3", teamCode:teamCode, limit:l3_w_t}, function(err, result) {
    //    Session.set('highscore_3_week_team', result);
    //});
    //
    //Meteor.call("highscore23_team",{timerange:"all", stationId:"station3", teamCode:teamCode, limit:l3_a_t}, function(err, result) {
    //    Session.set('highscore_3_all_team', result);
    //});
    //
    //Meteor.call("highscore23_team",{timerange:"week", stationId:"station4", teamCode:teamCode, limit:l4_w_t}, function(err, result) {
    //    Session.set('highscore_4_week_team', result);
    //});
    //
    //Meteor.call("highscore23_team",{timerange:"all", stationId:"station4", teamCode:teamCode, limit:l4_a_t}, function(err, result) {
    //    Session.set('highscore_4_all_team', result);
    //});


    //
    //
    //
    //
    Meteor.setTimeout(function() {
        //console.log("starting semantic funticon")
        semanticStartUpFunction();
    }, 50)

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
        table.moreButtonWeek = "more_1_week"
        table.moreButtonAll = "more_1_all"
        table.myWeek = Session.get("myHS1_w")
        table.myAll = Session.get("myHS1_a")
        table.stationImage = "./assets/images/station/Station_1_RZ.svg"
        table.showPIN = false
        return table;
    },
    highscore_2: function() {
        var table = {}
        table.title = "Wasser-Ziehen"
        table.scoresWeek = Session.get('highscore_2_week')
        table.scoresAll = Session.get('highscore_2_all')
        table.moreButtonWeek = "more_2_week"
        table.moreButtonAll = "more_2_all"
        table.myWeek = Session.get("myHS2_w")
        table.myAll = Session.get("myHS2_a")
        table.stationImage = "./assets/images/station/Station_3_RZ.svg"
        table.showPIN = false
        return table;
    },
    highscore_3: function() {
        var table = {}
        table.title = "Wasser-Bohren"
        table.scoresWeek = Session.get('highscore_3_week')
        table.scoresAll = Session.get('highscore_3_all')
        table.moreButtonWeek = "more_3_week"
        table.moreButtonAll = "more_3_all"
        table.myWeek = Session.get("myHS3_w")
        table.myAll = Session.get("myHS3_a")
        table.stationImage = "./assets/images/station/Station_2_RZ.svg"
        table.showPIN = false
        return table;
    },
    highscore_4: function() {
        var table = {}
        table.title = "Wasser-Tragen"
        table.scoresWeek = Session.get('highscore_4_week')
        table.scoresAll = Session.get('highscore_4_all')
        table.moreButtonWeek = "more_4_week"
        table.moreButtonAll = "more_4_all"
        table.myWeek = Session.get("myHS4_w")
        table.myAll = Session.get("myHS4_a")
        table.stationImage = "./assets/images/station/Station_4_RZ.svg"
        table.showPIN = false
        return table;
    },
    highscore_1_team: function() {
        var table = {}
        table.title = "Wasser-Quiz"
        table.scoresWeek = Session.get('highscore_1_week_team')
        table.scoresAll = Session.get('highscore_1_all_team')
        table.moreButtonWeek = "more_1_week_team"
        table.moreButtonAll = "more_1_all_team"
        table.stationImage = "./assets/images/station/Station_1_RZ.svg"
        table.showPIN = true
        return table;
    },
    highscore_2_team: function() {
        var table = {}
        table.title = "Wasser-Ziehen"
        table.scoresWeek = Session.get('highscore_2_week_team')
        table.scoresAll = Session.get('highscore_2_all_team')
        table.moreButtonWeek = "more_2_week_team"
        table.moreButtonAll = "more_2_all_team"
        table.stationImage = "./assets/images/station/Station_3_RZ.svg"
        table.showPIN = true
        return table;
    },
    highscore_3_team: function() {
        var table = {}
        table.title = "Wasser-Bohren"
        table.scoresWeek = Session.get('highscore_3_week_team')
        table.scoresAll = Session.get('highscore_3_all_team')
        table.moreButtonWeek = "more_3_week_team"
        table.moreButtonAll = "more_3_all_team"
        table.stationImage = "./assets/images/station/Station_2_RZ.svg"
        table.showPIN = true
        return table;
    },
    highscore_4_team: function() {
        var table = {}
        table.title = "Wasser-Tragen"
        table.scoresWeek = Session.get('highscore_4_week_team')
        table.scoresAll = Session.get('highscore_4_all_team')
        table.moreButtonWeek = "more_4_week_team"
        table.moreButtonAll = "more_4_all_team"
        table.stationImage = "./assets/images/station/Station_4_RZ.svg"
        table.showPIN = true
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
        //console.log("teamCodes", teamCodes, Meteor.userId())

        var teams = db.Team.find( {teamCode: {$in:teamCodes} } ).fetch();

        if(Meteor.userId() === "4xTfCCrynqmxWXoLy" || Meteor.userId() === "iHnQsojkH72ZCF7vi" || Meteor.userId()==="YS7jnx59KPHz5v3s5")
            return db.Team.find( {} ).fetch()

        //console.log("teams", teams)
        return teams
    },

    hasTeamSelected: function() {
        //console.log( "hasTeamSelected",Session.get("selectedTeamId") )
        var retVal = false;
        if( Session.get("selectedTeamId") !== undefined )
            retVal = true;
        console.log("retVal Team", retVal);
        return retVal;
    }

    //hasOwnedTeams: function() {
    //    return  db.Team.find({creatorId:Meteor.userId()}).count()
    //}
    //
})


Template.highscores.events({
    'click .team-row': function (e) {
        //console.log(this.teamCode)
        Session.set("selectedTeamId", this.teamCode);
        $(".team-row").removeClass("active")
        $(e.target).parent().addClass("active")
        console.log(Session.get("selectedTeamId"))
    },
    'click .updateSubmit,deleteSubmit': function (e) {
        delete Session.keys['selectedTeamId']
    },
    'click .newTeamButton': function (e) {
        $(".newTeam").removeClass("hidden")
    }
});