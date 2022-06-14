<template>
  <div class="panel">
    <div class="graph-panel">
      <h2>舆情桑基图</h2>
      <!--按钮-->
      <div>
        <el-button type="primary" size="small"
                   style="background: #7a98b2;margin-bottom: 10px;border: #121313 solid 2px;color: #121313;height: 38px"
                   @click="handleClick_detection">恶意用户检测</el-button>
        <el-button type="primary" size="small"
                   style="background: #7a98b2;margin-bottom: 10px;border: #121313 solid 2px;color: #121313;height: 38px"
                   @click="handleClick_assessment">风险等级评估</el-button>
      </div>

      <div style="border: #121313 solid 2px;">
        <!--刷新按钮-->
        <div style="width: 100%;height:10px;margin-bottom: 10px ;">
          <el-button type="primary" icon="el-icon-refresh" @click="handleClick_refreshGraph()" style="float: right;background: none;color: #121313;border: none;"></el-button>
        </div>
        <!--桑基图-->
        <div>
          <sankeygraph ref="SankeyGraphShow" v-bind:SankeyData="SankeyData_WB" :style="{width: '100%', height: '800px'}"></sankeygraph>
        </div>
      </div>

      <!--恶意检测详情-->
      <div>
        <maliciousdetection_details :show="detailShow_detection" title="恶意检测详情" @close="closeMaliciousDetectionDialog" v-bind:malicious_data="malicious_data"></maliciousdetection_details>
      </div>
      <!--风险评估详情-->
      <div>
        <riskassessment_details :show="detailShow_assessment" title="风险评估详情" @close="closeRiskAssessmentDialog" v-bind:RiskData="RiskData"></riskassessment_details>
      </div>
    </div>
  </div>
</template>

<script>
import Sankeygraph from "./sankeygraph";
import {getMaliciousUserDetails, getRiskDetails, getWbSankeyGraphData} from "../../../../api/part1/PublicSentimentRisk";
import maliciousdetection_details from "./maliciousdetection_details";
import riskassessment_details from "./riskassessment_details";
export default {
  name: "opinions_risk",
  components: {riskassessment_details, maliciousdetection_details, Sankeygraph},
  data(){
    return{
      //桑基图
      SankeyData_WB:{},
      //恶意检测详情dialog参数
      detailShow_detection:false,
      malicious_data:[],
      //风险评估详情dialog参数
      detailShow_assessment:false,
      RiskData:{},
    }
  },
  created() {
    this.getSankeyData_WB();
  },
  methods:{
    /**
     * 桑基图相关函数
     */
    //获取桑基图数据
    getSankeyData_WB(){
      let title="";
      let data=[];
      let links=[];
      let start_date=new Date();
      start_date.setHours(0);
      start_date.setMinutes(0);
      start_date.setSeconds(0);
      let end_date=new Date();
      end_date.setHours(23);
      end_date.setMinutes(59);
      end_date.setSeconds(59);
      let URL_WB='/getWbSankeyGraphData/'+start_date+'/'+end_date;
      getWbSankeyGraphData(URL_WB).then((res)=>{
        links=res.data.links;
        let nodes=res.data.name;
        for(let i=0;i<nodes.length;i++)
        {
          // let obj={};
          // obj.color="rgb(" + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ")";
          // obj.borderColor=obj.color;
          //data[i]={name:nodes[i],itemStyle:obj};
          data[i]={name:nodes[i],itemStyle:{color:'#7a98b2',borderColor:'#121313'}};
        }
        this.SankeyData_WB={'title':title,'data':data,'links':links};
      }).catch(()=>{
        console.log("获取桑基图数据失败");
      });
    },
    //重新加载桑基图
    handleClick_refreshGraph()
    {
      for(let i=0;i<this.SankeyData_WB.data.length;i++)
      {
        this.SankeyData_WB.data[i].itemStyle.color='#7a98b2';
        this.SankeyData_WB.data[i].itemStyle.borderColor='#121313';
      }
      this.$refs.SankeyGraphShow.drawSankeyGraph();
    },

    /**
     * 恶意用户检测相关函数
     */
    //恶意用户检测(待修改)
    handleClick_detection()
    {
      //获取恶意用户表格数据
      this.getTableData();
    },
    //获取恶意检测表格数据
    getTableData(){
      let URL="/getMaliciousUserDetails";
      getMaliciousUserDetails(URL).then((res) =>{
        this.malicious_data=res.data;
        for(let i=0;i<res.data.length;i++)
        {
          this.malicious_data[i].releasetime=this.timestampToTime(this.malicious_data[i].releasetime);
          this.malicious_data[i].jointime=this.timestampToTime(this.malicious_data[i].jointime);
        }
        //显示弹窗
        this.detailShow_detection=true;
        //在桑基图中显示恶意用户
        this.handleClick_refreshGraph();
        this.changeSankeyGraph();
      }).catch(() => {
        console.log("获取恶意用户详情失败");
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
    //在桑基图中显示恶意用户
    changeSankeyGraph()
    {
      //改变颜色
      for(let i=0;i<this.SankeyData_WB.data.length;i++)
      {
        for(let j=0;j<this.malicious_data.length;j++)
        {
          if(this.SankeyData_WB.data[i].name===this.malicious_data[j].username)
          {
            this.SankeyData_WB.data[i].itemStyle.color='#911115';
            for(let k=0;k<this.SankeyData_WB.links.length;k++)
            {
              if(this.SankeyData_WB.links[k].target===this.malicious_data[j].username)
              {
                let index=this.getIndex(this.SankeyData_WB.links[k].source,this.SankeyData_WB.data);
                this.SankeyData_WB.data[index].itemStyle.borderColor='#fa173e';
              }
            }
          }
        }
      }
      this.$refs.SankeyGraphShow.drawSankeyGraph();
    },
    //读取位置
    getIndex(val,data)
    {
      let index=0;
      for(let i=0;i<data.length;i++)
      {
        if(val===data[i].name)
        {
          index=i;
          break;
        }
      }
      return index;
    },
    //关闭弹窗
    closeMaliciousDetectionDialog()
    {
      this.detailShow_detection=false;
    },

    /**
     * 风险评估相关函数
     */
    //风险评估
    handleClick_assessment()
    {
      //获取风险评估详情
      let URL="/getRiskDetails";
      getRiskDetails(URL).then((res) =>{
        this.RiskData=res.data;
        this.detailShow_assessment=true;
      }).catch(() => {
        console.log("获取风险评估详情失败");
      })
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

  .graph-panel{
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