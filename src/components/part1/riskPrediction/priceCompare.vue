<template>
<div>
  <el-row></el-row>
  <h2>{{this.pricerow[0]+"价格波动行情走势"}}</h2>
  <el-row>
    <div id="chart-first"
         style="width: 93%; height: 480px; margin-left: auto; margin-right: auto; float: left;display:inline-block;">
    </div>
  </el-row>
  <h2>{{this.pricerow[1]+"价格波动行情走势"}}</h2>
  <el-row>
    <div id="chart-second"
         style="width: 93%; height: 480px; margin-left: auto; margin-right: auto; float: left;display:inline-block;">
    </div>
  </el-row>
  <el-row>
    <el-button type="primary" @click="goBack" style="margin-top: 2rem">返回</el-button>
  </el-row>


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
      pricerow:[],
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
        let price = res.data;
        this.chart1 = echarts5.init(document.getElementById('chart-first'))
        this.drawFirstChart(this.chart1, price)
      })
      getHistoryPriceByName(this.pricerow[1]).then(res=>{
        let price = res.data;
        this.chart2 = echarts5.init(document.getElementById('chart-second'))
        this.drawFirstChart(this.chart2, price)
      })

    },

    drawFirstChart(chart, data)
    {
      const dateList = data.map(function (item) {
        return item['date'];
      });
      const valueList =  data.map(function (item) {
        return item['price'];
      });
      let option = {
        xAxis: {
          data: dateList
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: [
          {
            data: valueList,
            type: 'line',
            smooth: true
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