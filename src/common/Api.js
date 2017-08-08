//后台接口配置文件
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);
var config = null;

/*根据环境设置后台请求路径*/
var env = process.env.NODE_ENV;
console.log(env)
if(env == 'development') {
	config = require("../projConfig/conf.dev.js")
} else if(env == 'test') {
	config = require("../projConfig/conf.dev.js")
} else if(env == 'production') {
	config = require("../projConfig/conf.prod.js")
} else {
	config = require("../projConfig/conf.prod.js")
}

var requesturl = config.rqurl;
/*根据环境设置后台请求路径 end*/

//var version = "V1";//接口版本管理 暂时不需要

var req_config = {
	login: {
		url: "/user/login/{userName}/{pwd}",
		method: "POST",
		emulateJSON: true,
		contentType: "application/x-www-form-urlencoded"
	},
	query: {
		url: "/user/query/{page}/{pageSize}"
	}
}
var Api = {};
var index = 0;
for(let item in req_config) {

	//注册API方法
	Api[item] = function(data) {
		//匹配restful参数,从Url得到需要匹配的参数{param}
		for(let match of req_config[item].url.match(/\{(.+?)\}/g)) {
			var key = match.replace("{", "").replace("}", ""); //得到参数名
			if(data[key]) {
				var pt = new RegExp("\\{(" + key + "+?)\\}", "g"); //拼装得到替换参数的正则
				req_config[item].url = req_config[item].url.replace(pt, data[key]);
				data[key] = undefined; //将url参数置空
			} else {
				console.error("restful参数" + key + "不存在");
			}
		}

		let params = {}; //去掉空参数
		for(let key in data) {
			if(data[key]) {
				params[key] = data[key];
			}

		}

		//发送请求，返回promise对象
		return new Promise(function(reslove, reject) {
			//设定请求参数并且发送请求
			var p = Vue.http({
				url: requesturl + req_config[item].url+"?"+new Date().getTime(),//请求url，包括请求的restful参数和时间戳
				body: params,//请求参数
				headers: {
					"Content-Type": item.contentType || "application/x-www-form-urlencoded",//请求数据类型
				},
				before: () => {},//请求预处理函数
				method: item.method || "POST",//请求方式，POST GET PUT DELETE OPTION
				emulateJSON: item.emulateJSON || true  //是否序列化body
			});
			//请求结果处理
			p.then((res) => {
				if(res.body.code == 1) {//成功
					reslove(res)
				} else if(res.body.code == 3) {//需要登录
					//去登录
				} else {//出错
					reject(res)
				}

			}, function() {
				//网路错误
				console.error("网络错误");
			});
		});

	}
}
console.log(Api)
export default Api