export let regText = /\{\{(.+)\}\}/;

export function isObject(val) {
	if(val == undefined){
		return false;
	}
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

export function isEleNode(node) {
	return node.nodeType === 1;
}

export function isAttrNode(node) {
	return node.nodeType === 2;
}

export function isTextNode(node) {
	return node.nodeType === 3;
}

export function toArray(val) {
	return [].slice.call(val);
}

export function isDir(str) {
	return str.indexOf('s-') === 0;
}

export function isEventDir(str) {
	return str.indexOf('on') === 0;
}

export function isForDir(str) {
	return str.indexOf('for') === 0;
}

export function insertAfter(newNode, target) {
	var parent = target.parentNode;
	if (parent.lastElementChild == target) {
		parent.appendChild(newNode);
	} else {
		parent.insertBefore(newNode, target.nextSibling);
	}
}