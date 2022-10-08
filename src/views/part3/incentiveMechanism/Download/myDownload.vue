<template>
    <div>
        <el-container>
            <el-header class="el-header1">
                <Header>
                </Header>
            </el-header>
            <el-header class="el-header2">
                <sub-header>
                </sub-header>
            </el-header>

            <el-container>
                <el-main style="padding-top: 0">
                    <profile-bar></profile-bar>
                    <div>
                        <div>
                            <el-tabs type="border-card" v-model="tabName" @tab-click="tabclick">
                                <el-tab-pane label="上传资源" name="upload">
                                    <router-view v-if="tabName==='upload'" @label="setLabel"></router-view>
                                </el-tab-pane>
                                <el-tab-pane label="积分明细" name="score">
                                    <router-view v-if="tabName==='score'" @label="setLabel"></router-view>
                                </el-tab-pane>
                                <el-tab-pane label="下载明细" name="download">
                                    <router-view v-if="tabName==='download'" @label="setLabel"></router-view>
                                </el-tab-pane>
                                <el-tab-pane label="我的收藏" name="favs">
                                    <router-view v-if="tabName==='favs'" @label="setLabel"></router-view>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Header from "@/components/part3/Common/header";
    import subHeader from "@/components/part3/Download/header";
    import profileBar from "@/components/part3/Download/profileBar";
    export default {
        components: {
            Header,
            subHeader,
            profileBar
        },
        data(){
            return {
                tabName:"upload",
                tableData:[
                    {
                        data:1
                    },
                    {
                        data:2
                    }
                ]

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
    .el-header1
        //box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        padding 0px;
        margin-bottom 1px

    .el-header2
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        padding 0px;
        margin-bottom 10px

    .searchbar
        border 1px solid red
    .dl
        text-align left

    .cate_list
        position relative
    .aside
        border 1px solid red
    .userbar
        background-color white
        margin-bottom 10px
        border: 1px solid #DCDFE6
    .round-img
        border-radius:50%;
        height 150px;
        width 150px;

    li
        display inline-block
        margin-right 38px
    li span
        font-weight: 700;
        font-size: 24px;
        color: #ff9358;
        display: block;
        text-align: center;
    .ul_userprofile
        margin-top 20px
        margin-bottom 26px

    .el-button
        color #6b6b6b
        background #f5f6f7
        margin-right 6px
        border 0

</style>
