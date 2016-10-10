Template.login.helpers({


})


var fbLogin = function(event, template) {
    console.log("facebookLogin")
    Meteor.loginWithFacebook({
        requestPermissions: ['user_friends', 'public_profile', 'email']
    }, function(err){
        if (err) {
            console.log("handle error",JSON.stringify(err))
        } else {
            console.log("successful login!")
            FlowRouter.go('highscores')
        }
    });
}

var gLogin = function(event, template) {
    console.log("googleLogin")
    Meteor.loginWithGoogle({
        requestPermissions: [  'email']
    }, function(err){
        if (err) {
            console.log("handle error",JSON.stringify(err))
        } else {
            console.log("successful login!")
            FlowRouter.go('highscores')
        }
    });
}

var pwLogin = function(event, template) {
    console.log("passLogin")
    Meteor.loginWithPassword(
        $("input[name='email']").val(),
        $("input[name='password']").val(),
        function(err){
            if (err) {
                console.log("handle error",JSON.stringify(err))
            } else {
                console.log("successful login!")
                FlowRouter.go('highscores')
            }
        });
}

var pwRegister = function(event, template) {
    console.log("passRegister")
    var username = $("input[name='yourName']").val()
    var password = $("input[name='password']").val()
    var email = $("input[name='email']").val()

    Meteor.call('createUsersss',username, password, email, function (err) {
        if (err) {
            console.log("handle error",JSON.stringify(err))
        } else {
            console.log("successful register!")
            FlowRouter.go('highscores')
        }
    });
}


var allLogout = function(event, template) {
    console.log("logout")
    Meteor.logout(
        function(err){
            if (err) {
                console.log("handle error",JSON.stringify(err))
            } else {
                console.log("successful logout!")
            }
        });
}

//Accounts.onLogin(function () {
//    FlowRouter.go('highscores')
//    // Seems a bit too simple? more on this later!
//})

//Tracker.autorun(function () {
//    if (!Meteor.userId()) {
//        FlowRouter.go('login')
//    }
//})


Template.login.events({
    'click .facebook.button': fbLogin,
    'click .google.button': gLogin,
    'click .password.button': pwLogin,
    'click .logout.button': allLogout
})

Template.createaccount.events({
    'click .facebook.button': fbLogin,
    'click .google.button': gLogin,
    'click .password.button': pwRegister,
    'click .logout.button': allLogout
})
