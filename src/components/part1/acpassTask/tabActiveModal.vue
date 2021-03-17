<template>
  <div style="width: 100%">
    <el-container style="height: 700px; border: 10px solid #eee">
      <el-aside width="750px" style="border: 10px solid #eee">
        <h2>主动监管名单</h2>
        <el-table :data="dataTableActive" highlight-current-row @row-click="onClickTableActive">
          <el-table-column prop="company" label="交易主体" min-width="250"></el-table-column>
          <el-table-column prop="category" label="商品类型" min-width="70"></el-table-column>
          <el-table-column prop="abnormalValue" label="异常值" min-width="70">
            <template slot-scope="scope">
              <span v-if="Number.isNaN(scope.row.abnormalValue)">无</span>
              <span v-else-if="isAbnormal(scope.row.abnormalValue)" style="color: red">
                    {{ scope.row.abnormalValue.toFixed(3) }}
                  </span>
              <span v-else style="color: green">
                    {{ scope.row.abnormalValue.toFixed(3) }}
                  </span>
            </template>
          </el-table-column>
          <el-table-column label="监管建议" min-width="70">
            <template slot-scope="scope">
              <span v-if="Number.isNaN(scope.row.abnormalValue)"></span>
              <span v-else-if="isAbnormal(scope.row.abnormalValue)">建议监管</span>
              <span v-else>正常</span>
            </template>
          </el-table-column>
          <el-table-column label="信用评分" min-width="70">80</el-table-column>
          <el-table-column label="详细信息" fixed="right" min-width="70">
            <template slot-scope="scope">
              <el-button @click="goToDataQuery(scope.row.company)" type="text" size="small">实体统一</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            ref="pagination"
            style="text-align: center; margin-top: 0.5rem"
            background
            layout="prev, pager, next"
            @current-change="onPageChangeActive"
            :page-size="8"
            :total="totalTableActive">
        </el-pagination>
      </el-aside>
      <el-container style="border: 10px solid #eee">
          <div id="tableCompanyDetail" style="width: 100%; height: 100%">
            <h2>主体交易详情</h2>
            <el-table :data="dataTableDetail" style="width: 100%">
              <el-table-column prop="seller" label="主要交易卖方" min-width="160"></el-table-column>
              <el-table-column prop="buyer" label="主要交易买方" min-width="150"></el-table-column>
              <el-table-column prop="amount" label="交易数" min-width="50"></el-table-column>
            </el-table>
            <el-pagination
                ref="pagination"
                style="text-align: center; margin-top: 0.5rem"
                background
                layout="prev, pager, next"
                :page-size="10"
                @current-change="onPageChangeDetail"
                :total="totalTableDetail"
            >
            </el-pagination>
          </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {getActiveCompanyDetail, getActiveGroup} from "@/api/part1/acpassTask";

export default {
  name: "tabActiveModal",
  data() {
    return {
      // table active group
      dataTableActive: [],
      threshold: 0,
      totalTableActive: 0,
      companySelected: '',
      // table company detail
      dataTableDetail: [],
      totalTableDetail: 0,
    }
  },
  created() {
    const id = this.$router.currentRoute.params.id;
    this.queryActiveGroup(id, 1, 8);
  },
  mounted() {
    document.getElementById('tableCompanyDetail').style.display = 'none'
  },
  methods: {
    // table active group
    queryActiveGroup(taskId, currentPage = 1, pageSize = 8) {
      getActiveGroup(taskId, currentPage, pageSize).then(res => {
        this.dataTableActive = res.data.data.reslist;
        let counter = 1;
        this.dataTableActive.map((obj) => {
          this.$set(obj, 'id', counter++)
        });
        this.threshold = res.data.data.threshold;
        this.totalTableActive = res.data.data.total;
        // 顺便画初始图
        // if(this.dataTableActive[0])
        //  this.gotoDetail(this.dataTableActive[0].company)
      }).catch(err => {
        console.log(err)
      })
    },
    onPageChangeActive(page) {
      const id = this.$router.currentRoute.params.id;
      this.queryActiveGroup(id, page, 8);
    },
    // 用于active table, 比较异常值与阈值并返回是否异常
    isAbnormal(abnormalValue) {
      return abnormalValue >= this.threshold;
    },
    goToDataQuery(company) {
      this.$router.push({
        path: '/trade/dataFusion/dataquery',
        query: {
          data: company
        }
      });
    },
    onClickTableActive(row) {
      document.getElementById('tableCompanyDetail').style.display = 'block';
      this.companySelected = row.company;
      this.queryCompanyDetail(row.company, 1, 10);
    },
    // table company detail
    queryCompanyDetail(company, currentPage = 1, pageSize = 10) {
      getActiveCompanyDetail(company, currentPage, pageSize).then(res => {
        this.dataTableDetail = res.data.data.reslist;
        this.totalTableDetail = res.data.data.total;
      }).catch(err => {
        console.log(err)
      })
    },
    onPageChangeDetail(page) {
      this.queryCompanyDetail(this.companySelected, page, 10);
    }
  }
}
</script>

<style scoped>

</style>