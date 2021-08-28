<template>
  <div>
    <div class="task-input-box">
      <el-form ref="form" :model="form" label-width="130px">
        <el-form-item label="用户名称">
          <el-select v-model="id">
            <el-option
                v-for="item in operatorinput"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作员名称">
          <el-input v-model="name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-button type="success" @click="postAddress">确认设置</el-button>
        <el-button type="info" @click="abortForm">取消</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {taskInput, bourseget, changemodality, getModalityByUserId} from "@/api/part1/Multimodal-multigranularity";
import {setToken, getToken, setUserTrue, getUserTrue, setAdminTrue, getAdminTrue} from "@/utils/auth"

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
      name: '',
      humanUse: '',
      workingTime: '',
      deadLine: '',
      timeadvise: '',
      content: '',
      tradeuser: false,
      commodityName: '',
      admintrue: false,
      operatorName: '',
      workStatus: '',
      operatorinput: []
    }
  },
  props: ['taskin', 'operatorin', 'modity'],
  created() {
    this.operatorinput = this.operatorin
    this.id = this.taskin.id
    this.name = this.taskin.name
    this.priority = this.taskin.priority
    this.humanUse = this.taskin.humanUse
    this.workingTime = this.taskin.workingTime
    this.deadLine = this.taskin.deadLine
    this.content = this.taskin.content
    this.operatorName = this.taskin.operatorName
    console.log(this.taskin.workStatus)
    this.workStatus = this.taskin.workStatus
  },
  computed: {},
  watch: {
    'taskin.name'() {
      console.log("名字变了")
      console.log(this.taskin)
      this.id = this.taskin.id
      this.name = this.taskin.name
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
      let butt = document.getElementById("neirong")
      console.log(butt.text)
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
    postAddress() {
      this.$confirm('是否确认添加操作员', '提示', {
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
        this.$parent.$parent.reloadPage()
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
      this.$parent.$parent.dialogTableVisible2 = false
    },
    postData() {
      let postdata = {}
      if (this.modity != null) {
        postdata = {
          "id": this.modity.id,
          "name": this.modity.name,
          "team": this.modity.team,
          "num": this.modity.num,
          "allocation": (this.modity.allocation == "是" ? true : false),
          "taskId": this.modity.taskId,
          "taskName": this.modity.taskName,
          "releaseTime": this.modity.releaseTime,
          "type": this.modity.type,
          "operatorId": this.modity.operatorId,
          "userId": this.id,
        }
      } else {
        postdata = {
          "id": null,
          "name": this.name,
          "team": null,
          "num": null,
          "allocation": null,
          "taskId": null,
          "taskName": null,
          "releaseTime": null,
          "type": null,
          "operatorId": null,
          "userId": this.id,
        }
      }
      changemodality(postdata).then((response) => {
        if (response.data.code == 200)
          this.$parent.$parent.modality()
      }).catch(function (error) {
        console.log(error);
      });
    },
    abortForm() {
      this.cleanForm();
      this.$parent.$parent.dialogTableVisible2 = false
    },
    cleanForm() {
      this.input = '';
      this.priority = '';
      this.humanUse = false;
      this.tradeuser = false;
      this.dateStart = '';
      this.dateStart2 = '';
      this.dateEnd = '';
      this.dateEnd2 = '';
      this.workingTime = '';
      this.deadLine = '';
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