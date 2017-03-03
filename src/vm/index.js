import { err, isFun } from '../common/common.js';
import { Observe } from '../observe/index.js';
import { Compile } from '../compile/index.js';

/**
 * 入口对象
 */
export class VM {
	constructor(options) {
		this.$opts = options;
		this.$data = options.data;
		if (isFun(options)) {
			options.data = options.data();
		} this.$observe = new Observe(options.data);

		this.$compile = new Compile(options.el || document.body, this);
	}
}