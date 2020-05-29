<template>
    <div style="text-align: left">
        <ul>
            <li v-for="item in filterTabs" :key="item.label">
                <span>
                    <a @click="changeFilter(item.state)">{{item.label}}</a>
                </span>
            </li>
        </ul>
        <el-divider></el-divider>
    <el-row v-for="item in filterResources" :key="item.id" class="elrow" >
        <el-col :span="20">
            <div class="mainResource">
                <router-link :to="`/download/${item.id}`"  class="title"><h2>{{item.fileName}}</h2></router-link>
                <div class="content">{{item.fileDescription}}</div>
                <ul v-for="tag in item.fileTags.split(',')" :key="tag">
                    <li>
                        <div>
                            {{tag}}
                        </div>
                    </li>
                </ul>
                <p>上传时间:{{item.gmtModified}}</p>
            </div>
        </el-col>
        <el-col :span="4">
            <span>积分:</span>
            <span class="score">{{item.fileScore}}</span>
            <div v-if="item.state==='pass'">
                <p>已通过</p>
                <a href="editorial/1">编辑</a>
            </div>
            <div v-else-if="item.state==='ready'">
                <p style="color: #42b983">待审核</p>
                <a href="editorial/1">编辑</a>
            </div>
            <div v-else-if="item.state==='reject'">
                <p style="color: #ee0a24;text-decoration:line-through;">已删除</p>
            </div>
            <div v-if="item.state==='private'">
                <p style="color: #8cc5ff">已私密</p>
                <a href="editorial/1">编辑</a>
            </div>
        </el-col>
    </el-row>
        <div class="block">
            <span class="demonstration">显示总数</span>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    layout="total, prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getfile} from "@/api/part3";
    import {List_timestampToTime} from "@/utils/part3";

    export default {
        name: "mainUpload",
        methods:{
            gotoResourceDetail(id){
                this.$router.push("/download/"+id);
            },
            changeFilter(state){
                this.state = state
            },
            handleCurrentChange(page){
                let data={};
                data.userId = 1;
                data.currentPage = page;
                data.pageSize  = 10;
                getfile(data).then((res)=>{
                    console.log(res.data.list)
                    this.resources = res.data.list;
                    List_timestampToTime(this.resources)
                    console.log("getfile success!")
                }).catch(()=>{
                    console.log("getfile fail")
                })
            }
        },
        computed:{
            filterResources:function () {
                let state = this.state;
                return state==="all"?this.resources:this.resources.filter(item => item.state===state)
            }
        },
        data(){
            return {
                tabName:"upload",
                state:"all",
                filterTabs:[
                    {
                        label:"全部",
                        url:"",
                        state:"all"
                    },
                    {
                        label:"待审核",
                        url:"",
                        state: "ready"
                    },
                    {
                        label:"已通过",
                        url:"",
                        state: "pass"
                    },
                    {
                        label:"未通过",
                        url:"",
                        state: "reject"
                    },
                    {
                        label:"已私密",
                        url:"",
                        state: "private"
                    }
                ],
                resources:[],
                total:0,

            }
        },

        created(){
            this.$emit("label","upload");
            let data={};
            data.userId = 1;
            data.currentPage = 1;
            data.pageSize  = 10;
            getfile(data).then((res)=>{
                this.resources = res.data.list;
                this.total = res.data.total;
                List_timestampToTime(this.resources)
                console.log("getfile success!")
            }).catch(()=>{
                console.log("getfile fail")
            })
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
        display inline-block
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

    a.title
        color black
    a.title:hover
        color #ca0c16



</style>
