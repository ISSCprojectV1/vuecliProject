<template>
<el-row>
  <el-col>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" style="height: 800px">

      <el-menu-item index="/trade/Dashboard">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu v-for="routes in this.accessRoutes" :key="routes.title" :index="routes.title">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{routes.title}}</span>
        </template>
        <el-menu-item :index="route.path" v-for="route in routes.routes" :key="route.path">
          <span slot="title">{{route.meta.title}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>
</template>>

<script>
  export default {
    data(){
      return{
        defaultActive:"",
        accessRoutes:[
          {
            title:"网络图",
            routes:[],
            path:"/trade/transactionProject"
          },
          {
            title:"风险评估",
            routes:[],
            path: "/trade/riskPrediction"
          },
          {
            title:"模态与粒度",
            routes: [],
            path: "/trade/Multimodal-multigranularity"
          },
          {
            title:"主被动任务",
            routes: [],
            path: "/trade/acpassTask"
          },
          {
            title:"关联分析",
            routes: [],
            path: "/trade/relationAnalysis"
          },
        ]
      }
      },
       mounted(){
            this.defaultActive = this.$router.currentRoute.path
        },
    created(){
      let routes = this.$store.state.permission.routes.find(function(element) {
        return element.path === "/trade";
      }).children;
      for(let i=0;i<this.accessRoutes.length;i++){
        this.accessRoutes[i].routes = routes.filter(route => route.path.startsWith(this.accessRoutes[i].path));
      }
      console.log(this.accessRoutes)
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
.el-menu-vertical-demo{
  padding:0px;
  margin:0px;
  border:0px;
}
</style>
