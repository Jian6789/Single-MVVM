参考：
	[剖析vue实现原理，自己动手实现mvvm](https://github.com/DMQ/mvvm)

仿照Vue.js写的mvvm，其中ViewModel与Vue.js类似（仿照参考项目所写，不包含 v-for，v-if指令实现，自己根据理解增加了v-for，v-if指令），
后自己写了路由及ajax；
采用 gulp + webpack + babel + ES6；
引入后暴露全局变量Single;
路由如下：

    Single.Routers = [
		{
			url:'home',
			tempUrl:'view/index.html',
			ctrUrl:'controller/index.js'
		},
		{
			url:'demo',
			tempUrl:'view/demo.html',
			ctrUrl:'controller/demo.js'
		}
	];
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

About Me：
	从自学JS到今天（2017-1-24）大概6个月多一点，期间工作5个月（5个月中有个月写.net及1个月写PHP，只有1个月argular），辞职后专研JS，这东西昨天写完，特此纪念（另：我还会用这东西做一个WebApp，给自己做的一个记录超市商品价格的工具，这工具原来做过用的lumen+mysql，这次是重构，当时两天做完，这次重构不知道得多久，BUG啊），希望我1个月后深圳之行顺利！

因本人水平有限，难免有所疏漏，如有错误，你特么来打我啊（#滑稽）

邮箱：[yang916789@outlook.com](yang916789@outlook.com)
密码：bugaosuni233333
 
