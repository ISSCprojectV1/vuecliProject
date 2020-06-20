<template>
  <div class="dormitory">
        <div class="title">
      <div style="display: inline-block; margin-bottom:30px">多模态 查询列表</div>
    </div>
    <div class="searchWord" style="margin-bottom:30px">
      <el-input v-model="search" style="display: inline-block; width: 500px;" placeholder="请输入搜索关键词"></el-input>
      <el-button type="primary" @click="addNewTask" style="margin-left:50px; margin-right:30px">添加新模态</el-button>
      <el-dialog title="添加新模态" 
      :visible.sync="dialogTableVisible" center :append-to-body='true' 
      :lock-scroll="false" width="30%" 
      :close-on-click-modal="false"
      >
      <modalityInput></modalityInput>
      </el-dialog>

       <el-button type="warning" @click="modalityAllocation">分配模态任务</el-button>
       <el-dialog title="分配模态任务" 
      :visible.sync="dialogAllocationVisible" center :append-to-body='true' 
      :lock-scroll="false" width="30%" 
      :close-on-click-modal="false"
      >
      <modalityAllocation></modalityAllocation>
      </el-dialog>

    </div>
    
    <div class="dormitoryData">
      <el-table
        ref="dormitoryTable"
        :data="tables"
        tooltip-effect="dark"
        stripe
        style="width: 100%">

        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column label="序号"  prop="id" width = "60"></el-table-column>
        <el-table-column label="模态任务名称" prop="name">
        </el-table-column>
        <el-table-column label="属性值" prop="num" >
        </el-table-column>
        <el-table-column label="分配状态" prop="allocation" >
        </el-table-column>
        <el-table-column label="任务代码" prop="taskId" width = "60">
        </el-table-column>
        <el-table-column label="释放时间" prop="releaseTime">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  //import {getTansactionData} from "@/api/part1/transactionProject";
import {modalityQuery,moAllocation} from "@/api/part1/Multimodal-multigranularity";
import modalityInput from "@/components/part1/Multimodal-multigranularity/modalityInput";
import modalityAllocation from "@/components/part1/Multimodal-multigranularity/modalityAllocation";

 // import $ from 'jQuery'
  export default {
    components: {
      modalityInput,
      modalityAllocation
    },

    data () {
      return {
        dormitory: [],
        search: '',
        dialogTableVisible: false,
        dialogAllocationVisible:false
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

               modalityQuery().then((res) => {
                dataConvert = res.data.data;
                for(var i = 0;i<dataConvert.length;i++){
                  var data = this.timestampToTime(dataConvert[i].releaseTime)
                  dataConvert[i].releaseTime = data

                  if(dataConvert[i].allocation) // true
                    dataConvert[i].allocation = "是"
                  else // false
                    dataConvert[i].allocation = "否"
                }
                this.dormitory = dataConvert
                console.log("传入4数据" + res.data.data)
                }).catch(()=>{
                    console.log("modalityQuery fail")
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

        // 模态任务分配 发送请求
         modalityAllocation(){
              // 获取表格数据
               console.log("获取表格数据")
               this.dialogAllocationVisible = true;

               moAllocation().then((res) => {
                this.dormitory = res.data.data;
                console.log("传入3数据" + res.data.data.length)

                if(res.data.data == [])
                     console.log("没啥东西")
                }).catch(()=>{
                    console.log("modalityAllocation  fail")
                });
                
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