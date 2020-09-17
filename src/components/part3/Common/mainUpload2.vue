<template>
<div id="diceng">

    <el-row v-for="item in resources" :key="item.id" class="elrow">
        <el-col :span="20">
            <div class="mainResource">
                <h3><router-link :to="`auction/${item.id}`" class="router-link">{{item.name}}</router-link></h3>
            <div class="content">{{item.description}}</div>
            <span>开始时间:{{item.startTime}}</span>
            <span>结束时间:{{item.endTime}}</span>

            </div>
        </el-col>
        <el-col :span="4">
            <span>起拍价:</span>
            <span class="score">{{item.startPrice}}</span>
            <br/>
            <span>最新价:</span>
            <span class="score">{{item.updatedPrice}}</span>
            <br/>
            <span>状态:</span>
            <span class="score">{{item.status}}</span>
            <br/>
            <el-button @click="AuctionDetail(item.id)">竞拍</el-button>
        </el-col>
    </el-row>
    <el-pagination
            ref="pagination"
            style="text-align: center"
            background
            layout="prev, pager, next"
            @current-change = "pageChange"
            :total="total"
    >
    </el-pagination>
</div>
</template>

<script>
    import { getAuctions} from "@/api/part3/auction";

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
        methods:{
            getAuctions(currentPage,pageSize=10){
                getAuctions(currentPage,pageSize).then(res=>{
                    this.resources = res.data.list
                    this.total = res.data.total
                }).catch(err=>{
                    console.log(err)
                })
            },
            AuctionDetail(id){
                this.$router.push("auction/"+id)
                console.log(id)
            },
            //换页请求
            pageChange(page){
                this.currentPage=page;
                this.getAuctions(page);
            },
        },
        mounted(){
          document.getElementById("diceng").style.height=window.innerHeight;
        },
        created() {
            this.getAuctions(1);
        },
        data(){
            return {
                state:"all",
                resources:[
                    {
                        id:1,
                        name:"钢铁交易数据",
                        content:"钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验钢铁交易模拟数据用于系统测试与试验",
                        endingtime:"2020-04-23",
                        startingtime:"2020-04-23",
                        score:"5",
                        state:"ready"
                    },
                ],
                total:0,
                currentPage:1
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
