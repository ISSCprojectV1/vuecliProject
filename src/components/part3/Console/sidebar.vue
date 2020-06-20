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
                <i class="el-icon-download"></i>
                <span>下载管理</span>
            </template>
            <el-menu-item index="/console/uploadResources">
                上传资源
            </el-menu-item>
            <el-menu-item index="/console/upload">
                上传明细
            </el-menu-item>
            <el-menu-item index="/console/score">
                积分明细
            </el-menu-item>
            <el-menu-item index="/console/download">
                下载明细
            </el-menu-item>
            <el-menu-item index="">
                荣誉明细
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
                defaultActive:"/console/score"
            }
        },
        mounted(){
            console.log(11)
            this.defaultActive = this.$router.currentRoute.path
        },
        created(){
            console.log(22)
            console.log(this.$router.currentRoute);
            //this.defaultActive = this.$router.currentRoute.path
        }
    }
</script>

<style scoped>

</style>
