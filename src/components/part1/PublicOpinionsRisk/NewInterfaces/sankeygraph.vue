<template>
  <div class="sankey_graph">
    <div id="sankey_graph" ref="sankey_graph" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "sankeygraph",
  props:{
    SankeyData:{
      required:true,
      default:{},
    }
  },
  data(){
    return{
      sankey_graph:null,
      //桑基图配置
      SankeyOptions:{
        title:{
          text:"",
          x:"center",
        },
        series:[{
          type:'sankey',
          left: 50.0,
          top: 20.0,
          right: 150.0,
          bottom: 25.0,
          data:[],
          links:[],
          lineStyle: {
            color: 'target',
            curveness: 0.5,
          },
          itemStyle: {
            color: '#1f77b4',
            borderColor: '#1f77b4'
          },
          label: {
            color: 'rgba(0,0,0,0.7)',
            fontFamily: 'Arial',
            fontSize: 10
          },
        }],
        tooltip: {
          trigger: 'item'
        }
      },
    }
  },
  mounted() {
    this.sankey_graph = this.$echarts.init(document.getElementById('sankey_graph'));
    this.sankey_graph.resize({
      width:this.width,
      height:this.height,
    });
    this.sankey_graph.setOption(this.SankeyOptions);
    setTimeout(()=>{
      this.drawSankeyGraph();
    },1000)//接收数据，延迟加载
  },
  methods:{
    drawSankeyGraph(){
      console.log("绘制桑基图");
      this.SankeyOptions.title.text=this.SankeyData.title;
      this.SankeyOptions.series[0].data=this.SankeyData.data;
      this.SankeyOptions.series[0].links=this.SankeyData.links;
      this.sankey_graph.resize({
        width:this.width,
        height:this.height,
      });
      this.sankey_graph.setOption(this.SankeyOptions);
    },
  },
}
</script>

<style scoped>

</style>