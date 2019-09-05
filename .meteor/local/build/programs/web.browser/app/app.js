var require = meteorInstall({"imports":{"api":{"documents":{"documents.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/documents/documents.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
  Mongo: function (v) {                                                                                              // 1
    Mongo = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
  "default": function (v) {                                                                                          // 1
    SimpleSchema = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Factory = void 0;                                                                                                // 1
module.watch(require("meteor/dburles:factory"), {                                                                    // 1
  Factory: function (v) {                                                                                            // 1
    Factory = v;                                                                                                     // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var Documents = new Mongo.Collection('Documents');                                                                   // 5
module.exportDefault(Documents);                                                                                     // 1
Documents.allow({                                                                                                    // 8
  insert: function () {                                                                                              // 9
    return false;                                                                                                    // 9
  },                                                                                                                 // 9
  update: function () {                                                                                              // 10
    return false;                                                                                                    // 10
  },                                                                                                                 // 10
  remove: function () {                                                                                              // 11
    return false;                                                                                                    // 11
  }                                                                                                                  // 11
});                                                                                                                  // 8
Documents.deny({                                                                                                     // 14
  insert: function () {                                                                                              // 15
    return true;                                                                                                     // 15
  },                                                                                                                 // 15
  update: function () {                                                                                              // 16
    return true;                                                                                                     // 16
  },                                                                                                                 // 16
  remove: function () {                                                                                              // 17
    return true;                                                                                                     // 17
  }                                                                                                                  // 17
});                                                                                                                  // 14
Documents.schema = new SimpleSchema({                                                                                // 20
  title: {                                                                                                           // 21
    type: String,                                                                                                    // 22
    label: 'The title of the document.'                                                                              // 23
  },                                                                                                                 // 21
  body: {                                                                                                            // 25
    type: String,                                                                                                    // 26
    label: 'The body of the document.'                                                                               // 27
  }                                                                                                                  // 25
});                                                                                                                  // 20
Documents.attachSchema(Documents.schema);                                                                            // 31
Factory.define('document', Documents, {                                                                              // 33
  title: function () {                                                                                               // 34
    return 'Factory Title';                                                                                          // 34
  },                                                                                                                 // 34
  body: function () {                                                                                                // 35
    return 'Factory Body';                                                                                           // 35
  }                                                                                                                  // 35
});                                                                                                                  // 33
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/documents/methods.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  upsertDocument: function () {                                                                                      // 1
    return upsertDocument;                                                                                           // 1
  },                                                                                                                 // 1
  removeDocument: function () {                                                                                      // 1
    return removeDocument;                                                                                           // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
  "default": function (v) {                                                                                          // 1
    SimpleSchema = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var ValidatedMethod = void 0;                                                                                        // 1
module.watch(require("meteor/mdg:validated-method"), {                                                               // 1
  ValidatedMethod: function (v) {                                                                                    // 1
    ValidatedMethod = v;                                                                                             // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Documents = void 0;                                                                                              // 1
module.watch(require("./documents"), {                                                                               // 1
  "default": function (v) {                                                                                          // 1
    Documents = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var rateLimit = void 0;                                                                                              // 1
module.watch(require("../../modules/rate-limit.js"), {                                                               // 1
  "default": function (v) {                                                                                          // 1
    rateLimit = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var upsertDocument = new ValidatedMethod({                                                                           // 6
  name: 'documents.upsert',                                                                                          // 7
  validate: new SimpleSchema({                                                                                       // 8
    _id: {                                                                                                           // 9
      type: String,                                                                                                  // 9
      optional: true                                                                                                 // 9
    },                                                                                                               // 9
    title: {                                                                                                         // 10
      type: String,                                                                                                  // 10
      optional: true                                                                                                 // 10
    },                                                                                                               // 10
    body: {                                                                                                          // 11
      type: String,                                                                                                  // 11
      optional: true                                                                                                 // 11
    }                                                                                                                // 11
  }).validator(),                                                                                                    // 8
  run: function (document) {                                                                                         // 13
    return Documents.upsert({                                                                                        // 14
      _id: document._id                                                                                              // 14
    }, {                                                                                                             // 14
      $set: document                                                                                                 // 14
    });                                                                                                              // 14
  }                                                                                                                  // 15
});                                                                                                                  // 6
var removeDocument = new ValidatedMethod({                                                                           // 18
  name: 'documents.remove',                                                                                          // 19
  validate: new SimpleSchema({                                                                                       // 20
    _id: {                                                                                                           // 21
      type: String                                                                                                   // 21
    }                                                                                                                // 21
  }).validator(),                                                                                                    // 20
  run: function (_ref) {                                                                                             // 23
    var _id = _ref._id;                                                                                              // 23
    Documents.remove(_id);                                                                                           // 24
  }                                                                                                                  // 25
});                                                                                                                  // 18
rateLimit({                                                                                                          // 28
  methods: [upsertDocument, removeDocument],                                                                         // 29
  limit: 5,                                                                                                          // 33
  timeRange: 1000                                                                                                    // 34
});                                                                                                                  // 28
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"startup":{"client":{"index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/client/index.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Bert = void 0;                                                                                                   // 1
module.watch(require("meteor/themeteorchef:bert"), {                                                                 // 1
  Bert: function (v) {                                                                                               // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
module.watch(require("bootstrap/dist/css/bootstrap.min.css"));                                                       // 1
module.watch(require("./routes.js"));                                                                                // 1
Bert.defaults.style = 'growl-top-right';                                                                             // 5
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"routes.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/client/routes.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var render = void 0;                                                                                                 // 1
module.watch(require("react-dom"), {                                                                                 // 1
  render: function (v) {                                                                                             // 1
    render = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Router = void 0,                                                                                                 // 1
    Route = void 0,                                                                                                  // 1
    IndexRoute = void 0,                                                                                             // 1
    browserHistory = void 0;                                                                                         // 1
module.watch(require("react-router"), {                                                                              // 1
  Router: function (v) {                                                                                             // 1
    Router = v;                                                                                                      // 1
  },                                                                                                                 // 1
  Route: function (v) {                                                                                              // 1
    Route = v;                                                                                                       // 1
  },                                                                                                                 // 1
  IndexRoute: function (v) {                                                                                         // 1
    IndexRoute = v;                                                                                                  // 1
  },                                                                                                                 // 1
  browserHistory: function (v) {                                                                                     // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
  Meteor: function (v) {                                                                                             // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var App = void 0;                                                                                                    // 1
module.watch(require("../../ui/layouts/App.js"), {                                                                   // 1
  "default": function (v) {                                                                                          // 1
    App = v;                                                                                                         // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
var Documents = void 0;                                                                                              // 1
module.watch(require("../../ui/pages/Documents.js"), {                                                               // 1
  "default": function (v) {                                                                                          // 1
    Documents = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 5);                                                                                                               // 1
var NewDocument = void 0;                                                                                            // 1
module.watch(require("../../ui/pages/NewDocument.js"), {                                                             // 1
  "default": function (v) {                                                                                          // 1
    NewDocument = v;                                                                                                 // 1
  }                                                                                                                  // 1
}, 6);                                                                                                               // 1
var EditDocument = void 0;                                                                                           // 1
module.watch(require("../../ui/pages/EditDocument.js"), {                                                            // 1
  "default": function (v) {                                                                                          // 1
    EditDocument = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 7);                                                                                                               // 1
var ViewDocument = void 0;                                                                                           // 1
module.watch(require("../../ui/pages/ViewDocument.js"), {                                                            // 1
  "default": function (v) {                                                                                          // 1
    ViewDocument = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 8);                                                                                                               // 1
var Index = void 0;                                                                                                  // 1
module.watch(require("../../ui/pages/Index.js"), {                                                                   // 1
  "default": function (v) {                                                                                          // 1
    Index = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 9);                                                                                                               // 1
var Login = void 0;                                                                                                  // 1
module.watch(require("../../ui/pages/Login.js"), {                                                                   // 1
  "default": function (v) {                                                                                          // 1
    Login = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 10);                                                                                                              // 1
var NotFound = void 0;                                                                                               // 1
module.watch(require("../../ui/pages/NotFound.js"), {                                                                // 1
  "default": function (v) {                                                                                          // 1
    NotFound = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 11);                                                                                                              // 1
var RecoverPassword = void 0;                                                                                        // 1
module.watch(require("../../ui/pages/RecoverPassword.js"), {                                                         // 1
  "default": function (v) {                                                                                          // 1
    RecoverPassword = v;                                                                                             // 1
  }                                                                                                                  // 1
}, 12);                                                                                                              // 1
var ResetPassword = void 0;                                                                                          // 1
module.watch(require("../../ui/pages/ResetPassword.js"), {                                                           // 1
  "default": function (v) {                                                                                          // 1
    ResetPassword = v;                                                                                               // 1
  }                                                                                                                  // 1
}, 13);                                                                                                              // 1
var Signup = void 0;                                                                                                 // 1
module.watch(require("../../ui/pages/Signup.js"), {                                                                  // 1
  "default": function (v) {                                                                                          // 1
    Signup = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 14);                                                                                                              // 1
                                                                                                                     //
var authenticate = function (nextState, replace) {                                                                   // 19
  if (!Meteor.loggingIn() && !Meteor.userId()) {                                                                     // 20
    replace({                                                                                                        // 21
      pathname: '/login',                                                                                            // 22
      state: {                                                                                                       // 23
        nextPathname: nextState.location.pathname                                                                    // 23
      }                                                                                                              // 23
    });                                                                                                              // 21
  }                                                                                                                  // 25
};                                                                                                                   // 26
                                                                                                                     //
Meteor.startup(function () {                                                                                         // 28
  render(React.createElement(                                                                                        // 29
    Router,                                                                                                          // 30
    {                                                                                                                // 30
      history: browserHistory                                                                                        // 30
    },                                                                                                               // 30
    React.createElement(                                                                                             // 31
      Route,                                                                                                         // 31
      {                                                                                                              // 31
        path: "/",                                                                                                   // 31
        component: App                                                                                               // 31
      },                                                                                                             // 31
      React.createElement(IndexRoute, {                                                                              // 32
        name: "index",                                                                                               // 32
        component: Index                                                                                             // 32
      }),                                                                                                            // 32
      React.createElement(Route, {                                                                                   // 33
        name: "documents",                                                                                           // 33
        path: "/documents",                                                                                          // 33
        component: Documents,                                                                                        // 33
        onEnter: authenticate                                                                                        // 33
      }),                                                                                                            // 33
      React.createElement(Route, {                                                                                   // 34
        name: "newDocument",                                                                                         // 34
        path: "/documents/new",                                                                                      // 34
        component: NewDocument,                                                                                      // 34
        onEnter: authenticate                                                                                        // 34
      }),                                                                                                            // 34
      React.createElement(Route, {                                                                                   // 35
        name: "editDocument",                                                                                        // 35
        path: "/documents/:_id/edit",                                                                                // 35
        component: EditDocument,                                                                                     // 35
        onEnter: authenticate                                                                                        // 35
      }),                                                                                                            // 35
      React.createElement(Route, {                                                                                   // 36
        name: "viewDocument",                                                                                        // 36
        path: "/documents/:_id",                                                                                     // 36
        component: ViewDocument,                                                                                     // 36
        onEnter: authenticate                                                                                        // 36
      }),                                                                                                            // 36
      React.createElement(Route, {                                                                                   // 37
        name: "login",                                                                                               // 37
        path: "/login",                                                                                              // 37
        component: Login                                                                                             // 37
      }),                                                                                                            // 37
      React.createElement(Route, {                                                                                   // 38
        name: "recover-password",                                                                                    // 38
        path: "/recover-password",                                                                                   // 38
        component: RecoverPassword                                                                                   // 38
      }),                                                                                                            // 38
      React.createElement(Route, {                                                                                   // 39
        name: "reset-password",                                                                                      // 39
        path: "/reset-password/:token",                                                                              // 39
        component: ResetPassword                                                                                     // 39
      }),                                                                                                            // 39
      React.createElement(Route, {                                                                                   // 40
        name: "signup",                                                                                              // 40
        path: "/signup",                                                                                             // 40
        component: Signup                                                                                            // 40
      }),                                                                                                            // 40
      React.createElement(Route, {                                                                                   // 41
        path: "*",                                                                                                   // 41
        component: NotFound                                                                                          // 41
      })                                                                                                             // 41
    )                                                                                                                // 31
  ), document.getElementById('react-root'));                                                                         // 30
});                                                                                                                  // 46
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"ui":{"components":{"AppNavigation.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/AppNavigation.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var PropTypes = void 0;                                                                                              // 1
module.watch(require("prop-types"), {                                                                                // 1
  "default": function (v) {                                                                                          // 1
    PropTypes = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Navbar = void 0;                                                                                                 // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  Navbar: function (v) {                                                                                             // 1
    Navbar = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var Link = void 0;                                                                                                   // 1
module.watch(require("react-router"), {                                                                              // 1
  Link: function (v) {                                                                                               // 1
    Link = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
  Meteor: function (v) {                                                                                             // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
var PublicNavigation = void 0;                                                                                       // 1
module.watch(require("./PublicNavigation.js"), {                                                                     // 1
  "default": function (v) {                                                                                          // 1
    PublicNavigation = v;                                                                                            // 1
  }                                                                                                                  // 1
}, 5);                                                                                                               // 1
var AuthenticatedNavigation = void 0;                                                                                // 1
module.watch(require("./AuthenticatedNavigation.js"), {                                                              // 1
  "default": function (v) {                                                                                          // 1
    AuthenticatedNavigation = v;                                                                                     // 1
  }                                                                                                                  // 1
}, 6);                                                                                                               // 1
var container = void 0;                                                                                              // 1
module.watch(require("../../modules/container"), {                                                                   // 1
  "default": function (v) {                                                                                          // 1
    container = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 7);                                                                                                               // 1
                                                                                                                     //
var renderNavigation = function (hasUser) {                                                                          // 10
  return hasUser ? React.createElement(AuthenticatedNavigation, null) : React.createElement(PublicNavigation, null);
};                                                                                                                   // 10
                                                                                                                     //
var AppNavigation = function (_ref) {                                                                                // 13
  var hasUser = _ref.hasUser;                                                                                        // 13
  return React.createElement(Navbar, null);                                                                          // 13
};                                                                                                                   // 13
                                                                                                                     //
AppNavigation.propTypes = {                                                                                          // 15
  hasUser: PropTypes.object                                                                                          // 16
};                                                                                                                   // 15
module.exportDefault(container(function (props, onData) {                                                            // 1
  onData(null, {                                                                                                     // 20
    hasUser: Meteor.user()                                                                                           // 20
  });                                                                                                                // 20
}, AppNavigation));                                                                                                  // 21
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AuthenticatedNavigation.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/AuthenticatedNavigation.js                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var browserHistory = void 0;                                                                                         // 1
module.watch(require("react-router"), {                                                                              // 1
  browserHistory: function (v) {                                                                                     // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var LinkContainer = void 0;                                                                                          // 1
module.watch(require("react-router-bootstrap"), {                                                                    // 1
  LinkContainer: function (v) {                                                                                      // 1
    LinkContainer = v;                                                                                               // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var Nav = void 0,                                                                                                    // 1
    NavItem = void 0,                                                                                                // 1
    NavDropdown = void 0,                                                                                            // 1
    MenuItem = void 0;                                                                                               // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  Nav: function (v) {                                                                                                // 1
    Nav = v;                                                                                                         // 1
  },                                                                                                                 // 1
  NavItem: function (v) {                                                                                            // 1
    NavItem = v;                                                                                                     // 1
  },                                                                                                                 // 1
  NavDropdown: function (v) {                                                                                        // 1
    NavDropdown = v;                                                                                                 // 1
  },                                                                                                                 // 1
  MenuItem: function (v) {                                                                                           // 1
    MenuItem = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
  Meteor: function (v) {                                                                                             // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
                                                                                                                     //
var handleLogout = function () {                                                                                     // 7
  return Meteor.logout(function () {                                                                                 // 7
    return browserHistory.push('/login');                                                                            // 7
  });                                                                                                                // 7
};                                                                                                                   // 7
                                                                                                                     //
var userName = function () {                                                                                         // 9
  var user = Meteor.user();                                                                                          // 10
  var name = user && user.profile ? user.profile.name : '';                                                          // 11
  return user ? name.first + " " + name.last : '';                                                                   // 12
};                                                                                                                   // 13
                                                                                                                     //
var AuthenticatedNavigation = function () {                                                                          // 15
  return React.createElement(                                                                                        // 15
    "div",                                                                                                           // 16
    null,                                                                                                            // 16
    React.createElement(                                                                                             // 17
      Nav,                                                                                                           // 17
      null,                                                                                                          // 17
      React.createElement(                                                                                           // 18
        LinkContainer,                                                                                               // 18
        {                                                                                                            // 18
          to: "/documents"                                                                                           // 18
        },                                                                                                           // 18
        React.createElement(                                                                                         // 19
          NavItem,                                                                                                   // 19
          {                                                                                                          // 19
            eventKey: 2,                                                                                             // 19
            href: "/documents"                                                                                       // 19
          },                                                                                                         // 19
          "Documents"                                                                                                // 19
        )                                                                                                            // 19
      )                                                                                                              // 18
    ),                                                                                                               // 17
    React.createElement(                                                                                             // 22
      Nav,                                                                                                           // 22
      {                                                                                                              // 22
        pullRight: true                                                                                              // 22
      },                                                                                                             // 22
      React.createElement(                                                                                           // 23
        NavDropdown,                                                                                                 // 23
        {                                                                                                            // 23
          eventKey: 3,                                                                                               // 23
          title: userName(),                                                                                         // 23
          id: "basic-nav-dropdown"                                                                                   // 23
        },                                                                                                           // 23
        React.createElement(                                                                                         // 24
          MenuItem,                                                                                                  // 24
          {                                                                                                          // 24
            eventKey: 3.1,                                                                                           // 24
            onClick: handleLogout                                                                                    // 24
          },                                                                                                         // 24
          "Logout"                                                                                                   // 24
        )                                                                                                            // 24
      )                                                                                                              // 23
    )                                                                                                                // 22
  );                                                                                                                 // 16
};                                                                                                                   // 15
                                                                                                                     //
module.exportDefault(AuthenticatedNavigation);                                                                       // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DateListGroupItem.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/DateListGroupItem.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var moment = void 0;                                                                                                 // 1
module.watch(require("moment"), {                                                                                    // 1
  "default": function (v) {                                                                                          // 1
    moment = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var PropTypes = void 0;                                                                                              // 1
module.watch(require("prop-types"), {                                                                                // 1
  "default": function (v) {                                                                                          // 1
    PropTypes = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var niceDate = function (date) {                                                                                     // 5
  return moment(date).calendar(null, {                                                                               // 5
    sameDay: '[Today]',                                                                                              // 6
    nextDay: '[Tomorrow]',                                                                                           // 7
    nextWeek: 'dddd',                                                                                                // 8
    lastDay: '[Yesterday]',                                                                                          // 9
    lastWeek: '[Last] dddd',                                                                                         // 10
    sameElse: 'DD/MM/YYYY'                                                                                           // 11
  });                                                                                                                // 5
};                                                                                                                   // 5
                                                                                                                     //
var DateListGroupItem = function (_ref) {                                                                            // 14
  var startDate = _ref.startDate,                                                                                    // 14
      endDate = _ref.endDate,                                                                                        // 14
      index = _ref.index,                                                                                            // 14
      remove = _ref.remove;                                                                                          // 14
  return React.createElement(                                                                                        // 14
    "div",                                                                                                           // 15
    {                                                                                                                // 15
      className: "list-group-item"                                                                                   // 15
    },                                                                                                               // 15
    niceDate(startDate),                                                                                             // 16
    "\u2013",                                                                                                        // 15
    niceDate(endDate),                                                                                               // 16
    React.createElement(                                                                                             // 17
      "button",                                                                                                      // 17
      {                                                                                                              // 17
        onClick: function () {                                                                                       // 17
          return remove(index);                                                                                      // 17
        },                                                                                                           // 17
        className: "btn btn-sm btn-link"                                                                             // 17
      },                                                                                                             // 17
      React.createElement("i", {                                                                                     // 18
        className: "fa fa-remove"                                                                                    // 18
      })                                                                                                             // 18
    )                                                                                                                // 17
  );                                                                                                                 // 15
};                                                                                                                   // 14
                                                                                                                     //
DateListGroupItem.propTypes = {                                                                                      // 22
  startDate: PropTypes.instanceOf(Date),                                                                             // 23
  endDate: PropTypes.instanceOf(Date),                                                                               // 24
  index: PropTypes.number,                                                                                           // 25
  remove: PropTypes.func                                                                                             // 26
};                                                                                                                   // 22
module.exportDefault(DateListGroupItem);                                                                             // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DocumentEditor.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/DocumentEditor.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return DocumentEditor;                                                                                           // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var PropTypes = void 0;                                                                                              // 1
module.watch(require("prop-types"), {                                                                                // 1
  "default": function (v) {                                                                                          // 1
    PropTypes = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var FormGroup = void 0,                                                                                              // 1
    ControlLabel = void 0,                                                                                           // 1
    FormControl = void 0,                                                                                            // 1
    Button = void 0;                                                                                                 // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  FormGroup: function (v) {                                                                                          // 1
    FormGroup = v;                                                                                                   // 1
  },                                                                                                                 // 1
  ControlLabel: function (v) {                                                                                       // 1
    ControlLabel = v;                                                                                                // 1
  },                                                                                                                 // 1
  FormControl: function (v) {                                                                                        // 1
    FormControl = v;                                                                                                 // 1
  },                                                                                                                 // 1
  Button: function (v) {                                                                                             // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var documentEditor = void 0;                                                                                         // 1
module.watch(require("../../modules/document-editor.js"), {                                                          // 1
  "default": function (v) {                                                                                          // 1
    documentEditor = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
                                                                                                                     //
var DocumentEditor = function (_React$Component) {                                                                   //
  (0, _inherits3.default)(DocumentEditor, _React$Component);                                                         //
                                                                                                                     //
  function DocumentEditor() {                                                                                        //
    (0, _classCallCheck3.default)(this, DocumentEditor);                                                             //
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));                  //
  }                                                                                                                  //
                                                                                                                     //
  DocumentEditor.prototype.componentDidMount = function () {                                                         //
    function componentDidMount() {                                                                                   //
      documentEditor({                                                                                               // 10
        component: this                                                                                              // 10
      });                                                                                                            // 10
      setTimeout(function () {                                                                                       // 11
        document.querySelector('[name="title"]').focus();                                                            // 11
      }, 0);                                                                                                         // 11
    }                                                                                                                // 12
                                                                                                                     //
    return componentDidMount;                                                                                        //
  }();                                                                                                               //
                                                                                                                     //
  DocumentEditor.prototype.render = function () {                                                                    //
    function render() {                                                                                              //
      var _this2 = this;                                                                                             // 14
                                                                                                                     //
      var doc = this.props.doc;                                                                                      // 14
      return React.createElement(                                                                                    // 16
        "form",                                                                                                      // 16
        {                                                                                                            // 16
          ref: function (form) {                                                                                     // 17
            return _this2.documentEditorForm = form;                                                                 // 17
          },                                                                                                         // 17
          onSubmit: function (event) {                                                                               // 18
            return event.preventDefault();                                                                           // 18
          }                                                                                                          // 18
        },                                                                                                           // 16
        React.createElement(                                                                                         // 20
          FormGroup,                                                                                                 // 20
          null,                                                                                                      // 20
          React.createElement(                                                                                       // 21
            ControlLabel,                                                                                            // 21
            null,                                                                                                    // 21
            "Title"                                                                                                  // 21
          ),                                                                                                         // 21
          React.createElement(FormControl, {                                                                         // 22
            type: "text",                                                                                            // 23
            name: "title",                                                                                           // 24
            defaultValue: doc && doc.title,                                                                          // 25
            placeholder: "Oh, The Places You'll Go!"                                                                 // 26
          })                                                                                                         // 22
        ),                                                                                                           // 20
        React.createElement(                                                                                         // 29
          FormGroup,                                                                                                 // 29
          null,                                                                                                      // 29
          React.createElement(                                                                                       // 30
            ControlLabel,                                                                                            // 30
            null,                                                                                                    // 30
            "Body"                                                                                                   // 30
          ),                                                                                                         // 30
          React.createElement(FormControl, {                                                                         // 31
            componentClass: "textarea",                                                                              // 32
            name: "body",                                                                                            // 33
            defaultValue: doc && doc.body,                                                                           // 34
            placeholder: "Congratulations! Today is your day. You're off to Great Places! You're off and away!"      // 35
          })                                                                                                         // 31
        ),                                                                                                           // 29
        React.createElement(                                                                                         // 38
          Button,                                                                                                    // 38
          {                                                                                                          // 38
            type: "submit",                                                                                          // 38
            bsStyle: "success"                                                                                       // 38
          },                                                                                                         // 38
          doc && doc._id ? 'Save Changes' : 'Add Document'                                                           // 39
        )                                                                                                            // 38
      );                                                                                                             // 16
    }                                                                                                                // 42
                                                                                                                     //
    return render;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return DocumentEditor;                                                                                             //
}(React.Component);                                                                                                  //
                                                                                                                     //
DocumentEditor.propTypes = {                                                                                         // 45
  doc: PropTypes.object                                                                                              // 46
};                                                                                                                   // 45
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DocumentsList.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/DocumentsList.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var PropTypes = void 0;                                                                                              // 1
module.watch(require("prop-types"), {                                                                                // 1
  "default": function (v) {                                                                                          // 1
    PropTypes = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var browserHistory = void 0;                                                                                         // 1
module.watch(require("react-router"), {                                                                              // 1
  browserHistory: function (v) {                                                                                     // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var ListGroup = void 0,                                                                                              // 1
    ListGroupItem = void 0,                                                                                          // 1
    Alert = void 0;                                                                                                  // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  ListGroup: function (v) {                                                                                          // 1
    ListGroup = v;                                                                                                   // 1
  },                                                                                                                 // 1
  ListGroupItem: function (v) {                                                                                      // 1
    ListGroupItem = v;                                                                                               // 1
  },                                                                                                                 // 1
  Alert: function (v) {                                                                                              // 1
    Alert = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
  Meteor: function (v) {                                                                                             // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
var Documents = void 0;                                                                                              // 1
module.watch(require("../../api/documents/documents"), {                                                             // 1
  "default": function (v) {                                                                                          // 1
    Documents = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 5);                                                                                                               // 1
var container = void 0;                                                                                              // 1
module.watch(require("../../modules/container"), {                                                                   // 1
  "default": function (v) {                                                                                          // 1
    container = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 6);                                                                                                               // 1
                                                                                                                     //
var handleNav = function (_id) {                                                                                     // 9
  return browserHistory.push("/documents/" + _id);                                                                   // 9
};                                                                                                                   // 9
                                                                                                                     //
var DocumentsList = function (_ref) {                                                                                // 11
  var documents = _ref.documents;                                                                                    // 11
  return documents.length > 0 ? React.createElement(                                                                 // 11
    ListGroup,                                                                                                       // 12
    {                                                                                                                // 12
      className: "DocumentsList"                                                                                     // 12
    },                                                                                                               // 12
    documents.map(function (_ref2) {                                                                                 // 13
      var _id = _ref2._id,                                                                                           // 13
          title = _ref2.title;                                                                                       // 13
      return React.createElement(                                                                                    // 13
        ListGroupItem,                                                                                               // 14
        {                                                                                                            // 14
          key: _id,                                                                                                  // 14
          onClick: function () {                                                                                     // 14
            return handleNav(_id);                                                                                   // 14
          }                                                                                                          // 14
        },                                                                                                           // 14
        title                                                                                                        // 15
      );                                                                                                             // 14
    })                                                                                                               // 13
  ) : React.createElement(                                                                                           // 12
    Alert,                                                                                                           // 19
    {                                                                                                                // 19
      bsStyle: "warning"                                                                                             // 19
    },                                                                                                               // 19
    "No documents yet."                                                                                              // 19
  );                                                                                                                 // 19
};                                                                                                                   // 11
                                                                                                                     //
DocumentsList.propTypes = {                                                                                          // 22
  documents: PropTypes.array                                                                                         // 23
};                                                                                                                   // 22
module.exportDefault(container(function (props, onData) {                                                            // 1
  var subscription = Meteor.subscribe('documents.list');                                                             // 27
                                                                                                                     //
  if (subscription.ready()) {                                                                                        // 28
    var documents = Documents.find().fetch();                                                                        // 29
    onData(null, {                                                                                                   // 30
      documents: documents                                                                                           // 30
    });                                                                                                              // 30
  }                                                                                                                  // 31
}, DocumentsList));                                                                                                  // 32
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ExampleDates.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/ExampleDates.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _extends2 = require("babel-runtime/helpers/extends");                                                            //
                                                                                                                     //
var _extends3 = _interopRequireDefault(_extends2);                                                                   //
                                                                                                                     //
var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");                                        //
                                                                                                                     //
var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);                                               //
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Loadable = void 0;                                                                                               // 1
module.watch(require("react-loadable"), {                                                                            // 1
  "default": function (v) {                                                                                          // 1
    Loadable = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var DateListGroupItem = void 0;                                                                                      // 1
module.watch(require("./DateListGroupItem"), {                                                                       // 1
  "default": function (v) {                                                                                          // 1
    DateListGroupItem = v;                                                                                           // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
// generic loading component to show while transfering section of code                                               // 5
var LoadingComponent = function () {                                                                                 // 6
  return React.createElement(                                                                                        // 6
    "span",                                                                                                          // 6
    {                                                                                                                // 6
      className: "text-muted"                                                                                        // 6
    },                                                                                                               // 6
    React.createElement("i", {                                                                                       // 6
      className: "fa fa-refresh"                                                                                     // 6
    })                                                                                                               // 6
  );                                                                                                                 // 6
}; // new version of the component, now: loading --> rendered                                                        // 6
                                                                                                                     //
                                                                                                                     //
var PickDates = Loadable({                                                                                           // 8
  // this does the dynamic import, and returns a promise                                                             // 9
  loader: function () {                                                                                              // 10
    return module.dynamicImport('./PickDates');                                                                      // 10
  },                                                                                                                 // 10
  // this is our generic loading display (optional)                                                                  // 11
  loading: LoadingComponent,                                                                                         // 12
  // this is a delay before we decide to show our LoadingComponent (optional)                                        // 13
  delay: 200                                                                                                         // 14
});                                                                                                                  // 8
                                                                                                                     //
var ExampleDates = function (_React$Component) {                                                                     //
  (0, _inherits3.default)(ExampleDates, _React$Component);                                                           //
                                                                                                                     //
  function ExampleDates(props) {                                                                                     // 18
    (0, _classCallCheck3.default)(this, ExampleDates);                                                               // 18
                                                                                                                     //
    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));                  // 18
                                                                                                                     //
    _this.state = {                                                                                                  // 20
      dates: []                                                                                                      // 20
    };                                                                                                               // 20
    _this.addDates = _this.addDates.bind(_this);                                                                     // 21
    _this.removeDate = _this.removeDate.bind(_this);                                                                 // 22
    return _this;                                                                                                    // 18
  }                                                                                                                  // 23
                                                                                                                     //
  ExampleDates.prototype.addDates = function () {                                                                    //
    function addDates(newDates) {                                                                                    //
      console.log(newDates);                                                                                         // 25
      this.setState({                                                                                                // 26
        dates: [].concat((0, _toConsumableArray3.default)(this.state.dates), [newDates])                             // 26
      });                                                                                                            // 26
    }                                                                                                                // 27
                                                                                                                     //
    return addDates;                                                                                                 //
  }();                                                                                                               //
                                                                                                                     //
  ExampleDates.prototype.removeDate = function () {                                                                  //
    function removeDate(index) {                                                                                     //
      this.setState({                                                                                                // 29
        dates: [].concat((0, _toConsumableArray3.default)(this.state.dates.slice(0, index)), (0, _toConsumableArray3.default)(this.state.dates.slice(index + 1)))
      });                                                                                                            // 29
    }                                                                                                                // 33
                                                                                                                     //
    return removeDate;                                                                                               //
  }();                                                                                                               //
                                                                                                                     //
  ExampleDates.prototype.render = function () {                                                                      //
    function render() {                                                                                              //
      var _this2 = this;                                                                                             // 34
                                                                                                                     //
      return React.createElement(                                                                                    // 35
        "div",                                                                                                       // 36
        null,                                                                                                        // 36
        React.createElement(PickDates, {                                                                             // 37
          onAddDates: this.addDates                                                                                  // 37
        }),                                                                                                          // 37
        React.createElement("hr", null),                                                                             // 38
        React.createElement(                                                                                         // 39
          "div",                                                                                                     // 39
          {                                                                                                          // 39
            className: "list-group"                                                                                  // 39
          },                                                                                                         // 39
          this.state.dates.map(function (dates, index) {                                                             // 40
            return React.createElement(DateListGroupItem, (0, _extends3.default)({}, dates, {                        // 40
              key: index,                                                                                            // 41
              index: index,                                                                                          // 41
              remove: _this2.removeDate                                                                              // 41
            }));                                                                                                     // 41
          })                                                                                                         // 40
        )                                                                                                            // 39
      );                                                                                                             // 36
    }                                                                                                                // 46
                                                                                                                     //
    return render;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return ExampleDates;                                                                                               //
}(React.Component);                                                                                                  //
                                                                                                                     //
module.exportDefault(ExampleDates);                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PickDates.js":[
  "babel-runtime/helpers/classCallCheck",
  "babel-runtime/helpers/possibleConstructorReturn",
  "babel-runtime/helpers/inherits",
  "moment",
  "react",
  "prop-types",
  "react-dates",
  "react-dates/lib/css/_datepicker.css"
],"PublicNavigation.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/PublicNavigation.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var LinkContainer = void 0;                                                                                          // 1
module.watch(require("react-router-bootstrap"), {                                                                    // 1
  LinkContainer: function (v) {                                                                                      // 1
    LinkContainer = v;                                                                                               // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Nav = void 0,                                                                                                    // 1
    NavItem = void 0;                                                                                                // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  Nav: function (v) {                                                                                                // 1
    Nav = v;                                                                                                         // 1
  },                                                                                                                 // 1
  NavItem: function (v) {                                                                                            // 1
    NavItem = v;                                                                                                     // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var PublicNavigation = function () {                                                                                 // 5
  return React.createElement(                                                                                        // 5
    Nav,                                                                                                             // 6
    {                                                                                                                // 6
      pullRight: true                                                                                                // 6
    },                                                                                                               // 6
    React.createElement(                                                                                             // 7
      LinkContainer,                                                                                                 // 7
      {                                                                                                              // 7
        to: "/"                                                                                                      // 7
      },                                                                                                             // 7
      React.createElement(                                                                                           // 8
        NavItem,                                                                                                     // 8
        {                                                                                                            // 8
          eventKey: 1,                                                                                               // 8
          href: "/"                                                                                                  // 8
        },                                                                                                           // 8
        "Example"                                                                                                    // 8
      )                                                                                                              // 8
    ),                                                                                                               // 7
    React.createElement(                                                                                             // 10
      NavItem,                                                                                                       // 10
      {                                                                                                              // 10
        eventKey: 2,                                                                                                 // 10
        href: "https://code.zeroasterisk.com/"                                                                       // 10
      },                                                                                                             // 10
      "Blog Post"                                                                                                    // 10
    )                                                                                                                // 10
  );                                                                                                                 // 6
};                                                                                                                   // 5
                                                                                                                     //
module.exportDefault(PublicNavigation);                                                                              // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"layouts":{"App.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/layouts/App.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var PropTypes = void 0;                                                                                              // 1
module.watch(require("prop-types"), {                                                                                // 1
  "default": function (v) {                                                                                          // 1
    PropTypes = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Grid = void 0;                                                                                                   // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  Grid: function (v) {                                                                                               // 1
    Grid = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var AppNavigation = void 0;                                                                                          // 1
module.watch(require("../components/AppNavigation"), {                                                               // 1
  "default": function (v) {                                                                                          // 1
    AppNavigation = v;                                                                                               // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
                                                                                                                     //
var App = function (_ref) {                                                                                          // 6
  var children = _ref.children;                                                                                      // 6
  return React.createElement(                                                                                        // 6
    "div",                                                                                                           // 7
    null,                                                                                                            // 7
    React.createElement(AppNavigation, null),                                                                        // 8
    React.createElement(                                                                                             // 9
      Grid,                                                                                                          // 9
      null,                                                                                                          // 9
      children                                                                                                       // 10
    )                                                                                                                // 9
  );                                                                                                                 // 7
};                                                                                                                   // 6
                                                                                                                     //
App.propTypes = {                                                                                                    // 15
  children: PropTypes.node                                                                                           // 16
};                                                                                                                   // 15
module.exportDefault(App);                                                                                           // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"pages":{"Documents.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/Documents.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Link = void 0;                                                                                                   // 1
module.watch(require("react-router"), {                                                                              // 1
  Link: function (v) {                                                                                               // 1
    Link = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    Button = void 0;                                                                                                 // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  Row: function (v) {                                                                                                // 1
    Row = v;                                                                                                         // 1
  },                                                                                                                 // 1
  Col: function (v) {                                                                                                // 1
    Col = v;                                                                                                         // 1
  },                                                                                                                 // 1
  Button: function (v) {                                                                                             // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var DocumentsList = void 0;                                                                                          // 1
module.watch(require("../components/DocumentsList"), {                                                               // 1
  "default": function (v) {                                                                                          // 1
    DocumentsList = v;                                                                                               // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
                                                                                                                     //
var Documents = function () {                                                                                        // 6
  return React.createElement(                                                                                        // 6
    "div",                                                                                                           // 7
    {                                                                                                                // 7
      className: "Documents"                                                                                         // 7
    },                                                                                                               // 7
    React.createElement(                                                                                             // 8
      Row,                                                                                                           // 8
      null,                                                                                                          // 8
      React.createElement(                                                                                           // 9
        Col,                                                                                                         // 9
        {                                                                                                            // 9
          xs: 12                                                                                                     // 9
        },                                                                                                           // 9
        React.createElement(                                                                                         // 10
          "div",                                                                                                     // 10
          {                                                                                                          // 10
            className: "page-header clearfix"                                                                        // 10
          },                                                                                                         // 10
          React.createElement(                                                                                       // 11
            "h4",                                                                                                    // 11
            {                                                                                                        // 11
              className: "pull-left"                                                                                 // 11
            },                                                                                                       // 11
            "Documents"                                                                                              // 11
          ),                                                                                                         // 11
          React.createElement(                                                                                       // 12
            Link,                                                                                                    // 12
            {                                                                                                        // 12
              to: "/documents/new"                                                                                   // 12
            },                                                                                                       // 12
            React.createElement(                                                                                     // 13
              Button,                                                                                                // 13
              {                                                                                                      // 13
                bsStyle: "success",                                                                                  // 14
                className: "pull-right"                                                                              // 15
              },                                                                                                     // 13
              "New Document"                                                                                         // 13
            )                                                                                                        // 13
          )                                                                                                          // 12
        ),                                                                                                           // 10
        React.createElement(DocumentsList, null)                                                                     // 19
      )                                                                                                              // 9
    )                                                                                                                // 8
  );                                                                                                                 // 7
};                                                                                                                   // 6
                                                                                                                     //
module.exportDefault(Documents);                                                                                     // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"EditDocument.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/EditDocument.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var PropTypes = void 0;                                                                                              // 1
module.watch(require("prop-types"), {                                                                                // 1
  "default": function (v) {                                                                                          // 1
    PropTypes = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
  Meteor: function (v) {                                                                                             // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var Documents = void 0;                                                                                              // 1
module.watch(require("../../api/documents/documents"), {                                                             // 1
  "default": function (v) {                                                                                          // 1
    Documents = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var DocumentEditor = void 0;                                                                                         // 1
module.watch(require("../components/DocumentEditor"), {                                                              // 1
  "default": function (v) {                                                                                          // 1
    DocumentEditor = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
var NotFound = void 0;                                                                                               // 1
module.watch(require("./NotFound"), {                                                                                // 1
  "default": function (v) {                                                                                          // 1
    NotFound = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 5);                                                                                                               // 1
var container = void 0;                                                                                              // 1
module.watch(require("../../modules/container"), {                                                                   // 1
  "default": function (v) {                                                                                          // 1
    container = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 6);                                                                                                               // 1
                                                                                                                     //
var EditDocument = function (_ref) {                                                                                 // 9
  var doc = _ref.doc;                                                                                                // 9
  return doc ? React.createElement(                                                                                  // 9
    "div",                                                                                                           // 10
    {                                                                                                                // 10
      className: "EditDocument"                                                                                      // 10
    },                                                                                                               // 10
    React.createElement(                                                                                             // 11
      "h4",                                                                                                          // 11
      {                                                                                                              // 11
        className: "page-header"                                                                                     // 11
      },                                                                                                             // 11
      "Editing \"",                                                                                                  // 11
      doc.title,                                                                                                     // 11
      "\""                                                                                                           // 11
    ),                                                                                                               // 11
    React.createElement(DocumentEditor, {                                                                            // 12
      doc: doc                                                                                                       // 12
    })                                                                                                               // 12
  ) : React.createElement(NotFound, null);                                                                           // 10
};                                                                                                                   // 9
                                                                                                                     //
EditDocument.propTypes = {                                                                                           // 16
  doc: PropTypes.object                                                                                              // 17
};                                                                                                                   // 16
module.exportDefault(container(function (props, onData) {                                                            // 1
  var documentId = props.params._id;                                                                                 // 21
  var subscription = Meteor.subscribe('documents.view', documentId);                                                 // 22
                                                                                                                     //
  if (subscription.ready()) {                                                                                        // 24
    var doc = Documents.findOne(documentId);                                                                         // 25
    onData(null, {                                                                                                   // 26
      doc: doc                                                                                                       // 26
    });                                                                                                              // 26
  }                                                                                                                  // 27
}, EditDocument));                                                                                                   // 28
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/Index.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Jumbotron = void 0;                                                                                              // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  Jumbotron: function (v) {                                                                                          // 1
    Jumbotron = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var ExampleDates = void 0;                                                                                           // 1
module.watch(require("../components/ExampleDates"), {                                                                // 1
  "default": function (v) {                                                                                          // 1
    ExampleDates = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var Index = function () {                                                                                            // 5
  return React.createElement(                                                                                        // 5
    "div",                                                                                                           // 6
    {                                                                                                                // 6
      className: "Index"                                                                                             // 6
    },                                                                                                               // 6
    React.createElement(                                                                                             // 7
      Jumbotron,                                                                                                     // 7
      {                                                                                                              // 7
        className: "text-center"                                                                                     // 7
      },                                                                                                             // 7
      React.createElement(                                                                                           // 8
        "h2",                                                                                                        // 8
        null,                                                                                                        // 8
        "Example for Meteor 1.5"                                                                                     // 8
      ),                                                                                                             // 8
      React.createElement(                                                                                           // 9
        "p",                                                                                                         // 9
        null,                                                                                                        // 9
        "We are making a very simple component to pick and render dates."                                            // 9
      ),                                                                                                             // 9
      React.createElement(ExampleDates, null)                                                                        // 10
    )                                                                                                                // 7
  );                                                                                                                 // 6
};                                                                                                                   // 5
                                                                                                                     //
module.exportDefault(Index);                                                                                         // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Login.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/Login.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return Login;                                                                                                    // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Link = void 0;                                                                                                   // 1
module.watch(require("react-router"), {                                                                              // 1
  Link: function (v) {                                                                                               // 1
    Link = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    FormGroup = void 0,                                                                                              // 1
    ControlLabel = void 0,                                                                                           // 1
    FormControl = void 0,                                                                                            // 1
    Button = void 0;                                                                                                 // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  Row: function (v) {                                                                                                // 1
    Row = v;                                                                                                         // 1
  },                                                                                                                 // 1
  Col: function (v) {                                                                                                // 1
    Col = v;                                                                                                         // 1
  },                                                                                                                 // 1
  FormGroup: function (v) {                                                                                          // 1
    FormGroup = v;                                                                                                   // 1
  },                                                                                                                 // 1
  ControlLabel: function (v) {                                                                                       // 1
    ControlLabel = v;                                                                                                // 1
  },                                                                                                                 // 1
  FormControl: function (v) {                                                                                        // 1
    FormControl = v;                                                                                                 // 1
  },                                                                                                                 // 1
  Button: function (v) {                                                                                             // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var handleLogin = void 0;                                                                                            // 1
module.watch(require("../../modules/login"), {                                                                       // 1
  "default": function (v) {                                                                                          // 1
    handleLogin = v;                                                                                                 // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
                                                                                                                     //
var Login = function (_React$Component) {                                                                            //
  (0, _inherits3.default)(Login, _React$Component);                                                                  //
                                                                                                                     //
  function Login() {                                                                                                 //
    (0, _classCallCheck3.default)(this, Login);                                                                      //
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));                  //
  }                                                                                                                  //
                                                                                                                     //
  Login.prototype.componentDidMount = function () {                                                                  //
    function componentDidMount() {                                                                                   //
      handleLogin({                                                                                                  // 8
        component: this                                                                                              // 8
      });                                                                                                            // 8
    }                                                                                                                // 9
                                                                                                                     //
    return componentDidMount;                                                                                        //
  }();                                                                                                               //
                                                                                                                     //
  Login.prototype.handleSubmit = function () {                                                                       //
    function handleSubmit(event) {                                                                                   //
      event.preventDefault();                                                                                        // 12
    }                                                                                                                // 13
                                                                                                                     //
    return handleSubmit;                                                                                             //
  }();                                                                                                               //
                                                                                                                     //
  Login.prototype.render = function () {                                                                             //
    function render() {                                                                                              //
      var _this2 = this;                                                                                             // 15
                                                                                                                     //
      return React.createElement(                                                                                    // 16
        "div",                                                                                                       // 17
        {                                                                                                            // 17
          className: "Login"                                                                                         // 17
        },                                                                                                           // 17
        React.createElement(                                                                                         // 18
          Row,                                                                                                       // 18
          null,                                                                                                      // 18
          React.createElement(                                                                                       // 19
            Col,                                                                                                     // 19
            {                                                                                                        // 19
              xs: 12,                                                                                                // 19
              sm: 6,                                                                                                 // 19
              md: 4                                                                                                  // 19
            },                                                                                                       // 19
            React.createElement(                                                                                     // 20
              "h4",                                                                                                  // 20
              {                                                                                                      // 20
                className: "page-header"                                                                             // 20
              },                                                                                                     // 20
              "Login"                                                                                                // 20
            ),                                                                                                       // 20
            React.createElement(                                                                                     // 21
              "form",                                                                                                // 21
              {                                                                                                      // 21
                ref: function (form) {                                                                               // 22
                  return _this2.loginForm = form;                                                                    // 22
                },                                                                                                   // 22
                className: "login",                                                                                  // 23
                onSubmit: this.handleSubmit                                                                          // 24
              },                                                                                                     // 21
              React.createElement(                                                                                   // 26
                FormGroup,                                                                                           // 26
                null,                                                                                                // 26
                React.createElement(                                                                                 // 27
                  ControlLabel,                                                                                      // 27
                  null,                                                                                              // 27
                  "Email Address"                                                                                    // 27
                ),                                                                                                   // 27
                React.createElement(FormControl, {                                                                   // 28
                  type: "email",                                                                                     // 29
                  ref: "emailAddress",                                                                               // 30
                  name: "emailAddress",                                                                              // 31
                  placeholder: "Email Address"                                                                       // 32
                })                                                                                                   // 28
              ),                                                                                                     // 26
              React.createElement(                                                                                   // 35
                FormGroup,                                                                                           // 35
                null,                                                                                                // 35
                React.createElement(                                                                                 // 36
                  ControlLabel,                                                                                      // 36
                  null,                                                                                              // 36
                  React.createElement(                                                                               // 37
                    "span",                                                                                          // 37
                    {                                                                                                // 37
                      className: "pull-left"                                                                         // 37
                    },                                                                                               // 37
                    "Password"                                                                                       // 37
                  ),                                                                                                 // 37
                  React.createElement(                                                                               // 38
                    Link,                                                                                            // 38
                    {                                                                                                // 38
                      className: "pull-right",                                                                       // 38
                      to: "/recover-password"                                                                        // 38
                    },                                                                                               // 38
                    "Forgot Password?"                                                                               // 38
                  )                                                                                                  // 38
                ),                                                                                                   // 36
                React.createElement(FormControl, {                                                                   // 40
                  type: "password",                                                                                  // 41
                  ref: "password",                                                                                   // 42
                  name: "password",                                                                                  // 43
                  placeholder: "Password"                                                                            // 44
                })                                                                                                   // 40
              ),                                                                                                     // 35
              React.createElement(                                                                                   // 47
                Button,                                                                                              // 47
                {                                                                                                    // 47
                  type: "submit",                                                                                    // 47
                  bsStyle: "success"                                                                                 // 47
                },                                                                                                   // 47
                "Login"                                                                                              // 47
              )                                                                                                      // 47
            )                                                                                                        // 21
          )                                                                                                          // 19
        )                                                                                                            // 18
      );                                                                                                             // 17
    }                                                                                                                // 53
                                                                                                                     //
    return render;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return Login;                                                                                                      //
}(React.Component);                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NewDocument.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/NewDocument.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var DocumentEditor = void 0;                                                                                         // 1
module.watch(require("../components/DocumentEditor.js"), {                                                           // 1
  "default": function (v) {                                                                                          // 1
    DocumentEditor = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
                                                                                                                     //
var NewDocument = function () {                                                                                      // 4
  return React.createElement(                                                                                        // 4
    "div",                                                                                                           // 5
    {                                                                                                                // 5
      className: "NewDocument"                                                                                       // 5
    },                                                                                                               // 5
    React.createElement(                                                                                             // 6
      "h4",                                                                                                          // 6
      {                                                                                                              // 6
        className: "page-header"                                                                                     // 6
      },                                                                                                             // 6
      "New Document"                                                                                                 // 6
    ),                                                                                                               // 6
    React.createElement(DocumentEditor, null)                                                                        // 7
  );                                                                                                                 // 5
};                                                                                                                   // 4
                                                                                                                     //
module.exportDefault(NewDocument);                                                                                   // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NotFound.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/NotFound.js                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Alert = void 0;                                                                                                  // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  Alert: function (v) {                                                                                              // 1
    Alert = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
                                                                                                                     //
var NotFound = function () {                                                                                         // 4
  return React.createElement(                                                                                        // 4
    "div",                                                                                                           // 5
    {                                                                                                                // 5
      className: "NotFound"                                                                                          // 5
    },                                                                                                               // 5
    React.createElement(                                                                                             // 6
      Alert,                                                                                                         // 6
      {                                                                                                              // 6
        bsStyle: "danger"                                                                                            // 6
      },                                                                                                             // 6
      React.createElement(                                                                                           // 7
        "p",                                                                                                         // 7
        null,                                                                                                        // 7
        React.createElement(                                                                                         // 7
          "strong",                                                                                                  // 7
          null,                                                                                                      // 7
          "Error [404]"                                                                                              // 7
        ),                                                                                                           // 7
        ": ",                                                                                                        // 7
        window.location.pathname,                                                                                    // 7
        " does not exist."                                                                                           // 7
      )                                                                                                              // 7
    )                                                                                                                // 6
  );                                                                                                                 // 5
};                                                                                                                   // 4
                                                                                                                     //
module.exportDefault(NotFound);                                                                                      // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"RecoverPassword.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/RecoverPassword.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return RecoverPassword;                                                                                          // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    Alert = void 0,                                                                                                  // 1
    FormGroup = void 0,                                                                                              // 1
    FormControl = void 0,                                                                                            // 1
    Button = void 0;                                                                                                 // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  Row: function (v) {                                                                                                // 1
    Row = v;                                                                                                         // 1
  },                                                                                                                 // 1
  Col: function (v) {                                                                                                // 1
    Col = v;                                                                                                         // 1
  },                                                                                                                 // 1
  Alert: function (v) {                                                                                              // 1
    Alert = v;                                                                                                       // 1
  },                                                                                                                 // 1
  FormGroup: function (v) {                                                                                          // 1
    FormGroup = v;                                                                                                   // 1
  },                                                                                                                 // 1
  FormControl: function (v) {                                                                                        // 1
    FormControl = v;                                                                                                 // 1
  },                                                                                                                 // 1
  Button: function (v) {                                                                                             // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var handleRecoverPassword = void 0;                                                                                  // 1
module.watch(require("../../modules/recover-password"), {                                                            // 1
  "default": function (v) {                                                                                          // 1
    handleRecoverPassword = v;                                                                                       // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var RecoverPassword = function (_React$Component) {                                                                  //
  (0, _inherits3.default)(RecoverPassword, _React$Component);                                                        //
                                                                                                                     //
  function RecoverPassword() {                                                                                       //
    (0, _classCallCheck3.default)(this, RecoverPassword);                                                            //
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));                  //
  }                                                                                                                  //
                                                                                                                     //
  RecoverPassword.prototype.componentDidMount = function () {                                                        //
    function componentDidMount() {                                                                                   //
      handleRecoverPassword({                                                                                        // 7
        component: this                                                                                              // 7
      });                                                                                                            // 7
    }                                                                                                                // 8
                                                                                                                     //
    return componentDidMount;                                                                                        //
  }();                                                                                                               //
                                                                                                                     //
  RecoverPassword.prototype.handleSubmit = function () {                                                             //
    function handleSubmit(event) {                                                                                   //
      event.preventDefault();                                                                                        // 11
    }                                                                                                                // 12
                                                                                                                     //
    return handleSubmit;                                                                                             //
  }();                                                                                                               //
                                                                                                                     //
  RecoverPassword.prototype.render = function () {                                                                   //
    function render() {                                                                                              //
      var _this2 = this;                                                                                             // 14
                                                                                                                     //
      return React.createElement(                                                                                    // 15
        "div",                                                                                                       // 16
        {                                                                                                            // 16
          className: "RecoverPassword"                                                                               // 16
        },                                                                                                           // 16
        React.createElement(                                                                                         // 17
          Row,                                                                                                       // 17
          null,                                                                                                      // 17
          React.createElement(                                                                                       // 18
            Col,                                                                                                     // 18
            {                                                                                                        // 18
              xs: 12,                                                                                                // 18
              sm: 6,                                                                                                 // 18
              md: 4                                                                                                  // 18
            },                                                                                                       // 18
            React.createElement(                                                                                     // 19
              "h4",                                                                                                  // 19
              {                                                                                                      // 19
                className: "page-header"                                                                             // 19
              },                                                                                                     // 19
              "Recover Password"                                                                                     // 19
            ),                                                                                                       // 19
            React.createElement(                                                                                     // 20
              Alert,                                                                                                 // 20
              {                                                                                                      // 20
                bsStyle: "info"                                                                                      // 20
              },                                                                                                     // 20
              "Enter your email address below to receive a link to reset your password."                             // 20
            ),                                                                                                       // 20
            React.createElement(                                                                                     // 23
              "form",                                                                                                // 23
              {                                                                                                      // 23
                ref: function (form) {                                                                               // 24
                  return _this2.recoverPasswordForm = form;                                                          // 24
                },                                                                                                   // 24
                className: "recover-password",                                                                       // 25
                onSubmit: this.handleSubmit                                                                          // 26
              },                                                                                                     // 23
              React.createElement(                                                                                   // 28
                FormGroup,                                                                                           // 28
                null,                                                                                                // 28
                React.createElement(FormControl, {                                                                   // 29
                  type: "email",                                                                                     // 30
                  ref: "emailAddress",                                                                               // 31
                  name: "emailAddress",                                                                              // 32
                  placeholder: "Email Address"                                                                       // 33
                })                                                                                                   // 29
              ),                                                                                                     // 28
              React.createElement(                                                                                   // 36
                Button,                                                                                              // 36
                {                                                                                                    // 36
                  type: "submit",                                                                                    // 36
                  bsStyle: "success"                                                                                 // 36
                },                                                                                                   // 36
                "Recover Password"                                                                                   // 36
              )                                                                                                      // 36
            )                                                                                                        // 23
          )                                                                                                          // 18
        )                                                                                                            // 17
      );                                                                                                             // 16
    }                                                                                                                // 42
                                                                                                                     //
    return render;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return RecoverPassword;                                                                                            //
}(React.Component);                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ResetPassword.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/ResetPassword.js                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return ResetPassword;                                                                                            // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var PropTypes = void 0;                                                                                              // 1
module.watch(require("prop-types"), {                                                                                // 1
  "default": function (v) {                                                                                          // 1
    PropTypes = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    Alert = void 0,                                                                                                  // 1
    FormGroup = void 0,                                                                                              // 1
    ControlLabel = void 0,                                                                                           // 1
    FormControl = void 0,                                                                                            // 1
    Button = void 0;                                                                                                 // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  Row: function (v) {                                                                                                // 1
    Row = v;                                                                                                         // 1
  },                                                                                                                 // 1
  Col: function (v) {                                                                                                // 1
    Col = v;                                                                                                         // 1
  },                                                                                                                 // 1
  Alert: function (v) {                                                                                              // 1
    Alert = v;                                                                                                       // 1
  },                                                                                                                 // 1
  FormGroup: function (v) {                                                                                          // 1
    FormGroup = v;                                                                                                   // 1
  },                                                                                                                 // 1
  ControlLabel: function (v) {                                                                                       // 1
    ControlLabel = v;                                                                                                // 1
  },                                                                                                                 // 1
  FormControl: function (v) {                                                                                        // 1
    FormControl = v;                                                                                                 // 1
  },                                                                                                                 // 1
  Button: function (v) {                                                                                             // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var handleResetPassword = void 0;                                                                                    // 1
module.watch(require("../../modules/reset-password"), {                                                              // 1
  "default": function (v) {                                                                                          // 1
    handleResetPassword = v;                                                                                         // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
                                                                                                                     //
var ResetPassword = function (_React$Component) {                                                                    //
  (0, _inherits3.default)(ResetPassword, _React$Component);                                                          //
                                                                                                                     //
  function ResetPassword() {                                                                                         //
    (0, _classCallCheck3.default)(this, ResetPassword);                                                              //
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));                  //
  }                                                                                                                  //
                                                                                                                     //
  ResetPassword.prototype.componentDidMount = function () {                                                          //
    function componentDidMount() {                                                                                   //
      handleResetPassword({                                                                                          // 8
        component: this,                                                                                             // 8
        token: this.props.params.token                                                                               // 8
      });                                                                                                            // 8
    }                                                                                                                // 9
                                                                                                                     //
    return componentDidMount;                                                                                        //
  }();                                                                                                               //
                                                                                                                     //
  ResetPassword.prototype.handleSubmit = function () {                                                               //
    function handleSubmit(event) {                                                                                   //
      event.preventDefault();                                                                                        // 12
    }                                                                                                                // 13
                                                                                                                     //
    return handleSubmit;                                                                                             //
  }();                                                                                                               //
                                                                                                                     //
  ResetPassword.prototype.render = function () {                                                                     //
    function render() {                                                                                              //
      var _this2 = this;                                                                                             // 15
                                                                                                                     //
      return React.createElement(                                                                                    // 16
        "div",                                                                                                       // 17
        {                                                                                                            // 17
          className: "ResetPassword"                                                                                 // 17
        },                                                                                                           // 17
        React.createElement(                                                                                         // 18
          Row,                                                                                                       // 18
          null,                                                                                                      // 18
          React.createElement(                                                                                       // 19
            Col,                                                                                                     // 19
            {                                                                                                        // 19
              xs: 12,                                                                                                // 19
              sm: 6,                                                                                                 // 19
              md: 4                                                                                                  // 19
            },                                                                                                       // 19
            React.createElement(                                                                                     // 20
              "h4",                                                                                                  // 20
              {                                                                                                      // 20
                className: "page-header"                                                                             // 20
              },                                                                                                     // 20
              "Reset Password"                                                                                       // 20
            ),                                                                                                       // 20
            React.createElement(                                                                                     // 21
              Alert,                                                                                                 // 21
              {                                                                                                      // 21
                bsStyle: "info"                                                                                      // 21
              },                                                                                                     // 21
              "To reset your password, enter a new one below. You will be logged in with your new password."         // 21
            ),                                                                                                       // 21
            React.createElement(                                                                                     // 25
              "form",                                                                                                // 25
              {                                                                                                      // 25
                ref: function (form) {                                                                               // 26
                  return _this2.resetPasswordForm = form;                                                            // 26
                },                                                                                                   // 26
                className: "reset-password",                                                                         // 27
                onSubmit: this.handleSubmit                                                                          // 28
              },                                                                                                     // 25
              React.createElement(                                                                                   // 30
                FormGroup,                                                                                           // 30
                null,                                                                                                // 30
                React.createElement(                                                                                 // 31
                  ControlLabel,                                                                                      // 31
                  null,                                                                                              // 31
                  "New Password"                                                                                     // 31
                ),                                                                                                   // 31
                React.createElement(FormControl, {                                                                   // 32
                  type: "password",                                                                                  // 33
                  ref: "newPassword",                                                                                // 34
                  name: "newPassword",                                                                               // 35
                  placeholder: "New Password"                                                                        // 36
                })                                                                                                   // 32
              ),                                                                                                     // 30
              React.createElement(                                                                                   // 39
                FormGroup,                                                                                           // 39
                null,                                                                                                // 39
                React.createElement(                                                                                 // 40
                  ControlLabel,                                                                                      // 40
                  null,                                                                                              // 40
                  "Repeat New Password"                                                                              // 40
                ),                                                                                                   // 40
                React.createElement(FormControl, {                                                                   // 41
                  type: "password",                                                                                  // 42
                  ref: "repeatNewPassword",                                                                          // 43
                  name: "repeatNewPassword",                                                                         // 44
                  placeholder: "Repeat New Password"                                                                 // 45
                })                                                                                                   // 41
              ),                                                                                                     // 39
              React.createElement(                                                                                   // 48
                Button,                                                                                              // 48
                {                                                                                                    // 48
                  type: "submit",                                                                                    // 48
                  bsStyle: "success"                                                                                 // 48
                },                                                                                                   // 48
                "Reset Password & Login"                                                                             // 48
              )                                                                                                      // 48
            )                                                                                                        // 25
          )                                                                                                          // 19
        )                                                                                                            // 18
      );                                                                                                             // 17
    }                                                                                                                // 54
                                                                                                                     //
    return render;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return ResetPassword;                                                                                              //
}(React.Component);                                                                                                  //
                                                                                                                     //
ResetPassword.propTypes = {                                                                                          // 57
  params: PropTypes.object                                                                                           // 58
};                                                                                                                   // 57
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Signup.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/Signup.js                                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return Signup;                                                                                                   // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Link = void 0;                                                                                                   // 1
module.watch(require("react-router"), {                                                                              // 1
  Link: function (v) {                                                                                               // 1
    Link = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    FormGroup = void 0,                                                                                              // 1
    ControlLabel = void 0,                                                                                           // 1
    FormControl = void 0,                                                                                            // 1
    Button = void 0;                                                                                                 // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  Row: function (v) {                                                                                                // 1
    Row = v;                                                                                                         // 1
  },                                                                                                                 // 1
  Col: function (v) {                                                                                                // 1
    Col = v;                                                                                                         // 1
  },                                                                                                                 // 1
  FormGroup: function (v) {                                                                                          // 1
    FormGroup = v;                                                                                                   // 1
  },                                                                                                                 // 1
  ControlLabel: function (v) {                                                                                       // 1
    ControlLabel = v;                                                                                                // 1
  },                                                                                                                 // 1
  FormControl: function (v) {                                                                                        // 1
    FormControl = v;                                                                                                 // 1
  },                                                                                                                 // 1
  Button: function (v) {                                                                                             // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var handleSignup = void 0;                                                                                           // 1
module.watch(require("../../modules/signup"), {                                                                      // 1
  "default": function (v) {                                                                                          // 1
    handleSignup = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
                                                                                                                     //
var Signup = function (_React$Component) {                                                                           //
  (0, _inherits3.default)(Signup, _React$Component);                                                                 //
                                                                                                                     //
  function Signup() {                                                                                                //
    (0, _classCallCheck3.default)(this, Signup);                                                                     //
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));                  //
  }                                                                                                                  //
                                                                                                                     //
  Signup.prototype.componentDidMount = function () {                                                                 //
    function componentDidMount() {                                                                                   //
      handleSignup({                                                                                                 // 8
        component: this                                                                                              // 8
      });                                                                                                            // 8
    }                                                                                                                // 9
                                                                                                                     //
    return componentDidMount;                                                                                        //
  }();                                                                                                               //
                                                                                                                     //
  Signup.prototype.handleSubmit = function () {                                                                      //
    function handleSubmit(event) {                                                                                   //
      event.preventDefault();                                                                                        // 12
    }                                                                                                                // 13
                                                                                                                     //
    return handleSubmit;                                                                                             //
  }();                                                                                                               //
                                                                                                                     //
  Signup.prototype.render = function () {                                                                            //
    function render() {                                                                                              //
      var _this2 = this;                                                                                             // 15
                                                                                                                     //
      return React.createElement(                                                                                    // 16
        "div",                                                                                                       // 17
        {                                                                                                            // 17
          className: "Signup"                                                                                        // 17
        },                                                                                                           // 17
        React.createElement(                                                                                         // 18
          Row,                                                                                                       // 18
          null,                                                                                                      // 18
          React.createElement(                                                                                       // 19
            Col,                                                                                                     // 19
            {                                                                                                        // 19
              xs: 12,                                                                                                // 19
              sm: 6,                                                                                                 // 19
              md: 4                                                                                                  // 19
            },                                                                                                       // 19
            React.createElement(                                                                                     // 20
              "h4",                                                                                                  // 20
              {                                                                                                      // 20
                className: "page-header"                                                                             // 20
              },                                                                                                     // 20
              "Sign Up"                                                                                              // 20
            ),                                                                                                       // 20
            React.createElement(                                                                                     // 21
              "form",                                                                                                // 21
              {                                                                                                      // 21
                ref: function (form) {                                                                               // 22
                  return _this2.signupForm = form;                                                                   // 22
                },                                                                                                   // 22
                onSubmit: this.handleSubmit                                                                          // 23
              },                                                                                                     // 21
              React.createElement(                                                                                   // 25
                Row,                                                                                                 // 25
                null,                                                                                                // 25
                React.createElement(                                                                                 // 26
                  Col,                                                                                               // 26
                  {                                                                                                  // 26
                    xs: 6,                                                                                           // 26
                    sm: 6                                                                                            // 26
                  },                                                                                                 // 26
                  React.createElement(                                                                               // 27
                    FormGroup,                                                                                       // 27
                    null,                                                                                            // 27
                    React.createElement(                                                                             // 28
                      ControlLabel,                                                                                  // 28
                      null,                                                                                          // 28
                      "First Name"                                                                                   // 28
                    ),                                                                                               // 28
                    React.createElement(FormControl, {                                                               // 29
                      type: "text",                                                                                  // 30
                      ref: "firstName",                                                                              // 31
                      name: "firstName",                                                                             // 32
                      placeholder: "First Name"                                                                      // 33
                    })                                                                                               // 29
                  )                                                                                                  // 27
                ),                                                                                                   // 26
                React.createElement(                                                                                 // 37
                  Col,                                                                                               // 37
                  {                                                                                                  // 37
                    xs: 6,                                                                                           // 37
                    sm: 6                                                                                            // 37
                  },                                                                                                 // 37
                  React.createElement(                                                                               // 38
                    FormGroup,                                                                                       // 38
                    null,                                                                                            // 38
                    React.createElement(                                                                             // 39
                      ControlLabel,                                                                                  // 39
                      null,                                                                                          // 39
                      "Last Name"                                                                                    // 39
                    ),                                                                                               // 39
                    React.createElement(FormControl, {                                                               // 40
                      type: "text",                                                                                  // 41
                      ref: "lastName",                                                                               // 42
                      name: "lastName",                                                                              // 43
                      placeholder: "Last Name"                                                                       // 44
                    })                                                                                               // 40
                  )                                                                                                  // 38
                )                                                                                                    // 37
              ),                                                                                                     // 25
              React.createElement(                                                                                   // 49
                FormGroup,                                                                                           // 49
                null,                                                                                                // 49
                React.createElement(                                                                                 // 50
                  ControlLabel,                                                                                      // 50
                  null,                                                                                              // 50
                  "Email Address"                                                                                    // 50
                ),                                                                                                   // 50
                React.createElement(FormControl, {                                                                   // 51
                  type: "text",                                                                                      // 52
                  ref: "emailAddress",                                                                               // 53
                  name: "emailAddress",                                                                              // 54
                  placeholder: "Email Address"                                                                       // 55
                })                                                                                                   // 51
              ),                                                                                                     // 49
              React.createElement(                                                                                   // 58
                FormGroup,                                                                                           // 58
                null,                                                                                                // 58
                React.createElement(                                                                                 // 59
                  ControlLabel,                                                                                      // 59
                  null,                                                                                              // 59
                  "Password"                                                                                         // 59
                ),                                                                                                   // 59
                React.createElement(FormControl, {                                                                   // 60
                  type: "password",                                                                                  // 61
                  ref: "password",                                                                                   // 62
                  name: "password",                                                                                  // 63
                  placeholder: "Password"                                                                            // 64
                })                                                                                                   // 60
              ),                                                                                                     // 58
              React.createElement(                                                                                   // 67
                Button,                                                                                              // 67
                {                                                                                                    // 67
                  type: "submit",                                                                                    // 67
                  bsStyle: "success"                                                                                 // 67
                },                                                                                                   // 67
                "Sign Up"                                                                                            // 67
              )                                                                                                      // 67
            ),                                                                                                       // 21
            React.createElement(                                                                                     // 69
              "p",                                                                                                   // 69
              null,                                                                                                  // 69
              "Already have an account? ",                                                                           // 69
              React.createElement(                                                                                   // 69
                Link,                                                                                                // 69
                {                                                                                                    // 69
                  to: "/login"                                                                                       // 69
                },                                                                                                   // 69
                "Log In"                                                                                             // 69
              ),                                                                                                     // 69
              "."                                                                                                    // 69
            )                                                                                                        // 69
          )                                                                                                          // 19
        )                                                                                                            // 18
      );                                                                                                             // 17
    }                                                                                                                // 74
                                                                                                                     //
    return render;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return Signup;                                                                                                     //
}(React.Component);                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ViewDocument.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/ViewDocument.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var PropTypes = void 0;                                                                                              // 1
module.watch(require("prop-types"), {                                                                                // 1
  "default": function (v) {                                                                                          // 1
    PropTypes = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var ButtonToolbar = void 0,                                                                                          // 1
    ButtonGroup = void 0,                                                                                            // 1
    Button = void 0;                                                                                                 // 1
module.watch(require("react-bootstrap"), {                                                                           // 1
  ButtonToolbar: function (v) {                                                                                      // 1
    ButtonToolbar = v;                                                                                               // 1
  },                                                                                                                 // 1
  ButtonGroup: function (v) {                                                                                        // 1
    ButtonGroup = v;                                                                                                 // 1
  },                                                                                                                 // 1
  Button: function (v) {                                                                                             // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var browserHistory = void 0;                                                                                         // 1
module.watch(require("react-router"), {                                                                              // 1
  browserHistory: function (v) {                                                                                     // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
  Meteor: function (v) {                                                                                             // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
var Bert = void 0;                                                                                                   // 1
module.watch(require("meteor/themeteorchef:bert"), {                                                                 // 1
  Bert: function (v) {                                                                                               // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 5);                                                                                                               // 1
var Documents = void 0;                                                                                              // 1
module.watch(require("../../api/documents/documents"), {                                                             // 1
  "default": function (v) {                                                                                          // 1
    Documents = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 6);                                                                                                               // 1
var removeDocument = void 0;                                                                                         // 1
module.watch(require("../../api/documents/methods"), {                                                               // 1
  removeDocument: function (v) {                                                                                     // 1
    removeDocument = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 7);                                                                                                               // 1
var NotFound = void 0;                                                                                               // 1
module.watch(require("./NotFound"), {                                                                                // 1
  "default": function (v) {                                                                                          // 1
    NotFound = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 8);                                                                                                               // 1
var container = void 0;                                                                                              // 1
module.watch(require("../../modules/container"), {                                                                   // 1
  "default": function (v) {                                                                                          // 1
    container = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 9);                                                                                                               // 1
                                                                                                                     //
var handleEdit = function (_id) {                                                                                    // 12
  browserHistory.push("/documents/" + _id + "/edit");                                                                // 13
};                                                                                                                   // 14
                                                                                                                     //
var handleRemove = function (_id) {                                                                                  // 16
  if (confirm('Are you sure? This is permanent!')) {                                                                 // 17
    removeDocument.call({                                                                                            // 18
      _id: _id                                                                                                       // 18
    }, function (error) {                                                                                            // 18
      if (error) {                                                                                                   // 19
        Bert.alert(error.reason, 'danger');                                                                          // 20
      } else {                                                                                                       // 21
        Bert.alert('Document deleted!', 'success');                                                                  // 22
        browserHistory.push('/documents');                                                                           // 23
      }                                                                                                              // 24
    });                                                                                                              // 25
  }                                                                                                                  // 26
};                                                                                                                   // 27
                                                                                                                     //
var ViewDocument = function (_ref) {                                                                                 // 29
  var doc = _ref.doc;                                                                                                // 29
  return doc ? React.createElement(                                                                                  // 30
    "div",                                                                                                           // 31
    {                                                                                                                // 31
      className: "ViewDocument"                                                                                      // 31
    },                                                                                                               // 31
    React.createElement(                                                                                             // 32
      "div",                                                                                                         // 32
      {                                                                                                              // 32
        className: "page-header clearfix"                                                                            // 32
      },                                                                                                             // 32
      React.createElement(                                                                                           // 33
        "h4",                                                                                                        // 33
        {                                                                                                            // 33
          className: "pull-left"                                                                                     // 33
        },                                                                                                           // 33
        doc && doc.title                                                                                             // 33
      ),                                                                                                             // 33
      React.createElement(                                                                                           // 34
        ButtonToolbar,                                                                                               // 34
        {                                                                                                            // 34
          className: "pull-right"                                                                                    // 34
        },                                                                                                           // 34
        React.createElement(                                                                                         // 35
          ButtonGroup,                                                                                               // 35
          {                                                                                                          // 35
            bsSize: "small"                                                                                          // 35
          },                                                                                                         // 35
          React.createElement(                                                                                       // 36
            Button,                                                                                                  // 36
            {                                                                                                        // 36
              onClick: function () {                                                                                 // 36
                return handleEdit(doc._id);                                                                          // 36
              }                                                                                                      // 36
            },                                                                                                       // 36
            "Edit"                                                                                                   // 36
          ),                                                                                                         // 36
          React.createElement(                                                                                       // 37
            Button,                                                                                                  // 37
            {                                                                                                        // 37
              onClick: function () {                                                                                 // 37
                return handleRemove(doc._id);                                                                        // 37
              },                                                                                                     // 37
              className: "text-danger"                                                                               // 37
            },                                                                                                       // 37
            "Delete"                                                                                                 // 37
          )                                                                                                          // 37
        )                                                                                                            // 35
      )                                                                                                              // 34
    ),                                                                                                               // 32
    doc && doc.body                                                                                                  // 41
  ) : React.createElement(NotFound, null);                                                                           // 31
};                                                                                                                   // 44
                                                                                                                     //
ViewDocument.propTypes = {                                                                                           // 46
  doc: PropTypes.object                                                                                              // 47
};                                                                                                                   // 46
module.exportDefault(container(function (props, onData) {                                                            // 1
  var documentId = props.params._id;                                                                                 // 51
  var subscription = Meteor.subscribe('documents.view', documentId);                                                 // 52
                                                                                                                     //
  if (subscription.ready()) {                                                                                        // 54
    var doc = Documents.findOne(documentId);                                                                         // 55
    onData(null, {                                                                                                   // 56
      doc: doc                                                                                                       // 56
    });                                                                                                              // 56
  }                                                                                                                  // 57
}, ViewDocument));                                                                                                   // 58
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"modules":{"container.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/container.js                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return container;                                                                                                // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var compose = void 0;                                                                                                // 1
module.watch(require("react-komposer"), {                                                                            // 1
  compose: function (v) {                                                                                            // 1
    compose = v;                                                                                                     // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var getTrackerLoader = void 0;                                                                                       // 1
module.watch(require("./get-tracker-loader"), {                                                                      // 1
  "default": function (v) {                                                                                          // 1
    getTrackerLoader = v;                                                                                            // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
                                                                                                                     //
function container(composer, Component) {                                                                            // 4
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};                              // 4
  return compose(getTrackerLoader(composer), options)(Component);                                                    // 5
}                                                                                                                    // 6
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"document-editor.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/document-editor.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return documentEditor;                                                                                           // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var browserHistory = void 0;                                                                                         // 1
module.watch(require("react-router"), {                                                                              // 1
  browserHistory: function (v) {                                                                                     // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Bert = void 0;                                                                                                   // 1
module.watch(require("meteor/themeteorchef:bert"), {                                                                 // 1
  Bert: function (v) {                                                                                               // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var upsertDocument = void 0;                                                                                         // 1
module.watch(require("../api/documents/methods.js"), {                                                               // 1
  upsertDocument: function (v) {                                                                                     // 1
    upsertDocument = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
module.watch(require("./validation.js"));                                                                            // 1
var component = void 0;                                                                                              // 8
                                                                                                                     //
var handleUpsert = function () {                                                                                     // 10
  var doc = component.props.doc;                                                                                     // 10
  var confirmation = doc && doc._id ? 'Document updated!' : 'Document added!';                                       // 12
  var upsert = {                                                                                                     // 13
    title: document.querySelector('[name="title"]').value.trim(),                                                    // 14
    body: document.querySelector('[name="body"]').value.trim()                                                       // 15
  };                                                                                                                 // 13
  if (doc && doc._id) upsert._id = doc._id;                                                                          // 18
  upsertDocument.call(upsert, function (error, response) {                                                           // 20
    if (error) {                                                                                                     // 21
      Bert.alert(error.reason, 'danger');                                                                            // 22
    } else {                                                                                                         // 23
      component.documentEditorForm.reset();                                                                          // 24
      Bert.alert(confirmation, 'success');                                                                           // 25
      browserHistory.push("/documents/" + (response.insertedId || doc._id));                                         // 26
    }                                                                                                                // 27
  });                                                                                                                // 28
};                                                                                                                   // 29
                                                                                                                     //
var validate = function () {                                                                                         // 31
  $(component.documentEditorForm).validate({                                                                         // 32
    rules: {                                                                                                         // 33
      title: {                                                                                                       // 34
        required: true                                                                                               // 35
      },                                                                                                             // 34
      body: {                                                                                                        // 37
        required: true                                                                                               // 38
      }                                                                                                              // 37
    },                                                                                                               // 33
    messages: {                                                                                                      // 41
      title: {                                                                                                       // 42
        required: 'Need a title in here, Seuss.'                                                                     // 43
      },                                                                                                             // 42
      body: {                                                                                                        // 45
        required: 'This thneeds a body, please.'                                                                     // 46
      }                                                                                                              // 45
    },                                                                                                               // 41
    submitHandler: function () {                                                                                     // 49
      handleUpsert();                                                                                                // 49
    }                                                                                                                // 49
  });                                                                                                                // 32
};                                                                                                                   // 51
                                                                                                                     //
function documentEditor(options) {                                                                                   // 53
  component = options.component;                                                                                     // 54
  validate();                                                                                                        // 55
}                                                                                                                    // 56
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"get-tracker-loader.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/get-tracker-loader.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return getTrackerLoader;                                                                                         // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var Tracker = void 0;                                                                                                // 1
module.watch(require("meteor/tracker"), {                                                                            // 1
  Tracker: function (v) {                                                                                            // 1
    Tracker = v;                                                                                                     // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
                                                                                                                     //
function getTrackerLoader(reactiveMapper) {                                                                          // 3
  return function (props, onData, env) {                                                                             // 4
    var trackerCleanup = null;                                                                                       // 5
    var handler = Tracker.nonreactive(function () {                                                                  // 7
      return Tracker.autorun(function () {                                                                           // 7
        trackerCleanup = reactiveMapper(props, onData, env);                                                         // 8
      });                                                                                                            // 9
    });                                                                                                              // 7
    return function () {                                                                                             // 11
      if (typeof trackerCleanup === 'function') trackerCleanup();                                                    // 12
      return handler.stop();                                                                                         // 13
    };                                                                                                               // 14
  };                                                                                                                 // 15
}                                                                                                                    // 16
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"login.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/login.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return handleLogin;                                                                                              // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var browserHistory = void 0;                                                                                         // 1
module.watch(require("react-router"), {                                                                              // 1
  browserHistory: function (v) {                                                                                     // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
  Meteor: function (v) {                                                                                             // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Bert = void 0;                                                                                                   // 1
module.watch(require("meteor/themeteorchef:bert"), {                                                                 // 1
  Bert: function (v) {                                                                                               // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
module.watch(require("./validation.js"));                                                                            // 1
var component = void 0;                                                                                              // 8
                                                                                                                     //
var login = function () {                                                                                            // 10
  var email = document.querySelector('[name="emailAddress"]').value;                                                 // 11
  var password = document.querySelector('[name="password"]').value;                                                  // 12
  Meteor.loginWithPassword(email, password, function (error) {                                                       // 14
    if (error) {                                                                                                     // 15
      Bert.alert(error.reason, 'warning');                                                                           // 16
    } else {                                                                                                         // 17
      Bert.alert('Logged in!', 'success');                                                                           // 18
      var location = component.props.location;                                                                       // 17
                                                                                                                     //
      if (location.state && location.state.nextPathname) {                                                           // 21
        browserHistory.push(location.state.nextPathname);                                                            // 22
      } else {                                                                                                       // 23
        browserHistory.push('/');                                                                                    // 24
      }                                                                                                              // 25
    }                                                                                                                // 26
  });                                                                                                                // 27
};                                                                                                                   // 28
                                                                                                                     //
var validate = function () {                                                                                         // 30
  $(component.loginForm).validate({                                                                                  // 31
    rules: {                                                                                                         // 32
      emailAddress: {                                                                                                // 33
        required: true,                                                                                              // 34
        email: true                                                                                                  // 35
      },                                                                                                             // 33
      password: {                                                                                                    // 37
        required: true                                                                                               // 38
      }                                                                                                              // 37
    },                                                                                                               // 32
    messages: {                                                                                                      // 41
      emailAddress: {                                                                                                // 42
        required: 'Need an email address here.',                                                                     // 43
        email: 'Is this email address legit?'                                                                        // 44
      },                                                                                                             // 42
      password: {                                                                                                    // 46
        required: 'Need a password here.'                                                                            // 47
      }                                                                                                              // 46
    },                                                                                                               // 41
    submitHandler: function () {                                                                                     // 50
      login();                                                                                                       // 50
    }                                                                                                                // 50
  });                                                                                                                // 31
};                                                                                                                   // 52
                                                                                                                     //
function handleLogin(options) {                                                                                      // 54
  component = options.component;                                                                                     // 55
  validate();                                                                                                        // 56
}                                                                                                                    // 57
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rate-limit.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/rate-limit.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return rateLimit;                                                                                                // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
  Meteor: function (v) {                                                                                             // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var DDPRateLimiter = void 0;                                                                                         // 1
module.watch(require("meteor/ddp-rate-limiter"), {                                                                   // 1
  DDPRateLimiter: function (v) {                                                                                     // 1
    DDPRateLimiter = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
                                                                                                                     //
var _ = void 0;                                                                                                      // 1
                                                                                                                     //
module.watch(require("meteor/underscore"), {                                                                         // 1
  _: function (v) {                                                                                                  // 1
    _ = v;                                                                                                           // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var fetchMethodNames = function (methods) {                                                                          // 5
  return _.pluck(methods, 'name');                                                                                   // 5
};                                                                                                                   // 5
                                                                                                                     //
var assignLimits = function (_ref) {                                                                                 // 7
  var methods = _ref.methods,                                                                                        // 7
      limit = _ref.limit,                                                                                            // 7
      timeRange = _ref.timeRange;                                                                                    // 7
  var methodNames = fetchMethodNames(methods);                                                                       // 8
                                                                                                                     //
  if (Meteor.isServer) {                                                                                             // 10
    DDPRateLimiter.addRule({                                                                                         // 11
      name: function (name) {                                                                                        // 12
        return _.contains(methodNames, name);                                                                        // 12
      },                                                                                                             // 12
      connectionId: function () {                                                                                    // 13
        return true;                                                                                                 // 13
      }                                                                                                              // 13
    }, limit, timeRange);                                                                                            // 11
  }                                                                                                                  // 15
};                                                                                                                   // 16
                                                                                                                     //
function rateLimit(options) {                                                                                        // 18
  return assignLimits(options);                                                                                      // 18
}                                                                                                                    // 18
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"recover-password.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/recover-password.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return handleRecoverPassword;                                                                                    // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var Accounts = void 0;                                                                                               // 1
module.watch(require("meteor/accounts-base"), {                                                                      // 1
  Accounts: function (v) {                                                                                           // 1
    Accounts = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Bert = void 0;                                                                                                   // 1
module.watch(require("meteor/themeteorchef:bert"), {                                                                 // 1
  Bert: function (v) {                                                                                               // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
module.watch(require("./validation.js"));                                                                            // 1
var component = void 0;                                                                                              // 7
                                                                                                                     //
var handleRecovery = function () {                                                                                   // 9
  Accounts.forgotPassword({                                                                                          // 10
    email: document.querySelector('[name="emailAddress"]').value                                                     // 11
  }, function (error) {                                                                                              // 10
    if (error) {                                                                                                     // 13
      Bert.alert(error.reason, 'warning');                                                                           // 14
    } else {                                                                                                         // 15
      Bert.alert('Check your inbox for a reset link!', 'success');                                                   // 16
    }                                                                                                                // 17
  });                                                                                                                // 18
};                                                                                                                   // 19
                                                                                                                     //
var validate = function () {                                                                                         // 21
  $(component.recoverPasswordForm).validate({                                                                        // 22
    rules: {                                                                                                         // 23
      emailAddress: {                                                                                                // 24
        required: true,                                                                                              // 25
        email: true                                                                                                  // 26
      }                                                                                                              // 24
    },                                                                                                               // 23
    messages: {                                                                                                      // 29
      emailAddress: {                                                                                                // 30
        required: 'Need an email address here.',                                                                     // 31
        email: 'Is this email address legit?'                                                                        // 32
      }                                                                                                              // 30
    },                                                                                                               // 29
    submitHandler: function () {                                                                                     // 35
      handleRecovery();                                                                                              // 35
    }                                                                                                                // 35
  });                                                                                                                // 22
};                                                                                                                   // 37
                                                                                                                     //
function handleRecoverPassword(options) {                                                                            // 39
  component = options.component;                                                                                     // 40
  validate();                                                                                                        // 41
}                                                                                                                    // 42
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reset-password.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/reset-password.js                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return handleResetPassword;                                                                                      // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var browserHistory = void 0;                                                                                         // 1
module.watch(require("react-router"), {                                                                              // 1
  browserHistory: function (v) {                                                                                     // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Accounts = void 0;                                                                                               // 1
module.watch(require("meteor/accounts-base"), {                                                                      // 1
  Accounts: function (v) {                                                                                           // 1
    Accounts = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Bert = void 0;                                                                                                   // 1
module.watch(require("meteor/themeteorchef:bert"), {                                                                 // 1
  Bert: function (v) {                                                                                               // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
module.watch(require("./validation.js"));                                                                            // 1
var component = void 0;                                                                                              // 8
var token = void 0;                                                                                                  // 9
                                                                                                                     //
var handleReset = function () {                                                                                      // 11
  var password = document.querySelector('[name="newPassword"]').value;                                               // 12
  Accounts.resetPassword(token, password, function (error) {                                                         // 13
    if (error) {                                                                                                     // 14
      Bert.alert(error.reason, 'danger');                                                                            // 15
    } else {                                                                                                         // 16
      browserHistory.push('/');                                                                                      // 17
      Bert.alert('Password reset!', 'success');                                                                      // 18
    }                                                                                                                // 19
  });                                                                                                                // 20
};                                                                                                                   // 21
                                                                                                                     //
var validate = function () {                                                                                         // 23
  $(component.resetPasswordForm).validate({                                                                          // 24
    rules: {                                                                                                         // 25
      newPassword: {                                                                                                 // 26
        required: true,                                                                                              // 27
        minlength: 6                                                                                                 // 28
      },                                                                                                             // 26
      repeatNewPassword: {                                                                                           // 30
        required: true,                                                                                              // 31
        minlength: 6,                                                                                                // 32
        equalTo: '[name="newPassword"]'                                                                              // 33
      }                                                                                                              // 30
    },                                                                                                               // 25
    messages: {                                                                                                      // 36
      newPassword: {                                                                                                 // 37
        required: 'Enter a new password, please.',                                                                   // 38
        minlength: 'Use at least six characters, please.'                                                            // 39
      },                                                                                                             // 37
      repeatNewPassword: {                                                                                           // 41
        required: 'Repeat your new password, please.',                                                               // 42
        equalTo: 'Hmm, your passwords don\'t match. Try again?'                                                      // 43
      }                                                                                                              // 41
    },                                                                                                               // 36
    submitHandler: function () {                                                                                     // 46
      handleReset();                                                                                                 // 46
    }                                                                                                                // 46
  });                                                                                                                // 24
};                                                                                                                   // 48
                                                                                                                     //
function handleResetPassword(options) {                                                                              // 50
  component = options.component;                                                                                     // 51
  token = options.token;                                                                                             // 52
  validate();                                                                                                        // 53
}                                                                                                                    // 54
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"signup.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/signup.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return handleSignup;                                                                                             // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var browserHistory = void 0;                                                                                         // 1
module.watch(require("react-router"), {                                                                              // 1
  browserHistory: function (v) {                                                                                     // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Accounts = void 0;                                                                                               // 1
module.watch(require("meteor/accounts-base"), {                                                                      // 1
  Accounts: function (v) {                                                                                           // 1
    Accounts = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Bert = void 0;                                                                                                   // 1
module.watch(require("meteor/themeteorchef:bert"), {                                                                 // 1
  Bert: function (v) {                                                                                               // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
module.watch(require("./validation.js"));                                                                            // 1
var component = void 0;                                                                                              // 8
                                                                                                                     //
var getUserData = function () {                                                                                      // 10
  return {                                                                                                           // 10
    email: document.querySelector('[name="emailAddress"]').value,                                                    // 11
    password: document.querySelector('[name="password"]').value,                                                     // 12
    profile: {                                                                                                       // 13
      name: {                                                                                                        // 14
        first: document.querySelector('[name="firstName"]').value,                                                   // 15
        last: document.querySelector('[name="lastName"]').value                                                      // 16
      }                                                                                                              // 14
    }                                                                                                                // 13
  };                                                                                                                 // 10
};                                                                                                                   // 10
                                                                                                                     //
var signup = function () {                                                                                           // 21
  var user = getUserData();                                                                                          // 22
  Accounts.createUser(user, function (error) {                                                                       // 24
    if (error) {                                                                                                     // 25
      Bert.alert(error.reason, 'danger');                                                                            // 26
    } else {                                                                                                         // 27
      browserHistory.push('/');                                                                                      // 28
      Bert.alert('Welcome!', 'success');                                                                             // 29
    }                                                                                                                // 30
  });                                                                                                                // 31
};                                                                                                                   // 32
                                                                                                                     //
var validate = function () {                                                                                         // 34
  $(component.signupForm).validate({                                                                                 // 35
    rules: {                                                                                                         // 36
      firstName: {                                                                                                   // 37
        required: true                                                                                               // 38
      },                                                                                                             // 37
      lastName: {                                                                                                    // 40
        required: true                                                                                               // 41
      },                                                                                                             // 40
      emailAddress: {                                                                                                // 43
        required: true,                                                                                              // 44
        email: true                                                                                                  // 45
      },                                                                                                             // 43
      password: {                                                                                                    // 47
        required: true,                                                                                              // 48
        minlength: 6                                                                                                 // 49
      }                                                                                                              // 47
    },                                                                                                               // 36
    messages: {                                                                                                      // 52
      firstName: {                                                                                                   // 53
        required: 'First name?'                                                                                      // 54
      },                                                                                                             // 53
      lastName: {                                                                                                    // 56
        required: 'Last name?'                                                                                       // 57
      },                                                                                                             // 56
      emailAddress: {                                                                                                // 59
        required: 'Need an email address here.',                                                                     // 60
        email: 'Is this email address legit?'                                                                        // 61
      },                                                                                                             // 59
      password: {                                                                                                    // 63
        required: 'Need a password here.',                                                                           // 64
        minlength: 'Use at least six characters, please.'                                                            // 65
      }                                                                                                              // 63
    },                                                                                                               // 52
    submitHandler: function () {                                                                                     // 68
      signup();                                                                                                      // 68
    }                                                                                                                // 68
  });                                                                                                                // 35
};                                                                                                                   // 70
                                                                                                                     //
function handleSignup(options) {                                                                                     // 72
  component = options.component;                                                                                     // 73
  validate();                                                                                                        // 74
}                                                                                                                    // 75
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"validation.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/validation.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var $ = void 0;                                                                                                      // 1
module.watch(require("jquery"), {                                                                                    // 1
  "default": function (v) {                                                                                          // 1
    $ = v;                                                                                                           // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
module.watch(require("jquery-validation"));                                                                          // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"client":{"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/main.js                                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.watch(require("/imports/startup/client"));                                                                    // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css",
    ".jsx",
    ".scss"
  ]
});
require("./client/main.js");