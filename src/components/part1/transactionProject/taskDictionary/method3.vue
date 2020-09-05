<template>
     <div id="index" v-loading="loading" element-loading-text="拼命加载中">
        <div id="main" class="box"></div>
    </div>
</template>
<script>
 //   import axios from "axios";
    import echarts from 'echarts'
    import {getriskHistoryData,getriskPredictionData,getbendiApi} from "@/api/part1/riskPrediction";
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
                getbendiApi().then((res) => {
              var input  = res.data.data;
              var result_nodes = [];
              var result_target = [];
              var taskList = Object.keys(input);
              //获得关系--任务关系
              for(let n = 0; n < taskList.length-2;n++){
                  var target = {};
                  target.source = taskList[n];
                  target.target = taskList[n+1];
                  result_target.push(target);
              }
              for (let i = 0; i<taskList.length;i++){
                  var node = {};
                  node.id = taskList[i];
                  node.name = taskList[i];
                  node.symbol = 'roundRect';
                  result_nodes.push(node);
                  var attr = node.id;
                  console.log("nodeaaaaaaaa" + i + ":" + input[attr]);

                  // 任务对应的agent遍历出来 
                  for(let j = 0; j< input[attr][j];j++){
                      var node_agent = {};
                      node_agent.id = input[attr][j];
                      node_agent.name = input[attr][j];
                      node_agent.symbol = 'circle';
                      result_nodes.push(node_agent);
                      // 获得任务--agent对应关系
                      var targer_agent = {};
                      targer_agent.source = attr;
                      targer_agent.target = node_agent.id;
                      result_target.push(targer_agent);
                  }
                  console.log("node" + i + ":" + node.id);
              }
              this.getChart_map(result_nodes,result_target);
               this.$message({
                 type: 'success',
                  message: '已形成联盟！'
          });
                }).catch(()=>{
                    console.log("getTaskApi fail")
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
            var pridictResult = [];
            for(let i=0; i<priceData.length;i++){
                pridictResult.push(null);
            }
            pridictResult.push.apply(pridictResult,predictionVAL)
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
                 legend: {
                  data:['历史数据','预测数据']
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
                series: [
                {
                    name:"预测数据",
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
                ]
            })
                this.loading = false

            }
        }
    }
</script>

<style>
.index{
  width: 1200px;
  height: 600px;
}
.box{
    width: 1200px;
    height: 600px
}

</style>
