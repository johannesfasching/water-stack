/**
 * Created by hannes on 23.03.16.
 */



Session.set("filterTeamPin", {
        stationId:{$in:["station1", "station2", "station3", "station4"]},
        timeStarted:{
            $gte:new Date("2016-11-09 10:43:11.000Z")
        }
    }
)

Template.teamPinAssigner.helpers({

    currentDoc: function() {
        return db.Competition23.findOne({_id: Session.get("currentComp23Doc")})
    },

    reactPoints: function () {

        return {
            collection: db.Competition23.find(Session.get("filterTeamPin")),
            rowsPerPage: 100,
            showFilter: true,
            showColumnToggles:true,
            fields: [
                {
                    key: 'resources',
                    label: 'Check',
                    fn: function (value, object, key) {
                        return new Spacebars.SafeString("<input type='checkbox' class='checkboxGame' dataid='"+object._id+"'>");
                    }
                },
                {
                    key: '_id',
                    label: '_id',
                    hidden: 'true'
                },
                'pin', 'stationId', 'teamCode', 'totalPoints', 'timePoints',
                {
                    key: 'timeStarted',
                    label: 'Start Zeit',
                    sortOrder: 0,
                    sortDirection: 'descending',
                    fn: function(value,object,key) {
                        return moment(value).format("YYYY-MM-DD HH:mm")
                    }
                }


            ]
        };
    }

})

Template.teamPinAssigner.events({
    'click .checkboxGame': function (event) {
        //event.preventDefault()
    },


    'click .reactive-table tbody tr': function (event) {
        // set the blog post we'll display details and news for
        //event.preventDefault()
        var checkbox = $(event.currentTarget).find(".checkboxGame")
        var id = checkbox.attr("dataid")
        console.log(id)
        Session.set("currentComp23Doc", id)

        console.log($(event.currentTarget).children(".pin").text())
        console.log(this.pin)
    },

    'click #actionButton': function (event) {
        console.log("ActionButton")
        var idForAction = []
        $('.reactive-table tbody tr').each(function( index ) {
            var checkbox = $(this).find(".checkboxGame")
            if( checkbox.is(':checked') ) {
                var id = checkbox.attr("dataid")
                var pin = $(this).children(".pin").text()
                idForAction.push(id)
                console.log( id, pin );
            }
        })
        console.log(idForAction)
        var newTeamcode = $("#teamCodeNew").val()
        comps = db.Competition23.find({_id:{$in:idForAction}}).fetch()
        console.log(comps)

        _.forEach(idForAction, function(id) {
            console.log("updating:", db.Competition23.find({_id:id}).fetch())
            db.Competition23.update({_id:id},{$set:{teamCode:newTeamcode}})
        })

        //db.Competition23.update({_id:{$in:idForAction}},{$set:{teamCode:newTeamcode}},{multi:true})

    },

    'click .checkboxStations': function (event) {
        var checkStation1 = $(".checkStation1").is(':checked');
        var checkStation2 = $(".checkStation2").is(':checked');
        var checkStation3 = $(".checkStation3").is(':checked');
        var checkStation4 = $(".checkStation4").is(':checked');

        var checked = []
        if(checkStation1)
            checked.push("station1")
        if(checkStation2)
            checked.push("station2")
        if(checkStation3)
            checked.push("station3")
        if(checkStation4)
            checked.push("station4")

        Session.set("stationsForTeamPin", checked)
        console.log(checked)
        updateFilter()
    },

    'click #checkboxAll': function (event) {
        console.log("alll")
        $(".checkboxGame").prop('checked', $("#checkboxAll").is(':checked'));
    }


});

Template.teamPinAssigner.created = function () {
    Filter = new ReactiveTable.Filter('greater-than-filter', ['timeStarted']);
    Filter.set({'$gt':"2016-10-30 15:48"})
};

function updateFilter() {
    var dateFrom = moment($("#teamPinDate").val(), "DD.MM.YYYY").format()
    var dateTo = moment($("#teamPinDate").val(), "DD.MM.YYYY").add(1,'d').format()
    Session.set("filterTeamPin", {
            stationId: {$in: Session.get("stationsForTeamPin")},
            timeStarted:{
                $gte:new Date(dateFrom),
                $lte:new Date(dateTo)
            }
        }
    )
}

Template.teamPinAssigner.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
        lang: "de",
        todayButton: true,
        timepicker:false,
        format:'DD.MM.YYYY',
        formatDate:'DD.MM.YYYY',
        startDate:moment().date(),
        date: moment().date(),
        value:moment().date(),
        inline:true,
        //format:'d.m.Y',
        onChangeDateTime:function(dp,$input){
            updateFilter()
        }
    });
})