db.Competition = new Mongo.Collection("competition");

Schemas.Competition = new SimpleSchema({
        pin: {
            type: String,
            label: "Stations Id",
            optional: true
        },
        stationId: {
            type: String,
            label: "Stations Id",
            optional: true
        },
        timeStarted: {
            type: Date,
            label: "Start Zeit",
            optional: true
        },
        timeEnded: {
            type: Date,
            label: "End Zeit",
            optional: true
        },
        gamePoints: {
            type: Number,
            label: "Game Punkte",
            optional: true
        },
        timePoints: {
            type: Number,
            label: "Zeit Punkte",
            optional: true
        },
        createdAt: {
            type: Date,
            autoValue: function() {
                return new Date;

            }
        }
    }
);


db.Competition.attachSchema(Schemas.Competition);


TabularTables = {};

TabularTables.Competition = new Tabular.Table({
    name: "Competition",
    collection: db.Competition,
    columns: [
        {data: "pin", title: "Pin"},
        {data: "stationId", title: "Stations ID"},
        {data: "gamePoints", title: "gamePoints"},
        {data: "timePoints", title: "timePoints"},
        {
            tmpl: Meteor.isClient && Template.pointTable
        }
    ]
});