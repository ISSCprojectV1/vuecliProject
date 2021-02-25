<template>
  <div>
    <h2>大宗商品预警监控平台</h2>
    <el-container style="width: 100%">
      <el-aside style="width: 350px">
        <div id="chart-risk-frequency" style="width: 350px; height: 480px"></div>
      </el-aside>
      <el-container style="width: 600px;">
        <el-main style="padding-top: 0">
          <p style="margin-top: 0; font-weight: bolder; font-size: 18px; color: #333333">预警信息综合显示</p>
          <el-tabs>
            <el-tab-pane label="已发布">
              <el-table :data="formReleased">
                <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
                <el-table-column prop="name" label="商品" min-width="50"></el-table-column>
                <el-table-column prop="risk" label="预警信息" min-width="50">
                  <template scope="scope">
                    <span v-if="scope.row.risk === '高风险'" style="color: red">{{scope.row.risk}}</span>
                    <span v-else-if="scope.row.risk === '低风险'" style="color: green">{{scope.row.risk}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="发布时间" min-width="50"></el-table-column>
                <el-table-column label="操作" min-width="80">
                  <el-button type="text">修改</el-button>
                  <el-button type="text">送审</el-button>
                  <el-button type="text">监控</el-button>
                  <el-button type="text">删除</el-button>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="待处理">
              <el-table :data="formPending">
                <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
                <el-table-column prop="name" label="商品" min-width="50"></el-table-column>
                <el-table-column prop="risk" label="预警信息" min-width="50"></el-table-column>
                <el-table-column prop="date" label="发布时间" min-width="50"></el-table-column>
                <el-table-column label="操作" min-width="80">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已修改">
              <el-table :data="formModified">
                <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
                <el-table-column prop="name" label="商品" min-width="50"></el-table-column>
                <el-table-column prop="risk" label="预警信息" min-width="50">
                  <template scope="scope">
                    <span v-if="scope.row.risk === '高风险'" style="color: red">{{scope.row.risk}}</span>
                    <span v-else-if="scope.row.risk === '低风险'" style="color: green">{{scope.row.risk}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="发布时间" min-width="50"></el-table-column>
                <el-table-column label="操作" min-width="80">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已送审">
              <el-table :data="formSent">
                <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
                <el-table-column prop="name" label="商品" min-width="50"></el-table-column>
                <el-table-column prop="risk" label="预警信息" min-width="50">
                  <template scope="scope">
                    <span v-if="scope.row.risk === '高风险'" style="color: red">{{scope.row.risk}}</span>
                    <span v-else-if="scope.row.risk === '低风险'" style="color: green">{{scope.row.risk}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="发布时间" min-width="50"></el-table-column>
                <el-table-column label="操作" min-width="80">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已删除">
              <el-table :data="formDeleted">
                <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
                <el-table-column prop="name" label="商品" min-width="50"></el-table-column>
                <el-table-column prop="risk" label="预警信息" min-width="50">
                  <template scope="scope">
                    <span v-if="scope.row.risk === '高风险'" style="color: red">{{scope.row.risk}}</span>
                    <span v-else-if="scope.row.risk === '低风险'" style="color: green">{{scope.row.risk}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="发布时间" min-width="50"></el-table-column>
                <el-table-column label="操作" min-width="80">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "riskSurveillance",
  mounted() {
    this.drawChartRiskFrequency()
  },
  data() {
    return {
      formReleased: [
        {
          id: 1,
          name: '大豆',
          risk: '高风险',
          date: '2020/01/01',
        },
        {
          id: 2,
          name: '小麦',
          risk: '低风险',
          date: '2020/01/12',
        },
        {
          id: 3,
          name: '菜籽油',
          risk: '低风险',
          date: '2020/01/04',
        },
        {
          id: 4,
          name: '玉米',
          risk: '高风险',
          date: '2020/01/07',
        },
      ],
      formPending: [
        {
          id: 1,
          name: '大豆',
          risk: '高风险',
          date: '2020/01/01',
        },
      ],
      formModified: [
        {
          id: 1,
          name: '小麦',
          risk: '低风险',
          date: '2020/01/12',
        },
      ],
      formSent: [
        {
          id: 1,
          name: '菜籽油',
          risk: '低风险',
          date: '2020/01/04',
        },
      ],
      formDeleted: [
        {
          id: 1,
          name: '玉米',
          risk: '高风险',
          date: '2020/01/07',
        },
      ]
    }
  },
  methods: {
    drawChartRiskFrequency() {
      let chart = echarts.init(document.getElementById('chart-risk-frequency'))

      let option = {
        // backgroundColor: '#FFFFFF',
        title: {
          text: '当月预警频率',
          left: 'center'
        },
        tooltip: {
          show: true
        },
        xAxis: {},
        yAxis: {
          type: 'category',
          data: ['小麦', '大豆', '玉米', '棉花']
        },
        series: [
          {
            type: 'bar',
            barWidth: '50px',
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = ['#91cc75', '#fac858', '#ee6666', '#73c0de']
                  return colorList[params.dataIndex]
                }
              }
            },
            data: [5, 15, 11, 11]
          }
        ]
      }

      chart.setOption(option)
    },
  }
}
</script>

<style scoped>

</style>