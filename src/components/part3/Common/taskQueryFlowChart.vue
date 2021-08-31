<template>
  <div>
    <el-dialog title="任务属性修改"
               :visible.sync="dialogTableVisible"
               :append-to-body='true'
               :lock-scroll="false"
               width="35%"
               :close-on-click-modal="false">
      <taskInputFormChange :taskin="taskin"></taskInputFormChange>
    </el-dialog>
    <el-dialog title="操作员增改"
               :visible.sync="dialogTableVisible2"
               :append-to-body='true'
               :lock-scroll="false"
               width="30%"
               :close-on-click-modal="false">
      <operatorChange :taskin="taskin2" :operatorin="operatorin" :modity="modity"></operatorChange>
    </el-dialog>
    <el-dialog title="任务信息查看"
               :visible.sync="dialogTableVisible3"
               :append-to-body='true'
               :lock-scroll="false"
               width="30%"
               :close-on-click-modal="false">
      <taskInputFormShow :taskin="taskin3"></taskInputFormShow>
    </el-dialog>

    <!--顶部一排按钮-->
    <div style="margin-bottom: 1rem">
      <el-button-group>
        <el-button @click="showTableView">表格视图</el-button>
        <el-button @click="showEchartsView">流程图视图</el-button>
        <el-button @click="showFormOperator">操作员列表</el-button>
        <el-button @click="changeOperator('new')">新增操作员</el-button>
      </el-button-group>
    </div>

    <!--流程图视图：包括echarts和一个表格-->
    <div>
      <div id="echartsView">
        <p>
          * 1. 将鼠标悬空在任务节点上方，可显示详细任务信息 2. 可拖动节点方便查看
        </p>
        <method1 ref="method1_child"></method1>
      </div>

      <div id="taskTable">
        <div class="title">任务等待队列</div>
        <el-table
            :header-cell-style="getHeaderStylesheet"
            :data="dormitoryTaskTable.slice((currentPageTaskTable-1)*PageSize,currentPageTaskTable*PageSize)"
            tooltip-effect="dark"
            style="width: 100%"
            :row-style="{height: '40px'}"
            :cell-style="{padding:'0px'}">

          <el-table-column type="selection" min-width="25"></el-table-column>
          <el-table-column label="序号" prop="id" min-width="25"></el-table-column>
          <el-table-column label="监管任务名称" prop="name" min-width="150"></el-table-column>
          <el-table-column label="任务优先级" prop="priority" min-width="50"></el-table-column>
          <el-table-column label="任务执行时间" min-width="60">
            <template slot-scope="scope">
            <span>
              {{ scope.row.workingTime / 3600000 + "小时" }}
            </span>
            </template>
          </el-table-column>
        </el-table>

        <!--        <el-table-column label="在线/离线">-->
        <!--          <template slot-scope="scope">-->
        <!--            {{ scope.row.algoStatus == 0 ? "离线" : "在线" }}-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeTaskTable"
            :current-page="currentPageTaskTable"
            :page-sizes="pageSizes"
            :page-size="PageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCountTaskTable"
            style="margin-top: 0.5rem">
        </el-pagination>
      </div>
    </div>

    <!--操作员列表-->
    <div id="operatorList" style="display: none">
      <el-table
          :data="operatorListData.slice((currentPageOperatorList-1)*PageSize,currentPageOperatorList*PageSize)"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="getHeaderStylesheet"
          :row-style="{height: '40px'}"
          :cell-style="{padding:'0px'}">

        <el-table-column label="序号" prop="id" min-width="25"></el-table-column>

        <el-table-column label="操作员名称" min-width="45" prop="name"></el-table-column>

        <el-table-column label="当前任务编号" min-width="60" prop="taskId">
          <template slot-scope="scope">
            <el-link type="primary">
              <div @click="gotoDetail(scope.row)">
                {{ scope.row.taskId }}
              </div>
            </el-link>
          </template>
        </el-table-column>

        <el-table-column label="操作员设置" min-width="45">
          <template slot-scope="scope">
            <el-button @click="changeOperator(scope.row)" type="text">操作员修改</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChangeOperatorList"
          :current-page="currentPageOperatorList"
          :page-sizes="pageSizes"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCountOperatorList"
          style="margin-top: 0.5rem">
      </el-pagination>

      <!--      <el-table-->
      <!--          v-if="usertrue"-->
      <!--          :show-header="false"-->
      <!--          :data="tabledata3"-->
      <!--          border-->
      <!--          style="width: 60%;margin: auto">-->
      <!--        <el-table-column prop="neirong" label="ID"></el-table-column>-->
      <!--        <el-table-column prop="shuzhi"></el-table-column>-->
      <!--      </el-table>-->
    </div>

    <!--表格视图-->
    <div id="tableView" style="display: none">
      <el-table
          :data="dormitoryTableView.slice((currentPageTableView-1)*PageSize,currentPageTableView*PageSize)"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="getHeaderStylesheet"
          :row-style="{height: '40px'}"
          :cell-style="{padding:'2px'}">
        <el-table-column type="selection" min-width="20"></el-table-column>
        <el-table-column label="序号" min-width="25" prop="id"></el-table-column>
        <el-table-column label="监管任务名称" min-width="80" prop="name"></el-table-column>

        <el-table-column label="任务优先级" sortable :sort-orders="['ascending', 'descending',null]" :sort-by="['priority']"
                         prop="priority" min-width="60">
        </el-table-column>

        <el-table-column label="任务执行时间" min-width="60">
          <template slot-scope="scope">
            <span>
              {{ scope.row.workingTime / 3600000 + "小时" }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="商品名称" min-width="45" prop="commodityName"></el-table-column>
        <el-table-column label="任务状态" min-width="45" prop="workStatus"></el-table-column>
        <el-table-column label="模态粒度补充" fixed="right" min-width="60">
          <template slot-scope="scope">
            <el-button @click="changeTask(scope)" type="text">属性修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChangeTableView"
          :current-page="currentPageTableView"
          :page-sizes="pageSizes"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCountTableView"
          style="margin-top: 0.5rem">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import method1 from "@/components/part1/transactionProject/taskDictionary/method1";
import {getToken} from "@/utils/auth"
import {
  taskQuery,
  teamform,
  taskAllocation,
  getReadyQueue,
  modality,
  getAllUsers,
  getModalityByUserId
} from "@/api/part1/Multimodal-multigranularity";
import taskInputFormChange from "@/components/part1/Multimodal-multigranularity/taskInputFormChange";
import taskInputFormShow from "@/components/part1/Multimodal-multigranularity/taskInputFormShow";
import operatorChange from "@/components/part1/Multimodal-multigranularity/operatorChange";

export default {
  name: "taskQueryFlowChart",
  components: {
    method1,
    taskInputFormChange,
    taskInputFormShow,
    operatorChange
  },
  inject: ['reload'],
  data() {
    return {
      tabledata3: [],
      prioritychoose: [1, 2, 3],
      caozuoyuankey: [],
      caozuoyuanvalue: [],
      operatorListData: [],
      dormitoryTableView: [],
      modity: [],
      dormitoryTaskTable: [],
      dorshow: [],
      dialogTableVisible: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      taskin: {
        changeflag: Number.NEGATIVE_INFINITY
      },
      allusers: [],
      taskin2: [],
      taskin3: [],
      operatorin: [],

      // 分页相关
      // 个数选择器（可修改）
      pageSizes: [5, 10, 20, 50],
      // 默认每页显示的条数（可修改）
      PageSize: 10,

      currentPageTableView: 1,
      totalCountTableView: 10,

      currentPageTaskTable: 1,
      totalCountTaskTable: 10,

      currentPageOperatorList: 1,
      totalCountOperatorList: 10,
    }
  },
  mounted() {
    // 执行echarts方法
    this.getTableViewData();
    this.getTaskTableData();
    this.getOperatorListData();
  },
  created() {
    getAllUsers().then((res) => {
      let data = res.data.data
      this.allusers = data
      this.operatorin = data
    }).catch(() => {
      console.log("getAllUsers fail")
    });
    let data = "/getModalityByUserId/" + getToken()
    getModalityByUserId(data).then((res) => {
      if (res.data.data) {
        this.dealWithData(res.data.data)
      }
    }).catch(() => {
      console.log("getAllUsers fail")
    });
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
    changeTask(scope) {
      this.taskin = scope.row
      this.taskin.changeflag = this.taskin.id;
      this.addNewTask1()
    },
    addNewTask1() {
      this.dialogTableVisible = true;
    },
    gotoDetail(res) {
      this.dialogTableVisible3 = true;
      if (res.taskId) {
        let dor = []
        dor = this.dormitoryTableView
        for (let i = 0; i < dor.length; i++) {
          if (dor[i].id == res.taskId) {
            this.taskin3 = dor[i]
            break;
          }
        }
      }
    },
    changeOperator(res) {
      if (res != 'new') {
        let data = []
        this.modity = res
        data.name = res.name
        this.taskin2 = data
      } else {
        let data = []
        data.name = ''
        this.taskin2 = data
        this.modity = null
      }
      this.dialogTableVisible2 = true;
    },
    // 和getTableViewData()冲突
    // getData() {
    //   getTaskApi().then((res) => {
    //     let input = res.data;
    //     this.dealWithTableViewData(input);
    //   }).catch(() => {
    //     console.log("getTaskApi fail")
    //   });
    // },
    getTableViewData() {
      // 获取表格数据
      taskQuery().then((res) => {
        this.dealWithTableViewData(res.data.data)
      }).catch(() => {
        console.log("获取表格数据 fail")
      });
    },
    getOperatorListData() {
      modality().then((res) => {
        this.dealWithOperatorListData(res.data.data)
      }).catch(() => {
        console.log("getTransactionData fail")
      });
    },
    getTaskTableData() {
      getReadyQueue().then((res) => {
        this.dealWithTaskTableData(res.data.data)
      }).catch(() => {
        console.log("getTransactionData fail")
      });
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
      this.currentPageTableView = 1
    },
    handleCurrentChangeTableView(val) {
      this.currentPageTableView = val
    },
    handleCurrentChangeTaskTable(val) {
      this.currentPageTaskTable = val;
    },
    handleCurrentChangeOperatorList(val) {
      // 改变默认的页数
      this.currentPage = val
    },
    showTableView() {
      document.getElementById("echartsView").style.display = "none";
      document.getElementById("tableView").style.display = "block";
      document.getElementById("taskTable").style.display = "none";
      document.getElementById("operatorList").style.display = "none";
    },
    showEchartsView() {
      document.getElementById("tableView").style.display = "none";
      document.getElementById("echartsView").style.display = "block";
      document.getElementById("taskTable").style.display = "block";
      document.getElementById("operatorList").style.display = "none";
    },
    showFormOperator() {
      document.getElementById("tableView").style.display = "none";
      document.getElementById("taskTable").style.display = "none";
      document.getElementById("echartsView").style.display = "none";
      document.getElementById("operatorList").style.display = "block";
    },
    dealWithTableViewData(res) {
      let dataConvert = [];
      dataConvert = res;
      for (let i = 0; i < dataConvert.length; i++) {
        if (dataConvert[i].priority == 0)
          dataConvert[i].priority = "无"
        if (dataConvert[i].humanUse) // true
          dataConvert[i].humanUse = "是"
        else // false
          dataConvert[i].humanUse = "否"
        if (!dataConvert[i].timeadvise) // true
          dataConvert[i].timeadvise = "否"
        if (!dataConvert[i].commodityName) // true
          dataConvert[i].commodityName = "暂无"
        if (!dataConvert[i].content) // true
          dataConvert[i].content = "暂时未分配"
        if (!dataConvert[i].team) // true
          dataConvert[i].team = "暂时未分配"
        if (dataConvert[i].workStatus == null) // true
          dataConvert[i].workStatus = "未分配"
        if (dataConvert[i].workStatus === 0) // true
          dataConvert[i].workStatus = "已分配"
        if (dataConvert[i].workStatus === 1) // true
          dataConvert[i].workStatus = "任务正常"
        if (dataConvert[i].workStatus === 2) // true
          dataConvert[i].workStatus = "任务出现异常"
      }
      dataConvert.reverse();
      this.dormitoryTableView = dataConvert;
      this.dorshow = dataConvert;
      this.totalCountTableView = dataConvert.length;
    },
    dealWithTaskTableData(res) {
      let dataConvert = [];
      dataConvert = res;
      this.totalCountTaskTable = dataConvert.length;
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
          dataConvert[i].workStatus = "任务正常"
        if (dataConvert[i].workStatus === 2) // true
          dataConvert[i].workStatus = "任务出现异常"
      }
      dataConvert.reverse()
      this.dormitoryTaskTable = dataConvert;
    },
    // 用于user权限的界面（见tabledata3），因此暂时无用
    dealWithData(res) {
      let keys = []
      let value = []
      let neirong = {}
      for (let property in res) {
        keys.push(property)
        value.push(res[property])
        neirong["neirong"] = property
        neirong["shuzhi"] = res[property]
        if (property == "id") {
          let jsonObj = {"neirong": "序号", "shuzhi": res[property]};
          this.tabledata3.push(jsonObj)
        }
        if (property == "name") {
          let jsonObj = {"neirong": "操作员名称", "shuzhi": res[property]};
          this.tabledata3.push(jsonObj)
        }
        if (property == "taskId") {
          let jsonObj = {"neirong": "当前任务编号", "shuzhi": res[property]};
          this.tabledata3.push(jsonObj)
        }
      }
    },
    dealWithOperatorListData(res) {
      this.operatorListData = res
      this.totalCountOperatorList = this.operatorListData.length
      for (let i = 0; i < this.operatorListData.length; i++) {
        if (this.operatorListData[i].allocation) // true
          this.operatorListData[i].allocation = "是"
        else // false
        {
          this.operatorListData[i].allocation = "否"
          this.operatorListData[i].taskId = "无"
        }
      }
    },
    allocateTask() {
      taskAllocation().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.title {
  height: 40px;
  text-align: left;
  font-size: 14px;
  line-height: 40px;
  padding-left: 16px;
  font-weight: bold;
}
</style>