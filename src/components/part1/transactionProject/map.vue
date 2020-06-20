<template>
<div class="Map" >
<div id="map" :style="{width: '100%', height: '800px'}"></div>
</div>
</template>>

<script>
import $ from 'jQuery'
import echarts from 'echarts'
import Axios from 'axios';
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
var uploadedDataURL = "/china.json";
var jiangsu = "/map/province/jiangsu.json"
//如果想要修改，请点击上方克隆，然后在自己的版本上修改，不要在lz的版本上改！！
 
var geoGpsMap = {
    '1': [109.1162, 34.2004],
    '2': [116.4551, 40.2539],
    '3': [113.12244, 23.009505],
    '4': [87.9236, 43.5883],
    '5': [127.9688, 45.368],
    '6': [91.11, 29.97],
};

var Management = [
    {
        "name": "山东交易市场清算所有限公司",
        "count":'3',
        "value": [117.1582,36.8701],
    },
    {
        "name": "福建交易场所清算中心 ",
        "count":'1',
        "value": [119.4543,25.9222],
        
    },
    {
        "name": "广州商品清算中心股份有限公司 ",
        "count":'1',
        "value": [113.12244, 23.009505],
        
    },
    {
        "name": "江苏交易场所登记算有限公司  ",
        "count":1,
        "value": [118.8062, 31.9208], 
    },
    {
        "name": "大连商品交易登记结算有限公司  ",
        "value": [116.1582,36.8701],
        "count":1
    },
    {
        "name": "宁夏登记结算(中心)有限公司",
        "value": [106.3586, 38.1775],
        "count":1
    },
    {
        "name": "北京登记结算有限公司",
        "value": [116.4551, 40.2539],
        "count":1
    },
    {
        "name": "天津商品交易清算所 ",
        "value": [117.4219, 39.4189],
        "count":1
    },
    {
        "name": "江西联交运金融服务有限公司 ",
        "value": [116.0046, 28.6633],
        "count":1
    }
]
// 省份坐标
var geoCoordMap = {
    '黑龙江': [127.9688, 45.368],
    '内蒙古': [110.3467, 41.4899],
    "吉林": [125.8154, 44.2584],
    '北京市': [116.4551, 40.2539],
    "辽宁": [123.1238, 42.1216],
    "河北": [114.4995, 38.1006],
    "天津": [117.4219, 39.4189],
    "山西": [112.3352, 37.9413],
    "陕西": [109.1162, 34.2004],
    "甘肃": [103.5901, 36.3043],
    "宁夏": [106.3586, 38.1775],
    "青海": [100.4038, 36.8207],
    "新疆": [87.9236, 43.5883],
    "西藏": [91.11, 29.97],
    "四川": [103.9526, 30.7617],
    "重庆": [108.384366, 30.439702],
    "山东": [117.1582, 36.8701],
    "河南": [113.4668, 34.6234],
    "江苏": [118.8062, 31.9208],
    "安徽": [117.29, 32.0581],
    "湖北": [114.3896, 30.6628],
    "浙江": [119.5313, 29.8773],
    "福建": [119.4543, 25.9222],
    "江西": [116.0046, 28.6633],
    "湖南": [113.0823, 28.2568],
    "贵州": [106.6992, 26.7682],
    "云南": [102.9199, 25.4663],
    "广东": [113.12244, 23.009505],
    "广西": [108.479, 23.1152],
    "海南": [110.3893, 19.8516],
    '上海': [121.4648, 31.2891],
};
 
var colors = [
    ["#1DE9B6", "#F46E36", "#04B9FF", "#5DBD32", "#FFC809", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3"],
    ["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3", "#9D96F5", "#8378EA", "#8378EA"],
    ["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
];
 
var colorIndex = 0;

   
   //var companyVal =[];
   //companyVal = this.companyData;
   //console.log("companyVal的内容是" + companyVal);
   //var equityCompany = [];
   //equityCompany = companyVal[0].value;
   //console.log("equityCompany的内容是" + equityCompany);


$(function () {
    var classes = ["权益类公司", "现货类公司"];
    var mapData = [
        [],
        [],
    ];
    var companyVal = [];
    var equityCompany = []; // 权益类公司数据
    var spotCompony = []; // 现货类公司数据
    var categoryData = []; 
    var barData = [];
   // 获取历史交易数据
   console.log("获取公司白名单*后期补入交易数据")
   Axios.get('moc/getComponyData').then((res) => {
   console.log("Company Json:"+res.data);
   this.companyData =res.data;
   companyVal = this.companyData;
   console.log("companyVal"+companyVal);
   equityCompany = companyVal[0].value;
   spotCompony = companyVal[1].value;
   var count = 0;
   for (var key in geoCoordMap) {
        categoryData.push(key);
        mapData[0].push({
            "classes": 'equityCompany',
            "name": key,
            "value":equityCompany[count]
        });
        mapData[1].push({
            "classes": 'SpotCompony',
            "name": key,
            "value": spotCompony[count]
        });
        count = count+1;
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
                data: classes,
                axisType: 'category',
                autoPlay: true,
                playInterval: 5000,
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
        for (var n = 0; n < classes.length; n++) {
            optionXyMap01.options.push({
                backgroundColor: '#051b4a',
                title: [{
                     text: '全国大宗物流流通情况',
                     subtext: 'XXXXXXXXXX',
                     left: 'center',
                     textStyle: {
                         color: '#fff',
                         fontSize: 25
                     }
                },
                    {
                        id: 'statistic',
                        text: classes[n] + "数据统计情况",
                        left: '75%',
                        top: '8%',
                        textStyle: {
                            color: '#fff',
                            fontSize: 20
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
                                show: true,
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        tooltip: {
                         trigger : 'item',
                         formatter : '点击获得'+'{b}'+'地区详细信息',
                         textStyle:{
                              color : '#000000',
                              fontSize : 16

                         },
                         backgroundColor : '#F0F8FF',
                         borderColor : '#5F9EA0',
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
                    // 清管所位置标记
                    {
                    name: '全国清管所位置分布',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,

                    symbol: 'pin',
                    label: {
                        normal: {
                         show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 9,
                    },
                    formatter (Management){
                        console.log("Management = "+ Management.name)
                        return Management.name
                    }
                },
                        emphasis: {
                            show: true,
                            fontSize: 15,
                            color:'#000000',
                            backgroundColor:'#FFFFFF',
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    symbolSize: 45,
                    showEffectOn: 'render',
                    itemStyle: {
                        normal: {
                            color: '#DDA0DD',
                            opacity:1
                        }
                    },
                    data: Management
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
                    /*
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
                    },*/
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
                ],
                legend: {
                type: "plain",
                show: true,
                orient: 'vertical',
                top: '10%',
                left: '5%',
                data: [
                    {
                        name: "全国清管所位置分布",
                        icon: "circle",
                        textStyle: {
                            color: "#F0F8FF",
                            fontSize: 20,
                        }
                    }
                ]
            },
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
        if(params.name=="山东"){
        console.log("符合条件")
        var url2 = "http://localhost:8088/shandong";
        window.location.href=url2;
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
   console.log("获取公司白名单成功 ")
   }).catch(()=>{
   console.log("getComponyData fail")
                });
   
   //console.log("equityCompany:"+equityCompany);
    /*柱子Y名称
    权益类公司：equityCompany；
    现货类公司：SpotCompony
    */
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