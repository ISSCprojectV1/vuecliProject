<template>
  <div class="panel">
    <!--第一部分-->
    <el-row :gutter="60" class="panel-group">
      <!--卡片(左)-->
      <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
        <el-card class="box-card">
          <!--图标-->
          <div class="card-panel-icon-wrapper icon-opinions-num">
            <i class="el-icon-s-comment" slot="reference"></i>
          </div>
          <!--文字显示-->
          <div class="card-panel-description">
            <div class="card-panel-text">舆情数目汇总</div>
            <div class="card-panel-num">
              <div id="card_opinions_num">{{OpinionsNum_WB}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <!--卡片（右）-->
      <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
        <el-card class="box-card">
          <!--图标-->
          <div class="card-panel-icon-wrapper icon-danger-opinions">
            <i class="el-icon-warning" slot="reference"></i>
          </div>
          <!--文字显示-->
          <div class="card-panel-description">
            <div class="card-panel-text">重要舆情数目</div>
            <div class="card-panel-num">
              <div id="card_dangerous_num">{{ImportantNum_WB}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--第二部分-->
    <el-row :gutter="60" class="panel-group">
      <!--饼图-->
      <el-col :xs="24" :sm="24" :lg="12" class="graph-panel-col">
        <div class="graph-panel">
          <div class="pie-chart-panel">
            <div>
              <div id="pie_graph" ref="pie_graph" :style="{width: '100%', height: '320px'}"></div>
            </div>
          </div>
        </div>
      </el-col>
      <!--词云-->
      <el-col :xs="24" :sm="24" :lg="12" class="graph-panel-col">
        <div class="graph-panel">
          <div class="cloud_panel">
            <div>
              <div id="word_cloud" ref="word_cloud"  :style="{width: '100%', height: '320px'}"></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!--第三部分-->
    <el-row :gutter="60" class="panel-group">
      <!--柱状图和搜索框-->
      <el-col :xs="24" :sm="24" :lg="24" class="graph-panel-col">
        <div class="form_bar_panel">
          <!--搜索框-->
          <div class="search_panel" style="width: calc(100% - 7px);height: 30px;float: left;margin: 10px 7px 10px 0;">
            <div>
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
                         style="margin-left: 10px;height: 40px;background: #7a98b2;border: #121313 solid 2px;color: #121313">
                查询</el-button>
            </div>
          </div>
          <!--柱状图-->
          <div class="bar_panel" style="width: calc(100% - 7px);height: 320px;float: left;margin: 10px 7px 10px 0;">
            <div>
              <div id="bar_graph" ref="bar_graph" :style="{width: '100%', height: '320px' }" ></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getOpinionsWbInformation} from "../../../../api/part1/PublicOpinionsRisk";
import {
  getBarGraphData_WB,
  getOpinionsNum,
  getPieGraphData_WB, getSearchBarGraphData_WB,
  getWordsCloudData_WB
} from "../../../../api/part1/PublicSentimentRisk";
require('echarts-wordcloud');

export default {
  name:'opinions_main2',
  data(){
    return{
      OpinionsNum_WB:0,//舆情总数
      ImportantNum_WB:0,//重要舆情数目

      //饼图选项设置
      PieGraphData:[],//舆情用户来源分布数据（地址）
      pie_graph:null,//舆情用户来源分布饼图
      PieGraphOptions:{
        title: {
          text: '饼状图',
          x: 'center',//标题位置
          textStyle:{
            color:"#121313",
            fontSize:18,//字体大小
          },
        },

        tooltip: {//鼠标划过时饼图上显示的数据
          trigger: 'item',
          confine:true,//将此限制打开后tooltip将不再溢出
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {//图例
          data: [],
          left: "center",//控制图例位置
          orient: "vertical",//图例的显示方式，默认横向显示
          bottom: 'bottom',//图例位置
          textStyle: { color: "#121313" },//图例中文字的样式
          icon: "circle",//图例形状设置
        },
        series: [
          {
            name: '饼状图',
            type: 'pie',
            radius : '55%',//饼图中饼状部分的大小占整个父元素的百分比
            center: ['50%', '50%'],//整个饼图在整个父元素中的位置
            data: [],
            itemStyle:{
              normal:{
                label: {
                  emphasis: {
                    show: true,
                    position: "right",
                    labelLine:{show:true,},
                  },
                },
              }
            },

          }
        ]
      },

      //词云选项设置
      WordCloudData:[],
      word_cloud:null,
      WordCloudOptions:{
        title: {
          text: "词云",
          x: "center"
        },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            sizeRange: [14, 26],
            rotationRange: [0, 0],
            //随机生成字体颜色
            textStyle: {
              normal: {
                color: function() {
                  return (
                      "rgb(" +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ")"
                  );
                }
              }
            },
            //位置相关设置
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "100%",
            height: "100%",
            //数据
            data: [],
          }
        ]
      },

      //日期范围
      start_end_date:'',

      //柱状图选项设置
      bar_graph:null,
      BarGraphData:[],
      BarGraphOptions:{
        title:{
          text:'舆情信息数目',
          x:'center',//居中
          textStyle:{//主标题样式
            color: "#121313",
            fontSize: 18
          },
        },
        toolbox: { //可视化的工具箱
          show: true,
          feature: {
            dataView: { //数据视图
              show: true
            },
            restore: { //重置
              show: true
            },
            dataZoom: { //数据缩放视图
              show: true
            },
            saveAsImage: {//保存图片
              show: true
            },
            magicType: {//动态类型切换
              type: ['bar', 'line']
            }
          }
        },
        tooltip:{
          trigger:"axis",
        },
        legend:{data: ['舆情数目'],x:'left'},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis:[{
          type: 'category',
          boundaryGap: true,
          axisTick: {show: false},
          data:[],
          name:'日期',
        }],
        yAxis:[{
          type: 'value',
          axisTick: {show: false},
          name: '（条）'
        }],
        series:[
          {
            name: '舆情数目',
            type: 'bar',
            barMaxWidth:65,
            boundaryGap:true,
            data: [],
            itemStyle: { normal: { areaStyle: { type: 'default' }, color: 'rgb(122,152,178)' } }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            show: true,
            start: 0,
            end: 100,
            handleSize: 8,
          },
        ],
      },
    }
  },
  created() {
    this.getOpinionsNum();
  },
  mounted() {
    //词云
    this.word_cloud = this.$echarts.init(document.getElementById('word_cloud'));
    this.word_cloud.setOption(this.WordCloudOptions);

    //饼图
    this.pie_graph = this.$echarts.init(document.getElementById('pie_graph'), 'macaroons');
    this.pie_graph.setOption(this.PieGraphOptions);

    //柱状图
    this.bar_graph=this.$echarts.init(document.getElementById('bar_graph'));
    this.bar_graph.setOption(this.BarGraphOptions);
  },

  methods:{
    /***
     * 获取舆情数目,饼图，词云
     */
    getOpinionsNum()
    {
      var URL_Wb='/getOpinionsNum';
      getOpinionsNum(URL_Wb).then((res) => {
        //获取舆情总数
        this.OpinionsNum_WB=res.data.total_num;
        //获取重要舆情数
        this.ImportantNum_WB=res.data.important_num;

        //获取饼图数据
        this.getPieGraphData();
        //绘制饼图
        //this.drawPieGraph(this.PieGraphData);

        //获取词云数据
        this.getWordsCloudData();
        //绘制词云
        //this.drawWordCloud(this.WordCloudData);

        //获取柱状图数据
        this.getBarGraphData();
        //绘制柱状图
        //this.drawBarGraph(this.BarGraphData);

      }).catch(() => {
        console.log("taskExecution fail Wb")
      })
    },

    /***
     * 获取词云数据
     */
    getWordsCloudData(){
      let URL_wb='/getWordsCloudData_WB';
      getWordsCloudData_WB(URL_wb).then((res) => {
        console.log("获取词云数据！");
        let temp=res.data;
        if(temp.length>0)
        {
          for(let i=0;i<temp.length;i++)
          {
            let obj={};
            obj.name=temp[i].words;
            obj.value=temp[i].num;
            this.WordCloudData[i]=obj;
          }
        }
        else {
          let obj={};
          obj.name='暂无数据';
          obj.value=10;
          this.WordCloudData[0]=obj;
        }
        this.drawWordCloud(temp);
      }).catch(() => {
        console.log("getWbWordsCloudData fail Wb")
      })
    },

    /***
     * 绘制词云
     */
    drawWordCloud(val)
    {
      console.log("绘制微博词云");
      this.WordCloudOptions.title.text="舆情信息词云展示";
      this.WordCloudOptions.series[0].data=val;
      this.word_cloud.setOption(this.WordCloudOptions);
    },


    /***
     * 获取饼图数据
     */
    getPieGraphData()
    {
      let URL_wb='/getPieGraphData_WB';
      getPieGraphData_WB(URL_wb).then((res) => {
        let temp=res.data;
        for(let i=0;i<temp.length;i++)
        {
          if(temp.length>0)
          {
            let obj={};
            obj.name=temp[i].name;
            obj.value=temp[i].num;
            this.PieGraphData[i]=obj;
          }
          else
          {
            let obj={};
            obj.name='暂无数据';
            obj.value=10;
            this.PieGraphData[0]=obj;
          }
        }
        this.drawPieGraph(this.PieGraphData);
      }).catch(() => {
        console.log("getPieGraphData_WB fail Wb")
      })
    },
    /***
     * 绘制饼图
     */
    drawPieGraph(val)
    {
      console.log('绘制饼图！');
      this.PieGraphOptions.title.text="舆情来源地域分布";
      this.PieGraphOptions.series[0].data=val;
      this.pie_graph.setOption(this.PieGraphOptions);
    },

    /***
     * 获取柱状图数据
     */
    getBarGraphData()
    {
      let URL_wb='/getBarGraphData_WB';
      getBarGraphData_WB(URL_wb).then((res) => {
        console.log('获取柱状图数据！');
        let temp=res.data;
        let data=[];
        if(temp.length>0)
        {
          for(let i=0;i<temp.length;i++)
          {
            let obj={};
            obj.name=temp[i].name;
            obj.value=temp[i].num;
            data[i]=obj;
          }
        }
        else
        {
          let obj={};
          obj.name='暂无数据';
          obj.value=0;
          data[0]=obj;
        }
        this.BarGraphData=data;
        this.drawBarGraph(data);
      }).catch(() => {
        console.log("getBarGraphData_WB fail Wb")
      })
    },
    /***
     * 绘制柱状图
     */
    drawBarGraph(val)
    {
      console.log('绘制柱状图!');
      var x=[];
      var y=[];
      for(let i=0;i<val.length;i++)
      {
        x[i]=val[i].name;
        y[i]=val[i].value;
      }
      this.BarGraphOptions.xAxis[0].data=x;
      this.BarGraphOptions.series[0].data=y;
      this.BarGraphOptions.title.text='舆情数目查询结果';
      this.bar_graph.setOption(this.BarGraphOptions);
    },

    /***
     * 获取搜索框结果对应数据
     */
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
        this.getSearchBarData(start_time,end_time);
        this.drawBarGraph(this.BarGraphData);
      }
    },
    /***
     * 根据日期获取柱状图数据
     */
    getSearchBarData(start_time,end_time)
    {
      let URL_wb='/getSearchBarGraphData_WB/'+start_time+'/'+end_time;
      getSearchBarGraphData_WB(URL_wb).then((res) => {
        console.log('获取搜索框柱状图数据！');
        let temp=res.data;
        let data=[];
        if(temp.length>0)
        {
          for(let i=0;i<temp.length;i++)
          {
            let obj={};
            obj.name=temp[i].name;
            obj.value=temp[i].num;
            data[i]=obj;
          }
        }
        else
        {
          let obj={};
          obj.name='暂无数据';
          obj.value=0;
          data[0]=obj;
        }
        this.BarGraphData=data;
        this.drawBarGraph(this.BarGraphData);
      }).catch(() => {
        console.log("getSearchBarGraphData_WB fail Wb")
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.panel-group{
  margin-top: 4px;//顶部距离

  .card-panel-col {
    margin-top: 6px;
    margin-bottom: 6px;//底部距离
  }
  .graph-panel-col{
    margin-top: 6px;
    margin-bottom: 6px;
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

    &:hover {//选择器
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-opinions-num{
        background: #08775b;
      }
      .icon-danger-opinions{
        background: #911115;
      }
    }
  }
  .icon-opinions-num{
    color: #08775b;
  }
  .icon-danger-opinions{
    color: #911115;
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
  .el-icon-warning,.el-icon-s-comment{
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
  .graph-panel{
    position: relative; //位置
    overflow: hidden;
    color: #666;
    background: #ffffff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05); //阴影
    border-color: rgba(0, 0, 0, .05); //四个边框颜色
  }

  .form_bar_panel{
    width: 100%;
    height:380px;
    color: #666;
    background: #ffffff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05); //阴影
    border-color: rgba(0, 0, 0, .05); //四个边框颜色
  }

  .cloud_panel{
    width: 100%;
    height:320px;
    color: #666;
    background: #ffffff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05); //阴影
    border-color: rgba(0, 0, 0, .05); //四个边框颜色
  }
}
</style>