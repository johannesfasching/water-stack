Schemas.UserProfile = new SimpleSchema({
    userName: {
        type: String,
        label: "Benutzername",
        optional: true
    },
    realName: {
        type: String,
        label: "Name",
        optional: true
    },
    age: {
        type: Number,
        label: "Altersgruppe",
        optional: true,
        allowedValues: [0, 1, 2, 3, 4, 5, 6],
        autoform: {
            options: [
                {label: "Altersgruppe?", value: 0},
                {label: "0-6 Jahre", value: 1},
                {label: "6-10 Jahre", value: 2},
                {label: "10-14 Jahre", value: 3},
                {label: "14-18 Jahre", value: 4},
                {label: "18-35 Jahre", value: 5},
                {label: "35-99+ Jahre", value: 6},
            ]
        },
    },
    email: {
        type: String,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    sex: {
        type: String,
        label: "Geschlecht",
        allowedValues: ['undefined', 'female', 'male'],
        autoform: {
            options: [
                {label: "Geschlecht?", value: "undefined"},
                {label: "Weiblich", value: "female"},
                {label: "Männlich", value: "male"}
            ]
        },
        optional: true
    },
    picture: {
        type: String,
        optional: true

    }
});

Schemas.User = new SimpleSchema({
    username: {
        type: String,
    },
    emails: {
        type: [Object],
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schemas.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schemas.User);


Meteor.users.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});