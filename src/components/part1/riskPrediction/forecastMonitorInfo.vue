<template>
  <div>
    <h2>大宗商品价格波动预警监控平台</h2>
    <el-container style="height: 1000px; border: 10px solid #eee">


      <el-container style="border: 10px solid #eee;width: 30%">
        <el-header>
          <h4>最近30天风险预警等级分布</h4>
        </el-header>
        <el-main  style="border: solid #eeeeee; background-color: white;">
          <div id="chart-risk-frequency" style=" width: 100%; height: 100%"></div>
        </el-main>
      </el-container>


      <el-container style="border: 10px solid #eeeeee;width:70%">
        <el-header>
          <h4>预警信息综合显示</h4>
        </el-header>

        <el-tabs v-model="tabSelected" @tab-click="handleTabClick" type="border-card" style="width: 100%; height: 100%">

          <el-tab-pane label="已发布">
            <el-table :data="formReleased" >
<!--              <el-table-column prop="id" label="序号" min-width="30">index</el-table-column>-->
              <el-table-column prop="id" label="序号" type="index" min-width="40"></el-table-column>
              <el-table-column prop="name" label="商品" min-width="50"></el-table-column>
              <el-table-column prop="risk" label="预警信息" min-width="40">
                <template slot-scope="scope">
                  <span v-if="scope.row.risk === 3" style="color: red">高</span>
                  <span v-else-if="scope.row.risk === 1" style="color: #00DB00">低</span>
                  <span v-else-if="scope.row.risk === 2" style="color: orange">中</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" label="发布时间" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="80">
                <template slot-scope="scope">
                  <el-button type="text" class="el-option-in-table" @click="goToRiskPage(scope.row)">监控</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="待处理" v-if="this.dialogVisible">
            <el-table :data="formReleased">
<!--              <el-table-column prop="id" label="序号" min-width="30"></el-table-column>-->
              <el-table-column prop="id" label="序号" type="index" min-width="40"></el-table-column>
              <el-table-column prop="name" label="商品" min-width="50"></el-table-column>
              <el-table-column prop="risk" label="预警信息" min-width="40">
                  <template slot-scope="scope">
                    <span v-if="scope.row.risk === 3" style="color: red">高</span>
                    <span v-else-if="scope.row.risk === 1" style="color: #00DB00">低</span>
                    <span v-else-if="scope.row.risk === 2" style="color: orange">中</span>
                  </template>
              </el-table-column>
              <el-table-column prop="date" label="发布时间" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="80">
                <template slot-scope="scope">
                  <el-button type="text" class="el-option-in-table" @click="onClickModify(scope.row)">修改</el-button>
                  <el-button type="text" class="el-option-in-table" @click="goToRiskPage(scope.row)">监控</el-button>

                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="已修改" v-if="this.dialogVisible">
            <el-table :data="formModified">
<!--              <el-table-column prop="id" label="序号" min-width="30"></el-table-column>-->
              <el-table-column prop="id" label="序号" type="index" min-width="40"></el-table-column>
              <el-table-column prop="name" label="商品" min-width="50"></el-table-column>
              <el-table-column prop="risk" label="预警信息" min-width="40">
                <template slot-scope="scope">
                  <span v-if="scope.row.risk === 3" style="color: red">高</span>
                  <span v-else-if="scope.row.risk === 1" style="color: #00DB00">低</span>
                  <span v-else-if="scope.row.risk === 2" style="color: orange">中</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" label="发布时间" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.date }}</span>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>

        </el-tabs>

      </el-container>

      <el-dialog
          title="预警信息修改"
          :visible.sync="dialogModifyVisible"
          :append-to-body="true"
          :lock-scroll="false" width="30%"
          :close-on-click-modal="false" center>
        <el-form :model="formRowSelected">
          <el-form-item label="商品" label-width="80px">
            {{ formRowSelected.name }}
          </el-form-item>
          <el-form-item label="风险等级" label-width="80px">
            <template>
              <span v-if="formRowSelected.risk === 3" style="color: red">高</span>
              <span v-else-if="formRowSelected.risk === 1" style="color: green">低</span>
              <span v-else-if="formRowSelected.risk === 2" style="color: orange">中</span>
            </template>
          </el-form-item>
          <el-form-item label="预警信息" label-width="80px">
            <el-select v-model="formRowSelected.info" placeholder="请选择">
              <el-option key="1" label="高" value="高"></el-option>
              <el-option key="2" label="中" value="中"></el-option>
              <el-option key="3" label="低" value="低"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer">
          <el-button type="primary" @click="modifyInfo">确定</el-button>
          <el-button @click="dialogModifyVisible = false">取消</el-button>
        </div>
      </el-dialog>

    </el-container>
  </div>
</template>

<script>
import * as echarts5 from "echarts5";
import {getRole} from "@/utils/auth"
import {getAllForecastNewRisk, getForecastFrequency, getForecastNewRiskByStatus, updateForecastNewRisk} from "@/api/part1/riskPrediction";

export default {
  name: "forecastMonitorInfo",
  data() {
    return {
      tabSelected: '',
      infoSelected: '', // store old info for comparison
      formRowSelected: {},
      tabIndex: ["已发布", "待处理", "已修改"],
      dialogModifyVisible: false,
      formReleased: [],
      formPending: [],
      formModified: [],
      formSent: [],
      formDeleted: [],
      role:'',
      dialogVisible:'',
      frequency:[],

    }
  },
  created() {
    this.initFormReleased()
    console.log(this.formReleased)
  },
  mounted() {
    this.role=getRole()
    console.log(this.role==="TPS")
    if(this.role==="TPS")
    {
      this.dialogVisible=false
    }else
      this.dialogVisible=true
    this.drawChartRiskFrequency()
  },
  methods: {
    handleTabClick(tab) {
      console.log(tab.label)
      if(tab.label === "已发布")
        this.initFormReleased()
      if(tab.label === "待处理")
        this.getRiskInfo(0)
      if(tab.label === "已修改")
        this.getRiskInfo(1)

    },

    initFormReleased()
    {
      getAllForecastNewRisk().then(res=>{
        this.formReleased = res.data;
      })
    },


    // 根据状态值获取预警信息
    getRiskInfo(status) {
      getForecastNewRiskByStatus(status).then(res => {
        switch (status) {
          case 0:
            this.formReleased = this.dealwithid(res.data);
            break;
          case 1:
            this.formModified = this.dealwithid(res.data);
            break;
          default:
            break;
        }
      })
    },

    dealwithid(data) {
      data.sort(function (a, b) {
        let x = a.id;
        let y = b.id;
        return (x > y) ? 1 : x < y ? -1 : 0;
      })
      return data
    },
    // 操作
    onClickModify(row) {
      console.log(row);
      this.formRowSelected = row;
      this.infoSelected = row.info;
      this.dialogModifyVisible = true;
    },
    modifyInfo() {
      console.log(this.infoSelected)
      if(this.formRowSelected.info === "高")
        this.formRowSelected.risk = 3;
      else if(this.formRowSelected.info === "中")
        this.formRowSelected.risk = 2;
      else
        this.formRowSelected.risk = 1;

     let data = {
       id: this.formRowSelected.id,
       name:this.formRowSelected.name,
       code:this.formRowSelected.code,
       risk:this.formRowSelected.risk,
       date:this.formRowSelected.date,
       status:this.formRowSelected.status
     }

      updateForecastNewRisk(data).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.getRiskInfo(1)
      }).catch(() => {
        this.$message({
          message: '修改失败',
          type: 'error'
        })
      })
      this.dialogModifyVisible = false;
    },

    goToFirst() {
      this.$router.push('/trade/dashboard')
    },
    goToRiskPage(row) {
      this.$store.commit('setCommodityForMonitoring', row.name)
      this.$router.push({
        path: '/trade/riskPrediction/forecastHistoryRisk',
        query: {
          data: row,
        }
      });
    },


    // 绘图
    drawChartRiskFrequency() {
      let chart = echarts5.init(document.getElementById('chart-risk-frequency'))

      getForecastFrequency(8).then(res=>
      {
        this.frequency = res.data;
        console.log("xxxx")
        console.log(this.frequency)
        let name = []
        let high = []
        let mid = []
        let low = []
        for(let i=0; i< this.frequency.length;i++)
        {
          name.push(this.frequency[i].name);
          high.push(this.frequency[i].high);
          mid.push(this.frequency[i].mid);
          low.push(this.frequency[i].low);
        }
        name = name.reverse()
        high = high.reverse()
        mid = mid.reverse()
        low = low.reverse()
        console.log(name)
        console.log(high)
        console.log(mid)
        console.log(low)

        let option = {
          // title: {
          //   text: '当月预警等级分布',
          //   left: 'center'
          // },
          legend: {},
          grid: {
            left: '10%',
            right: '10%',
            top:'10%',
            bottom: '10%',
            // height:'90%',
            // width:'90%',
            containLabel: false
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: name
          },
          barWidth: '40px',
          series: [
            {
              name: '高风险',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              color:'#FF5809',
              emphasis: {
                focus: 'series'
              },
              data: high
            },
            {
              name: '中风险',
              type: 'bar',
              stack: 'total',
              color:'#FFDC35',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: mid
            },
            {
              name: '低风险',
              type: 'bar',
              stack: 'total',
              color:'#00DB00',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: low
            }

          ]
        };

        chart.setOption(option)

      })
    },
  }
}
</script>

<style scoped>
.el-option-in-table {
  margin-left: 5px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>