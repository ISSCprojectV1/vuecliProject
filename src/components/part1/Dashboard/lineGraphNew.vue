<template>
  <div style="width: 100%; height: 550px">
    <div id="chart-risk-prediction" style="width: 93%; height: 480px; margin-left: auto; margin-right: auto; float: left"></div>
    <div style="margin-left: auto; margin-right: auto; padding-top: 10px">
      <p style="text-align: center; width: 50px; float: left; font-size: 14px">高风险</p>
      <canvas id="legend" width="50" height="380" style="float: left; margin-left: auto; margin-right: auto;"></canvas>
      <p style="text-align: center; width: 50px; float: left; font-size: 14px">低风险</p>
    </div>
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
        <el-button type="primary" @click="onClickQueryRelation" style="margin-top: 1rem">查询关联商品</el-button>
      </el-form-item>
      <el-form-item>
        <el-dialog :visible.sync="dialogFormVisible" width="30%" :title="value + '关联商品'" center>
          <el-table :data="formRelation" stripe>
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
                    label="相关度">
            </el-table-column>
          </el-table>
        </el-dialog>

      </el-form-item>
    </el-form>





  </div>
</template>

<script>
import echarts from 'echarts'
import {riskAlarmService} from "@/api/part1/acpassTask";

import {getcommodityRelationdetails2} from "@/api/part1/Multimodal-multigranularity";
export default {
  name: "lineGraphNew",
  data() {
    return {
      options: [],
      formRisk: [],
      value: '',
      options2: [],
      formRisk2: [],
      formRelation: [],
      dialogFormVisible: false
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
      this.drawLegend()
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
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

      chart.setOption(options);
    },
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
  ,
    drawLegend() {
      let legend = document.getElementById("legend");
      let context = legend.getContext("2d");
      // 创建渐变对象：线性渐变
      let grd = context.createLinearGradient(0, 0, 0, 400);
      // 设置渐变颜色及方式
      grd.addColorStop(0, "red");
      grd.addColorStop(0.3, "orange");
      grd.addColorStop(0.6, "yellow");
      grd.addColorStop(1, "green");
      // 将填充样式设置为渐变对象
      context.fillStyle = grd;
      context.fillRect(5, 0, 40, 400);
    }
  }
}
</script>

<style scoped>

</style>