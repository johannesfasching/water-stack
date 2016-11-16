/**
 * Created by hannes on 23.03.16.
 */

Session.set("stationID","station2")

Template.pointTable.helpers({
    points: function() {
        var result = db.Competition.find().fetch()
        console.log(result)
        return result
    },



    reactPoints: function () {

        return {
            collection: db.Competition23.find({stationId:Session.get("stationID")}),
            rowsPerPage: 100,
            showFilter: true,
            fields: ['pin', 'stationId', 'teamCode', 'totalPoints', 'timePoints',
                {
                    key: 'timeStarted',
                    label: 'Start Zeit',
                    fn: function(value,object,key) {
                        return moment(value).format("YYYY-MM-DD HH:mm")
                    }
                },
                {
                    key: 'resources',
                    label: 'Number of Resources',
                    fn: function (value, object, key) {
                        return new Spacebars.SafeString("<input type='checkbox'>");
                    }
                }

            ]
        };
    }

})

Template.pointTable.events({
    'click .reactive-table tbody tr': function (event) {
        // set the blog post we'll display details and news for
        console.log($(event.currentTarget).children(".pin").text())
    },
    'click #actionButton': function (event) {
        console.log("ActionButton")
        Filter.set({'$gt':"2016-10-30 15:48"})
    }
});

Template.pointTable.created = function () {
    Filter = new ReactiveTable.Filter('greater-than-filter', ['timeStarted']);
    Filter.set({'$gt':"2016-10-30 15:48"})
};
