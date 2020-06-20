<template>
<div class="Map" >
<div id="map" :style="{width: '100%', height: '1000px'}"></div>
</div>
</template>>

<script>
import $ from 'jQuery'
import echarts from 'echarts'
import {getComponyData} from "@/api/part1/transactionProject";
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
var uploadedDataURL = "/map/province/shandong.json";
var jiangsu = "/map/province/shandong.json"
 
// 清管所
var Management = [
    {
        "name": "山东交易市场清算所有限公司",
        "value": [117.020538,36.467116],
    },
]
// 白名单内的权益类公司
var equity = [
    {
        "name": "齐鲁股权交易中心有限公司",
        "value": [117.99689,36.823597],
    },
    {
        "name": "山东产权交易中心有限公司",
        "value": [117.150969,36.864913],
    },
    {
        "name": "山东文化产权交易所有限公司",
        "value": [117.043677,36.665935],
    },
    {
        "name": "山东省能源环境交易中心有限公司",
        "value": [117.147698,36.370023],
    },
     {
        "name": "山东金融资产交易中心有限公司",
        "value": [117.153411,36.665771],
    },
    {
        "name": "济南产权交易中心",
        "value": [117.079144,36.688675],
    },
    {
        "name": "青岛大数据交易中心有限公司",
        "value": [120.103168,35.903374],
    },
     {
        "name": "烟台海洋产权交易中心有限公司",
        "value": [121.080256,37.05063],
    },
    {
        "name": "烟台联合产权交易中心有限公司",
        "value": [121.45158,37.483227],
    },  {
        "name": "山东潍坊产权交易中心有限公司",
        "value": [119.17158,36.628416],
    },
     {
        "name": "潍坊文化产权交易中心有限公司",
        "value": [118.811699,36.519962],
    },
    {
        "name": "山东蓝色经济区产权交易中心有限公司",
        "value": [119.537189,35.431214],
    },{
        "name": "临沂信用资产交易中心有限公司",
        "value": [118.357015,35.107442],
    },
    {
        "name": "青岛蓝海股权交易中心有限公司",
        "value": [120.490935,36.152605],
    },
]

// 白名单内的现货类公司
var spot = [
    {
        "name": "山东齐鲁农产品交易中心有限公司",
        "value": [118.169569,36.209678],
    },
    {
        "name": "山东广丰橡胶轮胎交易中心有限公司",
        "value": [118.424372,37.065187],
    },
    {
        "name": "东营新华福岛能源交易中心有限公司",
        "value": [118.942533,37.906054],
    },
    {
        "name": "东亚畜牧现货产品交易所有限公司",
        "value": [119.170355,36.909544],
    },
     {
        "name": "威海国际海洋商品交易中心有限公司",
        "value": [122.413977,37.129491],
    },
    {
        "name": "日照大宗商品交易中心有限公司",
        "value": [119.357354,35.189053],
    },
    {
        "name": "临沂国际商品交易中心有限公司",
        "value": [118.295715,35.414345],
    },
     {
        "name": "黄河商品交易市场股份有限公司",
        "value": [116.145027,37.187694],
    },
    {
        "name": "山东滨海化工商务有限公司",
        "value": [119.146863,36.216874],
    },  {
        "name": "日照国际铁矿石交易中心有限公司",
        "value": [119.357035,35.723136],
    },
     {
        "name": "山东海倍电子商务股份有限公司",
        "value": [116.456601,35.505452],
    },
    {
        "name": "山东蓝色经济区产权交易中心有限公司",
        "value": [119.037189,35.431214],
    },{
        "name": "临沂信用资产交易中心有限公司",
        "value": [118.357015,34.807442],
    },
    {
        "name": "青岛蓝海股权交易中心有限公司",
        "value": [120.490935,36.152605],
    },
]
// 省份坐标
var geoCoordMap = {
   "青岛市":[120.355173,36.382982],
    "淄博市":[118.047648,36.814939],
    "枣庄市":[117.557964,34.856424],
    "东营市":[118.66471,37.434564],
    "潍坊市":[119.107078,36.70925],
    "烟台市":[121.091382,37.239297],
    "济宁市":[116.587245,35.415393],
    "泰安市":[117.129063,36.194968],
    "威海市":[122.116394,37.209691],
    "日照市":[119.461208,35.428588],
    "莱芜市":[117.677736,36.214397],
    "临沂市":[118.326443,35.065282],
    "德州市":[116.307428,37.453968],
    "聊城市":[115.980367,36.456013],
    "滨州市":[118.016974,37.383542],
    "菏泽市":[115.469381,35.246531],
    "济南市":[117.000923,36.675807]
};
 
 var manaData = [
    [{name:'德州市'}, {name:'济南市',value:95}],
    [{name:'菏泽市'}, {name:'莱芜市',value:90}],
    [{name:'德州市'}, {name:'济南市',value:80}],
    [{name:'枣庄市'}, {name:'莱芜市',value:70}]
];
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
   getComponyData().then((res) => {
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
        $.get("les-miserables.gexf", function(xml) { 
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

        var convertDataSec = function (data) {
         var res = [];
         for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
            });
        }
    }
    console.log("converDataSec结果是："+data.length + "其中coords是："+res[0].coords)
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
                    zoom: 4,
                    center: [119.83531246, 35.8267395887],
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
                     text: '山东省大宗物流流通情况',
                     subtext: 'XXXXXXXXXX',
                     left: 'center',
                     textStyle: {
                         color: '#fff',
                         fontSize: 30
                     }
                },
                    {
                        id: 'statistic',
                        text: classes[n] + "数据统计情况",
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

                    // 山东省清管所位置标记
                    {
                    name: '山东省清管所',
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
                        return Management.name
                    }
                },
                        emphasis: {
                            show: true,
                            fontSize: 15,
                            color:'#000000',
                            backgroundColor:'#FFFFFF',

                            position: 'right',
                            formatter :[
                        '{title|{b}}{abg|}',
                            '{message|坐标：{c}}',
                            '{lookup|点击查看相关企业}',
                            '{hr|}',
                    ].join('\n'),
                        borderColor: '#777',
                        borderWidth: 1,
                        borderRadius: 4,
                        width:250,
                        lineHeight:25,
                        rich: {
                            title: {
                                color: '#eee',
                                align: 'center',
                                width:250,
                                ontSize: 20,
                            },
                            abg: {
                                backgroundColor: '#333',
                                width: '100%',
                                align: 'right',
                                height: 25,
                                borderRadius: [4, 4, 0, 0]
                            },
                            lookup: {
                                height: 30,
                                color:'#DC143C',
                                align: 'left', 
                            },
                            hr: {
                                borderColor: '#777',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                        }  
                        }
                    },
                    symbolSize: 45,
                    showEffectOn: 'render',
                    itemStyle: {
                        normal: {
                            color: '#7FFFAA',
                            opacity:1
                        }
                    },
                    data: Management
                },
                    // 权益类公司白名单位置标记
                    {
                    name: '权益类公司白名单',
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
                    formatter (equity){
                        return equity.name
                    }
                },
                        emphasis: {
                            show: true,
                            fontSize: 15,
                            color:'#000000',
                            backgroundColor:'#FFFFFF',

                            position: 'right',
                            formatter :[
                        '{title|{b}}{abg|}',
                            '{message|坐标：{c}}',
                            '{lookup|点击查看相关企业}',
                            '{hr|}',
                    ].join('\n'),
                        borderColor: '#777',
                        borderWidth: 1,
                        borderRadius: 4,
                        width:250,
                        lineHeight:25,
                        rich: {
                            title: {
                                color: '#eee',
                                align: 'center',
                                width:250,
                                ontSize: 20,
                            },
                            abg: {
                                backgroundColor: '#333',
                                width: '100%',
                                align: 'right',
                                height: 25,
                                borderRadius: [4, 4, 0, 0]
                            },
                            lookup: {
                                height: 30,
                                color:'#DC143C',
                                align: 'left', 
                            },
                            hr: {
                                borderColor: '#777',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                        }  
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
                    data: equity
                },

                // 现货类公司白名单位置标记
                    {
                    name: '现货类公司白名单',
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
                    formatter (spot){
                        return spot.name
                    }
                },
                        emphasis: {
                            show: true,
                            fontSize: 15,
                            color:'#000000',
                            backgroundColor:'#FFFFFF',

                            position: 'right',
                            formatter :[
                        '{title|{b}}{abg|}',
                            '{message|坐标：{c}}',
                            '{lookup|点击查看相关企业}',
                            '{hr|}',
                    ].join('\n'),
                        borderColor: '#777',
                        borderWidth: 1,
                        borderRadius: 4,
                        width:250,
                        lineHeight:25,
                        rich: {
                            title: {
                                color: '#eee',
                                align: 'center',
                                width:250,
                                ontSize: 20,
                            },
                            abg: {
                                backgroundColor: '#333',
                                width: '100%',
                                align: 'right',
                                height: 25,
                                borderRadius: [4, 4, 0, 0]
                            },
                            lookup: {
                                height: 30,
                                color:'#DC143C',
                                align: 'left', 
                            },
                            hr: {
                                borderColor: '#777',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                        }  
                        }
                    },
                    symbolSize: 45,
                    showEffectOn: 'render',
                    itemStyle: {
                        normal: {
                            color: '#FFFF00',
                            opacity:1
                        }
                    },
                    data: spot
                },

                // 关系线
                    {
                        name:"清管所关系图",
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
                                width: 0.5, //尾迹线条宽度
                                opacity: 1, //尾迹线条透明度
                                curveness: .3 //尾迹线条曲直度
                            }
                        },
                        data: [{coords:[[117.020538,36.467116],[121.45158,37.483227]]},{coords:[[117.020538,36.467116],[118.811699,36.519962]],lineStyle:{type: 'dashed'}},
              {coords:[[117.020538,36.467116],[118.357015,35.107442]]}]
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
                    },

                ],
                
                legend: {
                type: "plain",
                show: true,
                orient: 'vertical',
                top: '10%',
                left: '5%',
                data: [
                                         {
                        name: "山东省清管所",
                        icon: "pin",
                        textStyle: {
                            color: "#F0F8FF",
                            fontSize: 20,
                        } 
                    },
                    {
                        name: "权益类公司白名单",
                        icon: "pin",
                        textStyle: {
                            color: "#F0F8FF",
                            fontSize: 20,
                        } 
                    },
                    {
                        name: "现货类公司白名单",
                        icon: "pin",
                        textStyle: {
                            color: "#F0F8FF",
                            fontSize: 20,
                        } 
                    },
                      {
                        name: "清管所关系图",
                        icon: "pin",
                        textStyle: {
                            color: "#F0F8FF",
                            fontSize: 20,
                        } 
                    },
                ]
            },
            })
        }
        myChart.setOption(optionXyMap01);
        myChart.on('click', (params)=>{
        console.log("新的点击事件"+params.name) 
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
    }, 'xml');
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