semanticStartUpFunction = function() {


  //$( document ).ready(function() {

    var $window = $(window);
    var $main = $(".ui.main");
    var $sidebar = $(".ui.sidebar");
    var $toggleSidebarAction = $(".ui.toggle-sidebar");
    var $stationsContainer = $(".ui.stations-container");
    var $closeStationsAction = $(".stations-header");
    var $showStationsAction = $(".stations-show");
    var $leaderboardCarousel = $(".ui.leaderboard");
    var $leaderboardTabs = $(".menu .item");
    var $addPinModal = $(".pinCodeModal");
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
    $(addPinActionSelector).click(function() {
        $("#pinError").addClass('hidden')
    })



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


    var addNewPinCode = function (e) {
      e.preventDefault();
      var userObj = {};
      userObj.userId = Meteor.userId();
      userObj.username = Meteor.userId().username;
      userObj.pin = $("#pinCodeInput").val()
      console.log(userObj)
      Meteor.call("addPinCode", userObj, function(error, retObj) {
          if(retObj.error) {
              $("#pinError").addClass("error");
              $("#pinError").removeClass("success hidden")
              $("#pinErrorMessage").val(retObj.message)
          }
          else {
              $("#pinError").addClass("success");
              $("#pinError").removeClass("error hidden")
              $("#pinErrorMessage").val(retObj.message)
          }
          console.log(retObj)
      })
    }

    var addNewTeamCode = function (e) {
      e.preventDefault()
      var userObj = {}
      userObj.userId = Meteor.userId();
      userObj.username = Meteor.userId().username;
      userObj.pin = Session.get("pinToAssignTeam");
      userObj.teamCode = $("#teamCodeInput").val()
      console.log(userObj)

      Meteor.call("addTeamCode", userObj, function(error, retObj) {
        if(retObj.error) {
          $("#teamError").addClass("error");
          $("#teamError").removeClass("success hidden")
          $("#teamErrorMessage").val(retObj.message)
        }
        else {
          $("#teamError").addClass("success");
          $("#teamError").removeClass("error hidden")
          $("#teamErrorMessage").val(retObj.message)
        }
        console.log(retObj)
      })
    }


    /**
     * Detecting events
     */
    $main.on("click", closeSidebarOnClick);
    $toggleSidebarAction.on("click", toggleSidebar);
    $showStationsAction.on("click", showStationsList);
    $closeStationsAction.on("click", closeStationsList);

    /**
     *   Override for ModalWindow
     */
    $('#addPinCodeSubmitButton2').on("click", addNewPinCode);
    $('#addTeamCodeSubmitButton22').on("click", addNewTeamCode);


  /**
   * Initialzies Slick carousel library
   */
  if($leaderboardCarousel)
  $leaderboardCarousel.each(function() {
    $(this).slick({
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
  });

  //});
}



//FlowRouter.route('/', {
//  name: "addPinCode",
//  triggersEnter: [AccountsTemplates.ensureSignedIn],
//  action: function(params, queryParams) {
//    BlazeLayout.render('masterLayout', {
//      footer: "footer",
//      main: "addPinCode",
//      nav: "nav",
//    });
//  }
//});

//FlowRouter.route('/addPinCode', {
//  name: "addPinCode",
//  triggersEnter: [AccountsTemplates.ensureSignedIn],
//  action: function(params, queryParams) {
//    BlazeLayout.render('masterLayout', {
//      footer: "footer",
//      main: "addPinCode",
//      nav: "nav",
//    });
//  }
//});

function ensureLoggedIn() {
    console.log("ensureLoggedIn")
    if(Meteor.isClient) {
        if(Meteor.userId())
            return
        else FlowRouter.go("login")
    }


}



FlowRouter.route('/', {
  name: "home",
  triggersEnter: [ensureLoggedIn],
  action: function(params, queryParams) {
      BlazeLayout.render('masterLayout2', {
          main: "highscores",
          nav: "sidemenu",
          pinInput: "modalPinCode"
      });
    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 10)
  }
});


FlowRouter.route('/teamPinAssigner', {
    name: "teamPinAssigner",
    //triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: function(params, queryParams) {
        BlazeLayout.render('masterLayout2', {
            main: "teamPinAssigner",
            nav: "sidemenu",
        });
    }
});


FlowRouter.route('/login', {
  name: "login2",
  //triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout2', {
      main: "login",
      pinInput: "modalPinCode"
    });
    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 10)
  }
});

FlowRouter.route('/createaccount', {
  name: "createaccount",
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout2', {
      main: "createaccount",
      pinInput: "modalPinCode"
    });
    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 10)
  }
});


FlowRouter.route('/highscores', {
  name: "highscores",
    //triggersEnter:  ensureLoggedIn(),
    action: function(params, queryParams) {
        console.log("highscores")
      BlazeLayout.render('masterLayout2', {
        main: "highscores",
        nav: "sidemenu",
        pinInput: "modalPinCode"
      });

    Meteor.setTimeout(function() {
      console.log("starting semantic funticon")
      semanticStartUpFunction();
    }, 10)


  }
});

FlowRouter.route('/highscoresTeam', {
  name: "highscores",
    //triggersEnter:  ensureLoggedIn(),
    action: function(params, queryParams) {
        console.log("highscoresTeam")
      BlazeLayout.render('masterLayout2', {
        main: "highscoresTeam",
        nav: "sidemenu",
        pinInput: "modalPinCode"
      });

    Meteor.setTimeout(function() {
      console.log("starting semantic funticon")
      semanticStartUpFunction();
    }, 10)


  }
});

FlowRouter.route('/howto', {
  name: "howto",
    triggersEnter:  ensureLoggedIn(),
    action: function(params, queryParams) {

    BlazeLayout.render('masterLayout2', {
      main: "howto",
      nav: "sidemenu",
      pinInput: "modalPinCode"
    });

    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 10)
  }
});

FlowRouter.route('/share', {
    name: "howto",
    triggersEnter:  ensureLoggedIn(),
    action: function(params, queryParams) {

        BlazeLayout.render('masterLayout2', {
            main: "share",
            nav: "sidemenu",
            pinInput: "modalPinCode"
        });

        Meteor.setTimeout(function() {
            semanticStartUpFunction();
        }, 10)
    }
});

FlowRouter.route('/profile', {
  name: "profile",
    triggersEnter:  ensureLoggedIn(),
    action: function(params, queryParams) {

    BlazeLayout.render('masterLayout2', {
      main: "profile",
      nav: "sidemenu",
      pinInput: "modalPinCode"
    });

    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 100)
  }
});

FlowRouter.route('/createTeam', {
  name: "createTeam",
    triggersEnter:  ensureLoggedIn(),
    action: function(params, queryParams) {

    BlazeLayout.render('masterLayout2', {
      main: "createTeam",
      nav: "sidemenu",
      pinInput: "modalPinCode"
    });

    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 10)
  }
});

FlowRouter.route('/station', {
  name: "station",
    triggersEnter:  ensureLoggedIn(),
    action: function(params, queryParams) {
    BlazeLayout.render('masterLayout2', {
      main: "station",
      nav: "sidemenu",
      pinInput: "modalPinCode"
    });

    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 500)
  }
});

FlowRouter.route('/stationWasserQuiz', {
  name: "stationWasserQuiz",
    triggersEnter:  ensureLoggedIn(),
    action: function(params, queryParams) {
    Session.set("stationTyp","wasserQuiz")
    BlazeLayout.render('masterLayout2', {
      main: "station",
      nav: "sidemenu",
      pinInput: "modalPinCode"
    });
    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 500)
  }
});

FlowRouter.route('/stationWasserBohren', {
  name: "stationWasserBohren",
    triggersEnter:  ensureLoggedIn(),
    action: function(params, queryParams) {
    Session.set("stationTyp","wasserBohren")
    BlazeLayout.render('masterLayout2', {
      main: "station",
      nav: "sidemenu",
      pinInput: "modalPinCode"
    });
    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 500)
  }
});

FlowRouter.route('/stationWasserTragen', {
  name: "stationWasserTragen",
    triggersEnter:  ensureLoggedIn(),
    action: function(params, queryParams) {
    Session.set("stationTyp","wasserTragen")
    BlazeLayout.render('masterLayout2', {
      main: "station",
      nav: "sidemenu",
      pinInput: "modalPinCode"
    });
    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 500)
  }
});

FlowRouter.route('/stationWasserZiehen', {
  name: "stationWasserZiehen",
    triggersEnter:  ensureLoggedIn(),
    action: function(params, queryParams) {
    Session.set("stationTyp","wasserZiehen")
    BlazeLayout.render('masterLayout2', {
      main: "station",
      nav: "sidemenu",
      pinInput: "modalPinCode"
    });
    Meteor.setTimeout(function() {
      semanticStartUpFunction();
    }, 500)
  }
});

//FlowRouter.route('/pointTable', {
//  name: "pointTable",
//  //triggersEnter: [AccountsTemplates.ensureSignedIn],
//  action: function(params, queryParams) {
//    BlazeLayout.render('masterLayout', {
//      footer: "footer",
//      main: "pointTable",
//      nav: "nav",
//    });
//  }
//});

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

//FlowRouter.route('/addTeamCode', {
//  name: "addTeamCode",
//  triggersEnter: [AccountsTemplates.ensureSignedIn],
//  action: function(params, queryParams) {
//    BlazeLayout.render('masterLayout', {
//      footer: "footer",
//      main: "addTeamCode",
//      nav: "nav",
//    });
//  }
//});

//FlowRouter.route('/teamManager', {
//  name: "teamManager",
//  triggersEnter: [AccountsTemplates.ensureSignedIn],
//  action: function(params, queryParams) {
//    BlazeLayout.render('masterLayout', {
//      footer: "footer",
//      main: "teamManager",
//      nav: "nav"
//    });
//  }
//});

//FlowRouter.route('/stationManager', {
//  name: "stationManager",
//  triggersEnter: [AccountsTemplates.ensureSignedIn],
//  action: function(params, queryParams) {
//    BlazeLayout.render('masterLayout', {
//      footer: "footer",
//      main: "stationManager",
//      nav: "nav",
//    });
//  }
//});

//FlowRouter.route('/profile', {
//  name: "profile",
//  triggersEnter: [AccountsTemplates.ensureSignedIn],
//  action: function(params, queryParams) {
//    BlazeLayout.render('masterLayout', {
//      footer: "footer",
//      main: "profile",
//      nav: "nav",
//    });
//  }
//});

FlowRouter.notFound = {
    //triggersEnter:  ensureLoggedIn(),
    action: function() {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "pageNotFound",
      nav: "nav",
    });
  }
};


//Routes
//AccountsTemplates.configureRoute('changePwd');
//AccountsTemplates.configureRoute('forgotPwd');
//AccountsTemplates.configureRoute('resetPwd');
//AccountsTemplates.configureRoute('signIn');
//AccountsTemplates.configureRoute('signUp');
//AccountsTemplates.configureRoute('verifyEmail');
