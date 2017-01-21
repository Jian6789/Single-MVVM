

let uid = 0;
export class Dep {
	constructor() {
		this.id = uid++;
		this.sub = [];
	}

	addSub(watcher) {
		this.sun.push(watcher);
	}

	depend() {
		target.addDep(this);
	}

	notify() {
		this.sub.forEach((item) => {
			item.update();
		});
	}
}