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
	
	var _index2 = __webpack_require__(3);
	
	var _index3 = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Single = function Single(options) {
		_classCallCheck(this, Single);
	
		(0, _index.arrayInit)();
		this.$opts = options;
		this.$data = options.data;
		if ((0, _common.isFun)(options)) {
			options.data = options.data();
		}
		new _index2.Observe(options.data);
	
		this.$compile = new _index3.Compile(options.el || document.body, this);
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
	exports.isEleNode = isEleNode;
	exports.isAttrNode = isAttrNode;
	exports.isTextNode = isTextNode;
	exports.toArray = toArray;
	exports.isDir = isDir;
	exports.isEventDir = isEventDir;
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
	
	function isEleNode(node) {
		return node.nodeType === 1;
	}
	
	function isAttrNode(node) {
		return node.nodeType === 2;
	}
	
	function isTextNode(node) {
		return node.nodeType === 3;
	}
	
	var arr = [];
	var slice = arr.slice.call;
	
	function toArray(val) {
		return slice(val);
	}
	
	function isDir(str) {
		return str.indexOf('v-') === 0;
	}
	
	function isEventDir(str) {
		return str.indexOf('on') === 0;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.arrayInit = undefined;
	
	var _common = __webpack_require__(1);
	
	var arrayInit = exports.arrayInit = function arrayInit() {
		Array.prototype._copy = function () {
			var re = [];
			this.forEach(function (item) {
				return re.push(item);
			});
			return re;
		};
	
		Array.prototype._del = function (index) {
			return this.filter(function (item, i) {
				return i !== index;
			});
		};
	
		Array.prototype._pop = function () {
			return this._del(0);
		};
	
		Array.prototype._shift = function () {
			return this._del(this.length - 1);
		};
	
		Array.prototype._insert = function (index, item) {
			var result = this._copy();
			result.splice(index, 0, item);
			return result;
		};
	
		Array.prototype._push = function (item) {
			return this._insert(this.length - 1, item);
		};
	
		Array.prototype._unpop = function (item) {
			return this._insert(0, item);
		};
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Observe = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _common = __webpack_require__(1);
	
	var _index = __webpack_require__(4);
	
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
				var me = this;
				Object.keys(data).forEach(function (key) {
					me.convert(data, key, data[key]);
				});
			}
		}, {
			key: 'convert',
			value: function convert(data, key, value) {
				var ob = this,
				    children = new Observe(value),
				    dep = new _index.Dep();
				Object.defineProperty(data, key, {
					configurable: false,
					enumerable: true,
					get: function get() {
						_index.target && _index.target.addDep(dep);
						return value;
					},
					set: function set(newVal) {
						if (value == newVal) {
							return;
						}
						value = newVal;
						children = new Observe(newVal);
						dep.notify();
					}
				});
			}
		}]);

		return Observe;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var uid = 0;
	
	var Dep = exports.Dep = function () {
		function Dep() {
			_classCallCheck(this, Dep);
	
			this.id = uid++;
			this.sub = [];
		}
	
		_createClass(Dep, [{
			key: "addSub",
			value: function addSub(watcher) {
				this.sun.push(watcher);
			}
		}, {
			key: "depend",
			value: function depend() {
				target.addDep(this);
			}
		}, {
			key: "notify",
			value: function notify() {
				this.sub.forEach(function (item) {
					item.update();
				});
			}
		}]);

		return Dep;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Compile = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _common = __webpack_require__(1);
	
	var _index = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Compile = exports.Compile = function () {
		function Compile(el, vm) {
			_classCallCheck(this, Compile);
	
			this.$opts = vm.$opts;
			this.$data = vm.$opts.data;
			this.$el = el.nodeType ? el : querySelector(el);
	
			if (this.$el) {
				analyEleNode(this.$el);
			}
		}
	
		/**
	  * [analyEleNode 并文档中的指令进行解析]
	  * @param  {node} el [ 开始节点（递归） ]
	  * @return {[undefined]}
	  */
	
	
		_createClass(Compile, [{
			key: 'analyEleNode',
			value: function analyEleNode(el) {
				var child = el.childNode,
				    me = this,
				    reg = /\{\{(.+)\}\}/;
				(0, _common.toArray)(child).forEach(function (node) {
					if ((0, _common.isEleNode)(node)) {
						//若为元素节点对其属性节点进行遍历
						me.analyArrtNode(node);
					} else if ((0, _common.isTextNode)(node) && reg.test(el.textContent)) {
						_index.dirUnit.text(node, me.$data, RegExp.$1);
					}
					if (node.childNode && node.childNode.length > -1) {
						me.analyEleNode(node);
					}
				});
			}
	
			/**
	   * [analyArrtNode 对元素节点的属性进行遍历，找出其中指令]
	   * @param  {[node]} node [需要遍历属性的节点]
	   * @return {[undefined]}
	   */
	
		}, {
			key: 'analyArrtNode',
			value: function analyArrtNode(node) {
				var attrs = node.attributes,
				    me = this;
	
				(0, _common.toArray)(attrs).forEach(function (attr) {
					if ((0, _common.isDir)(attr)) {
						var dirName = attr.split('-')[1],
						    dirVal = attrs[attr];
						if ((0, _common.isEventDir)(dirName)) {
							_index.dirUnit.event(node, me.$opts, dirVal, dirName);
						} else {
							_index.dirUnit[dirName](node, me.$data, dirVal);
						}
					}
				});
			}
		}]);

		return Compile;
	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.dirUnit = undefined;
	
	var _index = __webpack_require__(7);
	
	/**
	 * [dirUnit 指令-数据绑定单元]
	 * @包含各指令方法 [test | event]
	 */
	var dirUnit = exports.dirUnit = {
	
		/**
	  * [v-text指令 \ {{.+}}绑定数据修改函数]
	  * @param  {[type]} node [需要更新的节点]
	  * @param  {Single} vm   [创建的全局对象]
	  * @param  {[type]} keys [指令中对应的数据位置]
	  */
		text: function text(node, vm, keys) {
			undefined.bind(node, vm, keys, 'text');
		},
	
		/**
	  * [v-html指令]
	  * @param  {[type]} node [需要更新的节点]
	  * @param  {Single} vm   [创建的全局对象]
	  * @param  {[type]} keys [指令中对应的数据位置]
	  */
		html: function html(node, vm, keys) {
			undefined.bind(node, vm, keys, 'html');
		},
	
		/**
	  * [v-class指令]
	  * @param  {[type]} node [需要更新的节点]
	  * @param  {Single} vm   [创建的全局对象]
	  * @param  {[type]} keys [指令中对应的数据位置]
	  */
		class: function _class(node, vm, keys) {
			undefined.bind(node, vm, keys, 'class');
		},
	
		/**
	  * [v-model指令]
	  * @param  {[type]} node [需要更新的节点]
	  * @param  {Single} vm   [创建的全局对象]
	  * @param  {[type]} keys [指令中对应的数据位置]
	  */
		model: function model(node, vm, keys) {
			undefined.bind(node, vm, keys, 'model');
			var me = undefined,
			    _data = vm.$data,
			    oldVal = me._getVal(keys, _data);
			node.addEventListener('input', function (event) {
				var ev = event || window.event,
				    val = ev.target.value;
				if (val == oldVal) {
					return;
				}
				me._setVal(keys, _data, val);
			}, true);
		},
	
		/**
	  * [v-on:ev 事件指令]
	  * @param  {[type]} node   [需要更新的节点]
	  * @param  {[type]} vm     [创建的全局对象]
	  * @param  {[type]} dirVal [指令中的值]
	  * @param  {[type]} dir    [指令名]
	  */
		event: function event(node, vm, dirVal, dir) {
			var ev = dir.split(':')[1],
			    fn = vm.$opts.event[dirVal];
			if (isFun(fn)) {
				node.addEventListener(ev, fn.bind(vm), false);
			}
		},
	
		/**
	  * [将节点值与数据进行绑定，当数据修改时，遍历该数据所有订阅者dep.sub，调用 Watcher 中的匿名函数]
	  * @param  {[type]} node [需要更新的节点]
	  * @param  {[type]} vm   [创建的全局对象]
	  * @param  {[type]} keys [指令中对应的数据位置]
	  * @param  {[type]} dir  [指令名]
	  */
		_bind: function _bind(node, vm, keys, dir) {
			var fn = upper[dir + 'Upper'];
			isFun(fn) && fn(node, _getVal(keys, vm.$data));
	
			new _index.Watcher(vm, keys, function (val, newVal) {
				isFun(fn) && fn(node, newVal, val);
			});
		},
	
		/**
	  * [根据指令值获取绑定的数据值]
	  * @param  {[str]} keys [指令中对应的数据位置]
	  * @param  {[obj]} val  [数据所在位置 / 数据]
	  */
		_getVal: function _getVal(keys, data) {
			keys.split(',').forEach(function (key) {
				data = data[key];
			});
			return data;
		},
	
		/**
	  * [设置data中的某项的值，触发set]
	  * @param  {[str]} keys [指令中对应的数据位置]
	  * @param  {[obj]} data [new Single() 参数对象 data]
	  * @param  {[any]} val  [新值]
	  */
		_setVal: function _setVal(keys, data, val) {
			var _keys = keys.split(','),
			    len = _keys.length - 1;
			_keys.forEach(function (key, i) {
				if (i == len) {
					data[key] = val;
				} else {
					data = data[key];
				}
			});
		}
	};
	
	/**
	 * [upper 指令更新单元]
	 * @param  {[str]} node 	[绑定节点]
	 * @param  {[obj]} newVla [新值]
	 * @param  {[any]} val  	[原值]
	 */
	var upper = {
		textUpper: function textUpper(node, newVal) {
			node.textContent = newVal;
		},
	
		htmlUpper: function htmlUpper(node, newVal) {
			node.innerHTML = newVal;
		},
	
		modelUpper: function modelUpper(node, newVal, val) {
			node.value = newVal ? newVal : '';
		},
	
		classUpper: function classUpper(node, newVal, val) {
			node.className = val ? node.className.replace(val, newVal) : node.className + newVal;
		}
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var target = exports.target = null;
	
	var Watcher = exports.Watcher = function () {
		function Watcher(vm, keys, fn) {
			_classCallCheck(this, Watcher);
	
			this.$vm = vm;
			this.$keys = keys;
			this._fn = fn;
			this.depIds = {};
			this.val = this.get();
		}
	
		_createClass(Watcher, [{
			key: 'get',
			value: function get() {
				exports.target = target = this;
				var val = this.getVal();
				exports.target = target = null;
				return val;
			}
		}, {
			key: 'getVal',
			value: function getVal() {
				var keys = this.$keys.split(','),
				    val = this.$vm.$data;
				keys.forEach(function (key) {
					val = val[key];
				});
				return val;
			}
		}, {
			key: 'addDep',
			value: function addDep(dep) {
				if (!this.depIds.hasOwnProperty(dep.id)) {
					this.depIds[dep.id] = dep;
					dep.addSub(this);
				}
			}
		}, {
			key: 'update',
			value: function update() {
				var newVal = this.get(),
				    val = this.val;
				if (val == newVal) {
					return;
				}
				this.val = newVal;
				this._fn.call(this.$vm, val, newVal);
			}
		}]);

		return Watcher;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=mvvm.js.map