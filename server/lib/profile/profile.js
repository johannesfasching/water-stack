Meteor.methods({
   'changePW': function(passwd) {
       Accounts.setPassword(Meteor.userId(), passwd);
       return "ok"
   }

});
