import {
	isEleNode,
	isTextNode,
	isDir,
	isEventDir,
	isForDir,
	toArray,
	regText
} from '../common/common.js';
import {
	dirUnit
} from '../directive/index.js';


export class Compile {
	constructor(el, vm, isDel) {
		this.$vm = vm;
		this.$opts = this.$vm.$opts;
		this.$data = this.$opts.data;
		this.$isDel = isDel || false;
		this.$el = el.nodeType ? el : document.querySelector(el);

		if (this.$el) {
			let frag = this.node2Fragment(this.$el);
			this.analyEleNode(frag);
			this.$el.appendChild(frag);
		}
	}

	/**
	 * [node2Fragment 将节点放入文档碎片]
	 * @param  {[type]} node [节点]
	 */
	node2Fragment(node) {
		let frag = document.createDocumentFragment(),
			child;
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
	analyEleNode(el) {
		let child = el.childNodes,
			me = this;
		toArray(child).forEach((node) => {
			if (isEleNode(node)) { //若为元素节点对其属性节点进行遍历
				me.analyArrtNode(node);
			} else if (isTextNode(node) && regText.test(node.textContent)) {
				dirUnit.text(node, me.$vm, RegExp.$1.trim());
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
	analyArrtNode(node) {
		let attrs = node.attributes,
			me = this,
			attrName = '';

		toArray(attrs).forEach((attr) => {
			attrName = attr.name;
			if (isDir(attrName)) {
				let dirName = attrName.split('-')[1],
					dirVal = attr.value.trim();
				if (isEventDir(dirName)) {
					dirUnit.event(node, me.$vm, dirVal, dirName);
				} else {
					dirUnit[dirName](node, me.$vm, dirVal);
				}
			} else if (regText.test(attr.textContent)) {
				dirUnit.text(attr, me.$vm, RegExp.$1.trim());
			}
		});
	}
}