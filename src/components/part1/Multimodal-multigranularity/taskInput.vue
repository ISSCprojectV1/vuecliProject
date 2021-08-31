<template>
  <div>
    <div>
      <!--输入任务表单-->
      <el-form label-width="130px">

        <!--1 任务来源-->
        <el-form-item label="任务来源" style="margin-left:300px">
          <el-col :span="1">
            <el-tag style="font-size: 14px">
              {{ radio }}
            </el-tag>
          </el-col>
        </el-form-item>

        <!--2 商品种类 选择监管商品类别-->
        <el-form-item label="商品种类" style="margin-left: 300px">
          <el-col :span="13">
            <el-input v-model="commodityName" placeholder="请输入内容" @change="handleChange"></el-input>
          </el-col>
        </el-form-item>

        <!--3 交易平台 监管任务空间粒度，根据选定的商品种类获得平台列表-->
        <el-form-item label="交易平台" style="margin-left: 300px">
          <el-col :span="13">
            <el-select v-model="flatName" placeholder="请选择平台名称" style="width: 100%">
              <!--动态读取该品类对应的平台-->
              <el-option
                  v-for="(flat, index) in flatList"
                  :key="index"
                  :label="flat.flatName"
                  :value="flat.flatName"
                  @change="handleChange">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <!--4 交易风险类型 选定的监管任务类型-->
        <el-form-item label="交易风险类型" style="margin-left:300px">
          <el-col :span="13">
            <el-select v-model="taskType" placeholder="请选择交易风险类型" style="width: 100%">
              <el-option label="交易主体异常" value="交易主体异常"></el-option>
              <el-option label="仓单异常" value="仓单异常"></el-option>
              <el-option label="融资异常" value="融资异常"></el-option>
              <el-option label="质押权异常" value="质押权异常"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-button @click="createTaskSource">修改任务来源</el-button>
        <el-button type="primary" @click="createTask">立即创建</el-button>
        <!--        <el-button type="info" @click="abortForm">取消创建</el-button>-->
      </el-form>

    </div>

    <el-dialog
        title="请选择任务来源"
        :visible.sync="formTaskVisible"
        :append-to-body='true'
        width="40%">
      <el-radio-group v-model="radio">
        <el-radio label="主体智能查验">主体智能查验</el-radio>
        <el-radio label="交易过程监测">交易过程监测</el-radio>
        <el-radio label="交易风险智能分析与预警">交易风险智能分析与预警</el-radio>
      </el-radio-group>
      <span slot="footer">
        <el-button size="small" type="primary" @click="InputTaskSourceTrue">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="确认创建任务"
        :visible.sync="formDialogVisible"
        :append-to-body='true'
        width="30%">
      <!-- 获取到的商品粒度推荐表，可通过首列的复选框决定要加入监管的相关商品品类-->
      <el-form label-position="left" label-width="100px">
        <el-form-item label="任务来源">
          <el-col>
            <el-tag style="font-size:14px">
              {{ radio }}
            </el-tag>
          </el-col>
        </el-form-item>
        <el-form-item label="商品种类">
          <el-col>
            <el-tag style="font-size:14px">
              {{ commodityName }}
            </el-tag>
          </el-col>
        </el-form-item>
        <el-form-item label="交易平台">
          <el-col>
            <el-tag style="font-size:14px">
              {{ flatName }}
            </el-tag>
          </el-col>
        </el-form-item>
        <el-form-item label="交易风险类型">
          <el-col>
            <el-tag style="font-size:14px">
              {{ taskType }}
            </el-tag>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button size="small" @click="formDialogVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="formDialogTrue">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogActiveVisible" title="主动监管名单" width="40%" center>
      <p style="font-size: 1rem">
        平台风险值：
        <span v-if="valueMean === '高'" style="margin-right: 1rem; color: red">{{ valueRisk }}</span>
        <span v-else-if="valueMean === '中'" style="margin-right: 1rem; color: orange">{{ valueRisk }}</span>
        <span v-else-if="valueMean === '低'" style="margin-right: 1rem; color: green">{{ valueRisk }}</span>
        风险程度：
        <span v-if="valueMean === '高'" style="color: red">{{ valueMean }}</span>
        <span v-else-if="valueMean === '中'" style="color: orange">{{ valueMean }}</span>
        <span v-else-if="valueMean === '低'" style="color: green">{{ valueMean }}</span>
      </p>
      <el-table :data="formActiveList" :default-sort="{prop: 'p', order: 'descending'}" stripe>
        <el-table-column
            prop="name"
            label="主体">
        </el-table-column>
        <el-table-column
            prop="p"
            label="异常值" sortable>
          <template slot-scope="scope">
            <span>{{ parseFloat(scope.row.p).toFixed(3) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import {
  taskInput,
  bourseget,
  getcommodityTimeadvise2,
  getplatform,
} from "@/api/part1/Multimodal-multigranularity";
import {getAct} from "@/api/part1/acpassTask";

const cityOptions = ['南方稀贵金属交易所', '上海黄金交易所', '中国金融期货商品交易所', '江苏省大圆银泰贵金属', '南京贵重金属交易所'];
const commodityOptions = ['a', 'b', 'c']
export default {
  data() {
    return {
      checkAllCommodity: false,
      checkedCommodity: ['a'],
      isIndeterminateCommodity: true,
      commodities: commodityOptions,

      // 商品粒度相关
      isCommodity: false,
      commodityName: '',
      // 空间粒度相关数据
      flatList: [],
      flatName: '',

      // 监管任务类型选择
      taskType: '',
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
      timeAdvise: '',
      content: this.flatName,
      tradeUser: false,

      // 提交新任务
      formDialogVisible: false,
      //提交任务来源
      formTaskVisible: false,
      radio: "主体智能查验",

      // 表单显示时间
      showStart: "",
      showEnd: "",

      // 查询主动监管名单
      dialogActiveVisible: false,
      valueRisk: '',
      valueMean: '',
      formActiveList: [],
    }
  },
  props: ['taskin'],
  created() {
    bourseget().then((res) => {
          let dataConvert = res.data.data;
          let temp = []
          for (let i = 0; i < dataConvert.length; i++)
            temp.push(dataConvert[i].bourse)
          this.cities = temp
        }
    ).catch(() => {
      console.log("taskQuery fail")
    });
    if (this.taskin) {
      this.input = this.taskin.name
      this.priority = this.taskin.priority
      this.humanUse = this.taskin.humanUse
      this.content = this.taskin.content
    }
  },
  watch: {
    'taskin.changeflag'() {
      this.input = this.taskin.name
      this.priority = (this.taskin.priority) ? this.taskin.priority : 1;
      this.commodityName = this.taskin.commodityName
      this.workingTime = this.taskin.workingTime
      this.deadLine = this.taskin.deadLine
      this.humanUse = this.taskin.humanUse
      this.content = this.taskin.content
      if (!this.content)
        this.content = '暂时未分配'
      if (this.taskin.humanUse === '是')
        this.humanUse = 1
      if (this.taskin.humanUse === '否')
        this.humanUse = 0
      if (this.taskin.changeflag === Number.POSITIVE_INFINITY)
        this.cleanForm()
    },
  },
  methods: {
    // @handleChange---获取当前种类对应平台（输入框更改，绑定@change）
    handleChange(value) {
      this.getFlatList();
    },
    // @handleCloseCommodityTag---关闭商品粒度TAG
    handleCloseCommodityTag(commodityTag) {
      this.commodityTags.splice(this.commodityTags.indexOf(commodityTag), 1);
    },
    /* 空间粒度部分 */
    // @setFlatList---将获得的可选平台放入选项中；
    setFlatList(result) {
      for (let i = 0; i < result.length; i++) {
        let temp = {};
        temp.flatName = result[i];
        this.flatList.push(temp);
      }
    },
    // @getFlatList---将选定商品品类传至后端，后端给出可交易该商品的平台，供用户选择
    getFlatList() {
      let URL = "/getplatform?commodity=" + this.commodityName;
      let result;
      getplatform(URL).then((response) => {
        result = response.data.data;
        this.setFlatList(result);
      }).catch(function (error) {
        console.log(error);
      });
    },
    // @setFlats---将推荐的空间填入表格中
    setFlats(result) {
      for (let i = 0; i < result.length; i++) {
        let temp = {};
        temp.flat_name = result[i].platform;
        temp.flat_num = result[i].association;
        this.flatData.push(temp);
      }
    },
    // @formDialogTrue---新建任务
    formDialogTrue() {
      this.postData();
      this.formDialogVisible = false;
      this.$message({
        message: '恭喜你，任务提交成功',
        type: 'success'
      });
    },
    // @InputTaskSourceTrue---输入任务来源
    InputTaskSourceTrue() {
      this.formTaskVisible = false;
      this.$message({
        message: '恭喜你，任务来源选择成功',
        type: 'success'
      });
    },
    // @handleCloseFlatTag---关闭空间粒度TAG
    handleCloseFlatTag(flatTag) {
      this.flatTags.splice(this.flatTags.indexOf(flatTag), 1);
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 设置时间区间
    setTimeRecommend(result) {
      let day = parseInt(result);
      let myDate = new Date();
      let newDate = new Date();
      this.dateEnd = myDate;
      newDate.setDate(newDate.getDate() - day);
      this.dateStart = newDate
    },
    // 获取推荐的时间粒度
    getTimeRecommend() {
      let com_name = this.commodityName
      let URL = "/getcommodityTimeadvise2/" + com_name;
      let result;
      getcommodityTimeadvise2(URL).then((response) => {
        let arr = [];
        arr = response.data;
        result = arr[0].timeadvise;
        // 弹窗提醒
        this.timeAdvise = result;
        let message = com_name + "推荐时间粒度为：" + result + "天"
        this.$message({
          message: message,
          type: 'success'
        });
        // 自动填充
        this.setTimeRecommend(result);
      }).catch(function (error) {
        console.log(error);
      });
    },
    having() {
      return this.taskin.id !== "";
    },
    // 提交创建的新任务
    createTask() {
      this.formDialogVisible = true;
    },
    // 提交创建的新任务
    createTaskSource() {
      this.formTaskVisible = true;
    },
    postAddress() {
      this.$confirm('是否确认创建该监管任务', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let contt = ''
        for (var i = 0; i < this.checkedCities.length; i++) {
          if (i === 0)
            contt += this.checkedCities[i];
          if (i > 0)
            contt += ',' + this.checkedCities[i];
        }
        this.content = contt
        this.postData();
        this.$parent.$parent.reloadPage()
      }).catch(() => {
        let contt = ''
        for (var i = 0; i < this.checkedCities.length; i++) {
          if (i === 0)
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
      let timestamp = parseInt(new Date().getTime() / 1000);
      let d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
      let date = (d.getFullYear()) + "-" +
          (d.getMonth() + 1) + "-" +
          (d.getDate()) + " " +
          (d.getHours()) + ":" +
          (d.getMinutes()) + ":" +
          (d.getSeconds());
      let taskName = this.flatName + '-' + this.commodityName + '-' + this.taskType + '(' + date + ')';

      let humannn = (this.humanUse === true ? 1 : 0);

      let inputData = {
        "name": taskName,
        "priority": this.priority,
        "startTime": 1587807522386,
        "endTime": 1588404415698,
        "humanUse": humannn,
        "workingTime": this.workingTime * 3600000,
        "deadLine": new Date(this.deadLine).getTime(),
        "timeadvise": this.timeAdvise,
        "tradeuser": this.tradeUser,
        "content": this.flatName,
        "commodityName": this.commodityName
      };
      taskInput(inputData).then((response) => {
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView").then(
            () => {
              this.$parent.$children[0].active = 1
              this.$store.commit('setStepbarPosition', 1);
            }
        )
      }).catch(function (error) {
        console.log(error);
      });
    },
    goto(route) {
      return new Promise(function () {
        this.$router.push(route);
      })
    },
    abortForm() {
      this.cleanForm();
      this.$parent.$parent.dialogTableVisible = false
    },
    cleanForm() {
      this.input = ''
      this.priority = ''
      this.humanUse = false
      this.tradeUser = false
      this.dateStart = ''
      this.dateStart2 = ''
      this.dateEnd = ''
      this.dateEnd2 = ''
      this.workingTime = ''
      this.deadLine = ''
    },
    // 主动监管名单部分
    getActiveList() {
      getAct(this.commodityName, this.flatName).then(res => {
        this.valueRisk = res.data.data[0][0].riskvalue
        this.valueMean = res.data.data[0][0].riskmean
        this.formActiveList = res.data.data[1]
      })
      this.dialogActiveVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
//.el-form-item {
//  margin-bottom: 50px;
//}

///deep/ .el-form-item {
//  label {
//    font-size: 18px;
//  }
//}

.radio {
  /deep/ .el-radio-group {
    height: 20px;
    width: 60px;

    /deep/ .el-radio {
      margin: 0;
      height: 20px;
    }
  }
}

/deep/ .el-radio__inner {
  width: 20px;
  height: 20px;
  background: transparent !important;
  box-sizing: border-box;
  border: 2px solid #4f9efd;
}

/deep/ .el-radio__inner::after {
  background: #4f9efd;
  width: 10px;
  height: 10px;
}

/deep/ .el-radio__label {
  font-size: 18px;
  font-weight: bolder;
}

/deep/ .el-radio__input.is-checked + .el-radio__label {
  color: #4f9efd;
}
</style>