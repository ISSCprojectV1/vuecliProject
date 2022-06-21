<template>
  <div class="root">
    <el-row>
        <div>
          <p class="title">
            <b>关联内幕人员({{ trader.id }}-{{ trader.name }}) </b>
          </p>
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
        <div>
          <div style="margin: 10px">
            <el-radio-group v-model.number="radio" @change="handleRadioChange">
              <el-radio-button label="0">关系网络1</el-radio-button>
              <el-radio-button label="1">关系网络2</el-radio-button>
            </el-radio-group>
          </div>
          <div
            id="container"
            style="height: 700px; margin: 10px"
            ref="graph"
          ></div>
        </div>
      </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
import { getTraderById } from "@/api/part4/relationDetection";
export default {
  name: "reation-dialog",
  props: ["traderId"],
  data() {    
    return {
      trader : {
      id: 0,
      name: "",
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
      radio: 0,
    };
  },
  mounted() {
    this.accountTable.dormitory = this.getAccountTableData();
      console.log(this.$route.params);
      getTraderById(this.traderId).then((response) => {
        console.log(response);
        this.trader.id = response.data.traderId;
        this.trader.name = response.data.traderName;
        this.initNetworksData();
        this.initGraph(this.networks[this.radio]);
      });
  },
  methods: {
    initGraph(graphData) {
      var dom = this.$refs.graph;
      var graph = echarts.init(dom);
      let option = {
        title: {
          left: "center",
          text:
            " 关联关系网络(" + this.trader.id + "-" + this.trader.name + ")",
        },
        tooltip: {
          show: false,
        },
        legend: [
          {
            top: "10%",
           ght: "25%",
            // selectedMode: 'single',
            data: graphData.categories.map(function (a) {
              return a.name;
            }),
          },
        ],
        series: [
          {
            name:
              " 关联关系网络(" + this.trader.id + "-" + this.trader.name + ")",
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
      let levels = ["低", "中", "高"];
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
        g.nodes.push({
          id: 11,
          name: "异常用户: " + this.trader.id + "-" + this.trader.name,
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
    handleRadioChange() {
      this.initGraph(this.networks[this.radio]);
      console.log(this.networks);
    },
    backward() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>