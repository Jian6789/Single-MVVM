import {
	VM
} from '../vm/index.js';
import {
	ajax
} from '../ajax/index.js';
import {
	isFun
} from '../common/common.js';

class Single {
	constructor() {
		this.Routers = [];
		this.VM = VM;
		this.page = null;
		this.ajax = ajax;
		let me = this;
		window.addEventListener('load', function() {
			me.urlChange();
		});
		window.addEventListener('hashchange', function() {
			me.urlChange();
		});
	}

	urlChange() {
		let router = this.getRouter();
		if(router){
			this.loadTemplate(router.tempUrl,router.ctrUrl);
		}
	}

	getRouter() {
		let curURL = this.getURL(),
			router = this.Routers[curURL];
		return router ? router : this.Routers[0];
	}

	getURL() {
		return location.hash.split("?")[0].split("#")[1];
	}

	loadScript(url) {
		let script = document.createElement('script'),
			me = this;
		script.src = url;
		script.async = true;
		script.onload = function() {
			document.body.removeChild(script);
			if(isFun(me.page)){
				me.page();
			}
		}
		document.body.appendChild(script);
	}

	loadTemplate(tempUrl,ctrUrl) {
		let me = this;
		me.ajax({
			type: 'GET',
			url: tempUrl,
			async:false,
			success: function(result) {
				document.getElementById('sp-app').innerHTML = result;
				me.loadScript(ctrUrl);
			}
		});
	}
}

window.Single = new Single();