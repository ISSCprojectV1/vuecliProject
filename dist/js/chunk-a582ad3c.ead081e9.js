(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a582ad3c"],{"0083":function(e,t,n){"use strict";var l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-row",[n("el-col",{attrs:{xs:14,sm:15,md:16,lg:16,xl:14}},[n("el-menu",{staticClass:"el-menu",attrs:{router:!0,mode:"horizontal","background-color":"#00659B","text-color":"#FFFFFF","active-text-color":"#ffd04b"},on:{select:e.handleSelect}},[n("el-menu-item",{staticStyle:{"font-size":"18px",padding:"0"},attrs:{index:"/trade/Dashboard"}},[n("img",{staticClass:"userprofile",staticStyle:{width:"45px",height:"45px"},attrs:{src:e.logoImg,alt:"image"}}),e._v(" 大宗商品交易市场监管服务模式与资源调配系统 ")])],1)],1),n("el-col",{attrs:{xs:10,sm:9,md:8,lg:8,xl:10}},[n("el-menu",{staticClass:"el-menu",attrs:{router:!0,mode:"horizontal","background-color":"#00659B","text-color":"#FFFFFF","active-text-color":"#ffd04b"}},[n("el-menu-item",{attrs:{index:"/trade/Dashboard"}},[e._v("工作台")]),n("el-menu-item",{attrs:{index:"/console/index"}},[e._v("个人中心")]),n("el-submenu",{attrs:{index:"/console/index"}},[n("template",{slot:"title"},[n("img",{staticClass:"img userprofile",attrs:{src:e.userImg,alt:"image"}}),e._v(" （"+e._s(this.role)+"） ")]),n("el-menu-item",{attrs:{index:"/console/index"}},[e._v(" 个人中心 ")]),n("el-menu-item",{on:{click:e.logOut}},[e._v(" 登出 ")])],2)],1)],1)],1)],1)},a=[],o=n("3d46"),s=n.n(o),i=n("6131"),c=n.n(i),r=n("5f87"),u={name:"Header",data:function(){return{logoImg:s.a,userImg:c.a,role:""}},created:function(){var e=Object(r["b"])();switch(e){case"admin":this.role="管理员";break;case"RSS":this.role="监管机构端";break;case"TPS":this.role="交易平台端";break;case"OMS":this.role="运营管理端";break;default:this.role="普通用户";break}},methods:{handleSelect:function(e,t){console.log(e,t)},logOut:function(){Object(r["f"])(),Object(r["d"])(),Object(r["e"])(),this.$router.push("/login")}}},d=u,f=(n("c046"),n("2877")),m=Object(f["a"])(d,l,a,!1,null,"365d083c",null);t["a"]=m.exports},"0755":function(e,t,n){},"0bcc":function(e,t,n){},"3d46":function(e,t,n){e.exports=n.p+"img/seu.f3c9d3ef.png"},"4d2f":function(e,t,n){"use strict";n.r(t);var l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-header",[n("Header")],1),n("el-container",[n("el-aside",{staticStyle:{width:"250px"}},[n("sidebar")],1),n("el-main",[n("el-tabs",{directives:[{name:"show",rawName:"v-show",value:e.label,expression:"label"}],model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[n("el-tab-pane",{attrs:{name:"first"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.label))])])],1),n("router-view",{on:{label:e.setLabel}})],1)],1)],1)},a=[],o=n("0083"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{height:"100%"}},[n("el-menu",{ref:"caidan",staticClass:"el-menu-vertical-demo",staticStyle:{height:"100%"},attrs:{"default-active":e.defaultActive,"unique-opened":!0,router:"","background-color":"#00659B","text-color":"#FFFFFF","active-text-color":"#ffd04b"},on:{open:e.handleOpen,close:e.handleClose}},[n("el-menu-item",{staticStyle:{"text-align":"left","font-size":"20px"},attrs:{index:"/console/index"}},[n("i",{staticClass:"el-icon-house"}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v("首页")])]),e._l(this.accessRoutes,(function(t){return n("el-submenu",{key:t.title,staticStyle:{"text-align":"left"},attrs:{index:t.title}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),n("span",{staticStyle:{"font-size":"20px"}},[e._v(e._s(t.title))])]),e._l(t.routes,(function(t){return n("el-menu-item",{key:t.path,staticStyle:{"text-align":"left","padding-left":"80px","font-size":"18px"},attrs:{index:t.path}},[n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.meta.title))])])}))],2)}))],2)],1)},i=[],c=(n("d3b7"),{methods:{handleOpen:function(e,t){console.log(e,t)},handleClose:function(e,t){console.log(e,t)},test:function(){console.log("test")},resetHeight:function(){var e=this;return new Promise((function(t,n){e.tableH=0,t()}))},fetTableHeight:function(){var e=this;this.resetHeight().then((function(t){e.tableH=e.$refs.tableWrapper.getBoundingClientRect().height-10}))}},data:function(){return{tableH:0,defaultActive:"/console/score",accessRoutes:[{title:"个人中心",routes:[{path:"/console/userinfo",component:function(){return n.e("chunk-2bf19a38").then(n.bind(null,"c5cd"))},meta:{title:"我的信息"}},{path:"/console/changePassword",component:function(){return n.e("chunk-7ea47d2b").then(n.bind(null,"1f81"))},meta:{title:"修改密码"}}],path:"/console/userinfo"},{title:"明细管理",routes:[{path:"/console/manage/upload",component:function(){return n.e("chunk-5a5b61ee").then(n.bind(null,"00f6"))},meta:{title:"上传明细"}},{path:"/console/manage/score",component:function(){return n.e("chunk-2d0c4e70").then(n.bind(null,"3d8a"))},meta:{title:"积分明细"}}],path:"/console/manage"}]}},mounted:function(){this.defaultActive=this.$router.currentRoute.path;var e=document.getElementsByClassName("el-menu-vertical-demo");console.log(e[0]);var t=window.innerHeight;console.log(t),console.log(this.$refs.caidan.$el.clientHeight)},created:function(){}}),r=c,u=(n("e907"),n("2877")),d=Object(u["a"])(r,s,i,!1,null,"7f081ccf",null),f=d.exports,m={components:{sidebar:f,Header:o["a"]},data:function(){return{activeName:"first",label:""}},methods:{setLabel:function(e){this.label="","upload"===e?this.label="上传明细":"score"===e?this.label="积分明细":"index"===e?this.label="首页":"userinfo"===e?this.label="我的信息":"password"===e?this.label="修改密码":"uploadResource"===e&&(this.label="上传资源")}}},h=m,b=(n("a8e5"),Object(u["a"])(h,l,a,!1,null,"7ffba3b4",null));t["default"]=b.exports},6131:function(e,t,n){e.exports=n.p+"img/userprofile.e3875e91.jpg"},a8e5:function(e,t,n){"use strict";var l=n("0bcc"),a=n.n(l);a.a},c046:function(e,t,n){"use strict";var l=n("0755"),a=n.n(l);a.a},d79c:function(e,t,n){},e907:function(e,t,n){"use strict";var l=n("d79c"),a=n.n(l);a.a}}]);
//# sourceMappingURL=chunk-a582ad3c.ead081e9.js.map