<template>
    <div>
        <h2>大宗商品价格波动风险演化</h2>

        <el-form :inline="true">
            <el-form-item>
                <!--                <el-cascader-->
                <!--                    v-model="value"-->
                <!--                    :options="options"-->
                <!--                    placeholder="请选择查询商品"-->
                <!--                    style="width: 200px"-->
                <!--                    filterable></el-cascader>-->
                <el-input v-model="value" placeholder="请选择查询商品"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onClickQuery">查询</el-button>
            </el-form-item>
        </el-form>

        <div id="chart-risk-prediction"
             style="width: 1000px; height: 600px; margin-left: auto; margin-right: auto;"></div>

        <el-button type="primary" @click="onClickQueryRelation" style="margin-top: 1rem">查询关联商品</el-button>

        <el-dialog :visible.sync="dialogFormVisible" width="30%" :title="value + '关联商品'" center>
            <el-table :data="formRelation"
                      :default-sort="{prop: 'similarity', order: 'descending'}" stripe>
                <el-table-column
                    prop="name"
                    label="关联商品">
                    <template slot-scope="scope">
                        <a @click="onClickRelatedCommodity(scope.row.name)" style="color: blue; cursor: pointer">{{
                                scope.row.name
                            }}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="similarity"
                    label="相关度" sortable>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import {getcommodityRelationdetails2} from "@/api/part1/Multimodal-multigranularity";
import {riskAlarmService} from "@/api/part1/acpassTask";
import echarts from "echarts";

export default {
    name: "riskPageNew",
    data() {
        return {
            value: '',
            options: [],
            formRisk: [],
            formRelation: [],
            dialogFormVisible: false
        }
    },
    methods: {
        onClickQuery() {
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
        drawChartRiskPrediction() {
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
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    y: '5%',
                    y2: '12%'
                },
                dataZoom: [{
                    startValue: '2018-01-01',
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

            chart.setOption(options);

        },
        onClickQueryRelation() {
            let URL = "/getcommodityRelationdetails/" + this.value;
            getcommodityRelationdetails2(URL).then(res => {
                this.formRelation = res.data.map(item => {
                    return {
                        name: item.name2,
                        similarity: item.similarity
                    }
                })
                this.dialogFormVisible = true;
            }).catch(err => {
                console.log(err)
            })
        },
        onClickRelatedCommodity(name) {
            this.value = name
            this.dialogFormVisible = false
            this.drawChartRiskPrediction()
        }
    }
}
</script>

<style scoped>

</style>