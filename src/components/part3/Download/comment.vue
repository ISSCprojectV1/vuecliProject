<template>
    <div class="main">
        <el-divider>
        </el-divider>
        <el-row>
            <el-col :span="20">
                <span class="title">评论</span>
                <span class="note">下载该资源后可以进行评论</span>
            </el-col>
            <el-col :span="4" style="text-align: right" >
                <span class="commentnum">
                        共<em style="color: #3a8ee6">{{comments.length}}</em>条
                </span>
            </el-col>
        </el-row>
        <el-row v-for="item in comments" :key="item.owner">
            <el-col :span="16">
                <span class="owner">{{item.owner}}:</span>
                <span class="comment">{{item.comment}}</span>

            </el-col>
            <el-col :span="8" style="text-align: right">
                <el-rate
                        v-model="item.value"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}"
                        style="display: inline"
                >
                </el-rate>
                <span class="time">
                    {{item.time}}
                </span>
            </el-col>
        </el-row>
        <div class="part">
            <span>
                我的评分：
            </span>
            <el-rate
                    v-model="value"
                    :colors="colors">
            </el-rate>
            <el-form>
                <el-form-item label="" prop="desc">
                    <el-input type="textarea" placeholder="请不要少于5个字"></el-input>
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button type="primary" @click="submitForm('ruleForm')">发表</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    export default {
        name: "comment",
    created(){
        console.log(1111)
    },
        data(){
            return {
                value:0,
                colors:['#99A9BF', '#F7BA2A', '#FF9900'],
                comments:[
                    {
                        owner:"lingddd",
                        comment:"很完整的数据，谢谢分享",
                        value:2.7,
                        time:"2019-09-29"
                    },
                    {
                        owner:"liffff",
                        comment:"很完整的数据，谢谢分享",
                        value:3.7,
                        time:"2019-04-29"

                    },
                    {
                        owner:"lixxdd",
                        comment:"很完整的数据，谢谢分享",
                        value:4.7,
                        time:"2019-08-29"

                    },
                    ]
            }
        },
        methods:{
            submitForm(){
                console.log("submit")
            }
        }
    }

</script>

<style scoped lang="stylus">
    .main
        text-align left
    span.title
        font-size 16px
        font-weight 500
    span.note
        color #999
        margin-left 10px
        font-weight 200
        font-size 10px
    span.time
        margin-left: 8px;
        font-size: 14px;
        color: #ccc;
        font-weight 200
    span.commentnum
        font-size: 14px;
        color: #8a8a8a;
        font-weight: 400;
    .el-col
        padding 10px 20px 10px 20px
    div.part
        padding 20px

    span.owner
        color black
        font-weight 700

    span.comment
        color: #3d3d3d;
        font-weight 400
        font-size 14px
</style>
