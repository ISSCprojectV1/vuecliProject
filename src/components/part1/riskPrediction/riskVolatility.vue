<template>
    <div class = "main">
    <div class="box" v-loading="loading" element-loading-text="拼命加载中">
    </div>
        <h5  style="height: 25px;font-size: 15px;text-align:left;">
            价格波动图：价格波动以该商品价格的对数收益率进行衡量（对数收益率=log(今日收盘价/昨日收盘价)），
            价格波动图由历史价格波动与未来价格波动组成，
            其中未来价格波动由预测出来的未来价格进行评估
        </h5>
    </div>
</template>

<script>
    import echart from 'echarts'
    import {getVarDiff, getVarPredictVol, getVarVolatility} from "@/api/part1/riskPrediction";
    import {handleOption, handleTimeFormat} from "@/utils/part3";

    export default {
        name: "riskVolatility",
        data(){
            return {
                loading:true,
            }
        },
      mounted() {
        let tiankong= document.getElementById("diceng");
        tiankong.style.height=window.innerHeight+"px"

        console.log(tiankong.style.height)
        let announcement=document.getElementById("announcement");
        console.log(tiankong)
      },
        created(){
                let varDiff=[];
                let varPredictVol=[];
                let varVolatility=[];
                Promise.all([
                    getVarDiff().then(res=>{
                        //console.log("获取历史对数收益率数据成功")
                        varDiff = handleTimeFormat(res.data,'diff')
                        //console.log(this.varDiff)
                    }),
                    getVarPredictVol().then(res=>{
                        //console.log("预测波动率的获取成功")
                        varPredictVol = handleTimeFormat(res.data,'prevol')
                        //console.log(this.varPredictVol)
                    }),
                    getVarVolatility().then(res=>{
                        //console.log("历史数据波动率的获取成功")
                        varVolatility = handleTimeFormat(res.data,'volatility')
                        //console.log(this.varVolatility)
                    }),
                ]).then(()=>{
                    console.log("数据到位")
                    this.echarts = echart.init(document.querySelector(".box"));
                    let option = {
                      title: {
                        text: '商品收盘价格走势图',
                        textStyle:{
                          fontSize:20
                        },
                        right:'20%'
                      },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: [],
                          right:'25%',
                            top:'6%'
                        },
                        grid: {
                            left:'0%',
                            containLabel: true,
                            top:'20%'
                        },
                        toolbox: {
                            left:'left',
                            feature: {
                                saveAsImage: {
                                    show:true,
                                    title:'保存为图片'
                                },
                                dataZoom:{
                                    show:true
                                }
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [],
                        color:['RGB(0,118,174)','RGB(255,116,0)','RGB(239,0,0)'],
                        dataZoom:[
                            {
                                type:'slider'
                            }
                        ]
                    }
                    let myoption = handleOption({
                        'varDiff':varDiff,
                        'varVolatility':varVolatility,
                        'varPredictVol':varPredictVol
                    });
                    console.log(myoption)

                    option.title.text = myoption.title
                    option.legend.data = myoption.legend
                    option.xAxis.data = myoption.xAxis

                    for(let i=0;i<myoption.legend.length;i++){
                        option.series[i] = {
                            name:myoption.legend[i],
                            type:'line',
                            data:myoption.data[myoption.legend[i]],
                            connectNulls:true,
                        }
                    }
                    this.echarts.setOption(option);
                    this.loading = false;
                }).catch(error=>{
                    console.log(error)
                })

        },
        methods:{
            test(){
                console.log("函数调用测试")
            },

        },
    }
</script>

<style lang="stylus" scoped>
    .main{
        width 600px
        height 500px
        position: absolute
        left:60%
    }
    .box{
        width: 600px;
        height: 500px
    }
</style>
