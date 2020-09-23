<template>
  <div id="diceng" style="background-color:#4e6ef2 ">
<el-row>
  <el-col>

    <el-menu
        unique-opened="true"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
            background-color="#4e6ef2"
            text-color="#FFFFFF"
            active-text-color="#ffd04b" style="height: 100%">
      <el-menu-item index="/trade/Dashboard" style="text-align: left;font-size: 20px">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu v-for="routes in this.accessRoutes" :key="routes.title" :index="routes.title" style="text-align: left">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span style="font-size: 20px">{{routes.title}}</span>
        </template>
        <el-menu-item :index="route.path" v-for="route in routes.routes" :key="route.path" style="text-align: left;padding-left: 80px;font-size: 18px">
          <span slot="title">{{route.meta.title}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>
  </div>
</template>

<script>
 import userTaskInput from "@/components/part1/transactionProject/taskDictionary/userTaskInput";
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
            title:"关联分析",
            routes: [],
            path: "/trade/relationAnalysis"
          },
          {
            title:"数据融合",
            routes: [],
            path: "/trade/dataFusion"
          },
        ]
      }
      },
       mounted(){
            this.defaultActive = this.$router.currentRoute.path
         let tiankong= document.getElementById("diceng");
         console.log(window.innerHeight)
         console.log(document.body.scrollHeight)
         tiankong.style.height=(window.innerHeight>document.body.scrollHeight?window.innerHeight:document.body.scrollHeight)+"px"
         console.log(tiankong.style.height)
        },
    created(){
      let routes = this.$store.state.permission.routes.find(function(element) {
        return element.path === "/trade";
      }).children;
      for(let i=0;i<this.accessRoutes.length;i++){
        this.accessRoutes[i].routes = routes.filter(route => route.path.startsWith(this.accessRoutes[i].path)&&route.type==1);
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
.el-icon-arrow-down:before {
  content: "\e6df";
  color: #ffffff;
}

.el-icon-menu:before {
  content: "\e798";
  color: #FFFFFF;
}
.el-icon-house:before {
  content: "\e754";
  color: #FFFFFF;
}
</style>
