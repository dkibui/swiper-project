import{S as f,i as m,s as p,k as h,e as _,t as b,n as k,c as g,a as v,g as y,d as c,b as C,f as u,F as x,G as d,H as i,I as O,J as S}from"../chunks/vendor-5c9a240d.js";const{document:T}=S;function q(o){let t,e,a,n,r;return{c(){t=h(),e=_("button"),a=b("Click"),this.h()},l(s){t=k(s),e=g(s,"BUTTON",{class:!0});var l=v(e);a=y(l,"Click"),l.forEach(c),this.h()},h(){C(e,"class","btn")},m(s,l){u(s,t,l),u(s,e,l),x(e,a),n||(r=[d(T.body,"click",o[0]),d(e,"click",o[0])],n=!0)},p:i,i,o:i,d(s){s&&c(t),s&&c(e),n=!1,O(r)}}}function $(o){let t=!1;function e(a){a.stopPropagation();const n=document.querySelector(".btn");a.target===n?(t=!0,console.log(t,a.target)):(t=!1,console.log(t,"Outside"))}return[e]}class B extends f{constructor(t){super();m(this,t,$,q,p,{})}}export{B as default};