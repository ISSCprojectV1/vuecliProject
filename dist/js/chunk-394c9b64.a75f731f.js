(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-394c9b64"],{"2ca0":function(t,e,a){"use strict";var n=a("23e7"),r=a("06cf").f,o=a("50c4"),l=a("5a34"),i=a("1d80"),c=a("ab13"),s=a("c430"),u="".startsWith,d=Math.min,p=c("startsWith"),m=!s&&!p&&!!function(){var t=r(String.prototype,"startsWith");return t&&!t.writable}();n({target:"String",proto:!0,forced:!m&&!p},{startsWith:function(t){var e=String(i(this));l(t);var a=o(d(arguments.length>1?arguments[1]:void 0,e.length)),n=String(t);return u?u.call(e,n,a):e.slice(a,a+n.length)===n}})},"5e05":function(t,e,a){"use strict";a.d(e,"d",(function(){return r})),a.d(e,"p",(function(){return o})),a.d(e,"a",(function(){return l})),a.d(e,"b",(function(){return i})),a.d(e,"f",(function(){return c})),a.d(e,"i",(function(){return s})),a.d(e,"e",(function(){return u})),a.d(e,"g",(function(){return d})),a.d(e,"h",(function(){return p})),a.d(e,"c",(function(){return m})),a.d(e,"q",(function(){return h})),a.d(e,"j",(function(){return b})),a.d(e,"l",(function(){return g})),a.d(e,"k",(function(){return f})),a.d(e,"n",(function(){return y})),a.d(e,"m",(function(){return v})),a.d(e,"o",(function(){return S}));var n=a("b775");function r(t,e){return n["a"].get("/activetask?currentPage="+t+"&pageSize="+e)}function o(t,e,a){return Object(n["a"])({method:"GET",params:{id:t,currentPage:e,pageSize:a},url:"/passivetradeaction"})}function l(t,e){return Object(n["a"])({method:"GET",params:{currentPage:t,pageSize:e},url:"/spacetask"})}function i(t,e){return Object(n["a"])({method:"GET",params:{id:t,limit:e},url:"/louvainresult"})}function c(t){return Object(n["a"])({method:"GET",params:{id:t},url:"/activetradeaction"})}function s(t){return Object(n["a"])({method:"POST",data:t,url:"/addactivetask"})}function u(t,e){return Object(n["a"])({method:"GET",params:{id:t,limit:e},url:"/activetaskgraph"})}function d(t,e,a){return Object(n["a"])({method:"GET",params:{groupid:t,currentPage:e,pageSize:a},url:"/activetradedetailinfo"})}function p(t){return Object(n["a"])({method:"GET",params:{id:t},url:"/activetradegraph"})}function m(t){return Object(n["a"])({method:"GET",params:{company:t},url:"/activegraph"})}function h(){return Object(n["a"])({method:"GET",url:"/risk/alarm"})}function b(t,e){return Object(n["a"])({method:"GET",params:{category:t,platform:e},url:"/getAct/"})}function g(t,e,a){return Object(n["a"])({method:"GET",params:{taskid:t,currentPage:e,pageSize:a},url:"/getActiveGroup/"})}function f(t,e,a){return Object(n["a"])({method:"GET",params:{company:t,currentPage:e,pageSize:a},url:"/getActiveCompanyDetail/"})}function y(t,e,a){return Object(n["a"])({method:"GET",params:{taskid:t,currentPage:e,pageSize:a},url:"/getSpaceans"})}function v(t,e,a,r){return Object(n["a"])({method:"GET",params:{platform:t,category:e,currentPage:a,pageSize:r},url:"/getSpaceDetail"})}function S(t,e){return Object(n["a"])({method:"GET",url:"/uploadDetails/"+t+"/"+e})}},"94af":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),a("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"主动模态",name:"table"}},[a("tab-active-modal")],1),a("el-tab-pane",{attrs:{label:"被动模态",name:"passive"}},[a("el-table",{staticStyle:{width:"100%","margin-top":"1px"},attrs:{data:t.Data,border:""}},[a("el-table-column",{attrs:{prop:"group",label:"编号",width:"50"}}),a("el-table-column",{attrs:{prop:"buyername",label:"买方姓名","min-width":"130"}}),a("el-table-column",{attrs:{prop:"category",label:"商品"}}),a("el-table-column",{attrs:{prop:"amount",label:"数量"}}),a("el-table-column",{attrs:{prop:"price",label:"价格"}}),a("el-table-column",{attrs:{prop:"sellername",label:"卖方姓名","min-width":"130"}}),a("el-table-column",{attrs:{prop:"belong",label:"归属","min-width":"100"}}),a("el-table-column",{attrs:{prop:"tasksize",label:"空间粒度"}}),t.activeOrPassive()?a("el-table-column",{attrs:{prop:"original",label:"原生任务"}}):t._e()],1),a("el-pagination",{ref:"pagination",staticStyle:{"text-align":"center",padding:"0.5rem"},attrs:{background:"",layout:"prev, pager, next","page-size":5,total:t.total1},on:{"current-change":t.pageChange1}})],1),a("el-tab-pane",{attrs:{label:"空间粒度",name:"space-granularity"}},[a("tab-space-granularity")],1)],1)],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"title"},[a("div",{staticStyle:{display:"inline-block","margin-bottom":"20px","font-size":"40px"}},[t._v("主被动模态与空间粒度")])])}],o=(a("c740"),a("d81d"),a("b0c0"),a("d3b7"),a("25f0"),a("2ca0"),a("5e05")),l=a("313e"),i=a.n(l),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{width:"100%"}},[a("el-container",{staticStyle:{height:"700px",border:"10px solid #eee"}},[a("el-aside",{staticStyle:{border:"10px solid #eee"},attrs:{width:"800px"}},[a("h2",[t._v("交易平台监管粒度推荐表")]),a("el-table",{attrs:{data:t.dataTableSpaceGranularity,"highlight-current-row":""},on:{"row-click":t.onClickTableSpace}},[a("el-table-column",{attrs:{label:"平台名称",prop:"platform","min-width":"250"}}),a("el-table-column",{attrs:{label:"省份",prop:"province","min-width":"80"}}),a("el-table-column",{attrs:{label:"城市",prop:"city","min-width":"80"}}),a("el-table-column",{attrs:{label:"商品类型",prop:"category","min-width":"100"}}),a("el-table-column",{attrs:{label:"关联度（取值范围：0-1）",prop:"associate","min-width":"170"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.associate.toFixed(3))+" ")]}}])})],1),a("el-pagination",{ref:"pagination",staticStyle:{"text-align":"center","margin-top":"0.5rem"},attrs:{background:"",layout:"prev, pager, next",total:t.totalTableSpace},on:{"current-change":t.onPageChangeSpace}})],1),a("el-container",{staticStyle:{border:"10px solid #eee"}},[a("div",{staticStyle:{width:"100%",height:"100%"},attrs:{id:"tableSpaceDetail"}},[a("h2",[t._v("跨平台用户统计表")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.dataTableSpaceDetail}},[a("el-table-column",{attrs:{label:"交易主体",prop:"company","min-width":"270"}}),a("el-table-column",{attrs:{label:"交易数目",prop:"amount","min-width":"100"}}),a("el-table-column",{attrs:{label:"交易频次",prop:"trasum","min-width":"100"}})],1),a("el-pagination",{ref:"pagination",staticStyle:{"text-align":"center","margin-top":"0.5rem"},attrs:{background:"",layout:"prev, pager, next",total:t.totalTableDetail},on:{"current-change":t.onPageChangeDetail}})],1)])],1)],1)},s=[],u={name:"tabSpaceGranularity",data:function(){return{dataTableSpaceGranularity:[],totalTableSpace:0,platform:"",category:"",dataTableSpaceDetail:[],totalTableDetail:0}},created:function(){var t=this.$router.currentRoute.params.id;this.getResultSpaceGranularity(t,1,10)},mounted:function(){document.getElementById("tableSpaceDetail").style.display="none"},methods:{getResultSpaceGranularity:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10;Object(o["n"])(t,a,n).then((function(t){e.dataTableSpaceGranularity=t.data.data.reslist,e.totalTableSpace=t.data.data.total})).catch((function(t){console.log(t)}))},onPageChangeSpace:function(t){var e=this.$router.currentRoute.params.id;this.getResultSpaceGranularity(e,t,10)},onClickTableSpace:function(t){this.platform=t.platform,this.category=t.category,this.getResultSpaceDetail(t.platform,t.category,1,10)},getResultSpaceDetail:function(t,e){var a=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:10;Object(o["m"])(t,e,n,r).then((function(t){a.dataTableSpaceDetail=t.data.data.reslist,a.totalTableDetail=t.data.data.total,document.getElementById("tableSpaceDetail").style.display="block"})).catch((function(t){console.log(t)}))},onPageChangeDetail:function(t){this.getResultSpaceDetail(this.platform,this.category,t,10)}}},d=u,p=a("2877"),m=Object(p["a"])(d,c,s,!1,null,"12d6f856",null),h=m.exports,b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{width:"100%"}},[a("el-container",{staticStyle:{height:"700px",border:"10px solid #eee"}},[a("el-aside",{staticStyle:{border:"10px solid #eee"},attrs:{width:"750px"}},[a("h2",[t._v("主动监管名单")]),a("el-table",{attrs:{data:t.dataTableActive,"highlight-current-row":""},on:{"row-click":t.onClickTableActive}},[a("el-table-column",{attrs:{prop:"company",label:"交易主体","min-width":"250"}}),a("el-table-column",{attrs:{prop:"category",label:"商品类型","min-width":"70"}}),a("el-table-column",{attrs:{prop:"abnormalValue",label:"异常值","min-width":"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[Number.isNaN(e.row.abnormalValue)?a("span",[t._v("无")]):t.isAbnormal(e.row.abnormalValue)?a("span",{staticStyle:{color:"red"}},[t._v(" "+t._s(e.row.abnormalValue.toFixed(3))+" ")]):a("span",{staticStyle:{color:"green"}},[t._v(" "+t._s(e.row.abnormalValue.toFixed(3))+" ")])]}}])}),a("el-table-column",{attrs:{label:"监管建议","min-width":"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[Number.isNaN(e.row.abnormalValue)?a("span"):t.isAbnormal(e.row.abnormalValue)?a("span",[t._v("建议监管")]):a("span",[t._v("正常")])]}}])}),a("el-table-column",{attrs:{label:"信用评分","min-width":"70"}},[t._v("80")]),a("el-table-column",{attrs:{label:"详细信息",fixed:"right","min-width":"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.goToDataQuery(e.row.company)}}},[t._v("实体统一")])]}}])})],1),a("el-pagination",{ref:"pagination",staticStyle:{"text-align":"center","margin-top":"0.5rem"},attrs:{background:"",layout:"prev, pager, next","page-size":8,total:t.totalTableActive},on:{"current-change":t.onPageChangeActive}})],1),a("el-container",{staticStyle:{border:"10px solid #eee"}},[a("div",{staticStyle:{width:"100%",height:"100%"},attrs:{id:"tableCompanyDetail"}},[a("h2",[t._v("主体交易详情")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.dataTableDetail}},[a("el-table-column",{attrs:{prop:"seller",label:"主要交易卖方","min-width":"160"}}),a("el-table-column",{attrs:{prop:"buyer",label:"主要交易买方","min-width":"150"}}),a("el-table-column",{attrs:{prop:"amount",label:"交易数","min-width":"50"}})],1),a("el-pagination",{ref:"pagination",staticStyle:{"text-align":"center","margin-top":"0.5rem"},attrs:{background:"",layout:"prev, pager, next","page-size":10,total:t.totalTableDetail},on:{"current-change":t.onPageChangeDetail}})],1)])],1)],1)},g=[],f={name:"tabActiveModal",data:function(){return{dataTableActive:[],threshold:0,totalTableActive:0,companySelected:"",dataTableDetail:[],totalTableDetail:0}},created:function(){var t=this.$router.currentRoute.params.id;this.queryActiveGroup(t,1,8)},mounted:function(){document.getElementById("tableCompanyDetail").style.display="none"},methods:{queryActiveGroup:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:8;Object(o["l"])(t,a,n).then((function(t){e.dataTableActive=t.data.data.reslist;var a=1;e.dataTableActive.map((function(t){e.$set(t,"id",a++)})),e.threshold=t.data.data.threshold,e.totalTableActive=t.data.data.total})).catch((function(t){console.log(t)}))},onPageChangeActive:function(t){var e=this.$router.currentRoute.params.id;this.queryActiveGroup(e,t,8)},isAbnormal:function(t){return t>=this.threshold},goToDataQuery:function(t){this.$router.push({path:"/trade/dataFusion/dataquery",query:{data:t}})},onClickTableActive:function(t){document.getElementById("tableCompanyDetail").style.display="block",this.companySelected=t.company,this.queryCompanyDetail(t.company,1,10)},queryCompanyDetail:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10;Object(o["k"])(t,a,n).then((function(t){e.dataTableDetail=t.data.data.reslist,e.totalTableDetail=t.data.data.total})).catch((function(t){console.log(t)}))},onPageChangeDetail:function(t){this.queryCompanyDetail(this.companySelected,t,10)}}},y=f,v=Object(p["a"])(y,b,g,!1,null,"05c75a1d",null),S=v.exports,w={name:"activetask",components:{tabSpaceGranularity:h,tabActiveModal:S},created:function(){var t=this,e=this.$router.currentRoute.params.id;this.activeOrPassive()?Object(o["f"])(e).then((function(e){t.dataTableActive=e.data.data,t.handleData()})).catch((function(t){console.log(t),console.log("出现错误")})):this.passivetradeactionList(e,1,5)},data:function(){return{activeName:"table",total:0,form:{},total1:0,loading:!1,show:!1,Data:[],spanarray:[],tableData:[],tableData3:[],total3:0,dataTableActive:[],threshold:"",value_space_granularity:"",options:[{value:"省：",label:"省"},{value:"市：",label:"市"},{value:"平台：",label:"平台"}]}},mounted:function(){},methods:{passivetradeactionList:function(t,e,a){var n=this;Object(o["p"])(t,e,a).then((function(t){n.tableData=t.data.data.reslist;var e=t.data.data.reslist;n.total1=t.data.data.total;for(var a=0;a<e.length;a++)e[a].id=a+1;n.tableData=e,n.handleData()})).catch((function(t){console.log(t),console.log("出现错误")}))},handleData:function(){var t=0;this.Data=[],this.spanarray=[];for(var e=0;e<this.tableData.length;e++){this.spanarray.push({row:t,num:this.tableData[e].length});for(var a=0;a<this.tableData[e].length;a++)t++,this.tableData[e][a]["group"]=e+1,this.Data.push(this.tableData[e][a])}},Activetaskgraph:function(t,e){var a=this;Object(o["b"])(t,e).then((function(t){a.drawechart(t.data.data)})).catch((function(t){console.log(t)})),Object(o["e"])(t,e).then((function(t){a.drawechart2(t.data.data)})).catch((function(t){console.log(t)}))},pageChange1:function(t){var e=this.$router.currentRoute.params.id;this.currentPage=t,this.passivetradeactionList(e,t,5)},onSubmit:function(t){var e=this.$router.currentRoute.params.id;console.log(t);var a=this.value_space_granularity+this.form.limit;console.log(a),this.Activetaskgraph(e,a)},activeOrPassive:function(){return this.$router.currentRoute.path.startsWith("/trade/acpassTask/activetradeaction")},objectSpanMethod:function(t){t.row;var e=t.column,a=t.rowIndex;t.columnIndex;if("编号"===e.label||"交易模式"===e.label){var n=function(t){return t["row"]===a},r=this.spanarray.findIndex(n);return-1!==r?{rowspan:this.spanarray[r]["num"],colspan:1}:{rowspan:0,colspan:0}}},gotoDetail:function(t){document.getElementById("echart123").style.display="block",document.getElementById("table23").style.display="none",Object(o["c"])(t).then((function(t){var e=i.a.init(document.querySelector("#echart123")),a=t.data[0].map((function(t){return 0!==t.id?{id:t.id.toString(),name:t.name,company:t.company,category:1}:{id:t.id.toString(),name:t.name,company:t.company,category:0}})),n=t.data[1].map((function(t){return{source:t.source.toString(),target:t.target.toString(),lineStyle:{width:1.5*parseFloat(t.weight/500)+.5}}})),r=[{name:"异常节点"},{name:"相关节点"}],o={color:["#ef4f4f","#5470c6"],legend:{tooltip:{show:!0}},tooltip:{show:!0,formatter:function(t){return t.data.source?"":t.data.company}},series:[{type:"graph",layout:"force",label:{show:!0},roam:!0,data:a,links:n,zoom:6,categories:r,focusNodeAdjacency:!0,lineStyle:{opacity:.9}}]};e.setOption(o)}))},drawechart2:function(t){var e=i.a.init(document.querySelector("#echart12")),a={tooltip:{},color:["red","green","pink","blue"],legend:{show:!0,orient:"vertical",right:"1px",data:[{name:"原生用户",icon:"circle"},{name:"原生交易",icon:"circle"},{name:"非原生用户",icon:"circle"},{name:"非原生交易",icon:"circle"}]},series:[{type:"graph",layout:"force",legendHoverLink:!0,hoverAnimation:!0,coordinateSystem:null,xAxisIndex:0,yAxisIndex:0,force:{repulsion:70,edgeLength:[70,150],layoutAnimation:!0},roam:!0,nodeScaleRatio:.9,draggable:!0,focusNodeAdjacency:!0,edgeSymbol:["none","arrow"],symbolSize:20,edgeSymbolSize:10,itemStyle:{normal:{label:{show:!0}},emphasis:{}},lineStyle:{normal:{color:"#31354B",width:"1",type:"solid",curveness:0,opacity:1},emphasis:{}},label:{normal:{show:!0,position:"bottom",textStyle:{color:"#2D2F3B",fontStyle:"normal",fontWeight:"bolder",fontFamily:"sans-serif",fontSize:12}},emphasis:{}},edgeLabel:{normal:{show:!1},emphasis:{}},data:t[0],links:t[1],categories:[{name:"原生用户",icon:"circle"},{name:"原生交易",icon:"circle"},{name:"非原生用户",symbol:"circle"},{name:"非原生交易",symbol:"circle"}]}]};e.setOption(a)},drawechart:function(t){var e=t[2],a=t[1],n=i.a.init(document.querySelector("#echart1")),r={backgroundColor:i.a.graphic.RadialGradient(.3,.3,.8,[{offset:0,color:"#f7f8fa"},{offset:1,color:"#cdd0d5"}]),title:{top:"top",left:"center"},tooltip:{},legend:[{formatter:function(t){return i.a.format.truncateText(t,40,"14px Microsoft Yahei","…")},tooltip:{show:!0},orient:"vertical",right:"1px",selectedMode:"false",top:40}],toolbox:{show:!1,feature:{dataView:{show:!0,readOnly:!0},restore:{show:!0},saveAsImage:{show:!0}}},animationDuration:3e3,animationEasingUpdate:"quinticInOut",series:[{type:"graph",layout:"force",zoom:2.5,force:{repulsion:50},data:a,links:e,categories:[{name:"1"},{name:"2"},{name:"3"},{name:"4"},{name:"0"}],focusNodeAdjacency:!0,roam:!0,label:{normal:{show:!0,position:"top"}},lineStyle:{normal:{color:"source",curveness:0,type:"solid"}}}]};n.setOption(r)}}},D=w,T=Object(p["a"])(D,n,r,!1,null,"b19df3dc",null);e["default"]=T.exports},c740:function(t,e,a){"use strict";var n=a("23e7"),r=a("b727").findIndex,o=a("44d2"),l=a("ae40"),i="findIndex",c=!0,s=l(i);i in[]&&Array(1)[i]((function(){c=!1})),n({target:"Array",proto:!0,forced:c||!s},{findIndex:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),o(i)}}]);
//# sourceMappingURL=chunk-394c9b64.a75f731f.js.map