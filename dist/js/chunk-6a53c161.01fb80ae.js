(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a53c161"],{"800e":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{id:"index","element-loading-text":"拼命加载中"}},[n("div",{staticClass:"box",attrs:{id:"main"}})])},o=[],i=(n("b0c0"),n("ac1f"),n("1276"),n("313e")),r=n.n(i),l=n("a32d"),c={name:"app",data:function(){return{itemList:[],loading:!0}},mounted:function(){var t=document.getElementById("index");t.style.height=window.innerHeight+"px",console.log(t.style.height);document.getElementById("announcement");console.log(t)},created:function(){this.getData()},methods:{getData:function(){var t=this;console.log("获取历史数据"),Object(l["d"])().then((function(e){console.log("History json :"+e.data),t.opinionData=e.data,console.log("获取历史数据成功")})).catch((function(){console.log("getHistoryData fail")})),console.log("获取预测数据"),Object(l["e"])().then((function(e){console.log("Prediction json :"+e.data),t.predictionData=e.data,console.log("predictionData 是"+t.predictionData),t.drawLine("main"),console.log("TEXT.VUE--调用axios完成")})).catch((function(){console.log("getPredictionData fail")}))},drawLine:function(t){this.charts=r.a.init(document.getElementById(t));var e="#ec0000",n="#8A0000",a="#00da3c",o="#008F28",i=[];i=this.opinionData;for(var l=[],c=[],s=0;s<this.predictionData.length;s++)l.push(this.predictionData[s].closeprice),c.push(this.predictionData[s].day.split("T")[0]);for(var d=[],u=[],p=0;p<i.length;p++){d.push(i[p].day.split("T")[0]);var h=[];h.push(i[p].openprice),h.push(i[p].closeprice),h.push(i[p].highprice),h.push(i[p].lowprice),u.push(h)}function g(t){for(var e=[],n=0,a=u.length;n<a;n++)if(n<t)e.push("-");else{for(var o=0,i=0;i<t;i++)o+=u[n-i][1];e.push(o/t)}return console.log("result ="+e),e}d.push.apply(d,c),console.log("cataData的内容是"+d),this.charts.setOption({title:{text:"风\n险\n预\n测",textStyle:{fontSize:30},left:0},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{data:["日K","PREDICTION","MA10","MA20"]},xAxis:{type:"category",data:d,scale:!0,boundaryGap:!1,axisLine:{onZero:!1},splitLine:{show:!1},splitNumber:20,min:"dataMin",max:"dataMax"},yAxis:{scale:!0,splitArea:{show:!0}},dataZoom:[{type:"inside",start:50,end:100},{show:!0,type:"slider",top:"90%",start:50,end:100}],series:[{name:"日K",type:"candlestick",data:u,itemStyle:{color:e,color0:a,borderColor:n,borderColor0:o},markPoint:{label:{normal:{formatter:function(t){return null!=t?Math.round(t.value):""}}},data:[{name:"XX标点",coord:["2013/5/31",2300],value:2300,itemStyle:{color:"rgb(41,60,85)"}},{name:"highest value",type:"max",valueDim:"highest"},{name:"lowest value",type:"min",valueDim:"lowest"},{name:"average value on close",type:"average",valueDim:"close"}],tooltip:{formatter:function(t){return t.name+"<br>"+(t.data.coord||"")}}}},{name:"PREDICTION",type:"line",data:g(5),smooth:!0,lineStyle:{opacity:.5}},{name:"MA10",type:"line",data:g(10),smooth:!0,lineStyle:{opacity:.5}},{name:"MA20",type:"line",data:g(20),smooth:!0,lineStyle:{opacity:.5}}]}),this.loading=!1}}},s=c,d=(n("a354"),n("2877")),u=Object(d["a"])(s,a,o,!1,null,null,null);e["default"]=u.exports},a32d:function(t,e,n){"use strict";n.d(e,"d",(function(){return o})),n.d(e,"e",(function(){return i})),n.d(e,"a",(function(){return r})),n.d(e,"c",(function(){return l})),n.d(e,"b",(function(){return c}));var a=n("b775");function o(){return console.log("发送getPredictionData请求"),Object(a["a"])({url:"/HMM/price/search",method:"get",param:{t:new Date}})}function i(){return console.log("发送getPredictionData请求"),Object(a["a"])({url:"/HMM/nextDay/price",method:"get",param:{t:new Date}})}function r(){return Object(a["a"])({url:"/VaR/diff",method:"get"})}function l(){return Object(a["a"])({url:"/VaR/volatility",method:"get"})}function c(){return Object(a["a"])({url:"/VaR/predictVol",method:"get"})}},a354:function(t,e,n){"use strict";var a=n("f768"),o=n.n(a);o.a},f768:function(t,e,n){}}]);
//# sourceMappingURL=chunk-6a53c161.01fb80ae.js.map