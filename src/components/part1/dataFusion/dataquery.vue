<template>
    <div id="diceng">
        <div> <el-button @click="goback">返回</el-button></div>
        <h2>数据查询</h2>
        <el-row>
            <el-col :span="8">
                <el-form>
                    <el-form-item label="交易商名称检索">
                        <el-input v-model="queryform.company"></el-input>
                        <el-button @click="lookupcompany(queryform.company)">查找</el-button>
                    </el-form-item>
                    <el-form-item label="交易商社会统一信用代码检索">
                        <el-input v-model="queryform.taxnum"></el-input>
                        <el-button @click="lookuptaxnum(queryform.taxnum)">查找</el-button>
                    </el-form-item>
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
                    prop="id"
                    label="编号"
                    min-width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="交易主体名称"
                    min-width="180">
            </el-table-column>
            <el-table-column
                    prop="number"
                    label="与主体相似度"
                    min-width="180">
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
    import {companydataname, multibyname, multidatagraph} from "@/api/part1/dataFusion";



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
        console.log(tiankong.style.height)
        let announcement=document.getElementById("announcement");
        console.log(tiankong)
            this.lookupcompany(this.$route.query.data.company)
      },
        methods:{
            goback(){
                this.$router.go(-1)
            }
            ,
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
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
                        left: 'left',
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
                        console.log( document.getElementsByName("pingfen")[0].innerText)
                        document.getElementsByName("pingfen")[0].innerText="信用评分：80"
                        console.log( document.getElementsByName("pingji")[0].innerText)
                        console.log("内蒙古魔筷网络科技有限公司")

                        var self = this;

                        var b_temp = new Array;

                        Object.assign(b_temp , self.tableData)
                        var json= [
                            {"id":21,
                                "name":"乌兰浩特市尚能再生能源有限公司",
                                "number":"0.91"
                            },{"id":22,
                                "name":"内蒙古通源起航商贸有限公司",
                                "number":"0.83"
                            },
                            {"id":23,
                                "name":"内蒙古鑫傲通锐运输有限公司",
                                "number":"0.65"
                            },{"id":24,
                                "name":"内蒙古申益贸易有限责任公司",
                                "number":"0.33"
                            },{"id":25,
                                "name":"内蒙古同泰信息科技有限公司",
                                "number":"0.12"
                            }]
                        b_temp=json
                        self.tableData=b_temp

                        console.log(this.tableData)
                        document.getElementsByName("pingji")[0].innerText="信用评级：正常"
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
                pageSize: 3, // 每页的数据条
                yeshu:0

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
