<template>
    <div style="width: 100%;height: 800px">
        <div class="block" style="height:80px;text-align:left">
            <span class="demonstration">选择你需要监控的时间范围：   </span>
            <el-date-picker
                    v-model="value2"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="center">
            </el-date-picker>
            <i class="el-icon-right"></i>
            <el-button class="btn1" type="primary" round>提交</el-button>
        </div>
        <div id="app">
            <!--创建一个echarts的容器-->
            <div id="echartContainer" style="width:900px; height:400px"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Time_granularity",
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
                        text:'需在限定时间内响应的任务数',
                        x : 'center',	//位置默认居中
                        y : 'top',	//
                     },
                    tooltip: {},//提示
                    xAxis: {
                        data: ["3分钟内","30分钟内","1小时内","3小时内","1天内","3天内",]
                    },
                    yAxis: {},
                    series: [{
                        name: '任务数量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
        },
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value2: ''
            };
        }

    }


</script>

<style scoped>
    @import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
    .red{
        color: #000000;
        text-align:center;
        style:"width: 100%; height:100%"
    }
    .btn1{
        margin-right:100px;
        text-align:right;
        style:"width: 100%; height:100%"
    }
</style>
