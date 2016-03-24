/**
 * Created by hannes on 23.03.16.
 */

Template.pointTable.helpers({
    points: function() {
        var result = db.Competition.find().fetch()
        console.log(result)
        return result
    },

    reactPoints: function () {
        return {
            collection: db.Competition,
            rowsPerPage: 10,
            showFilter: true,
            fields: ['pin', 'stationId', 'gamePoints', 'timePoints']
        };
    }

})
