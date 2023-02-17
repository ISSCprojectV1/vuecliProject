<template>
  <div>
    <h2>大宗商品价格波动传导与风险预警平台</h2>
    <el-container style="height: 1000px; border: 10px solid #eee">


      <el-container style="border: 10px solid #eee;width: 40%">
        <el-header>
          <h4>大宗商品价格波动传导模块</h4>

        </el-header>
        <el-row>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item >
              <el-input
                  v-model="value"
                  placeholder="请输入查询商品"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="initPropagation">全部商品</el-button>
            </el-form-item>
          </el-form>
        </el-row>
          <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" border style="width: 100%">
            <el-table-column prop="id" label="序号" type="index" width="60"></el-table-column>
            <el-table-column prop="name1" align="center" label="大宗商品X" min-width="50"></el-table-column>
            <el-table-column prop="name2" align="center" label="大宗商品Y" min-width="50"></el-table-column>
            <el-table-column prop="coff"  align="center" label="关联性" min-width="50"></el-table-column>
            <el-table-column prop="time"  align="center" label="价格传导时间" min-width="50"></el-table-column>
            <el-table-column label="操作" align="center" min-width="50">
              <template slot-scope="scope">
                <el-button type="text" class="el-option-in-table" @click="goToPriceComparePage(scope.row)">趋势对比</el-button>
              </template>
            </el-table-column>
          </el-table>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="pageSizes"
                       :page-size="PageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total1"
                       style="margin-top: 0.5rem">
        </el-pagination>
      </el-container>


      <el-container style="border: 10px solid #eeeeee;width:60%">
        <el-header>
          <h4>大宗商品价格波动风险预警模块</h4>

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
import {
  getAllForecastNewRisk,
  getForecastFrequency,
  getAllPropagation,
  getPropagationByName,
  getForecastNewRiskByStatus,
  updateForecastNewRisk,
  getForecastHistoryRisk
} from "@/api/part1/riskPrediction";

export default {
  name: "forecastMonitorInfo",
  data() {
    return {
      value:'',
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
      tableData: [],
      currentPage: 1,
      // 条数选择器（可修改）
      pageSizes: [5, 10, 20, 50],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
    }
  },
  created() {
    this.initFormReleased()
    this.initPropagation()
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
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      if(this.tableData.length / this.PageSize +1<= val)
        this.currentPage = 1;
      else
        this.currentPage = val;
    },
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
    initPropagation()
    {
      getAllPropagation().then(res=>{
        this.tableData = res.data;
      })
    },
    onSubmit() {
      getPropagationByName(this.value).then(res => {
        this.tableData = res.data
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
    goToPriceComparePage(row) {
      this.$store.commit('setPriceRow', [row.name1,row.name2, row.time])

      // console.log("setPriceRow:"+[row.name1,row.name2, row.time])
      this.$router.push({
        path: '/trade/riskPrediction/priceCompare',
        query: {
          data: row,
        }
      });
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