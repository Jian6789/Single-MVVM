参考：
	[剖析vue实现原理，自己动手实现mvvm](https://github.com/DMQ/mvvm)

采用 gulp + webpack + babel + ES6；
引入后暴露全局变量Single;
路由如下：

    Single.Routers = {
    		home:
		{
			tempUrl:'view/index.html',
			ctrUrl:'controller/index.js'
		},
		demo:
		{
			tempUrl:'view/demo.html',
			ctrUrl:'controller/demo.js'
		}
	};
VM：

    Single.page = function(){
		list = [{name:'Job'},{name:'Bob'},{name:'Son'},{name:'Young'},{name:'Dock'},{name:'Jack'}];
		var opts = {
			el:'#sp-app',
			data:{
				list:list
			}
		}
		var a = new Single.VM(opts);
	};
ajax:
	ajax部分包括 GET POST JSONP三种类型，使用方法仿照jquery，由于本人对请求头部分毫无把握，故爱看自己去看（src/ajax/index.js）！

因本人水平有限，难免有所疏漏，如有错误，你特么来打我啊（#滑稽）

邮箱：[569628556@qq.com](569628556@qq.com)
密码：bugaosuni233333
 
