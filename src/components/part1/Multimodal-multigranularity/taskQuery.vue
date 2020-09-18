<template>
  <div class="dormitory" id="diceng">
        <div class="title">
      <div style="display: inline-block; margin-bottom:20px" >监管任务查询列表</div>
    </div>

    <div class="searchWord" style="margin-bottom:20px">

      <el-autocomplete
      class="inline-input"
      v-model="state1"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
      style="width:600px"
    ></el-autocomplete>

      <el-button type="primary" @click="searchTask_btn" style="margin-left:29px;margin-right:14px;">搜索</el-button>
      <el-dialog title="搜索结果"
      :visible.sync="searchTableVisible" center :append-to-body='true'
      :lock-scroll="false" width="60%"
      :close-on-click-modal="false"
      >
      <taskSearch ref="taskSearch" :searchData = this.state1></taskSearch>
      </el-dialog>

      <el-button type="primary" @click="addNewTask" style="margin-left:15px;margin-right:14px">添加新任务</el-button>
      <el-dialog title="添加新任务"
      :visible.sync="dialogTableVisible" center :append-to-body='true'
      :lock-scroll="false" width="30%"
      :close-on-click-modal="false"
      >
      <taskInput></taskInput>
      </el-dialog>
      <el-button type="primary" @click="allocateTask" style="margin-left:15px;margin-right:14px">执行分配任务</el-button>
      <el-link type="primary" icon="el-icon-question" @click="userHelp">首次使用，查看用户使用说明</el-link>
      <el-dialog title="用户使用说明"
      :visible.sync="userHelpVisible" center :append-to-body='true'
      :lock-scroll="false" width="60%"
      :close-on-click-modal="false"
      >
      <userQuery></userQuery>
      </el-dialog>

    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="用户使用帮助手册" name="third" lazy>
      <userQuery></userQuery>
      </el-tab-pane>

    <el-tab-pane label="表格视图" name="first" lazy>
        <div class="dormitoryData" v-loading="loading" element-loading-text="加载中">
      <el-table
        ref="dormitoryTable"
        :data="dormitory.slice((currentPage-1)*PageSize,currentPage*PageSize)"
        tooltip-effect="dark"
        stripe
        style="width: 100%"
        border :cell-style="columnStyle"
        >

        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column label="序号"  prop="id" width = "60"></el-table-column>
        <el-table-column label="监管任务名称" prop="name">
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" >
        </el-table-column>
        <el-table-column label="修改时间" prop="gmtModified" >
        </el-table-column>
        <el-table-column label="任务优先级" prop="priority" width = "60">
        </el-table-column>
        <el-table-column label="任务执行时间" prop="workingTime" width = "60">
        </el-table-column>
        <el-table-column label="开始时间" prop="startTime">
        </el-table-column>
        <el-table-column label="结束时间" prop="endTime">
        </el-table-column>
        <el-table-column label="人模态分布" prop="humanUse" width = "80">
        </el-table-column>
        <el-table-column label="机器模态分布数" prop="agentNum" width = "80" >
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
      </el-tab-pane>

    <el-tab-pane label="流程图视图" name="second" lazy>
      * 1.将鼠标悬空在任务节点上方，可显示详细任务信息 2.可拖动节点方便查看
      <method1 ref="method1_child"></method1>
      </el-tab-pane>
  </el-tabs>
    </div>

  </div>
</template>

<script>
  //import {getTansactionData} from "@/api/part1/transactionProject";
import {taskQuery,taskAllocation,searchTask} from "@/api/part1/Multimodal-multigranularity";
import taskInput from "@/components/part1/Multimodal-multigranularity/taskInput";
import userQuery from "@/components/part1/Multimodal-multigranularity/useFunction/taskQueryUse";
import method1 from "@/components/part1/transactionProject/taskDictionary/method1";
import taskSearch from "@/components/part1/Multimodal-multigranularity/taskSearch";


 // import $ from 'jQuery'
  export default {
    inject:['reload'],
    components: {
      taskInput,method1,userQuery,taskSearch
    },

    data () {
      return {
        dormitory: [],
        taskLists:[],
        state1:'',
        searchData :'',
        dialogTableVisible: false,
        searchTableVisible: false,
        userHelpVisible:false,
        activeName:'first',
         // 默认显示第几页
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:100,
      // 个数选择器（可修改）
      pageSizes:[5,10],
      // 默认每页显示的条数（可修改）
      PageSize:10,
        }
  },
  //在这里调用ajax请求方法
    created(){
      this.getData();
    },

    methods: {
      loadAll() {
        // 获取表格数据
               console.log("获取表格数据")
               var dataConvert = [];
               var taskNames = [];
               taskQuery().then((res) => {
                dataConvert = res.data.data;
                for(var i = 0;i<dataConvert.length;i++){
                    var taskName = {};
                    taskName = {"value":dataConvert[i].name};
                    taskNames.push(taskName);
                } 
                }).catch(()=>{
                    console.log("taskQuery fail")
                });        
                return taskNames;     
                
      },
      // 搜索 从服务器获得数据
      querySearch(queryString, cb) {
        var taskLists = this.taskLists;
        var results = queryString ? taskLists.filter(this.createFilter(queryString)) : taskLists;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (taskName) => {
          return (taskName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      // 搜索按钮
      searchTask_btn(){
        this.searchData = this.state1;
        console.log("state1:" + this.state1 + "searchData:" + this.searchData)
        this.searchTableVisible = true; 
        this.$refs.taskSearch.getSearchData(this.state1);
      },
      // 用户手册 弹窗
      userHelp(){
        this.userHelpVisible = true;
      },
            getData(){
                // 获取表格数据
               console.log("获取表格数据")
               var dataConvert = [];
               taskQuery().then((res) => {
                dataConvert = res.data.data;
                for(var i = 0;i<dataConvert.length;i++){
                  var data = this.timestampToTime(dataConvert[i].gmtCreate)
                  dataConvert[i].gmtCreate = data

                  data = this.timestampToTime(dataConvert[i].gmtModified)
                  dataConvert[i].gmtModified = data

                  data = this.timestampToTime(dataConvert[i].startTime)
                  dataConvert[i].startTime = data

                  data = this.timestampToTime(dataConvert[i].endTime)
                  dataConvert[i].endTime = data

                  if(dataConvert[i].humanUse) // true
                    dataConvert[i].humanUse = "是"
                  else // false
                    dataConvert[i].humanUse = "否"
             }
                this.dormitory = dataConvert;
                }).catch(()=>{
                    console.log("getTransactionData fail")
                });                       
            } ,
            // 转换时间戳
            timestampToTime (cjsj) {
              var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + '-'
              var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
             var D = date.getDate() + ' '
             var h = date.getHours() + ':'
             var m = date.getMinutes() + ':'
             var s = date.getSeconds()
             return Y+M+D+h+m+s
    },

         // 新增监控任务
          addNewTask(){
            this.dialogTableVisible=true;
          },
          // 获得任务流程图展示
          getTaskMap(){
            this.taskMapVisible = true;
          },

          // 分配任务
          allocateTask(){
            this.$confirm('是否确认进行任务分配', '提示', {
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
        });
          },
          // 发送get请求--getAllocateTask
          getAllocateDate(){

                taskAllocation().then((res) => {
                console.log("传入数据allocateTask")
                if(res.data.data.length === 0){
               this.$message({
               type: 'warning',
               message: '当前无需要分配的任务!'
          });
                }
                else{
                this.$message({
                 type: 'success',
                  message: '任务分配已完成!'
          });
                }
                }).catch(()=>{
                    console.log("taskAllocation fail")
                });
          },
// 分页
    // 每页显示的条数
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
          // 关闭弹窗
          closeDialog(){
            console.log*("成功调用")
            this.dialogTableVisible = false;
          },
          // 分页激活调用
          handleClick(tab, event) {
        console.log(tab, event);
        if(this.activeName == 'second'){
            //this.$refs.method1_child.getData();
    }
      },
      // 刷新当前页面
      reloadPage(){
        this.reload();
      }

    },
    mounted() {
      this.taskLists = this.loadAll();
      let tiankong= document.getElementById("diceng");
      tiankong.style.height=window.innerHeight+"px"

      console.log(tiankong.style.height)
      let announcement=document.getElementById("announcement");
      console.log(tiankong)
    },
  }
</script>
<style>
.dormitory{
  width: 100%;
  height: 800px;
}
.dormitoryData{
  width: 100%;
  height: 600px;
}
.searchWord span{
  float: left;
  text-align:center;
}

</style>
