<template>
<div>
    <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :default-openeds="['system']"
            router>
        <el-submenu index='system'>
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统管理</span>
            </template>
            <el-menu-item index="/admin/user">
                用户管理
            </el-menu-item >
            <el-menu-item index="/admin/role">
                角色管理
            </el-menu-item >
            <el-menu-item index="/admin/menu">
                菜单管理
            </el-menu-item >
            <el-menu-item index="/admin/auctionAdd">
             新建拍卖
            </el-menu-item >
            <el-menu-item index="/admin/auctionNew">
                拍卖管理
            </el-menu-item >
            <el-menu-item index="/admin/score">
                积分管理
            </el-menu-item >
            <el-menu-item index="/admin/data">
                数据管理
            </el-menu-item >
        </el-submenu>
    </el-menu>
</div>
</template>

<script>
    export default {
        name: "sideBar",
        methods: {
            handleOpen(){
                console.log("handleOpen")
            },
            handleClose(){
                console.log("handleClose")
            }
        },
        computed: {
            defaultActive(){
                return this.$route.path
            }
        }
    }
</script>

<style scoped lang="stylus">
</style>
