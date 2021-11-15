<template>
  <div class="root">
    <div v-if="hasNoId" class="form">
      <el-form ref="form" :model="form">
        <el-form-item label="选择用户" style="margin-left: 300px">
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
          <el-col :span="3">
            <el-button type="primary" @click="onSubmit"> 提交 </el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>

    <el-row>
      <el-col :span="12">
        <div>
          <p class="title"><b>关联内幕人员</b></p>
          <el-table
            ref="domitoryTable"
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
            <el-table-column prop="id" label="关联内幕人员id"></el-table-column>
            <el-table-column
              prop="name"
              label="关联内幕人员名称"
            ></el-table-column>
            <el-table-column prop="level" label="关联等级"></el-table-column>
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
        </div>
      </el-col>
      <el-col :span="12">
        <div>
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
            style="width: 700px; height: 500px; margin: 10px"
            ref="graph"
          ></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "reationDetection",
  data() {
    return {
      form: {
        nameOptions: [
          {
            value: "选项1",
            label: "张三",
          },
          {
            value: "选项2",
            label: "李四",
          },
          {
            value: "选项3",
            label: "王五",
          },
          {
            value: "选项4",
            label: "赵六",
          },
        ],
        nameValue: [],
      },
      accountTable: {
        dormitory: [],
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
      graph: {
        nodes: [
          {
            id: "0",
            name: "0",
            category: 0,
          },
          {
            id: "1",
            name: "1",
            category: 1,
          },
        ],
        links: [
          {
            source: "0",
            target: "1",
          },
        ],
        categories: [
          {
            name: "A",
            itemStyle: {
              color: "#FF8000",
            },
          },
          {
            name: "B",
            itemStyle: {
              color: "#01DF01",
            },
          },
          {
            name: "C",
            itemStyle: {
              color: "#DF0101",
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.accountTable.dormitory = this.getAccountTableData();
    this.initGraph();
  },
  computed: {
    hasNoId: function () {
      return isNaN(this.$route.params.id);
    },
  },
  methods: {
    initGraph() {
      var dom = this.$refs.graph;
      var graph = echarts.init(dom);
      let option = {
        title: {
          left: "center",
          text: "Les Miserables",
        },
        tooltip: {},
        legend: [
          {
            right: "20%",
            // selectedMode: 'single',
            data: this.graph.categories.map(function (a) {
              return a.name;
            }),
          },
        ],
        series: [
          {
            name: "Les Miserables",
            type: "graph",
            layout: "force",
            data: this.graph.nodes,
            links: this.graph.links,
            categories: this.graph.categories,
            animation: false,
            roam: true,
            label: {
              position: "right",
              formatter: "{b}",
            },
            force: {
              repulsion: 100,
            },
          },
        ],
      };
      graph.setOption(option);
    },
    headcell() {
      return {
        "background-color": "#dfdfdf",
        color: "rgb(96, 97, 98)",
        "font-weight": "bold",
        "font-size": "18px",
      };
    },
    onSubmit() {
      console.log("submit");
    },
    getAccountTableData() {
      let accountTableData = [];
      for (let i = 0; i < 20; i++)
        accountTableData.push({
          id: i,
          name: "张三",
          level: Math.floor(Math.random() * 4),
        });
      return accountTableData;
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
    handleRowClick(row, column, event) {
      console.log(row);
      console.log(column);
    },
  },
};
</script>

<style>
</style>