var require = meteorInstall({"imports":{"api":{"documents":{"server":{"publications.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// imports/api/documents/server/publications.js                                  //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let Documents;
module.link("../documents", {
  default(v) {
    Documents = v;
  }

}, 2);
Meteor.publish('documents.list', () => Documents.find());
Meteor.publish('documents.view', _id => {
  check(_id, String);
  return Documents.find(_id);
});
///////////////////////////////////////////////////////////////////////////////////

}},"documents.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// imports/api/documents/documents.js                                            //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////

},"methods.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// imports/api/documents/methods.js                                              //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
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

  run({
    _id
  }) {
    Documents.remove(_id);
  }

});
rateLimit({
  methods: [upsertDocument, removeDocument],
  limit: 5,
  timeRange: 1000
});
///////////////////////////////////////////////////////////////////////////////////

}}},"startup":{"server":{"accounts":{"email-templates.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// imports/startup/server/accounts/email-templates.js                            //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
let Accounts;
module.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }

}, 0);
const name = 'Application Name';
const email = '<support@application.com>';
const from = `${name} ${email}`;
const emailTemplates = Accounts.emailTemplates;
emailTemplates.siteName = name;
emailTemplates.from = from;
emailTemplates.resetPassword = {
  subject() {
    return `[${name}] Reset Your Password`;
  },

  text(user, url) {
    const userEmail = user.emails[0].address;
    const urlWithoutHash = url.replace('#/', '');
    return `A password reset has been requested for the account related to this
    address (${userEmail}). To reset the password, visit the following link:
    \n\n${urlWithoutHash}\n\n If you did not request this reset, please ignore
    this email. If you feel something is wrong, please contact our support team:
    ${email}.`;
  }

};
///////////////////////////////////////////////////////////////////////////////////

}},"api.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// imports/startup/server/api.js                                                 //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
module.link("../../api/documents/methods.js");
module.link("../../api/documents/server/publications.js");
///////////////////////////////////////////////////////////////////////////////////

},"browser-policy.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// imports/startup/server/browser-policy.js                                      //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
let BrowserPolicy;
module.link("meteor/browser-policy-common", {
  BrowserPolicy(v) {
    BrowserPolicy = v;
  }

}, 0);
// e.g., BrowserPolicy.content.allowOriginForAll( 's3.amazonaws.com' );
BrowserPolicy.content.allowFontOrigin("data:");
///////////////////////////////////////////////////////////////////////////////////

},"fixtures.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// imports/startup/server/fixtures.js                                            //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Roles;
module.link("meteor/alanning:roles", {
  Roles(v) {
    Roles = v;
  }

}, 1);
let Accounts;
module.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }

}, 2);

if (!Meteor.isProduction) {
  const users = [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: {
        first: 'Carl',
        last: 'Winslow'
      }
    },
    roles: ['admin']
  }];
  users.forEach(({
    email,
    password,
    profile,
    roles
  }) => {
    const userExists = Meteor.users.findOne({
      'emails.address': email
    });

    if (!userExists) {
      const userId = Accounts.createUser({
        email,
        password,
        profile
      });
      Roles.addUsersToRoles(userId, roles);
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// imports/startup/server/index.js                                               //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
module.link("./accounts/email-templates");
module.link("./browser-policy");
module.link("./fixtures");
module.link("./api");
///////////////////////////////////////////////////////////////////////////////////

}}},"modules":{"rate-limit.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// imports/modules/rate-limit.js                                                 //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
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

const assignLimits = ({
  methods,
  limit,
  timeRange
}) => {
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
///////////////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// server/main.js                                                                //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
module.link("/imports/startup/server");
///////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx"
  ]
});

require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvZG9jdW1lbnRzL3NlcnZlci9wdWJsaWNhdGlvbnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL2RvY3VtZW50cy9kb2N1bWVudHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL2RvY3VtZW50cy9tZXRob2RzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyL2FjY291bnRzL2VtYWlsLXRlbXBsYXRlcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL3NlcnZlci9hcGkuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvYnJvd3Nlci1wb2xpY3kuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvZml4dHVyZXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvbW9kdWxlcy9yYXRlLWxpbWl0LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJNZXRlb3IiLCJtb2R1bGUiLCJsaW5rIiwidiIsImNoZWNrIiwiRG9jdW1lbnRzIiwiZGVmYXVsdCIsInB1Ymxpc2giLCJmaW5kIiwiX2lkIiwiU3RyaW5nIiwiTW9uZ28iLCJTaW1wbGVTY2hlbWEiLCJGYWN0b3J5IiwiQ29sbGVjdGlvbiIsImV4cG9ydERlZmF1bHQiLCJhbGxvdyIsImluc2VydCIsInVwZGF0ZSIsInJlbW92ZSIsImRlbnkiLCJzY2hlbWEiLCJ0aXRsZSIsInR5cGUiLCJsYWJlbCIsImJvZHkiLCJhdHRhY2hTY2hlbWEiLCJkZWZpbmUiLCJleHBvcnQiLCJ1cHNlcnREb2N1bWVudCIsInJlbW92ZURvY3VtZW50IiwiVmFsaWRhdGVkTWV0aG9kIiwicmF0ZUxpbWl0IiwibmFtZSIsInZhbGlkYXRlIiwib3B0aW9uYWwiLCJ2YWxpZGF0b3IiLCJydW4iLCJkb2N1bWVudCIsInVwc2VydCIsIiRzZXQiLCJtZXRob2RzIiwibGltaXQiLCJ0aW1lUmFuZ2UiLCJBY2NvdW50cyIsImVtYWlsIiwiZnJvbSIsImVtYWlsVGVtcGxhdGVzIiwic2l0ZU5hbWUiLCJyZXNldFBhc3N3b3JkIiwic3ViamVjdCIsInRleHQiLCJ1c2VyIiwidXJsIiwidXNlckVtYWlsIiwiZW1haWxzIiwiYWRkcmVzcyIsInVybFdpdGhvdXRIYXNoIiwicmVwbGFjZSIsIkJyb3dzZXJQb2xpY3kiLCJjb250ZW50IiwiYWxsb3dGb250T3JpZ2luIiwiUm9sZXMiLCJpc1Byb2R1Y3Rpb24iLCJ1c2VycyIsInBhc3N3b3JkIiwicHJvZmlsZSIsImZpcnN0IiwibGFzdCIsInJvbGVzIiwiZm9yRWFjaCIsInVzZXJFeGlzdHMiLCJmaW5kT25lIiwidXNlcklkIiwiY3JlYXRlVXNlciIsImFkZFVzZXJzVG9Sb2xlcyIsIkREUFJhdGVMaW1pdGVyIiwiXyIsImZldGNoTWV0aG9kTmFtZXMiLCJwbHVjayIsImFzc2lnbkxpbWl0cyIsIm1ldGhvZE5hbWVzIiwiaXNTZXJ2ZXIiLCJhZGRSdWxlIiwiY29udGFpbnMiLCJjb25uZWN0aW9uSWQiLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUlBLE1BQUo7QUFBV0MsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDRixRQUFNLENBQUNHLENBQUQsRUFBRztBQUFDSCxVQUFNLEdBQUNHLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQ7QUFBcUQsSUFBSUMsS0FBSjtBQUFVSCxNQUFNLENBQUNDLElBQVAsQ0FBWSxjQUFaLEVBQTJCO0FBQUNFLE9BQUssQ0FBQ0QsQ0FBRCxFQUFHO0FBQUNDLFNBQUssR0FBQ0QsQ0FBTjtBQUFROztBQUFsQixDQUEzQixFQUErQyxDQUEvQztBQUFrRCxJQUFJRSxTQUFKO0FBQWNK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QUN6RSxDQUFELEVBQUc7QUFBQ3lFLGtCQUFjLEdBQUN6RSxDQUFmO0FBQWlCOztBQUFwQyxDQUF0QyxFQUE0RSxDQUE1RTs7QUFBK0UsSUFBSTBFLENBQUo7O0FBQU01RSxNQUFNLENBQUNDLElBQVAsQ0FBWSxtQkFBWixFQUFnQztBQUFDMkUsR0FBQyxDQUFDMUUsQ0FBRCxFQUFHO0FBQUMwRSxLQUFDLEdBQUMxRSxDQUFGO0FBQUk7O0FBQVYsQ0FBaEMsRUFBNEMsQ0FBNUM7O0FBSS9NLE1BQU0yRSxnQkFBZ0IsR0FBR3JDLE9BQU8sSUFBSW9DLENBQUMsQ0FBQ0UsS0FBRixDQUFRdEMsT0FBUixFQUFpQixNQUFqQixDQUFwQzs7QUFFQSxNQUFNdUMsWUFBWSxHQUFHLENBQUM7QUFBRXZDLFNBQUY7QUFBV0MsT0FBWDtBQUFrQkM7QUFBbEIsQ0FBRCxLQUFtQztBQUN0RCxRQUFNc0MsV0FBVyxHQUFHSCxnQkFBZ0IsQ0FBQ3JDLE9BQUQsQ0FBcEM7O0FBRUEsTUFBSXpDLE1BQU0sQ0FBQ2tGLFFBQVgsRUFBcUI7QUFDbkJOLGtCQUFjLENBQUNPLE9BQWYsQ0FBdUI7QUFDckJsRCxVQUFJLENBQUNBLElBQUQsRUFBTztBQUFFLGVBQU80QyxDQUFDLENBQUNPLFFBQUYsQ0FBV0gsV0FBWCxFQUF3QmhELElBQXhCLENBQVA7QUFBdUMsT0FEL0I7O0FBRXJCb0Qsa0JBQVksR0FBRztBQUFFLGVBQU8sSUFBUDtBQUFjOztBQUZWLEtBQXZCLEVBR0czQyxLQUhILEVBR1VDLFNBSFY7QUFJRDtBQUNGLENBVEQ7O0FBV2UsU0FBU1gsU0FBVCxDQUFtQnNELE9BQW5CLEVBQTRCO0FBQUUsU0FBT04sWUFBWSxDQUFDTSxPQUFELENBQW5CO0FBQStCLEM7Ozs7Ozs7Ozs7O0FDakI1RXJGLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaLEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tICdtZXRlb3IvY2hlY2snO1xuaW1wb3J0IERvY3VtZW50cyBmcm9tICcuLi9kb2N1bWVudHMnO1xuXG5NZXRlb3IucHVibGlzaCgnZG9jdW1lbnRzLmxpc3QnLCAoKSA9PiBEb2N1bWVudHMuZmluZCgpKTtcblxuTWV0ZW9yLnB1Ymxpc2goJ2RvY3VtZW50cy52aWV3JywgKF9pZCkgPT4ge1xuICBjaGVjayhfaWQsIFN0cmluZyk7XG4gIHJldHVybiBEb2N1bWVudHMuZmluZChfaWQpO1xufSk7XG4iLCJpbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5pbXBvcnQgU2ltcGxlU2NoZW1hIGZyb20gJ3NpbXBsLXNjaGVtYSc7XG5pbXBvcnQgeyBGYWN0b3J5IH0gZnJvbSAnbWV0ZW9yL2RidXJsZXM6ZmFjdG9yeSc7XG5cbmNvbnN0IERvY3VtZW50cyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdEb2N1bWVudHMnKTtcbmV4cG9ydCBkZWZhdWx0IERvY3VtZW50cztcblxuRG9jdW1lbnRzLmFsbG93KHtcbiAgaW5zZXJ0OiAoKSA9PiBmYWxzZSxcbiAgdXBkYXRlOiAoKSA9PiBmYWxzZSxcbiAgcmVtb3ZlOiAoKSA9PiBmYWxzZSxcbn0pO1xuXG5Eb2N1bWVudHMuZGVueSh7XG4gIGluc2VydDogKCkgPT4gdHJ1ZSxcbiAgdXBkYXRlOiAoKSA9PiB0cnVlLFxuICByZW1vdmU6ICgpID0+IHRydWUsXG59KTtcblxuRG9jdW1lbnRzLnNjaGVtYSA9IG5ldyBTaW1wbGVTY2hlbWEoe1xuICB0aXRsZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBsYWJlbDogJ1RoZSB0aXRsZSBvZiB0aGUgZG9jdW1lbnQuJyxcbiAgfSxcbiAgYm9keToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBsYWJlbDogJ1RoZSBib2R5IG9mIHRoZSBkb2N1bWVudC4nLFxuICB9LFxufSk7XG5cbkRvY3VtZW50cy5hdHRhY2hTY2hlbWEoRG9jdW1lbnRzLnNjaGVtYSk7XG5cbkZhY3RvcnkuZGVmaW5lKCdkb2N1bWVudCcsIERvY3VtZW50cywge1xuICB0aXRsZTogKCkgPT4gJ0ZhY3RvcnkgVGl0bGUnLFxuICBib2R5OiAoKSA9PiAnRmFjdG9yeSBCb2R5Jyxcbn0pO1xuIiwiaW1wb3J0IFNpbXBsZVNjaGVtYSBmcm9tICdzaW1wbC1zY2hlbWEnO1xuaW1wb3J0IHsgVmFsaWRhdGVkTWV0aG9kIH0gZnJvbSAnbWV0ZW9yL21kZzp2YWxpZGF0ZWQtbWV0aG9kJztcbmltcG9ydCBEb2N1bWVudHMgZnJvbSAnLi9kb2N1bWVudHMnO1xuaW1wb3J0IHJhdGVMaW1pdCBmcm9tICcuLi8uLi9tb2R1bGVzL3JhdGUtbGltaXQuanMnO1xuXG5leHBvcnQgY29uc3QgdXBzZXJ0RG9jdW1lbnQgPSBuZXcgVmFsaWRhdGVkTWV0aG9kKHtcbiAgbmFtZTogJ2RvY3VtZW50cy51cHNlcnQnLFxuICB2YWxpZGF0ZTogbmV3IFNpbXBsZVNjaGVtYSh7XG4gICAgX2lkOiB7IHR5cGU6IFN0cmluZywgb3B0aW9uYWw6IHRydWUgfSxcbiAgICB0aXRsZTogeyB0eXBlOiBTdHJpbmcsIG9wdGlvbmFsOiB0cnVlIH0sXG4gICAgYm9keTogeyB0eXBlOiBTdHJpbmcsIG9wdGlvbmFsOiB0cnVlIH0sXG4gIH0pLnZhbGlkYXRvcigpLFxuICBydW4oZG9jdW1lbnQpIHtcbiAgICByZXR1cm4gRG9jdW1lbnRzLnVwc2VydCh7IF9pZDogZG9jdW1lbnQuX2lkIH0sIHsgJHNldDogZG9jdW1lbnQgfSk7XG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZURvY3VtZW50ID0gbmV3IFZhbGlkYXRlZE1ldGhvZCh7XG4gIG5hbWU6ICdkb2N1bWVudHMucmVtb3ZlJyxcbiAgdmFsaWRhdGU6IG5ldyBTaW1wbGVTY2hlbWEoe1xuICAgIF9pZDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgfSkudmFsaWRhdG9yKCksXG4gIHJ1bih7IF9pZCB9KSB7XG4gICAgRG9jdW1lbnRzLnJlbW92ZShfaWQpO1xuICB9LFxufSk7XG5cbnJhdGVMaW1pdCh7XG4gIG1ldGhvZHM6IFtcbiAgICB1cHNlcnREb2N1bWVudCxcbiAgICByZW1vdmVEb2N1bWVudCxcbiAgXSxcbiAgbGltaXQ6IDUsXG4gIHRpbWVSYW5nZTogMTAwMCxcbn0pO1xuIiwiaW1wb3J0IHsgQWNjb3VudHMgfSBmcm9tICdtZXRlb3IvYWNjb3VudHMtYmFzZSc7XG5cbmNvbnN0IG5hbWUgPSAnQXBwbGljYXRpb24gTmFtZSc7XG5jb25zdCBlbWFpbCA9ICc8c3VwcG9ydEBhcHBsaWNhdGlvbi5jb20+JztcbmNvbnN0IGZyb20gPSBgJHtuYW1lfSAke2VtYWlsfWA7XG5jb25zdCBlbWFpbFRlbXBsYXRlcyA9IEFjY291bnRzLmVtYWlsVGVtcGxhdGVzO1xuXG5lbWFpbFRlbXBsYXRlcy5zaXRlTmFtZSA9IG5hbWU7XG5lbWFpbFRlbXBsYXRlcy5mcm9tID0gZnJvbTtcblxuZW1haWxUZW1wbGF0ZXMucmVzZXRQYXNzd29yZCA9IHtcbiAgc3ViamVjdCgpIHtcbiAgICByZXR1cm4gYFske25hbWV9XSBSZXNldCBZb3VyIFBhc3N3b3JkYDtcbiAgfSxcbiAgdGV4dCh1c2VyLCB1cmwpIHtcbiAgICBjb25zdCB1c2VyRW1haWwgPSB1c2VyLmVtYWlsc1swXS5hZGRyZXNzO1xuICAgIGNvbnN0IHVybFdpdGhvdXRIYXNoID0gdXJsLnJlcGxhY2UoJyMvJywgJycpO1xuXG4gICAgcmV0dXJuIGBBIHBhc3N3b3JkIHJlc2V0IGhhcyBiZWVuIHJlcXVlc3RlZCBmb3IgdGhlIGFjY291bnQgcmVsYXRlZCB0byB0aGlzXG4gICAgYWRkcmVzcyAoJHt1c2VyRW1haWx9KS4gVG8gcmVzZXQgdGhlIHBhc3N3b3JkLCB2aXNpdCB0aGUgZm9sbG93aW5nIGxpbms6XG4gICAgXFxuXFxuJHt1cmxXaXRob3V0SGFzaH1cXG5cXG4gSWYgeW91IGRpZCBub3QgcmVxdWVzdCB0aGlzIHJlc2V0LCBwbGVhc2UgaWdub3JlXG4gICAgdGhpcyBlbWFpbC4gSWYgeW91IGZlZWwgc29tZXRoaW5nIGlzIHdyb25nLCBwbGVhc2UgY29udGFjdCBvdXIgc3VwcG9ydCB0ZWFtOlxuICAgICR7ZW1haWx9LmA7XG4gIH0sXG59O1xuIiwiaW1wb3J0ICcuLi8uLi9hcGkvZG9jdW1lbnRzL21ldGhvZHMuanMnO1xuaW1wb3J0ICcuLi8uLi9hcGkvZG9jdW1lbnRzL3NlcnZlci9wdWJsaWNhdGlvbnMuanMnO1xuIiwiaW1wb3J0IHsgQnJvd3NlclBvbGljeSB9IGZyb20gJ21ldGVvci9icm93c2VyLXBvbGljeS1jb21tb24nO1xuLy8gZS5nLiwgQnJvd3NlclBvbGljeS5jb250ZW50LmFsbG93T3JpZ2luRm9yQWxsKCAnczMuYW1hem9uYXdzLmNvbScgKTtcbkJyb3dzZXJQb2xpY3kuY29udGVudC5hbGxvd0ZvbnRPcmlnaW4oXCJkYXRhOlwiKTtcbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICdtZXRlb3IvYWxhbm5pbmc6cm9sZXMnO1xuaW1wb3J0IHsgQWNjb3VudHMgfSBmcm9tICdtZXRlb3IvYWNjb3VudHMtYmFzZSc7XG5cbmlmICghTWV0ZW9yLmlzUHJvZHVjdGlvbikge1xuICBjb25zdCB1c2VycyA9IFt7XG4gICAgZW1haWw6ICdhZG1pbkBhZG1pbi5jb20nLFxuICAgIHBhc3N3b3JkOiAncGFzc3dvcmQnLFxuICAgIHByb2ZpbGU6IHtcbiAgICAgIG5hbWU6IHsgZmlyc3Q6ICdDYXJsJywgbGFzdDogJ1dpbnNsb3cnIH0sXG4gICAgfSxcbiAgICByb2xlczogWydhZG1pbiddLFxuICB9XTtcblxuICB1c2Vycy5mb3JFYWNoKCh7IGVtYWlsLCBwYXNzd29yZCwgcHJvZmlsZSwgcm9sZXMgfSkgPT4ge1xuICAgIGNvbnN0IHVzZXJFeGlzdHMgPSBNZXRlb3IudXNlcnMuZmluZE9uZSh7ICdlbWFpbHMuYWRkcmVzcyc6IGVtYWlsIH0pO1xuXG4gICAgaWYgKCF1c2VyRXhpc3RzKSB7XG4gICAgICBjb25zdCB1c2VySWQgPSBBY2NvdW50cy5jcmVhdGVVc2VyKHsgZW1haWwsIHBhc3N3b3JkLCBwcm9maWxlIH0pO1xuICAgICAgUm9sZXMuYWRkVXNlcnNUb1JvbGVzKHVzZXJJZCwgcm9sZXMpO1xuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQgJy4vYWNjb3VudHMvZW1haWwtdGVtcGxhdGVzJztcbmltcG9ydCAnLi9icm93c2VyLXBvbGljeSc7XG5pbXBvcnQgJy4vZml4dHVyZXMnO1xuaW1wb3J0ICcuL2FwaSc7XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7IEREUFJhdGVMaW1pdGVyIH0gZnJvbSAnbWV0ZW9yL2RkcC1yYXRlLWxpbWl0ZXInO1xuaW1wb3J0IHsgXyB9IGZyb20gJ21ldGVvci91bmRlcnNjb3JlJztcblxuY29uc3QgZmV0Y2hNZXRob2ROYW1lcyA9IG1ldGhvZHMgPT4gXy5wbHVjayhtZXRob2RzLCAnbmFtZScpO1xuXG5jb25zdCBhc3NpZ25MaW1pdHMgPSAoeyBtZXRob2RzLCBsaW1pdCwgdGltZVJhbmdlIH0pID0+IHtcbiAgY29uc3QgbWV0aG9kTmFtZXMgPSBmZXRjaE1ldGhvZE5hbWVzKG1ldGhvZHMpO1xuXG4gIGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcbiAgICBERFBSYXRlTGltaXRlci5hZGRSdWxlKHtcbiAgICAgIG5hbWUobmFtZSkgeyByZXR1cm4gXy5jb250YWlucyhtZXRob2ROYW1lcywgbmFtZSk7IH0sXG4gICAgICBjb25uZWN0aW9uSWQoKSB7IHJldHVybiB0cnVlOyB9LFxuICAgIH0sIGxpbWl0LCB0aW1lUmFuZ2UpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYXRlTGltaXQob3B0aW9ucykgeyByZXR1cm4gYXNzaWduTGltaXRzKG9wdGlvbnMpOyB9XG4iLCJpbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyJztcbiJdfQ==
