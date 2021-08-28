(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7cc29f6a"],{3679:function(t,e,r){"use strict";r.d(e,"a",(function(){return o})),r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return n}));var a=r("b775");function o(t,e,r,o){return Object(a["a"])({method:"POST",data:{start:t,end:e,threshold_f:r,threshold_fp:o},url:"/ExceptionRelationAnalysis"})}function i(t,e){return Object(a["a"])({method:"POST",data:{source_id:t,threshold_p:e},url:"ExceptionRelationPredict"})}function n(t){return Object(a["a"])({method:"POST",data:{source_id:t.source_id,generate_time:t.generate_time,product_id:t.product_id,type_id:t.type_id},url:"reportException"})}},8826:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"diceng"}},[r("h2",[t._v("异常事件分析")]),r("el-tabs",[r("el-tab-pane",{attrs:{label:"时序关系挖掘"}},[r("el-form",{attrs:{inline:!0}},[r("el-form-item",{attrs:{label:"起止日期："}},[r("el-date-picker",{attrs:{name:"el-date-picker-test",type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.dateTimeRange,callback:function(e){t.dateTimeRange=e},expression:"dateTimeRange"}})],1),r("el-form-item",{attrs:{label:"事件频率阈值："}},[r("el-input",{attrs:{placeholder:"请输入阈值"},model:{value:t.threshold_f,callback:function(e){t.threshold_f=e},expression:"threshold_f"}})],1),r("el-form-item",{attrs:{label:"事件关联概率阈值："}},[r("el-input",{attrs:{placeholder:"请输入阈值"},model:{value:t.threshold_fp,callback:function(e){t.threshold_fp=e},expression:"threshold_fp"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:t.onClickQuery}},[t._v("查询")]),r("el-button",{attrs:{type:"primary"},on:{click:t.goback}},[t._v("返回")]),r("el-link",{attrs:{type:"primary"},on:{click:t.gobackTeam}},[t._v("返回联盟形成")])],1)],1),r("div",{staticStyle:{width:"1000px",height:"600px","margin-left":"auto","margin-right":"auto"},attrs:{id:"chart-exception-relation"}})],1),r("el-tab-pane",{attrs:{label:"事件预测"}},[r("el-form",{attrs:{inline:!0}},[r("el-form-item",{attrs:{label:"源事件编号："}},[r("el-input",{attrs:{placeholder:"请输入源事件编号"},model:{value:t.formPredict.sourceId,callback:function(e){t.$set(t.formPredict,"sourceId",e)},expression:"formPredict.sourceId"}})],1),r("el-form-item",{attrs:{label:"事件概率阈值："}},[r("el-input",{attrs:{placeholder:"请输入阈值"},model:{value:t.formPredict.thresholdP,callback:function(e){t.$set(t.formPredict,"thresholdP",e)},expression:"formPredict.thresholdP"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:t.onClickPredict}},[t._v("预测")])],1)],1),r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.resultPredict,stripe:""}},[r("el-table-column",{attrs:{prop:"target",label:"目标事件",sortable:""}}),r("el-table-column",{attrs:{prop:"delay_time",label:"发生时延",sortable:""}}),r("el-table-column",{attrs:{prop:"probability",label:"发生概率",sortable:""}}),r("el-table-column",{attrs:{prop:"path",label:"关联路径"}})],1)],1)],1)],1)},o=[],i=(r("4de4"),r("b0c0"),r("d3b7"),r("25f0"),r("6b75"));function n(t){if(Array.isArray(t))return Object(i["a"])(t)}r("a4d3"),r("e01a"),r("d28b"),r("a630"),r("e260"),r("3ca3"),r("ddb0");function l(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var s=r("06c5");function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t){return n(t)||l(t)||Object(s["a"])(t)||u()}var d=r("3679"),h=r("313e"),m=r.n(h),p={name:"exceptionAnalysis",data:function(){return{dateTimeRange:{},threshold_f:"",threshold_fp:"",formPredict:{sourceId:"",thresholdP:""},resultQuery:{links:[],names:[],weights:[]},resultPredict:[]}},methods:{goback:function(){this.$router.go(-1)},onClickQuery:function(){var t=this;Object(d["a"])(this.dateTimeRangeFormatted[0],this.dateTimeRangeFormatted[1],this.threshold_f,this.threshold_fp).then((function(e){t.resultQuery.links=e.data.links,t.resultQuery.names=e.data.names,t.resultQuery.weights=e.data.weights,console.log(t.resultQuery.links),console.log(t.resultQuery.names),console.log(t.resultQuery.weights),t.drawChartExceptionRelation()})).catch((function(t){console.log(t)}))},drawChartExceptionRelation:function(){var t=m.a.init(document.getElementById("chart-exception-relation")),e=[],r=[{name:"最低频率"},{name:"偏低频率"},{name:"较低频率"},{name:"较高频率"},{name:"偏高频率"},{name:"最高频率"}],a=Math.max.apply(Math,c(this.resultQuery.weights)),o=2*Math.PI/Math.ceil(this.resultQuery.names.length/2),i=2*Math.PI/Math.floor(this.resultQuery.names.length/2);for(var n in this.resultQuery.names)if(Object.prototype.hasOwnProperty.call(this.resultQuery.names,n)){var l=this.getRandomInt(7);n%2===0?e.push({name:this.resultQuery.names[n].toString(),x:500+300*Math.cos(o*(n/2))+30*l*Math.pow(-1,l),y:300+300*Math.sin(o*(n/2))+30*l*Math.pow(-1,l),symbolSize:30+3*this.resultQuery.weights[n],category:Math.round(this.resultQuery.weights[n]/a*5)}):e.push({name:this.resultQuery.names[n].toString(),x:500+150*Math.cos(i*(n-1)/2+Math.PI/6)+15*l*Math.pow(-1,l),y:300+150*Math.sin(i*(n-1)/2+Math.PI/6)+15*l*Math.pow(-1,l),symbolSize:30+3*this.resultQuery.weights[n],category:Math.round(this.resultQuery.weights[n]/a*5)})}var s=[];for(var u in this.resultQuery.links)Object.prototype.hasOwnProperty.call(this.resultQuery.links,u)&&s.push({probability:this.resultQuery.links[u].probability.toString(),source:this.resultQuery.links[u].source.toString(),target:this.resultQuery.links[u].target.toString(),delay_time:this.resultQuery.links[u].delay_time.toString(),frequence:this.resultQuery.links[u].frequence.toString(),lineStyle:{width:3*parseFloat(this.resultQuery.links[u].probability)+.5}});var d={color:["#95b0c4","#8ed1eb","#b0dfa5","#ffd135","#f7931e","#f05a28"],legend:{tooltip:{show:!0}},tooltip:{show:!0,formatter:function(t){return t.data.source?"source: "+t.data.source+", target: "+t.data.target+", prob: "+t.data.probability+", delay: "+t.data.delay_time+", frequence: "+t.data.frequence:"event "+t.data.name}},animationDurationUpdate:1500,animationEasingUpdate:"quinticInOut",series:[{type:"graph",layout:"none",symbolSize:30,roam:!0,focusNodeAdjacency:!0,label:{show:!0},edgeSymbol:["none","arrow"],edgeSymbolSize:[0,8],edgeLabel:{show:!0,formatter:function(t){return t.data.probability},fontSize:12,color:"#000000"},data:e,links:s,categories:r,lineStyle:{opacity:.9,curveness:.2}}]};t.setOption(d)},onClickPredict:function(){var t=this;Object(d["b"])(this.formPredict.sourceId,this.formPredict.thresholdP).then((function(e){t.resultPredict=e.data,t.resultPredict=t.resultPredict.filter((function(e){return e.path!=t.formPredict.sourceId})),console.log(t.resultPredict)})).catch((function(t){console.log(t)}))},addZero:function(t){return t<10?"0"+t:t},getRandomInt:function(t){return Math.floor(Math.random()*Math.floor(t))},gobackTeam:function(){this.$router.push("/trade/Multimodal-multigranularity/stepBar")}},computed:{dateTimeRangeFormatted:function(){if(!this.dateTimeRange)return"";for(var t=[],e=0;e<2;e++){var r=this.dateTimeRange[e].getUTCFullYear(),a=this.addZero(this.dateTimeRange[e].getUTCMonth()+1),o=this.addZero(this.dateTimeRange[e].getUTCDate()),i=this.addZero(this.dateTimeRange[e].getUTCHours()),n=this.addZero(this.dateTimeRange[e].getUTCMinutes()),l=this.addZero(this.dateTimeRange[e].getUTCSeconds());t.push(r+"-"+a+"-"+o+"T"+i+":"+n+":"+l)}return t}}},f=p,b=r("2877"),y=Object(b["a"])(f,a,o,!1,null,"b8777aae",null);e["default"]=y.exports}}]);
//# sourceMappingURL=chunk-7cc29f6a.a57ed4c0.js.map