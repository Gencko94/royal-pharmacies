(this["webpackJsonproyal-pharmacy"]=this["webpackJsonproyal-pharmacy"]||[]).push([[11],{451:function(e,t,n){"use strict";n.d(t,"a",(function(){return N}));var a=n(2),c=n.n(a),i=n(76),r=n(8),s=n(28),l=n(197),o=n(103),d=n(129),u=n(39),b=n(10),j=n(4),x=n.n(j),h=n(9),m=n(5),f=n(19),g=n(17),v=n.n(g),p=(n(37),n(56)),y=n(1);function O(e){var t=e.item,n=e.setSideMenuOpen,a=c.a.useContext(u.a),s=a.removeFromCartMutation,l=a.removeFromGuestCartMutation,d=a.coupon,j=c.a.useContext(b.a).deliveryCountry,g=Object(i.a)(),O=g.formatMessage,N=g.locale,w=c.a.useState(!1),C=Object(m.a)(w,2),P=C[0],k=C[1],B=c.a.useContext(f.a).userId,L=function(){var e=Object(h.a)(x.a.mark((function e(){var n,a,c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(k(!0),e.prev=1,!B){e.next=10;break}return n=t.id,a=t.cart_id,e.next=7,s({id:n,cart_id:a,userId:B,deliveryCountry:j,coupon:d});case 7:k(!1),e.next=14;break;case 10:return c=t.options.sku,e.next=13,l({sku:c,deliveryCountry:j,coupon:d});case 13:k(!1);case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(1),k(!1);case 19:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(){return e.apply(this,arguments)}}(),S={hidden:{x:"".concat("ar"===N?"-100%":"100%")},visible:{x:"0",delay:3},exited:{opacity:0}};return Object(y.jsxs)(o.a.div,{initial:"hidden",animate:"visible",exit:"exited",variants:S,className:" side-cart-menu__item mb-2 ",children:[Object(y.jsx)("div",{className:"",children:Object(y.jsx)(r.b,{title:"".concat(t["name_".concat(N)]),to:"/".concat(N,"/products/").concat(t.slug,"/").concat(t.id),onClick:function(){return n(!1)},children:Object(y.jsx)(p.a,{src:t.image,origin:"original",alt:t["name_".concat(N)],pb:"calc(100% * 210/210)"})})}),Object(y.jsxs)("div",{className:"",children:[Object(y.jsx)(r.b,{title:"".concat(t["name_".concat(N)]),className:"hover:underline",to:"/".concat(N,"/products/").concat(t.slug,"/").concat(t.id),onClick:function(){return n(!1)},children:Object(y.jsx)("h1",{className:"font-semibold text-clamp-2 text-sm uppercase ",children:"".concat(t["name_".concat(N)]).concat(t.options.addons?" - ".concat(Object.keys(t.options.addons).map((function(e){return t.options.addons[e]})).join(" - ")):"")})}),Object(y.jsxs)("div",{className:"flex items-center text-gray-700",children:[Object(y.jsxs)("div",{className:"flex items-center",children:[Object(y.jsx)("h1",{className:"text-xs font-semibold",children:O({id:"price"})}),Object(y.jsxs)("h1",{className:"text-xs font-bold mx-1",children:[t.total," ",null===j||void 0===j?void 0:j.currency.translation[N].symbol]})]}),Object(y.jsxs)("div",{className:"flex items-center text-xs mx-2",children:[Object(y.jsxs)("h1",{className:"font-semibold",children:[O({id:"qty"})," :"]}),Object(y.jsx)("h1",{className:"mx-1 font-bold",children:t.qty})]})]}),Object(y.jsx)("div",{children:Object(y.jsx)("button",{className:"\n                bg-main-color text-main-text\n            text-xs rounded p-1 my-1 flex uppercase items-center font-semibold justify-center ",style:{width:"140px"},onClick:L,children:P?Object(y.jsx)(v.a,{type:"ThreeDots",color:"#fff",height:18,width:18,visible:!0}):O({id:"remove-from-cart"})})})]})]})}function N(e){var t=e.setSideMenuOpen,n=c.a.useContext(u.a),a=n.sideCartItems,j=n.sideCartSubTotal,x=n.sideCartCouponCost,h=c.a.useContext(b.a).deliveryCountry,m=Object(i.a)(),f=m.formatMessage,g=m.locale,v={hidden:{x:"".concat("ar"===g?"-100%":"100%"),opacity:0},visible:{x:"0%",opacity:1,transition:{type:"tween"}},exited:{x:"".concat("ar"===g?"-100%":"100%"),transition:{when:"afterChildren"}}};return Object(y.jsx)(o.a.div,{variants:v,initial:"hidden",animate:"visible",exit:"exited",className:"side-add-to-cart__container ".concat("ar"===g?"left-0":"right-0"),children:Object(y.jsxs)("div",{className:" bg-body-light p-2 h-full flex flex-col ",children:[Object(y.jsxs)("div",{className:"flex items-center justify-between",children:[Object(y.jsx)("h1",{className:"font-semibold",children:f({id:"shopping-cart"})}),Object(y.jsx)("button",{onClick:function(){return t(!1)},children:Object(y.jsx)(s.b,{className:"w-5 h-5 "})})]}),Object(y.jsx)("hr",{className:"my-2"}),0===(null===a||void 0===a?void 0:a.length)&&Object(y.jsxs)("div",{className:"flex flex-col justify-center items-center",children:[Object(y.jsx)("img",{src:l.a,alt:"Empty cart"}),Object(y.jsx)("h1",{className:"font-bold mb-2",children:f({id:"cart-empty"})}),Object(y.jsx)(r.b,{to:"/".concat(g),className:"text-sm text-blue-600 hover:underline",children:f({id:"check-today-deals"})})]}),a.length>0&&Object(y.jsx)("div",{className:" flex-1 overflow-y-auto overflow-x-hidden",children:Object(y.jsx)(d.a,{children:a.map((function(e){return Object(y.jsx)(O,{item:e,setSideMenuOpen:t},e.options.sku)}))})}),Object(y.jsx)("hr",{className:"my-1"}),a.length>0&&Object(y.jsxs)("div",{children:["0.000"!==x&&Object(y.jsxs)("div",{className:"flex text-green-700 justify-between semibold items-center  my-2",children:[Object(y.jsx)("h1",{className:"font-bold ",children:f({id:"coupon-sale"})}),Object(y.jsxs)("h1",{className:" font-bold",children:[x," ",null===h||void 0===h?void 0:h.currency.translation[g].symbol]})]}),Object(y.jsxs)("div",{className:"flex justify-between semibold items-center  my-2",children:[Object(y.jsx)("h1",{className:"font-bold",children:f({id:"subtotal"})}),Object(y.jsxs)("h1",{className:" font-bold",children:[j," ",null===h||void 0===h?void 0:h.currency.translation[g].symbol]})]}),Object(y.jsx)("hr",{className:"my-1"}),Object(y.jsx)("div",{className:" flex items-center my-2 text-center text-main-text ",children:Object(y.jsx)(r.b,{to:"/".concat(g,"/cart"),className:"flex-1 py-2 px-3 border font-semibold border-main-color text-main-color mx-1 hover:bg-main-color hover:text-main-text uppercase transition duration-150   rounded",children:f({id:"go-to-cart"})})})]})]})})}},463:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));n(2);var a=n(79),c=n.n(a),i=n(59),r=n.p+"static/media/DesktopBannerPlaceholder.800789ab.png",s=n.p+"static/media/MobileBannerPlaceholder.2796699e.png",l=n(1);function o(e){var t=e.src,n=e.pb,a=e.alt,o=e.origin,d=Object(i.useMediaQuery)({query:"(min-width:768px)"});return Object(l.jsx)("div",{style:{position:"relative",backgroundColor:"#fff",paddingBottom:n,width:"100%",borderRadius:!d&&"12px",overflow:"hidden"},children:Object(l.jsx)(c.a,{offset:400,placeholder:Object(l.jsx)("img",{src:d?r:s,alt:a}),className:"max-h-full",children:Object(l.jsx)("img",{src:t?"".concat("https://admin.royal-online.co/storage","/").concat(o||"original","/").concat(t):d?r:s,alt:a,style:{maxHeight:"100%",maxWidth:"100%",display:"block",left:0,right:0},className:"mx-auto my-0 absolute"})})})}},473:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(57),c=(n(2),n(104)),i=n(76),r=n(1);function s(e){var t=e.brands,n=e.categoryInfoLoading,s=e.productsLoading,l=e.selectedBrands,o=e.setSelectedBrands,d=Object(i.a)(),u=d.formatMessage,b=d.locale;return n||s?Object(r.jsx)("div",{className:"py-2",children:Object(r.jsxs)(c.a,{speed:2,viewBox:"0 0 300 150",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",children:[Object(r.jsx)("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"100%",height:"30"}),Object(r.jsx)("rect",{x:"0",y:"40",rx:"5",ry:"5",width:"100%",height:"15"}),Object(r.jsx)("rect",{x:"0",y:"65",rx:"5",ry:"5",width:"100%",height:"15"}),Object(r.jsx)("rect",{x:"0",y:"90",rx:"5",ry:"5",width:"100%",height:"15"}),Object(r.jsx)("rect",{x:"0",y:"115",rx:"5",ry:"5",width:"100%",height:"15"})]})}):0!==(null===t||void 0===t?void 0:t.length)&&t?Object(r.jsxs)("div",{className:"mb-4 px-2",children:[Object(r.jsx)("h1",{className:"text-lg py-2 font-bold",children:u({id:"filter-by-brand"})}),Object(r.jsx)("hr",{}),Object(r.jsx)("div",{className:"flex flex-col justify-center",style:{maxHeight:"300px",overflow:"auto"},children:null===t||void 0===t?void 0:t.map((function(e){var t=l.find((function(t){return t.id===e.id}));return Object(r.jsxs)("div",{className:"flex items-center my-2",children:[Object(r.jsx)("input",{id:e.id,type:"checkbox",className:"form-checkbox border-gray-600 text-main-color",onChange:function(){return function(e){var t=l.find((function(t){return t.id===e.id}));o(t?function(t){return t.filter((function(t){return t.id!==e.id}))}:function(t){return[].concat(Object(a.a)(t),[e])})}({id:e.id,label:e.translation[b].name})},checked:!!t}),Object(r.jsx)("label",{htmlFor:e.id,className:"hover:underline text-sm hover:text-blue-700 cursor-pointer font-semibold  mx-5",children:e.translation[b].name})]},e.id)}))})]}):null}},474:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var a=n(103),c=n(2),i=n.n(c),r=n(104),s=n(76),l=n(10),o=n(1);function d(e){var t=e.productsLoading,n=e.categoryInfoLoading,c=e.productsLength,d=e.setSelectedPrice,u=e.selectedPrice,b=Object(s.a)(),j=b.locale,x=b.formatMessage,h=i.a.useContext(l.a),m=h.deliveryCountry,f=h.deliveryCountriesLoading,g=h.deliveryCountriesIdle,v=i.a.useMemo((function(){return[1,5,10,20,50,100]}),[]);return t||n||f||g?Object(o.jsx)("div",{className:"py-2",children:Object(o.jsxs)(r.a,{speed:2,viewBox:"0 0 300 150",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",children:[Object(o.jsx)("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"100%",height:"35"}),Object(o.jsx)("rect",{x:"0",y:"40",rx:"5",ry:"5",width:"100%",height:"15"}),Object(o.jsx)("rect",{x:"0",y:"65",rx:"5",ry:"5",width:"100%",height:"15"}),Object(o.jsx)("rect",{x:"0",y:"90",rx:"5",ry:"5",width:"100%",height:"15"}),Object(o.jsx)("rect",{x:"0",y:"115",rx:"5",ry:"5",width:"100%",height:"15"})]})}):t||0!==c?Object(o.jsxs)(a.a.div,{layout:!0,className:"mb-4",children:[Object(o.jsxs)("h1",{className:"text-lg font-bold py-2",children:[x({id:"filter-by-price"})," (",null===m||void 0===m?void 0:m.currency.translation[j].symbol,")"]}),Object(o.jsx)("hr",{}),v.map((function(e){var t=u===e;return Object(o.jsxs)("div",{className:"flex items-center my-1 text-lg",children:[Object(o.jsx)("input",{id:e,type:"radio",className:"border-gray-600 text-main-color",onChange:function(){d(e)},checked:!!t}),Object(o.jsx)("label",{htmlFor:e,className:" mx-5",children:"".concat(x({id:"less-than"})," ").concat(e," ").concat(null===m||void 0===m?void 0:m.currency.translation[j].symbol)})]},e)}))]}):null}},496:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return q}));var a=n(5),c=n(2),i=n.n(c),r=n(195),s=n(76),l=n(10),o=n(473),d=n(474),u=n(1);function b(e){var t=e.categoryInfoLoading,n=e.brandFilters,c=e.priceFilters,r=e.productsLoading,b=e.products,j=e.brands,x=e.handleSubmitFilters,h=e.offers,m=i.a.useContext(l.a),f=m.deliveryCountriesLoading,g=m.deliveryCountriesIdle,v=Object(s.a)().formatMessage,p=i.a.useState((function(){return n.length>0?n:[]})),y=Object(a.a)(p,2),O=y[0],N=y[1],w=i.a.useState((function(){return c||null})),C=Object(a.a)(w,2),P=C[0],k=C[1];return i.a.useEffect((function(){N((function(){return n.length>0?n:[]})),k((function(){return c||null}))}),[c,n]),Object(u.jsxs)("div",{className:"self-start sticky top-0",children:[0===(null===b||void 0===b?void 0:b.length)&&"t"!==h&&Object(u.jsx)(o.a,{brands:j,categoryInfoLoading:t,productsLoading:r,setSelectedBrands:N,selectedBrands:O}),Object(u.jsx)(d.a,{productsLoading:r,productsLength:null===b||void 0===b?void 0:b.length,categoryInfoLoading:t,setSelectedPrice:k,selectedPrice:P}),!r&&!g&&!f&&!t&&b.length>0&&Object(u.jsx)("div",{className:"p-2",children:Object(u.jsx)("button",{disabled:!P&&0===O.length,className:"p-2 uppercase bg-green-700 text-main-text rounded w-full",onClick:function(){x(P,O)},children:v({id:"submit"})})})]})}var j=n(448),x=n(103),h=n(104),m=n(201),f=n(198),g=n(6),v=n(69);function p(e){var t=e.sortBy,n=e.resultsPerPage,a=e.handleSortByChange,c=e.handleResultPerPageChange,r=e.category,l=Object(s.a)(),o=l.formatMessage,d=l.locale,b=i.a.useMemo((function(){return[{value:"newest",label:o({id:"Newest"})},{label:o({id:"Price (Low to High)"}),value:"price-asc"},{label:o({id:"Price (High to Low)"}),value:"price-desc"}]}),[o]),j=i.a.useMemo((function(){return[{label:20,value:20},{label:30,value:30}]}),[]);return Object(u.jsxs)("div",{className:"sm:grid sm:grid-cols-2 gap-2 mb-2 md:flex md:justify-end",children:[Object(u.jsxs)("div",{className:"flex items-center",children:[Object(u.jsx)("h1",{children:o({id:"number-per-page"})}),Object(u.jsx)(v.a,{isSearchable:!1,options:j,value:n,onChange:c,className:"mx-2",styles:{valueContainer:function(e){return Object(g.a)(Object(g.a)({},e),{},{paddingRight:"ar"===d?e.paddingRight:"2rem",paddingLeft:"ar"===d?"2rem":e.paddingLeft})}}})]}),!["best-seller","latest-products"].includes(r)&&Object(u.jsxs)("div",{className:"flex items-center",children:[Object(u.jsx)("h1",{children:o({id:"sort-by"})}),Object(u.jsx)(v.a,{isSearchable:!1,options:b,value:t,onChange:a,className:"mx-2",styles:{valueContainer:function(e){return Object(g.a)(Object(g.a)({},e),{},{paddingRight:"ar"===d?e.paddingRight:"7rem",paddingLeft:"ar"===d?"7rem":e.paddingLeft})}}})]})]})}var y=n(199),O=n(200),N=n.n(O),w=n(131);function C(e){var t=e.products,n=e.productsLoading,a=e.resultsPerPage,c=e.sortBy,r=e.handleRemoveFilters,o=e.handleSortByChange,d=e.filters,b=e.setCartMenuOpen,g=e.handleResultPerPageChange,v=e.productsPageCount,O=e.handleProductChangePage,C=e.productsPage,P=e.category,k=Object(s.a)(),B=k.formatMessage,L=k.locale,S=i.a.useContext(l.a),M=S.deliveryCountriesLoading,_=S.deliveryCountriesIdle;return!["best-seller","latest-products"].includes(P)&&(n||M||_)?Object(u.jsxs)("div",{className:"py-2",children:[Object(u.jsx)(h.a,{speed:2,viewBox:"0 0 752 38",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",children:Object(u.jsx)("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"100%",height:"38"})}),Object(u.jsx)("div",{className:"category-page-items__grid py-2",style:{minHeight:"calc(100vh - 150px)"},children:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((function(e){return Object(u.jsx)(m.a,{},e)}))})]}):["best-seller","latest-products"].includes(P)?Object(u.jsxs)("div",{className:"py-2",children:[Object(u.jsx)(h.a,{speed:2,viewBox:"0 0 752 38",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",children:Object(u.jsx)("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"100%",height:"38"})}),Object(u.jsx)("div",{className:"category-page-items__grid py-2",style:{minHeight:"calc(100vh - 150px)"},children:[0,1,2,3,4,5,6,7,8,9].map((function(e){return Object(u.jsx)(m.a,{},e)}))})]}):Object(u.jsxs)("div",{className:"h-full relative",children:[(null===t||void 0===t?void 0:t.length)>0&&Object(u.jsx)(p,{category:P,sortBy:c,resultsPerPage:a,handleSortByChange:o,handleResultPerPageChange:g}),Object(u.jsx)(j.a,{children:Object(u.jsx)(x.a.div,{layout:!0,className:"flex items-center",children:0!==d.length&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(x.a.h1,{layout:!0,className:"text-lg font-semibold",children:B({id:"filtered-by"})}),Object(u.jsx)(x.a.div,{layout:!0,className:"mx-1 flex items-center",children:d.map((function(e){return Object(u.jsxs)(x.a.button,{layout:!0,className:"mx-1 py-1 px-2 bg-main-color text-main-text rounded-full whitespace-no-wrap",onClick:function(){return r(e)},children:[B({id:e.type})," : ",e.value]},e.value)}))})]})})}),(null===t||void 0===t?void 0:t.length)>0&&!n&&Object(u.jsx)("div",{className:"category-page-items__grid py-2 min-h-full relative",style:{minHeight:"calc(100vh - 150px)"},children:null===t||void 0===t?void 0:t.map((function(e){return"variation"===e.type&&Object.keys(e.new_variation_addons).length>0?Object(u.jsx)(y.a,{setCartMenuOpen:b,item:e},e.id):Object(u.jsx)(f.a,{setCartMenuOpen:b,item:e},e.id)}))}),(null===t||void 0===t?void 0:t.length)>0&&!n&&Object(u.jsx)(N.a,{previousLabel:"ar"===L?Object(u.jsx)(w.b,{className:"w-6 h-6 inline"}):Object(u.jsx)(w.a,{className:"w-6 h-6 inline"}),nextLabel:"ar"===L?Object(u.jsx)(w.a,{className:"w-6 h-6 inline"}):Object(u.jsx)(w.b,{className:"w-6 h-6 inline"}),breakLabel:"...",breakClassName:"inline",pageCount:v,marginPagesDisplayed:2,pageRangeDisplayed:2,initialPage:C-1,disableInitialCallback:!0,onPageChange:O,containerClassName:"my-2 w-full text-center",subContainerClassName:"p-3 inline",pageLinkClassName:"p-3",activeClassName:"bg-main-color font-bold text-main-text",pageClassName:" inline-block mx-2 rounded-full text-lg",previousClassName:"p-3 inline font-bold",nextClassName:"p-3 inline font-bold",disabledClassName:"text-gray-500"})]})}var P=n(95),k=n(93),B=n(40),L=n(18),S=n(8),M=n(447),_=n(443),I=(n(196),n(56));function F(e){var t,n=e.categoryInfo,a=Object(s.a)(),c=a.locale,i=a.formatMessage,r=Object(B.i)().category;return Object(u.jsx)("div",{children:Object(u.jsxs)(M.a,{id:"main",className:"my-3",breakpoints:{640:{slidesPerView:4,spaceBetween:20},860:{slidesPerView:4,spaceBetween:20},1100:{slidesPerView:8.25,spaceBetween:20},1440:{slidesPerView:7,spaceBetween:20}},children:[(null===n||void 0===n?void 0:n.children.length)>0&&Object(u.jsxs)(_.a,{className:"overflow-hidden  rounded-lg m-2  relative",children:[Object(u.jsx)(S.c,{activeClassName:"border-l-8  border-main-color",isActive:function(){if(r===(null===n||void 0===n?void 0:n.slug))return!0},to:"/".concat(c,"/category/").concat(null===n||void 0===n?void 0:n.slug,"/").concat(null===n||void 0===n?void 0:n.id),className:"block rounded-lg overflow-hidden shadow-lg m-2",children:Object(u.jsx)(I.a,{src:null===n||void 0===n||null===(t=n.title[c].image)||void 0===t?void 0:t.link,alt:null===n||void 0===n?void 0:n.title[c].name,pb:"calc(100% * 210/210)",origin:"original"})}),Object(u.jsx)("h1",{className:"text-center mt-4 text-lg font-semibold",children:i({id:"all"})})]},"first"),((null===n||void 0===n?void 0:n.children.length)>0?n.children:null===n||void 0===n?void 0:n.parentChildren).map((function(e){var t;return Object(u.jsxs)(_.a,{className:"overflow-hidden  rounded-lg m-2  relative \n             \n            ",children:[Object(u.jsx)(S.c,{activeClassName:"border-l-8  border-main-color",isActive:function(){if(r===(null===e||void 0===e?void 0:e.slug))return!0},to:"/".concat(c,"/category/").concat(e.slug,"/").concat(e.id),className:"block rounded-lg overflow-hidden shadow-lg m-2",replace:0===(null===n||void 0===n?void 0:n.children.length),children:Object(u.jsx)(I.a,{src:null===(t=e.translation[c].image)||void 0===t?void 0:t.link,alt:e.translation[c].name,pb:"calc(100% * 210/210)",origin:"original"})}),Object(u.jsx)("h1",{className:"text-center mt-4 text-lg font-semibold",children:e.translation[c].name})]},e.id)}))]})})}var R=n(463);function V(e){var t=e.categoryInfo,n=e.categoryInfoLoading,a=e.offers,c=Object(s.a)(),i=c.locale,r=c.formatMessage;return n?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(h.a,{speed:4,viewBox:"0 0 1440 300",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",children:Object(u.jsx)("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"100%",height:"300"})}),Object(u.jsx)(M.a,{id:"main",slidesPerView:7,spaceBetween:15,className:"my-3",breakpoints:{320:{slidesPerView:2,spaceBetween:20},480:{slidesPerView:3,spaceBetween:20},640:{slidesPerView:4,spaceBetween:20},860:{slidesPerView:5,spaceBetween:20},1100:{slidesPerView:6,spaceBetween:20},1440:{slidesPerView:7,spaceBetween:20}},children:[0,1,2,3,4,5,6].map((function(e){return Object(u.jsx)(_.a,{className:"my-2",children:Object(u.jsx)(h.a,{speed:4,viewBox:"0 0   171 258.36",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",children:Object(u.jsx)("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"100%",height:"258.36"})})},e)}))})]}):Object(u.jsxs)("div",{className:"mb-4",children:[Object(u.jsx)(R.a,{src:t.landscape_image,origin:"original",alt:null===t||void 0===t?void 0:t.title[i].name,pb:"calc(100% * 300/1440)"}),Object(u.jsxs)("div",{className:"mt-2",children:[Object(u.jsx)("h1",{className:"text-4xl font-bold text-center ",children:null===t||void 0===t?void 0:t.title[i].name}),a&&Object(u.jsx)("h1",{className:"text-2xl font-bold text-center ",children:r({id:"offers"})})]}),!a&&Object(u.jsx)(F,{categoryInfo:t})]})}var H=n(129),D=n(451),E=n(145);function q(){var e=Object(B.g)(),t=Object(B.i)(),n=t.category,c=t.id,o=i.a.useContext(l.a),d=o.deliveryCountry,j=o.settings,h=Object(s.a)(),m=h.locale,f=h.formatMessage,g=i.a.useState([]),v=Object(a.a)(g,2),p=v[0],y=v[1],O=Object(B.h)(),N=new URLSearchParams(O.search).get("offers"),w=i.a.useState({value:"newest",label:f({id:"Newest"})}),S=Object(a.a)(w,2),M=S[0],_=S[1],I=i.a.useState((function(){var t;return(null===(t=e.location.state)||void 0===t?void 0:t.page)||1})),F=Object(a.a)(I,2),R=F[0],q=F[1],A=i.a.useState({label:20,value:20}),J=Object(a.a)(A,2),T=J[0],G=J[1],Q=i.a.useState(null),U=Object(a.a)(Q,2),W=U[0],z=U[1],K=i.a.useState((function(){return[]})),X=Object(a.a)(K,2),Y=X[0],Z=X[1],$=i.a.useState(!1),ee=Object(a.a)($,2),te=ee[0],ne=ee[1],ae=Object(k.a)(["category-products",{page:R,resultsPerPage:T,id:c,brandFilters:p,priceFilters:W,sortBy:M,offers:"t"===N}],(function(){return Object(L.q)({page:R,resultsPerPage:T,id:c,brandFilters:p,priceFilters:W,sortBy:M,offers:"t"===N})}),{retry:!0}),ce=ae.data,ie=ae.isLoading,re=ae.error,se=Object(k.a)(["categoryInfo",n],(function(){return Object(L.A)(n)}),{retry:!0,keepPreviousData:!0}),le=se.data,oe=se.isLoading;i.a.useEffect((function(){return function(){q(1)}}),[e.location.pathname]);return re&&"Category not founded"===re.response.data.message?Object(u.jsx)(B.a,{to:"/".concat(m,"/page/404")}):Object(u.jsxs)(P.a,{children:[Object(u.jsx)(r.a,{children:Object(u.jsx)("title",{children:le?"".concat(f({id:"shop"})," ").concat(null===le||void 0===le?void 0:le.title[m].name):null===j||void 0===j?void 0:j.store_name_en})}),Object(u.jsxs)(H.a,{children:[te&&Object(u.jsx)(D.a,{setSideMenuOpen:ne},"side-cart"),te&&Object(u.jsx)(x.a.div,{initial:{opacity:0},animate:{opacity:.5},exit:{opacity:0},onClick:function(){return ne(!1)},className:"side__addCart-bg"},"sidecart-bg")]}),Object(u.jsxs)("div",{className:"max-w-default mx-auto p-4 overflow-hidden",style:{minHeight:"calc(100vh - 150px)"},children:[Object(u.jsx)(V,{categoryInfo:le,categoryInfoLoading:oe,offers:N}),Object(u.jsxs)("div",{className:"search-page__container",children:[Object(u.jsx)(b,{categoryInfoLoading:oe,products:null===ce||void 0===ce?void 0:ce.products,offers:N,productsLoading:ie,brandFilters:p,setBrandFilters:y,priceFilters:W,brands:null===le||void 0===le?void 0:le.brands,handleSubmitFilters:function(e,t){y(t),z(e),Object(E.b)(window,{top:500,behavior:"smooth"}),Z((function(){if(e&&!t.length>0)return[{type:"Price",value:"".concat(f({id:"less-than"})," ").concat(e," ").concat(null===d||void 0===d?void 0:d.currency.translation[m].symbol)}];if(!e&&t.length>0){var n=[];return t.forEach((function(e){return n.push({type:"Brand",value:e.label})})),[].concat(n)}var a={type:"Price",value:"".concat(f({id:"less-than"})," ").concat(e," ").concat(null===d||void 0===d?void 0:d.currency.translation[m].symbol)},c=[];return t.forEach((function(e){return c.push({type:"Brand",value:e.label})})),[a].concat(c)}))}}),Object(u.jsx)(C,{products:null===ce||void 0===ce?void 0:ce.products,productsLoading:ie,sortBy:M,setResultsPerPage:G,filters:Y,handleRemoveFilters:function(e){Z((function(t){return t.filter((function(t){return t.value!==e.value}))})),"Brand"===e.type&&y((function(t){return t.filter((function(t){return t.label!==e.value}))})),"Sort"===e.type&&_({value:"newest",label:f({id:"Newest"})}),"Price"===e.type&&z(null)},handleSortByChange:function(e){if("newest"===e.value)return Z((function(e){return e.filter((function(e){return"Sort"!==e.type}))})),void _(e);Z((function(t){var n=t.filter((function(e){return"Sort"!==e.type}));return n.push({type:"Sort",value:e.label}),n})),_(e)},setCartMenuOpen:ne,resultsPerPage:T,handleResultPerPageChange:function(e){G(e)},productsPageCount:null===ce||void 0===ce?void 0:ce.lastPage,handleProductChangePage:function(t){Object(E.b)(window,{top:660,behavior:"smooth"}),e.push({state:{page:t.selected+1}}),q(t.selected+1)},category:n,productsPage:R})]}),0===(null===ce||void 0===ce?void 0:ce.products.length)&&"t"!==N&&Object(u.jsx)("div",{className:"p-6 flex flex-col items-center justify-center text-xl h-full",children:f({id:"no-products"})}),0===(null===ce||void 0===ce?void 0:ce.products.length)&&"t"===N&&Object(u.jsxs)("div",{className:"p-6 flex flex-col items-center justify-center  h-full",children:[Object(u.jsx)("h1",{className:"text-2xl font-bold text-center",children:f({id:"no-offers"})}),Object(u.jsx)("h1",{className:"text-xl text-center",children:f({id:"comeback-later"})}),Object(u.jsx)("button",{onClick:function(){return e.push("/".concat(m,"/category/").concat(n,"/").concat(c))},className:"p-2 bg-main-color mt-2 text-main-text rounded text-lg ",children:f({id:"go-to-products"})})]})]})]})}}}]);
//# sourceMappingURL=11.06eadff8.chunk.js.map