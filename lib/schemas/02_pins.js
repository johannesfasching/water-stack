db.Pin = new Mongo.Collection("pin");

Schemas.Pin = new SimpleSchema({
        userId: {
            type: String,
            label: "UserId",
            autoValue: function() {
                return Meteor.userId()
            }
        },
        pin: {
            type: String,
            label: "Pin",
            autoform: {
                afFieldInput: {
                    class: 'ui huge action input focus'
                }
            }
        },
        teamCode: {
            type: String,
            label: "TeamCode",
            optional: true
        },
        competitions: {
            type: [Schemas.Competitions],
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

Schemas.AdminPin = new SimpleSchema({
        pin: {
            type: String,
            label: "Pin",
            autoform: {
                afFieldInput: {
                    class: 'ui huge action input focus'
                }
            }
        }
    }
);

Schemas.Pin.messages({
        required: "Hast du vergessen den Pin einzugeben?"
    }
)

db.Pin.attachSchema(Schemas.Pin, {selector: {type: 'user'}});
db.Pin.attachSchema(Schemas.AdminPin, {selector: {type: 'admin'}});
