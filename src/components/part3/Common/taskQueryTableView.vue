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
        <!--
        <el-table-column label="主被动模态" prop="content">
          <template slot-scope="scope">
            <el-link :disabled="setdis(scope)" type="primary">
              <div @click="gotoDetail(scope.row.id)">
                {{ scope.row.content }}
              </div>
            </el-link>
          </template>
        </el-table-column>--主被动模态-->
        <!--时间粒度-->
        <el-table-column label="时间粒度（天）" prop="timeadvise" width="80">
          <template slot-scope="scope">
            <el-link :disabled="setgoto(scope)">
              <div @click="goToprice()">
                {{ scope.row.timeadvise }}
              </div>
            </el-link>
          </template>
        </el-table-column>
        <!--商品粒度-->
        <el-table-column label="商品粒度" width="80" align="center">
          <el-table-column label="监管种类" prop="commodityName">
          </el-table-column>
          <el-table-column label="扩展监管种类" prop="subtask">
          </el-table-column>
          <el-table-column label="补充商品粒度">
            <template slot-scope="commodity">
              <el-button type="text" @click="getCommodity(commodity.row)">补充粒度</el-button>
              <!--推荐的商品粒度-->
              <el-dialog
                  title="推荐商品粒度名单"
                  :visible.sync="commodityDialogVisible"
                  width="40%"
                  :append-to-body="true">
                <!-- 获取到的商品粒度推荐表，可通过首列的复选框决定要加入监管的相关商品品类-->
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    :default-sort="{prop: 'commodityDialog_num', order: 'descending'}" stripe>
                  <el-table-column
                      type="selection"
                      min-width="55">
                  </el-table-column>
                  <el-table-column
                      prop="commodityDialog_id"
                      label="商品代号"
                      min-width="120">
                  </el-table-column>
                  <el-table-column
                      prop="commodityDialog_name"
                      label="商品类别名称"
                      min-width="120">
                  </el-table-column>
                  <el-table-column
                      prop="commodityDialog_num"
                      label="关联度"
                      min-width="100"
                      sortable>
                  </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="commodityDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateCommodity()">确 定</el-button>
                 </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table-column>

        <!--空间粒度-->
        <el-table-column label="空间粒度" width="80" align="center">
          <el-table-column label="监管平台" prop="content">
          </el-table-column>
          <el-table-column label="扩展监管平台" prop="resourceNeed">
          </el-table-column>
          <el-table-column label="补充空间粒度">
            <template slot-scope="flat">
              <el-button type="text" @click="getFlats(flat.row)">补充粒度</el-button>
              <!--推荐的空间粒度-->
              <el-dialog
                  title="推荐空间粒度名单"
                  :visible.sync="flatDialogVisible"
                  width="40%"
                  :append-to-body="true"
              >
                <!-- 获取到的空间粒度推荐表，可通过首列的复选框决定要加入的监管空间-->
                <el-table
                    ref="flatTable"
                    :data="flatData"
                    tooltip-effect="dark"
                    @selection-change="handleFlatChange"
                    :default-sort="{prop: 'association', order: 'descending'}" stripe>
                  <el-table-column
                      type="selection"
                      min-width="55">
                  </el-table-column>
                  <el-table-column
                      prop="platform"
                      label="平台名称"
                      min-width="120">
                  </el-table-column>
                  <el-table-column
                      prop="association"
                      label="关联度"
                      min-width="100" sortable>
                    <template slot-scope="scope">
                      {{ scope.row.association.toFixed(4) }}
                    </template>
                  </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
    <el-button @click="commodityDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateFlat()">确 定</el-button>
  </span>
              </el-dialog>
              <el-button type="text" style="margin-left: 0.5rem" @click="goToSpaceDetail(flat.row.id)">详情</el-button>
            </template>
          </el-table-column>
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

    }
  },
  methods: {
    /*
    * 商品粒度模块Method
    */
    // 补全商品粒度，获得商品粒度推荐名单
    getCommodity(val) {
      this.tableData = [];
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
    /* 空间粒度模块Method */
    // 获得空间粒度推荐名单
    getFlats(val) {
      this.flatData = [];
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
            //console.log(datt[i].id)
            // console.log(this.dormitory[j].id)
            // console.log(datt[i].id==this.dormitory[j].id)
            if (datt[i].id === this.dormitory[j].id) {
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
      console.log(`/trade/acpassTask/activetask/${id}`)
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
    // 详情跳空间粒度模块
    goToSpaceDetail(id) {
      this.$router.push(`/trade/acpassTask/viewSpaceGranularity/${id}`);
    },
  },
  created() {
    this.getData();
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