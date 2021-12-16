<template>
  <div class="panel">
    <!--卡片-->
    <el-row :gutter="60" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
        <div class="card-panel" @click="handleClick_opinions">
          <el-card class="box-card">
            <div class="card-panel-icon-wrapper icon-opinions-num">
              <i class="el-icon-s-comment" slot="reference"></i>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">今日舆情数目</div>
              <div class="card-panel-num">
                <div id="card_opinions_num">{{WBopinions_num+TBopinions_num+XWopinions_num+LTopinions_num}}</div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
        <div class="card-panel" @click="handleClick_opinions">
          <el-card class="box-card" >
            <div class="card-panel-icon-wrapper icon-danger-opinions">
              <i class="el-icon-warning" slot="reference"></i>
            </div>
            <div class="card-panel-description" >
              <div class="card-panel-text">重要舆情数目</div>
              <div class="card-panel-num">
                <div id="card_dangerous_num">{{WBdangerous_num+TBdangerous_num+XWdangerous_num+LTdangerous_num}}</div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="panel-group">
      <!--今日舆情数目折线图-->
      <el-col :xs="24" :sm="24" :lg="12" class="graph-panel-col">
        <div class="graph-panel">
          <div class="line-graph-panel">
            <el-tabs type="border-card" v-model="LineName" @tab-click="handleClick_LineGraph" style="height: 380px;">
              <el-tab-pane label="微博" name="WB">
                <div>
                  <div id="line_graph_WB" ref="line_graph_WB" v-if="LineName==='WB'" :style="{width: '100%', height: '320px' }" ></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="新闻" name="XW">
                <div>
                  <div id="line_graph_XW" ref="line_graph_XW" v-if="LineName==='XW'" :style="{width: '100%', height: '320px' }" ></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="论坛" name="LT">
                <div>
                  <div id="line_graph_LT" ref="line_graph_LT" v-if="LineName==='LT'" :style="{width: '100%', height: '320px' }" ></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="贴吧" name="TB">
                <div>
                  <div id="line_graph_TB" ref="line_graph_TB" v-if="LineName==='TB'" :style="{width: '100%', height: '320px' }" ></div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>

      <!--词云-->
      <el-col :xs="24" :sm="24" :lg="12" class="graph-panel-col">
        <div class="graph-panel">
          <div class="cloud_panel">
            <el-tabs type="border-card" v-model="CloudName" @tab-click="handleClick_WordCloud" style="height: 380px;">
              <el-tab-pane label="微博" name="WB">
                <div>
                  <div id="word_cloud_WB" ref="word_cloud_WB" v-if="CloudName==='WB'" :style="{width: '100%', height: '320px'}"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="新闻" name="XW">
                <div>
                  <div id="word_cloud_XW" ref="word_cloud_XW" v-if="CloudName==='XW'" :style="{width: '100%', height: '320px'}"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="论坛" name="LT">
                <div>
                  <div id="word_cloud_LT" ref="word_cloud_LT" v-if="CloudName==='LT'" :style="{width: '100%', height: '320px'}"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="贴吧" name="TB">
                <div>
                  <div id="word_cloud_TB" ref="word_cloud_TB" v-if="CloudName==='TB'" :style="{width: '100%', height: '320px'}"></div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>

    <!--柱状图和表单-->
    <el-row :gutter="60" class="panel-group">
      <el-col :xs="24" :sm="24" :lg="24" class="graph-panel-col">
        <div class="form_bar_panel">
          <!--表单-->
          <div class="form_panel" style="width: calc(20% - 20px);height: calc(100% - 100px);float: left;margin: 40px 10px 20px 10px; ">
            <el-form ref="form" :model="form" label-width="80px" >
              <el-form-item label="起始日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.startdate" style="width: 100%;float:left;"></el-date-picker>
              </el-form-item>
              <el-form-item label="终止日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.enddate" style="width: 100%;float:left;"></el-date-picker>
              </el-form-item>
              <el-form-item label="发布平台">
                <el-select v-model="form.platform" placeholder="请选择平台"  style="width: 100%;float:left;">
                  <el-option label="微博" value="WB"></el-option>
                  <el-option label="贴吧" value="TB"></el-option>
                  <el-option label="新闻" value="XW"></el-option>
                  <el-option label="论坛" value="LT"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="交易所名">
                <el-select v-model="form.exchangename" placeholder="请选择交易所" style="width: 100%;float:left;">
                  <el-option label="全部交易所" value="全部交易所"></el-option>
                  <el-option v-for="item in exchangenamedata" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleClick_searchNum" style="float:left;">查询</el-button>
                <el-button type="primary" @click="handleClick_searchclose" style="float:right;">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--柱状图-->
          <div class="bar_panel" style="width: 55% ;height: calc(100% - 40px);float: left;margin: 20px 0px 20px 0px;">
            <div>
              <div id="bar_graph" ref="bar_graph" :style="{width: '100%', height: '320px' }" ></div>
            </div>
          </div>
          <!--饼图-->
          <div class="pie_panel" style="width: calc(25% - 20px);height: calc(100% - 40px);float: left;margin: 20px 10px 20px 10px;">
            <div class="pie-chart-panel">
              <div id="pie_graph" ref="pie_graph" :style="{width: '100%', height: '320px'}" v-if="PieGraphData"></div>
            </div>
          </div>
        </div>

      </el-col>
    </el-row>

    <!--是否更新dialog-->
    <div class="panel_update">
      <UpdateOpinionsDialog :show="eventShow" title="舆情信息更新" @close="closeUpdateOpinionsDialog" @func="updateOpinions"></UpdateOpinionsDialog>
    </div>

  </div>
</template>

<script>
import {
  getExchangeNameData,
  getLtWordsCloudData,
  getTbWordsCloudData,
  getWbWordsCloudData,
  getXwWordsCloudData,
  getOpinionsLtInformation,
  getOpinionsTbInformation,
  getOpinionsWbInformation,
  getOpinionsXwInformation,
  getTbNewestInformation,
  getTbUpdateStatus,
  getWbNewestInformation,
  getWbUpdateStatus,
  getXwNewestInformation,
  getXwUpdateStatus,
} from "../../../api/part1/PublicOpinionsRisk";
import moment from "moment";
import UpdateOpinionsDialog from "./UpdateOpinionsDialog";
import {Loading} from "element-ui";
import Js2WordCloud from 'js2wordcloud';
require('echarts-wordcloud');


export default {
  name: 'opinions_summary',
  components: {UpdateOpinionsDialog},
  data() {
    return {
      WBopinions_num:0,//微博今日舆情数目
      TBopinions_num:0,//贴吧今日舆情数目
      XWopinions_num:0,//新闻今日舆情数目
      LTopinions_num:0,//论坛今日舆情数目

      WBdangerous_num:0,//微博今日风险舆情数目
      TBdangerous_num:0,//贴吧今日风险舆情数目
      XWdangerous_num:0,//新闻今日风险舆情数目
      LTdangerous_num:0,//论坛今日风险舆情数目

      //折线图选项设置
      LineGraphOptions:{
        title:{
          text:'今日各时舆情信息数目',
          x:'center',//居中
          textStyle:{//主标题样式
            color: "#121313",
            fontSize: 18
          },
        },
        tooltip: {trigger: 'axis'},//触发类型,'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        legend: {data: ['今日各时舆情数目']},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {saveAsImage: {}}
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisTick: {show: false},
          data: ['00:00', '01:00','02:00', '03:00','04:00','05:00', '06:00','07:00', '08:00','09:00', '10:00', '11:00','12:00', '13:00','14:00','15:00', '16:00','17:00', '18:00','19:00', '20:00', '21:00','22:00', '23:00','24:00'],

        }],
        yAxis: [{
          type: 'value',
          axisTick: {show: false},
          name: '（条）'
        }],
        series: [{
          name: '舆情数目',
          type: 'line',
          smooth:true,
          data:[],
          itemStyle: { normal: { areaStyle: { type: 'default' }, color: 'rgba(227,175,111,0.91)' } }
        }]
      },

      line_graph_WB:null,//微博今日舆情数目折线图
      line_graph_XW:null,//新闻今日舆情数目折线图
      line_graph_LT:null,//论坛今日舆情数目折线图
      line_graph_TB:null,//论坛今日舆情数目折线图

      dataConvert_WB:[],//微博舆情信息数据
      dataConvert_TB:[],//贴吧舆情信息数据
      dataConvert_XW:[],//新闻舆情信息数据
      dataConvert_LT:[],//论坛舆情信息数据

      LineGraphData_WB:[],//微博折线图数据
      LineGraphData_XW:[],//新闻折线图数据
      LineGraphData_LT:[],//论坛折线图数据
      LineGraphData_TB:[],//论坛折线图数据

      LineName:'WB',//折线图tabs初始展示页面对应的名称

      //饼图选项设置
      PieGraphOptions:{
        title: {
          text: '舆情信息来源',
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
          data: ['微博', '贴吧', '论坛', '新闻'],
          left: "center",//控制图例位置
          orient: "vertical",//图例的显示方式，默认横向显示
          bottom: 'bottom',//图例位置
          textStyle: { color: "#121313" },//图例中文字的样式
          icon: "circle",//图例形状设置
        },
        series: [
          {
            name: '舆情信息来源',
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

      PieGraphData:[],//舆情信息来源分布数据
      pie_graph:null,//舆情信息来源分布饼图

      //表单
      form:{
        startdate:'',
        enddate:'',
        platform:'',
        exchangename:'',
      },
      //需要从后端获取的交易所数据
      exchangenamedata:[],

      bar_graph:null,//舆情数目柱状图
      //柱状图选项设置
      BarGraphOptions:{
        title:{
          text:'舆情信息数目查询',
          x:'center',//居中
          textStyle:{//主标题样式
            color: "#121313",
            fontSize: 18
          },
        },
        tooltip:{
          trigger:"axis",
        },
        legend:{data: ['舆情数目'],x:'right'},
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
      },

      //是否更新dialog
      eventShow:true,

      //加载动画
      loading_update:'',

      //定时器相关
      intervalFlag_WB:true,
      timer_WB:null,
      intervalFlag_XW:true,
      timer_XW:null,
      intervalFlag_TB:true,
      timer_TB:null,

      //词云相关
      //词云参数设置
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

      CloudName:'WB',////词云tabs初始展示页面对应的名称

      word_cloud_WB:null,
      word_cloud_LT:null,
      word_cloud_XW:null,
      word_cloud_TB:null,
      word_cloud_TEST:null,

      WordCloudData_WB:[],
      WordCloudData_LT:[],
      WordCloudData_XW:[],
      WordCloudData_TB:[],
      WordCloudData_TEST:[],
    }
  },
  created() {
    this.getOpinionsNum();
    this.getBarInitStatus();
    this.getExchangeNameInformation();

  },
  mounted() {
    //折线图,因为首先加载的是微博折线图，其他折线图只有在点击后才加载
    this.line_graph_WB=this.$echarts.init(document.getElementById('line_graph_WB'));
    this.line_graph_WB.setOption(this.LineGraphOptions);

    //饼图
    this.pie_graph = this.$echarts.init(document.getElementById('pie_graph'), 'macaroons');
    this.pie_graph.setOption(this.PieGraphOptions);
    setTimeout(()=>{
      this.PieGraphData=this.getPieGraphData();
      this.drawPieGraph(this.PieGraphData);
    },500)//接收数据，延迟加载

    //柱状图
    this.bar_graph=this.$echarts.init(document.getElementById('bar_graph'));
    this.bar_graph.setOption(this.BarGraphOptions);

    //词云
    this.word_cloud_WB = this.$echarts.init(document.getElementById('word_cloud_WB'));
    this.word_cloud_WB.setOption(this.WordCloudOptions);
  },

  methods: {
    //*******************************************************************
    //是否更新dialog相关函数
    //*******************************************************************
    closeUpdateOpinionsDialog()
    {
      this.eventShow=false;
    },

    updateOpinions(data)
    {
      this.eventShow=false;
      if(data)
      {
        let options = {
          lock: true,
          text: '更新舆情信息中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          //target: document.querySelector("#app > section > section > main >div") // 指定区域
          //target: document.querySelector("#app > section > section > main ") // 指定区域
        };
        this.loading_update=Loading.service(options);

        //更新微博数据
        this.checkWbUpdateState();
      }
    },

    //查询wb更新状态
    checkWbUpdateState()
    {
      this.loading_update.setText("微博信息更新中...");
      getWbUpdateStatus().then((res)=>{
        console.log('getWbUpdateStatus:status='+res.data);
        this.getWbNewOpinions();
        if(this.intervalFlag_WB)
        {
          this.Wbset_interval();
        }
      }).catch(()=>{
        console.log("getWbUpdateStatus fail");
      });
    },

    //隔2s访问
    Wbset_interval()
    {
      window.clearInterval(this.timer_WB)
      this.timer_WB=window.setInterval(()=>{
        setTimeout(
            this.getWbNewOpinions,0)
      },2000)
    },

    //获取Wb更新结果
    getWbNewOpinions()
    {
      getWbNewestInformation().then((res)=>{
        console.log('getWbNewestInformation:status='+res.data);
        if(res.data===0)
        {
          window.clearInterval(this.timer_WB);
          this.timer_WB = null;
          this.intervalFlag_WB=false; //设置为不执行轮询

          //更新新闻数据
          this.checkXwUpdateState();

          //重新加载页面各组件
          this.getOpinionsNum();
          this.getBarInitStatus();
          //折线图,因为首先加载的是微博折线图，其他折线图只有在点击后才加载
          this.line_graph_WB=this.$echarts.init(document.getElementById('line_graph_WB'));
          this.line_graph_WB.setOption(this.LineGraphOptions);

          //饼图
          this.pie_graph = this.$echarts.init(document.getElementById('pie_graph'), 'macaroons');
          this.pie_graph.setOption(this.PieGraphOptions);
          setTimeout(()=>{
            this.PieGraphData=this.getPieGraphData();
            this.drawPieGraph(this.PieGraphData);
          },500)//接收数据，延迟加载

          //柱状图
          this.bar_graph=this.$echarts.init(document.getElementById('bar_graph'));
          this.bar_graph.setOption(this.BarGraphOptions);
        }
      }).catch(()=>{
        console.log("getWbNewestInformation fail");
      });
    },


    //查询xw更新状态
    checkXwUpdateState()
    {
      this.loading_update.setText("新闻信息更新中...")
      getXwUpdateStatus().then((res)=>{
        console.log('getXwUpdateStatus:status='+res.data);
        this.getXwNewOpinions();
        if(this.intervalFlag_XW)
        {
          this.Xwset_interval();
        }
      }).catch(()=>{
        console.log("getXwUpdateStatus fail");
      });
    },

    //隔2s访问
    Xwset_interval()
    {
      window.clearInterval(this.timer_XW)
      this.timer_XW=window.setInterval(()=>{
        setTimeout(
            this.getXwNewOpinions,0)
      },2000)
    },

    //获取Xw更新结果
    getXwNewOpinions()
    {
      getXwNewestInformation().then((res)=>{
        console.log('getXwNewestInformation:status='+res.data);
        if(res.data===0)
        {
          window.clearInterval(this.timer_XW);
          this.timer_XW = null;
          this.intervalFlag_XW=false; //设置为不执行轮询

          //更新贴吧数据
          this.checkTbUpdateState();

          //重新加载页面各组件
          this.getOpinionsNum();
          this.getBarInitStatus();
          //折线图,因为首先加载的是微博折线图，其他折线图只有在点击后才加载
          this.line_graph_WB=this.$echarts.init(document.getElementById('line_graph_WB'));
          this.line_graph_WB.setOption(this.LineGraphOptions);

          //饼图
          this.pie_graph = this.$echarts.init(document.getElementById('pie_graph'), 'macaroons');
          this.pie_graph.setOption(this.PieGraphOptions);
          setTimeout(()=>{
            this.PieGraphData=this.getPieGraphData();
            this.drawPieGraph(this.PieGraphData);
          },500)//接收数据，延迟加载

          //柱状图
          this.bar_graph=this.$echarts.init(document.getElementById('bar_graph'));
          this.bar_graph.setOption(this.BarGraphOptions);
        }
      }).catch(()=>{
        console.log("getWbNewestInformation fail");
      });
    },

    //查询tb更新状态
    checkTbUpdateState()
    {
      this.loading_update.setText("贴吧信息更新中...")
      getTbUpdateStatus().then((res)=>{
        console.log('getTbUpdateStatus:status='+res.data);
        this.getTbNewOpinions();
        if(this.intervalFlag_TB)
        {
          this.Tbset_interval();
        }
      }).catch(()=>{
        console.log("getTbUpdateStatus fail");
      });
    },

    //隔2s访问
    Tbset_interval()
    {
      window.clearInterval(this.timer_TB)
      this.timer_TB=window.setInterval(()=>{
        setTimeout(
            this.getTbNewOpinions,0)
      },2000)
    },

    //获取Tb更新结果
    getTbNewOpinions()
    {
      getTbNewestInformation().then((res)=>{
        console.log('getTbNewestInformation:status='+res.data);
        if(res.data===0)
        {
          window.clearInterval(this.timer_TB);
          this.timer_TB = null;
          this.intervalFlag_TB=false; //设置为不执行轮询
          this.loading_update.close();

          //重新加载页面各组件
          this.getOpinionsNum();
          this.getBarInitStatus();
          this.getTbExchangeNameData();//稍后需要把他改到最后一个更新的里面
          this.getXwExchangeNameData();
          this.getLtExchangeNameData();
          this.getWbExchangeNamedata();
          //折线图,因为首先加载的是微博折线图，其他折线图只有在点击后才加载
          this.line_graph_WB=this.$echarts.init(document.getElementById('line_graph_WB'));
          this.line_graph_WB.setOption(this.LineGraphOptions);

          //饼图
          this.pie_graph = this.$echarts.init(document.getElementById('pie_graph'), 'macaroons');
          this.pie_graph.setOption(this.PieGraphOptions);
          setTimeout(()=>{
            this.PieGraphData=this.getPieGraphData();
            this.drawPieGraph(this.PieGraphData);
          },500)//接收数据，延迟加载

          //柱状图
          this.bar_graph=this.$echarts.init(document.getElementById('bar_graph'));
          this.bar_graph.setOption(this.BarGraphOptions);
        }
      }).catch(()=>{
        console.log("getTbNewestInformation fail");
      });
    },

    //*******************************************************************
    //获取舆情数目相关函数
    //*******************************************************************
    getOpinionsNum()
    {
      var starttime=moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');//开始时间
      let date1=new Date(starttime);
      var endtime=moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');//结束时间
      let date2=new Date(endtime);
      console.log("开始时间："+starttime+",结束时间："+endtime);
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      //获取微博数据
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      var URL_Wb='/getOpinionsWbInformation'+'/'+date1+'/'+date2;
      getOpinionsWbInformation(URL_Wb).then((res) => {
        this.dataConvert_WB=res.data;
        console.log('获取微博数据!');

        //获取今日微博舆情信息数目
        this.WBopinions_num=this.dataConvert_WB.length;
        //获取今日微博风险舆情数目
        var temp_num_wb=0;
        for(var i=0;i<this.dataConvert_WB.length;i++)
        {
          if(this.dataConvert_WB[i].importance==='高')
          {
            temp_num_wb++;
          }
        }
        this.WBdangerous_num=temp_num_wb;

        //获取折线图数据
        this.LineGraphData_WB = this.getLineGraphData(this.dataConvert_WB);
        //绘制折线图
        this.drawLineGraph_WB(this.LineGraphData_WB);

        //获取词云数据
        this.getWordCloudData(date1,date2,'微博');
        //绘制词云
        setTimeout(()=>{this.drawWordCloud_WB(this.WordCloudData_WB);},1000);

      }).catch(() => {
        console.log("taskExecution fail Wb")
      })

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      //获取贴吧数据
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      let URL_Tb='/getOpinionsTbInformation'+'/'+date1+'/'+date2;
      getOpinionsTbInformation(URL_Tb).then((res) => {
        this.dataConvert_TB=res.data;
        console.log('获取贴吧数据!');

        //获取今日贴吧舆情信息数目
        this.TBopinions_num=this.dataConvert_TB.length;
        //获取今日贴吧风险舆情数目
        let temp_num_tb = 0;
        for(let i=0; i<this.dataConvert_TB.length; i++)
        {
          if(this.dataConvert_TB[i].importance==='高')
          {
            temp_num_tb++;
          }
        }
        this.TBdangerous_num=temp_num_tb;

        //获取折线图数据
        this.LineGraphData_TB = this.getLineGraphData(this.dataConvert_TB);
        //绘制折线图
        //this.drawLineGraph_TB(this.LineGraphData_TB);

        //获取词云数据
        this.getWordCloudData(date1,date2,'贴吧');
      }).catch(() => {
        console.log("taskExecution fail Tb")
      })
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      //获取新闻数据
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      let URL_Xw='/getOpinionsXwInformation'+'/'+date1+'/'+date2;
      getOpinionsXwInformation(URL_Xw).then((res) => {
        this.dataConvert_XW=res.data;
        console.log('获取新闻数据!');

        //获取今日新闻舆情信息数目
        this.XWopinions_num=this.dataConvert_XW.length;
        //获取今日新闻风险舆情数目
        let temp_num_xw = 0;
        for(let i=0; i<this.dataConvert_XW.length; i++)
        {
          if(this.dataConvert_XW[i].importance==='高')
          {
            temp_num_xw++;
          }
        }
        this.XWdangerous_num=temp_num_xw;

        //获取折线图数据
        this.LineGraphData_XW=this.getLineGraphData(this.dataConvert_XW);
        //绘制折线图
        //this.drawLineGraph_XW(this.LineGraphData_XW);

        //获取词云数据
        this.getWordCloudData(date1,date2,'新闻');
      }).catch(() => {
        console.log("taskExecution fail Xw")
      })
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      //获取论坛数据
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      let URL_Lt='/getOpinionsLtInformation'+'/'+date1+'/'+date2;
      getOpinionsLtInformation(URL_Lt).then((res) => {
        this.dataConvert_LT=res.data;
        console.log('获取论坛数据!');

        //获取今日论坛舆情信息数目
        this.LTopinions_num=this.dataConvert_LT.length;
        //获取今日论坛风险舆情数目
        let temp_num_lt = 0;
        for(let i=0; i<this.dataConvert_LT.length; i++)
        {
          if(this.dataConvert_LT[i].importance==='高')
          {
            temp_num_lt++;
          }
        }
        this.LTdangerous_num=temp_num_lt;

        //获取折线图数据
        this.LineGraphData_LT=this.getLineGraphData(this.dataConvert_LT);
        //绘制折线图
        //this.drawLineGraph_LT(this.LineGraphData_LT);

        //获取词云数据
        this.getWordCloudData(date1,date2,'论坛');
      }).catch(() => {
        console.log("taskExecution fail Lt")
      })

    },
    //*******************************************************************
    //折线图相关函数
    //*******************************************************************
    //获取折线图数据
    getLineGraphData(data)
    {
      var LineGraphData=[];
      for(var k=0;k<25;k++)
      {
        LineGraphData[k]=0;
      }

      for(var i=0;i<data.length;i++)
      {
        var time=new Date(data[i].releasetime);
        var hour=time.getHours();

        for(var j=0;j<24;j++)
        {
          if(hour>j && hour<=(j+1))
          {
            LineGraphData[j+1]++;
          }
        }
      }
      console.log('获取折线图数据！');
      return LineGraphData;
    },
    //绘制微博折线图
    drawLineGraph_WB(val) {
      console.log('绘制微博折线图!')
      this.LineGraphOptions.series[0].data=val;
      this.line_graph_WB.setOption(this.LineGraphOptions);
    },
    //绘制新闻折线图
    drawLineGraph_XW(val) {
      console.log('绘制新闻折线图!')
      this.LineGraphOptions.series[0].data=val;
      this.line_graph_XW.setOption(this.LineGraphOptions);
    },
    //绘制论坛折线图
    drawLineGraph_LT(val) {
      console.log('绘制论坛折线图!')
      this.LineGraphOptions.series[0].data=val;
      this.line_graph_LT.setOption(this.LineGraphOptions);
    },
    //绘制贴吧折线图
    drawLineGraph_TB(val) {
      console.log('绘制贴吧折线图!')
      this.LineGraphOptions.series[0].data=val;
      this.line_graph_TB.setOption(this.LineGraphOptions);
    },
    //*******************************************************************
    //饼图相关函数
    //*******************************************************************
    getPieGraphData()
    {
      let obj1={};
      let obj2={};
      let obj3={};
      let obj4={};
      let PieGraphData=[];
      obj1.name='微博';
      obj1.value=this.dataConvert_WB.length;
      PieGraphData[0]=obj1;
      obj2.name='贴吧';
      obj2.value=this.dataConvert_TB.length;
      PieGraphData[1]=obj2;
      obj3.name='论坛';
      obj3.value=this.dataConvert_LT.length;
      PieGraphData[2]=obj3;
      obj4.name='新闻';
      obj4.value=this.dataConvert_XW.length;
      PieGraphData[3]=obj4;
      return PieGraphData;
    },
    drawPieGraph(val) {
      console.log('绘制饼图！');
      this.PieGraphOptions.series[0].data=val;
      this.pie_graph.setOption(this.PieGraphOptions);
    },
    //*******************************************************************
    //切换查看折线图相关函数
    //*******************************************************************
    handleClick_LineGraph(tab,event){
      if(tab.name==='XW')
      {
        this.$nextTick(() => {
          this.line_graph_XW=this.$echarts.init(document.getElementById('line_graph_XW'));
          this.drawLineGraph_XW(this.LineGraphData_XW);
        });
      }
      else if(tab.name==='LT')
      {
        this.$nextTick(() => {
          this.line_graph_LT=this.$echarts.init(document.getElementById('line_graph_LT'));
          this.drawLineGraph_LT(this.LineGraphData_LT);
        });
      }
      else if(tab.name==='TB')
      {
        this.$nextTick(() => {
          this.line_graph_TB=this.$echarts.init(document.getElementById('line_graph_TB'));
          this.drawLineGraph_TB(this.LineGraphData_TB);
        });
      }
      else
      {
        this.$nextTick(() => {
          this.line_graph_WB=this.$echarts.init(document.getElementById('line_graph_WB'));
          this.drawLineGraph_WB(this.LineGraphData_WB);
        });
      }
    },
    //*******************************************************************
    //获取词云数据并绘制相关函数
    //*******************************************************************
    getWordCloudData(date1,date2,source)
    {
      if(source==='微博')
      {
        let URL_wb='/getWbWordsCloudData'+'/'+date1+'/'+date2;
        getWbWordsCloudData(URL_wb).then((res) => {
          let temp=res.data;
          if(temp.length>0)
          {
            for(let i=0;i<temp.length;i++)
            {
              let obj={};
              obj.name=temp[i].words;
              obj.value=temp[i].num;
              this.WordCloudData_WB[i]=obj;
            }
          }
          else {
            let obj={};
            obj.name='暂无数据';
            obj.value=10;
            this.WordCloudData_WB[0]=obj;
          }
        }).catch(() => {
          console.log("getWbWordsCloudData fail Wb")
        })
      }
      else if(source==='贴吧')
      {
        let URL_tb='/getTbWordsCloudData'+'/'+date1+'/'+date2;
        getTbWordsCloudData(URL_tb).then((res) => {
          let temp=res.data;
          if(temp.length>0)
          {
            for(let i=0;i<temp.length;i++)
            {
              let obj={};
              obj.name=temp[i].words;
              obj.value=temp[i].num;
              this.WordCloudData_TB[i]=obj;
            }
          }
          else {
            let obj={};
            obj.name='暂无数据';
            obj.value=10;
            this.WordCloudData_TB[0]=obj;
          }
        }).catch(() => {
          console.log("getTbWordsCloudData fail Tb")
        })
      }
      else if(source==='新闻')
      {
        let URL_xw='/getXwWordsCloudData'+'/'+date1+'/'+date2;
        getXwWordsCloudData(URL_xw).then((res) => {
          let temp=res.data;
          if(temp.length>0)
          {
            for(let i=0;i<temp.length;i++)
            {
              let obj={};
              obj.name=temp[i].words;
              obj.value=temp[i].num;
              this.WordCloudData_XW[i]=obj;
            }
          }
          else {
            let obj={};
            obj.name='暂无数据';
            obj.value=10;
            this.WordCloudData_XW[0]=obj;
          }
        }).catch(() => {
          console.log("getXwWordsCloudData fail Xw")
        })
      }
      else if(source==='论坛')
      {
        let URL_lt='/getLtWordsCloudData'+'/'+date1+'/'+date2;
        getLtWordsCloudData(URL_lt).then((res) => {
          let temp=res.data;
          if(temp.length>0)
          {
            for(let i=0;i<temp.length;i++)
            {
              let obj={};
              obj.name=temp[i].words;
              obj.value=temp[i].num;
              this.WordCloudData_LT[i]=obj;
            }
          }
          else {
            let obj={};
            obj.name='暂无数据';
            obj.value=10;
            this.WordCloudData_LT[0]=obj;
          }
        }).catch(() => {
          console.log("getLtWordsCloudData fail Lt")
        })
      }
    },

    drawWordCloud_XW(val)
    {
      console.log("绘制新闻词云");
      this.WordCloudOptions.title.text="今日新闻词云";
      this.WordCloudOptions.series[0].data=val;
      this.word_cloud_XW.setOption(this.WordCloudOptions);
    },
    drawWordCloud_TB(val)
    {
      console.log("绘制贴吧词云");
      this.WordCloudOptions.title.text="今日贴吧词云";
      this.WordCloudOptions.series[0].data=val;
      this.word_cloud_TB.setOption(this.WordCloudOptions);
    },
    drawWordCloud_LT(val)
    {
      console.log("绘制论坛词云");
      this.WordCloudOptions.title.text="今日论坛词云";
      this.WordCloudOptions.series[0].data=val;
      this.word_cloud_LT.setOption(this.WordCloudOptions);
    },
    drawWordCloud_WB(val)
    {
      console.log("绘制微博词云");
      this.WordCloudOptions.title.text="今日微博词云";
      this.WordCloudOptions.series[0].data=val;
      this.word_cloud_WB.setOption(this.WordCloudOptions);
    },
    //*******************************************************************
    //切换查看词云相关函数
    //*******************************************************************
    handleClick_WordCloud(tab,event)
    {
      if(tab.name==='XW')
      {
        this.$nextTick(() => {
          this.word_cloud_XW=this.$echarts.init(document.getElementById('word_cloud_XW'));
          this.drawWordCloud_XW(this.WordCloudData_XW);
        });
      }
      else if(tab.name==='LT')
      {
        this.$nextTick(() => {
          this.word_cloud_LT=this.$echarts.init(document.getElementById('word_cloud_LT'));
          this.drawWordCloud_LT(this.WordCloudData_LT);
        });
      }
      else if(tab.name==='TB')
      {
        this.$nextTick(() => {
          this.word_cloud_TB= this.$echarts.init(document.getElementById('word_cloud_TB'));
          this.drawWordCloud_TB(this.WordCloudData_TB);
        });
      }
      else
      {
        this.$nextTick(() => {
          this.word_cloud_WB =this.$echarts.init(document.getElementById('word_cloud_WB'));
          this.drawWordCloud_WB(this.WordCloudData_WB);
        });
      }
    },
    //*******************************************************************
    //点击今日舆情数目跳转展示相关函数
    //*******************************************************************
    handleClick_opinions(){
      this.$router.push('/trade/PublicOpinionsRisk/opinions_riskinfo');
    },
    //*******************************************************************
    //从后端获取交易所下拉框数值相关函数
    //*******************************************************************
    getExchangeNameInformation()
    {
      getExchangeNameData().then((res) => {
        let temp=res.data;
        for(let i=0;i<temp.length;i++)
        {
          let obj={};
          obj.id=i;
          obj.name=temp[i];
          this.exchangenamedata[i]=obj;
        }
      }).catch(()=>{
        console.log("getExchangeNameInformation fail")
      });
    },

    //*******************************************************************
    //查询时间段舆情数目相关函数
    //*******************************************************************
    handleClick_searchNum(){
      if(this.form.startdate===''||this.form.enddate===''||this.form.platform==='' || this.form.exchangename==='')
      {
        this.$message.error('表单输入不得为空！');
      }
      else if(this.form.enddate<this.form.startdate)
      {
        this.$message.error('终止日期不得小于起始日期！');
      }
      else if(new Date()<this.form.enddate)
      {
        this.$message.error('终止日期不得大于今日日期！');
      }
      else
      {
        //this.form.enddate.setMinutes(this.form.enddate.getMinutes()+59);
        //this.form.enddate.setHours(this.form.enddate.getHours()+23);
        this.form.enddate.setDate(this.form.enddate.getDate()+1);
        let date1=this.form.startdate;
        let date2=this.form.enddate;
        let exchangename=this.form.exchangename;
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        //获取微博数据
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        if(this.form.platform==='WB')
        {
          let URL_Wb='/getOpinionsWbInformation/'+date1+'/'+date2;
          getOpinionsWbInformation(URL_Wb).then((res) => {
            let graphdata=[];
            let temp_resdata=res.data;
            if(exchangename==='全部交易所')
            {
              graphdata=res.data;
            }
            else
            {
              let index=0;
              for(let i=0;i<temp_resdata.length;i++)
              {
                if(temp_resdata[i].exchangename===exchangename)
                {
                  graphdata[index]=temp_resdata[i];
                  index++;
                }
              }
            }
            let BarGraphData_WB=this.getBarGraphData(graphdata,this.form.startdate,this.form.enddate);
            this.drawBarGraph(BarGraphData_WB,this.form.startdate,this.form.enddate,"微博");
          }).catch(() => {
            console.log("taskExecution fail Wb")
          })
        }
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            //获取贴吧数据
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        else if(this.form.platform==='TB')
        {
          let URL_Tb='/getOpinionsTbInformation/'+date1+'/'+date2;
          getOpinionsTbInformation(URL_Tb).then((res) => {
            let graphdata=[];
            let temp_resdata=res.data;
            if(exchangename==='全部交易所')
            {
              graphdata=res.data;
            }
            else
            {
              let index=0;
              for(let i=0;i<temp_resdata.length;i++)
              {
                if(temp_resdata[i].exchangename===exchangename)
                {
                  graphdata[index]=temp_resdata[i];
                  index++;
                }
              }
            }
            let BarGraphData_TB=this.getBarGraphData(graphdata,this.form.startdate,this.form.enddate);
            this.drawBarGraph(BarGraphData_TB,this.form.startdate,this.form.enddate,"贴吧");
          }).catch(() => {
            console.log("taskExecution fail Tb")
          })
        }
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            // 获取新闻数据
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        else if(this.form.platform==='XW')
        {
          let URL_Xw='/getOpinionsXwInformation/'+date1+'/'+date2;
          getOpinionsXwInformation(URL_Xw).then((res) => {
            let graphdata=[];
            let temp_resdata=res.data;
            if(exchangename==='全部交易所')
            {
              graphdata=res.data;
            }
            else
            {
              let index=0;
              for(let i=0;i<temp_resdata.length;i++)
              {
                if(temp_resdata[i].exchangename===exchangename)
                {
                  graphdata[index]=temp_resdata[i];
                  index++;
                }
              }
            }
            let BarGraphData_XW=this.getBarGraphData(graphdata,this.form.startdate,this.form.enddate);
            this.drawBarGraph(BarGraphData_XW,this.form.startdate,this.form.enddate,"新闻");
          }).catch(() => {
            console.log("taskExecution fail Xw")
          })
        }
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            //获取论坛数据
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        else
        {
          let URL_Lt='/getOpinionsLtInformation/'+date1+'/'+date2;
          getOpinionsLtInformation(URL_Lt).then((res) => {
            let graphdata=[];
            let temp_resdata=res.data;
            if(exchangename==='全部交易所')
            {
              graphdata=res.data;
            }
            else
            {
              let index=0;
              for(let i=0;i<temp_resdata.length;i++)
              {
                if(temp_resdata[i].exchangename===exchangename)
                {
                  graphdata[index]=temp_resdata[i];
                  index++;
                }
              }
            }
            let BarGraphData_LT=this.getBarGraphData(graphdata,this.form.startdate,this.form.enddate);
            this.drawBarGraph(BarGraphData_LT,this.form.startdate,this.form.enddate,"论坛");
          }).catch(() => {
            console.log("taskExecution fail Lt")
          })
        }
      }

    },
    //设置柱状图初始加载为最近7天的微博舆情数据
    getBarInitStatus()
    {
      //初始状态下为包含当前日期在内的7天
      let enddate=new Date();
      enddate.setMinutes(enddate.getMinutes()+59);
      enddate.setHours(enddate.getHours()+23);
      let startdate=new Date(this.getWeekDate(enddate));
      let URL_Wb='/getOpinionsWbInformation/'+startdate+'/'+enddate;
      getOpinionsWbInformation(URL_Wb).then((res) => {
        let BarGraphData_WB=this.getBarGraphData(res.data,startdate,enddate);
        this.drawBarGraph(BarGraphData_WB,startdate,enddate,"微博");
      }).catch(() => {
        console.log("taskExecution fail Wb")
      })
    },
    //获取柱状图数据
    getBarGraphData(data,startdate,enddate)
    {
      console.log('获取柱状图数据！');
      var BarGraphData=[];
      var datelength=parseInt(this.getDaysBetween(enddate,startdate));
      for(var i=0;i<=datelength;i++)
      {
        BarGraphData[i]=0;
      }
      for(var j=0;j<data.length;j++)
      {
        var temp=this.getDaysBetween(data[j].releasetime,startdate);
        var index=parseInt(temp).toFixed(0);
        BarGraphData[index]++;
      }
      return BarGraphData;
    },
    //判断两个日期之间相差天数
    getDaysBetween(date1,date2)
    {
      let startDate = Date.parse(date1);
      let endDate = Date.parse(date2);
      return (startDate - endDate ) / (1 * 24 * 60 * 60 * 1000);
    },
    //画柱状图
    drawBarGraph(val,startdate,enddate,title)
    {
      console.log('绘制柱状图!');
      let date=this.getAlldate(startdate,enddate);
      this.BarGraphOptions.xAxis[0].data=date;
      this.BarGraphOptions.series[0].data=val;
      this.BarGraphOptions.title.text=title+'舆情数目查询结果'
      this.bar_graph.setOption(this.BarGraphOptions);
    },
    //获取两个日期之间的所有日期
    getAlldate(startdate,enddate)
    {
      var startTime=new Date(startdate.getFullYear(),startdate.getMonth(),startdate.getDate());
      var endTime=new Date(enddate.getFullYear(),enddate.getMonth(),enddate.getDate());

      let unixDb = startTime.getTime();
      let unixDe = endTime.getTime();
      var arrTime=[];
      for (let k = unixDb; k <unixDe;) {
        arrTime.push(this.timestampToTime(k));
        k = k + 24 * 60 * 60 * 1000;
      }
      return arrTime;

    },
    //获取包括某日期的5天数据
    getWeekDate(enddate)
    {
      var endTime=new Date(enddate.getFullYear(),enddate.getMonth(),enddate.getDate());
      let unixDe = endTime.getTime();
      let unixDb=unixDe-5*24 * 60 * 60 * 1000;
      return unixDb;
    },
    //转换时间戳
    timestampToTime (cjsj) {
      var date = new Date(cjsj) ;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() ;
      return Y+M+D
    },
    //取消
    handleClick_searchclose(){
      this.form.startdate='';
      this.form.enddate='';
      this.form.platform='';
      this.form.exchangename='';
      this.getBarInitStatus();
      this.bar_graph=this.$echarts.init(document.getElementById('bar_graph'));
      this.bar_graph.setOption(this.BarGraphOptions);
    },
  },

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

    .el-form{
      label-position:left;
    }
  }

  .cloud_panel{
    width: 100%;
    height:380px;
    color: #666;
    background: #ffffff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05); //阴影
    border-color: rgba(0, 0, 0, .05); //四个边框颜色
  }
}
</style>