
FlowRouter.route('/', {
  name: "addPinCode",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "addPinCode",
      nav: "nav",
    });
  }
});

FlowRouter.route('/addPinCode', {
  name: "addPinCode",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "addPinCode",
      nav: "nav",
    });
  }
});

FlowRouter.route('/pointTable', {
  name: "pointTable",
  //triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "pointTable",
      nav: "nav",
    });
  }
});

//FlowRouter.route('/addPinCode2', {
//  name: "addPinCode2",
//  triggersEnter: [AccountsTemplates.ensureSignedIn],
//  action: function(params, queryParams) {
//    BlazeLayout.render('masterLayout', {
//      footer: "footer",
//      main: "addPinCode2",
//      nav: "nav",
//    });
//  }
//});

FlowRouter.route('/addTeamCode', {
  name: "addTeamCode",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "addTeamCode",
      nav: "nav",
    });
  }
});

FlowRouter.route('/teamManager', {
  name: "teamManager",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "teamManager",
      nav: "nav",
    });
  }
});

FlowRouter.route('/stationManager', {
  name: "stationManager",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "stationManager",
      nav: "nav",
    });
  }
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "pageNotFound",
      nav: "nav",
    });
  }
};


//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
