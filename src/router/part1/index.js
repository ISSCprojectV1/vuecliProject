//登录注册
import Login from "../../views/part1/login"
import Register from "../../views/part1/register"
//trade主界面
import full from "../../components/part1/common/full";
//trade主页
import Dashboard from "@/components/part1/common/Dashboard";

//trade网络图
import map from "@/components/part1/transactionProject/map";
import transactionProcess from "@/components/part1/transactionProject/transactionProcess";
import echart from "@/components/part1/transactionProject/echarts"

//trade风险评估
import taskInput from "@/components/part2/Taskinput"
import resourceShow from "@/components/part2/resourceshow";
import timeGranularity from "@/components/part2/Time_granularity";
import spaceGranularity from "@/components/part2/space_granularity";
import otherGranularity from "@/components/part2/other_granularity";
import taskQuery from "@/components/part1/Multimodal-multigranularity/taskQuery"
import modalityQuery from "@/components/part1/Multimodal-multigranularity/modalityQuery"
import taskExecutionQuery from "@/components/part1/Multimodal-multigranularity/taskExecutionQuery"
import modalityAllocation from "@/components/part1/Multimodal-multigranularity/modalityAllocation"
import taskExecutionQueryByid from "@/components/part1/Multimodal-multigranularity/taskExecutionQueryByid"
import granularityExecution from "@/components/part1/Multimodal-multigranularity/granularityExecution"


//trade模态与粒度
import riskPrediction from "@/components/part1/riskPrediction/riskPrediction";
import riskVolatility from "@/components/part1/riskPrediction/riskVolatility";


//其他

import shandong from "../../views/part1/transactionProject/province/shandong"
import userInfo from "../../views/part1/user/userInfo"
import baiduMap from "../../components/part1/transactionProject/map/addressRoll"
import modalityInput from "../../views/part1/Multimodal-multigranularity/modalityInput"





let routes = [


    {
        path: "/login",
        name: "Login",
        component:Login,
    },
    {
        path: "/Register",
        name: "Register",
        component:Register
    },



    {
        path:"/trade",
        component: full,
        children:[

            //trade主页
            {
                path:'/trade/Dashboard',
                component: Dashboard
            },



            //trade网络图
            {
                path:"/trade/transactionProject/map",
                component: map
            },
            {
                path:"/trade/transactionProject/transactionProcess",
                component: transactionProcess
            },
            {
                path:"/trade/transactionProject/echarts",
                component: echart
            },


            //trade风险评估
            {
                path:"/trade/riskPrediction/riskPrediction",
                component:riskPrediction,
            },
            {
                path:"/trade/riskPrediction/riskVolatility",
                component:riskVolatility,
            },

            //trade模态与粒度

            {
                path:"/trade/Multimodal-multigranularity/taskInput",
                component: taskInput
            },
            {
                path:"/trade/Multimodal-multigranularity/resourceShow",
                component: resourceShow
            },
            {
                path:"/trade/Multimodal-multigranularity/timeGranularity",
                component: timeGranularity
            },
            {
                path:"/trade/Multimodal-multigranularity/spaceGranularity",
                component: spaceGranularity
            },
            {
                path:"/trade/Multimodal-multigranularity/otherGranularity",
                component: otherGranularity
            },
            {
                path:"/trade/Multimodal-multigranularity/taskQuery",
                component: taskQuery
            },
            {
                path:"/trade/Multimodal-multigranularity/modalityQuery",
                component: modalityQuery
            },
            {
                path:"/trade/Multimodal-multigranularity/taskExecutionQuery",
                component: taskExecutionQuery
            },
            {
                path:"/trade/Multimodal-multigranularity/modalityAllocation",
                component: modalityAllocation
            },
            {
                path:"/trade/Multimodal-multigranularity/taskExecutionQueryByid",
                component: taskExecutionQueryByid
            },
            {
                path:"/trade/Multimodal-multigranularity/granularityExecution",
                component: granularityExecution
            },

        ]
    },






    {
        path: "/baiduMap",
        name: "baiduMap",
        component:baiduMap,
    },
    {
        path: "/modalityInput",
        name: "modalityInput",
        component:modalityInput,
    },

    {
        path: "/user/userInfo",
        name: "userInfo",
        component:userInfo,
    },

    {
        path: "/shandong",
        name: "shandong",
        component:shandong,
    },



];

export default routes


