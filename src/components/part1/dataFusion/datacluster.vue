<template>
    <div id="diceng">
        <h2>关联交易主体发现</h2>
        <el-row>
            <el-col :span="8">
                <el-form>
                    <el-form-item label="异常交易节点检索">
                        <el-input v-model="queryform.company"></el-input>
                        <el-button @click="lookupcompany(queryform.company)">查找</el-button>
                    </el-form-item>


                </el-form>


            </el-col>

        </el-row>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="社会统一信用代码"
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
        name: "datacluster",
        mounted() {
            let tiankong= document.getElementById("diceng");
            tiankong.style.height=window.innerHeight+"px"

            console.log(tiankong.style.height)
            let announcement=document.getElementById("announcement");
            console.log(tiankong)
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
            },


            lookupcompany(name){
                if(name=="内蒙古魔筷网络科技有限公司"
                )
                {
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
                }
else this.tableData=[]


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
