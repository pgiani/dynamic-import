var require = meteorInstall({"imports":{"api":{"documents":{"documents.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/api/documents/documents.js                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let SimpleSchema;
module.link("simpl-schema", {
  default(v) {
    SimpleSchema = v;
  }

}, 1);
let Factory;
module.link("meteor/dburles:factory", {
  Factory(v) {
    Factory = v;
  }

}, 2);
const Documents = new Mongo.Collection('Documents');
module.exportDefault(Documents);
Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});
Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
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
  title: () => 'Factory Title',
  body: () => 'Factory Body'
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/api/documents/methods.js                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  upsertDocument: () => upsertDocument,
  removeDocument: () => removeDocument
});
let SimpleSchema;
module.link("simpl-schema", {
  default(v) {
    SimpleSchema = v;
  }

}, 0);
let ValidatedMethod;
module.link("meteor/mdg:validated-method", {
  ValidatedMethod(v) {
    ValidatedMethod = v;
  }

}, 1);
let Documents;
module.link("./documents", {
  default(v) {
    Documents = v;
  }

}, 2);
let rateLimit;
module.link("../../modules/rate-limit.js", {
  default(v) {
    rateLimit = v;
  }

}, 3);
const upsertDocument = new ValidatedMethod({
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

  run(document) {
    return Documents.upsert({
      _id: document._id
    }, {
      $set: document
    });
  }

});
const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: {
      type: String
    }
  }).validator(),

  run(_ref) {
    let {
      _id
    } = _ref;
    Documents.remove(_id);
  }

});
rateLimit({
  methods: [upsertDocument, removeDocument],
  limit: 5,
  timeRange: 1000
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"startup":{"client":{"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/startup/client/index.js                                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Bert;
module.link("meteor/themeteorchef:bert", {
  Bert(v) {
    Bert = v;
  }

}, 0);
module.link("bootstrap/dist/css/bootstrap.min.css");
module.link("./routes.js");
Bert.defaults.style = 'growl-top-right';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"routes.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/startup/client/routes.js                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let render;
module.link("react-dom", {
  render(v) {
    render = v;
  }

}, 1);
let Router, Route, IndexRoute, browserHistory;
module.link("react-router", {
  Router(v) {
    Router = v;
  },

  Route(v) {
    Route = v;
  },

  IndexRoute(v) {
    IndexRoute = v;
  },

  browserHistory(v) {
    browserHistory = v;
  }

}, 2);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 3);
let App;
module.link("../../ui/layouts/App.js", {
  default(v) {
    App = v;
  }

}, 4);
let Documents;
module.link("../../ui/pages/Documents.js", {
  default(v) {
    Documents = v;
  }

}, 5);
let NewDocument;
module.link("../../ui/pages/NewDocument.js", {
  default(v) {
    NewDocument = v;
  }

}, 6);
let EditDocument;
module.link("../../ui/pages/EditDocument.js", {
  default(v) {
    EditDocument = v;
  }

}, 7);
let ViewDocument;
module.link("../../ui/pages/ViewDocument.js", {
  default(v) {
    ViewDocument = v;
  }

}, 8);
let Index;
module.link("../../ui/pages/Index.js", {
  default(v) {
    Index = v;
  }

}, 9);
let Login;
module.link("../../ui/pages/Login.js", {
  default(v) {
    Login = v;
  }

}, 10);
let NotFound;
module.link("../../ui/pages/NotFound.js", {
  default(v) {
    NotFound = v;
  }

}, 11);
let RecoverPassword;
module.link("../../ui/pages/RecoverPassword.js", {
  default(v) {
    RecoverPassword = v;
  }

}, 12);
let ResetPassword;
module.link("../../ui/pages/ResetPassword.js", {
  default(v) {
    ResetPassword = v;
  }

}, 13);
let Signup;
module.link("../../ui/pages/Signup.js", {
  default(v) {
    Signup = v;
  }

}, 14);

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};

Meteor.startup(() => {
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"ui":{"components":{"AppNavigation.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/components/AppNavigation.js                                                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 1);
let Navbar;
module.link("react-bootstrap", {
  Navbar(v) {
    Navbar = v;
  }

}, 2);
let Link;
module.link("react-router", {
  Link(v) {
    Link = v;
  }

}, 3);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 4);
let PublicNavigation;
module.link("./PublicNavigation.js", {
  default(v) {
    PublicNavigation = v;
  }

}, 5);
let AuthenticatedNavigation;
module.link("./AuthenticatedNavigation.js", {
  default(v) {
    AuthenticatedNavigation = v;
  }

}, 6);
let container;
module.link("../../modules/container", {
  default(v) {
    container = v;
  }

}, 7);

const renderNavigation = hasUser => hasUser ? React.createElement(AuthenticatedNavigation, null) : React.createElement(PublicNavigation, null);

const AppNavigation = (_ref) => {
  let {
    hasUser
  } = _ref;
  return React.createElement(Navbar, null);
};

AppNavigation.propTypes = {
  hasUser: PropTypes.object
};
module.exportDefault(container((props, onData) => {
  onData(null, {
    hasUser: Meteor.user()
  });
}, AppNavigation));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AuthenticatedNavigation.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/components/AuthenticatedNavigation.js                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let browserHistory;
module.link("react-router", {
  browserHistory(v) {
    browserHistory = v;
  }

}, 1);
let LinkContainer;
module.link("react-router-bootstrap", {
  LinkContainer(v) {
    LinkContainer = v;
  }

}, 2);
let Nav, NavItem, NavDropdown, MenuItem;
module.link("react-bootstrap", {
  Nav(v) {
    Nav = v;
  },

  NavItem(v) {
    NavItem = v;
  },

  NavDropdown(v) {
    NavDropdown = v;
  },

  MenuItem(v) {
    MenuItem = v;
  }

}, 3);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 4);

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? "".concat(name.first, " ").concat(name.last) : '';
};

const AuthenticatedNavigation = () => React.createElement("div", null, React.createElement(Nav, null, React.createElement(LinkContainer, {
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

module.exportDefault(AuthenticatedNavigation);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DateListGroupItem.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/components/DateListGroupItem.js                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 0);
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 1);
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 2);

const niceDate = date => moment(date).calendar(null, {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: 'DD/MM/YYYY'
});

const DateListGroupItem = (_ref) => {
  let {
    startDate,
    endDate,
    index,
    remove
  } = _ref;
  return React.createElement("div", {
    className: "list-group-item"
  }, niceDate(startDate), "\u2013", niceDate(endDate), React.createElement("button", {
    onClick: () => remove(index),
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DocumentEditor.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/components/DocumentEditor.js                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => DocumentEditor
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 1);
let FormGroup, ControlLabel, FormControl, Button;
module.link("react-bootstrap", {
  FormGroup(v) {
    FormGroup = v;
  },

  ControlLabel(v) {
    ControlLabel = v;
  },

  FormControl(v) {
    FormControl = v;
  },

  Button(v) {
    Button = v;
  }

}, 2);
let documentEditor;
module.link("../../modules/document-editor.js", {
  default(v) {
    documentEditor = v;
  }

}, 3);

class DocumentEditor extends React.Component {
  componentDidMount() {
    documentEditor({
      component: this
    });
    setTimeout(() => {
      document.querySelector('[name="title"]').focus();
    }, 0);
  }

  render() {
    const {
      doc
    } = this.props;
    return React.createElement("form", {
      ref: form => this.documentEditorForm = form,
      onSubmit: event => event.preventDefault()
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

}

DocumentEditor.propTypes = {
  doc: PropTypes.object
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DocumentsList.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/components/DocumentsList.js                                                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 1);
let browserHistory;
module.link("react-router", {
  browserHistory(v) {
    browserHistory = v;
  }

}, 2);
let ListGroup, ListGroupItem, Alert;
module.link("react-bootstrap", {
  ListGroup(v) {
    ListGroup = v;
  },

  ListGroupItem(v) {
    ListGroupItem = v;
  },

  Alert(v) {
    Alert = v;
  }

}, 3);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 4);
let Documents;
module.link("../../api/documents/documents", {
  default(v) {
    Documents = v;
  }

}, 5);
let container;
module.link("../../modules/container", {
  default(v) {
    container = v;
  }

}, 6);

const handleNav = _id => browserHistory.push("/documents/".concat(_id));

const DocumentsList = (_ref) => {
  let {
    documents
  } = _ref;
  return documents.length > 0 ? React.createElement(ListGroup, {
    className: "DocumentsList"
  }, documents.map((_ref2) => {
    let {
      _id,
      title
    } = _ref2;
    return React.createElement(ListGroupItem, {
      key: _id,
      onClick: () => handleNav(_id)
    }, title);
  })) : React.createElement(Alert, {
    bsStyle: "warning"
  }, "No documents yet.");
};

DocumentsList.propTypes = {
  documents: PropTypes.array
};
module.exportDefault(container((props, onData) => {
  const subscription = Meteor.subscribe('documents.list');

  if (subscription.ready()) {
    const documents = Documents.find().fetch();
    onData(null, {
      documents
    });
  }
}, DocumentsList));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ExampleDates.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/components/ExampleDates.js                                                                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Loadable;
module.link("react-loadable", {
  default(v) {
    Loadable = v;
  }

}, 1);
let DateListGroupItem;
module.link("./DateListGroupItem", {
  default(v) {
    DateListGroupItem = v;
  }

}, 2);

// generic loading component to show while transfering section of code
const LoadingComponent = () => React.createElement("span", {
  className: "text-muted"
}, React.createElement("i", {
  className: "fa fa-refresh"
})); // new version of the component, now: loading --> rendered


const PickDates = Loadable({
  // this does the dynamic import, and returns a promise
  loader: () => module.dynamicImport('./PickDates'),
  // this is our generic loading display (optional)
  loading: LoadingComponent,
  // this is a delay before we decide to show our LoadingComponent (optional)
  delay: 200
});

class ExampleDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: []
    };
    this.addDates = this.addDates.bind(this);
    this.removeDate = this.removeDate.bind(this);
  }

  addDates(newDates) {
    console.log(newDates);
    this.setState({
      dates: [...this.state.dates, newDates]
    });
  }

  removeDate(index) {
    this.setState({
      dates: [...this.state.dates.slice(0, index), ...this.state.dates.slice(index + 1)]
    });
  }

  render() {
    return React.createElement("div", null, React.createElement(PickDates, {
      onAddDates: this.addDates
    }), React.createElement("hr", null), React.createElement("div", {
      className: "list-group"
    }, this.state.dates.map((dates, index) => React.createElement(DateListGroupItem, (0, _extends2.default)({}, dates, {
      key: index,
      index: index,
      remove: this.removeDate
    })))));
  }

}

module.exportDefault(ExampleDates);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PickDates.js":[
  "moment",
  "react",
  "prop-types",
  "react-dates",
  "react-dates/lib/css/_datepicker.css"
],"PublicNavigation.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/components/PublicNavigation.js                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let LinkContainer;
module.link("react-router-bootstrap", {
  LinkContainer(v) {
    LinkContainer = v;
  }

}, 1);
let Nav, NavItem;
module.link("react-bootstrap", {
  Nav(v) {
    Nav = v;
  },

  NavItem(v) {
    NavItem = v;
  }

}, 2);

const PublicNavigation = () => React.createElement(Nav, {
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

module.exportDefault(PublicNavigation);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"layouts":{"App.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/layouts/App.js                                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 1);
let Grid;
module.link("react-bootstrap", {
  Grid(v) {
    Grid = v;
  }

}, 2);
let AppNavigation;
module.link("../components/AppNavigation", {
  default(v) {
    AppNavigation = v;
  }

}, 3);

const App = (_ref) => {
  let {
    children
  } = _ref;
  return React.createElement("div", null, React.createElement(AppNavigation, null), React.createElement(Grid, null, children));
};

App.propTypes = {
  children: PropTypes.node
};
module.exportDefault(App);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"pages":{"Documents.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/pages/Documents.js                                                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Link;
module.link("react-router", {
  Link(v) {
    Link = v;
  }

}, 1);
let Row, Col, Button;
module.link("react-bootstrap", {
  Row(v) {
    Row = v;
  },

  Col(v) {
    Col = v;
  },

  Button(v) {
    Button = v;
  }

}, 2);
let DocumentsList;
module.link("../components/DocumentsList", {
  default(v) {
    DocumentsList = v;
  }

}, 3);

const Documents = () => React.createElement("div", {
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

module.exportDefault(Documents);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"EditDocument.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/pages/EditDocument.js                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 1);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 2);
let Documents;
module.link("../../api/documents/documents", {
  default(v) {
    Documents = v;
  }

}, 3);
let DocumentEditor;
module.link("../components/DocumentEditor", {
  default(v) {
    DocumentEditor = v;
  }

}, 4);
let NotFound;
module.link("./NotFound", {
  default(v) {
    NotFound = v;
  }

}, 5);
let container;
module.link("../../modules/container", {
  default(v) {
    container = v;
  }

}, 6);

const EditDocument = (_ref) => {
  let {
    doc
  } = _ref;
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
module.exportDefault(container((props, onData) => {
  const documentId = props.params._id;
  const subscription = Meteor.subscribe('documents.view', documentId);

  if (subscription.ready()) {
    const doc = Documents.findOne(documentId);
    onData(null, {
      doc
    });
  }
}, EditDocument));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/pages/Index.js                                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Jumbotron;
module.link("react-bootstrap", {
  Jumbotron(v) {
    Jumbotron = v;
  }

}, 1);
let ExampleDates;
module.link("../components/ExampleDates", {
  default(v) {
    ExampleDates = v;
  }

}, 2);

const Index = () => React.createElement("div", {
  className: "Index"
}, React.createElement(Jumbotron, {
  className: "text-center"
}, React.createElement("h2", null, "Example for Meteor 1.8"), React.createElement("p", null, "We are making a very simple component to pick and render dates."), React.createElement(ExampleDates, null)));

module.exportDefault(Index);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Login.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/pages/Login.js                                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => Login
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Link;
module.link("react-router", {
  Link(v) {
    Link = v;
  }

}, 1);
let Row, Col, FormGroup, ControlLabel, FormControl, Button;
module.link("react-bootstrap", {
  Row(v) {
    Row = v;
  },

  Col(v) {
    Col = v;
  },

  FormGroup(v) {
    FormGroup = v;
  },

  ControlLabel(v) {
    ControlLabel = v;
  },

  FormControl(v) {
    FormControl = v;
  },

  Button(v) {
    Button = v;
  }

}, 2);
let handleLogin;
module.link("../../modules/login", {
  default(v) {
    handleLogin = v;
  }

}, 3);

class Login extends React.Component {
  componentDidMount() {
    handleLogin({
      component: this
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return React.createElement("div", {
      className: "Login"
    }, React.createElement(Row, null, React.createElement(Col, {
      xs: 12,
      sm: 6,
      md: 4
    }, React.createElement("h4", {
      className: "page-header"
    }, "Login"), React.createElement("form", {
      ref: form => this.loginForm = form,
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

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NewDocument.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/pages/NewDocument.js                                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let DocumentEditor;
module.link("../components/DocumentEditor.js", {
  default(v) {
    DocumentEditor = v;
  }

}, 1);

const NewDocument = () => React.createElement("div", {
  className: "NewDocument"
}, React.createElement("h4", {
  className: "page-header"
}, "New Document"), React.createElement(DocumentEditor, null));

module.exportDefault(NewDocument);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NotFound.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/pages/NotFound.js                                                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Alert;
module.link("react-bootstrap", {
  Alert(v) {
    Alert = v;
  }

}, 1);

const NotFound = () => React.createElement("div", {
  className: "NotFound"
}, React.createElement(Alert, {
  bsStyle: "danger"
}, React.createElement("p", null, React.createElement("strong", null, "Error [404]"), ": ", window.location.pathname, " does not exist.")));

module.exportDefault(NotFound);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"RecoverPassword.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/pages/RecoverPassword.js                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => RecoverPassword
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Row, Col, Alert, FormGroup, FormControl, Button;
module.link("react-bootstrap", {
  Row(v) {
    Row = v;
  },

  Col(v) {
    Col = v;
  },

  Alert(v) {
    Alert = v;
  },

  FormGroup(v) {
    FormGroup = v;
  },

  FormControl(v) {
    FormControl = v;
  },

  Button(v) {
    Button = v;
  }

}, 1);
let handleRecoverPassword;
module.link("../../modules/recover-password", {
  default(v) {
    handleRecoverPassword = v;
  }

}, 2);

class RecoverPassword extends React.Component {
  componentDidMount() {
    handleRecoverPassword({
      component: this
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
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
      ref: form => this.recoverPasswordForm = form,
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

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ResetPassword.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/pages/ResetPassword.js                                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => ResetPassword
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 1);
let Row, Col, Alert, FormGroup, ControlLabel, FormControl, Button;
module.link("react-bootstrap", {
  Row(v) {
    Row = v;
  },

  Col(v) {
    Col = v;
  },

  Alert(v) {
    Alert = v;
  },

  FormGroup(v) {
    FormGroup = v;
  },

  ControlLabel(v) {
    ControlLabel = v;
  },

  FormControl(v) {
    FormControl = v;
  },

  Button(v) {
    Button = v;
  }

}, 2);
let handleResetPassword;
module.link("../../modules/reset-password", {
  default(v) {
    handleResetPassword = v;
  }

}, 3);

class ResetPassword extends React.Component {
  componentDidMount() {
    handleResetPassword({
      component: this,
      token: this.props.params.token
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
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
      ref: form => this.resetPasswordForm = form,
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

}

ResetPassword.propTypes = {
  params: PropTypes.object
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Signup.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/pages/Signup.js                                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => Signup
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Link;
module.link("react-router", {
  Link(v) {
    Link = v;
  }

}, 1);
let Row, Col, FormGroup, ControlLabel, FormControl, Button;
module.link("react-bootstrap", {
  Row(v) {
    Row = v;
  },

  Col(v) {
    Col = v;
  },

  FormGroup(v) {
    FormGroup = v;
  },

  ControlLabel(v) {
    ControlLabel = v;
  },

  FormControl(v) {
    FormControl = v;
  },

  Button(v) {
    Button = v;
  }

}, 2);
let handleSignup;
module.link("../../modules/signup", {
  default(v) {
    handleSignup = v;
  }

}, 3);

class Signup extends React.Component {
  componentDidMount() {
    handleSignup({
      component: this
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return React.createElement("div", {
      className: "Signup"
    }, React.createElement(Row, null, React.createElement(Col, {
      xs: 12,
      sm: 6,
      md: 4
    }, React.createElement("h4", {
      className: "page-header"
    }, "Sign Up"), React.createElement("form", {
      ref: form => this.signupForm = form,
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

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ViewDocument.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/pages/ViewDocument.js                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 1);
let ButtonToolbar, ButtonGroup, Button;
module.link("react-bootstrap", {
  ButtonToolbar(v) {
    ButtonToolbar = v;
  },

  ButtonGroup(v) {
    ButtonGroup = v;
  },

  Button(v) {
    Button = v;
  }

}, 2);
let browserHistory;
module.link("react-router", {
  browserHistory(v) {
    browserHistory = v;
  }

}, 3);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 4);
let Bert;
module.link("meteor/themeteorchef:bert", {
  Bert(v) {
    Bert = v;
  }

}, 5);
let Documents;
module.link("../../api/documents/documents", {
  default(v) {
    Documents = v;
  }

}, 6);
let removeDocument;
module.link("../../api/documents/methods", {
  removeDocument(v) {
    removeDocument = v;
  }

}, 7);
let NotFound;
module.link("./NotFound", {
  default(v) {
    NotFound = v;
  }

}, 8);
let container;
module.link("../../modules/container", {
  default(v) {
    container = v;
  }

}, 9);

const handleEdit = _id => {
  browserHistory.push("/documents/".concat(_id, "/edit"));
};

const handleRemove = _id => {
  if (confirm('Are you sure? This is permanent!')) {
    removeDocument.call({
      _id
    }, error => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
        browserHistory.push('/documents');
      }
    });
  }
};

const ViewDocument = (_ref) => {
  let {
    doc
  } = _ref;
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
    onClick: () => handleEdit(doc._id)
  }, "Edit"), React.createElement(Button, {
    onClick: () => handleRemove(doc._id),
    className: "text-danger"
  }, "Delete")))), doc && doc.body) : React.createElement(NotFound, null);
};

ViewDocument.propTypes = {
  doc: PropTypes.object
};
module.exportDefault(container((props, onData) => {
  const documentId = props.params._id;
  const subscription = Meteor.subscribe('documents.view', documentId);

  if (subscription.ready()) {
    const doc = Documents.findOne(documentId);
    onData(null, {
      doc
    });
  }
}, ViewDocument));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"modules":{"container.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/modules/container.js                                                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => container
});
let compose;
module.link("react-komposer", {
  compose(v) {
    compose = v;
  }

}, 0);
let getTrackerLoader;
module.link("./get-tracker-loader", {
  default(v) {
    getTrackerLoader = v;
  }

}, 1);

function container(composer, Component) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return compose(getTrackerLoader(composer), options)(Component);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"document-editor.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/modules/document-editor.js                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => documentEditor
});
let browserHistory;
module.link("react-router", {
  browserHistory(v) {
    browserHistory = v;
  }

}, 0);
let Bert;
module.link("meteor/themeteorchef:bert", {
  Bert(v) {
    Bert = v;
  }

}, 1);
let upsertDocument;
module.link("../api/documents/methods.js", {
  upsertDocument(v) {
    upsertDocument = v;
  }

}, 2);
module.link("./validation.js");
let component;

const handleUpsert = () => {
  const {
    doc
  } = component.props;
  const confirmation = doc && doc._id ? 'Document updated!' : 'Document added!';
  const upsert = {
    title: document.querySelector('[name="title"]').value.trim(),
    body: document.querySelector('[name="body"]').value.trim()
  };
  if (doc && doc._id) upsert._id = doc._id;
  upsertDocument.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.documentEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push("/documents/".concat(response.insertedId || doc._id));
    }
  });
};

const validate = () => {
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

    submitHandler() {
      handleUpsert();
    }

  });
};

function documentEditor(options) {
  component = options.component;
  validate();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"get-tracker-loader.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/modules/get-tracker-loader.js                                                                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => getTrackerLoader
});
let Tracker;
module.link("meteor/tracker", {
  Tracker(v) {
    Tracker = v;
  }

}, 0);

function getTrackerLoader(reactiveMapper) {
  return (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() => Tracker.autorun(() => {
      trackerCleanup = reactiveMapper(props, onData, env);
    }));
    return () => {
      if (typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"login.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/modules/login.js                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => handleLogin
});
let browserHistory;
module.link("react-router", {
  browserHistory(v) {
    browserHistory = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let Bert;
module.link("meteor/themeteorchef:bert", {
  Bert(v) {
    Bert = v;
  }

}, 2);
module.link("./validation.js");
let component;

const login = () => {
  const email = document.querySelector('[name="emailAddress"]').value;
  const password = document.querySelector('[name="password"]').value;
  Meteor.loginWithPassword(email, password, error => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Logged in!', 'success');
      const {
        location
      } = component.props;

      if (location.state && location.state.nextPathname) {
        browserHistory.push(location.state.nextPathname);
      } else {
        browserHistory.push('/');
      }
    }
  });
};

const validate = () => {
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

    submitHandler() {
      login();
    }

  });
};

function handleLogin(options) {
  component = options.component;
  validate();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rate-limit.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/modules/rate-limit.js                                                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => rateLimit
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let DDPRateLimiter;
module.link("meteor/ddp-rate-limiter", {
  DDPRateLimiter(v) {
    DDPRateLimiter = v;
  }

}, 1);

let _;

module.link("meteor/underscore", {
  _(v) {
    _ = v;
  }

}, 2);

const fetchMethodNames = methods => _.pluck(methods, 'name');

const assignLimits = (_ref) => {
  let {
    methods,
    limit,
    timeRange
  } = _ref;
  const methodNames = fetchMethodNames(methods);

  if (Meteor.isServer) {
    DDPRateLimiter.addRule({
      name(name) {
        return _.contains(methodNames, name);
      },

      connectionId() {
        return true;
      }

    }, limit, timeRange);
  }
};

function rateLimit(options) {
  return assignLimits(options);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"recover-password.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/modules/recover-password.js                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => handleRecoverPassword
});
let Accounts;
module.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }

}, 0);
let Bert;
module.link("meteor/themeteorchef:bert", {
  Bert(v) {
    Bert = v;
  }

}, 1);
module.link("./validation.js");
let component;

const handleRecovery = () => {
  Accounts.forgotPassword({
    email: document.querySelector('[name="emailAddress"]').value
  }, error => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Check your inbox for a reset link!', 'success');
    }
  });
};

const validate = () => {
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

    submitHandler() {
      handleRecovery();
    }

  });
};

function handleRecoverPassword(options) {
  component = options.component;
  validate();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reset-password.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/modules/reset-password.js                                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => handleResetPassword
});
let browserHistory;
module.link("react-router", {
  browserHistory(v) {
    browserHistory = v;
  }

}, 0);
let Accounts;
module.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }

}, 1);
let Bert;
module.link("meteor/themeteorchef:bert", {
  Bert(v) {
    Bert = v;
  }

}, 2);
module.link("./validation.js");
let component;
let token;

const handleReset = () => {
  const password = document.querySelector('[name="newPassword"]').value;
  Accounts.resetPassword(token, password, error => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Password reset!', 'success');
    }
  });
};

const validate = () => {
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

    submitHandler() {
      handleReset();
    }

  });
};

function handleResetPassword(options) {
  component = options.component;
  token = options.token;
  validate();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"signup.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/modules/signup.js                                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => handleSignup
});
let browserHistory;
module.link("react-router", {
  browserHistory(v) {
    browserHistory = v;
  }

}, 0);
let Accounts;
module.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }

}, 1);
let Bert;
module.link("meteor/themeteorchef:bert", {
  Bert(v) {
    Bert = v;
  }

}, 2);
module.link("./validation.js");
let component;

const getUserData = () => ({
  email: document.querySelector('[name="emailAddress"]').value,
  password: document.querySelector('[name="password"]').value,
  profile: {
    name: {
      first: document.querySelector('[name="firstName"]').value,
      last: document.querySelector('[name="lastName"]').value
    }
  }
});

const signup = () => {
  const user = getUserData();
  Accounts.createUser(user, error => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Welcome!', 'success');
    }
  });
};

const validate = () => {
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

    submitHandler() {
      signup();
    }

  });
};

function handleSignup(options) {
  component = options.component;
  validate();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"validation.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/modules/validation.js                                                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let $;
module.link("jquery", {
  default(v) {
    $ = v;
  }

}, 0);
module.link("jquery-validation");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"client":{"main.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/main.js                                                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.link("/imports/startup/client");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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