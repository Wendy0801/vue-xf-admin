// 核心
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'

// 模拟数据
import Mock from './mock';
Mock.bootstrap();

// 图片预览
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// UI框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './themes/main.scss';
Vue.use(ElementUI)

// 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes/index'
const router = new VueRouter({
    routes
})

// 状态管理
import Vuex from 'vuex'
import store from './vuex/store'
Vue.use(Vuex)

// 进度条
import NProgress from 'nprogress' //页面顶部进度条
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false });

import ApiService from 'SERVICES/api.service';
// 路由切换前效果
router.beforeEach((to, from, next) => {
    //NProgress.start();
    if (to.path == '/login') {
        sessionStorage.removeItem('ssId');
        ApiService.writeCookie({
            'ssId':''
        },-1);
    }
    let user = sessionStorage.getItem('ssId') ;
    // if(!user){
    //      user = ApiService.getCookie('ssId') || null ;
    //      if(user) {
    //          sessionStorage.setItem('ssId',user) ;
    //      }
    // }
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else {
        var authStr = ApiService.getCookie('authList') || '/login,/';
        var authList = authStr.split(',');
        var isInAuth = authList.filter(item=>to.path.indexOf(item)!==-1) ;
        if(isInAuth.length===0) {
            next({'path':'/'});
        }
        else{
            next()
        }
    }
})

// 引入过滤器
import './filters';
//router.afterEach(transition => {
//NProgress.done();
//});

// 启动
import App from './App'
new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
    //render: h => h(Login)
}).$mount('#app')

//router.replace('/login')
