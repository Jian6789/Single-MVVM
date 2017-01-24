import {
	dirUnit
} from './index.js';
import {
	Compile
} from '../compile/index.js';
import {
	changHtml
} from '../directive/index.js';
import {
	Watcher
} from '../watcher/index.js';

export class IfDir {
	constructor(node, vm, keys) {
		this.start = null;
		this.end = null;
		this.init(node, vm, keys);
	}

	init(node, vm, keys) {
		this.bind(node, vm, keys);
	}

	bind(node, vm, keys) {
		let me = this;
		new Compile(node,vm);
		me.upper(node, vm, keys,dirUnit._getVal(keys,vm.$data));
		new Watcher(vm, keys, (newVal, val) => {
			if(!!newVal == !!val){
				return;
			}
			me.upper(node, vm, keys,newVal);
		});
	}

	upper(node, vm, keys,newVal,val) {
		if (!this.start) {
			this.start = document.createComment('start of s-if');
			node.parentNode.insertBefore(this.start, node);
		}
		if (!this.end) {
			this.end = document.createComment('end of s-if');
			node.parentNode.insertBefore(this.end, node);
		}
		if(node.parentNode) {
			node.parentNode.removeChild(node);
		}
		if(newVal){
			this.end.parentNode.insertBefore(node,this.end);
		}
	}
}