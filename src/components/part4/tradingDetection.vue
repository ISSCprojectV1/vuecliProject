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
        </el-form-item>

        <el-form-item label="商品id" style="margin-left: 300px">
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
      <el-col :span="10" style="margin-right: 10px">
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
          @row-click="handleRowClick"
        >
          <el-table-column prop="id" label="账户id"></el-table-column>
          <el-table-column prop="name" label="账户姓名"> </el-table-column>
          <el-table-column prop="productId" label="账户id"></el-table-column>
          <el-table-column prop="level" label="风险等价"></el-table-column>
          <el-table-column label="查看关联内幕人员" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleButtonClick(scope.$index, scope.row)"
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
    <div class="tradeTable">
      <el-col :span="10">
        <p class="title"><b>异常交易行为</b></p>
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
          <el-table-column prop="productId" label="商品id"></el-table-column>
          <el-table-column prop="type" label="交易操作"></el-table-column>
          <el-table-column prop="price" label="成交价格"></el-table-column>
          <el-table-column prop="quantity" label="交易数量"></el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleTradeTableSizeChange"
          @current-change="handleTradeTableCurrentChange"
          :current-page="accountTable.currentPage"
          :page-sizes="accountTable.pageSizes"
          :page-size="accountTable.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="accountTable.totalCount"
          style="margin-top: 0.5rem"
        >
        </el-pagination>
        <div style="margin: 10px">
          <el-radio-group v-model="radio">
            <el-radio-button label="指标一"></el-radio-button>
            <el-radio-button label="指标二"></el-radio-button>
            <el-radio-button label="指标三"></el-radio-button>
            <el-radio-button label="指标四"></el-radio-button>
          </el-radio-group>
        </div>

        <div
          id="container"
          style="width: 800px; height: 500px; margin: 10px"
          ref="chart"
        ></div>
      </el-col>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
var option;
let accountTableData = [];
let tradeTableData = [];
function init() {
  for (let i = 0; i < 20; i++)
    accountTableData.push({
      id: i,
      name: "张三",
      productId: i + Math.floor(Math.random() * 10),
      level: Math.floor(Math.random() * 4),
    });
  console.log(accountTableData);

  for (let i = 0; i < 10; i++)
    tradeTableData.push({
      id: i,
      productId: i + Math.floor(Math.random() * 10),
      type: Math.random() < 0.5 ? "买入" : "卖出",
      price: Math.floor(Math.random() * 20),
      quantity: Math.floor(Math.random() * 200),
    });

  var app = {};

  let base = +new Date(1988, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let data = [[base, 100 + Math.random() * 100]];
  for (let i = 1; i < 200; i++) {
    let now = new Date((base += oneDay));
    let sgn = -0.5;
    if (data[i - 1][1] < 50 + Math.random() * 100) sgn = 0.5;
    data.push([+now, Math.round((Math.random() + sgn) * 10 + data[i - 1][1])]);
  }
  console.log(data);
  option = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    legend: {
      type: "plain",
      data: ["Fake Data"],
      right: "20%",
    },
    title: {
      left: "center",
      text: "Large Ara Chart",
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
        name: "Fake Data",
        type: "line",
        symbol: "none",
        itemStyle: {
          color: "#0099FF",
        },
        data: data,
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
                name: "Morning Peak",
                xAxis: base - oneDay * 50,
              },
              {
                xAxis: base - oneDay * 20,
              },
            ],
          ],
        },
      },
    ],
  };
}

export default {
  name: "tradingDetection",
  data() {
    return {
      form: {
        nameOptions: [
          {
            value: "选项1",
            label: "无锡贵金属交易所",
          },
          {
            value: "选项2",
            label: "海西商品交易所",
          },
          {
            value: "选项3",
            label: "上海黄金交易所",
          },
          {
            value: "选项4",
            label: "恒大金属交易中心",
          },
          {
            value: "选项5",
            label: "青岛国际商品交易所",
          },
        ],
        nameValue: [],
        accountOptions: [
          {
            value: "选项1",
            label: "0001",
          },
          {
            value: "选项2",
            label: "0002",
          },
          {
            value: "选项3",
            label: "0003",
          },
          {
            value: "选项4",
            label: "0004",
          },
          {
            value: "选项5",
            label: "0005",
          },
        ],

        accoutnValue: [],
        goodOptions: [
          {
            value: "选项1",
            label: "0001",
          },
          {
            value: "选项2",
            label: "0002",
          },
          {
            value: "选项3",
            label: "0003",
          },
          {
            value: "选项4",
            label: "0004",
          },
          {
            value: "选项5",
            label: "0005",
          },
        ],
        goodValue: [],
        date1: "",
        data2: "",
      },
      accountTable: {
        dormitory: accountTableData,
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
      tradeTable: {
        dormitory: tradeTableData,
        currentPage: 1,
        pageSizes: [5, 10, 20, 50],
        // 默认每页显示的条数（可修改）
        PageSize: 5,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount: 100,
        loading: false,
      },
      radio: "指标二",
    };
  },
  mounted() {
    init();
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
      var dom = this.$refs.chart;
      var myChart = echarts.init(dom);
      if (option && typeof option === "object") {
        myChart.setOption(option);
      }
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
    handleTradeTableSizeChange(val) {
      this.tradeTable.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.tradeTable.currentPage = 1;
    },
    handleTradeTableCurrentChange(val) {
      this.tradeTable.currentPage = val;
    },
    handleButtonClick(index, row) {
      console.log(index, row);
      this.$router.push({
        path: "/trade/insiderTrading/relationDetection/" + row.id,
      });
    },
    handleRowClick(row, column, event) {
      console.log(row);
      console.log(column);
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