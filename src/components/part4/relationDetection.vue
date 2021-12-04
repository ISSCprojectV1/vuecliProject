<template>
  <div class="root">
    <div v-if="hasNoId" class="form">
      <el-form ref="form" :model="form">
        <el-form-item label="选择用户" style="margin-left: 300px">
          <el-col :span="13">
            <el-select
              v-model="form.nameValue"
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
            <el-radio-group v-model.number="radio" @change="handleRadioChange">
              <el-radio-button label="0">关系网络1</el-radio-button>
              <el-radio-button label="1">关系网络2</el-radio-button>
            </el-radio-group>
          </div>
          <div
            id="container"
            style="width: 700px; height: 700px; margin: 10px"
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
            value: 0,
            label: "用户1",
          },
          {
            value: 1,
            label: "用户2",
          },
          {
            value: 2,
            label: "用户3",
          },
        ],
        nameValue: null,
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
      networks: [],
      radio: null,
    };
  },
  mounted() {
    this.accountTable.dormitory = this.getAccountTableData();
    if (!this.hasNoId) this.initNetworksData();
    if (!this.hasNoId) this.initGraph(this.networks[this.radio]);
    console.log("hasNoId" + this.hasNoId);
  },
  computed: {
    hasNoId: function () {
      return isNaN(this.$route.params.id);
    },
  },
  methods: {
    initGraph(graphData) {
      var dom = this.$refs.graph;
      var graph = echarts.init(dom);
      let option = {
        title: {
          left: "center",
          text: "关联关系网络",
        },
        tooltip: {
          show: false,
        },
        legend: [
          {
            top: "10%",
            right: "25%",
            // selectedMode: 'single',
            data: graphData.categories.map(function (a) {
              return a.name;
            }),
          },
        ],
        series: [
          {
            name: "关联关系网络",
            type: "graph",
            layout: "force",
            draggable: true,
            data: graphData.nodes,
            links: graphData.links,
            categories: graphData.categories,
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
      console.log(this.form);
      this.initNetworksData(this.form.nameValue);
      this.initGraph(this.networks[this.radio]);
    },
    getAccountTableData() {
      let accountTableData = [];
      let levels = ["风险等级低", "风险等级中", "风险等级高"];
      for (let i = 0; i < 20; i++)
        accountTableData.push({
          id: i + 1,
          name: "内幕信息人员" + (i + 1),
          level: Math.floor(Math.random() * 3),
        });
      accountTableData.sort((a, b) => {
        return b.level - a.level;
      });
      for (let account of accountTableData) {
        account.level = levels[account.level];
      }
      return accountTableData;
    },
    initNetworksData(nameValue) {
      this.networks = [];
      for (let i = 0; i < 2; i++) {
        let g = {
          nodes: [],
          links: [],
          categories: [
            {
              name: "内幕信息人员",
              itemStyle: {
                color: "#FF8000",
              },
            },
            {
              name: "异常用户",
              itemStyle: {
                color: "#FF0000",
              },
              symbolSize: 20,
            },
            {
              name: "中间联系人",
              itemStyle: {
                color: "#01DF01",
              },
            },
          ],
        };
        // 对内幕交易添加节点 1~10
        for (let i = 1; i <= 10; i++) {
          g.nodes.push({
            id: i,
            name: "内幕信息人员" + i,
            category: 0,
          });
        }
        // 对异常交易账户添加节点 11
        let k;
        if (this.hasNoId) k = nameValue + 1;
        else k = this.$route.params.id;
        console.log(k);
        g.nodes.push({
          id: 11,
          name: "异常用户" + k,
          category: 1,
        });

        // 对中间联系人添加节点
        for (let i = 12; i <= 30; i++) {
          g.nodes.push({
            id: i,
            name: "中间联系人" + i,
            category: 2,
          });
        }
        // 对内幕交易添加边
        for (let i = 1; i <= 30; i++) {
          let t = i;
          while (t == i) t = Math.floor(Math.random() * 30);
          g.links.push({
            source: i,
            target: t,
          });
        }
        for (let i = 1; i <= 10; i++) {
          let s = Math.floor(Math.random() * 30);
          let t = Math.floor(Math.random() * 30);
          if (s === t) continue;
          let link = {
            source: s,
            target: t,
          };
          if (g.links.includes(link)) continue;
          g.links.push(link);
        }
        this.networks.push(g);
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
    handleRowClick(row, column, event) {
      console.log(row);
      console.log(column);
    },
    handleRadioChange() {
      this.initGraph(this.networks[this.radio]);
      console.log(this.networks);
    },
  },
};
</script>

<style>
</style>