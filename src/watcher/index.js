export let target = null;

/**
 * 订阅者对象
 */
export class Watcher {
	constructor(vm, keys, fn) {
		this.$vm = vm;
		this.$keys = keys;
		this._fn = fn;
		this.depIds = {};
		this.val = this.get();
	}

	/**
	 * [get 获取数据原始值]
	 */
	get() {
		target = this;
		let val = this.getVal();
		target = null;
		return val;
	}

	/**
	 * [getVal 遍历keys获取属性值，并出发数据get方法，get方法中触发watcher.addDep]
	 */
	getVal() {
		let keys = this.$keys.split('.'),
			val = this.$vm.$data;
		keys.forEach((key) => {
			val = val[key];
		});
		return val;
	}

	/**
	 * [addDep 将Dep加入Watcher.depIds，触发Dep.addSub]
	 * @param {[type]} dep [Dep对象]
	 */
	addDep(dep) {
		if (!this.depIds.hasOwnProperty(dep.id)) {
			this.depIds[dep.id] = dep;
			dep.addSub(this);
		}
	}

	/**
	 * [update dirUnit._bind中传入的参数]
	 */
	update() {
		let newVal = this.get(),
			val = this.val;
		if (val == newVal) {
			return;
		}
		this.val = newVal;
		this._fn.call(this.$vm, newVal, val, this);
	}
}