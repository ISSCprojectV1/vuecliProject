(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3651418c","chunk-2bf19a38"],{"0f26":function(e,t,s){"use strict";var a=s("ce60"),i=s.n(a);i.a},6131:function(e,t,s){e.exports=s.p+"img/userprofile.e3875e91.jpg"},c5cd:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dashboard-editor-container",attrs:{id:"diceng"}},[s("el-row",{staticClass:"row1"},[s("el-col",{attrs:{span:24}},[s("h1",[e._v("个人资料 ")])])],1),s("el-row",{staticClass:"row2"},[s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content"},[s("img",{attrs:{src:e.logo}})])]),e.modify?s("el-col",{staticStyle:{"text-align":"left"},attrs:{span:18}},[s("el-form",{ref:"user",staticClass:"form",attrs:{model:e.user,"status-icon":""}},[s("el-form-item",{attrs:{label:"ID"}},[s("el-input",{attrs:{disabled:"disabled"},model:{value:e.user.id,callback:function(t){e.$set(e.user,"id",t)},expression:"user.id"}})],1),s("el-form-item",{attrs:{label:"昵称"}},[s("el-input",{model:{value:e.user.name,callback:function(t){e.$set(e.user,"name",t)},expression:"user.name"}})],1),s("el-form-item",{attrs:{label:"邮箱"}},[s("el-input",{model:{value:e.user.email,callback:function(t){e.$set(e.user,"email",t)},expression:"user.email"}})],1),s("el-form-item",{attrs:{label:"积分"}},[s("el-input",{attrs:{disabled:"disabled"},model:{value:e.user.score,callback:function(t){e.$set(e.user,"score",t)},expression:"user.score"}})],1),s("el-form-item",{attrs:{label:"荣誉值"}},[s("el-input",{attrs:{disabled:"disabled"},model:{value:e.user.reputation,callback:function(t){e.$set(e.user,"reputation",t)},expression:"user.reputation"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.updateForm(e.user)}}},[e._v("修改")])],1)],1)],1):s("el-col",{staticStyle:{"text-align":"left"},attrs:{span:18}},[s("div",{staticClass:"grid-content"},[s("span",[e._v("ID:"+e._s(e.user.id))]),s("el-link",{staticStyle:{"margin-left":"400px"},attrs:{type:"primary"},on:{click:function(t){e.modify=!0}}},[e._v("修改资料")]),s("p",[e._v("昵称:"+e._s(e.user.name))]),s("p",[e._v("邮箱:"+e._s(e.user.email))]),s("p",[e._v("积分:"+e._s(e.user.score))]),s("p",[e._v("荣誉值:"+e._s(e.user.reputation))])],1)])],1)],1)},i=[],n=(s("b0c0"),s("6131")),r=s.n(n),o=s("fa09"),l={name:"index",created:function(){var e=this;this.$emit("label","userinfo"),Object(o["w"])().then((function(t){e.init(t.data.data),console.log("getuserinfo success!")})).catch((function(){console.log("getuserinfo fail")}))},mounted:function(){var e=document.getElementById("diceng");e.style.height=window.innerHeight+"px"},methods:{init:function(e){this.user.id=e.id,this.user.name=e.name,this.user.score=e.score,this.user.email=e.email,this.user.reputation=e.reputation},updateForm:function(e){var t=this,s={};s.name=e.name,s.email=e.email,s.id=this.user.id,Object(o["y"])(s).then((function(e){t.init(e.data.data),t.modify=!1,t.$message({showClose:!0,message:"修改成功",type:"success"}),console.log("updateuserinfo success!")})).catch((function(){t.$message({showClose:!0,message:"修改失败",type:"error"}),console.log("updateuserinfo fail")}))}},data:function(){return{logo:r.a,user:{id:"",name:"",score:"",reputation:"",email:""},modify:!1}}},c=l,u=(s("0f26"),s("2877")),d=Object(u["a"])(c,a,i,!1,null,"02bcb41b",null);t["default"]=d.exports},ce60:function(e,t,s){}}]);
//# sourceMappingURL=chunk-3651418c.6c5c9e79.js.map