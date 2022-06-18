<template>
  <div class="words_cloud">
    <div id="words_cloud" ref="words_cloud"  :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>

<script>
import Js2WordCloud from 'js2wordcloud';
require('echarts-wordcloud');
export default {
  name: "wordscloud",
  props:{
    WordsCloudData:{
      required:true,
      default:{},
    }
  },
  data(){
    return{
      words_cloud:null,
      //词云设置
      WordCloudOptions:{
        title:{
          text:"今日舆情词云",
          x:"center",
        },
        series:[
          {
            type:"wordCloud",
            shape:'circle',
            //用来调整字的范围大小
            sizeRange:[20,50],
            //文字旋转范围
            rotationRange:[0,0],
            //调整词之间的距离
            gridSize:15,
            //位置
            left:'center',
            top:'center',
            width:'90%',
            height:'90%',
            right:null,
            bottom:null,
            //是否允许部分在画布外部绘制单词
            drawOutOfBound:false,

            //数据
            data:[],

            //全局文本样式
            textStyle:{
              normal:{
                color:function (){
                  //随机
                  return(
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
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.words_cloud = this.$echarts.init(document.getElementById('words_cloud'));
    this.words_cloud.resize({
      width:this.width,
      height:this.height,
    });
    this.words_cloud.setOption(this.WordCloudOptions);
    setTimeout(()=>{
      this.drawWordCloud();
    },1000)//接收数据，延迟加载
  },
  methods:{
    drawWordCloud()
    {
      console.log("绘制词云");
      this.WordCloudOptions.title.text=this.WordsCloudData.title;
      this.WordCloudOptions.series[0].data=this.WordsCloudData.data;
      this.words_cloud.resize({
        width:this.width,
        height:this.height,
      });
      this.words_cloud.setOption(this.WordCloudOptions);
    },
  }
}
</script>

<style scoped>

</style>