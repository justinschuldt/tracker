(this.webpackJsonptracker=this.webpackJsonptracker||[]).push([[0],{211:function(e,t,a){e.exports=a(411)},216:function(e,t,a){},228:function(e,t,a){},372:function(e,t,a){},411:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(5),s=a.n(i),c=(a(216),a(79)),l=a(63),o=(a(43),a(12)),u=a(3),m=a.n(u),d=a(11),p=(a(56),a(14)),f=a(4),v=(a(84),a(16)),h=a(57),b=a(121),E=a(108),g=a(123),O=a(183),j=function e(t,a,n){Object(h.a)(this,e),this.id=void 0,this.timestamp=void 0,this.name=void 0,this.name=t,n&&(this.id=n),this.timestamp=a||(new Date).toISOString()},y=function(){var e=Object(d.a)(m.a.mark((function e(t,a){var n,r,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.units.get({name:a});case 2:if(!(n=e.sent)||!n.id){e.next=5;break}return e.abrupt("return",n.id);case 5:return r=(new Date).toISOString(),e.next=8,t.units.add({name:a,timestamp:r});case 8:return i=e.sent,e.abrupt("return",i);case 10:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),x=a(23),w=a(110),S=function(){function e(t,a,n,r,i){Object(h.a)(this,e),this.id=void 0,this.timestamp=void 0,this.name=void 0,this.unitId=void 0,this.unitName=void 0,this.unit=void 0,this.records=void 0,this.name=t,r&&(this.id=r),n&&(this.unitId=n),this.timestamp=i||(new Date).toISOString(),a&&(this.unitName=a),Object.defineProperties(this,{records:{value:[],enumerable:!1,writable:!0}})}return Object(w.a)(e,[{key:"loadSeriesData",value:function(){var e=Object(d.a)(m.a.mark((function e(){var t,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.id&&this.unitId){e.next=2;break}return e.abrupt("return",[]);case 2:return e.next=4,Promise.all([k.units.where("id").equals(this.unitId).first(),k.records.where("seriesId").equals(this.id).toArray()]);case 4:return t=e.sent,a=Object(f.a)(t,2),this.unit=a[0],this.records=a[1],e.abrupt("return",this.records||[]);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"save",value:function(){var e=this;return k.transaction("rw",k.units,k.series,k.records,Object(d.a)(m.a.mark((function t(){var a,n,r,i;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=e.unitName,a=String(a),n=e.unitId){t.next=16;break}return t.next=6,k.units.where("name").equals(a).first();case 6:if(!(r=t.sent)){t.next=11;break}n=r.id,t.next=15;break;case 11:return t.next=13,k.units.add(new j(a));case 13:i=t.sent,n=i;case 15:e.unitId=n;case 16:return t.next=18,k.series.put(Object(x.a)({},e,{unitId:1}));case 18:e.id=t.sent;case 19:case"end":return t.stop()}}),t)}))))}}]),e}(),k=new(function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(b.a)(this,Object(E.a)(t).call(this,"TrackerDatabase"))).series=void 0,e.units=void 0,e.records=void 0,e.version(1).stores({series:"++id, timestamp, name, unitId",units:"++id, timestamp, name",records:"++id, timestamp, seriesId, amount"}),e.series=e.table("series"),e.units=e.table("units"),e.records=e.table("records"),e.series.mapToClass(S),e.units.mapToClass(j),e}return Object(g.a)(t,e),t}(O.a)),I=(a(155),a(192)),C=(a(65),a(35)),N=(a(95),a(39)),F=a(33),T=a(149),D=a.n(T),z=function(e){var t=Object(n.useState)([]),a=Object(f.a)(t,2),i=a[0],s=a[1],c=Object(n.useState)(),l=Object(f.a)(c,2),o=l[0],u=l[1];return D.a.Animate.registerAnimation("lineUpdate",(function(e,t){for(var a=e.get("cacheShape").attrs,n=a.points,r=e.attr("points"),i=n.length,s=r.length-i,c=r[r.length-1],l=0;l<s;l++)n.push(c);e.attr(a),e.animate().to({attrs:{points:r},duration:2e3,easing:t.easing})})),Object(n.useEffect)((function(){if(!o){var t=new D.a.Chart({id:"mountNode",pixelRatio:window.devicePixelRatio}),a=e.lineColor?e.lineColor:"#fff",n=e.records.map((function(e){return Object(x.a)({},e,{amount:Number(e.amount)})}));s(n),t.source(n,{timestamp:{type:"timeCat",mask:"MM/DD",tickCount:3,range:[0,1]},amount:{tickCount:5,min:0,alias:"amount"}}),t.axis("time",{label:function(e,t,a){var n={};return 0===t?n.textAlign="left":t===a-1&&(n.textAlign="right"),n}}),t.tooltip({showCrosshairs:!0}),t.line().position("timestamp*amount").shape("smooth").animate({update:{animation:"lineUpdate"}}).color(a),t.point().position("timestamp*amount").shape("smooth").style({stroke:a,fill:a,lineWidth:1}),t.render(),u(t)}}),[e.lineColor,e.records,o]),Object(n.useEffect)((function(){!function(e){var t=Object(x.a)({},e,{amount:Number(e.amount)});s((function(e){return[].concat(Object(F.a)(e),[t])}))}(e.records[e.records.length-1])}),[e.records]),r.a.createElement("div",{id:"container"},r.a.createElement("canvas",{id:"mountNode",height:e.height,width:e.width}),o&&i?o.changeData(i):null)},A=(a(228),v.a.Title),q=function(e){return new Promise((function(t){return setTimeout(t,e)}))},P=[1,2,1,3,2,4,2,3,4,6,7,9,13],W=function(e){var t=p.a.useForm(),a=Object(f.a)(t,1)[0],i=Object(n.useState)(),s=Object(f.a)(i,2)[1],c=Object(n.useState)(!1),l=Object(f.a)(c,2),u=l[0],h=l[1],b=Object(n.useState)([]),E=Object(f.a)(b,2),g=E[0],O=E[1],j=Object(n.useState)(0),y=Object(f.a)(j,2),x=y[0],w=y[1],S=Object(n.useState)(!1),k=Object(f.a)(S,2),T=k[0],D=k[1],W=function(e,t){var a={id:t,seriesId:1,timestamp:(new Date).toISOString(),amount:e};O((function(e){return[].concat(Object(F.a)(e),[a])})),w(t+1)};Object(n.useEffect)((function(){s({});var e=P[0],t=P.slice(1);W(e,0);var n,r=t.map((n=4e3,function(e,t){return setTimeout(Object(d.a)(m.a.mark((function n(){var r;return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t+1,a.setFieldsValue({amount:e}),n.next=4,q(800);case 4:return h(!0),W(e,r),n.next=8,q(600);case 8:a.setFieldsValue({amount:void 0}),h(!1);case 10:case"end":return n.stop()}}),n)}))),n*(t+1))})),i=4e3*(P.length+1);return r.push(setInterval((function(){return D(!0)}),i)),function(){r.map(clearInterval)}}),[a]);return r.a.createElement(r.a.Fragment,null,e.showForm?r.a.createElement(p.a,{form:a,name:"demo_flow",layout:"inline",onFinish:function(e){e.amount&&(W(Number(e.amount),x),a.resetFields(),D(!1))}},r.a.createElement(p.a.Item,{name:"seriesName",style:{margin:"0 8px"}},r.a.createElement(N.a,{size:"small",style:{maxWidth:160,minWidth:120},bordered:!1,defaultValue:"running",options:[{label:"running",value:"1"}],optionFilterProp:"children"})),r.a.createElement(I.a,{content:"Try me!",visible:T},r.a.createElement(p.a.Item,{name:"amount",rules:[{required:!0,message:"required"}],style:{maxWidth:70,margin:"0 8px"}},r.a.createElement(C.a,{size:"small",placeholder:"miles"}))),r.a.createElement(p.a.Item,{shouldUpdate:!0,style:{margin:"0 8px"}},(function(){return r.a.createElement(o.a,{size:"small",type:"primary",shape:"round",htmlType:"submit",loading:u,disabled:u||!Boolean(a.getFieldValue("amount"))},"Log")}))):null,g&&g.length>=1?r.a.createElement("div",{id:"overlay-container"},r.a.createElement(z,{records:g,height:e.height,width:e.width,lineColor:e.lineColor}),e.overlay?r.a.createElement("div",{id:"overlay",className:"overlay-flex-container"},r.a.createElement(v.a,null,r.a.createElement(A,{level:4,style:{color:e.lineColor}},e.overlay))):null):null)};function B(e){var t=e.name,a=e.id;return{label:t,value:Number(a)}}var R=function(e,t){var a=(new Date).toISOString(),n="".concat(e,"_").concat(a,".json"),r=new Blob([JSON.stringify(t,void 0,2)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(r),i.download=n,i.click()},V=[["running","miles"],["coffee consumption","cups"],["pushups","reps"],["alcohol","drinks"],["meditation","minutes"],["snacks eaten","serving"],["anerobic exercise","minutes"],["TV watched","hours"],["walking","miles"]],U=function(){var e=Object(n.useState)(V[0][0]),t=Object(f.a)(e,2),a=t[0],i=t[1],s=Object(n.useState)(V[0][1]),c=Object(f.a)(s,2),l=c[0],o=c[1];return function(e,t){var a=Object(n.useRef)();Object(n.useEffect)((function(){a.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){a&&a.current&&a.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){!function(e){var t=e.findIndex((function(e){return e[0]===a}))+1;if(t>=e.length)return i(e[0][0]),void o(e[0][1]);var n=e[t];i(n[0]),o(n[1])}(V)}),3e3),r.a.createElement(n.Fragment,null,r.a.createElement(p.a.Item,{name:"seriesName",rules:[{required:!0,message:"Please input something"}],style:{width:110,margin:"0 8px"}},r.a.createElement(C.a,{size:"small",placeholder:a})),r.a.createElement(p.a.Item,{name:"unitName",rules:[{required:!0,message:"Please input something"}],style:{width:90,margin:"0 8px"}},r.a.createElement(C.a,{size:"small",placeholder:l})))},L=(a(372),v.a.Title),_=function(){var e=p.a.useForm(),t=Object(f.a)(e,1)[0],a=Object(l.f)(),i=Object(n.useState)(),s=Object(f.a)(i,2)[1],u=Object(n.useState)([]),h=Object(f.a)(u,2),b=h[0],E=h[1],g=function(){var e=Object(d.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.series.toArray();case 2:t=e.sent,E(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(n.useEffect)((function(){s({}),g()}),[]);var O=function(){var e=Object(d.a)(m.a.mark((function e(t){var n,r,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.seriesName&&t.unitName){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,y(k,t.unitName);case 4:return n=e.sent,r={name:t.seriesName,timestamp:(new Date).toISOString(),unitId:n},e.next=8,k.series.add(r);case 8:i=e.sent,a.push("/series-details/".concat(i));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{marginTop:"8px"}},r.a.createElement("div",{className:"indent"},r.a.createElement(v.a,null,r.a.createElement(L,{level:2},"simple habit tracking"),r.a.createElement("ul",{style:{listStyle:"none"}},r.a.createElement("li",null,r.a.createElement("span",{role:"img","aria-label":"woman scientist"},"\ud83d\udc69\u200d\ud83d\udd2c")," decide what you want to track"),r.a.createElement("li",null,r.a.createElement("span",{role:"img","aria-label":"clipboard"},"\ud83d\udccb")," use this app to log data"),r.a.createElement("li",null,r.a.createElement("span",{role:"img","aria-label":"chart upwards"},"\ud83d\udcc8")," see charts about your behavior"))))),r.a.createElement("div",{style:{marginTop:"8px"}},r.a.createElement("div",{className:"indent"},r.a.createElement(v.a,null,r.a.createElement(L,{level:2},"demo")),r.a.createElement("div",{className:"indent"},r.a.createElement("div",{style:{minHeight:200}},r.a.createElement(W,{height:170,showForm:!0,lineColor:"rgba(6, 85, 231, .6)"}))))),r.a.createElement("div",{style:{marginTop:"8px"}},r.a.createElement("div",{className:"indent"},r.a.createElement(v.a,null,r.a.createElement(L,{level:2},"get started")),r.a.createElement("div",{className:"indent"},r.a.createElement(v.a,null,r.a.createElement(L,{level:4},"what do you want to track?")),r.a.createElement("div",{className:"indent"},r.a.createElement(p.a,{form:t,name:"landing_series_creation",layout:"inline",onFinish:O},r.a.createElement(U,null),r.a.createElement(p.a.Item,{shouldUpdate:!0,style:{margin:"0 8px"}},(function(){return r.a.createElement(o.a,{type:"primary",htmlType:"submit",size:"small",shape:"round",disabled:!t.isFieldsTouched(!0)||Boolean(t.getFieldsError().filter((function(e){return e.errors.length})).length)},"Start")}))))))),b&&b[0]&&b[0].id?r.a.createElement("div",{style:{marginTop:24,display:"flex",justifyContent:"center"}},r.a.createElement(c.b,{to:"/series-details/".concat(b[0].id)},"Go to records")):null)},J=(a(179),a(119)),M=(a(146),a(69)),H=a(413),G=C.a.Search,K=function(e){var t=Object(n.useState)([]),a=Object(f.a)(t,2),i=a[0],s=a[1],c=Object(n.useState)([]),o=Object(f.a)(c,2),u=o[0],v=o[1],h=Object(n.useState)(),b=Object(f.a)(h,2),E=b[0],g=b[1],O=Object(n.useState)(),j=Object(f.a)(O,2),y=j[0],x=j[1],w=Object(l.f)();Object(n.useEffect)((function(){S(e.activeSeries)}),[e.activeSeries]);var S=function(){var e=Object(d.a)(m.a.mark((function e(t){var a,n,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.series.toArray();case 2:a=e.sent,s(a),n=a.map(B),(r=a.find((function(e){return e.id===Number(t)})))&&g(r),v(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var I=function(e){x(e.target.value)},C=function(){var t=Object(d.a)(m.a.mark((function t(){var a,n,r,c,l;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!y){t.next=14;break}return a=(new Date).toISOString(),n=String(y),t.next=5,k.series.add({name:n,timestamp:a});case 5:r=t.sent,c=[].concat(Object(F.a)(i),[{id:r,name:n,timestamp:a}]),s(c),l=c.map(B),v(l),g({id:r,name:n,timestamp:a}),x(void 0),e.form.setFieldsValue({seriesId:r}),w.push("/series-details/".concat(r));case 14:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return u&&u.length>=1?r.a.createElement(p.a.Item,{name:"seriesId",style:{margin:"0 4px 0 0"}},r.a.createElement(N.a,{size:"small",style:{width:e.width},bordered:!1,onChange:function(e){w.push("/series-details/".concat(e))},options:u,value:String(null===E||void 0===E?void 0:E.id),defaultValue:String(null===E||void 0===E?void 0:E.name),dropdownRender:function(e){return r.a.createElement("div",null,e,r.a.createElement(M.a,{style:{margin:"4px 0"}}),r.a.createElement("div",{style:{display:"flex",flexWrap:"nowrap",padding:8}},r.a.createElement(G,{size:"small",value:y,onChange:I,placeholder:"meditation",onPressEnter:C,onSearch:C,enterButton:r.a.createElement(H.a,null)})))}})):r.a.createElement("div",{style:{width:e.width}})},$=C.a.Search,Q=function(e){var t=Object(n.useState)(),a=Object(f.a)(t,2),i=a[0],s=a[1],c=Object(n.useState)([]),l=Object(f.a)(c,2),o=l[0],u=l[1],v=Object(n.useState)([]),h=Object(f.a)(v,2),b=h[0],E=h[1];Object(n.useEffect)((function(){g()}),[]);var g=function(){var e=Object(d.a)(m.a.mark((function e(){var t,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.units.toArray();case 2:t=e.sent,a=t.map(B),E(t),u(a);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(e){s(e.target.value)},j=function(){var t=Object(d.a)(m.a.mark((function t(){var a,n,r,c,l,o;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!i){t.next=13;break}return a=(new Date).toISOString(),n={name:String(i),timestamp:a},t.next=5,k.units.add(n);case 5:r=t.sent,c=Object(x.a)({},n,{id:r}),l=[].concat(Object(F.a)(b),[c]),o=l.map(B),E(l),u(o),s(void 0),e.selectionComplete(c);case 13:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return r.a.createElement(p.a.Item,{name:"unit",rules:[{required:!0,message:"Please choose a unit"}],style:{margin:"0 4px"}},r.a.createElement(N.a,{size:"small",style:{width:e.width},placeholder:"unit",onChange:function(t){var a=b.find((function(e){return e.id===t}));a&&e.selectionComplete(Object(x.a)({},a,{id:t}))},dropdownRender:function(e){return r.a.createElement("div",null,e,r.a.createElement(M.a,{style:{margin:"4px 0"}}),r.a.createElement("div",{style:{display:"flex",flexWrap:"nowrap",padding:8}},r.a.createElement($,{size:"small",value:i,onChange:O,placeholder:"session",onPressEnter:j,onSearch:j,enterButton:r.a.createElement(H.a,null)})))},options:o}))},X=(a(180),a(120)),Y=a(414),Z=a(415),ee=a(416),te=v.a.Title,ae=v.a.Text,ne=function(e){var t=Object(n.useState)(!1),a=Object(f.a)(t,2),i=a[0],s=a[1],c=function(e){return function(){var e=Object(d.a)(m.a.mark((function e(t){var a,n,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.units.toArray();case 2:return a=e.sent,e.next=5,k.series.toArray();case 5:return n=e.sent,e.next=8,k.records.toArray();case 8:r=e.sent,R("full-data-export",{units:a,series:n,records:r});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},l=function(e,t,a){return function(){var e=Object(d.a)(m.a.mark((function e(n){var r,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=void 0,!t.unitId){e.next=5;break}return e.next=4,k.units.where("id").equals(t.unitId).first();case 4:r=e.sent;case 5:i={series:t,records:a,unit:r},R(t.name,i);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},u={style:{margin:"4px"},type:"primary",size:"small",shape:"round"};return r.a.createElement("div",null,r.a.createElement(Y.a,{style:{fontSize:22},onClick:function(){return s(!0)}}),r.a.createElement(X.a,{title:r.a.createElement(te,{level:4,style:{margin:0}},"export data"),visible:i,onCancel:function(){return s(!1)},footer:null},r.a.createElement("div",null,r.a.createElement(v.a,null,r.a.createElement(te,{level:4,style:{margin:0}},"all your data"),r.a.createElement(ae,{className:"indent"},"export as:")),r.a.createElement("div",{className:"indent"},r.a.createElement("div",{className:"indent"},r.a.createElement(o.a,Object.assign({type:"primary"},u,{onClick:c(),icon:r.a.createElement(Z.a,null)}),"json"),r.a.createElement(o.a,Object.assign({type:"primary"},u,{onClick:c(),icon:r.a.createElement(ee.a,null),disabled:!0}),"spreadsheet")))),e.series&&e.records?r.a.createElement("div",{style:{marginTop:16}},r.a.createElement(v.a,null,r.a.createElement(te,{level:4,style:{margin:0}},e.series.name," data"),r.a.createElement(ae,{className:"indent"},"export as:")),r.a.createElement("div",{className:"indent"},r.a.createElement("div",{className:"indent"},r.a.createElement(o.a,Object.assign({type:"primary"},u,{onClick:l(0,e.series,e.records),icon:r.a.createElement(Z.a,null)}),"json"),r.a.createElement(o.a,Object.assign({type:"primary"},u,{onClick:l(0,e.series,e.records),icon:r.a.createElement(ee.a,null),disabled:!0}),"spreadsheet")))):null))},re=(a(182),a(92)),ie=a(418),se=a(419),ce=a(417),le=(a(412),a(210)),oe=a(109),ue=a(125),me=r.a.createContext(void 0),de=function(e){e.index;var t=Object(ue.a)(e,["index"]),a=p.a.useForm(),n=Object(f.a)(a,1)[0];return r.a.createElement(p.a,{form:n,component:!1},r.a.createElement(me.Provider,{value:n},r.a.createElement("tr",t)))},pe=function(e){e.title;var t=e.editable,a=e.children,i=e.dataIndex,s=e.record,c=e.handleSave,l=Object(ue.a)(e,["title","editable","children","dataIndex","record","handleSave"]),o=Object(n.useState)(!1),u=Object(f.a)(o,2),v=u[0],h=u[1],b=Object(n.useRef)(null),E=Object(n.useContext)(me);Object(n.useEffect)((function(){v&&b&&b.current&&b.current.focus()}),[v]);var g=function(){h(!v),E.setFieldsValue(Object(oe.a)({},i,s[i]))},O=function(){var e=Object(d.a)(m.a.mark((function e(t){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.validateFields();case 3:a=e.sent,g(),c(Object(x.a)({},s,{},a)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("Save failed:",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),j=a;return t&&(j=v?r.a.createElement(p.a.Item,{style:{margin:0,maxWidth:50},name:i,rules:[{required:!0,message:"\u270f\u261d"}]},r.a.createElement(C.a,{ref:b,onPressEnter:O,onBlur:O})):r.a.createElement("div",{className:"editable-cell-value-wrap",onClick:g},a)),r.a.createElement("td",l,j)},fe=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})},ve=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(b.a)(this,Object(E.a)(t).call(this,e))).columns=void 0,a.handleDelete=function(){var e=Object(d.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.records.delete(t);case 2:n=Object(F.a)(a.state.records),a.setState({records:n.filter((function(e){return e.id!==t}))});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.handleSave=function(){var e=Object(d.a)(m.a.mark((function e(t){var n,r,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.records.update(t.id,{amount:t.amount});case 2:n=Object(F.a)(a.state.records),r=n.findIndex((function(e){return t.id===e.id})),i=n[r],n.splice(r,1,Object(x.a)({},i,{},t)),a.setState({records:n});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.columns=[{title:"timestamp",dataIndex:"timestamp",render:fe},{title:"amount",dataIndex:"amount",editable:!0},{title:"",dataIndex:"operation",align:"center",render:function(e,t){return r.a.createElement(re.a,{title:"Are you sure?",onConfirm:function(){return a.handleDelete(t.id)}},r.a.createElement(ce.a,{className:"danger",style:{fontSize:18,color:"#ff4d4f"}}))}}],a.state={records:[],count:0},a}return Object(g.a)(t,e),Object(w.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.records.map((function(e){return Object(x.a)({},e,{id:Number(e.id)})}));this.setState((function(){return{records:e,count:e.length}}))}},{key:"render",value:function(){var e=this,t=this.state.records,a={body:{row:de,cell:pe}},n=this.columns.map((function(t){return t.editable?Object(x.a)({},t,{onCell:function(a){return{record:a,editable:t.editable,dataIndex:t.dataIndex,title:t.title,handleSave:e.handleSave}}}):t}));return r.a.createElement(le.a,{size:"small",components:a,rowClassName:function(){return"editable-row"},bordered:!0,dataSource:t,rowKey:"id",columns:n})}}]),t}(n.Component),he=v.a.Title,be=v.a.Text,Ee=function(e){var t,a=Object(n.useState)(!1),i=Object(f.a)(a,2),s=i[0],c=i[1],l=function(){e.onClose&&e.onClose(),c(!1)},u={style:{margin:"4px"},danger:!0,size:"small",shape:"round"};return r.a.createElement("div",null,r.a.createElement(ie.a,{style:{fontSize:22},onClick:function(){return c(!0)}}),r.a.createElement(X.a,{title:r.a.createElement(he,{level:4,style:{margin:0}},"manage ",e.series.name," data"),visible:s,onCancel:l,footer:null,style:{top:20}},r.a.createElement("div",null,e.records&&e.records.length>=1?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement(v.a,null,r.a.createElement(he,{level:4},"edit/delete records")),r.a.createElement(ve,{series:e.series,records:e.records})),r.a.createElement(M.a,{style:{marginTop:0}}),r.a.createElement("div",null,r.a.createElement(v.a,null,r.a.createElement(he,{level:4,style:{margin:0}},"clear all records"),r.a.createElement(be,{className:"indent"},"erase records, start fresh")),r.a.createElement("div",{className:"indent"},r.a.createElement("div",{className:"indent"},r.a.createElement(re.a,{title:"Are you sure?",onConfirm:(t=e.series,function(){var e=Object(d.a)(m.a.mark((function e(a){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.id){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,k.records.where("seriesId").equals(t.id).delete();case 4:l();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},r.a.createElement(o.a,Object.assign({className:"indent"},u,{icon:r.a.createElement(se.a,null)}),"delete records"))))),r.a.createElement(M.a,{style:{margin:"16px 0"}})):null,r.a.createElement("div",null,r.a.createElement(v.a,null,r.a.createElement(he,{level:4,style:{margin:0}},"stop tracking ",e.series.name),r.a.createElement(be,{className:"indent"},"erase ",e.series.name," and any records you've created")),r.a.createElement("div",{className:"indent"},r.a.createElement("div",{className:"indent"},r.a.createElement(re.a,{title:"Are you sure?",onConfirm:function(e){return function(){var t=Object(d.a)(m.a.mark((function t(a){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.id){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,k.records.where("seriesId").equals(e.id).delete();case 4:return t.next=6,k.series.delete(e.id);case 6:l();case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(e.series)},r.a.createElement(o.a,Object.assign({},u,{icon:r.a.createElement(ce.a,null)}),"delete ",e.series.name))))))))},ge=v.a.Title,Oe=function(){var e=Object(n.useRef)(null),t=p.a.useForm(),a=Object(f.a)(t,1)[0],i=Object(n.useState)(),s=Object(f.a)(i,2)[1],c=Object(n.useState)(!0),u=Object(f.a)(c,2),h=u[0],b=u[1],E=Object(n.useState)(),g=Object(f.a)(E,2),O=g[0],j=g[1],y=Object(n.useState)([]),w=Object(f.a)(y,2),I=w[0],N=w[1],T=Object(n.useState)(),D=Object(f.a)(T,2),A=D[0],q=D[1],P=Object(l.g)().id,B=Object(l.f)(),R=function(){var e=Object(d.a)(m.a.mark((function e(t){var a,n,r,i,s,c;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,n=t.timestamp,r=t.name,i=t.unitId,j(t),s=new S(r,void 0,i,a,n),e.next=5,s.loadSeriesData();case 5:c=e.sent,s.unit&&q(s.unit.name),b(!1),c.reduce((function(e,t){return e=[].concat(Object(F.a)(e),[t]),N(e),e}),[]);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),V=function(){e&&e.current&&e.current.focus()};Object(n.useEffect)((function(){var t=function(){var a=Object(d.a)(m.a.mark((function a(n){var r,i;return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return N([]),j(void 0),q(void 0),b(!0),s({}),a.next=7,k.series.get(Number(n));case 7:if(r=a.sent,n&&r){a.next=15;break}return a.next=11,k.series.toArray();case 11:return(i=a.sent)&&i[0]||B.push("/"),i[0]&&i[0].id&&(n=i[0].id,r=i[0],B.replace("/series-details/".concat(n)),t(n)),a.abrupt("return");case 15:return a.next=17,R(r);case 17:e&&e.current&&e.current.focus();case 18:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();t(P)}),[P,B]);var U=function(){var e=Object(d.a)(m.a.mark((function e(t){var n,r,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.amount){e.next=2;break}return e.abrupt("return");case 2:return n={seriesId:Number(P),timestamp:(new Date).toISOString(),amount:t.amount},e.next=5,k.records.add(n);case 5:r=e.sent,i=[].concat(Object(F.a)(I),[Object(x.a)({id:r},n)]),N(i),a.resetFields(),V();case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(){var e=Object(d.a)(m.a.mark((function e(t){var a,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.name,n=t.id,e.next=3,k.series.update(Number(P),{unitId:n});case 3:q(a);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{style:{marginTop:"8px"}},r.a.createElement(J.a,{spinning:h,style:{minHeight:240}},r.a.createElement(p.a,{form:a,name:"new_record",layout:"inline",onFinish:U,style:{display:"flex",justifyContent:"space-evenly"}},r.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},O?r.a.createElement(K,{width:140,activeSeries:String(O.id),form:a}):r.a.createElement("div",{style:{width:140}}),A?r.a.createElement(p.a.Item,{name:"amount",rules:[{required:!0,message:"needs value"}],style:{maxWidth:110,margin:"0 4px"}},r.a.createElement(C.a,{size:"small",ref:e,suffix:A})):r.a.createElement(Q,{width:110,selectionComplete:L}),r.a.createElement(p.a.Item,{shouldUpdate:!0,style:{margin:"0 4px"}},(function(){return r.a.createElement(o.a,{type:"primary",htmlType:"submit",size:"small",shape:"round",disabled:!Boolean(a.getFieldValue("amount"))||Boolean(a.getFieldsError().filter((function(e){return e.errors.length})).length)},"Log")}))),O?r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a.Item,{style:{margin:"0"}},r.a.createElement(Ee,{series:O,records:I,onClose:function(e){var t=function(){var e=Object(d.a)(m.a.mark((function e(a){var n,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return N([]),j(void 0),q(void 0),b(!0),s({}),e.next=7,k.series.get(Number(a));case 7:if(n=e.sent,a&&n){e.next=15;break}return e.next=11,k.series.toArray();case 11:return(r=e.sent)&&r[0]||B.push("/"),r[0]&&r[0].id&&(a=r[0].id,n=r[0],B.replace("/series-details/".concat(a)),t(a)),e.abrupt("return");case 15:return e.next=17,R(n);case 17:V();case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t(e||P)}})),r.a.createElement(p.a.Item,{style:{margin:"0"}},r.a.createElement(ne,{series:O,records:I}))):null),r.a.createElement("div",null,I&&I.length>=1?r.a.createElement("div",{id:"overlay-container"},r.a.createElement(z,{records:I,height:190,width:window.innerWidth,lineColor:"rgba(6, 85, 231, .8)"}),1===I.length?r.a.createElement("div",{id:"overlay"},r.a.createElement(v.a,null,r.a.createElement(ge,{level:4,style:{color:"rgba(61, 61, 61, .3)",position:"relative",top:24,left:56}},r.a.createElement("span",{role:"img","aria-label":"finger pointing"},"\ud83d\udc48")," nice."),r.a.createElement(ge,{level:4,style:{color:"rgba(61, 61, 61, .3)",position:"relative",top:16,left:80}},"add another to see a trend"))):null):r.a.createElement(W,{width:window.innerWidth,height:190,lineColor:"rgba(61, 61, 61, .3)",overlay:"start your chart \u261d!"}))))};var je=function(){return r.a.createElement(c.a,null,r.a.createElement(l.c,null,r.a.createElement(l.a,{path:"/series-details/:id"},r.a.createElement(Oe,null)),r.a.createElement(l.a,{path:"/"},r.a.createElement(_,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(je,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[211,1,2]]]);
//# sourceMappingURL=main.c7ecc579.chunk.js.map