<template>
    <div id="diceng">
        <h2>交易关联查询</h2>
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
                <h3>用户关联分析表</h3>
                <el-table
                        :default-sort = "{prop: 'similarity', order: 'descending'}"
                        :data="SimilarityUser"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="uid1"
                            label="关联用户id"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="uid2"
                            label="关联用户id"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="oid"
                            label="关联商品id"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="similarity"
                            label="用户关联度"
                            min-width="180">
                        <template slot-scope="scope">
                            <el-progress :stroke-width="10" :percentage="scope.row.similarity"></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column label="关联交易">
                        <template slot-scope="scope">
                            <el-popover
                                    placement="left-start"
                                    trigger="click"
                                    @after-enter="Tradesimilar(scope.row)"
                                    offset="2000"
                                    width="1000"
                            >

                                <el-tabs v-model="activeName1" @tab-click="tabclick">
                                    <el-tab-pane label="交易关联分析表" name="table1">
                                        <el-table
                                                :data="SimilarityTrade"
                                                stripe
                                                :default-sort = "{prop: 'similarity', order: 'descending'}"
                                                style="width: 100%">
                                            <el-table-column
                                                    prop="tid1"
                                                    label="关联交易id"
                                                    min-width="180">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="tid2"
                                                    label="关联交易id"
                                                    min-width="180">
                                            </el-table-column>
                                            <el-table-column
                                                    sortable
                                                    prop="similarity"
                                                    label="交易关联度"
                                                    min-width="180">
                                                <template slot-scope="scope">
                                                    <el-progress :stroke-width="10" :percentage="scope.row.similarity"></el-progress>
                                                </template>

                                            </el-table-column>
                                        </el-table>

                                    </el-tab-pane>

<!--                                    <el-tab-pane label="交易关联图" name="diagram1">-->
<!--                                        <h3>交易关联图</h3>-->
<!--                                        <div id="echart3" style="width: 1000px;height: 300px;text-align: center" ref="echart3"></div>-->
<!--                                    </el-tab-pane>-->
                                </el-tabs>





                                <el-button slot="reference">点击查看</el-button>
                            </el-popover>
                            <!--                            <el-button-->
                            <!--                                    @click="Tradesimilar(scope.row)">查看-->
                            <!--                            </el-button>-->
                        </template>
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

        <el-tab-pane label="关系图模式" name="diagram">

            <h3>用户关联图</h3>
            <div id="echart2" style="width: 700px;height: 700px;text-align: center" v-show="showing1"></div>
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
                activeName1:"table1",
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
                total:1,
                echartOption:""
            }
        },
      mounted() {
        let tiankong= document.getElementById("diceng");
        tiankong.style.height=window.innerHeight+"px";
        let announcement=document.getElementById("announcement");
      },
        methods: {
            tabclick(t){
                let tableName = t.$options.propsData.label
                // if(tableName=="交易关联图"){
                //     this.drawecharts3(this.SimilarityTrade);
                // }
                    },
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
            drawechart2(data,lastData){
                this.echart2 = echart.init(document.querySelector("#echart2"));
                let uids = []
                for (let i = 0; i < data.length; i++) {
                        uids.push(data[i].uid1,data[i].uid2)
                }
                uids = [...new Set(uids)]
                let categories=[]
                for (let i = 0; i < uids.length; i++) {
                    categories.push(
                        {name: "用户"+uids[i]}
                    )
                }
                let countall=[]
                for (let i = 1; i < lastData.length; i++) {
                    let name = lastData[i][0];
                    let count = 0;
                    for(let j=1;j< lastData[i].length;j++)
                        count+=lastData[i][j]
                    countall.push({
                        name:name,
                        value:count
                    })
                }
                console.log(categories)
                console.log(countall)
                let nodes=[];
                for (let i = 0; i <categories.length ; i++) {
                    for (let j = 0; j < countall.length ; j++) {
                        if(categories[i].name===countall[j].name)
                        {
                            nodes.push({
                                name:categories[i].name,
                                value: countall[j].value,
                                category:categories[i].name
                            })
                        }
                        }

                }
                let links=[];
                for (let i = 0; i < data.length; i++) {
                    links.push(
                        {
                            source:"用户"+data[i].uid1,
                            target:"用户"+data[i].uid2,
                            value:data[i].similarity/100.0,
                            label: {
                                show:true,
                                formatter:"关联度:{c}"
                            },
                            lineStyle:{
                                width: 10*data[i].similarity/100.0+1
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
                            symbolSize:(value)=>value+1,
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
                                formatter: '{b} \n交易频次：{c}'
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
                this.echart2.clear();
                this.echart2.setOption(option);
            },
            drawecharts3(){
                let data = this.SimilarityTrade
                // this.echart3 = echart.init(this.$refs['echart3'])
                // console.log(this.$refs['echart3'])
                let categories=[]
                let tids=[]
                for (let i = 0; i < data.length; i++) {
                    tids.push(data[i].tid1,data[i].tid2)
                }
                tids = [...new Set(tids)]
                for (let i = 0; i < tids.length; i++) {
                    categories.push({name:"交易"+tids[i]})
                }
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
                            value:data[i].similarity/100.0,
                            label: {
                                show:true,
                                formatter:"关联度:{c}"
                            },
                            lineStyle:{
                                width: 5*data[i].similarity/100.0+1
                            }
                        }
                    )
                }

                this.echartOption = {
                    tooltip: {},
                    legend: [{
                        // selectedMode: 'single',
                        data: categories.map(function (a) {
                            return a.name;
                        })
                    }],

                    //animationDuration: 1500,
                    //animationEasingUpdate: 'quinticInOut',
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
                //this.echart3.setOption(option);

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
                    //this.drawecharts1(prepared);
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
                this.$nextTick(()=>{
                    this.activeName1="table1";
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
                            this.SimilarityTrade = res.data.data.sort((a,b)=>b.similarity-a.similarity).slice(0,10);
                        }
                        //this.drawecharts3(this.SimilarityTrade)
                        // setInterval(() => {
                        //     //  执行echarts方法
                        //     this.drawecharts3(this.SimilarityTrade);
                        // }, 500);
                    }).catch(err=>{
                        console.log(err)
                    })

                })

            }
        },
        watch:{
            SimilarityTrade: {
                deep: true,
                handler(newVal, oldValue) {
                    if (this.echart3) {
                        if (newVal) {
                            console.log("更新值")
                            this.drawecharts3();
                            this.echart3.setOption(this.echartOption);
                        }
                    } else {
                        if (document.querySelector("#echart3")) {
                            this.echart3 = echart.init(document.querySelector("#echart3"));
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
