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
      <el-table-column prop="date" label="交易时间"></el-table-column>
      <el-table-column prop="type" label="交易操作"></el-table-column>
      <el-table-column prop="price" label="成交价格"></el-table-column>
      <el-table-column prop="quantity" label="成交数量"></el-table-column>
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
      <el-radio-button v-for="(r, i) in detectionResults[index].indexLists" :key="r.name" :label="i"> 指标{{i + 1}} </el-radio-button>
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
  props: ["detectionResults", "index"],
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
  watch: {
    // when click another row
    index: function () {
      this.updateDialogData();
    },
    detectionResults: function() {
      this.updateDialogData();
    }
  },
  mounted() {
    this.updateDialogData();
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
      console.log(timeSeries.range)
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
              data: timeSeries.range
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
      let indexes = this.detectionResults[this.index].indexLists;
      console.log(indexes)
      for (const index of indexes) {
        let seriesData = [];
        for (const data of index.indexList) {
          let date = data.date;
          let value = data.value.toFixed(2);
          seriesData.push([date, value]);
        }
        let rangeData = [];
        for (const range of index.rangeList) {
          rangeData.push([{xAxis: range.startDate},{xAxis: range.endDate}]);
        }
        this.indexData.push({
          data: seriesData,
          range: rangeData,
          name: index.name
        })
      }
    },
    initTradeTableData() {
      let tradeTableData = [];
      let tradeList = this.detectionResults[this.index].transactionRecordList;
      for (const record of tradeList) {
        tradeTableData.push({
          id: record.transactionId,
          type: record.transactionType > 0 ? "买入" : "卖出",
          date: record.transactionDate.substring(0, 10),
          price: record.transactionPrice,
          quantity: record.transactionVolume,
        });
      }
      this.tradeTable.dormitory = tradeTableData;
    },
    strToMills(str) {
      let [y, m, d] = str.split("-");
      return new Date(y, m - 1, d).getTime();
    },
    updateDialogData() {
      this.initTradeTableData();
      this.initTimeSeriesData();
      this.timeSeriesInit(this.indexData[this.radio]);
    }
  },
};
</script>

<style>
</style>