(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22bdb9"],{f180:function(t,i,a){"use strict";a.r(i);var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",[a("div",[a("el-steps",{attrs:{active:t.active,"finish-status":"success","align-center":"",simple:""}},[a("el-step",{attrs:{title:"任务输入"},nativeOn:{click:function(i){return t.onclickFun1(i)}}}),a("el-step",{attrs:{title:"粒度补全"},nativeOn:{click:function(i){return t.onclickFun2(i)}}}),a("el-step",{attrs:{title:"联盟形成"},nativeOn:{click:function(i){return t.onclickFun3(i)}}}),a("el-step",{attrs:{title:"人机资源调度"},nativeOn:{click:function(i){return t.onclickFun4(i)}}})],1)],1),a("div",[a("router-view")],1)])},r=[],u={name:"stepBar",data:function(){return{active:0}},created:function(){this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput3")},methods:{goformer:function(){return 1==this.active?(this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput3"),void(this.active=0)):2==this.active?(this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView"),void(this.active=1)):3==this.active?(this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition"),void(this.active=2)):void 0},golater:function(){return console.log(this.active),0==this.active?(this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView"),void(this.active=1)):1==this.active?(this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition"),void(this.active=2)):2==this.active?(this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart"),void(this.active=3)):void 0},onclickFun1:function(){this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput3"),this.active=0},onclickFun2:function(){this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView"),this.active=1},onclickFun3:function(){this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition"),this.active=2},onclickFun4:function(){this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart"),this.active=3}}},n=u,s=a("2877"),l=Object(s["a"])(n,e,r,!1,null,"700a0c1e",null);i["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d22bdb9.a48aa1a2.js.map