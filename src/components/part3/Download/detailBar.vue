<template>
<div class="detailBar">
    <el-row>
        <el-col :span="18">
            <h2>{{file.fileName}}</h2>
        </el-col>
        <el-col :span="6">
            <div style="margin-top: 30px">
            <span>评分</span>
            <el-rate
                    v-model="file.fileScore"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                    style="display: inline"
            >
            </el-rate>
            </div>
        </el-col>
    </el-row>
    <el-row>
    <el-col :span="24">
        <p>{{file.fileDescription}}</p>
    </el-col>
        <el-col>
                <el-tag size="mini" type="info" effect="plain" v-for="tag in file.fileTags.split(',')" :key="tag" style="margin-right: 10px">{{tag}}</el-tag>
        </el-col>

        <el-col>
            <ul>
                <li>
                    所需积分:<span class="score">{{file.fileScore}}</span>
                </li>
                <li>
                    上传时间:<span class="time">{{file.gmtModified}}</span>
                </li>
                <li>
                    资源大小:<span class="size">{{resource.size}}</span>
                </li>
            </ul>
        </el-col>

        <el-col :span="18">
            <el-button @click="openDialog">立即下载</el-button>
        </el-col>
        <el-col :span="6" style="text-align: right">
            <span v-if="resource.collected" @click="collect"><i class=el-icon-star-on></i>已收藏</span>
            <span v-else @click="collect"><i class=el-icon-star-off></i>收藏</span>
        </el-col>
    </el-row>
    <router-view></router-view>
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
        <span>
            <div>
                <h2>下载所需积分:{{file.fileScore}}</h2>
                <h2>用户拥有积分:{{score}}</h2>
            </div>
        </span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消下载</el-button>
                <el-button @click="download">确认下载</el-button>
            <el-link :href='downloadUrl' id="el-link" style="display:none"></el-link>
        </span>
    </el-dialog>
</div>
</template>

<script>
    import {buyData, getuserinfo} from "@/api/part3";

    export default {
        name: "resourceDetail",
        props: {
                file: {
                type: Object,
                require: true
            },
    },
        created(){
            //console.log(this.file);
            console.log(this.file);
        },
        computed:{
            downloadUrl(){
                return "http://localhost:8088/downloadfile/"+this.file.id
            }
        },
        data(){
            return {
                score:0,
                dialogVisible: false,
                resource:{
                    name:"2012第一季度钢铁交易数据",
                    type:"",
                    category:"",
                    score:"5",
                    tags:["钢铁","交易数据"],
                    desc:"关于2012第一季度钢铁交易数据",
                    time:"2020-04-23",
                    size:"639KB",
                    value:4.1,
                    collected:true
                }
            }
        },
        methods:{
            download(){
                buyData(this.file.id).then(()=>{
                    document.getElementById('el-link').click();
                    this.dialogVisible = false
                    this.$message({
                        message: '恭喜你，下载成功',
                        type: 'success'
                    });
                    console.log("buydata success!")
                }).catch(()=>{
                    this.$message.error("下载失败")
                    console.log("buydata fail")
                });
            },
            openDialog(){
                getuserinfo().then((res)=>{
                    this.score = res.data.data.score
                    this.dialogVisible = true
                    console.log("getuserinfo success!")
                }).catch(()=>{
                    console.log("getuserinfo fail")
                });
            },
            collect(){
                let flag = this.resource.collected
                this.$set(this.resource, 'collected', !flag);
                console.log(this.resource.collected)
            },
            handleClose(done) {
                        done();
            }
        }


    }
</script>

<style scoped lang="stylus">
    .detailBar
        background-color white
        border: 1px solid #DCDFE6
        text-align left
    li
        display inline-block
        margin-right 10px

    span.score
        font-weight: 400;
        font-size: 20px;
        color: #ff9358;
        text-align: center;
        margin-left 5px
    .el-col
        padding 0px 10px 10px 10px

    span.time
        margin-left: 8px
        font-size: 14px
        color: #ccc
        font-weight 400

    span.size
        margin-left: 8px
        font-size: 14px
        color: #ccc
        font-weight 400
</style>
