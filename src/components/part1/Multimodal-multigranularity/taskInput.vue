<template>
<div>
<div class = "task-input-box">
<el-form ref="form" :model="form" label-width="130px">
   <el-form-item label="监管任务名称">
<el-input v-model="input" placeholder="请输入内容"></el-input>
   </el-form-item>

   <el-form-item label="监管任务优先级">
    <el-select v-model="priority" placeholder="请选择任务优先级">
      <el-option label="级别一" value="1"></el-option>
      <el-option label="级别二" value="2"></el-option>
      <el-option label="级别三" value="3"></el-option>
      <el-option label="级别四" value="4"></el-option>
      <el-option label="级别五" value="5"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="是否人工分配">
    <el-switch v-model="humanUse"
    active-text="人工分配"
    ></el-switch>
  </el-form-item>
    <el-form-item label="是否主动监管">
        <el-switch v-model="tradeuser"
                   active-text="主动监管"
        ></el-switch>
    </el-form-item>
<el-form-item label="任务开始时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择开始日期" v-model="dateStart" style="width: 100%;" ></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择开始时间" v-model="dateStart2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>

  <el-form-item label="任务结束时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择结束日期" v-model="dateEnd" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择结束时间" v-model="dateEnd2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>

     <el-form-item label="工作时间">
<el-input v-model="workingTime" placeholder="请输入workingTime"></el-input>
   </el-form-item>
    <el-form-item label="时间粒度建议">
        <el-input v-model="timeadvise" placeholder="请输入时间粒度"></el-input>
    </el-form-item>
    <el-form-item label="内容">
        <el-input v-model="content" placeholder="监管内容"></el-input>
    </el-form-item>
<el-button type="success" @click="postAddress">立即创建</el-button>
<el-button type="info" @click="abortForm">取消创建</el-button>

</el-form>
</div>

</div>
</template>>
<script>
import {taskInput} from "@/api/part1/Multimodal-multigranularity";

export default {
data() {
    return {

        taskinputt:this.taskin,
      input: '',
      priority: '',
      humanUse: false,
      dateStart: '',
      dateStart2: '',
      dateEnd: '',
      dateEnd2: '',
      workingTime:'',
        timeadvise:'',
        content:'',
        tradeuser:''

    }

  },
    props:['taskin'],
      created(){
      this.cleanForm();
    },
    computed: {
        address(){
       console.log(this.taskin)
            return ""
        }
    },
    watch:{
        'taskin.id'(){
      this.input=this.taskin.name
          this.priority=this.taskin.priority
          this.humanUse=this.taskin.humanUse

    }
    },
methods:{
    having(){
        console.log(this.taskin)
      if(this.taskin.id=="")
          return false
        return true

    },

postAddress(){
  this.$confirm('是否确认创建该监管任务', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postData();
          //this.$parent.$parent.getData()
         this.$parent.$parent.reloadPage()
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

},
postData(){
console.log("发送请求前")
  var startData = new Date(this.dateStart2).getTime();
  var endData = new Date(this.dateEnd2).getTime();
  console.log("elementui 时间形式"+ startData +"时间2：" + endData)
  console.log("humanuse:"+ this.humanUse )
  var data = { 
  "name":this.input,  
  "priority":this.priority, 
  "humanUse":this.humanUse,  //
  "startTime":startData,//  
  "endTime":endData,//
  "workingTime":this.workingTime,//
 "timeadvise":this.timeadvise,
  "content":this.content

  };
console.log(data);
  taskInput(data).then(function (response) {
console.log(response)
  })
  .catch(function (error) {
    console.log(error);
  });
},
abortForm(){
  console.log("zhioiiiiiii")
  this.cleanForm();
  this.$parent.$parent.dialogTableVisible = false
},
cleanForm(){
  console.log("到这里了吗")
      this.input = '',
      this.priority = '',
      this.humanUse= false,
      this.dateStart= '',
      this.dateStart2= '',
      this.dateEnd= '',
      this.dateEnd2= '',
      this.workingTime = ''
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