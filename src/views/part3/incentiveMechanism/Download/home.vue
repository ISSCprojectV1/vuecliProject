<template>
    <div id="main">
        <el-container>
            <el-container>
                <el-main>
                    <search-bar @addFilter="addFilter"></search-bar>
                    <filter-bar @changefilter="changefilter" :addTab="addTab"></filter-bar>
                    <main-upload class="main2" :filterTab="filterChange" :addTab="addTab"></main-upload>
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
    import searchBar from "@/components/part3/Download/searchBar";
    import filterBar from "@/components/part3/Download/filterBar";
    import profileBar from "@/components/part3/Common/profileBar";
    import mainUpload from "@/components/part3/Common/mainUpload2";

    export default {
        name: "index",
        components: {
            searchBar,
            filterBar,
            profileBar,
            mainUpload

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

    .main2
        background-color white
        margin-bottom 10px
        border 0px solid #DCDFE6
</style>
