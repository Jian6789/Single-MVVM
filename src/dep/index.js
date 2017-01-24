

let uid = 0;

/**
 * 发布者与订阅者关联对象
 */
export class Dep {
	constructor() {
		this.id = uid++;
		this.sub = [];
	}

	/**
	 * [addSub 在sub中增加订阅者]
	 * @param {[type]} watcher [订阅者 Watcher 对象]
	 */
	addSub(watcher) {
		this.sub.push(watcher);
	}

	/**
	 * [depend 触发 Wtacher 的add事件，将dep加入 Watcher]
	 */
	depend() {
		target.addDep(this);
	}

	/**
	 * [notify 绑定数据set出发此方法，对sub中Watcher进行遍历触发update]
	 */
	notify() {
		this.sub.forEach((item) => {
			item.update();
		});
	}
}