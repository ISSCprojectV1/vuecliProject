(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a3cc5b56"],{"0083":function(t,e,n){"use strict";var l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",[n("el-col",{attrs:{xs:14,sm:15,md:16,lg:18,xl:18}},[n("el-menu",{staticClass:"el-menu",attrs:{router:!0,mode:"horizontal","background-color":"#00659B","text-color":"#FFFFFF","active-text-color":"#ffd04b"},on:{select:t.handleSelect}},[n("el-menu-item",{staticStyle:{"font-size":"18px",padding:"0"},attrs:{index:"/trade/Dashboard"}},[n("img",{staticClass:"userprofile",staticStyle:{width:"45px",height:"45px"},attrs:{src:t.logoimg}}),t._v(" 大宗商品交易市场监管服务模式与资源调配系统 ")])],1)],1),n("el-col",{attrs:{xs:10,sm:9,md:8,lg:6,xl:6}},[n("el-menu",{staticClass:"el-menu",attrs:{router:!0,mode:"horizontal","background-color":"#00659B","text-color":"#FFFFFF","active-text-color":"#ffd04b"}},[n("el-menu-item",{attrs:{index:"/trade/Dashboard"}},[t._v("工作台")]),n("el-menu-item",{attrs:{index:"/console/index"}},[t._v("个人中心")]),n("el-submenu",{attrs:{index:"/console/index"}},[n("template",{slot:"title"},[n("img",{staticClass:"img userprofile",attrs:{src:t.userimg}})]),n("el-menu-item",{attrs:{index:"/console/index"}},[t._v(" 个人中心 ")]),n("el-menu-item",{on:{click:t.logOut}},[t._v(" 登出 ")])],2)],1)],1)],1)],1)},i=[],a=n("3d46"),s=n.n(a),o=n("6131"),c=n.n(o),r=n("5f87"),u={name:"Header",data:function(){return{logoimg:s.a,userimg:c.a}},methods:{handleSelect:function(t,e){console.log(t,e)},logOut:function(){Object(r["d"])(),this.$router.push("/login")}}},d=u,m=(n("bacf"),n("2877")),f=Object(m["a"])(d,l,i,!1,null,"4198bcaa",null);e["a"]=f.exports},"0895":function(t,e,n){},"3d46":function(t,e,n){t.exports=n.p+"img/seu.f3c9d3ef.png"},"3d55":function(t,e,n){"use strict";var l=n("8acd"),i=n.n(l);i.a},"3e9d":function(t,e,n){"use strict";var l=n("ffc4"),i=n.n(l);i.a},6131:function(t,e,n){t.exports=n.p+"img/userprofile.e3875e91.jpg"},"8acd":function(t,e,n){},bacf:function(t,e,n){"use strict";var l=n("0895"),i=n.n(l);i.a},fb6c:function(t,e,n){"use strict";n.r(e);var l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-container",[n("el-header",[n("Header")],1),n("el-container",[n("el-aside",{ref:"changdu",staticStyle:{width:"250px",height:"100%"}},[n("leftNav")],1),n("el-main",[n("router-view")],1)],1)],1)},i=[],a=n("0083"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{"background-color":"#00659B"},attrs:{id:"diceng"}},[n("el-row",[n("el-col",[n("el-menu",{staticClass:"el-menu-vertical-demo",staticStyle:{height:"100%"},attrs:{"unique-opened":!0,"default-active":t.defaultActive,router:"","background-color":"#00659B","text-color":"#FFFFFF","active-text-color":"#ffd04b"},on:{open:t.handleOpen,close:t.handleClose}},[n("el-menu-item",{staticStyle:{"text-align":"left","font-size":"20px"},attrs:{index:"/trade/Dashboard"}},[n("i",{staticClass:"el-icon-house"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("首页")])]),n("el-menu-item",{staticStyle:{"text-align":"left","font-size":"20px"},attrs:{index:"/trade/riskPrediction/riskSurveillance/"}},[n("i",{staticClass:"el-icon-menu"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("价格波动风险预警")])]),n("el-submenu",{staticStyle:{"text-align":"left"},attrs:{index:"/trade/auction"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),n("span",{staticStyle:{"font-size":"20px"}},[t._v("数据共享")])]),n("el-menu-item",{staticStyle:{"text-align":"left","padding-left":"80px","font-size":"18px"},attrs:{index:"/trade/auction"}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v("拍卖中心")])]),n("el-menu-item",{staticStyle:{"text-align":"left","padding-left":"80px","font-size":"18px"},attrs:{index:"/trade/uploadResource"}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v("上传数据")])])],2),t._l(this.accessRoutes,(function(e){return n("el-submenu",{key:e.title,staticStyle:{"text-align":"left"},attrs:{index:e.title}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),n("span",{staticStyle:{"font-size":"20px"}},[t._v(t._s(e.title))])]),t._l(e.routes,(function(e){return n("el-menu-item",{key:e.path,staticStyle:{"text-align":"left","padding-left":"80px","font-size":"18px"},attrs:{index:e.path}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.meta.title))])])}))],2)})),n("el-menu-item",{staticStyle:{"text-align":"left","font-size":"20px"},attrs:{index:"/trade/riskPrediction/riskSurveillance/"}},[n("i",{staticClass:"el-icon-menu"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("风险预警监控")])]),n("el-menu-item",{staticStyle:{"text-align":"left","font-size":"20px"},attrs:{index:"/trade/auction"}},[n("i",{staticClass:"el-icon-menu"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("附加功能：数据共享")])])],2)],1)],1)],1)},o=[],c=(n("d3b7"),{data:function(){return{defaultActive:"",accessRoutes:[{title:"模态与粒度建议",routes:[{path:"/trade/Multimodal-multigranularity/stepBar",component:function(){return n.e("chunk-2d22bdb9").then(n.bind(null,"f180"))},meta:{title:"模态与粒度步骤"}},{path:"/trade/Multimodal-multigranularity/goodsgranularity",component:function(){return n.e("chunk-abeeb5d0").then(n.bind(null,"d61c"))},meta:{title:"时间与商品粒度"}}]}]}},mounted:function(){this.defaultActive=this.$router.currentRoute.path;var t=document.getElementById("diceng");console.log(window.innerHeight),console.log(document.body.scrollHeight),t.style.height=(window.innerHeight>document.body.scrollHeight?window.innerHeight:document.body.scrollHeight)+"px",console.log(t.style.height)},created:function(){},methods:{handleOpen:function(t,e){console.log(t,e)},handleClose:function(t,e){console.log(t,e)}}}),r=c,u=(n("3d55"),n("2877")),d=Object(u["a"])(r,s,o,!1,null,null,null),m=d.exports,f={components:{Header:a["a"],leftNav:m},data:function(){return{}},methods:{}},p=f,g=(n("3e9d"),Object(u["a"])(p,l,i,!1,null,"c73c3f12",null));e["default"]=g.exports},ffc4:function(t,e,n){}}]);
//# sourceMappingURL=chunk-a3cc5b56.9114d137.js.map