
import { login,getuserinfo } from "@/api/part3";

const user = {
    state:{
        userId: '',
        name: '',
        role: '',

    },

    mutations: {
        SET_USER_ID: (state,userId) => {
            state.userID = userId
        },

        SET_NAME: (state,name) => {
            state.name = name
        },
        SET_ROLE: (state, role) => {
            state.role = role
        },
    },

    actions: {
        login({commit},data){
            return new Promise((resolve, reject) => {
                login(data).then((res)=>{
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
                    commit('SET_USER_ID',res.data.data.id);
                    resolve();
                }).catch((error,res)=>{
                    console.log(res)
                    console.log(error)
                    reject()
                })
            })
        },
    }
}

export default user;
