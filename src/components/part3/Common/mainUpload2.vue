<template>
<div>

    <el-row v-for="item in resources" :key="item.id" class="elrow">
        <el-col :span="20">
            <div class="mainResource">
                <h3><router-link :to="`/download/${item.name}`" class="router-link">{{item.name}}</router-link></h3>
            <div class="content">{{item.content}}</div>
            <span>上传者:{{item.owner}}</span>
            <span>上传时间:{{item.time}}</span>
            </div>
        </el-col>
        <el-col :span="4">
            <span>积分:</span>
            <span class="score">{{item.score}}</span>
        </el-col>
    </el-row>
</div>
</template>

<script>
    export default {
        name: "mainUpload2",
        props:['filterTab','addTab'],
        watch:{
            filterTab:function() {
                this.resources.reverse()
            },
            addTab:function() {
                this.resources.reverse()
            },
        },

        data(){
            return {
                state:"all",
                resources:[
                    {
                        id:1,
                        name:"钢铁交易数据",
                        content:"钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验",
                        owner:"lllx",
                        time:"2020-04-23",
                        score:"5",
                        state:"ready"

                    },
                    {
                        id:2,
                        name:"钢铁交易数据",
                        content:"钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验",
                        owner:"lllx",
                        time:"2020-04-23",
                        score:"5",
                        state:"ready"

                    },
                    {
                        id:3,
                        name:"小麦交易数据",
                        content:"小麦交易模拟数据用于系统测试与试验",
                        owner:"poi",
                        time:"2020-04-23",
                        score:"5",
                        state: "pass"

                    },
                    {
                        id:4,
                        name:"小麦交易数据",
                        content:"小麦交易模拟数据用于系统测试与试验",
                        owner:"poi",
                        time:"2020-04-23",
                        score:"5",
                        state: "pass"

                    },
                    {
                        id:5,
                        name:"玉米交易数据",
                        content:"玉米交易模拟数据用于系统测试与试验",
                        owner:"qwer",
                        time:"2020-04-23",
                        score:"5",
                        state:"reject"
                    },
                    {
                        id:6,
                        name:"玉米交易数据",
                        content:"玉米交易模拟数据用于系统测试与试验",
                        owner:"qwer",
                        time:"2020-04-23",
                        score:"5",
                        state:"reject"
                    },
                    {
                        id:7,
                        name:"棉花交易数据",
                        content:"棉花交易模拟数据用于系统测试与试验",
                        owner:"qwer",
                        time:"2020-04-23",
                        score:"5",
                        state:"private"
                    },
                    {
                        id:8,
                        name:"棉花交易数据",
                        content:"棉花交易模拟数据用于系统测试与试验",
                        owner:"qwer",
                        time:"2020-04-23",
                        score:"5",
                        state:"private"

                    }
                ]
            }
        }

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

    .router-link
        color: black
    .router-link:hover
        color: #ca0c16

</style>
