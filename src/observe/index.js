import { isObject,isArray } from '../common/common.js';
import { Dep,target } from '../dep/index.js';

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
				children = new Observe(value),
				dep = new Dep();
		Object.defineProperty(data,key,{
			configurable:false,
			enumerable:true,
			get:function (){
				target && target.addDep(dep);
				return value;
			},
			set:function (newVal) {
				if(value == newVal){
					return;
				}
				value = newVal;
				children = new Observe(newVal);
				dep.notify();
			}
		});
	}
}