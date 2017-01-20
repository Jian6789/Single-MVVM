/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _common = __webpack_require__(1);
	
	var _index = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Single = function Single(options) {
		_classCallCheck(this, Single);
	
		return new _index.Observe(options.data);
	};
	
	exports.default = Single;
	
	
	window.Single = Single;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.isObject = isObject;
	exports.isPlainObj = isPlainObj;
	exports.isArray = isArray;
	exports.isFun = isFun;
	exports.err = err;
	function isObject(val) {
		return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
	}
	
	function isPlainObj(val) {
		return Object.prototype.toString.call(val) === '[object Object]';
	}
	
	function isArray(val) {
		return Array.isArray(val);
	}
	
	function isFun(val) {
		return typeof val === 'function';
	}
	
	function err(str) {
		throw new Error(str);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Observe = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _common = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Observe = exports.Observe = function () {
		function Observe(data) {
			_classCallCheck(this, Observe);
	
			if (!(0, _common.isObject)(data)) {
				return;
			}
			this.walk(data);
		}
	
		_createClass(Observe, [{
			key: 'walk',
			value: function walk(data) {
				var _this = this;
	
				Object.keys(data).forEach(function (key) {
					return _this.convert(data, key, data[key]);
				});
			}
		}, {
			key: 'convert',
			value: function convert(data, key, value) {
				var ob = this,
				    children = new Observe(value);
				Object.defineProperty(data, key, {
					configurable: false,
					enumerable: true,
					get: function get() {
						return value;
					},
					set: function set(newVal) {
						if (value == newVal) {
							return;
						}
						value = newVal;
						children = new Observe(newVal);
					}
				});
			}
		}]);

		return Observe;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=mvvm.js.map