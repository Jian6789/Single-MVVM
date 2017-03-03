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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _index = __webpack_require__(1);
	
	var _index2 = __webpack_require__(10);
	
	var _common = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Single = function () {
		function Single() {
			_classCallCheck(this, Single);
	
			this.Routers = [];
			this.VM = _index.VM;
			this.page = null;
			this.ajax = _index2.ajax;
			var me = this;
			window.addEventListener('load', function () {
				me.urlChange();
			});
			window.addEventListener('hashchange', function () {
				me.urlChange();
			});
		}
	
		_createClass(Single, [{
			key: 'urlChange',
			value: function urlChange() {
				var router = this.getRouter();
				if (router) {
					this.loadTemplate(router.tempUrl, router.ctrUrl);
				}
			}
		}, {
			key: 'getRouter',
			value: function getRouter() {
				var curURL = this.getURL(),
				    router = this.Routers[curURL];
				return router ? router : this.Routers[0];
			}
		}, {
			key: 'getURL',
			value: function getURL() {
				return location.hash.split("?")[0].split("#")[1];
			}
		}, {
			key: 'loadScript',
			value: function loadScript(url) {
				var script = document.createElement('script'),
				    me = this;
				script.src = url;
				script.async = true;
				script.onload = function () {
					document.body.removeChild(script);
					if ((0, _common.isFun)(me.page)) {
						me.page();
					}
				};
				document.body.appendChild(script);
			}
		}, {
			key: 'loadTemplate',
			value: function loadTemplate(tempUrl, ctrUrl) {
				var me = this;
				me.ajax({
					type: 'GET',
					url: tempUrl,
					async: false,
					success: function success(result) {
						document.getElementById('sp-app').innerHTML = result;
						me.loadScript(ctrUrl);
					}
				});
			}
		}]);
	
		return Single;
	}();
	
	window.Single = new Single();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.VM = undefined;
	
	var _common = __webpack_require__(2);
	
	var _index = __webpack_require__(3);
	
	var _index2 = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * 入口对象
	 */
	var VM = exports.VM = function VM(options) {
		_classCallCheck(this, VM);
	
		this.$opts = options;
		this.$data = options.data;
		if ((0, _common.isFun)(options)) {
			options.data = options.data();
		}this.$observe = new _index.Observe(options.data);
	
		this.$compile = new _index2.Compile(options.el || document.body, this);
	};

/***/ },
/* 2 */
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
	exports.isForDir = isForDir;
	exports.insertAfter = insertAfter;
	var regText = exports.regText = /\{\{(.+)\}\}/;
	
	function isObject(val) {
		if (val == undefined) {
			return false;
		}
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
	
	function toArray(val) {
		return [].slice.call(val);
	}
	
	function isDir(str) {
		return str.indexOf('s-') === 0;
	}
	
	function isEventDir(str) {
		return str.indexOf('on') === 0;
	}
	
	function isForDir(str) {
		return str.indexOf('for') === 0;
	}
	
	function insertAfter(newNode, target) {
		var parent = target.parentNode;
		if (parent.lastElementChild == target) {
			parent.appendChild(newNode);
		} else {
			parent.insertBefore(newNode, target.nextSibling);
		}
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Observe = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _common = __webpack_require__(2);
	
	var _index = __webpack_require__(4);
	
	var _index2 = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * 发布者对象
	 */
	var Observe = exports.Observe = function () {
	    function Observe(data) {
	        _classCallCheck(this, Observe);
	
	        if (!(0, _common.isObject)(data)) {
	            return;
	        }
	        this.walk(data);
	    }
	
	    /**
	     * [walk 对数据中属性进行遍历劫持]
	     * @param  {[type]} data [待劫持数据]
	     */
	
	
	    _createClass(Observe, [{
	        key: 'walk',
	        value: function walk(data) {
	            var me = this,
	                hadProperty = Object.getOwnPropertyDescriptor;
	            Object.keys(data).forEach(function (key) {
	                if ((0, _common.isFun)(hadProperty(data, key).set)) {
	                    return;
	                }
	                me.convert(data, key, data[key]);
	            });
	        }
	
	        /**
	         * [convert 递归数据劫持]
	         * @param  {[type]} data  [待劫持数据]
	         * @param  {[type]} key   [待劫持数据属性名]
	         * @param  {[type]} value [待劫持数据值]
	         */
	
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
	                    _index2.target && _index2.target.addDep(dep);
	                    return value;
	                },
	                set: function set(newVal) {
	                    if (value == newVal) {
	                        return;
	                    }
	                    value = newVal;
	                    children = new Observe(newVal);
	                    dep.notify((0, _common.isArray)(newVal));
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
	
	/**
	 * 发布者与订阅者关联对象
	 */
	
	var Dep = exports.Dep = function () {
	    function Dep() {
	        _classCallCheck(this, Dep);
	
	        this.id = uid++;
	        this.sub = [];
	    }
	
	    /**
	     * [addSub 在sub中增加订阅者]
	     * @param {[type]} watcher [订阅者 Watcher 对象]
	     */
	
	
	    _createClass(Dep, [{
	        key: "addSub",
	        value: function addSub(watcher) {
	            this.sub.push(watcher);
	        }
	    }, {
	        key: "rmSub",
	        value: function rmSub(sub) {
	            var reg = /\.(\d)+\./g;
	            return sub.filter(function (item) {
	                return !item.$keys.match(reg);
	            });
	        }
	        /**
	         * [depend 触发 Wtacher 的add事件，将dep加入 Watcher]
	         */
	
	    }, {
	        key: "depend",
	        value: function depend() {
	            target.addDep(this);
	        }
	
	        /**
	         * [notify 绑定数据set出发此方法，对sub中Watcher进行遍历触发update]
	         */
	
	    }, {
	        key: "notify",
	        value: function notify(isArr) {
	            if (isArr) {
	                this.sub = this.rmSub(this.sub);
	            }
	            this.sub.forEach(function (item) {
	                item.update();
	            });
	        }
	    }]);

	    return Dep;
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var target = exports.target = null;
	
	/**
	 * 订阅者对象
	 */
	
	var Watcher = exports.Watcher = function () {
		function Watcher(vm, keys, fn) {
			_classCallCheck(this, Watcher);
	
			this.$vm = vm;
			this.$keys = keys;
			this._fn = fn;
			this.depIds = {};
			this.val = this.get();
		}
	
		/**
	  * [get 获取数据原始值]
	  */
	
	
		_createClass(Watcher, [{
			key: 'get',
			value: function get() {
				exports.target = target = this;
				var val = this.getVal();
				exports.target = target = null;
				return val;
			}
	
			/**
	   * [getVal 遍历keys获取属性值，并出发数据get方法，get方法中触发watcher.addDep]
	   */
	
		}, {
			key: 'getVal',
			value: function getVal() {
				var keys = this.$keys.split('.'),
				    val = this.$vm.$data;
				keys.forEach(function (key) {
					val = val[key];
				});
				return val;
			}
	
			/**
	   * [addDep 将Dep加入Watcher.depIds，触发Dep.addSub]
	   * @param {[type]} dep [Dep对象]
	   */
	
		}, {
			key: 'addDep',
			value: function addDep(dep) {
				if (!this.depIds.hasOwnProperty(dep.id)) {
					this.depIds[dep.id] = dep;
					dep.addSub(this);
				}
			}
	
			/**
	   * [update dirUnit._bind中传入的参数]
	   */
	
		}, {
			key: 'update',
			value: function update() {
				var newVal = this.get(),
				    val = this.val;
				if (val == newVal) {
					return;
				}
				this.val = newVal;
				this._fn.call(this.$vm, newVal, val, this);
			}
		}]);

		return Watcher;
	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Compile = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _common = __webpack_require__(2);
	
	var _index = __webpack_require__(7);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Compile = exports.Compile = function () {
		function Compile(el, vm, isDel) {
			_classCallCheck(this, Compile);
	
			this.$vm = vm;
			this.$opts = this.$vm.$opts;
			this.$data = this.$opts.data;
			this.$isDel = isDel || false;
			this.$el = el.nodeType ? el : document.querySelector(el);
	
			if (this.$el) {
				var frag = this.node2Fragment(this.$el);
				this.analyEleNode(frag);
				this.$el.appendChild(frag);
			}
		}
	
		/**
	  * [node2Fragment 将节点放入文档碎片]
	  * @param  {[type]} node [节点]
	  */
	
	
		_createClass(Compile, [{
			key: 'node2Fragment',
			value: function node2Fragment(node) {
				var frag = document.createDocumentFragment(),
				    child = void 0;
				while (child = node.firstChild) {
					frag.appendChild(child);
				}
				return frag;
			}
	
			/**
	   * [analyEleNode 解析模板对模板中的指令进行解析]
	   * @param  {node} el [ 开始节点（递归） ]
	   * @return {[undefined]}
	   */
	
		}, {
			key: 'analyEleNode',
			value: function analyEleNode(el) {
				var child = el.childNodes,
				    me = this;
				(0, _common.toArray)(child).forEach(function (node) {
					if ((0, _common.isEleNode)(node)) {
						//若为元素节点对其属性节点进行遍历
						me.analyArrtNode(node);
					} else if ((0, _common.isTextNode)(node) && _common.regText.test(node.textContent)) {
						_index.dirUnit.text(node, me.$vm, RegExp.$1.trim());
					}
					if (node.parentNode && node.childNodes && node.childNodes.length > -1) {
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
				    me = this,
				    attrName = '';
	
				(0, _common.toArray)(attrs).forEach(function (attr) {
					attrName = attr.name;
					if ((0, _common.isDir)(attrName)) {
						var dirName = attrName.split('-')[1],
						    dirVal = attr.value.trim();
						if ((0, _common.isEventDir)(dirName)) {
							_index.dirUnit.event(node, me.$vm, dirVal, dirName);
						} else {
							_index.dirUnit[dirName](node, me.$vm, dirVal);
						}
					} else if (_common.regText.test(attr.textContent)) {
						_index.dirUnit.text(attr, me.$vm, RegExp.$1.trim());
					}
				});
			}
		}]);

		return Compile;
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.dirUnit = undefined;
	exports.changHtml = changHtml;
	
	var _common = __webpack_require__(2);
	
	var _index = __webpack_require__(5);
	
	var _forDir = __webpack_require__(8);
	
	var _ifDir = __webpack_require__(9);
	
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
	        dirUnit._bind(node, vm, keys, 'text');
	    },
	    if: function _if(node, vm, keys) {
	        return new _ifDir.IfDir(node, vm, keys);
	    },
	
	    for: function _for(node, vm, keys) {
	        return new _forDir.ForDir(node, vm, keys);
	    },
	
	    /**
	     * [v-html指令]
	     * @param  {[type]} node [需要更新的节点]
	     * @param  {Single} vm   [创建的全局对象]
	     * @param  {[type]} keys [指令中对应的数据位置]
	     */
	    html: function html(node, vm, keys) {
	        dirUnit._bind(node, vm, keys, 'html');
	    },
	
	    /**
	     * [v-class指令]
	     * @param  {[type]} node [需要更新的节点]
	     * @param  {Single} vm   [创建的全局对象]
	     * @param  {[type]} keys [指令中对应的数据位置]
	     */
	    class: function _class(node, vm, keys) {
	        dirUnit._bind(node, vm, keys, 'class');
	    },
	
	    /**
	     * [v-model指令]
	     * @param  {[type]} node [需要更新的节点]
	     * @param  {Single} vm   [创建的全局对象]
	     * @param  {[type]} keys [指令中对应的数据位置]
	     */
	    model: function model(node, vm, keys) {
	        dirUnit._bind(node, vm, keys, 'model');
	        var me = undefined,
	            _data = vm.$data,
	            oldVal = dirUnit._getVal(keys, _data);
	        node.addEventListener('input', function (event) {
	            oldVal = dirUnit._getVal(keys, _data);
	            var ev = event || window.event,
	                val = ev.target.value;
	            if (val == oldVal) {
	                return;
	            }
	            dirUnit._setVal(keys, _data, val);
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
	        if ((0, _common.isFun)(fn)) {
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
	        (0, _common.isFun)(fn) && fn(node, dirUnit._getVal(keys, vm.$data));
	        new _index.Watcher(vm, keys, function (newVal, val) {
	            (0, _common.isFun)(fn) && fn(node, newVal, val);
	        });
	    },
	
	    /**
	     * [根据指令值获取绑定的数据值]
	     * @param  {[str]} keys [指令中对应的数据位置]
	     * @param  {[obj]} val  [数据所在位置 / 数据]
	     */
	    _getVal: function _getVal(keys, data) {
	        keys.split('.').forEach(function (key) {
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
	        var _keys = keys.split('.'),
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
	    textUpper: function textUpper(node, newVal, oldVal) {
	        oldVal = oldVal != undefined ? oldVal + '' : _common.regText;
	        node.textContent = node.textContent.replace(oldVal, newVal);
	    },
	
	    htmlUpper: function htmlUpper(node, newVal) {
	        node.innerHTML = newVal;
	    },
	
	    modelUpper: function modelUpper(node, newVal, val) {
	        node.value = newVal ? newVal : '';
	    },
	
	    classUpper: function classUpper(node, newVal, val) {
	        node.className = (val ? node.className.replace(val, newVal) : node.className + ' ' + newVal).trim();
	    }
	};
	
	function changHtml(html) {
	    return document.createRange().createContextualFragment(html);
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ForDir = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _common = __webpack_require__(2);
	
	var _index = __webpack_require__(7);
	
	var _index2 = __webpack_require__(6);
	
	var _index3 = __webpack_require__(7);
	
	var _index4 = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ForDir = exports.ForDir = function () {
		function ForDir(node, vm, keys) {
			_classCallCheck(this, ForDir);
	
			this.start = null;
			this.end = null;
			this.init(node, vm, keys);
		}
	
		_createClass(ForDir, [{
			key: 'init',
			value: function init(node, vm, keys) {
				this.bind(node, vm, keys);
			}
		}, {
			key: 'bind',
			value: function bind(node, vm, keys) {
				var _this = this;
	
				var arrName = keys.split('in')[1].trim(),
				    me = this,
				    reg = /\.(\d)+\./g;
				me.upper(node, vm, keys);
				new _index4.Watcher(vm, arrName, function (val, newVal, watcher) {
					while (_this.start.nextSibling != _this.end) {
						_this.end.parentNode.removeChild(_this.start.nextSibling);
					}
					me.upper(node, vm, keys);
				});
			}
		}, {
			key: 'upper',
			value: function upper(node, vm, keys) {
				if (!this.start) {
					this.start = document.createComment('start of s-for');
					node.parentNode.insertBefore(this.start, node);
				}
				if (!this.end) {
					this.end = document.createComment('end of s-for');
					node.parentNode.insertBefore(this.end, node);
				}
	
				node.removeAttribute('s-for');
				var item = keys.split('in')[0].trim(),
				    arrName = keys.split('in')[1].trim(),
				    arr = _index.dirUnit._getVal(arrName, vm.$data),
				    html = node.outerHTML,
				    reg = new RegExp(item, 'gm'),
				    box = '';
				for (var i = 0, len = arr.length; i < len; i++) {
					box += html.replace(reg, arrName + '.' + i);
				};
				box = (0, _index3.changHtml)(box);
				new _index2.Compile(box, vm, true);
				this.end.parentNode.insertBefore(box, this.end);
	
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
			}
		}]);

		return ForDir;
	}();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.IfDir = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _index = __webpack_require__(7);
	
	var _index2 = __webpack_require__(6);
	
	var _index3 = __webpack_require__(7);
	
	var _index4 = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var IfDir = exports.IfDir = function () {
		function IfDir(node, vm, keys) {
			_classCallCheck(this, IfDir);
	
			this.start = null;
			this.end = null;
			this.init(node, vm, keys);
		}
	
		_createClass(IfDir, [{
			key: 'init',
			value: function init(node, vm, keys) {
				this.bind(node, vm, keys);
			}
		}, {
			key: 'bind',
			value: function bind(node, vm, keys) {
				var me = this;
				new _index2.Compile(node, vm);
				me.upper(node, vm, keys, _index.dirUnit._getVal(keys, vm.$data));
				new _index4.Watcher(vm, keys, function (newVal, val) {
					if (!!newVal == !!val) {
						return;
					}
					me.upper(node, vm, keys, newVal);
				});
			}
		}, {
			key: 'upper',
			value: function upper(node, vm, keys, newVal, val) {
				if (!this.start) {
					this.start = document.createComment('start of s-if');
					node.parentNode.insertBefore(this.start, node);
				}
				if (!this.end) {
					this.end = document.createComment('end of s-if');
					node.parentNode.insertBefore(this.end, node);
				}
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
				if (newVal) {
					this.end.parentNode.insertBefore(node, this.end);
				}
			}
		}]);

		return IfDir;
	}();

/***/ },
/* 10 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ajax = ajax;
	
	var jsonpId = 0;
	
	function ajax(aD) {
		if (!aD.url) throw new Error('请输入正确的URL!');
	
		aD.type = aD.type || 'GET';
		aD.async = aD.async || true;
		aD.data = encodeFormat(aD.data);
		aD.header = aD.header || "application/x-www-form-urlencoded";
		aD.url = aD.type == 'POST' ? saD.url : aD.url + (aD.url.indexOf('?') == -1 ? '?' : '&') + aD.data;
	
		if (aD.type == 'jsonp') {
			ajaxJsonp(aD);
			return false;
		}
	
		var re = new XMLHttpRequest();
	
		re.open(aD.type, aD.url, aD.async);
		aD.type.toUpperCase == 'POST' && re.setRequestHeader("content-type", aD.header);
	
		re.addEventListener('readystatechange', function () {
			return re.readyState == 4 && aD.success && aD.success(re.response);
		});
		re.send(aD.type === 'GET' ? null : aD.data);
	}
	
	function encodeFormat(obj) {
		return !obj ? '' : Object.keys(obj).reduce(function (re, item) {
			return re += '&' + item + '=' + obj[item];
		}, '').slice(1);
	}
	
	function ajaxJsonp(ao) {
		if (!ao.jsonp) throw new Error('请输入函数名称');
		var fnName = 'jsonp' + '_' + jsonpId++;
		ao.url = ao.url + (ao.url.indexOf('?') == -1 ? '?' : '&') + ao.jsonp + '=' + fnName;
		var script = document.createElement('script');
		global[fnName] = function (response) {
			try {
				ao.success(response);
			} finally {
				delete global[fnName];
				script.remove();
			}
		};
		script.src = ao.url;
		document.body.appendChild(script);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);
//# sourceMappingURL=single.js.map