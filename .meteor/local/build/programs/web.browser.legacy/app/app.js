var require = meteorInstall({"imports":{"api":{"documents":{"documents.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/documents/documents.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Mongo;
module.link("meteor/mongo", {
  Mongo: function (v) {
    Mongo = v;
  }
}, 0);
var SimpleSchema;
module.link("simpl-schema", {
  "default": function (v) {
    SimpleSchema = v;
  }
}, 1);
var Factory;
module.link("meteor/dburles:factory", {
  Factory: function (v) {
    Factory = v;
  }
}, 2);
var Documents = new Mongo.Collection('Documents');
module.exportDefault(Documents);
Documents.allow({
  insert: function () {
    return false;
  },
  update: function () {
    return false;
  },
  remove: function () {
    return false;
  }
});
Documents.deny({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});
Documents.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the document.'
  },
  body: {
    type: String,
    label: 'The body of the document.'
  }
});
Documents.attachSchema(Documents.schema);
Factory.define('document', Documents, {
  title: function () {
    return 'Factory Title';
  },
  body: function () {
    return 'Factory Body';
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/documents/methods.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  upsertDocument: function () {
    return upsertDocument;
  },
  removeDocument: function () {
    return removeDocument;
  }
});
var SimpleSchema;
module.link("simpl-schema", {
  "default": function (v) {
    SimpleSchema = v;
  }
}, 0);
var ValidatedMethod;
module.link("meteor/mdg:validated-method", {
  ValidatedMethod: function (v) {
    ValidatedMethod = v;
  }
}, 1);
var Documents;
module.link("./documents", {
  "default": function (v) {
    Documents = v;
  }
}, 2);
var rateLimit;
module.link("../../modules/rate-limit.js", {
  "default": function (v) {
    rateLimit = v;
  }
}, 3);
var upsertDocument = new ValidatedMethod({
  name: 'documents.upsert',
  validate: new SimpleSchema({
    _id: {
      type: String,
      optional: true
    },
    title: {
      type: String,
      optional: true
    },
    body: {
      type: String,
      optional: true
    }
  }).validator(),
  run: function (document) {
    return Documents.upsert({
      _id: document._id
    }, {
      $set: document
    });
  }
});
var removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: {
      type: String
    }
  }).validator(),
  run: function (_ref) {
    var _id = _ref._id;
    Documents.remove(_id);
  }
});
rateLimit({
  methods: [upsertDocument, removeDocument],
  limit: 5,
  timeRange: 1000
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"startup":{"client":{"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/client/index.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Bert;
module.link("meteor/themeteorchef:bert", {
  Bert: function (v) {
    Bert = v;
  }
}, 0);
module.link("bootstrap/dist/css/bootstrap.min.css");
module.link("./routes.js");
Bert.defaults.style = 'growl-top-right';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"routes.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/client/routes.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var render;
module.link("react-dom", {
  render: function (v) {
    render = v;
  }
}, 1);
var Router, Route, IndexRoute, browserHistory;
module.link("react-router", {
  Router: function (v) {
    Router = v;
  },
  Route: function (v) {
    Route = v;
  },
  IndexRoute: function (v) {
    IndexRoute = v;
  },
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 2);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 3);
var App;
module.link("../../ui/layouts/App.js", {
  "default": function (v) {
    App = v;
  }
}, 4);
var Documents;
module.link("../../ui/pages/Documents.js", {
  "default": function (v) {
    Documents = v;
  }
}, 5);
var NewDocument;
module.link("../../ui/pages/NewDocument.js", {
  "default": function (v) {
    NewDocument = v;
  }
}, 6);
var EditDocument;
module.link("../../ui/pages/EditDocument.js", {
  "default": function (v) {
    EditDocument = v;
  }
}, 7);
var ViewDocument;
module.link("../../ui/pages/ViewDocument.js", {
  "default": function (v) {
    ViewDocument = v;
  }
}, 8);
var Index;
module.link("../../ui/pages/Index.js", {
  "default": function (v) {
    Index = v;
  }
}, 9);
var Login;
module.link("../../ui/pages/Login.js", {
  "default": function (v) {
    Login = v;
  }
}, 10);
var NotFound;
module.link("../../ui/pages/NotFound.js", {
  "default": function (v) {
    NotFound = v;
  }
}, 11);
var RecoverPassword;
module.link("../../ui/pages/RecoverPassword.js", {
  "default": function (v) {
    RecoverPassword = v;
  }
}, 12);
var ResetPassword;
module.link("../../ui/pages/ResetPassword.js", {
  "default": function (v) {
    ResetPassword = v;
  }
}, 13);
var Signup;
module.link("../../ui/pages/Signup.js", {
  "default": function (v) {
    Signup = v;
  }
}, 14);

var authenticate = function (nextState, replace) {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};

Meteor.startup(function () {
  render(React.createElement(Router, {
    history: browserHistory
  }, React.createElement(Route, {
    path: "/",
    component: App
  }, React.createElement(IndexRoute, {
    name: "index",
    component: Index
  }), React.createElement(Route, {
    name: "documents",
    path: "/documents",
    component: Documents,
    onEnter: authenticate
  }), React.createElement(Route, {
    name: "newDocument",
    path: "/documents/new",
    component: NewDocument,
    onEnter: authenticate
  }), React.createElement(Route, {
    name: "editDocument",
    path: "/documents/:_id/edit",
    component: EditDocument,
    onEnter: authenticate
  }), React.createElement(Route, {
    name: "viewDocument",
    path: "/documents/:_id",
    component: ViewDocument,
    onEnter: authenticate
  }), React.createElement(Route, {
    name: "login",
    path: "/login",
    component: Login
  }), React.createElement(Route, {
    name: "recover-password",
    path: "/recover-password",
    component: RecoverPassword
  }), React.createElement(Route, {
    name: "reset-password",
    path: "/reset-password/:token",
    component: ResetPassword
  }), React.createElement(Route, {
    name: "signup",
    path: "/signup",
    component: Signup
  }), React.createElement(Route, {
    path: "*",
    component: NotFound
  }))), document.getElementById('react-root'));
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"ui":{"components":{"AppNavigation.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/AppNavigation.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 1);
var Navbar;
module.link("react-bootstrap", {
  Navbar: function (v) {
    Navbar = v;
  }
}, 2);
var Link;
module.link("react-router", {
  Link: function (v) {
    Link = v;
  }
}, 3);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 4);
var PublicNavigation;
module.link("./PublicNavigation.js", {
  "default": function (v) {
    PublicNavigation = v;
  }
}, 5);
var AuthenticatedNavigation;
module.link("./AuthenticatedNavigation.js", {
  "default": function (v) {
    AuthenticatedNavigation = v;
  }
}, 6);
var container;
module.link("../../modules/container", {
  "default": function (v) {
    container = v;
  }
}, 7);

var renderNavigation = function (hasUser) {
  return hasUser ? React.createElement(AuthenticatedNavigation, null) : React.createElement(PublicNavigation, null);
};

var AppNavigation = function (_ref) {
  var hasUser = _ref.hasUser;
  return React.createElement(Navbar, null);
};

AppNavigation.propTypes = {
  hasUser: PropTypes.object
};
module.exportDefault(container(function (props, onData) {
  onData(null, {
    hasUser: Meteor.user()
  });
}, AppNavigation));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AuthenticatedNavigation.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/AuthenticatedNavigation.js                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 1);
var LinkContainer;
module.link("react-router-bootstrap", {
  LinkContainer: function (v) {
    LinkContainer = v;
  }
}, 2);
var Nav, NavItem, NavDropdown, MenuItem;
module.link("react-bootstrap", {
  Nav: function (v) {
    Nav = v;
  },
  NavItem: function (v) {
    NavItem = v;
  },
  NavDropdown: function (v) {
    NavDropdown = v;
  },
  MenuItem: function (v) {
    MenuItem = v;
  }
}, 3);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 4);

var handleLogout = function () {
  return Meteor.logout(function () {
    return browserHistory.push('/login');
  });
};

var userName = function () {
  var user = Meteor.user();
  var name = user && user.profile ? user.profile.name : '';
  return user ? name.first + " " + name.last : '';
};

var AuthenticatedNavigation = function () {
  return React.createElement("div", null, React.createElement(Nav, null, React.createElement(LinkContainer, {
    to: "/documents"
  }, React.createElement(NavItem, {
    eventKey: 2,
    href: "/documents"
  }, "Documents"))), React.createElement(Nav, {
    pullRight: true
  }, React.createElement(NavDropdown, {
    eventKey: 3,
    title: userName(),
    id: "basic-nav-dropdown"
  }, React.createElement(MenuItem, {
    eventKey: 3.1,
    onClick: handleLogout
  }, "Logout"))));
};

module.exportDefault(AuthenticatedNavigation);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DateListGroupItem.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/DateListGroupItem.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var moment;
module.link("moment", {
  "default": function (v) {
    moment = v;
  }
}, 0);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 1);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 2);

var niceDate = function (date) {
  return moment(date).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY'
  });
};

var DateListGroupItem = function (_ref) {
  var startDate = _ref.startDate,
      endDate = _ref.endDate,
      index = _ref.index,
      remove = _ref.remove;
  return React.createElement("div", {
    className: "list-group-item"
  }, niceDate(startDate), "\u2013", niceDate(endDate), React.createElement("button", {
    onClick: function () {
      return remove(index);
    },
    className: "btn btn-sm btn-link"
  }, React.createElement("i", {
    className: "fa fa-remove"
  })));
};

DateListGroupItem.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  index: PropTypes.number,
  remove: PropTypes.func
};
module.exportDefault(DateListGroupItem);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DocumentEditor.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/DocumentEditor.js                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  "default": function () {
    return DocumentEditor;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 1);
var FormGroup, ControlLabel, FormControl, Button;
module.link("react-bootstrap", {
  FormGroup: function (v) {
    FormGroup = v;
  },
  ControlLabel: function (v) {
    ControlLabel = v;
  },
  FormControl: function (v) {
    FormControl = v;
  },
  Button: function (v) {
    Button = v;
  }
}, 2);
var documentEditor;
module.link("../../modules/document-editor.js", {
  "default": function (v) {
    documentEditor = v;
  }
}, 3);

var DocumentEditor =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DocumentEditor, _React$Component);

  function DocumentEditor() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = DocumentEditor.prototype;

  _proto.componentDidMount = function () {
    function componentDidMount() {
      documentEditor({
        component: this
      });
      setTimeout(function () {
        document.querySelector('[name="title"]').focus();
      }, 0);
    }

    return componentDidMount;
  }();

  _proto.render = function () {
    function render() {
      var _this = this;

      var doc = this.props.doc;
      return React.createElement("form", {
        ref: function (form) {
          return _this.documentEditorForm = form;
        },
        onSubmit: function (event) {
          return event.preventDefault();
        }
      }, React.createElement(FormGroup, null, React.createElement(ControlLabel, null, "Title"), React.createElement(FormControl, {
        type: "text",
        name: "title",
        defaultValue: doc && doc.title,
        placeholder: "Oh, The Places You'll Go!"
      })), React.createElement(FormGroup, null, React.createElement(ControlLabel, null, "Body"), React.createElement(FormControl, {
        componentClass: "textarea",
        name: "body",
        defaultValue: doc && doc.body,
        placeholder: "Congratulations! Today is your day. You're off to Great Places! You're off and away!"
      })), React.createElement(Button, {
        type: "submit",
        bsStyle: "success"
      }, doc && doc._id ? 'Save Changes' : 'Add Document'));
    }

    return render;
  }();

  return DocumentEditor;
}(React.Component);

DocumentEditor.propTypes = {
  doc: PropTypes.object
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DocumentsList.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/DocumentsList.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 1);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 2);
var ListGroup, ListGroupItem, Alert;
module.link("react-bootstrap", {
  ListGroup: function (v) {
    ListGroup = v;
  },
  ListGroupItem: function (v) {
    ListGroupItem = v;
  },
  Alert: function (v) {
    Alert = v;
  }
}, 3);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 4);
var Documents;
module.link("../../api/documents/documents", {
  "default": function (v) {
    Documents = v;
  }
}, 5);
var container;
module.link("../../modules/container", {
  "default": function (v) {
    container = v;
  }
}, 6);

var handleNav = function (_id) {
  return browserHistory.push("/documents/" + _id);
};

var DocumentsList = function (_ref) {
  var documents = _ref.documents;
  return documents.length > 0 ? React.createElement(ListGroup, {
    className: "DocumentsList"
  }, documents.map(function (_ref2) {
    var _id = _ref2._id,
        title = _ref2.title;
    return React.createElement(ListGroupItem, {
      key: _id,
      onClick: function () {
        return handleNav(_id);
      }
    }, title);
  })) : React.createElement(Alert, {
    bsStyle: "warning"
  }, "No documents yet.");
};

DocumentsList.propTypes = {
  documents: PropTypes.array
};
module.exportDefault(container(function (props, onData) {
  var subscription = Meteor.subscribe('documents.list');

  if (subscription.ready()) {
    var documents = Documents.find().fetch();
    onData(null, {
      documents: documents
    });
  }
}, DocumentsList));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ExampleDates.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/ExampleDates.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Loadable;
module.link("react-loadable", {
  "default": function (v) {
    Loadable = v;
  }
}, 1);
var DateListGroupItem;
module.link("./DateListGroupItem", {
  "default": function (v) {
    DateListGroupItem = v;
  }
}, 2);

// generic loading component to show while transfering section of code
var LoadingComponent = function () {
  return React.createElement("span", {
    className: "text-muted"
  }, React.createElement("i", {
    className: "fa fa-refresh"
  }));
}; // new version of the component, now: loading --> rendered


var PickDates = Loadable({
  // this does the dynamic import, and returns a promise
  loader: function () {
    return module.dynamicImport('./PickDates');
  },
  // this is our generic loading display (optional)
  loading: LoadingComponent,
  // this is a delay before we decide to show our LoadingComponent (optional)
  delay: 200
});

var ExampleDates =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ExampleDates, _React$Component);

  function ExampleDates(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      dates: []
    };
    _this.addDates = _this.addDates.bind((0, _assertThisInitialized2.default)(_this));
    _this.removeDate = _this.removeDate.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  var _proto = ExampleDates.prototype;

  _proto.addDates = function () {
    function addDates(newDates) {
      console.log(newDates);
      this.setState({
        dates: [].concat((0, _toConsumableArray2.default)(this.state.dates), [newDates])
      });
    }

    return addDates;
  }();

  _proto.removeDate = function () {
    function removeDate(index) {
      this.setState({
        dates: [].concat((0, _toConsumableArray2.default)(this.state.dates.slice(0, index)), (0, _toConsumableArray2.default)(this.state.dates.slice(index + 1)))
      });
    }

    return removeDate;
  }();

  _proto.render = function () {
    function render() {
      var _this2 = this;

      return React.createElement("div", null, React.createElement(PickDates, {
        onAddDates: this.addDates
      }), React.createElement("hr", null), React.createElement("div", {
        className: "list-group"
      }, this.state.dates.map(function (dates, index) {
        return React.createElement(DateListGroupItem, (0, _extends2.default)({}, dates, {
          key: index,
          index: index,
          remove: _this2.removeDate
        }));
      })));
    }

    return render;
  }();

  return ExampleDates;
}(React.Component);

module.exportDefault(ExampleDates);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PickDates.js":[
  "@babel/runtime/helpers/interopRequireDefault",
  "@babel/runtime/helpers/assertThisInitialized",
  "@babel/runtime/helpers/inheritsLoose",
  "moment",
  "react",
  "prop-types",
  "react-dates",
  "react-dates/lib/css/_datepicker.css"
],"PublicNavigation.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/PublicNavigation.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var LinkContainer;
module.link("react-router-bootstrap", {
  LinkContainer: function (v) {
    LinkContainer = v;
  }
}, 1);
var Nav, NavItem;
module.link("react-bootstrap", {
  Nav: function (v) {
    Nav = v;
  },
  NavItem: function (v) {
    NavItem = v;
  }
}, 2);

var PublicNavigation = function () {
  return React.createElement(Nav, {
    pullRight: true
  }, React.createElement(LinkContainer, {
    to: "/"
  }, React.createElement(NavItem, {
    eventKey: 1,
    href: "/"
  }, "Example")), React.createElement(NavItem, {
    eventKey: 2,
    href: "https://code.zeroasterisk.com/"
  }, "Blog Post"));
};

module.exportDefault(PublicNavigation);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"layouts":{"App.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/layouts/App.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 1);
var Grid;
module.link("react-bootstrap", {
  Grid: function (v) {
    Grid = v;
  }
}, 2);
var AppNavigation;
module.link("../components/AppNavigation", {
  "default": function (v) {
    AppNavigation = v;
  }
}, 3);

var App = function (_ref) {
  var children = _ref.children;
  return React.createElement("div", null, React.createElement(AppNavigation, null), React.createElement(Grid, null, children));
};

App.propTypes = {
  children: PropTypes.node
};
module.exportDefault(App);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"pages":{"Documents.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/pages/Documents.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Link;
module.link("react-router", {
  Link: function (v) {
    Link = v;
  }
}, 1);
var Row, Col, Button;
module.link("react-bootstrap", {
  Row: function (v) {
    Row = v;
  },
  Col: function (v) {
    Col = v;
  },
  Button: function (v) {
    Button = v;
  }
}, 2);
var DocumentsList;
module.link("../components/DocumentsList", {
  "default": function (v) {
    DocumentsList = v;
  }
}, 3);

var Documents = function () {
  return React.createElement("div", {
    className: "Documents"
  }, React.createElement(Row, null, React.createElement(Col, {
    xs: 12
  }, React.createElement("div", {
    className: "page-header clearfix"
  }, React.createElement("h4", {
    className: "pull-left"
  }, "Documents"), React.createElement(Link, {
    to: "/documents/new"
  }, React.createElement(Button, {
    bsStyle: "success",
    className: "pull-right"
  }, "New Document"))), React.createElement(DocumentsList, null))));
};

module.exportDefault(Documents);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"EditDocument.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/pages/EditDocument.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 1);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 2);
var Documents;
module.link("../../api/documents/documents", {
  "default": function (v) {
    Documents = v;
  }
}, 3);
var DocumentEditor;
module.link("../components/DocumentEditor", {
  "default": function (v) {
    DocumentEditor = v;
  }
}, 4);
var NotFound;
module.link("./NotFound", {
  "default": function (v) {
    NotFound = v;
  }
}, 5);
var container;
module.link("../../modules/container", {
  "default": function (v) {
    container = v;
  }
}, 6);

var EditDocument = function (_ref) {
  var doc = _ref.doc;
  return doc ? React.createElement("div", {
    className: "EditDocument"
  }, React.createElement("h4", {
    className: "page-header"
  }, "Editing \"", doc.title, "\""), React.createElement(DocumentEditor, {
    doc: doc
  })) : React.createElement(NotFound, null);
};

EditDocument.propTypes = {
  doc: PropTypes.object
};
module.exportDefault(container(function (props, onData) {
  var documentId = props.params._id;
  var subscription = Meteor.subscribe('documents.view', documentId);

  if (subscription.ready()) {
    var doc = Documents.findOne(documentId);
    onData(null, {
      doc: doc
    });
  }
}, EditDocument));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/pages/Index.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Jumbotron;
module.link("react-bootstrap", {
  Jumbotron: function (v) {
    Jumbotron = v;
  }
}, 1);
var ExampleDates;
module.link("../components/ExampleDates", {
  "default": function (v) {
    ExampleDates = v;
  }
}, 2);

var Index = function () {
  return React.createElement("div", {
    className: "Index"
  }, React.createElement(Jumbotron, {
    className: "text-center"
  }, React.createElement("h2", null, "Example for Meteor 1.8"), React.createElement("p", null, "We are making a very simple component to pick and render dates."), React.createElement(ExampleDates, null)));
};

module.exportDefault(Index);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Login.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/pages/Login.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  "default": function () {
    return Login;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Link;
module.link("react-router", {
  Link: function (v) {
    Link = v;
  }
}, 1);
var Row, Col, FormGroup, ControlLabel, FormControl, Button;
module.link("react-bootstrap", {
  Row: function (v) {
    Row = v;
  },
  Col: function (v) {
    Col = v;
  },
  FormGroup: function (v) {
    FormGroup = v;
  },
  ControlLabel: function (v) {
    ControlLabel = v;
  },
  FormControl: function (v) {
    FormControl = v;
  },
  Button: function (v) {
    Button = v;
  }
}, 2);
var handleLogin;
module.link("../../modules/login", {
  "default": function (v) {
    handleLogin = v;
  }
}, 3);

var Login =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Login, _React$Component);

  function Login() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Login.prototype;

  _proto.componentDidMount = function () {
    function componentDidMount() {
      handleLogin({
        component: this
      });
    }

    return componentDidMount;
  }();

  _proto.handleSubmit = function () {
    function handleSubmit(event) {
      event.preventDefault();
    }

    return handleSubmit;
  }();

  _proto.render = function () {
    function render() {
      var _this = this;

      return React.createElement("div", {
        className: "Login"
      }, React.createElement(Row, null, React.createElement(Col, {
        xs: 12,
        sm: 6,
        md: 4
      }, React.createElement("h4", {
        className: "page-header"
      }, "Login"), React.createElement("form", {
        ref: function (form) {
          return _this.loginForm = form;
        },
        className: "login",
        onSubmit: this.handleSubmit
      }, React.createElement(FormGroup, null, React.createElement(ControlLabel, null, "Email Address"), React.createElement(FormControl, {
        type: "email",
        ref: "emailAddress",
        name: "emailAddress",
        placeholder: "Email Address"
      })), React.createElement(FormGroup, null, React.createElement(ControlLabel, null, React.createElement("span", {
        className: "pull-left"
      }, "Password"), React.createElement(Link, {
        className: "pull-right",
        to: "/recover-password"
      }, "Forgot Password?")), React.createElement(FormControl, {
        type: "password",
        ref: "password",
        name: "password",
        placeholder: "Password"
      })), React.createElement(Button, {
        type: "submit",
        bsStyle: "success"
      }, "Login")))));
    }

    return render;
  }();

  return Login;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NewDocument.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/pages/NewDocument.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var DocumentEditor;
module.link("../components/DocumentEditor.js", {
  "default": function (v) {
    DocumentEditor = v;
  }
}, 1);

var NewDocument = function () {
  return React.createElement("div", {
    className: "NewDocument"
  }, React.createElement("h4", {
    className: "page-header"
  }, "New Document"), React.createElement(DocumentEditor, null));
};

module.exportDefault(NewDocument);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NotFound.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/pages/NotFound.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Alert;
module.link("react-bootstrap", {
  Alert: function (v) {
    Alert = v;
  }
}, 1);

var NotFound = function () {
  return React.createElement("div", {
    className: "NotFound"
  }, React.createElement(Alert, {
    bsStyle: "danger"
  }, React.createElement("p", null, React.createElement("strong", null, "Error [404]"), ": ", window.location.pathname, " does not exist.")));
};

module.exportDefault(NotFound);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"RecoverPassword.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/pages/RecoverPassword.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  "default": function () {
    return RecoverPassword;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Row, Col, Alert, FormGroup, FormControl, Button;
module.link("react-bootstrap", {
  Row: function (v) {
    Row = v;
  },
  Col: function (v) {
    Col = v;
  },
  Alert: function (v) {
    Alert = v;
  },
  FormGroup: function (v) {
    FormGroup = v;
  },
  FormControl: function (v) {
    FormControl = v;
  },
  Button: function (v) {
    Button = v;
  }
}, 1);
var handleRecoverPassword;
module.link("../../modules/recover-password", {
  "default": function (v) {
    handleRecoverPassword = v;
  }
}, 2);

var RecoverPassword =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(RecoverPassword, _React$Component);

  function RecoverPassword() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = RecoverPassword.prototype;

  _proto.componentDidMount = function () {
    function componentDidMount() {
      handleRecoverPassword({
        component: this
      });
    }

    return componentDidMount;
  }();

  _proto.handleSubmit = function () {
    function handleSubmit(event) {
      event.preventDefault();
    }

    return handleSubmit;
  }();

  _proto.render = function () {
    function render() {
      var _this = this;

      return React.createElement("div", {
        className: "RecoverPassword"
      }, React.createElement(Row, null, React.createElement(Col, {
        xs: 12,
        sm: 6,
        md: 4
      }, React.createElement("h4", {
        className: "page-header"
      }, "Recover Password"), React.createElement(Alert, {
        bsStyle: "info"
      }, "Enter your email address below to receive a link to reset your password."), React.createElement("form", {
        ref: function (form) {
          return _this.recoverPasswordForm = form;
        },
        className: "recover-password",
        onSubmit: this.handleSubmit
      }, React.createElement(FormGroup, null, React.createElement(FormControl, {
        type: "email",
        ref: "emailAddress",
        name: "emailAddress",
        placeholder: "Email Address"
      })), React.createElement(Button, {
        type: "submit",
        bsStyle: "success"
      }, "Recover Password")))));
    }

    return render;
  }();

  return RecoverPassword;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ResetPassword.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/pages/ResetPassword.js                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  "default": function () {
    return ResetPassword;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 1);
var Row, Col, Alert, FormGroup, ControlLabel, FormControl, Button;
module.link("react-bootstrap", {
  Row: function (v) {
    Row = v;
  },
  Col: function (v) {
    Col = v;
  },
  Alert: function (v) {
    Alert = v;
  },
  FormGroup: function (v) {
    FormGroup = v;
  },
  ControlLabel: function (v) {
    ControlLabel = v;
  },
  FormControl: function (v) {
    FormControl = v;
  },
  Button: function (v) {
    Button = v;
  }
}, 2);
var handleResetPassword;
module.link("../../modules/reset-password", {
  "default": function (v) {
    handleResetPassword = v;
  }
}, 3);

var ResetPassword =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ResetPassword, _React$Component);

  function ResetPassword() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ResetPassword.prototype;

  _proto.componentDidMount = function () {
    function componentDidMount() {
      handleResetPassword({
        component: this,
        token: this.props.params.token
      });
    }

    return componentDidMount;
  }();

  _proto.handleSubmit = function () {
    function handleSubmit(event) {
      event.preventDefault();
    }

    return handleSubmit;
  }();

  _proto.render = function () {
    function render() {
      var _this = this;

      return React.createElement("div", {
        className: "ResetPassword"
      }, React.createElement(Row, null, React.createElement(Col, {
        xs: 12,
        sm: 6,
        md: 4
      }, React.createElement("h4", {
        className: "page-header"
      }, "Reset Password"), React.createElement(Alert, {
        bsStyle: "info"
      }, "To reset your password, enter a new one below. You will be logged in with your new password."), React.createElement("form", {
        ref: function (form) {
          return _this.resetPasswordForm = form;
        },
        className: "reset-password",
        onSubmit: this.handleSubmit
      }, React.createElement(FormGroup, null, React.createElement(ControlLabel, null, "New Password"), React.createElement(FormControl, {
        type: "password",
        ref: "newPassword",
        name: "newPassword",
        placeholder: "New Password"
      })), React.createElement(FormGroup, null, React.createElement(ControlLabel, null, "Repeat New Password"), React.createElement(FormControl, {
        type: "password",
        ref: "repeatNewPassword",
        name: "repeatNewPassword",
        placeholder: "Repeat New Password"
      })), React.createElement(Button, {
        type: "submit",
        bsStyle: "success"
      }, "Reset Password & Login")))));
    }

    return render;
  }();

  return ResetPassword;
}(React.Component);

ResetPassword.propTypes = {
  params: PropTypes.object
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Signup.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/pages/Signup.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  "default": function () {
    return Signup;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Link;
module.link("react-router", {
  Link: function (v) {
    Link = v;
  }
}, 1);
var Row, Col, FormGroup, ControlLabel, FormControl, Button;
module.link("react-bootstrap", {
  Row: function (v) {
    Row = v;
  },
  Col: function (v) {
    Col = v;
  },
  FormGroup: function (v) {
    FormGroup = v;
  },
  ControlLabel: function (v) {
    ControlLabel = v;
  },
  FormControl: function (v) {
    FormControl = v;
  },
  Button: function (v) {
    Button = v;
  }
}, 2);
var handleSignup;
module.link("../../modules/signup", {
  "default": function (v) {
    handleSignup = v;
  }
}, 3);

var Signup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Signup, _React$Component);

  function Signup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Signup.prototype;

  _proto.componentDidMount = function () {
    function componentDidMount() {
      handleSignup({
        component: this
      });
    }

    return componentDidMount;
  }();

  _proto.handleSubmit = function () {
    function handleSubmit(event) {
      event.preventDefault();
    }

    return handleSubmit;
  }();

  _proto.render = function () {
    function render() {
      var _this = this;

      return React.createElement("div", {
        className: "Signup"
      }, React.createElement(Row, null, React.createElement(Col, {
        xs: 12,
        sm: 6,
        md: 4
      }, React.createElement("h4", {
        className: "page-header"
      }, "Sign Up"), React.createElement("form", {
        ref: function (form) {
          return _this.signupForm = form;
        },
        onSubmit: this.handleSubmit
      }, React.createElement(Row, null, React.createElement(Col, {
        xs: 6,
        sm: 6
      }, React.createElement(FormGroup, null, React.createElement(ControlLabel, null, "First Name"), React.createElement(FormControl, {
        type: "text",
        ref: "firstName",
        name: "firstName",
        placeholder: "First Name"
      }))), React.createElement(Col, {
        xs: 6,
        sm: 6
      }, React.createElement(FormGroup, null, React.createElement(ControlLabel, null, "Last Name"), React.createElement(FormControl, {
        type: "text",
        ref: "lastName",
        name: "lastName",
        placeholder: "Last Name"
      })))), React.createElement(FormGroup, null, React.createElement(ControlLabel, null, "Email Address"), React.createElement(FormControl, {
        type: "text",
        ref: "emailAddress",
        name: "emailAddress",
        placeholder: "Email Address"
      })), React.createElement(FormGroup, null, React.createElement(ControlLabel, null, "Password"), React.createElement(FormControl, {
        type: "password",
        ref: "password",
        name: "password",
        placeholder: "Password"
      })), React.createElement(Button, {
        type: "submit",
        bsStyle: "success"
      }, "Sign Up")), React.createElement("p", null, "Already have an account? ", React.createElement(Link, {
        to: "/login"
      }, "Log In"), "."))));
    }

    return render;
  }();

  return Signup;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ViewDocument.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/pages/ViewDocument.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 1);
var ButtonToolbar, ButtonGroup, Button;
module.link("react-bootstrap", {
  ButtonToolbar: function (v) {
    ButtonToolbar = v;
  },
  ButtonGroup: function (v) {
    ButtonGroup = v;
  },
  Button: function (v) {
    Button = v;
  }
}, 2);
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 3);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 4);
var Bert;
module.link("meteor/themeteorchef:bert", {
  Bert: function (v) {
    Bert = v;
  }
}, 5);
var Documents;
module.link("../../api/documents/documents", {
  "default": function (v) {
    Documents = v;
  }
}, 6);
var removeDocument;
module.link("../../api/documents/methods", {
  removeDocument: function (v) {
    removeDocument = v;
  }
}, 7);
var NotFound;
module.link("./NotFound", {
  "default": function (v) {
    NotFound = v;
  }
}, 8);
var container;
module.link("../../modules/container", {
  "default": function (v) {
    container = v;
  }
}, 9);

var handleEdit = function (_id) {
  browserHistory.push("/documents/" + _id + "/edit");
};

var handleRemove = function (_id) {
  if (confirm('Are you sure? This is permanent!')) {
    removeDocument.call({
      _id: _id
    }, function (error) {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
        browserHistory.push('/documents');
      }
    });
  }
};

var ViewDocument = function (_ref) {
  var doc = _ref.doc;
  return doc ? React.createElement("div", {
    className: "ViewDocument"
  }, React.createElement("div", {
    className: "page-header clearfix"
  }, React.createElement("h4", {
    className: "pull-left"
  }, doc && doc.title), React.createElement(ButtonToolbar, {
    className: "pull-right"
  }, React.createElement(ButtonGroup, {
    bsSize: "small"
  }, React.createElement(Button, {
    onClick: function () {
      return handleEdit(doc._id);
    }
  }, "Edit"), React.createElement(Button, {
    onClick: function () {
      return handleRemove(doc._id);
    },
    className: "text-danger"
  }, "Delete")))), doc && doc.body) : React.createElement(NotFound, null);
};

ViewDocument.propTypes = {
  doc: PropTypes.object
};
module.exportDefault(container(function (props, onData) {
  var documentId = props.params._id;
  var subscription = Meteor.subscribe('documents.view', documentId);

  if (subscription.ready()) {
    var doc = Documents.findOne(documentId);
    onData(null, {
      doc: doc
    });
  }
}, ViewDocument));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"modules":{"container.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/modules/container.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  "default": function () {
    return container;
  }
});
var compose;
module.link("react-komposer", {
  compose: function (v) {
    compose = v;
  }
}, 0);
var getTrackerLoader;
module.link("./get-tracker-loader", {
  "default": function (v) {
    getTrackerLoader = v;
  }
}, 1);

function container(composer, Component) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return compose(getTrackerLoader(composer), options)(Component);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"document-editor.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/modules/document-editor.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  "default": function () {
    return documentEditor;
  }
});
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 0);
var Bert;
module.link("meteor/themeteorchef:bert", {
  Bert: function (v) {
    Bert = v;
  }
}, 1);
var upsertDocument;
module.link("../api/documents/methods.js", {
  upsertDocument: function (v) {
    upsertDocument = v;
  }
}, 2);
module.link("./validation.js");
var component;

var handleUpsert = function () {
  var doc = component.props.doc;
  var confirmation = doc && doc._id ? 'Document updated!' : 'Document added!';
  var upsert = {
    title: document.querySelector('[name="title"]').value.trim(),
    body: document.querySelector('[name="body"]').value.trim()
  };
  if (doc && doc._id) upsert._id = doc._id;
  upsertDocument.call(upsert, function (error, response) {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.documentEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push("/documents/" + (response.insertedId || doc._id));
    }
  });
};

var validate = function () {
  $(component.documentEditorForm).validate({
    rules: {
      title: {
        required: true
      },
      body: {
        required: true
      }
    },
    messages: {
      title: {
        required: 'Need a title in here, Seuss.'
      },
      body: {
        required: 'This thneeds a body, please.'
      }
    },
    submitHandler: function () {
      handleUpsert();
    }
  });
};

function documentEditor(options) {
  component = options.component;
  validate();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"get-tracker-loader.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/modules/get-tracker-loader.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  "default": function () {
    return getTrackerLoader;
  }
});
var Tracker;
module.link("meteor/tracker", {
  Tracker: function (v) {
    Tracker = v;
  }
}, 0);

function getTrackerLoader(reactiveMapper) {
  return function (props, onData, env) {
    var trackerCleanup = null;
    var handler = Tracker.nonreactive(function () {
      return Tracker.autorun(function () {
        trackerCleanup = reactiveMapper(props, onData, env);
      });
    });
    return function () {
      if (typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"login.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/modules/login.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  "default": function () {
    return handleLogin;
  }
});
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 0);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 1);
var Bert;
module.link("meteor/themeteorchef:bert", {
  Bert: function (v) {
    Bert = v;
  }
}, 2);
module.link("./validation.js");
var component;

var login = function () {
  var email = document.querySelector('[name="emailAddress"]').value;
  var password = document.querySelector('[name="password"]').value;
  Meteor.loginWithPassword(email, password, function (error) {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Logged in!', 'success');
      var location = component.props.location;

      if (location.state && location.state.nextPathname) {
        browserHistory.push(location.state.nextPathname);
      } else {
        browserHistory.push('/');
      }
    }
  });
};

var validate = function () {
  $(component.loginForm).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      },
      password: {
        required: 'Need a password here.'
      }
    },
    submitHandler: function () {
      login();
    }
  });
};

function handleLogin(options) {
  component = options.component;
  validate();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rate-limit.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/modules/rate-limit.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  "default": function () {
    return rateLimit;
  }
});
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 0);
var DDPRateLimiter;
module.link("meteor/ddp-rate-limiter", {
  DDPRateLimiter: function (v) {
    DDPRateLimiter = v;
  }
}, 1);

var _;

module.link("meteor/underscore", {
  _: function (v) {
    _ = v;
  }
}, 2);

var fetchMethodNames = function (methods) {
  return _.pluck(methods, 'name');
};

var assignLimits = function (_ref) {
  var methods = _ref.methods,
      limit = _ref.limit,
      timeRange = _ref.timeRange;
  var methodNames = fetchMethodNames(methods);

  if (Meteor.isServer) {
    DDPRateLimiter.addRule({
      name: function (name) {
        return _.contains(methodNames, name);
      },
      connectionId: function () {
        return true;
      }
    }, limit, timeRange);
  }
};

function rateLimit(options) {
  return assignLimits(options);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"recover-password.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/modules/recover-password.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  "default": function () {
    return handleRecoverPassword;
  }
});
var Accounts;
module.link("meteor/accounts-base", {
  Accounts: function (v) {
    Accounts = v;
  }
}, 0);
var Bert;
module.link("meteor/themeteorchef:bert", {
  Bert: function (v) {
    Bert = v;
  }
}, 1);
module.link("./validation.js");
var component;

var handleRecovery = function () {
  Accounts.forgotPassword({
    email: document.querySelector('[name="emailAddress"]').value
  }, function (error) {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Check your inbox for a reset link!', 'success');
    }
  });
};

var validate = function () {
  $(component.recoverPasswordForm).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      }
    },
    submitHandler: function () {
      handleRecovery();
    }
  });
};

function handleRecoverPassword(options) {
  component = options.component;
  validate();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reset-password.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/modules/reset-password.js                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  "default": function () {
    return handleResetPassword;
  }
});
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 0);
var Accounts;
module.link("meteor/accounts-base", {
  Accounts: function (v) {
    Accounts = v;
  }
}, 1);
var Bert;
module.link("meteor/themeteorchef:bert", {
  Bert: function (v) {
    Bert = v;
  }
}, 2);
module.link("./validation.js");
var component;
var token;

var handleReset = function () {
  var password = document.querySelector('[name="newPassword"]').value;
  Accounts.resetPassword(token, password, function (error) {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Password reset!', 'success');
    }
  });
};

var validate = function () {
  $(component.resetPasswordForm).validate({
    rules: {
      newPassword: {
        required: true,
        minlength: 6
      },
      repeatNewPassword: {
        required: true,
        minlength: 6,
        equalTo: '[name="newPassword"]'
      }
    },
    messages: {
      newPassword: {
        required: 'Enter a new password, please.',
        minlength: 'Use at least six characters, please.'
      },
      repeatNewPassword: {
        required: 'Repeat your new password, please.',
        equalTo: 'Hmm, your passwords don\'t match. Try again?'
      }
    },
    submitHandler: function () {
      handleReset();
    }
  });
};

function handleResetPassword(options) {
  component = options.component;
  token = options.token;
  validate();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"signup.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/modules/signup.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  "default": function () {
    return handleSignup;
  }
});
var browserHistory;
module.link("react-router", {
  browserHistory: function (v) {
    browserHistory = v;
  }
}, 0);
var Accounts;
module.link("meteor/accounts-base", {
  Accounts: function (v) {
    Accounts = v;
  }
}, 1);
var Bert;
module.link("meteor/themeteorchef:bert", {
  Bert: function (v) {
    Bert = v;
  }
}, 2);
module.link("./validation.js");
var component;

var getUserData = function () {
  return {
    email: document.querySelector('[name="emailAddress"]').value,
    password: document.querySelector('[name="password"]').value,
    profile: {
      name: {
        first: document.querySelector('[name="firstName"]').value,
        last: document.querySelector('[name="lastName"]').value
      }
    }
  };
};

var signup = function () {
  var user = getUserData();
  Accounts.createUser(user, function (error) {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Welcome!', 'success');
    }
  });
};

var validate = function () {
  $(component.signupForm).validate({
    rules: {
      firstName: {
        required: true
      },
      lastName: {
        required: true
      },
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      firstName: {
        required: 'First name?'
      },
      lastName: {
        required: 'Last name?'
      },
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      },
      password: {
        required: 'Need a password here.',
        minlength: 'Use at least six characters, please.'
      }
    },
    submitHandler: function () {
      signup();
    }
  });
};

function handleSignup(options) {
  component = options.component;
  validate();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"validation.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/modules/validation.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var $;
module.link("jquery", {
  "default": function (v) {
    $ = v;
  }
}, 0);
module.link("jquery-validation");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"client":{"main.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/main.js                                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("/imports/startup/client");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

require("/client/main.js");