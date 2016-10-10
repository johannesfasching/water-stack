Meteor.methods({
   'changePW': function(passwd) {
       Accounts.setPassword(Meteor.userId(), passwd);
       return "ok"

   },
    'createUsersss': function(name,pass,mail) {
        console.log(name,pass,mail)
        Accounts.createUser(
            {
                username: name,
                password: pass,
                email: mail
                //
            }
        )
        return 0
    }
})

