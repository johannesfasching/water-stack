Schemas = {}
db = {}

db.Team = new Mongo.Collection("team");

Schemas.Adress = new SimpleSchema({
    street: {
        type: String,
        label: "Straße",
        max: 100,
        optional: true
    },
    city: {
        type: String,
        label: "Stadt",
        max: 100,
        optional: true
    },
    state: {
        label: "Land",
        type: String,
        optional: true
    },
    zip: {
        label: "PLZ",
        type: String,
        optional: true
    }
});

Schemas.Team = new SimpleSchema({
    title: {
        type: String,
        label: ""

    },
    typ: {
        type: String,
        label: "OrganisationsTyp (Schule, Verein, Uni...)",
        optional: true
    },
    creatorId: {
        label: "OwnerId",
        optional: true,
        type: String,
        autoValue: function() {
            return Meteor.userId();
        }
    },
    teamCode: {
        label: "TeamCODE",
        type: String,
        unique: true,
        //
        //custom: function () {
        //    if (Meteor.isClient && this.isSet) {
        //        Meteor.call("teamCodeIsAvailable", this.value, function (error, result) {
        //            if (!result) {
        //                Meteor.users.simpleSchema().namedContext("createUserForm").addInvalidKeys([{name: "TeamCODE", type: "notUnique"}]);
        //            }
        //        });
        //    }
        //}
    },
    adress: {
        type: Schemas.Adress,
        label: "Adresse",
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            return new Date;
        }
    }

});

//Schemas.AdminTeam = new SimpleSchema({
//    teamCode: {
//        type: String,
//        label: "TeamCode",
//        autoform: {
//            afFieldInput: {
//                class: 'ui huge action input focus'
//            }
//        }
//    }
//})

db.Team.attachSchema(Schemas.Team);
//db.Team.attachSchema(Schemas.AdminTeam, {selector: {type: 'admin'}});