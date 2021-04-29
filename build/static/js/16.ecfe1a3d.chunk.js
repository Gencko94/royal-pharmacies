(this["webpackJsonproyal-pharmacy"]=this["webpackJsonproyal-pharmacy"]||[]).push([[16],{282:function(e,t,a){"use strict";a.d(t,"a",(function(){return z}));var l=a(2),n=a(1),r=a.n(n),c=a(10),s=a.n(c),i=a(16),o=a.n(i),m=(a(28),a(154)),d=a(104),u=a(155),b=a(44),p=a(35),h=a(3),f=a.n(h),E=a(12),v=a(6),x=a(29),y=a(64),g=a(24),N=a(54),k=a(18),j=a(43),w=a(5),O=[{value:"+965",label:"+965"},{value:"+966",label:"+966"}];function C(e){var t=e.markerAddress,a=e.setShowMap,n=e.marker,c=e.setMarker,s=e.outOfBorder,i=r.a.useState(O[0]),m=Object(l.a)(i,2),d=m[0],u=m[1],b=r.a.useContext(k.a).addAddressMutation,p=r.a.useState(""),h=Object(l.a)(p,2),N=h[0],C=h[1],M=r.a.useState(!1),T=Object(l.a)(M,2),q=T[0],z=T[1],H=Object(y.a)().formatMessage,D=r.a.useState(!1),B=Object(l.a)(D,2),L=B[0],I=B[1],U=g.a({apartmentOrHouseNumber:g.c().required(H({id:"required-field"})),buildingOrTowerNumber:g.c().required(H({id:"required-field"})),addressName:g.c().required(H({id:"required-field"})),phoneNumber:g.c().matches(/^\d+$/,H({id:"number-only"})).min(8,H({id:"invalid-phone"})).required(H({id:"required-field"})),additionalDetails:g.c()});return r.a.createElement("div",null,r.a.createElement(w.a,null,q&&r.a.createElement(j.a,{message:H({id:"something-went-wrong-snackbar"}),closeFunction:function(){z(!1)}})),r.a.createElement("div",{className:"font-bold p-2"},r.a.createElement("h1",null,H({id:"location-details"}))),r.a.createElement("div",{className:"p-2"},r.a.createElement("div",{className:"flex items-center justify-between"},r.a.createElement("label",{htmlFor:"location",className:"text-sm font-bold text-gray-700"},H({id:"delivery-location"})),r.a.createElement("button",{onClick:function(){c(null),C("")},className:"text-main-color text-sm hover:underline"},H({id:"clear"}))),r.a.createElement("textarea",{rows:"3",id:"location",className:" mt-1 w-full rounded border  p-1  ",type:"textarea",value:t||N,readOnly:t,onChange:function(e){return C(e.target.value)}}),r.a.createElement(x.a,{initialValues:{apartmentOrHouseNumber:"",buildingOrTowerNumber:"",phoneNumber:"",additionalDetails:"",addressName:""},validationSchema:U,onSubmit:function(){var e=Object(v.a)(f.a.mark((function e(l){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b({lat:null===n||void 0===n?void 0:n.lat,lng:null===n||void 0===n?void 0:n.lng,defaultLocation:L,addressDetails:Object(E.a)(Object(E.a)({phoneNumber:"".concat(d.value).concat(l.phoneNumber)},l),{},{markerAddress:t,userTyped_address:N})});case 3:a(!1),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),z(!0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}()},(function(e){var a=e.handleSubmit,l=e.values,n=e.isSubmitting;return r.a.createElement("form",{onSubmit:a},r.a.createElement(A,{label:H({id:"maps-detailed-address-phone"}),name:"phoneNumber",value:l.phoneNumber,type:"text",countryCode:d,setCountryCode:u}),r.a.createElement("div",{className:"grid grid-cols-2 gap-1"},r.a.createElement(S,{label:H({id:"maps-detailed-address-apartment"}),name:"apartmentOrHouseNumber",value:l.apartmentOrHouseNumber,type:"text"}),r.a.createElement(S,{label:H({id:"maps-detailed-address-building"}),name:"buildingOrTowerNumber",value:l.buildingOrTowerNumber,type:"text"})),r.a.createElement(S,{label:H({id:"maps-detailed-address-name"}),name:"addressName",value:l.addressName,type:"text"}),r.a.createElement(_,{label:H({id:"maps-details-extra-details"}),name:"additionalDetails",value:l.additionalDetails}),r.a.createElement("div",{className:" "},r.a.createElement("div",{className:"flex items-center mb-2"},r.a.createElement("label",null,H({id:"mark-as-default"})),r.a.createElement("input",{className:" mx-2",type:"checkbox",checked:L,onChange:function(){return I(!L)}})),r.a.createElement("button",{type:"submit",disabled:!t&&!N||s,className:"  ".concat(!t&&!N||s?"bg-gray-500 text-gray-300":"bg-main-color text-main-text"," p-2 rounded  w-full  flex items-center uppercase justify-center font-semibold")},n?r.a.createElement(o.a,{type:"ThreeDots",color:"#fff",height:23,width:23,visible:n}):r.a.createElement("h1",null,H({id:"confirm-btn"})))))}))))}var S=function(e){var t=e.label,a=(e.value,e.name),n=Object(p.a)(e,["label","value","name"]),c=Object(x.b)(a),s=Object(l.a)(c,2),i=s[0],o=s[1];return r.a.createElement("div",{className:"w-full mb-1 relative"},r.a.createElement("label",{htmlFor:a,className:"text-sm font-bold text-gray-700 mb-1"},t),r.a.createElement("input",Object.assign({},i,n,{onBlur:function(e){i.onBlur(e)},className:" w-full rounded-sm border   p-1"})),o.touched&&o.error?r.a.createElement("h1",{className:"text-xs text-main-color mt-1"},o.error):r.a.createElement("h1",{className:"text-xs text-main-color mt-1",style:{height:"18px"}}," "))},_=function(e){var t=e.label,a=(e.value,e.name),n=Object(p.a)(e,["label","value","name"]),c=Object(x.b)(a),s=Object(l.a)(c,1)[0],i=Object(y.a)().formatMessage;return r.a.createElement("div",{className:"w-full mb-1 relative"},r.a.createElement("div",{className:"flex items-center mb-1"},r.a.createElement("label",{htmlFor:a,className:"text-sm font-bold text-gray-700"},t),r.a.createElement("h1",{className:"text-xs italic mx-3"},"(",i({id:"maps-details-optional"}),")")),r.a.createElement("textarea",Object.assign({rows:3},s,n,{onBlur:function(e){s.onBlur(e)},className:" w-full rounded-sm border   p-1"})))},A=function(e){var t=e.label,a=(e.value,e.name),n=e.countryCode,c=e.setCountryCode,s=Object(p.a)(e,["label","value","name","countryCode","setCountryCode"]),i=Object(x.b)(a),o=Object(l.a)(i,2),m=o[0],d=o[1];return r.a.createElement("div",{className:"w-full mb-1 flex flex-col "},r.a.createElement("label",{htmlFor:a,className:"text-sm font-bold text-gray-800 mb-1"},t),r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"0.4fr 1fr",gap:"0.5rem"}},r.a.createElement(N.a,{options:O,isSearchable:!1,value:n,onChange:c,styles:{dropdownIndicator:function(e){return Object(E.a)(Object(E.a)({},e),{},{padding:"0.25rem"})},valueContainer:function(e){return Object(E.a)(Object(E.a)({},e),{},{padding:"0.5rem"})}}}),r.a.createElement("input",Object.assign({},m,s,{onBlur:function(e){m.onBlur(e)},className:" border rounded w-full p-2 ".concat(d.error&&"border-main-color")}))),d.touched&&d.error?r.a.createElement("h1",{className:"text-xs text-main-color mt-1"},d.error):r.a.createElement("h1",{className:"text-xs text-main-color mt-1",style:{height:"18px"}}," "))},M=["places"],T={lat:29.3759,lng:47.9774},q={styles:m.a,disableDefaultUI:!0,zoomControl:!0};function z(e){var t=e.setShowMap,a=Object(b.useMediaQuery)({query:"(min-width: 768px)"}),n=r.a.useState(!1),c=Object(l.a)(n,2),i=c[0],m=c[1],p=Object(y.a)(),h=p.formatMessage,f=p.locale,E=Object(d.d)({googleMapsApiKey:"AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg",libraries:M,language:f}),v=E.isLoaded,x=E.loadError,g=r.a.useState(null),N=Object(l.a)(g,2),k=N[0],j=N[1],w=r.a.useState(null),O=Object(l.a)(w,2),S=O[0],_=O[1],A=r.a.useState(null),z=Object(l.a)(A,2),H=z[0],D=z[1],B=r.a.useRef(),L=r.a.useCallback((function(e){B.current=e}),[]),I=r.a.useCallback((function(e){var t=e.lat,a=e.lng;B.current.panTo({lat:t,lng:a}),j({lat:t,lng:a}),_(null)}),[]);return r.a.useEffect((function(){k?s.a.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=".concat(k.lat,",").concat(k.lng,"&key=").concat("AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg","&language=").concat(f)).then((function(e){if(0===e.data.results.length)return D(null),_(null),void m(!0);"KW"!==e.data.results[0].address_components.find((function(e){return e.types.includes("country")})).short_name||0===e.data.results.length?m(!0):!0===i&&m(!1),D("".concat(e.data.results[0].formatted_address)),_("".concat(e.data.results[0].address_components.map((function(e){return e.short_name})).join(", ")))})).catch((function(e){})):(D(null),_(null))}),[k,f]),x?r.a.createElement("div",{className:"flex justify-center items-center h-full"},r.a.createElement("h1",null,h({id:"error-loading-maps"}))):v?r.a.createElement("div",{className:"".concat(a?"my-addresses-desktop-maps__grid":"my-addresses-mobile-maps__grid")},r.a.createElement("div",{className:"relative h-full"},r.a.createElement(u.a,{panTo:I,markerAddress:H}),r.a.createElement(d.a,{mapContainerStyle:{width:"100%",height:a?"100%":"400px"},zoom:15,center:T,options:q,clickableIcons:!1,onLoad:L,onClick:function(e){j({lat:e.latLng.lat(),lng:e.latLng.lng()})}},k&&r.a.createElement(d.c,{position:{lat:null===k||void 0===k?void 0:k.lat,lng:null===k||void 0===k?void 0:k.lng}}),i&&r.a.createElement("div",{className:"absolute mx-2 rounded p-2  bg-main-color text-main-text text-center",style:{top:"110px",left:"2%",right:"2%",width:"94%"}},r.a.createElement("h1",{className:"text-sm"},h({id:"out-of-border"}))),S&&r.a.createElement(d.b,{onCloseClick:function(){return _(null)},position:{lat:null===k||void 0===k?void 0:k.lat,lng:null===k||void 0===k?void 0:k.lng},options:{pixelOffset:new window.google.maps.Size(0,-50)}},r.a.createElement("div",{className:"p-2"},r.a.createElement("div",null,r.a.createElement("h1",null,S)))))),r.a.createElement(C,{markerAddress:H,marker:k,setShowMap:t,setMarker:j,outOfBorder:i})):r.a.createElement("div",{className:"flex justify-center items-center h-full"},r.a.createElement(o.a,{type:"ThreeDots",color:"#b72b2b",height:40,width:40,visible:!v}))}},285:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var l=a(1),n=a.n(l),r=a(56),c=a.n(r),s=a(135),i=a.n(s);function o(e){var t=e.alt,a=e.lat,l=e.width,r=e.height,s=e.lng;return n.a.createElement("div",{style:{position:"relative",backgroundColor:"#fff",paddingBottom:"calc(100% * ".concat(r,"/").concat(l,")"),width:"100%"}},n.a.createElement(c.a,{placeholder:n.a.createElement("img",{src:i.a,alt:t}),className:"max-h-full"},n.a.createElement("img",{src:a?"https://maps.googleapis.com/maps/api/staticmap?center=".concat(a,",").concat(s,"&zoom=15&size=").concat(l,"x").concat(r,"&key=").concat("AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg"):i.a,alt:t,style:{maxHeight:"100%",maxWidth:"100%",display:"block",left:0,right:0},className:"mx-auto my-0 absolute"})))}},327:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return F}));var l=a(3),n=a.n(l),r=a(6),c=a(27),s=a(12),i=a(2),o=a(1),m=a.n(o),d=a(170),u=a(171),b=a(16),p=a.n(b),h=(a(28),a(18)),f=a(282),E=a(5),v=a(21),x=a(102),y=a.n(x),g=a(64),N=a(285);function k(e){var t=e.setShowMap,a=e.userAddresses,l=e.handleSelectAddress,n=Object(g.a)().formatMessage,r=m.a.useState(null),c=Object(i.a)(r,2),s=c[0],o=c[1],d={partial:{right:0,top:0,bottom:0,width:"20%"},full:{right:0,top:0,bottom:0,width:"100%"}};return m.a.createElement("div",{className:"min-h-full"},m.a.createElement("div",{className:" p-3 flex items-center justify-between bg-main-color text-main-text"},m.a.createElement("h1",{className:"text-lg"},n({id:"select-address-header"}))),m.a.createElement(E.b,null,m.a.createElement(E.c.div,{layout:!0,className:"p-3 locations-grid__desktop"},a.map((function(e){return m.a.createElement(E.c.div,{layout:!0,key:e.id,className:"rounded border relative  bg-body-light"},m.a.createElement(E.c.div,{layout:!0},m.a.createElement("div",{style:{minHeight:"150px",position:"relative"}},m.a.createElement(N.a,{height:150,width:200,lat:e.lat,lng:e.lng,alt:e.address_name}),m.a.createElement(E.c.div,{variants:d,initial:"partial",animate:s===e.id?"full":"partial",layout:!0,exit:"partial",onClick:function(){return t=e.id,void o(s===t?null:t);var t},className:"absolute overflow-hidden p-2 text-main-text  transition cursor-pointer duration-150 opacity-50 bg-gray-800 hover:opacity-75"},m.a.createElement(v.m,{style:{left:"10px"},className:"absolute  top-1/2 transform  -translate-y-1/2  w-5 h-5"}),m.a.createElement(E.a,null,s===e.id&&m.a.createElement(E.c.div,{initial:{opacity:0},animate:{opacity:1,marginLeft:"35px"},exit:{opacity:0},layout:!0,className:"text-sm"},m.a.createElement("div",null,m.a.createElement("h1",null,n({id:"maps-detailed-address-apartment-short"}),":"),m.a.createElement("h1",null,e.apartment_house_number)),m.a.createElement("div",null,m.a.createElement("h1",null,n({id:"maps-detailed-address-building-short"}),":"),m.a.createElement("h1",null,e.building_tower_number)),m.a.createElement("div",null,m.a.createElement("h1",null,n({id:"maps-detailed-address-phone-short"}),":"),m.a.createElement("h1",null,e.phone_number)))))),m.a.createElement("div",{className:"p-2"},m.a.createElement("div",{className:"text-xs text-gray-600 font-semibold"},m.a.createElement("h1",null,e.address_name)),m.a.createElement("div",{className:"text-sm mb-2 font-semibold",style:{height:"65px"}},m.a.createElement("h1",null,e.marked_address||e.userTyped_addres),m.a.createElement("h1",null,e.addition_direction)),m.a.createElement("button",{onClick:function(){return l(e)},className:"w-full p-1 rounded uppercase bg-main-color text-main-text"},n({id:"select-btn"})))))})),m.a.createElement("button",{onClick:function(){return t(!0)},className:"p-3 flex items-center justify-center self-center justify-self-center bg-main-color hover:bg-red-900 transition duration-150 relative rounded-lg text-main-text"},m.a.createElement(y.a,{background:!0}),m.a.createElement(v.q,{className:"h-8 w-8"})))))}function j(e){var t=e.handleSelectAddress,a=m.a.useState(!1),l=Object(i.a)(a,2),n=l[0],r=l[1],c=m.a.useContext(h.a),s=c.userAddresses;return c.userAddressesLoading?m.a.createElement("div",{className:"flex h-full justify-center items-center",style:{minHeight:"calc(100vh - 150px)"}},m.a.createElement(p.a,{type:"ThreeDots",color:"#b72b2b",height:40,width:40,visible:!0})):m.a.createElement("div",{className:"h-full",style:{minHeight:"calc(100vh - 150px)"}},0!==s.length&&!n&&m.a.createElement(k,{userAddresses:s,setShowMap:r,handleSelectAddress:t}),(0===s.length||n)&&m.a.createElement("div",{className:"rounded-sm border"},m.a.createElement(f.a,{setShowMap:r})))}var w=a(70),O=a(22),C=a(110),S=a.n(C),_=a(111),A=a.n(_),M=a(115),T=a.n(M),q=a(112),z=a.n(q),H=a(7),D=a(34),B=a(4);function L(e){var t=e.handleStepBack,a=e.selectedAddress,l=e.paymentMethod,n=e.setPaymentMethod,r=e.handleCheckout,c=e.checkoutLoading,s=Object(g.a)(),i=s.formatMessage,o=s.locale,d=m.a.useContext(H.a).deliveryCountry,u=m.a.useContext(D.a),b=u.cartItems,h=u.cartSubtotal,f=u.cartTotal,E=u.shippingCost,v=u.couponCost,x=u.coupon,y=function(e){n(e)};return m.a.createElement(m.a.Fragment,null,m.a.createElement("div",{className:"user-checkout-personal-info__container h-full rounded border"},m.a.createElement("div",{className:"font-semibold overflow-y-auto",style:{maxHeight:"calc(100vh - 190px)"}},m.a.createElement("div",{className:"border-b"},m.a.createElement("div",{className:"p-2 border-b"},m.a.createElement("h1",{className:" text-center",style:{fontWeight:900}},i({id:"order-receipt"}))),m.a.createElement("div",{className:"my-orders-items__table-desktop font-semibold text-center mb-1 py-2"},m.a.createElement("h1",null,"#"),m.a.createElement("h1",null,i({id:"the-item"})),m.a.createElement("h1",null,i({id:"quantity"})),m.a.createElement("h1",null,i({id:"price"})),m.a.createElement("h1",null,i({id:"total"}))),null===b||void 0===b?void 0:b.map((function(e,t){return m.a.createElement("div",{key:e.id,className:"my-orders-item-desktop text-sm text-center mb-1"},m.a.createElement("div",{className:""},m.a.createElement("h1",{className:""},t+1)),m.a.createElement(B.b,{to:"/".concat(o,"/products/").concat(e.slug,"/").concat(e.id),className:"hover:underline font-semibold truncate"},e["name_".concat(o)]),m.a.createElement("div",{className:""},m.a.createElement("h1",{className:""},e.qty)),m.a.createElement("div",{style:{fontWeight:900}},m.a.createElement("h1",{className:""},e.price," ",null===d||void 0===d?void 0:d.currency.translation[o].symbol)),m.a.createElement("div",{style:{fontWeight:900},className:"text-green-700"},m.a.createElement("h1",{className:""},e.total," ",null===d||void 0===d?void 0:d.currency.translation[o].symbol)))})),m.a.createElement("hr",{className:"my-1"}),m.a.createElement("div",{className:"my-orders-receipt-summary font-bold p-2"},m.a.createElement("h1",null,i({id:"cart-total"})),m.a.createElement("h1",{className:"text-center"},h,m.a.createElement("span",{className:"mx-1"},null===d||void 0===d?void 0:d.currency.translation[o].symbol)),m.a.createElement("h1",null,i({id:"cart-delivery-cost"})),m.a.createElement("h1",{className:" text-center"},"0"===E?i({id:"cart-free"}):E,m.a.createElement("span",{className:"mx-1"},null===d||void 0===d?void 0:d.currency.translation[o].symbol)),x&&m.a.createElement(m.a.Fragment,null,m.a.createElement("h1",{className:""},i({id:"coupon-sale"})),m.a.createElement("h1",{className:"text-center text-green-700"},v,m.a.createElement("span",{className:"mx-1"},null===d||void 0===d?void 0:d.currency.translation[o].symbol))),m.a.createElement("h1",{className:"text-green-700 text-xl font-bold mt-3"},i({id:"subtotal"})),m.a.createElement("h1",{className:"text-green-700 text-center text-xl font-bold mt-3"},f," ",null===d||void 0===d?void 0:d.currency.translation[o].symbol))),m.a.createElement("div",{className:""},m.a.createElement("div",{className:"p-2 border-b"},m.a.createElement("h1",{style:{fontWeight:900},className:"text-center"},i({id:"delivery-address"}))),m.a.createElement("div",{className:" p-2",style:{display:"grid",gridTemplateColumns:"1fr 0.4fr"}},m.a.createElement("div",null,m.a.createElement("div",{className:"mb-2 text-center"},m.a.createElement("h1",{className:" text-gray-700"},i({id:"delivery-location"})," "),m.a.createElement("h1",null,null===a||void 0===a?void 0:a.marked_address)),m.a.createElement("div",{className:" mb-2 text-center"},m.a.createElement("div",null,m.a.createElement("h1",{className:" text-gray-700"},i({id:"maps-detailed-address-apartment"})," "),m.a.createElement("h1",null,null===a||void 0===a?void 0:a.apartment_house_number)),m.a.createElement("div",null,m.a.createElement("h1",{className:"font-semibold text-gray-700"},i({id:"maps-detailed-address-building"})," "),m.a.createElement("h1",null,null===a||void 0===a?void 0:a.building_tower_number))),m.a.createElement("div",{className:"text-center"},m.a.createElement("div",null,m.a.createElement("h1",{className:"font-semibold text-gray-700"},i({id:"maps-details-extra-details"})," ",":"," "),m.a.createElement("h1",{className:""},(null===a||void 0===a?void 0:a.addition_direction)||i({id:"none"}))))),(null===a||void 0===a?void 0:a.lat)&&m.a.createElement("img",{src:"https://maps.googleapis.com/maps/api/staticmap?center=".concat(a.lat,",").concat(a.lng,"&zoom=15&size=200x200&key=").concat("AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg"),alt:"map",className:"self-start"})))),m.a.createElement("div",{className:"font-semibold border-l"},m.a.createElement("div",{className:" mb-4 relative  "},m.a.createElement("div",{className:"p-2 border-b"},m.a.createElement("h1",{className:"text-center"},i({id:"select-payment-method"}))),m.a.createElement("div",{className:"p-2"},m.a.createElement("div",{className:"flex flex-col "},function(){var e=[];if(d)return d.payment.forEach((function(t){if(0===t.status)return null;"knet"===t.key&&e.push(m.a.createElement("button",{key:t.key,onClick:function(){return y(t.key)},className:" ".concat(l===t.key&&"bg-main-color text-main-text border-main-color"," mb-3 flex border items-center justify-start rounded p-2 font-semibold")},m.a.createElement("img",{src:S.a,alt:t.key}),m.a.createElement("div",{className:"flex-1 mx-3 text-left"},i({id:t.key})),m.a.createElement("div",null,l===t.key?m.a.createElement(O.j,{className:"w-6 h-6 text-btn-secondary-light"}):m.a.createElement(O.i,{className:"w-6 h-6 text-btn-primary-light"})))),"credit"===t.key&&e.push(m.a.createElement("button",{key:t.key,onClick:function(){return y(t.key)},className:" ".concat(l===t.key&&"bg-main-color text-main-text border-main-color"," mb-3 flex border items-center justify-start rounded p-2 font-semibold")},m.a.createElement("img",{src:A.a,alt:t.key}),m.a.createElement("div",{className:"flex-1 mx-3 text-left"},i({id:t.key})),m.a.createElement("div",null,l===t.key?m.a.createElement(O.j,{className:"w-6 h-6 text-btn-secondary-light"}):m.a.createElement(O.i,{className:"w-6 h-6 text-btn-primary-light"})))),"amex"===t.key&&e.push(m.a.createElement("button",{key:t.key,onClick:function(){return y(t.key)},className:" ".concat(l===t.key&&"bg-main-color text-main-text border-main-color"," mb-3 flex border items-center justify-start rounded p-2 font-semibold")},m.a.createElement("img",{src:z.a,alt:t.key}),m.a.createElement("div",{className:"flex-1 mx-3 text-left"},i({id:t.key})),m.a.createElement("div",null,l===t.key?m.a.createElement(O.j,{className:"w-6 h-6 text-btn-secondary-light"}):m.a.createElement(O.i,{className:"w-6 h-6 text-btn-primary-light"})))),"cod"===t.key&&e.push(m.a.createElement("button",{key:t.key,onClick:function(){return y(t.key)},className:" ".concat(l===t.key&&"bg-main-color text-main-text border-main-color"," mb-3 flex border items-center justify-start rounded p-2 font-semibold")},m.a.createElement("img",{src:T.a,alt:t.key}),m.a.createElement("div",{className:"flex-1 mx-3 text-left"},i({id:"cash-on-delivery"})),m.a.createElement("div",null,l===t.key?m.a.createElement(O.j,{className:"w-6 h-6 text-main-text"}):m.a.createElement(O.i,{className:"w-6 h-6 text-main-color"}))))})),e}()))))),m.a.createElement("div",{className:"flex justify-end items-center p-3"},m.a.createElement("button",{className:"px-3 py-1 uppercase bg-main-color text-main-text rounded font-semibold",onClick:t},i({id:"btn-back-to-addresses"})),m.a.createElement("button",{disabled:!l,className:"\n              ".concat(l?"bg-main-color text-main-text":"bg-gray-600 text-gray-100","\n             flex items-center justify-center uppercase px-3 py-1 mx-3  rounded font-semibold"),onClick:r},c?m.a.createElement(p.a,{type:"ThreeDots",color:"#fff",height:24,width:24,visible:!0}):i({id:"btn-proceed"}))))}var I=a(13),U=a(17),V=a(43);function F(){var e=Object(I.b)(U.i,{throwOnError:!0}),t=Object(i.a)(e,2),a=t[0],l=t[1].isLoading,o=m.a.useContext(D.a),b=o.cartItems,h=o.cartItemsLoading,f=o.coupon,E=m.a.useContext(H.a).deliveryCountry,v=m.a.useState(0),x=Object(i.a)(v,2),y=x[0],N=x[1],k=m.a.useState(null),O=Object(i.a)(k,2),C=O[0],S=O[1],_=m.a.useState(null),A=Object(i.a)(_,2),M=A[0],T=A[1],q=m.a.useState(!1),z=Object(i.a)(q,2),B=z[0],F=z[1],W=m.a.useState(""),Q=Object(i.a)(W,2),X=Q[0],Y=Q[1],K=Object(g.a)().formatMessage,J=m.a.useState({0:!1,1:!1,2:!1}),P=Object(i.a)(J,2),R=P[0],$=P[1],G=function(){N(y+1),$(Object(s.a)(Object(s.a)({},R),{},Object(c.a)({},y,!0)))},Z=function(){var e=Object(r.a)(n.a.mark((function e(){var t,l,r,c;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={address:C.id,payment_method:M,order_type:"Kuwait"===(null===E||void 0===E?void 0:E.translation.en.name)?"local":"international"},e.prev=1,e.next=4,a({deliveryCountry:E,order:t,coupon:f});case 4:l=e.sent,$(Object(s.a)(Object(s.a)({},R),{},{1:!0})),"cod"===M?N(2):window.location.href=l.payment,e.next=15;break;case 9:if(e.prev=9,e.t0=e.catch(1),F(!0),"Coupon already used by this customer."!==(null===(r=e.t0.response)||void 0===r||null===(c=r.data)||void 0===c?void 0:c.message)){e.next=14;break}return e.abrupt("return",Y(K({id:"coupon-limit-reached"})));case 14:Y(K({id:"something-went-wrong-snackbar"}));case 15:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(){return e.apply(this,arguments)}}();return m.a.useEffect((function(){window.scrollTo(0,0)}),[y]),h?m.a.createElement("div",{className:"flex items-center justify-center min-h-screen"},m.a.createElement(p.a,{type:"ThreeDots",color:"#b72b2b",height:50,width:50,visible:!0})):h||0!==b.length?m.a.createElement(w.a,null,m.a.createElement("div",{className:"xxl:max-w-default md:max-w-screen-xl mx-auto"},B&&m.a.createElement(V.a,{message:X,closeFunction:function(){F(!1)}}),m.a.createElement(u.a,{selectedStep:y,stepDone:R}),m.a.createElement("div",{className:"mb-3",style:{minHeight:"calc(100vh - 150px)"}},0===y&&m.a.createElement(j,{handleSelectAddress:function(e){S(e),G()}}),1===y&&m.a.createElement(L,{handleStepBack:function(){0!==y&&(N(y-1),$(Object(s.a)(Object(s.a)({},R),{},Object(c.a)({},y-1,!1))))},selectedAddress:C,paymentMethod:M,setPaymentMethod:T,handleCheckout:Z,checkoutLoading:l}),2===y&&m.a.createElement(d.a,null)))):m.a.createElement(w.a,null,m.a.createElement("div",{className:"flex items-center justify-center mx-auto text-center",style:{height:"calc(100vh - 56px)",maxWidth:"600px"}},m.a.createElement("h1",{className:"text-2xl font-semibold"},K({id:"checkout-cart-empty"}))))}}}]);
//# sourceMappingURL=16.ecfe1a3d.chunk.js.map