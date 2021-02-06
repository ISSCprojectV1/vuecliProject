<template>
  <div style="width: 100%; height: 500px">
    <div id="chart-risk-prediction" style="width: 100%; height: 480px"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {riskAlarmService} from "@/api/part1/acpassTask";

export default {
  name: "lineGraphNew",
  data() {
    return {
      options: [],
      formRisk: [],
    }
  },
  mounted() {
    riskAlarmService().then(res => {
      this.formRisk = res.data.map(item => {
        return {
          id: item.id,
          day: item.day.split('T')[0],
          code: item.code,
          closeprice: item.closeprice,
          risk: item.risk
        }
      })
      this.drawChartRiskPrediction()
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    drawChartRiskPrediction() {
      console.log(this.formRisk)
      let chart = echarts.init(document.getElementById('chart-risk-prediction'))
      let pieces = []
      for (let i = 0; i < this.formRisk.length;) {
        let j = i + 1;
        if (this.formRisk[i].risk <= 0.333) {
          while (j < this.formRisk.length)
            if (this.formRisk[j].risk <= 0.333)
              j++
            else
              break;
          pieces.push({gte: i, lt: j, color: 'green'})
        } else if (this.formRisk[i].risk <= 0.666) {
          while (j < this.formRisk.length)
            if (this.formRisk[j].risk <= 0.666 && this.formRisk[j].risk > 0.333)
              j++
            else
              break;
          pieces.push({gte: i, lt: j, color: 'yellow'})
        } else {
          while (j < this.formRisk.length)
            if (this.formRisk[j].risk > 0.666)
              j++
            else
              break;
          pieces.push({gte: i, lt: j, color: 'red'})
        }
        i = j
      }

      let options = {
        title: {
          text: '小麦价格波动风险演化图',
          left: 0
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {},
        grid: {
          // y: '5%',
          // y2: '12%'
        },
        dataZoom: [{
          startValue: '2018-02-01',
          minSpan: 1,
          bottom: 0
        }, {
          type: 'inside'
        }],
        visualMap: {
          dimension: 0,
          pieces: pieces,
          outOfRange: {
            color: 'grey'
          },
          show: false
        },
        xAxis: {
          data: this.formRisk.map(item => {
            return item.day
          })
        },
        yAxis: {
          scale: true
        },
        series: [
          {
            type: 'line',
            symbol: 'circle',
            smooth: true,
            data: this.formRisk.map(item => {
              return item.closeprice
            })
          }
        ]
      };

      console.log(this.formRisk)
      chart.setOption(options);
    },
  }
}
</script>

<style scoped>

</style>