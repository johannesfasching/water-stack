db.Competition23 = new Mongo.Collection("competition23");

Schemas.Competition23 = new SimpleSchema({
        pin: {
            type: String,
            label: "User PIN",
            optional: true
        },
        stationId: {
            type: String,
            label: "Stations Id",
            optional: true,
            autoValue: function () {
                return this.stationId;
            },
            autoform: {
                resetOnSuccess:false,
                firstoption:false,
                options: function () {
                    return _.map(db.Station.find().fetch(), function (stat) {
                        return {
                            label: stat.title,
                            value: stat.title
                        };
                    });
                }
            }

        },
        groupId: {
            type: String,
            label: "Group Id",
            optional: true,
        },
        teamCode: {
            type: String,
            label: "Team Code",
            optional: true,
        },
        level: {
            type: Number,
            label: "Level (0 or 1)"
        },
        meter: {
            type: Number,
            label: "Amount of Meters"
        },
        time: {
            type: Number,
            label: "Used Time"
        },
        totalPoints: {
            type: Number,
            blackbox:true,
            optional:true
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
        createdAt: {
            type: Date,
            autoValue: function() {
                return new Date;

            }
        }
    }
);


db.Competition23.attachSchema(Schemas.Competition23);


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

TabularTables.Competition23 = new Tabular.Table({
    name: "Competition23",
    collection: db.Competition23,
    columns: [
        {data: "pin", title: "Pin"},
        {data: "stationId", title: "Stations ID"},
        {data: "gamePoints", title: "gamePoints"},
        {data: "usedTime", title: "usedTime"},
        {data: "meter", title: "meter"},
        {data: "level", title: "level"},
        {
            tmpl: Meteor.isClient && Template.pointTable
        }
    ]
});