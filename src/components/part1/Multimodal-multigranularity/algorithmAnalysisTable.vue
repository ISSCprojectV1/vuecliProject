<template>
  <div>
    <el-container>
      <el-aside id="container-table-time-analysis">
        <el-table :data="dataTableTime" :header-cell-style="{'background-color': '#dfdfdf', 'color': '#606162'}">
          <el-table-column label="模块名称" prop="name"></el-table-column>
          <el-table-column label="对比算法运行时间" prop="comparedAlgoRunningTime"></el-table-column>
          <el-table-column label="系统算法运行时间" prop="proposedAlgoRunningTime"></el-table-column>
          <el-table-column label="响应时间提升" prop="improvedAlgoRunningTime"></el-table-column>
        </el-table>
      </el-aside>
      <el-container id="container-table-success-rate-analysis">
        <el-table :data="dataTableSuccess" :header-cell-style="{'background-color': '#dfdfdf', 'color': '#606162'}">
          <el-table-column label="模块名称" prop="name"></el-table-column>
          <el-table-column label="对比算法成功率" prop="comparedAlgoSuccessRate"></el-table-column>
          <el-table-column label="系统算法成功率" prop="proposedAlgoSuccessRate"></el-table-column>
          <el-table-column label="自适应协同成功率提升"  prop="improvedAlgoSuccessRate" min-width="100px"></el-table-column>
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
    getComparisonResults().then(res => {
      res.data.data.map(item => {
        console.log(item)
        this.dataTableTime.push({
          name: item.name,
          comparedAlgoRunningTime: item.comparedAlgoRunningTime,
          proposedAlgoRunningTime: item.proposedAlgoRunningTime,
          improvedAlgoRunningTime: item.improvedAlgoRunningTime
        })
        this.dataTableSuccess.push({
          name: item.name,
          comparedAlgoSuccessRate: item.comparedAlgoSuccessRate,
          proposedAlgoSuccessRate: item.proposedAlgoSuccessRate,
          improvedAlgoSuccessRate: item.improvedAlgoSuccessRate
        })
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
#container-table-time-analysis {
  min-width: 50%;
  border: 0.5rem solid #f5f6f7;
}

#container-table-success-rate-analysis {
  min-width: 50%;
  border: 0.5rem solid #f5f6f7;
}
</style>