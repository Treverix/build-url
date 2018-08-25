/**
 * build-url - A small library that builds a URL given its components
 * @version v1.1.2
 * @link https://github.com/steverydz/build-url#readme
 * @license MIT
 */
;(function () {
  'use strict';

  var root = this;
  var previousBuildUrl = root.buildUrl;

  var buildUrl = function (url, options) {
    var queryString = [];
    var key;
    var builtUrl;
    var caseChange; 
    
    // 'lowerCase' parameter default = false,  
    if (options && options.lowerCase) {
        caseChange = !!options.lowerCase;
    } else {
        caseChange = false;
    }

    if (url === null) {
      builtUrl = '';
    } else if (typeof(url) === 'object') {
      builtUrl = '';
      options = url;
    } else {
      builtUrl = url;
    }

    if(builtUrl && builtUrl[builtUrl.length - 1] === '/') {
      builtUrl = builtUrl.slice(0, -1);
    } 

    if (options) {
      if (options.path) {
          var localVar = String(options.path).trim(); //Lets store and trim extra space from 'path' varibale
          if (caseChange) {
            localVar = localVar.toLowerCase(); //case change to lowercase
          }
          if (localVar.indexOf('/') === 0) {
              builtUrl += localVar;
          } else {
            builtUrl += '/' + localVar;
          }
      }

      if (options.queryParams) {
        for (key in options.queryParams) {
          if (options.queryParams.hasOwnProperty(key)
              && options.queryParams[key] !== void 0) {
                var encodedParam;
                  if (caseChange) {
                    encodedParam = encodeURIComponent(String(options.queryParams[key]).trim().toLowerCase());  //lowercase conversion if caseChange is true
                  }
                  else {
                    encodedParam = encodeURIComponent(String(options.queryParams[key]).trim()); 
                  }
            queryString.push(key + '=' + encodedParam);
          }
        }
        builtUrl += '?' + queryString.join('&');
      }

      if (options.hash) {
        if(caseChange)
            builtUrl += '#' + String(options.hash).trim().toLowerCase();
        else
            builtUrl += '#' + String(options.hash).trim();
      }
    } 
    return builtUrl;
  };

  buildUrl.noConflict = function () {
    root.buildUrl = previousBuildUrl;
    return buildUrl;
  };

  if (typeof(exports) !== 'undefined') {
    if (typeof(module) !== 'undefined' && module.exports) {
      exports = module.exports = buildUrl;
    }
    exports.buildUrl = buildUrl;
  } else {
    root.buildUrl = buildUrl;
  }
}).call(this);
