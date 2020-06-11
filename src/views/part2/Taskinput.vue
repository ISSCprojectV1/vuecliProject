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
            <Taskinput></Taskinput>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from "@/components/part1/common/topNav";
    import leftNav from "@/components/part1/common/leftNav"
    import Taskinput from "@/components/part2/Taskinput";
    export default {
        components: {
            Header,
            leftNav,
            Taskinput
        },
        data(){
            return {

            }
        },
        methods:
            {
            }


    }
</script>

<style lang="stylus" scoped>
    .el-header
        //box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        padding 0px;
        margin-bottom 1px
    
    .el-aside
        //box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        padding 0px;
        margin-bottom 1px

</style>
