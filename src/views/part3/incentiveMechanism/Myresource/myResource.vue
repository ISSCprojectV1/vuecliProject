<template>
    <div>
        <div class="block">
            <profile-bar style="border: 0px"></profile-bar>
        </div>
        <div class="block">
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
</template>

<script>
    import profileBar from "@/components/part3/Download/profileBar";
    export default {
        name: "mainHome",
        components:{
            profileBar
        },
        created(){
            this.$emit("label","")
        },
        data(){
            return{
                part:"first"
            }
        },
        methods:
            {
                gotouserinfo(){
                    this.$router.push('/userinfo')
                },
                gotodownload(){
                    this.$router.push('/download')
                },
                gotoupload(){
                    this.$router.push('/console/uploadResources')
                },
                 tabclick(){
                    this.$router.push(`/incentiveMechanism/myResource/${this.tabName}`)
                },
                setLabel(label){
                    this.tabName = label
                }
            }
    }
</script>

<style scoped lang="stylus">
    .announcement
        padding  10px
        background #f9f9f9
        text-align left

    .block
        padding 10px


    li
        display inline-block
        margin-right 38px

    ul
        text-align left

    li span
        border 1px solid #e9e9e9;
        padding 10px 50px
</style>
