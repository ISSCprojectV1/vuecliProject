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
            <riskPrediction></riskPrediction>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from "@/components/part1/common/topNav";
    import leftNav from "@/components/part1/common/leftNav"
    import riskPrediction from "@/components/part1/riskPrediction/riskPrediction";
    export default {
        components: {
            Header,
            leftNav,
            riskPrediction
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
