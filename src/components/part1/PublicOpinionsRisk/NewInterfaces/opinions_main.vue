<template>
  <div class="panel">
    <el-row :gutter="60" >
      <!--卡片-->
      <el-col :xs="24" :sm="24" :lg="24" class="graph-panel-col">
        <div class="card-panel">
          <el-card class="box-card">
            <div class="card-panel-icon-wrapper icon-opinions-num">
              <i class="el-icon-s-comment" slot="reference"></i>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">今日舆情数目</div>
              <div class="card-panel-num">
                <div id="card_opinions_num">{{OpinionsNum_WB}}</div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <!--折线图-->
      <el-col :xs="24" :sm="24" :lg="24" class="graph-panel-col">
        <div class="graph-panel">
          <!--刷新按钮-->
          <div style="width: 100%;height:10px;margin-bottom: 10px ;">
            <el-button type="primary" icon="el-icon-refresh" @click="handleClick_refreshLineGraph()" style="float: right;background: none;color: #121313;border: none;"></el-button>
          </div>
          <div >
            <linegraph ref="LineGraphShow" v-bind:LineGraphData="LineGraphData_WB" :style="{width: '100%', height: '400px'}"></linegraph>
          </div>
        </div>
      </el-col>
      <!--词云-->
      <el-col :xs="24" :sm="24" :lg="24" class="graph-panel-col">
        <div class="graph-panel">
          <!--刷新按钮-->
          <div style="width: 100%;height:10px;margin-bottom: 10px ;">
            <el-button type="primary" icon="el-icon-refresh" @click="handleClick_refreshWordsCloud()" style="float: right;background: none;color: #121313;border: none;"></el-button>
          </div>
          <div >
            <wordscloud  ref="WordsCloudShow" v-bind:WordsCloudData="WordsCloudData_WB" :style="{width: '100%', height: '400px'}"> </wordscloud>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Wordscloud from "./wordscloud";
import Linegraph from "./linegraph";
import {getWbLineGraphData, getWbWordCloudData} from "../../../../api/part1/PublicSentimentRisk";
export default {
  name: "opinions_main",
  components: {Linegraph, Wordscloud},
  data(){
    return{
      //卡片数据
      OpinionsNum_WB:0,
      //词云数据
      WordsCloudData_WB:{},
      //折线图数据
      LineGraphData_WB:{},
    }
  },
  created() {
    this.getWordsCloudData_WB();
    this.getLineGraphData_WB();
  },
  methods:{
    /**
     * 词云相关函数
     */
    //获取词云数据
    getWordsCloudData_WB(){
      let data=[];
      let title="微博舆情词云";
      let start_date=new Date();
      start_date.setHours(0);
      start_date.setMinutes(0);
      start_date.setSeconds(0);
      let end_date=new Date();
      end_date.setHours(23);
      end_date.setMinutes(59);
      end_date.setSeconds(59);
      let URL_WB='/getWbWordCloudData/'+start_date+'/'+end_date;
      getWbWordCloudData(URL_WB).then((res) =>{
        data=res.data;
        this.WordsCloudData_WB={"title":title,"data":data};
      }).catch((e) => {
        console.log("获取词云数据失败,数据长度为"+data.length+","+e);
      })
    },
    //刷新词云
    handleClick_refreshWordsCloud()
    {
      this.$refs.WordsCloudShow.drawWordCloud();
    },
    /**
     * 折线图相关函数
     */
    //获取折线图数据
    getLineGraphData_WB(){
      let title="微博舆情时间分布";
      let data=[];
      let start_date=new Date();
      start_date.setHours(0);
      start_date.setMinutes(0);
      start_date.setSeconds(0);
      let end_date=new Date();
      end_date.setHours(23);
      end_date.setMinutes(59);
      end_date.setSeconds(59);
      let URL_WB='/getWbLineGraphData/'+start_date+'/'+end_date;
      getWbLineGraphData(URL_WB).then((res) =>{
        data=res.data;
        this.LineGraphData_WB={"title":title,"data":data};
        for(let i=0;i<data.length;i++)
        {
          this.OpinionsNum_WB=this.OpinionsNum_WB+data[i];
        }
      }).catch((e) => {
        console.log("获取折线图数据失败,数据长度为"+data.length+","+e);
      })
    },
    //刷新折线图
    handleClick_refreshLineGraph()
    {
      this.$refs.LineGraphShow.drawLineGraph();
    },
  },
}
</script >

<style lang="scss" scoped>
.panel {
  background: #ffffff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  border-color: rgba(0, 0, 0, .05);

  .graph-panel-col{
    margin-top: 6px;
    margin-bottom: 6px;
  }

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

  .card-panel{
    height: 108px;
    cursor: pointer; //指针样式
    font-size: 20px; //字体大小
    position: relative; //位置
    overflow: hidden;
    color: #666;
    background: #ffffff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05); //阴影
    border-color: rgba(0, 0, 0, .05); //四个边框颜色
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;

    &:hover {//选择器
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-opinions-num{
        background: #08775b;
      }
    }
  }
  .icon-opinions-num{
    color: #08775b;
  }
  .card-panel-icon-wrapper {
    float: left;
    padding: 4px; //俩元素内边距宽度
    transition: all 0.38s ease-out;
    border-radius: 6px; //矩形边角弧度
  }
  .card-panel-icon {
    float: left;
    font-size: 48px;
  }
  .el-icon-s-comment{
    float: left;
    font-size: 56px;
  }

  .card-panel-description{
    float: right;
    font-weight: bold;
    margin: 10px 26px 26px 0;//上、右、下、左

    .card-panel-text {
      line-height: 24px;
      color: rgb(18, 19, 19);
      font-size: 18px;
      margin-bottom: 12px;
    }
    .card-panel-num {
      font-size: 20px;
      color: rgb(18, 19, 19);
    }
  }
}
</style>