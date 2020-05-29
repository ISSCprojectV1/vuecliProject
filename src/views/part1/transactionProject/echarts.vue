<template>
<div class="Echarts">
<div id="myChart" :style="{width: '1000px', height: '1000px'}"></div>
</div>
</template>

<script>
import $ from 'jQuery'
import echarts from 'echarts'
import {getGexfData} from "@/api/part1/system/transactionProject";
require('echarts/extension/dataTool')
export default {
  name: 'les_miserables',
  data () {
    return {
      msg: 'welcome to les'
    }
     },
  mounted(){
    this.drawLine();
     },
  methods: {
    drawLine(){

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        var option;
        myChart.showLoading(); // 显示加载中
        console.log('showLoadingEcharts');
      //  $.get("http://localhost:8091/getuserr", function(xml) {
       //     console.log(xml)
    //    }
      //  )getGexfData().res.data
            getGexfData().then(() => {
                console.log("获取历史数据成功")
                }).catch(()=>{
                    console.log("getGexfData fail")
                });

        $.get("http://localhost:8091/getuserr", function(xml) {  //一定要把文件放在static下

              console.log("读取gexf");
              myChart.hideLoading();

              var graph = echarts.dataTool.gexf.parse(xml); // 使用dataTool转换文件
              var categories = [];
                   categories[0]={  name:'威海国际海洋商品交易中心'
              }
              categories[1] = {
                name:'鲁清所'
              }
              categories[2] = {
                name:'东亚畜牧现货产品交易所'
              }
               categories[3] = {
                name:'临沂国际商品交易中心'
              }
              categories[4] = {
                name:'山东广丰橡胶轮胎交易中心'
              }
              categories[5] = {
                name:'山东休斯顿石油装备交易中心'
              }
              categories[6] = {
                name:'山东金融资产交易中心'
              }
               categories[7] = {
                name:'东营富赛能源交易中心'
              }
              /*
              for(var i = 0; i < 9; i++) {
                categories[i] = {
                  name: '类目' + i
                };
              }
              */
             // node节点传入显示的数据
              graph.nodes.forEach(function(node) {
                node.itemStyle = null;
                node.value = node.symbolSize;
                node.symbolSize /= 1.5;
                node.label = {
                  normal: {
                    show: node.symbolSize > 30
                  }
                };
                node.category = node.attributes.modularity_class;
              });
              option = {
                title: {
                  text: '鲁清所网络图',
                  subtext: 'Default layout',
                  top: 'bottom',
                  left: 'right'
                },
                tooltip: {},
                legend: [{
                  // selectedMode: 'single',
                  data: categories.map(function(a) {
                    return a.name;
                  })
                }],
                animationDuration: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [{
                  type: 'graph',
                  layout: 'none',
                  data: graph.nodes,
                  links: graph.links,
                  categories: categories,
                  roam: true,
                  focusNodeAdjacency: true,
                  itemStyle: {
                    normal: {
                      borderColor: '#fff',
                      borderWidth: 1,
                      shadowBlur: 10,
                      shadowColor: 'rgba(0, 0, 0, 0.3)'
                    }
                  },
                  label: {
                    position: 'right',
                    formatter: '{b}'
                  },
                  lineStyle: {
                    color: 'source',
                    curveness: 0.3
                  },
                  emphasis: {
                    lineStyle: {
                      width: 10
                    }
                  }
                }]
              };

              myChart.setOption(option);
            }, 'xml');
    }
  }
}
</script>

<style>

</style>

