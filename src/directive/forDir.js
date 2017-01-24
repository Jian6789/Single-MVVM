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

export class ForDir {
	constructor(node, vm, keys) {
		this.start = null;
		this.end = null;
		this.init(node, vm, keys);
	}

	init(node, vm, keys) {
		this.bind(node, vm, keys);
	}

	bind(node, vm, keys) {
		let arrName = keys.split('in')[1].trim(),
			me = this;
		me.upper(node, vm, keys);
		new Watcher(vm, arrName, (val, newVal) => {
			while (this.start.nextSibling != this.end) {
				this.end.parentNode.removeChild(this.start.nextSibling);
			}
			me.upper(node, vm, keys);
		});
	}

	upper(node, vm, keys) {
		if (!this.start) {
			this.start = document.createComment('start of s-for');
			node.parentNode.insertBefore(this.start, node);
		}
		if (!this.end) {
			this.end = document.createComment('end of s-for');
			node.parentNode.insertBefore(this.end, node);
		}

		node.removeAttribute('s-for');
		let item = keys.split('in')[0].trim(),
			arrName = keys.split('in')[1].trim(),
			arr = dirUnit._getVal(arrName, vm.$data),
			html = node.outerHTML,
			box = '';
		for (let i = 0, len = arr.length; i < len; i++) {
			box += html.replace(item, arrName + '.' + i);
		};
		box = changHtml(box);
		new Compile(box, vm);
		this.end.parentNode.insertBefore(box, this.end);

		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}
}