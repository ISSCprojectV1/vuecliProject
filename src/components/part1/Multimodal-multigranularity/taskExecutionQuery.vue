<template>
  <div class="dormitory">
        <div class="title">
      <div style="display: inline-block">元任务执行查询列表</div>
    </div>
    <div class="searchWord">
      <el-input v-model="search" style="display: inline-block; width: 1000px" placeholder="请输入搜索关键词"></el-input>     
    </div>
    
    <div class="dormitoryData">
      <el-table
        ref="dormitoryTable"
        :data="tables"
        tooltip-effect="dark"
        stripe
        style="width: 100%">

        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column label="ID"  prop="id" width = "60"></el-table-column>
        <el-table-column label="任务ID" prop="taskId">
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
import {ExecutionQuery} from "@/api/part1/Multimodal-multigranularity";
 // import $ from 'jQuery'
  export default {

    data () {
      return {
        dormitory: [],
        search: '',
     }
  },
  //在这里调用ajax请求方法
    created(){
      this.getData();
    },

  computed: {
      // 模糊搜索
      tables () {
        
        const search = this.search
        if (search) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.dormitory.filter(data => {
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.dormitory
      }
    },
    methods: {
            getData(){
                // 获取表格数据
               console.log("获取modalityQuery表格数据 步骤一")
               var dataConvert = [];

               ExecutionQuery().then((res) => {
                dataConvert = res.data.data;
                for(var i = 0;i<dataConvert.length;i++){
                  if(dataConvert[i].isException) // true
                    dataConvert[i].isException = "是"
                  else // false
                    dataConvert[i].isException = "否"
                }
                this.dormitory = dataConvert
                console.log("传入4数据" + res.data.data[0].isException)
                }).catch(()=>{
                    console.log("taskExecution fail")
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