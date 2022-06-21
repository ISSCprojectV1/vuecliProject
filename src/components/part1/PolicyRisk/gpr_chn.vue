<template>
  <div id="app">
    <el-row>
      <div
        id="chart-risk-prediction"
        style="
          width: 93%;
          height: 480px;
          margin-left: auto;
          margin-right: auto;
          float: left;
        "
      ></div>
    </el-row>
    <el-row :gutter="50">
      <el-col :span="8">
        <h2>能源板块</h2>
        <el-table
          :data="data1"
          highlight-current-row
          :header-cell-style="getHeaderStylesheet"
        >
          <el-table-column
            label="商品"
            prop="commodity"
            min-width="20"
            align="center"
          ></el-table-column>
          <el-table-column
            label="系统性风险预警等级"
            prop="risk"
            min-width="20"
            align="center"
          >
          <template slot-scope="scope">
                  <span v-if="scope.row.risk === '高'" style="color: red">{{ scope.row.risk }}</span>
                  <span v-else-if="scope.row.risk === '中'" style="color: orange">{{ scope.row.risk }}</span>
                  <span v-else-if="scope.row.risk === '低'" style="color: #00DB00">{{ scope.row.risk }}</span>
                </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8">
        <h2>农产品板块</h2>
        <el-table
          :data="data2"
          highlight-current-row
          :header-cell-style="getHeaderStylesheet"
        >
          <el-table-column
            label="商品"
            prop="commodity"
            min-width="20"
            align="center"
          ></el-table-column>
          <el-table-column
            label="系统性风险预警等级"
            prop="risk"
            min-width="20"
            align="center"
          >
          <template slot-scope="scope">
                  <span v-if="scope.row.risk === '高'" style="color: red">{{ scope.row.risk }}</span>
                  <span v-else-if="scope.row.risk === '中'" style="color: orange">{{ scope.row.risk }}</span>
                  <span v-else-if="scope.row.risk === '低'" style="color: #00DB00">{{ scope.row.risk }}</span>
                </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8">
        <h2>金属板块</h2>
        <el-table
          :data="data3"
          highlight-current-row
          :header-cell-style="getHeaderStylesheet"
        >
          <el-table-column
            label="商品"
            prop="commodity"
            min-width="20"
            align="center"
          ></el-table-column>
          <el-table-column
            label="系统性风险预警等级"
            prop="risk"
            min-width="20"
            align="center"
          >
          <template slot-scope="scope">
                  <span v-if="scope.row.risk === '高'" style="color: red">{{ scope.row.risk }}</span>
                  <span v-else-if="scope.row.risk === '中'" style="color: orange">{{ scope.row.risk }}</span>
                  <span v-else-if="scope.row.risk === '低'" style="color: #00DB00">{{ scope.row.risk }}</span>
                </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts5 from "echarts5";
import { getGprChn } from "@/api/part1/policyRisk";
export default {
  name: "lineGraph",
  data() {
    return {
      options: [],
      formRisk: [],
      data1:[{
        commodity: "原油",
        risk: "高"
      },{
        commodity: "热媒油",
        risk: "高"
      },{
        commodity: "天然气",
        risk: "中"
      },{
        commodity: "无铅油",
        risk: "低"
      }],
      data2:[{
        commodity: "小麦",
        risk: "中"
      },{
        commodity: "可可",
        risk: "中"
      },{
        commodity: "瘦猪肉",
        risk: "低"
      },{
        commodity: "活牛",
        risk: "低"
      },{
        commodity: "橙汁",
        risk: "低"
      }],
      data3:[{
        commodity: "铝",
        risk: "高"
      },{
        commodity: "银",
        risk: "中"
      },{
        commodity: "镍",
        risk: "低"
      }],
    };
  },
  mounted() {
    getGprChn()
      .then((res) => {
        this.formRisk = res.data.data.map((item) => {
          return {
            day: item.data.split("T")[0],
            gpr: item.gpr,
          };
        });
        this.drawChartRiskPrediction();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // 画图
    drawChartRiskPrediction() {
      let chart = echarts5.init(
        document.getElementById("chart-risk-prediction")
      );
      let pieces = [];
      for (let i = 0; i < this.formRisk.length; ) {
        let j = i + 1;
        if (this.formRisk[i].gpr <= 0.5) {
          while (j < this.formRisk.length)
            if (this.formRisk[j].gpr <= 0.5) j++;
            else break;
          pieces.push({ gte: i, lt: j, color: "green" });
        } else if (this.formRisk[i].gpr <= 2) {
          while (j < this.formRisk.length)
            if (this.formRisk[j].gpr <= 1 && this.formRisk[j].gpr > 0.5) j++;
            else break;
          pieces.push({ gte: i, lt: j, color: "orange" });
        } else {
          while (j < this.formRisk.length)
            if (this.formRisk[j].gpr > 2) j++;
            else break;
          pieces.push({ gte: i, lt: j, color: "red" });
        }
        i = j;
      }

      let options = {
        title: {
          text: "中国地缘政治风险指数",
          left: "center",
          top: 20,
          textStyle: {
            fontSize: 22,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        dataZoom: [
          {
            type: "slider",
            start: 95,
            minSpan: 1,
          },
          {
            type: "inside",
          },
        ],
        visualMap: {
          dimension: 0,
          pieces: pieces,
          outOfRange: {
            color: "grey",
          },
          show: false,
        },
        xAxis: {
          data: this.formRisk.map((item) => {
            return item.day;
          }),
        },
        yAxis: {
          scale: true,
        },
        series: [
          {
            type: "line",
            symbol: "circle",
            smooth: true,
            data: this.formRisk.map((item) => {
              return item.gpr;
            }),
          },
        ],
      };

      chart.setOption(options);
    },
  },
};
</script>

<style scoped>
</style>