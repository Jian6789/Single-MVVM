import {
    isFun,
    regText
} from '../common/common.js';
import {
    Watcher
} from '../watcher/index.js';
import {
    ForDir
} from './forDir.js';
import {
    IfDir
} from './ifDir.js';

/**
 * [dirUnit 指令-数据绑定单元]
 * @包含各指令方法 [test | event]
 */
export const dirUnit = {

	/**
	 * [v-text指令 \ {{.+}}绑定数据修改函数]
	 * @param  {[type]} node [需要更新的节点]
	 * @param  {Single} vm   [创建的全局对象]
	 * @param  {[type]} keys [指令中对应的数据位置]
	 */
    text: (node, vm, keys) => {
        dirUnit._bind(node, vm, keys, 'text');
    },
    if: (node, vm, keys) => new IfDir(node, vm, keys),

    for: (node, vm, keys) => new ForDir(node, vm, keys),

	/**
	 * [v-html指令]
	 * @param  {[type]} node [需要更新的节点]
	 * @param  {Single} vm   [创建的全局对象]
	 * @param  {[type]} keys [指令中对应的数据位置]
	 */
    html: (node, vm, keys) => {
        dirUnit._bind(node, vm, keys, 'html');
    },

	/**
	 * [v-class指令]
	 * @param  {[type]} node [需要更新的节点]
	 * @param  {Single} vm   [创建的全局对象]
	 * @param  {[type]} keys [指令中对应的数据位置]
	 */
    class: (node, vm, keys) => {
        dirUnit._bind(node, vm, keys, 'class');
    },

	/**
	 * [v-model指令]
	 * @param  {[type]} node [需要更新的节点]
	 * @param  {Single} vm   [创建的全局对象]
	 * @param  {[type]} keys [指令中对应的数据位置]
	 */
    model: (node, vm, keys) => {
        dirUnit._bind(node, vm, keys, 'model');
        let me = this,
            _data = vm.$data,
            oldVal = dirUnit._getVal(keys, _data);
        node.addEventListener('input', (event) => {
            oldVal = dirUnit._getVal(keys, _data);
            let ev = event || window.event,
                val = ev.target.value;
            if (val == oldVal) {
                return;
            }
            dirUnit._setVal(keys, _data, val);

        }, true);
    },
	/**
	 * [v-on:ev 事件指令]
	 * @param  {[type]} node   [需要更新的节点]
	 * @param  {[type]} vm     [创建的全局对象]
	 * @param  {[type]} dirVal [指令中的值]
	 * @param  {[type]} dir    [指令名]
	 */
    event: (node, vm, dirVal, dir) => {
        let ev = dir.split(':')[1],
            fn = vm.$opts.event[dirVal];
        if (isFun(fn)) {
            node.addEventListener(ev, fn.bind(vm), false);
        }
    },

	/**
	 * [将节点值与数据进行绑定，当数据修改时，遍历该数据所有订阅者dep.sub，调用 Watcher 中的匿名函数]
	 * @param  {[type]} node [需要更新的节点]
	 * @param  {[type]} vm   [创建的全局对象]
	 * @param  {[type]} keys [指令中对应的数据位置]
	 * @param  {[type]} dir  [指令名]
	 */
    _bind: (node, vm, keys, dir) => {
        let fn = upper[dir + 'Upper'];
        isFun(fn) && fn(node, dirUnit._getVal(keys, vm.$data));
        new Watcher(vm, keys, (newVal, val) => {
            isFun(fn) && fn(node, newVal, val);
        });
    },

	/**
	 * [根据指令值获取绑定的数据值]
	 * @param  {[str]} keys [指令中对应的数据位置]
	 * @param  {[obj]} val  [数据所在位置 / 数据]
	 */
    _getVal: (keys, data) => {
        keys.split('.').forEach(function (key) {
            data = data[key];
        });
        return data;
    },

	/**
	 * [设置data中的某项的值，触发set]
	 * @param  {[str]} keys [指令中对应的数据位置]
	 * @param  {[obj]} data [new Single() 参数对象 data]
	 * @param  {[any]} val  [新值]
	 */
    _setVal: (keys, data, val) => {
        let _keys = keys.split('.'),
            len = _keys.length - 1;
        _keys.forEach((key, i) => {
            if (i == len) {
                data[key] = val;
            } else {
                data = data[key];
            }
        });
    }
}

/**
 * [upper 指令更新单元]
 * @param  {[str]} node 	[绑定节点]
 * @param  {[obj]} newVla [新值]
 * @param  {[any]} val  	[原值]
 */
const upper = {
    textUpper: (node, newVal, oldVal) => {
        oldVal = oldVal != undefined ? (oldVal + '') : regText;
        node.textContent = node.textContent.replace(oldVal, newVal);
    },

    htmlUpper: (node, newVal) => {
        node.innerHTML = newVal;
    },

    modelUpper: (node, newVal, val) => {
        node.value = newVal ? newVal : '';
    },

    classUpper: (node, newVal, val) => {
        node.className = (val ?
            node.className.replace(val, newVal) 
            : (node.className + ' ' + newVal)).trim();
    }
}

export function changHtml(html) {
    return document.createRange().createContextualFragment(html);
}