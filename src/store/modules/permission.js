import {asyncRoutes, constantRoutes} from "@/router";

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    console.log(routes)
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const getters = {
  hasAccessTo: (state) => (path) => {
    console.log('requesting routing to:')
    console.log(path)
    console.log('state.routes:')
    console.log(state.routes)
    if(path === '/login') {
      console.log('path is login, return true')
      return true
    }
    if (!state.routes) {
      console.log('state.routes is empty!')
      return false
    }
    if (RegExp('/admin').test(path))
      return true
    for (let index in state.routes) {
      console.log(state.routes[index].path)
      if (state.routes[index].path === '/') {
        if (path === '/')
          return true;
        else
          continue;
      }
      if (RegExp(state.routes[index].path).test(path)) {
        console.log('匹配到存储的允许的route：')
        console.log(state.routes[index].path)
        return true
      }
    }
    // if (RegExp('trade').test(path)) { // path contains trade
    //   for (let index in state.routes[0].children)
    //     if (RegExp(state.routes[0].children[index].path).test(path))
    //       return true
    // } else if (RegExp('console').test(path)) { // path contains console
    //   for (let index in state.routes[1].children)
    //     if (RegExp(state.routes[1].children[index].path).test(path))
    //       return true
    // }
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
