<template>
  <div>
    <div class="form">
      <el-form ref="form" label-width="130px" :model="form">
        <el-form-item label="交易机构" style="margin-left: 300px">
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

        <el-form-item label="交易账户" style="margin-left: 300px">
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

        <el-form-item label="交易时间" style="margin-left: 300px">
          <el-col :span="13">
          <div class="block">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
              value-format="yyyy-MM-dd"
              size="large">
            </el-date-picker>
          </div>
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
          <!-- <el-table-column prop="name" label="账户名"> </el-table-column> -->
          <el-table-column prop="goodId" label="商品id"></el-table-column>
          <!-- <el-table-column prop="goodName" label="商品名"></el-table-column> -->
          <el-table-column prop="level" label="风险等级"></el-table-column>
          <el-table-column label="查看异常交易行为" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleTradingButtonClick(scope.$index, scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <!-- <el-table-column label="查看关联内幕人员" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleRelationButtonClick(scope.$index, scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column> -->
          
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
    <el-dialog :title="tradeDialog.name" :visible.sync="tradeDialog.visible">
      <trading-dialog
      :detectionResults="detectionResults" :index="index"></trading-dialog>
    </el-dialog>
    <el-dialog :title="relationDialog.name" :visible.sync="relationDialog.visible">
      <relation-dialog :traderId="traderId" :index="index"></relation-dialog>
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
import relationDialog from "./relationDetection.vue"

export default {
  components: { tradingDialog, relationDialog },
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
        date: ""
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
      tradeDialog: {
        name: "",
        visible: false,
      },
      relationDialog: {
        name: "",
        visible: false,
      },
      detectionResults: [],
      index: 0,
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
      console.log(this.form)
      let params = {
        institutesId: this.form.nameValue,
        tradersId: this.form.accountValue,
        goodsId: this.form.goodValue,
        startDate: this.form.date[0],
        endDate: this.form.date[1],
      };
      tradingDetection(params).then((response) => {
        console.log("detection results!")
        console.log(response);
        this.detectionResults = response.data;
        this.accountTable.dormitory = [];
        let levels = ["风险等级低", "风险等级中", "风险等级高"];
        for (let element of this.detectionResults) {
          this.accountTable.dormitory.push({
            id: element.traderId,
            name: element.traderName,
            goodId: element.goodId,
            goodName: element.goodName,
            level: levels[element.level],
          });
          this.accountTable.totalCount = this.accountTable.dormitory.length;
        }
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
      this.index = index;
      this.relationDialog.name = "关联网络分析";
      this.relationDialog.visible = true;
      this.traderId = row.id;
    },
    handleTradingButtonClick(index, row) {
      console.log(index);
      console.log(row);
      this.index = index;
      this.tradeDialog.name =
        "异常交易用户 " + row.id + " 的交易行为";
      this.tradeDialog.visible = true;
      this.traderId = row.id;
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
            label: good.goodId,
          });
        }
      });
      getTradersByInstitutes(this.form.nameValue).then((response) => {
        this.form.accountOptions = [];
        for (let account of response.data) {
          this.form.accountOptions.push({
            value: account.d_id,
            label: account.d_id,
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

/deep/ .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 100%;
}
</style>