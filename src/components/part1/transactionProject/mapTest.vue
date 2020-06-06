<template>
<div class="Map" >
<div id="map" :style="{width: '100%', height: '1000px'}"></div>
</div>
</template>>

<script>
import $ from 'jQuery'
import echarts from 'echarts'

export default {
     name: 'map_geo',
  data () {
    return {
      msg: 'welcome to map'
    }
     },
  mounted(){
    this.drawLine();
     },
  methods: {
    drawLine(){
var Echarts = {};
 
/***
 * 加载地图
 * @param data
 */
Echarts.loadData = function (data) {
 
};
 
 
//基于准备好的dom,初始化echarts实例
var myChart = echarts.init(document.getElementById('map'));
// var uploadedDataURL = "/static/map_json/data-1528971808162-BkOXf61WX.json";
// var uploadedDataURL = "/static/map_json/data-1528969802719-HyXIqhk-m.json";
var uploadedDataURL = "/map/province/anhui.json";
var jiangsu = "/map/province/jiangsu.json"
//如果想要修改，请点击上方克隆，然后在自己的版本上修改，不要在lz的版本上改！！
 
var geoGpsMap = {
   
};
// 市区坐标
var geoCoordMap = {
    "合肥市":[117.283042,31.86119],
    "芜湖市":[118.376451,31.326319],
    "蚌埠市":[117.363228,32.939667],
    "马鞍山市":[118.507906,31.689362],
    "淮南市":[117.018329,32.647574],
    "淮北市":[116.794664,33.971707],
    "铜陵市":[117.816576,30.929935],
    "安庆市":[117.043551,30.50883],
    "黄山市":[118.317325,29.709239],
    "滁州市":[118.316264,32.303627],
    "阜阳市":[115.819729,32.896969],
    "宿州市":[116.984084,33.633891]
};
 
var colors = [
    ["#1DE9B6", "#F46E36", "#04B9FF", "#5DBD32", "#FFC809", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3"],
    ["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3", "#9D96F5", "#8378EA", "#8378EA"],
    ["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
];
 
var colorIndex = 0;
 
$(function () {
    var year = ["监管机构", "棉花", "石油", "木炭", "2018","2019"];
    var mapData = [
        [],
        [],
        [],
        [],
        [],
        []
    ];
 
    /*柱子Y名称*/
    var categoryData = [];
    var barData = [];
    for (var key in geoCoordMap) {
        categoryData.push(key);
        mapData[0].push({
            "year": '2014',
            "name": key,
            "value": randomNum(100, 300)
        });
        mapData[1].push({
            "year": '2015',
            "name": key,
            "value": randomNum(100, 300)
        });
        mapData[2].push({
            "year": '2016',
            "name": key,
            "value": randomNum(100, 300)
        });
        mapData[3].push({
            "year": '2017',
            "name": key,
            "value": randomNum(100, 300)
        });
        mapData[4].push({
            "year": '2018',
            "name": key,
            "value": randomNum(100, 300)
        });
 
        mapData[5].push({
            "year": '2019',
            "name": key,
            "value": randomNum(0, 300)
        });
 
    }
    for (var i = 0; i < mapData.length; i++) {
        barData.push([]);
        for (var j = 0; j < mapData[i].length; j++) {
            barData[i].push(mapData[i][j].value)
        }
    }
    // 导入中国地图
    $.getJSON(uploadedDataURL, function (geoJson) {
 
        echarts.registerMap('china', geoJson);
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
 
        var convertToLineData = function (data, gps) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem.name];
                var toCoord = gps; //郑州
                //  var toCoord = geoGps[Math.random()*3];
                if (fromCoord && toCoord) {
                    res.push([{
                        coord: fromCoord,
                        value: dataItem.value
                    }, {
                        coord: toCoord,
                    }]);
                }
            }
            return res;
        };
        // 下方时间线
        var optionXyMap01 = {
            timeline: {
                data: year,
                axisType: 'category',
                autoPlay: true,
                playInterval: 3000,
                left: '10%',
                right: '10%',
                bottom: '3%',
                width: '80%',
                //  height: null,
                label: {
                    normal: {
                        textStyle: {
                            color: '#ddd'
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                symbolSize: 10,
                lineStyle: {
                    color: '#555'
                },
                checkpointStyle: {
                    borderColor: '#777',
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: true,
                    showPrevBtn: true,
                    normal: {
                        color: '#666',
                        borderColor: '#666'
                    },
                    emphasis: {
                        color: '#aaa',
                        borderColor: '#aaa'
                    }
                },
 
            },
            baseOption: {
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                grid: {
                    right: '1%',
                    top: '15%',
                    bottom: '10%',
                    width: '20%'
                },
                tooltip: {
                    trigger: 'axis', // hover触发器
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle: {
                            color: 'rgba(150,150,150,0.1)' //hover颜色
                        }
                    }
                },
                geo: {
                    show: true,
                    map: 'china',
                    roam: true,
                    zoom: 1,
                    center: [113.83531246, 34.0267395887],
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            // shadowColor: 'rgba(255, 255, 255, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    }
                },
            },
            options: []
 
        };
        for (var n = 0; n < year.length; n++) {
            optionXyMap01.options.push({
                backgroundColor: '#051b4a',
                title: [{
                     text: '地图',
                     subtext: '内部数据请勿外传',
                     left: 'center',
                     textStyle: {
                         color: '#fff'
                     }
                },
                    {
                        id: 'statistic',
                        text: year[n] + "年数据统计情况",
                        left: '75%',
                        top: '8%',
                        textStyle: {
                            color: '#fff',
                            fontSize: 30
                        }
                    }
                ],
                xAxis: {
                    type: 'value',
                    scale: true,
                    position: 'top',
                    min: 0,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        margin: 2,
                        textStyle: {
                            color: '#aaa'
                        }
                    },
                },
                yAxis: {
                    type: 'category',
                    //  name: 'TOP 20',
                    nameGap: 16,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    axisTick: {
                        show: false,
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: '#ddd'
                        }
                    },
                    data: categoryData
                },
                series: [
                    //未知作用
                    {
                        //文字和标志
                        name: 'light',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(mapData[n]),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: colors[colorIndex][n]
                            }
                        }
                    },
                    //地图？
                    {
                        type: 'map',
                        map: 'china',
                        geoIndex: 0,
                        aspectScale: 0.75, //长宽比
                        showLegendSymbol: false, // 存在legend时显示
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#031525',
                                borderColor: '#FFFFFF',
                            },
                            emphasis: {
                                areaColor: '#2B91B7'
                            }
                        },
                        animation: false,
                        data: mapData
                    },
                    //地图点的动画效果
                    {
                        //  name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(mapData[n].sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 20)),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: colors[colorIndex][n],
                                shadowBlur: 10,
                                shadowColor: colors[colorIndex][n]
                            }
                        },
                        zlevel: 1
                    },
                    //地图线的动画效果
                    {
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 4, //箭头指向速度，值越小速度越快
                            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                            symbol: 'arrow', //箭头图标
                            symbolSize: 3, //图标大小
                        },
                        lineStyle: {
                            normal: {
                                color: colors[colorIndex][n],
                                width: 0.1, //尾迹线条宽度
                                opacity: 0.5, //尾迹线条透明度
                                curveness: .3 //尾迹线条曲直度
                            }
                        },
                        data: convertToLineData(mapData[n], geoGpsMap[Math.ceil(Math.random() * 6)])
                    },
                    //柱状图
                    {
                        zlevel: 1.5,
                        type: 'bar',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: colors[colorIndex][n]
                            }
                        },
                        data: barData[n]
                    }
                ]
            })
        }
        myChart.setOption(optionXyMap01);
        myChart.on('click', (params)=>{
        console.log("新的点击事件"+params.name) 
         if(params.name=="安徽"){
        console.log("符合条件")
        var url = "http://localhost:8088/mapTest";
        window.location.href=url;
        }
        /*
        var _self = this;
        if(opt.goDown && params.name !== name[idx]){
            if(cityMap[params.name]){
                var url = cityMap[params.name];
                $.get(url, function(response){
                    // console.log(response);
                    curGeoJson = response;
                    echarts.registerMap(params.name, response);
                    handleEvents.resetOption(_self, option, params.name);
                });
            }
       }*/
    });
    });
});
 
 
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}
 
    }
  }
}
</script>>
<style scoped>
*{
	margin: 0;
	padding: 0;
}
body{
	font-family: Exo,'-apple-system','Open Sans',HelveticaNeue-Light,'Helvetica Neue Light','Helvetica Neue','Hiragino Sans GB','Microsoft YaHei',Helvetica,Arial,sans-serif;
	color: #333;
}

</style>>