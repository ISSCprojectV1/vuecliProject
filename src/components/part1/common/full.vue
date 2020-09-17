<template>
 <el-container>
        <el-header>
            <Header>
            </Header>
        </el-header>
        <el-container>
            <el-aside style="width: 250px" ref="changdu">
                <leftNav >
                </leftNav>
            </el-aside>
            <el-main >
            <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from "@/components/part3/Common/header";
    import leftNav from "@/components/part1/common/leftNav";
    export default {
        components: {
            Header,
            leftNav        },
        data(){
            return {

            }
        },
        methods:
            {

            },
      mounted(){
          let height=window.innerHeight;
          console.log(height);
        let left=document.getElementById("changdu")
      }


    }
</script>

<style lang="stylus" scoped>
.el-aside {
  display: block;
  position: relative;
  overflow-y: scroll;
  background-color: #1479D7 !important;
}

    .el-header
        //box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        padding 0px;
        margin-bottom 1px

    .el-aside
        //box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        padding 0px;
        margin-bottom 1px

</style>
