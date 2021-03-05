<template>
  <div id="diceng" style="background-color:#00659B ">
<el-row>
  <el-col>

    <el-menu
        :unique-opened="true"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
            background-color="#00659B"
            text-color="#FFFFFF"
            active-text-color="#ffd04b" style="height: 100%">
      <el-menu-item index="/trade/Dashboard" style="text-align: left;font-size: 20px">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/trade/Multimodal-multigranularity/stepBar" style="text-align: left;font-size: 20px">
        <i class="el-icon-menu"></i>
        <span slot="title">模态与粒度+联盟形成</span>
      </el-menu-item>
      <el-menu-item index="/trade/riskPrediction/riskSurveillance/" style="text-align: left;font-size: 20px">
        <i class="el-icon-menu"></i>
        <span slot="title">价格波动风险预警</span>
      </el-menu-item>
      <el-menu-item index="/trade/auction" style="text-align: left;font-size: 20px">
        <i class="el-icon-menu"></i>
        <span slot="title">附加功能：数据共享</span>
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

  export default {
    data(){
      return{
        defaultActive:"",
        accessRoutes:[
      /*    {
            title:"网络图",
            routes:[
              {
                path:"/trade/transactionProject/echarts",
                component: () => import("@/components/part1/transactionProject/echarts"),
                meta:{
                  title:"地图功能"
                }
              },
              {
                path:"/trade/transactionProject/userTaskInput",
                component: () => import("@/components/part1/transactionProject/taskDictionary/userTaskInput"),
                meta:{
                  title:"联盟形成"
                }
              },
            ],
            path:"/trade/transactionProject"
          },*/
        /*  {     title: "预警监控",
            path: "/trade/riskPrediction/riskSurveillance/",
            component: () => import("@/components/part1/riskPrediction/riskSurveillance"),

          },*/
         /* {
            title: "风险预警",
            routes: [
              {
                path: "/trade/riskPrediction/riskPage",
                component: () => import("@/components/part1/riskPrediction/riskPageNew"),
                meta: {
                  title: "价格波动风险演化"
                }
              },
              {
                path: "/trade/riskPrediction/riskSurveillance/",
                component: () => import("@/components/part1/riskPrediction/riskSurveillance"),
                meta: {
                  title: "预警监控"
                }
              },
              // {
              //   path: "/trade/riskPredictionOld",
              //   component: () => import("@/components/part1/riskPrediction/riskPage"),
              //   meta: {
              //     title: "价格波动风险演化-旧"
              //   }
              // }
            ]
          },
     /*     {
            title:"模态与粒度+联盟形成",
            routes: [
              {
                path:"/trade/Multimodal-multigranularity/stepBar",
                component: () => import("@/components/part1/Multimodal-multigranularity/stepBar"),
                meta:{
                  title:"模态与粒度步骤"
                }
              },
              {
                path:"/trade/Multimodal-multigranularity/goodsgranularity",
                component: () => import("@/components/part2/goods_granularity"),
                meta:{
                  title:"时间与商品粒度"
                }
              },
              /*{
                path:"/trade/Multimodal-multigranularity/time_advise",
                component: () => import("@/components/part2/time_advise"),
                meta:{
                  title:"时间粒度优化"
                }
              },
              {
                path:"/trade/Multimodal-multigranularity/acpassTask",
                component: () => import("@/components/part1/acpassTask/acpassTask"),
                meta:{
                  title:"主动与被动模态"
                }
              },

              {
                path:"/trade/Multimodal-multigranularity/taskQuery",
                component: () => import("@/components/part1/Multimodal-multigranularity/taskQuery"),
                meta:{
                  title:"在线与离线模态"
                }
              },
              /*{
                path:"/trade/Multimodal-multigranularity/resourceShow",
                component: () => import("@/components/part2/resourceshow"),
                meta:{
                  title:"可用资源展示"
                }
              },
              {
                path:"/trade/Multimodal-multigranularity/modalityQuery",
                component: () => import("@/components/part1/Multimodal-multigranularity/modalityQuery"),
                meta:{
                  title:"人机资源管理"
                }
              },
            ],
            path: "/trade/Multimodal-multigranularity"
          },*/
       /*   {
            title:"附加功能：数据共享",
            routes: [
              {
                path:"/trade/relationAnalysis/transactionFrequency",
                component: () => import("@/components/part1/relationAnalysis/transactionFrequency"),
                meta:{
                  title:"交易频次查询"
                }
              },
              {
                path:"/trade/relationAnalysis/relationQuery",
                component: () => import("@/components/part1/relationAnalysis/relationQuery"),
                meta:{
                  title:"关联查询"
                }
              },
              {
                path:"/trade/dataFusion/dataquery",
                component: () => import("@/components/part1/dataFusion/dataquery"),
                meta:{
                  title:"数据查询"
                }
              },
              {
                path:"/trade/dataFusion/datacluster",
                component: () => import("@/components/part1/dataFusion/datacluster"),
                meta:{
                  title:"关联交易主体发现"
                }
              },
            ],
            path: "/trade/relationAnalysis"
          },*/
         /* {
            title:"关联分析",
            routes: [
              {
                path:"/trade/relationAnalysis/transactionFrequency",
                component: () => import("@/components/part1/relationAnalysis/transactionFrequency"),
                meta:{
                  title:"交易频次查询"
                }
              },
              {
                path:"/trade/relationAnalysis/relationQuery",
                component: () => import("@/components/part1/relationAnalysis/relationQuery"),
                meta:{
                  title:"关联查询"
                }
              },
            ],
            path: "/trade/relationAnalysis"
          },*/
        /*  {
            title:"数据融合",
            routes: [
              {
                path:"/trade/dataFusion/dataquery",
                component: () => import("@/components/part1/dataFusion/dataquery"),
                meta:{
                  title:"数据查询"
                }
              },
              {
                path:"/trade/dataFusion/datacluster",
                component: () => import("@/components/part1/dataFusion/datacluster"),
                meta:{
                  title:"关联交易主体发现"
                }
              },
            ],
            path: "/trade/dataFusion"
          },*/
        /*    {
                title: "异常事件分析",
                routes: [
                    {
                        path: "/trade/exceptionAnalysis/page",
                        component: () => import("@/components/part1/exceptionAnalysis/exceptionAnalysis"),
                        meta: {
                            title: "展示页面"
                        }
                    }
                ],
                path: "/trade/exceptionAnalysis"
            }*/
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
    /*  let routes = this.$store.state.permission.routes.find(function(element) {
        return element.path === "/trade";
      }).children;
      for(let i=0;i<this.accessRoutes.length;i++){
        this.accessRoutes[i].routes = routes.filter(route => route.path.startsWith(this.accessRoutes[i].path)&&route.type==1);
      }
      console.log(this.accessRoutes)*/
   /*   let data2=[

        //trade主页
        {
          path:'/trade/Multimodal-multigranularity/stepBar/taskQueryTableView',
          component: () => import("@/components/part3/Common/taskQueryTableView")
        },
        //trade主页
        {
          path:'/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart',
          component: () => import("@/components/part3/Common/taskQueryFlowChart")
        },

        //trade主页
        {
          path:'/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition',
          component: () => import("@/components/part3/Common/taskQueryTransactionCoalition")
        },

      ]
      if(this.accessRoutes[1].routes[7].children.length<=3){
        this.accessRoutes[1].routes[7].children.push(data2)
        console.log( this.accessRoutes[1].routes[7].children)
      }
*/
/*
     if(this.accessRoutes[1].routes[7].children.length<3)
     { //trade主页
       let data1=  {
         path:'/trade/Multimodal-multigranularity/stepBar/taskQueryTableView',
         component: taskQueryTableView
       }
      //trade主页
       let data2=    {
         path:'/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart',
         component: () => import("@/components/part3/Common/taskQueryFlowChart")
       }

       //trade主页
       let data3= {
         path: '/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition',
         component: () => import("@/components/part3/Common/taskQueryTransactionCoalition")
       }
  this.accessRoutes[1].routes[7].children.push(data1)
  this.accessRoutes[1].routes[7].children.push(data2)
  this.accessRoutes[1].routes[7].children.push(data3)
  console.log( this.accessRoutes[1].routes[7])
  console.log(" this.accessRoutes[1].routes[7]")
}*/

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
  .el-menu-item:hover{
    background: #0677B3 !important;
  }
  .el-submenu__title:hover {
    background: #0677B3 !important;
  }
.el-menu-vertical-demo{
  padding:0;
  margin:0;
  border:0;
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
