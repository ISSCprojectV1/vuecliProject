<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose">
    <slot>
      <div>
        <div id="line_graph" ref="line_graph"  :style="{width: '100%', height: '320px' }" ></div>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import {getWbForwardInformation} from "../../../api/part1/PublicOpinionsRisk";

export default {
  name: "DiffusionDialog",
  props:{
    show:{
      type:Boolean,
      default:false,
    },
    title:{
      type:String,
      default: '时间分布'
    }
  },
  data()
  {
    return{
      //dialog参数
      localShow:this.show,

      line_graph:null,
      //折线图选项设置
      LineGraphOptions:{
        title:{
          text:'舆情网络信息时间分布',
          x:'center',//居中
          textStyle:{//主标题样式
            color: "#121313",
            fontSize: 18
          },
        },
        tooltip: {trigger: 'axis'},//触发类型,'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        legend: {data: ['舆情数目']},
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
          data:[],
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
      //横坐标设置
      xData:[],
      valueData:[],
    }
  },
  watch: {
    show (val) {
      this.localShow = val
    }
  },
  created() {
    this.getData();
  },
  methods:{
    getData()
    {
      getWbForwardInformation().then((res)=>{
        let forwardData=res.data;
        let min=forwardData[0].releasetime;
        let max=forwardData[0].releasetime;
        for(let i=0;i<forwardData.length;i++)
        {
          if(forwardData[i].releasetime>max)
          {
            max=forwardData[i].releasetime;
          }
          if(forwardData[i].releasetime<min)
          {
            min=forwardData[i].releasetime;
          }
        }
        //获取min和max之间的所有时间点：xxxx-xx-xx:hh
        this.xData=this.getTimePoints(min,max);
        //获取每个时间点的信息数目
        this.valueData=this.getNumPerPoints(this.xData,forwardData);
        //画折线图
        this.drawLineGraph(this.xData,this.valueData);
      }).catch(()=>{
        console.log("getWbForwardInformation fail");
      });
    },
    //绘制折线图
    drawLineGraph(xdata,val) {
      console.log('绘制时间点折线图!');
      this.line_graph=this.$echarts.init(document.getElementById('line_graph'));
      this.LineGraphOptions.xAxis[0].data=xdata;
      this.LineGraphOptions.series[0].data=val;
      this.line_graph_WB.setOption(this.LineGraphOptions);
    },
    //获取两个时间之间的所有时间点
    getTimePoints(startTime,endTime)
    {
      let unixDb=startTime.getData().getTime();
      let unixDe=(endTime.getData()+1).getTime();
      let arrTime=[];
      for(let k=unixDb;k<unixDe;)
      {
        arrTime.push(this.timestampToTime(k));
        k=k+60 * 60 * 1000;
      }
      return arrTime;
    },
    //获取每个时间点的信息数目
    getNumPerPoints(xData,forwardData)
    {
      for(let t=0;t<xData.length;t++)
      {
        this.valueData[t]=0;
      }
      // for(let i=0;i<forwardData.length;i++)
      // {
      //
      // }
    },
  }
}
</script>

<style scoped>

</style>