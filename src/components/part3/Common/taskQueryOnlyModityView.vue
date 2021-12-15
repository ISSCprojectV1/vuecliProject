<template>
  <div>
    <div class="dormitoryData">
      <el-table
          :data="dormitory.slice((currentPage-1)*PageSize,currentPage*PageSize)"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="getHeaderStylesheet"
          v-loading="loading"
          element-loading-text="加载中"
          :cell-style="{padding:'3px'}">
        <!--任务基本-->
        <el-table-column label="序号" prop="id" min-width="25"></el-table-column>

        <el-table-column label="监管任务名称" min-width="80" prop="name"></el-table-column>

        <!--主被动模态-->
        <el-table-column label="平台" min-width="60" prop="content"></el-table-column>

        <el-table-column label="价格波动频率（按日更新）" min-width="70" prop="riskValue"></el-table-column>

        <el-table-column label="价格波动等级" min-width="45">
          <template slot-scope="scope">
            <span v-if="scope.row.riskMean === '高'" style="color: red">{{ scope.row.riskMean }}</span>
            <span v-else-if="scope.row.riskMean === '中'" style="color: green">{{ scope.row.riskMean }}</span>
            <span v-else-if="scope.row.riskMean === '低'" style="color: orange">{{ scope.row.riskMean }}</span>
          </template>
        </el-table-column>

        <el-table-column label="主/被动监管" prop="activePassive" min-width="45">
          <template slot-scope="scope">
            <el-link type="primary" v-if="scope.row.activePassive === 1">
              <div @click="gotoDetail(scope.row.id)">
                主动监管
              </div>
            </el-link>
            <el-link type="primary" v-else-if="scope.row.activePassive === 0">
              <div @click="gotoPassive(scope.row.id,1)">
                被动监管
              </div>
            </el-link>
            <span v-else>暂无监管</span>
          </template>
        </el-table-column>

        <el-table-column label="在线/离线" min-width="45">
          <template slot-scope="scope">
            {{ scope.row.algoStatus == 0 ? "离线" : "在线" }}
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          style="margin-top: 0.5rem">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  changetimeadvise,
  taskQuery,
  spaceResult,
  getRolenameById,
  getcommodityRelationdetails2,
  updateCommodity,
  getrecommendrlatform
} from "@/api/part1/Multimodal-multigranularity";
import {
  getModeSwitchById,
  getModeSwitch
} from "@/api/part1/riskPrediction";

import {getToken} from "@/utils/auth"

export default {
  name: "taskQueryTableView",
  components: {},
  inject: ['reload'],
  data() {
    return {
      tempId: 0,
      dormitory: [],
      // 默认显示第几页
      currentPage: 1,
      // 条数选择器（可修改）
      pageSizes: [5, 10, 20, 50],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 100,
      loading: false,
      taskin: {
        changeflag: Number.NEGATIVE_INFINITY
      },
      // 补全商品粒度
      commodityDialogVisible: false,
      // 商品粒度推荐表
      tableData: [],
      // 商品粒度复选框
      multipleSelection: [],
      // 空间粒度表格显示状态
      flatDialogVisible: false,
      // 空间粒度推荐表
      flatData: [],
      // 空间粒度复选框
      flatsSelection: [],
      time: 100,
      buttonName: "0",
    }
  },
  created() {
    //this.getData();
    this.getModeSwitchAll()
    this.sendMsg()
  },
  mounted() {
    this.loading = true;
  },
  methods: {
    getHeaderStylesheet() {
      return {
        'background-color': '#f8f8f8',
        'color': '#909399',
        'font-weight': 'bold',
        'padding-top': '20px',
        'padding-bottom': '20px',
      }
    },
    // 商品粒度模块Method
    // 补全商品粒度，获得商品粒度推荐名单
    getCommodity(val) {
      this.temp = val.id;
      this.commodityDialogVisible = true;
      let URL = '/getcommodityRelationdetails/' + val.commodityName;
      getcommodityRelationdetails2(URL).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let temp = {};
          temp.commodityDialog_id = response.data[i].id2;
          temp.commodityDialog_name = response.data[i].name2;
          temp.commodityDialog_num = response.data[i].similarity;
          this.tableData.push(temp);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 追加商品粒度复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    sendMsg() {
      let me = this;
      me.isDisabled = true;
      let interval = window.setInterval(function () {
        me.buttonName = me.time;
        --me.time;
        if (me.time < 0) {
          me.buttonName = 0;
          me.time = 100;
          me.isDisabled = false;
          window.clearInterval(interval);
        }
      }, 1000);
    },
    // 确认追加该粒度
    updateCommodity() {
      this.commodityDialogVisible = false;
      let selectedCommodity = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        selectedCommodity.push(this.multipleSelection[i].commodityDialog_name)
      }
      let newCommodity = {
        "id": this.temp,
        "subtask": selectedCommodity.join(',')
      }
      updateCommodity(newCommodity).then(function (response) {
      }).catch(function (error) {
        console.log(error);
      });
      this.$message({
        message: '扩展监管种类 成功',
        type: 'success'
      });
      this.reload();// 刷新页面
    },
    // 空间粒度模块Method
    // 获得空间粒度推荐名单
    getFlats(val) {
      this.temp = val.id;
      this.flatDialogVisible = true;
      let URL = '/getrecommendrlatform' + '?commodity=' + encodeURIComponent(val.commodityName) + '&platform=' + val.content;
      getrecommendrlatform(URL).then((response) => {
        for (let i = 0; i < response.data.data.length; i++) {
          let temp = {};
          temp.platform = response.data.data[i].platform;
          temp.association = response.data.data[i].association;
          this.flatData.push(temp);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 追加空间粒度复选框
    handleFlatChange(val) {
      this.flatsSelection = val;
    },
    // 确认追加该空间粒度
    updateFlat(val) {
      this.flatDialogVisible = false;
      let selectedFlats = [];
      for (let i = 0; i < this.flatsSelection.length; i++) {
        selectedFlats.push(this.flatsSelection[i].platform)
      }
      let newFlats = {
        "id": this.temp,
        "resourceNeed": selectedFlats.join(',')
      }
      updateCommodity(newFlats).then(function (response) {

      }).catch(function (error) {
        console.log(error);
      });
      this.$message({
        message: '扩展监管平台 成功',
        type: 'success'
      });
      this.reload();// 刷新页面
    },
    changeSpaceResult() {
      spaceResult().then((res) => {
        let datt = res.data.data
        for (var i = 0; i < datt.length; i++) {
          for (var j = 0; j < this.dormitory.length; j++) {
            if (datt[i].id === this.dormitory[j].id) {
              this.dormitory[j].subtask = datt[i].subtask
              break;
            }
          }
        }
      }).catch(() => {
        console.log("getTransactionData fail")
      });
    },
    setGoTo(scope) {
      return scope.row.commodityName !== "小麦";
    },
    goToPrice() {
      //直接跳转
      this.$router.push('/trade/Multimodal-multigranularity/priceshow');
    },
    setDis(scope) {
      return scope.row.content === "暂时未分配";
    },
    gotoDetail(id) {
      this.$router.push(`/trade/acpassTask/activetask/${id}`);
    },
    changeTime() {
      changetimeadvise().then((res) => {
        this.dealWithData(res)
      }).catch(() => {
        console.log("taskQuery fail")
      });
    },
    changeTask(scope) {
      this.taskin = scope.row
      this.taskin.changeflag = this.taskin.id;
      this.addNewTask1()
    },
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
    },
    gotoPassive(id, passive) {
      this.$router.push({
        path: '/trade/acpassTask/activetask/' + id,
        query: {
          data: passive
        }
      });
    },
    getData() {
      let idd = getToken()
      let url = '/getTaskById/' + idd
      let url2 = '/getroles/' + idd
      // 获取表格数据
      taskQuery().then((res) => {
        this.dealWithData(res)
      }).catch(() => {
        console.log("getTransactionData fail")
      });
    },
    getModeSwitchAll() {
      getModeSwitch().then((res) => {
        this.dealWithRiskData(res.data.data);
      }).catch(() => {
        console.log("getModeSwitchAll fail")
      });
    },
    AddDorDataWithRisk(res) {
      console.log(res)
      console.log(this.dormitory)
      let dataConvert = this.dormitory
      if (dataConvert.length <= 0 || res.length <= 0)
        return
      for (let i = 0; i < dataConvert.length; i++) {
        for (let j = 0; j < res.length; j++) {
          if (dataConvert[i].id === res[j].id) {
            dataConvert[i].riskValue = res[j].riskValue
            dataConvert[i].riskMean = res[j].riskMean
            dataConvert[i].activePassive = res[j].activePassive
            break
          }
        }
      }
    },
    dealWithData(res) {
      let dataConvert = [];
      dataConvert = res.data.data;
      this.totalCount = dataConvert.length;
      for (let i = 0; i < dataConvert.length; i++) {
        let data = this.timestampToTime(dataConvert[i].gmtCreate);
        dataConvert[i].gmtCreate = data

        data = this.timestampToTime(dataConvert[i].gmtModified)
        dataConvert[i].gmtModified = data

        data = this.timestampToTime(dataConvert[i].startTime)
        dataConvert[i].startTime = data

        data = this.timestampToTime(dataConvert[i].endTime)
        dataConvert[i].endTime = data

        if (dataConvert[i].humanUse) // true
          dataConvert[i].humanUse = "是"
        else // false
          dataConvert[i].humanUse = "否"
        if (!dataConvert[i].timeadvise) // true
          dataConvert[i].timeadvise = "否"
        if (!dataConvert[i].commodityName) // true
          dataConvert[i].commodityName = "暂无"

        if (!dataConvert[i].content) // true
        {
          dataConvert[i].content = "暂时未分配"
        }

        if (!dataConvert[i].team) // true
        {
          dataConvert[i].team = "暂时未分配"
        }

        if (!dataConvert[i].subtask) // 追加种类
        {
          dataConvert[i].subtask = "无"
        }
        if (!dataConvert[i].resourceNeed) // 追加平台
        {
          dataConvert[i].resourceNeed = "无"
        }
        if (dataConvert[i].workStatus == null) // true
          dataConvert[i].workStatus = "未分配"
        if (dataConvert[i].workStatus === 0) // true
          dataConvert[i].workStatus = "已分配"
        if (dataConvert[i].workStatus === 1) // true
          dataConvert[i].workStatus = "任务正常"
        if (dataConvert[i].workStatus === 2) // true
          dataConvert[i].workStatus = "任务出现异常"
      }
      dataConvert.reverse()
      this.dormitory = dataConvert;
      this.loading = false;
    },
    dealWithRiskData(data) {
      let dataConvert = [];
      dataConvert = data;
      this.totalCount = data.length;
      dataConvert.reverse();
      this.dormitory = dataConvert;
      this.loading = false;
    },
    // 转换时间戳
    timestampToTime(cjsj) {
      const date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      const D = date.getDate() + ' ';
      const h = date.getHours() + ':';
      const m = date.getMinutes() + ':';
      const s = date.getSeconds();
      return Y + M + D + h + m + s
    },
  }
}
</script>

<style scoped>
.dormitoryData {
  width: 100%;
}
</style>