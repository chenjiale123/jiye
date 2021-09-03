// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import {post,get} from '../api/http.js'
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
import './assets/css/reset.css';

import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'

    Vue.use(ElementUI)

    router.beforeEach((to, from, next) => { 
      if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆 
     
       if (localStorage.getItem('token')) { // 查询本地存储信息是否已经登陆 
        next(); 
       } else { 
        console.log('22222')
        next({ 
         path: '/', // 未登录则跳转至login页面 
         query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面 
         }); 
         console.log('3333')
       } 
      } else { 
        
       next(); 
      } 
     });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
