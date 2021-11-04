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
      <el-col :span="12">
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
          <el-table-column prop="productId" label="账户id"></el-table-column>
          <el-table-column prop="level" label="风险等价"></el-table-column>
          <el-table-column label="查看关联内幕人员" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
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
  </div>
</template>

<script>
let accountTableData = [];
for (let i = 0; i < 20; i++)
  accountTableData.push({
    id: i,
    name: "张三",
    productId: i + Math.floor(Math.random() * 10),
    level: Math.floor(Math.random() * 4),
  });
console.log(accountTableData);

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
        pageSizes: [5, 10, 20, 50],
        // 默认每页显示的条数（可修改）
        PageSize: 10,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount: 100,
        loading: false,
      },
    };
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
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.accountTable.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.accountTable.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.accountTable.currentPage = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
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