<template>
    <div>
        <div id="echart1" style="width: 1000px;height: 600px;text-align: center"></div>

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
    </div>
</template>

<script>
    import {activetradedetailinfo, activetradegraph} from "@/api/part1/acpassTask";
    import echart from "echarts";

    export default {
        name: "activetaskDetail",
        created(){
            const id = this.$router.currentRoute.params.id;
            activetradedetailinfo(id).then(res=>{
                let data = res.data.data;
                this.tableData = data
            }).catch(err=>{
                console.log("请求失败")
                console.log(err)
            })
        },
        mounted(){
            activetradegraph(0).then(res=>{
                console.log(res.data.data)
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
                tableData:[]
            }
        },
        methods:{
        }
    }
</script>

<style scoped>

</style>
