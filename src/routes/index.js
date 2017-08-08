
// 基础布局
const CoreLayout = resolve => require(['LAYOUTS/Core.layout'], resolve);

// 页面
const Login = resolve => require([`PAGES/login`], resolve);
// const NotFound = resolve => require(['PAGES/404'], resolve);
// const Main = resolve => require(['PAGES/Main'], resolve);
// const Table = resolve => require(['PAGES/nav1/Table'], resolve);
// const Form = resolve => require(['PAGES/nav1/Form'], resolve);
// const user = resolve => require(['PAGES/nav1/user'], resolve);
// const Page4 = resolve => require(['PAGES/nav2/Page4'], resolve);
// const Page5 = resolve => require(['PAGES/nav2/Page5'], resolve);
// const Page6 = resolve => require(['PAGES/nav3/Page6'], resolve);
// const echarts = resolve => require(['PAGES/charts/echarts'], resolve);
const Welcome = resolve => require(['PAGES/welcome/welcome'], resolve);


let routes = [
  {
    path: '/',
    component: CoreLayout,
    hidden: true,
    name: '欢迎使用星粉后台管理系统!',
    // children: [
    //   { path: '/', component: Welcome, hidden: true, name: '欢迎使用星粉后台管理系统!' },
    // ]
  },
  {
    path: '/login',
    component: Login,
    name: '登陆',
    hidden: true
  },
];

import guoRoutes from './routes.guo';
routes = routes.concat(guoRoutes);

export default routes; 
