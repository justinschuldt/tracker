(this.webpackJsonptracker=this.webpackJsonptracker||[]).push([[0],{136:function(e,a,t){e.exports=t.p+"static/media/logo.5d5d9eef.svg"},165:function(e,a,t){e.exports=t(343)},170:function(e,a,t){},172:function(e,a,t){},184:function(e,a,t){},343:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(3),c=t.n(l),o=(t(170),t(60),t(18)),i=t(136),m=t.n(i),s=(t(172),t(59)),u=t(39),E=function(){return r.a.createElement("h1",null,"Landing")},p=(t(344),t(161)),f=(t(176),t(153)),d=t(164),b=(t(178),t(162)),g=(t(180),t(163)),h=(t(109),t(108)),v=(t(345),t(27)),y=t(107),w=t(347),F=t(348),k=(t(184),{labelCol:{span:8},wrapperCol:{span:16}}),C={wrapperCol:{offset:4,span:16}},O=function(e){var a=e.visible,t=e.onCancel,l=v.a.useForm(),c=Object(y.a)(l,1)[0],o=Object(n.useRef)();Object(n.useEffect)((function(){o.current=a}),[a]);var i=o.current;Object(n.useEffect)((function(){console.log("visible: ".concat(a,", prevVisible: ").concat(i)),!a&&i&&c.resetFields()}),[a]);return r.a.createElement(b.a,{title:"Basic Drawer",visible:a,onOk:function(){c.submit()},onCancel:t},r.a.createElement(v.a,{form:c,layout:"vertical",name:"userForm"},r.a.createElement(v.a.Item,{name:"name",label:"User Name",rules:[{required:!0}]},r.a.createElement(h.a,null)),r.a.createElement(v.a.Item,{name:"age",label:"User Age",rules:[{required:!0}]},r.a.createElement(g.a,null))))},j=function(){var e=Object(n.useState)(!1),a=Object(y.a)(e,2),t=a[0],l=a[1];return r.a.createElement("div",null,r.a.createElement(v.a.Provider,{onFormFinish:function(e,a){var t=a.values,n=a.forms;if("userForm"===e){var r=n.basicForm,c=r.getFieldValue("users")||[];r.setFieldsValue({users:[].concat(Object(d.a)(c),[t])}),l(!1)}}},r.a.createElement(v.a,Object.assign({},k,{name:"basicForm",onFinish:function(e){console.log("Finish:",e)}}),r.a.createElement(v.a.Item,{name:"group",label:"Group Name",rules:[{required:!0}]},r.a.createElement(h.a,null)),r.a.createElement(v.a.Item,{label:"User List",shouldUpdate:function(e,a){return e.users!==a.users}},(function(e){var a=(0,e.getFieldValue)("users")||[];return a.length?r.a.createElement("ul",null,a.map((function(e,a){return r.a.createElement("li",{key:a,className:"user"},r.a.createElement(f.a,{icon:r.a.createElement(w.a,null)}),e.name," - ",e.age)}))):r.a.createElement(p.a.Text,{className:"ant-form-text",type:"secondary"},"( ",r.a.createElement(F.a,null)," No user yet. )")})),r.a.createElement(v.a.Item,C,r.a.createElement(o.a,{htmlType:"submit",type:"primary"},"Submit"),r.a.createElement(o.a,{htmlType:"button",style:{marginLeft:8},onClick:function(){l(!0)}},"Add User"))),r.a.createElement(O,{visible:t,onCancel:function(){l(!1)}})))},N=function(e){return console.log(e.match.params.id),r.a.createElement("h1",null,"Category details container")};var A=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:m.a,className:"App-logo",alt:"logo"}),r.a.createElement(o.a,{type:"primary"},"Ant design Button!"),r.a.createElement(s.a,null,r.a.createElement("div",null,r.a.createElement("nav",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(s.b,{to:"/"},"Landing")),r.a.createElement("li",null,r.a.createElement(s.b,{to:"/new"},"new")),r.a.createElement("li",null,r.a.createElement(s.b,{to:"/category/7"},"Category")))),r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"/category/:id",component:N}),r.a.createElement(u.a,{path:"/new"},r.a.createElement(j,null)),r.a.createElement(u.a,{path:"/"},r.a.createElement(E,null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[165,1,2]]]);
//# sourceMappingURL=main.f71e9826.chunk.js.map