<template>
<div class="bar-chart" >
<div id="barChart" :style="{width: '100%', height: '380px'}"></div>
</div>
</template>>
<script>
import echarts from 'echarts'
export default {
    name: 'bar_chart',
  data () {
    return {
      msg: 'welcome to barChart'
    }
     },
     mounted(){
    this.drawLine();
     },
     methods: {
         drawLine(){
          var myChart = echarts.init(document.getElementById('barChart'));

          var option = {
    title: [{
        text: '最近一周大宗商品交易量情况统计'
               },
               
               ],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
           }
          },
    legend: [{
        title:"原料",
        data: ['煤炭', '原油', '天然气'],
        left: 370
    },
    {
        data: ['木材', '化肥', '其他（棉花等）'],
        left: 670
    },
    {
        data: ['基本金属', '贵金属'],
        left: 970
    },
    ],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['06/15', '06/16', '06/17', '06/18', '06/19', '06/20', '06/21']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '煤炭',
            type: 'bar',
            stack: '能源',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '原油',
            type: 'bar',
            stack: '能源',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '天然气',
            type: 'bar',
            stack: '能源',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '木材',
            type: 'bar',
            stack: '原料',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
        },
        {
            name: '化肥',
            type: 'bar',
            stack: '原料',
            data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
            name: '其他（棉花等）',
            type: 'bar',
            stack: '原料',
            data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
            name: '基本金属',
            type: 'bar',
            stack: '金属',
            data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
            name: '贵金属',
            type: 'bar',
            stack: '金属',
            data: [62, 82, 91, 84, 109, 110, 120]
        }
    ]
};
      myChart.setOption(option);

         }
     }
}
</script>>