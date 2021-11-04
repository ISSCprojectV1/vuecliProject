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
import vueEventCalendar from 'vue-event-calendar'
import 'vue-event-calendar/dist/style.css' 
import "@/assets/icons/iconfont/iconfont.css";



Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(vueEventCalendar, {locale: 'en'}) //locale can be 'zh' or 'en'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts


new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
