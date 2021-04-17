import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router, {asyncRoutes} from './router'
import store from './store'
import {setToken, getToken, removeToken} from "./utils/auth"

import {Message} from 'element-ui';
import {getMenusId} from "@/api/part3";

const whiteList = ['/login', '/register',];

router.beforeEach((to, from, next) => {
  console.log('请求跳转到路由：', to.path)
  NProgress.start();

  if (getToken()) { // 有用户登录
    console.log('有用户登录')
    if (whiteList.indexOf(to.path) !== -1) { // temporal-fix of login with uncleaned cookies
      next()
      NProgress.done()
    }
    if (store.state.permission.routes.length === 0) {
      getMenusId().then(res => {
        let list = res.data
        let routesTrade = {
          path: '/trade',
          component: () => import("@/components/part1/common/full"),
          children: asyncRoutes[0].children.filter(function (el) {
            return list.includes(el.id)
          })
        }
        let routesConsole = {
          path: '/console',
          component: () => import("@/views/part3/incentiveMechanism/Console/home"),
          children: asyncRoutes[1].children.filter(function (el) {
            return list.includes(el.id)
          })
        }

        // store to store
        let childRoutesTrade = asyncRoutes[0].children.filter(function (el) {
          return list.includes(el.id)
        })
        let childRoutesConsole = asyncRoutes[1].children.filter(function (el) {
          return list.includes(el.id)
        })

        store.commit('permission/SET_ROUTES', childRoutesTrade.concat(childRoutesConsole))

        router.addRoutes([routesTrade, routesConsole])

        try {
          if (store.getters["permission/hasAccessTo"](to.path)) { // 用户有权限
            console.log("在这里")
            next({...to, replace: true})
            NProgress.done()
          } else { // 用户没有权限
            Message({
              showClose: true,
              message: '无权限访问',
              type: 'error'
            })
            next(false)
            NProgress.done()
          }
        } catch (error) {
          console.log(error)
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      // 请求进入其他页面，则要先验证是否在可访问页面set中
      try {
        if (store.getters["permission/hasAccessTo"](to.path)) { // 用户有权限
          next()
          NProgress.done()
        } else { // 用户没有权限
          Message({
            showClose: true,
            message: '无权限访问',
            type: 'error'
          })
          next(false)
          NProgress.done()
        }
      } catch (error) {
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
  NProgress.done()
})

