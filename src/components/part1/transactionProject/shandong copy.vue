<template>
<div class="Map" >
<div id="map" :style="{width: '100%', height: '800px'}"></div>
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
var uploadedDataURL = "/map/province/shandong.json";
var jiangsu = "/map/province/jiangsu.json"
//如果想要修改，请点击上方克隆，然后在自己的版本上修改，不要在lz的版本上改！！
 
var geoCoordMap = {
    "青岛市":[120.355173,36.382982],
    "淄博市":[118.047648,36.814939],
    "枣庄市":[117.557964,34.856424],
    "东营市":[118.66471,37.434564],
    "潍坊市":[119.107078,36.70925],
    "烟台市":[120.091382,37.239297],
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
    "济南市":[117.000923,36.675807],
    "山东交易市场清算所有限公司":[117.020538,36.467116],
    "齐鲁股权交易中心有限公司": [117.99689,36.823597],
    "山东产权交易中心有限公司": [117.150969,36.864913],
    "山东文化产权交易所有限公司": [117.043677,36.665935],
    "山东省能源环境交易中心有限公司": [117.147698,36.370023],
    "山东金融资产交易中心有限公司": [117.153411,36.665771],
    "济南产权交易中心": [117.079144,36.688675],
    "青岛大数据交易中心有限公司": [120.103168,35.903374],
    "烟台海洋产权交易中心有限公司": [121.080256,37.05063],
    "烟台联合产权交易中心有限公司":[121.45158,37.483227],
    "山东潍坊产权交易中心有限公司": [119.17158,36.628416],
    "潍坊文化产权交易中心有限公司": [118.811699,36.519962],
    "山东蓝色经济区产权交易中心有限公司": [119.537189,35.431214],
    "临沂信用资产交易中心有限公司": [118.357015,35.107442],
    "青岛蓝海股权交易中心有限公司": [120.490935,36.152605],
     "山东齐鲁农产品交易中心有限公司": [118.169569,36.209678],
     "山东广丰橡胶轮胎交易中心有限公司": [118.424372,37.065187],
    "东营新华福岛能源交易中心有限公司": [118.942533,37.906054],
    "东亚畜牧现货产品交易所有限公司": [119.170355,36.909544],
     "威海国际海洋商品交易中心有限公司": [122.413977,37.129491],
     "日照大宗商品交易中心有限公司": [119.357354,35.189053],
    "临沂国际商品交易中心有限公司": [118.295715,35.414345],
     "黄河商品交易市场股份有限公司": [116.145027,37.187694],
     "山东滨海化工商务有限公司": [119.146863,36.216874],
     "日照国际铁矿石交易中心有限公司": [119.357035,35.723136],
     "山东海倍电子商务股份有限公司": [116.456601,35.505452],
};

var ManaData = [
    [{name:'山东交易市场清算所有限公司'}, {name:'山东蓝色经济区产权交易中心有限公司',value:95}],
    [{name:'山东交易市场清算所有限公司'}, {name:'山东省能源环境交易中心有限公司',value:15}],
    [{name:'山东交易市场清算所有限公司'}, {name:'山东文化产权交易所有限公司',value:40}],
    [{name:'山东交易市场清算所有限公司'}, {name:'日照国际铁矿石交易中心有限公司',value:5}],
];

// 权益类公司关系图
var equityData = [
   [{name:'齐鲁股权交易中心有限公司'}, {name:'山东蓝色经济区产权交易中心有限公司',value:95}],
    [{name:'齐鲁股权交易中心有限公司'}, {name:'山东金融资产交易中心有限公司',value:15}],
    [{name:'山东金融资产交易中心有限公司'}, {name:'山东潍坊产权交易中心有限公司',value:40}],
    [{name:'临沂信用资产交易中心有限公司'}, {name:'青岛蓝海股权交易中心有限公司',value:5}],
];
//现货类公司关系图
var spotData = [
   [{name:'威海国际海洋商品交易中心有限公司'}, {name:'黄河商品交易市场股份有限公司',value:95}],
    [{name:'山东广丰橡胶轮胎交易中心有限公司'}, {name:'山东滨海化工商务有限公司',value:15}],
    [{name:'潍坊文化产权交易中心有限公司'}, {name:'临沂国际商品交易中心有限公司',value:40}],
    [{name:'潍坊文化产权交易中心有限公司'}, {name:'山东广丰橡胶轮胎交易中心有限公司',value:5}],
];
 
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
// 饼图数据
var pieData = [{
    name: '权益类公司',
    value: 20
}, {
    name: '现货类公司',
    value: 17
}, {
    name: '拟保留公司',
    value: 5
}];
$(function () {

    // 导入中国地图
    $.getJSON(uploadedDataURL, function (geoJson) {
 
        echarts.registerMap('china', geoJson);
        var convertData = function (data) {
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
    return res;
};

var color = ['#a6c84c', '#ffa022', '#46bee9'];
var series = [];

// 标明地图上的点
series.push(
                  // 山东省清管所位置标记
                    {
                    name: '山东省清管所位置',
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
                            color: '#98FB98',
                            opacity:1
                        }
                    },
                    data: Management
                },
                // 权益类公司白名单位置标记
                    {
                    name: '权益类公司(白名单)位置',
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

                // 权益类公司白名单位置标记
                    {
                    name: '权益类公司(白名单)位置',
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
                    name: '现货类公司(白名单)位置',
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
                            color: '#F0E68C',
                            opacity:1
                        }
                    },
                    data: spot
                },

                );
[['山东省清管所关系图', ManaData],['山东省权益类公司关系图', equityData],['山东省现货类公司关系图', spotData]].forEach(function (item, i) {
    series.push({
        name: item[0],
        type: 'lines',
        zlevel: 1,
        effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
        },
        lineStyle: {
            normal: {
                color: color[i],
                width: 0,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    },
    {
        name: item[0],
        type: 'lines',
        zlevel: 2,
        symbol: ['none', 'arrow'],
        symbolSize: 3,
        effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: 'arrow',
            symbolSize: 15
        },
        lineStyle: {
            color: color[i],
            width: 1,
            opacity: 0.6,
            curveness: 0.2
        },
        data: convertData(item[1])
    },
    {
        name: item[0],
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            show: true,
            position: 'right',
            formatter: '{b}'
        },
        symbolSize: 15,
        itemStyle: {
            color: color[i]
        },
        data: item[1].map(function (dataItem) {
            return {
                name: dataItem[0].name,
                value: geoCoordMap[dataItem[0].name]
            };
        })
    },
    {
        name: item[0],
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            show: true,
            position: 'right',
            formatter: '{b}'
        },
        symbolSize: 15,
        itemStyle: {
            color: color[i]
        },
        data: item[1].map(function (dataItem) {
            return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name]
            };
        })
    }
    
    );
}
);
// 扇形图
series.push( 
 {
        type: 'pie',
        radius: '30%',
        center: ['50%', '50%'],
        data: pieData,
        color:['#FFF0F5', '#D8BFD8', '#6495ED'],
        animation: false,
        label: {
            position: 'outer',
            alignTo: 'none',
            bleedMargin: 5
        },
        left: '66.6667%',
        right: 0,
        top: 0,
        bottom: 0
    }
);

var option = {
    backgroundColor: '#404a59',
    title : {
        text: '山东省大宗物流交易平台网络图',
        subtext: '可选择想要查看的标签',
        left: 'center',
        textStyle: {
            color: '#fff',
            fontSize:30
        },
        subtextStyle:{
          fontSize:20
        }
    },
    tooltip: {
        trigger: 'item'
    },
    toolbox: {
        show: true,
        itemSize:30,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {},
            myreturnButten:{
              show:true,
              title: '点击此初返回上一页',
              icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                onclick: function (){
                    window.location.href="http://localhost:8088/map"
                }
            }
        },
        iconStyle:{
           borderColor:"	#F8F8FF"
        }
    },
    legend: [{
        orient: 'vertical',
        top: '15%',
        left: '80%',
        data: ['山东省清管所关系图', '山东省权益类公司关系图', '山东省现货类公司关系图'],
        textStyle: {
            color: '#fff'
        },
        selectedMode: 'multiple'
    },
    {
        orient: 'vertical',
        top: '15%',
        left: '5%',
        data: ['山东省清管所位置','权益类公司(白名单)位置','现货类公司(白名单)位置'],
        textStyle: {
            color: '#fff'
        },
        selectedMode: 'multiple'
    },
    ],
    geo: {
        map: 'china',
        label: {
            show: true,
            color:"#DCDCDC"
        },
        roam: true,
        zoom: 4,
        center: [119.83531246, 35.8267395887],
        itemStyle: {
            areaColor: '#323c48',
            borderColor: '#404a59'
        },

        emphasis: {
            label: {
                show: true
            },
            itemStyle: {
                areaColor: '#2a333d'
            }
        }
    },
    series: series
};
        myChart.setOption(option);
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