<template>
   <div style="width: 100%;height: 800px">
       <div style="display: inline-block; margin-bottom:30px; font-size:40px">可用资源展示</div>
       <div id="app">
           <!--创建一个echarts的容器-->
           <div id="echartContainer" style="width: 100%;height: 800px"></div>
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

                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },//提示
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['模态资源', '时间资源', '空间资源', '硬件资源']
                    },
                    series: [
                        {
                            name: '模态资源',
                            type: 'pie',
                            radius: '25%',
                            center: ['30%', '30%'],
                            data: [
                                {value: 120, name: '人工资源'},
                                {value: 180, name: '机器资源'},
                                {value: 200, name: '在线资源'},
                                {value: 100, name: '离线资源'},
                                {value: 150, name: '主动资源'},
                                {value: 150, name: '被动资源'}
                            ]
                        },
                        {
                            name: '时间资源',
                            type: 'pie',
                            radius: '25%',
                            center: ['70%', '30%'],
                            data: [
                                {value: 335, name: '3分钟粒度'},
                                {value: 310, name: '30分钟粒度'},
                                {value: 234, name: '3小时粒度'},
                                {value: 135, name: '1天粒度'},
                                {value: 158, name: '3天粒度'}
                            ]
                        },
                        {
                            name: '空间资源',
                            type: 'pie',
                            radius: '25%',
                            center: ['30%', '70%'],
                            data: [
                                {value: 335, name: '县级可控'},
                                {value: 310, name: '市级可控'},
                                {value: 234, name: '省级可控'},
                            ]
                        },
                        {
                            name: '硬件资源',
                            type: 'pie',
                            radius: '25%',
                            center: ['70%', '70%'],
                            data: [
                                {value: 335, name: '计算资源'},
                                {value: 310, name: '存储资源'},
                                {value: 234, name: '其他资源'},
                            ]
                        }
                    ]
                });
            }
        },
    }
</script>

<style scoped>
    .title {
        height: 80px;
        background: #fff;
        font-size: 32px;
        color: #333;
        line-height: 80px;
        border-bottom: 1px solid #333;
    }

</style>
