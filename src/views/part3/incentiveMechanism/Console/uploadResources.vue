<template>
    <el-container>
        <el-header>
            <Header>
            </Header>
        </el-header>
        <el-container>
            <el-aside>
                <sidebar>
                </sidebar>
            </el-aside>
            <el-main>
                <Main></Main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from "@/components/part3/Common/header"
    import sidebar from "@/components/part3/Console/sidebar"
    import Main from "@/components/part3/Console/mainuploadResource";
    export default {
        components:{
            sidebar,
            Header,
            Main
        }
    }
</script>

<style lang="stylus" scoped>
    .el-header
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        margin-bottom: 20px;
        padding 0px;
</style>
