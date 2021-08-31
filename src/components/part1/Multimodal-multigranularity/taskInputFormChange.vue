<template>
  <div>
    <div class="task-input-box">
      <el-form label-width="130px">

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
        <el-form-item label="操作员">
          <el-input v-model="operatorName" placeholder="请输入操作员名称"></el-input>
        </el-form-item>
        <el-form-item label="任务状态" v-if="workStatus!='未分配'">
          <el-select v-model="workStatus" placeholder="请选择任务状态">

            <el-option label="任务未执行" value="0"></el-option>
            <el-option label="任务正常" value="1"></el-option>
            <el-option label="任务异常" value="2"></el-option>

          </el-select>
        </el-form-item>

        <el-form-item label="工作时间（小时）">
          <el-input v-model="workingTime" placeholder="请输入workingTime"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input type="number" v-model="deadLine" placeholder="如非末尾任务请勿输入"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-popover
              trigger="hover"
              placement="top"
              width="300">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
            </el-checkbox-group>

            <el-button class="popbut" id="neirong" slot="reference">{{ content }}</el-button>
          </el-popover>
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
      humanUse: '',
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
      workStatus: '',
      getfresh: ''
    }
  },
  props: ['taskin'],
  created() {
    this.id = this.taskin.id
    this.input = this.taskin.name
    this.priority = this.taskin.priority
    this.humanUse = this.taskin.humanUse
    this.workingTime = this.taskin.workingTime / 3600000
    this.deadLine = this.taskin.deadLine
    this.content = this.taskin.content
    this.operatorName = this.taskin.operatorName
    this.workStatus = this.taskin.workStatus
  },
  watch: {
    'taskin.id'() {
      this.id = this.taskin.id
      this.input = this.taskin.name
      this.priority = (this.taskin.priority) ? this.taskin.priority : 1;
      this.commodityName = this.taskin.commodityName
      this.workingTime = this.taskin.workingTime / 3600000
      this.deadLine = this.taskin.deadLine
      this.humanUse = this.taskin.humanUse
      this.content = this.taskin.content
      this.operatorName = this.taskin.operatorName
      this.workStatus = this.taskin.workStatus
      if (!this.content)
        this.content = '暂时未分配'
      if (this.taskin.humanUse == '是')
        this.humanUse = 1
      if (this.taskin.humanUse == '否')
        this.humanUse = 0
      if (this.taskin.changeflag == Number.POSITIVE_INFINITY)
        this.cleanForm()
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

        this.content = contt
        this.postData();
        console.log(this.getfresh)

        //this.$parent.$parent.getData()
        //   this.$parent.$parent.reloadPage()
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
      let priorityy = (this.priority == "无" ? 0 : this.priority);
      let humannn = ((this.humanUse == true || this.humanUse == "是") ? 1 : 0);
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
        "priority": priorityy,
        "humanUse": humannn,  //
        "startTime": startData,//
        "endTime": endData,//
        "workingTime": this.workingTime * 3600000,//
        "deadLine": this.deadLine,
        "timeadvise": this.timeadvise,
        "content": this.content,
        "tradeuser": this.tradeuser,
        "commodityName": this.commodityName,
        "operatorName": this.operatorName,
        "workStatus": wortstatue
      };
      console.log(data);
      let temp = ''
      taskInput(data).then((response) => {
        console.log(response)
        let temp = response.data.code
        console.log(temp)
        this.getfresh = temp
        if (this.getfresh == 200) {
          console.log(this)
          this.$parent.$parent.getData1()
        }

      }).catch(function (error) {
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