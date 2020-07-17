import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import store from './store'
import {setToken,getToken,removeToken} from "./utils/auth"




const whiteList = ['/login','/register',];


router.beforeEach((to,from,next)=>{
    NProgress.start();

    console.log("addRoutes:"+store.state.permission.addRoutes)
    if (whiteList.indexOf(to.path)!== -1){
        //在免登陆白名单,直接进入
        next();
    }
    else{
        if (getToken()){
            if (store.state.permission.addRoutes.length==0){
                store.dispatch('GenerateRoutes',getToken()).then(accessRoutes=>{
                    router.addRoutes(accessRoutes)
                    next({...to,replace:true})
                }).catch(err=>{
                    console.log("动态获取路由失败，跳回登录界面")
                    next({path:'/login'})
                })
            }
            else {
                next()
            }
        }
        else{
            next('/login');
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})

