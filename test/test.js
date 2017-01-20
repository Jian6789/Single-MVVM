/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	

	export function isObject(val){
		return typeof val === 'object';
	}

	export function isPlainObj(val) {
		return Object.prototype.toString.call(val) === '[object Object]';
	}

	export function isArray(val) {
		return Array.isArray(val);
	}

	export function isFun(val) {
		return typeof val === 'function';
	}

	export function err(str) {
		throw new Error(str);
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	import { err } from '../common/common.js'
	import { Observe } from '../observe/index.js';

	export default class Single {
		constructor(options){
			return Observe.prototype.observe(options.data);
		}
	}

	window.Single = Single;

/***/ },
/* 3 */
/***/ function(module, exports) {

	import { isObject } from '../common/common.js';

	export class Observe{
		constructor(data){
			if(!isObject(data)){
				return;
			}
			this.walk(data);
		}

		walk(data){
			Object.keys(data).forEach((key)=> this.convert(data,key,data[key]));		
		}

		convert(data,key,value){
			let ob = this;

			Object.defineProperty(key,data,{
				configurable:false,
				enumerable:true,
				get:function (){
					return value;
				},
				set:function (newVal) {
					if(value == newVal){
						return;
					}
					value = newVal;
					new Observe(newVal);
				}
			});
		}
	}

/***/ }
/******/ ]);