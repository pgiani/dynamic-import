var require = meteorInstall({"imports":{"api":{"documents":{"server":{"publications.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// imports/api/documents/server/publications.js                         //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var Meteor = void 0;                                                    // 1
module.watch(require("meteor/meteor"), {                                // 1
  Meteor: function (v) {                                                // 1
    Meteor = v;                                                         // 1
  }                                                                     // 1
}, 0);                                                                  // 1
var check = void 0;                                                     // 1
module.watch(require("meteor/check"), {                                 // 1
  check: function (v) {                                                 // 1
    check = v;                                                          // 1
  }                                                                     // 1
}, 1);                                                                  // 1
var Documents = void 0;                                                 // 1
module.watch(require("../documents"), {                                 // 1
  "default": function (v) {                                             // 1
    Documents = v;                                                      // 1
  }                                                                     // 1
}, 2);                                                                  // 1
Meteor.publish('documents.list', function () {                          // 5
  return Documents.find();                                              // 5
});                                                                     // 5
Meteor.publish('documents.view', function (_id) {                       // 7
  check(_id, String);                                                   // 8
  return Documents.find(_id);                                           // 9
});                                                                     // 10
//////////////////////////////////////////////////////////////////////////

}},"documents.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// imports/api/documents/documents.js                                   //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var Mongo = void 0;                                                     // 1
module.watch(require("meteor/mongo"), {                                 // 1
  Mongo: function (v) {                                                 // 1
    Mongo = v;                                                          // 1
  }                                                                     // 1
}, 0);                                                                  // 1
var SimpleSchema = void 0;                                              // 1
module.watch(require("simpl-schema"), {                                 // 1
  "default": function (v) {                                             // 1
    SimpleSchema = v;                                                   // 1
  }                                                                     // 1
}, 1);                                                                  // 1
var Factory = void 0;                                                   // 1
module.watch(require("meteor/dburles:factory"), {                       // 1
  Factory: function (v) {                                               // 1
    Factory = v;                                                        // 1
  }                                                                     // 1
}, 2);                                                                  // 1
var Documents = new Mongo.Collection('Documents');                      // 5
module.exportDefault(Documents);                                        // 1
Documents.allow({                                                       // 8
  insert: function () {                                                 // 9
    return false;                                                       // 9
  },                                                                    // 9
  update: function () {                                                 // 10
    return false;                                                       // 10
  },                                                                    // 10
  remove: function () {                                                 // 11
    return false;                                                       // 11
  }                                                                     // 11
});                                                                     // 8
Documents.deny({                                                        // 14
  insert: function () {                                                 // 15
    return true;                                                        // 15
  },                                                                    // 15
  update: function () {                                                 // 16
    return true;                                                        // 16
  },                                                                    // 16
  remove: function () {                                                 // 17
    return true;                                                        // 17
  }                                                                     // 17
});                                                                     // 14
Documents.schema = new SimpleSchema({                                   // 20
  title: {                                                              // 21
    type: String,                                                       // 22
    label: 'The title of the document.'                                 // 23
  },                                                                    // 21
  body: {                                                               // 25
    type: String,                                                       // 26
    label: 'The body of the document.'                                  // 27
  }                                                                     // 25
});                                                                     // 20
Documents.attachSchema(Documents.schema);                               // 31
Factory.define('document', Documents, {                                 // 33
  title: function () {                                                  // 34
    return 'Factory Title';                                             // 34
  },                                                                    // 34
  body: function () {                                                   // 35
    return 'Factory Body';                                              // 35
  }                                                                     // 35
});                                                                     // 33
//////////////////////////////////////////////////////////////////////////

},"methods.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// imports/api/documents/methods.js                                     //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
module.export({                                                         // 1
  upsertDocument: function () {                                         // 1
    return upsertDocument;                                              // 1
  },                                                                    // 1
  removeDocument: function () {                                         // 1
    return removeDocument;                                              // 1
  }                                                                     // 1
});                                                                     // 1
var SimpleSchema = void 0;                                              // 1
module.watch(require("simpl-schema"), {                                 // 1
  "default": function (v) {                                             // 1
    SimpleSchema = v;                                                   // 1
  }                                                                     // 1
}, 0);                                                                  // 1
var ValidatedMethod = void 0;                                           // 1
module.watch(require("meteor/mdg:validated-method"), {                  // 1
  ValidatedMethod: function (v) {                                       // 1
    ValidatedMethod = v;                                                // 1
  }                                                                     // 1
}, 1);                                                                  // 1
var Documents = void 0;                                                 // 1
module.watch(require("./documents"), {                                  // 1
  "default": function (v) {                                             // 1
    Documents = v;                                                      // 1
  }                                                                     // 1
}, 2);                                                                  // 1
var rateLimit = void 0;                                                 // 1
module.watch(require("../../modules/rate-limit.js"), {                  // 1
  "default": function (v) {                                             // 1
    rateLimit = v;                                                      // 1
  }                                                                     // 1
}, 3);                                                                  // 1
var upsertDocument = new ValidatedMethod({                              // 6
  name: 'documents.upsert',                                             // 7
  validate: new SimpleSchema({                                          // 8
    _id: {                                                              // 9
      type: String,                                                     // 9
      optional: true                                                    // 9
    },                                                                  // 9
    title: {                                                            // 10
      type: String,                                                     // 10
      optional: true                                                    // 10
    },                                                                  // 10
    body: {                                                             // 11
      type: String,                                                     // 11
      optional: true                                                    // 11
    }                                                                   // 11
  }).validator(),                                                       // 8
  run: function (document) {                                            // 13
    return Documents.upsert({                                           // 14
      _id: document._id                                                 // 14
    }, {                                                                // 14
      $set: document                                                    // 14
    });                                                                 // 14
  }                                                                     // 15
});                                                                     // 6
var removeDocument = new ValidatedMethod({                              // 18
  name: 'documents.remove',                                             // 19
  validate: new SimpleSchema({                                          // 20
    _id: {                                                              // 21
      type: String                                                      // 21
    }                                                                   // 21
  }).validator(),                                                       // 20
  run: function (_ref) {                                                // 23
    var _id = _ref._id;                                                 // 23
    Documents.remove(_id);                                              // 24
  }                                                                     // 25
});                                                                     // 18
rateLimit({                                                             // 28
  methods: [upsertDocument, removeDocument],                            // 29
  limit: 5,                                                             // 33
  timeRange: 1000                                                       // 34
});                                                                     // 28
//////////////////////////////////////////////////////////////////////////

}}},"startup":{"server":{"accounts":{"email-templates.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// imports/startup/server/accounts/email-templates.js                   //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var Accounts = void 0;                                                  // 1
module.watch(require("meteor/accounts-base"), {                         // 1
  Accounts: function (v) {                                              // 1
    Accounts = v;                                                       // 1
  }                                                                     // 1
}, 0);                                                                  // 1
var name = 'Application Name';                                          // 3
var email = '<support@application.com>';                                // 4
var from = name + " " + email;                                          // 5
var emailTemplates = Accounts.emailTemplates;                           // 6
emailTemplates.siteName = name;                                         // 8
emailTemplates.from = from;                                             // 9
emailTemplates.resetPassword = {                                        // 11
  subject: function () {                                                // 12
    return "[" + name + "] Reset Your Password";                        // 13
  },                                                                    // 14
  text: function (user, url) {                                          // 15
    var userEmail = user.emails[0].address;                             // 16
    var urlWithoutHash = url.replace('#/', '');                         // 17
    return "A password reset has been requested for the account related to this\n    address (" + userEmail + "). To reset the password, visit the following link:\n    \n\n" + urlWithoutHash + "\n\n If you did not request this reset, please ignore\n    this email. If you feel something is wrong, please contact our support team:\n    " + email + ".";
  }                                                                     // 24
};                                                                      // 11
//////////////////////////////////////////////////////////////////////////

}},"api.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// imports/startup/server/api.js                                        //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
module.watch(require("../../api/documents/methods.js"));                // 1
module.watch(require("../../api/documents/server/publications.js"));    // 1
//////////////////////////////////////////////////////////////////////////

},"browser-policy.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// imports/startup/server/browser-policy.js                             //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var BrowserPolicy = void 0;                                             // 1
module.watch(require("meteor/browser-policy-common"), {                 // 1
  BrowserPolicy: function (v) {                                         // 1
    BrowserPolicy = v;                                                  // 1
  }                                                                     // 1
}, 0);                                                                  // 1
// e.g., BrowserPolicy.content.allowOriginForAll( 's3.amazonaws.com' );
BrowserPolicy.content.allowFontOrigin("data:");                         // 3
//////////////////////////////////////////////////////////////////////////

},"fixtures.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// imports/startup/server/fixtures.js                                   //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
var Meteor = void 0;                                                    // 1
module.watch(require("meteor/meteor"), {                                // 1
  Meteor: function (v) {                                                // 1
    Meteor = v;                                                         // 1
  }                                                                     // 1
}, 0);                                                                  // 1
var Roles = void 0;                                                     // 1
module.watch(require("meteor/alanning:roles"), {                        // 1
  Roles: function (v) {                                                 // 1
    Roles = v;                                                          // 1
  }                                                                     // 1
}, 1);                                                                  // 1
var Accounts = void 0;                                                  // 1
module.watch(require("meteor/accounts-base"), {                         // 1
  Accounts: function (v) {                                              // 1
    Accounts = v;                                                       // 1
  }                                                                     // 1
}, 2);                                                                  // 1
                                                                        //
if (!Meteor.isProduction) {                                             // 5
  var users = [{                                                        // 6
    email: 'admin@admin.com',                                           // 7
    password: 'password',                                               // 8
    profile: {                                                          // 9
      name: {                                                           // 10
        first: 'Carl',                                                  // 10
        last: 'Winslow'                                                 // 10
      }                                                                 // 10
    },                                                                  // 9
    roles: ['admin']                                                    // 12
  }];                                                                   // 6
  users.forEach(function (_ref) {                                       // 15
    var email = _ref.email,                                             // 15
        password = _ref.password,                                       // 15
        profile = _ref.profile,                                         // 15
        roles = _ref.roles;                                             // 15
    var userExists = Meteor.users.findOne({                             // 16
      'emails.address': email                                           // 16
    });                                                                 // 16
                                                                        //
    if (!userExists) {                                                  // 18
      var userId = Accounts.createUser({                                // 19
        email: email,                                                   // 19
        password: password,                                             // 19
        profile: profile                                                // 19
      });                                                               // 19
      Roles.addUsersToRoles(userId, roles);                             // 20
    }                                                                   // 21
  });                                                                   // 22
}                                                                       // 23
//////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// imports/startup/server/index.js                                      //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
module.watch(require("./accounts/email-templates"));                    // 1
module.watch(require("./browser-policy"));                              // 1
module.watch(require("./fixtures"));                                    // 1
module.watch(require("./api"));                                         // 1
//////////////////////////////////////////////////////////////////////////

}}},"modules":{"rate-limit.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// imports/modules/rate-limit.js                                        //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
module.export({                                                         // 1
  "default": function () {                                              // 1
    return rateLimit;                                                   // 1
  }                                                                     // 1
});                                                                     // 1
var Meteor = void 0;                                                    // 1
module.watch(require("meteor/meteor"), {                                // 1
  Meteor: function (v) {                                                // 1
    Meteor = v;                                                         // 1
  }                                                                     // 1
}, 0);                                                                  // 1
var DDPRateLimiter = void 0;                                            // 1
module.watch(require("meteor/ddp-rate-limiter"), {                      // 1
  DDPRateLimiter: function (v) {                                        // 1
    DDPRateLimiter = v;                                                 // 1
  }                                                                     // 1
}, 1);                                                                  // 1
                                                                        //
var _ = void 0;                                                         // 1
                                                                        //
module.watch(require("meteor/underscore"), {                            // 1
  _: function (v) {                                                     // 1
    _ = v;                                                              // 1
  }                                                                     // 1
}, 2);                                                                  // 1
                                                                        //
var fetchMethodNames = function (methods) {                             // 5
  return _.pluck(methods, 'name');                                      // 5
};                                                                      // 5
                                                                        //
var assignLimits = function (_ref) {                                    // 7
  var methods = _ref.methods,                                           // 7
      limit = _ref.limit,                                               // 7
      timeRange = _ref.timeRange;                                       // 7
  var methodNames = fetchMethodNames(methods);                          // 8
                                                                        //
  if (Meteor.isServer) {                                                // 10
    DDPRateLimiter.addRule({                                            // 11
      name: function (name) {                                           // 12
        return _.contains(methodNames, name);                           // 12
      },                                                                // 12
      connectionId: function () {                                       // 13
        return true;                                                    // 13
      }                                                                 // 13
    }, limit, timeRange);                                               // 11
  }                                                                     // 15
};                                                                      // 16
                                                                        //
function rateLimit(options) {                                           // 18
  return assignLimits(options);                                         // 18
}                                                                       // 18
//////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// server/main.js                                                       //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
module.watch(require("/imports/startup/server"));                       // 1
//////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx"
  ]
});
require("./server/main.js");
//# sourceMappingURL=app.js.map
