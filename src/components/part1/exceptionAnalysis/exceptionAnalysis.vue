<template>
    <div id="diceng">
        <h2>异常事件分析</h2>

        <el-tabs>
            <el-tab-pane label="时序关系挖掘">
                <el-form :inline="true">
                    <el-form-item label="起止日期：">
                        <el-date-picker
                            name="el-date-picker-test"
                            v-model="dateTimeRange"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="事件频率阈值：">
                        <el-input v-model="threshold_f" placeholder="请输入阈值"></el-input>
                    </el-form-item>
                    <el-form-item label="事件关联概率阈值：">
                        <el-input v-model="threshold_fp" placeholder="请输入阈值"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onClickQuery">查询</el-button>
                        <el-button type="primary" @click="goback">返回</el-button>
                    </el-form-item>
                </el-form>

                <div id="chart-exception-relation"
                     style="width: 1000px; height: 600px; margin-left: auto; margin-right: auto;"></div>
            </el-tab-pane>

            <el-tab-pane label="事件预测">
                <el-form :inline="true">
                    <el-form-item label="源事件编号：">
                        <el-input v-model="formPredict.sourceId" placeholder="请输入源事件编号"></el-input>
                    </el-form-item>
                    <el-form-item label="事件概率阈值：">
                        <el-input v-model="formPredict.thresholdP" placeholder="请输入阈值"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onClickPredict">预测</el-button>
                    </el-form-item>
                </el-form>

                <el-table
                    :data="resultPredict"
                    stripe
                    style="width: 100%">
                    <el-table-column
                        prop="target"
                        label="目标事件">
                    </el-table-column>
                    <el-table-column
                        prop="delay_time"
                        label="发生时延">
                    </el-table-column>
                    <el-table-column
                        prop="probability"
                        label="发生概率">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {exceptionRelationAnalysis, exceptionRelationPredict} from "@/api/part1/acpassTask";
import echarts from "echarts";

export default {
    name: "exceptionAnalysis",
    data() {
        return {
            dateTimeRange: {},
            threshold_f: '',
            threshold_fp: '',
            formPredict: {
                sourceId: '',
                thresholdP: ''
            },
            resultQuery: {
                links: [],
                names: [],
                weights: []
            },
            resultPredict: []
        }
    },
    methods: {
        goback(){
            this.$router.go(-1)
        },
        onClickQuery() {
            exceptionRelationAnalysis(this.dateTimeRangeFormatted[0], this.dateTimeRangeFormatted[1], this.threshold_f, this.threshold_fp).then(res => {
                this.resultQuery.links = res.data.links
                this.resultQuery.names = res.data.names
                this.resultQuery.weights = res.data.weights
                console.log(this.resultQuery.links)
                console.log(this.resultQuery.names)
                console.log(this.resultQuery.weights)
                this.drawChartExceptionRelation()
            }).catch(err => {
                console.log(err)
            })
        },
        drawChartExceptionRelation() {
            let chart = echarts.init(document.getElementById('chart-exception-relation'))
            let data = []
            let categories = [
                {name: '最低频率'},
                {name: '偏低频率'},
                {name: '较低频率'},
                {name: '较高频率'},
                {name: '偏高频率'},
                {name: '最高频率'}
            ]

            // 设置节点
            let weightMax = Math.max(...this.resultQuery.weights)
            let radianUnitInner = Math.PI * 2 / Math.ceil(this.resultQuery.names.length / 2)
            let radianUnitOuter = Math.PI * 2 / Math.floor(this.resultQuery.names.length / 2)
            for (let i in this.resultQuery.names) {
                if (Object.prototype.hasOwnProperty.call(this.resultQuery.names, i)) {
                    let randomNum = this.getRandomInt(7)
                    if (i % 2 === 0) { // outer circle
                        data.push({
                            name: this.resultQuery.names[i].toString(),
                            x: 500 + 300 * Math.cos(radianUnitInner * (i / 2)) + 30 * randomNum * Math.pow(-1, randomNum),
                            y: 300 + 300 * Math.sin(radianUnitInner * (i / 2)) + 30 * randomNum * Math.pow(-1, randomNum),
                            symbolSize: 30 + this.resultQuery.weights[i] * 3,
                            category: Math.round(this.resultQuery.weights[i] / weightMax * 5)
                            // itemStyle: {
                            //     color: arrColor[Math.round(this.resultQuery.weights[i] / weightMax * 5)]
                            // }
                        })
                    } else { // inner circle
                        data.push({
                            name: this.resultQuery.names[i].toString(),
                            x: 500 + 150 * Math.cos(radianUnitOuter * (i - 1) / 2 + Math.PI / 6) + 15 * randomNum * Math.pow(-1, randomNum),
                            y: 300 + 150 * Math.sin(radianUnitOuter * (i - 1) / 2 + Math.PI / 6) + 15 * randomNum * Math.pow(-1, randomNum),
                            symbolSize: 30 + this.resultQuery.weights[i] * 3,
                            category: Math.round(this.resultQuery.weights[i] / weightMax * 5)
                            // itemStyle: {
                            //     color: arrColor[Math.round(this.resultQuery.weights[i] / weightMax * 5)]
                            // }
                        })
                    }
                    // circle and center
                    // if (i === '0') {
                    //   data.push({
                    //     name: '1',
                    //     x: 500,
                    //     y: 300
                    //   })
                    //   continue
                    // }
                }
            }

            // 设置边
            let links = []
            for (let i in this.resultQuery.links)
                if (Object.prototype.hasOwnProperty.call(this.resultQuery.links, i)) {
                    links.push({
                        probability: this.resultQuery.links[i].probability.toString(),
                        source: this.resultQuery.links[i].source.toString(),
                        target: this.resultQuery.links[i].target.toString(),
                        delay_time: this.resultQuery.links[i].delay_time.toString(),
                        frequence: this.resultQuery.links[i].frequence.toString(),
                        lineStyle: {
                            width: parseFloat(this.resultQuery.links[i].probability) * 3 + 0.5
                        }
                    })
                }

            let option = {
                // color: ['#f4d6d5', '#eaacaa', '#df8280', '#d55855', '#c43431', '#992926'],
                color: ['#95b0c4', '#8ed1eb', '#b0dfa5', '#ffd135', '#f7931e', '#f05a28'],
                legend: {
                    tooltip: {
                        show: true
                    }
                },
                tooltip: {
                    show: true,
                    formatter: function (x) {
                        if (x.data.source)
                            return 'source: ' + x.data.source
                                + ', target: ' + x.data.target
                                + ', prob: ' + x.data.probability
                                + ', delay: ' + x.data.delay_time
                                + ', frequence: ' + x.data.frequence
                        else
                            return 'event ' + x.data.name
                    }
                },
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        type: 'graph',
                        layout: 'none',
                        symbolSize: 30,
                        roam: true,
                        focusNodeAdjacency: true,
                        label: {
                            show: true
                        },
                        edgeSymbol: ['none', 'arrow'],
                        edgeSymbolSize: [0, 8],
                        edgeLabel: {
                            show: true,
                            formatter: function (x) {
                                return x.data.probability;
                            },
                            fontSize: 12,
                            color: '#000000'
                        },
                        data: data,
                        links: links,
                        categories: categories,
                        lineStyle: {
                            opacity: 0.9,
                            curveness: 0.2
                        }
                    }
                ]
            };

            chart.setOption(option);
        },
        onClickPredict() {
            exceptionRelationPredict(this.formPredict.sourceId, this.formPredict.thresholdP).then(res => {
                this.resultPredict = res.data
                console.log(this.resultPredict)
            }).catch(err => {
                console.log(err)
            })
        },
        addZero(field) {
            return field < 10 ? '0' + field : field
        },
        getRandomInt(max) { // return random Integer in [0, max)
            return Math.floor(Math.random() * Math.floor(max));
        }
    },
    computed: {
        dateTimeRangeFormatted: function () {
            if (!this.dateTimeRange)
                return ''
            let result = []
            for (let i = 0; i < 2; i++) {
                let year = this.dateTimeRange[i].getUTCFullYear()
                let month = this.addZero(this.dateTimeRange[i].getUTCMonth() + 1)
                let day = this.addZero(this.dateTimeRange[i].getUTCDate())
                let hour = this.addZero(this.dateTimeRange[i].getUTCHours())
                let minute = this.addZero(this.dateTimeRange[i].getUTCMinutes())
                let second = this.addZero(this.dateTimeRange[i].getUTCSeconds())
                result.push(year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second)
            }
            return result
        }
    }
}
</script>

<style scoped>

</style>