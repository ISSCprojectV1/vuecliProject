<template>
    <div class="profileBar">
    <el-row>
        <el-col :span="6" style="text-align: left">
            <img :src="logoimg" class="img">
        </el-col>
        <el-col :span="18">
            <div class="grid-content" style="margin-left: 1rem;">
                <span>ID:{{user.id}}</span>
                <p>昵称:{{user.name}}</p>
                <p>邮箱:{{user.email}}</p>
                <p>积分:{{user.score}}</p>
                <p>荣誉值:{{user.reputation}}</p>
            </div>
        </el-col>
<!--    </el-row>-->
<!--        <el-row>-->
<!--            <el-col>-->
<!--                    <el-popover-->
<!--                            placement="top-start"-->
<!--                            title="勋章说明"-->
<!--                            width="200"-->
<!--                            trigger="hover"-->
<!--                            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">-->
<!--                        <img :src="badge1" class="badge" slot="reference">-->
<!--                    </el-popover>-->
<!--                <el-popover-->
<!--                        placement="top-start"-->
<!--                        title="勋章说明"-->
<!--                        width="200"-->
<!--                        trigger="hover"-->
<!--                        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">-->
<!--                    <img :src="badge3" class="badge" slot="reference">-->
<!--                </el-popover>-->

<!--            </el-col>-->
        </el-row>
<!--        <el-row>-->
<!--            <el-col>-->
<!--                <div class="upload"><a style="color: white" href="/console/uploadResources">上传资源赚积分,得勋章</a></div>-->
<!--            </el-col>-->
<!--        </el-row>-->


    </div>
</template>

<script>
    import userprofile from "@/assets/part3/userprofile.jpg"
    import badge1 from "@/assets/part3/badge1.png"
    import badge3 from "@/assets/part3/badge3.png"
    import down1 from "@/assets/part3/down1.png"
    import {getuserinfo} from "@/api/part3";

    export default {
        name: "profileBar",
        created(){
            getuserinfo().then((res)=>{
                let data = res.data.data;
                this.user.id = data.id;
                this.user.name = data.name;
                this.user.score = data.score;
                this.user.email = data.email;
                this.user.reputation = data.reputation;

                console.log(data)
            }).catch(()=>{
                console.log("getuserinfo fail")
            });
        },
        data(){
            return{
                logoimg:userprofile,
                badge1:badge1,
                badge3:badge3,
                down1:down1,
                owner:{
                    name:"AS-LLX",
                    score:75
                },
                user:{
                    id:"",
                    name:"",
                    score:"",
                    email:""
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
    .img
        height 60px
        width 60px
        border-radius:50%;
    .profileBar
        background-color white
        margin-bottom 10px
        border: 1px solid #DCDFE6
        padding 10px
    span.score
        font-weight: 500;
        font-size: 17px;
        color: #ff9358;
        margin-left 5px





    div.upload
        border-radius 5px
        background #ca0c16
        text-align center
        color white
        font-size 14px
        line-height 36px
        height 36px
        width 100%

    img.badge
        height 40px
        width 40px
        border-radius:50%;
    img.down
        height 20px
        width 50px

    .el-col
        padding 10px

    span.label
        font-size 14px
        color #8c939d
        margin-left 20px
</style>
