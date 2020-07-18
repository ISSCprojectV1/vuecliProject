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
        <el-menu-item index="/console">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-user"></i>
                <span>个人中心</span>
            </template>

        <el-menu-item :index="route.path" v-for="route in this.viewRoutes" :key="route.path">
            <span slot="title">{{route.meta.title}}</span>
        </el-menu-item>
        </el-submenu>

        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-download"></i>
                <span>明细管理</span>
            </template>
            <el-menu-item index="/console/upload">
                上传明细
            </el-menu-item>
            <el-menu-item index="/console/score">
                积分明细
            </el-menu-item>
            <el-menu-item index="/console/download">
                下载明细
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
                viewRoutes:[]
            }
        },
        mounted(){
            console.log(this.$router.currentRoute.path)
            this.defaultActive = this.$router.currentRoute.path
        },
        created(){
            let routes = this.$store.state.permission.routes;
            let childrenRoutes = routes.find(function(element) {
                return element.path === "/console";
            }).children;
            this.viewRoutes = childrenRoutes.filter(route => route.path.startsWith("/console/userinfo"));
            console.log(this.viewRoutes)
            //this.defaultActive = this.$router.currentRoute.path
        }
    }
</script>

<style scoped>

</style>
