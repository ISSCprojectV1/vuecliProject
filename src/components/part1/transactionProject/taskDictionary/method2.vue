<template>
        <div id="Div">
            <!--创建一个echarts的容器-->
        <div id="method2Div" style="width:900px; height:400px"></div>
        </div>
</template>

<script>
import echarts from 'echarts'
    export default {
        name: "Time_granularity",
        mounted() {
            this.drawLine();
        },

        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('method2Div'))
  var points = [{
            name: "监管任务0",
            //x,y坐标
            value: [0, 300],
            target: ['监管任务1', '监管任务2'],
            // offset: true,
        }, {
            name: "监管任务1",
            value: [450, 600],
            target: ['监管任务3']
        }, {
            name: "监管任务3",
            value: [900, 600],
            target: ['离线实验']
        }, {
            name: "监管任务2",
            value: [450, 300],
            target: ['监管任务4','监管任务5'],
            selected: true
        }, {
            name: "监管任务4",
            value: [900, 300]
        }, {
            name: "监管任务5",
            value: [900, 0],
            target: ['监管任务4'],
        }];
        /*
           获取target在source中的坐标
           */
        var getPointCoordinate = function (source, targetName) {
            var targetItem = source.filter(item => {
                return item.name == targetName;
            });
            console.log('targetItem,', targetItem);
            return targetItem[0].value;
        }

        /*
        获取路径要添加的点
        */
        var getRoutePoint = function (startCoordinate, endPointName) {
            var endPoint = getPointCoordinate(points, endPointName);
            var gap = 100;
            var rs = [];
            let startPointX = startCoordinate[0];
            let startPointY = startCoordinate[1];
            let endPointX = endPoint[0];
            let endPointY = endPoint[1];
            //横坐标相同
            if (startPointX == endPointX) {
                 point1 = {
                    name: 'offset1' + endPointName,
                    value: [startPointX + gap, startPointY],
                    symbol: 'none',
                    target: ['offset2' + endPointName]
                };
                 point2 = {
                    name: 'offset2' + endPointName,
                    value: [startPointX + gap, endPointY],
                    symbol: 'none',
                    target: [endPointName]
                };
                rs.push(point1);
                rs.push(point2);
            } else if (startPointY == endPointY) {
                var point1 = {
                    name: 'offset1' + endPointName,
                    value: [startPointX, startPointY - gap],
                    symbol: 'none',
                    target: ['offset2' + endPointName]
                };
                var point2 = {
                    name: 'offset2' + endPointName,
                    value: [endPointX, startPointY - gap],
                    symbol: 'none',
                    target: [endPointName]
                };
                rs.push(point1);
                rs.push(point2);
            } else {
                rs.push({
                    name: 'offset1' + endPointName,
                    value: [endPointX, startPointY],
                    symbol: 'none',
                    target: [endPointName]
                });
            }
            return rs;
        }

        var handlePoints = function (points) {

            for (var i = 0; i < points.length; i++) {
                var item = points[i];
                //当前点坐标
                var currentCoordinate = item.value;
                //是否存在目标点连线
                if (item.target) {
                    var targetItem = item.target;
                    for (var j = 0; j < targetItem.length; j++) {
                        var selected = item.selected;
                        //是否需要偏移偏移需要虚拟点
                        if (item.offset) {
                            var routes = getRoutePoint(currentCoordinate, targetItem[j]);
                            var newTarget = [routes[0].name]
                            item.target = newTarget;
                            for (const key in routes) {
                                var element = routes[key];
                                element.selected = selected;
                                points.push(element)
                            }
                        }
                    }
                }
            }
            return points;
        }

        var newPoints = handlePoints(points);

        console.log('newPoints', newPoints)


        var seriesData = function (data) {
            return data.map(item => ({
                name: item.name,
                symbol: item.symbol && item.symbol === 'none' ? 'none' : 'rect',
                symbolSize: item.name.indexOf('offset') != -1 ? 0 : [80, 40], //图标大小                 
                draggable: false,
                fixed: true,
                value: item.value,
                edgeSymbol: ['circle', 'arrow'],
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: "#157eff"
                            },
                            {
                                offset: 1,
                                color: "#35c2ff"
                            }
                        ])
                    }
                }
            }));
        }
        console.log('seriesData', seriesData(newPoints))



        var links = function (data) {
            console.log('links data', data)
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var currentCoordinate = item.value;
                console.debug('currentCoordinate', currentCoordinate)
                if (item.target) {
                    console.debug('item.target', item.target)
                    for (var j = 0; j < item.target.length; j++) {
                        res.push({
                            source: item.name,
                            target: item.target[j],
                            lineStyle: {
                                normal: {
                                    color: "#12b5d0",
                                }
                            }
                        })
                    }
                }

            }
            console.log('links', res)

            return res;
        }
                // 绘制图表
    myChart.setOption({

            backgroundColor: "#fff",
            roam: true,
            xAxis: {
                show: false,
                type: "value"
            },
            yAxis: {
                show: false,
                type: "value"
            },
            tooltip: {},
            series: [{
                    type: "graph",
                    // zlevel: 5,

                    draggable: false,
                    coordinateSystem: "cartesian2d", //使用二维的直角坐标系（也称笛卡尔坐标系）

                    // edgeSymbolSize: [0, 8], //边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定
                    // edgeLabel: {
                    //   normal: {
                    //     textStyle: {
                    //       fontSize: 60
                    //     }
                    //   }
                    // },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [2, 6],

                    //关系图节点标记的图形
                    symbol: "rect",
                    symbolOffset: ['15%', 0],
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    lineStyle: {
                        normal: {
                            opacity: 1,
                            // color: "#cccccc",
                            curveness: 0,
                            // 12b5d0
                            type: "dashed",
                            width: 1
                        }
                    },
                    data: seriesData(newPoints),
                    links: links(newPoints)

                },

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
