import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter)


import routes1 from "@/router/part1"
import routes2 from "@/router/part2"
import routes3 from "@/router/part3"
import admin from "@/router/admin"


let routes = admin.concat(routes1).concat(routes2).concat(routes3);
console.log(routes)
const rounter = new VueRouter({
    mode:"hash",
    routes:routes
});

//全局前置守卫
import store from "@/store"
rounter.beforeEach((to,from,next)=>{
    console.log(store.state.isLogin)
    if (!store.state.isLogin && to.path!="/Login")
    {
        next('/Dashboard');
    }
    next();
})

export default rounter;
