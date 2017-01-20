import { isObject } from '../common/common.js';

export class Observe{
	constructor(data){
		if(!isObject(data)){
			return;
		}
		this.walk(data);
	}

	walk(data){
		Object.keys(data).forEach((key)=> this.convert(data,key,data[key]));		
	}

	convert(data,key,value){
		let ob = this,
				children = new Observe(value);
		Object.defineProperty(data,key,{
			configurable:false,
			enumerable:true,
			get:function (){
				return value;
			},
			set:function (newVal) {
				if(value == newVal){
					return;
				}
				value = newVal;
				children = new Observe(newVal);
			}
		});
	}
}