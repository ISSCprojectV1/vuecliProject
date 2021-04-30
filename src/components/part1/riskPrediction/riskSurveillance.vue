<template>
  <div>
    <h2>大宗商品价格波动预警监控平台</h2>
    <el-container style="height: 650px; border: 10px solid #eee">
      <el-aside width="370px" style="border: 10px solid #eee; background-color: white;">
        <div id="chart-risk-frequency" style="margin-top: 1rem; width: 350px; height: 500px"></div>
      </el-aside>

      <el-container style="border: 10px solid #eee">
        <el-header>
          <h4>预警信息综合显示</h4>
        </el-header>

        <el-tabs v-model="tabSelected" @tab-click="handleTabClick" type="border-card" style="width: 100%; height: 100%">

          <el-tab-pane label="已发布">
            <el-table :data="formReleased">
              <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
              <el-table-column prop="goods" label="商品" min-width="50"></el-table-column>
              <el-table-column prop="info" label="预警信息" min-width="40">
                <template slot-scope="scope">
                  <span v-if="scope.row.info === '高'" style="color: red">{{ scope.row.info }}</span>
                  <span v-else-if="scope.row.info === '低'" style="color: green">{{ scope.row.info }}</span>
                  <span v-else-if="scope.row.info === '中'" style="color: orange">{{ scope.row.info }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="发布时间" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.time.split('.')[0].replace('T', ' ') }}</span>
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
              <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
              <el-table-column prop="goods" label="商品" min-width="50"></el-table-column>
              <el-table-column prop="info" label="预警信息" min-width="40">
                <template slot-scope="scope">
                  <span v-if="scope.row.info === '高'" style="color: red">{{ scope.row.info }}</span>
                  <span v-else-if="scope.row.info === '低'" style="color: green">{{ scope.row.info }}</span>
                  <span v-else-if="scope.row.info === '中'" style="color: orange">{{ scope.row.info }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="发布时间" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.time.split('.')[0].replace('T', ' ') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="80">
                <template slot-scope="scope">
                  <el-button type="text" class="el-option-in-table" @click="onClickModify(scope.row)">修改</el-button>
                  <el-popconfirm
                      confirm-button-text="确定"
                      cancel-button-text="取消"
                      title="是否确定送审？"
                      @onConfirm="pendInfo(scope.row)">
                    <el-button type="text" class="el-option-in-table" slot="reference">送审</el-button>
                  </el-popconfirm>
                  <el-button type="text" class="el-option-in-table" @click="goToRiskPage(scope.row)">监控</el-button>

                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="已修改" v-if="this.dialogVisible">
            <el-table :data="formModified">
              <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
              <el-table-column prop="goods" label="商品" min-width="50"></el-table-column>
              <el-table-column prop="info" label="预警信息" min-width="40">
                <template slot-scope="scope">
                  <span v-if="scope.row.info === '高'" style="color: red">{{ scope.row.info }}</span>
                  <span v-else-if="scope.row.info === '低'" style="color: green">{{ scope.row.info }}</span>
                  <span v-else-if="scope.row.info === '中'" style="color: orange">{{ scope.row.info }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="发布时间" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.time.split('.')[0].replace('T', ' ') }}</span>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>

          <el-tab-pane label="已送审" v-if="this.dialogVisible">
            <el-table :data="formSent">
              <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
              <el-table-column prop="goods" label="商品" min-width="50"></el-table-column>
              <el-table-column prop="info" label="预警信息" min-width="40">
                <template slot-scope="scope">
                  <span v-if="scope.row.info === '高'" style="color: red">{{ scope.row.info }}</span>
                  <span v-else-if="scope.row.info === '低'" style="color: green">{{ scope.row.info }}</span>
                  <span v-else-if="scope.row.info === '中'" style="color: orange">{{ scope.row.info }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="发布时间" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.time.split('.')[0].replace('T', ' ') }}</span>
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
          <el-form-item label="序号" label-width="80px">
            {{ formRowSelected.id }}
          </el-form-item>
          <el-form-item label="预警信息" label-width="80px">
            <el-select v-model="formRowSelected.info" placeholder="请选择">
              <el-option key="1" label="高" value="高"></el-option>
              <el-option key="2" label="中" value="中"></el-option>
              <el-option key="3" label="低" value="低"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" label-width="80px">
            <el-select v-model="formRowSelected.status" placeholder="请选择">
              <el-option key="0" label="已发布" value="0"></el-option>
              <el-option key="1" label="待处理" value="1"></el-option>
              <el-option key="2" label="已修改" value="2"></el-option>
              <el-option key="3" label="已送审" value="3"></el-option>
              <el-option key="4" label="已删除" value="4"></el-option>
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
import {getRiskInfoByStatus, updateRiskInfo} from "@/api/part1/riskPrediction";
/*
    <el-table-column label="操作" min-width="80">
              </el-table-column>
      <el-table-column label="操作" min-width="80">
              </el-table-column>
*  <template slot-scope="scope">
                  <el-button type="text" class="el-option-in-table" @click="onClickModify(scope.row)">修改</el-button>
                  <el-popconfirm
                      confirm-button-text="确定"
                      cancel-button-text="取消"
                      title="是否确定送审？"
                      @onConfirm="pendInfo(scope.row)">
                    <el-button type="text" class="el-option-in-table" slot="reference">送审</el-button>
                  </el-popconfirm>
                  <el-button type="text" class="el-option-in-table" @click="goToRiskPage(scope.row)">监控</el-button>
                  <el-popconfirm
                      confirm-button-text="确定"
                      cancel-button-text="取消"
                      title="是否确定删除？"
                      @onConfirm="deleteInfo(scope.row)">
                    <el-button type="text" class="el-option-in-table" slot="reference">删除</el-button>
                  </el-popconfirm>
                </template>
                *  <el-tab-pane label="已删除">
            <el-table :data="formDeleted">
              <el-table-column prop="id" label="序号" min-width="30"></el-table-column>
              <el-table-column prop="goods" label="商品" min-width="50"></el-table-column>
              <el-table-column prop="info" label="预警信息" min-width="40">
                <template slot-scope="scope">
                  <span v-if="scope.row.info === '高'" style="color: red">{{ scope.row.info }}</span>
                  <span v-else-if="scope.row.info === '低'" style="color: green">{{ scope.row.info }}</span>
                  <span v-else-if="scope.row.info === '中'" style="color: orange">{{ scope.row.info }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="发布时间" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.time.split('.')[0].replace('T', ' ') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="80">
              </el-table-column>
            </el-table>
          </el-tab-pane>

*
* */
export default {
  name: "riskSurveillance",
  data() {
    return {
      tabSelected: '',
      infoSelected: '', // store old info for comparison
      formRowSelected: {},
      tabIndex: ["已发布", "待处理", "已修改", "已送审", "已删除"],
      dialogModifyVisible: false,
      formReleased: [],
      formPending: [],
      formModified: [],
      formSent: [],
      formDeleted: [],
      role:'',
      dialogVisible:'',

    }
  },
  created() {
    this.getRiskInfo(1)

  },
  mounted() {
    this.role=getRole()
    console.log(this.role=="TPS")
    if(this.role=="TPS")
    {
      this.dialogVisible=false
    }else
      this.dialogVisible=true
    this.drawChartRiskFrequency()
  },
  methods: {
    handleTabClick(tab) {
      console.log(tab.label)
      let dataa = -1
      console.log(this.tabIndex.indexOf(tab.label) == 0)
      if (this.tabIndex.indexOf(tab.label) == 0)
        dataa = 1
      if (this.tabIndex.indexOf(tab.label) == 1)
        dataa = 0
      if (dataa != 0 && dataa != 1)
        dataa = this.tabIndex.indexOf(tab.label)
      this.getRiskInfo(dataa)
    },
    getRiskInfo(status) {
      getRiskInfoByStatus(status).then(res => {
        switch (status) {
          case 0:
            this.formReleased = this.dealwithid(res.data);
            break;
          case 1:
            this.formReleased = this.dealwithid(res.data);
            break;
          case 2:
            this.formModified = this.dealwithid(res.data);
            break;
          case 3:
            this.formSent = this.dealwithid(res.data);
            break;
          case 4:
            this.formDeleted = this.dealwithid(res.data);
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
  for(let i=0;i<data.length;i++)
  {
    if(data[i].info==='高风险')
      data[i].info='高'
    if(data[i].info==='中风险')
      data[i].info='中'
    if(data[i].info==='低风险')
      data[i].info='低'
  }
      return data
    },
    // 操作
    onClickModify(row) {
      this.formRowSelected = {
        id: row.id,
        info: row.info,
        status: (row.status === 0) ? "已发布" : row.status
      };
      this.infoSelected = row.info;
      this.dialogModifyVisible = true;
    },
    modifyInfo() {
      if (this.formRowSelected.status === '已发布') {
        this.formRowSelected.status = 0;
        if (this.infoSelected === this.formRowSelected.info) {
          this.dialogModifyVisible = false;
          return;
        } else
          this.formRowSelected.status = 2;
      }
      updateRiskInfo(this.formRowSelected).then(() => {
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
    pendInfo(row) {
      let data = {
        id: row.id,
        info: row.info,
        status: 3
      }
      updateRiskInfo(data).then(() => {
        this.$message({
          message: '送审成功',
          type: 'success'
        })
        this.getRiskInfo(1)
      }).catch(() => {
        this.$message({
          message: '送审失败',
          type: 'error'
        })
      })
    },
    deleteInfo(row) {
      let data = {
        id: row.id,
        info: row.info,
        status: 4
      }
      updateRiskInfo(data).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getRiskInfo(1)
      }).catch(() => {
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      })
    },
    goToFirst() {
      this.$router.push('/trade/dashboard')
    },
    goToRiskPage(row) {
      this.$store.commit('setCommodityForMonitoring', row.goods)
      this.$router.push({
        path: '/trade/riskPrediction/riskPage',
        query: {
          data: row,

        }
      });
    },
    // 绘图
    drawChartRiskFrequency() {
      let chart = echarts5.init(document.getElementById('chart-risk-frequency'))

      let option = {
        title: {
          text: '当月预警次数',
          left: 'center'
        },
        tooltip: {
          show: true
        },
        grid: {containLabel: true},
        xAxis: {
          min: 0,
          max: 30,
          axisLabel: {
            show: true,    //这行代码控制着坐标轴x轴的文字是否显示
            textStyle: {
              color: '#000',   //x轴上的字体颜色
              fontSize: '16'    // x轴字体大小
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#000',
              width: 3,   //这里是坐标轴的宽度,可以去掉
            }
          },


        },
        yAxis: {
          type: 'category',
          data: ['棉花', '大豆', '玉米', '小麦']
        },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 0,
          max: 15,
          text: ['高', '低'],
          dimension: 0,
          inRange: {
            color: ['#008000', '#FFD700', '#FF0000']
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: '40px',
            // itemStyle: {
            //   normal: {
            //     color: function (params) {
            //       let colorList = ['#91cc75', '#fac858', '#ee6666', '#73c0de']
            //       return colorList[params.dataIndex]
            //     }
            //   }
            // },
            data: [2, 9, 12, 15]
          }
        ]
      }

      chart.setOption(option)
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