(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d6e22b8"],{"1ac7":function(e,t,c){"use strict";c.r(t);var o=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"detailBar"},[c("el-row",[c("el-col",{attrs:{span:12}},[c("h2",[e._v(e._s(e.auction.name))]),c("p",[e._v(e._s(e.auction.description))]),c("ul",[c("li",[e._v(" 起拍价:"),c("span",{staticClass:"score"},[e._v(e._s(e.auction.startPrice))])]),c("li",[e._v(" 最新价:"),c("span",{staticClass:"score"},[e._v(e._s(e.auction.updatedPrice))])])]),c("ul",{staticStyle:{"margin-bottom":"20px"}},[c("li",[e._v(" 开始时间:"),c("span",{staticClass:"time"},[e._v(e._s(e.auction.startTime))])]),c("li",[e._v(" 结束时间:"),c("span",{staticClass:"size"},[e._v(e._s(e.auction.endTime))])])]),c("el-form",{attrs:{model:e.form}},[c("el-form-item",{attrs:{label:"出价","label-width":"50"}},[c("el-input-number",{attrs:{min:1,step:e.auction.minimumDecreasePrice,max:e.auction.updatedPrice,label:""},model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}}),e._v(" (价格步长:"+e._s(e.auction.minimumDecreasePrice)+") ")],1),c("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.doAuction(e.form)}}},[e._v("竞拍")]),c("el-button",{on:{click:function(t){return e.flush(e.auction.id)}}},[e._v("刷新")])],1)],1)],1)],1)},s=[],i=c("fa09"),n=c("bd85"),a={name:"resourceDetail",props:{file:{type:Object,require:!0}},created:function(){var e=this.$router.currentRoute.params.id;this.getAuction(e)},computed:{downloadUrl:function(){return"http://localhost:8088/downloadfile/"+this.file.id}},data:function(){return{score:0,dialogVisible:!1,resource:{name:"2012第一季度钢铁交易数据",type:"",category:"",score:"5",tags:["钢铁","交易数据"],desc:"关于2012第一季度钢铁交易数据",time:"2020-04-23",size:"639KB",value:4.1,collected:!0},auction:{},form:{price:""},rule:""}},methods:{getRule:function(){var e=this;Object(n["l"])().then((function(t){e.rule=t.data})).catch((function(e){console.log(e)}))},getAuction:function(e){var t=this;Object(n["i"])(e).then((function(e){t.auction=e.data,t.form.price=t.auction.updatedPrice})).catch((function(e){console.log(e)}))},doAuction:function(e){var t=this;Object(n["d"])(this.auction.id,e.price).then((function(e){t.$message({showClose:!0,message:"竞价成功",type:"success"}),t.getAuction(t.auction.id)})).catch((function(e){t.$message({showClose:!0,message:"竞价失败",type:"error"})})),this.form.price=""},flush:function(e){var t=this;Object(n["i"])(e).then((function(e){t.$message({showClose:!0,message:"刷新成功",type:"success"})})).catch((function(e){t.$message({showClose:!0,message:"刷新失败",type:"error"})}))},download:function(){var e=this;Object(i["k"])(this.file.id).then((function(){document.getElementById("el-link").click(),e.dialogVisible=!1,e.$message({message:"恭喜你，下载成功",type:"success"}),console.log("buydata success!")})).catch((function(){e.$message.error("下载失败"),console.log("buydata fail")}))},openDialog:function(){var e=this;Object(i["w"])().then((function(t){e.score=t.data.data.score,e.dialogVisible=!0,console.log("getuserinfo success!")})).catch((function(){console.log("getuserinfo fail")}))},collect:function(){var e=this.resource.collected;this.$set(this.resource,"collected",!e),console.log(this.resource.collected)},handleClose:function(e){e()}}},r=a,l=(c("2298"),c("2877")),u=Object(l["a"])(r,o,s,!1,null,"2a7aa939",null);t["default"]=u.exports},2298:function(e,t,c){"use strict";var o=c("e8fe"),s=c.n(o);s.a},e8fe:function(e,t,c){}}]);
//# sourceMappingURL=chunk-5d6e22b8.4fa1da13.js.map