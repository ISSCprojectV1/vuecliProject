import Vue from "vue"
import Vuex from "vuex"
import permission from './modules/permission';
import user from './modules/user';

import { getGrades,getSubjects,login,getuserinfo} from "@/api/part3";

Vue.use(Vuex);

export default new Vuex.Store(

    {
        modules: {
         //   permission,
            user
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
