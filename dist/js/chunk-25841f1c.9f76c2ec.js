(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25841f1c"],{1148:function(t,e,a){"use strict";var n=a("a691"),o=a("1d80");t.exports="".repeat||function(t){var e=String(o(this)),a="",r=n(t);if(r<0||r==1/0)throw RangeError("Wrong number of repetitions");for(;r>0;(r>>>=1)&&(e+=e))1&r&&(a+=e);return a}},"12de":function(t,e,a){"use strict";a.d(e,"c",(function(){return o})),a.d(e,"b",(function(){return r})),a.d(e,"a",(function(){return c})),a.d(e,"d",(function(){return i})),a.d(e,"e",(function(){return l}));var n=a("b775");function o(t,e,a){return Object(n["a"])({method:"GET",params:{name:t,currentPage:e,pageSize:a},url:"/getRelevantEntity"})}function r(){return console.log("getRelevantArrayList"),Object(n["a"])({url:"/getRelevantArray",method:"get"})}function c(t){return Object(n["a"])({method:"GET",params:{name:t},url:"/companydataname"})}function i(t){return Object(n["a"])({method:"GET",params:{name:t},url:"/multibyname"})}function l(t){return Object(n["a"])({method:"GET",params:{name:t},url:"/multidatagraph"})}},"213e":function(t,e,a){"use strict";var n=a("348a"),o=a.n(n);o.a},"348a":function(t,e,a){},"408a":function(t,e,a){var n=a("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=n(t))throw TypeError("Incorrect invocation");return+t}},"9b2f":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"diceng"}},[a("div",[a("el-button",{on:{click:t.goback}},[t._v("返回")])],1),a("div",[a("el-button",{on:{click:t.CarculateData}},[t._v("启动数据融合")])],1),a("h2",[t._v("数据融合")]),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form",[a("el-form-item",{attrs:{label:"交易商名称检索"}},[a("el-input",{model:{value:t.queryform.company,callback:function(e){t.$set(t.queryform,"company",e)},expression:"queryform.company"}}),a("el-button",{on:{click:function(e){return t.lookupcompany(t.queryform.company)}}},[t._v("查找")])],1),a("el-form-item",{staticStyle:{"text-align":"left"},attrs:{label:"",name:"pingji"}}),a("el-form-item",{staticStyle:{"text-align":"left"},attrs:{label:"",name:"pingfen"}})],1),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("公司简介")])]),a("div",{staticClass:"text item"},[t._v(" "+t._s("公司名称: "+t.companyData.name)+" ")]),a("div",{staticClass:"text item"},[t._v(" "+t._s("社会统一信用代码: "+t.companyData.taxnumer)+" ")]),a("div",{staticClass:"text item"},[t._v(" "+t._s("法人: "+t.companyData.legaler)+" ")])])],1),a("el-col",{attrs:{span:16}},[a("div",{staticStyle:{width:"1000px",height:"500px"},attrs:{id:"echart1"}})])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"taxnumer",label:"社会统一信用代码","min-width":"180"}}),a("el-table-column",{attrs:{prop:"relevantBuyerName",label:"交易主体名称","min-width":"180"}}),a("el-table-column",{attrs:{label:"与主体相似度","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.relevance.toFixed(4)))])]}}])})],1),a("div",{staticClass:"block",staticStyle:{"margin-top":"15px"}},[a("el-pagination",{attrs:{align:"center","current-page":t.currentPage,"page-sizes":[1,5,10,20],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.yeshu},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},o=[],r=(a("b0c0"),a("b680"),a("313e")),c=a.n(r),i=a("12de"),l={name:"dataquery",created:function(){console.log(this.$route.query),console.log(this.$router.currentRoute)},mounted:function(){var t=document.getElementById("diceng");t.style.height=window.innerHeight+"px",console.log(this.$route.query.data);document.getElementById("announcement");this.xinyongpingren=!this.$route.query.data.creditScore||isNaN(this.$route.query.data.creditScore)?"暂无":this.$route.query.data.creditScore.toFixed(3),this.lookupcompany(this.$route.query.data.company),console.log("aaa"),console.log(this.tableData)},methods:{goback:function(){this.$router.go(-1)},CarculateData:function(){Object(i["b"])()},handleSizeChange:function(t){var e=this;console.log("每页 ".concat(t," 条")),this.currentPage=1,this.pageSize=t,console.log("当前页: ".concat(t)),Object(i["c"])(this.name,1,this.pageSize).then((function(t){console.log(t.data.data),e.tableData=t.data.data.reslist,e.currentPage=t.data.data.currentPage,e.total=t.data.data.total,e.yeshu=t.data.data.total,console.log(e.tableData),console.log(t)})).catch((function(t){console.log(t)})),this.currentPage=t},handleCurrentChange:function(t){var e=this;console.log("当前页: ".concat(t)),Object(i["c"])(this.name,t,this.pageSize).then((function(t){console.log(t.data.data),e.tableData=t.data.data.reslist,e.currentPage=t.data.data.currentPage,e.total=t.data.data.total,e.yeshu=t.data.data.total,console.log(e.tableData),console.log(t)})).catch((function(t){console.log(t)})),this.currentPage=t},drawechart:function(t){var e=c.a.init(document.querySelector("#echart1")),a={title:{text:"交易数据",left:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:50,data:t[0]},series:[{name:"访问来源",type:"pie",radius:"55%",center:["50%","60%"],data:t[1],emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};e.setOption(a)},lookupcompany:function(t){var e=this;Object(i["a"])(t).then((function(a){e.companyData=a.data.data,Object(i["d"])(e.companyData.name).then((function(a){console.log(document.getElementsByName("pingji")[0].innerText),console.log("阿拉善盟成大矿业有限责任公司");new Array;e.name=t,Object(i["c"])(t,1,5).then((function(t){console.log(t.data.data),e.tableData=t.data.data.reslist,e.currentPage=t.data.data.currentPage,e.total=t.data.data.total,e.yeshu=t.data.data.total,console.log(e.tableData),console.log(t)})).catch((function(t){console.log(t)})),console.log(e.tableData)})).catch((function(t){console.log(t)})),Object(i["e"])(e.companyData.name).then((function(t){e.drawechart(t.data.data)})).catch((function(t){console.log(t)}))})).catch((function(t){console.log(t)}))},lookuptaxnum:function(t){}},data:function(){return{xinyongpingren:0,queryform:{company:"",taxnum:""},companyData:{name:"",taxnumer:"",legaler:""},tableData:[],currentPage:1,total:0,pageSize:5,yeshu:0,name:""}}},u=l,s=(a("213e"),a("2877")),d=Object(s["a"])(u,n,o,!1,null,"7962ff39",null);e["default"]=d.exports},b680:function(t,e,a){"use strict";var n=a("23e7"),o=a("a691"),r=a("408a"),c=a("1148"),i=a("d039"),l=1..toFixed,u=Math.floor,s=function(t,e,a){return 0===e?a:e%2===1?s(t,e-1,a*t):s(t*t,e/2,a)},d=function(t){var e=0,a=t;while(a>=4096)e+=12,a/=4096;while(a>=2)e+=1,a/=2;return e},g=l&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!i((function(){l.call({})}));n({target:"Number",proto:!0,forced:g},{toFixed:function(t){var e,a,n,i,l=r(this),g=o(t),h=[0,0,0,0,0,0],m="",f="0",p=function(t,e){var a=-1,n=e;while(++a<6)n+=t*h[a],h[a]=n%1e7,n=u(n/1e7)},b=function(t){var e=6,a=0;while(--e>=0)a+=h[e],h[e]=u(a/t),a=a%t*1e7},y=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==h[t]){var a=String(h[t]);e=""===e?a:e+c.call("0",7-a.length)+a}return e};if(g<0||g>20)throw RangeError("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||l>=1e21)return String(l);if(l<0&&(m="-",l=-l),l>1e-21)if(e=d(l*s(2,69,1))-69,a=e<0?l*s(2,-e,1):l/s(2,e,1),a*=4503599627370496,e=52-e,e>0){p(0,a),n=g;while(n>=7)p(1e7,0),n-=7;p(s(10,n,1),0),n=e-1;while(n>=23)b(1<<23),n-=23;b(1<<n),p(1,1),b(2),f=y()}else p(0,a),p(1<<-e,0),f=y()+c.call("0",g);return g>0?(i=f.length,f=m+(i<=g?"0."+c.call("0",g-i)+f:f.slice(0,i-g)+"."+f.slice(i-g))):f=m+f,f}})}}]);
//# sourceMappingURL=chunk-25841f1c.9f76c2ec.js.map