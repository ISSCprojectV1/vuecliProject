import Vue from "vue"
import Vuex from "vuex"
import permission from './modules/permission';
import { getGrades,getSubjects,login,getuserinfo} from "@/api/part3";

Vue.use(Vuex);

export default new Vuex.Store(

    {
        modules: {
            permission
        },
        state:{
            isLogin:true,
            userID:"",
            grades:[],
            subjects:[],
            hasChosen: false,
            token:"",
        },
        mutations:{
            setData(state,payload){
                state[payload.name] = payload.value;
            }
        },
        actions:{
            loginIn({commit},data){
                return new Promise((resolve, reject) => {
                    login(data).then((res)=>{
                        commit('setData',{name:'isLogin',value:true});
                        console.log(res);

                        //commit('userID',res.data.id);
                        resolve();
                    }).catch((error,res)=>{
                        console.log(res)
                        console.log(error)
                        reject()
                    })
                })
            },
            getUserInfo({commit}){
                return new Promise((resolve, reject) => {
                    getuserinfo().then((res)=>{
                        commit('setData',{name:'userID',value:res.data.data.id});
                        console.log(res);
                        //commit('userID',res.data.id);
                        resolve();
                    }).catch((error,res)=>{
                        console.log(res)
                        console.log(error)
                        reject()
                    })
                })
            },


            getChosen({state,commit}){
                return new Promise((resolve,reject)=>{
                    Promise.all([
                        getGrades().then(res => {
                            commit('setData',{name:'grades',value:res})
                        }),
                        getSubjects().then(res => {
                            commit('setData',{name:'subjects',value:res})
                        }),
                    ]).then(() => {
                        console.log("success");
                        state.hasChosen = true;
                        resolve();
                    }).catch(() => {
                        reject();
                    })
                })

            }

        }
    }
)
