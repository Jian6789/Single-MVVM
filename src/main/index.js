import { err } from '../common/common.js'
import { Observe } from '../observe/index.js';

export default class Single {
	constructor(options){
		return new Observe(options.data);
	}
}

window.Single = Single;