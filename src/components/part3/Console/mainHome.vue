<template>
    <div id ="diceng">
        <div class="announcement">
            <span class="announcement"> <i class="el-icon-bell"></i> <a href="/notification">公告：《数据共享规则》</a></span>
        </div>
    <div>
        <announcement></announcement>
        <div class="block">
            <profile-bar style="border: 0px"></profile-bar>
        </div>
            <el-tabs v-model="part">
                <el-tab-pane name="first">
                    <span slot="label">常用入口</span>
                </el-tab-pane>
            </el-tabs>
        <div class="block">
            <ul>
                <li>
                    <span>
                        <i class="el-icon-upload"></i><el-link @click="gotoupload">上传资源</el-link>
                    </span>
                </li>
                <li>
                    <span>
                        <i class="el-icon-user"></i><el-link @click="gotouserinfo">个人信息</el-link>
                    </span>
                </li>
                <li>
                    <span>
                        <i class="el-icon-wallet"></i><el-link @click="gotoscore">积分明细</el-link>
                    </span>
                </li>
            </ul>
        </div>
    </div>
    </div>
</template>

<script>
    import profileBar from "@/components/part3/Download/profileBar";
    import announcement from "@/components/part3/Common/announcement";
    export default {
        name: "mainHome",
        components:{
            profileBar,
            announcement
        },
        created(){
            this.$emit("label","")
        },
      mounted() {
       let tiankong= document.getElementById("diceng");
       tiankong.style.height=window.innerHeight+"px"

        console.log(tiankong.style.height)
       let announcement=document.getElementById("announcement");
       console.log(tiankong)
      },
      data(){
            return{
                part:"first"
            }
        },
        methods:
            {
                gotouserinfo(){
                    this.$router.push('/console/userinfo')
                },
                gotoscore(){
                    this.$router.push('/console/manage/score')
                },
                gotoupload(){
                    this.$router.push('/console/uploadResources')
                }
            }
    }
</script>

<style scoped lang="stylus">

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
