<template>
<div>
<div class = "task-input-box">
<el-form ref="form" :model="form" label-width="130px">
   <el-form-item label="模态名称">
<el-input v-model="name" placeholder="请输入内容"></el-input>
   </el-form-item>
<el-form-item label="模态类型">
    <el-select v-model="type" placeholder="请选择任务优先级">
      <el-option label="类型一 机器" value="1"></el-option>
      <el-option label="类型二 操作员" value="2"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="属性值">
<el-input v-model="num" placeholder="请输入属性值"></el-input>
   </el-form-item>
    <el-form-item label="联盟">
        <el-input v-model="team" placeholder="请输入隶属联盟"></el-input>
    </el-form-item>

<el-button type="success" @click="postAddress">立即创建</el-button>
<el-button type="info" @click="abortForm">取消创建</el-button>

</el-form>
</div>
</div>
</template>

<script>
import {modalityInput_api} from "@/api/part1/Multimodal-multigranularity";
export default {
data() {
    return {
      name:'',
      type:'',
      num:'',
        team:''
    }
  },

methods:{
postAddress(){
  this.$confirm('是否确认创建该监管任务', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postData();
          this.$parent.$parent.getData();
          this.$message({
            type: 'success',
            message: '创建成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    this.$parent.$parent.dialogTableVisible = false
    this.$parent.$parent.getData()
},
postData(){
console.log("发送请求前")
  var data = { 
  "name":this.name,
  "type":this.type,  
  "num":this.num,
      "team":this.team
  };
  modalityInput_api(data)
  .then(function (response) {
    console.log("已经发送了请求")
    console.log(response);
    console.log("请求返回值："+response.data.message);
  })
  .catch(function (error) {
    console.log(error);
  });
},
abortForm(){
  this.cleanForm();
  this.$parent.$parent.dialogTableVisible = false
  this.$parent.$parent.getData()
},
cleanForm(){
        this.input = '',
      this.priority = '',
      this.humanUse= false,
      this.targetId = '',
      this.dateStart= '',
      this.dateStart2= '',
      this.dateEnd= '',
      this.dateEnd2= ''
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