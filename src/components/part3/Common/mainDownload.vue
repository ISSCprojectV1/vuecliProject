<template>
    <div style="text-align: left">
        <el-row v-for="item in resources" :key="item.id" class="elrow">
            <el-col :span="20">
                <div class="mainResource">
                    <h3>{{item.name}}</h3>
                    <div class="content">{{item.content}}</div>
                    <ul>
                        <li>
                            <div>
                                数据
                            </div>
                        </li>
                        <li>
                            <div>
                                资源
                            </div>
                        </li>
                    </ul>
                    <span>上传者:{{item.owner}}</span>
                    <span>上传时间:{{item.time}}</span>
                </div>
            </el-col>
            <el-col :span="4">
                <span>积分:</span>
                <span class="score">{{item.score}}</span>
                <div>
                    <el-link :underline="false" type="primary" :href="`/download/${item.id}/comment`">立即评价</el-link>
                </div>


            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "mainUpload",
        data(){
            return {
                resources:[
                    {
                        id:1,
                        name:"钢铁交易数据",
                        content:"钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验",
                        owner:"lllx",
                        time:"2020-04-23",
                        score:"5"
                    },
                    {
                        id:2,
                        name:"小麦交易数据",
                        content:"小麦交易模拟数据用于系统测试与试验",
                        owner:"poi",
                        time:"2020-04-23",
                        score:"5"

                    },
                    {
                        id:3,
                        name:"玉米交易数据",
                        content:"玉米交易模拟数据用于系统测试与试验",
                        owner:"qwer",
                        time:"2020-04-23",
                        score:"5"
                    }
                ]
            }
        },
        methods:{
            filter(e){
                console.log(e.target)
            }

        },
        created(){
            this.$emit("label","download")
        },
    }
</script>

<style scoped lang="stylus">
    .elrow
        border-bottom 1px dashed #DCDFE6
    span.score
        font-weight: 700;
        font-size: 24px;
        color: #ff9358;
    .mainResource
        margin 20px
        text-align left

    span
        margin 10px 10px 10px 0px
        font-size 14px
        font-weight 400
        color #999

    .content
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        margin-bottom 20px

    .el-tag
        border-radius 14px

    .el-tag-small
        border-radius 14px
        color  white


    li
        display inline-block
    li div
        border 1px solid #DCDFE6
        margin-right 20px
        padding 5px
        border-radius 14px
        font-size 14px

    ul
        margin-bottom 20px
    li span a
        border 1px solid #DCDFE6
        margin-right 10px
        padding 5px
        //border-radius 14px
        font-size 18px
        background #f4f4f5
        color #909399
        font-weight 200

    li span a:hover
        background #ca0c16
        color white
        border 0px
        border 1px solid #ca0c16




</style>
