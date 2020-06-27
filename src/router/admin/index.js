import Layout from "@/views/admin/Layout";
import user from "@/components/admin/user";
import role from "@/components/admin/role";
import menu from "@/components/admin/menu";

let routes = [{
    path:'/admin',
    component:Layout,
    children:[
        {
            path:'/admin/user',
            component:user
        },
        {
            path:'/admin/role',
            component: role
        },
        {
            path:'/admin/menu',
            component: menu
        }

    ]
}]

export default routes

// {
//     path:'/userinfo',
//     component:Userinfo,
//     children:[
//         {
//             path:'/',
//             component:userindex
//         },
//         {
//             path:'download',
//             component:userdownload
//         },
//         {
//             path:'score',
//             component:userscore
//         },
//         {
//             path:'group',
//             component: usergroup
//         }
//
//     ]
// },
