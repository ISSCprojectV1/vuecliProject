<template>
    <div id="userinfo">
        <el-container>
                <el-header style="overflow: hidden" height="60px">
                    <Header></Header>
                </el-header>
                <el-container>
                    <el-aside width="200px">
                        <sidebar></sidebar>
                    </el-aside>
                        <el-main  style="margin-right: 40px">
                            <router-view></router-view>
                        </el-main>
                </el-container>
            <el-footer style="margin-top: 20px ; height:100px">
                <Footer></Footer>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import logoimg from "@/assets/part3/logo.png"
    import userprofile from "@/assets/part3/userprofile.jpg"
    import Header from "@/components/part3/Common/header"
    import sidebar from "@/components/part3/User/sidebar"
    import Footer from "@/components/part3/User/footer"
    export default {
        name: "userinfo",
        components:{
            Header,
            sidebar,
            Footer
        },
        data(){
            return{
                logoimg:logoimg,
                userimg:userprofile
            }
        },

    }
</script>

<style scoped lang="stylus">
    .el-header{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        padding 0px;
    }

    .el-footer {
        background-color: #ffffff;
        text-align: center;
        line-height: 60px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        color : #909399
    }


    .el-main {
        background-color: #FFFFFF;
        text-align: center;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    }

    body > .el-container {
        margin-bottom: 40px;
        background-color : #2c3e50
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .img{
        height 40px;
        width 40px;
    }
    .userprofile{
        border-radius:50%;
        height 20px;
        width 20px;
    }
</style>
