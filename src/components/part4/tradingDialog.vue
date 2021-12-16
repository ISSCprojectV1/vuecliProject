<template>
  <div class="tradeTable">
    <el-table
      ref="tradeTable"
      :data="
        tradeTable.dormitory.slice(
          (tradeTable.currentPage - 1) * tradeTable.PageSize,
          tradeTable.currentPage * tradeTable.PageSize
        )
      "
      tooltip-effect="dark"
      stripe
      style="width: 100%"
      :header-cell-style="headcell"
      border
      v-loading="tradeTable.loading"
      element-loading-text="加载中"
    >
      <el-table-column prop="id" label="交易id"></el-table-column>
      <el-table-column prop="type" label="交易操作"></el-table-column>
      <el-table-column prop="price" label="成交价格"></el-table-column>
      <el-table-column prop="quantity" label="交易数量"></el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleTradeTableSizeChange"
      @current-change="handleTradeTableCurrentChange"
      :current-page="tradeTable.currentPage"
      :page-sizes="tradeTable.pageSizes"
      :page-size="tradeTable.PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tradeTable.totalCount"
      style="margin-top: 0.5rem"
    >
    </el-pagination>
    <div style="margin: 10px">
      <el-radio-group v-model.number="radio" @change="handleRadioChange">
        <el-radio-button label="0">指标1</el-radio-button>
        <el-radio-button label="1">指标2</el-radio-button>
        <el-radio-button label="2">指标3</el-radio-button>
      </el-radio-group>
    </div>
    <el-row justify="center">
      <div
        id="container"
        style="width: 950px; height: 500px; margin: 5px"
        ref="chart"
      ></div>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "trading-dialog",
  props: ["traderId", "startDate", "endDate"],
  data() {
    return {
      tradeTable: {
        dormitory: [],
        currentPage: 1,
        pageSizes: [5, 10, 20, 50],
        // 默认每页显示的条数（可修改）
        PageSize: 5,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount: 100,
        loading: false,
      },
      radio: 0,
      indexData: [],
    };
  },
  mounted() {
    this.initTradeTableData();
    this.initTimeSeriesData();
    this.timeSeriesInit(this.indexData[this.radio]);
  },
  methods: {
    headcell() {
      return {
        "background-color": "#dfdfdf",
        color: "rgb(96, 97, 98)",
        "font-weight": "bold",
        "font-size": "18px",
      };
    },
    handleTradeTableSizeChange(val) {
      this.tradeTable.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.tradeTable.currentPage = 1;
    },
    handleTradeTableCurrentChange(val) {
      this.tradeTable.currentPage = val;
    },
    handleRadioChange() {
      console.log(this.radio);
      this.timeSeriesInit(this.indexData[this.radio]);
    },
    timeSeriesInit(timeSeries) {
      console.log(timeSeries);
      let dom = this.$refs.chart;
      let myChart = echarts.init(dom);
      let option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        legend: {
          type: "plain",
          data: [timeSeries.name],
          right: "20%",
        },
        title: {
          left: "center",
          text: "交易行为指标变化图",
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "time",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
          },
        ],
        series: [
          {
            name: timeSeries.name,
            type: "line",
            symbol: "none",
            itemStyle: {
              color: "#0099FF",
            },
            data: timeSeries.data,
            markArea: {
              itemStyle: {
                color: "rgba(255, 173, 177, 0.4)",
              },
              label: {
                color: "#000000",
              },
              data: [
                [
                  {
                    name: "异常交易区间",
                    xAxis: timeSeries.start, // base - oneDay * 50,
                  },
                  {
                    xAxis: timeSeries.end, // base - oneDay * 20,
                  },
                ],
              ],
            },
          },
        ],
      };

      if (option && typeof option === "object") {
        myChart.setOption(option);
      }
    },
    initTimeSeriesData() {
      this.indexData = [];
      console.log(this.startDate, typeof this.startDate);
      console.log(this.endDate, typeof this.endDate);
      for (let i = 0; i < 3; i++) {
        let base = +new Date(2021, 9, 3);
        let oneDay = 24 * 3600 * 1000;
        let seriesData = [[base, 100 + Math.random() * 100]];
        let s = Math.floor(Math.random() * 100) + 10;
        for (let i = 1; i < 200; i++) {
          let now = new Date((base += oneDay));
          let sgn = -0.5;
          if (seriesData[i - 1][1] < 50 + Math.random() * 100) sgn = 0.5;
          seriesData.push([
            +now,
            Math.round((Math.random() + sgn) * 10 + seriesData[i - 1][1]),
          ]);
        }
        this.indexData.push({
          data: seriesData,
          start: new Date(2021, 9, 3).getTime() + oneDay * s,
          end: new Date(2021, 9, 3).getTime() + oneDay * (s + 20),
          name: "指标" + (i + 1),
        });
      }
    },
    initTradeTableData() {
      let tradeTableData = [];
      for (let i = 0; i < 10; i++)
        tradeTableData.push({
          id: i,
          type: Math.random() < 0.5 ? "买入" : "卖出",
          price: Math.floor(Math.random() * 20),
          quantity: Math.floor(Math.random() * 200),
        });
      this.tradeTable.dormitory = tradeTableData;
    },
  },
};
</script>

<style>
</style>