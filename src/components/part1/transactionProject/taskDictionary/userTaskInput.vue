<template>
    <div style="width: 100%;height: 800px">
        <h2 class="red"> 监管与服务任务-- </h2>
        <div class="block" style="height:80px;text-align:left">
  <el-form ref="form" :model="form" label-width="130px">
   <el-form-item label="监管与服务地区">
    <el-select v-model="serve_place" placeholder="请选择监管省份">
      <el-option label="青岛" value="1"></el-option>
      <el-option label="上海" value="2"></el-option>
      <el-option label="杭州" value="3"></el-option>
    </el-select>

     监管周期
     <el-date-picker
      v-model="serve_timeRange"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
   </el-form-item>

   <el-form-item label="监管种类">
    <el-select v-model="serve_species" placeholder="请选择监管种类">
      <el-option label="钢铁" value="1"></el-option>
      <el-option label="棉花" value="2"></el-option>
      <el-option label="石油" value="3"></el-option>
     <el-option label="重金属" value="4"></el-option>
    </el-select>
    监管任务类型：
    <el-select v-model="serve_type" placeholder="请选择任务类型">
      <el-option label="信贷监管" value="信贷监管"></el-option>
      <el-option label="仓单监管" value="仓单监管"></el-option>
      <el-option label="质押权监管" value="质押权监管"></el-option>
      <el-option label="融资监管" value="融资监管"></el-option>
      <el-option label="主体查验" value="主体查验"></el-option>
      <el-option label="库存核实" value="库存核实"></el-option>
      <el-option label="报表审查" value="报表审查"></el-option>
      <el-option label="关联交易质押品审核" value="关联交易质押品审核"></el-option>
    </el-select>
  </el-form-item>

<el-button type="success" @click="postAddress">立即创建</el-button>
<el-button type="info" @click="abortForm">取消创建</el-button>
</el-form>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="任务集" name="taskTree">
        任务分解情况（目前仅为单笔）
        <div id="echartContainer" style="width:900px; height:400px"></div>
    </el-tab-pane>
    <el-tab-pane label="监管联盟图" name="graph">
      <echarts></echarts>
    </el-tab-pane>
  </el-tabs>
        </div>
    </div>
</template>

<script>
    import echarts from "@/components/part1/transactionProject/echarts";
    import {postTaskDecompositionApi} from "@/api/part1/transactionProject";

    export default {
        name: "Time_granularity",
        
        components: {
            echarts
        },
        mounted() {
        },

         data() {
      return {
        serve_place:'',
        serve_species:'',
        serve_timeRange:'',
        serve_type:'',
        activeName: 'taskTree',
        isUpdatastrategy:false,
        // 开始日期输入限制
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      };
    },

        methods: {
          // 创建监管任务
          postAddress(){
            this.getData();
          },
          getData(){
             var data = { "name":this.serve_type,  
             "value":null,
             "children":null
                };
                console.log("用户输入是："+ data)
                postTaskDecompositionApi(data).then((res) => {
                 console.log(res.data.data[0])
                 if(res.data.data.length === 0){
               this.$error("系统错误！请稍后重试！");
                }
                else{
                this.$message({
                 type: 'success',
                  message: '任务分配已完成，请从下方查看分解情况。'
          });
                }
                 this.drawLine(res.data.data[0]);
                }).catch(()=>{
                    console.log("postTaskDecompositionApi fail")
                });  
            },
            drawLine(inputData) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('echartContainer'))
  var colorMap = {
    normal: '#18a849',
    warn: '#FFC125',
    error: '#FF0000',
};
var data = inputData;
/*
   var data = {
    "name": "信贷监管",
    "children": [
        {
            "name": "仓单监管",
            "children": [
                {
                    "name": "主体查验",
                    "children": [
                        {"name": "仓管主体查验"},
                        {"name": "交易主体查验"}
                    ]
                },
                {
                    "name": "库存核实",
                    "value": 3322
                },
                {
                    "name": "报表审查",
                    "value": 3322
                }
            ]
        },
        {
            "name": "质押权监管",
            "children": [
                {"name": "关联交易质押品审核", "value": 8833},
                {"name": "抵押金审核", "value": 1732}
            ]
        },
        {
            "name": "融资监管",
            "children": [
                {"name": "融资套现",
                 "children": [
                {"name": "关联交易监管", "value": 8833},
                {"name": "交易周期监管", "value": 1732},
                {"name": "跨境交易监管", "value": 1732}
            ]
                },
                {"name": "融资回款", 
                "children": [
                {"name": "融资续期监管", "value": 8833},
                {"name": "融资超期监管", "value": 1732},            ]
                }
            ]
        },
    ]
};*/
                // 绘制图表
    myChart.setOption({
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series:[
        {
            type: 'tree',
            id: 0,
            name: 'tree1',
            data: [data],

            top: '10%',
            left: '8%',
            bottom: '22%',
            right: '20%',

            symbolSize: 15,

            edgeShape: 'polyline',
            edgeForkPosition: '63%',
            initialTreeDepth: 3,

            lineStyle: {
                width: 2
            },
            itemStyle: {
                borderColor: '#6A5ACD'
            },
            label: {
                backgroundColor: '#fff',
                position: 'left',
                verticalAlign: 'middle',
                align: 'right'
            },

            leaves: {
                label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                },
            },
        }
    ]
});
 myChart.on("click", clickFun);
 function clickFun(param) {
    if (typeof param.seriesIndex == 'undefined') {
        return;
    }
    if (param.type == 'click') {
        if(param.value !== undefined){
        alert(param.name + "执行情况:  " + param.value);
        }
    }
}
            },
     handleClick(tab, event) {
        console.log(tab, event);
        if(this.activeName == 'others'){
        this.isUpdatastrategy = true;
    }
      }
        },

    }
</script>

<style scoped>
</style>
