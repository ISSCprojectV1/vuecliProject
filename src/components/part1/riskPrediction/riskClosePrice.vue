<template>
     <div id="index" v-loading="loading" element-loading-text="拼命加载中">
        <div id="main" class="box"></div>
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
                getriskPredictionData().then((res) => {
                this.predictionData =res.data;
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
            for(var i= 0;i<values.length;i++){
                cataData.push(values[i].day.split('T')[0]);
                priceData.push(values[i].closeprice);
            }

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
                       text: '风\n险\n预\n测',
                       textStyle:{
                           fontSize:30
                       },
                       left:0
                       },
            tooltip: {
            trigger: 'axis'
        },
               xAxis: {
                    type: 'category',
                    data: cataData,
                      },
                 yAxis: {
              type: 'value',
              min: function (value) {
               return value.min - 20;
              }
              },
                series: [{
                    name:"历史数据",
                    type: 'line',
                    data: priceData,
                },
                {
                    name:"预测数据",
                    type: 'line',
                    data: [null,null,30],
                },
                ]
            })
                this.loading = false

            }
        }
    }
</script>

<style>
.index{
  width: 100%;
  height: 600px;
}
.box{
    width: 1000px;
    height: 600px
}

</style>
