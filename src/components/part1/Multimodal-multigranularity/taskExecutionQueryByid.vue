<template>
  <div class="dormitory">
        <div class="title">
      <div style="display: inline-block">元数据查询（通过ID）</div>
    </div>
    <div class="searchWord">
      <el-input v-model="search" style="display: inline-block; width: 1000px" placeholder="请输入搜索ID，例如4"></el-input>
      <el-button type="primary" @click="searchTask" style="width: 162px">查询</el-button>
    </div>
    
    <div class="dormitoryData">
      <el-table
        ref="dormitoryTable"
        :data="tables"
        tooltip-effect="dark"
        stripe
        style="width: 100%">

        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column label="任务ID"  prop="id" width = "60"></el-table-column>
        <el-table-column label="元任务ID" prop="taskId">
        </el-table-column>
        <el-table-column label="完成时限" prop="timeLimit" >
        </el-table-column>
        <el-table-column label="完成时间" prop="solveTime" >
        </el-table-column>
        <el-table-column label="是否异常" prop="isException" width = "60">
        </el-table-column>
        <el-table-column label="异常代码" prop="exceptionCode">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  //import {getTansactionData} from "@/api/part1/transactionProject";
import {taskExecutionQueryByid} from "@/api/part1/Multimodal-multigranularity";

 // import $ from 'jQuery'
  export default {

    data () {
      return {
        tables: [],
        search: '',
     }
  },
  //在这里调用ajax请求方法
    created(){
    },

  computed: {
     
    },
    methods: {
            getData(){
                // 获取表格数据
               console.log("获取搜索数据")
               var dataConvert = [];
               var URL ='api/solution/'+this.search;
               console.log("URL:"+URL)

               taskExecutionQueryByid(URL).then((res) => {
                 if(res.data.data == '')
                     this.failedSearch();

                dataConvert = res.data.data;
                for(var i = 0;i<dataConvert.length;i++){

                  if(dataConvert[i].isException) // true
                    dataConvert[i].isException = "是"
                  else // false
                    dataConvert[i].isException = "否"
                }
                this.tables = dataConvert
                
                if(res.data.data != ''){
                this.$message({
                 message: '查询成功！',
                 type: 'success'
               }); }       
               
               }).catch(()=>{
                    console.log("modalityQuery fail")
                });

            } ,
         // 新增监控任务
          searchTask(){
            this.getData()
          },

          // 请求失败
          failedSearch(){
            console.log*("成功调用")
            this.$message.error('没有该ID相关信息，请核实ID！');
          }

    }
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
</style>