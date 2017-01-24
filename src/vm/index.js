import { err,isFun } from '../common/common.js';
import { arrayInit } from '../arrInit/index.js';
import { Observe } from '../observe/index.js';
import { Compile } from '../compile/index.js';

/**
 * 入口对象
 */
export class VM {
	constructor(options){
		arrayInit();
		this.$opts = options;
		this.$data = options.data;
		if(isFun(options)){
			options.data = options.data();
		}
		new Observe(options.data);

		this.$compile = new Compile(options.el || document.body,this);
	}
}