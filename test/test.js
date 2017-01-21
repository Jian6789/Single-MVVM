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
	__webpack_require__(3);
	__webpack_require__(4);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports) {

	

	export let arrayInit = function(){
		Array.pop = function(){

		}

		Array.shift = function(){

		}

		Array.unshift = function(){
			
		}

		Array.push = function(){
			
		}

		Array.concat = function(){
			
		}

		Array.del = function(){
			
		}

		Array.insert = function(){
			
		}
	}

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

	

	export default class Dep {
		constructor(){
			this.sub = [];
		}

		notify(){
			
		}
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	import { err } from '../common/common.js';
	import { arrayInit } from '../arrInit/index.js';
	import { Observe } from '../observe/index.js';

	export default class Single {
		constructor(options){
			arrayInit();
			return new Observe(options.data);
		}
	}

	window.Single = Single;

/***/ },
/* 5 */
/***/ function(module, exports) {

	import { isObject,isArray } from '../common/common.js';

	export class Observe{
		constructor(data){
			if(!isObject(data)){
				return;
			}
			this.walk(data);
		}

		walk(data){
			let me = this;
			Object.keys(data).forEach(function(key){
				me.convert(data,key,data[key]);
			});		
		}

		convert(data,key,value){
			let ob = this,
					children = new Observe(value);
			Object.defineProperty(data,key,{
				configurable:false,
				enumerable:true,
				get:function (){
					return value;
				},
				set:function (newVal) {
					if(value == newVal){
						return;
					}
					value = isArray(newVal) ? new ArrObj(newVal) : newVal;
					children = new Observe(newVal);
				}
			});
		}
	}

/***/ }
/******/ ]);