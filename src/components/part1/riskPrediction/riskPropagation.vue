<template>
<div>
  <h2>大宗商品风险传播链</h2>
  <el-form :inline="true">
    <el-form-item>
      <el-autocomplete
          v-model="value"
          :fetch-suggestions="querySearch"
          placeholder="请输入查询商品"
          @select="handleSelect"
      ></el-autocomplete>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onClickQuery">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
  <div id="chart-risk-propagation"
       style="width: 90%; height: 900px; margin-left: auto; margin-right: auto; display:block;"></div>
</div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "riskPropagation",
  data() {
    return {
      chart: {},
      option:[]
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById('chart-risk-propagation'))
    var center = 900
    let data = [
      {
        name: '螺纹钢',
        x: center,
        y: center
      }
    ]
    let name = ["铁矿石", "动力煤", "废钢", "焦煤", "焦炭"]
    let step = 360/name.length;
    for(var i=0;i<name.length;i++)
    {
      data.push({name:name[i],x:center+center*Math.cos(step*i*Math.PI/180),y:center+center*Math.sin(step*i*Math.PI/180)})
    }



    let links = [
      {
        source: '焦煤',
        target: '铁矿石',
        label: {
          show: true,
          formatter: '{Time, Rate}'
        },
        lineStyle: {
          curveness:-0.1
        }
      },
      {
        source: '铁矿石',
        target: '动力煤',
        label: {
          show: true,
          formatter: '{Time, Rate}'
        }
      },
      {
        source: '铁矿石',
        target: '焦煤',
        label: {
          show: true,
          formatter: '{Time, Rate}'
        },
        lineStyle: {
          curveness:-0.1
        }
      },
      {
        source: '废钢',
        target: '动力煤',
        label: {
          show: true,
          formatter: '{Time, Rate}'
        }
      },
      {
        source: '动力煤',
        target: '螺纹钢',
        label: {
          show: true,
          formatter: '{Time, Rate}'
        },
        lineStyle: {
          curveness:-0.1
        }
      },
      {
        source: '螺纹钢',
        target: '动力煤',
        label: {
          show: true,
          formatter: '{Time, Rate}'
        },
        lineStyle: {
          curveness:-0.1
        }
      },
      {
        source: '废钢',
        target: '螺纹钢',
        label: {
          show: true,
          formatter: '{Time, Rate}'
        }
      },
      {
        source: '焦煤',
        target: '焦炭',
        label: {
          show: true,
          formatter: '{Time, Rate}'
        }
      },
      {
        source: '焦炭',
        target: '螺纹钢',
        label: {
          show: true,
          formatter: '{Time, Rate}'
        }
      }
    ]
    this.drawRiskPropagation(data, links)

    this.chart.setOption(this.option);
  },
  methods: {
    drawRiskPropagation(data, links){
      this.option = {
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 90,
            roam: false, //表示鼠标不能移动布局
            label: {
              show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [1, 15],
            edgeLabel: {
              show: false,
              fontSize: 15
            },
            // 节点
            itemStyle:{
              color:'#66B3FF'
            },
            // 边
            lineStyle: {
              opacity: 0.9,
              width: 2
            },
            emphasis: {
              itemStyle: {
                color: '#0072E3'
              },
              label: {
                show: true,
                fontSize: 30
              },
              lineStyle: {
                color: '#FF5151'
              },
              edgeLabel: {
                show: true,
                fontSize: 30,
                color: 'red'
              },
              edgeSymbol: ['circle', 'arrow']
            },
            // 不显示选中时的标签
            tooltip: {
              show: false,
              formatter: 'tool'
            },

            // autoCurveness: true,
            data:data,
            links: links,
          }
        ]
      };
     // console.log(option.series.data());

    }


  }
}
</script>

<style>
</style>
