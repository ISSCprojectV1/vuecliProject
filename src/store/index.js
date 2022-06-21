import Vue from "vue"
import Vuex from "vuex"
import permission from './modules/permission';
import user from './modules/user';

import {getGrades, getSubjects} from "@/api/part3";

Vue.use(Vuex);

export default new Vuex.Store(
  {
    modules: {
     permission,
      user
    },
    state: {
      stepbarposition:"",
      isLogin: true,
      userID: "",
      grades: [],
      subjects: [],
      hasChosen: false,
      token: "",
      commodityForMonitoring: '', // 风险演化绘图输入
      pricerow:[]
    },
    mutations: {
      setData(state, payload) {
        state[payload.name] = payload.value;
      },
      setStepbarPosition(state, stepbarposition) {
        state.stepbarposition= stepbarposition;
      }
,
      setCommodityForMonitoring(state, commodity) {
        state.commodityForMonitoring = commodity;
      },
        setPriceRow(state,pricerow)
        {
            state.pricerow = pricerow;
        }
    },
    actions: {
      getChosen({state, commit}) {
        return new Promise((resolve, reject) => {
          Promise.all([
            getGrades().then(res => {
              commit('setData', {name: 'grades', value: res})
            }),
            getSubjects().then(res => {
              commit('setData', {name: 'subjects', value: res})
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
