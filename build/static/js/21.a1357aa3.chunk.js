(this["webpackJsonproyal-pharmacy"]=this["webpackJsonproyal-pharmacy"]||[]).push([[21],{276:function(e,t,a){"use strict";a.d(t,"a",(function(){return N}));var n=a(1),l=a.n(n),i=a(64),c=a(4),o=a(26),r=a(147),s=a.n(r),m=a(5),d=a(34),u=a(7),p=a(3),b=a.n(p),v=a(6),x=a(2),f=a(18),y=a(16),h=a.n(y),E=(a(28),a(48));function g(e){var t=e.item,a=e.setSideMenuOpen,n=l.a.useContext(d.a),o=n.removeFromCartMutation,r=n.removeFromGuestCartMutation,s=n.coupon,p=l.a.useContext(u.a).deliveryCountry,y=Object(i.a)(),g=y.formatMessage,N=y.locale,C=l.a.useState(!1),k=Object(x.a)(C,2),w=k[0],O=k[1],j=l.a.useContext(f.a).userId,M=function(){var e=Object(v.a)(b.a.mark((function e(){var a,n,l;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(O(!0),e.prev=1,!j){e.next=10;break}return a=t.id,n=t.cart_id,e.next=7,o({id:a,cart_id:n,userId:j,deliveryCountry:p,coupon:s});case 7:O(!1),e.next=14;break;case 10:return l=t.options.sku,e.next=13,r({sku:l,deliveryCountry:p,coupon:s});case 13:O(!1);case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(1),O(!1);case 19:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(){return e.apply(this,arguments)}}(),_={hidden:{x:"".concat("ar"===N?"-100%":"100%")},visible:{x:"0",delay:3},exited:{opacity:0}};return l.a.createElement(m.c.div,{initial:"hidden",animate:"visible",exit:"exited",variants:_,className:" side-cart-menu__item mb-2 "},l.a.createElement("div",{className:""},l.a.createElement(c.b,{title:"".concat(t["name_".concat(N)]),to:"/".concat(N,"/products/").concat(t.slug,"/").concat(t.id),onClick:function(){return a(!1)}},l.a.createElement(E.a,{src:t.image,origin:"original",alt:t["name_".concat(N)],pb:"calc(100% * 210/210)"}))),l.a.createElement("div",{className:""},l.a.createElement(c.b,{title:"".concat(t["name_".concat(N)]),className:"hover:underline",to:"/".concat(N,"/products/").concat(t.slug,"/").concat(t.id),onClick:function(){return a(!1)}},l.a.createElement("h1",{className:"font-semibold text-clamp-2 text-sm uppercase "},"".concat(t["name_".concat(N)]).concat(t.options.addons?" - ".concat(Object.keys(t.options.addons).map((function(e){return t.options.addons[e]})).join(" - ")):""))),l.a.createElement("div",{className:"flex items-center text-gray-700"},l.a.createElement("div",{className:"flex items-center"},l.a.createElement("h1",{className:"text-xs font-semibold"},g({id:"price"})),l.a.createElement("h1",{className:"text-xs font-bold mx-1"},t.total," ",null===p||void 0===p?void 0:p.currency.translation[N].symbol)),l.a.createElement("div",{className:"flex items-center text-xs mx-2"},l.a.createElement("h1",{className:"font-semibold"},g({id:"qty"})," :"),l.a.createElement("h1",{className:"mx-1 font-bold"},t.qty))),l.a.createElement("div",null,l.a.createElement("button",{className:"\n                bg-main-color text-main-text\n            text-xs rounded p-1 my-1 flex uppercase items-center font-semibold justify-center ",style:{width:"140px"},onClick:M},w?l.a.createElement(h.a,{type:"ThreeDots",color:"#fff",height:18,width:18,visible:!0}):g({id:"remove-from-cart"})))))}function N(e){var t=e.setSideMenuOpen,a=l.a.useContext(d.a),n=a.sideCartItems,r=a.sideCartSubTotal,p=a.sideCartCouponCost,b=l.a.useContext(u.a).deliveryCountry,v=Object(i.a)(),x=v.formatMessage,f=v.locale,y={hidden:{x:"".concat("ar"===f?"-100%":"100%"),opacity:0},visible:{x:"0%",opacity:1,transition:{type:"tween"}},exited:{x:"".concat("ar"===f?"-100%":"100%"),transition:{when:"afterChildren"}}};return l.a.createElement(m.c.div,{variants:y,initial:"hidden",animate:"visible",exit:"exited",className:"side-add-to-cart__container ".concat("ar"===f?"left-0":"right-0")},l.a.createElement("div",{className:" bg-body-light p-2 h-full flex flex-col "},l.a.createElement("div",{className:"flex items-center justify-between"},l.a.createElement("h1",{className:"font-semibold"},x({id:"shopping-cart"})),l.a.createElement("button",{onClick:function(){return t(!1)}},l.a.createElement(o.b,{className:"w-5 h-5 "}))),l.a.createElement("hr",{className:"my-2"}),0===(null===n||void 0===n?void 0:n.length)&&l.a.createElement("div",{className:"flex flex-col justify-center items-center"},l.a.createElement("img",{src:s.a,alt:"Empty cart"}),l.a.createElement("h1",{className:"font-bold mb-2"},x({id:"cart-empty"})),l.a.createElement(c.b,{to:"/".concat(f),className:"text-sm text-blue-600 hover:underline"},x({id:"check-today-deals"}))),n.length>0&&l.a.createElement("div",{className:" flex-1 overflow-y-auto overflow-x-hidden"},l.a.createElement(m.a,null,n.map((function(e){return l.a.createElement(g,{key:e.options.sku,item:e,setSideMenuOpen:t})})))),l.a.createElement("hr",{className:"my-1"}),n.length>0&&l.a.createElement("div",null,"0.000"!==p&&l.a.createElement("div",{className:"flex text-green-700 justify-between semibold items-center  my-2"},l.a.createElement("h1",{className:"font-bold "},x({id:"coupon-sale"})),l.a.createElement("h1",{className:" font-bold"},p," ",null===b||void 0===b?void 0:b.currency.translation[f].symbol)),l.a.createElement("div",{className:"flex justify-between semibold items-center  my-2"},l.a.createElement("h1",{className:"font-bold"},x({id:"subtotal"})),l.a.createElement("h1",{className:" font-bold"},r," ",null===b||void 0===b?void 0:b.currency.translation[f].symbol)),l.a.createElement("hr",{className:"my-1"}),l.a.createElement("div",{className:" flex items-center my-2 text-center text-main-text "},l.a.createElement(c.b,{to:"/".concat(f,"/cart"),className:"flex-1 py-2 px-3 border font-semibold border-main-color text-main-color mx-1 hover:bg-main-color hover:text-main-text uppercase transition duration-150   rounded"},x({id:"go-to-cart"}))))))}},315:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return N}));var n=a(2),l=a(5),i=a(1),c=a.n(i),o=a(145),r=a(103),s=a(64),m=a(150),d=a.n(m),u=a(13),p=a(31),b=a(109),v=a(151),x=a(148),f=a(149),y=a(70),h=a(276),E=a(7),g=a(17);function N(){var e,t,a,i,m,N=Object(s.a)(),C=N.formatMessage,k=N.locale,w=Object(p.i)().slug,O=c.a.useState(1),j=Object(n.a)(O,2),M=j[0],_=j[1],S=c.a.useState(!1),L=Object(n.a)(S,2),G=L[0],I=L[1],R=c.a.useContext(E.a),D=R.deliveryCountriesLoading,K=R.deliveryCountriesIdle,P=Object(u.c)(["single-brand",{slug:w,page:M,number:42}],g.z,{retry:!0,refetchOnWindowFocus:!1,keepPreviousData:!0}),F=P.data,q=P.isLoading;return c.a.createElement(y.a,null,c.a.createElement(o.a,null,c.a.createElement("title",null,F?"".concat(F.brandName[k].name," | ").concat(C({id:"mrg-mall-kuwait"})):"MRG Mall Kuwait Online Shop | \u0645\u062a\u062c\u0631 \u0625\u0645 \u0622\u0631 \u062c\u064a \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0627\u0644\u0643\u0648\u064a\u062a"),c.a.createElement("meta",{name:"description",content:F?"".concat(C({id:"shop"})," ").concat(null===F||void 0===F||null===(e=F.brandName)||void 0===e?void 0:e[k].name," ").concat(C({id:"on-mrg-mall-kuwait"})):"MRG Mall Kuwait Online Shop | \u0645\u062a\u062c\u0631 \u0625\u0645 \u0622\u0631 \u062c\u064a \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0627\u0644\u0643\u0648\u064a\u062a"}),c.a.createElement("meta",{property:"og:title",content:F?"".concat(F.brandName[k].name," | ").concat(C({id:"mrg-mall-kuwait"})):"MRG Mall Kuwait Online Shop | \u0645\u062a\u062c\u0631 \u0625\u0645 \u0622\u0631 \u062c\u064a \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0627\u0644\u0643\u0648\u064a\u062a"}),c.a.createElement("meta",{property:"og:description",content:F?"".concat(C({id:"shop"})," ").concat(null===F||void 0===F||null===(t=F.full_translation)||void 0===t?void 0:t[k].title,"  ").concat(C({id:"on-mrg-mall-kuwait"})):"MRG Mall Kuwait Online Shop | \u0645\u062a\u062c\u0631 \u0625\u0645 \u0622\u0631 \u062c\u064a \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0627\u0644\u0643\u0648\u064a\u062a"})),c.a.createElement(l.a,null,G&&c.a.createElement(h.a,{key:"side-cart",setSideMenuOpen:I}),G&&c.a.createElement(l.c.div,{key:"sidecart-bg",initial:{opacity:0},animate:{opacity:.5},exit:{opacity:0},onClick:function(){return I(!1)},className:"side__addCart-bg"})),c.a.createElement("div",{className:"max-w-default mx-auto p-4 overflow-hidden",style:{minHeight:"calc(100vh - 150px)"}},!q&&c.a.createElement("div",{className:"flex justify-center flex-col items-center"},c.a.createElement("h1",{className:"font-bold text-2xl mb-3"},C({id:"shop-brands"})," ",null===F||void 0===F||null===(a=F.brandName)||void 0===a?void 0:a[k].name," ",C({id:"at-mrg"})),c.a.createElement("img",{src:"".concat("https://admin-mrg.mrg-mall.com/storage","/original/").concat(null===F||void 0===F?void 0:F.brandLogo),alt:null===F||void 0===F||null===(i=F.brandName)||void 0===i?void 0:i[k].name,style:{maxHeight:"200px",width:"auto"}})),(q||D||K)&&c.a.createElement("div",{className:"brand-grid__desktop py-2 "},[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27].map((function(e){return c.a.createElement(v.a,{key:e})}))),c.a.createElement("div",{className:"brand-grid__desktop py-2 "},null===F||void 0===F||null===(m=F.products)||void 0===m?void 0:m.map((function(e){return"variation"===e.type&&Object.entries(e.new_variation_addons).length>0?c.a.createElement(f.a,{key:e.id,setCartMenuOpen:I,item:e}):c.a.createElement(x.a,{key:e.id,setCartMenuOpen:I,item:e})})))),c.a.createElement(d.a,{previousLabel:c.a.createElement(r.a,{className:"w-6 h-6 inline"}),nextLabel:c.a.createElement(r.b,{className:"w-6 h-6 inline"}),breakLabel:"...",breakClassName:"inline",pageCount:null===F||void 0===F?void 0:F.pageCount,marginPagesDisplayed:2,pageRangeDisplayed:2,initialPage:M-1,disableInitialCallback:!0,onPageChange:function(e){Object(b.b)(window,{top:500}),_(e.selected+1)},containerClassName:"my-2 w-full text-center",subContainerClassName:"p-3 inline",pageLinkClassName:"p-3",activeClassName:"bg-main-color font-bold text-main-text",pageClassName:" inline-block mx-2 rounded-full text-lg",previousClassName:"p-3 inline font-bold",nextClassName:"p-3 inline font-bold",disabledClassName:"text-gray-500"}))}}}]);
//# sourceMappingURL=21.a1357aa3.chunk.js.map