<template>
<div class="detailBar">
    <el-row>
    <el-col :span="12">
        <h2>{{auction.name}}</h2>
        <p>{{auction.description}}</p>
        <ul>
                <li>
                    起拍价:<span class="score">{{auction.startPrice}}</span>
                </li>
                <li>
                    最新价:<span class="score">{{auction.updatedPrice}}</span>
                </li>
        </ul>
        <ul style="margin-bottom: 20px">
                <li>
                    开始时间:<span class="time">{{auction.startTime}}</span>
                </li>
                <li>
                    结束时间:<span class="size">{{auction.endTime}}</span>
                </li>
        </ul>
            <el-form :model="form">
                <el-form-item label="出价" label-width="50">
                    <el-input-number v-model="form.price" :min="1" :step="auction.minimumDecreasePrice" :max="auction.updatedPrice" label="">
                    </el-input-number>
                    (价格步长:{{auction.minimumDecreasePrice}})
                </el-form-item>
                    <el-button type="primary" @click="doAuction(form)">竞拍</el-button>
                    <el-button @click="flush(auction.id)">刷新</el-button>
            </el-form>
    </el-col>
        <el-col :span="12" style="border: #07c160" >
                <h2>拍卖规则</h2>
                {{rule}}
        </el-col>
    </el-row>
</div>
</template>

<script>
    import {buyData, getuserinfo} from "@/api/part3";
    import {doAuction, getAuction, getAuctionRule} from "@/api/part3/auction";

    export default {
        name: "resourceDetail",
        props: {
                file: {
                type: Object,
                require: true
            },
    },
        created(){
            const id = this.$router.currentRoute.params.id;
            this.getAuction(id);
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
                },
                auction:{},
                form:{
                    price:""
                },
                rule:""
            }
        },
        methods:{
            getRule(){
                getAuctionRule().then(res=>{
                    this.rule = res.data
                }).catch(err=>{
                    console.log(err)
                })
            },
            getAuction(id){
                getAuction(id).then(res=>{
                    this.auction = res.data
                    this.form.price = this.auction.updatedPrice
                }).catch(err=>{
                    console.log(err)
                })
            },
            doAuction(data){
                doAuction(this.auction.id,data.price).then(res=>{
                    this.$message({
                        showClose: true,
                        message: '竞价成功',
                        type: 'success'
                    });
                    this.getAuction(this.auction.id);
                }).catch(err=>{
                    this.$message({
                        showClose: true,
                        message: '竞价失败',
                        type: 'error'
                    });
                })
                this.form.price = "";
            },
            flush(id){
                getAuction(id).then(res=>{
                    this.$message({
                        showClose: true,
                        message: '刷新成功',
                        type: 'success'
                    });
                }).catch(err=>{
                    this.$message({
                        showClose: true,
                        message: '刷新失败',
                        type: 'error'
                    });
                })
            },
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
    ul
        margin-top  20px
    span.score
        font-weight: 400;
        font-size: 30px;
        color: #ff9358;
        text-align: center;
        margin-left 5px
    .el-col
        padding 0px 10px 10px 10px

    span.time
        margin-left: 8px
        font-size: 14px
        color: #000000
        font-weight 400

    span.size
        margin-left: 8px
        font-size: 14px
        color: #000000
        font-weight 400
</style>
