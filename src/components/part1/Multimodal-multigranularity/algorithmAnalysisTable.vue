<template>
  <div>
    <el-button id="button-refresh" type="primary" @click="getTableData">指标计算</el-button>
    <el-container>
      <el-aside id="container-table-time-analysis">
        <el-table :data="dataTableTime"
                  :header-cell-style="getHeaderStylesheet"
                  :cell-style="changeCellStyle"
                  :row-style="{height: '40px'}">
          <el-table-column label="模块名称" prop="name"></el-table-column>
          <el-table-column label="对比算法运行时间" prop="comparedAlgoRunningTime"></el-table-column>
          <el-table-column label="系统算法运行时间" prop="proposedAlgoRunningTime"></el-table-column>
          <el-table-column label="响应时间减少" prop="improvedAlgoRunningTime" fixed="right" min-width="80px">
            <template slot-scope="scope">
              {{
                isNaN(scope.row.improvedAlgoRunningTime) ? NaN : ((scope.row.improvedAlgoRunningTime * 100).toFixed(2) + '%')
              }}
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
      <el-container id="container-table-success-rate-analysis">
        <el-table
            :data="dataTableSuccess"
            :header-cell-style="getHeaderStylesheet"
            :cell-style="changeCellStyle"
            :row-style="{height: '40px'}">
          <el-table-column label="模块名称" prop="name"></el-table-column>
          <el-table-column label="对比算法成功率" prop="comparedAlgoSuccessRate"></el-table-column>
          <el-table-column label="系统算法成功率" prop="proposedAlgoSuccessRate"></el-table-column>
          <el-table-column label="自适应协同成功率提升" prop="improvedAlgoSuccessRate" fixed="right" min-width="100px">
            <template slot-scope="scope">
              {{
                isNaN(scope.row.improvedAlgoSuccessRate) ? NaN : ((scope.row.improvedAlgoSuccessRate * 100).toFixed(2) + '%')
              }}
            </template>
          </el-table-column>
        </el-table>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {getComparisonResults} from "@/api/part1/Multimodal-multigranularity";

export default {
  name: "algorithmAnalysisTable.vue",
  data() {
    return {
      dataTableTime: [],
      dataTableSuccess: [],
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getHeaderStylesheet() {
      return {
        'background-color': '#f8f8f8',
        'color': '#909399',
        'font-weight': 'bold',
        'padding-top': '20px',
        'padding-bottom': '20px',
      }
    },
    getTableData() {
      getComparisonResults().then(res => {
        this.dataTableTime = [];
        this.dataTableSuccess = [];
        res.data.data.map(item => {
          this.dataTableTime.push({
            name: item.name,
            comparedAlgoRunningTime: item.comparedAlgoRunningTime.toFixed(2),
            proposedAlgoRunningTime: item.proposedAlgoRunningTime.toFixed(2),
            improvedAlgoRunningTime: item.improvedAlgoRunningTime
          })
          this.dataTableSuccess.push({
            name: item.name,
            comparedAlgoSuccessRate: item.comparedAlgoSuccessRate.toFixed(2),
            proposedAlgoSuccessRate: item.proposedAlgoSuccessRate.toFixed(2),
            improvedAlgoSuccessRate: item.improvedAlgoSuccessRate
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    changeCellStyle(row) {
      if (row.column.label === '响应时间减少' || row.column.label === '自适应协同成功率提升')
        return 'background-color: #e3eff3; color: #469b4c; font-weight: 900; padding: 2px'
      else
        return 'padding: 2px'
    }
  }
}
</script>

<style scoped>
#button-refresh {
  margin-bottom: 0.5rem;
}

#container-table-time-analysis {
  min-width: 50%;
  border: 0.5rem solid #ffffff;
}

#container-table-success-rate-analysis {
  min-width: 50%;
  border: 0.5rem solid #ffffff;
}
</style>