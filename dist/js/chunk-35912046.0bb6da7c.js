(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-35912046"],{2909:function(t,e,r){"use strict";r.d(e,"a",(function(){return l}));var a=r("6b75");function i(t){if(Array.isArray(t))return Object(a["a"])(t)}r("a4d3"),r("e01a"),r("d28b"),r("a630"),r("e260"),r("d3b7"),r("3ca3"),r("ddb0");function n(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var o=r("06c5");function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(t){return i(t)||n(t)||Object(o["a"])(t)||s()}},"5f13":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h2",[t._v("交易频次查询")]),r("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[r("el-form-item",{attrs:{label:"查询商品"}},[r("el-select",{attrs:{placeholder:"选择商品"},model:{value:t.formInline.itemid,callback:function(e){t.$set(t.formInline,"itemid",e)},expression:"formInline.itemid"}},[r("el-option",{attrs:{label:"棉花U001",value:"1"}}),r("el-option",{attrs:{label:"钢铁U730",value:"2"}})],1)],1),r("el-form-item",{attrs:{label:"查询时间"}},[r("el-date-picker",{attrs:{type:"monthrange","range-separator":"至","start-placeholder":"开始月份","end-placeholder":"结束月份"},model:{value:t.formInline.time,callback:function(e){t.$set(t.formInline,"time",e)},expression:"formInline.time"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onSubmit(t.formInline)}}},[t._v("查询")])],1)],1),r("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:"表格模式",name:"table"}},[r("h3",[t._v("用户交易频率统计表")]),r("el-table",{staticStyle:{width:"100%"},attrs:{"default-sort":{prop:"count",order:"descending"},data:t.supportData,stripe:""}},[r("el-table-column",{attrs:{prop:"uid",label:"用户id","min-width":"180"}}),r("el-table-column",{attrs:{prop:"oid",label:"商品id","min-width":"180"}}),r("el-table-column",{attrs:{sortable:"",prop:"count",label:"交易频次","min-width":"180"}}),r("el-table-column",{attrs:{sortable:"",prop:"support",label:"频次权重","min-width":"180"}})],1),r("el-pagination",{ref:"pagination",staticStyle:{"text-align":"center"},attrs:{background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":t.pageChange}})],1),r("el-tab-pane",{attrs:{label:"统计图模式",name:"diagram"}},[r("h3",[t._v("用户交易频率统计图")]),r("div",{directives:[{name:"show",rawName:"v-show",value:t.showing1,expression:"showing1"}],staticStyle:{width:"1000px",height:"300px","text-align":"center"},attrs:{id:"echart1"}})])],1)],1)},i=[],n=(r("d81d"),r("fb6a"),r("b0c0"),r("d3b7"),r("6062"),r("3ca3"),r("ddb0"),r("2909")),o=r("c3f9"),s=r("313e"),l=r.n(s),u={name:"relationQuery",data:function(){return{activeName:"table",formInline:{itemid:"",time:[]},supportData:[],SimilarityUser:[],SimilarityTrade:[],showing1:!1,echart1:"",echart2:"",echart3:"",total:1}},mounted:function(){},methods:{pageChange:function(){},drawecharts1:function(t){for(var e=[],r=[],a=1;a<t.length;a++){for(var i=t[a][0],n=0,o=1;o<t[a].length;o++)n+=t[a][o];r.push({name:i,value:n})}for(var s=0;s<t.length-1;s++)e.push({type:"line",smooth:!0,seriesLayoutBy:"row"});e.push({type:"pie",id:"pie",radius:"30%",center:["66%","25%"],tooltip:{trigger:"item",showContent:!0},label:{formatter:"{b}: {@[1]} ({d}%)"},encode:{itemName:"users",value:[1]}},{type:"pie",id:"pie2",radius:"30%",tooltip:{trigger:"item",showContent:!0},center:["33%","25%"],label:{formatter:"{b}: {c} ({d}%)"},data:r}),this.echart1=l.a.init(document.querySelector("#echart1"));var u={legend:{},tooltip:{trigger:"axis",showContent:!0},dataset:{source:t},xAxis:{type:"category"},yAxis:{gridIndex:0},grid:{top:"55%"},series:e},c=this.echart1;this.echart1.on("updateAxisPointer",(function(t){var e=t.axesInfo[0];if(e){var r=e.value+1;c.setOption({series:{id:"pie",label:{formatter:"{b}: {@["+r+"]} ({d}%)"},encode:{value:r}}})}})),this.echart1.clear(),this.echart1.setOption(u)},drawecharts3:function(t){this.echart3=l.a.init(document.querySelector("#echart3"));for(var e=[],r=[],a=0;a<t.length;a++)r.push(t[a].tid1,t[a].tid2);r=Object(n["a"])(new Set(r));for(var i=0;i<r.length;i++)e.push({name:"交易"+r[i]});console.log(e);for(var o=[],s=[],u=0;u<e.length;u++)o.push({name:e[u].name,category:e[u].name});for(var c=0;c<t.length;c++)s.push({source:"交易"+t[c].tid1,target:"交易"+t[c].tid2,value:t[c].similarity,label:{show:!0,formatter:"关联度:{c}"},lineStyle:{width:5*t[c].similarity+1}});var d={tooltip:{},legend:[{data:e.map((function(t){return t.name}))}],animationDuration:1500,animationEasingUpdate:"quinticInOut",series:[{name:"Les Miserables",type:"graph",layout:"circular",data:o,links:s,categories:e,roam:!0,focusNodeAdjacency:!0,itemStyle:{borderColor:"#fff",borderWidth:1,shadowBlur:10,shadowColor:"rgba(0, 0, 0, 0.3)"},label:{show:!0,position:"right"},lineStyle:{color:"source",curveness:.3},emphasis:{lineStyle:{width:10}}}]};this.echart3.clear(),this.echart3.setOption(d)},init:function(){this.supportData=[],this.SimilarityTrade=[],this.SimilarityUser=[],""!=this.echart1&&this.echart1.clear(),""!=this.echart2&&this.echart2.clear(),""!=this.echart3&&this.echart3.clear()},prepareData:function(t,e){t[0],t[1];for(var r=t[0].getFullYear(),a=t[1].getFullYear(),i=t[0].getMonth(),n=t[1].getMonth(),o=12*(a-r)+(n-i)+1,s=["users"],l=r,u=i+1,c=0;c<o;c++)13==u&&(l+=1,u=1),s.push(l+"."+u),u+=1;var d=[];d.push(s);for(var f=0;f<e.length;f++){d.push(["用户"+e[f].uid]);for(var h=0;h<o;h++)d[f+1].push(0);for(var p=0;p<e[f].relationtrades.length;p++){var m=new Date(e[f].relationtrades[p].date).getMonth()-i+1;d[f+1][m]+=1}}return console.log(d),d},onSubmit:function(t){var e=this;this.init(),this.showing1=!0;var r={itemid:t.itemid,start:t.time[0],end:t.time[1]};Object(o["c"])(r).then((function(a){console.log(a.data.data),e.supportData=a.data.data;var i=e.prepareData(t.time,a.data.data);e.drawecharts1(i),Object(o["b"])(r).then((function(t){console.log(t.data.data),e.SimilarityUser=t.data.data,e.drawechart2(t.data.data,i)})).catch((function(t){console.log(t)}))})).catch((function(t){console.log(t)}))},Tradesimilar:function(t){var e=this,r={uid1:t.uid1,uid2:t.uid2,itemid:this.formInline.itemid,start:this.formInline.time[0],end:this.formInline.time[1]};Object(o["a"])(r).then((function(t){t.data.data.length<=10?e.SimilarityTrade=t.data.data:e.SimilarityTrade=t.data.data.sort((function(t,e){return e.similarity-t.similarity})).slice(0,10),setTimeout((function(){console.log(e.SimilarityTrade),e.drawecharts3(e.SimilarityTrade)}),0)})).catch((function(t){console.log(t)}))}}},c=u,d=r("2877"),f=Object(d["a"])(c,a,i,!1,null,"721af6b9",null);e["default"]=f.exports},6062:function(t,e,r){"use strict";var a=r("6d61"),i=r("6566");t.exports=a("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),i)},6566:function(t,e,r){"use strict";var a=r("9bf2").f,i=r("7c73"),n=r("e2cc"),o=r("0366"),s=r("19aa"),l=r("2266"),u=r("7dd0"),c=r("2626"),d=r("83ab"),f=r("f183").fastKey,h=r("69f3"),p=h.set,m=h.getterFor;t.exports={getConstructor:function(t,e,r,u){var c=t((function(t,a){s(t,c,e),p(t,{type:e,index:i(null),first:void 0,last:void 0,size:0}),d||(t.size=0),void 0!=a&&l(a,t[u],t,r)})),h=m(e),v=function(t,e,r){var a,i,n=h(t),o=b(t,e);return o?o.value=r:(n.last=o={index:i=f(e,!0),key:e,value:r,previous:a=n.last,next:void 0,removed:!1},n.first||(n.first=o),a&&(a.next=o),d?n.size++:t.size++,"F"!==i&&(n.index[i]=o)),t},b=function(t,e){var r,a=h(t),i=f(e);if("F"!==i)return a.index[i];for(r=a.first;r;r=r.next)if(r.key==e)return r};return n(c.prototype,{clear:function(){var t=this,e=h(t),r=e.index,a=e.first;while(a)a.removed=!0,a.previous&&(a.previous=a.previous.next=void 0),delete r[a.index],a=a.next;e.first=e.last=void 0,d?e.size=0:t.size=0},delete:function(t){var e=this,r=h(e),a=b(e,t);if(a){var i=a.next,n=a.previous;delete r.index[a.index],a.removed=!0,n&&(n.next=i),i&&(i.previous=n),r.first==a&&(r.first=i),r.last==a&&(r.last=n),d?r.size--:e.size--}return!!a},forEach:function(t){var e,r=h(this),a=o(t,arguments.length>1?arguments[1]:void 0,3);while(e=e?e.next:r.first){a(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!b(this,t)}}),n(c.prototype,r?{get:function(t){var e=b(this,t);return e&&e.value},set:function(t,e){return v(this,0===t?0:t,e)}}:{add:function(t){return v(this,t=0===t?0:t,t)}}),d&&a(c.prototype,"size",{get:function(){return h(this).size}}),c},setStrong:function(t,e,r){var a=e+" Iterator",i=m(e),n=m(a);u(t,e,(function(t,e){p(this,{type:a,target:t,state:i(t),kind:e,last:void 0})}),(function(){var t=n(this),e=t.kind,r=t.last;while(r&&r.removed)r=r.previous;return t.target&&(t.last=r=r?r.next:t.state.first)?"keys"==e?{value:r.key,done:!1}:"values"==e?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),r?"entries":"values",!r,!0),c(e)}}},"6d61":function(t,e,r){"use strict";var a=r("23e7"),i=r("da84"),n=r("94ca"),o=r("6eeb"),s=r("f183"),l=r("2266"),u=r("19aa"),c=r("861d"),d=r("d039"),f=r("1c7e"),h=r("d44e"),p=r("7156");t.exports=function(t,e,r){var m=-1!==t.indexOf("Map"),v=-1!==t.indexOf("Weak"),b=m?"set":"add",g=i[t],y=g&&g.prototype,w=g,x={},S=function(t){var e=y[t];o(y,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(v&&!c(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return v&&!c(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(v&&!c(t))&&e.call(this,0===t?0:t)}:function(t,r){return e.call(this,0===t?0:t,r),this})};if(n(t,"function"!=typeof g||!(v||y.forEach&&!d((function(){(new g).entries().next()})))))w=r.getConstructor(e,t,m,b),s.REQUIRED=!0;else if(n(t,!0)){var O=new w,I=O[b](v?{}:-0,1)!=O,k=d((function(){O.has(1)})),j=f((function(t){new g(t)})),D=!v&&d((function(){var t=new g,e=5;while(e--)t[b](e,e);return!t.has(-0)}));j||(w=e((function(e,r){u(e,w,t);var a=p(new g,e,w);return void 0!=r&&l(r,a[b],a,m),a})),w.prototype=y,y.constructor=w),(k||D)&&(S("delete"),S("has"),m&&S("get")),(D||I)&&S(b),v&&y.clear&&delete y.clear}return x[t]=w,a({global:!0,forced:w!=g},x),h(w,t),v||r.setStrong(w,t,m),w}},7156:function(t,e,r){var a=r("861d"),i=r("d2bb");t.exports=function(t,e,r){var n,o;return i&&"function"==typeof(n=e.constructor)&&n!==r&&a(o=n.prototype)&&o!==r.prototype&&i(t,o),t}},bb2f:function(t,e,r){var a=r("d039");t.exports=!a((function(){return Object.isExtensible(Object.preventExtensions({}))}))},c3f9:function(t,e,r){"use strict";r.d(e,"c",(function(){return i})),r.d(e,"b",(function(){return n})),r.d(e,"a",(function(){return o}));var a=r("b775");r("4328");function i(t){return Object(a["a"])({method:"POST",data:t,url:"/usersupport"})}function n(t){return Object(a["a"])({method:"POST",data:t,url:"/userrelation"})}function o(t){return Object(a["a"])({method:"POST",data:t,url:"/tradesimilar"})}},f183:function(t,e,r){var a=r("d012"),i=r("861d"),n=r("5135"),o=r("9bf2").f,s=r("90e3"),l=r("bb2f"),u=s("meta"),c=0,d=Object.isExtensible||function(){return!0},f=function(t){o(t,u,{value:{objectID:"O"+ ++c,weakData:{}}})},h=function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!n(t,u)){if(!d(t))return"F";if(!e)return"E";f(t)}return t[u].objectID},p=function(t,e){if(!n(t,u)){if(!d(t))return!0;if(!e)return!1;f(t)}return t[u].weakData},m=function(t){return l&&v.REQUIRED&&d(t)&&!n(t,u)&&f(t),t},v=t.exports={REQUIRED:!1,fastKey:h,getWeakData:p,onFreeze:m};a[u]=!0}}]);
//# sourceMappingURL=chunk-35912046.0bb6da7c.js.map