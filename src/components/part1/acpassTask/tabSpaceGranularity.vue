<template>
  <div>
    <el-container style="height: 800px; border: 10px solid #eee">
      <el-aside width="800px" style="border: 10px solid #eee">
        <el-table
            :data="dataTableSpaceGranularity"
            @row-click="onClickTableSpace"
        >
          <el-table-column
              label="平台名称"
              prop="platform"
              width="200">
          </el-table-column>
          <el-table-column
              label="省份"
              prop="province"
              width="80">
          </el-table-column>
          <el-table-column
              label="城市"
              prop="city"
              width="80">
          </el-table-column>
          <el-table-column
              label="商品类型"
              prop="category"
              width="80">
          </el-table-column>
          <el-table-column
              label="关联度"
              prop="associate"
              width="150">
            <template slot-scope="scope">
              {{ scope.row.associate.toFixed(3) }}
            </template>
          </el-table-column>
        </el-table>
        <!--        <el-pagination-->
        <!--            ref="pagination"-->
        <!--            style="text-align: center; margin-top: 0.5rem"-->
        <!--            background-->
        <!--            layout="prev, pager, next"-->
        <!--            @current-change="pageChange"-->
        <!--            :total="totalTableSpace">-->
        <!--        </el-pagination>-->
      </el-aside>
      <el-container style="height: 800px; border: 10px solid #eee">
        <el-table id="tableSpaceDetail" :data="dataTableSpaceDetail">
          <el-table-column
              label="交易主体"
              prop="company"
              width="250">
          </el-table-column>
          <el-table-column
              label="交易数量"
              prop="amount"
              width="100">
          </el-table-column>
          <el-table-column
              label="交易频次"
              prop="trasum"
              width="100">
          </el-table-column>
        </el-table>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {getSpaceDetail, getSpaceGranularity} from "@/api/part1/acpassTask";

export default {
  name: "tabSpaceGranularity",
  data() {
    return {
      dataTableSpaceGranularity: [],
      totalTableSpace: 0,
      dataTableSpaceDetail: [],
    }
  },
  created() {
    const id = this.$router.currentRoute.params.id;
    this.getResultSpaceGranularity(id, 1, 10);
  },
  mounted() {
    document.getElementById("tableSpaceDetail").style.display = "none";
  },
  methods: {
    getResultSpaceGranularity(taskId, currentPage = 1, pageSize = 10) {
      getSpaceGranularity(taskId, currentPage, pageSize).then(res => {
        this.dataTableSpaceGranularity = res.data.data.reslist
        this.totalTableSpace = res.data.data.total
      }).catch(err => {
        console.log(err)
      })
    },
    onClickTableSpace(row) {
      this.getResultSpaceDetail(row.platform, row.category, 1, 10)
    },
    getResultSpaceDetail(platform, category, currentPage = 1, pageSize = 10) {
      getSpaceDetail(platform, category, currentPage, pageSize).then(res => {
        this.dataTableSpaceDetail = res.data.data.reslist
        // this.totalTableDetail = res.data.data.total
        document.getElementById("tableSpaceDetail").style.display = "block"
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>

</style>