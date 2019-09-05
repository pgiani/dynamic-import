(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var check = Package.check.check;
var Match = Package.check.Match;
var meteorInstall = Package.modules.meteorInstall;
var process = Package.modules.process;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"xolvio:backdoor":{"server.js":function(require){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/xolvio_backdoor/server.js                                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
/* globals meteorInstall: false */var vm = Npm.require('vm');        // 1
                                                                     //
Meteor.methods({                                                     // 5
  'xolvio/backdoor': function (func, args) {                         // 6
    check(func, String);                                             // 7
    check(args, Match.Optional(Array));                              // 8
                                                                     //
    try {                                                            // 10
      var preparedFunc = vm.runInThisContext('(function (require) { return (' + func + '); })').call(null, meteorInstall());
      return {                                                       // 14
        value: preparedFunc.apply(global, args)                      // 15
      };                                                             // 14
    } catch (error) {                                                // 17
      return {                                                       // 18
        error: {                                                     // 19
          message: error.toString(),                                 // 20
          stack: error.stack ? error.stack.toString() : '',          // 21
          code: func                                                 // 22
        }                                                            // 19
      };                                                             // 18
    }                                                                // 25
  }                                                                  // 26
});                                                                  // 5
///////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/xolvio:backdoor/server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['xolvio:backdoor'] = {};

})();

//# sourceMappingURL=xolvio_backdoor.js.map
