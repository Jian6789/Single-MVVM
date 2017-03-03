
let jsonpId = 0
export function ajax(aD) {
	if (!aD.url) throw new Error('请输入正确的URL!');
	aD.type = aD.type || 'GET';
	aD.async = aD.async || true;
	aD.data = encodeFormat(aD.data);
	aD.url = aD.type == 'POST' ? aD.url : aD.url + (aD.url.indexOf('?') == -1 ? '?' : '&') + aD.data;
	if (aD.type == 'jsonp') {
		ajaxJsonp(aD);
		return false;
	}
	let re = new XMLHttpRequest;
	re.open(aD.type, aD.url, aD.async);
	re.onreadystatechange = function() {
		if (re.readyState == 4 && aD.success) {
			aD.success(re.response);
		}
	}
	re.send(aD.type === 'GET' ? null : aD.data);
}

function encodeFormat(obj) {
	if (!obj) return '';
	return Object.keys(obj).reduce((re, item) => re += '&' + item + '=' + obj[item], '').slice(1);
}

function ajaxJsonp(ao) {
	if (!ao.jsonp) throw new Error('请输入函数名称');
	let fnName = 'jsonp' + '_' + (jsonpId++);
	ao.url = ao.url + ((ao.url.indexOf('?') == -1 ? '?' : '&')) + ao.jsonp + '=' + fnName;
	let script = document.createElement('script');
	global[fnName] = function(response) {
		try {
			ao.success(response);
		} finally {
			delete global[fnName];
			script.parentNode.removeChild(script);
		}
	}
	script.src = ao.url;
	document.body.appendChild(script);
}