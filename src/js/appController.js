/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define([
  "ojs/ojcore",
  "knockout",
  "ojs/ojrouter",
  "ojs/ojknockout",
  "ojs/ojarraytabledatasource",
  "ojs/ojoffcanvas"
], function(oj, ko) {
  function ControllerViewModel() {
    var self = this;

    // Media queries for repsonsive layouts
    var smQuery = oj.ResponsiveUtils.getFrameworkQuery(
      oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY
    );
    self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(
      smQuery
    );
    var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(
      oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP
    );
    self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(
      mdQuery
    );

    //Global vars
    self.isLoggedIn = ko.observable(false);
    self.globalFullname = ko.observable();
    self.globalUserid = ko.observable();
    self.globalUsername = ko.observable();
    self.globalPhone = ko.observable();
    self.globalStack = ko.observable();
    self.globalLocation = ko.observable();
    self.globalEmail = ko.observable();

    // Router setup
    self.router = oj.Router.rootInstance;
    self.router.configure({
      signupPage: {
        label: "Signup",
        isDefault: true
      },
      loginPage: {
        label: "Login"
      },
      dashboard: {
        label: "Dashboard"
      }
    });
    oj.Router.defaults["urlAdapter"] = new oj.Router.urlParamAdapter();

    // Navigation setup
    var navData = [
      {
        name: "Dashboard",
        id: "dashboard",
        iconClass:
          "oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24"
      }
    ];
    self.navDataSource = new oj.ArrayTableDataSource(navData, {
      idAttribute: "id"
    });

    // Drawer
    // Close offcanvas on medium and larger screens
    self.mdScreen.subscribe(function() {
      oj.OffcanvasUtils.close(self.drawerParams);
    });
    self.drawerParams = {
      displayMode: "push",
      selector: "#navDrawer",
      content: "#pageContent"
    };
    // Called by navigation drawer toggle button and after selection of nav drawer item
    self.toggleDrawer = function() {
      return oj.OffcanvasUtils.toggle(self.drawerParams);
    };
    // Add a close listener so we can move focus back to the toggle button when the drawer closes
    $("#navDrawer").on("ojclose", function() {
      $("#drawerToggleButton").focus();
    });

    // Header
    // Application Name used in Branding Area
    self.appName = ko.observable("OJET TEAM 7");
    // User Info used in Global Navigation area
    self.userLogin = ko.observable();

    // Footer
    // function footerLink(name, id, linkTarget) {
    //     this.name = name;
    //     this.linkId = id;
    //     this.linkTarget = linkTarget;
    // }
    // self.footerLinks = ko.observableArray([
    //     new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
    //     new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
    //     new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
    //     new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
    //     new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
    // ]);
  }

  return new ControllerViewModel();
});
