<template>
  <div class="dormitory">
        <div class="title">
      <div style="display: inline-block">多模态 分配列表</div>
    </div>
    
    <div class="dormitoryData">
      <el-table
        ref="dormitoryTable"
        :data="tables"
        tooltip-effect="dark"
        stripe
        style="width: 100%">

        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column label="序号"  prop="taskId" width = "60"></el-table-column>
        <el-table-column label="模态任务名称" prop="taskName">
        </el-table-column>
        <el-table-column label="agentNum" prop="agentNum" >
        </el-table-column>
        <el-table-column label="模态ID" prop="modalityId" >
        </el-table-column>
        <el-table-column label="模态名称" prop="modalityName">
        </el-table-column>
      </el-table>
      <div class = "textExplain" style="margin-top:30px; margin-bottom:30px;">
      <span >*如果暂无数据，说明所有模态均已处理完毕，处理结果请看【监管任务】页面中【机器模态分布】</span>
      <el-link type="primary" @click="solveResult">处理结果</el-link>
      </div>
      <div class = "buttonEnd">
      <el-button type="success" @click="backFrontPage">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  //import {getTansactionData} from "@/api/part1/transactionProject";
import {moAllocation} from "@/api/part1/Multimodal-multigranularity";
 // import $ from 'jQuery'
  export default {
    data () {
      return {
        dormitory: [],
        search: '',
        dialogTableVisible: false,
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
               console.log("获取表格数据222")

               moAllocation().then((res) => {
                this.dormitory = res.data.data;
                console.log("传入数据" + res.data.data)
                }).catch(()=>{
                    console.log("modalityAllocation  fail")
                });
            } ,
            // 查看详情 页面跳转
            solveResult(){
                this.$router.push("/taskQuery");  
            },
            // 关闭页面 dialogAllocationVisible
            backFrontPage(){
            this.$parent.$parent.dialogAllocationVisible = false
            this.$parent.$parent.getData()
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
.buttonEnd{
    text-align: center;
}
</style>