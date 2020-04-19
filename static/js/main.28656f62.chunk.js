(this.webpackJsonptracker=this.webpackJsonptracker||[]).push([[0],{207:function(e,t,a){e.exports=a(390)},212:function(e,t,a){},215:function(e,t,a){},359:function(e,t,a){},390:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(5),c=a.n(i),s=(a(212),a(75)),l=a(60),o=a(3),u=a.n(o),m=a(10),d=a(4),f=a(395),p=a(396),v=a(16),h=a(53),b=a(116),E=a(104),y=a(118),g=a(173),j=function e(t,a,n){Object(h.a)(this,e),this.id=void 0,this.timestamp=void 0,this.name=void 0,this.name=t,n&&(this.id=n),this.timestamp=a||(new Date).toISOString()},O=function(){var e=Object(m.a)(u.a.mark((function e(t,a){var n,r,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.units.get({name:a});case 2:if(!(n=e.sent)||!n.id){e.next=5;break}return e.abrupt("return",n.id);case 5:return r=(new Date).toISOString(),e.next=8,t.units.add({name:a,timestamp:r});case 8:return i=e.sent,e.abrupt("return",i);case 10:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),x=a(105),w=function(){function e(t,a){Object(h.a)(this,e),this.id=void 0,this.unitId=void 0,this.unitName=void 0,this.unit=void 0,this.records=void 0,t&&(this.id=t),a&&(this.unitId=a)}return Object(x.a)(e,[{key:"loadSeriesData",value:function(){var e=Object(m.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.id&&this.unitId){e.next=2;break}return e.abrupt("return",[]);case 2:return e.next=4,Promise.all([S.units.where("id").equals(this.unitId).first(),S.records.where("seriesId").equals(this.id).toArray()]);case 4:return t=e.sent,a=Object(d.a)(t,2),this.unit=a[0],this.records=a[1],e.abrupt("return",this.records||[]);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),S=new(function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(b.a)(this,Object(E.a)(t).call(this,"TrackerDatabase"))).series=void 0,e.units=void 0,e.records=void 0,e.version(1).stores({series:"++id, timestamp, name",units:"++id, timestamp, name",records:"++id, timestamp, seriesId, amount"}),e.series=e.table("series"),e.units=e.table("units"),e.records=e.table("records"),e.series.mapToClass(w),e.units.mapToClass(j),e}return Object(y.a)(t,e),t}(g.a)),k=a(174),C=a(29),I=a(88),N=a(391),F=a(398),D=a(30),T=a(143),z=a.n(T),A=function(e){var t=Object(n.useState)([]),a=Object(d.a)(t,2),i=a[0],c=a[1],s=Object(n.useState)(),l=Object(d.a)(s,2),o=l[0],u=l[1];return z.a.Animate.registerAnimation("lineUpdate",(function(e,t){for(var a=e.get("cacheShape").attrs,n=a.points,r=e.attr("points"),i=n.length,c=r.length-i,s=r[r.length-1],l=0;l<c;l++)n.push(s);e.attr(a),e.animate().to({attrs:{points:r},duration:2e3,easing:t.easing})})),Object(n.useEffect)((function(){if(!o){var t=new z.a.Chart({id:"mountNode",pixelRatio:window.devicePixelRatio}),a=e.lineColor?e.lineColor:"#fff",n=e.records.map((function(e){return Object(D.a)({},e,{amount:Number(e.amount)})}));c(n),t.source(n,{timestamp:{type:"timeCat",mask:"MM/DD",tickCount:3,range:[0,1]},amount:{tickCount:5,min:0,alias:"amount"}}),t.axis("time",{label:function(e,t,a){var n={};return 0===t?n.textAlign="left":t===a-1&&(n.textAlign="right"),n}}),t.tooltip({showCrosshairs:!0}),t.line().position("timestamp*amount").shape("smooth").animate({update:{animation:"lineUpdate"}}).color(a).style({lineWidth:3}),t.point().position("timestamp*amount").shape("smooth").style({stroke:a,fill:a,lineWidth:1}),t.render(),u(t)}}),[e.lineColor,e.records,o]),Object(n.useEffect)((function(){!function(e){var t=Object(D.a)({},e,{amount:Number(e.amount)});c((function(e){return[].concat(Object(C.a)(e),[t])}))}(e.records[e.records.length-1])}),[e.records]),r.a.createElement("div",{id:"container",style:{display:"flex",justifyContent:"center"}},r.a.createElement("canvas",{id:"mountNode",height:e.height,width:e.width}),o&&i?o.changeData(i):null)},W=(a(215),f.a.Title),B=function(e){return new Promise((function(t){return setTimeout(t,e)}))},L=[.5,4,1.5,7],q=function(e){var t=p.a.useForm(),a=Object(d.a)(t,1)[0],i=Object(n.useState)(),c=Object(d.a)(i,2)[1],s=Object(n.useState)(!1),l=Object(d.a)(s,2),o=l[0],h=l[1],b=Object(n.useState)([]),E=Object(d.a)(b,2),y=E[0],g=E[1],j=Object(n.useState)(0),O=Object(d.a)(j,2),x=O[0],w=O[1],S=Object(n.useState)(!1),D=Object(d.a)(S,2),T=D[0],z=D[1],q=function(e,t){var a=new Date;a.setDate(a.getDate()+t);var n={id:t,seriesId:1,timestamp:a.toISOString(),amount:e};g((function(e){return[].concat(Object(C.a)(e),[n])})),w(t+1)};Object(n.useEffect)((function(){c({});var t,n=void 0,r=e.values&&e.values.length>=1?e.values:L;if(!0===e.animated){var i=Object(k.a)(r),s=i[0],l=i.slice(1);q(s,0),n=l.map((t=4e3,function(e,n){return setTimeout(Object(m.a)(u.a.mark((function t(){var r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n+1,a.setFieldsValue({amount:e}),t.next=4,B(800);case 4:return h(!0),q(e,r),t.next=8,B(600);case 8:a.setFieldsValue({amount:void 0}),h(!1);case 10:case"end":return t.stop()}}),t)}))),t*(n+1))}));var o=4e3*r.length;n.push(setInterval((function(){return z(!0)}),o))}else r.map(q);return function(){n&&n.map(clearInterval)}}),[a,e.animated,e.values]);return r.a.createElement(r.a.Fragment,null,e.showForm?r.a.createElement(p.a,{form:a,name:"demo_flow",layout:"inline",style:{display:"flex",justifyContent:"center"},onFinish:function(e){e.amount&&(q(Number(e.amount),x),a.resetFields(),z(!1))}},r.a.createElement(p.a.Item,{name:"seriesName",style:{margin:"0 8px"}},r.a.createElement(I.a,{size:"small",style:{maxWidth:160,minWidth:120},bordered:!1,defaultValue:"running",options:[{label:"running",value:"1"}],optionFilterProp:"children"})),r.a.createElement(N.a,{content:"Try me!",visible:T},r.a.createElement(p.a.Item,{name:"amount",rules:[{required:!0,message:"required"}],style:{maxWidth:70,margin:"0 8px"}},r.a.createElement(F.a,{type:"number",size:"small",placeholder:"miles"}))),r.a.createElement(p.a.Item,{shouldUpdate:!0,style:{margin:"0 8px"}},(function(){return r.a.createElement(v.a,{size:"small",type:"primary",shape:"round",htmlType:"submit",loading:o,disabled:o||!Boolean(a.getFieldValue("amount"))},"Log")}))):null,y&&y.length>=1?r.a.createElement("div",{id:"overlay-container"},r.a.createElement(A,{records:y,height:e.height,width:e.width,lineColor:e.lineColor}),e.overlay?r.a.createElement("div",{id:"overlay",className:"overlay-flex-container"},r.a.createElement(f.a,null,r.a.createElement(W,{level:4,style:{color:e.overlayColor}},e.overlay))):null):null)};function P(e){var t=e.name,a=e.id;return{label:t,value:Number(a)}}var R=function(e,t){var a=(new Date).toISOString(),n="".concat(e,"_").concat(a,".json"),r=new Blob([JSON.stringify(t,void 0,2)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(r),i.download=n,i.click()},V=[["running","miles"],["coffee consumption","cups"],["pushups","reps"],["alcohol","drinks"],["meditation","minutes"],["snacks eaten","serving"],["anerobic exercise","minutes"],["TV watched","hours"],["walking","miles"]],U=function(){var e=Object(n.useState)(V[0][0]),t=Object(d.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)(V[0][1]),s=Object(d.a)(c,2),l=s[0],o=s[1];return function(e,t){var a=Object(n.useRef)();Object(n.useEffect)((function(){a.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){a&&a.current&&a.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){!function(e){var t=e.findIndex((function(e){return e[0]===a}))+1;if(t>=e.length)return i(e[0][0]),void o(e[0][1]);var n=e[t];i(n[0]),o(n[1])}(V)}),3e3),r.a.createElement(n.Fragment,null,r.a.createElement(p.a.Item,{name:"seriesName",rules:[{required:!0,message:"Please input something"}],style:{width:110,margin:"0 8px"}},r.a.createElement(F.a,{size:"small",placeholder:a})),r.a.createElement(p.a.Item,{name:"unitName",rules:[{required:!0,message:"Please input something"}],style:{width:90,margin:"0 8px"}},r.a.createElement(F.a,{size:"small",placeholder:l})))},_=(a(359),f.a.Title),M=function(){var e=p.a.useForm(),t=Object(d.a)(e,1)[0],a=Object(l.f)(),i=Object(n.useState)(),c=Object(d.a)(i,2)[1],o=Object(n.useState)([]),h=Object(d.a)(o,2),b=h[0],E=h[1],y=function(){var e=Object(m.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.series.toArray();case 2:t=e.sent,E(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(n.useEffect)((function(){c({}),y()}),[]);var g=function(){var e=Object(m.a)(u.a.mark((function e(t){var n,r,i,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.seriesName&&t.unitName){e.next=2;break}return e.abrupt("return");case 2:return n=t.unitName.toLocaleLowerCase(),e.next=5,O(S,n);case 5:return r=e.sent,i={name:t.seriesName.toLocaleLowerCase(),timestamp:(new Date).toISOString(),unitId:r},e.next=9,S.series.add(i);case 9:c=e.sent,a.push("/".concat(c));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{margin:"1em 0"}},r.a.createElement(f.a,null,r.a.createElement("div",{className:"indent"},r.a.createElement(_,{level:2,style:{marginBottom:"0.2em"}},"simple habit tracking")),r.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},r.a.createElement("div",{style:{display:"block",justifyContent:"left"}},r.a.createElement("div",null,r.a.createElement("span",{className:"emoji",role:"img","aria-label":"woman scientist"},"\ud83d\udc69\u200d\ud83d\udd2c")," ","decide what you want to track"),r.a.createElement("div",null,r.a.createElement("span",{className:"emoji",role:"img","aria-label":"clipboard"},"\ud83d\udccb")," ","use this app to log data"),r.a.createElement("div",null,r.a.createElement("span",{className:"emoji",role:"img","aria-label":"chart upwards"},"\ud83d\udcc8")," ","see charts about your behavior"))))),r.a.createElement("div",{style:{margin:"1em 0"}},r.a.createElement("div",{className:"indent"},r.a.createElement(f.a,null,r.a.createElement(_,{level:2,style:{marginBottom:"0.2em"}},"log data, see trends"),r.a.createElement("div",{className:"indent"},r.a.createElement(_,{level:4},"looks like this:")))),r.a.createElement("div",{style:{minHeight:200,paddingRight:"2em"}},r.a.createElement(q,{height:170,width:.8*window.innerWidth,showForm:!0,animated:!0,lineColor:"rgba(6, 85, 231, .6)",overlay:"DEMO",overlayColor:"rgba(240, 240, 240, .3)"}))),r.a.createElement("div",{style:{margin:"1em 0"}},r.a.createElement("div",{className:"indent"},r.a.createElement(f.a,null,r.a.createElement(_,{level:2,style:{marginBottom:"0.2em"}},"get started"),r.a.createElement("div",{className:"indent"},r.a.createElement(_,{level:4},"what do you want to track?")))),r.a.createElement(p.a,{form:t,name:"landing_series_creation",layout:"inline",style:{display:"flex",justifyContent:"center"},onFinish:g},r.a.createElement(U,null),r.a.createElement(p.a.Item,{shouldUpdate:!0,style:{margin:"0 8px"}},(function(){return r.a.createElement(v.a,{type:"primary",htmlType:"submit",size:"small",shape:"round",disabled:!t.isFieldsTouched(!0)||Boolean(t.getFieldsError().filter((function(e){return e.errors.length})).length)},"Start")})))),b&&b[0]&&b[0].id?r.a.createElement("div",{style:{marginTop:24,display:"flex",justifyContent:"center"}},r.a.createElement(v.a,{type:"primary",ghost:!0,style:{width:"70%"}},r.a.createElement(s.b,{to:"/".concat(b[0].id)},"Go to your records"))):null)},J=a(202),H=a(392),G=a(399),K=F.a.Search,$=function(e){var t=Object(n.useState)([]),a=Object(d.a)(t,2),i=a[0],c=a[1],s=Object(n.useState)([]),o=Object(d.a)(s,2),f=o[0],v=o[1],h=Object(n.useState)(),b=Object(d.a)(h,2),E=b[0],y=b[1],g=Object(n.useState)(),j=Object(d.a)(g,2),O=j[0],x=j[1],w=Object(l.f)();Object(n.useEffect)((function(){e.activeSeries&&(y(void 0),e.form.resetFields(),k(e.activeSeries))}),[e.activeSeries,e.form]);var k=function(){var e=Object(m.a)(u.a.mark((function e(t){var a,n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.series.toArray();case 2:a=e.sent,c(a),n=a.map(P),(r=a.find((function(e){return e.id===t})))&&y(r),v(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var N=function(e){x(e.target.value)},F=function(){var t=Object(m.a)(u.a.mark((function t(){var a,n,r,s,l;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!O){t.next=14;break}return a=(new Date).toISOString(),n=String(O).toLocaleLowerCase(),t.next=5,S.series.add({name:n,timestamp:a});case 5:r=t.sent,s=[].concat(Object(C.a)(i),[{id:r,name:n,timestamp:a}]),c(s),l=s.map(P),v(l),y({id:r,name:n,timestamp:a}),x(void 0),e.form.setFieldsValue({seriesId:r}),w.push("/".concat(r));case 14:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return f&&f.length>=1?r.a.createElement(p.a.Item,{name:"seriesId",style:{margin:"0 4px 0 0"}},r.a.createElement(I.a,{size:"small",style:{width:e.width},bordered:!1,onChange:function(e){w.push("/".concat(e))},options:f,value:String(null===E||void 0===E?void 0:E.id),defaultValue:String(null===E||void 0===E?void 0:E.name),dropdownRender:function(e){return r.a.createElement("div",null,e,r.a.createElement(H.a,{style:{margin:"4px 0"}}),r.a.createElement("div",{style:{display:"flex",flexWrap:"nowrap",padding:8}},r.a.createElement(K,{size:"small",value:O,onChange:N,placeholder:"meditation",onPressEnter:F,onSearch:F,enterButton:r.a.createElement(G.a,null)})))}})):r.a.createElement("div",{style:{width:e.width}})},Q=F.a.Search,X=function(e){var t=Object(n.useState)(),a=Object(d.a)(t,2),i=a[0],c=a[1],s=Object(n.useState)([]),l=Object(d.a)(s,2),o=l[0],f=l[1],v=Object(n.useState)([]),h=Object(d.a)(v,2),b=h[0],E=h[1];Object(n.useEffect)((function(){y()}),[]);var y=function(){var e=Object(m.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.units.toArray();case 2:t=e.sent,a=t.map(P),E(t),f(a);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(e){c(e.target.value)},j=function(){var t=Object(m.a)(u.a.mark((function t(){var a,n,r,s,l,o;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!i){t.next=13;break}return a=(new Date).toISOString(),n={name:String(i).toLocaleLowerCase(),timestamp:a},t.next=5,S.units.add(n);case 5:r=t.sent,s=Object(D.a)({},n,{id:r}),l=[].concat(Object(C.a)(b),[s]),o=l.map(P),E(l),f(o),c(void 0),e.selectionComplete(s);case 13:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return r.a.createElement(p.a.Item,{name:"unit",rules:[{required:!0,message:"Please choose a unit"}],style:{margin:"0 4px"}},r.a.createElement(I.a,{size:"small",style:{width:e.width},placeholder:"unit",onChange:function(t){var a=b.find((function(e){return e.id===t}));a&&e.selectionComplete(Object(D.a)({},a,{id:t}))},dropdownRender:function(e){return r.a.createElement("div",null,e,r.a.createElement(H.a,{style:{margin:"4px 0"}}),r.a.createElement("div",{style:{display:"flex",flexWrap:"nowrap",padding:8}},r.a.createElement(Q,{size:"small",value:i,onChange:g,placeholder:"session",onPressEnter:j,onSearch:j,enterButton:r.a.createElement(G.a,null)})))},options:o}))},Y=a(397),Z=a(400),ee=a(401),te=a(402),ae=f.a.Title,ne=f.a.Text,re=function(e){var t=Object(n.useState)(!1),a=Object(d.a)(t,2),i=a[0],c=a[1],s=function(e){return function(){var e=Object(m.a)(u.a.mark((function e(t){var a,n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.units.toArray();case 2:return a=e.sent,e.next=5,S.series.toArray();case 5:return n=e.sent,e.next=8,S.records.toArray();case 8:r=e.sent,R("full-data-export",{units:a,series:n,records:r});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},l=function(e,t,a){return function(){var e=Object(m.a)(u.a.mark((function e(n){var r,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=void 0,!t.unitId){e.next=5;break}return e.next=4,S.units.where("id").equals(t.unitId).first();case 4:r=e.sent;case 5:i={series:t,records:a,unit:r},R(t.name,i);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},o={style:{margin:"4px"},type:"primary",size:"small",shape:"round"};return r.a.createElement("div",null,r.a.createElement(Z.a,{style:{fontSize:22},onClick:function(){return c(!0)}}),r.a.createElement(Y.a,{title:r.a.createElement(ae,{level:4,style:{margin:0}},"export data"),visible:i,onCancel:function(){return c(!1)},footer:null},r.a.createElement("div",null,r.a.createElement(f.a,null,r.a.createElement(ae,{level:4,style:{margin:0}},"all your data"),r.a.createElement(ne,{className:"indent"},"export as:")),r.a.createElement("div",{className:"indent"},r.a.createElement("div",{className:"indent"},r.a.createElement(v.a,Object.assign({type:"primary"},o,{onClick:s(),icon:r.a.createElement(ee.a,null)}),"json"),r.a.createElement(v.a,Object.assign({type:"primary"},o,{onClick:s(),icon:r.a.createElement(te.a,null),disabled:!0}),"spreadsheet")))),e.series&&e.records?r.a.createElement("div",{style:{marginTop:16}},r.a.createElement(f.a,null,r.a.createElement(ae,{level:4,style:{margin:0}},e.series.name," data"),r.a.createElement(ne,{className:"indent"},"export as:")),r.a.createElement("div",{className:"indent"},r.a.createElement("div",{className:"indent"},r.a.createElement(v.a,Object.assign({type:"primary"},o,{onClick:l(0,e.series,e.records),icon:r.a.createElement(ee.a,null)}),"json"),r.a.createElement(v.a,Object.assign({type:"primary"},o,{onClick:l(0,e.series,e.records),icon:r.a.createElement(te.a,null),disabled:!0}),"spreadsheet")))):null))},ie=a(393),ce=a(404),se=a(405),le=a(403),oe=a(394),ue=a(107),me=a(119),de=r.a.createContext(void 0),fe=function(e){e.index;var t=Object(me.a)(e,["index"]),a=p.a.useForm(),n=Object(d.a)(a,1)[0];return r.a.createElement(p.a,{form:n,component:!1},r.a.createElement(de.Provider,{value:n},r.a.createElement("tr",t)))},pe=function(e){e.title;var t=e.editable,a=e.children,i=e.dataIndex,c=e.record,s=e.handleSave,l=Object(me.a)(e,["title","editable","children","dataIndex","record","handleSave"]),o=Object(n.useState)(!1),f=Object(d.a)(o,2),v=f[0],h=f[1],b=Object(n.useRef)(null),E=Object(n.useContext)(de);Object(n.useEffect)((function(){v&&b&&b.current&&b.current.focus()}),[v]);var y=function(){h(!v),E.setFieldsValue(Object(ue.a)({},i,c[i]))},g=function(){var e=Object(m.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.validateFields();case 3:a=e.sent,y(),s(Object(D.a)({},c,{},a)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("Save failed:",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),j=a;return t&&(j=v?r.a.createElement(p.a.Item,{style:{margin:0,maxWidth:50},name:i,rules:[{required:!0,message:"\u270f\u261d"}]},r.a.createElement(F.a,{ref:b,onPressEnter:g,onBlur:g})):r.a.createElement("div",{className:"editable-cell-value-wrap",onClick:y},a)),r.a.createElement("td",l,j)},ve=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})},he=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(b.a)(this,Object(E.a)(t).call(this,e))).columns=void 0,a.handleDelete=function(){var e=Object(m.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.records.delete(t);case 2:n=Object(C.a)(a.state.records),a.setState({records:n.filter((function(e){return e.id!==t}))});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.handleSave=function(){var e=Object(m.a)(u.a.mark((function e(t){var n,r,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.records.update(t.id,{amount:t.amount});case 2:n=Object(C.a)(a.state.records),r=n.findIndex((function(e){return t.id===e.id})),i=n[r],n.splice(r,1,Object(D.a)({},i,{},t)),a.setState({records:n});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.columns=[{title:"timestamp",dataIndex:"timestamp",render:ve},{title:"amount",dataIndex:"amount",editable:!0},{title:"",dataIndex:"operation",align:"center",render:function(e,t){return r.a.createElement(ie.a,{title:"Are you sure?",onConfirm:function(){return a.handleDelete(t.id)}},r.a.createElement(le.a,{className:"danger",style:{fontSize:18,color:"#ff4d4f"}}))}}],a.state={records:[],count:0},a}return Object(y.a)(t,e),Object(x.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.records.map((function(e){return Object(D.a)({},e,{id:Number(e.id)})}));this.setState((function(){return{records:e,count:e.length}}))}},{key:"render",value:function(){var e=this,t=this.state.records,a={body:{row:fe,cell:pe}},n=this.columns.map((function(t){return t.editable?Object(D.a)({},t,{onCell:function(a){return{record:a,editable:t.editable,dataIndex:t.dataIndex,title:t.title,handleSave:e.handleSave}}}):t}));return r.a.createElement(oe.a,{size:"small",components:a,rowClassName:function(){return"editable-row"},bordered:!0,dataSource:t,rowKey:"id",columns:n})}}]),t}(n.Component),be=f.a.Title,Ee=f.a.Text,ye=function(e){var t,a=Object(n.useState)(!1),i=Object(d.a)(a,2),c=i[0],s=i[1],l=function(){e.onClose&&e.onClose(),s(!1)},o={style:{margin:"4px"},danger:!0,size:"small",shape:"round"};return r.a.createElement("div",null,r.a.createElement(ce.a,{style:{fontSize:22},onClick:function(){return s(!0)}}),r.a.createElement(Y.a,{title:r.a.createElement(be,{level:4,style:{margin:0}},"manage ",e.series.name," data"),visible:c,onCancel:l,footer:null,style:{top:20}},r.a.createElement("div",null,e.records&&e.records.length>=1?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement(f.a,null,r.a.createElement(be,{level:4},"edit/delete records")),r.a.createElement(he,{series:e.series,records:e.records})),r.a.createElement(H.a,{style:{marginTop:0}}),r.a.createElement("div",null,r.a.createElement(f.a,null,r.a.createElement(be,{level:4,style:{margin:0}},"clear all records"),r.a.createElement(Ee,{className:"indent"},"erase records, start fresh")),r.a.createElement("div",{className:"indent"},r.a.createElement("div",{className:"indent"},r.a.createElement(ie.a,{title:"Are you sure?",onConfirm:(t=e.series,function(){var e=Object(m.a)(u.a.mark((function e(a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.id){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,S.records.where("seriesId").equals(t.id).delete();case 4:l();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},r.a.createElement(v.a,Object.assign({className:"indent"},o,{icon:r.a.createElement(se.a,null)}),"delete records"))))),r.a.createElement(H.a,{style:{margin:"16px 0"}})):null,r.a.createElement("div",null,r.a.createElement(f.a,null,r.a.createElement(be,{level:4,style:{margin:0}},"stop tracking ",e.series.name),r.a.createElement(Ee,{className:"indent"},"erase ",e.series.name," and any records you've created")),r.a.createElement("div",{className:"indent"},r.a.createElement("div",{className:"indent"},r.a.createElement(ie.a,{title:"Are you sure?",onConfirm:function(e){return function(){var t=Object(m.a)(u.a.mark((function t(a){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.id){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,S.records.where("seriesId").equals(e.id).delete();case 4:return t.next=6,S.series.delete(e.id);case 6:l();case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(e.series)},r.a.createElement(v.a,Object.assign({},o,{icon:r.a.createElement(le.a,null)}),"delete ",e.series.name))))))))},ge=f.a.Title,je=function(){var e=Object(n.useRef)(null),t=p.a.useForm(),a=Object(d.a)(t,1)[0],i=Object(n.useState)(),c=Object(d.a)(i,2)[1],s=Object(n.useState)(!0),o=Object(d.a)(s,2),h=o[0],b=o[1],E=Object(n.useState)(),y=Object(d.a)(E,2),g=y[0],j=y[1],O=Object(n.useState)([]),x=Object(d.a)(O,2),k=x[0],I=x[1],N=Object(n.useState)(),T=Object(d.a)(N,2),z=T[0],W=T[1],B=Object(l.g)().id,L=Object(l.f)(),P=function(){var e=Object(m.a)(u.a.mark((function e(t){var a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j(t),a=new w(t.id,t.unitId),e.next=4,a.loadSeriesData();case 4:n=e.sent,a.unit&&W(a.unit.name),b(!1),n.reduce((function(e,t){return e=[].concat(Object(C.a)(e),[t]),I(e),e}),[]);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){I([]),j(void 0),W(void 0),b(!0),c({})};Object(n.useEffect)((function(){var e=function(){var e=Object(m.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.series.toArray();case 2:(t=e.sent)&&t[0]?t[0]&&t[0].id&&(a=t[0].id,L.push("/".concat(a))):L.push("/landing");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(function(){var t=Object(m.a)(u.a.mark((function t(a){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0===a||""===a){t.next=9;break}return t.next=3,S.series.get(Number(a));case 3:if(!(n=t.sent)){t.next=9;break}return R(),t.next=8,P(n);case 8:return t.abrupt("return",t.sent);case 9:return t.next=11,e();case 11:return t.abrupt("return",t.sent);case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}})()(B)}),[B,L]);var V=function(){var e=Object(m.a)(u.a.mark((function e(t){var n,r,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.amount){e.next=2;break}return e.abrupt("return");case 2:return n={seriesId:Number(B),timestamp:(new Date).toISOString(),amount:t.amount},e.next=5,S.records.add(n);case 5:r=e.sent,i=[].concat(Object(C.a)(k),[Object(D.a)({id:r},n)]),I(i),a.resetFields();case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),U=function(){var t=Object(m.a)(u.a.mark((function t(a){var n,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=a.name,r=a.id,t.next=3,S.series.update(Number(B),{unitId:r});case 3:W(n),e&&e.current&&e.current.focus();case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",{style:{paddingTop:"1em"}},r.a.createElement(J.a,{spinning:h,style:{minHeight:240}},r.a.createElement(p.a,{form:a,name:"new_record",layout:"inline",onFinish:V,style:{display:"flex",justifyContent:"space-evenly"}},r.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},g?r.a.createElement($,{width:140,activeSeries:g.id,form:a}):r.a.createElement("div",{style:{width:140}}),z?r.a.createElement(p.a.Item,{name:"amount",rules:[{required:!0,message:"needs value"}],style:{maxWidth:110,margin:"0 4px"}},r.a.createElement(F.a,{type:"number",size:"small",ref:e,suffix:z})):r.a.createElement(X,{width:110,selectionComplete:U}),r.a.createElement(p.a.Item,{shouldUpdate:!0,style:{margin:"0 4px"}},(function(){return r.a.createElement(v.a,{type:"primary",htmlType:"submit",size:"small",shape:"round",disabled:!Boolean(a.getFieldValue("amount"))||Boolean(a.getFieldsError().filter((function(e){return e.errors.length})).length)},"Log")}))),g?r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a.Item,{style:{margin:"0"}},r.a.createElement(ye,{series:g,records:k,onClose:function(){var e=function(){var e=Object(m.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.series.toArray();case 2:(t=e.sent)&&t[0]?t[0]&&t[0].id&&(a=t[0].id,L.push("/".concat(a))):L.push("/landing");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(function(){var t=Object(m.a)(u.a.mark((function t(a){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0===a||""===a){t.next=9;break}return t.next=3,S.series.get(Number(a));case 3:if(!(n=t.sent)){t.next=9;break}return R(),t.next=8,P(n);case 8:return t.abrupt("return",t.sent);case 9:return t.next=11,e();case 11:return t.abrupt("return",t.sent);case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}})()(B)}})),r.a.createElement(p.a.Item,{style:{margin:"0"}},r.a.createElement(re,{series:g,records:k}))):null),r.a.createElement("div",null,k&&k.length>=1?r.a.createElement("div",{id:"overlay-container"},r.a.createElement(A,{records:k,height:190,width:.95*window.innerWidth,lineColor:"rgba(6, 85, 231, .8)"}),1===k.length?r.a.createElement("div",{id:"overlay"},r.a.createElement(f.a,null,r.a.createElement(ge,{level:4,style:{color:"rgba(240, 240, 240, .8)",position:"relative",top:24,left:56}},r.a.createElement("span",{role:"img","aria-label":"finger pointing"},"\ud83d\udc48")," nice."),r.a.createElement(ge,{level:4,style:{color:"rgba(240, 240, 240, .8)",position:"relative",top:16,left:80}},"add another to see a trend"))):null):h?null:r.a.createElement(q,{width:.95*window.innerWidth,height:190,animated:!1,lineColor:"rgba(240, 240, 240, .1)",overlay:"start your chart \u261d!",overlayColor:"rgba(240, 240, 240, .8)"}))))};var Oe=function(){return r.a.createElement(s.a,null,r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/landing"},r.a.createElement(M,null)),r.a.createElement(l.a,{path:"/:id?"},r.a.createElement(je,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Oe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[207,1,2]]]);
//# sourceMappingURL=main.28656f62.chunk.js.map