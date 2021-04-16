import {asyncRoutes, constantRoutes} from "@/router";

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const getters = {
  hasAccessTo: (state) => (path) => {
    console.log("store判断当前路由", path, "是否有权限")
    if (path === '/login') { // 登录界面直接进
      return true
    }
    if (!state.routes) { // state.routes为空
      return false
    }
    if (RegExp('/admin').test(path)) // 管理员界面直接进，因为在login时已经判断了是否为管理员
      return true

    let path_new = path
    // 判断是否有动态路由存在，有则修改path再进行判断
    if (!isNaN(parseInt(path.split('/').pop(), 10))) {
      path_new = ''
      let arr = path.split('/')
      for (let i = 1; i < arr.length - 1; i++)
        path_new = path_new + '/' + arr[i]
      if (path.includes('teamTable'))
        path_new = path_new + '/:team'
      else
        path_new = path_new + '/:id'
    }

    for (let index in state.routes) {
      if (state.routes[index].path === '/') {
        if (path === '/')
          return true;
        else
          continue;
      }
      if (RegExp(state.routes[index].path).test(path_new)) {
        return true
      }
    }
    return false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}

/*import { constantRoutes }from '@/router'
import { getRouters } from '@/api/part3'

const permission = {
    state: {
        routes: [],
        addRoutes: []
    },
    mutations: {
        SET_ROUTES: (state, routes) => {
            state.addRoutes = routes
            state.routes = constantRoutes.concat(routes)
        }
    },
    actions: {
        // 生成路由
        GenerateRoutes({ commit },id) {
            return new Promise(resolve => {
                // 向后端请求路由数据
                getRouters(id).then(res => {
                    const accessedRoutes = filterAsyncRouter(res.data)
                    accessedRoutes.push({ path: '*', redirect: '/login', hidden: true })
                    commit('SET_ROUTES', accessedRoutes)
                    resolve(accessedRoutes)
                })



                // //前端造的数据
                // const asyncRouterMap = [
                //     {
                //         path:'/userinfo',
                //         component:"views/part3/incentiveMechanism/User/userinfo",
                //         meta:{
                //             title:"我的信息"
                //         },
                //         children:[
                //             {
                //                 path:'/userinfo',
                //                 component:"components/part3/User/index",
                //                 meta:{
                //                     title:"个人资料"
                //                 }
                //             },
                //             {
                //                 path:'/userinfo/download',
                //                 component:"components/part3/User/download",
                //                 meta:{
                //                     title:"我的下载"
                //                 }
                //
                //             },
                //             {
                //                 path:'/userinfo/score',
                //                 component:"components/part3/User/score",
                //                 meta:{
                //                     title:"我的积分"
                //                 }
                //             },
                //             {
                //                 path:'/userinfo/group',
                //                 component: "components/part3/User/group",
                //                 meta:{
                //                     title:"我的群组"
                //                 }
                //             }
                //
                //         ]
                //     },
                //     {
                //         path: "/console",
                //         component:"views/part3/incentiveMechanism/Console/home",
                //         meta: {
                //             title:"工作台"
                //         },
                //         children:[
                //             {
                //                 path: "/console/",
                //                 component:"components/part3/Console/mainHome",
                //                 meta:{
                //                     title:"首页"
                //                 }
                //
                //             },
                //             {
                //                 path: "/console/uploadResources",
                //                 component:"components/part3/Console/mainuploadResource",
                //                 meta:{
                //                     title:"上传资源"
                //                 }
                //             },
                //             {
                //                 path: "/console/upload",
                //                 component:"components/part3/Common/mainUpload",
                //                 meta:{
                //                     title:"上传明细"
                //                 }
                //             },
                //             {
                //                 path: "/console/score",
                //                 component:"components/part3/Common/mainScore",
                //                 meta:{
                //                     title:"积分明细"
                //                 }
                //             },
                //             {
                //                 path: "/console/download",
                //                 component:"components/part3/Common/mainDownload",
                //                 meta:{
                //                     title:"下载明细"
                //                 }
                //             },
                //             {
                //                 path: "/console/editorial/:id",
                //                 component:"/components/part3/Console/editorial",
                //                 meta:{
                //                     title:"编辑",
                //                     hidden:true
                //                 }
                //             },
                //         ]
                //     },
                //
                //
                // ]
                // const accessedRoutes = filterAsyncRouter(asyncRouterMap)
                // accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
                // commit('SET_ROUTES', accessedRoutes)
                // resolve(accessedRoutes)

            })
        }
    }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
    return asyncRouterMap.filter(route => {
        if (route.component) {
            // // Layout组件特殊处理
            // if (route.component === 'Layout') {
            //     route.component = Layout
            // } else {
            //     route.component = loadView(route.component)
            // }
            route.component = loadView(route.component)
        }
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })
}

export const loadView = (view) => { // 路由懒加载
    return () =>  import(`@/${view}.vue`)

}

export default permission*/
