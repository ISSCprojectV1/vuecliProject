<template>
  <div>
    <div class="task-input-box">
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
          <el-switch v-model="humanUse" active-text="人工分配"></el-switch>
        </el-form-item>

        <el-form-item label="是否主动监管">
          <el-switch v-model="tradeuser" active-text="主动监管"></el-switch>
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
              width="300"
              v-model="visible">
            <el-button slot="reference">{{ content ? content : '鼠标悬停以显示' }}</el-button>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
            </el-checkbox-group>
          </el-popover>
        </el-form-item>

        <div style="text-align: right">
          <el-button size="small" @click="abortForm">取消</el-button>
          <el-button size="small" type="primary" @click="postAddress">确定</el-button>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>
import {taskInput, bourseget} from "@/api/part1/Multimodal-multigranularity";
import {timestampToTime} from "@/utils/part3";

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
      deadlinetemp: '',
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
  props: ['taskin'],
  created() {
    bourseget().then((res) => {
          let dataConvert = res.data.data
          let temp = []
          for (let i = 0; i < dataConvert.length; i++)
            temp.push(dataConvert[i].bourse)
          this.cities = temp
        }
    ).catch(() => {
      console.log("taskQuery fail")
    });
    this.id = this.taskin.id
    this.input = this.taskin.name
    this.priority = this.taskin.priority
    this.humanUse = ((this.taskin.humanUse == '是') || (this.taskin.humanUse == '人工监管参与')) ? 1 : 0
    this.workingTime = this.taskin.workingTime / 3600000
    this.deadLine = this.taskin.deadLine
    this.deadlinetemp = this.taskin.deadLine
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
      this.deadLine = (Number.isNaN(this.taskin.deadLine)) ? this.taskin.deadLine :
          (timestampToTime(this.taskin.deadLine))
      this.deadlinetemp = this.taskin.deadLine
      this.humanUse = this.taskin.humanUse
      this.content = this.taskin.content
      this.operatorName = this.taskin.operatorName
      this.workStatus = this.taskin.workStatus
      if (!this.content)
        this.content = '暂时未分配'
      if ((this.taskin.humanUse == '是') || (this.taskin.humanUse == '人工监管参与'))
        this.humanUse = 1
      if ((this.taskin.humanUse == '否') || (this.taskin.humanUse == '人工监管未参与'))
        this.humanUse = 0
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
        this.content = contt
        this.postData();
      }).catch(() => {
        console.log(this.checkedCities.length)
        let contt = ''
        for (var i = 0; i < this.checkedCities.length; i++) {
          if (i == 0)
            contt += this.checkedCities[i];
          if (i > 0)
            contt += ',' + this.checkedCities[i];
        }
      });
      this.$parent.$parent.dialogTableVisible = false
    },
    postData() {
      let startData = new Date(this.dateStart2).getTime();
      let endData = new Date(this.dateEnd2).getTime();
      let priorityy = (this.priority == "无" ? 0 : this.priority);
      let humannn = ((this.humanUse == true || this.humanUse == "是" || this.humanUse == "人工监管参与") ? 1 : 0);
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
      let data = {
        "id": this.id,
        "name": this.input,
        "priority": priorityy,
        "humanUse": humannn,  //
        "startTime": startData,//
        "endTime": endData,//
        "workingTime": this.workingTime * 3600000,//
        "deadLine": this.deadlinetemp,
        "timeadvise": this.timeadvise,
        "content": this.content,
        "tradeuser": this.tradeuser,
        "commodityName": this.commodityName,
        "operatorName": this.operatorName,
        "workStatus": wortstatue
      };
      taskInput(data).then(res => {
        this.$parent.$parent.$parent.reload();
      }).catch(function (error) {
        console.log(error);
      });
    },
    abortForm() {
      this.cleanForm();
      this.$parent.$parent.dialogTableVisible = false
    },
    cleanForm() {
      this.input = ''
      this.priority = ''
      this.humanUse = false
      this.tradeuser = false
      this.dateStart = ''
      this.dateStart2 = ''
      this.dateEnd = ''
      this.dateEnd2 = ''
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
</style>