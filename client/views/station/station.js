var highscore_1 = function() {
    var table = {}
    table.title = "Wasser-Quiz"
    table.scoresWeek = Session.get('highscore_1_week')
    table.scoresAll = Session.get('highscore_1_all')
    table.stationImage = "./assets/images/station/Station_1_RZ.svg"
    table.moreButtonWeek = "more_1_week"
    table.moreButtonAll = "more_1_all"
    table.myWeek = Session.get("myHS1_w")
    table.myAll = Session.get("myHS1_a")
    return table;
}

var highscore_2 = function() {
    var table = {}
    table.title = "Wasser-Ziehen"
    table.scoresWeek = Session.get('highscore_2_week')
    table.scoresAll = Session.get('highscore_2_all')
    table.stationImage = "./assets/images/station/Station_3_RZ.svg"
    table.moreButtonWeek = "more_2_week"
    table.moreButtonAll = "more_2_all"
    table.myWeek = Session.get("myHS2_w")
    table.myAll = Session.get("myHS2_a")
    return table;
}

var highscore_3 = function() {
    var table = {}
    table.title = "Wasser-Bohren"
    table.scoresWeek = Session.get('highscore_3_week')
    table.scoresAll = Session.get('highscore_3_all')
    table.stationImage = "./assets/images/station/Station_2_RZ.svg"
    table.moreButtonWeek = "more_3_week"
    table.moreButtonAll = "more_3_all"
    table.myWeek = Session.get("myHS3_w")
    table.myAll = Session.get("myHS3_a")
    return table;
}

var highscore_4 = function() {
    var table = {}
    table.title = "Wasser-Tragen"
    table.scoresWeek = Session.get('highscore_4_week')
    table.scoresAll = Session.get('highscore_4_all')
    table.stationImage = "./assets/images/station/Station_4_RZ.svg"
    table.moreButtonWeek = "more_4_week"
    table.moreButtonAll = "more_4_all"
    table.myWeek = Session.get("myHS4_w")
    table.myAll = Session.get("myHS4_a")
    return table;
}

var highscore_1_history = function() {
    var pins = Session.get("pins");
    var x = db.Competition.find({pin: {$in: pins}}, {sort: {createdAt:-1}});
    var map = [];
    x.forEach(function(item){
        map.push({totalPoints:item.gamePoints, createdAt:moment(item.createdAt).format("DD.MMM.YYYY"), message:"Wasser Ralley - Ich hab  "+ item.totalPoints +" Punkte geschafft ;) Mach auch du mit."})
    });
    return map;
}

var highscore_2_history = function() {
    var pins = Session.get("pins");
    var x = db.Competition23.find({pin: {$in: pins}, stationId: "station2"}, {sort: {createdAt:-1}});
    var map = [];
    x.forEach(function(item){
        map.push({totalPoints:item.totalPoints, createdAt:moment(item.createdAt).format("DD.MMM.YYYY"), message:"Wasser Ralley - Ich hab  "+ item.totalPoints +" Punkte geschafft ;) Mach auch du mit."})
    });
    return map;
}

var highscore_3_history = function() {
    var pins = Session.get("pins");
    var x = db.Competition23.find({pin: {$in: pins}, stationId: "station3"}, {sort: {createdAt:-1}});
    var map = [];
    x.forEach(function(item){
        map.push({totalPoints:item.totalPoints, createdAt:moment(item.createdAt).format("DD.MMM.YYYY"), message:"Wasser Ralley - Ich hab  "+ item.totalPoints +" Punkte geschafft ;) Mach auch du mit."})
    });
    return map;
}

var highscore_4_history = function() {
    var pins = Session.get("pins");
    var x = db.Competition23.find({pin: {$in: pins}, stationId: "station4"}, {sort: {createdAt:-1}});
    var map = [];
    x.forEach(function(item){
        map.push({totalPoints:item.totalPoints, createdAt:moment(item.createdAt).format("DD.MMM.YYYY"), message:"Wasser Ralley - Ich hab  "+ item.totalPoints +" Punkte geschafft ;) Mach auch du mit."})
    });
    return map;
}


Template.station.helpers({
    highscore: function() {
        var type = Session.get("stationTyp");
        if( type === "wasserQuiz" ) {
            return highscore_1()
        }
        else if( type === "wasserZiehen" ) {
            return highscore_2()
        }
        else if( type === "wasserBohren" ) {
            return highscore_3()
        }
        else if( type === "wasserTragen" ) {
            return highscore_4()
        }
    }
})


Template.ownActivityOverView.helpers({
    highscore_history: function() {
        var type = Session.get("stationTyp");
        if( type === "wasserQuiz" ) {
            return highscore_1_history()
        }
        else if( type === "wasserZiehen" ) {
            return highscore_2_history()
        }
        else if( type === "wasserBohren" ) {
            return highscore_3_history()
        }
        else if( type === "wasserTragen" ) {
            return highscore_4_history()
        }
    }
})


Template.ownStationScores.helpers({
    stationTitle: function() {
        var type = Session.get("stationTyp");
        if( type === "wasserQuiz" ) {
            return "Wasser-Quiz"
        }
        else if( type === "wasserBohren" ) {
            return "Wasser-Bohren"
        }
        else if( type === "wasserTragen" ) {
            return "Wasser-Trage"
        }
        else if( type === "wasserZiehen" ) {
            return "Wasser-Ziehen"
        }
    }
});

Template.aboutTheStation.helpers({
    stationAbout: function() {
        var type = Session.get("stationTyp");
        if( type === "wasserQuiz" ) {
            return "Kalt erwischt oder mit allen Wassern gewaschen? Beim Wasser-Quiz testest du dein Wissen rund um das Thema Wasser."
        }
        else if( type === "wasserBohren" ) {
            return "Das wird dein Durchbruch! Bohr dich durch verschiedene virtuelle Gesteins- und Erdschichten, bis du auf sauberes Grundwasser stößt."
        }
        else if( type === "wasserTragen" ) {
            return "Auf zum Wassermarsch! Teste selbst, wie viel Kraft es kostet, mit einem vollen Wasserkanister eine möglichst große Distanz zurückzulegen."
        }
        else if( type === "wasserZiehen" ) {
            return "Teste deine Wasser-Kraft! Hier erfährst du, wie anstrengend es ist, einen Eimer voller Wasser aus einem Brunnenschacht zu ziehen."
        }
    }
});

