<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose" @open="open()">
    <slot>
      <div style="border:#121313 solid 2px;background: #ffffff">
        <div style="width: 100%;height: 20px;margin-bottom: 5px" >
          <el-button type="primary" icon="el-icon-refresh" @click="handleClick_refreshGraph()" style="float: right;background: none;color: #121313;border: none;"></el-button>
        </div>
        <div class="line_graph_class" style="width: 100% ;height: 360px;">
          <div id="line_graph" ref="line_graph"  :style="{width: '100%', height: '340px',margin:'0,5px,0,5px'}" ></div>
        </div>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import {getWbForwardInformation} from "../../../api/part1/PublicOpinionsRisk";
import {Loading} from "element-ui";
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
      //折线图
      line_graph:null,
      //折线图选项设置
      LineGraphOptions: {
        title: {
          text: '舆情网络信息分布时间折线图',
          x: 'center',//居中
          textStyle: {//主标题样式
            color: "#121313",
            fontSize: 18
          },
        },
        tooltip: {trigger: 'axis'},//触发类型,'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        legend: {data: ['舆情数目'], x: 'left'},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisTick: {show: false},
          data: [],
        }],
        yAxis: [{
          type: 'value',
          axisTick: {show: false},
          name: '（条）'
        }],
        series: [{
          name: '舆情数目',
          type: 'line',
          smooth: true,
          data: [],
          itemStyle: {normal: {areaStyle: {type: 'default'}, color: 'rgb(161,104,106)'}}
        }],
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
      //横坐标设置
      xData:[],
      //坐标值设置
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
  mounted() {

  },
  methods:{
    //*******************************************************************
    //dialog相关函数
    //*******************************************************************
    beforeClose () {
      this.close()
    },
    close () {
      this.$emit('close')
    },
    //*******************************************************************
    //舆情扩散分布时间点相关函数
    //*******************************************************************
    getData()
    {
      getWbForwardInformation().then((res)=>{
        if(res.data.searchresult!=null)
        {
          console.log("舆情扩散：getWbForwardInformation!");
          let forwardData=res.data.searchresult;
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
          //this.drawLineGraph(this.xData,this.valueData);
        }
        else {
          console.log("舆情扩散：获取数据为null!");
        }
      }).catch(()=>{
        console.log("Diffusion:getWbForwardInformation fail");
      });
    },
    //绘制折线图
    drawLineGraph(xdata,val) {
      console.log('绘制时间点折线图!');
      this.line_graph=this.$echarts.init(document.getElementById('line_graph'));
      this.line_graph.clear();
      this.line_graph.resize({
        width:this.width,
        height:this.height,
      });
      this.LineGraphOptions.xAxis[0].data=xdata;
      this.LineGraphOptions.series[0].data=val;
      this.line_graph.setOption(this.LineGraphOptions);
    },
    //获取两个时间之间的所有时间点
    getTimePoints(start,end)
    {
      //console.log("获取"+start+":"+end+"之间的所有时间点！");
      let startdate=new Date(start);
      let enddate=new Date(end);
      let startTime=new Date(startdate.getFullYear(),startdate.getMonth(),startdate.getDate());
      let endTime=new Date(enddate.getFullYear(),enddate.getMonth(),(enddate.getDate()+1));
      let unixDb=startTime.getTime();
      let unixDe=endTime.getTime();
      let arrTime=[];
      for(let k=unixDb;k<=unixDe;)
      {
        arrTime.push(this.timestampToTime(k));
        k=k+60 * 60 * 1000;
      }
      return arrTime;
    },
    //转换时间戳
    timestampToTime (cjsj) {
      var date = new Date(cjsj) ;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate()+' ';
      var H = date.getHours()<10 ? '0'+date.getHours():date.getHours();
      return Y+M+D+H+":00";
    },
    //获取每个时间点的信息数目
    getNumPerPoints(xData,forwardData)
    {
      //console.log("获取每个时间点的信息数目！");
      let valueData=[];
      for(let t=0;t<xData.length;t++)
      {
        valueData[t]=0;
      }
       for(let i=0;i<forwardData.length;i++)
       {
         let temp_date=new Date(forwardData[i].releasetime);
         let date=new Date(temp_date.getFullYear(),temp_date.getMonth(),temp_date.getDate(),temp_date.getHours());
         let temp=this.timestampToTime(date);
         for(let j=0;j<xData.length;j++)
         {
           if(temp===xData[j])
           {
             valueData[j]++;
             break;
           }
         }
       }
       return valueData;
    },
    open(){
      this.$nextTick(() => {
        //  执行echarts方法
        this.line_graph=this.$echarts.init(document.getElementById('line_graph'));
        this.line_graph.clear();
        this.line_graph.resize({
          width:this.width,
          height:this.height,
        });
        this.line_graph.setOption(this.LineGraphOptions);
      })
    },
    handleClick_refreshGraph()
    {
      console.log("刷新时间分布折线图！");
      this.drawLineGraph(this.xData,this.valueData);
    },
  }
}
</script>

<style scoped>

</style>