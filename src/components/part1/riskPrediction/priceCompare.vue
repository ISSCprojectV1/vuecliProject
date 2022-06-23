<template>
<div>
    <el-row><h2>关联商品价格波动传导界面</h2></el-row>
    <el-col :span="6">

      <el-row>
        <h4>{{this.pricerow[0]+"价格波动行情走势"}}</h4>
      </el-row>
      <el-row>
        <div id="chart-third"
             style="width: 100%; height: 480px; margin-left: auto; margin-right: auto;display:inline-block;">
        </div>
      </el-row>
      <el-row>
        <h4>{{this.pricerow[0]+"价格波动平滑趋势"}}</h4>
      </el-row>
      <el-row>
        <div id="chart-first"
             style="width: 100%; height: 480px; margin-left: auto; margin-right: auto;display:inline-block;">
        </div>
      </el-row>
    </el-col>

    <el-col :span="12">
      <el-row><h4>{{this.pricerow[0]+"与"+this.pricerow[1]+"价格波动传导时间为："+this.pricerow[2]}}</h4></el-row>
      <div id="chart-center"
           style="width: 100%; height: 700px; margin-left: auto; margin-right: auto;display:inline-block;">
      </div>
    </el-col>


    <el-col :span="6">
      <el-row>
        <h4>{{this.pricerow[1]+"价格波动行情走势"}}</h4>
      </el-row>
      <el-row>
        <div id="chart-fourth"
             style="width: 100%; height: 480px; margin-left: auto; margin-right: auto;display:inline-block;">
        </div>
      </el-row>
      <el-row>
        <h4>{{this.pricerow[1]+"价格波动平滑趋势"}}</h4>
      </el-row>
      <el-row>
        <div id="chart-second"
             style="width: 100%; height: 480px; margin-left: auto; margin-right: auto;display:inline-block;">
        </div>
      </el-row>
    </el-col>


</div>
</template>

<script>
import * as echarts5 from "echarts5";
import {getAllForecastNewRisk, getHistoryPriceByName} from "@/api/part1/riskPrediction";

export default {
  name: "priceCompare",
  data(){
    return {
      chart1: {},
      chart2: {},
      chart3:{},
      chart4:{},
      chart5:{},
      pricerow:[],
      smothprice1:[],
      smothprice2:[],
      value:['焦煤', '动力煤']
    }
  },
  created() {
    this.pricerow = this.$store.state.pricerow;
    if(this.pricerow.length===0)
      this.pricerow = this.value
    this.initPrice()

  },
  mounted() {
    this.pricerow = this.$store.state.pricerow;
    if(this.pricerow.length===0)
      this.pricerow = this.value
    this.initPrice()

  },
  methods: {

    initPrice()
    {
      getHistoryPriceByName(this.pricerow[0]).then(res=>{
        let price = res.data.slice(-200);
        this.chart1 = echarts5.init(document.getElementById('chart-first'))
        this.chart3 = echarts5.init(document.getElementById('chart-third'))
        this.smothprice1 = this.drawFirstChart(this.chart1, price, '#EE6666')
        this.drawSecondChart(this.chart3, price, '#EE6666')
        getHistoryPriceByName(this.pricerow[1]).then(res=>{
          let price = res.data.slice(-200);
          this.chart2 = echarts5.init(document.getElementById('chart-second'))
          this.chart4 = echarts5.init(document.getElementById('chart-fourth'))
          this.smothprice2 = this.drawFirstChart(this.chart2, price, '#5470C6')
          this.drawSecondChart(this.chart4, price, '#5470C6')
          this.chart5 = echarts5.init(document.getElementById('chart-center'))
          const date = price.map(function (item) {
            return item['date'];
          });
          this.drawCentorChart(this.chart5, this.smothprice1, this.smothprice2, date, this.pricerow[0], this.pricerow[1], this.pricerow[2])
        })
      })

    },

    smothTrend(price){
      let sum = 0.0
      for(let i = 0; i<price.length; i++){
        sum += price[i];
      }
      let mean = sum / price.length;
      sum = 0;
      for(let i = 0; i<price.length; i++){
        sum += Math.pow(price[i] - mean , 2);
      }
      let pvar = Math.sqrt( sum / price.length);
      for(let i = 0; i<price.length; i++){
        price[i] = (price[i] - mean)/pvar
      }
      let sp = price.slice(0);
      for(let i = 3; i<price.length-3; i++){
       sp[i] = (price[i-2]+price[i-1]+price[i]+price[i+1]+price[i+2])/5
      }
      return sp;

    },

    drawFirstChart(chart, data, color)
    {
      const dateList = data.map(function (item) {
        return item['date'];
      });
      let valueList =  data.map(function (item) {
        return item['price'];
      });
      valueList = this.smothTrend(valueList)

      let option = {
        xAxis: {
          data: dateList,
          axisLine: {
            onZero: false,
            lineStyle: {
              color: color
            }
          }
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        lineStyle: {
          color: color
        },
        series: [
          {
            data: valueList,
            type: 'line',
            smooth: true,
            symbol: 'none'
          }
        ]
      };
      chart.setOption(option);
      return valueList;
    },

    drawSecondChart(chart, data, color)
    {
      const dateList = data.map(function (item) {
        return item['date'];
      });
      let valueList =  data.map(function (item) {
        return item['price'];
      });
      let option = {
        xAxis: {
          data: dateList,
          axisLine: {
            onZero: false,
            lineStyle: {
              color: color
            }
          }
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        lineStyle: {
          color: color
        },
        series: [
          {
            data: valueList,
            type: 'line',
            smooth: true,
            emphasis: {
              focus: 'series'
            },
            symbol: 'none'
          }
        ]
      };
      chart.setOption(option);
    },
    drawCentorChart(chart, seriesX, seriesY, date, nameX, nameY, time)
    {
      // const colors = ['#5470C6', '#EE6666'];
      let dateX = date
      let dateY = date
      console.log(time)
      if (time > 0)
      {
        dateX = dateX.slice(0, -time)
        seriesX = seriesX.slice(0, -time)
        dateY = dateY.slice(time)
        seriesY = seriesY.slice(time)
      }
      else if(time < 0)
      {
        dateX = dateX.slice(-time)
        seriesX = seriesX.slice(-time)
        dateY = dateY.slice(0, time)
        seriesY = seriesY.slice(0, time)
      }
      console.log(dateX)
      console.log(dateY)

      let option = {
        color: ['#EE6666','#5470C6'],
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {},
        grid: {
          top: 80,
          bottom: 50
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#5470C6'
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                      nameY+
                      params.value +
                      (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                }
              }

            },
            // prettier-ignore
            data: dateY
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#EE6666'
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                      nameX +
                      params.value +
                      (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                }
              }
            },
            // prettier-ignore
            data: dateX
          }

        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: nameX,
            type: 'line',
            smooth: true,
            symbol: 'none',
            emphasis: {
              focus: 'series'
            },
            data: seriesX
          },
          {
            name: nameY,
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            symbol: 'none',
            emphasis: {
              focus: 'series'
            },
            data: seriesY
          }

        ]
      };
      chart.setOption(option);
    },

    goBack() {
      history.back();
    },
  }
}
</script>

<style scoped>

</style>