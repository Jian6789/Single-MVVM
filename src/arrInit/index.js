import { isArray } from '../common/common.js'

/**
 * [arrayInit 数组扩展函数]
 * @return {[type]} [description]
 */
export let arrayInit = function(){

	/**
	 * [_copy 浅拷贝数组]
	 */
	Array.prototype._copy = function(){
		return [].slice.call(this);
	}

	/**
	 * [_del 删除数组制定下标的元素]
	 * @param  {[type]} index [数组下标]
	 */
	Array.prototype._del = function(index){
		return this.filter((item,i)=> i !== index);
	}

	/**
	 * [_pop 删除数组中第一个元素]
	 * @return {[type]} [description]
	 */
	Array.prototype._pop = function(){
		return this._del(0);
	}

	/**
	 * [_shift 删除数组最后一个元素]
	 * @return {[type]} [description]
	 */
	Array.prototype._shift = function(){
		return this._del(this.length-1);
	}

	/**
	 * [_insert 在数组指定位置插入元素]
	 * @param  {[type]} index [下标]
	 * @param  {[type]} item  [元素]
	 */
	Array.prototype._insert = function(index,item){
		let result = this._copy();
		result.splice(index,0,item);
		return result;
	}

	/**
	 * [_push 在数组末尾增加元素]
	 * @param  {[type]} item [元素]
	 */
	Array.prototype._push = function(item){
		return this._insert(this.length,item);
	}

	/**
	 * [_unpop 在数组开始增加元素]
	 * @param  {[type]} item [元素]
	 */
	Array.prototype._unpop = function(item){
		return this._insert(0,item);
	}
}