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
            <el-main >
                <el-tabs v-model="activeName" v-show="label">
                    <el-tab-pane name="first">
                        <span slot="label">{{label}}</span>
                    </el-tab-pane>
                </el-tabs>
                <router-view @label="setLabel"></router-view>

            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        components:{
        },
        data(){
            return{
                activeName:"first",
                label:""
            }
        },
        methods:{
        }

    }
</script>

<style lang="stylus" scoped>
    .el-header
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        margin-bottom: 20px;
        padding 0px;
    .el-main
        background-color white
        margin-bottom 10px
        border 0px solid #DCDFE6
</style>
