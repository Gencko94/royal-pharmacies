(this.webpackJsonpattiahmall=this.webpackJsonpattiahmall||[]).push([[28],{367:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return B}));var n=a(3),i=a.n(n),r=a(5),o=a(2),c=a(1),l=a.n(c),s=a(267),d=a(84),m=a(8),u=a(29),v=a(17),p=a(67),_=a(78),f=a(148),x=a(143),y=a(28),g=a(77);function b(e){var t,a=e.item,n=(e.setCartMenuOpen,Object(p.a)().locale),i=l.a.useContext(y.a).deliveryCountry,r=l.a.useState(null),c=Object(o.a)(r,2),s=c[0],d=c[1];return l.a.createElement("div",null,l.a.createElement("a",{href:"/".concat(n,"/c/").concat(a.id)},l.a.createElement(g.a,{src:"".concat("https://admin-mrg.mrg-mall.com/storage","/original/").concat(null===(t=a.image)||void 0===t?void 0:t.link),alt:a.translation[n].title,pb:"calc(100% * 286/210)"})),l.a.createElement("div",{className:"bg-body-light text-body-text-light"},l.a.createElement("div",{className:"p-2",style:{height:"55px"}},l.a.createElement("a",{title:a.translation[n].title,className:"hover:underline inline-block",href:"/".concat(n,"/c/").concat(a.id)},l.a.createElement("h1",{className:"text-clamp-2 text-sm font-semibold"},a.translation[n].title))),l.a.createElement("div",{className:" p-2 flex items-center justify-between"},l.a.createElement("p",{className:"   text-lg  font-semibold text-main-color whitespace-no-wrap"},"50"," ",l.a.createElement("span",{className:"text-xs "},null===i||void 0===i?void 0:i.currency.translation[n].symbol)),l.a.createElement("button",{onClick:function(){return e=a.id,void d(s!==e?e:null);var e},className:" rounded-full relative text-main-text z-3 "},l.a.createElement(x.a,{style:{height:"20px",width:"20px"}}))),l.a.createElement("div",{style:{minHeight:"40px",padding:"0.5rem"}})))}function h(e){e.handleSortBy;var t=e.products,a=e.query,n=Object(p.a)().formatMessage;return l.a.createElement("div",{className:"text-lg"},l.a.createElement("div",null,l.a.createElement("span",{className:"text-gray-700"},t.length),l.a.createElement("span",{className:"text-gray-700"}," ",function(){switch(t.length){case 1:return n({id:"one-search-result"});case 2:return n({id:"two-search-results"});case t.length>10:return n({id:"more-than-10-search-results"});default:return n({id:"search-results"})}}())," ",l.a.createElement("strong",null,a)," "))}var E=a(23),w=a(14),N=a(12),k=a(15),j=a.n(k),O=(a(36),a(21)),C=a(68);function S(e){var t,a,n=e.item,c=e.setCartMenuOpen,s=l.a.useContext(C.a).addToCartMutation,d=Object(p.a)(),m=d.formatMessage,u=d.locale,v=l.a.useContext(y.a).deliveryCountry,_=l.a.useState(!1),f=Object(o.a)(_,2),x=f[0],b=f[1],h=l.a.useState(!1),k=Object(o.a)(h,2),S=k[0],q=k[1],B=l.a.useState((function(){return Object.keys(n.new_variation_addons)[0]})),M=Object(o.a)(B,2),I=M[0],T=M[1],L=l.a.useState((function(){var e={};return Object.keys(n.new_variation_addons).forEach((function(t){e[t]=0})),e})),D=Object(o.a)(L,2),z=D[0],H=D[1],J=l.a.useContext(O.a).userId,P=l.a.useState(!1),Q=Object(o.a)(P,2),A=Q[0],F=Q[1],G=l.a.useState(null),K=Object(o.a)(G,2),R=K[0],U=K[1],V=function(){var e=Object(r.a)(i.a.mark((function e(){var t,a,r,o,l,d,m;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m={quantity:1,id:n.id,variation:{id:null===(t=n.new_variation_addons)||void 0===t?void 0:t[I].id,item_id:null===(a=n.new_variation_addons)||void 0===a?void 0:a[I].addon_item_id},option:{id:null===(r=n.new_variation_addons)||void 0===r||null===(o=r[I].options)||void 0===o?void 0:o[z[I]].id,item_id:null===(l=n.new_variation_addons)||void 0===l||null===(d=l[I].options)||void 0===d?void 0:d[z[I]].addon_item_id}},U(!0),e.prev=2,e.next=5,s({newItem:m,userId:J,deliveryCountry:v});case 5:c(!0),F(!0),q(!1),U(!1),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(2),U(!1),console.error(e.t0.response);case 15:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(){return e.apply(this,arguments)}}(),W=function(){var e=Object(r.a)(i.a.mark((function e(){var t,a,r,o,l,d,m;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m={quantity:1,id:n.id,variation:{id:null===(t=n.new_variation_addons)||void 0===t?void 0:t[I].id,item_id:null===(a=n.new_variation_addons)||void 0===a?void 0:a[I].addon_item_id},option:{id:null===(r=n.new_variation_addons)||void 0===r||null===(o=r[I].options)||void 0===o?void 0:o[z[I]].id,item_id:null===(l=n.new_variation_addons)||void 0===l||null===(d=l[I].options)||void 0===d?void 0:d[z[I]].addon_item_id}},U(!0),e.prev=2,e.next=5,s({newItem:m,userId:J,deliveryCountry:v});case 5:c(!0),F(!0),q(!1),U(!1),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(2),U(!1),console.error(e.t0.response);case 15:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(){return e.apply(this,arguments)}}();return l.a.createElement("div",{onMouseEnter:function(){return b(!0)},onMouseLeave:function(){b(!1),S&&q(!1)}},l.a.createElement("div",{className:"relative"},l.a.createElement("a",{href:"/".concat(u,"/c/").concat(n.id)},function(){var e,t,a;return n.new_variation_addons[I].options?l.a.createElement(g.a,{src:"".concat("https://admin-mrg.mrg-mall.com/storage","/original/").concat((null===(e=n.new_variation_addons[I].options[z[I]])||void 0===e?void 0:e.image)||(null===(t=n.image)||void 0===t?void 0:t.link)),alt:n.translation[u].title,pb:"calc(100% * 286/210)"}):l.a.createElement(g.a,{src:"".concat("https://admin-mrg.mrg-mall.com/storage","/original/").concat(n.new_variation_addons[I].image||(null===(a=n.image)||void 0===a?void 0:a.link)),alt:n.translation[u].title,pb:"calc(100% * 286/210)"})}()),l.a.createElement(N.a,null,x&&l.a.createElement(N.c.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:function(){if(n.new_variation_addons[I].options)return q(!0),void b(!1);V()},className:"flex items-center justify-center absolute w-full bottom-10"},l.a.createElement("button",{className:" text-center rounded uppercase p-2 bg-main-color text-main-text text-sm"},R?l.a.createElement(j.a,{type:"ThreeDots",color:"#fff",height:20,width:20,visible:!0}):m({id:"add-to-cart"})))),l.a.createElement(N.a,null,S&&l.a.createElement(N.c.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:"absolute top-0 z-2 bg-body-light w-full opacity-75 p-2 border"},l.a.createElement("h1",null,m({id:"select"})," ",null===(t=n.new_variation_addons[I].options)||void 0===t?void 0:t[z[I]]["name_".concat(u)]),l.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(20px,35px))",gap:"0.25rem",marginTop:"0.5rem",marginBottom:"0.5rem",width:"100%"}},null===(a=n.new_variation_addons[I].options)||void 0===a?void 0:a.map((function(e,t){var a=z[I]===t;return l.a.createElement("button",{onClick:function(){return H((function(e){return Object(w.a)({},e,Object(E.a)({},I,t))}))},key:e.addon_item_id,className:"hover:bg-main-color hover:text-main-text transition duration-150 p-2 uppercase border text-sm text-center ".concat(a?"bg-main-color text-main-text":"text-body-text-light"," ")},e.addon_item_value.substr(0,1))}))),l.a.createElement("div",{className:"w-full flex justify-center items-center "},l.a.createElement("button",{className:"p-2 bg-green-700 rounded text-sm text-main-text ",onClick:W},R?l.a.createElement(j.a,{type:"ThreeDots",color:"#fff",height:20,width:20,visible:!0}):m({id:"submit"}))))),l.a.createElement(N.a,null,A&&l.a.createElement(N.c.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute top-0 w-full h-full flex items-center justify-center text-main-text bg-blue-700 text-2xl"},m({id:"added-to-cart"})," !"))),l.a.createElement("div",{className:"bg-body-light text-body-text-light"},l.a.createElement("div",{className:"p-2",style:{height:"55px"}},l.a.createElement("a",{title:n.translation[u].title,className:"hover:underline inline-block",href:"/".concat(u,"/c/").concat(n.id)},l.a.createElement("h1",{className:"font-semibold text-sm"},function(){var e=n.new_variation_addons[I].addon_item_value;return"".concat(n.translation[u].title," ").concat(e)}()))),l.a.createElement("div",{className:"p-2 flex items-center justify-between"},n.new_variation_addons[I].options?n.new_variation_addons[I].options[z[I]].promotion_price?l.a.createElement("div",{className:" flex items-center"},l.a.createElement("h1",{className:"font-semibold text-lg text-main-color"},n.new_variation_addons[I].options[z[I]].promotion_price,l.a.createElement("span",{className:"mx-1 text-sm"},null===v||void 0===v?void 0:v.currency.translation[u].symbol)),l.a.createElement("h1",{className:" text-sm mx-1 italic  line-through text-gray-700"},n.new_variation_addons[I].options[z[I]].price,l.a.createElement("span",{className:""},null===v||void 0===v?void 0:v.currency.translation[u].symbol))):l.a.createElement("h1",{className:"font-semibold text-lg text-main-color"},n.new_variation_addons[I].options[z[I]].price,l.a.createElement("span",{className:"mx-1 text-sm"},null===v||void 0===v?void 0:v.currency.translation[u].symbol)):n.new_variation_addons[I].promotion_price?l.a.createElement("div",{className:" flex items-center "},l.a.createElement("h1",{className:"font-semibold text-main-color"},n.new_variation_addons[I].promotion_price,l.a.createElement("span",{className:"mx-1 text-sm"},null===v||void 0===v?void 0:v.currency.translation[u].symbol)),l.a.createElement("h1",{className:" mx-1 text-sm  italic  line-through text-gray-700"},n.new_variation_addons[I].price,l.a.createElement("span",{className:""},null===v||void 0===v?void 0:v.currency.translation[u].symbol))):l.a.createElement("h1",{className:"font-semibold text-main-color"},n.new_variation_addons[I].price,l.a.createElement("span",{className:"mx-1 text-sm"},null===v||void 0===v?void 0:v.currency.translation[u].symbol))),l.a.createElement("div",{className:"p-1",style:{display:"grid",gap:"0.2rem",gridTemplateColumns:"repeat(auto-fill,32px)"}},n.new_variation_addons[I].options?Object.keys(n.new_variation_addons).map((function(e,t){var a;return n.new_variation_addons[e].options[z[e]].image?l.a.createElement("img",{key:t,onClick:function(){return T(e)},className:"cursor-pointer ".concat(I===e&&"border"),alt:n.new_variation_addons[e].id,src:"".concat("https://admin-mrg.mrg-mall.com/storage","/small/").concat(null===(a=n.new_variation_addons[e].options[z[e]])||void 0===a?void 0:a.image)}):l.a.createElement("button",{onClick:function(){return T(e)},className:"p-1 ".concat(I===e?"bg-main-color text-main-text":""," rounded flex items-center justify-center")},n.new_variation_addons[e].addon_item_value.substr(0,1))})):Object.keys(n.new_variation_addons).map((function(e,t){return n.new_variation_addons[e].image?l.a.createElement("img",{onClick:function(){T(e)},key:t,className:"cursor-pointer ".concat(I===e&&"border"),alt:n.new_variation_addons[e].id,src:"".concat("https://admin-mrg.mrg-mall.com/storage","/small/").concat(n.new_variation_addons[e].image)}):l.a.createElement("button",{key:t,onClick:function(){return T(e)},className:"p-1 ".concat(I===e?"bg-main-color text-main-text":""," rounded flex items-center justify-center")},n.new_variation_addons[e].addon_item_value.substr(0,1))})))))}function q(e){var t=e.products,a=e.productsLoading,n=e.handleSortBy,i=e.query;return console.log(t),a?l.a.createElement("div",null,l.a.createElement(_.a,{speed:2,viewBox:"0 0 752 25",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb"},l.a.createElement("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"100%",height:"25"})),l.a.createElement("div",{className:"search-page-items__grid py-2  min-h-screen"},[0,1,2,3,4,5,6,7,8].map((function(e){return l.a.createElement(f.a,{key:e})})))):l.a.createElement("div",null,l.a.createElement(h,{handleSortBy:n,products:t,query:i}),0!==t.length&&l.a.createElement("div",{className:"search-page-items__grid py-2 "},t.map((function(e){return"simple"===e.type?l.a.createElement(b,{key:e.id,item:e,query:i}):l.a.createElement(S,{key:e.id,item:e})}))))}function B(){var e=Object(u.i)().query,t=Object(p.a)().locale,a=Object(m.c)(["searchProducts",e],v.H,{retry:!0}),n=a.data,c=a.isLoading,_=Object(m.b)(function(){var e=Object(r.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(v.I)(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),{throwOnError:!0,onSuccess:function(t){console.log(t),m.a.setQueryData(["categoryProducts",e],(function(){return t}))}}),f=Object(o.a)(_,1)[0],x=function(){var e=Object(r.a)(i.a.mark((function e(a){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={page:1,sortBy:a,sort_language:t},e.next=4,f(n);case 4:r=e.sent,console.log(r),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0.response);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}();return l.a.createElement(d.a,null,l.a.createElement(s.a,null,l.a.createElement("title",null,e)),l.a.createElement("div",{className:"max-w-default mx-auto p-4 overflow-hidden"},l.a.createElement(q,{products:n,productsLoading:c,handleSortBy:x,query:e})))}}}]);
//# sourceMappingURL=28.99a89e88.chunk.js.map