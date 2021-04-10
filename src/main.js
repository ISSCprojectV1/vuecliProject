import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "./store"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import echarts from 'echarts'
import '@/permission'



Vue.use(Vant);
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts


new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
