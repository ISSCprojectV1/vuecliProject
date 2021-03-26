

let routes = [


    {
        path: "/login",
        name: "Login",
        component:() => import("@/views/part1/login"),
    },
    {
        path: "/register",
        name: "Register",
        component:() => import("@/views/part1/register")
    },
    {
        path: "/trade/taskDictionary",
        name: "userTaskInput",
        component:() => import("@/components/part1/transactionProject/taskDictionary/userTaskInput")
    },
    {
        path: "/notification",
        name: "notification",
        component:() => import("@/components/part3/Common/notification")
    },


{ path:"/trade",
    component: () => import("@/components/part1/common/full"),
         children:[
               {
           path:"/trade/Multimodal-multigranularity/stepBar",
        component: () => import("@/components/part1/Multimodal-multigranularity/stepBar"),
          children:[
              //trade主页
       {
              path:'taskInput3',
                 component: () => import("@/components/part1/Multimodal-multigranularity/taskInput")
           },

              {
                   path:'taskQueryTableView',
                 component: () => import("@/components/part3/Common/taskQueryTableView")
               },
              {
                  path:'taskQueryOnlyModityView',
                  component: () => import("@/components/part3/Common/taskQueryOnlyModityView")
              },

              {
                  path:'taskQueryFlowChart',
                  component: () => import("@/components/part3/Common/taskQueryFlowChart")
              },

              {
                  path:'taskQueryTransactionCoalition',
                  component: () => import("@/components/part3/Common/taskQueryTransactionCoalition copy")
              },

        ]
            },
          ]
   },

    {
        path:"/trade",
        component: () => import("@/components/part1/common/full"),
        children:[
            {
                path:"/trade/transactionProject/userTaskInput",
                component: () => import("@/components/part1/transactionProject/taskDictionary/userTaskInput"),
                meta:{
                    title:"联盟形成"
                }
            },

            //trade主页
            {
                path:'/trade/Dashboard',
                component: () => import("@/components/part1/common/Dashboard")
            },

            {
                path:"/trade/dataFusion/dataquery",
                component: () => import("@/components/part1/dataFusion/dataquery"),
                meta:{
                    title:"数据查询"
                }
            },
            {
                path:"/trade/dataFusion/datacluster",
                component: () => import("@/components/part1/dataFusion/datacluster"),
                meta:{
                    title:"关联交易主体发现"
                }
            },
            {
                path:"/trade/relationAnalysis/relationQuery",
                component: () => import("@/components/part1/relationAnalysis/relationQuery"),
                meta:{
                    title:"关联查询"
                }
            },
            {
                path: "/trade/exceptionAnalysis/data",
                component: () => import("@/components/part1/exceptionAnalysis/exceptionData"),
                meta: {
                    title: "仿真数据"
                }
            },
            {
                path: "/trade/exceptionAnalysis/page",
                component: () => import("@/components/part1/exceptionAnalysis/exceptionAnalysis"),
                meta: {
                    title: "展示页面"
                }
            },
            {
                path: "/trade/riskPrediction/riskPage",
                component: () => import("@/components/part1/riskPrediction/riskPageNew"),
                meta: {
                    title: "价格波动风险演化"
                }
            },

            {
                path: "/trade/riskPrediction/riskSurveillance",
                component: () => import("@/components/part1/riskPrediction/riskSurveillance"),
                meta: {
                    title: "预警监控"
                }
            },
          /*  {
                path: "/trade/riskPredictionOld",
                component: () => import("@/components/part1/riskPrediction/riskPage"),
                meta: {
                    title: "价格波动风险演化-旧"
                }
            },*/
            {
                path:"/trade/acpassTask/activetask/:id",
                component: () => import("@/components/part1/acpassTask/activetask"),
                meta:{
                    title:"主动任务组"
                }
            },
            {
                path:"/trade/teamTable/:team",
                component: () => import("@/components/part3/Common/teamTable"),
                meta:{
                    title:"联盟详情"
                }
            },
            {
                path:"/trade/acpassTask/activetaskDetail/:id",
                component: () => import("@/components/part1/acpassTask/activetaskDetail"),
                meta:{
                    title:"主动任务详情"
                }
            },            {
                path:"/trade/Multimodal-multigranularity/goodsgranularity",
                component: () => import("@/components/part2/goods_granularity"),
                meta:{
                    title:"商品粒度优化"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/time_advise",
                component: () => import("@/components/part2/time_advise"),
                meta:{
                    title:"时间粒度优化"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/priceshow",
                component: () => import("@/components/part2/priceshow"),
                meta:{
                    title:"商品历史价格"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/acpassTask",
                component: () => import("@/components/part1/acpassTask/acpassTask"),
                meta:{
                    title:"主动与被动模态"
                }
            },

            {
                path:"/trade/Multimodal-multigranularity/taskQuery",
                component: () => import("@/components/part1/Multimodal-multigranularity/taskQuery"),
                meta:{
                    title:"在线与离线模态"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/resourceShow",
                component: () => import("@/components/part2/resourceshow"),
                meta:{
                    title:"可用资源展示"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/modalityQuery",
                component: () => import("@/components/part1/Multimodal-multigranularity/modalityQuery"),
                meta:{
                    title:"人机资源管理"
                }
            },
            {
                path:"/trade/relationAnalysis/transactionFrequency",
                component: () => import("@/components/part1/relationAnalysis/transactionFrequency"),
                meta:{
                    title:"交易频次查询"
                }
            },
            {
                path:"/trade/transactionProject/map",
                component: () => import("@/components/part1/transactionProject/maplianmeng"),
                meta:{
                    title:"网络图"
                }
            },
            {
                path:"/transactionProject/shandong",
                component: () => import("@/components/part1/transactionProject/shandong"),
            },
            {
                path:"/trade/transactionProject/echarts",
                component: () => import("@/components/part1/transactionProject/echarts"),
                meta:{
                    title:"地图功能"
                }
            },

            {
                path:"/trade/auction",
                component: () => import("@/views/part3/incentiveMechanism/Download/home"),
                meta:{
                    title:"拍卖"
                }
            },
            {
                path: "/trade/uploadResource",
                component: () => import("@/components/part3/Console/mainuploadResource"),
                meta: {
                    title: "上传数据"
                }
            },
            //trade风险评估
            {
                path:"/trade/riskPrediction/riskPrediction",
                component: () => import("@/components/part1/riskPrediction/riskPrediction"),
                meta:{
                    title:"风险预测图"
                }
            },
            {
                path:"/trade/riskPrediction/riskVolatility",
                component: () => import("@/components/part1/riskPrediction/riskVolatility"),
                meta:{
                    title:"价格条件波动率图"
                }
            },

            //trade模态与粒度

            {
                path:"/trade/Multimodal-multigranularity/goods_variety",
                component: () => import("@/components/part2/goods_variety"),
                meta:{
                    title:"商品品类维护"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/resourceShow",
                component: () => import("@/components/part2/resourceshow"),
                meta:{
                    title:"可用资源展示"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/timeGranularity",
                component: () => import("@/components/part2/Time_granularity"),
                meta:{
                    title:"时间粒度"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/spaceGranularity",
                component: () =>import("@/components/part2/space_granularity"),
                meta:{
                    title:"空间粒度"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/goods_relation",
                component:  () =>import("@/components/part2/goods_relation"),
                meta:{
                    title:"关联商品发现"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/taskQuery",
                component:  () =>import("@/components/part1/Multimodal-multigranularity/taskQuery"),
                meta:{
                    title:"监管任务"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/modalityQuery",
                component: () =>import("@/components/part1/Multimodal-multigranularity/modalityQuery"),
                meta:{
                    title:"模态任务"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/taskExecutionQuery",
                component: ()=>import("@/components/part1/Multimodal-multigranularity/taskExecutionQuery"),
                meta:{
                    title:"元任务查询（列表）"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/modalityAllocation",
                component: ()=>import("@/components/part1/Multimodal-multigranularity/modalityAllocation"),
                meta:{
                    title:"模态分配"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/taskExecutionQueryByid",
                component: ()=>import("@/components/part1/Multimodal-multigranularity/taskExecutionQueryByid"),
                meta:{
                    title:"元任务查询（BY ID）"
                }
            },
            {
                path:"/trade/Multimodal-multigranularity/granularityExecution",
                component: ()=>import("@/components/part1/Multimodal-multigranularity/granularityExecution"),
                meta:{
                    title:"粒度调整执行"
                }
            },

        ]
     },






    {
        path: "/baiduMap",
        name: "baiduMap",
        component:()=>import("@/components/part1/transactionProject/map/addressRoll"),
    },
    // {
    //     path: "/modalityInput",
    //     name: "modalityInput",
    //     component:()=>import("@/views/part1/Multimodal-multigranularity/modalityInput"),
    // },


    {
        path: "/shandong",
        name: "shandong",
        component:()=>import("@/components/part1/transactionProject/shandong"),
    },



];

export default routes


