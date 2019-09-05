//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;
var fetch = Package.fetch.fetch;

var require = meteorInstall({"node_modules":{"meteor":{"dynamic-import":{"client.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/dynamic-import/client.js                                           //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
var Module = module.constructor;
var cache = require("./cache.js");
var meteorInstall = require("meteor/modules").meteorInstall;

// Call module.dynamicImport(id) to fetch a module and any/all of its
// dependencies that have not already been fetched, and evaluate them as
// soon as they arrive. This runtime API makes it very easy to implement
// ECMAScript dynamic import(...) syntax.
Module.prototype.dynamicImport = function (id) {
  var module = this;
  return module.prefetch(id).then(function () {
    return getNamespace(module, id);
  });
};

// Called by Module.prototype.prefetch if there are any missing dynamic
// modules that need to be fetched.
meteorInstall.fetch = function (ids) {
  var tree = Object.create(null);
  var versions = Object.create(null);
  var dynamicVersions = require("./dynamic-versions.js");
  var missing;

  function addSource(id, source) {
    addToTree(tree, id, makeModuleFunction(id, source, ids[id].options));
  }

  function addMissing(id) {
    addToTree(missing = missing || Object.create(null), id, 1);
  }

  Object.keys(ids).forEach(function (id) {
    var version = dynamicVersions.get(id);
    if (version) {
      versions[id] = version;
    } else {
      addMissing(id);
    }
  });

  return cache.checkMany(versions).then(function (sources) {
    Object.keys(sources).forEach(function (id) {
      var source = sources[id];
      if (source) {
        addSource(id, source);
      } else {
        addMissing(id);
      }
    });

    return missing && fetchMissing(missing).then(function (results) {
      var versionsAndSourcesById = Object.create(null);
      var flatResults = flattenModuleTree(results);

      Object.keys(flatResults).forEach(function (id) {
        var source = flatResults[id];
        addSource(id, source);

        var version = dynamicVersions.get(id);
        if (version) {
          versionsAndSourcesById[id] = {
            version: version,
            source: source
          };
        }
      });

      cache.setMany(versionsAndSourcesById);
    });

  }).then(function () {
    return tree;
  });
};

function flattenModuleTree(tree) {
  var parts = [""];
  var result = Object.create(null);

  function walk(t) {
    if (t && typeof t === "object") {
      Object.keys(t).forEach(function (key) {
        parts.push(key);
        walk(t[key]);
        parts.pop();
      });
    } else if (typeof t === "string") {
      result[parts.join("/")] = t;
    }
  }

  walk(tree);

  return result;
}

function makeModuleFunction(id, source, options) {
  // By calling (options && options.eval || eval) in a wrapper function,
  // we delay the cost of parsing and evaluating the module code until the
  // module is first imported.
  return function () {
    // If an options.eval function was provided in the second argument to
    // meteorInstall when this bundle was first installed, use that
    // function to parse and evaluate the dynamic module code in the scope
    // of the package. Otherwise fall back to indirect (global) eval.
    return (options && options.eval || eval)(
      // Wrap the function(require,exports,module){...} expression in
      // parentheses to force it to be parsed as an expression.
      "(" + source + ")\n//# sourceURL=" + id
    ).apply(this, arguments);
  };
}

var secretKey = null;
exports.setSecretKey = function (key) {
  secretKey = key;
};

var fetchURL = require("./common.js").fetchURL;

function fetchMissing(missingTree) {
  // If the hostname of the URL returned by Meteor.absoluteUrl differs
  // from location.host, then we'll be making a cross-origin request here,
  // but that's fine because the dynamic-import server sets appropriate
  // CORS headers to enable fetching dynamic modules from any
  // origin. Browsers that check CORS do so by sending an additional
  // preflight OPTIONS request, which may add latency to the first dynamic
  // import() request, so it's a good idea for ROOT_URL to match
  // location.host if possible, though not strictly necessary.
  var url = Meteor.absoluteUrl(fetchURL);

  if (secretKey) {
    url += "key=" + secretKey;
  }

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(missingTree)
  }).then(function (res) {
    if (! res.ok) throw res;
    return res.json();
  });
}

function addToTree(tree, id, value) {
  var parts = id.split("/");
  var lastIndex = parts.length - 1;
  parts.forEach(function (part, i) {
    if (part) {
      tree = tree[part] = tree[part] ||
        (i < lastIndex ? Object.create(null) : value);
    }
  });
}

function getNamespace(module, id) {
  var namespace;

  module.link(id, {
    "*": function (ns) {
      namespace = ns;
    }
  });

  // This helps with Babel interop, since we're not just returning the
  // module.exports object.
  Object.defineProperty(namespace, "__esModule", {
    value: true,
    enumerable: false
  });

  return namespace;
}

/////////////////////////////////////////////////////////////////////////////////

},"cache.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/dynamic-import/cache.js                                            //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
var dbPromise;

var canUseCache =
  // The server doesn't benefit from dynamic module fetching, and almost
  // certainly doesn't support IndexedDB.
  Meteor.isClient &&
  // Cordova bundles all modules into the monolithic initial bundle, so
  // the dynamic module cache won't be necessary.
  ! Meteor.isCordova &&
  // Caching can be confusing in development, and is designed to be a
  // transparent optimization for production performance.
  Meteor.isProduction;

function getIDB() {
  if (typeof indexedDB !== "undefined") return indexedDB;
  if (typeof webkitIndexedDB !== "undefined") return webkitIndexedDB;
  if (typeof mozIndexedDB !== "undefined") return mozIndexedDB;
  if (typeof OIndexedDB !== "undefined") return OIndexedDB;
  if (typeof msIndexedDB !== "undefined") return msIndexedDB;
}

function withDB(callback) {
  dbPromise = dbPromise || new Promise(function (resolve, reject) {
    var idb = getIDB();
    if (! idb) {
      throw new Error("IndexedDB not available");
    }

    // Incrementing the version number causes all existing object stores
    // to be deleted and recreates those specified by objectStoreMap.
    var request = idb.open("MeteorDynamicImportCache", 2);

    request.onupgradeneeded = function (event) {
      var db = event.target.result;

      // It's fine to delete existing object stores since onupgradeneeded
      // is only called when we change the DB version number, and the data
      // we're storing is disposable/reconstructible.
      Array.from(db.objectStoreNames).forEach(db.deleteObjectStore, db);

      Object.keys(objectStoreMap).forEach(function (name) {
        db.createObjectStore(name, objectStoreMap[name]);
      });
    };

    request.onerror = makeOnError(reject, "indexedDB.open");
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
  });

  return dbPromise.then(callback, function (error) {
    return callback(null);
  });
}

var objectStoreMap = {
  sourcesByVersion: { keyPath: "version" }
};

function makeOnError(reject, source) {
  return function (event) {
    reject(new Error(
      "IndexedDB failure in " + source + " " +
        JSON.stringify(event.target)
    ));

    // Returning true from an onerror callback function prevents an
    // InvalidStateError in Firefox during Private Browsing. Silencing
    // that error is safe because we handle the error more gracefully by
    // passing it to the Promise reject function above.
    // https://github.com/meteor/meteor/issues/8697
    return true;
  };
}

var checkCount = 0;

exports.checkMany = function (versions) {
  var ids = Object.keys(versions);
  var sourcesById = Object.create(null);

  // Initialize sourcesById with null values to indicate all sources are
  // missing (unless replaced with actual sources below).
  ids.forEach(function (id) {
    sourcesById[id] = null;
  });

  if (! canUseCache) {
    return Promise.resolve(sourcesById);
  }

  return withDB(function (db) {
    if (! db) {
      // We thought we could used IndexedDB, but something went wrong
      // while opening the database, so err on the side of safety.
      return sourcesById;
    }

    var txn = db.transaction([
      "sourcesByVersion"
    ], "readonly");

    var sourcesByVersion = txn.objectStore("sourcesByVersion");

    ++checkCount;

    function finish() {
      --checkCount;
      return sourcesById;
    }

    return Promise.all(ids.map(function (id) {
      return new Promise(function (resolve, reject) {
        var version = versions[id];
        if (version) {
          var sourceRequest = sourcesByVersion.get(version);
          sourceRequest.onerror = makeOnError(reject, "sourcesByVersion.get");
          sourceRequest.onsuccess = function (event) {
            var result = event.target.result;
            if (result) {
              sourcesById[id] = result.source;
            }
            resolve();
          };
        } else resolve();
      });
    })).then(finish, finish);
  });
};

var pendingVersionsAndSourcesById = Object.create(null);

exports.setMany = function (versionsAndSourcesById) {
  if (canUseCache) {
    Object.assign(
      pendingVersionsAndSourcesById,
      versionsAndSourcesById
    );

    // Delay the call to flushSetMany so that it doesn't contribute to the
    // amount of time it takes to call module.dynamicImport.
    if (! flushSetMany.timer) {
      flushSetMany.timer = setTimeout(flushSetMany, 100);
    }
  }
};

function flushSetMany() {
  if (checkCount > 0) {
    // If checkMany is currently underway, postpone the flush until later,
    // since updating the cache is less important than reading from it.
    return flushSetMany.timer = setTimeout(flushSetMany, 100);
  }

  flushSetMany.timer = null;

  var versionsAndSourcesById = pendingVersionsAndSourcesById;
  pendingVersionsAndSourcesById = Object.create(null);

  return withDB(function (db) {
    if (! db) {
      // We thought we could used IndexedDB, but something went wrong
      // while opening the database, so err on the side of safety.
      return;
    }

    var setTxn = db.transaction([
      "sourcesByVersion"
    ], "readwrite");

    var sourcesByVersion = setTxn.objectStore("sourcesByVersion");

    return Promise.all(
      Object.keys(versionsAndSourcesById).map(function (id) {
        var info = versionsAndSourcesById[id];
        return new Promise(function (resolve, reject) {
          var request = sourcesByVersion.put({
            version: info.version,
            source: info.source
          });
          request.onerror = makeOnError(reject, "sourcesByVersion.put");
          request.onsuccess = resolve;
        });
      })
    );
  });
}

/////////////////////////////////////////////////////////////////////////////////

},"common.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/dynamic-import/common.js                                           //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
exports.fetchURL = "/__meteor__/dynamic-import/fetch";

/////////////////////////////////////////////////////////////////////////////////

},"dynamic-versions.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/dynamic-import/dynamic-versions.js                                 //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
// This magic double-underscored identifier gets replaced in
// tools/isobuild/bundler.js with a tree of hashes of all dynamic
// modules, for use in client.js and cache.js.
var versions = {"node_modules":{"react-dates":{"lib":{"css":{"_datepicker.css":"0837a81e0f469e1fdb3322742952346af2f41d38"},"components":{"DateRangePicker.js":"7b86e1491f271a190cbcd1ee0c9b064774762bc1","OutsideClickHandler.js":"cbc1c69e36c04598b46d4b4e2bc653536c6a0463","DateRangePickerInputController.js":"97e7ebfcaeb93024a6d98aee408aeac3332abf35","DateRangePickerInput.js":"1c71854abc9ee379bff6e17722d6eddc0b49148c","DateInput.js":"5ab2cd4ad3a9f336441622eeb2248615ca93b7b5","DayPickerRangeController.js":"319757219631a907c4bb1d40199e6697308d7a04","DayPicker.js":"b979dbc7420954fd884deba903f74374fc8546ab","CalendarMonthGrid.js":"c4478d4eec6ffcee1ff6dbcefde2bf60199e5dd6","CalendarMonth.js":"c0706456e657b840d6bc01b49dac718d5b9889ca","CalendarDay.js":"d4951c97f8f5757a352f4804fe60088c050a898a","DayPickerKeyboardShortcuts.js":"4fb79ee0fc10e094eb7961baf4383efb16f7fcb7","DayPickerNavigation.js":"a3d3a477041c77e8a566f1722ecf6a8bdf0f9680","SingleDatePicker.js":"992f791201953d9465eee90e487f7e93fbaa5cc9","DayPickerSingleDateController.js":"4a109a1807c1a613051e14b4cbe9087ee1999533","SingleDatePickerInput.js":"a041a0c0e5f4f4d683645ad90dc12550a383fb6a"},"defaultPhrases.js":"5e84bb2cea39ee30fa9a9ca94ac9cf886913aec5","utils":{"isInclusivelyAfterDay.js":"891608d123d1c8cede28da7c69dfba877d9271a6","isBeforeDay.js":"bd7e954cf6295a2228ea5cec43965488888eda2c","getResponsiveContainerStyles.js":"170eb0c7b723f0cc0228df8efd2495e281078103","getPhrasePropTypes.js":"c48a7975559c284092d02a18b943d9428e18a073","toISODateString.js":"206633b42cbf4748ee817702f452aa453cfb2dc8","toMomentObject.js":"7dc65a5a2044e58963dcb59032a178dbf5ed06b8","toLocalizedDateString.js":"45c095616f42cd4ef9b74b08841ac23446c6b349","isAfterDay.js":"fa57cd3de82a57f84210fb5df045a1e784f91ce8","isSameDay.js":"5f76495192f419ade672d714f6c4ad44b161f79e","isDayVisible.js":"1de2f2113b7bff8e75c45ea7bca8eff46acefb2b","toISOMonthString.js":"12bf32955f8769d6ec89ea433ae92a4354af8898","getVisibleDays.js":"a79f4e0d85f3f6cfa6c713b654d5889d6494d704","getCalendarMonthWidth.js":"1cbe2a834347abbc8f0c98c1ffde1c1571d1b235","getTransformStyles.js":"445218c58f8d9d65b4e786f63f11b78be15b9865","getActiveElement.js":"4fae77c27b2be2345b426f5135586a3674b93af3","isTransitionEndSupported.js":"91668096136d098ae6e9f3e93062e9d2861f7fbc","getCalendarMonthWeeks.js":"5b071058b2e2b8405ecd2aaefae361375606c880","getPhrase.js":"10217cf642db79e8b4dffadb1ad577dd41b0d8c4","isNextDay.js":"2bed4895a4292b53b70e09c7cc6e6e2cb2f9e91c","isInclusivelyBeforeDay.js":"aa235773bc8484682fd95618dcf70317cc9a08f6"},"shapes":{"DateRangePickerShape.js":"475eb6e0102531d298123ddbea276553d55dde83","FocusedInputShape.js":"3fe7acbb3b81152ffa9db7e98056f9a01a438e1c","IconPositionShape.js":"75ef44372334b8587aa2ff0e0f32bee895a616e6","OrientationShape.js":"f1cc4996fc3d4ae39897cdb026b8ad0c863594fd","AnchorDirectionShape.js":"61586e45828c5269161ed17504253474d3ec00f0","OpenDirectionShape.js":"e9ad854942232a7ef913d2c1c162393e92a969f8","DayOfWeekShape.js":"daace32c92287629c2eb4083af50ee4ef545f499","ScrollableOrientationShape.js":"e0f89435355558ca645285c087a3fcf46565b5f9","SingleDatePickerShape.js":"e380b9d4ebef2fccd193a9adc8468aae9522a39b"}},"package.json":"c3b6492752bfc574b919e6af4a2a50e4e51ede65","index.js":"a15349b9814456031fbe08af2030bbd67a343435","constants.js":"f865f5b8a8bde2c548b03749515ca8b5727b4dca"},"airbnb-prop-types":{"package.json":"85e1c3ed32b826225bfe3f68aa4ceece7e7a88ae","index.js":"4630363d03dc0f084d3f6427d86da3fe6d442182","build":{"mocks":{"index.js":"ac5f49a8df93607b928359843f9bf131c746eb2e"},"index.js":"b37fc4329c3aa280aa31d60d1379b0ba9c7cc262","and.js":"9d907dfb329cfa6c3825f2d5bb38033edc9f16aa","helpers":{"wrapValidator.js":"04dae8bb35484fd61cc2eeb22ce9aa72d59851d8","isPlainObject.js":"4438e90aa5466c9af54dfe0a0b7c7490c55a6574","isPrimitive.js":"261cef9a0f1b775c2fee4120c4dc969be1828f60","renderableChildren.js":"8e46eb28a2dd1fcdd98ab984abbf66c98b998a72","getComponentName.js":"2fae9c94b4b053ce6ac1872cd96d2664f8def2db","isInteger.js":"330e9f90456c31b677878a6e351cb6f9e8c0c44b","typeOf.js":"30e4d81a05671cd729a1a1d471cf08c684de94b8"},"between.js":"9c50ce113cc92e5e3b7e6116b23cd9d76b875a86","shape.js":"2ab1b084657019793277a2387bba39e8e0954d24","valuesOf.js":"a43541943fd42919611db08e2b9c5989f4a67f45","booleanSome.js":"ceda5896a8ae178ac8adf88186b0a6e2a3d36cb1","childrenHavePropXorChildren.js":"d0e583266cd7e6e0ef3208067de1f7074235d5a7","childrenOf.js":"154effdec4be3bb4d0843f1dd03a854d3cc59113","childrenOfType.js":"36a75eacde1d96dee5e831d2833c63890bbe58a4","childrenSequenceOf.js":"1feec9fe833a18af3d0eafa68bf4950c0ae2e2fc","sequenceOf.js":"14c47983e40677600ccc71a578beec17e38c70e4","nonNegativeInteger.js":"9de209174dc6af80bf2a511f7494cc9b3b8171f8","integer.js":"58168abd2989ace3e14fc4cc0fadb82c73754479","nonNegativeNumber.js":"8313a8312873d53d243e2a0f1c350357ea519c4a","object.js":"26f725fb7ce2b4d45c8740c70dd1ad3ab7fd4d73","withShape.js":"44372b684fad6ac55a79e46c0dc3efe4a1e59758","componentWithName.js":"2c5d35f4ac23feb0552e53b3863594ab7244ee8b","disallowedIf.js":"f1ad18ae308827bc16955ddf5d42800ca38c95c0","elementType.js":"ec45be07eee9a6914ebdde87b21f55cb7b4f57bc","empty.js":"23dcdb4b7704b23a02428c3abd6ab09f3b37f8a4","or.js":"700a24796b9831c5c6c23bc0f921c68cd47f9c8e","explicitNull.js":"ddaf2d09a07024cd656e83a7ec6f1d7d4f9a6e2e","keysOf.js":"86e4d04ee649f4fca489eb6de0fff01d1dd0fc5a","mutuallyExclusiveProps.js":"4860ba5a366b285919d21a8b1a4cdf029e15f701","mutuallyExclusiveTrueProps.js":"ac203ebffae1dad4053adc3822f0c3dccf5f012b","nChildren.js":"4ca9d748361dfeeb43369167e8cdb5ce485dee41","numericString.js":"10b8ea8f710e1cbb7af8d7e5e810107da19d900b","range.js":"d60d30e22857234d208611e0365135b2c0913312","ref.js":"a38b57fdaf6a98e3e8fe2a27da7b2992dd256514","requiredBy.js":"955300df563d4f69ec99dc51749e0d226f829e77","restrictedProp.js":"08aa22713f90159e63a6ab398e114146b842cab6","stringEndsWith.js":"b4b4ffd7cbe0cccadbbafae6bd52f0eb2f78c11f","stringStartsWith.js":"c0034d1da4788bd9242b1fcd5c0651eb031ae457","uniqueArray.js":"6431e1e4a1e08b5dde9c5d1203219d1e04aa0cbc","uniqueArrayOf.js":"aa3afe784a89ba2fe37783b0a4db9a0d85988949"}},"prop-types-exact":{"package.json":"556ca65a5d70c14d454c4e52bec2ca1697019a04","build":{"index.js":"aaec327ce549d0ab585ca58420e09844b0d75ad2","helpers":{"isPlainObject.js":"bb9f9aac3aef28efd43f2f14262e0a3179ef3725"}}},"object.assign":{"package.json":"db9131e17d74afd39e406632041b97686349fdec","index.js":"9f706693e58888072e8aef73685e1818482b0937","implementation.js":"0e49d46a17a57516bbe5ee5af138dca92c13747d","polyfill.js":"3f496c434bf06f70e0798c7e88e391e33e607e4c","shim.js":"d5d843abc6c911bd14db7bf0dbaa8a25f10882d7"},"define-properties":{"package.json":"957f655d33863f423145e85f813a64daf11c5fda","index.js":"ddf8efabfacde5e44127ed5fe94f237dcecf7f6c"},"object-keys":{"package.json":"fe2d571c868491c31e9198cb3060e7437d2f6c21","index.js":"fb47601919d415400bbecec0f92c93fb899c016e","isArguments.js":"3a5ec8f1c443c4999ce34c34b23113f940ad5462","implementation.js":"5fff82af853eaaf328af1c3a93033c4612efb114"},"function-bind":{"package.json":"a33591ddd09eeeac55e62f3cd93dddb5fe0fd2f7","index.js":"c3e280060734e4c91d6bf4a00ffa6abcaca49d6d","implementation.js":"62e1ab13a5e220236e2433fefb5bbebe384dbad0"},"has-symbols":{"shams.js":"547947162a87772746a85a9b203bfe1b84f99c8b","package.json":"ae66ce86c4326118c8d88a60b7b79e86dfac0b67","index.js":"659728c19fad03d61220ee8d848890e1a0eab029"},"has":{"package.json":"b05b49fb57587b1eb3b2e3f9a77e60c768cd880f","src":{"index.js":"13045addb0ee59e11dfd329b71a74b06131b36f9"}},"object.entries":{"package.json":"637f7cf5acdb78885c4795de4be3e70a14c24b7d","index.js":"6809f6fc6df4e2d941da0bcad01b5ea2ff4427f9","implementation.js":"70b1228135e4c3cef8f0b9dbb9a60da11eae886a","polyfill.js":"76834150df39274fca4e85d5c5c226ba9d3d0982","shim.js":"a50275162c24c2ee2c4b500c9d1ac6c070592ccc"},"es-abstract":{"es7.js":"6660ba814e87aeb16e8a05585ad2d30f3d08be2d","es2016.js":"6f38696b7f724c563006526e016a07cee3a4141f","GetIntrinsic.js":"39460eefd515c6db585368f8ba22f9b7562ada96","es2015.js":"c25787a5407dd06768a6727feb4afae81b6688c9","helpers":{"assertRecord.js":"d40775030f288e6fe13695102945e843b8a96114","isNaN.js":"eae5ac822b9ef4ff154d13532c72411c56ad2b10","isFinite.js":"797d5516e847a2168ffa3b781b55b8ee28a4eb67","assign.js":"a8a4aca20eb69b6abc43cfcb96c7717fbe032f1c","sign.js":"96dc3ef9b9befde4aba03e00b28099bb76df6d35","mod.js":"cb8b98ba3c5ea1e6c805248fdf74ba9a361c3949","isPrimitive.js":"b5f85470e75abd42a24b08fb8a0046ac6f7307f2","forEach.js":"e9a8310f5d8ab46062b4b8db492ccdede8ae9d45","every.js":"68ba9764ac551bc79892be2e3652348de985d0c0","isSamePropertyDescriptor.js":"0ef4d0832529f459abc004c99e566d02da24ef57","isPropertyDescriptor.js":"03cd8b15fc822f6896621775d00ad52c28098926","callBind.js":"8797a6680f52a7a83f5145b36b886523ec11aea2"},"es5.js":"b1173a6b5793407595328c7eaaabc6ab8609b0cc","es6.js":"6d07aaf52646319c414927c2a5a3ae8861e6bbae"},"es-to-primitive":{"es6.js":"303331a6a84246ad32f9c4fabf8843f015694993","es2015.js":"338d3b34a4d6fdedb3c1b7cfc204aaecea38e8a1","helpers":{"isPrimitive.js":"2a75456cde6ba020f1c344c67c0b23d5c465bb23"},"es5.js":"3223b2f0ca5f8619d00424cb7c6a401d3cecd97a"},"is-callable":{"package.json":"dcc07cc3e402db5e755e37b9b834b7e6734909ad","index.js":"7f75ff62a52b37edefce94f3ebf2859305154606"},"is-date-object":{"package.json":"6f8d07b51123b862ef8ea2fefd3bb15eca67627c","index.js":"c125d0010b63b51e906492e3555dc7e6b4058919"},"is-symbol":{"package.json":"3b8105c7c87b9c9d8c63aff2c0ea3e8c86f20800","index.js":"2f3a779b20fb69c42fae0f3383f47f0f932eefa9"},"object-inspect":{"package.json":"c0bbb0d26a52bd6b34bd243ab6dd3a6ce7e1b784","util.inspect.js":"536f47a1b41a69a26efbf976e1b376a34c3403b0","index.js":"7f7cce7875ef5c6da728f85f7f01c5162f251ef9"},"is-regex":{"package.json":"402119a852ba18281a55a97f68847af473953c8b","index.js":"1d0a9c2a39753726b2b643222285d44749a9cb8e"},"array.prototype.find":{"package.json":"3885b3149fb255c97e6aa3d7b23a655ed781854e","index.js":"f22aadab043e04591c5c3d8a160341bbcae910d0","implementation.js":"f1d1813ba8bff3ca6119b368c2066aae98d9d9cf","polyfill.js":"a72768994dec7cc62becc6be9c15aeebfc32cd17","shim.js":"b283aadd33a200a27769e2556603c666c031fa6f"},"function.prototype.name":{"package.json":"c1920ed6d71adae2e1c3233d3b63727168dc4c2a","index.js":"4ed0c2d9a18a7d6afb229466299dc524e1fdff12","implementation.js":"068273ecf290ef41737efbd8d69c4a1b022e1e76","polyfill.js":"cdd117a9deed0056b55469b2892bfc22fc38b097","shim.js":"bd69a884821ed12103d4a129471064a30a7596db"},"functions-have-names":{"package.json":"4dfbb219d349903207d24bcfc0e333339f6cf57e","index.js":"ba1d542ea33ba76776ae989d64f13781c9595e75"},"object-is":{"package.json":"cb9b435191c1d3d00b2e18968f46fed8c8dac646","index.js":"c67278572f81666a3a8a6e6b1f1c75fafdd505f2"},"is-touch-device":{"package.json":"0e1315faffb35e284b5562e853fd9dba7a4588ca","build":{"index.js":"b1787d929d60e76cba6f493e885ea28f8f38d2d6"}},"react-addons-shallow-compare":{"package.json":"f908f2ac4de80dc1b20ba2fbd20848a58a15aa2e","index.js":"3bf12f1eead1023bfb567132b775e77aeb8637e1"},"consolidated-events":{"package.json":"56a753cac153edc4bdc0aa4cff20808d74ce8134","lib":{"index.js":"0d8a085de19a302c19a93a733b58acec85ff2045","normalizeEventOptions.js":"cce10baee931c0b2a007802f47241809030bd59a","canUsePassiveEventListeners.js":"5d5a478397d2d91fb5bcfa62a083ac96677ae0c2","canUseDOM.js":"573021ffa33a318573cb09bab9d41e5360795293","TargetEventHandlers.js":"75f5e5afb6f64fc843b9c954e20afa90f1d93413","eventOptionsKey.js":"4ddc823c63450f0d555c0811876d2925c4e4ca8f"}},"react-portal":{"package.json":"68f29b3f1e057fb33febaf9312c9447ab3f15440","build":{"portal.js":"ba379032c9123ae715be2ffbd0d277323e719642"}},"react-moment-proptypes":{"package.json":"b65b91cca9d894868b324f0129d5a02314367d01","src":{"index.js":"169b6a14afe9edbae55d229cf579092f703000c3","moment-validation-wrapper.js":"1ce8297c8c4031551dc95d915b84bf86e23af51f","core.js":"875ffd54e5e02233b23396212379bbf887432c2a"}},"lodash":{"throttle.js":"220e5ec844762776be99f7ed97233de23f7768dc","debounce.js":"6d8ab8b32a394d8f8d60bc130f90af92cab4c24c","isObject.js":"4c1471eebc8e8248fc5299ead0d4e0c833fa0b53","now.js":"305007524c86c5cc58b912ae9e85b7f4deea1332","_root.js":"b91522b2498bac15a69400464aa1acd9ab65da3b","_freeGlobal.js":"f005ca2daa99313555a7e446daf2bb0781c403fa","toNumber.js":"1281d34a874252e1bc21a829dd9b0cc6ec0c1cd7","isSymbol.js":"aba5701711a43ea127e0002f2c079bfcfada0bea","_baseGetTag.js":"b64fbc7f2ff102c7d89b40b55498fd1d79d8c564","_Symbol.js":"3edd876f6ea6f3bc2d193c2b1fc6f6a76e6672b0","_getRawTag.js":"2cc6d27f73cbe3802b7cca519a62b0ab8a1bef36","_objectToString.js":"fbcbcd6912da86e87c3845e843d89e132871c309","isObjectLike.js":"eb008f25c2aa8f69696e307d5b1fab37da67e00f"},"object.values":{"package.json":"116dda0fd78bbad575334803922fea6f6fcfc523","index.js":"bf1e2512e68009d00e56f9e450b4b321e00d8e76","implementation.js":"99b8935e5bce1e593cae17d67175ccbd97c73cbf","polyfill.js":"ace7e970ab00d779d8df96a0f5389de42b437e68","shim.js":"f87b2a957f25e06c5189ede1f325e68bad016abd"}},"imports":{"ui":{"components":{"PickDates.js":"7baba3e436723a39eca177c56417b2599e2fc3ba"}}}};

exports.get = function (id) {
  var tree = versions;
  var version = null;

  id.split("/").some(function (part) {
    if (part) {
      // If the tree contains identifiers for Meteor packages with colons
      // in their names, the colons should not have been replaced by
      // underscores, but there's a bug that results in that behavior, so
      // for now it seems safest to be tolerant of underscores here.
      // https://github.com/meteor/meteor/pull/9103
      tree = tree[part] || tree[part.replace(":", "_")];
    }

    if (! tree) {
      // Terminate the search without reassigning version.
      return true;
    }

    if (typeof tree === "string") {
      version = tree;
      return true;
    }
  });

  return version;
};

function getFlatModuleArray(tree) {
  var parts = [""];
  var result = [];

  function walk(t) {
    if (t && typeof t === "object") {
      Object.keys(t).forEach(function (key) {
        parts.push(key);
        walk(t[key]);
        parts.pop();
      });
    } else if (typeof t === "string") {
      result.push(parts.join("/"));
    }
  }

  walk(tree);

  return result;
}

// If Package.appcache is loaded, preload additional modules after the
// core bundle has been loaded.
function precacheOnLoad(event) {
  // Check inside onload to make sure Package.appcache has had a chance to
  // become available.
  if (! Package.appcache) {
    return;
  }

  // Prefetch in chunks to reduce overhead. If we call module.prefetch(id)
  // multiple times in the same tick of the event loop, all those modules
  // will be fetched in one HTTP POST request.
  function prefetchInChunks(modules, amount) {
    Promise.all(modules.splice(0, amount).map(function (id) {
      return module.prefetch(id);
    })).then(function () {
      if (modules.length > 0) {
        setTimeout(function () {
          prefetchInChunks(modules, amount);
        }, 0);
      }
    });
  }

  // Get a flat array of modules and start prefetching.
  prefetchInChunks(getFlatModuleArray(versions), 50);
}

// Use window.onload to only prefetch after the main bundle has loaded.
if (global.addEventListener) {
  global.addEventListener('load', precacheOnLoad, false);
} else if (global.attachEvent) {
  global.attachEvent('onload', precacheOnLoad);
}

/////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/dynamic-import/client.js");

/* Exports */
Package._define("dynamic-import", exports);

})();
