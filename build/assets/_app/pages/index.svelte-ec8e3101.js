import{S as re,i as ie,s as ae,e as v,c as w,a as E,d as f,b as u,f as _,t as N,g as C,F as b,h as ze,O as et,P as Re,Q as Te,R as Le,T as qe,k as j,U as Ie,l as $e,n as G,V as je,G as tt,x as y,r as Ge,u as q,w as We,K as he,L as _e,M as de,N as ge,j as M,m as P,o as O,v as D,D as R,H as ve,W as He,X as st,Y as lt,Z as rt,_ as it,$ as T}from"../chunks/vendor-7aaed8c5.js";/* empty css                               */function Ne(a,e,l){const t=a.slice();return t[3]=e[l],t}function Ce(a){let e,l,t,s=a[0][1],i=[];for(let n=0;n<s.length;n+=1)i[n]=Fe(Ne(a,s,n));return{c(){e=v("div");for(let n=0;n<i.length;n+=1)i[n].c();this.h()},l(n){e=w(n,"DIV",{class:!0});var p=E(e);for(let $=0;$<i.length;$+=1)i[$].l(p);p.forEach(f),this.h()},h(){u(e,"class","slide svelte-1ese3ry")},m(n,p){_(n,e,p);for(let $=0;$<i.length;$+=1)i[$].m(e,null);t=!0},p(n,p){if(a=n,p&1){s=a[0][1];let $;for($=0;$<s.length;$+=1){const d=Ne(a,s,$);i[$]?i[$].p(d,p):(i[$]=Fe(d),i[$].c(),i[$].m(e,null))}for(;$<i.length;$+=1)i[$].d(1);i.length=s.length}},i(n){t||(et(()=>{l||(l=Re(e,Le,{duration:400,easing:Te},!0)),l.run(1)}),t=!0)},o(n){l||(l=Re(e,Le,{duration:400,easing:Te},!1)),l.run(0),t=!1},d(n){n&&f(e),qe(i,n),n&&l&&l.end()}}}function Fe(a){let e,l=a[3]+"",t;return{c(){e=v("p"),t=N(l),this.h()},l(s){e=w(s,"P",{class:!0});var i=E(e);t=C(i,l),i.forEach(f),this.h()},h(){u(e,"class","svelte-1ese3ry")},m(s,i){_(s,e,i),b(e,t)},p(s,i){i&1&&l!==(l=s[3]+"")&&ze(t,l)},d(s){s&&f(e)}}}function at(a){let e,l,t=a[0][0]+"",s,i,n,p,$,d,I,g,V,o,c=a[1]&&Ce(a);return{c(){e=v("div"),l=v("p"),s=N(t),i=j(),n=Ie("svg"),p=Ie("line"),$=Ie("line"),d=j(),c&&c.c(),I=$e(),this.h()},l(r){e=w(r,"DIV",{class:!0,"aria-expanded":!0});var h=E(e);l=w(h,"P",{class:!0});var S=E(l);s=C(S,t),S.forEach(f),i=G(h),n=je(h,"svg",{class:!0,height:!0,width:!0});var B=E(n);p=je(B,"line",{x1:!0,y1:!0,x2:!0,y2:!0}),E(p).forEach(f),$=je(B,"line",{x1:!0,y1:!0,x2:!0,y2:!0}),E($).forEach(f),B.forEach(f),h.forEach(f),d=G(r),c&&c.l(r),I=$e(),this.h()},h(){u(l,"class","svelte-1ese3ry"),u(p,"x1","0"),u(p,"y1","6"),u(p,"x2","12"),u(p,"y2","6"),u($,"x1","6"),u($,"y1","12"),u($,"x2","6"),u($,"y2","0"),u(n,"class","svg svelte-1ese3ry"),u(n,"height","12"),u(n,"width","12"),u(e,"class","btn svelte-1ese3ry"),u(e,"aria-expanded",a[1])},m(r,h){_(r,e,h),b(e,l),b(l,s),b(e,i),b(e,n),b(n,p),b(n,$),_(r,d,h),c&&c.m(r,h),_(r,I,h),g=!0,V||(o=tt(e,"click",a[2]),V=!0)},p(r,[h]){(!g||h&1)&&t!==(t=r[0][0]+"")&&ze(s,t),(!g||h&2)&&u(e,"aria-expanded",r[1]),r[1]?c?(c.p(r,h),h&2&&y(c,1)):(c=Ce(r),c.c(),y(c,1),c.m(I.parentNode,I)):c&&(Ge(),q(c,1,1,()=>{c=null}),We())},i(r){g||(y(c),g=!0)},o(r){q(c),g=!1},d(r){r&&f(e),r&&f(d),c&&c.d(r),r&&f(I),V=!1,o()}}}function nt(a,e,l){let{entry:t}=e,s=!1;const i=()=>l(1,s=!s);return a.$$set=n=>{"entry"in n&&l(0,t=n.entry)},[t,s,i]}class ot extends re{constructor(e){super();ie(this,e,nt,at,ae,{entry:0})}}function ct(a){let e,l;const t=a[1].default,s=he(t,a,a[0],null);return{c(){e=v("section"),s&&s.c(),this.h()},l(i){e=w(i,"SECTION",{class:!0});var n=E(e);s&&s.l(n),n.forEach(f),this.h()},h(){u(e,"class","svelte-gfmzv8")},m(i,n){_(i,e,n),s&&s.m(e,null),l=!0},p(i,[n]){s&&s.p&&(!l||n&1)&&_e(s,t,i,i[0],l?ge(t,i[0],n,null):de(i[0]),null)},i(i){l||(y(s,i),l=!0)},o(i){q(s,i),l=!1},d(i){i&&f(e),s&&s.d(i)}}}function ut(a,e,l){let{$$slots:t={},$$scope:s}=e;return a.$$set=i=>{"$$scope"in i&&l(0,s=i.$$scope)},[s,t]}class ft extends re{constructor(e){super();ie(this,e,ut,ct,ae,{})}}const pt=a=>({}),Ue=a=>({}),mt=a=>({}),Ye=a=>({}),$t=a=>({}),Ke=a=>({});function ht(a){let e,l,t,s,i,n,p;const $=a[1].image,d=he($,a,a[0],Ke),I=a[1].description,g=he(I,a,a[0],Ye),V=a[1].link,o=he(V,a,a[0],Ue);return{c(){e=v("article"),l=v("div"),d&&d.c(),t=j(),s=v("div"),g&&g.c(),i=j(),n=v("div"),o&&o.c(),this.h()},l(c){e=w(c,"ARTICLE",{class:!0});var r=E(e);l=w(r,"DIV",{class:!0});var h=E(l);d&&d.l(h),h.forEach(f),t=G(r),s=w(r,"DIV",{class:!0});var S=E(s);g&&g.l(S),S.forEach(f),i=G(r),n=w(r,"DIV",{class:!0});var B=E(n);o&&o.l(B),B.forEach(f),r.forEach(f),this.h()},h(){u(l,"class","img svelte-1qi65ap"),u(s,"class","svelte-1qi65ap"),u(n,"class","svelte-1qi65ap"),u(e,"class","svelte-1qi65ap")},m(c,r){_(c,e,r),b(e,l),d&&d.m(l,null),b(e,t),b(e,s),g&&g.m(s,null),b(e,i),b(e,n),o&&o.m(n,null),p=!0},p(c,[r]){d&&d.p&&(!p||r&1)&&_e(d,$,c,c[0],p?ge($,c[0],r,$t):de(c[0]),Ke),g&&g.p&&(!p||r&1)&&_e(g,I,c,c[0],p?ge(I,c[0],r,mt):de(c[0]),Ye),o&&o.p&&(!p||r&1)&&_e(o,V,c,c[0],p?ge(V,c[0],r,pt):de(c[0]),Ue)},i(c){p||(y(d,c),y(g,c),y(o,c),p=!0)},o(c){q(d,c),q(g,c),q(o,c),p=!1},d(c){c&&f(e),d&&d.d(c),g&&g.d(c),o&&o.d(c)}}}function _t(a,e,l){let{$$slots:t={},$$scope:s}=e;return a.$$set=i=>{"$$scope"in i&&l(0,s=i.$$scope)},[s,t]}class dt extends re{constructor(e){super();ie(this,e,_t,ht,ae,{})}}function Qe(a,e,l){const t=a.slice();return t[1]=e[l],t}function gt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{slot:!0,src:!0,alt:!0,class:!0}),this.h()},h(){u(e,"slot","image"),R(e.src,l=a[1].image)||u(e,"src",l),u(e,"alt",a[1].alt),u(e,"class","svelte-16qyudw")},m(t,s){_(t,e,s)},p:ve,d(t){t&&f(e)}}}function vt(a){let e,l=a[1].description+"",t;return{c(){e=v("p"),t=N(l),this.h()},l(s){e=w(s,"P",{slot:!0,class:!0});var i=E(e);t=C(i,l),i.forEach(f),this.h()},h(){u(e,"slot","description"),u(e,"class","svelte-16qyudw")},m(s,i){_(s,e,i),b(e,t)},p:ve,d(s){s&&f(e)}}}function wt(a){let e,l=a[1].link+"",t;return{c(){e=v("a"),t=N(l),this.h()},l(s){e=w(s,"A",{slot:!0,href:!0,class:!0});var i=E(e);t=C(i,l),i.forEach(f),this.h()},h(){u(e,"slot","link"),u(e,"href","/work"),u(e,"class","svelte-16qyudw")},m(s,i){_(s,e,i),b(e,t)},p:ve,d(s){s&&f(e)}}}function Xe(a){let e,l;return e=new dt({props:{$$slots:{link:[wt],description:[vt],image:[gt]},$$scope:{ctx:a}}}),{c(){M(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,s){O(e,t,s),l=!0},p(t,s){const i={};s&16&&(i.$$scope={dirty:s,ctx:t}),e.$set(i)},i(t){l||(y(e.$$.fragment,t),l=!0)},o(t){q(e.$$.fragment,t),l=!1},d(t){D(e,t)}}}function bt(a){let e,l,t=a[0],s=[];for(let n=0;n<t.length;n+=1)s[n]=Xe(Qe(a,t,n));const i=n=>q(s[n],1,1,()=>{s[n]=null});return{c(){for(let n=0;n<s.length;n+=1)s[n].c();e=$e()},l(n){for(let p=0;p<s.length;p+=1)s[p].l(n);e=$e()},m(n,p){for(let $=0;$<s.length;$+=1)s[$].m(n,p);_(n,e,p),l=!0},p(n,p){if(p&1){t=n[0];let $;for($=0;$<t.length;$+=1){const d=Qe(n,t,$);s[$]?(s[$].p(d,p),y(s[$],1)):(s[$]=Xe(d),s[$].c(),y(s[$],1),s[$].m(e.parentNode,e))}for(Ge(),$=t.length;$<s.length;$+=1)i($);We()}},i(n){if(!l){for(let p=0;p<t.length;p+=1)y(s[p]);l=!0}},o(n){s=s.filter(Boolean);for(let p=0;p<s.length;p+=1)q(s[p]);l=!1},d(n){qe(s,n),n&&f(e)}}}function kt(a){let e,l;return e=new ft({props:{$$slots:{default:[bt]},$$scope:{ctx:a}}}),{c(){M(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,s){O(e,t,s),l=!0},p(t,[s]){const i={};s&16&&(i.$$scope={dirty:s,ctx:t}),e.$set(i)},i(t){l||(y(e.$$.fragment,t),l=!0)},o(t){q(e.$$.fragment,t),l=!1},d(t){D(e,t)}}}function yt(a){return[[{image:"img/recent/anchor.jpg",alt:"Anchor logo",description:"We recently worked with the founder of Anchor homes to help bring his brand to life. Learn more about this project...",link:"Learn more",slot:"one"},{image:"img/recent/liberte_project.jpg",alt:"liberte logo",description:"Liberte juices helps you liberate your thirst while boosting your health. This was a fun project to work on. See more details here...",link:"Learn more",slot:"two"},{image:"img/recent/imexafrica.jpg",alt:"Imex Africa logo",description:"Imex is a pan african civil engineering firm that specializes in supplies, construction and consultancy. See details...",link:"Learn more",slot:"three"},{image:"img/recent/eaglehr.jpg",alt:"eaglehr kenya logo",description:"Africa's economies are on the rise and Eaglehr is on the forefront of ensuring the labour market matches expected...",link:"Learn more",slot:"four"}]]}class Et extends re{constructor(e){super();ie(this,e,yt,kt,ae,{})}}function Ze(a,e,l){const t=a.slice();return t[1]=e[l],t}function qt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/8.jpg")||u(e,"src",l),u(e,"alt",""),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function It(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/11.jpg")||u(e,"src",l),u(e,"alt",""),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function jt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/9.jpg")||u(e,"src",l),u(e,"alt",""),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function Gt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/eaglehr-banners.jpg")||u(e,"src",l),u(e,"alt",""),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function Wt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/55.jpg")||u(e,"src",l),u(e,"alt",""),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function Vt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/6.jpg")||u(e,"src",l),u(e,"alt",""),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function St(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/recent/liberte.jpg")||u(e,"src",l),u(e,"alt",""),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function Mt(a){let e,l,t,s,i,n,p,$,d,I,g,V,o,c;return e=new T({props:{$$slots:{default:[qt]},$$scope:{ctx:a}}}),t=new T({props:{$$slots:{default:[It]},$$scope:{ctx:a}}}),i=new T({props:{$$slots:{default:[jt]},$$scope:{ctx:a}}}),p=new T({props:{$$slots:{default:[Gt]},$$scope:{ctx:a}}}),d=new T({props:{$$slots:{default:[Wt]},$$scope:{ctx:a}}}),g=new T({props:{$$slots:{default:[Vt]},$$scope:{ctx:a}}}),o=new T({props:{$$slots:{default:[St]},$$scope:{ctx:a}}}),{c(){M(e.$$.fragment),l=j(),M(t.$$.fragment),s=j(),M(i.$$.fragment),n=j(),M(p.$$.fragment),$=j(),M(d.$$.fragment),I=j(),M(g.$$.fragment),V=j(),M(o.$$.fragment)},l(r){P(e.$$.fragment,r),l=G(r),P(t.$$.fragment,r),s=G(r),P(i.$$.fragment,r),n=G(r),P(p.$$.fragment,r),$=G(r),P(d.$$.fragment,r),I=G(r),P(g.$$.fragment,r),V=G(r),P(o.$$.fragment,r)},m(r,h){O(e,r,h),_(r,l,h),O(t,r,h),_(r,s,h),O(i,r,h),_(r,n,h),O(p,r,h),_(r,$,h),O(d,r,h),_(r,I,h),O(g,r,h),_(r,V,h),O(o,r,h),c=!0},p(r,h){const S={};h&16&&(S.$$scope={dirty:h,ctx:r}),e.$set(S);const B={};h&16&&(B.$$scope={dirty:h,ctx:r}),t.$set(B);const z={};h&16&&(z.$$scope={dirty:h,ctx:r}),i.$set(z);const L={};h&16&&(L.$$scope={dirty:h,ctx:r}),p.$set(L);const J={};h&16&&(J.$$scope={dirty:h,ctx:r}),d.$set(J);const x={};h&16&&(x.$$scope={dirty:h,ctx:r}),g.$set(x);const F={};h&16&&(F.$$scope={dirty:h,ctx:r}),o.$set(F)},i(r){c||(y(e.$$.fragment,r),y(t.$$.fragment,r),y(i.$$.fragment,r),y(p.$$.fragment,r),y(d.$$.fragment,r),y(g.$$.fragment,r),y(o.$$.fragment,r),c=!0)},o(r){q(e.$$.fragment,r),q(t.$$.fragment,r),q(i.$$.fragment,r),q(p.$$.fragment,r),q(d.$$.fragment,r),q(g.$$.fragment,r),q(o.$$.fragment,r),c=!1},d(r){D(e,r),r&&f(l),D(t,r),r&&f(s),D(i,r),r&&f(n),D(p,r),r&&f($),D(d,r),r&&f(I),D(g,r),r&&f(V),D(o,r)}}}function Je(a){let e,l,t,s;return l=new ot({props:{entry:a[1]}}),{c(){e=v("div"),M(l.$$.fragment),t=j(),this.h()},l(i){e=w(i,"DIV",{class:!0});var n=E(e);P(l.$$.fragment,n),t=G(n),n.forEach(f),this.h()},h(){u(e,"class","accordion-entry svelte-1l7560q")},m(i,n){_(i,e,n),O(l,e,null),b(e,t),s=!0},p:ve,i(i){s||(y(l.$$.fragment,i),s=!0)},o(i){q(l.$$.fragment,i),s=!1},d(i){i&&f(e),D(l)}}}function Pt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/logos/amsco.png")||u(e,"src",l),u(e,"alt","amsco logo"),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function Ot(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/logos/anchor.png")||u(e,"src",l),u(e,"alt","Anchor builders logo"),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function Dt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/logos/strathmore.png")||u(e,"src",l),u(e,"alt","Strathmore University logo"),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function At(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/logos/eaglehr.png")||u(e,"src",l),u(e,"alt","Eaglehr kenya logo"),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function Bt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/logos/absa.png")||u(e,"src",l),u(e,"alt","absa bank logo"),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function zt(a){let e,l;return{c(){e=v("img"),this.h()},l(t){e=w(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){R(e.src,l="img/logos/farmhouse.png")||u(e,"src",l),u(e,"alt","farmhouse sacco logo"),u(e,"class","svelte-1l7560q")},m(t,s){_(t,e,s)},d(t){t&&f(e)}}}function Rt(a){let e,l,t,s,i,n,p,$,d,I,g,V;return e=new T({props:{$$slots:{default:[Pt]},$$scope:{ctx:a}}}),t=new T({props:{$$slots:{default:[Ot]},$$scope:{ctx:a}}}),i=new T({props:{$$slots:{default:[Dt]},$$scope:{ctx:a}}}),p=new T({props:{$$slots:{default:[At]},$$scope:{ctx:a}}}),d=new T({props:{$$slots:{default:[Bt]},$$scope:{ctx:a}}}),g=new T({props:{$$slots:{default:[zt]},$$scope:{ctx:a}}}),{c(){M(e.$$.fragment),l=j(),M(t.$$.fragment),s=j(),M(i.$$.fragment),n=j(),M(p.$$.fragment),$=j(),M(d.$$.fragment),I=j(),M(g.$$.fragment)},l(o){P(e.$$.fragment,o),l=G(o),P(t.$$.fragment,o),s=G(o),P(i.$$.fragment,o),n=G(o),P(p.$$.fragment,o),$=G(o),P(d.$$.fragment,o),I=G(o),P(g.$$.fragment,o)},m(o,c){O(e,o,c),_(o,l,c),O(t,o,c),_(o,s,c),O(i,o,c),_(o,n,c),O(p,o,c),_(o,$,c),O(d,o,c),_(o,I,c),O(g,o,c),V=!0},p(o,c){const r={};c&16&&(r.$$scope={dirty:c,ctx:o}),e.$set(r);const h={};c&16&&(h.$$scope={dirty:c,ctx:o}),t.$set(h);const S={};c&16&&(S.$$scope={dirty:c,ctx:o}),i.$set(S);const B={};c&16&&(B.$$scope={dirty:c,ctx:o}),p.$set(B);const z={};c&16&&(z.$$scope={dirty:c,ctx:o}),d.$set(z);const L={};c&16&&(L.$$scope={dirty:c,ctx:o}),g.$set(L)},i(o){V||(y(e.$$.fragment,o),y(t.$$.fragment,o),y(i.$$.fragment,o),y(p.$$.fragment,o),y(d.$$.fragment,o),y(g.$$.fragment,o),V=!0)},o(o){q(e.$$.fragment,o),q(t.$$.fragment,o),q(i.$$.fragment,o),q(p.$$.fragment,o),q(d.$$.fragment,o),q(g.$$.fragment,o),V=!1},d(o){D(e,o),o&&f(l),D(t,o),o&&f(s),D(i,o),o&&f(n),D(p,o),o&&f($),D(d,o),o&&f(I),D(g,o)}}}function Tt(a){let e,l,t,s,i,n,p,$,d,I,g,V,o,c,r,h,S,B,z,L,J,x,F,we,ne,K,Q,oe,U,te,be,ke,ee,ye,ce,X,Y,ue;g=new He({props:{slidesPerView:3,spaceBetween:10,slidesPerGroup:1,mousewheel:!1,loop:!0,loopFillGroupWithBlank:!0,autoplay:{delay:3e3,disableOnInteraction:!1},breakpoints:{"@0.00":{slidesPerView:2,spaceBetween:9},768:{slidesPerView:3},1100:{slidesPerView:4}},class:"mySwiper",$$slots:{default:[Mt]},$$scope:{ctx:a}}});let Z=Object.entries(a[0]),W=[];for(let m=0;m<Z.length;m+=1)W[m]=Je(Ze(a,Z,m));const xe=m=>q(W[m],1,1,()=>{W[m]=null});return Q=new Et({}),Y=new He({props:{slidesPerView:3,spaceBetween:20,slidesPerGroup:1,mousewheel:!1,loop:!0,loopFillGroupWithBlank:!0,autoplay:{delay:1800,disableOnInteraction:!1},breakpoints:{"@0.00":{slidesPerView:4,spaceBetween:60},768:{slidesPerView:4,spaceBetween:155}},class:"mySwiper",$$slots:{default:[Rt]},$$scope:{ctx:a}}}),{c(){e=v("meta"),l=j(),t=v("div"),s=v("h1"),i=N("Our business is making yours look good"),n=j(),p=v("p"),$=N(`We provide brand centric graphic design and web development services to
    businesses in East Africa.`),d=j(),I=v("div"),M(g.$$.fragment),V=j(),o=v("div"),c=v("h2"),r=N("Our services"),h=j(),S=v("div");for(let m=0;m<W.length;m+=1)W[m].c();B=j(),z=v("div"),L=v("h2"),J=N("Sample projects"),x=j(),F=v("p"),we=N(`We handle many full brand development projects. Below we showcase the ones
    we completed recently`),ne=j(),K=v("div"),M(Q.$$.fragment),oe=j(),U=v("div"),te=v("h2"),be=N("Our clients"),ke=j(),ee=v("p"),ye=N(`We work with companies of all sizes. Start-ups, SMES or corporates.
    Regardless of your size our goal is always the same, do work that helps you
    stand out in the market place.`),ce=j(),X=v("div"),M(Y.$$.fragment),this.h()},l(m){const k=st('[data-svelte="svelte-13ng71k"]',document.head);e=w(k,"META",{name:!0,content:!0}),k.forEach(f),l=G(m),t=w(m,"DIV",{class:!0});var H=E(t);s=w(H,"H1",{});var se=E(s);i=C(se,"Our business is making yours look good"),se.forEach(f),n=G(H),p=w(H,"P",{class:!0});var A=E(p);$=C(A,`We provide brand centric graphic design and web development services to
    businesses in East Africa.`),A.forEach(f),H.forEach(f),d=G(m),I=w(m,"DIV",{class:!0});var le=E(I);P(g.$$.fragment,le),le.forEach(f),V=G(m),o=w(m,"DIV",{class:!0});var fe=E(o);c=w(fe,"H2",{});var Ve=E(c);r=C(Ve,"Our services"),Ve.forEach(f),h=G(fe),S=w(fe,"DIV",{class:!0});var Se=E(S);for(let Ee=0;Ee<W.length;Ee+=1)W[Ee].l(Se);Se.forEach(f),fe.forEach(f),B=G(m),z=w(m,"DIV",{class:!0});var pe=E(z);L=w(pe,"H2",{});var Me=E(L);J=C(Me,"Sample projects"),Me.forEach(f),x=G(pe),F=w(pe,"P",{class:!0});var Pe=E(F);we=C(Pe,`We handle many full brand development projects. Below we showcase the ones
    we completed recently`),Pe.forEach(f),pe.forEach(f),ne=G(m),K=w(m,"DIV",{class:!0});var Oe=E(K);P(Q.$$.fragment,Oe),Oe.forEach(f),oe=G(m),U=w(m,"DIV",{class:!0});var me=E(U);te=w(me,"H2",{});var De=E(te);be=C(De,"Our clients"),De.forEach(f),ke=G(me),ee=w(me,"P",{class:!0});var Ae=E(ee);ye=C(Ae,`We work with companies of all sizes. Start-ups, SMES or corporates.
    Regardless of your size our goal is always the same, do work that helps you
    stand out in the market place.`),Ae.forEach(f),me.forEach(f),ce=G(m),X=w(m,"DIV",{class:!0});var Be=E(X);P(Y.$$.fragment,Be),Be.forEach(f),this.h()},h(){document.title="High quality graphic design and web design services in Nairobi",u(e,"name","description"),u(e,"content","We are a creative design studio in Nairobi offering graphic design and web development services. We also do printing and branding for startups and corporates. The quality of our work paired with our pricing is simply unmatched. Get in touch with us to see how we can help you."),u(p,"class","svelte-1l7560q"),u(t,"class","content-500 svelte-1l7560q"),u(I,"class","content svelte-1l7560q"),u(S,"class","accordion top-margin svelte-1l7560q"),u(o,"class","services svelte-1l7560q"),u(F,"class","top-margin svelte-1l7560q"),u(z,"class","recent svelte-1l7560q"),u(K,"class","four-way-grid svelte-1l7560q"),u(ee,"class","top-margin svelte-1l7560q"),u(U,"class","clients svelte-1l7560q"),u(X,"class","logos svelte-1l7560q")},m(m,k){b(document.head,e),_(m,l,k),_(m,t,k),b(t,s),b(s,i),b(t,n),b(t,p),b(p,$),_(m,d,k),_(m,I,k),O(g,I,null),_(m,V,k),_(m,o,k),b(o,c),b(c,r),b(o,h),b(o,S);for(let H=0;H<W.length;H+=1)W[H].m(S,null);_(m,B,k),_(m,z,k),b(z,L),b(L,J),b(z,x),b(z,F),b(F,we),_(m,ne,k),_(m,K,k),O(Q,K,null),_(m,oe,k),_(m,U,k),b(U,te),b(te,be),b(U,ke),b(U,ee),b(ee,ye),_(m,ce,k),_(m,X,k),O(Y,X,null),ue=!0},p(m,[k]){const H={};if(k&16&&(H.$$scope={dirty:k,ctx:m}),g.$set(H),k&1){Z=Object.entries(m[0]);let A;for(A=0;A<Z.length;A+=1){const le=Ze(m,Z,A);W[A]?(W[A].p(le,k),y(W[A],1)):(W[A]=Je(le),W[A].c(),y(W[A],1),W[A].m(S,null))}for(Ge(),A=Z.length;A<W.length;A+=1)xe(A);We()}const se={};k&16&&(se.$$scope={dirty:k,ctx:m}),Y.$set(se)},i(m){if(!ue){y(g.$$.fragment,m);for(let k=0;k<Z.length;k+=1)y(W[k]);y(Q.$$.fragment,m),y(Y.$$.fragment,m),ue=!0}},o(m){q(g.$$.fragment,m),W=W.filter(Boolean);for(let k=0;k<W.length;k+=1)q(W[k]);q(Q.$$.fragment,m),q(Y.$$.fragment,m),ue=!1},d(m){f(e),m&&f(l),m&&f(t),m&&f(d),m&&f(I),D(g),m&&f(V),m&&f(o),qe(W,m),m&&f(B),m&&f(z),m&&f(ne),m&&f(K),D(Q),m&&f(oe),m&&f(U),m&&f(ce),m&&f(X),D(Y)}}}function Lt(a){const e={"Brand development":["We conduct comprehensive research to understand your business and it's goals. We then audit and analyse collected data to draw consumer insight.","Our creative process begins with logo design. We take time to explore different creative directions so as to come up with a beautiful, simple and memorable logo mark for your business. We carefully select colours and a typeface to uniquely represent your brand.","To finalize the process, we create your branding and identity guide and deliver creative results in relevant format. This marks the foundation of your future business success."],"Graphic design":["Our creative experience helps us create designs that capture your marketing message and catch the eye of your audience. Graphic design is broad and wide but we can help you use it to broaden your brand appeal through creative marketing."],"Web development":["The internet has changed the way people engage with businesses. Your customers expect to find you online. Our web development service helps you take your business online fast and affordably."," We specialize in modern web technologies that make websites that are fast and optimized for the modern consumer."],Printing:["We do paper printing like business cards, fliers, posters, brochures, booklets, magazines and many others.","We also print banners like pull-up, hanging banners, tear drop banners, backdrop/media banners among others.","Sometimes you need customized items to promote your brand. We can help you brand writing pads, notebooks, gift bags, folders, t-shirts and many other items."]};return lt.use([rt,it]),[e]}class Ct extends re{constructor(e){super();ie(this,e,Lt,Tt,ae,{})}}export{Ct as default};
