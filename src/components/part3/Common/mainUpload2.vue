<template>
<div id="diceng">

    <div v-for="item in resources" :key="item.id">
        <el-row v-if="item.status === 1" class="elrow">
            <el-col :span="20">
                <div class="mainResource">
                    <h2><router-link :to="`auction/${item.id}`" class="router-link">{{item.name}}</router-link></h2>
                <div class="content">{{item.description}}</div>
                <span>开始时间： {{item.startTime}}</span>
                <span>结束时间： {{item.endTime}}</span>

                </div>
            </el-col>
            <el-col :span="4">
    <!--            <span>起拍价： </span>-->
    <!--            <span class="score">{{item.startPrice}}</span>-->
                <br/>
    <!--            <span>最新价： </span>-->
    <!--            <span class="score">{{item.updatedPrice}}</span>-->
                <br/>
                <span>状态： </span>
                <span class="score">{{item.status}}</span>
                <br/>
                <el-button type="primary" @click="AuctionDetailDialog(item.id)" style="margin-top: 1rem">竞拍</el-button>
            </el-col>
        </el-row>
    </div>
    <el-pagination
            ref="pagination"
            style="text-align: center"
            background
            layout="prev, pager, next"
            @current-change = "pageChange"
            :total="total"
    >
    </el-pagination>
<!--    <el-dialog :title="resource.name" :visible.sync="dialogFormVisible" width="30%" center>-->
<!--        {{resource.description}}-->
<!--        <ul style="margin-top: 20px">-->
<!--            <li style="display: inline-block">起拍价：<span class="score">{{resource.startPrice}}</span></li>-->
<!--            <li style="display: inline-block">最新价：<span class="score">{{resource.updatedPrice}}</span></li>-->
<!--        </ul>-->
<!--        <ul style="margin-top: 20px; margin-bottom: 20px">-->
<!--            <li style="display: inline-block">开始时间：<span>{{resource.startTime}}</span></li>-->
<!--            <li style="display: inline-block">结束时间：<span>{{resource.endTime}}</span></li>-->
<!--        </ul>-->
<!--        <el-form :model="form">-->
<!--            <el-form-item label="出价">-->
<!--                <el-input-number-->
<!--                    v-model="form.price"-->
<!--                    :min="1"-->
<!--                    :step="resource.minimumDecreasePrice"-->
<!--                    :max="resource.updatedPrice"></el-input-number>-->
<!--                （价格步长：{{resource.minimumDecreasePrice}}）-->
<!--            </el-form-item>-->
<!--            <div align="center">-->
<!--                <el-button type="primary" @click="bid(resource.id, form.price)">竞拍</el-button>-->
<!--                <el-button @click="updatePrice(resource.id)">刷新</el-button>-->
<!--            </div>-->
<!--        </el-form>-->
<!--    </el-dialog>-->
    <el-dialog :title="resource.name" :visible.sync="dialogFormVisible" width="32%" center>
        {{resource.description}}
        <ul style="margin-top: 20px; margin-bottom: 20px">
            <li style="display: inline-block">开始时间：<span>{{resource.startTime}}</span></li>
            <li style="display: inline-block">结束时间：<span>{{resource.endTime}}</span></li>
        </ul>
        <el-form :model="form" label-width="60px" label-position="right">

            <el-form-item label="数据量">
                <el-input-number
                    v-model="form.quantity"
                    :min="1"
                    :step="1">
                </el-input-number>
                （单位：MB）
            </el-form-item>
            <el-form-item label="出价">
                <el-input-number
                    v-model="form.price"
                    :min="1"
                    :step="1"></el-input-number>
            </el-form-item>

            <div align="center">
                <el-button type="primary" @click="bid(resource.id, form.price, form.quantity)">竞拍</el-button>
<!--                <el-button @click="updatePrice(resource.id)">刷新</el-button>-->
            </div>

        </el-form>
    </el-dialog>
</div>
</template>

<script>
import {doAuction, getAuctions, getAuction, getAuctionsNew, getAuctionNew, doAuctionNew} from "@/api/part3/auction";

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
                getAuctionsNew(currentPage,pageSize).then(res=>{
                    this.resources = res.data.list
                    this.total = res.data.total
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            },
            AuctionDetail(id){
                this.$router.push("auction/"+id)
                console.log(id)
            },
            AuctionDetailDialog(id) {
                getAuctionNew(id).then(res=>{
                    this.resource=res.data
                    // this.form.price = this.resource.updatedPrice
                    this.dialogFormVisible = true;
                }).catch(err=>{
                    this.$message({
                        showClose: true,
                        message: '获取后台数据失败',
                        type: 'error'
                    });
                    console.log(err);
                });
            },
            //换页请求
            pageChange(page){
                this.currentPage=page;
                this.getAuctions(page);
            },
            bid(id, price, quantity) {
              doAuctionNew(id, price, quantity).then(res=>{
                  this.$message({
                      showClose: true,
                      message: '竞价成功',
                      type: 'success'
                  });
                  this.dialogFormVisible = false;
                  // getAuctionNew(id).then(res=>{
                  //     this.resources[id-1].updatedPrice = res.data.updatedPrice
                  //     this.resource.updatedPrice = res.data.updatedPrice
                  //     this.form.price=res.data.updatedPrice
                  // }).catch(err=>{
                  //     this.$message({
                  //         showClose: true,
                  //         message: '刷新失败',
                  //         type: 'error'
                  //     });
                  //     console.log(err);
                  // });
              }).catch(err=>{
                  this.$message({
                      showClose: true,
                      message: '竞价失败',
                      type: 'error'
                  });
                  console.log(err);
              })
            },
            updatePrice(id){
                getAuction(id).then(res=>{
                    this.resources[id-1].updatedPrice = res.data.updatedPrice
                    this.resource.updatedPrice = res.data.updatedPrice
                    this.form.price=res.data.updatedPrice
                    this.$message({
                        showClose: true,
                        message: '刷新成功',
                        type: 'success'
                    })
                }).catch(err=>{
                    this.$message({
                        showClose: true,
                        message: '刷新失败',
                        type: 'error'
                    });
                    console.log(err);
                });
            }
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
                resource: [],
                total:0,
                currentPage:1,
                dialogFormVisible: false,
                form:{
                    quantity: "",
                    price:""
                }
            }
        }

    }
</script>

<style scoped lang="stylus">
    .elrow
        padding-top 1rem
        padding-bottom 1rem
        border-bottom 1px dashed #DCDFE6
    span.score
        font-weight: 700;
        font-size: 24px;
        color: #ff9358;
    .mainResource
        margin 20px
        text-align left

    span
        margin 10px 10px 10px 0
        font-size 16px
        font-weight 400
        color #999

    .content
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        margin-bottom 20px;
        font-size 18px

    .router-link
        color: black
    .router-link:hover
        color: #ca0c16

</style>
