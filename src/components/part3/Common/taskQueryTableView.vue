<template>
  <div>
    <el-dialog title="添加新任务"
               :visible.sync="dialogTableVisible" center :append-to-body='true'
               :lock-scroll="false" width="30%"
               :close-on-click-modal="false">
      <taskInput :taskin="taskin"></taskInput>
    </el-dialog>
    <div class="dormitoryData" v-loading="loading" element-loading-text="加载中">
      <el-button type="primary" @click="changetask(scope)" style="margin-left:29px;margin-right:14px;">商品粒度补全</el-button>
      <el-button type="primary" @click="changetime(scope)" style="margin-left:29px;margin-right:14px;">时间粒度补全</el-button>
      <el-button type="primary" @click="changespaceResult( )"  style="margin-left:29px;margin-right:14px;">模态粒度补全</el-button>
      <el-table
          ref="dormitoryTable"
          :data="dormitory.slice((currentPage-1)*PageSize,currentPage*PageSize)"
          tooltip-effect="dark"
          stripe
          style="width: 100%"
          border>

        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column label="序号" prop="id" width="60"></el-table-column>
        <el-table-column label="监管任务名称" prop="name">
        </el-table-column>

        <el-table-column label="任务优先级" prop="priority" width="60">
        </el-table-column>
        <el-table-column label="任务执行时间" prop="workingTime" width="60">
        </el-table-column>
        <el-table-column label="属于联盟" prop="team" width="60">
        </el-table-column>

        <el-table-column label="人模态分布" prop="humanUse" width="80">
        </el-table-column>
        <el-table-column label="机器模态分布数" prop="agentNum" width="80">
        </el-table-column>
        <el-table-column label="时间粒度（天）" prop="timeadvise" width="80">
          <template slot-scope="scope">
            <el-link :disabled="setgoto(scope)">
              <div @click="goToprice()">
                {{ scope.row.timeadvise }}
              </div>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="主被动模态空间粒度" prop="content">
          <template slot-scope="scope">
            <el-link :disabled="setdis(scope)" type="primary">
              <div @click="gotoDetail(scope.row.id)">
                {{ scope.row.content }}
              </div>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="commodityName">
        </el-table-column>
        <el-table-column label="任务状态" prop="workStatus">
        </el-table-column>
        <el-table-column
            label="推荐主被动模态"
            fixed="right"
            min-width="180" porp="subtask">

        </el-table-column>

      </el-table>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="pageSizes"
                     :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {changetimeadvise, taskQuery,spaceResult} from "@/api/part1/Multimodal-multigranularity";
import taskInput from "@/components/part1/Multimodal-multigranularity/taskInput";

export default {
  name: "taskQueryTableView",
  components: {
    taskInput
  },
  data() {
    return {
      dormitory: [],
      // 默认显示第几页
      currentPage: 1,
      // 条数选择器（可修改）
      pageSizes: [5, 10],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 100,
      loading: false,
      dialogTableVisible: false,
      taskin: {
        changeflag:
        Number.NEGATIVE_INFINITY
      },
    }
  },
  methods: {
    setgoto(scope) {
      return scope.row.commodityName !== "小麦";
    },
    goToprice() {
      //直接跳转
      this.$router.push('/trade/Multimodal-multigranularity/priceshow');
    },
    setdis(scope) {
      return scope.row.content === "暂时未分配";
    },
    gotoDetail(id) {
      this.$router.push(`/trade/acpassTask/activetask/${id}`);
      console.log(`/trade/acpassTask/activetask/${id}`)
    },
    changetime(data) {
      changetimeadvise().then((res) => {
        this.dealwithData(res)
      }).catch(() => {
        console.log("taskQuery fail")
      });
    },
    changetask(scope) {
      this.taskin = scope.row
      this.taskin.changeflag = this.taskin.id;
      this.addNewTask1()
    },
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
    },
    getData() {
      // 获取表格数据
      console.log("获取表格数据")
      taskQuery().then((res) => {
        this.dealwithData(res)
      }).catch(() => {
        console.log("getTransactionData fail")
      });
    },
    dealwithData(res) {
      let dataConvert = [];
      dataConvert = res.data.data;
      this.totalCount = dataConvert.length
      for (let i = 0; i < dataConvert.length; i++) {
        let data = this.timestampToTime(dataConvert[i].gmtCreate);
        dataConvert[i].gmtCreate = data

        data = this.timestampToTime(dataConvert[i].gmtModified)
        dataConvert[i].gmtModified = data

        data = this.timestampToTime(dataConvert[i].startTime)
        dataConvert[i].startTime = data

        data = this.timestampToTime(dataConvert[i].endTime)
        dataConvert[i].endTime = data

        if (dataConvert[i].humanUse) // true
          dataConvert[i].humanUse = "是"
        else // false
          dataConvert[i].humanUse = "否"
        if (!dataConvert[i].timeadvise) // true
          dataConvert[i].timeadvise = "否"
        if (!dataConvert[i].commodityName) // true
          dataConvert[i].commodityName = "暂无"
        if (!dataConvert[i].content) // true
        {
          dataConvert[i].content = "暂时未分配"
        }

        if (!dataConvert[i].team) // true
        {
          dataConvert[i].team = "暂时未分配"
        }

        if (dataConvert[i].workStatus == null) // true
          dataConvert[i].workStatus = "未分配"
        if (dataConvert[i].workStatus === 0) // true
          dataConvert[i].workStatus = "已分配"
        if (dataConvert[i].workStatus === 1) // true
          dataConvert[i].workStatus = "任务已经执行"
        if (dataConvert[i].workStatus === 2) // true
          dataConvert[i].workStatus = "任务出现异常"
      }
      dataConvert.reverse()
      this.dormitory = dataConvert;
      this.loading = false;
    },
    // 转换时间戳
    timestampToTime(cjsj) {
      const date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      const D = date.getDate() + ' ';
      const h = date.getHours() + ':';
      const m = date.getMinutes() + ':';
      const s = date.getSeconds();
      return Y + M + D + h + m + s
    },
    addNewTask1() {
      this.dialogTableVisible = true;
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.loading = true;
  }
}
</script>

<style scoped>
.dormitoryData {
  width: 100%;
  height: 600px;
}
  .el-table thead{
    color: black;
  }
</style>