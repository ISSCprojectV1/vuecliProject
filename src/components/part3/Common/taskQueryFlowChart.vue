<template>
  <div>
    <el-dialog title="任务信息反馈"
               :visible.sync="dialogTableVisible" center :append-to-body='true'
               :lock-scroll="false" width="30%"
               :close-on-click-modal="false">
      <taskInputFormChange :taskin="taskin"></taskInputFormChange>
    </el-dialog>
    <el-dialog title="操作员设置"
               :visible.sync="dialogTableVisible2" center :append-to-body='true'
               :lock-scroll="false" width="30%"
               :close-on-click-modal="false">
      <operatorChange :taskin="taskin2" :operatorin="operatorin" :modity="modity"></operatorChange>
    </el-dialog>
    <el-dialog title="任务信息查看"
               :visible.sync="dialogTableVisible3" center :append-to-body='true'
               :lock-scroll="false" width="30%"
               :close-on-click-modal="false">
      <taskInputFormShow :taskin="taskin3"></taskInputFormShow>
    </el-dialog>
    <div>
      <el-row>
        <el-col :span="this.admintrue?6:12">
          <el-button class="elbun" @click="changeform12">表格视图</el-button>
        </el-col>
        <el-col :span="this.admintrue?6:12">
          <el-button class="elbun" @click="changeform21">流程图视图</el-button>
        </el-col>
        <el-col :span="this.admintrue?6:0">
          <el-button class="elbun" @click="changeform3" v-if="this.admintrue">操作员列表</el-button>
        </el-col>
        <el-col :span="this.admintrue?6:0">
          <el-button class="elbun" @click="changeOperator('new')" v-if="this.admintrue">新增操作员</el-button>
        </el-col>
      </el-row>

    </div>
    <p></p>
    <div>
      <div id="echart1">
        <div>
          * 1.将鼠标悬空在任务节点上方，可显示详细任务信息 2.可拖动节点方便查看
        </div>
        <p></p>
        <method1 ref="method1_child"></method1>
      </div>

      <div id="form2">
        <div>
          任务等待队列
        </div>
        <el-table
            :header-cell-style="headcell"
            ref="dormitoryTable2"
            :data="dormitory2.slice((currentPage-1)*PageSize,currentPage*PageSize)"
            tooltip-effect="dark"
            stripe
            style="width: 100%"
            border>

          <el-table-column type="selection" min-width="60"></el-table-column>
          <el-table-column label="序号" prop="id" min-width="60"></el-table-column>
          <el-table-column label="监管任务名称" prop="name" min-width="60">
          </el-table-column>

          <el-table-column label="任务优先级" prop="priority" min-width="60">
          </el-table-column>
          <el-table-column label="任务执行时间" min-width="60">
            <template slot-scope="scope">

            <span>
                    {{ scope.row.workingTime / 3600000 + "小时" }}
                  </span>

            </template>
          </el-table-column>
        </el-table>

        <el-table-column label="在线/离线" >
          <template slot-scope="scope">
            {{ scope.row.algoStatus==0?"离线":"在线" }}

          </template>
        </el-table-column>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="pageSizes"
                       :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="totalCount2">
        </el-pagination>
      </div>
    </div>
    <div id="form3" style="display: none">

      <el-table
          v-if="this.admintrue"
          ref="dormitoryTable3"
          :data="modalitydata.slice((currentPage-1)*PageSize,currentPage*PageSize)"
          tooltip-effect="dark"
          stripe
          style="width: 100%"
          :header-cell-style="headcell"
          border
      >


        <el-table-column label="序号" prop="id" width="60">
        </el-table-column>
        <el-table-column label="操作员名称" prop="name">
        </el-table-column>

        <el-table-column label="当前任务编号" prop="taskId">
          <template slot-scope="scope">
            <el-link type="primary">
              <div @click="gotoDetail(scope.row)">
                {{ scope.row.taskId }}
              </div>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
            label="操作员设置"

        >
          <template slot-scope="scope">
            <el-button @click="   changeOperator(scope.row)" type="text" size="small">操作员修改</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="pageSizes"
                     :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="totalCount3">
      </el-pagination>
      <el-table
          v-if="usertrue"
          :show-header="false"
          :data="tabledata3"

          border

          style="width: 60%;margin: auto"
      >
        <el-table-column prop="neirong" label="ID"></el-table-column>
        <el-table-column prop="shuzhi"></el-table-column>

      </el-table>
    </div>
    <div id="form" style="display: none">
      <el-table
          ref="dormitoryTable"
          :data="dormitory.slice((currentPage-1)*PageSize,currentPage*PageSize)"
          tooltip-effect="dark"
          stripe
          style="width: 100%"
          :header-cell-style="headcell"
          border>

        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column label="序号" prop="id" width="60"></el-table-column>
        <el-table-column label="监管任务名称" prop="name">
        </el-table-column>

        <el-table-column label="任务优先级" sortable :sort-orders="['ascending', 'descending',null]" :sort-by="['priority']"
                         prop="priority" width="60">

        </el-table-column>

        <el-table-column label="任务执行时间" width="60">
          <template slot-scope="scope">

            <span>
                    {{ scope.row.workingTime / 3600000 + "小时" }}
                  </span>

          </template>
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
            <el-button @click="changetask(scope)" type="text" size="small">属性修改</el-button>
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
/*
        <el-table-column label="是否被占用"   prop="allocation" width="60">

    </el-table-column>
* */

import method1 from "@/components/part1/transactionProject/taskDictionary/method1";
import {getTaskApi} from "@/api/part1/transactionProject";
import {setToken, getToken, setUserTrue, getUserTrue, getRole, getAdminTrue} from "@/utils/auth"
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
    taskInputFormChange,
    taskInputFormShow,
    operatorChange

  },
  inject: ['reload'],
  mounted() {

    //  执行echarts方法
    this.getData();
    this.getData1();
    this.getData2();
    console.log(getAdminTrue())
    if (getAdminTrue()||getRole()=="OMS") {

      this.admintrue = true
      this.usertrue = false
      this.modality()
    } else {

      this.admintrue = false
      this.usertrue = true
    }

    console.log(this.admintrue)
  },
  created() {

    getAllUsers().then((res) => {
      console.log(res.data.data)
      let data = res.data.data
      this.allusers = data
      this.operatorin = data


    }).catch(() => {
      console.log("getallusers fail")
    });
    let data = "/getModalityByUserId/" + getToken()
    getModalityByUserId(data).then((res) => {
      console.log(res)
      if (res.data.data) {
        this.dealwithOperatorData(res.data.data)
      }

    }).catch(() => {
      console.log("getallusers fail")
    });
    //  this.getData1()
  },

  data() {
    return {
      tabledata3: [],
      usertrue: false,
      admintrue: false,
      prioritychoose: [1, 2, 3],
      caozuoyuankey: [],
      caozuoyuanvalue: [],
      modalitydata: [],
      dormitory: [],
      modity: [],
      dormitory2: [],
      dorshow: [],
      currentPage: 1,
      totalCount2: 10,
      totalCount3: 10,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 100,
      // 个数选择器（可修改）
      pageSizes: [5, 10],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      taskin: {
        changeflag:
        Number.NEGATIVE_INFINITY
      },
      allusers: [],
      taskin2: [],
      taskin3: [],
      operatorin: []
    }
  },
  methods: {
    headcell(){
      return {
        'background-color': '#dfdfdf',
        'color': 'rgb(96, 97, 98)',
        'font-weight':'bold',
        'font-size':'18px'
      }
    },
    modality(scope) {
      modality().then((res) => {
        console.log(res.data.data)
        this.dealwithData3(res.data.data)


      }).catch(() => {
        console.log("getTransactionData fail")
      });
    },
    changetask(scope) {
      this.taskin = scope.row
      this.taskin.changeflag = this.taskin.id;

      this.addNewTask1()
    },
    getData2() {
      getReadyQueue().then((res) => {
        console.log(res.data.data)
        this.dealwithData2(res.data.data)
      }).catch(() => {
        console.log("getTransactionData fail")
      });
    },
    addNewTask1() {
      console.log(this.taskin)
      this.dialogTableVisible = true;

    },
    gotoDetail(res) {
      this.dialogTableVisible3 = true;
      console.log(res)
      console.log(res.taskId)
      console.log(this.dorshow)
      if (res.taskId) {
        let dor = []
        console.log(this.dormitory)
        dor = this.dormitory
        for (let i = 0; i < dor.length; i++) {
          if (dor[i].id == res.taskId) {
            this.taskin3 = dor[i]
            console.log("aaa")
            console.log(this.taskin3)
            break;
          }
        }
      }
    },
    changeOperator(res) {
      if (res != 'new') {
        let data = []
        this.modity = res
        console.log(res)
        data.name = res.name
        this.taskin2 = data

        console.log(this.taskin2.name)
      } else {
        let data = []
        data.name = ''
        this.taskin2 = data
        this.modity = null
        console.log(this.modity)
        console.log(this.taskin2.name)
      }
      this.dialogTableVisible2 = true;

    },

    getData1() {
      // 获取表格数据
      console.log("获取表格数据")
      // var dataConvert = [];
      taskQuery().then((res) => {
        console.log(res.data.data)
        this.dealwithData(res.data.data)
      }).catch(() => {
        console.log("获取表格数据 fail")
      });
    },
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
      getTaskApi().then((res) => {
        var input = res.data;
        this.dealwithData(input)
        console.log("gettask")
        console.log(input)
      }).catch(() => {
        console.log("getTaskApi fail")
      });
    },
    changeform12() {
      document.getElementById("echart1").style.display = "none";
      document.getElementById("form").style.display = "block";
      document.getElementById("form2").style.display = "none";
      document.getElementById("form3").style.display = "none";


    },
    changeform21() {
      document.getElementById("form").style.display = "none";
      document.getElementById("echart1").style.display = "block";
      document.getElementById("form2").style.display = "block";
      document.getElementById("form3").style.display = "none";

    },
    changeform3() {
      document.getElementById("form").style.display = "none";
      document.getElementById("form2").style.display = "none";
      document.getElementById("echart1").style.display = "none";
      document.getElementById("form3").style.display = "block";
    },
    dealwithData(res) {
      // console.log("aa")
      let dataConvert = [];
      dataConvert = res;
      //console.log("aa")
      this.totalCount = dataConvert.length
      // console.log(dataConvert.length)
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
      this.dormitory = dataConvert;
      this.dorshow = dataConvert
      console.log(this.dormitory)
      console.log(this.dorshow)
      //this.loading = false;
    },
    dealwithData2(res) {
      // console.log("aa")
      let dataConvert = [];
      dataConvert = res;
      //console.log("aa")
      this.totalCount2 = dataConvert.length
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
          dataConvert[i].workStatus = "任务正常"
        if (dataConvert[i].workStatus === 2) // true
          dataConvert[i].workStatus = "任务出现异常"
      }
      dataConvert.reverse()
      this.dormitory2 = dataConvert;
      console.log(this.dormitory2)
      //this.loading = false;
    },
    dealwithOperatorData(res) {

      console.log(res)
      let keys = [];
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

        //    let obj1 = JSON.parse(neirong);
        //  console.log(obj1)


        //   console.log(  this.tabledata3)
        //     console.log(keys.length)
      }
    },
    dealwithData3(res) {
      this.modalitydata = res
      this.totalCount3 = this.modalitydata.length
      for (let i = 0; i < this.modalitydata.length; i++) {
        if (this.modalitydata[i].allocation) // true
          this.modalitydata[i].allocation = "是"
        else // false
        {
          this.modalitydata[i].allocation = "否"
          // this.modalitydata[i].id=null
          this.modalitydata[i].taskId = "无"
        }


        /*

        */

      }
    },
    // 分配任务
    allocateTask() {
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
.elbun {
  font-size: 16px;
  align-items: center;
  justify-content: center;
}
.headcell{
background-color: #dfdfdf;
color: rgb(96, 97, 98);
font-weight:bold;
font-size:16px;
}
</style>