import Dashboard from "../../views/part1/Dashboard";
import Login from "../../views/part1/login"
import Register from "../../views/part1/register"

import riskPrediction from "../../views/part1/riskPredictionProject/riskPrediction";

import processQuery from "../../views/part1/transactionProject/processQuery";
import echarts from "../../views/part1/transactionProject/echarts"
import map from "../../views/part1/transactionProject/map"
import mapCopy from "../../views/part1/transactionProject/map copy"
import mapTest from "../../views/part1/transactionProject/mapTest"

import errorpage404 from "@/views/part1/HANTINA/userinffo";
import Taskinput from "@/views/part2/Taskinput"
import Time_granularity from "../../views/part2/Time_granularity";
import resourceshow from "../../views/part2/resourceshow";
import space_granularity from "../../views/part2/space_granularity";
import other_granularity from "../../views/part2/other_granularity";

//import full from "@/containers/Full";
let routes = [
    {
        path: "/other_granularity",
        name: "other_granularity",
        component:other_granularity,
    },
    {
        path: "/space_granularity",
        name: "space_granularity",
        component:space_granularity,
    },
    {
        path: "/resourceshow",
        name: "resourceshow",
        component:resourceshow,
    },
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
        path:'/transactionProject',
        component:errorpage404,
        children:[
            {
                path:'/',
                component:processQuery
            },
            {
                path:'/processQuery',
                component:processQuery
            }
        ]
    },
    {
        path: "/transactionProject/processQuery",
        name: "processQuery",
        component:processQuery,
    },
    {
        path: "/transactionProject/echarts",
        name: "echarts",
        component:echarts,
    },
];

export default routes


