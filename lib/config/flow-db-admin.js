AdminConfig = {
    adminEmails: ['fasching@golemdigital.at'],
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
        },
        "db.Station": {
            icon: 'gamepad',
        }
    }
}