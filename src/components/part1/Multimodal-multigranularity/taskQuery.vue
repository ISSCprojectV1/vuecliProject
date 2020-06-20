<template>
  <div class="dormitory">
        <div class="title">
      <div style="display: inline-block; margin-bottom:20px">监管任务查询列表</div>
    </div>
    <div class="searchWord" style="margin-bottom:20px">
      <el-input v-model="search" style="display: inline-block; width: 1000px" placeholder="请输入搜索关键词"></el-input>
      <el-button type="primary" @click="addNewTask" style="margin-left:15px;margin-right:14px">添加新任务</el-button>
      <el-dialog title="添加新任务" 
      :visible.sync="dialogTableVisible" center :append-to-body='true' 
      :lock-scroll="false" width="30%" 
      :close-on-click-modal="false"
      >
      <taskInput></taskInput>
      </el-dialog>
    </div>
    
    <div class="dormitoryData">
      <el-table
        ref="dormitoryTable"
        :data="tables"
        tooltip-effect="dark"
        stripe
        style="width: 100%"
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
        <el-table-column label="商品信息" prop="commodityId">
        </el-table-column>
        <el-table-column label="监管目标" prop="targetId">
        </el-table-column>
        <el-table-column label="开始时间" prop="startTime">
        </el-table-column>
        <el-table-column label="结束时间" prop="endTime">
        </el-table-column>
        <el-table-column label="人模态分布" prop="humanUse" width = "80">
        </el-table-column>
        <el-table-column label="机器模态分布数" prop="agentNum" width = "80">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  //import {getTansactionData} from "@/api/part1/transactionProject";
import {taskQuery} from "@/api/part1/Multimodal-multigranularity";
import taskInput from "@/components/part1/Multimodal-multigranularity/taskInput";

 // import $ from 'jQuery'
  export default {
    components: {
      taskInput,
    },

    data () {
      return {
        dormitory: [],
        search: '',
        dialogTableVisible: false     
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
                this.dormitory = dataConvert
                console.log("传入444数据" + res.data.data)
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

          // 关闭弹窗
          closeDialog(){
            console.log*("成功调用")
            this.dialogTableVisible = false;
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