(this["webpackJsonproyal-pharmacy"]=this["webpackJsonproyal-pharmacy"]||[]).push([[24],{323:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return Y}));var n=a(2),r=a(1),c=a.n(r),l=a(145),s=a(278),i=a(31),o=a(64),m=a(5);function u(e){var t=e.setCheckOutModalOpen,a=Object(o.a)(),n=a.formatMessage,r=a.locale,l=Object(i.g)();return c.a.createElement(m.c.div,{variants:{hidden:{y:50,opacity:0},visible:{y:0,opacity:1},exited:{y:50,opacity:0}},initial:"hidden",animate:"visible",exit:"exited",className:"fixed top-0 left-0 right-0 bottom-0 z-30 flex items-center justify-center"},c.a.createElement("div",{className:"rounded-lg  \n             \n                bg-body-light text-body-text-light\n             w-11/12 md:max-w-xl z-2 "},c.a.createElement("div",{className:" px-4 py-3  text-lg font-semibold flex items-center justify-between"},c.a.createElement("h1",null,n({id:"checkout"})),c.a.createElement("button",{onClick:function(){return t(!1)}},c.a.createElement(s.a,null))),c.a.createElement("hr",null),c.a.createElement("h1",{className:"px-4 pt-2  font-semibold"},n({id:"not-signed-in"})," ,",n({id:"you-can"})," :"),c.a.createElement("div",{className:"flex items-center  px-4 py-3 text-white"},c.a.createElement("div",{className:"flex-1"},c.a.createElement("button",{onClick:function(){return l.push("/".concat(r,"/checkout/guest-checkout"))},className:"p-2  bg-green-600 rounded w-full text-center uppercase"},n({id:"guest-checkout"}))),c.a.createElement("div",{className:"flex-1 mx-2"},c.a.createElement("button",{onClick:function(){return l.push("/".concat(r,"/app/login"))},className:"p-2   text-center bg-blue-700 rounded w-full uppercase"},n({id:"login"})))),c.a.createElement("hr",null),c.a.createElement("div",{className:"p-4 text-sm"},c.a.createElement("p",null,n({id:"checkout-modal-tos"})))),c.a.createElement("div",{onClick:function(){return t(!1)},className:"z-1 absolute top-0 left-0 h-full w-full modal-bg"}))}var d=a(70),p=a(34),x=a(7),h=a(4),y=a(18);function b(){var e=c.a.useContext(y.a).userId,t=Object(o.a)(),a=t.formatMessage,n=t.locale;return c.a.createElement(m.c.div,{variants:{hidden:{opacity:0},visible:{opacity:1},exited:{opacity:0}},initial:"hidden",animate:"visible",exit:"exited",className:" flex flex-col items-center justify-center h-full"},c.a.createElement("div",{className:"flex items-center justify-center flex-col"},c.a.createElement("div",{className:"text-center"},c.a.createElement("h1",{className:"text-2xl font-bold p-2"},a({id:"cart-empty"})),c.a.createElement(h.b,{to:"/".concat(n,"/"),className:"text-blue-600 hover:underline"},a({id:"check-today-deals"})))),!e&&c.a.createElement("div",{className:"flex flex-col justify-center p-2 font-semibold"},c.a.createElement(h.b,{to:"/".concat(n,"/app/login"),className:"  text-center rounded py-2 px-3 bg-green-700 text-main-text uppercase "},a({id:"login"})),c.a.createElement(h.b,{to:"/".concat(n,"/app/register"),className:" text-center  rounded py-2 px-3 bg-blue-700 text-main-text mt-2 uppercase "},a({id:"register"}))))}var f=a(3),g=a.n(f),E=a(6),v=a(16),N=a.n(v),w=(a(28),a(48)),k=a(23);function C(e){var t=e.item,a=c.a.useState(!1),r=Object(n.a)(a,2),l=r[0],s=r[1],i=c.a.useState(!1),u=Object(n.a)(i,2),d=u[0],b=u[1],f=c.a.useContext(p.a),v=f.editCartMutation,C=f.addToWishListMutation,j=f.removeFromWishListMutation,O=f.removeFromCartMutation,S=f.coupon,I=c.a.useContext(y.a).userId,M=c.a.useContext(x.a).deliveryCountry,q=c.a.useState(t.qty),_=Object(n.a)(q,2),T=_[0],D=_[1],W=c.a.useState(!1),L=Object(n.a)(W,2),F=L[0],G=L[1],J=Object(o.a)(),z=J.formatMessage,A=J.locale,B=function(){var e=Object(E.a)(g.a.mark((function e(t,a){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(t),e.prev=1,e.next=4,O({id:t,userId:I,cart_id:a,deliveryCountry:M,coupon:S});case 4:s(null),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),s(null);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t,a){return e.apply(this,arguments)}}(),Q=function(){var e=Object(E.a)(g.a.mark((function e(a,n,r){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r>t.options.max_quantity||0===r||t.qty===r)){e.next=2;break}return e.abrupt("return");case 2:return G(!0),e.prev=3,e.next=6,v({cartId:a,itemId:n,userId:I,quantity:r,coupon:S});case 6:G(!1),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),G(!1);case 12:case"end":return e.stop()}}),e,null,[[3,9]])})));return function(t,a,n){return e.apply(this,arguments)}}(),R=function(){var e=Object(E.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j({id:t,userId:I});case 3:b(!1),e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(E.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C({id:t.id,userId:I});case 3:b(!0),e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}();return c.a.createElement(m.c.div,{layout:!0,variants:{hidden:{opacity:0},visible:{opacity:1},exited:{x:300,opacity:0,transition:{duration:.3,ease:"easeOut"}}},initial:"hidden",animate:"visible",exit:"exited",className:"cart-item py-2 border-b"},c.a.createElement(h.b,{to:"/".concat(A,"/products/").concat(t.slug,"/").concat(t.id)},c.a.createElement(w.a,{src:t.image,origin:"original",alt:t["name_".concat(A)],pb:"calc(100% * 286/210)"})),c.a.createElement("div",{className:""},c.a.createElement(h.b,{to:"/".concat(A,"/products/").concat(t.slug,"/").concat(t.id)},c.a.createElement("h1",{className:"font-semibold "},"".concat(t["name_".concat(A)]).concat(t.options.addons?" - ".concat(Object.keys(t.options.addons).map((function(e){return t.options.addons[e]})).join(" - ")):""))),c.a.createElement("h1",{className:" font-semibold text-sm mb-1"},t.options.max_quantity<5?function(e){switch(e){case 0:return c.a.createElement("span",{className:"text-main-color"},z({id:"no-items-left"}));case 1:return c.a.createElement("span",{className:"text-yellow-700"},z({id:"one-item-left"}));case 2:return c.a.createElement("span",{className:"text-yellow-700"},z({id:"two-items-left"}));default:return c.a.createElement("span",{className:" text-yellow-700"},e," ",z({id:"items-left"}))}}(t.options.max_quantity):c.a.createElement("span",{className:"text-green-700"},z({id:"in-stock"}))),c.a.createElement("div",{className:"flex items-center mb-2 "},c.a.createElement("h1",{className:" font-semibold"},z({id:"quantity"})),c.a.createElement("div",{className:" flex items-center justify-center mx-3"},c.a.createElement("button",{onClick:function(){1!==parseInt(T)&&D(parseInt(T)-1)},className:"p-1"},c.a.createElement(k.o,{className:"w-6 h-6 ".concat(1===T?"text-gray-700":"text-blue-700")})),c.a.createElement("input",{type:"number",value:T,onChange:function(e){e.target.value<1||e.target.value>t.options.max_quantity||D(e.target.value)},className:"mx-1 px-2 py-1 border rounded",style:{maxWidth:"50px",textAlign:"center"}}),c.a.createElement("button",{onClick:function(){T!==t.options.max_quantity&&D(parseInt(T)+1)},className:"p-1"},c.a.createElement(k.q,{className:"w-6 h-6 text-blue-700"}))),c.a.createElement("button",{onClick:function(){return Q(t.cart_id,t.id,T)},style:{width:"50px"},disabled:T>t.options.max_quantity||0===T||t.qty===T,className:"p-1 flex items-center justify-center text-xs rounded ".concat(T>t.options.max_quantity||0===T||t.qty===T?"bg-gray-600 text-gray-400":"bg-main-color text-main-text")},F?c.a.createElement(N.a,{type:"ThreeDots",color:"#fff",height:18,width:18,visible:!0}):z({id:"update-btn"}))),c.a.createElement("div",{className:"flex text-sm  items-center "},c.a.createElement("button",{onClick:function(){B(t.id,t.cart_id)},className:"\n              bg-main-color\n              text-main-text text-sm flex items-center justify-center  p-2 rounded  font-semibold uppercase ",style:{width:"200px"},disabled:l},l?c.a.createElement(N.a,{type:"ThreeDots",color:"#fff",height:21,width:21,visible:!0}):c.a.createElement(c.a.Fragment,null,c.a.createElement("h1",{className:"mx-2 whitespace-no-wrap"},z({id:"remove-from-cart"})))),c.a.createElement("button",{onClick:function(){d?R(t.id):P(t)},className:"\n              border mx-2\n            text-sm p-2 rounded-full uppercase bg-gray-100  flex items-center justify-center font-semibold"},d?c.a.createElement(k.a,{className:"w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 "}):c.a.createElement(k.k,{className:"w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 "})))),c.a.createElement("div",{className:"text-center",style:{fontWeight:"900"}},t.price," ",null===M||void 0===M?void 0:M.currency.translation[A].symbol,t.message&&c.a.createElement("h1",{className:"text-main-color text-xs"},"(",z({id:t.message}),")")),c.a.createElement("div",{className:"text-center text-green-700",style:{fontWeight:"900"}},t.total," ",null===M||void 0===M?void 0:M.currency.translation[A].symbol))}var j=a(296);function O(){var e=c.a.useContext(p.a),t=e.cartItems,a=e.cartItemsLoading,r=e.cartSubtotal,l=e.cartMessage,i=c.a.useContext(x.a).deliveryCountry,u=c.a.useState(!0),d=Object(n.a)(u,2),h=d[0],y=d[1],f=Object(o.a)(),g=f.formatMessage,E=f.locale;return a?c.a.createElement(j.a,{locale:E}):0===t.length?c.a.createElement(m.a,null,0===t.length&&c.a.createElement(b,null)):c.a.createElement("div",null,l&&h&&c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"rounded bg-blue-400 p-4 relative"},g({id:l}),c.a.createElement("button",{onClick:function(){return y(!1)},className:"absolute rounded hover:bg-gray-100 transition duration-75",style:{top:"4px",right:"en"===E?"4px":"",left:"ar"===E?"4px":""}},c.a.createElement(s.b,{className:"w-5 h-5"}))),c.a.createElement("hr",{className:"my-1"})),c.a.createElement("div",{className:"cart-grid-titles font-semibold text-lg"},c.a.createElement("div",null),c.a.createElement("h1",{className:"  "},g({id:"the-item"})),c.a.createElement("h1",{className:"text-center"},g({id:"price"})),c.a.createElement("h1",{className:"text-center"},g({id:"total"}))),c.a.createElement("hr",null),c.a.createElement(m.b,null,c.a.createElement(m.c.div,{initial:!1,layout:!0,className:" grid grid-cols-1 gap-2"},c.a.createElement(m.a,null,t.map((function(e){return c.a.createElement(C,{key:e.options.sku,item:e})})))),c.a.createElement(m.c.div,{layout:!0,className:"flex justify-end p-2 rounded mt-2 border bg-gray-100",style:{fontWeight:"900"}},c.a.createElement("h1",null,g({id:"cart-total"})),c.a.createElement("h1",{className:"mx-1 whitespace-no-wrap "},"(","ar"===E?t.length>2&&t.length:"".concat(t.length," "),function(){switch(t.length){case 1:return g({id:"one-item"});case 2:return g({id:"two-items"});case t.length>10:return g({id:"more-than-10-items"});default:return g({id:"multiple-items"})}}(),")"),c.a.createElement("h1",{className:"text-green-700"},r),c.a.createElement("span",{className:"mx-1 text-green-700"},null===i||void 0===i?void 0:i.currency.translation[E].symbol)),c.a.createElement(m.c.div,{layout:!0,className:"text-sm my-4 font-semibold "},c.a.createElement("h1",null,g({id:"cart-tos"})))),c.a.createElement("hr",null))}var S=a(78),I=a(13),M=a(275),q=a(17);function _(){var e=Object(o.a)(),t=e.formatMessage,a=e.locale,n=Object(I.c)("viewedItems",q.I,{retry:!0}),r=n.data;return n.isLoading?c.a.createElement("div",{className:"border rounded p-2 bg-gray-100"},c.a.createElement(S.a,{speed:3,viewBox:"0 0 400 680",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",rtl:"ar"===a,style:{alignSelf:"flex-start"}},c.a.createElement("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"30%",height:"120"}),c.a.createElement("rect",{x:"32%",y:"0",rx:"5",ry:"5",width:"100%",height:"35"}),c.a.createElement("rect",{x:"32%",y:"40",rx:"5",ry:"5",width:"100%",height:"35"}),c.a.createElement("rect",{x:"32%",y:"80",rx:"5",ry:"5",width:"100%",height:"38"}),c.a.createElement("rect",{x:"0",y:"140",rx:"5",ry:"5",width:"30%",height:"120"}),c.a.createElement("rect",{x:"32%",y:"140",rx:"5",ry:"5",width:"100%",height:"35"}),c.a.createElement("rect",{x:"32%",y:"180",rx:"5",ry:"5",width:"100%",height:"35"}),c.a.createElement("rect",{x:"32%",y:"220",rx:"5",ry:"5",width:"100%",height:"38"}),c.a.createElement("rect",{x:"0",y:"280",rx:"5",ry:"5",width:"30%",height:"120"}),c.a.createElement("rect",{x:"32%",y:"280",rx:"5",ry:"5",width:"100%",height:"35"}),c.a.createElement("rect",{x:"32%",y:"320",rx:"5",ry:"5",width:"100%",height:"35"}),c.a.createElement("rect",{x:"32%",y:"360",rx:"5",ry:"5",width:"100%",height:"38"}),c.a.createElement("rect",{x:"0",y:"420",rx:"5",ry:"5",width:"30%",height:"120"}),c.a.createElement("rect",{x:"32%",y:"420",rx:"5",ry:"5",width:"100%",height:"35"}),c.a.createElement("rect",{x:"32%",y:"460",rx:"5",ry:"5",width:"100%",height:"35"}),c.a.createElement("rect",{x:"32%",y:"500",rx:"5",ry:"5",width:"100%",height:"38"}),c.a.createElement("rect",{x:"0",y:"560",rx:"5",ry:"5",width:"30%",height:"120"}),c.a.createElement("rect",{x:"32%",y:"560",rx:"5",ry:"5",width:"100%",height:"35"}),c.a.createElement("rect",{x:"32%",y:"600",rx:"5",ry:"5",width:"100%",height:"35"}),c.a.createElement("rect",{x:"32%",y:"640",rx:"5",ry:"5",width:"100%",height:"38"}))):c.a.createElement("div",{className:"border rounded  bg-gray-100"},c.a.createElement("div",{className:"p-2 flex items-center justify-between"},c.a.createElement("h1",{className:""},t({id:"your-recently-visited-items"})),c.a.createElement(h.b,{className:"p-1 text-xs rounded bg-main-color text-main-text",to:"/".concat(a,"/vieweditems")},t({id:"seeAll"}))),c.a.createElement("hr",null),c.a.createElement("div",{className:"p-2"},r.slice(0,5).map((function(e){var t;return c.a.createElement("div",{key:e.id,className:"recent-items__container mb-1 "},c.a.createElement(h.b,{to:"/".concat(a,"/products/").concat(e.slug,"/").concat(e.id)},c.a.createElement(w.a,{src:null===(t=e.image)||void 0===t?void 0:t.link,origin:"small",alt:e.translation[a].title,pb:"calc(100% * 210/210)"})),c.a.createElement("div",{className:"text-sm"},c.a.createElement(h.b,{to:"/".concat(a,"/products/").concat(e.slug,"/").concat(e.id)},c.a.createElement("h1",{className:"text-clamp-2"},e.translation[a].title)),c.a.createElement(M.a,{initialRating:e.rating_avg,emptySymbol:c.a.createElement(k.s,{className:"text-main-color"}),fullSymbol:c.a.createElement(k.d,{className:"text-main-color"}),className:"pt-1",readonly:!0})))}))))}var T=a(111),D=a.n(T),W=a(110),L=a.n(W),F=a(112),G=a.n(F);function J(){var e=c.a.useContext(x.a).deliveryCountry,t=Object(o.a)().formatMessage;return c.a.createElement("div",{className:"mb-2 bg-gray-100"},c.a.createElement("h1",{className:"mb-2 text-center font-semibold"},t({id:"accepted-payments"})),c.a.createElement("div",{className:"flex items-center justify-evenly mb-2"},function(){var t=[];if(e)return e.payment.forEach((function(e){if(0===e.status)return null;"knet"===e.key&&t.push(c.a.createElement("img",{key:e.key,src:L.a,alt:e.key})),"credit"===e.key&&t.push(c.a.createElement("img",{key:e.key,src:D.a,alt:e.key})),"amex"===e.key&&t.push(c.a.createElement("img",{key:e.key,src:G.a,alt:e.key}))})),t}()))}var z=a(282);function A(e){var t=e.locale;return c.a.createElement("div",{className:" rounded border bg-gray-100 p-2 flex justify-center flex-col mb-2 "},c.a.createElement(S.a,{speed:3,viewBox:"0 0 400 240",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",rtl:"ar"===t,style:{alignSelf:"flex-start"}},c.a.createElement("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"100%",height:"53"}),c.a.createElement("rect",{x:"0",y:"62",rx:"5",ry:"5",width:"100%",height:"53"}),c.a.createElement("rect",{x:"0",y:"124",rx:"5",ry:"5",width:"100%",height:"53"}),c.a.createElement("rect",{x:"0",y:"186",rx:"5",ry:"5",width:"100%",height:"53"})))}var B=a(44);function Q(e){var t=e.setCheckOutModalOpen,a=c.a.useContext(p.a),r=a.cartItems,l=a.cartItemsLoading,s=a.cartTotal,m=a.couponCost,u=a.shippingCost,d=a.cartSubtotal,h=a.checkCouponMutation,b=a.isCheckingCoupon,f=a.coupon,v=a.setCoupon,w=a.cartItemsFetching,k=a.note,C=c.a.useContext(y.a).userId,j=c.a.useContext(x.a).deliveryCountry,O=Object(B.useMediaQuery)({query:"(min-width:1040px)"}),S=c.a.useState(""),I=Object(n.a)(S,2),M=I[0],q=I[1],T=c.a.useState((function(){return!!f})),D=Object(n.a)(T,2),W=D[0],L=D[1],F=c.a.useState(""),G=Object(n.a)(F,2),Q=G[0],R=G[1],P=c.a.useState(""),H=Object(n.a)(P,2),K=H[0],U=H[1],V=Object(i.g)(),X=Object(o.a)(),Y=X.formatMessage,Z=X.locale,$=JSON.parse(localStorage.getItem("browse-history")),ee=function(){var e=Object(E.a)(g.a.mark((function e(t){var a,n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!W){e.next=7;break}L(!1),v(null),q(""),e.next=22;break;case 7:if(R(!1),M){e.next=10;break}return e.abrupt("return");case 10:return e.prev=10,e.next=13,h({code:M,subtotal:d.toString()});case 13:L(!0),v(M),e.next=22;break;case 17:e.prev=17,e.t0=e.catch(10),L(!1),R(!0),"Coupon expired"===e.t0.response.data.message?U(Y({id:"coupon-expired"})):"The selected code is invalid."===(null===(a=e.t0.response.data.message)||void 0===a||null===(n=a.code)||void 0===n?void 0:n[0])||"Coupon not exist"===e.t0.response.data.message?U(Y({id:"coupon-invalid"})):"The amount is less then the minimum"===e.t0.response.data.message&&U(Y({id:"coupon-conditions-not-met"}));case 22:case"end":return e.stop()}}),e,null,[[10,17]])})));return function(t){return e.apply(this,arguments)}}();return c.a.createElement("div",{className:"font-semibold overflow-hidden  sticky top-0 self-start",style:{top:O?"110px":"61px"}},l&&c.a.createElement(A,{locale:Z}),!l&&0!==r.length&&c.a.createElement("div",{className:" rounded border bg-gray-100 p-2 flex justify-center flex-col mb-2 "},c.a.createElement("div",{className:"mb-2 "},c.a.createElement("form",{onSubmit:ee,className:"rounded border w-full flex mb-1  overflow-hidden ".concat(Q&&"border-main-color")},c.a.createElement("input",{type:"text",value:f||M,onChange:function(e){return q(e.target.value)},placeholder:Y({id:"cart-enter-code-or-coupon"}),readOnly:W,className:"".concat(W&&"bg-gray-400 min-w-0 text-gray-200"," flex-1 placeholder-gray-700  p-2")}),c.a.createElement("button",{type:"submit",className:"bg-main-color flex items-center text-sm justify-center p-2 text-main-text uppercase ",style:{width:"80px"}},b?c.a.createElement(N.a,{type:"ThreeDots",color:"#fff",height:22,width:22,visible:!0}):Y(W?{id:"remove"}:{id:"cart-code-button"}))),Q&&c.a.createElement("h1",{className:"text-main-color text-xs"},K),k&&c.a.createElement("h1",{className:"text-main-color text-xs"},Y({id:"coupon-limit-reached"}))),c.a.createElement("div",{className:" flex mb-2  "},c.a.createElement("h1",{className:"text-gray-900"},Y({id:"cart-total"})),c.a.createElement("h1",{className:"mx-1 whitespace-no-wrap flex-1"},"(","ar"===Z?r.length>2&&r.length:"".concat(r.length," "),function(){switch(r.length){case 1:return Y({id:"one-item"});case 2:return Y({id:"two-items"});case r.length>10:return Y({id:"one-items"});default:return Y({id:"multiple-items"})}}(),")"),c.a.createElement("h1",null,d),c.a.createElement("span",{className:"mx-1"},null===j||void 0===j?void 0:j.currency.translation[Z].symbol)),c.a.createElement("div",{className:"flex items-center mb-2"},c.a.createElement("h1",{className:"flex-1"},Y({id:"delivery-cost"})),c.a.createElement("h1",null,0===u?c.a.createElement("span",{className:"text-green-700 uppercase font-semibold"},Y({id:"cart-free"})):c.a.createElement("span",null,u,c.a.createElement("span",{className:"mx-1"},null===j||void 0===j?void 0:j.currency.translation[Z].symbol)))),W&&!k&&c.a.createElement("div",{className:"flex text-green-700 items-center mb-2"},c.a.createElement("h1",{className:" flex-1"},Y({id:"coupon-sale"})),w?c.a.createElement(N.a,{type:"ThreeDots",color:"#b72b2b",height:22,width:22,visible:!0}):c.a.createElement("h1",null,m,c.a.createElement("span",{className:"mx-1"},null===j||void 0===j?void 0:j.currency.translation[Z].symbol))),c.a.createElement("hr",{className:"mb-3"}),c.a.createElement("div",{className:"  flex mb-2 text-lg ",style:{fontWeight:900}},c.a.createElement("h1",{className:"flex-1 text-gray-900"},Y({id:"subtotal"})),w?c.a.createElement(N.a,{type:"ThreeDots",color:"#b72b2b",height:22,width:22,visible:!0}):c.a.createElement("h1",{className:"text-green-700"},s," ",c.a.createElement("span",{className:"mx-1 text-green-700"},null===j||void 0===j?void 0:j.currency.translation[Z].symbol))),c.a.createElement("hr",{className:"mb-3"}),c.a.createElement("button",{onClick:function(){C?V.push("/".concat(Z,"/checkout/user-checkout")):t(!0)},className:"".concat(0===r.length||k?"cursor-not-allowed  bg-gray-600":"bg-green-600"," p-2 rounded text-body-light uppercase mb-3  "),disabled:0===r.length||k},Y({id:"checkout"})),c.a.createElement(J,{deliveryCountry:j})),$.length>4?c.a.createElement(_,null):c.a.createElement(z.a,null))}function R(e){var t=e.item,a=c.a.useContext(x.a).deliveryCountry,r=c.a.useContext(p.a),l=r.removeFromGuestCartMutation,s=r.editGuestCartMutation,i=r.coupon,u=c.a.useState(t.qty),d=Object(n.a)(u,2),y=d[0],b=d[1],f=c.a.useState(!1),v=Object(n.a)(f,2),C=v[0],j=v[1],O=c.a.useState(!1),S=Object(n.a)(O,2),I=S[0],M=S[1],q=Object(o.a)(),_=q.formatMessage,T=q.locale,D=function(){var e=Object(E.a)(g.a.mark((function e(n,r){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(y>t.options.max_quantity||0===y||t.qty===y)){e.next=2;break}return e.abrupt("return");case 2:return j(!0),e.prev=3,e.next=6,s({sku:n,quantity:y,price:r,deliveryCountry:a,coupon:i});case 6:j(!1),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),j(!1);case 12:case"end":return e.stop()}}),e,null,[[3,9]])})));return function(t,a){return e.apply(this,arguments)}}(),W=function(){var e=Object(E.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return M(!0),e.prev=1,e.next=4,l({sku:t,deliveryCountry:a,coupon:i});case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),M(!1);case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}();return c.a.createElement(m.c.div,{layout:!0,variants:{hidden:{opacity:0},visible:{opacity:1},exited:{x:300,opacity:0,transition:{duration:.3,ease:"easeOut"}}},initial:"hidden",animate:"visible",exit:"exited",className:"cart-item py-2 border-b"},c.a.createElement(h.b,{to:"/".concat(T,"/products/").concat(t.slug,"/").concat(t.id)},c.a.createElement(w.a,{src:t.image,origin:"original",alt:t["name_".concat(T)],pb:"calc(100% * 286/210)"})),c.a.createElement("div",{className:""},c.a.createElement(h.b,{to:"/".concat(T,"/products/").concat(t.slug,"/").concat(t.id)},c.a.createElement("h1",{className:"font-semibold "},"".concat(t["name_".concat(T)]).concat(t.options.addons?" - ".concat(Object.keys(t.options.addons).map((function(e){return t.options.addons[e]})).join(" - ")):""))),c.a.createElement("h1",{className:" font-semibold text-sm mb-1"},t.options.max_quantity<5?function(e){switch(e){case 0:return c.a.createElement("span",{className:"text-main-color"},_({id:"no-items-left"}));case 1:return c.a.createElement("span",{className:" text-yellow-700"},_({id:"one-item-left"}));case 2:return c.a.createElement("span",{className:"text-yellow-700"},_({id:"two-items-left"}));default:return c.a.createElement("span",{className:"  text-yellow-700"},e," ",_({id:"items-left"}))}}(t.options.max_quantity):c.a.createElement("span",{className:"text-green-700"},_({id:"in-stock"}))),c.a.createElement("div",{className:"flex items-center mb-2 "},c.a.createElement("h1",{className:" font-semibold"},_({id:"quantity"})),c.a.createElement("div",{className:" flex items-center justify-center mx-3"},c.a.createElement("button",{onClick:function(){1!==parseInt(y)&&b(parseInt(y)-1)},className:"p-1"},c.a.createElement(k.o,{className:"w-6 h-6 ".concat(1===y?"text-gray-700":"text-blue-700")})),c.a.createElement("input",{type:"number",value:y,onChange:function(e){e.target.value<1||e.target.value>t.options.max_quantity||b(e.target.value)},className:"mx-1 px-2 py-1 border rounded",style:{maxWidth:"50px",textAlign:"center"}}),c.a.createElement("button",{onClick:function(){b(parseInt(y)+1)},className:"p-1"},c.a.createElement(k.q,{className:"w-6 h-6 text-blue-700"}))),c.a.createElement("button",{onClick:function(){return D(t.options.sku,t.price)},style:{width:"50px"},disabled:y>t.options.max_quantity||0===y||t.qty===y,className:"p-1 flex items-center justify-center text-xs rounded ".concat(y>t.options.max_quantity||0===y||t.qty===y?"bg-gray-600 text-gray-400":"bg-main-color text-main-text")},C?c.a.createElement(N.a,{type:"ThreeDots",color:"#fff",height:20,width:20,visible:!0}):_({id:"update-btn"}))),c.a.createElement("div",{className:"flex text-sm  items-center "},c.a.createElement("button",{onClick:function(){W(t.options.sku,t.price)},className:"bg-main-color\n             text-main-text text-sm flex items-center justify-center  p-2 rounded  font-semibold uppercase ",style:{width:"200px"},disabled:I},I?c.a.createElement(N.a,{type:"ThreeDots",color:"#fff",height:21,width:21,visible:!0}):c.a.createElement(c.a.Fragment,null,c.a.createElement("h1",{className:"mx-2 whitespace-no-wrap"},_({id:"remove-from-cart"})))))),c.a.createElement("div",{className:"text-center",style:{fontWeight:"900"}},t.price," ",null===a||void 0===a?void 0:a.currency.translation[T].symbol,t.message&&c.a.createElement("h1",{className:"text-main-color text-xs"},"(",_({id:t.message}),")")),c.a.createElement("div",{className:"text-center ",style:{fontWeight:"900"}},t.total," ",null===a||void 0===a?void 0:a.currency.translation[T].symbol))}function P(){var e=c.a.useContext(p.a),t=e.guestCartItems,a=e.guestCartTotal,n=e.guestCartItemsLoading,r=c.a.useContext(x.a).deliveryCountry,l=Object(o.a)(),s=l.formatMessage,i=l.locale;return n?c.a.createElement(j.a,{locale:i}):c.a.createElement("div",{className:"text-body-text-light"},c.a.createElement(m.a,null,0===t.length&&c.a.createElement(b,null)),0!==t.length&&c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"cart-grid-titles font-semibold text-lg"},c.a.createElement("div",null),c.a.createElement("h1",{className:"  "},s({id:"the-item"})),c.a.createElement("h1",{className:"text-center"},s({id:"price"})),c.a.createElement("h1",{className:"text-center"},s({id:"total"}))),c.a.createElement("hr",null),c.a.createElement(m.b,null,c.a.createElement(m.c.div,{initial:!1,layout:!0},c.a.createElement(m.a,null,t.map((function(e){return c.a.createElement(R,{key:e.options.sku,item:e})})))),c.a.createElement(m.c.div,{layout:!0,className:"flex justify-end p-2 rounded mt-2 border bg-gray-100",style:{fontWeight:"900"}},c.a.createElement("h1",null,s({id:"cart-total"})),c.a.createElement("h1",{className:"mx-1 whitespace-no-wrap "},"(","ar"===i?t.length>2&&t.length:"".concat(t.length," "),function(){switch(t.length){case 1:return s({id:"one-item"});case 2:return s({id:"two-items"});case t.length>10&&t:return s({id:"more-than-10-items"});default:return s({id:"multiple-items"})}}(),")"),c.a.createElement("h1",null,a)," ",null===r||void 0===r?void 0:r.currency.translation[i].symbol),c.a.createElement(m.c.div,{layout:!0,className:"text-sm my-4"},c.a.createElement("h1",null,s({id:"cart-tos"}))))),c.a.createElement("hr",null))}function H(e){var t=e.setCheckOutModalOpen,a=c.a.useContext(p.a),r=a.guestCartItems,l=a.guestCartItemsLoading,s=a.guestCartTotal,m=a.guestCouponCost,u=a.guestShippingCost,d=a.guestCartSubtotal,h=a.checkCouponMutation,b=a.isCheckingCoupon,f=a.setCoupon,v=a.coupon,w=a.guestCartItemsFetching,k=c.a.useContext(y.a).userId,C=c.a.useContext(x.a).deliveryCountry,j=c.a.useState(""),O=Object(n.a)(j,2),S=O[0],I=O[1],M=Object(B.useMediaQuery)({query:"(min-width:1040px)"}),q=c.a.useState((function(){return!!v})),T=Object(n.a)(q,2),D=T[0],W=T[1],L=c.a.useState(""),F=Object(n.a)(L,2),G=F[0],Q=F[1],R=c.a.useState(""),P=Object(n.a)(R,2),H=P[0],K=P[1],U=Object(i.g)(),V=Object(o.a)(),X=V.formatMessage,Y=V.locale,Z=JSON.parse(localStorage.getItem("browse-history")),$=function(){var e=Object(E.a)(g.a.mark((function e(t){var a,n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!D){e.next=7;break}W(!1),f(null),I(""),e.next=22;break;case 7:if(Q(!1),S){e.next=10;break}return e.abrupt("return");case 10:return e.prev=10,e.next=13,h({code:S,subtotal:d.toString()});case 13:W(!0),f(S),e.next=22;break;case 17:e.prev=17,e.t0=e.catch(10),W(!1),Q(!0),"Coupon expired"===e.t0.response.data.message?K(X({id:"coupon-expired"})):"The selected code is invalid."===(null===(a=e.t0.response.data.message)||void 0===a||null===(n=a.code)||void 0===n?void 0:n[0])||"Coupon not exist"===e.t0.response.data.message?K(X({id:"coupon-invalid"})):"The amount is less then the minimum"===e.t0.response.data.message?K(X({id:"coupon-conditions-not-met"})):"Coupon limited"===e.t0.response.data.message&&K(X({id:"coupon-limit-reached"}));case 22:case"end":return e.stop()}}),e,null,[[10,17]])})));return function(t){return e.apply(this,arguments)}}();return c.a.createElement("div",{className:"font-semibold overflow-hidden  sticky top-0 self-start",style:{top:M?"110px":"61px"}},l&&c.a.createElement(A,{locale:Y}),!l&&0!==r.length&&c.a.createElement("div",{className:" rounded border bg-gray-100 p-2 flex justify-center flex-col mb-2 "},c.a.createElement("div",{className:"mb-2 "},c.a.createElement("form",{onSubmit:$,className:"rounded border w-full flex mb-1  overflow-hidden ".concat(G&&"border-main-color")},c.a.createElement("input",{type:"text",value:v||S,onChange:function(e){return I(e.target.value)},placeholder:X({id:"cart-enter-code-or-coupon"}),readOnly:D,className:"".concat(D&&"bg-gray-400 text-gray-200"," flex-1 placeholder-gray-700  p-2")}),c.a.createElement("button",{type:"submit",className:"bg-main-color flex items-center text-sm justify-center p-2 text-main-text uppercase ",style:{width:"70px"}},b?c.a.createElement(N.a,{type:"ThreeDots",color:"#fff",height:22,width:22,visible:!0}):X(D?{id:"remove"}:{id:"cart-code-button"}))),G&&c.a.createElement("h1",{className:"text-main-color text-xs"},H)),c.a.createElement("div",{className:" flex mb-2  "},c.a.createElement("h1",{className:"text-gray-900"},X({id:"cart-total"})),c.a.createElement("h1",{className:"mx-1 whitespace-no-wrap flex-1"},"(","ar"===Y?r.length>2&&r.length:"".concat(r.length," "),function(){switch(r.length){case 1:return X({id:"one-item"});case 2:return X({id:"two-items"});case r.length>10:return X({id:"one-items"});default:return X({id:"multiple-items"})}}(),")"),c.a.createElement("h1",null,d),c.a.createElement("span",{className:"mx-1"},null===C||void 0===C?void 0:C.currency.translation[Y].symbol)),c.a.createElement("div",{className:"flex items-center mb-2"},c.a.createElement("h1",{className:"flex-1"},X({id:"delivery-cost"})),c.a.createElement("h1",null,0===u?c.a.createElement("span",{className:"text-green-700 uppercase font-semibold"},X({id:"cart-free"})):c.a.createElement("span",null,u,c.a.createElement("span",{className:"mx-1"},null===C||void 0===C?void 0:C.currency.translation[Y].symbol)))),D&&c.a.createElement("div",{className:"flex text-green-700 items-center mb-2"},c.a.createElement("h1",{className:" flex-1"},X({id:"coupon-sale"})),w?c.a.createElement(N.a,{type:"ThreeDots",color:"#b72b2b",height:22,width:22,visible:!0}):c.a.createElement("h1",null,m,c.a.createElement("span",{className:"mx-1"},null===C||void 0===C?void 0:C.currency.translation[Y].symbol))),c.a.createElement("hr",{className:"mb-3"}),c.a.createElement("div",{className:"  flex mb-2 text-lg ",style:{fontWeight:900}},c.a.createElement("h1",{className:"flex-1 text-gray-900"},X({id:"subtotal"})),w?c.a.createElement(N.a,{type:"ThreeDots",color:"#b72b2b",height:22,width:22,visible:!0}):c.a.createElement("h1",{className:"text-green-700"},s," ",c.a.createElement("span",{className:"mx-1 text-green-700"},null===C||void 0===C?void 0:C.currency.translation[Y].symbol))),c.a.createElement("hr",{className:"mb-3"}),c.a.createElement("button",{onClick:function(){k?U.push("/".concat(Y,"/user-checkout")):t(!0)},className:"".concat(0===r.length?"cursor-not-allowed  bg-gray-600":"bg-green-600"," p-2 rounded text-body-light uppercase mb-3  "),disabled:0===r.length},X({id:"checkout"})),c.a.createElement(J,{deliveryCountry:C})),Z.length>4?c.a.createElement(_,null):c.a.createElement(z.a,null))}function K(e){var t=e.setCheckOutModalOpen;return c.a.createElement("div",{className:"cart-main-grid"},c.a.createElement(P,null),c.a.createElement(H,{setCheckOutModalOpen:t}))}var U=a(306),V=a(284),X=a(109);function Y(){var e=c.a.useContext(p.a),t=e.cartItemsLoading,a=e.isGetCartError,r=c.a.useContext(x.a).deliveryCountriesLoading,s=c.a.useContext(y.a),i=s.userId,h=s.authenticationLoading,b=c.a.useState(!1),f=Object(n.a)(b,2),g=f[0],E=f[1],v=Object(o.a)().formatMessage;return!t&&a?c.a.createElement(d.a,null,c.a.createElement("div",{className:"px-4 py-2 max-w-default mx-auto min-h-screen"},c.a.createElement("h1",null,v({id:"something-went-wrong-snackbar"})))):c.a.createElement(d.a,null,c.a.createElement(l.a,null,c.a.createElement("title",null,v({id:"cart"})," | MRG")),c.a.createElement("div",{className:"px-4 py-2 max-w-default mx-auto text-body-text-light"},c.a.createElement(m.a,null,g&&c.a.createElement(u,{setCheckOutModalOpen:E})),(h||r)&&c.a.createElement(U.a,null),!h&&i&&!a&&!r&&c.a.createElement("div",{className:"cart-main-grid"},c.a.createElement(O,null),c.a.createElement(Q,{setCheckOutModalOpen:E})),!h&&!i&&!r&&c.a.createElement(K,{setCheckOutModalOpen:E}),c.a.createElement(V.a,{title:"Perfumes",type:"perfumes",cb:function(){Object(X.b)(window,{top:0})}})))}}}]);
//# sourceMappingURL=24.fb9bb5ed.chunk.js.map