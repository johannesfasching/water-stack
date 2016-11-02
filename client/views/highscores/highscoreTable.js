Template.highscoreTable.helpers({

    
})

Session.set("Limit_1_Week", 10)

Template.highscoreTable.events({
    'click .more_1_week': function(event, template) {
        var limit = Session.get("Limit_1_Week") + 10
        Session.set("Limit_1_Week", limit)
    },
    'click .more_1_all': function(event, template) {
        var limit = Session.get("Limit_1_All") + 10
        Session.set("Limit_1_All", limit)
    },
    'click .more_2_week': function(event, template) {
        var limit = Session.get("Limit_2_Week") + 10
        Session.set("Limit_2_Week", limit)
    },
    'click .more_2_all': function(event, template) {
        var limit = Session.get("Limit_2_All") + 10
        Session.set("Limit_2_All", limit)
    },
    'click .more_3_week': function(event, template) {
        var limit = Session.get("Limit_3_Week") + 10
        Session.set("Limit_3_Week", limit)
    },
    'click .more_3_all': function(event, template) {
        var limit = Session.get("Limit_3_All") + 10
        Session.set("Limit_3_All", limit)
    },
    'click .more_4_week': function(event, template) {
        var limit = Session.get("Limit_4_Week") + 10
        Session.set("Limit_4_Week", limit)
    },
    'click .more_4_all': function(event, template) {
        var limit = Session.get("Limit_4_All") + 10
        Session.set("Limit_4_All", limit)
    },
    'click .more_1_week_team': function(event, template) {
        var limit = Session.get("Limit_1_Week_t") + 10
        Session.set("Limit_1_Week_t", limit)
    },
    'click .more_1_all_team': function(event, template) {
        var limit = Session.get("Limit_1_All_t") + 10
        Session.set("Limit_1_All_t", limit)
    },
    'click .more_2_week_team': function(event, template) {
        var limit = Session.get("Limit_2_Week_t") + 10
        Session.set("Limit_2_Week_t", limit)
    },
    'click .more_2_all_team': function(event, template) {
        var limit = Session.get("Limit_2_All_t") + 10
        Session.set("Limit_2_All", limit)
    },
    'click .more_3_week_team': function(event, template) {
        var limit = Session.get("Limit_3_Week_t") + 10
        Session.set("Limit_3_Week_t", limit)
    },
    'click .more_3_all_team': function(event, template) {
        var limit = Session.get("Limit_3_All_t") + 10
        Session.set("Limit_3_All_t", limit)
    },
    'click .more_4_week_team': function(event, template) {
        var limit = Session.get("Limit_4_Week_t") + 10
        Session.set("Limit_4_Week_t", limit)
    },
    'click .more_4_all_team': function(event, template) {
        var limit = Session.get("Limit_4_All_t") + 10
        Session.set("Limit_4_All_t", limit)
    }
})