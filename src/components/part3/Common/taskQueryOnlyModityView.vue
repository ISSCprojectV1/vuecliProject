<template>
  <div>
    <div class="dormitoryData">
      <el-table
          ref="dormitoryTable"
          :data="dormitory.slice((currentPage-1)*PageSize,currentPage*PageSize)"
          tooltip-effect="dark"
          stripe
          style="width: 100%"
          border
          v-loading="loading"
          element-loading-text="加载中"
      >
        <!--任务基本-->
        <el-table-column label="序号" prop="id" width="60"></el-table-column>
        <el-table-column label="监管任务名称" prop="name">
        </el-table-column>
        <!--人机模态
                <el-table-column label="人机模态" width="80" align = "center">
                <el-table-column label="人模态分布" prop="humanUse" width="80">
                </el-table-column>
                <el-table-column label="机器模态分布数" prop="agentNum" width="80">
                </el-table-column>
                </el-table-column>
                -->
        <!--主被动模态-->
        <el-table-column label="主被动模态" prop="content">
          <template slot-scope="scope">
            <el-link :disabled="setdis(scope)" type="primary">
              <div @click="gotoDetail(scope.row.id)">
                {{ scope.row.content }}
              </div>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="风险值（按日更新）" prop="name">
          <template slot-scope="scope">
            <el-link :disabled="setdis(scope)" type="primary">
              <div @click="gotoPassive(scope.row.id)">
                {{ scope.row.content }}
              </div>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="下次风险值更新时间" prop="name">
       {{buttonName}}
        </el-table-column>
        <el-table-column label="在线/离线" prop="name">
        </el-table-column>
        <el-table-column label="主动监管/被动监管" prop="name">

        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="pageSizes"
                     :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="totalCount">
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
      pageSizes: [5, 10],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 100,
      loading: false,
      taskin: {
        changeflag:
        Number.NEGATIVE_INFINITY
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
  methods: {
    /*
    * 商品粒度模块Method
    */
    // 补全商品粒度，获得商品粒度推荐名单
    getCommodity(val) {
      this.temp = val.id;
      console.log("getCommodity:", this.temp)
      this.commodityDialogVisible = true;
      let URL = '/getcommodityRelationdetails/' + val.commodityName;
      getcommodityRelationdetails2(URL).then((response) => {
        console.log("result------", response.data)
        for (let i = 0; i < response.data.length; i++) {
          let temp = {};
          console.log("result:", response.data[i])
          temp.commodityDialog_id = response.data[i].id2;
          temp.commodityDialog_name = response.data[i].name2;
          temp.commodityDialog_num = response.data[i].similarity;
          this.tableData.push(temp);
        }

      })
          .catch(function (error) {
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
      let interval = window.setInterval(function() {
        me.buttonName =  me.time;
        --me.time;
        if(me.time < 0) {
          me.buttonName = 0;
          me.time = 100;
          me.isDisabled = false;
          window.clearInterval(interval);
        }
      }, 1000);

    },

    // 确认追加该粒度
    updateCommodity(val) {
      this.commodityDialogVisible = false;
      let seletCommodity = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        seletCommodity.push(this.multipleSelection[i].commodityDialog_name)
      }
      var newCommodity = {
        "id": this.temp,
        "subtask": seletCommodity.join(',')
      }
      console.log("newCommodity", newCommodity)
      updateCommodity(newCommodity).then(function (response) {
      })
          .catch(function (error) {
            console.log(error);
          });
      this.$message({
        message: '扩展监管种类 成功',
        type: 'success'
      });
      this.reload();// 刷新页面

    },
    /*
 * 空间粒度模块Method
 */
    // 获得空间粒度推荐名单
    getFlats(val) {
      console.log("怎么还是不对", val)
      this.temp = val.id;
      this.flatDialogVisible = true;
      let URL = '/getrecommendrlatform' + '?commodity=' + encodeURIComponent(val.commodityName) + '&platform=' + val.content;
      getrecommendrlatform(URL).then((response) => {
        console.log("result------", response.data.data)
        for (let i = 0; i < response.data.data.length; i++) {
          let temp = {};
          console.log("result:", response.data.data[i])
          temp.platform = response.data.data[i].platform;
          temp.association = response.data.data[i].association;
          this.flatData.push(temp);
        }
        console.log("flatData:", this.flatData)
      })
          .catch(function (error) {
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
      console.log("选中的新商品：", this.temp);
      let seletFlats = [];
      for (let i = 0; i < this.flatsSelection.length; i++) {
        seletFlats.push(this.flatsSelection[i].platform)
      }
      var newFlats = {
        "id": this.temp,
        "resourceNeed": seletFlats.join(',')
      }
      updateCommodity(newFlats).then(function (response) {

      })
          .catch(function (error) {
            console.log(error);
          });
      this.$message({
        message: '扩展监管平台 成功',
        type: 'success'
      });
      this.reload();// 刷新页面
    },
    changespaceResult() {
      spaceResult().then((res) => {
        let datt = res.data.data
        for (var i = 0; i < datt.length; i++) {
          for (var j = 0; j < this.dormitory.length; j++) {
            //console.log(datt[i].id)
            // console.log(this.dormitory[j].id)
            // console.log(datt[i].id==this.dormitory[j].id)
            if (datt[i].id == this.dormitory[j].id) {
              this.dormitory[j].subtask = datt[i].subtask
              console.log(this.dormitory[j])
              console.log(this.dormitory)
              break;
            }
          }
        }
        console.log(this.dormitory)

        console.log(res.data.data)
      }).catch(() => {
        console.log("getTransactionData fail")
      });
    },
    setgoto(scope) {
      return scope.row.commodityName !== "小麦";
    },
    goToprice() {
      //直接跳转
      this.$router.push('/trade/Multimodal-multigranularity/priceshow');
    },
    setdis(scope) {
      return scope.row.content === "暂时未分配";
    },
    gotoDetail(id) {
      this.$router.push(`/trade/acpassTask/activetask/${id}`);
    },
    changetime(data) {
      changetimeadvise().then((res) => {
        this.dealwithData(res)
      }).catch(() => {
        console.log("taskQuery fail")
      });
    },
    changetask(scope) {
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
    gotoPassive(id){
      this.$router.push(`/trade/acpassTask/passivetradeaction/${id}`)
    },
    getData() {
      var idd = getToken()
      console.log(idd)
      var url = '/getTaskById/' + idd
      console.log(url)
      //  console.log(taskQueryById(url))
      var url2 = '/getroles/' + idd
      console.log(getRolenameById(url2))
      // 获取表格数据
      console.log("获取表格数据")
      console.log(this.user)
      console.log(getToken())

      taskQuery().then((res) => {
        console.log("look----", res.data)
        this.dealwithData(res)
      }).catch(() => {
        console.log("getTransactionData fail")
      });
    },
    dealwithData(res) {
      let dataConvert = [];
      dataConvert = res.data.data;
      this.totalCount = dataConvert.length
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
  },
  created() {
    this.getData();
    this.sendMsg()
  },
  mounted() {
    this.loading = true;
  }
}
</script>

<style scoped>
.dormitoryData {
  width: 100%;
  height: 600px;
}

.el-table thead {
  color: black;
}
</style>