<template>
    <div class="dormitoryData">
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
</template>
<script>
import {searchTask} from "@/api/part1/Multimodal-multigranularity";
export default {
  props:["searchData"],
  data () {
      return {
        dormitory: [],
         // 默认显示第几页
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:100,
      // 个数选择器（可修改）
      pageSizes:[5,10],
      // 默认每页显示的条数（可修改）
      PageSize:5,
        }
  },
  mounted () {
        this.$nextTick(() => {
      //  执行echarts方法
        this.getSearchData(this.searchData);
      })
  },
  methods:{
    getSearchData(search){
      var data = {
        "name" : search
      };
       // 获取表格数据
        var dataConvert = [];
               searchTask(data).then((res) => {
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
                    console.log("searchTask fail")
                });    
    },
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
  }
}
</script>