<template>
  <div class="line_graph">
    <div id="line_graph" ref="line_graph" :style="{width: '100%',height:'100%'}"></div>
  </div>
</template>

<script>
export default {
  name: "linegraph",
  props:{
    LineGraphData:{
      required:true,
      default:{},
    }
  },
  data(){
    return{
      line_graph:null,
      //折线图设置
      LineGraphOptions:{
        title:{
          text:'舆情时间分布',
          x:'center',//居中
          textStyle:{//主标题样式
            color: "#121313",
            fontSize: 18
          },
        },
        tooltip: {
          trigger: 'axis',
        },//触发类型,'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        //legend: {data: ['舆情数目']},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // toolbox: {
        //   feature: {saveAsImage: {}}
        // },
        xAxis:[{
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
    }
  },
  mounted() {
    this.line_graph=this.$echarts.init(document.getElementById('line_graph'));
    this.line_graph.resize({
      width:this.width,
      height:this.height,
    });
    this.line_graph.setOption(this.LineGraphOptions);
    setTimeout(()=>{
      this.drawLineGraph();
    },500)//接收数据，延迟加载

  },
  methods:{
    drawLineGraph() {
      console.log("绘制折线图");
      this.LineGraphOptions.title.text=this.LineGraphData.title;
      this.LineGraphOptions.series[0].data=this.LineGraphData.data;
      let xdata=[];
      for(let i=0;i<24;i++)
      {
        if(i<10)
        {
          xdata[i]="0"+i+":00";
        }
        else
        {
          xdata[i]=i+":00";
        }
      }
      this.LineGraphOptions.xAxis[0].data=xdata;
      this.line_graph.resize({
        width:this.width,
        height:this.height,
      });
      this.line_graph.setOption(this.LineGraphOptions);
    }
  }
}
</script>

<style scoped>

</style>