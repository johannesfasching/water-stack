db.Station = new Mongo.Collection("station");

Schemas.Station = new SimpleSchema({
        title: {
            type: String,
            label: "Stations Name",
        },
        estimatedDuration: {
            type: String,
            label: "Geschätzte Spieldauer",
            optional: true
        },
        active: {
            type: Boolean,
            label: "Station aktiviert",
            optional: true
        },
        maxPoints: {
            type: Number,
            optional: true
        },
        createdAt: {
            type: Date,
            autoValue: function() {
                return new Date;

            }
        },
        counterGamesStarted: {
            type: Number,
            optional: true
        },
        counterGamesCompleted: {
            type: Number,
            optional: true
        }
    }
);


db.Station.attachSchema(Schemas.Station);
