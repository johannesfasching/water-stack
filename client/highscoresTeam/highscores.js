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

Scores = {}

Tracker.autorun(function() {
    Scores.highscore_1 = function() {
        var table = {}
        table.title = "Wasser-Quiz"
        table.scores = Session.get('highscore_1_team')
        table.stationImage = "./assets/images/station/Station_1_RZ.svg"
        table.showPIN = true
        Session.set("highscore1_pdf",table)
        return table;
    }

    Scores.highscore_2 = function() {
        var table = {}
        table.title = "Wasser-Ziehen"
        table.scores = Session.get('highscore_2_team')
        table.stationImage = "./assets/images/station/Station_3_RZ.svg"
        table.showPIN = true
        return table;
    }

    Scores.highscore_3 = function() {
        var table = {}
        table.title = "Wasser-Bohren"
        table.scores = Session.get('highscore_3_team')
        table.stationImage = "./assets/images/station/Station_2_RZ.svg"
        table.showPIN = true
        Session.set("highscore3_pdf",table)
        return table;
    }

    Scores.highscore_4 = function() {
        var table = {}
        table.title = "Wasser-Tragen"
        table.scores = Session.get('highscore_4_team')
        table.stationImage = "./assets/images/station/Station_4_RZ.svg"
        table.showPIN = true
        return table;
    }
})


Template.highscoresTeam.helpers({
    highscore_1: Scores.highscore_1,
    highscore_2: Scores.highscore_2,
    highscore_3: Scores.highscore_3,
    highscore_4: Scores.highscore_4,

    highscore: function() {
        return highscore_1()
    },


    profileImage: function (id) {
        return getimagebyid(id);
    },


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


Template.highscoresTeam.events({
    'click .team-row': function (e) {
        //console.log(this.teamCode)
        Session.set("selectedTeamId", this.teamCode);
        $(".team-row").removeClass("active")
        $(e.target).parent().addClass("active")
        console.log(Session.get("selectedTeamId"))
    },
    'click .printToPdf': function(e) {
        var doc = new PDFDocument({size: 'A4', margin: 50});
        doc.fontSize(20)
            .fillColor('#8AAAD9')
            .text('Wasser Raelly 2016',{align: 'center'})
            .text('TeamCode: ' + Session.get("selectedTeamId"),{align: 'center'})
            .moveDown()
            .moveDown()
            .fillColor('#000')


        _.forEach(Scores, function(item) {
            var table = item();
            doc.fontSize(14)
                .fillColor('#8AAAD9')
                .text(table.title, {align: 'center'})
                .moveDown()
                .fontSize(10)
                .fillColor("#000")
            var scores =  table.scores
            _.forEach(scores, function(score) {
                doc.moveDown();
                doc.text(score.rank + "   " + score.totalPoints);
            })
        })

        //var scores = Session.get("highscore_3_team")




        doc.write('PDFKitExampleClientSide.pdf');
        //Blaze.outputAsPDF(Template.highscoreTableTeam, "dataurlnewwindow", {
        //    data: {table:Session.get("highscore3_pdf")},
        //    //table: Session.get("highscore3_pdf"),
        //    filename: "report1.pdf", // optional, default is "document.pdf"
        //    x: 0, // optional, left starting position on resulting PDF, default is 4 units
        //    y: 0, // optional, top starting position on resulting PDF, default is 4 units
        //    orientation: "portrait", // optional, "landscape" or "portrait" (default)
        //    unit: "in", // optional, unit for coordinates, one of "pt", "mm" (default), "cm", or "in"
        //    format: "letter" // optional, see Page Formats, default is "a4"
        //});
    }
});

Template.highscoresTeam.onRendered(function() {
    $(".ui.checkbox").checkbox('setting', 'onChange', function () {
        console.log('fire!',this);
    });

    this.$('.datetimepicker').datetimepicker({
        lang: "de",
        onChangeDateTime:function(dp,$input){
            //console.log($input.val())
            console.log( $(".dateFrom").val() )
            console.log( $(".dateTo").val() )

            Meteor.call("highscore_teams", {
                teamCode: Session.get("selectedTeamId"),
                dateFrom: $(".dateFrom").val(),
                dateTo: $(".dateTo").val()

            }, function (err, result) {
                console.log("result:", result)
                Session.set("highscore_1_team", result.station1)
                Session.set("highscore_2_team", result.station2)
                Session.set("highscore_3_team", result.station3)
                Session.set("highscore_4_team", result.station4)

                             //results = []
                //_.forEach(result, function (item) {
                //    results.push({
                //            rank: item.rank,
                //            totalPoints: item.totalPoints,
                //            time: item.time,
                //            userName: item.userName,
                //            pin: item.pin,
                //            userId: item.userId
                //        }
                //    )
                //});
                //
                //db.TeamHighscores.upsert({teamCode: teamCode, timerange:timeRange, stationId:stationId}, {$set: {highscores:results}} )
            });
        }
    });

})