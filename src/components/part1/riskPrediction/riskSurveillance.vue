<template>
  <div>
    <h2>大宗商品预警监控平台</h2>
    <el-container style="width: 100%">
      <el-aside style="width: 350px">
        <div id="chart-risk-frequency" style="width: 350px; height: 480px"></div>
      </el-aside>
      <el-dialog title="预警信息处理"
                 :visible.sync="dialogTableVisible" center :append-to-body='true'
                 :lock-scroll="false" width="30%"
                 :close-on-click-modal="false">
        <riskStatusChange :riskin="risktype"></riskStatusChange>
      </el-dialog>
      <el-container style="width: 600px;" >
        <el-main style="padding-top: 0" class="tabpanel">
          <p style="margin-top: 0; font-weight: bolder; font-size: 18px; color: #333333">预警信息综合显示</p>
          <el-tabs>
            <el-tab-pane label="已发布"  >
              <el-table :data="formReleased" style="font-size: 20px">
                <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
                <el-table-column prop="name" label="商品" min-width="50"></el-table-column>
                <el-table-column prop="risk" label="预警信息" min-width="50">
                  <template scope="scope">
                    <span v-if="scope.row.risk === '高风险'" style="color: red">{{scope.row.risk}}</span>
                    <span v-else-if="scope.row.risk === '低风险'" style="color: green">{{scope.row.risk}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="发布时间" min-width="70"></el-table-column>
                <el-table-column label="操作" min-width="80" >
                  <template slot-scope="scope">
                  <el-button type="text" style="font-size: 20px"  @click="addNewTask1(scope.row,1)">修改</el-button>
                  <el-button type="text" style="font-size: 20px"   @click="addNewTask1(scope.row,2)">送审</el-button>
                  <el-button type="text" style="font-size: 20px"  @click="gotofirst()" >监控</el-button>
                    <el-button type="text" style="font-size: 20px"  @click="gotolast()" >监控</el-button>
                  <el-button type="text" style="font-size: 20px"    @click="addNewTask1(scope.row,4)">删除</el-button>
                   </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="待处理" >
              <el-table :data="formPending"  style="font-size: 20px" >
                <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
                <el-table-column prop="name" label="商品" min-width="50"></el-table-column>
                <el-table-column prop="risk" label="预警信息" min-width="50">
                  <template scope="scope">
                    <span v-if="scope.row.risk === '高风险'" style="color: red">{{scope.row.risk}}</span>
                    <span v-else-if="scope.row.risk === '低风险'" style="color: green">{{scope.row.risk}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="发布时间" min-width="70"></el-table-column>
                <el-table-column label="操作" min-width="80">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已修改" >
              <el-table :data="formModified" style="font-size: 20px">
                <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
                <el-table-column prop="name" label="商品" min-width="50"></el-table-column>
                <el-table-column prop="risk" label="预警信息" min-width="50">
                  <template scope="scope">
                    <span v-if="scope.row.risk === '高风险'" style="color: red">{{scope.row.risk}}</span>
                    <span v-else-if="scope.row.risk === '低风险'" style="color: green">{{scope.row.risk}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="发布时间" min-width="70"></el-table-column>
                <el-table-column label="操作" min-width="80">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已送审">
              <el-table :data="formSent" style="font-size: 20px">
                <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
                <el-table-column prop="name" label="商品" min-width="50"></el-table-column>
                <el-table-column prop="risk" label="预警信息" min-width="50">
                  <template scope="scope">
                    <span v-if="scope.row.risk === '高风险'" style="color: red">{{scope.row.risk}}</span>
                    <span v-else-if="scope.row.risk === '低风险'" style="color: green">{{scope.row.risk}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="发布时间" min-width="70"></el-table-column>
                <el-table-column label="操作" min-width="80">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已删除">
              <el-table :data="formDeleted" style="font-size: 20px">
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
import riskStatusChange from "@/components/part1/riskPrediction/riskStatusChange";
export default {
  name: "riskSurveillance",
  mounted() {
    this.drawChartRiskFrequency()
  },
  components: {

    riskStatusChange
  },

  data() {
    return {
      risktype:["","修改","送审","监控","删除"],
      dialogTableVisible: false,
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
    addNewTask1(scope,num) {
      let data=["","修改","送审","监控","删除"]
      data[0]=this.risktype[num]
      this.risktype=data
console.log( this.risktype[0])
      console.log( this.risktype[0]=='修改')
      this.dialogTableVisible = true;
      console.log(scope)
    },
    gotofirst()
    {
      this.$router.push('/trade/dashboard')
    },
    gotolast()
    {

      this.$router.push(   '/trade/riskPrediction/riskPage')
    },

    drawChartRiskFrequency() {
      let chart = echarts.init(document.getElementById('chart-risk-frequency'))

      let option = {
        // backgroundColor: '#FFFFFF',
        title: {
          text: '当月预警次数',
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
  .el-tab-pane{
    font-size: 30px !important;
  }
</style>
<style>

</style>