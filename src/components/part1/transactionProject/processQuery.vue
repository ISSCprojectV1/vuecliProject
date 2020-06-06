<template>
  <div class="dormitory">
        <div class="title">
      <div style="display: inline-block">检索交易记录--输入任意关键词均可完成检索</div>
    </div>
    <div class="searchWord">
      <div style="display: inline-block"> 搜索：</div>
      <el-input v-model="search" style="display: inline-block;width: 1502px" placeholder="请输入搜索内容"></el-input>
    </div>
    <div class="dormitoryData">
      <el-table
        ref="dormitoryTable"
        :data="tables"
        tooltip-effect="dark"
        stripe
        style="width: 100%">
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column label="序号"  type="index" width="65"></el-table-column>
        <el-table-column label="出售方" prop="seller">
        </el-table-column>
        <el-table-column label="购买方" prop="buyer">
        </el-table-column>
        <el-table-column label="交易内容" prop="content">
        </el-table-column>
        <el-table-column label="交易数量" prop="amount">
        </el-table-column>
        <el-table-column label="交易单价" prop="unitprice">
        </el-table-column>
        <el-table-column label="交易总额" prop="sum">
        </el-table-column>
        <el-table-column label="交易时间" prop="time">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getTansactionData} from "@/api/part1/transactionProject";
 // import $ from 'jQuery'
  export default {

    data () {
      return {
        dormitory: [],
        search: ''
     }
  },
  computed: {
      // 模糊搜索
      tables () {
        this.getData();
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
                getTansactionData().then((res) => {
                this.dormitory = res.data.data;
                console.log("传入数据")
                }).catch(()=>{
                    console.log("getTransactionData fail")
                });

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