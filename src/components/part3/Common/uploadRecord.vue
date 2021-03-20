<template>
  <div id="base">
    <el-table :data="dataTable">
      <el-table-column prop="fileName" label="文件名称"></el-table-column>
      <el-table-column prop="auctionId" label="所属拍卖"></el-table-column>
      <el-table-column prop="gmtCreated" label="上传时间"></el-table-column>
      <el-table-column prop="filePath" label="文件路径"></el-table-column>
      <el-table-column prop="status" label="文件状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '1'">未审核</span>
          <span v-else-if="scope.row.status === '2'">审核通过</span>
          <span v-else>已迁移</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getUploadDetail} from "@/api/part1/acpassTask";

export default {
  name: "uploadRecord",
  data() {
    return {
      dataTable: [],
      total: 0
    }
  },
  created() {
    this.$emit("label", "upload");
    this.queryUploadDetail(1, 10);
  },
  methods: {
    queryUploadDetail(currentPage = 1, pageSize = 10) {
      getUploadDetail(currentPage, pageSize).then(res => {
        this.dataTable = res.data.list
        this.dataTable.map((obj) => {
          this.$set(
              obj, 'gmtCreated', obj.gmtCreated.split('.')[0].replace('T', ' ')
          )
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    let base = document.getElementById("base");
    base.style.height = window.innerHeight + "px"
  }
}
</script>

<style scoped>

</style>