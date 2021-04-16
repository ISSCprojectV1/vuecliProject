import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter)


import routes1 from "@/router/part1"
import routes2 from "@/router/part2"
import routes3 from "@/router/part3"
import adminRoutes from "@/router/admin"

// 所有权限通用路由表
export const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/part1/login"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/part1/register")
  },
]

// 实例化vue时候只挂载constantRoutes
export default new VueRouter({
  mode: "history",
  routes: constantRoutes.concat(adminRoutes)
})

// 异步挂载路由，根据权限加载路由表
export const asyncRoutes = [
  {
    path: '/trade',
    component: () => import("@/components/part1/common/full"),
    redirect: '/trade/Dashboard',
    children: [
      {
        id: 8,
        name: '首页',
        path: "/trade/Dashboard",
        component: () => import("@/components/part1/common/Dashboard"),
      },
      {
        id: 9,
        name: '模态与粒度步骤',
        path: "/trade/Multimodal-multigranularity/stepBar",
        component: () => import("@/components/part1/Multimodal-multigranularity/stepBar"),
        children: [
          {
            path: 'taskInput3',
            component: () => import("@/components/part1/Multimodal-multigranularity/taskInput")
          },
          {
            path: 'taskQueryTableView',
            component: () => import("@/components/part3/Common/taskQueryTableView")
          },
          {
            path: 'taskQueryOnlyModityView',
            component: () => import("@/components/part3/Common/taskQueryOnlyModityView")
          },
          {
            path: 'taskQueryFlowChart',
            component: () => import("@/components/part3/Common/taskQueryFlowChart")
          },
          {
            path: 'taskQueryTransactionCoalition',
            component: () => import("@/components/part3/Common/taskQueryTransactionCoalition copy")
          },
        ]
      },
      {
        id: 10,
        name: '风险预警监控',
        path: "/trade/riskPrediction/riskSurveillance",
        component: () => import("@/components/part1/riskPrediction/riskSurveillance"),
      },
      {
        id: 11,
        name: '价格波动风险演化',
        path: "/trade/riskPrediction/riskPage",
        component: () => import("@/components/part1/riskPrediction/riskPageNew"),
      },
      {
        id: 12,
        name: '拍卖中心',
        path: "/trade/auction",
        component: () => import("@/views/part3/incentiveMechanism/Download/home"),
      },
      {
        id: 13,
        name: '上传数据',
        path: "/trade/uploadResource",
        component: () => import("@/components/part3/Console/mainuploadResource"),
      },
      {
        id: 14,
        path: "/trade/acpassTask/viewSpaceGranularity/:id",
        component: () => import("@/components/part1/acpassTask/viewSpaceGranularity"),
      },
      {
        id: 15,
        path: "/trade/acpassTask/activetask/:id",
        component: () => import("@/components/part1/acpassTask/activetask"),
      },
      {
        id: 16,
        path: "/trade/exceptionAnalysis/data",
        component: () => import("@/components/part1/exceptionAnalysis/exceptionData"),
      },
      {
        id: 17,
        path: "/trade/exceptionAnalysis/page",
        component: () => import("@/components/part1/exceptionAnalysis/exceptionAnalysis"),
      },
      {
        id: 18,
        path: "/trade/teamTable/:team",
        component: () => import("@/components/part3/Common/teamTable"),
      },
      {
        id: 19,
        path: "/trade/Multimodal-multigranularity/goodsgranularity",
        component: () => import("@/components/part2/goods_granularity"),
      },
      {
        id: 20,
        path: "/trade/Multimodal-multigranularity/time_advise",
        component: () => import("@/components/part2/time_advise"),
      },
      {
        id: 21,
        path: "/trade/Multimodal-multigranularity/goods_relation",
        component: () => import("@/components/part2/goods_relation"),
      },
      {
        id: 22,
        path: "/trade/Multimodal-multigranularity/goods_variety",
        component: () => import("@/components/part2/goods_variety"),
      },
      {
        id: 23,
        path: "/trade/Multimodal-multigranularity/priceshow",
        component: () => import("@/components/part2/priceshow"),
      },
      {
        id: 24,
        path: "/trade/dataFusion/dataquery",
        component: () => import("@/components/part1/dataFusion/dataquery"),
      },
      {
        id: 25,
        path: "/trade/dataFusion/datacluster",
        component: () => import("@/components/part1/dataFusion/datacluster"),
      },
    ]
  },
  {
    path: '/console',
    component: () => import("@/views/part3/incentiveMechanism/Console/home"),
    children: [
      {
        id: 3,
        path: "/console/index",
        component: () => import("@/components/part3/Console/mainHome"),
      },
      {
        id: 4,
        path: "/console/userinfo",
        component: () => import("@/components/part3/User/index"),
      },
      {
        id: 5,
        path: "/console/changePassword",
        component: () => import("@/components/part3/User/changePassword"),
      },
      {
        id: 6,
        path: "/console/manage/upload",
        component: () => import("@/components/part3/Common/uploadRecord"),
      },
      {
        id: 7,
        path: "/console/manage/score",
        component: () => import("@/components/part3/Common/mainScore"),
      },
    ]
  }
]

