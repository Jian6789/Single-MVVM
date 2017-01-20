

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
