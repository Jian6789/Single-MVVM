import { isEleNode,isTextNode,isDir,isEventDir,toArray } from '../common/common.js';
import { dirUnit } from '../directive/index.js';


export class Compile{
	constructor(el,vm){
		this.$opts = vm.$opts;
		this.$data = vm.$opts.data;
		this.$el = el.nodeType ? el : querySelector(el);

		if(this.$el){
			this.analyEleNode(this.$el);
		}
	}

	node2Fragment(node){
		let frag = document.createDocumentFragment(),
				child;
		while(child = node.firstChild){
			fragment.appendChild(child);
		}
	}

	/**
	 * [analyEleNode 并文档中的指令进行解析]
	 * @param  {node} el [ 开始节点（递归） ]
	 * @return {[undefined]}
	 */
	analyEleNode(el){
		let child = el.childNode,
				me = this,
				reg = /\{\{(.+)\}\}/;
		toArray(child).forEach((node)=>{
			if(isEleNode(node)){//若为元素节点对其属性节点进行遍历
				me.analyArrtNode(node);
			}else if(isTextNode(node) && reg.test(el.textContent)){
				dirUnit.text(node,me.$data,RegExp.$1);
			}
			if(node.childNode && node.childNode.length > -1){
				me.analyEleNode(node);
			}
		});
	}

	/**
	 * [analyArrtNode 对元素节点的属性进行遍历，找出其中指令]
	 * @param  {[node]} node [需要遍历属性的节点]
	 * @return {[undefined]}
	 */
	analyArrtNode(node){
		let attrs = node.attributes,
				me = this;

		toArray(attrs).forEach((attr)=>{
			if(isDir(attr)){
				let dirName = attr.split('-')[1],
						dirVal = attrs[attr];
				if(isEventDir(dirName)){
					dirUnit.event(node,me.$opts,dirVal,dirName);
				}else{
					dirUnit[dirName](node,me.$data,dirVal);
				}
			}
		});
	}
}