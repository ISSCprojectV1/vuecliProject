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
    import Header from "@/components/part3/Common/header"
    import sidebar from "@/components/part3/Console/sidebar"
    export default {
        components:{
            sidebar,
            Header,
        },
        data(){
            return{
                activeName:"first",
                label:""
            }
        },
        methods:{
            setLabel(label){
                this.label="";
                if (label==="upload")
                    this.label = "上传明细";
                else if (label==="score")
                    this.label = "积分明细";
                else if (label==="index")
                    this.label = "首页";
                else if (label==="userinfo")
                    this.label = "我的信息";
                else if (label==="password")
                    this.label = "修改密码";
                else if (label==="uploadResource")
                    this.label = "上传资源"
            }
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
