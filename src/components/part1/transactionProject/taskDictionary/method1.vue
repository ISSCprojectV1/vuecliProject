<template>
  <div id="app">
    <el-dialog title="任务信息反馈"
               :visible.sync="dialogTableVisible" center :append-to-body='true'
               :lock-scroll="false" width="30%"
               :close-on-click-modal="false">
      <taskMethodChange :taskin="taskin"></taskMethodChange>
    </el-dialog>
    <!-- <button @click="toUpdate">切换数据</button> -->
    <div id="rule"  style="width:1000px; height:30px"></div>
    <div id="container" style="width:1200px; height:600px">

    </div>
  </div>
</template>

<script>
// import {init,update} from './utils/g6Utils.min.js';
import G6 from '@antv/g6'
import {getTaskApi} from "@/api/part1/transactionProject";
import taskMethodChange from "@/components/part1/Multimodal-multigranularity/taskMethodChange";
// import insertCss from 'insert-css'
import {timestampToTime} from "@/utils/part3";
export default {
 // name: '这里',

  data () {
    return {
      dialogTableVisible: false,
      taskin:[],
    };

  },
  components: {
    taskMethodChange,


  },
    mounted () {
        this.$nextTick(() => {
      //  执行echarts方法
        this.getData();
      })
  },
  methods: {
    addNewTask1() {

      this.dialogTableVisible = true;

    },
      getData(){
          getTaskApi().then((res) => {
              var input = res.data;
               var result_nodes = [];
          var result_target = [];
console.log(input)
          for(let i = 0; i<input.data.length;i++){
     //       console.log(input.data[i])
              var node = {};
              // 找到点的属性
              node.userId = input.data[i].id;
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
            if(input.data[i].operatorName === null){
              node.operatorName = '任务未分配';
            }else
              node.operatorName= input.data[i].operatorName

               // 节点状态--用颜色表示
               if(input.data[i].workStatus === 0){
               node.workStatus = '任务未完成';
               }
               else if(input.data[i].workStatus === 1){
               node.workStatus = '任务已执行';
               }
               else if(input.data[i].workStatus === 2){
               node.workStatus = '任务有异常';
               }
               else{
               node.workStatus = '无任务状态';
               }

               // 任务执行时间
               if(input.data[i].workingStartTime == null)
               node.workingStartTime = "当前任务未分配";
               else
               node.workingStartTime = input.data[i].workingStartTime;

               node.workStatusColor = input.data[i].workStatus;
               node.description =node.humanUse + ':' + node.workStatus;
              result_nodes.push(node);

              // 找到target节点
              for(let j = 0; j< input.data[i].target.length; j++){
                  var target = {};
                  target.source = input.data[i].name;
                  target.target = input.data[i].target[j];
                  result_target.push(target)
              }

          }
          result_nodes[0].ccc = 0;
          this.getChart(result_nodes,result_target);
                }).catch(()=>{
                    console.log("getTaskApi fail")
                });         
      },

      getChart(nodes_new,edges_new){
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
  offsetX: 10,
  fixToNode: [1, 0],
  getContent(e) {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';

  outDiv.style.textAlign = 'left';
   // outDiv.style.padding='0px 10px 24px 10px;'
    //console.log(e.item.getModel())
    outDiv.innerHTML = `
      <h2>${e.item.getModel().label}任务详情</h2>
      <ul>
        <h3>* 任务ID: ${e.item.getModel().userId}</h3>
      </ul>
      <ul>
        <h3>* 任务名称: ${e.item.getModel().label}</h3>
      </ul>
       <ul>
        <h3>* 任务优先级: ${e.item.getModel().priority}</h3>
      </ul>
          <ul>
        <h3>* 人: ${e.item.getModel().humanUse}</h3>
      </ul>
      <ul>
        <h3>* 任务开始时间: ${(Number.isNaN(e.item.getModel().workingStartTime))?e.item.getModel().workingStartTime:
            (timestampToTime(e.item.getModel().workingStartTime))}</h3>
      </ul>
      <ul>
        <h3>* ${e.item.getModel().humanUse}</h3>
      </ul>
      <ul>
        <h3>* 工作时间: ${e.item.getModel().workingTime/3600000+"小时"}</h3>
      </ul>
  <ul>
        <h3>* 操作员: ${e.item.getModel().operatorName}</h3>
      </ul>
          <ul>
        <h3>* 结束时间: ${(Number.isNaN(e.item.getModel().endTime))?e.item.getModel().endTime:
            ((!e.item.getModel().endTime)?"NaN-NaN-NaN":timestampToTime(e.item.getModel().endTime))}</h3>
      </ul>
`

    return outDiv
  },
  itemTypes: ['node']
});
let fixSelectedItems = {
  fixAll: true,
  fixState: 'yourStateName', // 'selected' by default
};
const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graphDiv = document.getElementById('container');
const graph = new G6.Graph({
    container: 'container',
    width,
    height,
    fitView: true,
    plugins: [tooltip], // 配置 Tooltip 插件
    modes: {
        default: ['drag-canvas', 'drag-node',
        {
        type: 'zoom-canvas',
        fixSelectedItems,
      },
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
    size: [350, 100],
    style: {
      radius: 2,
      stroke: '#69c0ff',
      fill: data.nodes[2].ccc, // 底色
      lineWidth: 1.5,
      fillOpacity: 1,
    },
    // label configurations
    labelCfg: {
      style: {//18-32 46-86 100 128
        fill: '#595959',
        fontSize: 27,
      },
    },
    // label configurations
    descriptionCfg: {
      style: {
        x:12,
        y:8,
        fill: '	#708090',
        fontSize: 20,
      },
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
       stateIcon: {
      // whether to show the icon
      show: false,
    },
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
const legendContainer = document.createElement('div');
legendContainer.id = 'legendContainer';
const legendGraphDiv = document.createElement('div');
legendGraphDiv.id = 'legend';
legendContainer.appendChild(legendGraphDiv);
        const graphDiv2 = document.getElementById('rule');
        graphDiv2.appendChild(legendContainer);
        //graphDiv.parentNode.appendChild(legendContainer);
const legendGraph = new G6.Graph({
  //container: 'legend',
  container: 'rule',
  width: 600,
  height: 30,
  defaultNode: {
    size: 15,
    shape: 'circle',
    labelCfg: {
           position: 'right',
      //position: 'top',
      offset: 10,
      style: {
        fontSize: 18,
        fill: '#2F4F4F',
      },
    },
  },
});
const legendX = 45;
//const legendX = 20;
const legendBeginY = 15;
//const legendBeginY = 100;
    //    const legendXPadding = 125;
    // const legendYPadding = 25;
const legendXPadding = 150;
const legendYPadding = 25;
const legendData = {
  nodes: [
    {
      id: 'level1',
      x: legendX,
      y: legendBeginY,
      label: '任务未分配',
      style: {
        fill: '#6495ED',
      },
    },
    {
      id: 'level2',
      x: legendX+legendXPadding,
      y: legendBeginY,
      label: '任务未完成',
      style: {
        fill: '#778899',
      },
    },
    {
      id: 'level3',
      label: '任务正常',
      x: legendX+legendXPadding*2,
      y: legendBeginY,
      //y: legendBeginY + legendYPadding * 2,
      style: {
        fill: '#30BF78',
      },
    },
    {
      id: 'level4',
      label: '任务异常',
      x: legendX+legendXPadding*3,
      y: legendBeginY,
    //  y: legendBeginY + legendYPadding * 2,
      style: {
        fill: '#DC143C',
      },
    },
  ],
};
legendGraph.data(legendData);
legendGraph.render();
        graph.on('node:click', (e) => {


          const { item } = e
          const { id, x, y } = item.getModel()

this.taskin=item.getModel();
         this.taskin.name=item.getModel().label
      this.taskin.id=item.getModel().userId

console.log(this.taskin)
          if(item.getModel().humanUse=="人工监管参与"){
            this.addNewTask1()
          }

        //  console.log(`id:${id}, x:${x}, y:${y}`)
        })
graph.node(function (node) {
                        // depth 类似节点标识
                        if(node.workStatusColor === null){
                          //  console.log(node)
                            return {
                                preRect:{
                                    fill:'#6495ED',
                                    // stroke:''
                                },

                            }
                        }
              
                        if(node.workStatusColor === 0){
                          //  console.log(node)
                            return {
                                preRect:{
                                    fill:'#778899',
                                    // stroke:''
                                },
                              style:{
                                fill:"#FFFF00"
                              }
                            }
                        }
                        if(node.workStatusColor === 1){
                          //  console.log(node)
                            return {
                                preRect:{
                                    fill:'#30BF78',
                                    // stroke:''
                                },
                            }
                        }
                        if(node.workStatusColor === 2){
                          //  console.log(node)
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
      padding: 0px 10px 24px 10px;
      box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    }
 #legendContainer{
    position: absolute;
    top: 10px;
    right: 300px;
    width: 150px;
    height: 100px;
  }
.g6-minimap-container {
  border: 1px solid #e2e2e2;
}
.g6-minimap-viewport {
  border: 2px solid rgb(25, 128, 255);
}
</style>
