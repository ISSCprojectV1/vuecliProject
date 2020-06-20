<template>
        <div id="sidebar">
        <el-menu
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                router
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b" style="height: 800px"
        >
            <el-menu-item index="/userinfo/">
                <span slot="title">个人资料</span>
            </el-menu-item>
            <el-menu-item index="/userinfo/download">
                <span slot="title">我的下载</span>
            </el-menu-item>
            <el-menu-item index="/userinfo/score">
                <span slot="title">我的积分</span>
            </el-menu-item>
            <el-menu-item index="/userinfo/group">
                <span slot="title">我的群组</span>
            </el-menu-item>
            <el-menu-item index="5">
                <span slot="title">个人资料5</span>
            </el-menu-item>
            <el-menu-item index="6">
                <span slot="title">个人资料6</span>
            </el-menu-item>
            <el-menu-item index="7">
                <span slot="title">个人资料7</span>
            </el-menu-item>
            <el-menu-item index="8">
                <span slot="title">个人资料8</span>
            </el-menu-item>
        </el-menu>
        </div>
</template>

<script>
    export default {
        name: "sidebar",
        methods:{
            handleOpen(key, keyPath) {
                console.log(key,keyPath)
            },
            handleClose(){
                console.log()
            }

        }
    }
</script>

<style scoped>
    #sidebar {
        background-color: #ffffff;
        text-align: center;
        line-height: 200px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        color : #909399;
    }

</style>
