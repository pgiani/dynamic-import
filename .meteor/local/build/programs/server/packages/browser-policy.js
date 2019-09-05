(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var meteorInstall = Package.modules.meteorInstall;
var process = Package.modules.process;
var BrowserPolicy = Package['browser-policy-common'].BrowserPolicy;

var require = meteorInstall({"node_modules":{"meteor":{"browser-policy":{"browser-policy.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/browser-policy/browser-policy.js                                   //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
exports.BrowserPolicy = require("meteor/browser-policy-common").BrowserPolicy;

/////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("./node_modules/meteor/browser-policy/browser-policy.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['browser-policy'] = exports;

})();
