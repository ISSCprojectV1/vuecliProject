<template>
  <div style="height: 100%">
    <el-menu
        style="height: 100%"
            ref="caidan"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :unique-opened= "true"
            router
            background-color="#00659B"
            text-color="#FFFFFF"
            active-text-color="#ffd04b"
            >
        <el-menu-item index="/console/index" style="text-align: left;font-size: 20px">
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
  </div>
</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {

                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            test(){
                console.log("test")
            },
          resetHeight() {
            return new Promise((resolve, reject) => {
              this.tableH = 0
              resolve()
            })
          },
          // 设置table高度
          fetTableHeight() {
            this.resetHeight().then(res => {
              this.tableH = this.$refs.tableWrapper.getBoundingClientRect().height - 10
            })
          }
        },
        data(){
            return{

                tableH: 0,

                defaultActive:"/console/score",
                accessRoutes:[
                    {
                        title:"个人中心",
                        routes:[


                            {
                                path:'/console/userinfo',
                                component:()=>import("@/components/part3/User/index"),
                                meta:{
                                    title:"我的信息"
                                }
                            },
                            {
                                path:'/console/changePassword',
                                component: ()=>import("@/components/part3/User/changePassword"),
                                meta:{
                                    title:"修改密码"
                                }
                            },


                        ],
                        path:"/console/userinfo"
                    },
                    {
                        title:"明细管理",
                        routes:[
                            {
                                path: "/console/manage/upload",
                                component:()=>import("@/components/part3/Common/uploadRecord"),
                                meta:{
                                    title:"上传明细"
                                }
                            },
                            {
                                path: "/console/manage/score",
                                component:()=>import("@/components/part3/Common/mainScore"),
                                meta:{
                                    title:"积分明细"
                                }
                            },
                            // {
                            //     path: "/console/manage/download",
                            //     component:()=>import("@/components/part3/Common/mainDownload"),
                            //     meta:{
                            //         title:"下载明细"
                            //     }
                            // },


                        ],
                        path: "/console/manage"
                    }
                ]

            }
        },
        mounted(){
            this.defaultActive = this.$router.currentRoute.path
          let t=document.getElementsByClassName("el-menu-vertical-demo")
          console.log(t[0])
          let height=window.innerHeight
          console.log(height)
          console.log(this.$refs.caidan.$el.clientHeight)
         // this.fetTableHeight();
        },
        created(){

/*
          let routes = this.$store.state.permission.routes.find(function(element) {
                return element.path === "/console";
            }).children;
            console.log(routes)
            for(let i=0;i<this.accessRoutes.length;i++){
                this.accessRoutes[i].routes = routes.filter(route => route.path.startsWith(this.accessRoutes[i].path));
            }
            console.log(this.accessRoutes)*/
        }
    }
</script>

<style scoped>
body,html{
  margin: 0;
  width: 100%;
  height: 100%;
overflow: hidden;
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
