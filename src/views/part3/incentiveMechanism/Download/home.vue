<template>
    <div id="main">
      <h2 style="text-align: center;">数据共享中心</h2>
        <el-container>

<!--            <el-divider class="el-divider"></el-divider>-->
<!--            <el-header>-->
<!--                <sub-header>-->
<!--                </sub-header>-->
<!--            </el-header>-->


            <el-container>
                <el-main>

                    <!--search-bar @addFilter="addFilter"></search-bar-->
                    <!--filter-bar @changefilter="changefilter" :addTab="addTab"></filter-bar-->
                    <main-upload class="main" :filterTab="filterChange" :addTab="addTab"></main-upload>
                </el-main>
                <el-aside>
                    <profile-bar>
                    </profile-bar>
                </el-aside>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    /*            <el-header>
                <Header>
                </Header>
            </el-header>
    * */
  //  import Header from "@/components/part3/Common/header";
    //import subHeader from "@/components/part3/Download/header";
    import searchBar from "@/components/part3/Download/searchBar";
    import mainUpload from "@/components/part3/Common/mainUpload2";
    import filterBar from "@/components/part3/Download/filterBar";
    import profileBar from "@/components/part3/Common/profileBar";
    export default {
        name: "index",
        components: {
           mainUpload,
       //     Header,
            //subHeader,
           // searchBar,
          //  filterBar,
            profileBar
        },
      mounted() {
        let tiankong= document.getElementById("main");
        tiankong.style.height=window.innerHeight+"px"
        console.log( tiankong.style.height)

      },
        data(){
            return{
                filterTab:"test",
                addTab:"",
            }
        },
        methods:{
            changefilter(){
                console.log("parent:get")
                this.filterTab="sucess"
            },
            addFilter(name){
                this.addTab=name
            }
        },
        computed:{
            filterChange(){
                return this.filterTab
            }

        }
    }
</script>

<style lang="stylus" scoped>
    #main
        text-align left
    .el-header
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
        //margin-bottom: 20px;
        padding 0px;
    .searchbar
        border 1px solid red
    .dl
        text-align left

    .cate_list
        position relative
    .aside
        border 1px solid red

    .el-divider
        margin 0
    .el-aside
        padding 20px 10px 20px 10px

    .main
        background-color white
        margin-bottom 10px
        border 0px solid #DCDFE6
</style>
