<template>
    <div>
        <h2>交易频次查询</h2>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="查询商品">
                <el-select v-model="formInline.itemid" placeholder="选择商品">
                    <el-option label="棉花U001" value="1"></el-option>
                    <el-option label="钢铁U730" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="查询时间">
                <el-date-picker
                        v-model="formInline.time"
                        type="monthrange"
                        range-separator="至"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(formInline)">查询</el-button>
            </el-form-item>
        </el-form>

        <el-tabs v-model="activeName">
            <el-tab-pane label="表格模式" name="table">
                <h3>用户交易频率统计表</h3>
                <el-table
                        :default-sort = "{prop: 'count', order: 'descending'}"
                        :data="supportData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="uid"
                            label="用户id"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="oid"
                            label="商品id"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="count"
                            label="交易频次"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="support"
                            label="频次权重"
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



            <el-tab-pane label="统计图模式" name="diagram">
                <h3>用户交易频率统计图</h3>
                <div id="echart1" style="width: 1000px;height: 300px;text-align: center" v-show="showing1"></div>
            </el-tab-pane>
        </el-tabs>



    </div>
</template>

<script>
    import {tradesimilar, userrelation, usersupport} from "@/api/part1/relation";
    import echart from "echarts";

    export default {
        name: "relationQuery",
        data() {
            return {
                activeName:"table",
                formInline: {
                    itemid: '',
                    time: [],
                },
                supportData:[],
                SimilarityUser:[],
                SimilarityTrade:[],
                showing1:false,
                echart1:"",
                echart2:"",
                echart3:"",
                total:1
            }
        },
        mounted(){
        },
        methods: {
            pageChange(){

            },
            drawecharts1(data){
                let mySeries=[]
                let countall=[]
                for (let i = 1; i < data.length; i++) {
                    let name = data[i][0];
                    let count = 0;
                    for(let j=1;j< data[i].length;j++)
                        count+=data[i][j]
                    countall.push({
                        name:name,
                        value:count
                    })
                }
                for (let i = 0; i < data.length-1; i++) {
                    mySeries.push({
                    type: 'line', smooth: true, seriesLayoutBy: 'row'
                    })
                }
                mySeries.push({
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['66%', '25%'],
                    tooltip: {
                        trigger: 'item',
                        showContent: true
                    },
                    label: {
                        formatter: '{b}: {@[' + 1 + ']} ({d}%)'
                    },
                    encode: {
                        itemName: 'users',
                        value: [1],
                    }
                },            {
                    type: 'pie',
                    id: 'pie2',
                    radius: '30%',
                    tooltip: {
                        trigger: 'item',
                        showContent: true
                    },
                    center: ['33%', '25%'],
                    label: {
                        formatter: '{b}: {c} ({d}%)'
                    },
                    data:countall,
                })
                    this.echart1 = echart.init(document.querySelector("#echart1"));
                    let option = {
                        legend: {},
                        tooltip: {
                            trigger: 'axis',
                            showContent: true
                        },
                        dataset: {
                            source: data
                        },
                        xAxis: {type: 'category'},
                        yAxis: {gridIndex: 0},
                        grid: {top: '55%'},
                        series: mySeries,
                    }
                    let chart = this.echart1;
                this.echart1.on('updateAxisPointer', function (event) {
                        var xAxisInfo = event.axesInfo[0];
                        if (xAxisInfo) {
                            var dimension = xAxisInfo.value + 1;
                            chart.setOption({
                                series: {
                                    id: 'pie',
                                    label: {
                                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                                    },
                                    encode: {
                                        value: dimension,
                                    }
                                }
                            });
                        }
                    });
                    this.echart1.clear();
                    this.echart1.setOption(option);
            },

            drawecharts3(data){
                this.echart3 = echart.init(document.querySelector("#echart3"));
                let categories=[]
                let tids=[]
                for (let i = 0; i < data.length; i++) {
                    tids.push(data[i].tid1,data[i].tid2)
                }
                tids = [...new Set(tids)]
                for (let i = 0; i < tids.length; i++) {
                    categories.push({name:"交易"+tids[i]})
                }
                console.log(categories)
                let nodes=[]
                let links=[]
                for (let i = 0; i < categories.length; i++) {
                    nodes.push({
                        name: categories[i].name,
                        category: categories[i].name
                    })
                }
                for (let i = 0; i < data.length; i++) {
                    links.push(
                        {
                            source:"交易"+data[i].tid1,
                            target:"交易"+data[i].tid2,
                            value:data[i].similarity,
                            label: {
                                show:true,
                                formatter:"关联度:{c}"
                            },
                            lineStyle:{
                                width: 5*data[i].similarity+1
                            }
                        }
                    )
                }

                let option = {
                    tooltip: {},
                    legend: [{
                        // selectedMode: 'single',
                        data: categories.map(function (a) {
                            return a.name;
                        })
                    }],

                    animationDuration: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series : [
                        {
                            name: 'Les Miserables',
                            type: 'graph',
                            layout: 'circular',
                            data: nodes,
                            links: links,
                            categories: categories,
                            roam: true,
                            focusNodeAdjacency: true,
                            itemStyle: {
                                borderColor: '#fff',
                                borderWidth: 1,
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            },
                            label: {
                                show:true,
                                position: 'right',
                            },
                            lineStyle: {
                                color: 'source',
                                curveness: 0.3
                            },
                            emphasis: {
                                lineStyle: {
                                    width: 10
                                }
                            }
                        }
                    ]
                };
                this.echart3.clear();
                this.echart3.setOption(option);
            },
            init(){
                this.supportData=[];
                this.SimilarityTrade=[];
                this.SimilarityUser=[];
                if(this.echart1!="")
                    this.echart1.clear()
                if(this.echart2!="")
                    this.echart2.clear()
                if(this.echart3!="")
                    this.echart3.clear()

            },
            prepareData(time,data){
                let start = time[0];
                let end = time[1];
                let startY = time[0].getFullYear();
                let endY = time[1].getFullYear();
                let startM = time[0].getMonth();
                let endM = time[1].getMonth();
                let gapM = (endY-startY)*12+(endM-startM)+1;
                let months = ['users'];
                let TY = startY;
                let TM = startM+1;
                for (let i = 0; i <gapM ; i++) {
                    if(TM==13)
                    {
                        TY+=1;
                        TM=1;
                    }
                    months.push(TY+'.'+TM);
                    TM+=1;
                }
                let sourcedata=[];
                sourcedata.push(months);
                for (let i = 0; i < data.length; i++) {
                    sourcedata.push(["用户"+data[i].uid])
                    for (let j = 0; j < gapM; j++) {
                        sourcedata[i+1].push(0)
                    }
                    for (let j = 0; j <data[i].relationtrades.length ; j++) {
                         let index = new Date(data[i].relationtrades[j].date).getMonth()-startM+1
                         sourcedata[i+1][index]+=1
                    }
                }
                console.log(sourcedata)
                return sourcedata;

            },
            onSubmit(formInline) {
                this.init();
                this.showing1=true;
                let params = {
                    itemid:formInline.itemid,
                    start:formInline.time[0],
                    end:formInline.time[1],
                }
                usersupport(params).then(res=>{
                    console.log(res.data.data)
                    this.supportData = res.data.data;
                    let prepared = this.prepareData(formInline.time,res.data.data)
                    this.drawecharts1(prepared);
                    userrelation(params).then(res=>{
                        console.log(res.data.data)
                        this.SimilarityUser = res.data.data
                        this.drawechart2(res.data.data,prepared);
                    }).catch(err=>{
                        console.log(err)
                    })
                }).catch(err=>{
                    console.log(err)
                })


            },
            Tradesimilar(row){
                let data={
                    uid1:row.uid1,
                    uid2:row.uid2,
                    itemid:this.formInline.itemid,
                    start:this.formInline.time[0],
                    end:this.formInline.time[1],
                }
                tradesimilar(data).then(res=>{
                    //取交易关联度大的前10个交易对
                    if (res.data.data.length<=10)
                        this.SimilarityTrade = res.data.data;
                    else
                    {
                        this.SimilarityTrade = res.data.data.sort((a,b)=>b.similarity-a.similarity).slice(0,10)
                    }
                    setTimeout(() => {
                        //  执行echarts画图方法
                        console.log(this.SimilarityTrade)
                        this.drawecharts3(this.SimilarityTrade)
                    }, 0);
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>
