<template>
     <div id="index" v-loading="loading" element-loading-text="拼命加载中">
        <div id="main" class="box_close">
        </div>
         <div>
             <h5  style="height: 25px;font-size: 15px;text-align:left;">
                 价格预测图：
                 由该商品收盘价的历史价格与预测价格组成，
                 其中预测价格根据国内大宗商品供需平衡率，
                 该商品成交量，该商品近期价格涨跌，人民币利率，
                 平台的空间因素和该商品品种的关联性预测而来
             </h5>
         </div>
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
                itemList: [],
                loading:true
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                // 获取历史交易数据
                getriskHistoryData().then((res) => {
                this.opinionData =res.data;
                }).catch(()=>{
                    console.log("getHistoryData fail")
                });

                // 获取第二天预测交易数据
                console.log("获取预测数据")
                Promise.all([
                getriskPredictionData().then((res) => {
                this.predictionData =res.data;
                })
                ]).then(()=>{
                    console.log("数据到位 画图");
                    this.drawLine('main');

                }).catch(()=>{
                    console.log("getPredictionData fail")
                });
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
            var predictionDate = [];
            for(let i=0; i<this.predictionData.length;i++){
                predictionVAL.push(this.predictionData[i].closeprice);
                predictionDate.push(this.predictionData[i].day.split('T')[0]);
            }

            var cataData = [];// 储存读入的日期
            var priceData = [];// 存储读入的价格信息
            for(var i= 0;i<values.length-1;i++){
                cataData.push(values[i].day.split('T')[0]);
                priceData.push(values[i].closeprice);
            }
            console.log("values.length-1:" + values.length)
            var historyLength = 27;
            var pridictResult = [];
            for(let i=0; i<priceData.length;i++){
                pridictResult.push(null);
            }
            pridictResult.push.apply(pridictResult,predictionVAL);
            var allPrice = priceData.concat(predictionVAL);
            var allPriceData = cataData.concat(predictionDate);
            cataData.push.apply(cataData,predictionDate);
            //priceData.push.apply(priceData,predictionVAL);
            console.log(priceData);
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
                       text: '商品收盘价格走势图',
                       textStyle:{
                           fontSize:20
                       },
                       right:'35%'
                       },
                 legend: {
                     right:'30%',
                     top:'6%',
                  data:['完整数据','历史数据','预测数据']
          },
            tooltip: {
            trigger: 'axis'
        },
        toolbox: {
                            left:'left',
                            feature: {
                                saveAsImage: {
                                    show:true,
                                    title:'保存为图片'
                                },
                                
                            }
                        },
               xAxis: {
                    type: 'category',
                    data: allPriceData,
                      },
                 yAxis: {
              type: 'value',
              min: function (value) {
               return value.min - 20;
              }
              },
              graphic:[
                  {
            type: 'group',
            left: '70%',
            top: 'center',
            children: [
                {
                    type: 'rect',
                    z: 100,
                    left: 'center',
                    top: 'middle',
                    shape: {
                        width: 140,
                        height: 70
                    },
                    style: {
                        fill: '#fff',
                        stroke: '#555',
                        lineWidth: 2,
                        shadowBlur: 8,
                        shadowOffsetX: 3,
                        shadowOffsetY: 3,
                        shadowColor: 'rgba(0,0,0,0.3)'
                    }
                },
                {
                    type: 'text',
                    z: 100,
                    left: 'center',
                    top: 'middle',
                    style: {
                        fill: '#333',
                        text: [
                            '当前预测走势：',
                            '波动值正常',
                            '低风险'
                        ].join('\n'),
                        font: '14px Microsoft YaHei'
                    }
                }
            ]
        }
              ],
              visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            gt:0,
            lte: 8,
            color: 'green'
        }, {
            gt: 8,
            lte: historyLength,
            color: 'green'
        } , {
            gt: historyLength,
            color: 'red'
        }]
    },
                series: [
                    {
                    name:"完整数据",
                    type: 'line',
                    label:"预测数据",
                    show:true,
                    markArea: {
                silent: true,
                color:'#778899',
                data: [
                    [{
                        xAxis: '2017-12-28'
                    }, {
                        xAxis: '2018-12-30'
                    }]
                ]
            },
                    data: allPrice,
                },
                {
                    name:"预测数据",
                    type: 'line',
                    label:"预测数据",
                    show:true,
                     markArea: [{
                silent: true,
                color:'#778899',
                data: [
                    [{
                        xAxis: '2017-12-28'
                    }, {
                        xAxis: '2018-12-30'
                    }]
                ]
            },
            {
                silent: true,
                color:'#778899',
                data: [
                    [{
                        xAxis: '2017-11-19'
                    }, {
                        xAxis: '2017-12-28'
                    }]
                ]
            },
            ],
                    data: pridictResult,
                },
                {
                    name:"历史数据",
                    type: 'line',
                    markArea: {
                silent: true,
                color:'#778899',
                data: [
                    [{
                        xAxis: '2017-11-19'
                    }, {
                        xAxis: '2017-12-28'
                    }]
                ]
            },
                    data: priceData,
                },
                ],
                dataZoom:[
                            {
                                type:'slider'
                            }
                        ]
            })
                this.loading = false

            }
        }
    }
</script>

<style>
#index{
  width: 600px;
}
.box_close{
    width: 600px;
    height: 500px
}

</style>
