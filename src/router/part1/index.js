import Dashboard from "../../views/part1/Dashboard";

import riskPrediction from "../../views/part1/riskPredictionProject/riskPrediction";

import processQuery from "../../views/part1/transactionProject/processQuery";
import echarts from "../../views/part1/transactionProject/echarts"
import errorpage404 from "@/views/part1/HANTINA/userinffo";

//import full from "@/containers/Full";
let routes = [
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


