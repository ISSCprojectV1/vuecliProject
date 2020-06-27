<template>

    <el-container>
        <el-aside width="200px">
            <side-bar>
            </side-bar>
        </el-aside>
        <el-container>
            <el-header height="20px">
                <Header></Header>
            </el-header>
            <el-divider style="margin:0"></el-divider>
            <el-main style="text-align:left">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import sideBar from "@/components/admin/sideBar";
    import Header from "@/components/admin/header";
    export default {
        name: "Layout",
        components: {
            sideBar,
            Header
        }
    }
</script>

<style scoped lang="stylus">

</style>
