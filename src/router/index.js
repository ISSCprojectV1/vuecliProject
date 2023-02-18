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
    redirect: '/trade/Dashboard'
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
  {
    path: "/trade",
    component: () => import("@/components/part1/common/full"),
    children: [
      {
        path:"/trade/PolicyRisk/event_calendar",
        component: () => import("@/components/part1/PolicyRisk/event_calendar"),
        meta: {
          title: "政策-事件日历"
        }
      },
      {
        path:"/trade/PolicyRisk/viewIndustryPolicy",
        component: () => import("@/components/part1/PolicyRisk/viewIndustryPolicy"),
        meta: {
          title: "业内政策1"
        }
      },
      {
        path:"/trade/PolicyRisk/viewIndustryPolicyco",
        component: () => import("@/components/part1/PolicyRisk/viewIndustryPolicyco"),
        meta: {
          title: "业内政策1"
        }
      },
      {
        path:"/trade/PolicyRisk/viewAssociatedPolicy",
        component: () => import("@/components/part1/PolicyRisk/viewAssociatedPolicy"),
        meta: {
          title: "关联政策"
        }
      },
      {
        path:"/trade/PolicyRisk/viewAssociated",
        component: () => import("@/components/part1/PolicyRisk/viewAssociated"),
        meta: {
          title: "关联系统风险"
        }
      }
    ]
  },
]

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
            path: 'taskInput',
            component: () => import("@/components/part1/Multimodal-multigranularity/taskInput")
          },
          {
            path: 'taskInputForRS',
            component: () => import("@/components/part1/Multimodal-multigranularity/taskInputForRS")
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
          {
            path: 'taskQueryTransactionCoalitionForRS',
            component: () => import("@/components/part3/Common/taskQueryTransactionCoalitionForRS")
          },
          {
            path: 'algorithmAnalysisTable',
            component: () => import("@/components/part1/Multimodal-multigranularity/algorithmAnalysisTable")
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
      {
        id: 26,
        path: "/trade/riskPrediction/riskVolumePicture",
        component: () => import("@/components/part1/riskPrediction/riskVolumePicture"),
      },
      {
        id: 27,
        path: "/trade/riskPrediction/riskVolumeSurveillance",
        component: () => import("@/components/part1/riskPrediction/riskVolumeSurveillance"),
      },

      {
        id: 28,
        path: '/trade/auctionNew/auctionNew',
        component: () => import("@/components/admin/auctionNew"),
      },
      {
        id: 29,
        path: '/trade/auctionNew/data',
        component: () => import("@/components/admin/data"),
      },
      {
        id: 30,
        path: '/trade/auctionNew/score',
        component: () => import("@/components/admin/score"),
      },
      {
        id: 31,
        path: "/trade/insiderTrading/tradingDetection",
        component: () => import("@/components/part4/tradingDetection"),
      },
      {
        id: 32,
        path: "/trade/insiderTrading/relationDetection/:id",
        component: () => import("@/components/part4/relationDetection"),
      },
      {
        id: 33,
        path: "/trade/PolicyRisk/event_calendar",
        component: () => import("@/components/part1/PolicyRisk/event_calendar"),
      },
      {
        id: 34,
        path: "/trade/PolicyRisk/viewIndustryPolicy",
        component: () => import("@/components/part1/PolicyRisk/viewIndustryPolicy"),
      },
      {
        id: 35,
        path: "/trade/PolicyRisk/viewIndustryPolicyco/:platform",
        component: () => import("@/components/part1/PolicyRisk/viewIndustryPolicyco"),
      },
      {
        id: 36,
        path: "/trade/PolicyRisk/viewAssociatedPolicy",
        component: () => import("@/components/part1/PolicyRisk/viewAssociatedPolicy"),
      },
      // default risk
      {
        id: 47,
        path: "/trade/DefaultRisk/transactionEvaluation",
        component: () => import("@/components/part4/DefaultRisk/transactionEvaluation"),
      },
      {
        id: 38,
        path: "/trade/DefaultRisk/entityEvaluation",
        component: () => import("@/components/part4/DefaultRisk/entityEvaluation"),
      },
      {
        id: 39,
        path: "/trade/DefaultRisk/categoryEvaluation",
        component: () => import("@/components/part4/DefaultRisk/categoryEvaluation"),
      },
      //  价格波动风险预警与传导
      {
        id: 40,
        path: "/trade/riskPrediction/riskPropagation",
        component: () => import("@/components/part1/riskPrediction/riskPropagation"),
      },
      {
        id: 41,
        name: '历史价格波动风险演化图',
        path: "/trade/riskPrediction/forecastHistoryRisk",
        component: () => import("@/components/part1/riskPrediction/forecastHistoryRisk"),
      },
      {
        id: 42,
        name: '风险预警监控',
        path: "/trade/riskPrediction/forecastMonitorInfo",
        component: () => import("@/components/part1/riskPrediction/forecastMonitorInfo"),
      },
        // 舆情风险
      {
        id:43,
        name:"今日舆情汇总",
        path:'/trade/PublicOpinionsRisk/opinions_summary',
        component: ()=>import("@/components/part1/PublicOpinionsRisk/opinions_summary"),
      },
      {
        id:44,
        name:"今日风险详情",
        path:'/trade/PublicOpinionsRisk/opinions_riskinfo',
        component: ()=>import("@/components/part1/PublicOpinionsRisk/opinions_riskinfo"),
      },
      {
        id:45,
        name:"舆情网络",
        path:'/trade/PublicOpinionsRisk/opinions_network',
        component: ()=>import("@/components/part1/PublicOpinionsRisk/opinions_network"),
      },
      {
        id:46,
        name:"舆情事件查询",
        path:'/trade/PublicOpinionsRisk/opinions_search',
        component: ()=>import("@/components/part1/PublicOpinionsRisk/opinions_search"),
      },
      {
        id: 43,
        name: '价格对比',
        path: "/trade/riskPrediction/priceCompare",
        component: () => import("@/components/part1/riskPrediction/priceCompare"),
      },
      {
        id:47,
        name:"舆情信息汇总",
        path:'/trade/PublicOpinionsRisk/opinionsMain',
        component: ()=>import("@/components/part1/PublicOpinionsRisk/NewInterfaces/opinions_main"),
      },
      {
        id:48,
        name:"舆情风险详情",
        path:'/trade/PublicOpinionsRisk/opinionsRisk',
        component: ()=>import("@/components/part1/PublicOpinionsRisk/NewInterfaces/opinions_risk"),
      },
      {
        id:49,
        name:"舆情事件详情",
        path:'/trade/PublicOpinionsRisk/opinionsDetails',
        component: ()=>import("@/components/part1/PublicOpinionsRisk/NewInterfaces/opinions_details"),
      },
      {
        id: 50,
        path: "/trade/PolicyRisk/gpr_chn",
        component: () => import("@/components/part1/PolicyRisk/gpr_chn"),
      },
      {
        id: 51,
        path: "/trade/PolicyRisk/comAssociated",
        component: () => import("@/components/part1/PolicyRisk/comAssociated"),
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

// 实例化vue时候只挂载constantRoutes
export default new VueRouter({
  mode: "history",
  routes: constantRoutes.concat(adminRoutes).concat(asyncRoutes)
})

