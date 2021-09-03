import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import HelloWorld from '@/views/HelloWorld'
import Login from '@/views/Login.vue'
import History from '@/views/history.vue'
Vue.use(Router)

import Layout from '@/layout'
import NavTest from './modules/nav-test'
import { Message } from 'element-ui'
import getTitle from '@/utils/getTitle'

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/*通用routers*/
export const currencyRoutes = [
 
  {
    path: '/login',
    name: 'Login',

    component: Login,
    meta: {
      title: '登录界面'

    },
    hidden: true
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/HelloWorld'),
        meta: { title: '首页', icon: 'el-icon-s-data' }
      }
    ]
  },
  {
    path: '/',
    name: 'history',
    component: Layout,
    redirect: '/history',
    children: [
      {
        path: 'history',
        name: 'history',
        component: () => import('@/views/history'),
        meta: { title: '记录', icon: 'el-icon-s-data' }
      }
    ],
    hidden:true
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Layout,
    redirect: '/personal/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Personal-index',
        component: () => import('@/views/personal'),
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '/driver',
    name: 'Driver',
    component: Layout,
    redirect: '/driver/index',
    children: [
      {
        path: 'index',
        name: 'Driver-index',
        component: () => import('@/views/driver-page'),
        meta: { title: '添加名片', icon: 'el-icon-s-flag' }
      }
    ],
    hidden: true
  },
  {
    path: '/health',
    name: 'Health',
    component: Layout,
    redirect: '/health/index',
    children: [
      {
        path: 'index',
        name: 'Health-index',
        component: () => import('@/views/health'),
        meta: { title: '健康码上传', icon: 'el-icon-s-flag' }
      }
    ]

  },
  {
    path: '/addArticle',
    name: 'AddArticle',
    component: Layout,
    redirect: '/addArticle/index',
    children: [
      {
        path: 'index',
        name: 'addArticle-index',
        component: () => import('@/views/addArticle'),
        meta: { title: '添加文章', icon: 'el-icon-s-flag' }
      }
    ],
    hidden: true
  },
  {
    path: '/icons',
    component: Layout,
    name: 'Icons',
    redirect: '/icons/index',
    children: [
      {
        path: 'index',
        name: 'Icons-index',
        component: () => import('@/views/icons'),
        meta: { title: '用户列表', icon: 'el-icon-picture-outline' }
      }
    ]
  },
 
   {
    path: '/article',
    component: Layout,
    name: 'article',
    redirect: '/article/index',
    children: [
      {
        path: 'index',
        name: 'article-index',
        component: () => import('@/views/article'),
        meta: { title: '干货内容', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/record',
    component: Layout,
    name: 'record',
    redirect: '/record/index',
    children: [
      {
        path: 'index',
        name: 'record-index',
        component: () => import('@/views/record'),
        meta: { title: '浏览记录', icon: 'el-icon-picture-outline' }
      }
    ],
    hidden: true
  },
  {
    path: '/roleManage',
    component: Layout,
    name: 'roleManage',
    redirect: '/roleManage/index',
    children: [
      {
        path: 'index',
        name: 'roleManage-index',
        component: () => import('@/views/roleManage'),
        meta: { title: '部门管理', icon: 'el-icon-picture-outline' }
      }
    ]
  },
]
/*动态添加routers*/
export const asyncRoutes = [

  


  {
    path: '/error',
    component: Layout,
    name: 'Error',
    redirect: '/error/404',
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/error-page/404'),
        meta: { title: '404', icon: 'el-icon-s-release' }
      }
    ]
  },

  NavTest,
  {
    path: '*',
    name: '*404',
    redirect: '/404',
    hidden: true
  }
]
const creatRouter = () => {
  return new Router({
    routes: currencyRoutes,
    scrollBehavior() {
      return { x: 0, y: 0 }
    }
  })
}

const router = creatRouter()

// 解决addRoute不能删除动态路由问题
export function resetRouter() {
  const reset = creatRouter()
  router.matcher = reset.matcher
}

// 导航守卫
router.beforeEach(async (to, from, next) => {
  document.title = getTitle(to.meta.title)
  if (to.path === '/login') {
    next()
  } else {
    if (store.getters.token) {
      const hasRoles = store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/_getInfo')
          const addRoutes = await store.dispatch(
            'permission/getAsyncRoutes',
            roles
          )
          router.addRoutes(addRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          Message.error(error)
        }
      }
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})
export default router
