<template>
    <div id="diceng">

      <div class="title">
        <div style="display: inline-block; margin-bottom:20px;font-size: 40px;" >  主被动模态与空间粒度</div>
      </div>

        <el-tabs v-model="activeName">
            <el-tab-pane label="交易详情" name="table">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="交易编号"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="sellerid"
                            label="卖方id"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="sellername"
                            label="卖方"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="buyerid"
                            label="买方id"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="buyername"
                            label="买方"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="category"
                            label="种类"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="价格"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="amount"
                            label="数量"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="original"
                            label="原生任务"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="tasksize"
                            label="空间粒度"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="belong"
                            label="交易平台"
                            min-width="180">
                    </el-table-column>

                </el-table>
                <el-pagination
                        ref="pagination"
                        style="text-align: center"
                        background
                        layout="prev, pager, next"
                        page-size="5"
                        @current-change = "pageChange"
                        :total="total"
                >
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="交易模式" name="flow">
                <div id="echart1" style="width: 1000px;height: 600px;text-align: center"></div>
            </el-tab-pane>
            <el-button type="success" @click="goback">返回</el-button>
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
            this.Activetradedetailinfo(id,1,5);
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
                  color:['red',

                    'blue'],
                  legend: { //=========小图标，圖表控件
                    show:true,
                    data: [{
                      name: '用户编号',
                      icon: 'circle' //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                      //icon:'image://./images/icon1.png'  //如果用图片img，格式为'image://+icon文件地址'，其中image::后的//不能省略
                    },


                      {
                        name: '交易节点',
                        icon: 'circle'
                      }

                    ]
                  },
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
                            },
                          categories: [ //symbol name：用于和 legend 对应以及格式化 tooltip 的内容。 label有效
                            {
                              name: '用户编号',
                              icon: 'circle' //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                              //icon:'image://./images/icon1.png'  //如果用图片img，格式为'image://+icon文件地址'，其中image::后的//不能省略
                            },

                            {
                              name: '交易节点',
                              symbol: 'circle'
                            }
                          ]
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
            goback(){
                this.$router.back(-1)
            },

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
                this.Activetradedetailinfo(id,page,5);
            },
        }
    }
</script>

<style scoped>

</style>
