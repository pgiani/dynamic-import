(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var check = Package.check.check;
var Match = Package.check.Match;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"xolvio:backdoor":{"server.js":function(require){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/xolvio_backdoor/server.js                                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
/* globals meteorInstall: false */
var vm = Npm.require('vm');

Meteor.methods({
  'xolvio/backdoor': function (func, args) {
    check(func, String);
    check(args, Match.Optional(Array));

    try {
      const preparedFunc = vm.runInThisContext('(function (require) { return (' + func + '); })').call(null, meteorInstall());
      return {
        value: preparedFunc.apply(global, args)
      };
    } catch (error) {
      return {
        error: {
          message: error.toString(),
          stack: error.stack ? error.stack.toString() : '',
          code: func
        }
      };
    }
  }
});
///////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/xolvio:backdoor/server.js");

/* Exports */
Package._define("xolvio:backdoor");

})();

//# sourceURL=meteor://💻app/packages/xolvio_backdoor.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMveG9sdmlvOmJhY2tkb29yL3NlcnZlci5qcyJdLCJuYW1lcyI6WyJ2bSIsIk5wbSIsInJlcXVpcmUiLCJNZXRlb3IiLCJtZXRob2RzIiwiZnVuYyIsImFyZ3MiLCJjaGVjayIsIlN0cmluZyIsIk1hdGNoIiwiT3B0aW9uYWwiLCJBcnJheSIsInByZXBhcmVkRnVuYyIsInJ1bkluVGhpc0NvbnRleHQiLCJjYWxsIiwibWV0ZW9ySW5zdGFsbCIsInZhbHVlIiwiYXBwbHkiLCJnbG9iYWwiLCJlcnJvciIsIm1lc3NhZ2UiLCJ0b1N0cmluZyIsInN0YWNrIiwiY29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxJQUFJQSxFQUFFLEdBQUdDLEdBQUcsQ0FBQ0MsT0FBSixDQUFZLElBQVosQ0FBVDs7QUFFQUMsTUFBTSxDQUFDQyxPQUFQLENBQWU7QUFDYixxQkFBbUIsVUFBVUMsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDdkNDLFNBQUssQ0FBQ0YsSUFBRCxFQUFPRyxNQUFQLENBQUw7QUFDQUQsU0FBSyxDQUFDRCxJQUFELEVBQU9HLEtBQUssQ0FBQ0MsUUFBTixDQUFlQyxLQUFmLENBQVAsQ0FBTDs7QUFFQSxRQUFJO0FBQ0YsWUFBTUMsWUFBWSxHQUFHWixFQUFFLENBQUNhLGdCQUFILENBQ25CLG1DQUFtQ1IsSUFBbkMsR0FBMEMsT0FEdkIsRUFFbkJTLElBRm1CLENBRWQsSUFGYyxFQUVSQyxhQUFhLEVBRkwsQ0FBckI7QUFHQSxhQUFPO0FBQ0xDLGFBQUssRUFBRUosWUFBWSxDQUFDSyxLQUFiLENBQW1CQyxNQUFuQixFQUEyQlosSUFBM0I7QUFERixPQUFQO0FBR0QsS0FQRCxDQU9FLE9BQU9hLEtBQVAsRUFBYztBQUNkLGFBQU87QUFDTEEsYUFBSyxFQUFFO0FBQ0xDLGlCQUFPLEVBQUVELEtBQUssQ0FBQ0UsUUFBTixFQURKO0FBRUxDLGVBQUssRUFBRUgsS0FBSyxDQUFDRyxLQUFOLEdBQWNILEtBQUssQ0FBQ0csS0FBTixDQUFZRCxRQUFaLEVBQWQsR0FBdUMsRUFGekM7QUFHTEUsY0FBSSxFQUFFbEI7QUFIRDtBQURGLE9BQVA7QUFPRDtBQUNGO0FBckJZLENBQWYsRSIsImZpbGUiOiIvcGFja2FnZXMveG9sdmlvX2JhY2tkb29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFscyBtZXRlb3JJbnN0YWxsOiBmYWxzZSAqL1xuXG52YXIgdm0gPSBOcG0ucmVxdWlyZSgndm0nKTtcblxuTWV0ZW9yLm1ldGhvZHMoe1xuICAneG9sdmlvL2JhY2tkb29yJzogZnVuY3Rpb24gKGZ1bmMsIGFyZ3MpIHtcbiAgICBjaGVjayhmdW5jLCBTdHJpbmcpO1xuICAgIGNoZWNrKGFyZ3MsIE1hdGNoLk9wdGlvbmFsKEFycmF5KSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJlcGFyZWRGdW5jID0gdm0ucnVuSW5UaGlzQ29udGV4dChcbiAgICAgICAgJyhmdW5jdGlvbiAocmVxdWlyZSkgeyByZXR1cm4gKCcgKyBmdW5jICsgJyk7IH0pJ1xuICAgICAgKS5jYWxsKG51bGwsIG1ldGVvckluc3RhbGwoKSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogcHJlcGFyZWRGdW5jLmFwcGx5KGdsb2JhbCwgYXJncylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IudG9TdHJpbmcoKSxcbiAgICAgICAgICBzdGFjazogZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjay50b1N0cmluZygpIDogJycsXG4gICAgICAgICAgY29kZTogZnVuY1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfVxufSk7XG4iXX0=
