<template>
  <div>
    <div class="task-input-box">

      <!--输入任务表单-->
      <el-form label-width="130px">

        <!--选择监管商品类别-->
        <el-form-item label="商品种类">
          <el-col :span="13">
            <el-input v-model="commodityName" placeholder="请输入内容" @change="handleChange"></el-input>
          </el-col>
        </el-form-item>

        <!--监管任务空间粒度，根据选定的商品种类获得平台列表-->
        <el-form-item label="交易平台">
          <el-col :span="13">
            <el-select v-model="flatName" placeholder="请选择平台名称" style="width: 100%">
              <!--动态读取该品类对应的平台-->
              <el-option
                  v-for="(flat, index) in flatList"
                  :key="index"
                  :label="flat.flatName"
                  :value="flat.flatName"
                  @change="handleChange"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <!--选定的监管任务类型-->
        <el-form-item label="监管任务类型">
          <el-col :span="13">
            <el-select v-model="taskType" placeholder="请选择监管类型" style="width: 100%">
              <el-option label="主体查验" value="主体查验"></el-option>
              <el-option label="仓单监管" value="仓单监管"></el-option>
              <el-option label="融资监管" value="融资监管"></el-option>
              <el-option label="质押权监管" value="质押权监管"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <!--人机模块部分需要属性-->




        <el-button type="success" @click="createTask">立即创建</el-button>
        <el-button type="info" @click="abortForm">取消创建</el-button>
      </el-form>

    </div>



    <el-dialog
        title="确认创建任务"
        :visible.sync="formDialogVisible"
        width="50%">
      <!-- 获取到的商品粒度推荐表，可通过首列的复选框决定要加入监管的相关商品品类-->
      <el-form label-position="left" label-width="120px">
        <el-form-item label="商品种类">
          {{ commodityName }}
        </el-form-item>
        <el-form-item label="交易平台">
          {{ flatName }}
        </el-form-item>
        <el-form-item label="监管任务类型">
          {{ taskType }}
        </el-form-item>
        <!-- <el-form-item label="监管任务优先级">
          级别{{ priority }}
        </el-form-item>
        <el-form-item label="监管方式">
          {{ humanUse ? "人工分配" : "机器分配" }}，{{ tradeUser ? "主动监管" : "被动监管" }}
        </el-form-item>
        <el-form-item label="监管周期开始">
          {{ dateStart }}
        </el-form-item>
        <el-form-item label="监管周期结束">
          {{ dateEnd }}
        </el-form-item>
        <el-form-item label="工作时间（小时）">
          {{ workingTime }}
        </el-form-item>
        <el-form-item label="结束时间">
          {{ deadLine }} -->
        <!-- </el-form-item> -->
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="formDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="formDialogTrue">确 定</el-button>
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
  /*
     <el-form-item label="任务周期">
          <el-col :span="5">
            <el-button type="primary" @click="getTimeRecommend">推荐时间粒度</el-button>
          </el-col>
          <el-col :span="7">
            <el-date-picker type="date" placeholder="选择开始日期" v-model="dateStart" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="7">
            <el-date-picker type="date" placeholder="选择结束日期" v-model="dateEnd" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="监管任务名称">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>


        <el-form-item label="是否主动监管">
          <el-col :span="4">
            <el-switch v-model="tradeUser"
                       active-text="主动监管"
            ></el-switch>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="getActiveList">获取主动监管名单</el-button>
          </el-col>
        </el-form-item>
        <!--监管周期--><el-input v-model="deadLine" type="number" placeholder="如非末尾任务请勿输入">
          <!--选定的监管任务优先级-->
        <el-form-item label="监管任务优先级">
          <el-col :span="13">
            <el-select v-model="priority" placeholder="请选择任务优先级" style="width: 100%">
              <el-option label="级别一" value="1"></el-option>
              <el-option label="级别二" value="2"></el-option>
              <el-option label="级别三" value="3"></el-option>
              <el-option label="级别四" value="4"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
          <el-form-item label="是否人工分配">
          <el-col :span="4">
            <el-switch v-model="humanUse"
                       active-text="人工分配"
            ></el-switch>
          </el-col>
        </el-form-item>

        <el-form-item label="工作时间（小时）">
          <el-input v-model="workingTime" placeholder="请输入workingTime"></el-input>
        </el-form-item>

        <el-form-item label="结束时间">
          <el-date-picker type="date" placeholder="选择结束日期" v-model="deadLine" style="width: 100%;"></el-date-picker>

        </el-form-item>

  </el-input>*/
import {
  taskInput,
  bourseget,
  getcommodityRelationdetails2,
  getcommodityTimeadvise2,
  getplatform,
  getrecommendrlatform,
  updateCommodity
} from "@/api/part1/Multimodal-multigranularity";
import {getAct, getRiskVM} from "@/api/part1/acpassTask";
import { radialLayout } from '@antv/g6/lib/util/graphic';

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
          console.log(dataConvert)
          let temp = []
          for (let i = 0; i < dataConvert.length; i++)
            temp.push(dataConvert[i].bourse)
          this.cities = temp
          console.log(temp)
        }
    ).catch(() => {
      console.log("taskQuery fail")
    });
    if (this.taskin) {
      if (Object.prototype.hasOwnProperty.call(this.taskin, 'changeflag'))
        console.log(this.taskin.changeflag)
      console.log(this.taskin.name)
      this.input = this.taskin.name
      this.priority = this.taskin.priority
      this.humanUse = this.taskin.humanUse
      //  if(this.taskin.content)
      // this.content=this.taskin.content+"\r\n"+"aaa"
      this.content = this.taskin.content
      //npm   console.log(this.content)
      /*  if(this.taskin.changeflag==Number.POSITIVE_INFINITY)
  this.cleanForm();*/
    }
  },
  computed: {
    address() {
      console.log(this.taskin)
      return ""
    }
  },
  watch: {
    'taskin.changeflag'() {
      console.log("flag变了")
      console.log(this.taskin)
      this.input = this.taskin.name
      this.priority = (this.taskin.priority) ? this.taskin.priority : 1;
      this.commodityName = this.taskin.commodityName
      this.workingTime = this.taskin.workingTime
      this.deadLine = this.taskin.deadLine
      this.humanUse = this.taskin.humanUse

      this.content = this.taskin.content
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

    /*
    空间粒度部分
    */
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
        console.log(this.flatList);
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


    // @handleCloseFlatTag---关闭空间粒度TAG
    handleCloseFlatTag(flatTag) {
      this.flatTags.splice(this.flatTags.indexOf(flatTag), 1);
    },
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
      console.log("时间粒度 获得商品：", com_name)
      let URL = "/getcommodityTimeadvise2/" + com_name;
      let result;
      getcommodityTimeadvise2(URL).then((response) => {
        let arr = [];
        arr = response.data;
        result = arr[0].timeadvise;
        console.log("result----111:", result);
        // 弹窗提醒
        this.timeAdvise = result;
        let message = com_name + "推荐时间粒度为：" + result + "天"
        this.$message({
          message: message,
          type: 'success'
        });
        // 自动填充
        this.setTimeRecommend(result);
      })
          .catch(function (error) {
            console.log(error);
          });
    },

    having() {
      console.log(this.taskin)
      if (this.taskin.id == "")
        return false
      return true

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
      var timestamp = parseInt(new Date().getTime()/1000);
      var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
      var date = (d.getFullYear()) + "-" + 
           (d.getMonth() + 1) + "-" +
           (d.getDate()) + " " + 
           (d.getHours()) + ":" + 
           (d.getMinutes()) + ":" + 
           (d.getSeconds());
      let taskName = this.flatName+'-'+this.commodityName+'-'+this.taskType+'('+date+')';
      console.log("elementui 时间形式" + startData + "时间2：" + endData)
      console.log("humanuse:" + this.humanUse)
      console.log("taskName:"+taskName)
      console.log(new Date().getTime())
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
      let humannn = (this.humanUse == true ? 1 : 0);
      
      var inputData = {
        "name": taskName,
        "priority": this.priority,
        "startTime": 1587807522386,
        "endTime": 1588404415698,
        "humanUse": humannn,
        "workingTime": this.workingTime*3600000,
        "deadLine": new Date(this.deadLine).getTime(),
        "timeadvise": this.timeAdvise,
        "tradeuser": this.tradeUser,
        "content": this.flatName,
        "commodityName": this.commodityName
      };
      console.log(inputData);
      taskInput(inputData).then((response) =>{
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView")
        console.log(this.$parent)
this.$parent.$children[0].active=1
      })
          .catch(function (error) {
            console.log(error);
          });
    },
    abortForm() {
      console.log("zhioiiiiiii")
      this.cleanForm();
      this.$parent.$parent.dialogTableVisible = false
    },
    cleanForm() {

      console.log("到这里了吗")
      this.input = '',
          this.priority = '',
          this.humanUse = false,
          this.tradeUser = false,
          this.dateStart = '',
          this.dateStart2 = '',
          this.dateEnd = '',
          this.dateEnd2 = '',
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