(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-471c0738"],{3679:function(e,t,i){"use strict";i.d(t,"a",(function(){return n})),i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return r}));var a=i("b775");function n(e,t,i,n){return Object(a["a"])({method:"POST",data:{start:e,end:t,threshold_f:i,threshold_fp:n},url:"/ExceptionRelationAnalysis"})}function o(e,t){return Object(a["a"])({method:"POST",data:{source_id:e,threshold_p:t},url:"ExceptionRelationPredict"})}function r(e){return Object(a["a"])({method:"POST",data:{source_id:e.source_id,generate_time:e.generate_time,product_id:e.product_id,type_id:e.type_id},url:"reportException"})}},f8a9:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h2",[e._v("报送异常事件")]),i("div",{staticStyle:{"text-align":"left",width:"400px"}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.exceptionData,"status-icon":"",rules:e.rules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"平台id"}},[i("el-input",{model:{value:e.exceptionData.source_id,callback:function(t){e.$set(e.exceptionData,"source_id",t)},expression:"exceptionData.source_id"}})],1),i("el-form-item",{attrs:{label:"报送时间"}},[i("el-date-picker",{attrs:{type:"datetime",placeholder:"报送时间选择"},model:{value:e.exceptionData.generate_time,callback:function(t){e.$set(e.exceptionData,"generate_time",t)},expression:"exceptionData.generate_time"}})],1),i("el-form-item",{attrs:{label:"商品种类id"}},[i("el-input",{model:{value:e.exceptionData.product_id,callback:function(t){e.$set(e.exceptionData,"product_id",t)},expression:"exceptionData.product_id"}})],1),i("el-form-item",{attrs:{label:"异常类型id"}},[i("el-input",{model:{value:e.exceptionData.type_id,callback:function(t){e.$set(e.exceptionData,"type_id",t)},expression:"exceptionData.type_id"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm()}}},[e._v("提交")]),i("el-button",{on:{click:function(t){return e.resetForm()}}},[e._v("重置")])],1)],1)],1)])},n=[],o=i("3679"),r={name:"exceptionData",data:function(){return{exceptionData:{source_id:"",generate_time:"",product_id:"",type_id:""}}},methods:{submitForm:function(){var e=this;Object(o["c"])(this.exceptionData).then((function(){e.$message({message:"报送成功",type:"success"})})).catch((function(e){console.log(e)}))},resetForm:function(){this.exceptionData={source_id:"",generate_time:"",product_id:"",type_id:""}}}},c=r,u=i("2877"),l=Object(u["a"])(c,a,n,!1,null,"2a93a9d4",null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-471c0738.bcff91a1.js.map