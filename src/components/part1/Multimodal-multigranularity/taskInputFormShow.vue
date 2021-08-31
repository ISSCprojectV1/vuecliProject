<template>
  <div>
    <div class="task-input-box">
      <el-form label-width="100px">

        <el-form-item label="监管任务名称">
          <el-input v-model="input" placeholder="请输入内容" disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="操作员">
          <el-input v-model="operatorName" placeholder="请输入操作员名称" disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="任务状态" v-if="workStatus!='未分配'">
          <el-select v-model="workStatus" placeholder="请选择任务状态" disabled="true">
            <el-option label="任务未执行" value="0"></el-option>
            <el-option label="任务正常" value="1"></el-option>
            <el-option label="任务异常" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工作时间">
          <el-input v-model="workingTime" placeholder="请输入workingTime" disabled="true"></el-input>
        </el-form-item>


      </el-form>
    </div>

  </div>
</template>>
<script>
const cityOptions = ['南方稀贵金属交易所', '上海黄金交易所', '中国金融期货商品交易所', '江苏省大圆银泰贵金属', '南京贵重金属交易所'];
export default {
  data() {
    return {
      checkAll: false,
      id: '',
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
      workStatus: ''
    }
  },
  props: ['taskin'],
  created() {
    this.id = this.taskin.id
    this.input = this.taskin.name
    this.priority = this.taskin.priority
    this.humanUse = this.taskin.humanUse
    this.workingTime = this.taskin.workingTime
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
      this.workingTime = this.taskin.workingTime
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
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    having() {
      if (this.taskin.id == "")
        return false
      return true
    },
    abortForm() {
      this.cleanForm();
      this.$parent.$parent.dialogTableVisible3 = false
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

.popbut {
  mulitline: true;
  white-space: normal;
}
</style>