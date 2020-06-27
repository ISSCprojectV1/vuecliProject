import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import store from './store'
import {setToken,getToken,removeToken} from "./utils/auth"




const whiteList = ['/login','/register'];


router.beforeEach((to,from,next)=>{
    NProgress.start();
    if (whiteList.indexOf(to.path)!== -1){
        //在免登陆白名单,直接进入
        next();
    }
    else{
        if (getToken()){
            console.log("getToken:"+getToken())
            if (store.state.role === '')
            {
                store.dispatch('getUserInfo').then(res => {
                    const role = res.data.role
                    store.dispatch('GenerateRoutes').then(accessRoutes=>{
                        router.addRoutes(accessRoutes)
                        next({...to,replace:true})
                    })
                    })
                    .catch(err=>{
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

