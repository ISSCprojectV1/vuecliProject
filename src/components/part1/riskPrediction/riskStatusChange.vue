<template>
  <div>
    <div class="task-input-box">
      <el-form ref="form" :model="form" label-width="130px">

        <el-form-item label="序号">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="类别">
          <el-input v-model="operatorName" placeholder="请输入操作员名称"></el-input>
        </el-form-item>

        <el-form-item label="修改" v-if="this.riskin[0]=='修改'">
          <el-input v-model="workingTime" placeholder="请输入workingTime"></el-input>
        </el-form-item>

        <el-form-item label="预警信息" v-if="this.riskin[0]!='修改'">
          <el-input v-model="workingTime" placeholder="请输入workingTime"></el-input>
        </el-form-item>

        <el-button type="success" @click="postAddress">立即创建</el-button>
        <el-button type="info" @click="abortForm">取消创建</el-button>
      </el-form>
    </div>

  </div>
</template>

<script>
import {taskInput, bourseget} from "@/api/part1/Multimodal-multigranularity";

const cityOptions = ['南方稀贵金属交易所', '上海黄金交易所', '中国金融期货商品交易所', '江苏省大圆银泰贵金属', '南京贵重金属交易所'];
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      id: '',
      cities: cityOptions,
      isIndeterminate: false,
      taskinputt: this.taskin,
      input: '',
      priority: '',
      humanUse: false,
      dateStart: '',
      dateStart2: '',
      dateEnd: '',
      dateEnd2: '',
      workingTime: '',
      deadLine: '',
      timeadvise: '',
      content: '',
      tradeuser: false,
      commodityName: '',
      operatorName: '',
      workStatus: ''
    }
  },
  props: ['riskin'],

  created() {
  },
  watch: {
    riskin: {
      handler(val) {
        console.log(val)
      }
    }

  },
  computed: {
    address() {
      console.log(this.taskin)
      return ""
    }
  },

  methods: {
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
    having() {
      console.log(this.taskin)
      if (this.taskin.id == "")
        return false
      return true
    },
    postAddress() {
      this.$confirm('是否确认创建该监管任务', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let contt = ''
        for (var i = 0; i < this.checkedCities.length; i++) {
          if (i == 0)
            contt += this.checkedCities[i];
          if (i > 0)
            contt += ',' + this.checkedCities[i];
        }
        console.log(contt)
        console.log("111")
        this.content = contt
        this.postData();
        //this.$parent.$parent.getData()
        this.$parent.$parent.reloadPage()
        /* this.$message({
           type: 'success',
           message: '创建成功!'
         });*/
      }).catch(() => {
        console.log(this.checkedCities.length)
        let contt = ''
        for (var i = 0; i < this.checkedCities.length; i++) {
          if (i == 0)
            contt += this.checkedCities[i];
          if (i > 0)
            contt += ',' + this.checkedCities[i];
        }
        console.log(contt)
        /* this.$message({
             type: 'info',
             message: '已取消'
           });       */
      });
      this.$parent.$parent.dialogTableVisible = false
    },
    postData() {
      console.log("发送请求前")

      var startData = new Date(this.dateStart2).getTime();
      var endData = new Date(this.dateEnd2).getTime();
      console.log("elementui 时间形式" + startData + "时间2：" + endData)
      console.log("humanuse:" + this.humanUse)
      let humannn = (this.humanUse == true ? 1 : 0);
      let wortstatue = null
      if (this.workStatus == "未分配") // true
        wortstatue = null
      if (this.workStatus === "已分配") // true
        wortstatue = 0
      if (this.workStatus === "任务正常") // true
        wortstatue = 1
      if (this.workStatus === "任务出现异常") // true
        wortstatue = 2
      if (this.workStatus == null || this.workStatus == 1 || this.workStatus == 0 || this.workStatus == 2)
        wortstatue = this.workStatus
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
        "id": this.id,
        "name": this.input,
        "priority": this.priority,
        "humanUse": humannn,  //
        "startTime": startData,//
        "endTime": endData,//
        "workingTime": this.workingTime,//
        "deadLine": this.deadLine,
        "timeadvise": this.timeadvise,
        "content": this.content,
        "tradeuser": this.tradeuser,
        "commodityName": this.commodityName,
        "operatorName": this.operatorName,
        "workStatus": wortstatue
      };
      console.log(data);
      taskInput(data).then(function (response) {
        console.log(response)
      })
          .catch(function (error) {
            console.log(error);
          });
    },
    abortForm() {
      this.cleanForm();
      this.$parent.$parent.dialogTableVisible = false
    },
    cleanForm() {
      this.input = '',
          this.priority = '',
          this.humanUse = false,
          this.tradeuser = false,
          this.dateStart = '',
          this.dateStart2 = '',
          this.dateEnd = '',
          this.dateEnd2 = '',
          this.workingTime = ''
      this.deadLine = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.task-input-box {
  font-size: 0;
  width: 100%;
  height: 100%;
}

.popbut {
  mulitline: true;
  white-space: normal;
}
</style>