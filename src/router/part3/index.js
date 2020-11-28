import comment from "@/components/part3/Download/comment";


let routes = [
    {
        path:"/",
        redirect: "/login"
    },
    {
        path:"/index",
        redirect: "/login"
    },

    // {
    //     path:'/userinfo',
    //     component:()=>import("@/views/part3/incentiveMechanism/User/userinfo"),
    //     children:[
    //         {
    //             path:'/userinfo',
    //             component:()=>import("@/components/part3/User/index"),
    //             meta:{
    //                 title:"我的信息"
    //             }
    //         },
    //         {
    //             path:'/userinfo/download',
    //             component:()=>import("@/components/part3/User/download"),
    //             meta:{
    //                 title:"我的下载"
    //             }
    //         },
    //         {
    //             path:'/userinfo/score',
    //             component:()=>import("@/components/part3/User/score"),
    //             meta:{
    //                 title:"我的积分"
    //             }
    //         },
    //         {
    //             path:'/userinfo/group',
    //             component: ()=>import("@/components/part3/User/group"),
    //             meta:{
    //                 title:"我的群组"
    //             }
    //         }
    //
    //     ]
    // },




    {
        path: "/auction",
        component:()=>import("@/views/part3/incentiveMechanism/Download/home"),
    },


    {
        path:"/auction/:id",
        component:()=>import("@/views/part3/incentiveMechanism/Download/resourceDetail"),
        children:[
            {
                path:"",
                component:()=>import("@/components/part3/Download/detailBar"),
                children:[
                    {
                        path:"comment",
                        component:()=>import("@/components/part3/Download/comment")
                    }
                ]
            }
        ]
    },

    {
        path: "/mydownload",
        component:()=>import("@/views/part3/incentiveMechanism/Download/myDownload"),
        children:[
            {
                path: "",
                component:()=>import("@/components/part3/Common/mainUpload"),
            },
            {
                path: "upload",
                component:()=>import("@/components/part3/Common/mainUpload"),
            },
            {
                path: "score",
                component:()=>import("@/components/part3/Common/mainScore"),
            },
            {
                path: "download",
                component:()=>import("@/components/part3/Common/mainDownload"),
            },
            {
                path: "favs",
                component:()=>import("@/components/part3/Common/mainFavs"),
            },
        ]
    },


    {
        path: "/console",
        component:()=>import("@/views/part3/incentiveMechanism/Console/home"),
        children:[
            {
                path: "index",
                component:()=>import("@/components/part3/Console/mainHome"),
            },
            {
                path:'userinfo',
                component:()=>import("@/components/part3/User/index"),
                meta:{
                    title:"我的信息"
                }
            },
            {
                path:'userinfo/changePassword',
                component: ()=>import("@/components/part3/User/changePassword"),
                meta:{
                    title:"修改密码"
                }
            },
            // {
            //     path:'/console/userinfo/group',
            //     component: ()=>import("@/components/part3/User/group"),
            //     meta:{
            //         title:"我的群组"
            //     }
            // },
            {
                path: "uploadResources",
                component:()=>import("@/components/part3/Console/mainuploadResource"),
            },
            {
                path: "manage/upload",
                component:()=>import("@/components/part3/Common/mainUpload"),
                meta:{
                    title:"上传明细"
                }
            },
            {
                path: "manage/score",
                component:()=>import("@/components/part3/Common/mainScore"),
                meta:{
                    title:"积分明细"
                }
            },
            {
                path: "manage/download",
                component:()=>import("@/components/part3/Common/mainDownload"),
                meta:{
                    title:"下载明细"
                }
            },
            // {
            //     path: "editorial/:id",
            //     component:()=>import("@/components/part3/Console/editorial"),
            // },

        ]
    },
];

export default routes


