<template>
    <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            >
        <el-menu-item index="/console/index">
            <i class="el-icon-house"></i>
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
            }
        },
        data(){
            return{
                defaultActive:"/console/score",
                accessRoutes:[
                    {
                        title:"个人中心",
                        routes:[],
                        path:"/console/userinfo"
                    },
                    {
                        title:"明细管理",
                        routes:[],
                        path: "/console/manage"
                    }
                    ]

            }
        },
        mounted(){
            this.defaultActive = this.$router.currentRoute.path
        },
        created(){
            let routes = this.$store.state.permission.routes.find(function(element) {
                return element.path === "/console";
            }).children;
            console.log(routes)
            for(let i=0;i<this.accessRoutes.length;i++){
                this.accessRoutes[i].routes = routes.filter(route => route.path.startsWith(this.accessRoutes[i].path));
            }
            console.log(this.accessRoutes)
        }
    }
</script>

<style scoped>

</style>
