import full from "../../components/part1/common/full";

import Dashboard from "../../views/part1/Dashboard";
import Login from "../../views/part1/login"
import Register from "../../views/part1/register"

import riskPrediction from "../../views/part1/riskPredictionProject/riskPrediction";

import transactionProcess from "../../views/part1/transactionProject/transactionProcess";
import echarts from "../../views/part1/transactionProject/echarts"
import map from "../../views/part1/transactionProject/map"
import mapCopy from "../../views/part1/transactionProject/map copy"
import mapTest from "../../views/part1/transactionProject/mapTest"
import shandong from "../../views/part1/transactionProject/province/shandong"

import userInfo from "../../views/part1/user/userInfo"
import baiduMap from "../../components/part1/transactionProject/map/addressRoll"

import taskInput from "../../views/part1/Multimodal-multigranularity/taskInput"
import taskQuery from "../../views/part1/Multimodal-multigranularity/taskQuery"
import modalityInput from "../../views/part1/Multimodal-multigranularity/modalityInput"
import modalityQuery from "../../views/part1/Multimodal-multigranularity/modalityQuery"
import modalityAllocation from "../../views/part1/Multimodal-multigranularity/modalityAllocation"
import taskExecutionQueryByid from "../../views/part1/Multimodal-multigranularity/taskExecutionQueryByid"
import ExecutionQuery from "../../views/part1/Multimodal-multigranularity/ExecutionQuery"
import granularityExecution from "../../views/part1/Multimodal-multigranularity/granularityExecution"


import errorpage404 from "@/views/part1/HANTINA/userinffo";
import Taskinput from "@/views/part2/Taskinput"
import Time_granularity from "../../views/part2/Time_granularity";

//import full from "@/containers/Full";
let routes = [
    // test
    {
        path: "/baiduMap",
        name: "baiduMap",
        component:baiduMap,
    },
    // 模块与粒度  z77
    {
        path: "/taskInputPart1",
        name: "taskInput",
        component:taskInput,
    },
    {
        path: "/taskQuery",
        name: "taskQuery",
        component:taskQuery,
    },
    {
        path: "/modalityInput",
        name: "modalityInput",
        component:modalityInput,
    },
    {
        path: "/modalityQuery",
        name: "modalityQuery",
        component:modalityQuery,
    },
    {
        path: "/modalityAllocation",
        name: "modalityAllocation",
        component:modalityAllocation,
    },
    {
        path: "/taskExecutionQueryByid",
        name: "taskExecutionQueryByid",
        component:taskExecutionQueryByid,
    },
    {
        path: "/ExecutionQuery",
        name: "ExecutionQuery",
        component:ExecutionQuery,
    },
    {
        path: "/granularityExecution",
        name: "granularityExecution",
        component:granularityExecution,
    },

    // testend 
    {
        path: "/Time_granularity",
        name: "Time_granularity",
        component:Time_granularity,
    },
    {
        path: "/Taskinput",
        name: "Taskinput",
        component:Taskinput,
    },
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
        path: "/user/userInfo",
        name: "userInfo",
        component:userInfo,
    },
    {
        path: "/map",
        name: "map",
        component:map,
    },
    {
        path: "/mapCopy",
        name: "mapCopy",
        component:mapCopy,
    },
    {
        path: "/mapTest",
        name: "mapTest",
        component:mapTest,
    },
    {
        path: "/shandong",
        name: "shandong",
        component:shandong,
    },
    {
        path: "/Dashboard",
        name: "Dashboard",
        component:Dashboard,
    },
    {
        path: "/riskPrediction/riskPrediction",
        name: "riskPrediction",
        component:riskPrediction,
    },
    {
        path: "/transactionProcess",
        name: "transactionProcess",
        component:transactionProcess,
    },
    {
        path: "/transactionProject/echarts",
        name: "echarts",
        component:echarts,
    },
    
];

export default routes


