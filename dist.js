!function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const n=new WeakMap,s=e=>"function"==typeof e&&n.has(e),o=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,r=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},a={},l={},h=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${h}--\x3e`,d=new RegExp(`${h}|${c}`),p="$lit$";class u{constructor(e,t){this.parts=[],this.element=t;const i=[],n=[],s=document.createTreeWalker(t.content,133,null,!1);let o=0,r=-1,a=0;const{strings:l,values:{length:c}}=e;for(;a<c;){const e=s.nextNode();if(null!==e){if(r++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let n=0;for(let e=0;e<i;e++)f(t[e].name,p)&&n++;for(;n-- >0;){const t=l[a],i=g.exec(t)[2],n=i.toLowerCase()+p,s=e.getAttribute(n);e.removeAttribute(n);const o=s.split(d);this.parts.push({type:"attribute",index:r,name:i,strings:o}),a+=o.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),s.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(h)>=0){const n=e.parentNode,s=t.split(d),o=s.length-1;for(let t=0;t<o;t++){let i,o=s[t];if(""===o)i=m();else{const e=g.exec(o);null!==e&&f(e[2],p)&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-p.length)+e[3]),i=document.createTextNode(o)}n.insertBefore(i,e),this.parts.push({type:"node",index:++r})}""===s[o]?(n.insertBefore(m(),e),i.push(e)):e.data=s[o],a+=o}}else if(8===e.nodeType)if(e.data===h){const t=e.parentNode;null!==e.previousSibling&&r!==o||(r++,t.insertBefore(m(),e)),o=r,this.parts.push({type:"node",index:r}),null===e.nextSibling?e.data="":(i.push(e),r--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(h,t+1));)this.parts.push({type:"node",index:-1}),a++}}else s.currentNode=n.pop()}for(const e of i)e.parentNode.removeChild(e)}}const f=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},_=e=>-1!==e.index,m=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class v{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let s,r=0,a=0,l=n.nextNode();for(;r<i.length;)if(s=i[r],_(s)){for(;a<s.index;)a++,"TEMPLATE"===l.nodeName&&(t.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=t.pop(),l=n.nextNode());if("node"===s.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,s.name,s.strings,this.options));r++}else this.__parts.push(void 0),r++;return o&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const y=` ${h} `;class b{constructor(e,t,i,n){this.strings=e,this.values=t,this.type=i,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let n=0;n<e;n++){const e=this.strings[n],s=e.lastIndexOf("\x3c!--");i=(s>-1||i)&&-1===e.indexOf("--\x3e",s+1);const o=g.exec(e);t+=null===o?e+(i?y:c):e.substr(0,o.index)+o[1]+o[2]+p+o[3]+h}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const w=e=>null===e||!("object"==typeof e||"function"==typeof e),C=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class z{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new S(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let n=0;n<t;n++){i+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(w(e)||!C(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===a||w(e)&&e===this.value||(this.value=e,s(e)||(this.committer.dirty=!0))}commit(){for(;s(this.value);){const e=this.value;this.value=a,e(this)}this.value!==a&&this.committer.commit()}}class x{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(m()),this.endNode=e.appendChild(m())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=m()),e.__insert(this.endNode=m())}insertAfterPart(e){e.__insert(this.startNode=m()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){for(;s(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}const e=this.__pendingValue;e!==a&&(w(e)?e!==this.value&&this.__commitText(e):e instanceof b?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):C(e)?this.__commitIterable(e):e===l?(this.value=l,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===t)this.value.update(e.values);else{const i=new v(t,e.processor,this.options),n=i._clone();i.update(e.values),this.__commitNode(n),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,n=0;for(const s of e)void 0===(i=t[n])&&(i=new x(this.options),t.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(t[n-1])),i.setValue(s),i.commit(),n++;n<t.length&&(t.length=n,this.clear(i&&i.endNode))}clear(e=this.startNode){r(this.startNode.parentNode,e.nextSibling,this.endNode)}}class k{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;s(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}if(this.__pendingValue===a)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=a}}class E extends z{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new H(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class H extends S{}let T=!1;try{const e={get capture(){return T=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class M{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;s(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}if(this.__pendingValue===a)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=A(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=a}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const A=e=>e&&(T?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const L=new class{handleAttributeExpressions(e,t,i,n){const s=t[0];if("."===s){return new E(e,t.slice(1),i).parts}return"@"===s?[new M(e,t.slice(1),n.eventContext)]:"?"===s?[new k(e,t.slice(1),i)]:new z(e,t,i).parts}handleTextExpression(e){return new x(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function I(e){let t=P.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},P.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(h);return void 0===(i=t.keyString.get(n))&&(i=new u(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const P=new Map,O=new WeakMap,N=(e,t,i)=>{let n=O.get(t);void 0===n&&(r(t,t.firstChild),O.set(t,n=new x(Object.assign({templateFactory:I},i))),n.appendInto(t)),n.setValue(e),n.commit()};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const V=(e,...t)=>new b(e,t,"html",L),R=133;function D(e,t){const{element:{content:i},parts:n}=e,s=document.createTreeWalker(i,R,null,!1);let o=F(n),r=n[o],a=-1,l=0;const h=[];let c=null;for(;s.nextNode();){a++;const e=s.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(h.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==r&&r.index===a;)r.index=null!==c?-1:r.index-l,r=n[o=F(n,o)]}h.forEach(e=>e.parentNode.removeChild(e))}const B=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,R,null,!1);for(;i.nextNode();)t++;return t},F=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(_(t))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const U=(e,t)=>`${e}--${t}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const $=e=>t=>{const i=U(t.type,e);let n=P.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},P.set(i,n));let s=n.stringsArray.get(t.strings);if(void 0!==s)return s;const o=t.strings.join(h);if(void 0===(s=n.keyString.get(o))){const i=t.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(i,e),s=new u(t,i),n.keyString.set(o,s)}return n.stringsArray.set(t.strings,s),s},j=["html","svg"],K=new Set,Y=(e,t,i)=>{K.add(e);const n=i?i.element:document.createElement("template"),s=t.querySelectorAll("style"),{length:o}=s;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(n,e);const r=document.createElement("style");for(let e=0;e<o;e++){const t=s[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{j.forEach(t=>{const i=P.get(U(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),D(e,i)})})})(e);const a=n.content;i?function(e,t,i=null){const{element:{content:n},parts:s}=e;if(null==i)return void n.appendChild(t);const o=document.createTreeWalker(n,R,null,!1);let r=F(s),a=0,l=-1;for(;o.nextNode();){for(l++,o.currentNode===i&&(a=B(t),i.parentNode.insertBefore(t,i));-1!==r&&s[r].index===l;){if(a>0){for(;-1!==r;)s[r].index+=a,r=F(s,r);return}r=F(s,r)}}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(r,a.firstChild);const e=new Set;e.add(r),D(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const W={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},J=(e,t)=>t!==e&&(t==t||e==e),X={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:J},Z=Promise.resolve(!0),G=1,Q=4,ee=8,te=16,ie=32,ne="finalized";class se extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=Z,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const n=this._attributeNameForProperty(i,t);void 0!==n&&(this._attributeToPropertyMap.set(n,i),e.push(n))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=X){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[i]},set(t){const n=this[e];this[i]=t,this._requestUpdate(e,n)},configurable:!0,enumerable:!0})}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(ne)||e.finalize(),this[ne]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=J){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,n=t.converter||W,s="function"==typeof n?n:n.fromAttribute;return s?s(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,n=t.converter;return(n&&n.toAttribute||W.toAttribute)(e,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|ie,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=X){const n=this.constructor,s=n._attributeNameForProperty(e,i);if(void 0!==s){const e=n._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=this._updateState|ee,null==e?this.removeAttribute(s):this.setAttribute(s,e),this._updateState=this._updateState&~ee}}_attributeToProperty(e,t){if(this._updateState&ee)return;const i=this.constructor,n=i._attributeToPropertyMap.get(e);if(void 0!==n){const e=i._classProperties.get(n)||X;this._updateState=this._updateState|te,this[n]=i._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~te}}_requestUpdate(e,t){let i=!0;if(void 0!==e){const n=this.constructor,s=n._classProperties.get(e)||X;n._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||this._updateState&te||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){let e,t;this._updateState=this._updateState|Q;const i=this._updatePromise;this._updatePromise=new Promise((i,n)=>{e=i,t=n});try{await i}catch(e){}this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);try{const e=this.performUpdate();null!=e&&await e}catch(e){t(e)}e(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&ie}get _hasRequestedUpdate(){return this._updateState&Q}get hasUpdated(){return this._updateState&G}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{(e=this.shouldUpdate(t))&&this.update(t)}catch(t){throw e=!1,t}finally{this._markUpdated()}e&&(this._updateState&G||(this._updateState=this._updateState|G,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Q}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0)}updated(e){}firstUpdated(e){}}se[ne]=!0;const oe="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,re=Symbol();class ae{constructor(e,t){if(t!==re)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(oe?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const le=(e,...t)=>{const i=t.reduce((t,i,n)=>t+(e=>{if(e instanceof ae)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[n+1],e[0]);return new ae(i,re)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const he=e=>e.flat?e.flat(1/0):function e(t,i=[]){for(let n=0,s=t.length;n<s;n++){const s=t[n];Array.isArray(s)?e(s,i):i.push(s)}return i}(e);class ce extends se{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const e=this.styles,t=[];if(Array.isArray(e)){he(e).reduceRight((e,t)=>(e.add(t),e),new Set).forEach(e=>t.unshift(e))}else e&&t.push(e);return t}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?oe?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const t=this.render();t instanceof b&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}ce.finalized=!0,ce.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,s=O.has(t),o=q&&11===t.nodeType&&!!t.host,a=o&&!K.has(n),l=a?document.createDocumentFragment():t;if(N(e,l,Object.assign({templateFactory:$(n)},i)),a){const e=O.get(l);O.delete(l);const i=e.value instanceof v?e.value.template:void 0;Y(n,l,i),r(t,t.firstChild),t.appendChild(l),O.set(t,e)}!s&&o&&window.ShadyCSS.styleElement(t.host)};const de=le`
html {
  font-size: 15px;
  line-height: 20px;
}

body {
  font-family: 'Roboto', 'Noto', sans-serif;
  font-size: 14px;
  margin: 0;
  padding: 24px;
  background-color: #fafafa;
  color: #5f6368;
}

.horizontal-section-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.vertical-section-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.centered {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.card {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
              0 1px 10px 0 rgba(0, 0, 0, 0.12),
              0 2px 4px -1px rgba(0, 0, 0, 0.4);
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  box-sizing: border-box;
  background-color: #fff;
}

header {
  padding: 12px 24px;
  background-color: #2196F3;
  color: #000;
  display: flex;
  align-items: center;
  --iron-icon-fill-color: #000;
  --paper-input-container-focus-color: #33691E;
  --paper-input-container-label: {
    color: #3E2723;
  };
}

header h1 {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -.012em;
  line-height: 32px;
}

.spacer {
  flex: 1;
}

.settings-action-item {
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
}

body.styled {
  margin: 0;
  padding: 0;
  background-color: #fff;
  height: 100vh;
  --primary-color: #00A2DF;
  --accent-color: rgb(33, 150, 243);
  --arc-font-body1-font-size: 14px;
  --arc-font-body1-font-weight: 400;
  --arc-font-body1-line-height: 20px;
  --arc-font-code-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
  --code-background-color: #f5f7f9;
}

body.styled.dark {
  background-color: #424242;
  height: 100vh;
  color: #fff;
  --primary-color: #2196f3;
  --primary-text-color: #fff;
  --paper-toggle-button-label-color: #fff;
  --primary-background-color: #424242;
  --secondary-text-color: #616161;
  --arc-interactive-demo-options-color: #F5F5F5;
  --error-color: #FF5722;
}

body.styled.dark arc-demo-helper {
  --arc-demo-helper-code-container-background-color: #263238;
  --code-background-color: #263238;
  --code-type-boolean-value-color: #F07178;
  --code-type-number-value-color: #F78C6A;
  --code-type-text-value-color: #C3E88D;
  --code-property-value-color: #F07178;
  --code-operator-value-background-color: transparent;
  --arc-demo-helper-demo-background-color: #263238;
}

body.styled.dark .card {
  background-color: #424242;
}

body.styled.dark header {
  background-color: #212121;
  color: #fff;
  --iron-icon-fill-color: #fff;
  --paper-input-container-color: rgba(255, 255, 255, 0.84);
}

body.styled.dark .settings-action-item {
  background-color: #212121;
}

.demo-container {
  flex: 1;
}

h2 {
  font-size: 60px;
  color: #202124;
  font-weight: 400;
  line-height: 1.2;
}

h3 {
  font-size: 24px;
  color: #202124;
  font-weight: 400;
  line-height: 1.2;
}

h4 {
  font-size: 20px;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 0 8px;
}

body.styled.dark h2,
body.styled.dark h3,
body.styled.dark h4 {
  color: #F5F5F5;
}

.documentation-section {
  max-width: 1400px;
  padding: 60px 20px;
  max-width: 1400px;
  width: 100%;
  border-bottom: 1px #e5e5e5 solid;
  margin: 0 auto;
  box-sizing: border-box;
}

ul {
  padding-left: 20px;
}

p {
  margin: 1.40em 0;
}
`;try{document.adoptedStyleSheets=document.adoptedStyleSheets.concat(de.styleSheet)}catch(e){{const e=document.createElement("style");e.type="text/css",e.innerHTML=de.cssText,document.getElementsByTagName("head")[0].appendChild(e)}}const pe=document.createElement("link");pe.rel="stylesheet",pe.type="text/css",pe.crossOrigin="anonymous",pe.href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic",document.head.appendChild(pe);class ue{constructor(){this._darkThemeHandler=this._darkThemeHandler.bind(this),this._narrowHandler=this._narrowHandler.bind(this),this._stylesHandler=this._stylesHandler.bind(this),this.initObservableProperties(["narrowActive","componentName","stylesActive","darkThemeActive"]),this._narrowActive=!1,this.renderViewControls=!0,this._componentName="",document.body.classList.add("styled");const e=document.createElement("script");e.src="../node_modules/web-animations-js/web-animations-next.min.js",document.head.appendChild(e)}initObservableProperties(e){e.forEach(e=>{Object.defineProperty(this,e,{get(){return this["_"+e]},set(t){this._setObservableProperty(e,t)},enumerable:!0,configurable:!0})})}_setObservableProperty(e,t){const i="_"+e;this[i]!==t&&(this[i]=t,this.render())}_darkThemeHandler(e){this.darkThemeActive=e.target.checked,e.target.checked?document.body.classList.add("dark"):document.body.classList.remove("dark")}_narrowHandler(e){this.narrowActive=e.target.checked}_stylesHandler(e){this.stylesActive=e.target.checked,e.target.checked?document.body.classList.add("styled"):document.body.classList.remove("styled")}contentTemplate(){}headerTemplate(){const{componentName:e}=this;return V`
    <header>
      <h1>${e}</h1>
    </header>`}render(){this._rendering||(this._rendering=!0,setTimeout(()=>{this._rendering=!1,this._render()}))}_render(){N(V`
      ${this.headerTemplate()}
      <section role="main" class="vertical-section-container centered main">
        ${this.contentTemplate()}
      </section>`,document.querySelector("#demo"))}}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const fe=!(window.ShadyDOM&&window.ShadyDOM.inUse);let _e,me;function ge(e){_e=(!e||!e.shimcssproperties)&&(fe||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(me=window.ShadyCSS.cssBuild);const ve=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?_e=window.ShadyCSS.nativeCss:window.ShadyCSS?(ge(window.ShadyCSS),window.ShadyCSS=void 0):ge(window.WebComponents&&window.WebComponents.flags);const ye=_e;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class be{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function we(e){return function e(t,i){let n=i.substring(t.start,t.end-1);t.parsedCssText=t.cssText=n.trim();if(t.parent){let e=t.previous?t.previous.end:t.parent.start;n=(n=(n=function(e){return e.replace(/\\([0-9a-f]{1,6})\s/gi,(function(){let e=arguments[1],t=6-e.length;for(;t--;)e="0"+e;return"\\"+e}))}(n=i.substring(e,t.start-1))).replace(ke.multipleSpaces," ")).substring(n.lastIndexOf(";")+1);let s=t.parsedSelector=t.selector=n.trim();t.atRule=0===s.indexOf(Te),t.atRule?0===s.indexOf(He)?t.type=ze.MEDIA_RULE:s.match(ke.keyframesRule)&&(t.type=ze.KEYFRAMES_RULE,t.keyframesName=t.selector.split(ke.multipleSpaces).pop()):0===s.indexOf(Ee)?t.type=ze.MIXIN_RULE:t.type=ze.STYLE_RULE}let s=t.rules;if(s)for(let t,n=0,o=s.length;n<o&&(t=s[n]);n++)e(t,i);return t}(function(e){let t=new be;t.start=0,t.end=e.length;let i=t;for(let n=0,s=e.length;n<s;n++)if(e[n]===Se){i.rules||(i.rules=[]);let e=i,t=e.rules[e.rules.length-1]||null;(i=new be).start=n+1,i.parent=e,i.previous=t,e.rules.push(i)}else e[n]===xe&&(i.end=n+1,i=i.parent||t);return t}(e=e.replace(ke.comments,"").replace(ke.port,"")),e)}function Ce(e,t,i=""){let n="";if(e.cssText||e.rules){let i=e.rules;if(i&&!function(e){let t=e[0];return Boolean(t)&&Boolean(t.selector)&&0===t.selector.indexOf(Ee)}(i))for(let e,s=0,o=i.length;s<o&&(e=i[s]);s++)n=Ce(e,t,n);else(n=(n=t?e.cssText:function(e){return function(e){return e.replace(ke.mixinApply,"").replace(ke.varApply,"")}(e=function(e){return e.replace(ke.customProp,"").replace(ke.mixinProp,"")}(e))}(e.cssText)).trim())&&(n="  "+n+"\n")}return n&&(e.selector&&(i+=e.selector+" "+Se+"\n"),i+=n,e.selector&&(i+=xe+"\n\n")),i}const ze={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},Se="{",xe="}",ke={comments:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},Ee="--",He="@media",Te="@",Me=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,Ae=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,Le=/@media\s(.*)/,Ie=new Set,Pe="shady-unscoped";function Oe(e){const t=e.textContent;if(!Ie.has(t)){Ie.add(t);const i=e.cloneNode(!0);document.head.appendChild(i)}}function Ne(e){return e.hasAttribute(Pe)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function Ve(e,t){return e?("string"==typeof e&&(e=we(e)),t&&De(e,t),Ce(e,ye)):""}function Re(e){return!e.__cssRules&&e.textContent&&(e.__cssRules=we(e.textContent)),e.__cssRules||null}function De(e,t,i,n){if(!e)return;let s=!1,o=e.type;if(n&&o===ze.MEDIA_RULE){let t=e.selector.match(Le);t&&(window.matchMedia(t[1]).matches||(s=!0))}o===ze.STYLE_RULE?t(e):i&&o===ze.KEYFRAMES_RULE?i(e):o===ze.MIXIN_RULE&&(s=!0);let r=e.rules;if(r&&!s)for(let e,s=0,o=r.length;s<o&&(e=r[s]);s++)De(e,t,i,n)}function Be(e,t){let i=0;for(let n=t,s=e.length;n<s;n++)if("("===e[n])i++;else if(")"===e[n]&&0==--i)return n;return-1}window.ShadyDOM&&window.ShadyDOM.wrap;const Fe="css-build";function Ue(e){if(void 0!==me)return me;if(void 0===e.__cssBuild){const t=e.getAttribute(Fe);if(t)e.__cssBuild=t;else{const t=function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;if(t instanceof Comment){const e=t.textContent.trim().split(":");if(e[0]===Fe)return e[1]}return""}(e);""!==t&&function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;t.parentNode.removeChild(t)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/(e),e.__cssBuild=t}}return e.__cssBuild||""}function qe(e){return""!==Ue(e)}function $e(e,t){for(let i in t)null===i?e.style.removeProperty(i):e.style.setProperty(i,t[i])}function je(e,t){const i=window.getComputedStyle(e).getPropertyValue(t);return i?i.trim():""}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Ke=/;\s*/m,Ye=/^\s*(initial)|(inherit)\s*$/,We=/\s*!important/,Je="_-_";class Xe{constructor(){this._map={}}set(e,t){e=e.trim(),this._map[e]={properties:t,dependants:{}}}get(e){return e=e.trim(),this._map[e]||null}}let Ze=null;class Ge{constructor(){this._currentElement=null,this._measureElement=null,this._map=new Xe}detectMixin(e){return function(e){const t=Ae.test(e)||Me.test(e);return Ae.lastIndex=0,Me.lastIndex=0,t}(e)}gatherStyles(e){const t=function(e){const t=[],i=e.querySelectorAll("style");for(let e=0;e<i.length;e++){const n=i[e];Ne(n)?fe||(Oe(n),n.parentNode.removeChild(n)):(t.push(n.textContent),n.parentNode.removeChild(n))}return t.join("").trim()}(e.content);if(t){const i=document.createElement("style");return i.textContent=t,e.content.insertBefore(i,e.content.firstChild),i}return null}transformTemplate(e,t){void 0===e._gatheredStyle&&(e._gatheredStyle=this.gatherStyles(e));const i=e._gatheredStyle;return i?this.transformStyle(i,t):null}transformStyle(e,t=""){let i=Re(e);return this.transformRules(i,t),e.textContent=Ve(i),i}transformCustomStyle(e){let t=Re(e);return De(t,e=>{":root"===e.selector&&(e.selector="html"),this.transformRule(e)}),e.textContent=Ve(t),t}transformRules(e,t){this._currentElement=t,De(e,e=>{this.transformRule(e)}),this._currentElement=null}transformRule(e){e.cssText=this.transformCssText(e.parsedCssText,e),":root"===e.selector&&(e.selector=":host > *")}transformCssText(e,t){return e=e.replace(Me,(e,i,n,s)=>this._produceCssProperties(e,i,n,s,t)),this._consumeCssProperties(e,t)}_getInitialValueForProperty(e){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(e)}_fallbacksFromPreviousRules(e){let t=e;for(;t.parent;)t=t.parent;const i={};let n=!1;return De(t,t=>{(n=n||t===e)||t.selector===e.selector&&Object.assign(i,this._cssTextToMap(t.parsedCssText))}),i}_consumeCssProperties(e,t){let i=null;for(;i=Ae.exec(e);){let n=i[0],s=i[1],o=i.index,r=o+n.indexOf("@apply"),a=o+n.length,l=e.slice(0,r),h=e.slice(a),c=t?this._fallbacksFromPreviousRules(t):{};Object.assign(c,this._cssTextToMap(l));let d=this._atApplyToCssProperties(s,c);e=`${l}${d}${h}`,Ae.lastIndex=o+d.length}return e}_atApplyToCssProperties(e,t){e=e.replace(Ke,"");let i=[],n=this._map.get(e);if(n||(this._map.set(e,{}),n=this._map.get(e)),n){let s,o,r;this._currentElement&&(n.dependants[this._currentElement]=!0);const a=n.properties;for(s in a)r=t&&t[s],o=[s,": var(",e,Je,s],r&&o.push(",",r.replace(We,"")),o.push(")"),We.test(a[s])&&o.push(" !important"),i.push(o.join(""))}return i.join("; ")}_replaceInitialOrInherit(e,t){let i=Ye.exec(t);return i&&(t=i[1]?this._getInitialValueForProperty(e):"apply-shim-inherit"),t}_cssTextToMap(e,t=!1){let i,n,s=e.split(";"),o={};for(let e,r,a=0;a<s.length;a++)(e=s[a])&&(r=e.split(":")).length>1&&(i=r[0].trim(),n=r.slice(1).join(":"),t&&(n=this._replaceInitialOrInherit(i,n)),o[i]=n);return o}_invalidateMixinEntry(e){if(Ze)for(let t in e.dependants)t!==this._currentElement&&Ze(t)}_produceCssProperties(e,t,i,n,s){if(i&&function e(t,i){let n=t.indexOf("var(");if(-1===n)return i(t,"","","");let s=Be(t,n+3),o=t.substring(n+4,s),r=t.substring(0,n),a=e(t.substring(s+1),i),l=o.indexOf(",");return-1===l?i(r,o.trim(),"",a):i(r,o.substring(0,l).trim(),o.substring(l+1).trim(),a)}(i,(e,t)=>{t&&this._map.get(t)&&(n=`@apply ${t};`)}),!n)return e;let o=this._consumeCssProperties(""+n,s),r=e.slice(0,e.indexOf("--")),a=this._cssTextToMap(o,!0),l=a,h=this._map.get(t),c=h&&h.properties;c?l=Object.assign(Object.create(c),a):this._map.set(t,l);let d,p,u=[],f=!1;for(d in l)void 0===(p=a[d])&&(p="initial"),!c||d in c||(f=!0),u.push(`${t}${Je}${d}: ${p}`);return f&&this._invalidateMixinEntry(h),h&&(h.properties=l),i&&(r=`${e};${r}`),`${r}${u.join("; ")};`}}Ge.prototype.detectMixin=Ge.prototype.detectMixin,Ge.prototype.transformStyle=Ge.prototype.transformStyle,Ge.prototype.transformCustomStyle=Ge.prototype.transformCustomStyle,Ge.prototype.transformRules=Ge.prototype.transformRules,Ge.prototype.transformRule=Ge.prototype.transformRule,Ge.prototype.transformTemplate=Ge.prototype.transformTemplate,Ge.prototype._separator=Je,Object.defineProperty(Ge.prototype,"invalidCallback",{get:()=>Ze,set(e){Ze=e}});var Qe=Ge;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/var et={};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const tt="_applyShimCurrentVersion",it="_applyShimNextVersion",nt="_applyShimValidatingVersion",st=Promise.resolve();function ot(e){let t=et[e];t&&function(e){e[tt]=e[tt]||0,e[nt]=e[nt]||0,e[it]=(e[it]||0)+1}(t)}function rt(e){return e[tt]===e[it]}function at(e){return!rt(e)&&e[nt]===e[it]}function lt(e){e[nt]=e[it],e._validating||(e._validating=!0,st.then((function(){e[tt]=e[it],e._validating=!1})))}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let ht,ct=null,dt=window.HTMLImports&&window.HTMLImports.whenReady||null;function pt(e){requestAnimationFrame((function(){dt?dt(e):(ct||(ct=new Promise(e=>{ht=e}),"complete"===document.readyState?ht():document.addEventListener("readystatechange",()=>{"complete"===document.readyState&&ht()})),ct.then((function(){e&&e()})))}))}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const ut="__seenByShadyCSS",ft="__shadyCSSCachedStyle";let _t=null,mt=null;class gt{constructor(){this.customStyles=[],this.enqueued=!1,pt(()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()})}enqueueDocumentValidation(){!this.enqueued&&mt&&(this.enqueued=!0,pt(mt))}addCustomStyle(e){e[ut]||(e[ut]=!0,this.customStyles.push(e),this.enqueueDocumentValidation())}getStyleForCustomStyle(e){if(e[ft])return e[ft];let t;return t=e.getStyle?e.getStyle():e}processStyles(){const e=this.customStyles;for(let t=0;t<e.length;t++){const i=e[t];if(i[ft])continue;const n=this.getStyleForCustomStyle(i);if(n){const e=n.__appliedElement||n;_t&&_t(e),i[ft]=e}}return e}}gt.prototype.addCustomStyle=gt.prototype.addCustomStyle,gt.prototype.getStyleForCustomStyle=gt.prototype.getStyleForCustomStyle,gt.prototype.processStyles=gt.prototype.processStyles,Object.defineProperties(gt.prototype,{transformCallback:{get:()=>_t,set(e){_t=e}},validateCallback:{get:()=>mt,set(e){let t=!1;mt||(t=!0),mt=e,t&&this.enqueueDocumentValidation()}}});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const vt=new Qe;class yt{constructor(){this.customStyleInterface=null,vt.invalidCallback=ot}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=e=>{vt.transformCustomStyle(e)},this.customStyleInterface.validateCallback=()=>{requestAnimationFrame(()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()})})}prepareTemplate(e,t){if(this.ensure(),qe(e))return;et[t]=e;let i=vt.transformTemplate(e,t);e._styleAst=i}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let e=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let t=0;t<e.length;t++){let i=e[t],n=this.customStyleInterface.getStyleForCustomStyle(i);n&&vt.transformCustomStyle(n)}this.customStyleInterface.enqueued=!1}}styleSubtree(e,t){if(this.ensure(),t&&$e(e,t),e.shadowRoot){this.styleElement(e);let t=e.shadowRoot.children||e.shadowRoot.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}else{let t=e.children||e.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}}styleElement(e){this.ensure();let{is:t}=function(e){let t=e.localName,i="",n="";return t?t.indexOf("-")>-1?i=t:(n=t,i=e.getAttribute&&e.getAttribute("is")||""):(i=e.is,n=e.extends),{is:i,typeExtension:n}}(e),i=et[t];if((!i||!qe(i))&&i&&!rt(i)){at(i)||(this.prepareTemplate(i,t),lt(i));let n=e.shadowRoot;if(n){let e=n.querySelector("style");e&&(e.__cssRules=i._styleAst,e.textContent=Ve(i._styleAst))}}}styleDocument(e){this.ensure(),this.styleSubtree(document.body,e)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const e=new yt;let t=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(t,i,n){e.flushCustomStyles(),e.prepareTemplate(t,i)},prepareTemplateStyles(e,t,i){window.ShadyCSS.prepareTemplate(e,t,i)},prepareTemplateDom(e,t){},styleSubtree(t,i){e.flushCustomStyles(),e.styleSubtree(t,i)},styleElement(t){e.flushCustomStyles(),e.styleElement(t)},styleDocument(t){e.flushCustomStyles(),e.styleDocument(t)},getComputedStyleValue:(e,t)=>je(e,t),flushCustomStyles(){e.flushCustomStyles()},nativeCss:ye,nativeShadow:fe,cssBuild:me,disableRuntime:ve},t&&(window.ShadyCSS.CustomStyleInterface=t)}window.ShadyCSS.ApplyShim=vt,
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
window.JSCompiler_renameProperty=function(e,t){return e};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let bt,wt,Ct=/(url\()([^)]*)(\))/g,zt=/(^\/[^\/])|(^#)|(^[\w-\d]*:)/;function St(e,t){if(e&&zt.test(e))return e;if("//"===e)return e;if(void 0===bt){bt=!1;try{const e=new URL("b","http://a");e.pathname="c%20d",bt="http://a/c%20d"===e.href}catch(e){}}if(t||(t=document.baseURI||window.location.href),bt)try{return new URL(e,t).href}catch(t){return e}return wt||((wt=document.implementation.createHTMLDocument("temp")).base=wt.createElement("base"),wt.head.appendChild(wt.base),wt.anchor=wt.createElement("a"),wt.body.appendChild(wt.anchor)),wt.base.href=t,wt.anchor.href=e,wt.anchor.href||e}function xt(e,t){return e.replace(Ct,(function(e,i,n,s){return i+"'"+St(n.replace(/["']/g,""),t)+"'"+s}))}function kt(e){return e.substring(0,e.lastIndexOf("/")+1)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const Et=!window.ShadyDOM;Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;let Ht=kt(document.baseURI||window.location.href);let Tt=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0;let Mt=!1;let At=!1;let Lt=!1;let It=!1;let Pt=!1;let Ot=!0;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let Nt=0;function Vt(){}Vt.prototype.__mixinApplications,Vt.prototype.__mixinSet;const Rt=function(e){let t=e.__mixinApplications;t||(t=new WeakMap,e.__mixinApplications=t);let i=Nt++;return function(n){let s=n.__mixinSet;if(s&&s[i])return n;let o=t,r=o.get(n);r||(r=e(n),o.set(n,r));let a=Object.create(r.__mixinSet||s||null);return a[i]=!0,r.__mixinSet=a,r}};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let Dt={},Bt={};function Ft(e,t){Dt[e]=Bt[e.toLowerCase()]=t}function Ut(e){return Dt[e]||Bt[e.toLowerCase()]}class qt extends HTMLElement{static get observedAttributes(){return["id"]}static import(e,t){if(e){let i=Ut(e);return i&&t?i.querySelector(t):i}return null}attributeChangedCallback(e,t,i,n){t!==i&&this.register()}get assetpath(){if(!this.__assetpath){const e=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,t=St(this.getAttribute("assetpath")||"",e.baseURI);this.__assetpath=kt(t)}return this.__assetpath}register(e){if(e=e||this.id){if(At&&void 0!==Ut(e))throw Ft(e,null),new Error(`strictTemplatePolicy: dom-module ${e} re-registered`);this.id=e,Ft(e,this),(t=this).querySelector("style")&&console.warn("dom-module %s has style outside template",t.id)}var t}}qt.prototype.modules=Dt,customElements.define("dom-module",qt);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const $t="link[rel=import][type~=css]",jt="include",Kt="shady-unscoped";function Yt(e){return qt.import(e)}function Wt(e){const t=xt((e.body?e.body:e).textContent,e.baseURI),i=document.createElement("style");return i.textContent=t,i}function Jt(e){const t=e.trim().split(/\s+/),i=[];for(let e=0;e<t.length;e++)i.push(...Xt(t[e]));return i}function Xt(e){const t=Yt(e);if(!t)return console.warn("Could not find style data in module named",e),[];if(void 0===t._styles){const e=[];e.push(...Gt(t));const i=t.querySelector("template");i&&e.push(...Zt(i,t.assetpath)),t._styles=e}return t._styles}function Zt(e,t){if(!e._styles){const i=[],n=e.content.querySelectorAll("style");for(let e=0;e<n.length;e++){let s=n[e],o=s.getAttribute(jt);o&&i.push(...Jt(o).filter((function(e,t,i){return i.indexOf(e)===t}))),t&&(s.textContent=xt(s.textContent,t)),i.push(s)}e._styles=i}return e._styles}function Gt(e){const t=[],i=e.querySelectorAll($t);for(let e=0;e<i.length;e++){let n=i[e];if(n.import){const e=n.import,i=n.hasAttribute(Kt);if(i&&!e._unscopedStyle){const t=Wt(e);t.setAttribute(Kt,""),e._unscopedStyle=t}else e._style||(e._style=Wt(e));t.push(i?e._unscopedStyle:e._style)}}return t}function Qt(e){let t=Yt(e);if(t&&void 0===t._cssText){let e=ei(t),i=t.querySelector("template");i&&(e+=function(e,t){let i="";const n=Zt(e,t);for(let e=0;e<n.length;e++){let t=n[e];t.parentNode&&t.parentNode.removeChild(t),i+=t.textContent}return i}(i,t.assetpath)),t._cssText=e||null}return t||console.warn("Could not find style data in module named",e),t&&t._cssText||""}function ei(e){let t="",i=Gt(e);for(let e=0;e<i.length;e++)t+=i[e].textContent;return t}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const ti=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:window.ShadyDOM?e=>ShadyDOM.patch(e):e=>e;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function ii(e){return e.indexOf(".")>=0}function ni(e){let t=e.indexOf(".");return-1===t?e:e.slice(0,t)}function si(e,t){return 0===e.indexOf(t+".")}function oi(e,t){return 0===t.indexOf(e+".")}function ri(e,t,i){return t+i.slice(e.length)}function ai(e){if(Array.isArray(e)){let t=[];for(let i=0;i<e.length;i++){let n=e[i].toString().split(".");for(let e=0;e<n.length;e++)t.push(n[e])}return t.join(".")}return e}function li(e){return Array.isArray(e)?ai(e).split("."):e.toString().split(".")}function hi(e,t,i){let n=e,s=li(t);for(let e=0;e<s.length;e++){if(!n)return;n=n[s[e]]}return i&&(i.path=s.join(".")),n}function ci(e,t,i){let n=e,s=li(t),o=s[s.length-1];if(s.length>1){for(let e=0;e<s.length-1;e++){if(!(n=n[s[e]]))return}n[o]=i}else n[t]=i;return s.join(".")}const di={},pi=/-[a-z]/g,ui=/([A-Z])/g;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function fi(e){return di[e]||(di[e]=e.indexOf("-")<0?e:e.replace(pi,e=>e[1].toUpperCase()))}function _i(e){return di[e]||(di[e]=e.replace(ui,"-$1").toLowerCase())}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let mi=0,gi=0,vi=[],yi=0,bi=document.createTextNode("");new window.MutationObserver((function(){const e=vi.length;for(let t=0;t<e;t++){let e=vi[t];if(e)try{e()}catch(e){setTimeout(()=>{throw e})}}vi.splice(0,e),gi+=e})).observe(bi,{characterData:!0});const wi={after:e=>({run:t=>window.setTimeout(t,e),cancel(e){window.clearTimeout(e)}}),run:(e,t)=>window.setTimeout(e,t),cancel(e){window.clearTimeout(e)}},Ci={run:e=>(bi.textContent=yi++,vi.push(e),mi++),cancel(e){const t=e-gi;if(t>=0){if(!vi[t])throw new Error("invalid async handle: "+e);vi[t]=null}}},zi=Ci,Si=Rt(e=>{return class extends e{static createProperties(e){const t=this.prototype;for(let i in e)i in t||t._createPropertyAccessor(i)}static attributeNameForProperty(e){return e.toLowerCase()}static typeForProperty(e){}_createPropertyAccessor(e,t){this._addPropertyToAttributeMap(e),this.hasOwnProperty("__dataHasAccessor")||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[e]||(this.__dataHasAccessor[e]=!0,this._definePropertyAccessor(e,t))}_addPropertyToAttributeMap(e){if(this.hasOwnProperty("__dataAttributes")||(this.__dataAttributes=Object.assign({},this.__dataAttributes)),!this.__dataAttributes[e]){const t=this.constructor.attributeNameForProperty(e);this.__dataAttributes[t]=e}}_definePropertyAccessor(e,t){Object.defineProperty(this,e,{get(){return this._getProperty(e)},set:t?function(){}:function(t){this._setProperty(e,t)}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let e in this.__dataHasAccessor)this.hasOwnProperty(e)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[e]=this[e],delete this[e])}_initializeInstanceProperties(e){Object.assign(this,e)}_setProperty(e,t){this._setPendingProperty(e,t)&&this._invalidateProperties()}_getProperty(e){return this.__data[e]}_setPendingProperty(e,t,i){let n=this.__data[e],s=this._shouldPropertyChange(e,t,n);return s&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),!this.__dataOld||e in this.__dataOld||(this.__dataOld[e]=n),this.__data[e]=t,this.__dataPending[e]=t),s}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,zi.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){const e=this.__data,t=this.__dataPending,i=this.__dataOld;this._shouldPropertiesChange(e,t,i)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(e,t,i))}_shouldPropertiesChange(e,t,i){return Boolean(t)}_propertiesChanged(e,t,i){}_shouldPropertyChange(e,t,i){return i!==t&&(i==i||t==t)}attributeChangedCallback(e,t,i,n){t!==i&&this._attributeToProperty(e,i),super.attributeChangedCallback&&super.attributeChangedCallback(e,t,i,n)}_attributeToProperty(e,t,i){if(!this.__serializing){const n=this.__dataAttributes,s=n&&n[e]||e;this[s]=this._deserializeValue(t,i||this.constructor.typeForProperty(s))}}_propertyToAttribute(e,t,i){this.__serializing=!0,i=arguments.length<3?this[e]:i,this._valueToNodeAttribute(this,i,t||this.constructor.attributeNameForProperty(e)),this.__serializing=!1}_valueToNodeAttribute(e,t,i){const n=this._serializeValue(t);"class"!==i&&"name"!==i&&"slot"!==i||(e=ti(e)),void 0===n?e.removeAttribute(i):e.setAttribute(i,n)}_serializeValue(e){switch(typeof e){case"boolean":return e?"":void 0;default:return null!=e?e.toString():void 0}}_deserializeValue(e,t){switch(t){case Boolean:return null!==e;case Number:return Number(e);default:return e}}}}),xi={};let ki=HTMLElement.prototype;for(;ki;){let e=Object.getOwnPropertyNames(ki);for(let t=0;t<e.length;t++)xi[e[t]]=!0;ki=Object.getPrototypeOf(ki)}const Ei=Rt(e=>{const t=Si(e);return class extends t{static createPropertiesForAttributes(){let e=this.observedAttributes;for(let t=0;t<e.length;t++)this.prototype._createPropertyAccessor(fi(e[t]))}static attributeNameForProperty(e){return _i(e)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(e){for(let t in e)this._setProperty(t,e[t])}_ensureAttribute(e,t){const i=this;i.hasAttribute(e)||this._valueToNodeAttribute(i,t,e)}_serializeValue(e){switch(typeof e){case"object":if(e instanceof Date)return e.toString();if(e)try{return JSON.stringify(e)}catch(e){return""}default:return super._serializeValue(e)}}_deserializeValue(e,t){let i;switch(t){case Object:try{i=JSON.parse(e)}catch(t){i=e}break;case Array:try{i=JSON.parse(e)}catch(t){i=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`)}break;case Date:i=isNaN(e)?String(e):Number(e),i=new Date(i);break;default:i=super._deserializeValue(e,t)}return i}_definePropertyAccessor(e,t){!function(e,t){if(!xi[t]){let i=e[t];void 0!==i&&(e.__data?e._setPendingProperty(t,i):(e.__dataProto?e.hasOwnProperty(JSCompiler_renameProperty("__dataProto",e))||(e.__dataProto=Object.create(e.__dataProto)):e.__dataProto={},e.__dataProto[t]=i))}}(this,e),super._definePropertyAccessor(e,t)}_hasAccessor(e){return this.__dataHasAccessor&&this.__dataHasAccessor[e]}_isPropertyPending(e){return Boolean(this.__dataPending&&e in this.__dataPending)}}}),Hi={"dom-if":!0,"dom-repeat":!0};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function Ti(e){let t=e.getAttribute("is");if(t&&Hi[t]){let i=e;for(i.removeAttribute("is"),e=i.ownerDocument.createElement(t),i.parentNode.replaceChild(e,i),e.appendChild(i);i.attributes.length;)e.setAttribute(i.attributes[0].name,i.attributes[0].value),i.removeAttribute(i.attributes[0].name)}return e}function Mi(e,t){let i=t.parentInfo&&Mi(e,t.parentInfo);if(!i)return e;for(let e=i.firstChild,n=0;e;e=e.nextSibling)if(t.parentIndex===n++)return e}function Ai(e,t,i,n){n.id&&(t[n.id]=i)}function Li(e,t,i){if(i.events&&i.events.length)for(let n,s=0,o=i.events;s<o.length&&(n=o[s]);s++)e._addMethodEventListenerToNode(t,n.name,n.value,e)}function Ii(e,t,i){i.templateInfo&&(t._templateInfo=i.templateInfo)}const Pi=Rt(e=>{return class extends e{static _parseTemplate(e,t){if(!e._templateInfo){let i=e._templateInfo={};i.nodeInfoList=[],i.stripWhiteSpace=t&&t.stripWhiteSpace||e.hasAttribute("strip-whitespace"),this._parseTemplateContent(e,i,{parent:null})}return e._templateInfo}static _parseTemplateContent(e,t,i){return this._parseTemplateNode(e.content,t,i)}static _parseTemplateNode(e,t,i){let n=!1,s=e;return"template"!=s.localName||s.hasAttribute("preserve-content")?"slot"===s.localName&&(t.hasInsertionPoint=!0):n=this._parseTemplateNestedTemplate(s,t,i)||n,s.firstChild&&this._parseTemplateChildNodes(s,t,i),s.hasAttributes&&s.hasAttributes()&&(n=this._parseTemplateNodeAttributes(s,t,i)||n),n}static _parseTemplateChildNodes(e,t,i){if("script"!==e.localName&&"style"!==e.localName)for(let n,s=e.firstChild,o=0;s;s=n){if("template"==s.localName&&(s=Ti(s)),n=s.nextSibling,s.nodeType===Node.TEXT_NODE){let i=n;for(;i&&i.nodeType===Node.TEXT_NODE;)s.textContent+=i.textContent,n=i.nextSibling,e.removeChild(i),i=n;if(t.stripWhiteSpace&&!s.textContent.trim()){e.removeChild(s);continue}}let r={parentIndex:o,parentInfo:i};this._parseTemplateNode(s,t,r)&&(r.infoIndex=t.nodeInfoList.push(r)-1),s.parentNode&&o++}}static _parseTemplateNestedTemplate(e,t,i){let n=e,s=this._parseTemplate(n,t);return(s.content=n.content.ownerDocument.createDocumentFragment()).appendChild(n.content),i.templateInfo=s,!0}static _parseTemplateNodeAttributes(e,t,i){let n=!1,s=Array.from(e.attributes);for(let o,r=s.length-1;o=s[r];r--)n=this._parseTemplateNodeAttribute(e,t,i,o.name,o.value)||n;return n}static _parseTemplateNodeAttribute(e,t,i,n,s){return"on-"===n.slice(0,3)?(e.removeAttribute(n),i.events=i.events||[],i.events.push({name:n.slice(3),value:s}),!0):"id"===n&&(i.id=s,!0)}static _contentForTemplate(e){let t=e._templateInfo;return t&&t.content||e.content}_stampTemplate(e){e&&!e.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e);let t=this.constructor._parseTemplate(e),i=t.nodeInfoList,n=t.content||e.content,s=document.importNode(n,!0);s.__noInsertionPoint=!t.hasInsertionPoint;let o=s.nodeList=new Array(i.length);s.$={};for(let e,t=0,n=i.length;t<n&&(e=i[t]);t++){let i=o[t]=Mi(s,e);Ai(0,s.$,i,e),Ii(0,i,e),Li(this,i,e)}return s=s}_addMethodEventListenerToNode(e,t,i,n){let s=function(e,t,i){return e=e._methodHost||e,function(t){e[i]?e[i](t,t.detail):console.warn("listener method `"+i+"` not defined")}}(n=n||e,0,i);return this._addEventListenerToNode(e,t,s),s}_addEventListenerToNode(e,t,i){e.addEventListener(t,i)}_removeEventListenerFromNode(e,t,i){e.removeEventListener(t,i)}}});
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */let Oi=0;const Ni={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},Vi=/[A-Z]/;function Ri(e,t){let i=e[t];if(i){if(!e.hasOwnProperty(t)){i=e[t]=Object.create(e[t]);for(let e in i){let t=i[e],n=i[e]=Array(t.length);for(let e=0;e<t.length;e++)n[e]=t[e]}}}else i=e[t]={};return i}function Di(e,t,i,n,s,o){if(t){let r=!1,a=Oi++;for(let l in i)Bi(e,t,a,l,i,n,s,o)&&(r=!0);return r}return!1}function Bi(e,t,i,n,s,o,r,a){let l=!1,h=t[r?ni(n):n];if(h)for(let t,c=0,d=h.length;c<d&&(t=h[c]);c++)t.info&&t.info.lastRun===i||r&&!Fi(n,t.trigger)||(t.info&&(t.info.lastRun=i),t.fn(e,n,s,o,t.info,r,a),l=!0);return l}function Fi(e,t){if(t){let i=t.name;return i==e||!(!t.structured||!si(i,e))||!(!t.wildcard||!oi(i,e))}return!0}function Ui(e,t,i,n,s){let o="string"==typeof s.method?e[s.method]:s.method,r=s.property;o?o.call(e,e.__data[r],n[r]):s.dynamicFn||console.warn("observer method `"+s.method+"` not defined")}function qi(e,t,i){let n=ni(t);if(n!==t){return $i(e,_i(n)+"-changed",i[t],t),!0}return!1}function $i(e,t,i,n){let s={value:i,queueProperty:!0};n&&(s.path=n),ti(e).dispatchEvent(new CustomEvent(t,{detail:s}))}function ji(e,t,i,n,s,o){let r=(o?ni(t):t)!=t?t:null,a=r?hi(e,r):e.__data[t];r&&void 0===a&&(a=i[t]),$i(e,s.eventName,a,r)}function Ki(e,t,i,n,s){let o=e.__data[t];Tt&&(o=Tt(o,s.attrName,"attribute",e)),e._propertyToAttribute(t,s.attrName,o)}function Yi(e,t,i,n,s){let o=en(e,t,i,n,s),r=s.methodInfo;e.__dataHasAccessor&&e.__dataHasAccessor[r]?e._setPendingProperty(r,o,!0):e[r]=o}function Wi(e,t,i,n,s,o,r){i.bindings=i.bindings||[];let a={kind:n,target:s,parts:o,literal:r,isCompound:1!==o.length};if(i.bindings.push(a),function(e){return Boolean(e.target)&&"attribute"!=e.kind&&"text"!=e.kind&&!e.isCompound&&"{"===e.parts[0].mode}(a)){let{event:e,negate:t}=a.parts[0];a.listenerEvent=e||_i(s)+"-changed",a.listenerNegate=t}let l=t.nodeInfoList.length;for(let i=0;i<a.parts.length;i++){let n=a.parts[i];n.compoundIndex=i,Ji(e,t,a,n,l)}}function Ji(e,t,i,n,s){if(!n.literal)if("attribute"===i.kind&&"-"===i.target[0])console.warn("Cannot set attribute "+i.target+' because "-" is not a valid attribute starting character');else{let o=n.dependencies,r={index:s,binding:i,part:n,evaluator:e};for(let i=0;i<o.length;i++){let n=o[i];"string"==typeof n&&((n=rn(n)).wildcard=!0),e._addTemplatePropertyEffect(t,n.rootProperty,{fn:Xi,info:r,trigger:n})}}}function Xi(e,t,i,n,s,o,r){let a=r[s.index],l=s.binding,h=s.part;if(o&&h.source&&t.length>h.source.length&&"property"==l.kind&&!l.isCompound&&a.__isPropertyEffectsClient&&a.__dataHasAccessor&&a.__dataHasAccessor[l.target]){let n=i[t];t=ri(h.source,l.target,t),a._setPendingPropertyOrPath(t,n,!1,!0)&&e._enqueueClient(a)}else{!function(e,t,i,n,s){s=function(e,t,i,n){if(i.isCompound){let s=e.__dataCompoundStorage[i.target];s[n.compoundIndex]=t,t=s.join("")}"attribute"!==i.kind&&("textContent"!==i.target&&("value"!==i.target||"input"!==e.localName&&"textarea"!==e.localName)||(t=null==t?"":t));return t}(t,s,i,n),Tt&&(s=Tt(s,i.target,i.kind,t));if("attribute"==i.kind)e._valueToNodeAttribute(t,s,i.target);else{let n=i.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[n]?t[Ni.READ_ONLY]&&t[Ni.READ_ONLY][n]||t._setPendingProperty(n,s)&&e._enqueueClient(t):e._setUnmanagedPropertyToNode(t,n,s)}}(e,a,l,h,s.evaluator._evaluateBinding(e,h,t,i,n,o))}}function Zi(e,t){if(t.isCompound){let i=e.__dataCompoundStorage||(e.__dataCompoundStorage={}),n=t.parts,s=new Array(n.length);for(let e=0;e<n.length;e++)s[e]=n[e].literal;let o=t.target;i[o]=s,t.literal&&"property"==t.kind&&("className"===o&&(e=ti(e)),e[o]=t.literal)}}function Gi(e,t,i){if(i.listenerEvent){let n=i.parts[0];e.addEventListener(i.listenerEvent,(function(e){!function(e,t,i,n,s){let o,r=e.detail,a=r&&r.path;a?(n=ri(i,n,a),o=r&&r.value):o=e.currentTarget[i],o=s?!o:o,t[Ni.READ_ONLY]&&t[Ni.READ_ONLY][n]||!t._setPendingPropertyOrPath(n,o,!0,Boolean(a))||r&&r.queueProperty||t._invalidateProperties()}(e,t,i.target,n.source,n.negate)}))}}function Qi(e,t,i,n,s,o){o=t.static||o&&("object"!=typeof o||o[t.methodName]);let r={methodName:t.methodName,args:t.args,methodInfo:s,dynamicFn:o};for(let s,o=0;o<t.args.length&&(s=t.args[o]);o++)s.literal||e._addPropertyEffect(s.rootProperty,i,{fn:n,info:r,trigger:s});o&&e._addPropertyEffect(t.methodName,i,{fn:n,info:r})}function en(e,t,i,n,s){let o=e._methodHost||e,r=o[s.methodName];if(r){let n=e._marshalArgs(s.args,t,i);return r.apply(o,n)}s.dynamicFn||console.warn("method `"+s.methodName+"` not defined")}const tn=[],nn=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function sn(e){let t="";for(let i=0;i<e.length;i++){t+=e[i].literal||""}return t}function on(e){let t=e.match(/([^\s]+?)\(([\s\S]*)\)/);if(t){let e={methodName:t[1],static:!0,args:tn};if(t[2].trim()){return function(e,t){return t.args=e.map((function(e){let i=rn(e);return i.literal||(t.static=!1),i}),this),t}(t[2].replace(/\\,/g,"&comma;").split(","),e)}return e}return null}function rn(e){let t=e.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),i={name:t,value:"",literal:!1},n=t[0];switch("-"===n&&(n=t[1]),n>="0"&&n<="9"&&(n="#"),n){case"'":case'"':i.value=t.slice(1,-1),i.literal=!0;break;case"#":i.value=Number(t),i.literal=!0}return i.literal||(i.rootProperty=ni(t),i.structured=ii(t),i.structured&&(i.wildcard=".*"==t.slice(-2),i.wildcard&&(i.name=t.slice(0,-2)))),i}function an(e,t,i){let n=hi(e,i);return void 0===n&&(n=t[i]),n}function ln(e,t,i,n){e.notifyPath(i+".splices",{indexSplices:n}),e.notifyPath(i+".length",t.length)}function hn(e,t,i,n,s,o){ln(e,t,i,[{index:n,addedCount:s,removed:o,object:t,type:"splice"}])}const cn=Rt(e=>{const t=Pi(Ei(e));return class extends t{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataCounter=0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo}get PROPERTY_EFFECT_TYPES(){return Ni}_initializeProperties(){super._initializeProperties(),dn.registerHost(this),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_initializeProtoProperties(e){this.__data=Object.create(e),this.__dataPending=Object.create(e),this.__dataOld={}}_initializeInstanceProperties(e){let t=this[Ni.READ_ONLY];for(let i in e)t&&t[i]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[i]=this.__dataPending[i]=e[i])}_addPropertyEffect(e,t,i){this._createPropertyAccessor(e,t==Ni.READ_ONLY);let n=Ri(this,t)[e];n||(n=this[t][e]=[]),n.push(i)}_removePropertyEffect(e,t,i){let n=Ri(this,t)[e],s=n.indexOf(i);s>=0&&n.splice(s,1)}_hasPropertyEffect(e,t){let i=this[t];return Boolean(i&&i[e])}_hasReadOnlyEffect(e){return this._hasPropertyEffect(e,Ni.READ_ONLY)}_hasNotifyEffect(e){return this._hasPropertyEffect(e,Ni.NOTIFY)}_hasReflectEffect(e){return this._hasPropertyEffect(e,Ni.REFLECT)}_hasComputedEffect(e){return this._hasPropertyEffect(e,Ni.COMPUTE)}_setPendingPropertyOrPath(e,t,i,n){if(n||ni(Array.isArray(e)?e[0]:e)!==e){if(!n){let i=hi(this,e);if(!(e=ci(this,e,t))||!super._shouldPropertyChange(e,t,i))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(e,t,i))return function(e,t,i){let n=e.__dataLinkedPaths;if(n){let s;for(let o in n){let r=n[o];oi(o,t)?(s=ri(o,r,t),e._setPendingPropertyOrPath(s,i,!0,!0)):oi(r,t)&&(s=ri(r,o,t),e._setPendingPropertyOrPath(s,i,!0,!0))}}}(this,e,t),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[e])return this._setPendingProperty(e,t,i);this[e]=t}return!1}_setUnmanagedPropertyToNode(e,t,i){i===e[t]&&"object"!=typeof i||("className"===t&&(e=ti(e)),e[t]=i)}_setPendingProperty(e,t,i){let n=this.__dataHasPaths&&ii(e),s=n?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(e,t,s[e])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),e in this.__dataOld||(this.__dataOld[e]=this.__data[e]),n?this.__dataTemp[e]=t:this.__data[e]=t,this.__dataPending[e]=t,(n||this[Ni.NOTIFY]&&this[Ni.NOTIFY][e])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[e]=i),!0)}_setProperty(e,t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(e){this.__dataPendingClients=this.__dataPendingClients||[],e!==this&&this.__dataPendingClients.push(e)}_flushProperties(){this.__dataCounter++,super._flushProperties(),this.__dataCounter--}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let e=this.__dataPendingClients;if(e){this.__dataPendingClients=null;for(let t=0;t<e.length;t++){let i=e[t];i.__dataEnabled?i.__dataPending&&i._flushProperties():i._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(e,t){for(let i in e)!t&&this[Ni.READ_ONLY]&&this[Ni.READ_ONLY][i]||this._setPendingPropertyOrPath(i,e[i],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(e,t,i){let n=this.__dataHasPaths;this.__dataHasPaths=!1,function(e,t,i,n){let s=e[Ni.COMPUTE];if(s){let o=t;for(;Di(e,s,o,i,n);)Object.assign(i,e.__dataOld),Object.assign(t,e.__dataPending),o=e.__dataPending,e.__dataPending=null}}(this,t,i,n);let s=this.__dataToNotify;this.__dataToNotify=null,this._propagatePropertyChanges(t,i,n),this._flushClients(),Di(this,this[Ni.REFLECT],t,i,n),Di(this,this[Ni.OBSERVE],t,i,n),s&&function(e,t,i,n,s){let o,r,a=e[Ni.NOTIFY],l=Oi++;for(let r in t)t[r]&&(a&&Bi(e,a,l,r,i,n,s)?o=!0:s&&qi(e,r,i)&&(o=!0));o&&(r=e.__dataHost)&&r._invalidateProperties&&r._invalidateProperties()}(this,s,t,i,n),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(e,t,i){this[Ni.PROPAGATE]&&Di(this,this[Ni.PROPAGATE],e,t,i);let n=this.__templateInfo;for(;n;)Di(this,n.propertyEffects,e,t,i,n.nodeList),n=n.nextTemplateInfo}linkPaths(e,t){e=ai(e),t=ai(t),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[e]=t}unlinkPaths(e){e=ai(e),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[e]}notifySplices(e,t){let i={path:""};ln(this,hi(this,e,i),i.path,t)}get(e,t){return hi(t||this,e)}set(e,t,i){i?ci(i,e,t):this[Ni.READ_ONLY]&&this[Ni.READ_ONLY][e]||this._setPendingPropertyOrPath(e,t,!0)&&this._invalidateProperties()}push(e,...t){let i={path:""},n=hi(this,e,i),s=n.length,o=n.push(...t);return t.length&&hn(this,n,i.path,s,t.length,[]),o}pop(e){let t={path:""},i=hi(this,e,t),n=Boolean(i.length),s=i.pop();return n&&hn(this,i,t.path,i.length,0,[s]),s}splice(e,t,i,...n){let s,o={path:""},r=hi(this,e,o);return t<0?t=r.length-Math.floor(-t):t&&(t=Math.floor(t)),s=2===arguments.length?r.splice(t):r.splice(t,i,...n),(n.length||s.length)&&hn(this,r,o.path,t,n.length,s),s}shift(e){let t={path:""},i=hi(this,e,t),n=Boolean(i.length),s=i.shift();return n&&hn(this,i,t.path,0,0,[s]),s}unshift(e,...t){let i={path:""},n=hi(this,e,i),s=n.unshift(...t);return t.length&&hn(this,n,i.path,0,t.length,[]),s}notifyPath(e,t){let i;if(1==arguments.length){let n={path:""};t=hi(this,e,n),i=n.path}else i=Array.isArray(e)?ai(e):e;this._setPendingPropertyOrPath(i,t,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(e,t){var i;this._addPropertyEffect(e,Ni.READ_ONLY),t&&(this["_set"+(i=e,i[0].toUpperCase()+i.substring(1))]=function(t){this._setProperty(e,t)})}_createPropertyObserver(e,t,i){let n={property:e,method:t,dynamicFn:Boolean(i)};this._addPropertyEffect(e,Ni.OBSERVE,{fn:Ui,info:n,trigger:{name:e}}),i&&this._addPropertyEffect(t,Ni.OBSERVE,{fn:Ui,info:n,trigger:{name:t}})}_createMethodObserver(e,t){let i=on(e);if(!i)throw new Error("Malformed observer expression '"+e+"'");Qi(this,i,Ni.OBSERVE,en,null,t)}_createNotifyingProperty(e){this._addPropertyEffect(e,Ni.NOTIFY,{fn:ji,info:{eventName:_i(e)+"-changed",property:e}})}_createReflectedProperty(e){let t=this.constructor.attributeNameForProperty(e);"-"===t[0]?console.warn("Property "+e+" cannot be reflected to attribute "+t+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(e,Ni.REFLECT,{fn:Ki,info:{attrName:t}})}_createComputedProperty(e,t,i){let n=on(t);if(!n)throw new Error("Malformed computed expression '"+t+"'");Qi(this,n,Ni.COMPUTE,Yi,e,i)}_marshalArgs(e,t,i){const n=this.__data,s=[];for(let o=0,r=e.length;o<r;o++){let{name:r,structured:a,wildcard:l,value:h,literal:c}=e[o];if(!c)if(l){const e=oi(r,t),s=an(n,i,e?t:r);h={path:e?t:r,value:s,base:e?hi(n,r):s}}else h=a?an(n,i,r):n[r];s[o]=h}return s}static addPropertyEffect(e,t,i){this.prototype._addPropertyEffect(e,t,i)}static createPropertyObserver(e,t,i){this.prototype._createPropertyObserver(e,t,i)}static createMethodObserver(e,t){this.prototype._createMethodObserver(e,t)}static createNotifyingProperty(e){this.prototype._createNotifyingProperty(e)}static createReadOnlyProperty(e,t){this.prototype._createReadOnlyProperty(e,t)}static createReflectedProperty(e){this.prototype._createReflectedProperty(e)}static createComputedProperty(e,t,i){this.prototype._createComputedProperty(e,t,i)}static bindTemplate(e){return this.prototype._bindTemplate(e)}_bindTemplate(e,t){let i=this.constructor._parseTemplate(e),n=this.__templateInfo==i;if(!n)for(let e in i.propertyEffects)this._createPropertyAccessor(e);if(t&&((i=Object.create(i)).wasPreBound=n,!n&&this.__templateInfo)){let e=this.__templateInfoLast||this.__templateInfo;return this.__templateInfoLast=e.nextTemplateInfo=i,i.previousTemplateInfo=e,i}return this.__templateInfo=i}static _addTemplatePropertyEffect(e,t,i){(e.hostProps=e.hostProps||{})[t]=!0;let n=e.propertyEffects=e.propertyEffects||{};(n[t]=n[t]||[]).push(i)}_stampTemplate(e){dn.beginHosting(this);let t=super._stampTemplate(e);dn.endHosting(this);let i=this._bindTemplate(e,!0);if(i.nodeList=t.nodeList,!i.wasPreBound){let e=i.childNodes=[];for(let i=t.firstChild;i;i=i.nextSibling)e.push(i)}return t.templateInfo=i,function(e,t){let{nodeList:i,nodeInfoList:n}=t;if(n.length)for(let t=0;t<n.length;t++){let s=n[t],o=i[t],r=s.bindings;if(r)for(let t=0;t<r.length;t++){let i=r[t];Zi(o,i),Gi(o,e,i)}o.__dataHost=e}}(this,i),this.__dataReady&&Di(this,i.propertyEffects,this.__data,null,!1,i.nodeList),t}_removeBoundDom(e){let t=e.templateInfo;t.previousTemplateInfo&&(t.previousTemplateInfo.nextTemplateInfo=t.nextTemplateInfo),t.nextTemplateInfo&&(t.nextTemplateInfo.previousTemplateInfo=t.previousTemplateInfo),this.__templateInfoLast==t&&(this.__templateInfoLast=t.previousTemplateInfo),t.previousTemplateInfo=t.nextTemplateInfo=null;let i=t.childNodes;for(let e=0;e<i.length;e++){let t=i[e];t.parentNode.removeChild(t)}}static _parseTemplateNode(e,i,n){let s=t._parseTemplateNode.call(this,e,i,n);if(e.nodeType===Node.TEXT_NODE){let t=this._parseBindings(e.textContent,i);t&&(e.textContent=sn(t)||" ",Wi(this,i,n,"text","textContent",t),s=!0)}return s}static _parseTemplateNodeAttribute(e,i,n,s,o){let r=this._parseBindings(o,i);if(r){let t=s,o="property";Vi.test(s)?o="attribute":"$"==s[s.length-1]&&(s=s.slice(0,-1),o="attribute");let a=sn(r);return a&&"attribute"==o&&("class"==s&&e.hasAttribute("class")&&(a+=" "+e.getAttribute(s)),e.setAttribute(s,a)),"input"===e.localName&&"value"===t&&e.setAttribute(t,""),e.removeAttribute(t),"property"===o&&(s=fi(s)),Wi(this,i,n,o,s,r,a),!0}return t._parseTemplateNodeAttribute.call(this,e,i,n,s,o)}static _parseTemplateNestedTemplate(e,i,n){let s=t._parseTemplateNestedTemplate.call(this,e,i,n),o=n.templateInfo.hostProps;for(let e in o){Wi(this,i,n,"property","_host_"+e,[{mode:"{",source:e,dependencies:[e]}])}return s}static _parseBindings(e,t){let i,n=[],s=0;for(;null!==(i=nn.exec(e));){i.index>s&&n.push({literal:e.slice(s,i.index)});let o=i[1][0],r=Boolean(i[2]),a=i[3].trim(),l=!1,h="",c=-1;"{"==o&&(c=a.indexOf("::"))>0&&(h=a.substring(c+2),a=a.substring(0,c),l=!0);let d=on(a),p=[];if(d){let{args:e,methodName:i}=d;for(let t=0;t<e.length;t++){let i=e[t];i.literal||p.push(i)}let n=t.dynamicFns;(n&&n[i]||d.static)&&(p.push(i),d.dynamicFn=!0)}else p.push(a);n.push({source:a,mode:o,negate:r,customEvent:l,signature:d,dependencies:p,event:h}),s=nn.lastIndex}if(s&&s<e.length){let t=e.substring(s);t&&n.push({literal:t})}return n.length?n:null}static _evaluateBinding(e,t,i,n,s,o){let r;return r=t.signature?en(e,i,n,0,t.signature):i!=t.source?hi(e,t.source):o&&ii(i)?hi(e,i):e.__data[i],t.negate&&(r=!r),r}}});const dn=new class{constructor(){this.stack=[]}registerHost(e){if(this.stack.length){this.stack[this.stack.length-1]._enqueueClient(e)}}beginHosting(e){this.stack.push(e)}endHosting(e){let t=this.stack.length;t&&this.stack[t-1]==e&&this.stack.pop()}};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const pn=[];const un=Rt(e=>{const t=Si(e);function i(e){const t=Object.getPrototypeOf(e);return t.prototype instanceof s?t:null}function n(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",e))){let t=null;if(e.hasOwnProperty(JSCompiler_renameProperty("properties",e))){const i=e.properties;i&&(t=
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function(e){const t={};for(let i in e){const n=e[i];t[i]="function"==typeof n?{type:n}:n}return t}(i))}e.__ownProperties=t}return e.__ownProperties}class s extends t{static get observedAttributes(){if(!this.hasOwnProperty("__observedAttributes")){e=this.prototype,pn.push(e);const t=this._properties;this.__observedAttributes=t?Object.keys(t).map(e=>this.attributeNameForProperty(e)):[]}var e;return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const e=i(this);e&&e.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const e=n(this);e&&this.createProperties(e)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const e=i(this);this.__properties=Object.assign({},e&&e._properties,n(this))}return this.__properties}static typeForProperty(e){const t=this._properties[e];return t&&t.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return s}),fn="3.3.0",_n=window.ShadyCSS&&window.ShadyCSS.cssBuild,mn=Rt(e=>{const t=un(cn(e));function i(e,t,i,n){if(!_n){const s=t.content.querySelectorAll("style"),o=Zt(t),r=function(e){let t=Yt(e);return t?Gt(t):[]}(i),a=t.content.firstElementChild;for(let i=0;i<r.length;i++){let s=r[i];s.textContent=e._processStyleText(s.textContent,n),t.content.insertBefore(s,a)}let l=0;for(let t=0;t<o.length;t++){let i=o[t],r=s[l];r!==i?(i=i.cloneNode(!0),r.parentNode.insertBefore(i,r)):l++,i.textContent=e._processStyleText(i.textContent,n)}}window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,i)}return class extends t{static get polymerElementVersion(){return fn}static _finalizeClass(){t._finalizeClass.call(this);const e=((i=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",i))||(i.__ownObservers=i.hasOwnProperty(JSCompiler_renameProperty("observers",i))?i.observers:null),i.__ownObservers);var i;e&&this.createObservers(e,this._properties),this._prepareTemplate()}static _prepareTemplate(){let e=this.template;e&&("string"==typeof e?(console.error("template getter must return HTMLTemplateElement"),e=null):It||(e=e.cloneNode(!0))),this.prototype._template=e}static createProperties(e){for(let o in e)t=this.prototype,i=o,n=e[o],s=e,n.computed&&(n.readOnly=!0),n.computed&&(t._hasReadOnlyEffect(i)?console.warn(`Cannot redefine computed property '${i}'.`):t._createComputedProperty(i,n.computed,s)),n.readOnly&&!t._hasReadOnlyEffect(i)?t._createReadOnlyProperty(i,!n.computed):!1===n.readOnly&&t._hasReadOnlyEffect(i)&&console.warn(`Cannot make readOnly property '${i}' non-readOnly.`),n.reflectToAttribute&&!t._hasReflectEffect(i)?t._createReflectedProperty(i):!1===n.reflectToAttribute&&t._hasReflectEffect(i)&&console.warn(`Cannot make reflected property '${i}' non-reflected.`),n.notify&&!t._hasNotifyEffect(i)?t._createNotifyingProperty(i):!1===n.notify&&t._hasNotifyEffect(i)&&console.warn(`Cannot make notify property '${i}' non-notify.`),n.observer&&t._createPropertyObserver(i,n.observer,s[n.observer]),t._addPropertyToAttributeMap(i);var t,i,n,s}static createObservers(e,t){const i=this.prototype;for(let n=0;n<e.length;n++)i._createMethodObserver(e[n],t)}static get template(){return this.hasOwnProperty(JSCompiler_renameProperty("_template",this))||(this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:function(e){let t=null;if(e&&(!At||Lt)&&(t=qt.import(e,"template"),At&&!t))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${e}`);return t}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template),this._template}static set template(e){this._template=e}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const e=this.importMeta;if(e)this._importPath=kt(e.url);else{const e=qt.import(this.is);this._importPath=e&&e.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=Ht,this.importPath=this.constructor.importPath;let e=function(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",e))){e.__propertyDefaults=null;let t=e._properties;for(let i in t){let n=t[i];"value"in n&&(e.__propertyDefaults=e.__propertyDefaults||{},e.__propertyDefaults[i]=n)}}return e.__propertyDefaults}(this.constructor);if(e)for(let t in e){let i=e[t];if(!this.hasOwnProperty(t)){let e="function"==typeof i.value?i.value.call(this):i.value;this._hasAccessor(t)?this._setPendingProperty(t,e,!0):this[t]=e}}}static _processStyleText(e,t){return xt(e,t)}static _finalizeTemplate(e){const t=this.prototype._template;if(t&&!t.__polymerFinalized){t.__polymerFinalized=!0;const n=this.importPath;i(this,t,e,n?St(n):""),this.prototype._bindTemplate(t)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(e){const t=ti(this);if(t.attachShadow)return e?(t.shadowRoot||(t.attachShadow({mode:"open",shadyUpgradeFragment:e}),t.shadowRoot.appendChild(e)),Pt&&window.ShadyDOM&&ShadyDOM.flushInitial(t.shadowRoot),t.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(e){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,e)}resolveUrl(e,t){return!t&&this.importPath&&(t=St(this.importPath)),St(e,t)}static _parseTemplateContent(e,i,n){return i.dynamicFns=i.dynamicFns||this._properties,t._parseTemplateContent.call(this,e,i,n)}static _addTemplatePropertyEffect(e,i,n){return!It||i in this._properties||console.warn(`Property '${i}' used in template but not declared in 'properties'; `+"attribute will not be observed."),t._addTemplatePropertyEffect.call(this,e,i,n)}}});
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class gn{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(e,t){this._asyncModule=e,this._callback=t,this._timer=this._asyncModule.run(()=>{this._timer=null,vn.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),vn.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(e,t,i){return e instanceof gn?e._cancelAsync():e=new gn,e.setConfig(t,i),e}}let vn=new Set;const yn=function(e){vn.add(e)},bn=function(){const e=Boolean(vn.size);return vn.forEach(e=>{try{e.flush()}catch(e){setTimeout(()=>{throw e})}}),e};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let wn="string"==typeof document.head.style.touchAction,Cn="__polymerGestures",zn="__polymerGesturesHandled",Sn="__polymerGesturesTouchAction",xn=25,kn=5,En=2500,Hn=["mousedown","mousemove","mouseup","click"],Tn=[0,1,4,2],Mn=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function An(e){return Hn.indexOf(e)>-1}let Ln=!1;function In(e){if(!An(e)&&"touchend"!==e)return wn&&Ln&&Mt?{passive:!0}:void 0}!function(){try{let e=Object.defineProperty({},"passive",{get(){Ln=!0}});window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){}}();let Pn=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const On=[],Nn={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},Vn={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function Rn(e){let t=Array.prototype.slice.call(e.labels||[]);if(!t.length){t=[];let i=e.getRootNode();if(e.id){let n=i.querySelectorAll(`label[for = ${e.id}]`);for(let e=0;e<n.length;e++)t.push(n[e])}}return t}let Dn=function(e){let t=e.sourceCapabilities;var i;if((!t||t.firesTouchEvents)&&(e[zn]={skip:!0},"click"===e.type)){let t=!1,n=jn(e);for(let e=0;e<n.length;e++){if(n[e].nodeType===Node.ELEMENT_NODE)if("label"===n[e].localName)On.push(n[e]);else if(i=n[e],Nn[i.localName]){let i=Rn(n[e]);for(let e=0;e<i.length;e++)t=t||On.indexOf(i[e])>-1}if(n[e]===Un.mouse.target)return}if(t)return;e.preventDefault(),e.stopPropagation()}};function Bn(e){let t=Pn?["click"]:Hn;for(let i,n=0;n<t.length;n++)i=t[n],e?(On.length=0,document.addEventListener(i,Dn,!0)):document.removeEventListener(i,Dn,!0)}function Fn(e){let t=e.type;if(!An(t))return!1;if("mousemove"===t){let t=void 0===e.buttons?1:e.buttons;return e instanceof window.MouseEvent&&!Mn&&(t=Tn[e.which]||0),Boolean(1&t)}return 0===(void 0===e.button?0:e.button)}let Un={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function qn(e,t,i){e.movefn=t,e.upfn=i,document.addEventListener("mousemove",t),document.addEventListener("mouseup",i)}function $n(e){document.removeEventListener("mousemove",e.movefn),document.removeEventListener("mouseup",e.upfn),e.movefn=null,e.upfn=null}Ot&&document.addEventListener("touchend",(function(e){if(!Ot)return;Un.mouse.mouseIgnoreJob||Bn(!0),Un.mouse.target=jn(e)[0],Un.mouse.mouseIgnoreJob=gn.debounce(Un.mouse.mouseIgnoreJob,wi.after(En),(function(){Bn(),Un.mouse.target=null,Un.mouse.mouseIgnoreJob=null}))}),!!Ln&&{passive:!0});const jn=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:e=>e.composedPath&&e.composedPath()||[],Kn={},Yn=[];function Wn(e){const t=jn(e);return t.length>0?t[0]:e.target}function Jn(e){let t,i=e.type,n=e.currentTarget[Cn];if(!n)return;let s=n[i];if(s){if(!e[zn]&&(e[zn]={},"touch"===i.slice(0,5))){let t=(e=e).changedTouches[0];if("touchstart"===i&&1===e.touches.length&&(Un.touch.id=t.identifier),Un.touch.id!==t.identifier)return;wn||"touchstart"!==i&&"touchmove"!==i||function(e){let t=e.changedTouches[0],i=e.type;if("touchstart"===i)Un.touch.x=t.clientX,Un.touch.y=t.clientY,Un.touch.scrollDecided=!1;else if("touchmove"===i){if(Un.touch.scrollDecided)return;Un.touch.scrollDecided=!0;let i=function(e){let t="auto",i=jn(e);for(let e,n=0;n<i.length;n++)if((e=i[n])[Sn]){t=e[Sn];break}return t}(e),n=!1,s=Math.abs(Un.touch.x-t.clientX),o=Math.abs(Un.touch.y-t.clientY);e.cancelable&&("none"===i?n=!0:"pan-x"===i?n=o>s:"pan-y"===i&&(n=s>o)),n?e.preventDefault():ts("track")}}(e)}if(!(t=e[zn]).skip){for(let i,n=0;n<Yn.length;n++)s[(i=Yn[n]).name]&&!t[i.name]&&i.flow&&i.flow.start.indexOf(e.type)>-1&&i.reset&&i.reset();for(let n,o=0;o<Yn.length;o++)s[(n=Yn[o]).name]&&!t[n.name]&&(t[n.name]=!0,n[i](e))}}}function Xn(e,t,i){return!!Kn[t]&&(function(e,t,i){let n=Kn[t],s=n.deps,o=n.name,r=e[Cn];r||(e[Cn]=r={});for(let t,i,n=0;n<s.length;n++)t=s[n],Pn&&An(t)&&"click"!==t||((i=r[t])||(r[t]=i={_count:0}),0===i._count&&e.addEventListener(t,Jn,In(t)),i[o]=(i[o]||0)+1,i._count=(i._count||0)+1);e.addEventListener(t,i),n.touchAction&&Qn(e,n.touchAction)}(e,t,i),!0)}function Zn(e,t,i){return!!Kn[t]&&(function(e,t,i){let n=Kn[t],s=n.deps,o=n.name,r=e[Cn];if(r)for(let t,i,n=0;n<s.length;n++)t=s[n],(i=r[t])&&i[o]&&(i[o]=(i[o]||1)-1,i._count=(i._count||1)-1,0===i._count&&e.removeEventListener(t,Jn,In(t)));e.removeEventListener(t,i)}(e,t,i),!0)}function Gn(e){Yn.push(e);for(let t=0;t<e.emits.length;t++)Kn[e.emits[t]]=e}function Qn(e,t){wn&&e instanceof HTMLElement&&Ci.run(()=>{e.style.touchAction=t}),e[Sn]=t}function es(e,t,i){let n=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(n.detail=i,ti(e).dispatchEvent(n),n.defaultPrevented){let e=i.preventer||i.sourceEvent;e&&e.preventDefault&&e.preventDefault()}}function ts(e){let t=function(e){for(let t,i=0;i<Yn.length;i++){t=Yn[i];for(let i,n=0;n<t.emits.length;n++)if((i=t.emits[n])===e)return t}return null}(e);t.info&&(t.info.prevent=!0)}function is(e,t,i,n){t&&es(t,e,{x:i.clientX,y:i.clientY,sourceEvent:i,preventer:n,prevent:function(e){return ts(e)}})}function ns(e,t,i){if(e.prevent)return!1;if(e.started)return!0;let n=Math.abs(e.x-t),s=Math.abs(e.y-i);return n>=kn||s>=kn}function ss(e,t,i){if(!t)return;let n,s=e.moves[e.moves.length-2],o=e.moves[e.moves.length-1],r=o.x-e.x,a=o.y-e.y,l=0;s&&(n=o.x-s.x,l=o.y-s.y),es(t,"track",{state:e.state,x:i.clientX,y:i.clientY,dx:r,dy:a,ddx:n,ddy:l,sourceEvent:i,hover:function(){return function(e,t){let i=document.elementFromPoint(e,t),n=i;for(;n&&n.shadowRoot&&!window.ShadyDOM;){if(n===(n=n.shadowRoot.elementFromPoint(e,t)))break;n&&(i=n)}return i}(i.clientX,i.clientY)}})}function os(e,t,i){let n=Math.abs(t.clientX-e.x),s=Math.abs(t.clientY-e.y),o=Wn(i||t);!o||Vn[o.localName]&&o.hasAttribute("disabled")||(isNaN(n)||isNaN(s)||n<=xn&&s<=xn||function(e){if("click"===e.type){if(0===e.detail)return!0;let t=Wn(e);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;let i=t.getBoundingClientRect(),n=e.pageX,s=e.pageY;return!(n>=i.left&&n<=i.right&&s>=i.top&&s<=i.bottom)}return!1}(t))&&(e.prevent||es(o,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:i}))}Gn({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){$n(this.info)},mousedown:function(e){if(!Fn(e))return;let t=Wn(e),i=this;qn(this.info,(function(e){Fn(e)||(is("up",t,e),$n(i.info))}),(function(e){Fn(e)&&is("up",t,e),$n(i.info)})),is("down",t,e)},touchstart:function(e){is("down",Wn(e),e.changedTouches[0],e)},touchend:function(e){is("up",Wn(e),e.changedTouches[0],e)}}),Gn({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(e){this.moves.length>2&&this.moves.shift(),this.moves.push(e)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,$n(this.info)},mousedown:function(e){if(!Fn(e))return;let t=Wn(e),i=this,n=function(e){let n=e.clientX,s=e.clientY;ns(i.info,n,s)&&(i.info.state=i.info.started?"mouseup"===e.type?"end":"track":"start","start"===i.info.state&&ts("tap"),i.info.addMove({x:n,y:s}),Fn(e)||(i.info.state="end",$n(i.info)),t&&ss(i.info,t,e),i.info.started=!0)};qn(this.info,n,(function(e){i.info.started&&n(e),$n(i.info)})),this.info.x=e.clientX,this.info.y=e.clientY},touchstart:function(e){let t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove:function(e){let t=Wn(e),i=e.changedTouches[0],n=i.clientX,s=i.clientY;ns(this.info,n,s)&&("start"===this.info.state&&ts("tap"),this.info.addMove({x:n,y:s}),ss(this.info,t,i),this.info.state="track",this.info.started=!0)},touchend:function(e){let t=Wn(e),i=e.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:i.clientX,y:i.clientY}),ss(this.info,t,i))}}),Gn({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(e){Fn(e)&&(this.info.x=e.clientX,this.info.y=e.clientY)},click:function(e){Fn(e)&&os(this.info,e)},touchstart:function(e){const t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend:function(e){os(this.info,e.changedTouches[0],e)}});const rs=Xn,as=Rt(e=>{return class extends e{_addEventListenerToNode(e,t,i){Xn(e,t,i)||super._addEventListenerToNode(e,t,i)}_removeEventListenerFromNode(e,t,i){Zn(e,t,i)||super._removeEventListenerFromNode(e,t,i)}}}),ls=/:host\(:dir\((ltr|rtl)\)\)/g,hs=':host([dir="$1"])',cs=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,ds=':host([dir="$2"]) $1',ps=/:dir\((?:ltr|rtl)\)/,us=Boolean(window.ShadyDOM&&window.ShadyDOM.inUse),fs=[];let _s=null,ms="";function gs(){ms=document.documentElement.getAttribute("dir")}function vs(e){if(!e.__autoDirOptOut){e.setAttribute("dir",ms)}}function ys(){gs(),ms=document.documentElement.getAttribute("dir");for(let e=0;e<fs.length;e++)vs(fs[e])}const bs=Rt(e=>{us||_s||(gs(),(_s=new MutationObserver(ys)).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const t=Ei(e);class i extends t{static _processStyleText(e,i){return e=t._processStyleText.call(this,e,i),!us&&ps.test(e)&&(e=this._replaceDirInCssText(e),this.__activateDir=!0),e}static _replaceDirInCssText(e){let t=e;return t=(t=t.replace(ls,hs)).replace(cs,ds)}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){t.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(_s&&_s.takeRecords().length&&ys(),fs.push(this),vs(this))}disconnectedCallback(){if(t.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const e=fs.indexOf(this);e>-1&&fs.splice(e,1)}}}return i.__activateDir=!1,i});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function ws(){document.body.removeAttribute("unresolved")}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function Cs(e,t,i){return{index:e,removed:t,addedCount:i}}"interactive"===document.readyState||"complete"===document.readyState?ws():window.addEventListener("DOMContentLoaded",ws);const zs=0,Ss=1,xs=2,ks=3;function Es(e,t,i,n,s,o){let r,a=0,l=0,h=Math.min(i-t,o-s);if(0==t&&0==s&&(a=function(e,t,i){for(let n=0;n<i;n++)if(!Ts(e[n],t[n]))return n;return i}(e,n,h)),i==e.length&&o==n.length&&(l=function(e,t,i){let n=e.length,s=t.length,o=0;for(;o<i&&Ts(e[--n],t[--s]);)o++;return o}(e,n,h-a)),s+=a,o-=l,(i-=l)-(t+=a)==0&&o-s==0)return[];if(t==i){for(r=Cs(t,[],0);s<o;)r.removed.push(n[s++]);return[r]}if(s==o)return[Cs(t,[],i-t)];let c=function(e){let t=e.length-1,i=e[0].length-1,n=e[t][i],s=[];for(;t>0||i>0;){if(0==t){s.push(xs),i--;continue}if(0==i){s.push(ks),t--;continue}let o,r=e[t-1][i-1],a=e[t-1][i],l=e[t][i-1];(o=a<l?a<r?a:r:l<r?l:r)==r?(r==n?s.push(zs):(s.push(Ss),n=r),t--,i--):o==a?(s.push(ks),t--,n=a):(s.push(xs),i--,n=l)}return s.reverse(),s}(function(e,t,i,n,s,o){let r=o-s+1,a=i-t+1,l=new Array(r);for(let e=0;e<r;e++)l[e]=new Array(a),l[e][0]=e;for(let e=0;e<a;e++)l[0][e]=e;for(let i=1;i<r;i++)for(let o=1;o<a;o++)if(Ts(e[t+o-1],n[s+i-1]))l[i][o]=l[i-1][o-1];else{let e=l[i-1][o]+1,t=l[i][o-1]+1;l[i][o]=e<t?e:t}return l}(e,t,i,n,s,o));r=void 0;let d=[],p=t,u=s;for(let e=0;e<c.length;e++)switch(c[e]){case zs:r&&(d.push(r),r=void 0),p++,u++;break;case Ss:r||(r=Cs(p,[],0)),r.addedCount++,p++,r.removed.push(n[u]),u++;break;case xs:r||(r=Cs(p,[],0)),r.addedCount++,p++;break;case ks:r||(r=Cs(p,[],0)),r.removed.push(n[u]),u++}return r&&d.push(r),d}function Hs(e,t){return Es(e,0,e.length,t,0,t.length)}function Ts(e,t){return e===t}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function Ms(e){return"slot"===e.localName}let As=class{static getFlattenedNodes(e){const t=ti(e);return Ms(e)?(e=e,t.assignedNodes({flatten:!0})):Array.from(t.childNodes).map(e=>Ms(e)?ti(e=e).assignedNodes({flatten:!0}):[e]).reduce((e,t)=>e.concat(t),[])}constructor(e,t){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=e,this.callback=t,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),this._schedule()}connect(){Ms(this._target)?this._listenSlots([this._target]):ti(this._target).children&&(this._listenSlots(ti(this._target).children),window.ShadyDOM?this._shadyChildrenObserver=ShadyDOM.observeChildren(this._target,e=>{this._processMutations(e)}):(this._nativeChildrenObserver=new MutationObserver(e=>{this._processMutations(e)}),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){Ms(this._target)?this._unlistenSlots([this._target]):ti(this._target).children&&(this._unlistenSlots(ti(this._target).children),window.ShadyDOM&&this._shadyChildrenObserver?(ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,Ci.run(()=>this.flush()))}_processMutations(e){this._processSlotMutations(e),this.flush()}_processSlotMutations(e){if(e)for(let t=0;t<e.length;t++){let i=e[t];i.addedNodes&&this._listenSlots(i.addedNodes),i.removedNodes&&this._unlistenSlots(i.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let e={target:this._target,addedNodes:[],removedNodes:[]},t=this.constructor.getFlattenedNodes(this._target),i=Hs(t,this._effectiveNodes);for(let t,n=0;n<i.length&&(t=i[n]);n++)for(let i,n=0;n<t.removed.length&&(i=t.removed[n]);n++)e.removedNodes.push(i);for(let n,s=0;s<i.length&&(n=i[s]);s++)for(let i=n.index;i<n.index+n.addedCount;i++)e.addedNodes.push(t[i]);this._effectiveNodes=t;let n=!1;return(e.addedNodes.length||e.removedNodes.length)&&(n=!0,this.callback.call(this._target,e)),n}_listenSlots(e){for(let t=0;t<e.length;t++){let i=e[t];Ms(i)&&i.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(e){for(let t=0;t<e.length;t++){let i=e[t];Ms(i)&&i.removeEventListener("slotchange",this._boundSchedule)}}};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const Ls=function(){let e,t;do{e=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),t=bn()}while(e||t)},Is=Element.prototype,Ps=Is.matches||Is.matchesSelector||Is.mozMatchesSelector||Is.msMatchesSelector||Is.oMatchesSelector||Is.webkitMatchesSelector,Os=function(e,t){return Ps.call(e,t)};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class Ns{constructor(e){window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.patch(e),this.node=e}observeNodes(e){return new As(this.node,e)}unobserveNodes(e){e.disconnect()}notifyObserver(){}deepContains(e){if(ti(this.node).contains(e))return!0;let t=e,i=e.ownerDocument;for(;t&&t!==i&&t!==this.node;)t=ti(t).parentNode||ti(t).host;return t===this.node}getOwnerRoot(){return ti(this.node).getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?ti(this.node).assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let e=[],t=ti(this.node).assignedSlot;for(;t;)e.push(t),t=ti(t).assignedSlot;return e}importNode(e,t){let i=this.node instanceof Document?this.node:this.node.ownerDocument;return ti(i).importNode(e,t)}getEffectiveChildNodes(){return As.getFlattenedNodes(this.node)}queryDistributedElements(e){let t=this.getEffectiveChildNodes(),i=[];for(let n,s=0,o=t.length;s<o&&(n=t[s]);s++)n.nodeType===Node.ELEMENT_NODE&&Os(n,e)&&i.push(n);return i}get activeElement(){let e=this.node;return void 0!==e._activeElement?e._activeElement:e.activeElement}}function Vs(e,t){for(let i=0;i<t.length;i++){let n=t[i];Object.defineProperty(e,n,{get:function(){return this.node[n]},configurable:!0})}}class Rs{constructor(e){this.event=e}get rootTarget(){return this.path[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}Ns.prototype.cloneNode,Ns.prototype.appendChild,Ns.prototype.insertBefore,Ns.prototype.removeChild,Ns.prototype.replaceChild,Ns.prototype.setAttribute,Ns.prototype.removeAttribute,Ns.prototype.querySelector,Ns.prototype.querySelectorAll,Ns.prototype.parentNode,Ns.prototype.firstChild,Ns.prototype.lastChild,Ns.prototype.nextSibling,Ns.prototype.previousSibling,Ns.prototype.firstElementChild,Ns.prototype.lastElementChild,Ns.prototype.nextElementSibling,Ns.prototype.previousElementSibling,Ns.prototype.childNodes,Ns.prototype.children,Ns.prototype.classList,Ns.prototype.textContent,Ns.prototype.innerHTML;let Ds=Ns;if(window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.noPatch&&window.ShadyDOM.Wrapper){class e extends window.ShadyDOM.Wrapper{}Object.getOwnPropertyNames(Ns.prototype).forEach(t=>{"activeElement"!=t&&(e.prototype[t]=Ns.prototype[t])}),Vs(e.prototype,["classList"]),Ds=e,Object.defineProperties(Rs.prototype,{localTarget:{get(){const e=this.event.currentTarget,t=e&&Bs(e).getOwnerRoot(),i=this.path;for(let e=0;e<i.length;e++){const n=i[e];if(Bs(n).getOwnerRoot()===t)return n}},configurable:!0},path:{get(){return window.ShadyDOM.composedPath(this.event)},configurable:!0}})}else!function(e,t){for(let i=0;i<t.length;i++){let n=t[i];e[n]=function(){return this.node[n].apply(this.node,arguments)}}}(Ns.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]),Vs(Ns.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]),function(e,t){for(let i=0;i<t.length;i++){let n=t[i];Object.defineProperty(e,n,{get:function(){return this.node[n]},set:function(e){this.node[n]=e},configurable:!0})}}(Ns.prototype,["textContent","innerHTML","className"]);const Bs=function(e){if((e=e||document)instanceof Ds)return e;if(e instanceof Rs)return e;let t=e.__domApi;return t||(t=e instanceof Event?new Rs(e):new Ds(e),e.__domApi=t),t},Fs=window.ShadyDOM,Us=window.ShadyCSS;function qs(e,t){return ti(e).getRootNode()===t}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let $s=window.ShadyCSS;const js=Rt(e=>{const t=bs(as(mn(e))),i={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class n extends t{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers}static get importMeta(){return this.prototype.importMeta}created(){}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.attached()}attached(){}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this.detached()}detached(){}attributeChangedCallback(e,t,i,n){t!==i&&(super.attributeChangedCallback(e,t,i,n),this.attributeChanged(e,t,i))}attributeChanged(e,t,i){}_initializeProperties(){let e=Object.getPrototypeOf(this);e.hasOwnProperty("__hasRegisterFinished")||(this._registered(),e.__hasRegisterFinished=!0),super._initializeProperties(),this.root=this,this.created(),this._applyListeners()}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(e){return this._serializeValue(e)}deserialize(e,t){return this._deserializeValue(e,t)}reflectPropertyToAttribute(e,t,i){this._propertyToAttribute(e,t,i)}serializeValueToAttribute(e,t,i){this._valueToNodeAttribute(i||this,e,t)}extend(e,t){if(!e||!t)return e||t;let i=Object.getOwnPropertyNames(t);for(let n,s=0;s<i.length&&(n=i[s]);s++){let i=Object.getOwnPropertyDescriptor(t,n);i&&Object.defineProperty(e,n,i)}return e}mixin(e,t){for(let i in t)e[i]=t[i];return e}chainObject(e,t){return e&&t&&e!==t&&(e.__proto__=t),e}instanceTemplate(e){let t=this.constructor._contentForTemplate(e);return document.importNode(t,!0)}fire(e,t,i){i=i||{},t=null==t?{}:t;let n=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});n.detail=t;let s=i.node||this;return ti(s).dispatchEvent(n),n}listen(e,t,i){e=e||this;let n=this.__boundListeners||(this.__boundListeners=new WeakMap),s=n.get(e);s||(s={},n.set(e,s));let o=t+i;s[o]||(s[o]=this._addMethodEventListenerToNode(e,t,i,this))}unlisten(e,t,i){e=e||this;let n=this.__boundListeners&&this.__boundListeners.get(e),s=t+i,o=n&&n[s];o&&(this._removeEventListenerFromNode(e,t,o),n[s]=null)}setScrollDirection(e,t){Qn(t||this,i[e]||"auto")}$$(e){return this.root.querySelector(e)}get domHost(){let e=ti(this).getRootNode();return e instanceof DocumentFragment?e.host:e}distributeContent(){const e=Bs(this);window.ShadyDOM&&e.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return Bs(this).getEffectiveChildNodes()}queryDistributedElements(e){return Bs(this).queryDistributedElements(e)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}getEffectiveTextContent(){let e=this.getEffectiveChildNodes(),t=[];for(let i,n=0;i=e[n];n++)i.nodeType!==Node.COMMENT_NODE&&t.push(i.textContent);return t.join("")}queryEffectiveChildren(e){let t=this.queryDistributedElements(e);return t&&t[0]}queryAllEffectiveChildren(e){return this.queryDistributedElements(e)}getContentChildNodes(e){let t=this.root.querySelector(e||"slot");return t?Bs(t).getDistributedNodes():[]}getContentChildren(e){return this.getContentChildNodes(e).filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}isLightDescendant(e){return this!==e&&ti(this).contains(e)&&ti(this).getRootNode()===ti(e).getRootNode()}isLocalDescendant(e){return this.root===ti(e).getRootNode()}scopeSubtree(e,t=!1){return function(e,t=!1){if(!Fs||!Us)return null;if(!Fs.handlesDynamicScoping)return null;const i=Us.ScopingShim;if(!i)return null;const n=i.scopeForNode(e),s=ti(e).getRootNode(),o=e=>{if(!qs(e,s))return;const t=Array.from(Fs.nativeMethods.querySelectorAll.call(e,"*"));t.push(e);for(let e=0;e<t.length;e++){const o=t[e];if(!qs(o,s))continue;const r=i.currentScopeForNode(o);r!==n&&(""!==r&&i.unscopeNode(o,r),i.scopeNode(o,n))}};if(o(e),t){const t=new MutationObserver(e=>{for(let t=0;t<e.length;t++){const i=e[t];for(let e=0;e<i.addedNodes.length;e++){const t=i.addedNodes[e];t.nodeType===Node.ELEMENT_NODE&&o(t)}}});return t.observe(e,{childList:!0,subtree:!0}),t}return null}(e,t)}getComputedStyleValue(e){return $s.getComputedStyleValue(this,e)}debounce(e,t,i){return this._debouncers=this._debouncers||{},this._debouncers[e]=gn.debounce(this._debouncers[e],i>0?wi.after(i):Ci,t.bind(this))}isDebouncerActive(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];return!(!t||!t.isActive())}flushDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.flush()}cancelDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.cancel()}async(e,t){return t>0?wi.run(e.bind(this),t):~Ci.run(e.bind(this))}cancelAsync(e){e<0?Ci.cancel(~e):wi.cancel(e)}create(e,t){let i=document.createElement(e);if(t)if(i.setProperties)i.setProperties(t);else for(let e in t)i[e]=t[e];return i}elementMatches(e,t){return Os(t||this,e)}toggleAttribute(e,t){let i=this;return 3===arguments.length&&(i=arguments[2]),1==arguments.length&&(t=!i.hasAttribute(e)),t?(ti(i).setAttribute(e,""),!0):(ti(i).removeAttribute(e),!1)}toggleClass(e,t,i){i=i||this,1==arguments.length&&(t=!i.classList.contains(e)),t?i.classList.add(e):i.classList.remove(e)}transform(e,t){(t=t||this).style.webkitTransform=e,t.style.transform=e}translate3d(e,t,i,n){n=n||this,this.transform("translate3d("+e+","+t+","+i+")",n)}arrayDelete(e,t){let i;if(Array.isArray(e)){if((i=e.indexOf(t))>=0)return e.splice(i,1)}else{if((i=hi(this,e).indexOf(t))>=0)return this.splice(e,i,1)}return null}_logger(e,t){switch(Array.isArray(t)&&1===t.length&&Array.isArray(t[0])&&(t=t[0]),e){case"log":case"warn":case"error":console[e](...t)}}_log(...e){this._logger("log",e)}_warn(...e){this._logger("warn",e)}_error(...e){this._logger("error",e)}_logf(e,...t){return["[%s::%s]",this.is,e,...t]}}return n.prototype.is="",n}),Ks={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,listeners:!0,hostAttributes:!0},Ys={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0,_noAccessors:!0},Ws=Object.assign({listeners:!0,hostAttributes:!0,properties:!0,observers:!0},Ys);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function Js(e,t,i,n){!function(e,t,i){const n=e._noAccessors,s=Object.getOwnPropertyNames(e);for(let o=0;o<s.length;o++){let r=s[o];if(!(r in i))if(n)t[r]=e[r];else{let i=Object.getOwnPropertyDescriptor(e,r);i&&(i.configurable=!0,Object.defineProperty(t,r,i))}}}(t,e,n);for(let e in Ks)t[e]&&(i[e]=i[e]||[],i[e].push(t[e]))}function Xs(e,t){for(const i in t){const n=e[i],s=t[i];e[i]=!("value"in s)&&n&&"value"in n?Object.assign({value:n.value},s):s}}function Zs(e,t,i){let n;const s={};class o extends t{static _finalizeClass(){if(this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this))){if(n)for(let e,t=0;t<n.length;t++)(e=n[t]).properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties);e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties),this._prepareTemplate()}else t._finalizeClass.call(this)}static get properties(){const t={};if(n)for(let e=0;e<n.length;e++)Xs(t,n[e].properties);return Xs(t,e.properties),t}static get observers(){let t=[];if(n)for(let e,i=0;i<n.length;i++)(e=n[i]).observers&&(t=t.concat(e.observers));return e.observers&&(t=t.concat(e.observers)),t}created(){super.created();const e=s.created;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}_registered(){const e=o.prototype;if(!e.hasOwnProperty("__hasRegisterFinished")){e.__hasRegisterFinished=!0,super._registered(),It&&r(e);const t=Object.getPrototypeOf(this);let i=s.beforeRegister;if(i)for(let e=0;e<i.length;e++)i[e].call(t);if(i=s.registered)for(let e=0;e<i.length;e++)i[e].call(t)}}_applyListeners(){super._applyListeners();const e=s.listeners;if(e)for(let t=0;t<e.length;t++){const i=e[t];if(i)for(let e in i)this._addMethodEventListenerToNode(this,e,i[e])}}_ensureAttributes(){const e=s.hostAttributes;if(e)for(let t=e.length-1;t>=0;t--){const i=e[t];for(let e in i)this._ensureAttribute(e,i[e])}super._ensureAttributes()}ready(){super.ready();let e=s.ready;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attached(){super.attached();let e=s.attached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}detached(){super.detached();let e=s.detached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attributeChanged(e,t,i){super.attributeChanged();let n=s.attributeChanged;if(n)for(let s=0;s<n.length;s++)n[s].call(this,e,t,i)}}if(i){Array.isArray(i)||(i=[i]);let e=t.prototype.behaviors;n=function e(t,i,n){i=i||[];for(let s=t.length-1;s>=0;s--){let o=t[s];o?Array.isArray(o)?e(o,i):i.indexOf(o)<0&&(!n||n.indexOf(o)<0)&&i.unshift(o):console.warn("behavior is null, check for missing or 404 import")}return i}(i,null,e),o.prototype.behaviors=e?e.concat(i):n}const r=t=>{n&&function(e,t,i){for(let n=0;n<t.length;n++)Js(e,t[n],i,Ws)}(t,n,s),Js(t,e,s,Ys)};return It||r(o.prototype),o.generatedFrom=e,o}const Gs=function(e){let t;return t="function"==typeof e?e:Gs.Class(e),customElements.define(t.is,t),t};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function Qs(e,t,i,n,s){let o;s&&(o="object"==typeof i&&null!==i)&&(n=e.__dataTemp[t]);let r=n!==i&&(n==n||i==i);return o&&r&&(e.__dataTemp[t]=i),r}Gs.Class=function(e,t){e||console.warn("Polymer.Class requires `info` argument");let i=t?t(js(HTMLElement)):js(HTMLElement);return(i=Zs(e,i,e.behaviors)).is=i.prototype.is=e.is,i};const eo=Rt(e=>{return class extends e{_shouldPropertyChange(e,t,i){return Qs(this,e,t,i,!0)}}}),to=Rt(e=>{return class extends e{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(e,t,i){return Qs(this,e,t,i,this.mutableData)}}});eo._mutablePropertyChange=Qs;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let io=null;function no(){return io}no.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:no,writable:!0}});const so=cn(no),oo=eo(so);const ro=cn(class{});class ao extends ro{constructor(e){super(),this._configureProperties(e),this.root=this._stampTemplate(this.__dataHost);let t=[];this.children=t;for(let e=this.root.firstChild;e;e=e.nextSibling)t.push(e),e.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let i=this.__templatizeOptions;(e&&i.instanceProps||!i.instanceProps)&&this._enableProperties()}_configureProperties(e){if(this.__templatizeOptions.forwardHostProp)for(let e in this.__hostProps)this._setPendingProperty(e,this.__dataHost["_host_"+e]);for(let t in e)this._setPendingProperty(t,e[t])}forwardHostProp(e,t){this._setPendingPropertyOrPath(e,t,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(e,t,i){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(e,t,e=>{e.model=this,i(e)});else{let n=this.__dataHost.__dataHost;n&&n._addEventListenerToNode(e,t,i)}}_showHideChildren(e){let t=this.children;for(let i=0;i<t.length;i++){let n=t[i];if(Boolean(e)!=Boolean(n.__hideTemplateChildren__))if(n.nodeType===Node.TEXT_NODE)e?(n.__polymerTextContent__=n.textContent,n.textContent=""):n.textContent=n.__polymerTextContent__;else if("slot"===n.localName)if(e)n.__polymerReplaced__=document.createComment("hidden-slot"),ti(ti(n).parentNode).replaceChild(n.__polymerReplaced__,n);else{const e=n.__polymerReplaced__;e&&ti(ti(e).parentNode).replaceChild(n,e)}else n.style&&(e?(n.__polymerDisplay__=n.style.display,n.style.display="none"):n.style.display=n.__polymerDisplay__);n.__hideTemplateChildren__=e,n._showHideChildren&&n._showHideChildren(e)}}_setUnmanagedPropertyToNode(e,t,i){e.__hideTemplateChildren__&&e.nodeType==Node.TEXT_NODE&&"textContent"==t?e.__polymerTextContent__=i:super._setUnmanagedPropertyToNode(e,t,i)}get parentModel(){let e=this.__parentModel;if(!e){let t;e=this;do{e=e.__dataHost.__dataHost}while((t=e.__templatizeOptions)&&!t.parentModel);this.__parentModel=e}return e}dispatchEvent(e){return!0}}ao.prototype.__dataHost,ao.prototype.__templatizeOptions,ao.prototype._methodHost,ao.prototype.__templatizeOwner,ao.prototype.__hostProps;const lo=eo(ao);function ho(e){let t=e.__dataHost;return t&&t._methodHost||t}function co(e,t,i){let n=i.mutableData?lo:ao;_o.mixin&&(n=_o.mixin(n));let s=class extends n{};return s.prototype.__templatizeOptions=i,s.prototype._bindTemplate(e),function(e,t,i,n){let s=i.hostProps||{};for(let t in n.instanceProps){delete s[t];let i=n.notifyInstanceProp;i&&e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:fo(t,i)})}if(n.forwardHostProp&&t.__dataHost)for(let t in s)i.hasHostProps||(i.hasHostProps=!0),e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(e,t,i){e.__dataHost._setPendingPropertyOrPath("_host_"+t,i[t],!0,!0)}})}(s,e,t,i),s}function po(e,t,i){let n=i.forwardHostProp;if(n&&t.hasHostProps){let s=t.templatizeTemplateClass;if(!s){let e=i.mutableData?oo:so;s=t.templatizeTemplateClass=class extends e{};let o=t.hostProps;for(let e in o)s.prototype._addPropertyEffect("_host_"+e,s.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:uo(e,n)}),s.prototype._createNotifyingProperty("_host_"+e)}!function(e,t){io=e,Object.setPrototypeOf(e,t.prototype),new t,io=null}(e,s),e.__dataProto&&Object.assign(e.__data,e.__dataProto),e.__dataTemp={},e.__dataPending=null,e.__dataOld=null,e._enableProperties()}}function uo(e,t){return function(e,i,n){t.call(e.__templatizeOwner,i.substring("_host_".length),n[i])}}function fo(e,t){return function(e,i,n){t.call(e.__templatizeOwner,e,i,n[i])}}function _o(e,t,i){if(At&&!ho(e))throw new Error("strictTemplatePolicy: template owner not trusted");if(i=i||{},e.__templatizeOwner)throw new Error("A <template> can only be templatized once");e.__templatizeOwner=t;let n=(t?t.constructor:ao)._parseTemplate(e),s=n.templatizeInstanceClass;s||(s=co(e,n,i),n.templatizeInstanceClass=s),po(e,n,i);let o=class extends s{};return o.prototype._methodHost=ho(e),o.prototype.__dataHost=e,o.prototype.__templatizeOwner=t,o.prototype.__hostProps=n.hostProps,o=o}function mo(e,t){let i;for(;t;)if(i=t.__templatizeInstance){if(i.__dataHost==e)return i;t=i.__dataHost}else t=ti(t).parentNode;return null}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let go=!1;function vo(){if(It&&!Et){if(!go){go=!0;const e=document.createElement("style");e.textContent="dom-bind,dom-if,dom-repeat{display:none;}",document.head.appendChild(e)}return!0}return!1}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const yo=as(to(cn(HTMLElement)));customElements.define("dom-bind",class extends yo{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),At)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(e,t,i,n){this.mutableData=!0}connectedCallback(){vo()||(this.style.display="none"),this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){ti(ti(this).parentNode).insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let e=0;e<this.__children.length;e++)this.root.appendChild(this.__children[e])}render(){let e;if(!this.__children){if(!(e=e||this.querySelector("template"))){let t=new MutationObserver(()=>{if(!(e=this.querySelector("template")))throw new Error("dom-bind requires a <template> child");t.disconnect(),this.render()});return void t.observe(this,{childList:!0})}this.root=this._stampTemplate(e),this.$=this.root.$,this.__children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)this.__children[this.__children.length]=e;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class bo{constructor(e){this.value=e.toString()}toString(){return this.value}}function wo(e){if(e instanceof bo)return e.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`)}const Co=function(e,...t){const i=document.createElement("template");return i.innerHTML=t.reduce((t,i,n)=>t+function(e){if(e instanceof HTMLTemplateElement)return e.innerHTML;if(e instanceof bo)return wo(e);throw new Error(`non-template value passed to Polymer's html function: ${e}`)}(i)+e[n+1],e[0]),i},zo=mn(HTMLElement),So=to(zo);class xo extends So{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!0,readOnly:!0},initialCount:{type:Number,observer:"__initializeChunking"},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__limit=1/0,this.__pool=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__lastChunkTime=null,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let e=0;e<this.__instances.length;e++)this.__detachInstance(e)}connectedCallback(){if(super.connectedCallback(),vo()||(this.style.display="none"),this.__isDetached){this.__isDetached=!1;let e=ti(ti(this).parentNode);for(let t=0;t<this.__instances.length;t++)this.__attachInstance(t,e)}}__ensureTemplatized(){if(!this.__ctor){let e=this.template=this.querySelector("template");if(!e){let e=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}let t={};t[this.as]=!0,t[this.indexAs]=!0,t[this.itemsIndexAs]=!0,this.__ctor=_o(e,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:t,forwardHostProp:function(e,t){let i=this.__instances;for(let n,s=0;s<i.length&&(n=i[s]);s++)n.forwardHostProp(e,t)},notifyInstanceProp:function(e,t,i){if((n=this.as)===(s=t)||si(n,s)||oi(n,s)){let n=e[this.itemsIndexAs];t==this.as&&(this.items[n]=i);let s=ri(this.as,`${JSCompiler_renameProperty("items",this)}.${n}`,t);this.notifyPath(s,i)}var n,s}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(e){if("string"==typeof e){let t=e,i=this.__getMethodHost();return function(){return i[t].apply(i,arguments)}}return e}__sortChanged(e){this.__sortFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__filterChanged(e){this.__filterFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(e){return Math.ceil(1e3/e)}__initializeChunking(){this.initialCount&&(this.__limit=this.initialCount,this.__chunkCount=this.initialCount,this.__lastChunkTime=performance.now())}__tryRenderChunk(){this.items&&this.__limit<this.items.length&&this.__debounceRender(this.__requestRenderChunk)}__requestRenderChunk(){requestAnimationFrame(()=>this.__renderChunk())}__renderChunk(){let e=performance.now(),t=this._targetFrameTime/(e-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*t)||1,this.__limit+=this.__chunkCount,this.__lastChunkTime=e,this.__debounceRender(this.__render)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__itemsChanged(e){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(e.path,e.value)||(this.__initializeChunking(),this.__debounceRender(this.__render))}__handleObservedPaths(e){if(this.__sortFn||this.__filterFn)if(e){if(this.__observePaths){let t=this.__observePaths;for(let i=0;i<t.length;i++)0===e.indexOf(t[i])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__debounceRender(e,t=0){this.__renderDebouncer=gn.debounce(this.__renderDebouncer,t>0?wi.after(t):Ci,e.bind(this)),yn(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),Ls()}__render(){this.__ensureTemplatized()&&(this.__applyFullRefresh(),this.__pool.length=0,this._setRenderedItemCount(this.__instances.length),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this.__tryRenderChunk())}__applyFullRefresh(){let e=this.items||[],t=new Array(e.length);for(let i=0;i<e.length;i++)t[i]=i;this.__filterFn&&(t=t.filter((t,i,n)=>this.__filterFn(e[t],i,n))),this.__sortFn&&t.sort((t,i)=>this.__sortFn(e[t],e[i]));const i=this.__itemsIdxToInstIdx={};let n=0;const s=Math.min(t.length,this.__limit);for(;n<s;n++){let s=this.__instances[n],o=t[n],r=e[o];i[o]=n,s?(s._setPendingProperty(this.as,r),s._setPendingProperty(this.indexAs,n),s._setPendingProperty(this.itemsIndexAs,o),s._flushProperties()):this.__insertInstance(r,n,o)}for(let e=this.__instances.length-1;e>=n;e--)this.__detachAndRemoveInstance(e)}__detachInstance(e){let t=this.__instances[e];const i=ti(t.root);for(let e=0;e<t.children.length;e++){let n=t.children[e];i.appendChild(n)}return t}__attachInstance(e,t){let i=this.__instances[e];t.insertBefore(i.root,this)}__detachAndRemoveInstance(e){let t=this.__detachInstance(e);t&&this.__pool.push(t),this.__instances.splice(e,1)}__stampInstance(e,t,i){let n={};return n[this.as]=e,n[this.indexAs]=t,n[this.itemsIndexAs]=i,new this.__ctor(n)}__insertInstance(e,t,i){let n=this.__pool.pop();n?(n._setPendingProperty(this.as,e),n._setPendingProperty(this.indexAs,t),n._setPendingProperty(this.itemsIndexAs,i),n._flushProperties()):n=this.__stampInstance(e,t,i);let s=this.__instances[t+1],o=s?s.children[0]:this;return ti(ti(this).parentNode).insertBefore(n.root,o),this.__instances[t]=n,n}_showHideChildren(e){for(let t=0;t<this.__instances.length;t++)this.__instances[t]._showHideChildren(e)}__handleItemPath(e,t){let i=e.slice(6),n=i.indexOf("."),s=n<0?i:i.substring(0,n);if(s==parseInt(s,10)){let e=n<0?"":i.substring(n+1);this.__handleObservedPaths(e);let o=this.__itemsIdxToInstIdx[s],r=this.__instances[o];if(r){let i=this.as+(e?"."+e:"");r._setPendingPropertyOrPath(i,t,!1,!0),r._flushProperties()}return!0}}itemForElement(e){let t=this.modelForElement(e);return t&&t[this.as]}indexForElement(e){let t=this.modelForElement(e);return t&&t[this.indexAs]}modelForElement(e){return mo(this.template,e)}}customElements.define(xo.is,xo);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class ko extends zo{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"}}}constructor(){super(),this.__renderDebouncer=null,this.__invalidProps=null,this.__instance=null,this._lastIf=!1,this.__ctor=null,this.__hideTemplateChildren__=!1}__debounceRender(){this.__renderDebouncer=gn.debounce(this.__renderDebouncer,Ci,()=>this.__render()),yn(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();const e=ti(this).parentNode;e&&(e.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||ti(e).host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),vo()||(this.style.display="none"),this.if&&this.__debounceRender()}render(){Ls()}__render(){if(this.if){if(!this.__ensureInstance())return;this._showHideChildren()}else this.restamp&&this.__teardownInstance();!this.restamp&&this.__instance&&this._showHideChildren(),this.if!=this._lastIf&&(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__ensureInstance(){let e=ti(this).parentNode;if(e){if(!this.__ctor){let e=ti(this).querySelector("template");if(!e){let e=new MutationObserver(()=>{if(!ti(this).querySelector("template"))throw new Error("dom-if requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}this.__ctor=_o(e,this,{mutableData:!0,forwardHostProp:function(e,t){this.__instance&&(this.if?this.__instance.forwardHostProp(e,t):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[ni(e)]=!0))}})}if(this.__instance){this.__syncHostProperties();let t=this.__instance.children;if(t&&t.length){if(ti(this).previousSibling!==t[t.length-1])for(let i,n=0;n<t.length&&(i=t[n]);n++)ti(e).insertBefore(i,this)}}else this.__instance=new this.__ctor,ti(e).insertBefore(this.__instance.root,this)}return!0}__syncHostProperties(){let e=this.__invalidProps;if(e){for(let t in e)this.__instance._setPendingProperty(t,this.__dataHost[t]);this.__invalidProps=null,this.__instance._flushProperties()}}__teardownInstance(){if(this.__instance){let e=this.__instance.children;if(e&&e.length){let t=ti(e[0]).parentNode;if(t){t=ti(t);for(let i,n=0;n<e.length&&(i=e[n]);n++)t.removeChild(i)}}this.__instance=null,this.__invalidProps=null}}_showHideChildren(){let e=this.__hideTemplateChildren__||!this.if;this.__instance&&this.__instance._showHideChildren(e)}}customElements.define(ko.is,ko);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let Eo=Rt(e=>{let t=mn(e);return class extends t{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(e,t){let i=t.path;if(i==JSCompiler_renameProperty("items",this)){let i=t.base||[],n=this.__lastItems;if(e!==this.__lastMulti&&this.clearSelection(),n){let e=Hs(i,n);this.__applySplices(e)}this.__lastItems=i,this.__lastMulti=e}else if(t.path==`${JSCompiler_renameProperty("items",this)}.splices`)this.__applySplices(t.value.indexSplices);else{let e=i.slice(`${JSCompiler_renameProperty("items",this)}.`.length),t=parseInt(e,10);e.indexOf(".")<0&&e==t&&this.__deselectChangedIdx(t)}}__applySplices(e){let t=this.__selectedMap;for(let i=0;i<e.length;i++){let n=e[i];t.forEach((e,i)=>{e<n.index||(e>=n.index+n.removed.length?t.set(i,e+n.addedCount-n.removed.length):t.set(i,-1))});for(let e=0;e<n.addedCount;e++){let i=n.index+e;t.has(this.items[i])&&t.set(this.items[i],i)}}this.__updateLinks();let i=0;t.forEach((e,n)=>{e<0?(this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null,t.delete(n)):i++})}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let e=0;this.__selectedMap.forEach(t=>{t>=0&&this.linkPaths(`${JSCompiler_renameProperty("items",this)}.${t}`,`${JSCompiler_renameProperty("selected",this)}.${e++}`)})}else this.__selectedMap.forEach(e=>{this.linkPaths(JSCompiler_renameProperty("selected",this),`${JSCompiler_renameProperty("items",this)}.${e}`),this.linkPaths(JSCompiler_renameProperty("selectedItem",this),`${JSCompiler_renameProperty("items",this)}.${e}`)})}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(e){return this.__selectedMap.has(e)}isIndexSelected(e){return this.isSelected(this.items[e])}__deselectChangedIdx(e){let t=this.__selectedIndexForItemIndex(e);if(t>=0){let e=0;this.__selectedMap.forEach((i,n)=>{t==e++&&this.deselect(n)})}}__selectedIndexForItemIndex(e){let t=this.__dataLinkedPaths[`${JSCompiler_renameProperty("items",this)}.${e}`];if(t)return parseInt(t.slice(`${JSCompiler_renameProperty("selected",this)}.`.length),10)}deselect(e){let t=this.__selectedMap.get(e);if(t>=0){let i;this.__selectedMap.delete(e),this.multi&&(i=this.__selectedIndexForItemIndex(t)),this.__updateLinks(),this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null}}deselectIndex(e){this.deselect(this.items[e])}select(e){this.selectIndex(this.items.indexOf(e))}selectIndex(e){let t=this.items[e];this.isSelected(t)?this.toggle&&this.deselectIndex(e):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(t,e),this.__updateLinks(),this.multi?this.push(JSCompiler_renameProperty("selected",this),t):this.selected=this.selectedItem=t)}}})(zo);class Ho extends Eo{static get is(){return"array-selector"}static get template(){return null}}customElements.define(Ho.is,Ho);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const To=new gt;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(e,t,i){},prepareTemplateDom(e,t){},prepareTemplateStyles(e,t,i){},styleSubtree(e,t){To.processStyles(),$e(e,t)},styleElement(e){To.processStyles()},styleDocument(e){To.processStyles(),$e(document.body,e)},getComputedStyleValue:(e,t)=>je(e,t),flushCustomStyles(){},nativeCss:ye,nativeShadow:fe,cssBuild:me,disableRuntime:ve}),window.ShadyCSS.CustomStyleInterface=To;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Mo="include",Ao=window.ShadyCSS.CustomStyleInterface;class Lo extends HTMLElement{constructor(){super(),this._style=null,Ao.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const e=this.querySelector("style");if(!e)return null;this._style=e;const t=e.getAttribute(Mo);return t&&(e.removeAttribute(Mo),e.textContent=function(e){let t=e.trim().split(/\s+/),i="";for(let e=0;e<t.length;e++)i+=Qt(t[e]);return i}(t)+e.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let Io;window.customElements.define("custom-style",Lo),Io=eo._mutablePropertyChange;Boolean;const Po=js(HTMLElement).prototype,Oo=Co`
<custom-style>
  <style is="custom-style">
    [hidden] {
      display: none !important;
    }
  </style>
</custom-style>
<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`;Oo.setAttribute("style","display: none;"),document.head.appendChild(Oo.content);var No=document.createElement("style");No.textContent="[hidden] { display: none !important; }",document.head.appendChild(No);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
class Vo{constructor(e){Vo[" "](e),this.type=e&&e.type||"default",this.key=e&&e.key,e&&"value"in e&&(this.value=e.value)}get value(){var e=this.type,t=this.key;if(e&&t)return Vo.types[e]&&Vo.types[e][t]}set value(e){var t=this.type,i=this.key;t&&i&&(t=Vo.types[t]=Vo.types[t]||{},null==e?delete t[i]:t[i]=e)}get list(){if(this.type){var e=Vo.types[this.type];return e?Object.keys(e).map((function(e){return Ro[this.type][e]}),this):[]}}byKey(e){return this.key=e,this.value}}Vo[" "]=function(){},Vo.types={};var Ro=Vo.types;Gs({is:"iron-meta",properties:{type:{type:String,value:"default"},key:{type:String},value:{type:String,notify:!0},self:{type:Boolean,observer:"_selfChanged"},__meta:{type:Boolean,computed:"__computeMeta(type, key, value)"}},hostAttributes:{hidden:!0},__computeMeta:function(e,t,i){var n=new Vo({type:e,key:t});return void 0!==i&&i!==n.value?n.value=i:this.value!==n.value&&(this.value=n.value),n},get list(){return this.__meta&&this.__meta.list},_selfChanged:function(e){e&&(this.value=this)},byKey:function(e){return new Vo({type:this.type,key:e}).value}}),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Gs({_template:Co`
    <style>
      :host {
        @apply --layout-inline;
        @apply --layout-center-center;
        position: relative;

        vertical-align: middle;

        fill: var(--iron-icon-fill-color, currentcolor);
        stroke: var(--iron-icon-stroke-color, none);

        width: var(--iron-icon-width, 24px);
        height: var(--iron-icon-height, 24px);
        @apply --iron-icon;
      }

      :host([hidden]) {
        display: none;
      }
    </style>
`,is:"iron-icon",properties:{icon:{type:String},theme:{type:String},src:{type:String},_meta:{value:Po.create("iron-meta",{type:"iconset"})}},observers:["_updateIcon(_meta, isAttached)","_updateIcon(theme, isAttached)","_srcChanged(src, isAttached)","_iconChanged(icon, isAttached)"],_DEFAULT_ICONSET:"icons",_iconChanged:function(e){var t=(e||"").split(":");this._iconName=t.pop(),this._iconsetName=t.pop()||this._DEFAULT_ICONSET,this._updateIcon()},_srcChanged:function(e){this._updateIcon()},_usesIconset:function(){return this.icon||!this.src},_updateIcon:function(){this._usesIconset()?(this._img&&this._img.parentNode&&Bs(this.root).removeChild(this._img),""===this._iconName?this._iconset&&this._iconset.removeIcon(this):this._iconsetName&&this._meta&&(this._iconset=this._meta.byKey(this._iconsetName),this._iconset?(this._iconset.applyIcon(this,this._iconName,this.theme),this.unlisten(window,"iron-iconset-added","_updateIcon")):this.listen(window,"iron-iconset-added","_updateIcon"))):(this._iconset&&this._iconset.removeIcon(this),this._img||(this._img=document.createElement("img"),this._img.style.width="100%",this._img.style.height="100%",this._img.draggable=!1),this._img.src=this.src,Bs(this.root).appendChild(this._img))}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Do=Co`
<custom-style>
  <style is="custom-style">
    html {

      /* Material Design color palette for Google products */

      --google-red-100: #f4c7c3;
      --google-red-300: #e67c73;
      --google-red-500: #db4437;
      --google-red-700: #c53929;

      --google-blue-100: #c6dafc;
      --google-blue-300: #7baaf7;
      --google-blue-500: #4285f4;
      --google-blue-700: #3367d6;

      --google-green-100: #b7e1cd;
      --google-green-300: #57bb8a;
      --google-green-500: #0f9d58;
      --google-green-700: #0b8043;

      --google-yellow-100: #fce8b2;
      --google-yellow-300: #f7cb4d;
      --google-yellow-500: #f4b400;
      --google-yellow-700: #f09300;

      --google-grey-100: #f5f5f5;
      --google-grey-300: #e0e0e0;
      --google-grey-500: #9e9e9e;
      --google-grey-700: #616161;

      /* Material Design color palette from online spec document */

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-pink-50: #fce4ec;
      --paper-pink-100: #f8bbd0;
      --paper-pink-200: #f48fb1;
      --paper-pink-300: #f06292;
      --paper-pink-400: #ec407a;
      --paper-pink-500: #e91e63;
      --paper-pink-600: #d81b60;
      --paper-pink-700: #c2185b;
      --paper-pink-800: #ad1457;
      --paper-pink-900: #880e4f;
      --paper-pink-a100: #ff80ab;
      --paper-pink-a200: #ff4081;
      --paper-pink-a400: #f50057;
      --paper-pink-a700: #c51162;

      --paper-purple-50: #f3e5f5;
      --paper-purple-100: #e1bee7;
      --paper-purple-200: #ce93d8;
      --paper-purple-300: #ba68c8;
      --paper-purple-400: #ab47bc;
      --paper-purple-500: #9c27b0;
      --paper-purple-600: #8e24aa;
      --paper-purple-700: #7b1fa2;
      --paper-purple-800: #6a1b9a;
      --paper-purple-900: #4a148c;
      --paper-purple-a100: #ea80fc;
      --paper-purple-a200: #e040fb;
      --paper-purple-a400: #d500f9;
      --paper-purple-a700: #aa00ff;

      --paper-deep-purple-50: #ede7f6;
      --paper-deep-purple-100: #d1c4e9;
      --paper-deep-purple-200: #b39ddb;
      --paper-deep-purple-300: #9575cd;
      --paper-deep-purple-400: #7e57c2;
      --paper-deep-purple-500: #673ab7;
      --paper-deep-purple-600: #5e35b1;
      --paper-deep-purple-700: #512da8;
      --paper-deep-purple-800: #4527a0;
      --paper-deep-purple-900: #311b92;
      --paper-deep-purple-a100: #b388ff;
      --paper-deep-purple-a200: #7c4dff;
      --paper-deep-purple-a400: #651fff;
      --paper-deep-purple-a700: #6200ea;

      --paper-indigo-50: #e8eaf6;
      --paper-indigo-100: #c5cae9;
      --paper-indigo-200: #9fa8da;
      --paper-indigo-300: #7986cb;
      --paper-indigo-400: #5c6bc0;
      --paper-indigo-500: #3f51b5;
      --paper-indigo-600: #3949ab;
      --paper-indigo-700: #303f9f;
      --paper-indigo-800: #283593;
      --paper-indigo-900: #1a237e;
      --paper-indigo-a100: #8c9eff;
      --paper-indigo-a200: #536dfe;
      --paper-indigo-a400: #3d5afe;
      --paper-indigo-a700: #304ffe;

      --paper-blue-50: #e3f2fd;
      --paper-blue-100: #bbdefb;
      --paper-blue-200: #90caf9;
      --paper-blue-300: #64b5f6;
      --paper-blue-400: #42a5f5;
      --paper-blue-500: #2196f3;
      --paper-blue-600: #1e88e5;
      --paper-blue-700: #1976d2;
      --paper-blue-800: #1565c0;
      --paper-blue-900: #0d47a1;
      --paper-blue-a100: #82b1ff;
      --paper-blue-a200: #448aff;
      --paper-blue-a400: #2979ff;
      --paper-blue-a700: #2962ff;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-cyan-50: #e0f7fa;
      --paper-cyan-100: #b2ebf2;
      --paper-cyan-200: #80deea;
      --paper-cyan-300: #4dd0e1;
      --paper-cyan-400: #26c6da;
      --paper-cyan-500: #00bcd4;
      --paper-cyan-600: #00acc1;
      --paper-cyan-700: #0097a7;
      --paper-cyan-800: #00838f;
      --paper-cyan-900: #006064;
      --paper-cyan-a100: #84ffff;
      --paper-cyan-a200: #18ffff;
      --paper-cyan-a400: #00e5ff;
      --paper-cyan-a700: #00b8d4;

      --paper-teal-50: #e0f2f1;
      --paper-teal-100: #b2dfdb;
      --paper-teal-200: #80cbc4;
      --paper-teal-300: #4db6ac;
      --paper-teal-400: #26a69a;
      --paper-teal-500: #009688;
      --paper-teal-600: #00897b;
      --paper-teal-700: #00796b;
      --paper-teal-800: #00695c;
      --paper-teal-900: #004d40;
      --paper-teal-a100: #a7ffeb;
      --paper-teal-a200: #64ffda;
      --paper-teal-a400: #1de9b6;
      --paper-teal-a700: #00bfa5;

      --paper-green-50: #e8f5e9;
      --paper-green-100: #c8e6c9;
      --paper-green-200: #a5d6a7;
      --paper-green-300: #81c784;
      --paper-green-400: #66bb6a;
      --paper-green-500: #4caf50;
      --paper-green-600: #43a047;
      --paper-green-700: #388e3c;
      --paper-green-800: #2e7d32;
      --paper-green-900: #1b5e20;
      --paper-green-a100: #b9f6ca;
      --paper-green-a200: #69f0ae;
      --paper-green-a400: #00e676;
      --paper-green-a700: #00c853;

      --paper-light-green-50: #f1f8e9;
      --paper-light-green-100: #dcedc8;
      --paper-light-green-200: #c5e1a5;
      --paper-light-green-300: #aed581;
      --paper-light-green-400: #9ccc65;
      --paper-light-green-500: #8bc34a;
      --paper-light-green-600: #7cb342;
      --paper-light-green-700: #689f38;
      --paper-light-green-800: #558b2f;
      --paper-light-green-900: #33691e;
      --paper-light-green-a100: #ccff90;
      --paper-light-green-a200: #b2ff59;
      --paper-light-green-a400: #76ff03;
      --paper-light-green-a700: #64dd17;

      --paper-lime-50: #f9fbe7;
      --paper-lime-100: #f0f4c3;
      --paper-lime-200: #e6ee9c;
      --paper-lime-300: #dce775;
      --paper-lime-400: #d4e157;
      --paper-lime-500: #cddc39;
      --paper-lime-600: #c0ca33;
      --paper-lime-700: #afb42b;
      --paper-lime-800: #9e9d24;
      --paper-lime-900: #827717;
      --paper-lime-a100: #f4ff81;
      --paper-lime-a200: #eeff41;
      --paper-lime-a400: #c6ff00;
      --paper-lime-a700: #aeea00;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-amber-50: #fff8e1;
      --paper-amber-100: #ffecb3;
      --paper-amber-200: #ffe082;
      --paper-amber-300: #ffd54f;
      --paper-amber-400: #ffca28;
      --paper-amber-500: #ffc107;
      --paper-amber-600: #ffb300;
      --paper-amber-700: #ffa000;
      --paper-amber-800: #ff8f00;
      --paper-amber-900: #ff6f00;
      --paper-amber-a100: #ffe57f;
      --paper-amber-a200: #ffd740;
      --paper-amber-a400: #ffc400;
      --paper-amber-a700: #ffab00;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-deep-orange-50: #fbe9e7;
      --paper-deep-orange-100: #ffccbc;
      --paper-deep-orange-200: #ffab91;
      --paper-deep-orange-300: #ff8a65;
      --paper-deep-orange-400: #ff7043;
      --paper-deep-orange-500: #ff5722;
      --paper-deep-orange-600: #f4511e;
      --paper-deep-orange-700: #e64a19;
      --paper-deep-orange-800: #d84315;
      --paper-deep-orange-900: #bf360c;
      --paper-deep-orange-a100: #ff9e80;
      --paper-deep-orange-a200: #ff6e40;
      --paper-deep-orange-a400: #ff3d00;
      --paper-deep-orange-a700: #dd2c00;

      --paper-brown-50: #efebe9;
      --paper-brown-100: #d7ccc8;
      --paper-brown-200: #bcaaa4;
      --paper-brown-300: #a1887f;
      --paper-brown-400: #8d6e63;
      --paper-brown-500: #795548;
      --paper-brown-600: #6d4c41;
      --paper-brown-700: #5d4037;
      --paper-brown-800: #4e342e;
      --paper-brown-900: #3e2723;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      /* opacity for dark text on a light background */
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; /* or hint text or icon */
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      /* opacity for light text on a dark background */
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; /* or hint text or icon */
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;

    }

  </style>
</custom-style>
`;Do.setAttribute("style","display: none;"),document.head.appendChild(Do.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Bo=Co`
<custom-style>
  <style is="custom-style">
    html {
      /*
       * You can use these generic variables in your elements for easy theming.
       * For example, if all your elements use \`--primary-text-color\` as its main
       * color, then switching from a light to a dark theme is just a matter of
       * changing the value of \`--primary-text-color\` in your application.
       */
      --primary-text-color: var(--light-theme-text-color);
      --primary-background-color: var(--light-theme-background-color);
      --secondary-text-color: var(--light-theme-secondary-color);
      --disabled-text-color: var(--light-theme-disabled-color);
      --divider-color: var(--light-theme-divider-color);
      --error-color: var(--paper-deep-orange-a700);

      /*
       * Primary and accent colors. Also see color.js for more colors.
       */
      --primary-color: var(--paper-indigo-500);
      --light-primary-color: var(--paper-indigo-100);
      --dark-primary-color: var(--paper-indigo-700);

      --accent-color: var(--paper-pink-a200);
      --light-accent-color: var(--paper-pink-a100);
      --dark-accent-color: var(--paper-pink-a400);


      /*
       * Material Design Light background theme
       */
      --light-theme-background-color: #ffffff;
      --light-theme-base-color: #000000;
      --light-theme-text-color: var(--paper-grey-900);
      --light-theme-secondary-color: #737373;  /* for secondary text and icons */
      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */
      --light-theme-divider-color: #dbdbdb;

      /*
       * Material Design Dark background theme
       */
      --dark-theme-background-color: var(--paper-grey-900);
      --dark-theme-base-color: #ffffff;
      --dark-theme-text-color: #ffffff;
      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */
      --dark-theme-disabled-color: #646464;  /* disabled/hint text */
      --dark-theme-divider-color: #3c3c3c;

      /*
       * Deprecated values because of their confusing names.
       */
      --text-primary-color: var(--dark-theme-text-color);
      --default-primary-color: var(--primary-color);
    }
  </style>
</custom-style>`;Bo.setAttribute("style","display: none;"),document.head.appendChild(Bo.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Fo={properties:{focused:{type:Boolean,value:!1,notify:!0,readOnly:!0,reflectToAttribute:!0},disabled:{type:Boolean,value:!1,notify:!0,observer:"_disabledChanged",reflectToAttribute:!0},_oldTabIndex:{type:String},_boundFocusBlurHandler:{type:Function,value:function(){return this._focusBlurHandler.bind(this)}}},observers:["_changedControlState(focused, disabled)"],ready:function(){this.addEventListener("focus",this._boundFocusBlurHandler,!0),this.addEventListener("blur",this._boundFocusBlurHandler,!0)},_focusBlurHandler:function(e){this._setFocused("focus"===e.type)},_disabledChanged:function(e,t){this.setAttribute("aria-disabled",e?"true":"false"),this.style.pointerEvents=e?"none":"",e?(this._oldTabIndex=this.getAttribute("tabindex"),this._setFocused(!1),this.tabIndex=-1,this.blur()):void 0!==this._oldTabIndex&&(null===this._oldTabIndex?this.removeAttribute("tabindex"):this.setAttribute("tabindex",this._oldTabIndex))},_changedControlState:function(){this._controlStateChanged&&this._controlStateChanged()}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var Uo={"U+0008":"backspace","U+0009":"tab","U+001B":"esc","U+0020":"space","U+007F":"del"},qo={8:"backspace",9:"tab",13:"enter",27:"esc",33:"pageup",34:"pagedown",35:"end",36:"home",32:"space",37:"left",38:"up",39:"right",40:"down",46:"del",106:"*"},$o={shift:"shiftKey",ctrl:"ctrlKey",alt:"altKey",meta:"metaKey"},jo=/[a-z0-9*]/,Ko=/U\+/,Yo=/^arrow/,Wo=/^space(bar)?/,Jo=/^escape$/;function Xo(e,t){var i="";if(e){var n=e.toLowerCase();" "===n||Wo.test(n)?i="space":Jo.test(n)?i="esc":1==n.length?t&&!jo.test(n)||(i=n):i=Yo.test(n)?n.replace("arrow",""):"multiply"==n?"*":n}return i}function Zo(e,t){return e.key?Xo(e.key,t):e.detail&&e.detail.key?Xo(e.detail.key,t):(i=e.keyIdentifier,n="",i&&(i in Uo?n=Uo[i]:Ko.test(i)?(i=parseInt(i.replace("U+","0x"),16),n=String.fromCharCode(i).toLowerCase()):n=i.toLowerCase()),n||function(e){var t="";return Number(e)&&(t=e>=65&&e<=90?String.fromCharCode(32+e):e>=112&&e<=123?"f"+(e-112+1):e>=48&&e<=57?String(e-48):e>=96&&e<=105?String(e-96):qo[e]),t}(e.keyCode)||"");var i,n}function Go(e,t){return Zo(t,e.hasModifiers)===e.key&&(!e.hasModifiers||!!t.shiftKey==!!e.shiftKey&&!!t.ctrlKey==!!e.ctrlKey&&!!t.altKey==!!e.altKey&&!!t.metaKey==!!e.metaKey)}function Qo(e){return e.trim().split(" ").map((function(e){return function(e){return 1===e.length?{combo:e,key:e,event:"keydown"}:e.split("+").reduce((function(e,t){var i=t.split(":"),n=i[0],s=i[1];return n in $o?(e[$o[n]]=!0,e.hasModifiers=!0):(e.key=n,e.event=s||"keydown"),e}),{combo:e.split(":").shift()})}(e)}))}const er={properties:{keyEventTarget:{type:Object,value:function(){return this}},stopKeyboardEventPropagation:{type:Boolean,value:!1},_boundKeyHandlers:{type:Array,value:function(){return[]}},_imperativeKeyBindings:{type:Object,value:function(){return{}}}},observers:["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],keyBindings:{},registered:function(){this._prepKeyBindings()},attached:function(){this._listenKeyEventListeners()},detached:function(){this._unlistenKeyEventListeners()},addOwnKeyBinding:function(e,t){this._imperativeKeyBindings[e]=t,this._prepKeyBindings(),this._resetKeyEventListeners()},removeOwnKeyBindings:function(){this._imperativeKeyBindings={},this._prepKeyBindings(),this._resetKeyEventListeners()},keyboardEventMatchesKeys:function(e,t){for(var i=Qo(t),n=0;n<i.length;++n)if(Go(i[n],e))return!0;return!1},_collectKeyBindings:function(){var e=this.behaviors.map((function(e){return e.keyBindings}));return-1===e.indexOf(this.keyBindings)&&e.push(this.keyBindings),e},_prepKeyBindings:function(){for(var e in this._keyBindings={},this._collectKeyBindings().forEach((function(e){for(var t in e)this._addKeyBinding(t,e[t])}),this),this._imperativeKeyBindings)this._addKeyBinding(e,this._imperativeKeyBindings[e]);for(var t in this._keyBindings)this._keyBindings[t].sort((function(e,t){var i=e[0].hasModifiers;return i===t[0].hasModifiers?0:i?-1:1}))},_addKeyBinding:function(e,t){Qo(e).forEach((function(e){this._keyBindings[e.event]=this._keyBindings[e.event]||[],this._keyBindings[e.event].push([e,t])}),this)},_resetKeyEventListeners:function(){this._unlistenKeyEventListeners(),this.isAttached&&this._listenKeyEventListeners()},_listenKeyEventListeners:function(){this.keyEventTarget&&Object.keys(this._keyBindings).forEach((function(e){var t=this._keyBindings[e],i=this._onKeyBindingEvent.bind(this,t);this._boundKeyHandlers.push([this.keyEventTarget,e,i]),this.keyEventTarget.addEventListener(e,i)}),this)},_unlistenKeyEventListeners:function(){for(var e,t,i,n;this._boundKeyHandlers.length;)t=(e=this._boundKeyHandlers.pop())[0],i=e[1],n=e[2],t.removeEventListener(i,n)},_onKeyBindingEvent:function(e,t){if(this.stopKeyboardEventPropagation&&t.stopPropagation(),!t.defaultPrevented)for(var i=0;i<e.length;i++){var n=e[i][0],s=e[i][1];if(Go(n,t)&&(this._triggerKeyHandler(n,s,t),t.defaultPrevented))return}},_triggerKeyHandler:function(e,t,i){var n=Object.create(e);n.keyboardEvent=i;var s=new CustomEvent(e.event,{detail:n,cancelable:!0});this[t].call(this,s),s.defaultPrevented&&i.preventDefault()}},tr={properties:{pressed:{type:Boolean,readOnly:!0,value:!1,reflectToAttribute:!0,observer:"_pressedChanged"},toggles:{type:Boolean,value:!1,reflectToAttribute:!0},active:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},pointerDown:{type:Boolean,readOnly:!0,value:!1},receivedFocusFromKeyboard:{type:Boolean,readOnly:!0},ariaActiveAttribute:{type:String,value:"aria-pressed",observer:"_ariaActiveAttributeChanged"}},listeners:{down:"_downHandler",up:"_upHandler",tap:"_tapHandler"},observers:["_focusChanged(focused)","_activeChanged(active, ariaActiveAttribute)"],keyBindings:{"enter:keydown":"_asyncClick","space:keydown":"_spaceKeyDownHandler","space:keyup":"_spaceKeyUpHandler"},_mouseEventRe:/^mouse/,_tapHandler:function(){this.toggles?this._userActivate(!this.active):this.active=!1},_focusChanged:function(e){this._detectKeyboardFocus(e),e||this._setPressed(!1)},_detectKeyboardFocus:function(e){this._setReceivedFocusFromKeyboard(!this.pointerDown&&e)},_userActivate:function(e){this.active!==e&&(this.active=e,this.fire("change"))},_downHandler:function(e){this._setPointerDown(!0),this._setPressed(!0),this._setReceivedFocusFromKeyboard(!1)},_upHandler:function(){this._setPointerDown(!1),this._setPressed(!1)},_spaceKeyDownHandler:function(e){var t=e.detail.keyboardEvent,i=Bs(t).localTarget;this.isLightDescendant(i)||(t.preventDefault(),t.stopImmediatePropagation(),this._setPressed(!0))},_spaceKeyUpHandler:function(e){var t=e.detail.keyboardEvent,i=Bs(t).localTarget;this.isLightDescendant(i)||(this.pressed&&this._asyncClick(),this._setPressed(!1))},_asyncClick:function(){this.async((function(){this.click()}),1)},_pressedChanged:function(e){this._changedButtonState()},_ariaActiveAttributeChanged:function(e,t){t&&t!=e&&this.hasAttribute(t)&&this.removeAttribute(t)},_activeChanged:function(e,t){this.toggles?this.setAttribute(this.ariaActiveAttribute,e?"true":"false"):this.removeAttribute(this.ariaActiveAttribute),this._changedButtonState()},_controlStateChanged:function(){this.disabled?this._setPressed(!1):this._changedButtonState()},_changedButtonState:function(){this._buttonStateChanged&&this._buttonStateChanged()}},ir=[er,tr];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var nr={distance:function(e,t,i,n){var s=e-i,o=t-n;return Math.sqrt(s*s+o*o)},now:window.performance&&window.performance.now?window.performance.now.bind(window.performance):Date.now};function sr(e){this.element=e,this.width=this.boundingRect.width,this.height=this.boundingRect.height,this.size=Math.max(this.width,this.height)}function or(e){this.element=e,this.color=window.getComputedStyle(e).color,this.wave=document.createElement("div"),this.waveContainer=document.createElement("div"),this.wave.style.backgroundColor=this.color,this.wave.classList.add("wave"),this.waveContainer.classList.add("wave-container"),Bs(this.waveContainer).appendChild(this.wave),this.resetInteractionState()}sr.prototype={get boundingRect(){return this.element.getBoundingClientRect()},furthestCornerDistanceFrom:function(e,t){var i=nr.distance(e,t,0,0),n=nr.distance(e,t,this.width,0),s=nr.distance(e,t,0,this.height),o=nr.distance(e,t,this.width,this.height);return Math.max(i,n,s,o)}},or.MAX_RADIUS=300,or.prototype={get recenters(){return this.element.recenters},get center(){return this.element.center},get mouseDownElapsed(){var e;return this.mouseDownStart?(e=nr.now()-this.mouseDownStart,this.mouseUpStart&&(e-=this.mouseUpElapsed),e):0},get mouseUpElapsed(){return this.mouseUpStart?nr.now()-this.mouseUpStart:0},get mouseDownElapsedSeconds(){return this.mouseDownElapsed/1e3},get mouseUpElapsedSeconds(){return this.mouseUpElapsed/1e3},get mouseInteractionSeconds(){return this.mouseDownElapsedSeconds+this.mouseUpElapsedSeconds},get initialOpacity(){return this.element.initialOpacity},get opacityDecayVelocity(){return this.element.opacityDecayVelocity},get radius(){var e=this.containerMetrics.width*this.containerMetrics.width,t=this.containerMetrics.height*this.containerMetrics.height,i=1.1*Math.min(Math.sqrt(e+t),or.MAX_RADIUS)+5,n=1.1-i/or.MAX_RADIUS*.2,s=this.mouseInteractionSeconds/n,o=i*(1-Math.pow(80,-s));return Math.abs(o)},get opacity(){return this.mouseUpStart?Math.max(0,this.initialOpacity-this.mouseUpElapsedSeconds*this.opacityDecayVelocity):this.initialOpacity},get outerOpacity(){var e=.3*this.mouseUpElapsedSeconds,t=this.opacity;return Math.max(0,Math.min(e,t))},get isOpacityFullyDecayed(){return this.opacity<.01&&this.radius>=Math.min(this.maxRadius,or.MAX_RADIUS)},get isRestingAtMaxRadius(){return this.opacity>=this.initialOpacity&&this.radius>=Math.min(this.maxRadius,or.MAX_RADIUS)},get isAnimationComplete(){return this.mouseUpStart?this.isOpacityFullyDecayed:this.isRestingAtMaxRadius},get translationFraction(){return Math.min(1,this.radius/this.containerMetrics.size*2/Math.sqrt(2))},get xNow(){return this.xEnd?this.xStart+this.translationFraction*(this.xEnd-this.xStart):this.xStart},get yNow(){return this.yEnd?this.yStart+this.translationFraction*(this.yEnd-this.yStart):this.yStart},get isMouseDown(){return this.mouseDownStart&&!this.mouseUpStart},resetInteractionState:function(){this.maxRadius=0,this.mouseDownStart=0,this.mouseUpStart=0,this.xStart=0,this.yStart=0,this.xEnd=0,this.yEnd=0,this.slideDistance=0,this.containerMetrics=new sr(this.element)},draw:function(){var e,t,i;this.wave.style.opacity=this.opacity,e=this.radius/(this.containerMetrics.size/2),t=this.xNow-this.containerMetrics.width/2,i=this.yNow-this.containerMetrics.height/2,this.waveContainer.style.webkitTransform="translate("+t+"px, "+i+"px)",this.waveContainer.style.transform="translate3d("+t+"px, "+i+"px, 0)",this.wave.style.webkitTransform="scale("+e+","+e+")",this.wave.style.transform="scale3d("+e+","+e+",1)"},downAction:function(e){var t=this.containerMetrics.width/2,i=this.containerMetrics.height/2;this.resetInteractionState(),this.mouseDownStart=nr.now(),this.center?(this.xStart=t,this.yStart=i,this.slideDistance=nr.distance(this.xStart,this.yStart,this.xEnd,this.yEnd)):(this.xStart=e?e.detail.x-this.containerMetrics.boundingRect.left:this.containerMetrics.width/2,this.yStart=e?e.detail.y-this.containerMetrics.boundingRect.top:this.containerMetrics.height/2),this.recenters&&(this.xEnd=t,this.yEnd=i,this.slideDistance=nr.distance(this.xStart,this.yStart,this.xEnd,this.yEnd)),this.maxRadius=this.containerMetrics.furthestCornerDistanceFrom(this.xStart,this.yStart),this.waveContainer.style.top=(this.containerMetrics.height-this.containerMetrics.size)/2+"px",this.waveContainer.style.left=(this.containerMetrics.width-this.containerMetrics.size)/2+"px",this.waveContainer.style.width=this.containerMetrics.size+"px",this.waveContainer.style.height=this.containerMetrics.size+"px"},upAction:function(e){this.isMouseDown&&(this.mouseUpStart=nr.now())},remove:function(){Bs(this.waveContainer.parentNode).removeChild(this.waveContainer)}},Gs({_template:Co`
    <style>
      :host {
        display: block;
        position: absolute;
        border-radius: inherit;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,
         * creating a node (with a position:absolute) in the middle of an event
         * handler "interrupts" that event handler (which happens when the
         * ripple is created on demand) */
        pointer-events: none;
      }

      :host([animating]) {
        /* This resolves a rendering issue in Chrome (as of 40) where the
           ripple is not properly clipped by its parent (which may have
           rounded corners). See: http://jsbin.com/temexa/4

           Note: We only apply this style conditionally. Otherwise, the browser
           will create a new compositing layer for every ripple element on the
           page, and that would be bad. */
        -webkit-transform: translate(0, 0);
        transform: translate3d(0, 0, 0);
      }

      #background,
      #waves,
      .wave-container,
      .wave {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      #background,
      .wave {
        opacity: 0;
      }

      #waves,
      .wave {
        overflow: hidden;
      }

      .wave-container,
      .wave {
        border-radius: 50%;
      }

      :host(.circle) #background,
      :host(.circle) #waves {
        border-radius: 50%;
      }

      :host(.circle) .wave-container {
        overflow: hidden;
      }
    </style>

    <div id="background"></div>
    <div id="waves"></div>
`,is:"paper-ripple",behaviors:[er],properties:{initialOpacity:{type:Number,value:.25},opacityDecayVelocity:{type:Number,value:.8},recenters:{type:Boolean,value:!1},center:{type:Boolean,value:!1},ripples:{type:Array,value:function(){return[]}},animating:{type:Boolean,readOnly:!0,reflectToAttribute:!0,value:!1},holdDown:{type:Boolean,value:!1,observer:"_holdDownChanged"},noink:{type:Boolean,value:!1},_animating:{type:Boolean},_boundAnimate:{type:Function,value:function(){return this.animate.bind(this)}}},get target(){return this.keyEventTarget},keyBindings:{"enter:keydown":"_onEnterKeydown","space:keydown":"_onSpaceKeydown","space:keyup":"_onSpaceKeyup"},attached:function(){11==this.parentNode.nodeType?this.keyEventTarget=Bs(this).getOwnerRoot().host:this.keyEventTarget=this.parentNode;var e=this.keyEventTarget;this.listen(e,"up","uiUpAction"),this.listen(e,"down","uiDownAction")},detached:function(){this.unlisten(this.keyEventTarget,"up","uiUpAction"),this.unlisten(this.keyEventTarget,"down","uiDownAction"),this.keyEventTarget=null},get shouldKeepAnimating(){for(var e=0;e<this.ripples.length;++e)if(!this.ripples[e].isAnimationComplete)return!0;return!1},simulatedRipple:function(){this.downAction(null),this.async((function(){this.upAction()}),1)},uiDownAction:function(e){this.noink||this.downAction(e)},downAction:function(e){this.holdDown&&this.ripples.length>0||(this.addRipple().downAction(e),this._animating||(this._animating=!0,this.animate()))},uiUpAction:function(e){this.noink||this.upAction(e)},upAction:function(e){this.holdDown||(this.ripples.forEach((function(t){t.upAction(e)})),this._animating=!0,this.animate())},onAnimationComplete:function(){this._animating=!1,this.$.background.style.backgroundColor=null,this.fire("transitionend")},addRipple:function(){var e=new or(this);return Bs(this.$.waves).appendChild(e.waveContainer),this.$.background.style.backgroundColor=e.color,this.ripples.push(e),this._setAnimating(!0),e},removeRipple:function(e){var t=this.ripples.indexOf(e);t<0||(this.ripples.splice(t,1),e.remove(),this.ripples.length||this._setAnimating(!1))},animate:function(){if(this._animating){var e,t;for(e=0;e<this.ripples.length;++e)(t=this.ripples[e]).draw(),this.$.background.style.opacity=t.outerOpacity,t.isOpacityFullyDecayed&&!t.isRestingAtMaxRadius&&this.removeRipple(t);this.shouldKeepAnimating||0!==this.ripples.length?window.requestAnimationFrame(this._boundAnimate):this.onAnimationComplete()}},animateRipple:function(){return this.animate()},_onEnterKeydown:function(){this.uiDownAction(),this.async(this.uiUpAction,1)},_onSpaceKeydown:function(){this.uiDownAction()},_onSpaceKeyup:function(){this.uiUpAction()},_holdDownChanged:function(e,t){void 0!==t&&(e?this.downAction():this.upAction())}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const rr={properties:{noink:{type:Boolean,observer:"_noinkChanged"},_rippleContainer:{type:Object}},_buttonStateChanged:function(){this.focused&&this.ensureRipple()},_downHandler:function(e){tr._downHandler.call(this,e),this.pressed&&this.ensureRipple(e)},ensureRipple:function(e){if(!this.hasRipple()){this._ripple=this._createRipple(),this._ripple.noink=this.noink;var t=this._rippleContainer||this.root;if(t&&Bs(t).appendChild(this._ripple),e){var i=Bs(this._rippleContainer||this),n=Bs(e).rootTarget;i.deepContains(n)&&this._ripple.uiDownAction(e)}}},getRipple:function(){return this.ensureRipple(),this._ripple},hasRipple:function(){return Boolean(this._ripple)},_createRipple:function(){return document.createElement("paper-ripple")},_noinkChanged:function(e){this.hasRipple()&&(this._ripple.noink=e)}},ar={observers:["_focusedChanged(receivedFocusFromKeyboard)"],_focusedChanged:function(e){e&&this.ensureRipple(),this.hasRipple()&&(this._ripple.holdDown=e)},_createRipple:function(){var e=rr._createRipple();return e.id="ink",e.setAttribute("center",""),e.classList.add("circle"),e}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Gs({is:"paper-icon-button",_template:Co`
    <style>
      :host {
        display: inline-block;
        position: relative;
        padding: 8px;
        outline: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        z-index: 0;
        line-height: 1;

        width: 40px;
        height: 40px;

        /*
          NOTE: Both values are needed, since some phones require the value to
          be \`transparent\`.
        */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;

        /* Because of polymer/2558, this style has lower specificity than * */
        box-sizing: border-box !important;

        @apply --paper-icon-button;
      }

      :host #ink {
        color: var(--paper-icon-button-ink-color, var(--primary-text-color));
        opacity: 0.6;
      }

      :host([disabled]) {
        color: var(--paper-icon-button-disabled-text, var(--disabled-text-color));
        pointer-events: none;
        cursor: auto;

        @apply --paper-icon-button-disabled;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:hover) {
        @apply --paper-icon-button-hover;
      }

      iron-icon {
        --iron-icon-width: 100%;
        --iron-icon-height: 100%;
      }
    </style>

    <iron-icon id="icon" src="[[src]]" icon="[[icon]]"
               alt$="[[alt]]"></iron-icon>
  `,hostAttributes:{role:"button",tabindex:"0"},behaviors:[[ir,Fo,rr,ar]],registered:function(){this._template.setAttribute("strip-whitespace","")},properties:{src:{type:String},icon:{type:String},alt:{type:String,observer:"_altChanged"}},_altChanged:function(e,t){var i=this.getAttribute("aria-label");i&&t!=i||this.setAttribute("aria-label",e)}}),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Gs({is:"iron-iconset-svg",properties:{name:{type:String,observer:"_nameChanged"},size:{type:Number,value:24},rtlMirroring:{type:Boolean,value:!1},useGlobalRtlAttribute:{type:Boolean,value:!1}},created:function(){this._meta=new Vo({type:"iconset",key:null,value:null})},attached:function(){this.style.display="none"},getIconNames:function(){return this._icons=this._createIconMap(),Object.keys(this._icons).map((function(e){return this.name+":"+e}),this)},applyIcon:function(e,t){this.removeIcon(e);var i=this._cloneIcon(t,this.rtlMirroring&&this._targetIsRTL(e));if(i){var n=Bs(e.root||e);return n.insertBefore(i,n.childNodes[0]),e._svgIcon=i}return null},removeIcon:function(e){e._svgIcon&&(Bs(e.root||e).removeChild(e._svgIcon),e._svgIcon=null)},_targetIsRTL:function(e){if(null==this.__targetIsRTL)if(this.useGlobalRtlAttribute){var t=document.body&&document.body.hasAttribute("dir")?document.body:document.documentElement;this.__targetIsRTL="rtl"===t.getAttribute("dir")}else e&&e.nodeType!==Node.ELEMENT_NODE&&(e=e.host),this.__targetIsRTL=e&&"rtl"===window.getComputedStyle(e).direction;return this.__targetIsRTL},_nameChanged:function(){this._meta.value=null,this._meta.key=this.name,this._meta.value=this,this.async((function(){this.fire("iron-iconset-added",this,{node:window})}))},_createIconMap:function(){var e=Object.create(null);return Bs(this).querySelectorAll("[id]").forEach((function(t){e[t.id]=t})),e},_cloneIcon:function(e,t){return this._icons=this._icons||this._createIconMap(),this._prepareSvgClone(this._icons[e],this.size,t)},_prepareSvgClone:function(e,t,i){if(e){var n=e.cloneNode(!0),s=document.createElementNS("http://www.w3.org/2000/svg","svg"),o=n.getAttribute("viewBox")||"0 0 "+t+" "+t,r="pointer-events: none; display: block; width: 100%; height: 100%;";return i&&n.hasAttribute("mirror-in-rtl")&&(r+="-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;"),s.setAttribute("viewBox",o),s.setAttribute("preserveAspectRatio","xMidYMid meet"),s.setAttribute("focusable","false"),s.style.cssText=r,s.appendChild(n).removeAttribute("id"),s}return null}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const lr=Co`<iron-iconset-svg name="paper-tabs" size="24">
<svg><defs>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(lr.content),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Gs({_template:Co`
    <style>
      :host {
        @apply --layout-inline;
        @apply --layout-center;
        @apply --layout-center-justified;
        @apply --layout-flex-auto;

        position: relative;
        padding: 0 12px;
        overflow: hidden;
        cursor: pointer;
        vertical-align: middle;

        @apply --paper-font-common-base;
        @apply --paper-tab;
      }

      :host(:focus) {
        outline: none;
      }

      :host([link]) {
        padding: 0;
      }

      .tab-content {
        height: 100%;
        transform: translateZ(0);
          -webkit-transform: translateZ(0);
        transition: opacity 0.1s cubic-bezier(0.4, 0.0, 1, 1);
        @apply --layout-horizontal;
        @apply --layout-center-center;
        @apply --layout-flex-auto;
        @apply --paper-tab-content;
      }

      :host(:not(.iron-selected)) > .tab-content {
        opacity: 0.8;

        @apply --paper-tab-content-unselected;
      }

      :host(:focus) .tab-content {
        opacity: 1;
        font-weight: 700;

        @apply --paper-tab-content-focused;
      }

      paper-ripple {
        color: var(--paper-tab-ink, var(--paper-yellow-a100));
      }

      .tab-content > ::slotted(a) {
        @apply --layout-flex-auto;

        height: 100%;
      }
    </style>

    <div class="tab-content">
      <slot></slot>
    </div>
`,is:"paper-tab",behaviors:[Fo,ir,rr],properties:{link:{type:Boolean,value:!1,reflectToAttribute:!0}},hostAttributes:{role:"tab"},listeners:{down:"_updateNoink",tap:"_onTap"},attached:function(){this._updateNoink()},get _parentNoink(){var e=Bs(this).parentNode;return!!e&&!!e.noink},_updateNoink:function(){this.noink=!!this.noink||!!this._parentNoink},_onTap:function(e){if(this.link){var t=this.queryEffectiveChildren("a");if(!t)return;if(e.target===t)return;t.click()}}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
class hr{constructor(e){this.selection=[],this.selectCallback=e}get(){return this.multi?this.selection.slice():this.selection[0]}clear(e){this.selection.slice().forEach((function(t){(!e||e.indexOf(t)<0)&&this.setItemSelected(t,!1)}),this)}isSelected(e){return this.selection.indexOf(e)>=0}setItemSelected(e,t){if(null!=e&&t!==this.isSelected(e)){if(t)this.selection.push(e);else{var i=this.selection.indexOf(e);i>=0&&this.selection.splice(i,1)}this.selectCallback&&this.selectCallback(e,t)}}select(e){this.multi?this.toggle(e):this.get()!==e&&(this.setItemSelected(this.get(),!1),this.setItemSelected(e,!0))}toggle(e){this.setItemSelected(e,!this.isSelected(e))}}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const cr={properties:{attrForSelected:{type:String,value:null},selected:{type:String,notify:!0},selectedItem:{type:Object,readOnly:!0,notify:!0},activateEvent:{type:String,value:"tap",observer:"_activateEventChanged"},selectable:String,selectedClass:{type:String,value:"iron-selected"},selectedAttribute:{type:String,value:null},fallbackSelection:{type:String,value:null},items:{type:Array,readOnly:!0,notify:!0,value:function(){return[]}},_excludedLocalNames:{type:Object,value:function(){return{template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1}}}},observers:["_updateAttrForSelected(attrForSelected)","_updateSelected(selected)","_checkFallback(fallbackSelection)"],created:function(){this._bindFilterItem=this._filterItem.bind(this),this._selection=new hr(this._applySelection.bind(this))},attached:function(){this._observer=this._observeItems(this),this._addListener(this.activateEvent)},detached:function(){this._observer&&Bs(this).unobserveNodes(this._observer),this._removeListener(this.activateEvent)},indexOf:function(e){return this.items?this.items.indexOf(e):-1},select:function(e){this.selected=e},selectPrevious:function(){var e=this.items.length,t=e-1;void 0!==this.selected&&(t=(Number(this._valueToIndex(this.selected))-1+e)%e),this.selected=this._indexToValue(t)},selectNext:function(){var e=0;void 0!==this.selected&&(e=(Number(this._valueToIndex(this.selected))+1)%this.items.length),this.selected=this._indexToValue(e)},selectIndex:function(e){this.select(this._indexToValue(e))},forceSynchronousItemUpdate:function(){this._observer&&"function"==typeof this._observer.flush?this._observer.flush():this._updateItems()},get _shouldUpdateSelection(){return null!=this.selected},_checkFallback:function(){this._updateSelected()},_addListener:function(e){this.listen(this,e,"_activateHandler")},_removeListener:function(e){this.unlisten(this,e,"_activateHandler")},_activateEventChanged:function(e,t){this._removeListener(t),this._addListener(e)},_updateItems:function(){var e=Bs(this).queryDistributedElements(this.selectable||"*");e=Array.prototype.filter.call(e,this._bindFilterItem),this._setItems(e)},_updateAttrForSelected:function(){this.selectedItem&&(this.selected=this._valueForItem(this.selectedItem))},_updateSelected:function(){this._selectSelected(this.selected)},_selectSelected:function(e){if(this.items){var t=this._valueToItem(this.selected);t?this._selection.select(t):this._selection.clear(),this.fallbackSelection&&this.items.length&&void 0===this._selection.get()&&(this.selected=this.fallbackSelection)}},_filterItem:function(e){return!this._excludedLocalNames[e.localName]},_valueToItem:function(e){return null==e?null:this.items[this._valueToIndex(e)]},_valueToIndex:function(e){if(!this.attrForSelected)return Number(e);for(var t,i=0;t=this.items[i];i++)if(this._valueForItem(t)==e)return i},_indexToValue:function(e){if(!this.attrForSelected)return e;var t=this.items[e];return t?this._valueForItem(t):void 0},_valueForItem:function(e){if(!e)return null;if(!this.attrForSelected){var t=this.indexOf(e);return-1===t?null:t}var i=e[fi(this.attrForSelected)];return null!=i?i:e.getAttribute(this.attrForSelected)},_applySelection:function(e,t){this.selectedClass&&this.toggleClass(this.selectedClass,t,e),this.selectedAttribute&&this.toggleAttribute(this.selectedAttribute,t,e),this._selectionChange(),this.fire("iron-"+(t?"select":"deselect"),{item:e})},_selectionChange:function(){this._setSelectedItem(this._selection.get())},_observeItems:function(e){return Bs(e).observeNodes((function(e){this._updateItems(),this._updateSelected(),this.fire("iron-items-changed",e,{bubbles:!1,cancelable:!1})}))},_activateHandler:function(e){for(var t=e.target,i=this.items;t&&t!=this;){var n=i.indexOf(t);if(n>=0){var s=this._indexToValue(n);return void this._itemActivate(s,t)}t=t.parentNode}},_itemActivate:function(e,t){this.fire("iron-activate",{selected:e,item:t},{cancelable:!0}).defaultPrevented||this.select(e)}},dr={properties:{multi:{type:Boolean,value:!1,observer:"multiChanged"},selectedValues:{type:Array,notify:!0,value:function(){return[]}},selectedItems:{type:Array,readOnly:!0,notify:!0,value:function(){return[]}}},observers:["_updateSelected(selectedValues.splices)"],select:function(e){this.multi?this._toggleSelected(e):this.selected=e},multiChanged:function(e){this._selection.multi=e,this._updateSelected()},get _shouldUpdateSelection(){return null!=this.selected||null!=this.selectedValues&&this.selectedValues.length},_updateAttrForSelected:function(){this.multi?this.selectedItems&&this.selectedItems.length>0&&(this.selectedValues=this.selectedItems.map((function(e){return this._indexToValue(this.indexOf(e))}),this).filter((function(e){return null!=e}),this)):cr._updateAttrForSelected.apply(this)},_updateSelected:function(){this.multi?this._selectMulti(this.selectedValues):this._selectSelected(this.selected)},_selectMulti:function(e){e=e||[];var t=(this._valuesToItems(e)||[]).filter((function(e){return null!=e}));this._selection.clear(t);for(var i=0;i<t.length;i++)this._selection.setItemSelected(t[i],!0);this.fallbackSelection&&!this._selection.get().length&&(this._valueToItem(this.fallbackSelection)&&this.select(this.fallbackSelection))},_selectionChange:function(){var e=this._selection.get();this.multi?(this._setSelectedItems(e),this._setSelectedItem(e.length?e[0]:null)):null!=e?(this._setSelectedItems([e]),this._setSelectedItem(e)):(this._setSelectedItems([]),this._setSelectedItem(null))},_toggleSelected:function(e){var t=this.selectedValues.indexOf(e);t<0?this.push("selectedValues",e):this.splice("selectedValues",t,1)},_valuesToItems:function(e){return null==e?null:e.map((function(e){return this._valueToItem(e)}),this)}},pr={properties:{focusedItem:{observer:"_focusedItemChanged",readOnly:!0,type:Object},attrForItemTitle:{type:String},disabled:{type:Boolean,value:!1,observer:"_disabledChanged"}},_MODIFIER_KEYS:["Alt","AltGraph","CapsLock","Control","Fn","FnLock","Hyper","Meta","NumLock","OS","ScrollLock","Shift","Super","Symbol","SymbolLock"],_SEARCH_RESET_TIMEOUT_MS:1e3,_previousTabIndex:0,hostAttributes:{role:"menu"},observers:["_updateMultiselectable(multi)"],listeners:{focus:"_onFocus",keydown:"_onKeydown","iron-items-changed":"_onIronItemsChanged"},keyBindings:{up:"_onUpKey",down:"_onDownKey",esc:"_onEscKey","shift+tab:keydown":"_onShiftTabDown"},attached:function(){this._resetTabindices()},select:function(e){this._defaultFocusAsync&&(this.cancelAsync(this._defaultFocusAsync),this._defaultFocusAsync=null);var t=this._valueToItem(e);t&&t.hasAttribute("disabled")||(this._setFocusedItem(t),dr.select.apply(this,arguments))},_resetTabindices:function(){var e=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this.items.forEach((function(t){t.setAttribute("tabindex",t===e?"0":"-1"),t.setAttribute("aria-selected",this._selection.isSelected(t))}),this)},_updateMultiselectable:function(e){e?this.setAttribute("aria-multiselectable","true"):this.removeAttribute("aria-multiselectable")},_focusWithKeyboardEvent:function(e){if(-1===this._MODIFIER_KEYS.indexOf(e.key)){this.cancelDebouncer("_clearSearchText");for(var t,i=this._searchText||"",n=(i+=(e.key&&1==e.key.length?e.key:String.fromCharCode(e.keyCode)).toLocaleLowerCase()).length,s=0;t=this.items[s];s++)if(!t.hasAttribute("disabled")){var o=this.attrForItemTitle||"textContent",r=(t[o]||t.getAttribute(o)||"").trim();if(!(r.length<n)&&r.slice(0,n).toLocaleLowerCase()==i){this._setFocusedItem(t);break}}this._searchText=i,this.debounce("_clearSearchText",this._clearSearchText,this._SEARCH_RESET_TIMEOUT_MS)}},_clearSearchText:function(){this._searchText=""},_focusPrevious:function(){for(var e=this.items.length,t=Number(this.indexOf(this.focusedItem)),i=1;i<e+1;i++){var n=this.items[(t-i+e)%e];if(!n.hasAttribute("disabled")){var s=Bs(n).getOwnerRoot()||document;if(this._setFocusedItem(n),Bs(s).activeElement==n)return}}},_focusNext:function(){for(var e=this.items.length,t=Number(this.indexOf(this.focusedItem)),i=1;i<e+1;i++){var n=this.items[(t+i)%e];if(!n.hasAttribute("disabled")){var s=Bs(n).getOwnerRoot()||document;if(this._setFocusedItem(n),Bs(s).activeElement==n)return}}},_applySelection:function(e,t){t?e.setAttribute("aria-selected","true"):e.setAttribute("aria-selected","false"),cr._applySelection.apply(this,arguments)},_focusedItemChanged:function(e,t){t&&t.setAttribute("tabindex","-1"),!e||e.hasAttribute("disabled")||this.disabled||(e.setAttribute("tabindex","0"),e.focus())},_onIronItemsChanged:function(e){e.detail.addedNodes.length&&this._resetTabindices()},_onShiftTabDown:function(e){var t=this.getAttribute("tabindex");pr._shiftTabPressed=!0,this._setFocusedItem(null),this.setAttribute("tabindex","-1"),this.async((function(){this.setAttribute("tabindex",t),pr._shiftTabPressed=!1}),1)},_onFocus:function(e){if(!pr._shiftTabPressed){var t=Bs(e).rootTarget;(t===this||void 0===t.tabIndex||this.isLightDescendant(t))&&(this._defaultFocusAsync=this.async((function(){var e=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this._setFocusedItem(null),e?this._setFocusedItem(e):this.items[0]&&this._focusNext()})))}},_onUpKey:function(e){this._focusPrevious(),e.detail.keyboardEvent.preventDefault()},_onDownKey:function(e){this._focusNext(),e.detail.keyboardEvent.preventDefault()},_onEscKey:function(e){var t=this.focusedItem;t&&t.blur()},_onKeydown:function(e){this.keyboardEventMatchesKeys(e,"up down esc")||this._focusWithKeyboardEvent(e),e.stopPropagation()},_activateHandler:function(e){cr._activateHandler.call(this,e),e.stopPropagation()},_disabledChanged:function(e){e?(this._previousTabIndex=this.hasAttribute("tabindex")?this.tabIndex:0,this.removeAttribute("tabindex")):this.hasAttribute("tabindex")||this.setAttribute("tabindex",this._previousTabIndex)},_shiftTabPressed:!1},ur=[[[cr,dr],er,pr],{hostAttributes:{role:"menubar"},keyBindings:{left:"_onLeftKey",right:"_onRightKey"},_onUpKey:function(e){this.focusedItem.click(),e.detail.keyboardEvent.preventDefault()},_onDownKey:function(e){this.focusedItem.click(),e.detail.keyboardEvent.preventDefault()},get _isRTL(){return"rtl"===window.getComputedStyle(this).direction},_onLeftKey:function(e){this._isRTL?this._focusNext():this._focusPrevious(),e.detail.keyboardEvent.preventDefault()},_onRightKey:function(e){this._isRTL?this._focusPrevious():this._focusNext(),e.detail.keyboardEvent.preventDefault()},_onKeydown:function(e){this.keyboardEventMatchesKeys(e,"up down left right esc")||this._focusWithKeyboardEvent(e)}}];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var fr=new Set;const _r={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:!1}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[],this._boundNotifyResize=this.notifyResize.bind(this),this._boundOnDescendantIronResize=this._onDescendantIronResize.bind(this)},attached:function(){this._requestResizeNotifications()},detached:function(){this._parentResizable?this._parentResizable.stopResizeNotificationsFor(this):(fr.delete(this),window.removeEventListener("resize",this._boundNotifyResize)),this._parentResizable=null},notifyResize:function(){this.isAttached&&(this._interestedResizables.forEach((function(e){this.resizerShouldNotify(e)&&this._notifyDescendant(e)}),this),this._fireResize())},assignParentResizable:function(e){this._parentResizable&&this._parentResizable.stopResizeNotificationsFor(this),this._parentResizable=e,e&&-1===e._interestedResizables.indexOf(this)&&(e._interestedResizables.push(this),e._subscribeIronResize(this))},stopResizeNotificationsFor:function(e){var t=this._interestedResizables.indexOf(e);t>-1&&(this._interestedResizables.splice(t,1),this._unsubscribeIronResize(e))},_subscribeIronResize:function(e){e.addEventListener("iron-resize",this._boundOnDescendantIronResize)},_unsubscribeIronResize:function(e){e.removeEventListener("iron-resize",this._boundOnDescendantIronResize)},resizerShouldNotify:function(e){return!0},_onDescendantIronResize:function(e){this._notifyingDescendant?e.stopPropagation():Et||this._fireResize()},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:!1})},_onIronRequestResizeNotifications:function(e){var t=Bs(e).rootTarget;t!==this&&(t.assignParentResizable(this),this._notifyDescendant(t),e.stopPropagation())},_parentResizableChanged:function(e){e&&window.removeEventListener("resize",this._boundNotifyResize)},_notifyDescendant:function(e){this.isAttached&&(this._notifyingDescendant=!0,e.notifyResize(),this._notifyingDescendant=!1)},_requestResizeNotifications:function(){if(this.isAttached)if("loading"===document.readyState){var e=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",(function t(){document.removeEventListener("readystatechange",t),e()}))}else this._findParent(),this._parentResizable?this._parentResizable._interestedResizables.forEach((function(e){e!==this&&e._findParent()}),this):(fr.forEach((function(e){e!==this&&e._findParent()}),this),window.addEventListener("resize",this._boundNotifyResize),this.notifyResize())},_findParent:function(){this.assignParentResizable(null),this.fire("iron-request-resize-notifications",null,{node:this,bubbles:!0,cancelable:!0}),this._parentResizable?fr.delete(this):fr.add(this)}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/Gs({_template:Co`
    <style>
      :host {
        @apply --layout;
        @apply --layout-center;

        height: 48px;
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;

        /* NOTE: Both values are needed, since some phones require the value to be \`transparent\`. */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;

        @apply --paper-tabs;
      }

      :host(:dir(rtl)) {
        @apply --layout-horizontal-reverse;
      }

      #tabsContainer {
        position: relative;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        @apply --layout-flex-auto;
        @apply --paper-tabs-container;
      }

      #tabsContent {
        height: 100%;
        -moz-flex-basis: auto;
        -ms-flex-basis: auto;
        flex-basis: auto;
        @apply --paper-tabs-content;
      }

      #tabsContent.scrollable {
        position: absolute;
        white-space: nowrap;
      }

      #tabsContent:not(.scrollable),
      #tabsContent.scrollable.fit-container {
        @apply --layout-horizontal;
      }

      #tabsContent.scrollable.fit-container {
        min-width: 100%;
      }

      #tabsContent.scrollable.fit-container > ::slotted(*) {
        /* IE - prevent tabs from compressing when they should scroll. */
        -ms-flex: 1 0 auto;
        -webkit-flex: 1 0 auto;
        flex: 1 0 auto;
      }

      .hidden {
        display: none;
      }

      .not-visible {
        opacity: 0;
        cursor: default;
      }

      paper-icon-button {
        width: 48px;
        height: 48px;
        padding: 12px;
        margin: 0 4px;
      }

      #selectionBar {
        position: absolute;
        height: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom: 2px solid var(--paper-tabs-selection-bar-color, var(--paper-yellow-a100));
          -webkit-transform: scale(0);
        transform: scale(0);
          -webkit-transform-origin: left center;
        transform-origin: left center;
          transition: -webkit-transform;
        transition: transform;

        @apply --paper-tabs-selection-bar;
      }

      #selectionBar.align-bottom {
        top: 0;
        bottom: auto;
      }

      #selectionBar.expand {
        transition-duration: 0.15s;
        transition-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
      }

      #selectionBar.contract {
        transition-duration: 0.18s;
        transition-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
      }

      #tabsContent > ::slotted(:not(#selectionBar)) {
        height: 100%;
      }
    </style>

    <paper-icon-button icon="paper-tabs:chevron-left" class$="[[_computeScrollButtonClass(_leftHidden, scrollable, hideScrollButtons)]]" on-up="_onScrollButtonUp" on-down="_onLeftScrollButtonDown" tabindex="-1"></paper-icon-button>

    <div id="tabsContainer" on-track="_scroll" on-down="_down">
      <div id="tabsContent" class$="[[_computeTabsContentClass(scrollable, fitContainer)]]">
        <div id="selectionBar" class$="[[_computeSelectionBarClass(noBar, alignBottom)]]" on-transitionend="_onBarTransitionEnd"></div>
        <slot></slot>
      </div>
    </div>

    <paper-icon-button icon="paper-tabs:chevron-right" class$="[[_computeScrollButtonClass(_rightHidden, scrollable, hideScrollButtons)]]" on-up="_onScrollButtonUp" on-down="_onRightScrollButtonDown" tabindex="-1"></paper-icon-button>
`,is:"paper-tabs",behaviors:[_r,ur],properties:{noink:{type:Boolean,value:!1,observer:"_noinkChanged"},noBar:{type:Boolean,value:!1},noSlide:{type:Boolean,value:!1},scrollable:{type:Boolean,value:!1},fitContainer:{type:Boolean,value:!1},disableDrag:{type:Boolean,value:!1},hideScrollButtons:{type:Boolean,value:!1},alignBottom:{type:Boolean,value:!1},selectable:{type:String,value:"paper-tab"},autoselect:{type:Boolean,value:!1},autoselectDelay:{type:Number,value:0},_step:{type:Number,value:10},_holdDelay:{type:Number,value:1},_leftHidden:{type:Boolean,value:!1},_rightHidden:{type:Boolean,value:!1},_previousTab:{type:Object}},hostAttributes:{role:"tablist"},listeners:{"iron-resize":"_onTabSizingChanged","iron-items-changed":"_onTabSizingChanged","iron-select":"_onIronSelect","iron-deselect":"_onIronDeselect"},keyBindings:{"left:keyup right:keyup":"_onArrowKeyup"},created:function(){this._holdJob=null,this._pendingActivationItem=void 0,this._pendingActivationTimeout=void 0,this._bindDelayedActivationHandler=this._delayedActivationHandler.bind(this),this.addEventListener("blur",this._onBlurCapture.bind(this),!0)},ready:function(){this.setScrollDirection("y",this.$.tabsContainer)},detached:function(){this._cancelPendingActivation()},_noinkChanged:function(e){Bs(this).querySelectorAll("paper-tab").forEach(e?this._setNoinkAttribute:this._removeNoinkAttribute)},_setNoinkAttribute:function(e){e.setAttribute("noink","")},_removeNoinkAttribute:function(e){e.removeAttribute("noink")},_computeScrollButtonClass:function(e,t,i){return!t||i?"hidden":e?"not-visible":""},_computeTabsContentClass:function(e,t){return e?"scrollable"+(t?" fit-container":""):" fit-container"},_computeSelectionBarClass:function(e,t){return e?"hidden":t?"align-bottom":""},_onTabSizingChanged:function(){this.debounce("_onTabSizingChanged",(function(){this._scroll(),this._tabChanged(this.selectedItem)}),10)},_onIronSelect:function(e){this._tabChanged(e.detail.item,this._previousTab),this._previousTab=e.detail.item,this.cancelDebouncer("tab-changed")},_onIronDeselect:function(e){this.debounce("tab-changed",(function(){this._tabChanged(null,this._previousTab),this._previousTab=null}),1)},_activateHandler:function(){this._cancelPendingActivation(),pr._activateHandler.apply(this,arguments)},_scheduleActivation:function(e,t){this._pendingActivationItem=e,this._pendingActivationTimeout=this.async(this._bindDelayedActivationHandler,t)},_delayedActivationHandler:function(){var e=this._pendingActivationItem;this._pendingActivationItem=void 0,this._pendingActivationTimeout=void 0,e.fire(this.activateEvent,null,{bubbles:!0,cancelable:!0})},_cancelPendingActivation:function(){void 0!==this._pendingActivationTimeout&&(this.cancelAsync(this._pendingActivationTimeout),this._pendingActivationItem=void 0,this._pendingActivationTimeout=void 0)},_onArrowKeyup:function(e){this.autoselect&&this._scheduleActivation(this.focusedItem,this.autoselectDelay)},_onBlurCapture:function(e){e.target===this._pendingActivationItem&&this._cancelPendingActivation()},get _tabContainerScrollSize(){return Math.max(0,this.$.tabsContainer.scrollWidth-this.$.tabsContainer.offsetWidth)},_scroll:function(e,t){if(this.scrollable){var i=t&&-t.ddx||0;this._affectScroll(i)}},_down:function(e){this.async((function(){this._defaultFocusAsync&&(this.cancelAsync(this._defaultFocusAsync),this._defaultFocusAsync=null)}),1)},_affectScroll:function(e){this.$.tabsContainer.scrollLeft+=e;var t=this.$.tabsContainer.scrollLeft;this._leftHidden=0===t,this._rightHidden=t===this._tabContainerScrollSize},_onLeftScrollButtonDown:function(){this._scrollToLeft(),this._holdJob=setInterval(this._scrollToLeft.bind(this),this._holdDelay)},_onRightScrollButtonDown:function(){this._scrollToRight(),this._holdJob=setInterval(this._scrollToRight.bind(this),this._holdDelay)},_onScrollButtonUp:function(){clearInterval(this._holdJob),this._holdJob=null},_scrollToLeft:function(){this._affectScroll(-this._step)},_scrollToRight:function(){this._affectScroll(this._step)},_tabChanged:function(e,t){if(!e)return this.$.selectionBar.classList.remove("expand"),this.$.selectionBar.classList.remove("contract"),void this._positionBar(0,0);var i=this.$.tabsContent.getBoundingClientRect(),n=i.width,s=e.getBoundingClientRect(),o=s.left-i.left;if(this._pos={width:this._calcPercent(s.width,n),left:this._calcPercent(o,n)},this.noSlide||null==t)return this.$.selectionBar.classList.remove("expand"),this.$.selectionBar.classList.remove("contract"),void this._positionBar(this._pos.width,this._pos.left);var r=t.getBoundingClientRect(),a=this.items.indexOf(t),l=this.items.indexOf(e);this.$.selectionBar.classList.add("expand");var h=a<l;this._isRTL&&(h=!h),h?this._positionBar(this._calcPercent(s.left+s.width-r.left,n)-5,this._left):this._positionBar(this._calcPercent(r.left+r.width-s.left,n)-5,this._calcPercent(o,n)+5),this.scrollable&&this._scrollToSelectedIfNeeded(s.width,o)},_scrollToSelectedIfNeeded:function(e,t){var i=t-this.$.tabsContainer.scrollLeft;i<0?this.$.tabsContainer.scrollLeft+=i:(i+=e-this.$.tabsContainer.offsetWidth)>0&&(this.$.tabsContainer.scrollLeft+=i)},_calcPercent:function(e,t){return 100*e/t},_positionBar:function(e,t){e=e||0,t=t||0,this._width=e,this._left=t,this.transform("translateX("+t+"%) scaleX("+e/100+")",this.$.selectionBar)},_onBarTransitionEnd:function(e){var t=this.$.selectionBar.classList;t.contains("expand")?(t.remove("expand"),t.add("contract"),this._positionBar(this._pos.width,this._pos.left)):t.contains("contract")&&t.remove("contract")}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const mr=Co`
<custom-style>
  <style is="custom-style">
    html {

      --shadow-transition: {
        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      };

      --shadow-none: {
        box-shadow: none;
      };

      /* from http://codepen.io/shyndman/pen/c5394ddf2e8b2a5c9185904b57421cdb */

      --shadow-elevation-2dp: {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
      };

      --shadow-elevation-3dp: {
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
                    0 1px 8px 0 rgba(0, 0, 0, 0.12),
                    0 3px 3px -2px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-4dp: {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                    0 1px 10px 0 rgba(0, 0, 0, 0.12),
                    0 2px 4px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-6dp: {
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                    0 1px 18px 0 rgba(0, 0, 0, 0.12),
                    0 3px 5px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-8dp: {
        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                    0 3px 14px 2px rgba(0, 0, 0, 0.12),
                    0 5px 5px -3px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-12dp: {
        box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
                    0 4px 22px 3px rgba(0, 0, 0, 0.12),
                    0 6px 7px -4px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-16dp: {
        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                    0  6px 30px 5px rgba(0, 0, 0, 0.12),
                    0  8px 10px -5px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-24dp: {
        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
                    0 9px 46px 8px rgba(0, 0, 0, 0.12),
                    0 11px 15px -7px rgba(0, 0, 0, 0.4);
      };
    }
  </style>
</custom-style>`;mr.setAttribute("style","display: none;"),document.head.appendChild(mr.content);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const gr=Co`
<dom-module id="paper-material-styles">
  <template>
    <style>
      html {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      .paper-material {
        @apply --paper-material;
      }
      .paper-material[elevation="1"] {
        @apply --paper-material-elevation-1;
      }
      .paper-material[elevation="2"] {
        @apply --paper-material-elevation-2;
      }
      .paper-material[elevation="3"] {
        @apply --paper-material-elevation-3;
      }
      .paper-material[elevation="4"] {
        @apply --paper-material-elevation-4;
      }
      .paper-material[elevation="5"] {
        @apply --paper-material-elevation-5;
      }

      /* Duplicate the styles because of https://github.com/webcomponents/shadycss/issues/193 */
      :host {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      :host(.paper-material) {
        @apply --paper-material;
      }
      :host(.paper-material[elevation="1"]) {
        @apply --paper-material-elevation-1;
      }
      :host(.paper-material[elevation="2"]) {
        @apply --paper-material-elevation-2;
      }
      :host(.paper-material[elevation="3"]) {
        @apply --paper-material-elevation-3;
      }
      :host(.paper-material[elevation="4"]) {
        @apply --paper-material-elevation-4;
      }
      :host(.paper-material[elevation="5"]) {
        @apply --paper-material-elevation-5;
      }
    </style>
  </template>
</dom-module>`;gr.setAttribute("style","display: none;"),document.head.appendChild(gr.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const vr={properties:{elevation:{type:Number,reflectToAttribute:!0,readOnly:!0}},observers:["_calculateElevation(focused, disabled, active, pressed, receivedFocusFromKeyboard)","_computeKeyboardClass(receivedFocusFromKeyboard)"],hostAttributes:{role:"button",tabindex:"0",animated:!0},_calculateElevation:function(){var e=1;this.disabled?e=0:this.active||this.pressed?e=4:this.receivedFocusFromKeyboard&&(e=3),this._setElevation(e)},_computeKeyboardClass:function(e){this.toggleClass("keyboard-focus",e)},_spaceKeyDownHandler:function(e){tr._spaceKeyDownHandler.call(this,e),this.hasRipple()&&this.getRipple().ripples.length<1&&this._ripple.uiDownAction()},_spaceKeyUpHandler:function(e){tr._spaceKeyUpHandler.call(this,e),this.hasRipple()&&this._ripple.uiUpAction()}},yr=[ir,Fo,rr,vr],br=Co`
  <style include="paper-material-styles">
    /* Need to specify the same specificity as the styles imported from paper-material. */
    :host {
      @apply --layout-inline;
      @apply --layout-center-center;
      position: relative;
      box-sizing: border-box;
      min-width: 5.14em;
      margin: 0 0.29em;
      background: transparent;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      font: inherit;
      text-transform: uppercase;
      outline-width: 0;
      border-radius: 3px;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      cursor: pointer;
      z-index: 0;
      padding: 0.7em 0.57em;

      @apply --paper-font-common-base;
      @apply --paper-button;
    }

    :host([elevation="1"]) {
      @apply --paper-material-elevation-1;
    }

    :host([elevation="2"]) {
      @apply --paper-material-elevation-2;
    }

    :host([elevation="3"]) {
      @apply --paper-material-elevation-3;
    }

    :host([elevation="4"]) {
      @apply --paper-material-elevation-4;
    }

    :host([elevation="5"]) {
      @apply --paper-material-elevation-5;
    }

    :host([hidden]) {
      display: none !important;
    }

    :host([raised].keyboard-focus) {
      font-weight: bold;
      @apply --paper-button-raised-keyboard-focus;
    }

    :host(:not([raised]).keyboard-focus) {
      font-weight: bold;
      @apply --paper-button-flat-keyboard-focus;
    }

    :host([disabled]) {
      background: none;
      color: #a8a8a8;
      cursor: auto;
      pointer-events: none;

      @apply --paper-button-disabled;
    }

    :host([disabled][raised]) {
      background: #eaeaea;
    }


    :host([animated]) {
      @apply --shadow-transition;
    }

    paper-ripple {
      color: var(--paper-button-ink-color);
    }
  </style>

  <slot></slot>`;br.setAttribute("strip-whitespace",""),Gs({_template:br,is:"paper-button",behaviors:[yr],properties:{raised:{type:Boolean,reflectToAttribute:!0,value:!1,observer:"_calculateElevation"}},_calculateElevation:function(){this.raised?vr._calculateElevation.apply(this):this._setElevation(0)}});
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const wr=Co`<iron-iconset-svg name="icons" size="24">
<svg><defs>
<g id="3d-rotation"><path d="M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z"></path></g>
<g id="accessibility"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></g>
<g id="accessible"><circle cx="12" cy="4" r="2"></circle><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path></g>
<g id="account-balance"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path></g>
<g id="account-balance-wallet"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="account-box"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path></g>
<g id="account-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></g>
<g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
<g id="add-alert"><path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z"></path></g>
<g id="add-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle-outline"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="add-shopping-cart"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path></g>
<g id="alarm"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>
<g id="alarm-add"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"></path></g>
<g id="alarm-off"><path d="M12 6c3.87 0 7 3.13 7 7 0 .84-.16 1.65-.43 2.4l1.52 1.52c.58-1.19.91-2.51.91-3.92 0-4.97-4.03-9-9-9-1.41 0-2.73.33-3.92.91L9.6 6.43C10.35 6.16 11.16 6 12 6zm10-.28l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM2.92 2.29L1.65 3.57 2.98 4.9l-1.11.93 1.42 1.42 1.11-.94.8.8C3.83 8.69 3 10.75 3 13c0 4.97 4.02 9 9 9 2.25 0 4.31-.83 5.89-2.2l2.2 2.2 1.27-1.27L3.89 3.27l-.97-.98zm13.55 16.1C15.26 19.39 13.7 20 12 20c-3.87 0-7-3.13-7-7 0-1.7.61-3.26 1.61-4.47l9.86 9.86zM8.02 3.28L6.6 1.86l-.86.71 1.42 1.42.86-.71z"></path></g>
<g id="alarm-on"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z"></path></g>
<g id="all-out"><path d="M16.21 4.16l4 4v-4zm4 12l-4 4h4zm-12 4l-4-4v4zm-4-12l4-4h-4zm12.95-.95c-2.73-2.73-7.17-2.73-9.9 0s-2.73 7.17 0 9.9 7.17 2.73 9.9 0 2.73-7.16 0-9.9zm-1.1 8.8c-2.13 2.13-5.57 2.13-7.7 0s-2.13-5.57 0-7.7 5.57-2.13 7.7 0 2.13 5.57 0 7.7z"></path></g>
<g id="android"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"></path></g>
<g id="announcement"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path></g>
<g id="apps"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g>
<g id="archive"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></g>
<g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
<g id="arrow-downward"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g>
<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>
<g id="arrow-drop-down-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z"></path></g>
<g id="arrow-drop-up"><path d="M7 14l5-5 5 5z"></path></g>
<g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
<g id="arrow-upward"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></g>
<g id="aspect-ratio"><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="assessment"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
<g id="assignment"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></g>
<g id="assignment-ind"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"></path></g>
<g id="assignment-late"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></g>
<g id="assignment-return"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z"></path></g>
<g id="assignment-returned"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z"></path></g>
<g id="assignment-turned-in"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="attachment"><path d="M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z"></path></g>
<g id="autorenew"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"></path></g>
<g id="backspace"><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path></g>
<g id="backup"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="block"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></g>
<g id="book"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="bookmark"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="bookmark-border"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="bug-report"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path></g>
<g id="build"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path></g>
<g id="cached"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"></path></g>
<g id="camera-enhance"><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"></path></g>
<g id="cancel"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g>
<g id="card-giftcard"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="card-membership"><path d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z"></path></g>
<g id="card-travel"><path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"></path></g>
<g id="change-history"><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"></path></g>
<g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>
<g id="check-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="check-box-outline-blank"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
<g id="chrome-reader-mode"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path></g>
<g id="class"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="cloud"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path></g>
<g id="cloud-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.66 0-3-1.34-3-3s1.34-3 3-3l.14.01C8.58 8.28 10.13 7 12 7c2.21 0 4 1.79 4 4h.5c1.38 0 2.5 1.12 2.5 2.5S17.88 16 16.5 16z"></path></g>
<g id="cloud-done"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"></path></g>
<g id="cloud-download"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path></g>
<g id="cloud-off"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"></path></g>
<g id="cloud-queue"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"></path></g>
<g id="cloud-upload"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
<g id="compare-arrows"><path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path></g>
<g id="content-copy"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></g>
<g id="content-cut"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"></path></g>
<g id="content-paste"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></g>
<g id="copyright"><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="create-new-folder"><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"></path></g>
<g id="credit-card"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="dashboard"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></g>
<g id="date-range"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></g>
<g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-forever"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-sweep"><path d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"></path></g>
<g id="description"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></g>
<g id="dns"><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="done"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></g>
<g id="done-all"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path></g>
<g id="donut-large"><path d="M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z"></path></g>
<g id="donut-small"><path d="M11 9.16V2c-5 .5-9 4.79-9 10s4 9.5 9 10v-7.16c-1-.41-2-1.52-2-2.84s1-2.43 2-2.84zM14.86 11H22c-.48-4.75-4-8.53-9-9v7.16c1 .3 1.52.98 1.86 1.84zM13 14.84V22c5-.47 8.52-4.25 9-9h-7.14c-.34.86-.86 1.54-1.86 1.84z"></path></g>
<g id="drafts"><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"></path></g>
<g id="eject"><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"></path></g>
<g id="error"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>
<g id="error-outline"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="euro-symbol"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"></path></g>
<g id="event"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>
<g id="event-seat"><path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"></path></g>
<g id="exit-to-app"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>
<g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>
<g id="explore"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path></g>
<g id="extension"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path></g>
<g id="face"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></g>
<g id="favorite"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></g>
<g id="favorite-border"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></g>
<g id="feedback"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path></g>
<g id="file-download"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="file-upload"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></g>
<g id="filter-list"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></g>
<g id="find-in-page"><path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"></path></g>
<g id="find-replace"><path d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z"></path></g>
<g id="fingerprint"><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path></g>
<g id="first-page"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path></g>
<g id="flag"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g>
<g id="flight-land"><path d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z"></path></g>
<g id="flight-takeoff"><path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"></path></g>
<g id="flip-to-back"><path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z"></path></g>
<g id="flip-to-front"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"></path></g>
<g id="folder"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></g>
<g id="folder-open"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path></g>
<g id="folder-shared"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"></path></g>
<g id="font-download"><path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"></path></g>
<g id="forward"><path d="M12 8V4l8 8-8 8v-4H4V8z"></path></g>
<g id="fullscreen"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></g>
<g id="fullscreen-exit"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></g>
<g id="g-translate"><path d="M20 5h-9.12L10 2H4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h7l1 3h8c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM7.17 14.59c-2.25 0-4.09-1.83-4.09-4.09s1.83-4.09 4.09-4.09c1.04 0 1.99.37 2.74 1.07l.07.06-1.23 1.18-.06-.05c-.29-.27-.78-.59-1.52-.59-1.31 0-2.38 1.09-2.38 2.42s1.07 2.42 2.38 2.42c1.37 0 1.96-.87 2.12-1.46H7.08V9.91h3.95l.01.07c.04.21.05.4.05.61 0 2.35-1.61 4-3.92 4zm6.03-1.71c.33.6.74 1.18 1.19 1.7l-.54.53-.65-2.23zm.77-.76h-.99l-.31-1.04h3.99s-.34 1.31-1.56 2.74c-.52-.62-.89-1.23-1.13-1.7zM21 20c0 .55-.45 1-1 1h-7l2-2-.81-2.77.92-.92L17.79 18l.73-.73-2.71-2.68c.9-1.03 1.6-2.25 1.92-3.51H19v-1.04h-3.64V9h-1.04v1.04h-1.96L11.18 6H20c.55 0 1 .45 1 1v13z"></path></g>
<g id="gavel"><path d="M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z"></path></g>
<g id="gesture"><path d="M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z"></path></g>
<g id="get-app"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="gif"><path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path></g>
<g id="grade"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="group-work"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="help"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></g>
<g id="help-outline"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></g>
<g id="highlight-off"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="history"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="home"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g>
<g id="hourglass-empty"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"></path></g>
<g id="hourglass-full"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"></path></g>
<g id="http"><path d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z"></path></g>
<g id="https"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="important-devices"><path d="M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z"></path></g>
<g id="inbox"><path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path></g>
<g id="indeterminate-check-box"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path></g>
<g id="info"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></g>
<g id="info-outline"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></g>
<g id="input"><path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"></path></g>
<g id="invert-colors"><path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"></path></g>
<g id="label"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path></g>
<g id="label-outline"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></g>
<g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>
<g id="last-page"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path></g>
<g id="launch"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="lightbulb-outline"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></g>
<g id="line-style"><path d="M3 16h5v-2H3v2zm6.5 0h5v-2h-5v2zm6.5 0h5v-2h-5v2zM3 20h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 12h8v-2H3v2zm10 0h8v-2h-8v2zM3 4v4h18V4H3z"></path></g>
<g id="line-weight"><path d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"></path></g>
<g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
<g id="list"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></g>
<g id="lock"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="lock-open"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path></g>
<g id="lock-outline"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></g>
<g id="low-priority"><path d="M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"></path></g>
<g id="loyalty"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77z"></path></g>
<g id="mail"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread-mailbox"><path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path></g>
<g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
<g id="more-horiz"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="more-vert"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="motorcycle"><path d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.15 6.28 17 5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></g>
<g id="move-to-inbox"><path d="M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"></path></g>
<g id="next-week"><path d="M20 7h-4V5c0-.55-.22-1.05-.59-1.41C15.05 3.22 14.55 3 14 3h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm1 13.5l-1-1 3-3-3-3 1-1 4 4-4 4z"></path></g>
<g id="note-add"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"></path></g>
<g id="offline-pin"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"></path></g>
<g id="opacity"><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"></path></g>
<g id="open-in-browser"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"></path></g>
<g id="open-in-new"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="open-with"><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path></g>
<g id="pageview"><path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"></path></g>
<g id="pan-tool"><path d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path></g>
<g id="payment"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="perm-camera-mic"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2.09c-2.83-.48-5-2.94-5-5.91h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.97-2.17 5.43-5 5.91V21h7c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-6 8c0 1.1-.9 2-2 2s-2-.9-2-2V9c0-1.1.9-2 2-2s2 .9 2 2v4z"></path></g>
<g id="perm-contact-calendar"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"></path></g>
<g id="perm-data-setting"><path d="M18.99 11.5c.34 0 .67.03 1 .07L20 0 0 20h11.56c-.04-.33-.07-.66-.07-1 0-4.14 3.36-7.5 7.5-7.5zm3.71 7.99c.02-.16.04-.32.04-.49 0-.17-.01-.33-.04-.49l1.06-.83c.09-.08.12-.21.06-.32l-1-1.73c-.06-.11-.19-.15-.31-.11l-1.24.5c-.26-.2-.54-.37-.85-.49l-.19-1.32c-.01-.12-.12-.21-.24-.21h-2c-.12 0-.23.09-.25.21l-.19 1.32c-.3.13-.59.29-.85.49l-1.24-.5c-.11-.04-.24 0-.31.11l-1 1.73c-.06.11-.04.24.06.32l1.06.83c-.02.16-.03.32-.03.49 0 .17.01.33.03.49l-1.06.83c-.09.08-.12.21-.06.32l1 1.73c.06.11.19.15.31.11l1.24-.5c.26.2.54.37.85.49l.19 1.32c.02.12.12.21.25.21h2c.12 0 .23-.09.25-.21l.19-1.32c.3-.13.59-.29.84-.49l1.25.5c.11.04.24 0 .31-.11l1-1.73c.06-.11.03-.24-.06-.32l-1.07-.83zm-3.71 1.01c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="perm-device-information"><path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></g>
<g id="perm-identity"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></g>
<g id="perm-media"><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path></g>
<g id="perm-phone-msg"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"></path></g>
<g id="perm-scan-wifi"><path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z"></path></g>
<g id="pets"><circle cx="4.5" cy="9.5" r="2.5"></circle><circle cx="9" cy="5.5" r="2.5"></circle><circle cx="15" cy="5.5" r="2.5"></circle><circle cx="19.5" cy="9.5" r="2.5"></circle><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"></path></g>
<g id="picture-in-picture"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"></path></g>
<g id="picture-in-picture-alt"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"></path></g>
<g id="play-for-work"><path d="M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z"></path></g>
<g id="polymer"><path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z"></path></g>
<g id="power-settings-new"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></g>
<g id="pregnant-woman"><path d="M9 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7 9c-.01-1.34-.83-2.51-2-3 0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4z"></path></g>
<g id="print"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></g>
<g id="query-builder"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="question-answer"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path></g>
<g id="radio-button-checked"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="radio-button-unchecked"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="receipt"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path></g>
<g id="record-voice-over"><circle cx="9" cy="9" r="4"></circle><path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z"></path></g>
<g id="redeem"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="redo"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path></g>
<g id="refresh"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></g>
<g id="remove"><path d="M19 13H5v-2h14v2z"></path></g>
<g id="remove-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></g>
<g id="remove-circle-outline"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="remove-shopping-cart"><path d="M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"></path></g>
<g id="reorder"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path></g>
<g id="reply"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="reply-all"><path d="M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="report"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path></g>
<g id="report-problem"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="restore"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="restore-page"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16c-2.05 0-3.81-1.24-4.58-3h1.71c.63.9 1.68 1.5 2.87 1.5 1.93 0 3.5-1.57 3.5-3.5S13.93 9.5 12 9.5c-1.35 0-2.52.78-3.1 1.9l1.6 1.6h-4V9l1.3 1.3C8.69 8.92 10.23 8 12 8c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path></g>
<g id="room"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="rounded-corner"><path d="M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z"></path></g>
<g id="rowing"><path d="M8.5 14.5L4 19l1.5 1.5L9 17h2l-2.5-2.5zM15 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 20.01L18 24l-2.99-3.01V19.5l-7.1-7.09c-.31.05-.61.07-.91.07v-2.16c1.66.03 3.61-.87 4.67-2.04l1.4-1.55c.19-.21.43-.38.69-.5.29-.14.62-.23.96-.23h.03C15.99 6.01 17 7.02 17 8.26v5.75c0 .84-.35 1.61-.92 2.16l-3.58-3.58v-2.27c-.63.52-1.43 1.02-2.29 1.39L16.5 18H18l3 3.01z"></path></g>
<g id="save"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></g>
<g id="schedule"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="search"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>
<g id="select-all"><path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z"></path></g>
<g id="send"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></g>
<g id="settings"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>
<g id="settings-applications"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"></path></g>
<g id="settings-backup-restore"><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></g>
<g id="settings-bluetooth"><path d="M11 24h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm2.71-18.29L12 0h-1v7.59L6.41 3 5 4.41 10.59 10 5 15.59 6.41 17 11 12.41V20h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 3.83l1.88 1.88L13 7.59V3.83zm1.88 10.46L13 16.17v-3.76l1.88 1.88z"></path></g>
<g id="settings-brightness"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z"></path></g>
<g id="settings-cell"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 16H8V4h8v12z"></path></g>
<g id="settings-ethernet"><path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"></path></g>
<g id="settings-input-antenna"><path d="M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm1 9.29c.88-.39 1.5-1.26 1.5-2.29 0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12c0 1.02.62 1.9 1.5 2.29v3.3L7.59 21 9 22.41l3-3 3 3L16.41 21 13 17.59v-3.3zM12 1C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11z"></path></g>
<g id="settings-input-component"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-composite"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-hdmi"><path d="M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z"></path></g>
<g id="settings-input-svideo"><path d="M8 11.5c0-.83-.67-1.5-1.5-1.5S5 10.67 5 11.5 5.67 13 6.5 13 8 12.33 8 11.5zm7-5c0-.83-.67-1.5-1.5-1.5h-3C9.67 5 9 5.67 9 6.5S9.67 8 10.5 8h3c.83 0 1.5-.67 1.5-1.5zM8.5 15c-.83 0-1.5.67-1.5 1.5S7.67 18 8.5 18s1.5-.67 1.5-1.5S9.33 15 8.5 15zM12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.96 0-9-4.04-9-9s4.04-9 9-9 9 4.04 9 9-4.04 9-9 9zm5.5-11c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-2 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path></g>
<g id="settings-overscan"><path d="M12.01 5.5L10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="settings-phone"><path d="M13 9h-2v2h2V9zm4 0h-2v2h2V9zm3 6.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2z"></path></g>
<g id="settings-power"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm2-22h-2v10h2V2zm3.56 2.44l-1.45 1.45C16.84 6.94 18 8.83 18 11c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 4.44C5.36 5.88 4 8.28 4 11c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.72-1.36-5.12-3.44-6.56zM15 24h2v-2h-2v2z"></path></g>
<g id="settings-remote"><path d="M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z"></path></g>
<g id="settings-voice"><path d="M7 24h2v-2H7v2zm5-11c1.66 0 2.99-1.34 2.99-3L15 4c0-1.66-1.34-3-3-3S9 2.34 9 4v6c0 1.66 1.34 3 3 3zm-1 11h2v-2h-2v2zm4 0h2v-2h-2v2zm4-14h-1.7c0 3-2.54 5.1-5.3 5.1S6.7 13 6.7 10H5c0 3.41 2.72 6.23 6 6.72V20h2v-3.28c3.28-.49 6-3.31 6-6.72z"></path></g>
<g id="shop"><path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z"></path></g>
<g id="shop-two"><path d="M3 9H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3V9zm15-4V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3-5.5 4z"></path></g>
<g id="shopping-basket"><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="shopping-cart"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="sort"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></g>
<g id="speaker-notes"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-5v-2h5v2zm3-3h-8V9h8v2zm0-3h-8V6h8v2z"></path></g>
<g id="speaker-notes-off"><path d="M10.54 11l-.54-.54L7.54 8 6 6.46 2.38 2.84 1.27 1.73 0 3l2.01 2.01L2 22l4-4h9l5.73 5.73L22 22.46 17.54 18l-7-7zM8 14H6v-2h2v2zm-2-3V9l2 2H6zm14-9H4.08L10 7.92V6h8v2h-7.92l1 1H18v2h-4.92l6.99 6.99C21.14 17.95 22 17.08 22 16V4c0-1.1-.9-2-2-2z"></path></g>
<g id="spellcheck"><path d="M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z"></path></g>
<g id="star"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="star-border"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="star-half"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="stars"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path></g>
<g id="store"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></g>
<g id="subdirectory-arrow-left"><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z"></path></g>
<g id="subdirectory-arrow-right"><path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path></g>
<g id="subject"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></g>
<g id="supervisor-account"><path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"></path></g>
<g id="swap-horiz"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></g>
<g id="swap-vert"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></g>
<g id="swap-vertical-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"></path></g>
<g id="system-update-alt"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"></path></g>
<g id="tab"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"></path></g>
<g id="tab-unselected"><path d="M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8v6h10V5c0-1.1-.9-2-2-2zm0 14h2v-2h-2v2zM9 5h2V3H9v2zM5 21h2v-2H5v2zM5 5h2V3H5v2zm16 16c1.1 0 2-.9 2-2h-2v2zm0-8h2v-2h-2v2zm-8 8h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>
<g id="text-format"><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g>
<g id="theaters"><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></g>
<g id="thumb-down"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></g>
<g id="thumb-up"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></g>
<g id="thumbs-up-down"><path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z"></path></g>
<g id="timeline"><path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"></path></g>
<g id="toc"><path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path></g>
<g id="today"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></g>
<g id="toll"><path d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65z"></path></g>
<g id="touch-app"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"></path></g>
<g id="track-changes"><path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z"></path></g>
<g id="translate"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></g>
<g id="trending-down"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"></path></g>
<g id="trending-flat"><path d="M22 12l-4-4v3H3v2h15v3z"></path></g>
<g id="trending-up"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></g>
<g id="turned-in"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="turned-in-not"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="unarchive"><path d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"></path></g>
<g id="undo"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></g>
<g id="unfold-less"><path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"></path></g>
<g id="unfold-more"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path></g>
<g id="update"><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"></path></g>
<g id="verified-user"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="view-agenda"><path d="M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"></path></g>
<g id="view-array"><path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"></path></g>
<g id="view-carousel"><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"></path></g>
<g id="view-column"><path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></g>
<g id="view-day"><path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z"></path></g>
<g id="view-headline"><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"></path></g>
<g id="view-list"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></g>
<g id="view-module"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"></path></g>
<g id="view-quilt"><path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"></path></g>
<g id="view-stream"><path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"></path></g>
<g id="view-week"><path d="M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"></path></g>
<g id="visibility"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>
<g id="visibility-off"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></g>
<g id="warning"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="watch-later"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"></path></g>
<g id="weekend"><path d="M21 10c-1.1 0-2 .9-2 2v3H5v-3c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm-3-5H6c-1.1 0-2 .9-2 2v2.15c1.16.41 2 1.51 2 2.82V14h12v-2.03c0-1.3.84-2.4 2-2.82V7c0-1.1-.9-2-2-2z"></path></g>
<g id="work"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></g>
<g id="youtube-searched-for"><path d="M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z"></path></g>
<g id="zoom-in"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></g>
<g id="zoom-out"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(wr.content);window.customElements.define("arc-interactive-demo",class extends ce{static get styles(){return le`
    :host {
      display: flex;
      flex-direction: row;
      border: 1px var(--arc-interactive-demo-border-color, #e5e5e5) solid;
      border-radius: 4px;
      min-height: 300px;
      margin: 40px 0;
      transition: box-shadow 0.23s cubic-bezier(0.4, 0, 0.2, 1);
      --paper-tabs-selection-bar-color: var(--arc-interactive-demo-tab-selection-color, #2196f3);
    }

    :host(:hover) {
      box-shadow: 0 0 8px 0 rgba(0,0,0,.08),
                  0 0 15px 0 rgba(0,0,0,.02),
                  0 0 20px 4px rgba(0,0,0,.06);
    }

    .demo-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .demo-config {
      width: 0px;
      overflow: hidden;
      box-sizing: border-box;
      transition: width 0.12s ease-in-out;
    }

    .demo-config.opened {
      width: var(--arc-interactive-demo-config-width, 160px);
      overflow: auto;
      border-left: 1px var(--arc-interactive-demo-border-color, #e5e5e5) solid;
    }

    .content-selector {
      display: flex;
      align-items: center;
      flex-direction: row;
      border-bottom: 1px var(--arc-interactive-demo-border-color, #e5e5e5) solid;
      height: 48px;
    }

    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    .content ::slotted([hidden]) {
      display: none !important;
    }

    paper-tabs {
      margin: 0 12px;
      flex: 1;
    }

    paper-tab {
      flex: none;
      color: var(--arc-interactive-demo-options-color, #757575);
    }

    .config-title {
      display: flex;
      align-items: center;
      flex-direction: row;
      border-bottom: 1px var(--arc-interactive-demo-border-color, #e5e5e5) solid;
      padding-left: 12px;
      color: var(--arc-interactive-demo-options-color, #757575);
      height: 48px;
    }

    .config-title h3 {
      flex: 1;
      font-size: .875rem;
      line-height: 1.25rem;
      font-weight: 400;
    }

    .options {
      padding-left: 12px;
    }

    .options ::slotted(label) {
      font-size: .875rem;
      line-height: 1.25rem;
      font-weight: 400;
      color: var(--arc-interactive-demo-options-color, #757575);
      display: block;
      padding: 12px 8px 4px 0px;
    }

    :host([dark]) paper-tab {
      color: var(--arc-interactive-demo-header-color, #EEEEEE);
    }

    :host([dark]) .config-title {
      color: var(--arc-interactive-demo-header-color, #EEEEEE);
    }
    `}static get properties(){return{opened:{type:Boolean},states:{type:Array},selectedState:{type:Number},dark:{type:Boolean,reflect:!0}}}get tabs(){return this.shadowRoot.querySelector("paper-tabs")}get selectedState(){return this._selectedState}set selectedState(e){const t=this._selectedState;t!==e&&(this._selectedState=e,this.requestUpdate("selectedState",t),this.dispatchEvent(new CustomEvent("state-chanegd",{detail:{value:e,state:this.states[e]}})))}get opened(){return this._opened}set opened(e){const t=this._opened;t!==e&&(this._opened=e,this.requestUpdate("opened",t),this._updateTabsAnimation(),this._updateOptionsTabindex())}constructor(){super(),this.opened=!1,this.states=[],this.selectedState=0}firstUpdated(){this._updateOptionsTabindex()}_stateChangeHandler(e){this.selectedState=e.detail.value}_toggleOptions(){this.opened=!this.opened}_updateTabsAnimation(){this._updateTabsTimer&&clearTimeout(this._updateTabsTimer),this._updateTabsTimer=setTimeout(()=>{this._updateTabsTimer=void 0,this.tabs.notifyResize()},120)}_updateOptionsTabindex(){const e=this.shadowRoot.querySelector('slot[name="options"]');if(!e)return;const t=e.assignedNodes(),i=this.opened;for(let e=0,n=t.length;e<n;e++){const n=t[e];n.nodeType===Node.ELEMENT_NODE&&(i?this._activateOptionNode(n):this._deactivateOptionNode(n))}}_activateOptionNode(e){const t=e.dataset.oldTabindex;t&&(e.setAttribute("tabindex",t),e.setAttribute("aria-hidden","false"),delete e.dataset.oldTabindex)}_deactivateOptionNode(e){const t=e.getAttribute("tabindex");t&&(e.dataset.oldTabindex=t,e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true"))}render(){const{states:e,selectedState:t,opened:i}=this;return V`
    <div class="demo-content">
      <div class="content-selector">
        <paper-tabs
          .selected="${t}"
          @selected-changed="${this._stateChangeHandler}"
          aria-label="Element state selection">
          ${e.map(e=>V`
            <paper-tab aria-label="Activate to enable state ${e}" aria-controls="stateContent">${e}</paper-tab>
          `)}
        </paper-tabs>
        <paper-button
          ?hidden=${i}
          @click="${this._toggleOptions}"
          tabindex="${i?"-1":"0"}"
          aria-label="Toggle configuration options"
          aria-controls="cnfPanel">Options</paper-button>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>

    <div id="cnfPanel" class="demo-config ${i?"opened":""}" aria-hidden="${i?"false":"true"}">
      <div class="config-title">
        <h3>Configuration</h3>
        <paper-icon-button
          title="Close panel"
          icon="close"
          aria-label="Close configuration panel"
          tabindex="${i?"0":"-1"}"
          @click="${this._toggleOptions}"></paper-icon-button>
      </div>
      <div class="options">
        <slot name="options"></slot>
      </div>
    </div>
    `}});
/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
let Cr=null;const zr=e=>(class extends e{static get properties(){return{validator:{type:String},validationStates:{type:Array},invalid:{reflect:!0,type:Boolean},validatorType:{type:String}}}get _validator(){if(!Cr)return null;const e=this.validator;if(!e)return null;const t=e.split(" ");if(0===t.length)return null;const i=[];return t.forEach(e=>{const t=Cr.byKey(e);t&&i.push(t)}),i}get invalid(){return this._invalid}set invalid(e){this._sop("invalid",e)&&(this._invalidChanged(e),this._notifyChanged("invalid",e))}get validationStates(){return this._validationStates}set validationStates(e){this._sop("validationStates",e)&&this._notifyChanged("validation-states",e)}get oninvalid(){return this._oninvalid}set oninvalid(e){this._oninvalid&&this.removeEventListener("invalid-changed",this._oninvalid),"function"==typeof e?(this._oninvalid=e,this.addEventListener("invalid-changed",e)):this._oninvalid=null}constructor(){super(),Cr=new Vo({type:"validator"}),this.validatorType="validator",this.invalid=!1}_sop(e,t){const i=`_${e}`,n=this[i];return n!==t&&(this[i]=t,this.requestUpdate&&this.requestUpdate(e,n),!0)}_notifyChanged(e,t){this.dispatchEvent(new CustomEvent(e+"-changed",{composed:!0,detail:{value:t}}))}_invalidChanged(e){e?this.setAttribute("aria-invalid","true"):this.removeAttribute("aria-invalid")}hasValidator(){const e=this._validator;return!(!e||!e.length)}validate(e){const t=this._getValidity(e);return this.invalid=!t,t}_getValidity(e){if(this.hasValidator()){let t=!0;const i=[];return this._validator.forEach(n=>{const s={validator:n.nodeName&&n.nodeName.toLowerCase(),message:n.message};n.validate(e)?s.valid=!0:(t=!1,s.valid=!1),i.push(s)}),this.validationStates=i,t}return!0}}),Sr=Rt(e=>{class t extends(zr(e)){static get properties(){return{checked:{type:Boolean,reflect:!0},toggles:{type:Boolean},name:{type:String},value:{type:String},required:{type:Boolean},disabled:{type:Boolean,reflect:!0}}}constructor(){super(),this.value="on"}get required(){return this._required||!1}set required(e){this._setChanged("required",e)&&this._requiredChanged(e)}get value(){return this._value||!1}set value(e){this._setChanged("value",e)&&this._valueChanged(e)}get checked(){return this._checked||!1}set checked(e){this._setChanged("checked",e)&&this._checkedChanged(e)}_setChanged(e,t){const i=`_${e}`,n=this[i];return t!==n&&(this[i]=t,this.requestUpdate&&this.requestUpdate(e,n),!0)}_getValidity(){return this.disabled||!this.required||this.checked}_requiredChanged(e){e?this.setAttribute("aria-required","true"):this.removeAttribute("aria-required")}_checkedChanged(e){this.active=e,this.dispatchEvent(new CustomEvent("change")),this.dispatchEvent(new CustomEvent("iron-change")),this.dispatchEvent(new CustomEvent("checked-changed",{composed:!0,detail:{value:e}}))}_valueChanged(e){null==e&&(this.value="on")}}return t}),xr=le`
  html {
    --anypoint-color-primary: #00a2df;
    --anypoint-color-secondary: #506773;
    --anypoint-color-danger: #d1344e;
    --anypoint-color-success: #17bc65;
    --anypoint-color-tertiary: #ffffff;

    --anypoint-color-coreBlue1: #abe2f5;
    --anypoint-color-coreBlue2: #48c1ed;
    --anypoint-color-coreBlue3: #00a2df;
    --anypoint-color-coreBlue4: #087299;
    --anypoint-color-coreBlue5: #114459;

    --anypoint-color-robustBlue1: #a1b1b8;
    --anypoint-color-robustBlue2: #6b8a99;
    --anypoint-color-robustBlue3: #506773;
    --anypoint-color-robustBlue4: #32444d;
    --anypoint-color-robustBlue5: #272f33;

    --anypoint-color-futureGreen1: #aaf2cb;
    --anypoint-color-futureGreen2: #33cc7a;
    --anypoint-color-futureGreen3: #17bc65;
    --anypoint-color-futureGreen4: #0e8c48;
    --anypoint-color-futureGreen5: #174d30;

    --anypoint-color-aluminum1: #f9fafb;
    --anypoint-color-aluminum2: #f4f5f6;
    --anypoint-color-aluminum3: #e8e9ea;
    --anypoint-color-aluminum4: #cacbcc;
    --anypoint-color-aluminum5: #989a9b;

    --anypoint-color-steel1: #6b6c6d;
    --anypoint-color-steel2: #58595a;
    --anypoint-color-steel3: #3a3b3c;
    --anypoint-color-steel4: #262728;
    --anypoint-color-steel5: #121314;

    --anypoint-color-yellow3: #f2be24;
    --anypoint-color-viridian3: #00b49d;
    --anypoint-color-teal3: #00b5d1;
    --anypoint-color-navy3: #178bea;
    --anypoint-color-indigo3: #5e66f9;
    --anypoint-color-violet3: #9a63f9;
    --anypoint-color-red3: #d1344e;
  }
`;try{document.adoptedStyleSheets=document.adoptedStyleSheets.concat(xr.styleSheet)}catch(e){{const e=document.createElement("style");e.type="text/css",e.innerHTML=xr.cssText,document.getElementsByTagName("head")[0].appendChild(e)}}class kr extends(Sr(ce)){static get styles(){return le`
    :host {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      line-height: 0;
      white-space: nowrap;
      cursor: pointer;
      vertical-align: middle;
    }

    :host(:focus) {
      outline: none;
    }

    :host([disabled]) {
      cursor: auto;
      pointer-events: none;
      color: var(--anypoint-radio-button-disabled-color, #a8a8a8);
    }

    .radio-container {
      display: inline-block;
      position: relative;
      vertical-align: middle;
      position: relative;
      vertical-align: middle;
      width: 16px;
      height: 16px;
      padding: 8px;
    }

    .radio-container:before {
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;
      opacity: 0.04;
      background-color: var(--anypoint-radio-button-checked-color, var(--anypoint-color-primary));
      pointer-events: none;
      content: "";
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      transition: transform ease 0.18s;
      will-change: transform;
    }

    .radio-container:hover:before,
    :host(:focus) .radio-container:before {
      transform: scale(1);
    }

    :host(:focus) .radio-container:before {
      opacity: 0.08;
    }

    .state-container {
      width: 16px;
      height: 16px;
      position: relative;
    }

    #offRadio, #onRadio {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      display: block;
      border-width: 1px;
      border-color: transparent;
      border-style: solid;
      position: absolute;
    }

    #offRadio {
      border-color: var(--anypoint-radio-button-unchecked-color, var(--anypoint-color-aluminum5));
      background-color: var(--anypoint-radio-button-unchecked-background-color, transparent);
      transition: background-color 0.28s, border-color 0.28s;
    }

    :host(:hover) #offRadio {
      border-color: var(--anypoint-radio-button-hover-unchecked-color, var(--anypoint-color-coreBlue2));
    }

    :host(:active) #offRadio,
    :host(:focus) #offRadio {
      border-color: var(--anypoint-radio-button-active-unchecked-color, var(--anypoint-color-coreBlue3));
    }

    :host([checked]) #offRadio {
      border-color: var(--anypoint-radio-button-checked-color, var(--anypoint-color-coreBlue3));
      background-color: var(--anypoint-radio-button-checked-color, var(--anypoint-color-coreBlue3));
    }

    :host([disabled]) #offRadio {
      border-color: var(--anypoint-radio-button-unchecked-color, var(--anypoint-color-steel1));
      opacity: 0.65;
    }

    :host([disabled][checked]) #offRadio {
      background-color: var(--anypoint-radio-button-checked-color, var(--anypoint-color-steel1));
    }

    #onRadio {
      background-color: var(--anypoint-radio-button-checked-inner-background-color, #fff);
      -webkit-transform: scale(0);
      transform: scale(0);
      transition: -webkit-transform ease 0.28s;
      transition: transform ease 0.28s;
      will-change: transform;
    }

    :host([checked]) #onRadio {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }

    .radioLabel {
      line-height: normal;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      white-space: normal;
      color: var(--anypoint-radio-button-label-color, var(--primary-text-color));
    }

    :host-context([dir="rtl"]) .radioLabel {
      margin-left: 8px;
    }

    :host([disabled]) .radioLabel {
      pointer-events: none;
      color: var(--anypoint-radio-button-disabled-color, #a8a8a8);
    }
    `}render(){return V`
      <div class="radio-container">
        <div class="state-container">
          <div id="offRadio"></div>
          <div id="onRadio"></div>
        </div>
      </div>
      <label class="radioLabel"><slot></slot></label>`}get checked(){return this._checked||!1}set checked(e){this._setChanged("checked",e)&&(this._updateCheckedAria(e),this._checkedChanged(e))}get disabled(){return this._disabled}set disabled(e){this._setChanged("disabled",e)&&this._disabledChanged(e)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","radio"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),void 0===this.checked?this.checked=!1:this._updateCheckedAria(this.checked),this.addEventListener("keydown",this._keyDownHandler),this.addEventListener("click",this._clickHandler)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.addEventListener("keydown",this._keyDownHandler),this.addEventListener("click",this._clickHandler)}_updateCheckedAria(e){void 0===e&&(e=!1),this.setAttribute("aria-checked",String(e))}_keyDownHandler(e){"Enter"===e.code||"NumpadEnter"===e.code||13===e.keyCode?(this._clickHandler(e),this._asyncClick()):"Space"!==e.code&&32!==e.keyCode||(this._clickHandler(e),this._asyncClick(),e.preventDefault())}_clickHandler(){this.disabled||(this.checked=!0)}_asyncClick(){this.disabled||setTimeout(()=>this.click(),1)}_disabledChanged(e){this.setAttribute("aria-disabled",e?"true":"false"),e?(this._oldTabIndex=this.getAttribute("tabindex"),this.focused=!1,this.setAttribute("tabindex","-1"),this.blur()):void 0!==this._oldTabIndex&&(null===this._oldTabIndex?this.removeAttribute("tabindex"):this.setAttribute("tabindex",this._oldTabIndex))}}window.customElements.define("anypoint-radio-button",kr);class Er{constructor(e){this.multi=!1,this.selection=[],this.selectCallback=e}get(){return this.multi?this.selection.slice():this.selection[0]}clear(e){this.selection.slice().forEach((function(t){(!e||e.indexOf(t)<0)&&this.setItemSelected(t,!1)}),this)}isSelected(e){return this.selection.indexOf(e)>=0}setItemSelected(e,t){if(null!==e&&t!==this.isSelected(e)){if(t)this.selection.push(e);else{const t=this.selection.indexOf(e);t>=0&&this.selection.splice(t,1)}this.selectCallback&&this.selectCallback(e,t)}}select(e){this.multi?this.toggle(e):this.get()!==e&&(this.setItemSelected(this.get(),!1),this.setItemSelected(e,!0))}toggle(e){this.setItemSelected(e,!this.isSelected(e))}}const Hr={template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1},Tr=Element.prototype,Mr=Tr.matches||Tr.matchesSelector||Tr.mozMatchesSelector||Tr.msMatchesSelector||Tr.oMatchesSelector||Tr.webkitMatchesSelector,Ar=function(e,t){return Mr.call(e,t)},Lr=e=>(class extends e{static get properties(){return{attrForSelected:{type:String},selected:{},_selectedItem:{type:Object},activateEvent:{type:String},selectable:{type:String},selectedClass:{type:String},selectedAttribute:{type:String},fallbackSelection:{},items:{type:Array}}}get attrForSelected(){return this._attrForSelected}set attrForSelected(e){this._attrForSelected!==e&&(this._attrForSelected=e,this._updateAttrForSelected())}get selected(){return this._selected}set selected(e){this._selected!==e&&(this._selected=e,this.requestUpdate&&this.requestUpdate("selected",e),this._updateSelected(e),this.dispatchEvent(new CustomEvent("selected-changed",{detail:{value:e}})))}get items(){return this._items}get _items(){return this.__items}set _items(e){this.__items!==e&&(this.__items=e,this.requestUpdate&&this.requestUpdate("_items",e),this.dispatchEvent(new CustomEvent("items-changed",{detail:{value:e}})))}get selectedItem(){return this._selectedItem}get _selectedItem(){return this.__selectedItem}set _selectedItem(e){this.__selectedItem!==e&&(this.__selectedItem=e,this.requestUpdate&&this.requestUpdate("_selectedItem",e),this.dispatchEvent(new CustomEvent("selecteditem-changed",{detail:{value:e}})))}get activateEvent(){return this._activateEvent}set activateEvent(e){const t=this._activateEvent;t!==e&&(this._activateEvent=e,this._activateEventChanged(e,t))}get fallbackSelection(){return this._fallbackSelection}set fallbackSelection(e){this._fallbackSelection!==e&&(this._fallbackSelection=e,this._checkFallback(e))}get onselectedchanged(){return this["_onselected-changed"]}set onselectedchanged(e){this._registerCallback("selected-changed",e)}get onselecteditemchanged(){return this["_onselecteditem-changed"]}set onselecteditemchanged(e){this._registerCallback("selecteditem-changed",e)}get onitemschanged(){return this["_onitems-changed"]}set onitemschanged(e){this._registerCallback("items-changed",e)}get onselect(){return this._onselect}set onselect(e){this._registerCallback("select",e)}get ondeselect(){return this._ondeselect}set ondeselect(e){this._registerCallback("deselect",e)}get onactivate(){return this._onactivate}set onactivate(e){this._registerCallback("activate",e)}constructor(){super(),this.attrForSelected=null,this.fallbackSelection=null,this.selectedAttribute=null,this.selectedClass="selected",this.activateEvent="click",this._items=[],this._filterItem=this._filterItem.bind(this),this._activateHandler=this._activateHandler.bind(this),this._selection=new Er(this._applySelection.bind(this)),this._mutationHandler=this._mutationHandler.bind(this),this._slotchangeHandler=this._slotchangeHandler.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._observer=this._observeItems(this),this._observeSlotItems(),this._updateItems(),this._updateSelected()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this._observer&&(this._observer.disconnect(),this._observer=null),this._removeListener(this.activateEvent),this._unobserveSlotItems()}_registerCallback(e,t){const i=`_on${e}`;this[i]&&this.removeEventListener(e,this[i]),"function"==typeof t?(this[i]=t,this.addEventListener(e,t)):this[i]=null}_addListener(e){this.addEventListener(e,this._activateHandler)}_removeListener(e){this.removeEventListener(e,this._activateHandler)}_observeItems(){const e=new MutationObserver(this._mutationHandler);return e.observe(this,{attributes:!0,childList:!0,subtree:!1}),e}_observeSlotItems(){const e=this.querySelectorAll("slot");for(let t=0,i=e.length;t<i;t++)e[t].addEventListener("slotchange",this._slotchangeHandler)}_unobserveSlotItems(){const e=this.querySelectorAll("slot");for(let t=0,i=e.length;t<i;t++)e[t].removeEventListener("slotchange",this._slotchangeHandler)}_checkRemovedSlot(e){for(let t=0,i=e.length;t<i;t++)"slot"===e[t].localName&&e[t].removeEventListener("slotchange",this._slotchangeHandler)}_slotchangeHandler(){this._updateItems(),this._updateSelected()}_mutationHandler(e){this._updateItems(),this._updateSelected();for(const t of e)"childList"===t.type&&this._checkRemovedSlot(t.removedNodes);const t={bubbles:!0,composed:!0,detail:e};this.dispatchEvent(new CustomEvent("children-changed",t)),this.dispatchEvent(new CustomEvent("iron-items-changed",t))}indexOf(e){return this.items?this.items.indexOf(e):-1}select(e){this.selected=e}selectPrevious(){const e=this.items.length;let t=e-1;void 0!==this.selected&&(t=(Number(this._valueToIndex(this.selected))-1+e)%e),this.selected=this._indexToValue(t)}selectNext(){let e=0;void 0!==this.selected&&(e=(Number(this._valueToIndex(this.selected))+1)%this.items.length),this.selected=this._indexToValue(e)}selectIndex(e){this.select(this._indexToValue(e))}_checkFallback(){this._updateSelected()}_activateEventChanged(e,t){this._removeListener(t),this._addListener(e)}_updateItems(){let e=this._queryDistributedElements(this.selectable||"*");e=e.filter(this._filterItem),this._items=e}_queryDistributedElements(e){const t=Array.from(this.children);for(let e=0;e<t.length;e++){const i=t[e];if("slot"===i.localName){const n=i.assignedNodes({flatten:!0});t.splice(e,1,...n)}}for(let i=t.length-1;i>=0;i--){const n=t[i];n.nodeType===Node.ELEMENT_NODE&&Ar(n,e)||t.splice(i,1)}return t}_updateAttrForSelected(){this.selectedItem&&(this.selected=this._valueForItem(this.selectedItem))}_updateSelected(){this._selectSelected(this.selected)}_selectSelected(e){if(!this.items)return;const t=this._valueToItem(e);t?this._selection.select(t):this._selection.clear(),this.fallbackSelection&&this.items.length&&void 0===this._selection.get()&&(this.selected=this.fallbackSelection)}_filterItem(e){return!Hr[e.localName]}_valueToItem(e){return null===e?null:this.items[this._valueToIndex(e)]}_valueToIndex(e){if(!this.attrForSelected)return Number(e);for(let t=0,i=this.items.length;t<i;t++){const i=this.items[t];if(this._valueForItem(i)===e)return t}}_indexToValue(e){if(!this.attrForSelected)return e;{const t=this.items[e];if(t)return this._valueForItem(t)}}_valueForItem(e){if(!e)return null;if(!this.attrForSelected){const t=this.indexOf(e);return-1===t?null:t}const t=this.attrForSelected,i=e[t.indexOf("-")<0?t:t.replace(/-[a-z]/g,e=>e[1].toUpperCase())];return void 0!==i?i:e.getAttribute(this.attrForSelected)}_applySelection(e,t){this.selectedClass&&this.toggleClass(this.selectedClass,t,e),this.selectedAttribute&&(t?e.setAttribute(this.selectedAttribute,""):e.removeAttribute(this.selectedAttribute)),this._selectionChange();const i={bubbles:!0,composed:!0,detail:{item:e}},n=t?"select":"deselect";this.dispatchEvent(new CustomEvent(n,i)),this.dispatchEvent(new CustomEvent(`iron-${n}`,i))}toggleClass(e,t,i){t?i.classList.add(e):i.classList.remove(e)}_selectionChange(){this._selectedItem=this._selection.get()}_activateHandler(e){let t=e.target;const i=this.items;for(;t&&t!==this;){const e=i.indexOf(t);if(e>=0){const i=this._indexToValue(e);return void this._itemActivate(i,t)}t=t.parentNode}}_itemActivate(e,t){const i={cancelable:!0,bubbles:!0,composed:!0,detail:{selected:e,item:t}};let n=new CustomEvent("activate",i);this.dispatchEvent(n),n.defaultPrevented||(n=new CustomEvent("iron-activate",i),this.dispatchEvent(n),n.defaultPrevented||this.select(e))}}),Ir=e=>(class extends(Lr(e)){static get properties(){return{multi:{type:Boolean},selectedValues:{type:Array},_selectedItems:{type:Array}}}get multi(){return this._multi}set multi(e){this._multi!==e&&(this._multi=e,this.multiChanged(e))}get selectedValues(){return this._selectedValues}set selectedValues(e){this._selectedValues!==e&&(this._selectedValues=e,this._updateSelected(),this.dispatchEvent(new CustomEvent("selectedvalues-changed",{detail:{value:e}})))}get selectedItems(){return this._selectedItems}get _selectedItems(){return this.__selectedItems}set _selectedItems(e){this.__selectedItems!==e&&(this.__selectedItems=e,this.dispatchEvent(new CustomEvent("selecteditems-changed",{detail:{value:e}})))}get onselectedvalueschanged(){return this["_onselectedvalues-changed"]}set onselectedvalueschanged(e){this._registerCallback("selectedvalues-changed",e)}get onselecteditemschanged(){return this["_onselecteditems-changed"]}set onselecteditemschanged(e){this._registerCallback("selecteditems-changed",e)}constructor(){super(),this.multi=!1,this._selectedValues=[],this._selectedItems=[]}select(e){this.multi?this._toggleSelected(e):this.selected=e}multiChanged(e){this._selection.multi=e,this._updateSelected()}_updateAttrForSelected(){this.multi?this.selectedItems&&this.selectedItems.length>0&&(this.selectedValues=this.selectedItems.map(e=>this._indexToValue(this.indexOf(e))).filter(e=>null!==e)):super._updateAttrForSelected()}_updateSelected(){this.multi?this._selectMulti(this.selectedValues):this._selectSelected(this.selected)}_selectMulti(e){e=e||[];const t=(this._valuesToItems(e)||[]).filter(e=>null!=e);this._selection.clear(t);for(let e=0;e<t.length;e++)this._selection.setItemSelected(t[e],!0);if(this.fallbackSelection&&!this._selection.get().length){this._valueToItem(this.fallbackSelection)&&this.select(this.fallbackSelection)}}_selectionChange(){const e=this._selection.get();this.multi?(this._selectedItems=e,this._selectedItem=e.length?e[0]:null):null!=e?(this._selectedItems=[e],this._selectedItem=e):(this._selectedItems=[],this._selectedItem=null)}_toggleSelected(e){const t=this.selectedValues.indexOf(e),i=t<0,n=this.selectedValues;i?n.push(e):n.splice(t,1),this.selectedValues=[...n]}_valuesToItems(e){return null===e?null:e.map(e=>this._valueToItem(e))}}),Pr=["Alt","AltGraph","CapsLock","Control","Fn","FnLock","Hyper","Meta","NumLock","OS","ScrollLock","Shift","Super","Symbol","SymbolLock"],Or=e=>(class extends(Ir(e)){static get properties(){return{_focusedItem:{type:Object},attrForItemTitle:{type:String},disabled:{type:Boolean},_previousTabIndex:{type:Number},useAriaSelected:{type:Boolean}}}get focusedItem(){return this._focusedItem}get _focusedItem(){return this.__focusedItem}set _focusedItem(e){const t=this.__focusedItem;t!==e&&(this.__focusedItem=e,this._focusedItemChanged(e,t))}get disabled(){return this._disabled}set disabled(e){this._disabled!==e&&(this._disabled=e,this.requestUpdate&&this.requestUpdate("disabled",e),this._disabledChanged(e))}constructor(){super(),this._previousTabIndex=0,this._onFocus=this._onFocus.bind(this),this._onKeydown=this._onKeydown.bind(this),this._onItemsChanged=this._onItemsChanged.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","menu"),this.addEventListener("focus",this._onFocus),this.addEventListener("keydown",this._onKeydown),this.addEventListener("children-changed",this._onItemsChanged),void 0===this._disabled&&(this.disabled=!1),this._resetTabindices()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("focus",this._onFocus),this.removeEventListener("keydown",this._onKeydown),this.removeEventListener("children-changed",this._onItemsChanged)}multiChanged(e){super.multiChanged(e),e?this.setAttribute("aria-multiselectable","true"):this.removeAttribute("aria-multiselectable")}_onItemsChanged(e){const t=e.detail;for(const e of t)"childList"===e.type&&e.addedNodes.length&&this._resetTabindices()}_onKeydown(e){"ArrowDown"===e.key?this._onDownKey(e):"ArrowUp"===e.key?this._onUpKey(e):"Tab"===e.key&&e.shiftKey?this._onShiftTabDown(e):"Escape"===e.key?this._onEscKey(e):this._focusWithKeyboardEvent(e),e.stopPropagation()}_onUpKey(e){this._focusPrevious(),e.preventDefault()}_onDownKey(e){e.preventDefault(),e.stopPropagation(),this._focusNext()}_onEscKey(){const e=this.focusedItem;e&&e.blur()}_focusWithKeyboardEvent(e){if(-1!==Pr.indexOf(e.key))return;this._clearSearchTextDebouncer&&(clearTimeout(this._clearSearchTextDebouncer),this._clearSearchTextDebouncer=void 0);let t=this._searchText||"";const i=(t+=(e.key&&1===e.key.length?e.key:String.fromCharCode(e.keyCode)).toLocaleLowerCase()).length;for(let e=0,n=this.items.length;e<n;e++){const n=this.items[e];if(n.hasAttribute("disabled"))continue;const s=this.attrForItemTitle||"textContent",o=(n[s]||n.getAttribute(s)||"").trim();if(!(o.length<i)&&o.slice(0,i).toLocaleLowerCase()===t){this._focusedItem=n;break}}this._searchText=t,this._clearSearchTextDebouncer=setTimeout(()=>this._clearSearchText(),1e3)}_clearSearchText(){this._searchText=""}_resetTabindices(){const e=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem,t=this.useAriaSelected;this.items.forEach(i=>{i.setAttribute("tabindex",i===e?"0":"-1"),t&&i.setAttribute("aria-selected",this._selection.isSelected(i))})}select(e){const t=this._valueToItem(e);t&&t.hasAttribute("disabled")||(this._focusedItem=t,super.select(e))}_focusPrevious(){const e=this.items.length,t=Number(this.indexOf(this.focusedItem));for(let i=1;i<e+1;i++){const n=this.items[(t-i+e)%e];if(!n.hasAttribute("disabled")){const e=n.getRootNode&&n.getRootNode()||document;if(this._focusedItem=n,e.activeElement===n)return}}}_focusNext(){const e=this.items.length,t=Number(this.indexOf(this.focusedItem));for(let i=1;i<e+1;i++){const n=this.items[(t+i)%e];if(!n.hasAttribute("disabled")){const e=n.getRootNode&&n.getRootNode()||document;if(this._focusedItem=n,e.activeElement===n)return}}}_applySelection(e,t){this.useAriaSelected&&(t?e.setAttribute("aria-selected","true"):e.setAttribute("aria-selected","false")),super._applySelection(e,t)}_focusedItemChanged(e,t){t&&t.setAttribute("tabindex","-1"),!e||e.hasAttribute("disabled")||this.disabled||(e.setAttribute("tabindex","0"),e.focus())}_onShiftTabDown(){const e=this.getAttribute("tabindex");this._shiftTabPressed=!0,this._focusedItem=null,this.setAttribute("tabindex","-1"),setTimeout(()=>{this.setAttribute("tabindex",e),this._shiftTabPressed=!1},1)}_onFocus(e){if(this._shiftTabPressed)return;let t=e.composedPath&&e.composedPath();t||(t=e.path);const i=t[0];if(i!==this&&void 0!==i.tabIndex&&!this.contains(i))return;const n=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this._focusedItem=null,n?this._focusedItem=n:this.items.length&&this._focusNext()}_activateHandler(e){super._activateHandler(e),e.stopPropagation()}_disabledChanged(e){e?(this._previousTabIndex=this.hasAttribute("tabindex")?this.tabIndex:0,this.removeAttribute("tabindex")):this.hasAttribute("tabindex")||this.setAttribute("tabindex",this._previousTabIndex)}});class Nr extends(Or(ce)){createRenderRoot(){return this}get elements(){return this.querySelectorAll('[role="radio"], input[type="radio"]')}constructor(){super(),this.multi=!1}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.style.display="inline-block",this.style.verticalAlign="middle",this.setAttribute("role","radiogroup"),this.selectable="[role=radio],input[type=radio]",this._ensureSingleSelection(),this.disabled&&this._disabledChanged(this.disabled)}_processNodeAttributeChange(e){if("role"!==e.attributeName)return;const t=e.target;t!==this&&("radio"===t.getAttribute("role")?this._processAddedNodes([t]):this._nodeRemoved(t))}_isRadioButton(e){return"radio"===e.getAttribute("role")||"input"===e.localName&&"radio"===e.type}_processAddedNodes(e){for(let t=0,i=e.length;t<i;t++){const i=e[t];i!==this&&this._isRadioButton(i)&&i.setAttribute("tabindex","-1")}}_processRemovedNodes(e){for(let t=0,i=e.length;t<i;t++){const i=e[t];i!==this&&this._isRadioButton(i)&&this._nodeRemoved(i)}}_nodeRemoved(e){const{selected:t}=this;!t&&0!==t||this._valueForItem(e)!==t||(this.selected=void 0)}_onKeydown(e){"ArrowRight"===e.key?(this._onDownKey(e),e.stopPropagation()):"ArrowLeft"===e.key?(this._onUpKey(e),e.stopPropagation()):super._onKeydown(e)}_applySelection(e,t){super._applySelection(e,t),e.checked=t}_ensureSingleSelection(){const e=this._items;let t=!1;for(let i=e.length-1;i>=0;i--){const n=e[i].checked;if(n&&!t)if(t=!0,this.attrForSelected){const t=this._valueForItem(e[i]);this.select(t)}else this.select(i);else n&&t&&this._applySelection(e[i],!1)}}_mutationHandler(e){for(const t of e)"attributes"===t.type?this._processNodeAttributeChange(t):"childList"===t.type&&(t.addedNodes&&t.addedNodes.length&&this._ensureSingleSelection(),t.removedNodes&&t.removedNodes.length&&this._processRemovedNodes(t.removedNodes));super._mutationHandler(e)}_observeItems(){const e=new MutationObserver(this._mutationHandler);return e.observe(this,{attributes:!0,childList:!0,subtree:!0}),e}_disabledChanged(e){super._disabledChanged(e),this.items.forEach(t=>t.disabled=e)}}window.customElements.define("anypoint-radio-group",Nr);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Vr=Gs({_template:Co`
    <style>
      :host {
        display: inline-block;
        position: fixed;
        clip: rect(0px,0px,0px,0px);
      }
    </style>
    <div aria-live$="[[mode]]">[[_text]]</div>
`,is:"iron-a11y-announcer",properties:{mode:{type:String,value:"polite"},_text:{type:String,value:""}},created:function(){Vr.instance||(Vr.instance=this),document.body.addEventListener("iron-announce",this._onIronAnnounce.bind(this))},announce:function(e){this._text="",this.async((function(){this._text=e}),100)},_onIronAnnounce:function(e){e.detail&&e.detail.text&&this.announce(e.detail.text)}});Vr.instance=null,Vr.requestAvailability=function(){Vr.instance||(Vr.instance=document.createElement("iron-a11y-announcer")),document.body.appendChild(Vr.instance)};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Rr={properties:{sizingTarget:{type:Object,value:function(){return this}},fitInto:{type:Object,value:window},noOverlap:{type:Boolean},positionTarget:{type:Element},horizontalAlign:{type:String},verticalAlign:{type:String},dynamicAlign:{type:Boolean},horizontalOffset:{type:Number,value:0,notify:!0},verticalOffset:{type:Number,value:0,notify:!0},autoFitOnAttach:{type:Boolean,value:!1},_fitInfo:{type:Object}},get _fitWidth(){return this.fitInto===window?this.fitInto.innerWidth:this.fitInto.getBoundingClientRect().width},get _fitHeight(){return this.fitInto===window?this.fitInto.innerHeight:this.fitInto.getBoundingClientRect().height},get _fitLeft(){return this.fitInto===window?0:this.fitInto.getBoundingClientRect().left},get _fitTop(){return this.fitInto===window?0:this.fitInto.getBoundingClientRect().top},get _defaultPositionTarget(){var e=Bs(this).parentNode;return e&&e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(e=e.host),e},get _localeHorizontalAlign(){if(this._isRTL){if("right"===this.horizontalAlign)return"left";if("left"===this.horizontalAlign)return"right"}return this.horizontalAlign},get __shouldPosition(){return(this.horizontalAlign||this.verticalAlign)&&this.positionTarget},attached:function(){void 0===this._isRTL&&(this._isRTL="rtl"==window.getComputedStyle(this).direction),this.positionTarget=this.positionTarget||this._defaultPositionTarget,this.autoFitOnAttach&&("none"===window.getComputedStyle(this).display?setTimeout(function(){this.fit()}.bind(this)):(window.ShadyDOM&&ShadyDOM.flush(),this.fit()))},detached:function(){this.__deferredFit&&(clearTimeout(this.__deferredFit),this.__deferredFit=null)},fit:function(){this.position(),this.constrain(),this.center()},_discoverInfo:function(){if(!this._fitInfo){var e=window.getComputedStyle(this),t=window.getComputedStyle(this.sizingTarget);this._fitInfo={inlineStyle:{top:this.style.top||"",left:this.style.left||"",position:this.style.position||""},sizerInlineStyle:{maxWidth:this.sizingTarget.style.maxWidth||"",maxHeight:this.sizingTarget.style.maxHeight||"",boxSizing:this.sizingTarget.style.boxSizing||""},positionedBy:{vertically:"auto"!==e.top?"top":"auto"!==e.bottom?"bottom":null,horizontally:"auto"!==e.left?"left":"auto"!==e.right?"right":null},sizedBy:{height:"none"!==t.maxHeight,width:"none"!==t.maxWidth,minWidth:parseInt(t.minWidth,10)||0,minHeight:parseInt(t.minHeight,10)||0},margin:{top:parseInt(e.marginTop,10)||0,right:parseInt(e.marginRight,10)||0,bottom:parseInt(e.marginBottom,10)||0,left:parseInt(e.marginLeft,10)||0}}}},resetFit:function(){var e=this._fitInfo||{};for(var t in e.sizerInlineStyle)this.sizingTarget.style[t]=e.sizerInlineStyle[t];for(var t in e.inlineStyle)this.style[t]=e.inlineStyle[t];this._fitInfo=null},refit:function(){var e=this.sizingTarget.scrollLeft,t=this.sizingTarget.scrollTop;this.resetFit(),this.fit(),this.sizingTarget.scrollLeft=e,this.sizingTarget.scrollTop=t},position:function(){if(this.__shouldPosition){this._discoverInfo(),this.style.position="fixed",this.sizingTarget.style.boxSizing="border-box",this.style.left="0px",this.style.top="0px";var e=this.getBoundingClientRect(),t=this.__getNormalizedRect(this.positionTarget),i=this.__getNormalizedRect(this.fitInto),n=this._fitInfo.margin,s={width:e.width+n.left+n.right,height:e.height+n.top+n.bottom},o=this.__getPosition(this._localeHorizontalAlign,this.verticalAlign,s,e,t,i),r=o.left+n.left,a=o.top+n.top,l=Math.min(i.right-n.right,r+e.width),h=Math.min(i.bottom-n.bottom,a+e.height);r=Math.max(i.left+n.left,Math.min(r,l-this._fitInfo.sizedBy.minWidth)),a=Math.max(i.top+n.top,Math.min(a,h-this._fitInfo.sizedBy.minHeight)),this.sizingTarget.style.maxWidth=Math.max(l-r,this._fitInfo.sizedBy.minWidth)+"px",this.sizingTarget.style.maxHeight=Math.max(h-a,this._fitInfo.sizedBy.minHeight)+"px",this.style.left=r-e.left+"px",this.style.top=a-e.top+"px"}},constrain:function(){if(!this.__shouldPosition){this._discoverInfo();var e=this._fitInfo;e.positionedBy.vertically||(this.style.position="fixed",this.style.top="0px"),e.positionedBy.horizontally||(this.style.position="fixed",this.style.left="0px"),this.sizingTarget.style.boxSizing="border-box";var t=this.getBoundingClientRect();e.sizedBy.height||this.__sizeDimension(t,e.positionedBy.vertically,"top","bottom","Height"),e.sizedBy.width||this.__sizeDimension(t,e.positionedBy.horizontally,"left","right","Width")}},_sizeDimension:function(e,t,i,n,s){this.__sizeDimension(e,t,i,n,s)},__sizeDimension:function(e,t,i,n,s){var o=this._fitInfo,r=this.__getNormalizedRect(this.fitInto),a="Width"===s?r.width:r.height,l=t===n,h=l?a-e[n]:e[i],c=o.margin[l?i:n],d="offset"+s,p=this[d]-this.sizingTarget[d];this.sizingTarget.style["max"+s]=a-c-h-p+"px"},center:function(){if(!this.__shouldPosition){this._discoverInfo();var e=this._fitInfo.positionedBy;if(!e.vertically||!e.horizontally){this.style.position="fixed",e.vertically||(this.style.top="0px"),e.horizontally||(this.style.left="0px");var t=this.getBoundingClientRect(),i=this.__getNormalizedRect(this.fitInto);if(!e.vertically){var n=i.top-t.top+(i.height-t.height)/2;this.style.top=n+"px"}if(!e.horizontally){var s=i.left-t.left+(i.width-t.width)/2;this.style.left=s+"px"}}}},__getNormalizedRect:function(e){return e===document.documentElement||e===window?{top:0,left:0,width:window.innerWidth,height:window.innerHeight,right:window.innerWidth,bottom:window.innerHeight}:e.getBoundingClientRect()},__getOffscreenArea:function(e,t,i){var n=Math.min(0,e.top)+Math.min(0,i.bottom-(e.top+t.height)),s=Math.min(0,e.left)+Math.min(0,i.right-(e.left+t.width));return Math.abs(n)*t.width+Math.abs(s)*t.height},__getPosition:function(e,t,i,n,s,o){var r,a=[{verticalAlign:"top",horizontalAlign:"left",top:s.top+this.verticalOffset,left:s.left+this.horizontalOffset},{verticalAlign:"top",horizontalAlign:"right",top:s.top+this.verticalOffset,left:s.right-i.width-this.horizontalOffset},{verticalAlign:"bottom",horizontalAlign:"left",top:s.bottom-i.height-this.verticalOffset,left:s.left+this.horizontalOffset},{verticalAlign:"bottom",horizontalAlign:"right",top:s.bottom-i.height-this.verticalOffset,left:s.right-i.width-this.horizontalOffset}];if(this.noOverlap){for(var l=0,h=a.length;l<h;l++){var c={};for(var d in a[l])c[d]=a[l][d];a.push(c)}a[0].top=a[1].top+=s.height,a[2].top=a[3].top-=s.height,a[4].left=a[6].left+=s.width,a[5].left=a[7].left-=s.width}t="auto"===t?null:t,(e="auto"===e?null:e)&&"center"!==e||(a.push({verticalAlign:"top",horizontalAlign:"center",top:s.top+this.verticalOffset+(this.noOverlap?s.height:0),left:s.left-n.width/2+s.width/2+this.horizontalOffset}),a.push({verticalAlign:"bottom",horizontalAlign:"center",top:s.bottom-i.height-this.verticalOffset-(this.noOverlap?s.height:0),left:s.left-n.width/2+s.width/2+this.horizontalOffset})),t&&"middle"!==t||(a.push({verticalAlign:"middle",horizontalAlign:"left",top:s.top-n.height/2+s.height/2+this.verticalOffset,left:s.left+this.horizontalOffset+(this.noOverlap?s.width:0)}),a.push({verticalAlign:"middle",horizontalAlign:"right",top:s.top-n.height/2+s.height/2+this.verticalOffset,left:s.right-i.width-this.horizontalOffset-(this.noOverlap?s.width:0)})),"middle"===t&&"center"===e&&a.push({verticalAlign:"middle",horizontalAlign:"center",top:s.top-n.height/2+s.height/2+this.verticalOffset,left:s.left-n.width/2+s.width/2+this.horizontalOffset});for(l=0;l<a.length;l++){var p=a[l],u=p.verticalAlign===t,f=p.horizontalAlign===e;if(!this.dynamicAlign&&!this.noOverlap&&u&&f){r=p;break}var _=(!t||u)&&(!e||f);if(this.dynamicAlign||_){if(p.offscreenArea=this.__getOffscreenArea(p,i,o),0===p.offscreenArea&&_){r=p;break}r=r||p;var m=p.offscreenArea-r.offscreenArea;(m<0||0===m&&(u||f))&&(r=p)}}return r}};
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var Dr=Element.prototype,Br=Dr.matches||Dr.matchesSelector||Dr.mozMatchesSelector||Dr.msMatchesSelector||Dr.oMatchesSelector||Dr.webkitMatchesSelector;const Fr={getTabbableNodes:function(e){var t=[];return this._collectTabbableNodes(e,t)?this._sortByTabIndex(t):t},isFocusable:function(e){return Br.call(e,"input, select, textarea, button, object")?Br.call(e,":not([disabled])"):Br.call(e,"a[href], area[href], iframe, [tabindex], [contentEditable]")},isTabbable:function(e){return this.isFocusable(e)&&Br.call(e,':not([tabindex="-1"])')&&this._isVisible(e)},_normalizedTabIndex:function(e){if(this.isFocusable(e)){var t=e.getAttribute("tabindex")||0;return Number(t)}return-1},_collectTabbableNodes:function(e,t){if(e.nodeType!==Node.ELEMENT_NODE||!this._isVisible(e))return!1;var i,n=e,s=this._normalizedTabIndex(n),o=s>0;s>=0&&t.push(n),i="content"===n.localName||"slot"===n.localName?Bs(n).getDistributedNodes():Bs(n.root||n).children;for(var r=0;r<i.length;r++)o=this._collectTabbableNodes(i[r],t)||o;return o},_isVisible:function(e){var t=e.style;return"hidden"!==t.visibility&&"none"!==t.display&&("hidden"!==(t=window.getComputedStyle(e)).visibility&&"none"!==t.display)},_sortByTabIndex:function(e){var t=e.length;if(t<2)return e;var i=Math.ceil(t/2),n=this._sortByTabIndex(e.slice(0,i)),s=this._sortByTabIndex(e.slice(i));return this._mergeSortByTabIndex(n,s)},_mergeSortByTabIndex:function(e,t){for(var i=[];e.length>0&&t.length>0;)this._hasLowerTabOrder(e[0],t[0])?i.push(t.shift()):i.push(e.shift());return i.concat(e,t)},_hasLowerTabOrder:function(e,t){var i=Math.max(e.tabIndex,0),n=Math.max(t.tabIndex,0);return 0===i||0===n?n>i:i>n}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Gs({_template:Co`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--iron-overlay-backdrop-background-color, #000);
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
        @apply --iron-overlay-backdrop;
      }

      :host(.opened) {
        opacity: var(--iron-overlay-backdrop-opacity, 0.6);
        pointer-events: auto;
        @apply --iron-overlay-backdrop-opened;
      }
    </style>

    <slot></slot>
`,is:"iron-overlay-backdrop",properties:{opened:{reflectToAttribute:!0,type:Boolean,value:!1,observer:"_openedChanged"}},listeners:{transitionend:"_onTransitionend"},created:function(){this.__openedRaf=null},attached:function(){this.opened&&this._openedChanged(this.opened)},prepare:function(){this.opened&&!this.parentNode&&Bs(document.body).appendChild(this)},open:function(){this.opened=!0},close:function(){this.opened=!1},complete:function(){this.opened||this.parentNode!==document.body||Bs(this.parentNode).removeChild(this)},_onTransitionend:function(e){e&&e.target===this&&this.complete()},_openedChanged:function(e){if(e)this.prepare();else{var t=window.getComputedStyle(this);"0s"!==t.transitionDuration&&0!=t.opacity||this.complete()}this.isAttached&&(this.__openedRaf&&(window.cancelAnimationFrame(this.__openedRaf),this.__openedRaf=null),this.scrollTop=this.scrollTop,this.__openedRaf=window.requestAnimationFrame(function(){this.__openedRaf=null,this.toggleClass("opened",this.opened)}.bind(this)))}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Ur=function(){this._overlays=[],this._minimumZ=101,this._backdropElement=null,rs(document.documentElement,"tap",(function(){})),document.addEventListener("tap",this._onCaptureClick.bind(this),!0),document.addEventListener("focus",this._onCaptureFocus.bind(this),!0),document.addEventListener("keydown",this._onCaptureKeyDown.bind(this),!0)};Ur.prototype={constructor:Ur,get backdropElement(){return this._backdropElement||(this._backdropElement=document.createElement("iron-overlay-backdrop")),this._backdropElement},get deepActiveElement(){var e=document.activeElement;for(e&&e instanceof Element!=!1||(e=document.body);e.root&&Bs(e.root).activeElement;)e=Bs(e.root).activeElement;return e},_bringOverlayAtIndexToFront:function(e){var t=this._overlays[e];if(t){var i=this._overlays.length-1,n=this._overlays[i];if(n&&this._shouldBeBehindOverlay(t,n)&&i--,!(e>=i)){var s=Math.max(this.currentOverlayZ(),this._minimumZ);for(this._getZ(t)<=s&&this._applyOverlayZ(t,s);e<i;)this._overlays[e]=this._overlays[e+1],e++;this._overlays[i]=t}}},addOrRemoveOverlay:function(e){e.opened?this.addOverlay(e):this.removeOverlay(e)},addOverlay:function(e){var t=this._overlays.indexOf(e);if(t>=0)return this._bringOverlayAtIndexToFront(t),void this.trackBackdrop();var i=this._overlays.length,n=this._overlays[i-1],s=Math.max(this._getZ(n),this._minimumZ),o=this._getZ(e);if(n&&this._shouldBeBehindOverlay(e,n)){this._applyOverlayZ(n,s),i--;var r=this._overlays[i-1];s=Math.max(this._getZ(r),this._minimumZ)}o<=s&&this._applyOverlayZ(e,s),this._overlays.splice(i,0,e),this.trackBackdrop()},removeOverlay:function(e){var t=this._overlays.indexOf(e);-1!==t&&(this._overlays.splice(t,1),this.trackBackdrop())},currentOverlay:function(){var e=this._overlays.length-1;return this._overlays[e]},currentOverlayZ:function(){return this._getZ(this.currentOverlay())},ensureMinimumZ:function(e){this._minimumZ=Math.max(this._minimumZ,e)},focusOverlay:function(){var e=this.currentOverlay();e&&e._applyFocus()},trackBackdrop:function(){var e=this._overlayWithBackdrop();(e||this._backdropElement)&&(this.backdropElement.style.zIndex=this._getZ(e)-1,this.backdropElement.opened=!!e,this.backdropElement.prepare())},getBackdrops:function(){for(var e=[],t=0;t<this._overlays.length;t++)this._overlays[t].withBackdrop&&e.push(this._overlays[t]);return e},backdropZ:function(){return this._getZ(this._overlayWithBackdrop())-1},_overlayWithBackdrop:function(){for(var e=this._overlays.length-1;e>=0;e--)if(this._overlays[e].withBackdrop)return this._overlays[e]},_getZ:function(e){var t=this._minimumZ;if(e){var i=Number(e.style.zIndex||window.getComputedStyle(e).zIndex);i==i&&(t=i)}return t},_setZ:function(e,t){e.style.zIndex=t},_applyOverlayZ:function(e,t){this._setZ(e,t+2)},_overlayInPath:function(e){e=e||[];for(var t=0;t<e.length;t++)if(e[t]._manager===this)return e[t]},_onCaptureClick:function(e){var t=this._overlays.length-1;if(-1!==t)for(var i,n=Bs(e).path;(i=this._overlays[t])&&this._overlayInPath(n)!==i&&(i._onCaptureClick(e),i.allowClickThrough);)t--},_onCaptureFocus:function(e){var t=this.currentOverlay();t&&t._onCaptureFocus(e)},_onCaptureKeyDown:function(e){var t=this.currentOverlay();t&&(er.keyboardEventMatchesKeys(e,"esc")?t._onCaptureEsc(e):er.keyboardEventMatchesKeys(e,"tab")&&t._onCaptureTab(e))},_shouldBeBehindOverlay:function(e,t){return!e.alwaysOnTop&&t.alwaysOnTop}};const qr=new Ur;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var $r,jr,Kr={pageX:0,pageY:0},Yr=null,Wr=[],Jr=["wheel","mousewheel","DOMMouseScroll","touchstart","touchmove"];function Xr(e){Gr.indexOf(e)>=0||(0===Gr.length&&function(){$r=$r||ta.bind(void 0);for(var e=0,t=Jr.length;e<t;e++)document.addEventListener(Jr[e],$r,{capture:!0,passive:!1})}(),Gr.push(e),jr=Gr[Gr.length-1],Qr=[],ea=[])}function Zr(e){var t=Gr.indexOf(e);-1!==t&&(Gr.splice(t,1),jr=Gr[Gr.length-1],Qr=[],ea=[],0===Gr.length&&function(){for(var e=0,t=Jr.length;e<t;e++)document.removeEventListener(Jr[e],$r,{capture:!0,passive:!1})}())}const Gr=[];let Qr=null,ea=null;function ta(e){if(e.cancelable&&function(e){var t=Bs(e).rootTarget;"touchmove"!==e.type&&Yr!==t&&(Yr=t,Wr=function(e){for(var t=[],i=e.indexOf(jr),n=0;n<=i;n++)if(e[n].nodeType===Node.ELEMENT_NODE){var s=e[n],o=s.style;"scroll"!==o.overflow&&"auto"!==o.overflow&&(o=window.getComputedStyle(s)),"scroll"!==o.overflow&&"auto"!==o.overflow||t.push(s)}return t}(Bs(e).path));if(!Wr.length)return!0;if("touchstart"===e.type)return!1;var i=function(e){var t={deltaX:e.deltaX,deltaY:e.deltaY};if("deltaX"in e);else if("wheelDeltaX"in e&&"wheelDeltaY"in e)t.deltaX=-e.wheelDeltaX,t.deltaY=-e.wheelDeltaY;else if("wheelDelta"in e)t.deltaX=0,t.deltaY=-e.wheelDelta;else if("axis"in e)t.deltaX=1===e.axis?e.detail:0,t.deltaY=2===e.axis?e.detail:0;else if(e.targetTouches){var i=e.targetTouches[0];t.deltaX=Kr.pageX-i.pageX,t.deltaY=Kr.pageY-i.pageY}return t}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/(e);return!function(e,t,i){if(!t&&!i)return;for(var n=Math.abs(i)>=Math.abs(t),s=0;s<e.length;s++){var o=e[s];if(n?i<0?o.scrollTop>0:o.scrollTop<o.scrollHeight-o.clientHeight:t<0?o.scrollLeft>0:o.scrollLeft<o.scrollWidth-o.clientWidth)return o}}(Wr,i.deltaX,i.deltaY)}(e)&&e.preventDefault(),e.targetTouches){var t=e.targetTouches[0];Kr.pageX=t.pageX,Kr.pageY=t.pageY}}const ia={properties:{opened:{observer:"_openedChanged",type:Boolean,value:!1,notify:!0},canceled:{observer:"_canceledChanged",readOnly:!0,type:Boolean,value:!1},withBackdrop:{observer:"_withBackdropChanged",type:Boolean},noAutoFocus:{type:Boolean,value:!1},noCancelOnEscKey:{type:Boolean,value:!1},noCancelOnOutsideClick:{type:Boolean,value:!1},closingReason:{type:Object},restoreFocusOnClose:{type:Boolean,value:!1},allowClickThrough:{type:Boolean},alwaysOnTop:{type:Boolean},scrollAction:{type:String},_manager:{type:Object,value:qr},_focusedChild:{type:Object}},listeners:{"iron-resize":"_onIronResize"},observers:["__updateScrollObservers(isAttached, opened, scrollAction)"],get backdropElement(){return this._manager.backdropElement},get _focusNode(){return this._focusedChild||Bs(this).querySelector("[autofocus]")||this},get _focusableNodes(){return Fr.getTabbableNodes(this)},ready:function(){this.__isAnimating=!1,this.__shouldRemoveTabIndex=!1,this.__firstFocusableNode=this.__lastFocusableNode=null,this.__rafs={},this.__restoreFocusNode=null,this.__scrollTop=this.__scrollLeft=null,this.__onCaptureScroll=this.__onCaptureScroll.bind(this),this.__rootNodes=null,this._ensureSetup()},attached:function(){this.opened&&this._openedChanged(this.opened),this._observer=Bs(this).observeNodes(this._onNodesChange)},detached:function(){for(var e in Bs(this).unobserveNodes(this._observer),this._observer=null,this.__rafs)null!==this.__rafs[e]&&cancelAnimationFrame(this.__rafs[e]);this.__rafs={},this._manager.removeOverlay(this),this.__isAnimating&&(this.opened?this._finishRenderOpened():(this._applyFocus(),this._finishRenderClosed()))},toggle:function(){this._setCanceled(!1),this.opened=!this.opened},open:function(){this._setCanceled(!1),this.opened=!0},close:function(){this._setCanceled(!1),this.opened=!1},cancel:function(e){this.fire("iron-overlay-canceled",e,{cancelable:!0}).defaultPrevented||(this._setCanceled(!0),this.opened=!1)},invalidateTabbables:function(){this.__firstFocusableNode=this.__lastFocusableNode=null},_ensureSetup:function(){this._overlaySetup||(this._overlaySetup=!0,this.style.outline="none",this.style.display="none")},_openedChanged:function(e){e?this.removeAttribute("aria-hidden"):this.setAttribute("aria-hidden","true"),this.isAttached&&(this.__isAnimating=!0,this.__deraf("__openedChanged",this.__openedChanged))},_canceledChanged:function(){this.closingReason=this.closingReason||{},this.closingReason.canceled=this.canceled},_withBackdropChanged:function(){this.withBackdrop&&!this.hasAttribute("tabindex")?(this.setAttribute("tabindex","-1"),this.__shouldRemoveTabIndex=!0):this.__shouldRemoveTabIndex&&(this.removeAttribute("tabindex"),this.__shouldRemoveTabIndex=!1),this.opened&&this.isAttached&&this._manager.trackBackdrop()},_prepareRenderOpened:function(){this.__restoreFocusNode=this._manager.deepActiveElement,this._preparePositioning(),this.refit(),this._finishPositioning(),this.noAutoFocus&&document.activeElement===this._focusNode&&(this._focusNode.blur(),this.__restoreFocusNode.focus())},_renderOpened:function(){this._finishRenderOpened()},_renderClosed:function(){this._finishRenderClosed()},_finishRenderOpened:function(){this.notifyResize(),this.__isAnimating=!1,this.fire("iron-overlay-opened")},_finishRenderClosed:function(){this.style.display="none",this.style.zIndex="",this.notifyResize(),this.__isAnimating=!1,this.fire("iron-overlay-closed",this.closingReason)},_preparePositioning:function(){this.style.transition=this.style.webkitTransition="none",this.style.transform=this.style.webkitTransform="none",this.style.display=""},_finishPositioning:function(){this.style.display="none",this.scrollTop=this.scrollTop,this.style.transition=this.style.webkitTransition="",this.style.transform=this.style.webkitTransform="",this.style.display="",this.scrollTop=this.scrollTop},_applyFocus:function(){if(this.opened)this.noAutoFocus||this._focusNode.focus();else{if(this.restoreFocusOnClose&&this.__restoreFocusNode){var e=this._manager.deepActiveElement;(e===document.body||Bs(this).deepContains(e))&&this.__restoreFocusNode.focus()}this.__restoreFocusNode=null,this._focusNode.blur(),this._focusedChild=null}},_onCaptureClick:function(e){this.noCancelOnOutsideClick||this.cancel(e)},_onCaptureFocus:function(e){if(this.withBackdrop){var t=Bs(e).path;-1===t.indexOf(this)?(e.stopPropagation(),this._applyFocus()):this._focusedChild=t[0]}},_onCaptureEsc:function(e){this.noCancelOnEscKey||this.cancel(e)},_onCaptureTab:function(e){if(this.withBackdrop){this.__ensureFirstLastFocusables();var t=e.shiftKey,i=t?this.__firstFocusableNode:this.__lastFocusableNode,n=t?this.__lastFocusableNode:this.__firstFocusableNode,s=!1;if(i===n)s=!0;else{var o=this._manager.deepActiveElement;s=o===i||o===this}s&&(e.preventDefault(),this._focusedChild=n,this._applyFocus())}},_onIronResize:function(){this.opened&&!this.__isAnimating&&this.__deraf("refit",this.refit)},_onNodesChange:function(){this.opened&&!this.__isAnimating&&(this.invalidateTabbables(),this.notifyResize())},__ensureFirstLastFocusables:function(){var e=this._focusableNodes;this.__firstFocusableNode=e[0],this.__lastFocusableNode=e[e.length-1]},__openedChanged:function(){this.opened?(this._prepareRenderOpened(),this._manager.addOverlay(this),this._applyFocus(),this._renderOpened()):(this._manager.removeOverlay(this),this._applyFocus(),this._renderClosed())},__deraf:function(e,t){var i=this.__rafs;null!==i[e]&&cancelAnimationFrame(i[e]),i[e]=requestAnimationFrame(function(){i[e]=null,t.call(this)}.bind(this))},__updateScrollObservers:function(e,t,i){e&&t&&this.__isValidScrollAction(i)?("lock"===i&&(this.__saveScrollPosition(),Xr(this)),this.__addScrollListeners()):(Zr(this),this.__removeScrollListeners())},__addScrollListeners:function(){if(!this.__rootNodes){if(this.__rootNodes=[],Et)for(var e=this;e;)e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host&&this.__rootNodes.push(e),e=e.host||e.assignedSlot||e.parentNode;this.__rootNodes.push(document)}this.__rootNodes.forEach((function(e){e.addEventListener("scroll",this.__onCaptureScroll,{capture:!0,passive:!0})}),this)},__removeScrollListeners:function(){this.__rootNodes&&this.__rootNodes.forEach((function(e){e.removeEventListener("scroll",this.__onCaptureScroll,{capture:!0,passive:!0})}),this),this.isAttached||(this.__rootNodes=null)},__isValidScrollAction:function(e){return"lock"===e||"refit"===e||"cancel"===e},__onCaptureScroll:function(e){if(!(this.__isAnimating||Bs(e).path.indexOf(this)>=0))switch(this.scrollAction){case"lock":this.__restoreScrollPosition();break;case"refit":this.__deraf("refit",this.refit);break;case"cancel":this.cancel(e)}},__saveScrollPosition:function(){document.scrollingElement?(this.__scrollTop=document.scrollingElement.scrollTop,this.__scrollLeft=document.scrollingElement.scrollLeft):(this.__scrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop),this.__scrollLeft=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft))},__restoreScrollPosition:function(){document.scrollingElement?(document.scrollingElement.scrollTop=this.__scrollTop,document.scrollingElement.scrollLeft=this.__scrollLeft):(document.documentElement.scrollTop=document.body.scrollTop=this.__scrollTop,document.documentElement.scrollLeft=document.body.scrollLeft=this.__scrollLeft)}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var na=null;Gs({_template:Co`
    <style>
      :host {
        display: block;
        position: fixed;
        background-color: var(--paper-toast-background-color, #323232);
        color: var(--paper-toast-color, #f1f1f1);
        min-height: 48px;
        min-width: 288px;
        padding: 16px 24px;
        box-sizing: border-box;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        border-radius: 2px;
        margin: 12px;
        font-size: 14px;
        cursor: default;
        -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
        transition: transform 0.3s, opacity 0.3s;
        opacity: 0;
        -webkit-transform: translateY(100px);
        transform: translateY(100px);
        @apply --paper-font-common-base;
      }

      :host(.capsule) {
        border-radius: 24px;
      }

      :host(.fit-bottom) {
        width: 100%;
        min-width: 0;
        border-radius: 0;
        margin: 0;
      }

      :host(.paper-toast-open) {
        opacity: 1;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
      }
    </style>

    <span id="label">{{text}}</span>
    <slot></slot>
`,is:"paper-toast",behaviors:[[Rr,_r,ia]],properties:{fitInto:{type:Object,value:window,observer:"_onFitIntoChanged"},horizontalAlign:{type:String,value:"left"},verticalAlign:{type:String,value:"bottom"},duration:{type:Number,value:3e3},text:{type:String,value:""},noCancelOnOutsideClick:{type:Boolean,value:!0},noAutoFocus:{type:Boolean,value:!0}},listeners:{transitionend:"__onTransitionEnd"},get visible(){return Po._warn("`visible` is deprecated, use `opened` instead"),this.opened},get _canAutoClose(){return this.duration>0&&this.duration!==1/0},created:function(){this._autoClose=null,Vr.requestAvailability()},show:function(e){for(var t in"string"==typeof e&&(e={text:e}),e)0===t.indexOf("_")?Po._warn('The property "'+t+'" is private and was not set.'):t in this?this[t]=e[t]:Po._warn('The property "'+t+'" is not valid.');this.open()},hide:function(){this.close()},__onTransitionEnd:function(e){e&&e.target===this&&"opacity"===e.propertyName&&(this.opened?this._finishRenderOpened():this._finishRenderClosed())},_openedChanged:function(){null!==this._autoClose&&(this.cancelAsync(this._autoClose),this._autoClose=null),this.opened?(na&&na!==this&&na.close(),na=this,this.fire("iron-announce",{text:this.text}),this._canAutoClose&&(this._autoClose=this.async(this.close,this.duration))):na===this&&(na=null),ia._openedChanged.apply(this,arguments)},_renderOpened:function(){this.classList.add("paper-toast-open")},_renderClosed:function(){this.classList.remove("paper-toast-open")},_onFitIntoChanged:function(e){this.positionTarget=e}});const sa=le`
  html {
    --font-family: 'Open Sans', 'DIN Pro', sans-serif;
    --font-family-din: 'DIN Pro', sans-serif;
    --font-code-family: 'Source Code Pro', 'Consolas', 'Menlo', monospace;
    /* Header 1 */
    --font-header1-font-size: 30px;
    --font-header1-font-weight: 100;
    --font-header1-letter-spacing: -0.5px;
    --font-header1-margin-bottom: 20px;
    /* Header 2 */
    --font-header2-font-size: 25px;
    --font-header2-font-weight: 100;
    --font-header2-letter-spacing: -0.3px;
    --font-header2-margin-bottom: 20px;
    /* Header 3 */
    --font-header3-font-size: 20px;
    --font-header3-font-weight: 100;
    --font-header3-letter-spacing: -0.25px;
    --font-header3-margin-bottom: 20px;
    /* Header 4 */
    --font-header4-font-size: 18px;
    --font-header4-font-weight: 100;
    --font-header4-letter-spacing: -0.2px;
    --font-header4-margin-bottom: 20px;
    /* Header 5 */
    --font-header5-font-size: 16px;
    --font-header5-font-weight: 100;
    --font-header5-letter-spacing: -0.2px;
    --font-header5-margin-bottom: 20px;
    /* Header 6 */
    --font-header6-font-size: 12px;
    --font-header6-font-weight: 700;
    --font-header6-letter-spacing: 0;
    --font-header6-margin-bottom: 20px;
    /* Body text */
    --font-body-font-size: 14px;
    --font-body-letter-spacing: 0;
    --font-body-font-weight: 400;
    /* Body text small */
    --font-body-small-font-size: 14px;
    --font-body-small-letter-spacing: 0;
    --font-body-small-font-weight: 400;
    /* Blockquote container */
    --font-blockquote-font-style: italic;
    --font-blockquote-font-weight: 200;
    --font-blockquote-font-size: 18px;
    /* Code block */
    --font-code-font-size: 14px;
    --font-code-font-weight: 500;
    --font-code-line-height: 20px;
  }
`;try{document.adoptedStyleSheets=document.adoptedStyleSheets.concat(sa.styleSheet)}catch(e){{const e=document.createElement("style");e.type="text/css",e.innerHTML=sa.cssText,document.getElementsByTagName("head")[0].appendChild(e)}}const oa=le`
  html {
    @font-face {
      font-family: 'DIN Pro';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/DINPro-Light.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/DINPro-Light.woff2') format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/DINPro-Light.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/DINPro-Light.ttf') format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/DINPro-Light.svg') format('svg');
      font-weight: 300;
      font-style: normal;
    }
    /* Regular - OpenSans */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Regular.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Regular.eot?#iefix')
          format('embedded-opentype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Regular.woff2') format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Regular.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Regular.ttf') format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Regular.svg') format('svg');
      font-weight: 400;
      font-style: normal;
    }
    /* Semibold - OpenSansSemiBold */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Semibold.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Semibold.eot?#iefix')
          format('embedded-opentype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Semibold.woff2') format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Semibold.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Semibold.ttf') format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Semibold.svg') format('svg');
      font-weight: 600;
      font-style: normal;
    }
    /* Bold - OpenSansBold */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Bold.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Bold.eot?#iefix')
          format('embedded-opentype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Bold.woff2') format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Bold.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Bold.ttf') format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Bold.svg') format('svg');
      font-weight: 700;
      font-style: normal;
    }
    /* Light - OpenSansLight */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Light.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Light.eot?#iefix')
          format('embedded-opentype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Light.woff2') format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Light.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Light.ttf') format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Light.svg') format('svg');
      font-weight: 200;
      font-style: normal;
    }
    /* Light Italic - OpenSansLightItalic */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-LightItalic.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-LightItalic.eot?#iefix')
          format('embedded-opentype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-LightItalic.woff2')
          format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-LightItalic.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-LightItalic.ttf')
          format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-LightItalic.svg') format('svg');
      font-weight: 200;
      font-style: italic;
    }
    /* Monospaced (for code examples, logs, etc) */
    @font-face {
      font-family: 'Source Code Pro';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/SourceCodePro-Regular.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/SourceCodePro-Regular.eot?#iefix')
          format('embedded-opentype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/SourceCodePro-Regular.woff2')
          format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/SourceCodePro-Regular.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/SourceCodePro-Regular.ttf')
          format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/SourceCodePro-Regular.svg') format('svg');
      font-weight: 400;
      font-style: normal;
    }
  }
`;try{document.adoptedStyleSheets=document.adoptedStyleSheets.concat(oa.styleSheet)}catch(e){{const e=document.createElement("style");e.type="text/css",e.innerHTML=oa.cssText,document.getElementsByTagName("head")[0].appendChild(e)}}
/**
@license
Copyright 2017 Mulesoft.

All rights reserved.
*/Rt(e=>{return class extends e{get hovered(){return this._hovered}get _hovered(){return this.__hovered||!1}set _hovered(e){const t=this.__hovered;e!==t&&(this.__hovered=e,this.requestUpdate&&this.requestUpdate("hovered",t),e?this.setAttribute("hovered",""):this.removeAttribute("hovered"),this.dispatchEvent(new CustomEvent("hovered-changed",{composed:!0,detail:{value:e}})))}constructor(){super(),this._hoverCallback=this._hoverCallback.bind(this),this._leaveCallback=this._leaveCallback.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.addEventListener("mouseover",this._hoverCallback),this.addEventListener("mouseleave",this._leaveCallback)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("mouseover",this._hoverCallback),this.removeEventListener("mouseleave",this._leaveCallback)}_hoverCallback(){this._hovered=!0}_leaveCallback(){this._hovered=!1}}});
/**
@license
Copyright 2017 Mulesoft.

All rights reserved.
*/const ra=Rt(e=>{return class extends e{static get properties(){return{toggles:{type:Boolean,reflect:!0},active:{type:Boolean},ariaActiveAttribute:{type:String}}}get pressed(){return this._pressed}get _pressed(){return this.__pressed||!1}set _pressed(e){this._setChanged("_pressed",e)&&(e?this.setAttribute("pressed",""):this.removeAttribute("pressed"),this.dispatchEvent(new CustomEvent("pressed-changed",{composed:!0,detail:{value:e}})),this._pressedChanged(e))}get active(){return this._active||!1}set active(e){this._setChanged("active",e)&&(e?this.setAttribute("active",""):this.removeAttribute("active"),this.dispatchEvent(new CustomEvent("active-changed",{composed:!0,detail:{value:e}})),this._activeChanged())}get pointerDown(){return this._pointerDown}get _pointerDown(){return this.__pointerDown||!1}set _pointerDown(e){this._setChanged("_pointerDown",e)}get receivedFocusFromKeyboard(){return this._receivedFocusFromKeyboard||!1}get _receivedFocusFromKeyboard(){return this.__receivedFocusFromKeyboard||!1}set _receivedFocusFromKeyboard(e){this._setChanged("_receivedFocusFromKeyboard",e)}get ariaActiveAttribute(){return this._ariaActiveAttribute}set ariaActiveAttribute(e){const t=this._ariaActiveAttribute;this._setChanged("ariaActiveAttribute",e)&&(t&&this.hasAttribute(t)&&this.removeAttribute(t),this._activeChanged())}_setChanged(e,t){const i=`_${e}`,n=this[i];return t!==n&&(this[i]=t,this.requestUpdate&&this.requestUpdate(e,n),!0)}constructor(){super(),this.ariaActiveAttribute="aria-pressed",this._downHandler=this._downHandler.bind(this),this._upHandler=this._upHandler.bind(this),this._clickHandler=this._clickHandler.bind(this),this._keyDownHandler=this._keyDownHandler.bind(this),this._keyUpHandler=this._keyUpHandler.bind(this),this._blurHandler=this._blurHandler.bind(this),this._focusHandler=this._focusHandler.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.addEventListener("mousedown",this._downHandler),this.addEventListener("mouseup",this._upHandler),this.addEventListener("click",this._clickHandler),this.addEventListener("keydown",this._keyDownHandler),this.addEventListener("keyup",this._keyUpHandler),this.addEventListener("blur",this._blurHandler),this.addEventListener("focus",this._focusHandler),this.hasAttribute("role")||this.setAttribute("role","button")}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("mousedown",this._downHandler),this.removeEventListener("mouseup",this._upHandler),this.removeEventListener("click",this._clickHandler),this.removeEventListener("keydown",this._keyDownHandler),this.removeEventListener("keyup",this._keyUpHandler),this.removeEventListener("blur",this._blurHandler),this.removeEventListener("focus",this._focusHandler)}_downHandler(){this._pointerDown=!0,this._pressed=!0,this._receivedFocusFromKeyboard=!1}_upHandler(){this._pointerDown=!1,this._pressed=!1}_clickHandler(){this.toggles?this.active=!this.active:this.active=!1}_keyDownHandler(e){"Enter"===e.code||"NumpadEnter"===e.code||13===e.keyCode?this._asyncClick(e):"Space"!==e.code&&32!==e.keyCode||this._spaceKeyDownHandler(e)}_keyUpHandler(e){"Space"!==e.code&&32!==e.keyCode||this._spaceKeyUpHandler(e)}_blurHandler(){this._detectKeyboardFocus(!1),this._pressed=!1}_focusHandler(){this._detectKeyboardFocus(!0)}_detectKeyboardFocus(e){this._receivedFocusFromKeyboard=!this.pointerDown&&e}_isLightDescendant(e){return e!==this&&this.contains(e)}_spaceKeyDownHandler(e){const t=e.target;t&&!this._isLightDescendant(t)&&(e.preventDefault(),e.stopImmediatePropagation(),this._pressed=!0)}_spaceKeyUpHandler(e){const t=e.target;t&&!this._isLightDescendant(t)&&(this.pressed&&this._asyncClick(),this._pressed=!1)}_asyncClick(){setTimeout(()=>this.click(),1)}_pressedChanged(){this._changedButtonState()}_changedButtonState(){this._buttonStateChanged&&this._buttonStateChanged()}_activeChanged(){const{active:e,ariaActiveAttribute:t}=this;this.toggles?this.setAttribute(t,e?"true":"false"):this.removeAttribute(t),this._changedButtonState()}_controlStateChanged(){this.disabled?this._pressed=!1:this._changedButtonState()}}}),aa=Rt(e=>{return class extends e{static get properties(){return{disabled:{type:Boolean},focused:{type:Boolean}}}get focused(){return this._focused}set focused(e){this._setChanged("focused",e)&&(e?this.setAttribute("focused",""):this.removeAttribute("focused"),this.dispatchEvent(new CustomEvent("focused-changed",{composed:!0,detail:{value:e}})),this._changedControlState())}get disabled(){return this._disabled}set disabled(e){this._setChanged("disabled",e)&&(e?this.setAttribute("disabled",""):this.removeAttribute("disabled"),this.dispatchEvent(new CustomEvent("disabled-changed",{composed:!0,detail:{value:e}})),this._disabledChanged(e),this._changedControlState())}_setChanged(e,t){const i=`_${e}`,n=this[i];return t!==n&&(this[i]=t,this.requestUpdate&&this.requestUpdate(e,n),!0)}constructor(){super(),this._focusBlurHandler=this._focusBlurHandler.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.addEventListener("focus",this._focusBlurHandler),this.addEventListener("blur",this._focusBlurHandler)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("focus",this._focusBlurHandler),this.removeEventListener("blur",this._focusBlurHandler)}_focusBlurHandler(e){this.disabled?this.focused&&(this.focused=!1,this.blur()):this.focused="focus"===e.type}_disabledChanged(e){this.setAttribute("aria-disabled",e?"true":"false"),this.style.pointerEvents=e?"none":"",e?(this._oldTabIndex=this.getAttribute("tabindex"),this.focused=!1,this.setAttribute("tabindex","-1"),this.blur()):void 0!==this._oldTabIndex&&(null===this._oldTabIndex?this.removeAttribute("tabindex"):this.setAttribute("tabindex",this._oldTabIndex))}_changedControlState(){this._controlStateChanged&&this._controlStateChanged()}}});class la extends(aa(ra(ce))){static get properties(){return{elevation:{type:Number,reflect:!0},emphasis:{type:String,reflect:!0},noink:{type:Boolean},legacy:{type:Boolean},compatibility:{type:Boolean,reflect:!0}}}get legacy(){return this.compatibility}set legacy(e){this.compatibility=e}get emphasis(){return this._emphasis}set emphasis(e){this._setChanged("emphasis",e)&&this._calculateElevation()}get toggles(){return this._toggles}set toggles(e){this._setChanged("toggles",e)&&this._calculateElevation()}get compatibility(){return this._compatibility}set compatibility(e){this._setChanged("compatibility",e)&&this._calculateElevation()}get elevation(){return this._elevation}set elevation(e){e||(e=0),this._setChanged("elevation",e)}constructor(){super(),this.emphasis="low"}async _calculateElevation(){let e=0;"high"!==this.emphasis||this.compatibility||(e=this.toggles&&this.active?2:this.pressed?3:1),await this.updateComplete,this.elevation=e}_controlStateChanged(){super._controlStateChanged(),this._calculateElevation()}_buttonStateChanged(){this._calculateElevation()}}class ha extends la{static get styles(){return le`:host {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      box-sizing: border-box;
      min-width: 5.14em;
      margin: 0 0.29em;
      outline-width: 0;
      user-select: none;
      cursor: pointer;
      z-index: 0;
      padding: 0.7em 0.57em;
      font-size: var(--anypoint-button-font-size, 15px);
      background-color: var(--anypoint-button-background-color, inherit);
      color: var(--anypoint-button-color, var(--anypoint-color-primary));
      border-width: 1px;
      border-color: var(--anypoint-button-border-color, transparent);
      border-style: solid;
      border-radius: var(--anypoint-button-border-radius, 3px);
      text-transform: var(--anypoint-button-text-transform, uppercase);
      transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.18s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host([hidden]) {
      display: none !important;
    }

    :host(:focus) {
      outline: none;
    }

    :host([disabled]) {
      cursor: auto;
      pointer-events: none;
    }

    :host([emphasis="low"]:not([compatibility])) {
      box-shadow: none !important;
    }

    :host([emphasis="low"][disabled]) {
      color: var(--anypoint-button-disabled-color, #a8a8a8);
    }

    :host(:not([pressed])[emphasis="low"]:hover) {
      background-color: var(--anypoint-button-emphasis-low-hover-background-color, rgba(0, 162, 223, .08));
    }

    :host(:not([pressed]):not([compatibility])[emphasis="low"][focused]) {
      background-color: var(--anypoint-button-emphasis-low-focus-background-color, rgba(0, 162, 223, .12));
      color: var(--anypoint-button-emphasis-low-focus-color, var(--anypoint-color-coreBlue4));
    }

    :host(:not([pressed])[emphasis="low"][active]) {
      background-color: var(--anypoint-button-emphasis-low-active-background-color, rgba(0, 162, 223, .16));
    }

    :host([emphasis="medium"]:not([compatibility])) {
      box-shadow: none !important;
    }

    :host([emphasis="medium"]) {
      border-color: var(--anypoint-button-emphasis-medium-focus-border-color, var(--anypoint-color-robustBlue1));
    }

    :host([emphasis="medium"][disabled]) {
      color: var(--anypoint-button-disabled-color, #a8a8a8);
      border-color: var(--anypoint-button-disabled-color, var(--anypoint-color-aluminum4));
    }

    :host(:not([pressed])[emphasis="medium"]:hover) {
      background-color: var(--anypoint-button-emphasis-medium-hover-background-color, rgba(0, 162, 223, .06));
    }

    :host(:not([pressed])[emphasis="medium"][focused]) {
      background-color: var(--anypoint-button-emphasis-medium-focus-background-color, rgba(0, 162, 223, .08));
      color: var(--anypoint-button-emphasis-low-focus-color, var(--anypoint-color-coreBlue4));
      border-color: var(--anypoint-button-emphasis-medium-focus-border-color, var(--anypoint-color-robustBlue2));
    }

    :host(:not([pressed])[emphasis="medium"][active]) {
      background-color: var(--anypoint-button-emphasis-low-active-background-color, rgba(94, 102, 249, 0.16));
    }

    :host([emphasis="high"]:not([compatibility])) {
      will-change: box-shadow;
      background-color: var(--anypoint-button-emphasis-high-background-color, var(--anypoint-color-primary));
      color: var(--anypoint-button-emphasis-high-color, var(--anypoint-color-tertiary));
    }

    :host([emphasis="high"][disabled]:not([compatibility])) {
      background: var(--anypoint-button-disabled-background-color, #eaeaea);
      color: var(--anypoint-button-disabled-color, #a8a8a8);
      box-shadow: none;
    }

    :host(:not([pressed]):not([compatibility])[emphasis="high"]:hover) {
      background-color: var(--anypoint-button-emphasis-high-hover-background-color, rgba(0, 162, 223, 0.87));
    }

    :host(:not([pressed]):not([compatibility])[emphasis="high"]:focus) {
      background-color: var(--anypoint-button-emphasis-high-focus-background-color, rgba(0, 162, 223, 0.87));
    }

    :host(:not([pressed]):not([compatibility])[emphasis="high"][active]) {
      background-color: var(--anypoint-button-emphasis-high-active-background-color, var(--anypoint-color-indigo3));
    }

    :host([elevation="1"]) {
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                  0 1px 5px 0 rgba(0, 0, 0, 0.12),
                  0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }

    :host([elevation="2"]) {
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                  0 1px 10px 0 rgba(0, 0, 0, 0.12),
                  0 2px 4px -1px rgba(0, 0, 0, 0.4);
    }

    :host([elevation="3"]) {
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                  0 1px 18px 0 rgba(0, 0, 0, 0.12),
                  0 3px 5px -1px rgba(0, 0, 0, 0.4);
    }

    :host([emphasis="high"][compatibility]) {
      background-color: var(--anypoint-button-background-color, var(--anypoint-color-primary));
      color: var(--anypoint-button-color, var(--anypoint-color-tertiary));
      border-radius: var(--anypoint-button-border-radius, 2px);
      height: 40px;
    }

    :host([emphasis="high"][compatibility]:hover) {
      background-color: var(--anypoint-button-hover-background-color, var(--anypoint-color-coreBlue4));
    }

    :host([compatibility][focused]) {
      box-shadow: var(--anypoint-button-foxus-box-shadow-color, 0 0 0 3px #abe2f5);
    }

    :host([emphasis="high"][compatibility][pressed]) {
      background-color: var(--anypoint-button-hover-background-color, var(--anypoint-color-coreBlue5));
    }

    :host([emphasis="high"][compatibility][active]) {
      background-color: var(--anypoint-button-active-background-color, var(--anypoint-color-coreBlue5));
    }

    :host([compatibility]) {
      text-transform: var(--anypoint-button-text-transform, initial);
    }

    :host([compatibility]) paper-ripple {
      display: none;
    }

    :host([compatibility][disabled]) {
      background: var(--anypoint-button-disabled-background-color, #eaeaea);
      color: var(--anypoint-button-disabled-color, #a8a8a8);
    }

    :host ::slotted(*) {
      margin: 0 4px;
    }
    `}render(){const{noink:e,compatibility:t}=this;return V`<slot></slot><paper-ripple .noink="${!!e||!!t}"></paper-ripple>`}get _ripple(){return this.shadowRoot.querySelector("paper-ripple")}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),super.connectedCallback&&super.connectedCallback()}_spaceKeyDownHandler(e){super._spaceKeyDownHandler(e),this._calculateElevation(),this._ripple.animating||this._ripple.uiDownAction()}_spaceKeyUpHandler(e){super._spaceKeyUpHandler(e),this._calculateElevation(),this._ripple.uiUpAction()}}window.customElements.define("anypoint-button",ha);class ca extends HTMLElement{get tokenInfo(){return this._tokenInfo}constructor(){super(),this._frameLoadErrorHandler=this._frameLoadErrorHandler.bind(this),this._frameLoadHandler=this._frameLoadHandler.bind(this),this._tokenRequestedHandler=this._tokenRequestedHandler.bind(this),this._popupMessageHandler=this._popupMessageHandler.bind(this),this._popupObserver=this._popupObserver.bind(this)}connectedCallback(){window.addEventListener("oauth2-token-requested",this._tokenRequestedHandler),window.addEventListener("message",this._popupMessageHandler),this.setAttribute("aria-hidden","true")}disconnectedCallback(){window.removeEventListener("oauth2-token-requested",this._tokenRequestedHandler),window.removeEventListener("message",this._popupMessageHandler)}clear(){this._state=void 0,this._settings=void 0,this._cleanupFrame(),this._cleanupPopup()}_cleanupPopup(){this._popup&&(this._popup.closed||this._popup.close(),this._popup=void 0)}_tokenRequestedHandler(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),this.authorize(e.detail)}authorize(e){this._tokenInfo=void 0,this._type=e.type,this._state=e.state||this.randomString(6),this._settings=e,this._errored=!1,this._overrideExchangeCodeFlow=e.overrideExchangeCodeFlow;try{this._sanityCheck(e)}catch(t){throw this._dispatchError({message:t.message,code:"oauth_error",state:this._state,interactive:e.interactive}),t}switch(e.type){case"implicit":this._authorize(this._constructPopupUrl(e,"token"),e);break;case"authorization_code":this._authorize(this._constructPopupUrl(e,"code"),e);break;case"client_credentials":this.authorizeClientCredentials(e).catch(()=>{});break;case"password":this.authorizePassword(e).catch(()=>{});break;default:this.authorizeCustomGrant(e).catch(()=>{})}}_sanityCheck(e){if("implicit"===e.type||"authorization_code"===e.type){try{this._checkUrl(e.authorizationUri)}catch(e){throw new Error(`authorizationUri: ${e.message}`)}if(e.accessTokenUri)try{this._checkUrl(e.accessTokenUri)}catch(e){throw new Error(`accessTokenUri: ${e.message}`)}}else if(e.accessTokenUri&&e.accessTokenUri)try{this._checkUrl(e.accessTokenUri)}catch(e){throw new Error(`accessTokenUri: ${e.message}`)}}_checkUrl(e){if(!e)throw new TypeError("the value is missing");if("string"!=typeof e)throw new TypeError("the value is not a string");if(-1===e.indexOf("http://")&&-1===e.indexOf("https://"))throw new Error("the value has invalid scheme")}_authorize(e,t){this._settings=t,this._errored=!1,!1===t.interactive?this._authorizeTokenNonInteractive(e):this._authorizePopup(e)}_authorizePopup(e){this._popup=window.open(e,"oauth-window","menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=800,height=600"),this._popup?(this._popup.window.focus(),this._observePopupState()):this._dispatchError({message:"Authorization popup is being blocked.",code:"popup_blocked",state:this._state,interactive:this._settings.interactive})}_authorizeTokenNonInteractive(e){const t=document.createElement("iframe");t.style.border="0",t.style.width="0",t.style.height="0",t.style.overflow="hidden",t.addEventListener("error",this._frameLoadErrorHandler),t.addEventListener("load",this._frameLoadHandler),t.id="oauth2-authorization-frame",t.setAttribute("data-owner","arc-oauth-authorization"),document.body.appendChild(t),t.src=e,this._iframe=t}_cleanupFrame(){if(this._iframe){this._iframe.removeEventListener("error",this._frameLoadErrorHandler),this._iframe.removeEventListener("load",this._frameLoadHandler);try{document.body.removeChild(this._iframe)}catch(e){}this._iframe=void 0}}_frameLoadErrorHandler(){this._errored||(this._dispatchResponse({interactive:!1,code:"iframe_load_error",state:this._state}),this.clear())}_frameLoadHandler(){this.__frameLoadInfo||(this.__frameLoadInfo=!0,this.__frameLoadTimeout=setTimeout(()=>{this.tokenInfo||this._errored||this._dispatchResponse({interactive:!1,code:"not_authorized",state:this._state}),this.clear(),this.__frameLoadInfo=!1},700))}_observePopupState(){this.__popupCheckInterval=setInterval(this._popupObserver,250)}_popupObserver(){this._popup&&!this._popup.closed||(clearInterval(this.__popupCheckInterval),this.__popupCheckInterval=void 0,this._beforePopupUnloadHandler())}_constructPopupUrl(e,t){let i=e.authorizationUri;if(-1===i.indexOf("?")?i+="?":i+="&",i+="response_type="+t,i+="&client_id="+encodeURIComponent(e.clientId||""),e.redirectUri&&(i+="&redirect_uri="+encodeURIComponent(e.redirectUri)),e.scopes&&e.scopes.length&&(i+="&scope="+this._computeScope(e.scopes)),i+="&state="+encodeURIComponent(this._state),e.includeGrantedScopes&&(i+="&include_granted_scopes=true"),e.loginHint&&(i+="&login_hint="+encodeURIComponent(e.loginHint)),!1===e.interactive&&(i+="&prompt=none"),e.customData){const n="token"===t?"auth":"token",s=e.customData[n];s&&(i=this._applyCustomSettingsQuery(i,s))}return i}_computeScope(e){if(!e)return"";const t=e.join(" ");return encodeURIComponent(t)}_popupMessageHandler(e){(this._popup||this._iframe)&&this._processPopupData(e)}_processPopupData(e){const t=e.data;!(this._overrideExchangeCodeFlow||t&&t.oauth2response)||(this._settings||(this._settings={}),t.state!==this._state?(this._dispatchError({message:"Invalid state returned by the OAuth server.",code:"invalid_state",state:this._state,serverState:t.state,interactive:this._settings.interactive}),this._errored=!0,this._clearIframeTimeout(),this.clear()):"error"in t?(this._dispatchError({message:t.errorDescription||"The request is invalid.",code:t.error||"oauth_error",state:this._state,interactive:this._settings.interactive}),this._errored=!0,this._clearIframeTimeout(),this.clear()):"implicit"===this._type?(this._handleTokenInfo(t),this.clear()):"authorization_code"===this._type&&(this._overrideExchangeCodeFlow?this._dispatchCodeResponse(t):(this._exchangeCodeValue=t.code,this._exchangeCode(t.code).catch(()=>{}),this._clearIframeTimeout())))}_clearIframeTimeout(){this.__frameLoadTimeout&&(clearTimeout(this.__frameLoadTimeout),this.__frameLoadTimeout=void 0)}randomString(e){return Math.round(Math.pow(36,e+1)-Math.random()*Math.pow(36,e)).toString(36).slice(1)}_beforePopupUnloadHandler(){if(this.tokenInfo||"authorization_code"===this._type&&this._exchangeCodeValue)return;const e=this._settings||{};this._dispatchError({message:"No response has been recorded.",code:"no_response",state:this._state,interactive:e.interactive}),this.clear()}async _exchangeCode(e){const t=this._settings.accessTokenUri,i=this._getCodeEchangeBody(this._settings,e);try{const e=await this._requestToken(t,i,this._settings),n=this._handleTokenInfo(e);return this.clear(),n}catch(e){this._handleTokenCodeError(e)}}_getCodeEchangeBody(e,t){let i="grant_type=authorization_code";return i+="&client_id="+encodeURIComponent(e.clientId),e.redirectUri&&(i+="&redirect_uri="+encodeURIComponent(e.redirectUri)),i+="&code="+encodeURIComponent(t),e.clientSecret?i+="&client_secret="+encodeURIComponent(e.clientSecret):i+="&client_secret=",i}_requestToken(e,t,i){if(i.customData){const n=i.customData.token;n&&(e=this._applyCustomSettingsQuery(e,n)),t=this._applyCustomSettingsBody(t,i.customData)}return new Promise((n,s)=>{const o=new XMLHttpRequest;o.addEventListener("load",e=>this._processTokenResponseHandler(e,n,s)),o.addEventListener("error",e=>this._processTokenResponseErrorHandler(e,s)),o.open("POST",e),o.setRequestHeader("content-type","application/x-www-form-urlencoded"),i.customData&&this._applyCustomSettingsHeaders(o,i.customData);try{o.send(t)}catch(e){s(new Error("Client request error: "+e.message))}})}_processTokenResponseHandler(e,t,i){const n=e.target.status,s=e.target.response;if(404===n){return void i(new Error("Authorization URI is invalid. Received status 404."))}if(n>=400&&n<500){return void i(new Error("Client error: "+s))}if(n>=500){return void i(new Error("Authorization server error. Response code is "+n))}let o;try{o=this._processCodeResponse(s,e.target.getResponseHeader("content-type"))}catch(e){return void i(new Error(e.message))}t(o)}_processTokenResponseErrorHandler(e,t){const i=e.target.status;let n="The request to the authorization server failed.";i&&(n+=" Response code is: "+i),t(new Error(n))}_processCodeResponse(e,t){if(!e)throw new Error("Code response body is empty.");let i;return-1!==t.indexOf("json")?(i=JSON.parse(e),Object.keys(i).forEach(e=>{const t=this._camel(e);t&&(i[t]=i[e])})):(i={},e.split("&").forEach(e=>{const t=e.split("="),n=t[0],s=this._camel(n),o=decodeURIComponent(t[1]);i[n]=o,i[s]=o})),i}_handleTokenInfo(e){return this._tokenInfo=e,e.interactive=this._settings.interactive,"error"in e?this._dispatchError({message:e.errorDescription||"The request is invalid.",code:e.error,state:this._state,interactive:this._settings.interactive}):this._dispatchResponse(e),this.__frameLoadTimeout&&(clearTimeout(this.__frameLoadTimeout),this.__frameLoadTimeout=void 0),this._settings=void 0,this._exchangeCodeValue=void 0,e}_handleTokenCodeError(e){throw this._dispatchError({message:"Couldn't connect to the server. "+e.message,code:"request_error",state:this._state,interactive:this._settings.interactive}),this.clear(),e}_camel(e){let t,i=0,n=!1;for(;t=e[i];)("_"===t||"-"===t)&&i+1<e.length&&(e=e.substr(0,i)+e[i+1].toUpperCase()+e.substr(i+2),n=!0),i++;return n?e:void 0}async authorizePassword(e){this._settings=e;const t=e.accessTokenUri,i=this._getPasswordBody(e);try{const n=await this._requestToken(t,i,e),s=this._handleTokenInfo(n);return this.clear(),s}catch(e){this._handleTokenCodeError(e)}}_getPasswordBody(e){let t="grant_type=password";return t+="&username="+encodeURIComponent(e.username),t+="&password="+encodeURIComponent(e.password),e.clientId&&(t+="&client_id="+encodeURIComponent(e.clientId)),e.scopes&&e.scopes.length&&(t+="&scope="+encodeURIComponent(e.scopes.join(" "))),t}async authorizeClientCredentials(e){this._settings=e;const t=e.accessTokenUri,i=this._getClientCredentialsBody(e);try{const n=await this._requestToken(t,i,e),s=this._handleTokenInfo(n);return this.clear(),s}catch(e){this._handleTokenCodeError(e)}}_getClientCredentialsBody(e){let t="grant_type=client_credentials";return e.clientId&&(t+="&client_id="+encodeURIComponent(e.clientId)),e.clientSecret&&(t+="&client_secret="+encodeURIComponent(e.clientSecret)),e.scopes&&e.scopes.length&&(t+="&scope="+this._computeScope(e.scopes)),t}async authorizeCustomGrant(e){this._settings=e;const t=e.accessTokenUri,i=this._getCustomGrantBody(e);try{const n=await this._requestToken(t,i,e),s=this._handleTokenInfo(n);return this.clear(),s}catch(e){this._handleTokenCodeError(e)}}_getCustomGrantBody(e){const t=["grant_type="+encodeURIComponent(e.type)];return e.clientId&&(t[t.length]="client_id="+encodeURIComponent(e.clientId)),e.clientSecret&&(t[t.length]="client_secret="+encodeURIComponent(e.clientSecret)),e.scopes&&e.scopes.length&&(t[t.length]="scope="+this._computeScope(e.scopes)),e.redirectUri&&(t[t.length]="redirect_uri="+encodeURIComponent(e.redirectUri)),e.username&&(t[t.length]="username="+encodeURIComponent(e.username)),e.password&&(t[t.length]="password="+encodeURIComponent(e.password)),t.join("&")}_applyCustomSettingsQuery(e,t){return t&&t.parameters?(e+=-1===e.indexOf("?")?"?":"&",e+=t.parameters.map(e=>{let t=e.value;return t&&(t=encodeURIComponent(t)),encodeURIComponent(e.name)+"="+t}).join("&")):e}_applyCustomSettingsHeaders(e,t){t&&t.token&&t.token.headers&&t.token.headers.forEach(t=>{try{e.setRequestHeader(t.name,t.value)}catch(e){}})}_applyCustomSettingsBody(e,t){return t&&t.token&&t.token.body?e+="&"+t.token.body.map((function(e){let t=e.value;return t&&(t=encodeURIComponent(t)),encodeURIComponent(e.name)+"="+t})).join("&"):e}_dispatchError(e){const t=new CustomEvent("oauth2-error",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(t)}_dispatchCodeResponse(e){const t=new CustomEvent("oauth2-code-response",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(t),this.clear()}_dispatchResponse(e){const t=new CustomEvent("oauth2-token-response",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(t)}get ontokenerror(){return this["_onoauth2-error"]}set ontokenerror(e){this._registerCallback("oauth2-error",e)}get ontokenresponse(){return this["_onoauth2-token-response"]}set ontokenresponse(e){this._registerCallback("oauth2-token-response",e)}_registerCallback(e,t){const i=`_on${e}`;this[i]&&this.removeEventListener(e,this[i]),"function"==typeof t?(this[i]=t,this.addEventListener(e,t)):this[i]=null}}window.customElements.define("oauth2-authorization",ca);
/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
const da="https://anypoint.mulesoft.com",pa="authorization_code",ua={_clientId:null,get clientId(){return ua._clientId},set clientId(e){e&&e!==ua._clientId?(ua._clientId=e,ua.initAuth2()):ua._clientId=e},_redirectUri:null,get redirectUri(){return ua._redirectUri},set redirectUri(e){e&&e!==ua._redirectUri?(ua._redirectUri=e,ua.initAuth2()):ua._redirectUri=e},_authType:pa,get authType(){return ua._authType},set authType(e){e&&e!==ua._authType?(ua._authType=e,ua.initAuth2()):ua._authType=e},authorizationUri:`${da}/accounts/api/v2/oauth2/authorize`,accessTokenUri:`${da}/accounts/api/v2/oauth2/token`,logoutUri:`${da}/accounts/api/logout/`,_signedIn:!1,get signedIn(){return ua._signedIn},set signedIn(e){if(e!==ua._signedIn){ua._signedIn=e;for(let t=0;t<ua.signinAwares.length;t++)ua.signinAwares[t]._signedIn=e}},_accessToken:null,get accessToken(){return ua._accessToken},set accessToken(e){if(e!==ua._accessToken){ua._accessToken=e;for(let t=0;t<ua.signinAwares.length;t++)ua.signinAwares[t]._accessToken=e}},signinAwares:[],_forceOauthEvents:null,get forceOauthEvents(){return ua._forceOauthEvents},set forceOauthEvents(e){ua._forceOauthEvents!==e&&(ua._forceOauthEvents=e,e?(ua._clearOauthAuthorization(),ua._observeWindowEvents()):(ua._setOauthAuthorization(),ua._unobserveWindowEvents()))},init:function(e){ua.forceOauthEvents||ua._setOauthAuthorization(),ua.initAuth2(e)},_setOauthAuthorization(){let e;if(ua._oauthFactory)e=ua._oauthFactory;else{const t='oauth2-authorization[data-owner="anypoint-signin-aware"]';e=document.body.querySelector(t)}e||(ua._oauthFactory=document.createElement("oauth2-authorization"),ua._oauthFactory.dataset.owner="anypoint-signin-aware",ua._oauthFactory.addEventListener("oauth2-error",ua._oauth2ErrorHandler),ua._oauthFactory.addEventListener("oauth2-token-response",ua._oauth2TokenHandler),document.body.appendChild(ua._oauthFactory))},_clearOauthAuthorization:function(){ua._oauthFactory&&(ua._oauthFactory.removeEventListener("oauth2-error",ua._oauth2ErrorHandler),ua._oauthFactory.removeEventListener("oauth2-token-response",ua._oauth2TokenHandler),document.body.removeChild(ua._oauthFactory),ua._oauthFactory=void 0)},_observeWindowEvents(){window.addEventListener("oauth2-error",ua._oauth2ErrorHandler),window.addEventListener("oauth2-token-response",ua._oauth2TokenHandler)},_unobserveWindowEvents(){window.removeEventListener("oauth2-error",ua._oauth2ErrorHandler),window.removeEventListener("oauth2-token-response",ua._oauth2TokenHandler)},initAuth2:function(e){ua._initSignIn(e)},generateState:function(){let e="";const t="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";for(let i=0;i<6;i++)e+=t.charAt(Math.floor(Math.random()*t.length));return e},_initSignIn:function(e){ua.clientId&&ua.redirectUri&&ua.signIn(!1,e)},assertAuthInitialized:function(){if(!ua.clientId)throw new Error("AuthEngine not initialized. clientId has not been configured.");if(!ua.redirectUri)throw new Error("AuthEngine not initialized. redirectUri has not been configured.")},oauth2Config:function(){ua._lastState=ua.generateState();const e={type:ua.authType,authorizationUri:ua.authorizationUri,clientId:ua.clientId,redirectUri:ua.redirectUri,state:ua._lastState,scopes:ua.scopes};return ua.authType===pa&&(e.accessTokenUri=ua.accessTokenUri,e.overrideExchangeCodeFlow=!0),e},signIn:function(e,t){if(!ua._oauthFactory&&!ua.forceOauthEvents)return;ua.assertAuthInitialized();const i=ua.oauth2Config();if(!1===e&&(i.interactive=e),ua.forceOauthEvents){const e=new CustomEvent("oauth2-token-requested",{bubbles:!0,composed:!0,detail:i});(t||document.body).dispatchEvent(e)}else ua._oauthFactory.authorize(i)},signOut:function(){return ua._logout().catch(()=>{}).then(()=>ua.setAuthData())},_oauth2TokenHandler:function(e){const t=e.detail;t&&ua._lastState===e.detail.state&&(t.accessToken?ua.setAuthData(t.accessToken):ua.setAuthData())},_oauth2ErrorHandler:function(e){if(ua._lastState!==e.detail.state)return;const t=e.detail.message;ua.accessToken=null,ua.signedIn=!1;for(let i=0;i<ua.signinAwares.length;i++)ua.signinAwares[i]._updateStatus(),!1!==e.detail.interactive&&ua.signinAwares[i].errorNotify({message:t})},setAuthData:function(e){ua.accessToken=e,ua.signedIn=!!e;for(let e=0;e<ua.signinAwares.length;e++)ua.signinAwares[e]._updateStatus()},_logout:function(){const e=ua.logoutUri;return new Promise((function(t,i){const n=new XMLHttpRequest;n.open("GET",e),ua.accessToken&&n.setRequestHeader("Authorization","bearer "+ua.accessToken),n.addEventListener("load",(function(e){if(e.target.status>299)return i(new Error("Delete token request failed."));t()})),n.addEventListener("error",(function(e){const t=e.target.status;let n="Unable to delete the token.";t&&(n+=" Response code is: "+t),i(new Error(n))}));try{n.send()}catch(e){i(new Error("Unable to send the request."))}}))},attachSigninAware:function(e){-1===ua.signinAwares.indexOf(e)&&(ua.signinAwares.push(e),void 0!==e.forceOauthEvents&&(ua.forceOauthEvents=e.forceOauthEvents),e._signedIn=ua.signedIn,e._accessToken=ua.accessToken),ua._initialized||(ua.init(e),ua._initialized=!0)},detachSigninAware:function(e){const t=ua.signinAwares.indexOf(e);-1!==t&&ua.signinAwares.splice(t,1)},notifyError:function(e){for(let t=0;t<ua.signinAwares.length;t++)ua.signinAwares[t].errorNotify({message:e})}};window.customElements.define("anypoint-signin-aware",class extends ce{static get properties(){return{authType:{type:String},clientId:{type:String},redirectUri:{type:String},scopes:{type:String},forceOauthEvents:{type:Boolean}}}get accessToken(){return this._accessToken}get _accessToken(){return this.__accessToken}set _accessToken(e){this.__accessToken!==e&&(this.__accessToken=e,this.dispatchEvent(new CustomEvent("accesstoken-changed",{detail:{value:e}})))}get signedIn(){return this._signedIn}get _signedIn(){return this.__signedIn}set _signedIn(e){this.__signedIn!==e&&(this.__signedIn=e,this.dispatchEvent(new CustomEvent("signedin-changed",{detail:{value:e}})))}get redirectUri(){return this._redirectUri}set redirectUri(e){this._redirectUri!==e&&(e&&-1===(e=String(e)).indexOf("http")&&(e=void 0),this._redirectUri=e,this._redirectUriChanged(e))}get clientId(){return this._clientId}set clientId(e){this._clientId!==e&&(e&&(e=String(e)),this._clientId=e,this._clientIdChanged(e))}get authType(){return this._authType}set authType(e){this._authType!==e&&(e&&(e=String(e)),this._authType=e,this._authTypeChanged(e))}get scopes(){return this._scopes}set scopes(e){this._scopes!==e&&(e&&(e=String(e)),this._scopes=e,this._scopesChanged(e))}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.setAttribute("aria-hidden","true"),ua.attachSigninAware(this)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),ua.detachSigninAware(this)}signIn(){ua.signIn(!0,this)}signOut(){return ua.signOut()}errorNotify(e){this.dispatchEvent(new CustomEvent("anypoint-signin-aware-error",{bubbles:!0,composed:!0,detail:e}))}_clientIdChanged(e){ua.clientId=e}_authTypeChanged(e){ua.authType=e}_scopesChanged(e){const t=e&&e.split(" ");ua.scopes=t}_redirectUriChanged(e){ua.redirectUri=e}_updateStatus(){let e;e=this.signedIn?"anypoint-signin-aware-success":"anypoint-signin-aware-signed-out",this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:this.user}))}});
/**
@license
Copyright 2019 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/var fa=le`
  .buttonText {
    font-family: var(--arc-font-family, -apple-system, 'BlinkMacSystemFont', 'Helvetica Neue', 'Segoe UI', sans-serif);
    font-size: var(--arc-font-body1-font-size, 1rem);
    font-weight: var(--anypoint-signin-bold-font-weight, 600);
  }
`;const _a={STANDARD:"Sign in",WIDE:"Sign in with Anypoint Platform"},ma={STANDARD:"standard",WIDE:"wide"};window.customElements.define("anypoint-signin",class extends ha{static get styles(){return[ha.styles,le`
        ${fa}
      `]}render(){const{authType:e,clientId:t,forceOauthEvents:i,labelSignin:n,labelSignout:s,redirectUri:o,scopes:r,signedIn:a,width:l}=this,h=this._computeSigninLabel(n,l);return V`
      <anypoint-signin-aware
        .clientId="${t}"
        .redirectUri="${o}"
        .scopes="${r}"
        .authType="${e}"
        .forceOauthEvents="${i}"
        @accesstoken-changed="${this._atHandler}"
        @signedin-changed="${this._signedinHandler}"
      ></anypoint-signin-aware>
      <div class="buttonText ${a?"signOut":"signIn"}">${a?s:h}</div>
    `}get signedIn(){return this._signedIn}set signedIn(e){const t=this._signedIn;t!==e&&(this._signedIn=e,this.requestUpdate("signedIn",t),this.dispatchEvent(new CustomEvent("signedin-changed",{detail:{value:e}})))}get accessToken(){return this._accessToken}set accessToken(e){const t=this._accessToken;t!==e&&(this._accessToken=e,this.requestUpdate("accessToken",t),this.dispatchEvent(new CustomEvent("accesstoken-changed",{detail:{value:e}})))}get onsignedin(){return this["_onsignedin-changed"]}set onsignedin(e){this._registerCallback("signedin-changed",e)}get onaccesstoken(){return this["_onaccesstoken-changed"]}set onaccesstoken(e){this._registerCallback("accesstoken-changed",e)}get material(){return this._material}set material(e){this._material!==e&&(this.compatibility=!e,this._material=e)}static get properties(){return{clientId:{type:String},redirectUri:{type:String},signedIn:{type:Boolean},accessToken:{type:String},labelSignin:{type:String},labelSignout:{type:String},scopes:{type:String},authType:{type:String},width:{type:String},material:{type:Boolean},forceOauthEvents:{type:Boolean}}}get authAware(){return this.shadowRoot.querySelector("anypoint-signin-aware")}constructor(){super(),this.emphasis="high",this.width="wide",this.labelSignout="Sign out",this.compatibility=!0,this._keyDownHandler=this._keyDownHandler.bind(this),this._clickHandler=this._clickHandler.bind(this)}connectedCallback(){if(super.connectedCallback&&super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),!this.hasAttribute("aria-labelledby")&&!this.hasAttribute("aria-label")){const e="Press the button to sign in with Anypoint Platform";this.setAttribute("aria-label",e)}this.addEventListener("keydown",this._keyDownHandler),this.addEventListener("click",this._clickHandler)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("keydown",this._keyDownHandler),this.removeEventListener("click",this._clickHandler)}_registerCallback(e,t){const i=`_on${e}`;this[i]&&this.removeEventListener(e,this[i]),"function"==typeof t?(this[i]=t,this.addEventListener(e,t)):this[i]=null}_computeSigninLabel(e,t){if(e)return e;switch(t){case ma.WIDE:return _a.WIDE;case ma.STANDARD:return _a.STANDARD;default:return _a.WIDE}}signIn(){this.authAware.signIn()}signOut(){this.dispatchEvent(new CustomEvent("anypoint-signout-attempted",{bubbles:!0,composed:!0})),this.authAware.signOut()}_keyDownHandler(e){"Space"!==e.code&&"Enter"!==e.code&&"NumpadEnter"!==e.code||this._handleActivateEvent(e)}_clickHandler(){this.signedIn?this.signOut():this.signIn()}_handleActivateEvent(e){e.preventDefault(),this.signedIn?this.signOut():this.signIn()}_atHandler(e){this.accessToken=e.detail.value}_signedinHandler(e){this.signedIn=e.detail.value}});var ga="<html>\n  <head>\n    <script type=\"module\">\n      import '@anypoint-web-components/anypoint-signin/anypoint-signin.js';\n    <\/script>\n  </head>\n  <body>\n    <anypoint-signin></anypoint-signin>\n\n    <script>\n    (async () => {\n      await customElements.whenDefined('anypoint-signin');\n      const button = document.body.querySelector('anypoint-signin');\n      button.onsignedin = (e) {\n        if (e.target.signedIn) {\n          console.log('User is signed in');\n        } else {\n          console.log('User is not signed in');\n        }\n      };\n    })();\n    <\/script>\n  </body>\n</html>",va="import { LitElement, html } from 'lit-element';\nimport '@anypoint-web-components/anypoint-signin/anypoint-signin.js';\n\nclass SampleElement extends LitElement {\n\n  constructor() {\n    super();\n    this.clientId = '...';\n    this.redirectUri = '...';\n    this.scopes = 'profile';\n  }\n\n  render() {\n    return html`\n      <anypoint-signin\n        .clientId=\"${this.clientId}\"\n        .scopes=\"${this.scopes}\"\n        .redirectUri=\"${this.redirectUri}\"\n        @signedin-changed=\"${this._signedinHandler}\"\n      ></anypoint-signin>\n    `;\n  }\n\n  _signedinHandler(e) {\n    this.isSignedIn = e.target.signedIn;\n  }\n}\ncustomElements.define('sample-element', SampleElement);\n",ya="async function exchangeCode(e) {\n  const { code } = e.detail;\n  const init = {\n    method: 'POST',\n    body: code\n  };\n  const tokenExchangeUrl = 'YOUR SERVER URL';\n  const response = await fetch(tokenExchangeUrl, init);\n  const token = await response.json();\n  const button = document.body.querySelector('anypoint-signin');\n  button.signedIn = !!token;\n};\nwindow.addEventListener('oauth2-code-response', exchangeCode);\n",ba="import { LitElement, html } from 'lit-element';\nimport '@anypoint-web-components/anypoint-signin/anypoint-signin.js';\n\nclass SampleElement extends LitElement {\n  constructor() {\n    super();\n    ...\n    this.exchangeCode = this.exchangeCode.bind(this);\n  }\n\n  connectedCallback() {\n    super.connectedCallback();\n    window.addEventListener('oauth2-code-response', this.exchangeCode);\n  }\n\n  disconnectedCallback() {\n    super.disconnectedCallback();\n    window.removeEventListener('oauth2-code-response', this.exchangeCode);\n  }\n\n  async exchangeCode(e) {\n    const { code } = e.detail;\n    const init = {\n      method: 'POST',\n      body: code\n    };\n    const tokenExchangeUrl = 'YOUR SERVER URL';\n    const response = await fetch(tokenExchangeUrl, init);\n    this.token = await response.json();\n    const button = this.shadowRoot.querySelector('anypoint-signin');\n    button.signedIn = !!this.token;\n  }\n}\ncustomElements.define('sample-element', SampleElement);\n",wa="const express = require('express');\nconst https = require('https');\n\nconst router = express.Router();\n\nconst apiBase = 'https://anypoint.mulesoft.com/accounts/api';\nconst tokenEndpoint = `${apiBase}/v2/oauth2/token`;\n\n/**\n * A route that support authorization for anypoint-signing button.\n */\nclass AuthApiRoute extends BaseApi {\n  /**\n   * Exchanges authorization code for access token in Anypoint service.\n   * The request body is the received code.\n   *\n   * @param {Object} req\n   * @param {Object} res\n   */\n  async anypointTokenRequest(req, res) {\n    const { body } = req;\n    if (!body || typeof body !== 'string') {\n      res.status(400).send({\n        error: true,\n        message: 'Missing payload message'\n      });\n      return;\n    }\n    try {\n      const data = await this._exchangeToken(body);\n      res.status(200).send({\n        error: false,\n        data,\n      });\n    } catch (e) {\n      res.status(500).send({\n        error: true,\n        message: e.message\n      });\n    }\n  }\n  /**\n   * Exchanges code for access token.\n   * @param {String} code Received authrization code\n   * @return {Promise}\n   */\n  async _exchangeToken(code) {\n    const body = this._getTokenExchangeBody(code);\n    const [mediaType, rawBody] = await this._makeRequest(body);\n    return this._processCodeResponse(rawBody, mediaType);\n  }\n  /**\n   * Creates message body for OAuth 2 token exchange\n   * @param {String} code Received authrization code\n   * @return {String}\n   */\n  _getTokenExchangeBody(code) {\n    const parts = [];\n    parts[parts.length] = ['grant_type', 'authorization_code'];\n    parts[parts.length] = ['client_id', 'YOUR CLIENT ID'];\n    parts[parts.length] = ['redirect_uri', 'YOUR REDIRECT URI'];\n    parts[parts.length] = ['client_secret', 'YOUR CLIENT SECRET'];\n    parts[parts.length] = ['code', code];\n    return parts\n      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)\n      .join('&');\n  }\n  /**\n   * Makes a request to Anypoint authorization server.\n   * @param {String} body\n   * @return {Promise}\n   */\n  _makeRequest(body) {\n    const options = {\n      method: 'POST',\n      headers: {\n        'content-type': 'application/x-www-form-urlencoded'\n      }\n    };\n    return new Promise((resolve, reject) => {\n      const req = https.request(tokenEndpoint, options, (res) => {\n        const { statusCode } = res;\n\n        if (statusCode >= 500) {\n          const message = 'Authorization server error.';\n          reject(new Error(message));\n          return;\n        }\n\n        res.setEncoding('utf8');\n        const contentType = res.headers['content-type'];\n        let data = '';\n\n        res.on('data', (chunk) => {\n          data += chunk;\n        });\n\n        res.on('end', () => {\n          if (statusCode >= 400 && statusCode < 500) {\n            reject(new Error(`Client error: ${data}`));\n          } else {\n            resolve([contentType, data]);\n          }\n        });\n      });\n\n      req.on('error', (e) => {\n        reject(e.message);\n        logging.error(e);\n      });\n\n      req.write(body);\n      req.end();\n    });\n  }\n  /**\n   * Processes token request body and produces map of values.\n   *\n   * @param {String} body Body received in the response.\n   * @param {String} contentType Response content type.\n   * @return {Object} Response as an object.\n   * @throws {Error} Exception when body is invalid.\n   */\n  _processCodeResponse(body, contentType) {\n    if (!body) {\n      throw new Error('Code response body is empty.');\n    }\n    let tokenInfo;\n    if (contentType.indexOf('json') !== -1) {\n      tokenInfo = JSON.parse(body);\n    } else {\n      tokenInfo = {};\n      body.split('&').forEach((p) => {\n        const item = p.split('=');\n        const name = item[0];\n        const value = decodeURIComponent(item[1]);\n        tokenInfo[name] = value;\n      });\n    }\n    return tokenInfo;\n  }\n}\n\nconst api = new AuthApiRoute();\nrouter.post('/token', api.anypointTokenRequest.bind(api));\nmodule.exports = router;\n";const Ca="https://awc.dev/api/v1/auth/anypoint-token";(new class extends ue{constructor(){super(),this.initObservableProperties(["buttonWidth","status","code","accessToken"]),this._componentName="anypoint-signin",this.demoStates=["Anypoint"],this.buttonWidth="wide",this._demoStateHandler=this._demoStateHandler.bind(this),this._toggleMainOption=this._toggleMainOption.bind(this),this._widthHandler=this._widthHandler.bind(this),this._signedinChangedHandler=this._signedinChangedHandler.bind(this),this._oauth2CodeHandler=this._oauth2CodeHandler.bind(this),this._errorHandler=this._errorHandler.bind(this),this.scopes="profile",this.redirectUri="https://auth.advancedrestclient.com/oauth-popup.html",this.clientId="2e38d46b60c5476584cdecba8b516711",window.addEventListener("oauth2-code-response",this._oauth2CodeHandler),window.addEventListener("anypoint-signin-aware-error",this._errorHandler)}_toggleMainOption(e){const{name:t,checked:i}=e.target;this[t]=i}_demoStateHandler(e){const t=e.detail.value;this.outlined=1===t,this.compatibility=2===t}_widthHandler(e){const{checked:t,value:i}=e.target;t&&(this.buttonWidth=i)}_signedinChangedHandler(e){const{value:t}=e.detail;this.status=String(t)}_oauth2CodeHandler(e){const{code:t}=e.detail;this.code=t,setTimeout(()=>this._exchangeCode(t))}async _exchangeCode(e){const t={code:e,redirectUri:this.redirectUri,clientId:this.clientId},i={method:"POST",body:JSON.stringify(t),headers:{"content-type":"application/json"}};try{const e=await fetch(Ca,i),t=await e.json();e.ok?this.accessToken=t.data.accessToken:(this._toastEreror(t.message),console.error(t))}catch(e){this._toastEreror(e.message),console.error(e)}}_toastEreror(e){const t=document.getElementById("errorToast");t.text=e,t.opened=!0}_errorHandler(e){const{message:t}=e.detail;this._toastEreror(t)}_demoTemplate(){const{demoStates:e,darkThemeActive:t,buttonWidth:i,scopes:n,redirectUri:s,clientId:o,status:r,code:a,accessToken:l}=this;return V`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the sign in button element with various configuration options.
        </p>
        <arc-interactive-demo
          .states="${e}"
          @state-chanegd="${this._demoStateHandler}"
          ?dark="${t}"
        >
          <anypoint-signin
            .width="${i}"
            .clientId="${o}"
            .scopes="${n}"
            .redirectUri="${s}"
            slot="content"
            @signedin-changed="${this._signedinChangedHandler}"
          ></anypoint-signin>
          <label slot="options" id="listTypeLabel">List type</label>
          <anypoint-radio-group slot="options" selectable="anypoint-radio-button" aria-labelledby="listTypeLabel">
            <anypoint-radio-button @change="${this._widthHandler}" checked name="width" value="wide"
              >Wide width</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._widthHandler}" name="width" value="standard"
              >Standard width</anypoint-radio-button
            >
          </anypoint-radio-group>
        </arc-interactive-demo>

        <section class="result">
          <h3>Authorization status</h3>
          <p>User signed in: <span>${r}</span></p>
          <p>Authorization code: <span>${a}</span></p>
          ${l?V`<p>Access token: <span>${l}</span></p>`:""}
          ${a&&!l?V`
                <p>
                  You should exchange this code for an access token.
                </p>
                <p>
                  Once exchanged, you can set the button signedIn attribute to true so that the button becomes a signout
                  button.
                </p>
                <p>
                  You can also just remove the button at this point or go to the next page in your flow.
                </p>
              `:""}
        </section>
      </section>
    `}_usageTemplate(){return V`<section class="documentation-section">
      <h3>Usage</h3>
      <p>
        Anypont sign in button is a web component and can be used in any
        web environment.
      </p>
      <p>
        Learn more about using web components at <a href="https://open-wc.org/" target="_blank">Open WC project</a>.
      </p>

      <h4>Installation</h4>
      <pre><code class="language-bash">npm install --save @anypoint-web-components/anypoint-signin</code></pre>

      <h4>In an html element</h4>
      <pre><code class="language-html">${ga}</code></pre>
      <h4>In a LitElement template</h4>
      <pre><code class="language-javascript">${va}</code></pre>

      <h4>Requesting a token</h4>
      <p>
        At the moment Anypoint authorization server only supports <b>authorization code</b>
        OAuth 2 flow.
      </p>
      <p>
        The button starts the authorization flow and returns authorization code.
        The code should be then used the exchange it to access token using a server component.
      </p>
      <h5>In an html file</h5>
      <pre><code class="language-javascript">${ya}</code></pre>
      <h5>In a LitElement element</h5>
      <pre><code class="language-javascript">${ba}</code></pre>

      <h4>Exchanging the code</h4>
      <p>
        Thwe server must make a request to Anypoint authorization server
        with OAuth 2 standard parameters in the request body.
        These are:
      </p>

      <ul>
        <li>"grant_type" - Always set to "authorization_code"</li>
        <li>"client_id" - The same client ID used in the button</li>
        <li>"code" - Received from the authorization server code</li>
        <li>"redirect_uri" - Registered in authorization server settings redirect URI</li>
        <li>"client_secret" - You will find client secret in your OAuth application details</li>
      </ul>

      <p>
        This parameters have to be sent to token endpoint as <code>application/x-www-form-urlencoded</code>
        request.
      </p>

      <h5>Authorization endpoint</h5>
      <pre><code class="language-http">https://anypoint.mulesoft.com/accounts/api/v2/oauth2/token</code></pre>

      <p>
        You can choose any language and library you like to create an API to exchange the code for token.
        Below we present Express route for Node.
      </p>

      <details>
        <summary>Express.js example</summary>
        <pre><code class="language-javascript">${wa}</code></pre>
      </details>
    </section>`}contentTemplate(){return this._initialized||(this._initialized=!0,setTimeout(()=>Prism.highlightAll())),V`
      <h2>Anypoint Sign In Button</h2>
      ${this._demoTemplate()}
      ${this._usageTemplate()}
      <paper-toast id="errorToast" duration="7000"></paper-toast>
    `}}).render()}]);