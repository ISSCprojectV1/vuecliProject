(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3cf4394c"],{"8c4d":function(e,a,t){"use strict";var n=t("eabc"),i=t.n(n);i.a},a2d2:function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement;e._self._c;return e._m(0)},i=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticStyle:{width:"100%",height:"800px"}},[t("div",{staticStyle:{display:"inline-block","margin-bottom":"30px","font-size":"40px"}},[e._v("可用资源展示")]),t("div",{attrs:{id:"app"}},[t("div",{staticStyle:{width:"100%",height:"800px"},attrs:{id:"echartContainer"}})])])}],r={name:"resourceshow",mounted:function(){this.drawLine()},methods:{drawLine:function(){var e=this.$echarts.init(document.getElementById("echartContainer"));e.setOption({title:{left:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left",data:["模态资源","时间资源","空间资源","硬件资源"]},series:[{name:"模态资源",type:"pie",radius:"25%",center:["30%","30%"],data:[{value:120,name:"人工资源"},{value:180,name:"机器资源"},{value:200,name:"在线资源"},{value:100,name:"离线资源"},{value:150,name:"主动资源"},{value:150,name:"被动资源"}]},{name:"时间资源",type:"pie",radius:"25%",center:["70%","30%"],data:[{value:335,name:"3分钟粒度"},{value:310,name:"30分钟粒度"},{value:234,name:"3小时粒度"},{value:135,name:"1天粒度"},{value:158,name:"3天粒度"}]},{name:"空间资源",type:"pie",radius:"25%",center:["30%","70%"],data:[{value:335,name:"县级可控"},{value:310,name:"市级可控"},{value:234,name:"省级可控"}]},{name:"硬件资源",type:"pie",radius:"25%",center:["70%","70%"],data:[{value:335,name:"计算资源"},{value:310,name:"存储资源"},{value:234,name:"其他资源"}]}]})}}},l=r,u=(t("8c4d"),t("2877")),c=Object(u["a"])(l,n,i,!1,null,"02529b36",null);a["default"]=c.exports},eabc:function(e,a,t){}}]);
//# sourceMappingURL=chunk-3cf4394c.b49ca359.js.map