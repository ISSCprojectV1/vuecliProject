<template>
 <el-container>
        <el-header>
            <Header>
            </Header>
        </el-header>
        <el-container>
            <el-aside>
                <leftNav>
                </leftNav>
            </el-aside>
            <el-main >
            <Dashboard></Dashboard>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from "@/components/part3/Common/header";
    import leftNav from "@/components/part1/common/leftNav"
    import Dashboard from "@/components/part1/common/Dashboard";
    export default {
        components: {
            Header,
            leftNav,
            Dashboard
        },
        data(){
            return {

            }
        },
        methods:
            {
                tabclick(){
                    this.$router.push(`/mydownload/${this.tabName}`)
                },
                setLabel(label){
                    this.tabName = label
                }
            }


    }
</script>

<style lang="stylus" scoped>
    .el-header
        //box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        padding 0px;
        margin-bottom 1px

</style>
