(this["webpackJsonproyal-pharmacy"]=this["webpackJsonproyal-pharmacy"]||[]).push([[15],{283:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(1),r=a.n(n),c=a(78),l=a(64);function s(){var e=Object(l.a)().locale;return r.a.createElement("div",{className:"mt-4"},r.a.createElement(c.a,{speed:3,viewBox:"0 0 400 450",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",rtl:"ar"===e},r.a.createElement("rect",{x:"0",y:"0",rx:"1",ry:"1",width:"28%",height:"85"}),r.a.createElement("rect",{x:"30%",y:"0",rx:"1",ry:"1",width:"77%",height:"25"}),r.a.createElement("rect",{x:"30%",y:"30px",rx:"1",ry:"1",width:"77%",height:"25"}),r.a.createElement("rect",{x:"30%",y:"60px",rx:"1",ry:"1",width:"77%",height:"25"}),r.a.createElement("rect",{x:"0",y:"105",rx:"1",ry:"1",width:"28%",height:"85"}),r.a.createElement("rect",{x:"30%",y:"105",rx:"1",ry:"1",width:"77%",height:"25"}),r.a.createElement("rect",{x:"30%",y:"135",rx:"1",ry:"1",width:"77%",height:"25"}),r.a.createElement("rect",{x:"30%",y:"165",rx:"1",ry:"1",width:"77%",height:"25"}),r.a.createElement("rect",{x:"0",y:"210",rx:"1",ry:"1",width:"28%",height:"85"}),r.a.createElement("rect",{x:"30%",y:"210",rx:"1",ry:"1",width:"77%",height:"25"}),r.a.createElement("rect",{x:"30%",y:"240",rx:"1",ry:"1",width:"77%",height:"25"}),r.a.createElement("rect",{x:"30%",y:"270",rx:"1",ry:"1",width:"77%",height:"25"}),r.a.createElement("rect",{x:"0",y:"315",rx:"1",ry:"1",width:"28%",height:"85"}),r.a.createElement("rect",{x:"30%",y:"315",rx:"1",ry:"1",width:"77%",height:"25"}),r.a.createElement("rect",{x:"30%",y:"345",rx:"1",ry:"1",width:"77%",height:"25"}),r.a.createElement("rect",{x:"30%",y:"375",rx:"1",ry:"1",width:"77%",height:"25"})))}},296:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(1),r=a.n(n),c=a(16),l=a.n(c);a(28);function s(){return r.a.createElement("div",{className:"py-1 mx-2 flex items-center justify-center",style:{minHeight:"calc(-80px + 100vh)"}},r.a.createElement(l.a,{type:"ThreeDots",color:"#b72b2b",height:30,width:30,visible:!0}))}},320:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return J}));var n=a(2),r=a(1),c=a.n(r),l=a(64),s=a(5),i=a(31),o=a(278);function m(e){var t=e.setCheckOutPopupOpen,a=Object(l.a)(),n=a.formatMessage,r=a.locale,m=Object(i.g)();return c.a.createElement(s.c.div,{variants:{hidden:{y:"100%"},visible:{y:0,transition:{type:"tween"}},exited:{y:"100%"}},initial:"hidden",animate:"visible",exit:"exited",className:"cart-checkout-popup-mobile p-2 pb-6 bg-nav-cat-light shadow-lg border-t"},c.a.createElement("div",{className:"flex items-center justify-between mb-2"},c.a.createElement("h1",{className:"font-semibold"},n({id:"not-signed-in"})," ,",n({id:"you-can"})," :"),c.a.createElement("button",{onClick:function(){return t(!1)}},c.a.createElement(o.b,{className:"w-5 h-5"}))),c.a.createElement("div",{className:"text-white",style:{display:"grid",gridTemplateColumns:"0.5fr 0.5fr",gap:"0.25rem"}},c.a.createElement("div",{className:"flex-1"},c.a.createElement("button",{onClick:function(){return m.push("/".concat(r,"/checkout/guest-checkout"))},className:"p-2 text-sm  bg-green-600 rounded w-full text-center uppercase"},n({id:"guest-checkout"}))),c.a.createElement("div",{className:"flex-1"},c.a.createElement("button",{onClick:function(){return m.push("/".concat(r,"/app/login"))},className:"p-2 text-sm  text-center bg-blue-700 rounded w-full uppercase"},n({id:"short-login"})))))}var u=a(18),d=a(3),p=a.n(d),x=a(6),h=a(34),y=a(7),b=a(78);function f(e){var t=e.locale;return c.a.createElement("div",{className:" rounded border bg-gray-100 p-2 flex justify-center flex-col mb-2 "},c.a.createElement(b.a,{speed:3,viewBox:"0 0 400 240",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",rtl:"ar"===t,style:{alignSelf:"flex-start"}},c.a.createElement("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"100%",height:"53"}),c.a.createElement("rect",{x:"0",y:"62",rx:"5",ry:"5",width:"100%",height:"53"}),c.a.createElement("rect",{x:"0",y:"124",rx:"5",ry:"5",width:"100%",height:"53"}),c.a.createElement("rect",{x:"0",y:"186",rx:"5",ry:"5",width:"100%",height:"53"})))}var g=a(16),E=a.n(g),v=(a(28),a(111)),N=a.n(v),w=a(110),k=a.n(w),C=a(112),j=a.n(C);function O(){var e=c.a.useContext(y.a).deliveryCountry,t=Object(l.a)().formatMessage;return c.a.createElement("div",{className:"bg-gray-200 -mx-2 p-2 border-b"},c.a.createElement("h1",{className:"mb-2 text-center font-semibold"},t({id:"accepted-payments"})),c.a.createElement("div",{className:"flex items-center justify-evenly mb-2"},function(){var t=[];if(e)return e.payment.forEach((function(e){if(0===e.status)return null;"knet"===e.key&&t.push(c.a.createElement("img",{key:e.key,src:k.a,alt:e.key})),"credit"===e.key&&t.push(c.a.createElement("img",{key:e.key,src:N.a,alt:e.key})),"amex"===e.key&&t.push(c.a.createElement("img",{key:e.key,src:j.a,alt:e.key}))})),t}()))}function I(){var e=c.a.useContext(h.a),t=e.cartItems,a=e.cartItemsLoading,r=e.cartTotal,s=e.couponCost,o=e.shippingCost,m=e.cartItemsFetching,u=e.cartSubtotal,d=e.checkCouponMutation,b=e.isCheckingCoupon,g=e.setCoupon,v=e.note,N=c.a.useContext(y.a).deliveryCountry,w=c.a.useState(""),k=Object(n.a)(w,2),C=k[0],j=k[1],I=c.a.useState(!1),S=Object(n.a)(I,2),q=S[0],_=S[1],M=c.a.useState(""),T=Object(n.a)(M,2),D=T[0],F=T[1],L=c.a.useState(""),W=Object(n.a)(L,2),P=W[0],G=W[1],H=Object(l.a)(),z=H.formatMessage,A=H.locale,B=Object(i.g)(),J=function(){var e=Object(x.a)(p.a.mark((function e(t){var a,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!q){e.next=7;break}_(!1),g(null),j(""),e.next=22;break;case 7:if(F(!1),C){e.next=10;break}return e.abrupt("return");case 10:return e.prev=10,e.next=13,d({code:C,subtotal:u.toString()});case 13:_(!0),g(C),e.next=22;break;case 17:e.prev=17,e.t0=e.catch(10),_(!1),F(!0),"Coupon expired"===e.t0.response.data.message?G(z({id:"coupon-expired"})):"The selected code is invalid."===(null===(a=e.t0.response.data.message)||void 0===a||null===(n=a.code)||void 0===n?void 0:n[0])||"Coupon not exist"===e.t0.response.data.message?G(z({id:"coupon-invalid"})):"The amount is less then the minimum"===e.t0.response.data.message&&G(z({id:"coupon-conditions-not-met"}));case 22:case"end":return e.stop()}}),e,null,[[10,17]])})));return function(t){return e.apply(this,arguments)}}();return a?c.a.createElement("div",{className:"-mx-2 -mt-1"},c.a.createElement(f,{locale:A})):c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"bg-gray-200 font-semibold p-2 -mx-2"},c.a.createElement("form",{onSubmit:J,className:"rounded border w-full flex mb-1  overflow-hidden ".concat((D||v)&&"border-main-color")},c.a.createElement("input",{type:"text",value:C,onChange:function(e){return j(e.target.value)},placeholder:z({id:"cart-enter-code-or-coupon"}),readOnly:q,className:"".concat(q&&"bg-gray-400 text-gray-200"," flex-1 placeholder-gray-700 min-w-0  p-2")}),c.a.createElement("button",{type:"submit",className:"bg-main-color flex items-center text-sm justify-center p-2 text-main-text uppercase ",style:{width:"80px"}},b?c.a.createElement(E.a,{type:"ThreeDots",color:"#fff",height:22,width:22,visible:!0}):z(q?{id:"remove"}:{id:"cart-code-button"}))),D&&c.a.createElement("h1",{className:"text-main-color text-xs"},P),v&&c.a.createElement("h1",{className:"text-main-color text-xs"},z({id:"coupon-limit-reached"}))),c.a.createElement("div",{className:"p-2 font-semibold bg-gray-200 -mx-2 border-b",style:{position:"sticky",top:0,zIndex:2}},c.a.createElement("div",{className:" flex mb-2  "},c.a.createElement("h1",{className:"text-gray-900"},z({id:"cart-total"})),c.a.createElement("h1",{className:"mx-1 whitespace-no-wrap flex-1"},"(","ar"===A?t.length>2&&t.length:"".concat(t.length," "),function(){switch(t.length){case 1:return z({id:"one-item"});case 2:return z({id:"two-items"});case t.length>10:return z({id:"one-items"});default:return z({id:"multiple-items"})}}(),")"),c.a.createElement("h1",null,u),c.a.createElement("span",{className:"mx-1"},null===N||void 0===N?void 0:N.currency.translation[A].symbol)),c.a.createElement("div",{className:"flex items-center mb-2"},c.a.createElement("h1",{className:"flex-1"},z({id:"delivery-cost"})),c.a.createElement("h1",null,0===o?c.a.createElement("span",{className:"text-green-700 uppercase font-semibold"},z({id:"cart-free"})):c.a.createElement("span",null,o,c.a.createElement("span",{className:"mx-1"},null===N||void 0===N?void 0:N.currency.translation[A].symbol)))),q&&!v&&c.a.createElement("div",{className:"flex text-green-700 items-center mb-2"},c.a.createElement("h1",{className:" flex-1"},z({id:"coupon-sale"})),m?c.a.createElement(E.a,{type:"ThreeDots",color:"#b72b2b",height:22,width:22,visible:!0}):c.a.createElement("h1",null,s,c.a.createElement("span",{className:"mx-1"},null===N||void 0===N?void 0:N.currency.translation[A].symbol))),c.a.createElement("hr",{className:"mb-3"}),c.a.createElement("div",{className:"  flex mb-2 text-lg ",style:{fontWeight:900}},c.a.createElement("h1",{className:"flex-1 text-gray-900"},z({id:"subtotal"})),m?c.a.createElement(E.a,{type:"ThreeDots",color:"#b72b2b",height:22,width:22,visible:!0}):c.a.createElement("h1",{className:"text-green-700"},r," ",c.a.createElement("span",{className:"mx-1 text-green-700"},null===N||void 0===N?void 0:N.currency.translation[A].symbol))),c.a.createElement("hr",{className:"mb-3"}),c.a.createElement("button",{onClick:function(){B.push("/".concat(A,"/checkout/user-checkout"))},className:"".concat(0===t.length||v?"cursor-not-allowed  bg-gray-600":"bg-green-600"," p-2 rounded text-body-light uppercase w-full flex items-center justify-center  "),disabled:0===t.length||v},z({id:"checkout"}))),c.a.createElement(O,{deliveryCountry:N}))}var S=a(296),q=a(21),_=a(102),M=a.n(_),T=a(4),D=a(48);function F(e){var t=e.item,a=c.a.useState(!1),r=Object(n.a)(a,2),i=r[0],o=r[1],m=c.a.useState(!1),d=Object(n.a)(m,2),b=d[0],f=d[1],g=c.a.useContext(h.a),v=g.editCartMutation,N=g.addToWishListMutation,w=g.removeFromWishListMutation,k=g.removeFromCartMutation,C=c.a.useContext(u.a).userId,j=c.a.useContext(y.a).deliveryCountry,O=c.a.useState(t.qty),I=Object(n.a)(O,2),S=I[0],_=I[1],F=c.a.useState(!1),L=Object(n.a)(F,2),W=L[0],P=L[1],G=Object(l.a)(),H=G.formatMessage,z=G.locale,A=function(){var e=Object(x.a)(p.a.mark((function e(t,a){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(t),e.prev=1,e.next=4,k({id:t,userId:C,cart_id:a,deliveryCountry:j});case 4:o(null),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),o(null);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t,a){return e.apply(this,arguments)}}(),B=function(){var e=Object(x.a)(p.a.mark((function e(a,n,r){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r>t.options.max_quantity||0===r||t.qty===r)){e.next=2;break}return e.abrupt("return");case 2:return P(!0),e.prev=3,e.next=6,v({cartId:a,itemId:n,userId:C,quantity:r});case 6:P(!1),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),P(!1);case 12:case"end":return e.stop()}}),e,null,[[3,9]])})));return function(t,a,n){return e.apply(this,arguments)}}(),J=function(){var e=Object(x.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w({id:t,userId:C});case 3:f(!1),e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),K=function(){var e=Object(x.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N({id:t.id,userId:C});case 3:f(!0),e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}();return c.a.createElement(s.c.div,{layout:!0,variants:{hidden:{opacity:0},visible:{opacity:1},exited:{x:300,opacity:0,transition:{duration:.3,ease:"easeOut"}}},initial:"hidden",animate:"visible",exit:"exited",className:"border-b "},c.a.createElement("div",{className:"py-2 cart__item-mobile"},c.a.createElement(T.b,{to:"/".concat(z,"/products/").concat(t.slug,"/").concat(t.id,"}")},c.a.createElement(D.a,{src:t.image,origin:"small",alt:t["name_".concat(z)],height:"125px"})),c.a.createElement("div",{className:"text-sm"},c.a.createElement(T.b,{to:"/".concat(z,"/products/").concat(t.slug,"/").concat(t.id,"}")},c.a.createElement("h1",{className:"font-semibold "},"".concat(t["name_".concat(z)]).concat(t.options.addons?" - ".concat(Object.keys(t.options.addons).map((function(e){return t.options.addons[e]})).join(" - ")):""))),c.a.createElement("h1",{className:" font-semibold"},t.options.max_quantity<5?function(e){switch(e){case 0:return c.a.createElement("span",{className:"text-main-color"},H({id:"no-items-left"}));case 1:return c.a.createElement("span",{className:" text-yellow-700"},H({id:"one-item-left"}));case 2:return c.a.createElement("span",{className:" text-yellow-700"},H({id:"two-items-left"}));default:return c.a.createElement("span",{className:"text-yellow-700"},e," ",H({id:"items-left"}))}}(t.options.max_quantity):c.a.createElement("span",{className:"text-green-700"},H({id:"in-stock"}))),c.a.createElement("div",{className:"",style:{fontWeight:"900"}},c.a.createElement("div",{className:"flex items-center"},c.a.createElement("h1",null,H({id:"price"})," "),c.a.createElement("span",{className:"mx-1"},t.price," ",null===j||void 0===j?void 0:j.currency.translation[z].symbol))),c.a.createElement("div",{className:"text-green-700 text-base",style:{fontWeight:"900"}},c.a.createElement("div",{className:"flex items-center"},c.a.createElement("h1",null,H({id:"total"})," "),c.a.createElement("span",{className:"mx-1"},t.total," ",null===j||void 0===j?void 0:j.currency.translation[z].symbol))),c.a.createElement("div",{className:" flex items-center flex-wrap text-base "},c.a.createElement("h1",{className:" font-semibold"},H({id:"quantity"})," :"," "),c.a.createElement("div",{className:" flex items-center justify-center mx-3"},c.a.createElement("button",{onClick:function(){1!==parseInt(S)&&_(parseInt(S)-1)},className:"p-1"},c.a.createElement(q.p,{className:"w-6 h-6 ".concat(1===S?"text-gray-700":"text-blue-700")})),c.a.createElement("input",{value:S,type:"number",onChange:function(e){e.target.value<1||e.target.value>t.options.max_quantity||_(e.target.value)},className:"mx-1 px-2 py-1 border rounded",style:{maxWidth:"40px",textAlign:"center"}}),c.a.createElement("button",{onClick:function(){_(parseInt(S)+1)},className:"p-1"},c.a.createElement(q.r,{className:"w-6 h-6 text-blue-700"})))),c.a.createElement("button",{onClick:function(){return B(t.cart_id,t.id,S)},style:{width:"50px"},disabled:S>t.options.max_quantity||0===S||t.qty===S,className:"p-1 flex items-center justify-center text-xs rounded mt-1 ".concat(S>t.options.max_quantity||0===S||t.qty===S?"bg-gray-600 text-gray-400":"bg-main-color text-main-text")},W?c.a.createElement(E.a,{type:"ThreeDots",color:"#fff",height:20,width:20,visible:!0}):H({id:"update-btn"})))),c.a.createElement("div",{className:"flex justify-center text-sm  items-center my-2 "},c.a.createElement("button",{onClick:function(){A(t.id,t.cart_id)},className:"bg-main-color\n            text-main-text text-sm flex items-center relative justify-center flex-1 p-2 rounded uppercase  font-semibold"},i?c.a.createElement(E.a,{type:"ThreeDots",color:"#fff",height:22,width:22,visible:!0}):c.a.createElement(c.a.Fragment,null,c.a.createElement(M.a,{background:!0}),c.a.createElement("h1",{className:"mx-2 whitespace-no-wrap"},H({id:"remove-from-cart"})))),c.a.createElement("button",{onClick:function(){b?J(t.id):K(t)},className:"\n              border mx-2\n            text-sm p-2 rounded-full uppercase bg-gray-100  flex items-center justify-center font-semibold"},b?c.a.createElement(q.a,{className:"w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 "}):c.a.createElement(q.k,{className:"w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 "}))))}var L=a(283);function W(e){var t=e.cartItems,a=e.cartItemsLoading,r=e.cartMessage,i=c.a.useState(!0),m=Object(n.a)(i,2),u=m[0],d=m[1],p=Object(l.a)(),x=p.formatMessage,h=p.locale;return a?c.a.createElement(L.a,null):c.a.createElement(s.b,null,r&&u&&c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"rounded text-sm bg-blue-400 p-3 relative"},x({id:r}),c.a.createElement("button",{onClick:function(){return d(!1)},className:"absolute rounded hover:bg-gray-100 transition duration-75",style:{top:"4px",right:"en"===h?"3px":"",left:"ar"===h?"3px":""}},c.a.createElement(o.b,{className:"w-5 h-5"}))),c.a.createElement("hr",{className:"my-1"})),c.a.createElement(s.c.div,{initial:!1,layout:!0,className:"mb-2"},c.a.createElement(s.c.div,{layout:!0,className:"px-2 py-3 border-b"},c.a.createElement("h1",{className:"text-lg font-semibold"},x({id:"cart"}))),c.a.createElement(s.a,null,t.map((function(e){return c.a.createElement(F,{key:e.id,item:e})})))),c.a.createElement(s.c.h1,{layout:!0,className:"text-xs my-2 px-2"},x({id:"cart-tos"})),c.a.createElement(s.c.hr,{layout:!0}))}var P=a(70);function G(){var e=c.a.useContext(u.a).userId,t=Object(l.a)(),a=t.formatMessage,n=t.locale,r={hidden:{opacity:0},visible:{opacity:1},exited:{opacity:0}}.variants;return c.a.createElement(s.c.div,{variants:r,initial:"hidden",animate:"visible",exit:"exited",className:"flex flex-col items-center justify-center",style:{minHeight:"calc(-120px + 100vh)"}},c.a.createElement("div",{className:"p-2"},c.a.createElement("div",{className:"text-center"},c.a.createElement("h1",{className:"text-2xl font-bold  "},a({id:"cart-empty"})))),!e&&c.a.createElement("div",{className:"flex flex-col justify-center p-2"},c.a.createElement(T.b,{to:"/".concat(n,"/app/login"),className:"  text-center rounded py-2 px-4 text-sm  uppercase bg-green-700 text-second-nav-text-light "},a({id:"login"})),c.a.createElement(T.b,{to:"/".concat(n,"/app/register"),className:" text-center  rounded py-2 px-4  text-sm uppercase bg-blue-700 text-second-nav-text-light mt-2 "},a({id:"register"}))))}function H(e){var t=e.item,a=c.a.useContext(h.a),r=a.removeFromGuestCartMutation,i=a.editGuestCartMutation,o=a.coupon,m=c.a.useContext(y.a).deliveryCountry,u=c.a.useState(t.qty),d=Object(n.a)(u,2),b=d[0],f=d[1],g=c.a.useState(!1),v=Object(n.a)(g,2),N=v[0],w=v[1],k=c.a.useState(!1),C=Object(n.a)(k,2),j=C[0],O=C[1],I=Object(l.a)(),S=I.formatMessage,_=I.locale,F=function(){var e=Object(x.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O(!0),e.prev=1,e.next=4,r({sku:t,deliveryCountry:m,coupon:o});case 4:O(!1),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),O(!1);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}(),L=function(){var e=Object(x.a)(p.a.mark((function e(a,n){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(b>t.options.max_quantity||0===b||t.qty===b)){e.next=2;break}return e.abrupt("return");case 2:return w(!0),e.prev=3,e.next=6,i({sku:a,quantity:b,price:n,deliveryCountry:m,coupon:o});case 6:w(!1),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),w(!1);case 12:case"end":return e.stop()}}),e,null,[[3,9]])})));return function(t,a){return e.apply(this,arguments)}}();return c.a.createElement(s.c.div,{layout:!0,variants:{hidden:{opacity:0},visible:{opacity:1},exited:{x:300,opacity:0,transition:{duration:.3,ease:"easeOut"}}},initial:"hidden",animate:"visible",exit:"exited",className:"border-b "},c.a.createElement("div",{className:"py-2 cart__item-mobile"},c.a.createElement(T.b,{to:"/".concat(_,"/products/").concat(t.slug,"/").concat(t.id,"}")},c.a.createElement(D.a,{src:t.image,origin:"small",alt:t["name_".concat(_)],height:"125px"})),c.a.createElement("div",{className:"text-sm"},c.a.createElement(T.b,{to:"/".concat(_,"/products/").concat(t.slug,"/").concat(t.id,"}")},c.a.createElement("h1",{className:"font-semibold "},"".concat(t["name_".concat(_)]).concat(t.options.addons?" - ".concat(Object.keys(t.options.addons).map((function(e){return t.options.addons[e]})).join(" - ")):""))),c.a.createElement("h1",{className:" font-semibold"},t.options.max_quantity<5?function(e){switch(e){case 0:return c.a.createElement("span",{className:"text-main-color"},S({id:"no-items-left"}));case 1:return c.a.createElement("span",{className:"text-yellow-700"},S({id:"one-item-left"}));case 2:return c.a.createElement("span",{className:" text-yellow-700"},S({id:"two-items-left"}));default:return c.a.createElement("span",{className:"  text-yellow-700"},e," ",S({id:"items-left"}))}}(t.options.max_quantity):c.a.createElement("span",{className:"text-green-700"},S({id:"in-stock"}))),c.a.createElement("div",{className:"text-main-color text-base",style:{fontWeight:"900"}},t.total," ",null===m||void 0===m?void 0:m.currency.translation[_].symbol),c.a.createElement("div",{className:" flex items-center flex-wrap "},c.a.createElement("h1",{className:" font-semibold"},S({id:"quantity"})," :"," "),c.a.createElement("div",{className:" flex items-center justify-center mx-3"},c.a.createElement("button",{onClick:function(){1!==parseInt(b)&&f(parseInt(b)-1)},className:"p-1"},c.a.createElement(q.p,{className:"w-6 h-6 ".concat(1===b?"text-gray-700":"text-blue-700")})),c.a.createElement("input",{type:"number",value:b,onChange:function(e){e.target.value<1||e.target.value>t.options.max_quantity||f(e.target.value)},className:"mx-1 px-2 py-1 border rounded",style:{maxWidth:"40px",textAlign:"center"}}),c.a.createElement("button",{onClick:function(){f(parseInt(b)+1)},className:"p-1"},c.a.createElement(q.r,{className:"w-6 h-6 text-blue-700"}))),c.a.createElement("button",{onClick:function(){return L(t.options.sku,t.price)},style:{width:"50px"},disabled:b>t.options.max_quantity||0===b||t.qty===b,className:"p-1 flex items-center justify-center text-xs rounded mt-1 ".concat(b>t.options.max_quantity||0===b||t.qty===b?"bg-gray-600 text-gray-400":"bg-main-color text-main-text")},N?c.a.createElement(E.a,{type:"ThreeDots",color:"#fff",height:18,width:18,visible:!0}):S({id:"update-btn"}))))),c.a.createElement("div",{className:"flex justify-center text-sm  items-center my-2 "},c.a.createElement("button",{onClick:function(){F(t.options.sku)},className:"\n              bg-main-color\n            text-main-text text-sm flex items-center relative justify-center flex-1 p-2 rounded uppercase  font-semibold"},j?c.a.createElement(E.a,{type:"ThreeDots",color:"#fff",height:22,width:22,visible:!0}):c.a.createElement(c.a.Fragment,null,c.a.createElement(M.a,{background:!0}),c.a.createElement("h1",{className:"mx-2 whitespace-no-wrap"},S({id:"remove-from-cart"}))))))}function z(e){var t=e.cartItemsLoading,a=e.cartItems,n=Object(l.a)().formatMessage;return t?c.a.createElement(L.a,null):c.a.createElement("div",null,0===a.length&&c.a.createElement(s.a,null,0===a.length&&c.a.createElement(G,null)),0!==a.length&&c.a.createElement(s.b,null,c.a.createElement(s.c.div,{initial:!1,layout:!0,className:"mb-2"},c.a.createElement(s.a,null,a.map((function(e){var t;return c.a.createElement(H,{key:null===(t=e.options)||void 0===t?void 0:t.sku,item:e})})))),c.a.createElement(s.c.h1,{layout:!0,className:"text-xs my-2 px-2"},n({id:"cart-tos"})),c.a.createElement(s.c.hr,{layout:!0})))}function A(e){var t=e.setCheckOutPopupOpen,a=c.a.useContext(h.a),r=a.guestCartItems,s=a.guestCartItemsLoading,i=a.guestCartTotal,o=a.guestCouponCost,m=a.guestCartSubtotal,u=a.checkCouponMutation,d=a.isCheckingCoupon,b=a.setCoupon,g=a.guestShippingCost,v=a.guestCartItemsFetching,N=c.a.useContext(y.a).deliveryCountry,w=c.a.useState(""),k=Object(n.a)(w,2),C=k[0],j=k[1],I=c.a.useState(!1),S=Object(n.a)(I,2),q=S[0],_=S[1],M=c.a.useState(""),T=Object(n.a)(M,2),D=T[0],F=T[1],L=c.a.useState(""),W=Object(n.a)(L,2),P=W[0],G=W[1],H=Object(l.a)(),z=H.formatMessage,A=H.locale,B=function(){var e=Object(x.a)(p.a.mark((function e(t){var a,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!q){e.next=7;break}_(!1),b(null),j(""),e.next=22;break;case 7:if(F(!1),C){e.next=10;break}return e.abrupt("return");case 10:return e.prev=10,e.next=13,u({code:C,subtotal:m.toString()});case 13:_(!0),b(C),e.next=22;break;case 17:e.prev=17,e.t0=e.catch(10),_(!1),F(!0),"Coupon expired"===e.t0.response.data.message?G(z({id:"coupon-expired"})):"The selected code is invalid."===(null===(a=e.t0.response.data.message)||void 0===a||null===(n=a.code)||void 0===n?void 0:n[0])||"Coupon not exist"===e.t0.response.data.message?G(z({id:"coupon-invalid"})):"The amount is less then the minimum"===e.t0.response.data.message&&G(z({id:"coupon-conditions-not-met"}));case 22:case"end":return e.stop()}}),e,null,[[10,17]])})));return function(t){return e.apply(this,arguments)}}();return s?c.a.createElement("div",{className:"-mx-2 -mt-1"},c.a.createElement(f,{locale:A})):s||0!==r.length?c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"bg-gray-200 font-semibold p-2 -mx-2"},c.a.createElement("form",{onSubmit:B,className:"rounded border w-full flex mb-1  overflow-hidden ".concat(D&&"border-main-color")},c.a.createElement("input",{type:"text",value:C,onChange:function(e){return j(e.target.value)},placeholder:z({id:"cart-enter-code-or-coupon"}),readOnly:q,className:"".concat(q&&"bg-gray-400 text-gray-200"," flex-1 placeholder-gray-700  p-2")}),c.a.createElement("button",{type:"submit",className:"bg-main-color flex items-center text-sm justify-center p-2 text-main-text uppercase ",style:{width:"70px"}},d?c.a.createElement(E.a,{type:"ThreeDots",color:"#fff",height:22,width:22,visible:!0}):z(q?{id:"remove"}:{id:"cart-code-button"}))),D&&c.a.createElement("h1",{className:"text-main-color text-xs"},P)),c.a.createElement("div",{className:"p-2 font-semibold bg-gray-200 -mx-2 border-b",style:{position:"sticky",top:0,zIndex:2}},c.a.createElement("div",{className:" flex mb-2  "},c.a.createElement("h1",{className:"text-gray-900"},z({id:"cart-total"})),c.a.createElement("h1",{className:"mx-1 whitespace-no-wrap flex-1"},"(","ar"===A?r.length>2&&r.length:"".concat(r.length," "),function(){switch(r.length){case 1:return z({id:"one-item"});case 2:return z({id:"two-items"});case r.length>10&&r.length>10:return z({id:"more-than-10-items"});default:return z({id:"multiple-items"})}}(),")"),c.a.createElement("h1",null,m),c.a.createElement("span",{className:"mx-1"},null===N||void 0===N?void 0:N.currency.translation[A].symbol)),c.a.createElement("div",{className:"flex items-center mb-2"},c.a.createElement("h1",{className:"flex-1"},z({id:"delivery-cost"})),c.a.createElement("h1",null,0===g?c.a.createElement("span",{className:"text-green-700 uppercase font-semibold"},z({id:"cart-free"})):c.a.createElement("span",null,g,c.a.createElement("span",{className:"mx-1"},null===N||void 0===N?void 0:N.currency.translation[A].symbol)))),q&&c.a.createElement("div",{className:"flex text-green-700 items-center mb-2"},c.a.createElement("h1",{className:" flex-1"},z({id:"coupon-sale"})),v?c.a.createElement(E.a,{type:"ThreeDots",color:"#b72b2b",height:22,width:22,visible:!0}):c.a.createElement("h1",null,o,c.a.createElement("span",{className:"mx-1"},null===N||void 0===N?void 0:N.currency.translation[A].symbol))),c.a.createElement("hr",{className:"mb-3"}),c.a.createElement("div",{className:"  flex mb-2 text-lg ",style:{fontWeight:900}},c.a.createElement("h1",{className:"flex-1 text-gray-900"},z({id:"subtotal"})),v?c.a.createElement(E.a,{type:"ThreeDots",color:"#b72b2b",height:22,width:22,visible:!0}):c.a.createElement("h1",{className:"text-green-700"},i," ",c.a.createElement("span",{className:"mx-1 text-green-700"},null===N||void 0===N?void 0:N.currency.translation[A].symbol))),c.a.createElement("hr",{className:"mb-3"}),c.a.createElement("button",{onClick:function(){t(!0)},className:"".concat(0===r.length?"cursor-not-allowed  bg-gray-600":"bg-green-600"," p-2 rounded text-body-light uppercase w-full flex items-center justify-center "),disabled:0===r.length},z({id:"checkout"}))),c.a.createElement(O,{deliveryCountry:N})):null}function B(e){var t=e.setCheckOutPopupOpen,a=Object(l.a)().formatMessage,n=c.a.useContext(h.a),r=n.guestCartItems,s=n.guestCartTotal,i=n.guestCartItemsLoading;return n.isGuestGetCartError?c.a.createElement(P.a,null,c.a.createElement("div",{className:"py-1 mx-2 flex items-center justify-center",style:{minHeight:"calc(-80px + 100vh)"}},c.a.createElement("h1",null,a({id:"something-went-wrong-snackbar"})))):c.a.createElement(c.a.Fragment,null,c.a.createElement(A,{setCheckOutPopupOpen:t}),c.a.createElement(z,{cartTotal:s,cartItems:r,cartItemsLoading:i}))}function J(){var e=Object(l.a)().formatMessage,t=c.a.useContext(u.a),a=t.userId,r=t.authenticationLoading,i=c.a.useState(!1),o=Object(n.a)(i,2),d=o[0],p=o[1],x=c.a.useContext(h.a),b=x.cartItems,f=x.cartMessage,g=x.cartItemsLoading,E=x.isGetCartError,v=c.a.useContext(y.a).deliveryCountriesLoading;return E?c.a.createElement(P.a,null,c.a.createElement("div",{className:"py-1 mx-2 flex items-center justify-center",style:{minHeight:"calc(-80px + 100vh)"}},c.a.createElement("h1",null,e({id:"something-went-wrong-snackbar"})))):c.a.createElement(P.a,null,c.a.createElement("div",{className:"py-1 px-2 relative text-body-text-light",style:{minHeight:"calc(-120px + 100vh)"}},c.a.createElement(s.a,null,d&&c.a.createElement(m,{setCheckOutPopupOpen:p})),(r||v)&&c.a.createElement(S.a,null),c.a.createElement(s.a,null,!r&&a&&!g&&!v&&!E&&0===b.length&&c.a.createElement(G,null)),!r&&a&&!v&&!E&&0!==(null===b||void 0===b?void 0:b.length)&&c.a.createElement(c.a.Fragment,null,c.a.createElement(I,null),c.a.createElement(W,{cartItems:b,cartItemsLoading:g,cartMessage:f})),!r&&!v&&!a&&c.a.createElement(B,{setCheckOutPopupOpen:p})))}}}]);
//# sourceMappingURL=15.94ad1a3b.chunk.js.map