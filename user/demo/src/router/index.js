import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login.vue'
import History from '@/components/history.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
      component: HelloWorld
    },
    {
      path: '/history',
      name: 'history',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
      component: History
    },
    {
      path: '/',
      name: 'Login',

      component: Login,
      meta: {
        title: '登录界面'
      }
    },
  ]
})


