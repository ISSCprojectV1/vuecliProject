import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import store from './store'
import {setToken, getToken, removeToken} from "./utils/auth"

import {Message} from 'element-ui';

const whiteList = ['/login', '/register',];

router.beforeEach((to, from, next) => {
  console.log('start router guard')
  console.log(to.path)
  NProgress.start();

  if (getToken()) { // 有用户登录
    console.log('有用户登录')
    // if (to.path === '/login') { // 用户已登录，则把login页面重定向到首页
    //   console.log('免登录')
    //   next({path: '/trade/Dashboard'})
    //   NProgress.done()
    // } else
    { // 请求进入其他页面，则要先验证是否在可访问页面set中
      try {
        console.log('hasAccessTo?')
        console.log(to.path)
        console.log(store.getters["permission/hasAccessTo"](to.path))
        if (store.getters["permission/hasAccessTo"](to.path)) { // 用户有权限
          next()
          NProgress.done()
        } else { // 用户没有权限
          Message({
            showClose: true,
            message: 'permission.js温馨提醒您没有权限',
            type: 'error'
          })
          next(false)
          NProgress.done()
        }
      } catch (error) {
        console.log('permission.js报错')
        console.log(error)
      }
    }
  } else { // 无用户登录
    if (whiteList.indexOf(to.path) !== -1)
      next()
    else {
      next('/login');
      NProgress.done();
    }
  }
})

router.afterEach(() => {
  console.log('end router guard')
  NProgress.done()
})

