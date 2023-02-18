<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose" >
    <slot>
     <div style="border: #121313 solid 2px;color: #121313">
       <div style="margin-top: 20px;margin-bottom: 20px;margin-left: 10px;margin-right: 10px">
         <!--时间窗-->
         <el-date-picker
             v-model="start_end_date"
             type="daterange"
             range-separator="至"
             start-placeholder="开始日期"
             end-placeholder="结束日期">
         </el-date-picker>
         <el-button type="primary"
                    @click="handleClick_compute"
                    style="margin-left: 10px;height: 40px;background: #7a98b2;border: #121313 solid 2px;color: #121313">计算</el-button>
         <!--风险详情表格-->
         <table class="riskDetail_table" style="margin-top: 10px;border:#121313 solid 1px;text-align: left" v-if="table_visible">
           <tr>
             <td class="column_key">总博文数</td>
             <td class="column_value">{{parseFloat(RiskData.blog_num).toFixed(0)}}</td>
           </tr>
           <tr>
             <td class="column_key">总用户数</td>
             <td class="column_value">{{parseFloat(RiskData.user_num).toFixed(0)}}</td>
           </tr>
           <tr>
             <td class="column_key">总点赞数</td>
             <td class="column_value">{{parseFloat(RiskData.like_num).toFixed(0)}}</td>
           </tr>
           <tr>
             <td class="column_key">总评论数</td>
             <td class="column_value">{{parseFloat(RiskData.comment_num).toFixed(0)}}</td>
           </tr>
           <tr>
             <td class="column_key">总转发数</td>
             <td class="column_value">{{parseFloat(RiskData.forward_num).toFixed(0)}}</td>
           </tr>
           <tr>
             <td class="column_key">无微博认证用户数</td>
             <td class="column_value">{{parseFloat(RiskData.commonuser_num).toFixed(0)}}</td>
           </tr>
           <tr>
             <td class="column_key">微博个人认证用户数</td>
             <td class="column_value">{{parseFloat(RiskData.yellowVuser_num).toFixed(0)}}</td>
           </tr>
           <tr>
             <td class="column_key">微博官方认证用户数</td>
             <td class="column_value">{{parseFloat(RiskData.blueVuser_num).toFixed(0)}}</td>
           </tr>
           <tr>
             <td class="column_key">时间跨度(小时)</td>
             <td class="column_value">{{parseFloat(RiskData.duration).toFixed(2)}}</td>
           </tr>
           <tr>
             <td class="column_key">平均传播速度(博文数/小时)</td>
             <td class="column_value">{{parseFloat(RiskData.average_speed).toFixed(2)}}</td>
           </tr>
           <tr>
             <td class="column_key">峰值传播速度(博文数/小时)</td>
             <td class="column_value">{{parseFloat(RiskData.peak_speed).toFixed(2)}}</td>
           </tr>
           <tr>
             <td class="column_key">非原创博文比例</td>
             <td class="column_value">{{parseFloat(RiskData.unoriginal_rate).toFixed(2)}}</td>
           </tr>
           <tr>
             <td class="column_key">用户重复比例</td>
             <td class="column_value">{{parseFloat(RiskData.repetitiveuser_rate).toFixed(2)}}</td>
           </tr>
           <tr>
             <td class="column_key">事件影响力</td>
             <td class="column_value" >{{parseFloat(RiskData.event_influence).toFixed(2)}} ({{influence_level}})</td>
           </tr>
           <tr>
             <td class="column_key">事件活跃度</td>
             <td class="column_value">{{parseFloat(RiskData.event_active).toFixed(2)}} ({{activity_level}})</td>
           </tr>
           <tr>
             <td class="column_key" >风险数值</td>
             <td class="column_value" :style="{'color':RiskData.risk_value<0.4?'#08775b':(RiskData.risk_value<0.7?'#f98e0b':'#911115')}">{{RiskData.risk_value}}</td>
           </tr>
           <tr>
             <td class="column_key">风险等级</td>
             <td class="column_value" :style="{'color':RiskData.risk_level==='低'?'#08775b':(RiskData.risk_level==='中'?'#f98e0b':'#911115')}">{{RiskData.risk_level}}</td>
           </tr>
         </table>
       </div>
     </div>
    </slot>
  </el-dialog>
</template>

<script>
import {getRiskAssessmentData} from "../../../../api/part1/PublicSentimentRisk";

export default {
  name: "riskassessment_details",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '详情'
    },
  },
  data(){
    return{
      //dialog参数
      localShow: this.show,

      //详情数据
      RiskData:{},

      //
      table_visible:false,

      //时间选择
      start_end_date:'',

      //
      influence_level:'',
      activity_level:'',
    }
  },
  watch: {
    show(val) {
      this.localShow = val;
    }
  },
  created() {

  },
  methods:{
    /**
     * dialog相关函数
     */
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit('close');
    },

    handleClick_compute()
    {
      if(this.start_end_date==='')
      {
        this.$message.error("请选择时间范围");
      }
      else {
        this.table_visible=true;
        let start_time=new Date(this.start_end_date[0]);
        let end_time=new Date(this.start_end_date[1]);
        end_time.setHours(23);
        end_time.setMinutes(59);
        end_time.setSeconds(59);
        //获取风险评估详情
        let URL="/getRiskAssessmentData/"+start_time+'/'+end_time;
        getRiskAssessmentData(URL).then((res) =>{
          this.RiskData=res.data;

          if(this.RiskData.event_active<10000)
          {
            this.activity_level="低";
          }
          else if(this.RiskData.event_active<10000)
          {
            this.activity_level="中";
          }
          else
          {
            this.activity_level="高";
          }

          if(this.RiskData.event_influence<100000)
          {
            this.influence_level="低";
          }
          else if(this.RiskData.event_influence<1000000) {
            this.influence_level="中";
          }
          else
          {
            this.influence_level="高";
          }

          this.detailShow_assessment=true;
        }).catch(() => {
          console.log("获取风险评估详情失败");
        })
      }
    }

    /* 获取风险评估详情

    getRiskDetailData()
    {
      this.RiskData={
        peak_speed:0,
        average_speed:0,
        wblog_num:0,
        user_num:0,
        label_readnum:0,
        label_discussnum:0,
        user_influence:0,
        user_active:0,
        label_active:0,
        user_maliciousrate:0,
        info_concentration:0,
        user_intensity:0,
        user_communication:0,
      }
    },*/
  }
}
</script>

<style scoped lang="scss">
.riskDetail_table{
  width: 100%;
  height: 100%;
  .column_key{
    background: #f4f6fc;
    font-size: 16px;
    //font-weight: bolder;//加粗
    color: #121313;
    width: 30%;
    height: 10%;
    border:#121313 solid 1px;
    text-align: center;
  }
  .column_value{
    background: #ffffff;
    font-size: 16px;
    color: #121313;
    border:#121313 solid 1px;
    height: 10%;
    text-align: center;
  }
}

</style>