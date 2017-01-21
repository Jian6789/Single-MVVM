

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

export function isEleNode(node){
	return node.nodeType === 1;
}

export function isAttrNode(node){
	return node.nodeType === 2;
}

export function isTextNode(node){
	return node.nodeType === 3;
}

let arr = [];
let slice = arr.slice.call;

export function toArray(val){
	return slice(val);
}

export function isDir(str){
	return str.indexOf('v-') === 0;
}

export function isEventDir(str){
	return str.indexOf('on') === 0;
}