<template>
    <div id="diceng">

      <div class="title">
        <div style="display: inline-block; margin-bottom:20px;font-size: 30px;" >  多模态多粒度监管与服务模式——主被动模态与空间粒度</div>
      </div>

        <el-tabs v-model="activeName">
            <el-tab-pane label="表格模式" name="table">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="编号"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="sellerid"
                            label="卖方id"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="sellername"
                            label="卖方"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="buyerid"
                            label="买方id"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="buyername"
                            label="买方"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="category"
                            label="种类"
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
                            prop="original"
                            label="原生任务"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="tasksize"
                            label="空间粒度"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="belong"
                            label="交易平台"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="交易事件"
                            min-width="180">
                    </el-table-column>
                </el-table>
                <el-pagination
                        ref="pagination"
                        style="text-align: center"
                        background
                        layout="prev, pager, next"
                        @current-change = "pageChange"
                        :total="total"
                >
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="流程图模式" name="flow">
                <div id="echart1" style="width: 1000px;height: 600px;text-align: center"></div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {activetradedetailinfo, activetradegraph} from "@/api/part1/acpassTask";
    import echart from "echarts";

    export default {
        name: "activetaskDetail",
        created(){
            const id = this.$router.currentRoute.params.id;
            this.Activetradedetailinfo(id,1,10);
        },
        mounted(){

            let tiankong= document.getElementById("diceng");
            tiankong.style.height=window.innerHeight+"px"

            console.log(tiankong.style.height)
            let announcement=document.getElementById("announcement");
            console.log(tiankong)

            activetradegraph(1).then(res=>{
                let data=res.data.data;
                let nodes=[];
                let links=[];
                for (let i = 0; i < data[0].length; i++) {
                    nodes.push(
                        {
                            name:data[0][i].name,
                            x:data[0][i].xposition,
                            y:data[0][i].yposition,
                            symbolSize:data[0][i].symbolsize,
                            itemStyle:{
                                color:data[0][i].color
                            }
                        }
                    )
                }
                for (let i = 0; i < data[1].length; i++){
                    links.push({
                        source:data[1][i].source,
                        target:data[1][i].target,
                    })
                }
                let echarts = echart.init(document.querySelector("#echart1"));
                let option = {
                    // title: {
                    //     text: 'Graph 简单示例'
                    // },
                    tooltip: {},
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series: [
                        {
                            type: 'graph',
                            layout: 'none',
                            symbolSize: 50,
                            roam: true,
                            label: {
                                show: true
                            },
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [4, 10],
                            edgeLabel: {
                                fontSize: 20
                            },
                            data: nodes,
                            // links: [],
                            links: links,
                            lineStyle: {
                                opacity: 0.9,
                                width: 2,
                                curveness: 0
                            }
                        }
                    ]
                };
                echarts.setOption(option);
            }).catch(err=>{
                console.log(err)
            })
        },
        data(){
            return{
                activeName:"table",
                total:0,
                tableData:[]
            }
        },
        methods:{
            Activetradedetailinfo(id,currentPage,pageSize){
                activetradedetailinfo(id,currentPage,pageSize).then(res=>{
                    let data = res.data.data.reslist;
                    this.total = res.data.data.total;
                    this.tableData = data
                }).catch(err=>{
                    console.log("请求失败")
                    console.log(err)
                })
            },

            //换页请求
            pageChange(page){
                const id = this.$router.currentRoute.params.id;
                this.currentPage=page;
                this.Activetradedetailinfo(id,page,10);
            },
        }
    }
</script>

<style scoped>

</style>
