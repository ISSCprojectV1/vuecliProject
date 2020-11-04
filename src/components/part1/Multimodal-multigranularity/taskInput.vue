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
        <el-form-item label="内容">
            <el-popover
                    placement="right"
                    width="200"

                    v-model="visible">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>

                <el-button  class="popbut" id="neirong" slot="reference"  >{{content}}</el-button>
            </el-popover>
        </el-form-item>

    <el-form-item label="商品名称">
        <el-select v-model="commodityName" placeholder="请选择商品名称">
            <el-option label="铝矿石" value="铝矿石"></el-option>
            <el-option label="小麦" value="小麦"></el-option>
            <el-option label="大豆" value="大豆"></el-option>
            <el-option label="焦炭" value="焦炭"></el-option>
            <el-option label="动力煤" value="动力煤"></el-option>
            <el-option label="甲醇" value="甲醇"></el-option>
            <el-option label="肥料" value="肥料"></el-option>
            <el-option label="螺纹钢" value="螺纹钢"></el-option>
        </el-select>
    </el-form-item>
<el-button type="success" @click="postAddress">立即创建</el-button>
<el-button type="info" @click="abortForm">取消创建</el-button>

</el-form>
</div>

</div>
</template>>
<script>
    /* <el-form-item label="内容">

        <el-select v-model="content" placeholder="监管内容">
            <el-option label="南方稀贵金属交易所" value="南方稀贵金属交易所"></el-option>
            <el-option label="上海黄金交易所" value="上海黄金交易所"></el-option>

            <el-option label="中国金融期货商品交易所" value="中国金融期货商品交易所"></el-option>
            <el-option label="恒大金属交易中心" value="恒大金属交易中心"></el-option>
            <el-option label="广东贵金属交易中心" value="广东贵金属交易中心"></el-option>
            <el-option label="无锡贵金属交易所" value="无锡贵金属交易所"></el-option>
            <el-option label="南京贵重金属交易所" value="南京贵重金属交易所"></el-option>
            <el-option label="江苏省大圆银泰贵金属" value="江苏省大圆银泰贵金属"></el-option>
            <el-option label="海西商品交易所" value="海西商品交易所"></el-option>
        </el-select>
    </el-form-item>*/
import {taskInput,bourseget} from "@/api/part1/Multimodal-multigranularity";
const cityOptions = ['南方稀贵金属交易所', '上海黄金交易所', '中国金融期货商品交易所', '江苏省大圆银泰贵金属','南京贵重金属交易所'];
export default {
data() {
    return {checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: false,
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
        tradeuser:false,
        commodityName:''
    }

  },
    props:['taskin'],
      created(){
    bourseget().then((res) => {
            let dataConvert = res.data.data;
    console.log(dataConvert)
        let temp=[]
        for(let i=0;i<dataConvert.length;i++)
    temp.push(dataConvert[i].bourse)
        this.cities=temp
        console.log(temp)
    }

            ).catch(()=>{
        console.log("taskQuery fail")
    });
    console.log(this.taskin.changeflag)
          console.log(this.taskin.name)
          this.input=this.taskin.name
          this.priority=this.taskin.priority
          this.humanUse=this.taskin.humanUse
        //  if(this.taskin.content)
         // this.content=this.taskin.content+"\r\n"+"aaa"
     this.content=this.taskin.content
       //   console.log(this.content)
        /*  if(this.taskin.changeflag==Number.POSITIVE_INFINITY)
      this.cleanForm();*/
    },
    computed: {
        address(){
       console.log(this.taskin)
            return ""
        }
    },
    watch:{
        'taskin.changeflag'(){
            console.log("flag变了")
            console.log(this.taskin)
      this.input=this.taskin.name
          this.priority=(this.taskin.priority)?this.taskin.priority:1;
            this.commodityName=this.taskin.commodityName
this.workingTime=this.taskin.workingTime
            this.humanUse=this.taskin.humanUse

            this.content=this.taskin.content
            if(!this.content)
                this.content='wu'
if(this.taskin.humanUse=='是')
    this.humanUse=1
            if(this.taskin.humanUse=='否')
                this.humanUse=0
if(this.taskin.changeflag==Number.POSITIVE_INFINITY)
    this.cleanForm()
            let butt=document.getElementById("neirong")
            console.log(butt.text)
    }
    },
methods:{

        handleCheckAllChange(val) {
            this.checkedCities = val ? this.cities : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            console.log(this.checkedCities)
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
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
            let contt=''
      for(var i=0;i<this.checkedCities.length;i++)
      {  if(i==0)
          contt+=this.checkedCities[i];
            if(i>0)
                contt+=','+this.checkedCities[i];
      }
console.log(contt)
      this.content=contt
      this.postData();
          //this.$parent.$parent.getData()
         this.$parent.$parent.reloadPage()
          this.$message({
            type: 'success',
            message: '创建成功!'
          });
        }).catch(() => {
      console.log(this.checkedCities.length)
      let contt=''
      for(var i=0;i<this.checkedCities.length;i++)
      {  if(i==0)
          contt+=this.checkedCities[i];
          if(i>0)
              contt+=','+this.checkedCities[i];
      }
      console.log(contt)
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
   //this. content=''
    //let cit=this.checkedCities
//let conttt=''
       // console.log(cit.length())
  //  for(var i=0;i<this.checkedCities.size();i++)
  //  {
    //    console.log(this.checkedCities[0])
    //}
      //  if(i==0)
      //  this.    content+=this.checkedCities[i];
      //  if(i>0)
      //      this.    content+=','+this.checkedCities[i];



  var data = { 
  "name":this.input,  
  "priority":this.priority, 
  "humanUse":this.humanUse,  //
  "startTime":startData,//  
  "endTime":endData,//
  "workingTime":this.workingTime,//
 "timeadvise":this.timeadvise,
  "content":this.content,
      "tradeuser":this.tradeuser,
      "commodityName":this.commodityName

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
          this.tradeuser= false,
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
.popbut{
    mulitline:true;
white-space: normal;



}
</style>