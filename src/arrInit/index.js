import { isArray } from '../common/common.js'

export let arrayInit = function(){
	Array.prototype._copy = function(){
		let re = [];
		this.forEach((item)=> re.push(item));
		return re;
	}

	Array.prototype._del = function(index){
		return this.filter((item,i)=> i !== index);
	}

	Array.prototype._pop = function(){
		return this._del(0);
	}

	Array.prototype._shift = function(){
		return this._del(this.length-1);
	}

	Array.prototype._insert = function(index,item){
		let result = this._copy();
		result.splice(index,0,item);
		return result;
	}

	Array.prototype._push = function(item){
		return this._insert(this.length-1,item);
	}

	Array.prototype._unpop = function(item){
		return this._insert(0,item);
	}
}