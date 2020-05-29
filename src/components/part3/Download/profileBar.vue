<template>
    <div class="userbar">
        <el-row :gutter="100">
            <el-col :span="4"><img :src="userprofile" class="userprofile"></el-col>
            <el-col :span="20" style="text-align: left">
                <div>
                    <p>
                        AS~LLX
                    </p>
                </div>
                <div style="margin-top: 15px">
                    上传权限
                </div>
                <div style="margin-top: 15px">
                    <ul class="ul_userprofile">
                        <li>
                            <div>
                                <p>积分</p>
                                <span>75</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>总排名</p>
                                <span>75</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>上传资源</p>
                                <span>75</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>下载资源</p>
                                <span>75</span>
                            </div>
                        </li>
                    </ul>

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import userprofile from "@/assets/part3/userprofile.jpg"
    export default {
        name: "profileBar",
        data(){
            return {
                userprofile:userprofile
            }
        },
    }
</script>

<style scoped lang="stylus">
    .userbar
        background-color white
        margin-bottom 10px
        border: 1px solid #DCDFE6
    .userprofile
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
</style>
