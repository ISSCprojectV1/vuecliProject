<template>
<div>
<div class = "task-input-box">
<el-form ref="form" :model="form" label-width="130px">

<el-form-item label="任务ID">
<el-input v-model="input" placeholder="请输入任务ID 例如1"></el-input>
   </el-form-item>

   <el-form-item label="粒度选择一">
    <el-select v-model="typeOne" placeholder="粒度一">
      <el-option label="级别一" value="1"></el-option>
      <el-option label="级别二" value="2"></el-option>
      <el-option label="级别三" value="3"></el-option>
      <el-option label="级别四" value="4"></el-option>
      <el-option label="级别五" value="5"></el-option>
    </el-select>
  </el-form-item>

   <el-form-item label="粒度选择二">
    <el-select v-model="typeTwo" placeholder="粒度二">
      <el-option label="级别一" value="1"></el-option>
      <el-option label="级别二" value="2"></el-option>
      <el-option label="级别三" value="3"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="生成调整结果">
    <el-input type="textarea" v-model="Execution"></el-input>
  </el-form-item>

<el-button type="success" @click="executionTask">立即调整</el-button>
<el-button type="info" @click="abortForm">取消调整</el-button>

</el-form>
</div>

</div>
</template>>
<script>//
import {granularityExecution_api} from "@/api/part1/Multimodal-multigranularity";
export default {
data() {
    return {
      input:'',
      typeOne:'',
      typeTwo:'',
      Execution:''
    }
  },
      created(){
      this.cleanForm();
    },
methods:{
postData(){
// 获取表格数据
               console.log("提交调整数据")

               var date=new Date();
              var timer=date.getTime().toString();
               var URL ='api/granularityExecution/'+this.input+"?t=";
               console.log("URL:"+URL)
               granularityExecution_api(URL+timer).then((res) => {
                 if(res.data.code != "200")
                     this.failedSearch();
                     console.log(res.data.data[0].timeLimit)

                     this.Execution = "事件ID" + res.data.data[0].timeLimit;
                }).catch(()=>{
                    console.log("granularityExecution fail")
                });

},

           // 新增监控任务
          executionTask(){
            this.postData()
          },

abortForm(){
  console.log("zhioiiiiiii")
  this.cleanForm();
  this.$parent.$parent.dialogTableVisible = false
},
cleanForm(){
  console.log("到这里了吗")
  this.input = '',
  this.typeOne = '',
  this.typeTwo = ''
},
// 请求失败
failedSearch(){
  console.log*("成功调用")
  this.$alert('检查任务ID或格式是否准确', '调整失败', {
  confirmButtonText: '确定',
  type: 'error',
});
   }

}
  }

</script>
<style lang="scss" scoped>
.task-input-box{
  font-size: 0;
   width: 100%;
  height: 100%;
}

</style>