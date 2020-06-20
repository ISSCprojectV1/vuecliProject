<template>
     <div id="index" class = "line-chart">
        <div id="main" style="width: 100%;height: 380px;"></div>
    </div>
</template>
<script>
 //   import axios from "axios";
    import echarts from 'echarts'
    
    export default {
        name: "app",
        data() {
            return {
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.drawLine('main');
            },
            
            drawLine(id){
            this.charts = echarts.init(document.getElementById(id))
            
            this.charts.setOption({
            title: {
               text: '最近一周数据变化情况'
               },
            tooltip: {
               trigger: 'axis'
             },
            legend: {
               data: ['访问人数', '平台数量', '危险平台', '任务总数']
             },
            grid: {
               left: '3%',
               right: '4%',
               bottom: '3%',
               containLabel: true
             },
            toolbox: {
               feature: {
               saveAsImage: {}
             }
             },
            xAxis: {
               type: 'category',
               boundaryGap: false,
               data: ['06/15', '06/16', '06/17', '06/18', '06/19', '06/20', '06/21']
             },
           yAxis: {
               type: 'value'
             },
           series: [
        {
            name: '访问人数',
            type: 'line',
            stack: '总量',
            data: [1201, 1321, 1011, 1342, 904, 1230, 1210]
        },
        {
            name: '平台数量',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '危险平台',
            type: 'line',
            stack: '总量',
            data: [6, 7, 9, 11, 12, 12, 15]
        },
        {
            name: '任务总数',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
    ]
            })

            }
        }
    }
</script>

<style>
.line-chart{
  width: 100%;
  height: 380px;
}
</style>