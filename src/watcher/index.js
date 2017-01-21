

export let target = null;

export class Watcher{
	constructor(vm,keys,fn){
		this.$vm = vm;
		this.$keys = keys;
		this._fn = fn;
		this.depIds = {};
		this.val = this.get();
	}

	get(){
		target = this;
		let val = this.getVal();
		target = null;
		return val;
	}

	getVal(){
		let keys = this.$keys.split(','),
				val = this.$vm.$data;
		keys.forEach((key) => {
			val = val[key];
		});
		return val;
	}

	addDep(dep){
		if(!this.depIds.hasOwnProperty(dep.id)){
			this.depIds[dep.id] = dep;
			dep.addSub(this);
		}
	}

	update(){
		let newVal = this.get(),
				val = this.val;
		if(val == newVal){
			return;
		}
		this.val = newVal;
		this._fn.call(this.$vm,val,newVal);
	}
}