(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75a0af54"],{"12de":function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return l}));var a=n("b775");function r(e){return Object(a["a"])({method:"GET",params:{name:e},url:"/companydataname"})}function o(e){return Object(a["a"])({method:"GET",params:{name:e},url:"/multibyname"})}function l(e){return Object(a["a"])({method:"GET",params:{name:e},url:"/multidatagraph"})}},"5fe8":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"diceng"}},[n("h2",[e._v("关联交易主体发现")]),n("el-row",[n("el-col",{attrs:{span:8}},[n("el-form",[n("el-form-item",{attrs:{label:"异常交易节点检索"}},[n("el-input",{model:{value:e.queryform.company,callback:function(t){e.$set(e.queryform,"company",t)},expression:"queryform.company"}}),n("el-button",{on:{click:function(t){return e.lookupcompany(e.queryform.company)}}},[e._v("查找")])],1)],1)],1)],1),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[n("el-table-column",{attrs:{prop:"id",label:"编号","min-width":"180"}}),n("el-table-column",{attrs:{prop:"name",label:"交易主体名称","min-width":"180"}}),n("el-table-column",{attrs:{prop:"number",label:"与主体相似度","min-width":"180"}})],1),n("div",{staticClass:"block",staticStyle:{"margin-top":"15px"}},[n("el-pagination",{attrs:{align:"center","current-page":e.currentPage,"page-sizes":[1,5,10,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.yeshu},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},r=[],o=(n("313e"),n("12de"),{name:"datacluster",mounted:function(){var e=document.getElementById("diceng");e.style.height=window.innerHeight+"px",console.log(e.style.height);document.getElementById("announcement");console.log(e)},methods:{handleSizeChange:function(e){console.log("每页 ".concat(e," 条")),this.currentPage=1,this.pageSize=e},handleCurrentChange:function(e){console.log("当前页: ".concat(e)),this.currentPage=e},lookupcompany:function(e){if("内蒙古魔筷网络科技有限公司"==e){console.log("内蒙古魔筷网络科技有限公司");var t=this,n=new Array;Object.assign(n,t.tableData);var a=[{id:21,name:"乌兰浩特市尚能再生能源有限公司",number:"0.91"},{id:22,name:"内蒙古通源起航商贸有限公司",number:"0.83"},{id:23,name:"内蒙古鑫傲通锐运输有限公司",number:"0.65"},{id:24,name:"内蒙古申益贸易有限责任公司",number:"0.33"},{id:25,name:"内蒙古同泰信息科技有限公司",number:"0.12"}];n=a,t.tableData=n,console.log(this.tableData)}else this.tableData=[]},lookuptaxnum:function(e){}},data:function(){return{queryform:{company:"",taxnum:""},companyData:{name:"",taxnumer:"",legaler:""},tableData:[],currentPage:1,total:0,pageSize:3,yeshu:0}}}),l=o,u=(n("a754"),n("2877")),c=Object(u["a"])(l,a,r,!1,null,"776016ca",null);t["default"]=c.exports},a103:function(e,t,n){},a754:function(e,t,n){"use strict";var a=n("a103"),r=n.n(a);r.a}}]);
//# sourceMappingURL=chunk-75a0af54.468dcc2a.js.map