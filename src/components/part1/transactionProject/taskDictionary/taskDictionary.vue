<template>
        <div id="app">
            <!--创建一个echarts的容器-->
        <div id="echartContainer" style="width:900px; height:400px"></div>
        </div>
</template>

<script>

    export default {
        name: "Time_granularity",
        mounted() {
            this.drawLine();
        },

        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('echartContainer'))
  var colorMap = {
    normal: '#18a849',
    warn: '#FFC125',
    error: '#FF0000',
};

   var data = {
    "name": "信贷监管",
    "children": [
        {
            "name": "仓单监管",
            "children": [
                {
                    "name": "主体查验",
                    "children": [
                        {"name": "仓管主体查验", "value": 721},
                        {"name": "交易主体查验", "value": 4294}
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
};
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
            }
        },

    }


</script>

<style scoped>
    @import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
    .red{
        color: #000000;
        text-align:center;
        style:"width: 100%; height:100%"
    }
    .btn1{
        margin-right:100px;
        text-align:right;
        style:"width: 100%; height:100%"
    }
</style>
