// Set up login services
Meteor.startup(function() {
  // Add Facebook configuration entry

  ServiceConfiguration.configurations.update(
    { service: "facebook" },
    { $set: {
        appId: "1008589855934836",
        secret: "0c86ee97e31da3549d68a73e78694855"
      }
    },
    { upsert: true }
  ),


  // Add GitHub configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "github" },
    { $set: {
        clientId: "XXXXXXXXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */

  // Add Google configuration entry
  ServiceConfiguration.configurations.update(
    { service: "google" },
    { $set: {
        clientId: "830637270069-1kmv93slthg6bod173f88l5b6nodi9qe.apps.googleusercontent.com",
        client_email: "fasching@golemdigital.at",
        secret: "GQc0D0vFVAUJ-h4286kMiMEZ"
      }
    },
    { upsert: true }
  );

  // Add Linkedin configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "linkedin" },
    { $set: {
        clientId: "XXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */
});
