<template>
  <div class="panel">
    <!--根据日期搜索-->
    <div class="table-panel">
      <h2>舆情信息详情</h2>
      <el-date-picker
          v-model="start_end_date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary"
                 @click="handleClick_search"
                 icon="el-icon-search"
                 style="margin-left: 10px;height: 40px;background: #7a98b2;border: #121313 solid 2px;color: #121313">搜索</el-button>

      <!--风险评估-->
      <el-button type="primary"
                 icon="el-icon-document-checked"
                 style="background: #7a98b2;margin-left: 20px;border: #121313 solid 2px;color: #121313;height: 40px"
                 @click="handleClick_assessment">风险评估</el-button>

      <!--表格-->
      <el-table :data="dormitory.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                border
                style="width: 100%;border: #121313 solid 2px;margin-top: 20px"
                highlight-current-row
                :header-cell-style="{background:'#7a98b2',color:'black'}">
        <el-table-column prop="id" label="编号" ></el-table-column>
        <el-table-column prop="userid" label="用户ID"></el-table-column>
        <el-table-column prop="username" label="用户昵称"></el-table-column>
        <el-table-column prop="authentication" label="用户认证"></el-table-column>
        <el-table-column prop="content" label="内容摘要" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="releasetime" label="发布时间"></el-table-column>
        <el-table-column prop="likenum" label="点赞数"></el-table-column>
        <el-table-column prop="commentnum" label="评论数"></el-table-column>
        <el-table-column prop="forwardnum" label="转发数"></el-table-column>
       <!-- <el-table-column prop="linkaddress" label="链接地址"></el-table-column>-->

        <!--<el-table-column prop="exchangename" label="相关交易所"></el-table-column>-->
        <el-table-column prop="details" label="详情"  >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页器-->
    <div class="pagination_class">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="dormitory.length">
      </el-pagination>
    </div>
    <!--弹出框-->
    <div class="dialog_class">
      <PersonalEventDetailDialog_WB :show="detailShow_WB" title="相关信息详情" @close="closePersonalEventDialog_WB" v-bind:listValue_WB="listValue_WB" ></PersonalEventDetailDialog_WB>
    </div>

    <!--风险评估详情页-->
    <div>
      <riskassessment_details :show="detailShow_assessment" title="风险评估详情" @close="closeRiskAssessmentDialog" v-bind:RiskData="RiskData"></riskassessment_details>
    </div>

  </div>

</template>

<script>
import PersonalEventDetailDialog_WB from "../PersonalEventDetailDialog_WB";
import {
  getDetailTableData, getRiskAssessmentData,
  getSearchTableData,
  getWbInformationByDate
} from "../../../../api/part1/PublicSentimentRisk";
import riskassessment_details from "./riskassessment_details";

export default {
  name: "opinions_details",
  components: {PersonalEventDetailDialog_WB,riskassessment_details},
  data(){
    return{
      //日期范围
      start_end_date:'',

      //表格数据
      dormitory:[],
      dataConvert_WB:[],
      //分页器相关变量
      currentPage:1,
      pageSizes:[5,8,15,20],
      PageSize:8,

      listValue_WB:[],//传给dialog的数据
      detailShow_WB:false,//详情展示dialog

      //风险评估详情dialog参数
      detailShow_assessment:false,
      RiskData:{},
    }
  },
  created() {
    // let start_date=new Date();
    // start_date.setHours(0);
    // start_date.setMinutes(0);
    // start_date.setSeconds(0);
    // let end_date=new Date();
    // end_date.setHours(23);
    // end_date.setMinutes(59);
    // end_date.setSeconds(59);
    this.getTableData();
  },
  methods:{
    //根据日期范围搜索信息
    handleClick_search()
    {
      if(this.start_end_date==='')
      {
        this.$message.error("请选择时间范围");
      }
      else
      {
        let start_time=new Date(this.start_end_date[0]);
        let end_time=new Date(this.start_end_date[1]);
        end_time.setHours(23);
        end_time.setMinutes(59);
        end_time.setSeconds(59);
        this.getSearchTableData(start_time,end_time);
      }
    },
    //获取表格数据
    getTableData()
    {
      // let URL_WB='/getWbInformationByDate/'+start_date+'/'+end_date;
      // getWbInformationByDate(URL_WB).then((res) =>{
      let URL_WB='/getDetailTableData';
      getDetailTableData(URL_WB).then((res) =>{
        this.dataConvert_WB=res.data;
        //转换时间戳
        for(let i=0;i<this.dataConvert_WB.length;i++)
        {
          this.dataConvert_WB[i].releasetime=this.timestampToTime(this.dataConvert_WB[i].releasetime);
          this.dataConvert_WB[i].jointime=this.timestampToTime(this.dataConvert_WB[i].jointime);
        }
        this.dormitory=this.dataConvert_WB;
      }).catch(() => {
        console.log("获取表格数据失败");
      })
    },
    //获取搜索框点感情表格数据
    getSearchTableData(start_date,end_date)
    {
      let URL_WB='/getSearchTableData/'+start_date+'/'+end_date;
      getSearchTableData(URL_WB).then((res) =>{
        this.dataConvert_WB=res.data;
        //转换时间戳
        for(let i=0;i<this.dataConvert_WB.length;i++)
        {
          this.dataConvert_WB[i].releasetime=this.timestampToTime(this.dataConvert_WB[i].releasetime);
          this.dataConvert_WB[i].jointime=this.timestampToTime(this.dataConvert_WB[i].jointime);
        }
        this.dormitory=this.dataConvert_WB;
      }).catch(() => {
        console.log("获取表格数据失败");
      })
    },
    // 转换时间戳
    timestampToTime (cjsj) {
      var date = new Date(cjsj) ;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = (date.getDate() <10 ? '0'+date.getDate():date.getDate())+ ' ';
      var h = (date.getHours()<10 ? '0'+date.getHours() :date.getHours() )+ ':';
      var m = (date.getMinutes()<10 ? '0'+date.getMinutes() :date.getMinutes() );
      return Y+M+D+h+m
    },
    //分页器相关函数
    handleSizeChange(val)
    {
      this.PageSize=val;// 改变每页显示的条数
      this.currentPage=1;// 注意：在改变每页显示的条数时，要将页码显示到第一页
    },
    handleCurrentChange(val)
    {
      this.currentPage=val; // 改变默认的页数
    },
    //查看详情
    handleClick(val)
    {
      //显示dialog
      this.detailShow_WB=true;
      //传值给dialog
      let index = 0;
      for(let i = 0; i<this.dataConvert_WB.length; i++)
      {
        if(this.dataConvert_WB[i].id===val.id)
        {
          index=i;
          break;
        }
      }
      this.listValue_WB=this.dataConvert_WB[index];
    },
    //关闭查看详情弹出框
    closePersonalEventDialog_WB(){
      this.detailShow_WB=false;
    },

    /***
     * **************************************************************************************************
     * **************************************************************************************************
     */
    handleClick_assessment()
    {
      this.detailShow_assessment=true;
    },
    closeRiskAssessmentDialog()
    {
      this.detailShow_assessment=false;
    },
  }
}
</script>

<style lang="scss" scoped>
.panel {
  background: #ffffff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  border-color: rgba(0, 0, 0, .05);

  .table-panel{
    position: relative; //位置
    overflow: hidden;
    color: #666;
    background: #ffffff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05); //阴影
    border-color: rgba(0, 0, 0, .05); //四个边框颜色
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>