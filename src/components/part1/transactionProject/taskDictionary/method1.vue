<template>
  <div id="app">
    <!-- <button @click="toUpdate">切换数据</button> -->
    <div id="container" style="width:900px; height:600px"></div>
  </div>
</template>

<script>
// import {init,update} from './utils/g6Utils.min.js';
import G6 from '@antv/g6'
import {getTaskApi} from "@/api/part1/transactionProject";

// import insertCss from 'insert-css'

export default {
  name: '这里',
  data () {
    return {};
  },
    mounted () {
        this.$nextTick(() => {
      //  执行echarts方法
        this.getData();
      })
  },
  methods: {
      getData(){
          getTaskApi().then((res) => {
              var input = res.data;
               var result_nodes = [];
          var result_target = [];

          for(let i = 0; i<input.data.length;i++){
              var node = {};
              // 找到点的属性
              node.id = input.data[i].name;
              node.label = input.data[i].name;
              node.priority = input.data[i].priority;
              node.startTime = input.data[i].startTime;
              node.endTime = input.data[i].endTime;
              node.workingTime = input.data[i].workingTime;
              // humanuse
              if(input.data[i].humanUse === true)
               node.humanUse = '人工监管参与';
              else
               node.humanUse  = '人工监管未参与';

               // 节点状态--用颜色表示
               if(input.data[i].workStatus === 0){
               node.workStatus = '任务未执行';
               }
               else if(input.data[i].workStatus === 1){
               node.workStatus = '任务已执行';
               }
               else if(input.data[i].workStatus === 2){
               node.workStatus = '任务有异常';
               }
               else{
               node.workStatus = '无任务状态返回';
               }

               // 任务执行时间
               if(input.data[i].workingStartTime == null)
               node.workingStartTime = "当前任务未分配";
               else
               node.workingStartTime = input.data[i].workingStartTime;

               node.workStatusColor = input.data[i].workStatus;
               node.description =node.humanUse + '   ' + node.workStatus;
              result_nodes.push(node);

              // 找到target节点
              for(let j = 0; j< input.data[i].target.length; j++){
                  var target = {};
                  target.source = input.data[i].name;
                  target.target = input.data[i].target[j];
                  console.log("target.source:" + target.source + "target.target" + target.target)
                  result_target.push(target)
              }

          }
          result_nodes[0].ccc = 0;
          console.log("这里是多少？"+result_nodes[0].ccc);
          this.getChart(result_nodes,result_target);
                }).catch(()=>{
                    console.log("getTaskApi fail")
                });         
      },

      getChart(nodes_new,edges_new){
      console.log("刷新了这个页面-所以可以显示");
var color = ['#40E0D0','#1E90FF'];
const data = {
    nodes:nodes_new,
    edges:edges_new
    /*
    nodes: [
        {
            id: '0',
            label: '0',
        },
        {
            id: '1',
            label: '1',
        },
        {
            id: '2',
            label: '2',
        },
        {
            id: '3',
            label: '3',
        },
        {
            id: '4',
            label: '4',
        },
        {
            id: '5',
            label: '5',
        },
        {
            id: '6',
            label: '6',
        },
        {
            id: '7',
            label: '7',
        },
        {
            id: '8',
            label: '8',
        },
        {
            id: '9',
            label: '9',
        },
        {
            id: '10',
            label: '9',
        },
    ],
    
    edges: [
        {
            source: '0',
            target: '1',
        },
        {
            source: '0',
            target: '2',
        },
        {
            source: '1',
            target: '4',
        },
        {
            source: '0',
            target: '3',
        },
        {
            source: '3',
            target: '4',
        },
        {
            source: '4',
            target: '5',
        },
        {
            source: '4',
            target: '6',
        },
        {
            source: '5',
            target: '7',
        },
        {
            source: '5',
            target: '8',
        },
        {
            source: '8',
            target: '9',
        },
        {
            source: '2',
            target: '9',
        },
        {
            source: '3',
            target: '9',
        },
        
    ],
    */
};
const tooltip = new G6.Tooltip({
  pageX: 10,
  offsetY: 20,
  getContent(e) {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.style.textAlign = 'left';
    outDiv.innerHTML = `
      <h4>${e.item.getModel().label}任务详情</h4>
      <ul>
        <li>* 任务ID: ${e.item.getModel().id}</li>
      </ul>
      <ul>
        <li>* 任务名称: ${e.item.getModel().label}</li>
      </ul>
       <ul>
        <li>* 任务优先级: ${e.item.getModel().priority}</li>
      </ul>
      <ul>
        <li>* 任务完成时间: ${e.item.getModel().workingStartTime}</li>
      </ul>
      <ul>
        <li>* humanUse: ${e.item.getModel().humanUse}</li>
      </ul>
      <ul>
        <li>* workingTime: ${e.item.getModel().workingTime}</li>
      </ul>
`
    return outDiv
  },
  itemTypes: ['node']
});
const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
    container: 'container',
    width,
    height,
    fitView: true,
    plugins: [tooltip], // 配置 Tooltip 插件
    modes: {
        default: ['drag-canvas', 'drag-node',
        ],
    },
    nodeStateStyles: {
    hover: {
      lineWidth: 2,
      stroke: '#1890ff',
      fill: '#e6f7ff',
    },
  },
    layout: {
        type: 'dagre',
        rankdir: 'LR',
        align: 'UL',
        controlPoints: true,
        nodesepFunc: () => 1,
        ranksepFunc: () => 1,
    },
      defaultNode: {
    type: 'modelRect',
    size: [270, 80],
    style: {
      radius: 2,
      stroke: '#69c0ff',
      fill: data.nodes[2].ccc, // 底色
      lineWidth: 1.5,
      fillOpacity: 1,
    },
    // label configurations
    labelCfg: {
      style: {
        fill: '#595959',
        fontSize: 20,
      },
      offset: 30,
    },
    // left rect
    preRect: {
      show: true,
      width: 10,
      fill: '#40a9ff',
      radius: 2,
    },
    // configurations for the four linkpoints
    linkPoints: {
      top: false,
      right: false,
      bottom: false,
      left: false,
      // the size of the linkpoints' circle
      size: 10,
      lineWidth: 1,
      fill: '#72CC4A',
      stroke: '#72CC4A',
    },
    // configurations for the icon
  },
    defaultEdge: {
        type: 'polyline',
        size: 1,
        color: '#4169E1',
        style: {
            endArrow: {
                path: 'M 0,0 L 8,4 L 8,-4 Z',
                fill: '#e2e2e2'
            },
            radius: 10
        },
    },
});
graph.node(function (node) {
                        // depth 类似节点标识
                        if(node.workStatusColor === null){
                            console.log(node)
                            return {
                                preRect:{
                                    fill:'#6495ED',
                                    // stroke:''
                                },
                            }
                        }
              
                        if(node.workStatusColor === 0){
                            console.log(node)
                            return {
                                preRect:{
                                    fill:'#778899',
                                    // stroke:''
                                },
                            }
                        }
                        if(node.workStatusColor === 1){
                            console.log(node)
                            return {
                                preRect:{
                                    fill:'#30BF78',
                                    // stroke:''
                                },
                            }
                        }
                        if(node.workStatusColor === 2){
                            console.log(node)
                            return {
                                preRect:{
                                    fill:'#DC143C',
                                    // stroke:''
                                },
                            }
                        }
                        return {
                            labelCfg: {
                                // position: node.children && node.children.length > 0 ? 'left' : node.x > centerX ? 'right' : 'left', // 设置显示左右
                                offset: 5
                            }
                        };
                    });
graph.data(data);
graph.render();
graph.on('node:mouseenter', evt => {
  const { item } = evt;
  graph.setItemState(item, 'hover', true);
});

graph.on('node:mouseleave', evt => {
  const { item } = evt;
  graph.setItemState(item, 'hover', false);
});
console.log("刷新了这个页面-页面结束");
      },
  },
};
</script>

<style>
#container {
  width: 100%;
  height: 100%;
  position: relative;
}
.g6-tooltip {
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      font-size: 12px;
      color: #545454;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 10px 8px;
      box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    }
</style>
