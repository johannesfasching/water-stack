Template.station.helpers({
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

Template.ownActivityOverView.helpers({
    highscore_1_history: function() {
        var pins = Session.get("pins");
        var x = db.Competition23.find({pin: {$in: pins}, stationId: "station1"}, {sort: {createdAt:-1}});
        var map = [];
        x.forEach(function(item){
            map.push({totalPoints:item.totalPoints, createdAt:moment(item.createdAt).format("DD.MMM.YYYY")})
        });
        console.log(x);
        return map;
    }
});

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

