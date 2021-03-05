<template>
<div id="diceng">

    <div v-for="item in resources" :key="item.id">
        <el-row v-if="item.status === 1" class="elrow">
            <el-col :span="18">
                <div class="mainResource">
                    <h2><router-link :to="`auction/${item.id}`" class="router-link">{{item.name}}</router-link></h2>
                <div class="content">{{item.description}}</div>
                  <span>距结束：{{item.countdown}}</span>
                  <br/>
                <span>开始时间： {{item.startTime}}</span>
                <span>结束时间： {{item.endTime}}</span>
                </div>
            </el-col>
            <el-col :span="6">
    <!--            <span>起拍价： </span>-->
    <!--            <span class="score">{{item.startPrice}}</span>-->
                <br/>
    <!--            <span>最新价： </span>-->
    <!--            <span class="score">{{item.updatedPrice}}</span>-->
                <br/>
              <br/>
                <span>状态： </span>
                <span class="status">正在进行</span>
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
                （单位：积分）
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
import {doAuctionNew, getAuction, getAuctionNew, getAuctionsNew} from "@/api/part3/auction";

// endTime格式为 yyyy-mm-dd hh:mm:ss
function initTime(endTime) {
  let dd, hh, mm, ss = null;
  let endDate = new Date(endTime);
  let time = endDate.getTime() - Date.now();
  if(time<=0)
    return '结束'
  else {
    dd = Math.floor(time / (1000 * 60 * 60 * 24));
    hh = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    mm = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    ss = Math.floor((time % (1000 * 60)) / 1000);
    return dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
  }
}

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
                let list = res.data.list.map(item => {
                  return {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    status: item.status,
                    startTime: item.startTime.split('.')[0].replace('T', ' '),
                    endTime: item.endTime.split('.')[0].replace('T', ' '),
                  };
                })
                list.map((obj) => {
                  this.$set(
                      obj, 'countdown', initTime(obj.endTime)
                  )
                })
                this.resources = list;
                this.total = res.data.total
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
                    this.resource = res.data
                  if(this.resource.startTime){
                    this.resource.startTime = this.resource.startTime.split('.')[0].replace('T', ' ')
                    this.resource.endTime = this.resource.endTime.split('.')[0].replace('T', ' ')
                  }
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
              }).catch(err=>{
                  this.$message({
                      showClose: true,
                      message: '竞价失败',
                      type: 'error'
                  });
                  console.log(err);
              })
            },
          countdown() {
              // let _this = this;
              console.log('!');
              console.log(this.resources);
              setInterval(function(){
                for(let key in this.resources) {
                  let end = new Date(this.resources[key]['endTime']);
                  // console.log(end);
                }
            }, 1000);
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
          setInterval(() => {
            for(let key in this.resources) {
              let endTime = new Date(this.resources[key]['endTime'])

              let now = new Date().getTime();
              let time = endTime.getTime() - now;

              if(time > 0){
                let dd = Math.floor(time / (1000 * 60 * 60 * 24));
                let hh = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let mm = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
                let ss = Math.floor((time % (1000 * 60)) / 1000);
                this.resources[key]['countdown']=dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
              }
              else
                this.resources[key]['countdown'] = '结束'
            }
          }, 1000)
          document.getElementById("diceng").style.height=window.innerHeight;
        },
        created() {
            this.getAuctions(1);
        },
        data(){
            return {
                state:"all",
                resources:[],
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
    span.status
      color green
      font-weight bold
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
