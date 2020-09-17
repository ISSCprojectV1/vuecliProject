

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


    // {
    //     path:"/trade",
    //     component: () => import("@/components/part1/common/full"),
    //     children:[
    //
    //         //trade主页
    //         {
    //             path:'/trade/Dashboard',
    //             component: () => import("@/components/part1/common/Dashboard")
    //         },



    //
    //         {
    //             path:"/trade/transactionProject/map",
    //             component: () => import("@/components/part1/transactionProject/map"),
    //             meta:{
    //                 title:"网络图"
    //             }
    //         },
    //         {
    //             path:"/transactionProject/shandong",
    //             component: () => import("@/components/part1/transactionProject/shandong"),
    //         },
    //         {
    //             path:"/trade/transactionProject/echarts",
    //             component: () => import("@/components/part1/transactionProject/echarts"),
    //             meta:{
    //                 title:"地图功能"
    //             }
    //         },
    //
    //
    //         //trade风险评估
    //         {
    //             path:"/trade/riskPrediction/riskPrediction",
    //             component: () => import("@/components/part1/riskPrediction/riskPrediction"),
    //             meta:{
    //                 title:"风险预测图"
    //             }
    //         },
    //         {
    //             path:"/trade/riskPrediction/riskVolatility",
    //             component: () => import("@/components/part1/riskPrediction/riskVolatility"),
    //             meta:{
    //                 title:"价格条件波动率图"
    //             }
    //         },
    //
    //         //trade模态与粒度
    //
    //         {
    //             path:"/trade/Multimodal-multigranularity/taskInput",
    //             component: () => import("@/components/part2/Taskinput"),
    //             meta:{
    //                 title:"任务属性"
    //             }
    //         },
    //         {
    //             path:"/trade/Multimodal-multigranularity/resourceShow",
    //             component: () => import("@/components/part2/resourceshow"),
    //             meta:{
    //                 title:"可用资源展示"
    //             }
    //         },
    //         {
    //             path:"/trade/Multimodal-multigranularity/timeGranularity",
    //             component: () => import("@/components/part2/Time_granularity"),
    //             meta:{
    //                 title:"时间粒度"
    //             }
    //         },
    //         {
    //             path:"/trade/Multimodal-multigranularity/spaceGranularity",
    //             component: () =>import("@/components/part2/space_granularity"),
    //             meta:{
    //                 title:"空间粒度"
    //             }
    //         },
    //         {
    //             path:"/trade/Multimodal-multigranularity/otherGranularity",
    //             component:  () =>import("@/components/part2/other_granularity"),
    //             meta:{
    //                 title:"其他粒度"
    //             }
    //         },
    //         {
    //             path:"/trade/Multimodal-multigranularity/taskQuery",
    //             component:  () =>import("@/components/part1/Multimodal-multigranularity/taskQuery"),
    //             meta:{
    //                 title:"监管任务"
    //             }
    //         },
    //         {
    //             path:"/trade/Multimodal-multigranularity/modalityQuery",
    //             component: () =>import("@/components/part1/Multimodal-multigranularity/modalityQuery"),
    //             meta:{
    //                 title:"模态任务"
    //             }
    //         },
    //         {
    //             path:"/trade/Multimodal-multigranularity/taskExecutionQuery",
    //             component: ()=>import("@/components/part1/Multimodal-multigranularity/taskExecutionQuery"),
    //             meta:{
    //                 title:"元任务查询（列表）"
    //             }
    //         },
    //         {
    //             path:"/trade/Multimodal-multigranularity/modalityAllocation",
    //             component: ()=>import("@/components/part1/Multimodal-multigranularity/modalityAllocation"),
    //             meta:{
    //                 title:"模态分配"
    //             }
    //         },
    //         {
    //             path:"/trade/Multimodal-multigranularity/taskExecutionQueryByid",
    //             component: ()=>import("@/components/part1/Multimodal-multigranularity/taskExecutionQueryByid"),
    //             meta:{
    //                 title:"元任务查询（BY ID）"
    //             }
    //         },
    //         {
    //             path:"/trade/Multimodal-multigranularity/granularityExecution",
    //             component: ()=>import("@/components/part1/Multimodal-multigranularity/granularityExecution"),
    //             meta:{
    //                 title:"粒度调整执行"
    //             }
    //         },
    //
    //     ]
    //  },






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


