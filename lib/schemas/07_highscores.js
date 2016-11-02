
db.HighScores1 = new Mongo.Collection(null);
db.HighScores2 = new Mongo.Collection(null);
db.HighScores3 = new Mongo.Collection(null);
db.HighScores4 = new Mongo.Collection(null);
db.TeamHighscores = new Mongo.Collection("teamhighscores");


Schemas.HighScores = new SimpleSchema({
    rank: {
        type: Number
    },
    totalPoints: {
        type: Number
    },
    time: {
        type: Number
    },
    userName: {
        type: String
    },
    pin: {
        type: String
    },
    userId: {
        type: String
    },
    showPin: {
        type: String,
        optional: true
    }
});

db.HighScores1.attachSchema(Schemas.HighScores);
db.HighScores2.attachSchema(Schemas.HighScores);
db.HighScores3.attachSchema(Schemas.HighScores);
db.HighScores4.attachSchema(Schemas.HighScores);
//db.TeamHighscores.attachSchema(Schemas.HighScores);