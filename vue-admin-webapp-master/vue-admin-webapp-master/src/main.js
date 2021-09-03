import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import '@/style/index.scss' // glob scss
import './plugins/element.js'
import animated from 'animate.css'
import '@/assets/iconfont/iconfont.css'

Vue.use(animated)
// import SlideVerify from 'vue-monoplasty-slide-verify'

// Vue.use(SlideVerify)
Vue.config.productionTip = false

import {post,get} from './api/http.js'
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
import './assets/css/reset.css';

import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'

    Vue.use(ElementUI)

 

    router.beforeEach((to, from, next) => {
      if (to.path === '/login') {
        next();
      } else {
        let token = sessionStorage.getItem('token');
     
        if (token === 'null' || token === '') {
          next('/login');
        } else {
          next();
        }
      }
    });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
