<template>
  <div>
    <div class="form">
      <el-form ref="form" label-width="130px" :model="form">
        <el-form-item label="交易机构名称" style="margin-left: 300px">
          <el-col :span="13">
            <el-select
              v-model="form.nameValue"
              multiple
              filterable
              placeholder="请选择"
              class="select-box"
              style="width: 100%"
              @change="handleNameChange"
            >
              <el-option
                v-for="item in form.nameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="text" @click="handleNameSelectAll">全选</el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="交易账户id" style="margin-left: 300px">
          <el-col :span="13">
            <el-select
              v-model="form.accountValue"
              multiple
              filterable
              placeholder="请选择"
              class="select-box"
              style="width: 100%"
            >
              <el-option
                v-for="item in form.accountOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="text" @click="handleAccountSelectAll"
              >全选</el-button
            >
          </el-col>
        </el-form-item>

        <el-form-item label="商品种类" style="margin-left: 300px">
          <el-col :span="13">
            <el-select
              v-model="form.goodValue"
              multiple
              filterable
              placeholder="请选择"
              class="select-box"
              style="width: 100%"
            >
              <el-option
                v-for="item in form.goodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="text" @click="handleGoodSelectAll">全选</el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="活动时间" style="margin-left: 300px">
          <el-col :span="6">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="6">
            <el-date-picker
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="accountTable">
      <el-col style="margin-right: 10px">
        <p class="title"><b>异常交易用户</b></p>
        <el-table
          ref="dormitoryTable"
          :data="
            accountTable.dormitory.slice(
              (accountTable.currentPage - 1) * accountTable.PageSize,
              accountTable.currentPage * accountTable.PageSize
            )
          "
          tooltip-effect="dark"
          stripe
          style="width: 100%"
          :header-cell-style="headcell"
          border
          v-loading="accountTable.loading"
          element-loading-text="加载中"
        >
          <el-table-column prop="id" label="账户id"></el-table-column>
          <el-table-column prop="name" label="账户姓名"> </el-table-column>
          <el-table-column prop="productId" label="商品种类"></el-table-column>
          <el-table-column prop="level" label="风险等级"></el-table-column>
          <el-table-column label="查看关联内幕人员" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleRelationButtonClick(scope.$index, scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="查看异常交易行为" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleTradingButtonClick(scope.$index, scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleAccountTableSizeChange"
          @current-change="handleAccountTableCurrentChange"
          :current-page="accountTable.currentPage"
          :page-sizes="accountTable.pageSizes"
          :page-size="accountTable.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="accountTable.totalCount"
          style="margin-top: 0.5rem"
        >
        </el-pagination>
      </el-col>
    </div>
    <el-dialog :title="dialog.name" :visible.sync="dialog.visible">
      <trading-dialog :traderId="traderId"></trading-dialog>
    </el-dialog>
  </div>
</template>

<script>
import echarts from "echarts";
import {
  getDetectionOptions,
  getAnomolyList,
  getInstitutes,
  getGoodsByInstitutes,
  getTradersByInstitutes,
  tradingDetection,
} from "@/api/part4/tradingDetection";
import tradingDialog from "./tradingDialog.vue";

export default {
  components: { tradingDialog },
  name: "tradingDetection",
  data() {
    return {
      form: {
        nameOptions: [],
        nameValue: [],
        accountOptions: [],
        accountValue: [],
        goodOptions: [],
        goodValue: [],
        date1: "",
        date2: "",
      },
      accountTable: {
        dormitory: [],
        // 默认显示第几页
        currentPage: 1,
        // 条数选择器（可修改）
        pageSizes: [5, 10, 15, 20],
        // 默认每页显示的条数（可修改）
        PageSize: 15,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount: 100,
        loading: false,
      },
      traderId: 0,
      dialog: {
        name: "",
        visible: false,
      },
    };
  },
  mounted() {
    getInstitutes().then((response) => {
      let data = response.data;
      for (let i = 0; i < data.length; i++) {
        this.form.nameOptions.push({
          value: data[i].instituteId,
          label: data[i].instituteName,
        });
      }
    });
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
    onSubmit() {
      console.log("submit!");
      this.initAccountTableData();
      this.initTimeSeriesData();
      console.log(this.accountTable);
      console.log(this.indexData);
      let params = {
        institutesId: this.form.nameValue,
        tradersId: this.form.accountValue,
        goodsId: this.form.goodValue,
        startDate: this.form.date1,
        endDate: this.form.date2,
      };
      tradingDetection(params).then((response) => {
        console.log(response);
      });
    },
    handleAccountTableSizeChange(val) {
      // 改变每页显示的条数
      this.accountTable.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.accountTable.currentPage = 1;
    },
    // 显示第几页
    handleAccountTableCurrentChange(val) {
      // 改变默认的页数
      this.accountTable.currentPage = val;
    },
    handleRelationButtonClick(index, row) {
      console.log(index, row);
      this.$router.push({
        path: "/trade/insiderTrading/relationDetection/" + row.id,
      });
    },
    handleTradingButtonClick(index, row) {
      console.log(index);
      console.log(row);
      this.dialog.name =
        "异常交易用户 " + row.id + "-" + row.name + " 的交易行为";
      this.dialog.visible = true;
      this.traderId = row.id;
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
    initAccountTableData() {
      let accountTableData = [];
      let levels = ["风险等级低", "风险等级中", "风险等级高"];
      for (let i = 0; i < 20; i++)
        accountTableData.push({
          id: i,
          name: "用户" + String.fromCharCode(i + 65),
          productId: i + Math.floor(Math.random() * 10),
          level: Math.floor(Math.random() * 3),
        });
      accountTableData.sort((a, b) => {
        return b.level - a.level;
      });
      for (let account of accountTableData) {
        account.level = levels[account.level];
      }
      console.log(accountTableData);
      this.accountTable.dormitory = accountTableData;
    },
    handleNameSelectAll() {
      this.form.nameValue = [];
      for (let option of this.form.nameOptions) {
        this.form.nameValue.push(option.value);
      }
    },
    handleAccountSelectAll() {
      this.form.accountValue = [];
      for (let account of this.form.accountOptions) {
        this.form.accountValue.push(account.value);
      }
    },
    handleGoodSelectAll() {
      this.form.goodValue = [];
      for (let good of this.form.goodOptions) {
        this.form.goodValue.push(good.value);
      }
    },
    handleNameChange() {
      this.form.accountValue = [];
      this.form.goodValue = [];
      console.log("name changed");
      getGoodsByInstitutes(this.form.nameValue).then((response) => {
        this.form.goodOptions = [];
        for (let good of response.data) {
          this.form.goodOptions.push({
            value: good.goodId,
            label: good.goodName,
          });
        }
      });
      getTradersByInstitutes(this.form.nameValue).then((response) => {
        this.form.accountOptions = [];
        for (let account of response.data) {
          this.form.accountOptions.push({
            value: account.traderId,
            label: account.traderName,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// .el-form-item {
//   margin-bottom: 50px;
// }

/deep/ .el-form-item {
  label {
    font-size: 18px;
  }
}

/deep/ .title {
  font-size: 20px;
}
</style>