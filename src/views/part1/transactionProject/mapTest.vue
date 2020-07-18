<template>
 <el-container>
        <el-header>
            <Header>
            </Header>
        </el-header>
        <el-container>
            <el-aside class="el-aside" style="width: 200px;">
                <leftNav>
                </leftNav>
            </el-aside>
            <el-main >
            <mapGeo></mapGeo>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from "@/components/part1/common/topNav";
    import leftNav from "@/components/part1/common/leftNav";
    import mapGeo from "@/components/part1/transactionProject/shandong";
    export default {
        components: {
            Header,
            leftNav,
            mapGeo
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
