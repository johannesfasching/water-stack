var semanticStartUpFunction = function() {



  var $window = $(window);
  var $main = $(".ui.main");
  var $sidebar = $(".ui.sidebar");
  var $toggleSidebarAction = $(".ui.toggle-sidebar");
  var $stationsContainer = $(".ui.stations-container");
  var $closeStationsAction = $(".stations-header");
  var $showStationsAction = $(".stations-show");
  var $leaderboardCarousel = $(".ui.leaderboard");
  var $leaderboardTabs = $(".menu .item");
  var $addPinModal = $(".ui.modal");
  var addPinActionSelector = ".ui.add-pin.button";
  var sidebarBreakpoint = 992;
  var visibilityClass = "visible";

  /**
   * Toggles sidebar
   * @param {Object} e
   */
  var toggleSidebar = function (e) {
    e.preventDefault();

    $sidebar.toggleClass(visibilityClass);

    closeStationsList(e);
  };

  /**
   * Closes sidebar
   */
  var closeSidebar = function () {
    $sidebar.removeClass(visibilityClass);
  };

  /**
   * Closes sidebar on click anywhere but the sidebar and toggle action
   * @param {Object} e
   */
  var closeSidebarOnClick = function (e) {
    $target = selectAnchor(e);

    if ($window.width() > sidebarBreakpoint) {
      return;
    }

    if ($sidebar.hasClass(visibilityClass) && !$target.is($toggleSidebarAction) && !$.contains($sidebar, $target)) {
      e.preventDefault();

      closeSidebar();
    }
  };

  /**
   * Selects the closes anchor element
   * @param {Object} e
   * @return {Object}
   */
  var selectAnchor = function (e) {
    var $el = $(e.target);

    return $el.is("a") ? $el : $el.closest("a");
  };

  /**
   * Initialzies Semantic UI's tab library
   */
  $leaderboardTabs.tab();

  /**
   * Initialzies Semantic UI's modal library
   */
  $addPinModal.modal("attach events", addPinActionSelector);

  /**
   * Initialzies Slick carousel library
   */
  $leaderboardCarousel.slick({
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    centerMode: true,
    centerPadding: "65px",
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerPadding: "65px"
        }
      },
      {
        breakpoint: 870,
        settings: {
          centerPadding: "50px"
        }
      },
      {
        breakpoint: 660,
        settings: {
          centerPadding: "30px"
        }
      },
      {
        breakpoint: 380,
        settings: {
          centerPadding: "25px"
        }
      }
    ]
  });

  /**
   * Shows stations list
   * @param {Object} e
   */
  var showStationsList = function (e) {
    e.preventDefault();

    $stationsContainer.addClass(visibilityClass);
  };

  /**
   * Hides stations list
   * @param {Object} e
   */
  var closeStationsList = function (e) {
    e.preventDefault();

    $stationsContainer.removeClass(visibilityClass);
  };

  /**
   * Detecting events
   */
  $main.on("click", closeSidebarOnClick);
  $toggleSidebarAction.on("click", toggleSidebar);
  $showStationsAction.on("click", showStationsList);
  $closeStationsAction.on("click", closeStationsList);

}

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


FlowRouter.route('/highscores', {
  name: "highscores",
  action: function(params, queryParams) {
      BlazeLayout.render('masterLayout2', {
        main: "highscores",
        nav: "sidemenu"
      });

    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 0)


  }
});

FlowRouter.route('/howto', {
  name: "howto",
  action: function(params, queryParams) {
    //BlazeLayout.reset();

    BlazeLayout.render('masterLayout2', {
      main: "howto",
      nav: "sidemenu"
    });

    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 0)


  }
});

FlowRouter.route('/station', {
  name: "station",
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout2', {
      main: "station",
      nav: "sidemenu"
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

FlowRouter.route('/profile', {
  name: "profile",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "profile",
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
