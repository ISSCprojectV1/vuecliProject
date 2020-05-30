import View_1_1 from "@/views/part3/incentiveMechanism/module_1/view_1_1";
import View_1_1_detail from "@/views/part3/incentiveMechanism/module_1/view_1_1_detail";
import View_2_1 from "@/views/part3/incentiveMechanism/module_2/view_2_1";
import Login from "@/views/part3/Login";
import Userinfo from "@/views/part3/incentiveMechanism/User/userinfo"
import userindex from "@/components/part3/User/index";
import userdownload from "@/components/part3/User/download";
import userscore from "@/components/part3/User/score"
import usergroup from "@/components/part3/User/group"
import Registry from "@/views/part3/Registry";


import Download from "@/views/part3/incentiveMechanism/Download/home"
import myDownload from "@/views/part3/incentiveMechanism/Download/myDownload"
import resourceDetail from "@/views/part3/incentiveMechanism/Download/resourceDetail";

import detailBar from "@/components/part3/Download/detailBar";
import comment from "@/components/part3/Download/comment";

import mainDownload from "@/components/part3/Common/mainDownload";
import mainFavs from "@/components/part3/Common/mainFavs";
import mainScore from "@/components/part3/Common/mainScore";
import mainUpload from "@/components/part3/Common/mainUpload";




import Home from "@/views/part3/incentiveMechanism/Console/home"
import Editorial from "@/components/part3/Console/editorial"
import mainHome from "@/components/part3/Console/mainHome";
import mainuploadResource from "@/components/part3/Console/mainuploadResource";

import NOTFOUND from "@/views/part3/NOTFOUND";


import errorpage404 from "@/views/part1/HANTINA/userinffo";

//import full from "@/containers/Full";
let routes = [

    {
        path:'/userinfo',
        component:Userinfo,
        children:[
            {
                path:'/',
                component:userindex
            },
            {
                path:'download',
                component:userdownload
            },
            {
                path:'score',
                component:userscore
            },
            {
                path:'group',
                component: usergroup
            }

        ]
    },
    {
        path:"*",
        component:NOTFOUND
    },
    {
        path: "/login",
        name: "Login",
        component:Login,
    },
    {
        path: "/hantina",
        name: "hantina",
        component:errorpage404,
        children:[
            {
                path:'/',
                component:NOTFOUND
            },

            {
                path:'score',
                component:NOTFOUND
            },
            {
                path:'group',
                component: NOTFOUND
            }

        ]
    },

    {
        path: "/registry",
        name: "Registry",
        component:Registry,
    },
    {
        path: "/view_1_1",
        name: "View_1_1",
        component:View_1_1,
    },
    {
        path: "/view_1_1_detail/:id",
        name: "View_1_1_detail",
        component:View_1_1_detail,
    },
    {
        path: "/view_2_1",
        name: "View_2_1",
        component:View_2_1,
    },


    {
        path: "/download",
        component:Download,
    },


    {
        path:"/download/:id",
        component:resourceDetail,
        children:[
            {
                path:"",
                component:detailBar,
                children:[
                    {
                        path:"comment",
                        component:comment
                    }
                ]
            }
        ]
    },

    {
        path: "/mydownload",
        component:myDownload,
        children:[
            {
                path: "",
                component:mainUpload,
            },
            {
                path: "upload",
                component:mainUpload,
            },
            {
                path: "score",
                component:mainScore,
            },
            {
                path: "download",
                component:mainDownload,
            },
            {
                path: "favs",
                component:mainFavs,
            },
        ]
    },


    {
        path: "/console",
        component:Home,
        children:[
            {
                path: "",
                component:mainHome,
            },
            {
                path: "uploadResources",
                component:mainuploadResource,
            },
            {
                path: "upload",
                component:mainUpload,
            },
            {
                path: "score",
                component:mainScore,
            },
            {
                path: "download",
                component:mainDownload,
            },
            {
                path: "editorial/:id",
                component:Editorial,
            },

        ]
    },
];

export default routes


