<template>
  <div style="width: 100%">
    <el-container style="height: 700px; border: 0.5rem solid #eee">
      <el-aside width="53%" style="border: 0.5rem solid #eee">
        <h2>交易平台监管粒度推荐表</h2>
        <el-table :data="dataTableSpaceGranularity" highlight-current-row @row-click="onClickTableSpace">
          <el-table-column label="平台名称" fixed="left" prop="platform" min-width="180"></el-table-column>
          <el-table-column label="省份" prop="province" min-width="40"></el-table-column>
          <el-table-column label="城市" prop="city" min-width="40"></el-table-column>
          <el-table-column label="商品类型" prop="category" min-width="80"></el-table-column>
          <el-table-column label="关联度" prop="associate" min-width="60">
            <template slot-scope="scope">
              {{ scope.row.associate.toFixed(3) }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            ref="pagination"
            style="text-align: center; margin-top: 0.5rem"
            background
            layout="total, sizes, prev, pager, next"
            @size-change="onSizeChangeSpace"
            @current-change="onPageChangeSpace"
            :total="totalTableSpace"
            :page-sizes="pageSizes"
            :page-size="pageSizeSpace"
            :current-page="currentPageSpace">
        </el-pagination>
      </el-aside>
      <el-container style="border: 0.5rem solid #eee">
        <div id="tableSpaceDetail" style="width: 100%; height: 100%">
          <h2>跨平台用户统计表</h2>
          <el-table :data="dataTableSpaceDetail" style="width: 100%">
            <el-table-column label="交易主体" prop="company" fixed="left" min-width="260"></el-table-column>
            <el-table-column label="交易数目" prop="amount" min-width="80"></el-table-column>
            <el-table-column label="交易频次" prop="trasum" min-width="80"></el-table-column>
          </el-table>
          <el-pagination
              ref="pagination"
              style="text-align: center; margin-top: 0.5rem"
              background
              layout="total, sizes, prev, pager, next"
              @size-change="onSizeChangeDetail"
              @current-change="onPageChangeDetail"
              :total="totalTableDetail"
              :page-sizes="pageSizes"
              :page-size="pageSizeDetail"
              :current-page="currentPageDetail">
          </el-pagination>
        </div>
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
      pageSizes: [5, 10, 20, 50],
      // table space
      dataTableSpaceGranularity: [],
      totalTableSpace: 0,
      pageSizeSpace: 10,
      currentPageSpace: 1,
      // 用于onClickTableSpace
      platform: '',
      category: '',
      // table detail
      dataTableSpaceDetail: [],
      totalTableDetail: 0,
      pageSizeDetail: 10,
      currentPageDetail: 1
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
    // table space
    getResultSpaceGranularity(taskId, currentPage = 1, pageSize = 10) {
      getSpaceGranularity(taskId, currentPage, pageSize).then(res => {
        this.dataTableSpaceGranularity = res.data.data.reslist
        this.totalTableSpace = res.data.data.total
      }).catch(err => {
        console.log(err)
      })
    },
    onSizeChangeSpace(val) {
      this.pageSizeSpace = val;
      this.onPageChangeSpace(1);
    },
    onPageChangeSpace(page) {
      this.currentPageSpace = page;
      const id = this.$router.currentRoute.params.id;
      this.getResultSpaceGranularity(id, this.currentPageSpace, this.pageSizeSpace);
    },
    onClickTableSpace(row) {
      this.platform = row.platform;
      this.category = row.category;
      this.getResultSpaceDetail(row.platform, row.category, 1, this.pageSizeDetail);
    },
    // table detail
    getResultSpaceDetail(platform, category, currentPage = 1, pageSize) {
      getSpaceDetail(platform, category, currentPage, pageSize).then(res => {
        this.dataTableSpaceDetail = res.data.data.reslist
        this.totalTableDetail = res.data.data.total
        document.getElementById("tableSpaceDetail").style.display = "block"
      }).catch(err => {
        console.log(err)
      })
    },
    onSizeChangeDetail(val) {
      this.pageSizeDetail = val;
      this.onPageChangeDetail(1);
    },
    onPageChangeDetail(page) {
      this.currentPageDetail = page;
      this.getResultSpaceDetail(this.platform, this.category, this.currentPageDetail, this.pageSizeDetail);
    }
  }
}
</script>

<style scoped>

</style>