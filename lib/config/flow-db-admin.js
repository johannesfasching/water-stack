AdminConfig = {
    name: "waterstack",
    adminEmails: ['fasching@golemdigital.at','neven@nevensuboticstiftung.de','tobias.lietz@icloud.com'],
    collections:
    {
        "db.Team": {
            icon: 'fort-awesome',
            tableColumns: [
                { label: 'Titel', name: 'title' },
                { label: 'TeamCode', name: 'teamCode' }
            ],
            showEditColumn: true, // Set to false to hide the edit button. True by default.
            showDelColumn: true, // Set to false to hide the edit button. True by default.
            showWidget: true,
            color: 'red'
        },
        "db.Pin": {
            icon: 'key',
            tableColumns: [
                { label: 'Pin', name: 'pin' },
                { label: 'User-Id', name: 'userId' },
                { label: 'Team-Code', name: 'teamCode' }
            ]
        },
        "db.Station": {
            icon: 'gamepad',
            tableColumns: [
                { label: 'Titel', name: 'title' },
                { label: 'Active', name: 'active' }
            ]
        },
        "db.Competition": {
            icon: 'gamepad',
            tableColumns: [
                { label: 'User PIN', name: 'pin' },
                { label: 'Station ID', name: 'stationId' },
                { label: 'StartZeitPunkt', name: 'timeStarted' }
           ],
            templates: {
                new: {
                    name: 'adminCompetition'
                },
                edit: {
                    name: 'adminCompetition',
                    data: {
                        collection: 'db.Competition'

                    }
                    //data: {
                    //    post: Meteor.isClient && Session.get('admin_doc')
                    //}
                }
            }
        },
        "db.Competition23": {
            icon: 'gamepad',
            tableColumns: [
                { label: 'User PIN', name: 'pin' },
                { label: 'Station ID', name: 'stationId' },
            ]
        }

    }
}