import{S as re,i as ie,s as ae,e as v,c as w,a as y,d as u,b as c,f as h,t as T,g as H,F as b,h as Be,O as xe,P as Re,Q as Ae,R as Le,T as ye,k as G,U as je,l as $e,n as V,V as Ee,G as et,x as z,r as Ie,u as E,w as Ge,K as de,L as _e,M as he,N as ge,j as S,m as P,o as O,v as D,D as R,H as ve,W as Ne,X as tt,Y as st,Z as lt,_ as rt,$ as A}from"../chunks/vendor-7aaed8c5.js";/* empty css                               */function Te(a,e,l){const t=a.slice();return t[3]=e[l],t}function He(a){let e,l,t,s=a[0][1],i=[];for(let n=0;n<s.length;n+=1)i[n]=Ce(Te(a,s,n));return{c(){e=v("div");for(let n=0;n<i.length;n+=1)i[n].c();this.h()},l(n){e=w(n,"DIV",{class:!0});var $=y(e);for(let m=0;m<i.length;m+=1)i[m].l($);$.forEach(u),this.h()},h(){c(e,"class","slide svelte-1ese3ry")},m(n,$){h(n,e,$);for(let m=0;m<i.length;m+=1)i[m].m(e,null);t=!0},p(n,$){if(a=n,$&1){s=a[0][1];let m;for(m=0;m<s.length;m+=1){const _=Te(a,s,m);i[m]?i[m].p(_,$):(i[m]=Ce(_),i[m].c(),i[m].m(e,null))}for(;m<i.length;m+=1)i[m].d(1);i.length=s.length}},i(n){t||(xe(()=>{l||(l=Re(e,Le,{duration:400,easing:Ae},!0)),l.run(1)}),t=!0)},o(n){l||(l=Re(e,Le,{duration:400,easing:Ae},!1)),l.run(0),t=!1},d(n){n&&u(e),ye(i,n),n&&l&&l.end()}}}function Ce(a){let e,l=a[3]+"",t;return{c(){e=v("p"),t=T(l),this.h()},l(s){e=w(s,"P",{class:!0});var i=y(e);t=H(i,l),i.forEach(u),this.h()},h(){c(e,"class","svelte-1ese3ry")},m(s,i){h(s,e,i),b(e,t)},p(s,i){i&1&&l!==(l=s[3]+"")&&Be(t,l)},d(s){s&&u(e)}}}function it(a){let e,l,t=a[0][0]+"",s,i,n,$,m,_,j,g,I,o,f=a[1]&&He(a);return{c(){e=v("div"),l=v("p"),s=T(t),i=G(),n=je("svg"),$=je("line"),m=je("line"),_=G(),f&&f.c(),j=$e(),this.h()},l(r){e=w(r,"DIV",{class:!0,"aria-expanded":!0});var d=y(e);l=w(d,"P",{class:!0});var B=y(l);s=H(B,t),B.forEach(u),i=V(d),n=Ee(d,"svg",{class:!0,height:!0,width:!0});var M=y(n);$=Ee(M,"line",{x1:!0,y1:!0,x2:!0,y2:!0}),y($).forEach(u),m=Ee(M,"line",{x1:!0,y1:!0,x2:!0,y2:!0}),y(m).forEach(u),M.forEach(u),d.forEach(u),_=V(r),f&&f.l(r),j=$e(),this.h()},h(){c(l,"class","svelte-1ese3ry"),c($,"x1","0"),c($,"y1","6"),c($,"x2","12"),c($,"y2","6"),c(m,"x1","6"),c(m,"y1","12"),c(m,"x2","6"),c(m,"y2","0"),c(n,"class","svg svelte-1ese3ry"),c(n,"height","12"),c(n,"width","12"),c(e,"class","btn svelte-1ese3ry"),c(e,"aria-expanded",a[1])},m(r,d){h(r,e,d),b(e,l),b(l,s),b(e,i),b(e,n),b(n,$),b(n,m),h(r,_,d),f&&f.m(r,d),h(r,j,d),g=!0,I||(o=et(e,"click",a[2]),I=!0)},p(r,[d]){(!g||d&1)&&t!==(t=r[0][0]+"")&&Be(s,t),(!g||d&2)&&c(e,"aria-expanded",r[1]),r[1]?f?(f.p(r,d),d&2&&z(f,1)):(f=He(r),f.c(),z(f,1),f.m(j.parentNode,j)):f&&(Ie(),E(f,1,1,()=>{f=null}),Ge())},i(r){g||(z(f),g=!0)},o(r){E(f),g=!1},d(r){r&&u(e),r&&u(_),f&&f.d(r),r&&u(j),I=!1,o()}}}function at(a,e,l){let{entry:t}=e,s=!1;const i=()=>l(1,s=!s);return a.$$set=n=>{"entry"in n&&l(0,t=n.entry)},[t,s,i]}class nt extends re{constructor(e){super();ie(this,e,at,it,ae,{entry:0})}}function ot(a){let e,l;const t=a[1].default,s=de(t,a,a[0],null);return{c(){e=v("section"),s&&s.c(),this.h()},l(i){e=w(i,"SECTION",{class:!0});var n=y(e);s&&s.l(n),n.forEach(u),this.h()},h(){c(e,"class","svelte-gfmzv8")},m(i,n){h(i,e,n),s&&s.m(e,null),l=!0},p(i,[n]){s&&s.p&&(!l||n&1)&&_e(s,t,i,i[0],l?ge(t,i[0],n,null):he(i[0]),null)},i(i){l||(z(s,i),l=!0)},o(i){E(s,i),l=!1},d(i){i&&u(e),s&&s.d(i)}}}function ct(a,e,l){let{$$slots:t={},$$scope:s}=e;return a.$$set=i=>{"$$scope"in i&&l(0,s=i.$$scope)},[s,t]}class ft extends re{constructor(e){super();ie(this,e,ct,ot,ae,{})}}const ut=a=>({}),Fe=a=>({}),pt=a=>({}),Ue=a=>({}),mt=a=>({}),Ye=a=>({});function $t(a){let e,l,t,s,i,n,$;const m=a[1].image,_=de(m,a,a[0],Ye),j=a[1].description,g=de(j,a,a[0],Ue),I=a[1].link,o=de(I,a,a[0],Fe);return{c(){e=v("article"),l=v("div"),_&&_.c(),t=G(),s=v("div"),g&&g.c(),i=G(),n=v("div"),o&&o.c(),this.h()},l(f){e=w(f,"ARTICLE",{class:!0});var r=y(e);l=w(r,"DIV",{class:!0});var d=y(l);_&&_.l(d),d.forEach(u),t=V(r),s=w(r,"DIV",{class:!0});var B=y(s);g&&g.l(B),B.forEach(u),i=V(r),n=w(r,"DIV",{class:!0});var M=y(n);o&&o.l(M),M.forEach(u),r.forEach(u),this.h()},h(){c(l,"class","img svelte-478b1q"),c(s,"class","svelte-478b1q"),c(n,"class","svelte-478b1q"),c(e,"class","svelte-478b1q")},m(f,r){h(f,e,r),b(e,l),_&&_.m(l,null),b(e,t),b(e,s),g&&g.m(s,null),b(e,i),b(e,n),o&&o.m(n,null),$=!0},p(f,[r]){_&&_.p&&(!$||r&1)&&_e(_,m,f,f[0],$?ge(m,f[0],r,mt):he(f[0]),Ye),g&&g.p&&(!$||r&1)&&_e(g,j,f,f[0],$?ge(j,f[0],r,pt):he(f[0]),Ue),o&&o.p&&(!$||r&1)&&_e(o,I,f,f[0],$?ge(I,f[0],r,ut):he(f[0]),Fe)},i(f){$||(z(_,f),z(g,f),z(o,f),$=!0)},o(f){E(_,f),E(g,f),E(o,f),$=!1},d(f){f&&u(e),_&&_.d(f),g&&g.d(f),o&&o.d(f)}}}function dt(a,e,l){let{$$slots:t={},$$scope:s}=e;return a.$$set=i=>{"$$scope"in i&&l(0,s=i.$$scope)},[s,t]}class _t extends re{constructor(e){super();ie(this,e,dt,$t,ae,{})}}function Ke(a,e,l){const t=a.slice();return t[1]=e[l],t}function ht(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{slot:!0,src:!0,alt:!0,class:!0}),this.h()},h(){c(e,"slot","image"),R(e.src,l=a[1].image)||c(e,"src",l),c(e,"alt",a[1].alt),c(e,"class","svelte-16qyudw")},m(t,s){h(t,e,s)},p:ve,d(t){t&&u(e)}}}function gt(a){let e,l=a[1].description+"",t;return{c(){e=v("p"),t=T(l),this.h()},l(s){e=w(s,"P",{slot:!0,class:!0});var i=y(e);t=H(i,l),i.forEach(u),this.h()},h(){c(e,"slot","description"),c(e,"class","svelte-16qyudw")},m(s,i){h(s,e,i),b(e,t)},p:ve,d(s){s&&u(e)}}}function vt(a){let e,l=a[1].link+"",t;return{c(){e=v("a"),t=T(l),this.h()},l(s){e=w(s,"A",{slot:!0,href:!0,class:!0});var i=y(e);t=H(i,l),i.forEach(u),this.h()},h(){c(e,"slot","link"),c(e,"href","/work"),c(e,"class","svelte-16qyudw")},m(s,i){h(s,e,i),b(e,t)},p:ve,d(s){s&&u(e)}}}function Qe(a){let e,l;return e=new _t({props:{$$slots:{link:[vt],description:[gt],image:[ht]},$$scope:{ctx:a}}}),{c(){S(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,s){O(e,t,s),l=!0},p(t,s){const i={};s&16&&(i.$$scope={dirty:s,ctx:t}),e.$set(i)},i(t){l||(z(e.$$.fragment,t),l=!0)},o(t){E(e.$$.fragment,t),l=!1},d(t){D(e,t)}}}function wt(a){let e,l,t=a[0],s=[];for(let n=0;n<t.length;n+=1)s[n]=Qe(Ke(a,t,n));const i=n=>E(s[n],1,1,()=>{s[n]=null});return{c(){for(let n=0;n<s.length;n+=1)s[n].c();e=$e()},l(n){for(let $=0;$<s.length;$+=1)s[$].l(n);e=$e()},m(n,$){for(let m=0;m<s.length;m+=1)s[m].m(n,$);h(n,e,$),l=!0},p(n,$){if($&1){t=n[0];let m;for(m=0;m<t.length;m+=1){const _=Ke(n,t,m);s[m]?(s[m].p(_,$),z(s[m],1)):(s[m]=Qe(_),s[m].c(),z(s[m],1),s[m].m(e.parentNode,e))}for(Ie(),m=t.length;m<s.length;m+=1)i(m);Ge()}},i(n){if(!l){for(let $=0;$<t.length;$+=1)z(s[$]);l=!0}},o(n){s=s.filter(Boolean);for(let $=0;$<s.length;$+=1)E(s[$]);l=!1},d(n){ye(s,n),n&&u(e)}}}function bt(a){let e,l;return e=new ft({props:{$$slots:{default:[wt]},$$scope:{ctx:a}}}),{c(){S(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,s){O(e,t,s),l=!0},p(t,[s]){const i={};s&16&&(i.$$scope={dirty:s,ctx:t}),e.$set(i)},i(t){l||(z(e.$$.fragment,t),l=!0)},o(t){E(e.$$.fragment,t),l=!1},d(t){D(e,t)}}}function zt(a){return[[{image:"img/recent/anchor.jpg",alt:"Anchor logo",description:"We recently worked with the founder of Anchor homes to help bring his brand to life. Learn more about this project...",link:"Learn more",slot:"one"},{image:"img/recent/liberte_project.jpg",alt:"liberte logo",description:"Liberte juices helps you liberate your thirst while boosting your health. This was a fun project to work on. See more details here...",link:"Learn more",slot:"two"},{image:"img/recent/imexafrica.jpg",alt:"Imex Africa logo",description:"Imex is a pan african civil engineering firm that specializes in supplies, construction and consultancy. See details...",link:"Learn more",slot:"three"},{image:"img/recent/eaglehr.jpg",alt:"eaglehr kenya logo",description:"Africa's economies are on the rise and Eaglehr is on the forefront of ensuring the labour market matches expected...",link:"Learn more",slot:"four"}]]}class kt extends re{constructor(e){super();ie(this,e,zt,bt,ae,{})}}function Xe(a,e,l){const t=a.slice();return t[1]=e[l],t}function yt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/8.jpg")||c(e,"src",l),c(e,"alt",""),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function jt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/11.jpg")||c(e,"src",l),c(e,"alt",""),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function Et(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/9.jpg")||c(e,"src",l),c(e,"alt",""),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function It(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/eaglehr-banners.jpg")||c(e,"src",l),c(e,"alt",""),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function Gt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/55.jpg")||c(e,"src",l),c(e,"alt",""),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function Vt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/6.jpg")||c(e,"src",l),c(e,"alt",""),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function Wt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/liberte.jpg")||c(e,"src",l),c(e,"alt",""),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function Mt(a){let e,l,t,s,i,n,$,m,_,j,g,I,o,f;return e=new A({props:{$$slots:{default:[yt]},$$scope:{ctx:a}}}),t=new A({props:{$$slots:{default:[jt]},$$scope:{ctx:a}}}),i=new A({props:{$$slots:{default:[Et]},$$scope:{ctx:a}}}),$=new A({props:{$$slots:{default:[It]},$$scope:{ctx:a}}}),_=new A({props:{$$slots:{default:[Gt]},$$scope:{ctx:a}}}),g=new A({props:{$$slots:{default:[Vt]},$$scope:{ctx:a}}}),o=new A({props:{$$slots:{default:[Wt]},$$scope:{ctx:a}}}),{c(){S(e.$$.fragment),l=G(),S(t.$$.fragment),s=G(),S(i.$$.fragment),n=G(),S($.$$.fragment),m=G(),S(_.$$.fragment),j=G(),S(g.$$.fragment),I=G(),S(o.$$.fragment)},l(r){P(e.$$.fragment,r),l=V(r),P(t.$$.fragment,r),s=V(r),P(i.$$.fragment,r),n=V(r),P($.$$.fragment,r),m=V(r),P(_.$$.fragment,r),j=V(r),P(g.$$.fragment,r),I=V(r),P(o.$$.fragment,r)},m(r,d){O(e,r,d),h(r,l,d),O(t,r,d),h(r,s,d),O(i,r,d),h(r,n,d),O($,r,d),h(r,m,d),O(_,r,d),h(r,j,d),O(g,r,d),h(r,I,d),O(o,r,d),f=!0},p(r,d){const B={};d&16&&(B.$$scope={dirty:d,ctx:r}),e.$set(B);const M={};d&16&&(M.$$scope={dirty:d,ctx:r}),t.$set(M);const L={};d&16&&(L.$$scope={dirty:d,ctx:r}),i.$set(L);const C={};d&16&&(C.$$scope={dirty:d,ctx:r}),$.$set(C);const J={};d&16&&(J.$$scope={dirty:d,ctx:r}),_.$set(J);const F={};d&16&&(F.$$scope={dirty:d,ctx:r}),g.$set(F);const x={};d&16&&(x.$$scope={dirty:d,ctx:r}),o.$set(x)},i(r){f||(z(e.$$.fragment,r),z(t.$$.fragment,r),z(i.$$.fragment,r),z($.$$.fragment,r),z(_.$$.fragment,r),z(g.$$.fragment,r),z(o.$$.fragment,r),f=!0)},o(r){E(e.$$.fragment,r),E(t.$$.fragment,r),E(i.$$.fragment,r),E($.$$.fragment,r),E(_.$$.fragment,r),E(g.$$.fragment,r),E(o.$$.fragment,r),f=!1},d(r){D(e,r),r&&u(l),D(t,r),r&&u(s),D(i,r),r&&u(n),D($,r),r&&u(m),D(_,r),r&&u(j),D(g,r),r&&u(I),D(o,r)}}}function Ze(a){let e,l,t,s;return l=new nt({props:{entry:a[1]}}),{c(){e=v("div"),S(l.$$.fragment),t=G(),this.h()},l(i){e=w(i,"DIV",{class:!0});var n=y(e);P(l.$$.fragment,n),t=V(n),n.forEach(u),this.h()},h(){c(e,"class","accordion-entry svelte-pdzmzj")},m(i,n){h(i,e,n),O(l,e,null),b(e,t),s=!0},p:ve,i(i){s||(z(l.$$.fragment,i),s=!0)},o(i){E(l.$$.fragment,i),s=!1},d(i){i&&u(e),D(l)}}}function St(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/logos/amsco.png")||c(e,"src",l),c(e,"alt","amsco logo"),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function Pt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/logos/anchor.png")||c(e,"src",l),c(e,"alt","Anchor builders logo"),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function Ot(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/logos/strathmore.png")||c(e,"src",l),c(e,"alt","Strathmore University logo"),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function Dt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/logos/eaglehr.png")||c(e,"src",l),c(e,"alt","Eaglehr kenya logo"),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function qt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/logos/absa.png")||c(e,"src",l),c(e,"alt","absa bank logo"),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function Bt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/logos/farmhouse.png")||c(e,"src",l),c(e,"alt","farmhouse sacco logo"),c(e,"class","svelte-pdzmzj")},m(t,s){h(t,e,s)},d(t){t&&u(e)}}}function Rt(a){let e,l,t,s,i,n,$,m,_,j,g,I;return e=new A({props:{$$slots:{default:[St]},$$scope:{ctx:a}}}),t=new A({props:{$$slots:{default:[Pt]},$$scope:{ctx:a}}}),i=new A({props:{$$slots:{default:[Ot]},$$scope:{ctx:a}}}),$=new A({props:{$$slots:{default:[Dt]},$$scope:{ctx:a}}}),_=new A({props:{$$slots:{default:[qt]},$$scope:{ctx:a}}}),g=new A({props:{$$slots:{default:[Bt]},$$scope:{ctx:a}}}),{c(){S(e.$$.fragment),l=G(),S(t.$$.fragment),s=G(),S(i.$$.fragment),n=G(),S($.$$.fragment),m=G(),S(_.$$.fragment),j=G(),S(g.$$.fragment)},l(o){P(e.$$.fragment,o),l=V(o),P(t.$$.fragment,o),s=V(o),P(i.$$.fragment,o),n=V(o),P($.$$.fragment,o),m=V(o),P(_.$$.fragment,o),j=V(o),P(g.$$.fragment,o)},m(o,f){O(e,o,f),h(o,l,f),O(t,o,f),h(o,s,f),O(i,o,f),h(o,n,f),O($,o,f),h(o,m,f),O(_,o,f),h(o,j,f),O(g,o,f),I=!0},p(o,f){const r={};f&16&&(r.$$scope={dirty:f,ctx:o}),e.$set(r);const d={};f&16&&(d.$$scope={dirty:f,ctx:o}),t.$set(d);const B={};f&16&&(B.$$scope={dirty:f,ctx:o}),i.$set(B);const M={};f&16&&(M.$$scope={dirty:f,ctx:o}),$.$set(M);const L={};f&16&&(L.$$scope={dirty:f,ctx:o}),_.$set(L);const C={};f&16&&(C.$$scope={dirty:f,ctx:o}),g.$set(C)},i(o){I||(z(e.$$.fragment,o),z(t.$$.fragment,o),z(i.$$.fragment,o),z($.$$.fragment,o),z(_.$$.fragment,o),z(g.$$.fragment,o),I=!0)},o(o){E(e.$$.fragment,o),E(t.$$.fragment,o),E(i.$$.fragment,o),E($.$$.fragment,o),E(_.$$.fragment,o),E(g.$$.fragment,o),I=!1},d(o){D(e,o),o&&u(l),D(t,o),o&&u(s),D(i,o),o&&u(n),D($,o),o&&u(m),D(_,o),o&&u(j),D(g,o)}}}function At(a){let e,l,t,s,i,n,$,m,_,j,g,I,o,f,r,d,B,M,L,C,J,F,x,ne,K,Q,oe,U,ee,we,be,te,ze,ce,X,Y,fe;j=new Ne({props:{slidesPerView:3,spaceBetween:10,slidesPerGroup:1,mousewheel:!1,loop:!0,loopFillGroupWithBlank:!0,autoplay:{delay:3e3,disableOnInteraction:!1},breakpoints:{"@0.00":{slidesPerView:2,spaceBetween:9},768:{slidesPerView:3},1100:{slidesPerView:4}},class:"mySwiper",$$slots:{default:[Mt]},$$scope:{ctx:a}}});let Z=Object.entries(a[0]),W=[];for(let p=0;p<Z.length;p+=1)W[p]=Ze(Xe(a,Z,p));const Je=p=>E(W[p],1,1,()=>{W[p]=null});return Q=new kt({}),Y=new Ne({props:{slidesPerView:3,spaceBetween:20,slidesPerGroup:1,mousewheel:!1,loop:!0,loopFillGroupWithBlank:!0,autoplay:{delay:1800,disableOnInteraction:!1},breakpoints:{"@0.00":{slidesPerView:4,spaceBetween:60},768:{slidesPerView:4,spaceBetween:155}},class:"mySwiper",$$slots:{default:[Rt]},$$scope:{ctx:a}}}),{c(){e=G(),l=v("div"),t=v("h1"),s=T("Our business is making yours look good."),i=G(),n=v("p"),$=T(`We provide brand centred graphic design and web development services to SMEs
    and corporates in Nairobi.`),m=G(),_=v("div"),S(j.$$.fragment),g=G(),I=v("div"),o=v("h2"),f=T("Our services"),r=G(),d=v("div");for(let p=0;p<W.length;p+=1)W[p].c();B=G(),M=v("div"),L=v("h2"),C=T("Recent projects"),J=G(),F=v("p"),x=T(`We handle many full brand development projects. Below we showcase the ones
    we completed recently`),ne=G(),K=v("div"),S(Q.$$.fragment),oe=G(),U=v("div"),ee=v("h2"),we=T("Our clients"),be=G(),te=v("p"),ze=T(`We work with companies of all sizes. Start-ups, SMES or corporates.
    Regardless of your size our goal is always the same, do work that helps you
    stand out in the market place.`),ce=G(),X=v("div"),S(Y.$$.fragment),this.h()},l(p){tt('[data-svelte="svelte-1jbzjxt"]',document.head).forEach(u),e=V(p),l=w(p,"DIV",{class:!0});var N=y(l);t=w(N,"H1",{class:!0});var se=y(t);s=H(se,"Our business is making yours look good."),se.forEach(u),i=V(N),n=w(N,"P",{class:!0});var q=y(n);$=H(q,`We provide brand centred graphic design and web development services to SMEs
    and corporates in Nairobi.`),q.forEach(u),N.forEach(u),m=V(p),_=w(p,"DIV",{class:!0});var le=y(_);P(j.$$.fragment,le),le.forEach(u),g=V(p),I=w(p,"DIV",{class:!0});var ue=y(I);o=w(ue,"H2",{class:!0});var Ve=y(o);f=H(Ve,"Our services"),Ve.forEach(u),r=V(ue),d=w(ue,"DIV",{class:!0});var We=y(d);for(let ke=0;ke<W.length;ke+=1)W[ke].l(We);We.forEach(u),ue.forEach(u),B=V(p),M=w(p,"DIV",{class:!0});var pe=y(M);L=w(pe,"H2",{class:!0});var Me=y(L);C=H(Me,"Recent projects"),Me.forEach(u),J=V(pe),F=w(pe,"P",{class:!0});var Se=y(F);x=H(Se,`We handle many full brand development projects. Below we showcase the ones
    we completed recently`),Se.forEach(u),pe.forEach(u),ne=V(p),K=w(p,"DIV",{class:!0});var Pe=y(K);P(Q.$$.fragment,Pe),Pe.forEach(u),oe=V(p),U=w(p,"DIV",{class:!0});var me=y(U);ee=w(me,"H2",{class:!0});var Oe=y(ee);we=H(Oe,"Our clients"),Oe.forEach(u),be=V(me),te=w(me,"P",{class:!0});var De=y(te);ze=H(De,`We work with companies of all sizes. Start-ups, SMES or corporates.
    Regardless of your size our goal is always the same, do work that helps you
    stand out in the market place.`),De.forEach(u),me.forEach(u),ce=V(p),X=w(p,"DIV",{class:!0});var qe=y(X);P(Y.$$.fragment,qe),qe.forEach(u),this.h()},h(){document.title=`
    High quality graphic design and web development services in Nairobi.
  `,c(t,"class","svelte-pdzmzj"),c(n,"class","svelte-pdzmzj"),c(l,"class","content-500 svelte-pdzmzj"),c(_,"class","content svelte-pdzmzj"),c(o,"class","svelte-pdzmzj"),c(d,"class","accordion svelte-pdzmzj"),c(I,"class","services svelte-pdzmzj"),c(L,"class","svelte-pdzmzj"),c(F,"class","recent__text svelte-pdzmzj"),c(M,"class","recent svelte-pdzmzj"),c(K,"class","four-way-grid svelte-pdzmzj"),c(ee,"class","svelte-pdzmzj"),c(te,"class","svelte-pdzmzj"),c(U,"class","clients svelte-pdzmzj"),c(X,"class","logos svelte-pdzmzj")},m(p,k){h(p,e,k),h(p,l,k),b(l,t),b(t,s),b(l,i),b(l,n),b(n,$),h(p,m,k),h(p,_,k),O(j,_,null),h(p,g,k),h(p,I,k),b(I,o),b(o,f),b(I,r),b(I,d);for(let N=0;N<W.length;N+=1)W[N].m(d,null);h(p,B,k),h(p,M,k),b(M,L),b(L,C),b(M,J),b(M,F),b(F,x),h(p,ne,k),h(p,K,k),O(Q,K,null),h(p,oe,k),h(p,U,k),b(U,ee),b(ee,we),b(U,be),b(U,te),b(te,ze),h(p,ce,k),h(p,X,k),O(Y,X,null),fe=!0},p(p,[k]){const N={};if(k&16&&(N.$$scope={dirty:k,ctx:p}),j.$set(N),k&1){Z=Object.entries(p[0]);let q;for(q=0;q<Z.length;q+=1){const le=Xe(p,Z,q);W[q]?(W[q].p(le,k),z(W[q],1)):(W[q]=Ze(le),W[q].c(),z(W[q],1),W[q].m(d,null))}for(Ie(),q=Z.length;q<W.length;q+=1)Je(q);Ge()}const se={};k&16&&(se.$$scope={dirty:k,ctx:p}),Y.$set(se)},i(p){if(!fe){z(j.$$.fragment,p);for(let k=0;k<Z.length;k+=1)z(W[k]);z(Q.$$.fragment,p),z(Y.$$.fragment,p),fe=!0}},o(p){E(j.$$.fragment,p),W=W.filter(Boolean);for(let k=0;k<W.length;k+=1)E(W[k]);E(Q.$$.fragment,p),E(Y.$$.fragment,p),fe=!1},d(p){p&&u(e),p&&u(l),p&&u(m),p&&u(_),D(j),p&&u(g),p&&u(I),ye(W,p),p&&u(B),p&&u(M),p&&u(ne),p&&u(K),D(Q),p&&u(oe),p&&u(U),p&&u(ce),p&&u(X),D(Y)}}}function Lt(a){const e={"Brand development":["We conduct exhaustive fact finding mission to understand your business and it's goals. We audit, research and analyse collected data to draw consumer insight.","Our creative process begins with logo design. We take time to explore different creative directions so as to come up with a beautiful, simple and memorable logo mark for your brand. We carefully select colours and typefaces to uniquely and perfectly represent your brand.","To finalize the process, we create your branding and identity guide and deliver creative results in relevant format. This marks the offset of your future business success."],"Graphic design":["Our creative experience helps us create designs that capture your marketing message and catch your audience's eyes. Graphic design is broad and wide but we can help you use it to broaden your brand's appeal through creative marketing."],"Web development":["The internet changed the way people engage with businesses. Your customers expect to find you online. Our services helps you take your brand online fast and affordably."," We specialize in modern web technologies that make websites that are fast and optimized for the modern consumer."],Printing:["We do paper printing like business cards, fliers, posters, brochures, booklets, magazines and many others.","We also print banners like pull-up, hanging banners, tear drop banners, backdrop/media banners among others.","Sometimes you need customized items to promote your brand. We can help you brand writing pads, notebooks, gift bags, folders, t-shirts and many other items."]};return st.use([lt,rt]),[e]}class Ht extends re{constructor(e){super();ie(this,e,Lt,At,ae,{})}}export{Ht as default};
