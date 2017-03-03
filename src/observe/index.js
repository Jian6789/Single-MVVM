import { isObject, isArray, isFun } from '../common/common.js';
import { Dep } from '../dep/index.js';
import { target } from '../watcher/index.js';

/**
 * 发布者对象
 */
export class Observe {
    constructor(data) {
        if (!isObject(data)) {
            return;
        }
        this.walk(data);
    }

	/**
	 * [walk 对数据中属性进行遍历劫持]
	 * @param  {[type]} data [待劫持数据]
	 */
    walk(data) {
        let me = this,
            hadProperty = Object.getOwnPropertyDescriptor;
        Object.keys(data).forEach(function (key) {
            if (isFun(hadProperty(data, key).set)) {
                return;
            }
            me.convert(data, key, data[key]);
        });
    }

	/**
	 * [convert 递归数据劫持]
	 * @param  {[type]} data  [待劫持数据]
	 * @param  {[type]} key   [待劫持数据属性名]
	 * @param  {[type]} value [待劫持数据值]
	 */
    convert(data, key, value) {
        let ob = this,
            children = new Observe(value),
            dep = new Dep();
        Object.defineProperty(data, key, {
            configurable: false,
            enumerable: true,
            get: function () {
                target && target.addDep(dep);
                return value;
            },
            set: function (newVal) {
                if (value == newVal) {
                    return;
                }
                value = newVal;
                children = new Observe(newVal);
                dep.notify(isArray(newVal));
            }
        });
    }
}