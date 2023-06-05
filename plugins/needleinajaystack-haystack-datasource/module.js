define(["@grafana/data","@grafana/runtime","rxjs","react","@grafana/ui"],((e,t,r,n,a)=>(()=>{"use strict";var o={305:t=>{t.exports=e},545:e=>{e.exports=t},388:e=>{e.exports=a},650:e=>{e.exports=n},177:e=>{e.exports=r}},l={};function i(e){var t=l[e];if(void 0!==t)return t.exports;var r=l[e]={exports:{}};return o[e](r,r.exports,i),r.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var u={};return(()=>{i.r(u),i.d(u,{plugin:()=>D});var e=i(305),t=i(545);function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class n{constructor(e){r(this,"type","ops"),r(this,"eval",""),r(this,"hisRead",""),r(this,"hisReadFilter",""),r(this,"read",""),r(this,"refId",void 0),this.refId=e}}const a={type:"eval",eval:"[{ts: $__timeRange_start, v0: 0}, {ts: $__timeRange_end, v0: 10}].toGrid",hisRead:"abcdef-123456",hisReadFilter:"point and his and temp and air and outside",read:"equip and ahu"};var o=i(177);function l(e,t,r,n,a,o,l){try{var i=e[o](l),u=i.value}catch(e){return void r(e)}i.done?t(u):Promise.resolve(u).then(n,a)}function c(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function i(e){l(o,n,a,i,u,"next",e)}function u(e){l(o,n,a,i,u,"throw",e)}i(void 0)}))}}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const d=[{label:"Eval",value:"eval",apiRequirements:["eval"],description:"Evaluate an Axon expression"},{label:"HisRead",value:"hisRead",apiRequirements:["hisRead"],description:"Read the history of a point"},{label:"HisRead via filter",value:"hisReadFilter",apiRequirements:["read","hisRead"],description:"Read the history of points found using a filter"},{label:"Read",value:"read",apiRequirements:["read"],description:"Read the records matched by a filter"}];class p extends t.DataSourceWithBackend{loadOps(e){var t=this;return c((function*(){var r,n;let a=t.opsRequest(e),l=t.query(a),i=yield(0,o.firstValueFrom)(l);if("Error"===(null==i?void 0:i.state))return[];let u=null==i||null===(r=i.data)||void 0===r?void 0:r.find((t=>t.refId===e));var c;let s=(null!==(c=null==u||null===(n=u.fields)||void 0===n?void 0:n.find((e=>"def"===e.name)).values)&&void 0!==c?c:[]).map((e=>e.startsWith("^op:")?e.substring(4):e));return d.filter((e=>e.apiRequirements.every((e=>void 0!==s.find((t=>t===e))))))}))()}applyTemplateVariables(e,r){return n=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){s(e,t,r[t])}))}return e}({},e),a=null!=(a={eval:(0,t.getTemplateSrv)().replace(e.eval,r,"csv"),hisRead:(0,t.getTemplateSrv)().replace(e.hisRead,r,"csv"),hisReadFilter:(0,t.getTemplateSrv)().replace(e.hisReadFilter,r,"csv"),read:(0,t.getTemplateSrv)().replace(e.read,r,"csv")})?a:{},Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(a)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r}(Object(a)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(a,e))})),n;var n,a}metricFindQuery(e,t){var r=this;return c((function*(){let t=e.query,n=yield r.query({targets:[t]}).toPromise();return void 0===n||void 0===n.data?[]:n.data.reduce(((t,r)=>{let n=r.fields[0];var a;void 0!==e.column&&""!==e.column&&(n=null!==(a=r.fields.find((t=>t.name===e.column)))&&void 0!==a?a:n);let o=n.values.toArray().map((e=>{if(e.startsWith("@")){let t=e.indexOf(" "),r=e.substring(0,t);return{text:e,value:r}}return{text:e,value:e}}));return t.concat(o)}),[])}))()}getDefaultQuery(e){return a}opsRequest(t){return{requestId:"ops",dashboardId:0,interval:"0",intervalMs:0,panelId:0,range:(0,e.getDefaultTimeRange)(),scopedVars:{},targets:[new n(t)],timezone:"UTC",app:"ops",startTime:0}}constructor(e){super(e)}}var f=i(650),v=i.n(f),y=i(388);function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){m(e,t,r[t])}))}return e}function h(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}function g(e,t,r,n,a,o,l){try{var i=e[o](l),u=i.value}catch(e){return void r(e)}i.done?t(u):Promise.resolve(u).then(n,a)}function O({datasource:e,type:t,refId:r,onChange:n}){const a=d[0];function o(e){var t;return null!==(t=d.find((t=>t.value===e)))&&void 0!==t?t:null}function l(){var e;return e=function*(){return new Promise((e=>{e(d)}))},l=function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function l(e){g(o,n,a,l,i,"next",e)}function i(e){g(o,n,a,l,i,"throw",e)}l(void 0)}))},l.apply(this,arguments)}return v().createElement(y.InlineField,{label:"Type"},v().createElement(y.AsyncSelect,{loadOptions:()=>{var t;return null!==(t=null==e?void 0:e.loadOps(r))&&void 0!==t?t:function(){return l.apply(this,arguments)}()},defaultOptions:!0,value:o(t),width:30,onChange:e=>{var t,r,l;r=o(null!==(t=e.value)&&void 0!==t?t:""),n(null!==(l=null==r?void 0:r.value)&&void 0!==l?l:a.value)}}))}function j({query:e,onChange:t}){const r=e=>{t(e.target.value)};let n=100;switch(e.type){case"eval":return v().createElement(y.InlineField,null,v().createElement(y.Input,{width:n,prefix:v().createElement(y.Icon,{name:"angle-right"}),onChange:r,value:e.eval,placeholder:a.eval}));case"hisRead":return v().createElement(y.InlineField,null,v().createElement(y.Input,{width:n,prefix:"@",onChange:r,value:e.hisRead,placeholder:a.hisRead}));case"hisReadFilter":return v().createElement(y.InlineField,null,v().createElement(y.Input,{width:n,prefix:v().createElement(y.Icon,{name:"filter"}),onChange:r,value:e.hisReadFilter,placeholder:a.hisReadFilter}));case"read":return v().createElement(y.InlineField,null,v().createElement(y.Input,{width:n,prefix:v().createElement(y.Icon,{name:"filter"}),onChange:r,value:e.read,placeholder:a.read}))}return v().createElement("p",null,"Select a query type")}function w(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){w(e,t,r[t])}))}return e}function E(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}function R(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function I(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){R(e,t,r[t])}))}return e}function S(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}const q={refId:"variable",type:"",eval:"",hisRead:"",read:""},D=new e.DataSourcePlugin(p).setConfigEditor((function(e){const{onOptionsChange:t,options:r}=e,{jsonData:n,secureJsonFields:a}=r,o=r.secureJsonData||{};return v().createElement("div",{className:"gf-form-group"},v().createElement(y.InlineField,{label:"URL",labelWidth:12},v().createElement(y.Input,{onChange:e=>{const n=h(b({},r.jsonData),{url:e.target.value});t(h(b({},r),{jsonData:n}))},value:n.url||"",placeholder:"e.g. http://mywebsite.com/api/",width:60})),v().createElement(y.InlineField,{label:"Username",labelWidth:12},v().createElement(y.Input,{onChange:e=>{const n=h(b({},r.jsonData),{username:e.target.value});t(h(b({},r),{jsonData:n}))},value:n.username||"",placeholder:"It's a good idea to create a user specifically for this connection",width:60})),v().createElement(y.InlineField,{label:"Password",labelWidth:12},v().createElement(y.SecretInput,{isConfigured:a&&a.password,value:o.password||"",placeholder:"",width:60,onReset:()=>{t(h(b({},r),{secureJsonFields:h(b({},r.secureJsonFields),{password:!1}),secureJsonData:h(b({},r.secureJsonData),{password:""})}))},onChange:e=>{t(h(b({},r),{secureJsonData:{password:e.target.value}}))}})))})).setQueryEditor((function({datasource:e,query:t,onChange:r,onRunQuery:n}){const a=e=>{r(E(P({},t),{type:e}))},o=e=>{"eval"===t.type?r(E(P({},t),{eval:e})):"hisRead"===t.type?r(E(P({},t),{hisRead:e})):"hisReadFilter"===t.type?r(E(P({},t),{hisReadFilter:e})):"read"===t.type&&r(E(P({},t),{read:e}))};return v().createElement("div",{className:"gf-form"},v().createElement(y.Form,{onSubmit:function(e){t=P({},t,e),n()}},(({register:r,errors:n})=>v().createElement(y.VerticalGroup,null,v().createElement(O,{datasource:e,type:t.type,refId:t.refId,onChange:a}),v().createElement(j,{query:t,onChange:o}),v().createElement(y.Button,{type:"submit"},"Run")))))})).setVariableQueryEditor((({onChange:e,query:t})=>{var r,n;const[a,o]=(0,f.useState)(t);var l,i,u;return v().createElement("div",{onBlur:()=>{var t;let r=null!==(t=a.query)&&void 0!==t?t:q,n=r.type,o="";"hisRead"===r.type?o=r.hisRead:"eval"===r.type?o=r.eval:"read"===r.type&&(o=r.read);let l="none";void 0!==a.column&&""!==a.column&&(l=`'${a.column}'`),e(a,`Type: '${n}' Query: '${o}' Column: ${l}`)}},v().createElement(O,{datasource:null,type:null!==(l=null===(r=a.query)||void 0===r?void 0:r.type)&&void 0!==l?l:q.type,refId:null!==(i=null===(n=a.query)||void 0===n?void 0:n.refId)&&void 0!==i?i:q.refId,onChange:e=>{var t;let r=I({},null!==(t=a.query)&&void 0!==t?t:q);r.type=e,o(S(I({},a),{query:r}))}}),v().createElement(j,{query:null!==(u=a.query)&&void 0!==u?u:q,onChange:e=>{var t;let r=I({},null!==(t=a.query)&&void 0!==t?t:q);"hisRead"===a.query.type?r.hisRead=e:"eval"===a.query.type?r.eval=e:"read"===a.query.type&&(r.read=e),o(S(I({},a),{query:r}))}}),v().createElement("div",{className:"gf-form"},v().createElement("span",{className:"gf-form-label width-10"},"Column"),v().createElement("input",{name:"column",className:"gf-form-input",onChange:e=>{o(S(I({},a),{column:e.currentTarget.value}))},value:a.column})))}))})(),u})()));
//# sourceMappingURL=module.js.map