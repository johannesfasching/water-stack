db.Station = new Mongo.Collection("station");

Schemas.Multiplicator = new SimpleSchema({
    startDate: {
        type: Date,
        label: "StartDatum"
    },
    endDate: {
        type: Date,
        label: "EndDatum"
    },
    multiplicator: {
        type: Number,
        label: "Multiplikator"
    }
})

Schemas.Station = new SimpleSchema({
        title: {
            type: String,
            label: "Stations Name",
        },
        active: {
            type: Boolean,
            label: "Station aktiviert",
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
        },
        pointMultiplicator: {
            type: [Schemas.Multiplicator],
            optional: true
        }
    }
);


db.Station.attachSchema(Schemas.Station);
