<template>
    <div id="diceng">
        <div> <el-button @click="goback">返回</el-button></div>
        <div> <el-button @click="CarculateData">启动检测</el-button></div>
        <h2>数据融合</h2>
        <el-row>
            <el-col :span="8">
                <el-form>
                    <el-form-item label="交易商名称检索">
                        <el-input v-model="queryform.company"></el-input>
                        <el-button @click="lookupcompany(queryform.company)">查找</el-button>
                    </el-form-item>
                    <!--el-form-item label="交易商社会统一信用代码检索">
                        <el-input v-model="queryform.taxnum"></el-input>
                        <el-button @click="lookuptaxnum(queryform.taxnum)">查找</el-button>
                    </el-form-item-->
                    <el-form-item label="" name="pingji" style="text-align: left">


                    </el-form-item>
                    <el-form-item label="" name="pingfen" style="text-align: left">


                    </el-form-item>
                </el-form>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>公司简介</span>
                    </div>
                    <div class="text item">
                        {{'公司名称: ' + companyData.name }}
                    </div>
                    <div class="text item">
                        {{'社会统一信用代码: ' + companyData.taxnumer }}
                    </div>
                    <div class="text item">
                        {{'法人: ' + companyData.legaler}}
                    </div>
                </el-card>

            </el-col>
            <el-col :span="16">
                <div id="echart1" style="width: 1000px;height: 500px"></div>
            </el-col>
        </el-row>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="taxnumer"
                    label="社会统一信用代码"
                    min-width="180">
            </el-table-column>
            <el-table-column
                    prop="relevantBuyerName"
                    label="交易主体名称"
                    min-width="180">
            </el-table-column>
            <el-table-column

                    label="与主体相似度"
                    min-width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.relevance.toFixed(4)}}</span>
                </template>
            </el-table-column>


        </el-table>

        <div class="block" style="margin-top:15px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1,5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.yeshu">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import echart from "echarts";
    import {companydataname, multibyname, multidatagraph,getRelevantEntity,getRelevantArray} from "@/api/part1/dataFusion";



    export default {

        name: "dataquery",
        created() {
            console.log( this.$route.query)

console.log(this.$router.currentRoute)
            },
        mounted() {
        let tiankong= document.getElementById("diceng");
        tiankong.style.height=window.innerHeight+"px"
            console.log( this.$route.query.data)

        let announcement=document.getElementById("announcement");
          this.xinyongpingren=(!this.$route.query.data.creditScore||isNaN(this.$route.query.data.creditScore))?"暂无":this.$route.query.data.creditScore.toFixed(3);
          this.lookupcompany(this.$route.query.data.company)
          console.log("aaa")


//          console.log(data)
          console.log(this.tableData)
      },

        methods:{
            goback(){
                this.$router.go(-1)
            }
            ,
          CarculateData()
          {
            getRelevantArray()
          },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1;

                this.pageSize = val;
              console.log(`当前页: ${val}`);
              getRelevantEntity(this.name,1,this.pageSize).then(res=>{
                console.log(res.data.data)
                this.tableData=res.data.data.reslist
                this.currentPage=res.data.data.currentPage

                this.total=res.data.data.total
                this.yeshu=res.data.data.total
                console.log(this.tableData)
                console.log(res)
              }).catch(err=>{
                console.log(err)
              })
              this.currentPage = val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
              getRelevantEntity(this.name,val,this.pageSize).then(res=>{
                console.log(res.data.data)
                this.tableData=res.data.data.reslist
                this.currentPage=res.data.data.currentPage

                this.total=res.data.data.total
                this.yeshu=res.data.data.total
                console.log(this.tableData)
                console.log(res)
              }).catch(err=>{
                console.log(err)
              })
                this.currentPage = val;
            },

            drawechart(data){
                let echarts = echart.init(document.querySelector("#echart1"));
                let option={
                    title: {
                        text: '交易数据',
                        //subtext: '纯属虚构',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                      //  left: 'left',
                        left: 50,
                        data: data[0]
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: data[1],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                echarts.setOption(option);
            },
            lookupcompany(name){

            companydataname(name).then(res=>{
                    this.companyData = res.data.data
                    multibyname(this.companyData.name).then(res=>{
                     //   this.tableData = res.data.data
                       // console.log( document.getElementsByName("pingfen")[0].innerText)
                     //   document.getElementsByName("pingfen")[0].innerText="信用评分："+this.xinyongpingren

                        console.log( document.getElementsByName("pingji")[0].innerText)
                        console.log("阿拉善盟成大矿业有限责任公司")
  //                    let self = this;
//
                      let b_temp = new Array;
                        this.name=name

                 //     Object.assign(b_temp , self.tableData)
                      getRelevantEntity(name,1,5).then(res=>{
                        console.log(res.data.data)
                        this.tableData=res.data.data.reslist
                        this.currentPage=res.data.data.currentPage

                        this.total=res.data.data.total
                        this.yeshu=res.data.data.total
                        console.log(this.tableData)
                        console.log(res)
                      }).catch(err=>{
                        console.log(err)
                      })
                    /*  if(name=="南京荣鑫科技"){

                      let json=  [{"id":'1917476207545647800',
                        "name":"广西威日矿业有限责任公司",
                        "number":"0.51"
                      },{"id":'4103116114073751188',
                        "name":"福建省连城锰矿有限责任公司",
                        "number":"0.43"
                      },
                        {"id":'8125320480324371278',
                          "name":"石柱振兴矿业有限责任公司",
                          "number":"0.35"
                        },{"id":'5839169703024309693',
                          "name":"贵州兴霖矿业有限公司",
                          "number":"0.32"
                        },{"id":'1389003601266664596',
                          "name":"贵州明德硫铁开发有限公司",
                          "number":"0.27"
                        }]
                      b_temp=json
                      self.tableData=b_temp
                      }
else{
                        let json= [
                          {"id":'4103116114073751182',
                            "name":"乌兰浩特市尚能再生能源有限公司",
                            "number":"0.81"
                          },{"id":'5839169703024309691',
                            "name":"内蒙古通源起航商贸有限公司",
                            "number":"0.63"
                          },
                          {"id":'1241215754710945437',
                            "name":"内蒙古鑫傲通锐运输有限公司",
                            "number":"0.55"
                          },{"id":'7547126321510949837',
                            "name":"内蒙古申益贸易有限责任公司",
                            "number":"0.43"
                          },{"id":'9169683785121167734',
                            "name":"内蒙古同泰信息科技有限公司",
                            "number":"0.39"
                          }]
                        b_temp=json
                        self.tableData=b_temp
                      }*/
                      console.log(this.tableData)
                     //   document.getElementsByName("pingji")[0].innerText="信用评级：正常"
                    //    this.total=this.tableData.length
                    //    this.yeshu=this.total/this.pageSize
                    }).catch(err=>{
                        console.log(err)
                    })
                    multidatagraph(this.companyData.name).then(res=>{
                        this.drawechart(res.data.data)
                    }).catch(err=>{
                        console.log(err)
                    })
                }).catch(err=>{
                    console.log(err)
                });

                  //  if(name=="内蒙古魔筷网络科技有限公司"
                 //   )
                  //  {

                   // }
                //    else this.tableData=[]


                },


            lookuptaxnum(name){

            },
        },
        data(){
            return {

              xinyongpingren: 0,
                queryform: {
                    company: "",
                    taxnum: ""
                },
                companyData:{
                    name:"",
                    taxnumer:"",
                    legaler:""
                },
                tableData:[],
                currentPage: 1, // 当前页码
                total:0,
                pageSize: 5, // 每页的数据条
                yeshu:0,
              name:''

            }
        }
    }

    /*
* <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%">
        <el-table-column
                prop="id"
                label="编号"
                min-width="180">
        </el-table-column>
        <el-table-column
                prop="buyername"
                label="买方"
                min-width="180">
        </el-table-column>
        <el-table-column
                prop="sellername"
                label="卖方"
                min-width="180">
        </el-table-column>
        <el-table-column
                prop="category"
                label="商品"
                min-width="180">
        </el-table-column>
        <el-table-column
                prop="price"
                label="价格"
                min-width="180">
        </el-table-column>
        <el-table-column
                prop="amount"
                label="数量"
                min-width="180">
        </el-table-column>
        <el-table-column
                prop="time"
                label="日期"
                min-width="180">
        </el-table-column>
        <el-table-column
                prop="belong"
                label="交易平台"
                min-width="180">
        </el-table-column>
        <el-table-column
                prop="transport[0]"
                label="始发地"
                min-width="180">
        </el-table-column>
        <el-table-column
                prop="transport[1]"
                label="中转站"
                min-width="180">
        </el-table-column>
        <el-table-column
                prop="transport[2]"
                label="目的地"
                min-width="180">
        </el-table-column>
        <el-table-column
                prop="transportplatform"
                label="物流平台"
                min-width="180">
        </el-table-column>
    </el-table>*/
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>
