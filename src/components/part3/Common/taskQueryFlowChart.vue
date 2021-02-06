<template>
<div>
  <el-dialog title="任务信息反馈"
             :visible.sync="dialogTableVisible" center :append-to-body='true'
             :lock-scroll="false" width="30%"
             :close-on-click-modal="false">
    <taskInputFormChange :taskin="taskin"></taskInputFormChange>
  </el-dialog>
  <div>
    <el-button type="primary" @click="allocateTask" style="margin-left:15px;margin-right:14px">执行分配任务</el-button>
    <el-button type="primary" @click="changeform12" style="margin-left:15px;margin-right:14px">表格视图</el-button>
    <el-button type="primary" @click="changeform21" style="margin-left:15px;margin-right:14px">流程图视图</el-button>
  </div>

  <div id="echart1">

    * 1.将鼠标悬空在任务节点上方，可显示详细任务信息 2.可拖动节点方便查看
    <method1 ref="method1_child" ></method1>
  </div>

    <div id="form" style="display: none">
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



        <el-table-column label="商品名称" prop="commodityName">
        </el-table-column>
        <el-table-column label="任务状态" prop="workStatus">
        </el-table-column>

        <el-table-column
                label="模态粒度补充"
                fixed="right"
                min-width="180"
            >
          <template slot-scope="scope">
            <el-button @click="changetask(scope)" type="text" size="small"  >属性修改</el-button>
          </template>
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

import method1 from "@/components/part1/transactionProject/taskDictionary/method1";
import {getTaskApi} from "@/api/part1/transactionProject";
import {taskQuery,teamform,taskAllocation} from "@/api/part1/Multimodal-multigranularity";
import taskInputFormChange from "@/components/part1/Multimodal-multigranularity/taskInputFormChange";
/*
*         <el-table-column
                label="推荐主被动模态"
                fixed="right"
                min-width="180" porp="model">

        </el-table-column>
        <el-table-column label="属于联盟" prop="team" width="60">
        </el-table-column>        <el-table-column label="人模态分布" prop="humanUse" width="80">
        </el-table-column>
        <el-table-column label="机器模态分布数" prop="agentNum" width="80">
        </el-table-column>

*
* */
export default {
  name: "taskQueryFlowChart",
  components: {
    method1,
    taskInputFormChange
  },
  mounted () {

      //  执行echarts方法
      this.getData();

  },
  created() {
  },
  data() {
    return {

      dormitory: [],
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:100,
      // 个数选择器（可修改）
      pageSizes:[5,10],
      // 默认每页显示的条数（可修改）
      PageSize:10,
      dialogTableVisible: false,
      taskin: {
        changeflag:
        Number.NEGATIVE_INFINITY
      },
    }
  },
  methods: {

    changetask(scope) {
      this.taskin = scope.row
      this.taskin.changeflag = this.taskin.id;

      this.addNewTask1()
    },
    addNewTask1() {

      this.dialogTableVisible = true;
      console.log("aaa")
    },
    getData1(){
      // 获取表格数据
      console.log("获取表格数据")
      // var dataConvert = [];
      taskQuery().then((res) => {
        console.log(res.data.data)
        this. dealwithData(res.data.data)
      }).catch(()=>{
        console.log("getTransactionData fail")
      });
    } ,
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize=val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage=1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage=val
    },

    getData(){
      getTaskApi().then((res) => {
        var input = res.data;
        this.dealwithData(input)
  console.log(input)
      }).catch(()=>{
        console.log("getTaskApi fail")
      });
    },
    changeform12()
    {
      document.getElementById("echart1").style.display="none";
      document.getElementById("form").style.display="block";
      this.getData1()

    },
    changeform21()
    {
      document.getElementById("form").style.display="none";
      document.getElementById("echart1").style.display="block";


    },
    dealwithData(res) {
     // console.log("aa")
      let dataConvert = [];
      dataConvert = res;
      //console.log("aa")
      this.totalCount = dataConvert.length
     // console.log(dataConvert.length)
      for (let i = 0; i < dataConvert.length; i++) {


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
      console.log( this.dormitory)
      //this.loading = false;
    },
    // 分配任务
    allocateTask(){
      taskAllocation().then(res => {
   console.log(res)
      }).catch(err => {
        console.log(err)

      })
    }
     /* this.$confirm('是否确认进行任务分配', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getAllocateDate();

        this.$message({
          type: 'success',
          message: '已执行分配!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });*/

  }
}

</script>

<style scoped>

</style>