(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eda77b34"],{"0253":function(t,e,o){},"74f5":function(t,e,o){"use strict";var n=o("0253"),l=o.n(n);l.a},a32d:function(t,e,o){"use strict";o.d(e,"f",(function(){return l})),o.d(e,"g",(function(){return a})),o.d(e,"c",(function(){return i})),o.d(e,"e",(function(){return r})),o.d(e,"d",(function(){return s})),o.d(e,"h",(function(){return c})),o.d(e,"b",(function(){return f})),o.d(e,"a",(function(){return d}));var n=o("b775");function l(){return console.log("发送getPredictionData请求"),Object(n["a"])({url:"/HMM/price/search",method:"get",param:{t:new Date}})}function a(){return console.log("发送getPredictionData请求"),Object(n["a"])({url:"/HMM/nextDay/price",method:"get",param:{t:new Date}})}function i(){return Object(n["a"])({url:"/VaR/diff",method:"get"})}function r(){return Object(n["a"])({url:"/VaR/volatility",method:"get"})}function s(){return Object(n["a"])({url:"/VaR/predictVol",method:"get"})}function c(t){return Object(n["a"])({method:"POST",data:t,url:"/monitor/update"})}function f(t){return Object(n["a"])({method:"GET",url:"/monitor/status/"+t})}function d(t){return Object(n["a"])({method:"GET",url:"risk/name/"+t})}},b4e81:function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("h2",[t._v("大宗商品预警监控平台")]),o("el-container",{staticStyle:{height:"650px",border:"10px solid #eee"}},[o("el-aside",{staticStyle:{border:"10px solid #eee","background-color":"white"},attrs:{width:"370px"}},[o("div",{staticStyle:{"margin-top":"1rem",width:"350px",height:"500px"},attrs:{id:"chart-risk-frequency"}})]),o("el-container",{staticStyle:{border:"10px solid #eee"}},[o("el-header",[o("h4",[t._v("预警信息综合显示")])]),o("el-tabs",{staticStyle:{width:"100%",height:"100%"},attrs:{type:"border-card"},on:{"tab-click":t.handleTabClick},model:{value:t.tabSelected,callback:function(e){t.tabSelected=e},expression:"tabSelected"}},[o("el-tab-pane",{attrs:{label:"已发布"}},[o("el-table",{attrs:{data:t.formReleased}},[o("el-table-column",{attrs:{prop:"id",label:"序号","min-width":"30"}}),o("el-table-column",{attrs:{prop:"goods",label:"商品","min-width":"50"}}),o("el-table-column",{attrs:{prop:"info",label:"预警信息","min-width":"40"},scopedSlots:t._u([{key:"default",fn:function(e){return["高风险"===e.row.info?o("span",{staticStyle:{color:"red"}},[t._v(t._s(e.row.info))]):"低风险"===e.row.info?o("span",{staticStyle:{color:"green"}},[t._v(t._s(e.row.info))]):"中风险"===e.row.info?o("span",{staticStyle:{color:"orange"}},[t._v(t._s(e.row.info))]):t._e()]}}])}),o("el-table-column",{attrs:{prop:"time",label:"发布时间","min-width":"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.time.split(".")[0].replace("T"," ")))])]}}])}),o("el-table-column",{attrs:{label:"操作","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{staticClass:"el-option-in-table",attrs:{type:"text"},on:{click:function(o){return t.onClickModify(e.row)}}},[t._v("修改")]),o("el-popconfirm",{attrs:{"confirm-button-text":"确定","cancel-button-text":"取消",title:"是否确定送审？"},on:{onConfirm:function(o){return t.pendInfo(e.row)}}},[o("el-button",{staticClass:"el-option-in-table",attrs:{slot:"reference",type:"text"},slot:"reference"},[t._v("送审")])],1),o("el-button",{staticClass:"el-option-in-table",attrs:{type:"text"},on:{click:function(o){return t.goToRiskPage(e.row)}}},[t._v("监控")]),o("el-popconfirm",{attrs:{"confirm-button-text":"确定","cancel-button-text":"取消",title:"是否确定删除？"},on:{onConfirm:function(o){return t.deleteInfo(e.row)}}},[o("el-button",{staticClass:"el-option-in-table",attrs:{slot:"reference",type:"text"},slot:"reference"},[t._v("删除")])],1)]}}])})],1)],1),o("el-tab-pane",{attrs:{label:"待处理"}},[o("el-table",{attrs:{data:t.formReleased}},[o("el-table-column",{attrs:{prop:"id",label:"序号","min-width":"30"}}),o("el-table-column",{attrs:{prop:"goods",label:"商品","min-width":"50"}}),o("el-table-column",{attrs:{prop:"info",label:"预警信息","min-width":"40"},scopedSlots:t._u([{key:"default",fn:function(e){return["高风险"===e.row.info?o("span",{staticStyle:{color:"red"}},[t._v(t._s(e.row.info))]):"低风险"===e.row.info?o("span",{staticStyle:{color:"green"}},[t._v(t._s(e.row.info))]):"中风险"===e.row.info?o("span",{staticStyle:{color:"orange"}},[t._v(t._s(e.row.info))]):t._e()]}}])}),o("el-table-column",{attrs:{prop:"time",label:"发布时间","min-width":"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.time.split(".")[0].replace("T"," ")))])]}}])}),o("el-table-column",{attrs:{label:"操作","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{staticClass:"el-option-in-table",attrs:{type:"text"},on:{click:function(o){return t.onClickModify(e.row)}}},[t._v("修改")]),o("el-popconfirm",{attrs:{"confirm-button-text":"确定","cancel-button-text":"取消",title:"是否确定送审？"},on:{onConfirm:function(o){return t.pendInfo(e.row)}}},[o("el-button",{staticClass:"el-option-in-table",attrs:{slot:"reference",type:"text"},slot:"reference"},[t._v("送审")])],1),o("el-button",{staticClass:"el-option-in-table",attrs:{type:"text"},on:{click:function(o){return t.goToRiskPage(e.row)}}},[t._v("监控")]),o("el-popconfirm",{attrs:{"confirm-button-text":"确定","cancel-button-text":"取消",title:"是否确定删除？"},on:{onConfirm:function(o){return t.deleteInfo(e.row)}}},[o("el-button",{staticClass:"el-option-in-table",attrs:{slot:"reference",type:"text"},slot:"reference"},[t._v("删除")])],1)]}}])})],1)],1),o("el-tab-pane",{attrs:{label:"已修改"}},[o("el-table",{attrs:{data:t.formModified}},[o("el-table-column",{attrs:{prop:"id",label:"序号","min-width":"30"}}),o("el-table-column",{attrs:{prop:"goods",label:"商品","min-width":"50"}}),o("el-table-column",{attrs:{prop:"info",label:"预警信息","min-width":"40"},scopedSlots:t._u([{key:"default",fn:function(e){return["高风险"===e.row.info?o("span",{staticStyle:{color:"red"}},[t._v(t._s(e.row.info))]):"低风险"===e.row.info?o("span",{staticStyle:{color:"green"}},[t._v(t._s(e.row.info))]):"中风险"===e.row.info?o("span",{staticStyle:{color:"orange"}},[t._v(t._s(e.row.info))]):t._e()]}}])}),o("el-table-column",{attrs:{prop:"time",label:"发布时间","min-width":"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.time.split(".")[0].replace("T"," ")))])]}}])}),o("el-table-column",{attrs:{label:"操作","min-width":"80"}})],1)],1),o("el-tab-pane",{attrs:{label:"已送审"}},[o("el-table",{attrs:{data:t.formSent}},[o("el-table-column",{attrs:{prop:"id",label:"序号","min-width":"30"}}),o("el-table-column",{attrs:{prop:"goods",label:"商品","min-width":"50"}}),o("el-table-column",{attrs:{prop:"info",label:"预警信息","min-width":"40"},scopedSlots:t._u([{key:"default",fn:function(e){return["高风险"===e.row.info?o("span",{staticStyle:{color:"red"}},[t._v(t._s(e.row.info))]):"低风险"===e.row.info?o("span",{staticStyle:{color:"green"}},[t._v(t._s(e.row.info))]):"中风险"===e.row.info?o("span",{staticStyle:{color:"orange"}},[t._v(t._s(e.row.info))]):t._e()]}}])}),o("el-table-column",{attrs:{prop:"time",label:"发布时间","min-width":"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.time.split(".")[0].replace("T"," ")))])]}}])}),o("el-table-column",{attrs:{label:"操作","min-width":"80"}})],1)],1),o("el-tab-pane",{attrs:{label:"已删除"}},[o("el-table",{attrs:{data:t.formDeleted}},[o("el-table-column",{attrs:{prop:"id",label:"序号","min-width":"30"}}),o("el-table-column",{attrs:{prop:"goods",label:"商品","min-width":"50"}}),o("el-table-column",{attrs:{prop:"info",label:"预警信息","min-width":"40"},scopedSlots:t._u([{key:"default",fn:function(e){return["高风险"===e.row.info?o("span",{staticStyle:{color:"red"}},[t._v(t._s(e.row.info))]):"低风险"===e.row.info?o("span",{staticStyle:{color:"green"}},[t._v(t._s(e.row.info))]):"中风险"===e.row.info?o("span",{staticStyle:{color:"orange"}},[t._v(t._s(e.row.info))]):t._e()]}}])}),o("el-table-column",{attrs:{prop:"time",label:"发布时间","min-width":"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.time.split(".")[0].replace("T"," ")))])]}}])}),o("el-table-column",{attrs:{label:"操作","min-width":"80"}})],1)],1)],1)],1),o("el-dialog",{attrs:{title:"预警信息修改",visible:t.dialogModifyVisible,"append-to-body":!0,"lock-scroll":!1,width:"30%","close-on-click-modal":!1,center:""},on:{"update:visible":function(e){t.dialogModifyVisible=e}}},[o("el-form",{attrs:{model:t.formRowSelected}},[o("el-form-item",{attrs:{label:"序号","label-width":"80px"}},[t._v(" "+t._s(t.formRowSelected.id)+" ")]),o("el-form-item",{attrs:{label:"预警信息","label-width":"80px"}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:t.formRowSelected.info,callback:function(e){t.$set(t.formRowSelected,"info",e)},expression:"formRowSelected.info"}},[o("el-option",{key:"1",attrs:{label:"高风险",value:"高风险"}}),o("el-option",{key:"2",attrs:{label:"中风险",value:"中风险"}}),o("el-option",{key:"3",attrs:{label:"低风险",value:"低风险"}})],1)],1),o("el-form-item",{attrs:{label:"状态","label-width":"80px"}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:t.formRowSelected.status,callback:function(e){t.$set(t.formRowSelected,"status",e)},expression:"formRowSelected.status"}},[o("el-option",{key:"0",attrs:{label:"已发布",value:"0"}}),o("el-option",{key:"1",attrs:{label:"待处理",value:"1"}}),o("el-option",{key:"2",attrs:{label:"已修改",value:"2"}}),o("el-option",{key:"3",attrs:{label:"已送审",value:"3"}}),o("el-option",{key:"4",attrs:{label:"已删除",value:"4"}})],1)],1)],1),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:t.modifyInfo}},[t._v("确定")]),o("el-button",{on:{click:function(e){t.dialogModifyVisible=!1}}},[t._v("取消")])],1)],1)],1)],1)},l=[],a=(o("c975"),o("313e")),i=o.n(a),r=o("a32d"),s={name:"riskSurveillance",data:function(){return{tabSelected:"",infoSelected:"",formRowSelected:{},tabIndex:["已发布","待处理","已修改","已送审","已删除"],dialogModifyVisible:!1,formReleased:[],formPending:[],formModified:[],formSent:[],formDeleted:[]}},created:function(){this.getRiskInfo(0)},mounted:function(){this.drawChartRiskFrequency()},methods:{handleTabClick:function(t){this.getRiskInfo(this.tabIndex.indexOf(t.label))},getRiskInfo:function(t){var e=this;Object(r["b"])(t).then((function(o){switch(t){case 0:e.formReleased=o.data;break;case 1:e.formPending=o.data;break;case 2:e.formModified=o.data;break;case 3:e.formSent=o.data;break;case 4:e.formDeleted=o.data;break;default:break}}))},onClickModify:function(t){this.formRowSelected={id:t.id,info:t.info,status:0===t.status?"已发布":t.status},this.infoSelected=t.info,this.dialogModifyVisible=!0},modifyInfo:function(){var t=this;if("已发布"===this.formRowSelected.status){if(this.formRowSelected.status=0,this.infoSelected===this.formRowSelected.info)return void(this.dialogModifyVisible=!1);this.formRowSelected.status=2}Object(r["h"])(this.formRowSelected).then((function(){t.$message({message:"修改成功",type:"success"}),t.getRiskInfo(0)})).catch((function(){t.$message({message:"修改失败",type:"error"})})),this.dialogModifyVisible=!1},pendInfo:function(t){var e=this,o={id:t.id,info:t.info,status:3};Object(r["h"])(o).then((function(){e.$message({message:"送审成功",type:"success"}),e.getRiskInfo(0)})).catch((function(){e.$message({message:"送审失败",type:"error"})}))},deleteInfo:function(t){var e=this,o={id:t.id,info:t.info,status:4};Object(r["h"])(o).then((function(){e.$message({message:"删除成功",type:"success"}),e.getRiskInfo(0)})).catch((function(){e.$message({message:"删除失败",type:"error"})}))},goToFirst:function(){this.$router.push("/trade/dashboard")},goToRiskPage:function(t){this.$store.commit("setCommodityForMonitoring",t.goods),this.$router.push("/trade/riskPrediction/riskPage")},drawChartRiskFrequency:function(){var t=i.a.init(document.getElementById("chart-risk-frequency")),e={title:{text:"当月预警次数",left:"center"},tooltip:{show:!0},grid:{containLabel:!0},xAxis:{},yAxis:{type:"category",data:["小麦","大豆","玉米","棉花"]},visualMap:{orient:"horizontal",left:"center",min:0,max:15,text:["高风险","低风险"],dimension:0,inRange:{color:["#008000","#FFD700","#FF0000"]}},series:[{type:"bar",barWidth:"40px",data:[2,15,11,11]}]};t.setOption(e)}}},c=s,f=(o("74f5"),o("2877")),d=Object(f["a"])(c,n,l,!1,null,"2098b930",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-eda77b34.2288d71e.js.map