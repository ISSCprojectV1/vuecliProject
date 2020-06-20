<template>
     <div id="index">
        <div id="main" style="width: 100%;height: 800px;"></div>
    </div>
</template>
<script>
 //   import axios from "axios";
    import echarts from 'echarts'
    import {getriskHistoryData,getriskPredictionData} from "@/api/part1/riskPrediction";
    export default {
        name: "app",
        data() {
            return {
                itemList: []
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                // 获取历史交易数据
                console.log("获取历史数据")
                getriskHistoryData().then((res) => {
                console.log("History json :"+res.data);
                this.opinionData =res.data;
                console.log("获取历史数据成功")
                }).catch(()=>{
                    console.log("getHistoryData fail")
                });

                // 获取第二天预测交易数据
                console.log("获取预测数据")
                getriskPredictionData().then((res) => {
                console.log("Prediction json :"+res.data);
                this.predictionData =res.data;
                console.log("predictionData 是"+this.predictionData);
                this.drawLine('main');
                console.log("TEXT.VUE--调用axios完成");
                }).catch(()=>{
                    console.log("getPredictionData fail")
                });
                /*
               axios.get('../../static/json/prediction.json').then(response => {
                    console.log("prediction json :"+response.data);
                    this.predictionData =response.data;
                    console.log("predictionData 是"+this.predictionData);
                    this.drawLine('main');
                    console.log("TEXT.VUE--调用axios完成");
                }, response => {
                    console.log("error");
                });*/
            },
            
            drawLine(id){
            this.charts = echarts.init(document.getElementById(id))
            var upColor = '#ec0000';
            var upBorderColor = '#8A0000';
            var downColor = '#00da3c';
            var downBorderColor = '#008F28';
            // 将json文件存入数组
            var values=[];
            values = this.opinionData;
            var predictionVAL = [];
            predictionVAL = this.predictionData;
            console.log("pricetionVAL的内容是" + predictionVAL);
            var cataData = [];// 储存读入的日期
            var priceData = [];// 存储读入的价格信息
            for(var i= 0;i<values.length;i++){
                cataData.push(values[i].day);
                var price=[];
                price.push(values[i].openprice);
                price.push(values[i].closeprice);
                price.push(values[i].highprice);
                price.push(values[i].lowprice);
                priceData.push(price);
            }
            console.log("cataData的内容是" + cataData);
            
            function calculateMA(dayCount) {
                    var result = [];
                    for (var i = 0, len = priceData.length; i < len; i++) {
                    if (i < dayCount) {
                    result.push('-');
                    continue;
                      }
                   var sum = 0;
                   for (var j = 0; j < dayCount; j++) {
                   sum += priceData[i - j][1];
                       }
                   result.push(sum / dayCount);
                       }
                console.log("result =" + result);
                  return result;
                       }
            this.charts.setOption({
                title: {
                       text: '风\n险\n预\n测',
                       textStyle:{
                           fontSize:30
                       },
                       left:0
                       },
                tooltip: {
                       trigger: 'axis',
                       axisPointer: {
                       type: 'cross'
                        }
                       },
                legend: {
                    data: ['日K', 'PREDICTION',  'MA10', 'MA20']
                },
               xAxis: {
                    type: 'category',
                    data: cataData,
                    scale: true,
                    boundaryGap: false,
                    axisLine: {onZero: false},
                    splitLine: {show: false},
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax'
                      }, 
                yAxis: {
                    scale: true,
                    splitArea: {
                    show: true
                       }
                      },
                dataZoom: [
                      {
                    type: 'inside',
                    start: 50,
                    end: 100
                      },
                      {
                    show: true,
                    type: 'slider',
                    top: '90%',
                    start: 50,
                    end: 100
                      }
                      ],
                series: [{
                    name: '日K',
                    type: 'candlestick',
                    data: priceData,
                    itemStyle: {
                          color: upColor,
                          color0: downColor,
                          borderColor: upBorderColor,
                          borderColor0: downBorderColor
                               },
                    markPoint: {
                            label: {
                           normal: {
                         formatter: function (param) {
                            return param != null ? Math.round(param.value) : '';
                                 }
                                 }
                                },
                        data: [
                          {
                            name: 'XX标点',
                            coord: ['2013/5/31', 2300],
                            value: 2300,
                            itemStyle: {
                            color: 'rgb(41,60,85)'
                            }
                          },
                         {
                            name: 'highest value',
                            type: 'max',
                            valueDim: 'highest'
                         },
                         {
                            name: 'lowest value',
                            type: 'min',
                            valueDim: 'lowest'
                         },
                          {
                          name: 'average value on close',
                          type: 'average',
                          valueDim: 'close'
                          }
                          ],
                     tooltip: {
                     formatter: function (param) {
                          return param.name + '<br>' + (param.data.coord || '');
                         }
                       }
                       },           
                },
                     {
                    name: 'PREDICTION',
                    type: 'line',
                    data: calculateMA(5),
                    smooth: true,
                    lineStyle: {
                    opacity: 0.5
                       }
                       },
                    {
                    name: 'MA10',
                    type: 'line',
                    data: calculateMA(10),
                    smooth: true,
                    lineStyle: {
                    opacity: 0.5
                       }
                       },
                        {
                    name: 'MA20',
                    type: 'line',
                    data: calculateMA(20),
                    smooth: true,
                    lineStyle: {
                    opacity: 0.5
                       }
                       },
                       
                ]
            })

            }
        }
    }
</script>

<style>
.index{
  width: 100%;
  height: 600px;
}
</style>