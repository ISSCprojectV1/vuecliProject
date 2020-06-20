<template>
   <div style="width: 100%;height: 800px">
       <h2> 可用资源展示 </h2>
       <div id="app">
           <!--创建一个echarts的容器-->
           <div id="echartContainer" style="width:900px; height:400px"></div>
       </div>
   </div>
</template>

<script>
    export default {
        name: "resourceshow",
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('echartContainer'))
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '系统可用资源情况',
                        subtext: '动态刷新',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },//提示
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['模态资源', '时间资源', '空间资源', '硬件资源', '其他资源']
                    },
                    series: [
                        {
                            name: '资源数量',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                {value: 335, name: '模态资源'},
                                {value: 310, name: '时间资源'},
                                {value: 234, name: '空间资源'},
                                {value: 135, name: '硬件资源'},
                                {value: 158, name: '其他资源'}
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            }
        },
    }
</script>

<style scoped>

</style>
