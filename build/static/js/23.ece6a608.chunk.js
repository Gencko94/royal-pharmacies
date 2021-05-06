(this["webpackJsonproyal-pharmacy"]=this["webpackJsonproyal-pharmacy"]||[]).push([[23],{497:function(e,t,s){"use strict";s.r(t),s.d(t,"default",(function(){return je}));var a=s(2),i=s.n(a),c=s(200),n=s(115),r=s(78),l=s(40),d=s(8),o=s(18),j=s(104),x=s(1);function b(){return Object(x.jsxs)(j.a,{speed:2,viewBox:"0 0 250 98",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",children:[Object(x.jsx)("ellipse",{x:"48",y:"48",rx:"50",ry:"50",width:"30",height:"46"}),Object(x.jsx)("rect",{x:"80",y:"25",rx:"5",ry:"5",width:"140",height:"25"}),Object(x.jsx)("rect",{x:"80",y:"55",rx:"5",ry:"5",width:"140",height:"25"}),Object(x.jsx)("rect",{x:"80",y:"85",rx:"5",ry:"5",width:"140",height:"25"})]})}var m=s(80);function h(){var e=Object(r.a)().formatMessage,t=i.a.useContext(o.a),s=t.userData,a=t.authenticationLoading,c=t.authenticationFetching,l=t.userLogoutMutation;return a||c?Object(x.jsx)(b,{}):Object(x.jsxs)(n.a.div,{className:"flex mb-4 rounded-lg  p-2 border shadow-itemsSlider-shallow overflow-hidden ",children:[Object(x.jsx)("div",{className:"flex items-center justify-center",style:{flexBasis:"20%"},children:Object(x.jsx)("div",{className:"p-2 text-xl font-bold text-body-light rounded-full bg-gray-500",children:null===s||void 0===s?void 0:s.name.split(" ")[0].charAt(0).toUpperCase()})}),Object(x.jsxs)("div",{className:" flex flex-col items-center flex-1 justify-center font-semibold mx-2 ",children:[Object(x.jsxs)("div",{className:"flex mb-1 font-bold items-center justify-center flex-wrap",children:[Object(x.jsxs)("h1",{children:[e({id:"welcome-user"})," "]}),Object(x.jsx)("h1",{className:"mx-1",children:null===s||void 0===s?void 0:s.name})]}),Object(x.jsx)("h1",{className:"mb-1",children:null===s||void 0===s?void 0:s.mobile}),Object(x.jsxs)("button",{onClick:l,className:"text-xs md:text-sm transition duration-100 flex items-center justify-center px-2 py-1 rounded-full bg-main-color text-main-text hover:text-main-color hover:bg-body-light font-semibold",children:[Object(x.jsx)(m.b,{className:" w-5 h-5"}),Object(x.jsx)("span",{className:"mx-1",children:e({id:"logout"})})]})]})]})}function u(){var e=Object(r.a)().formatMessage,t=Object(l.j)().url;return Object(x.jsxs)(n.a.div,{initial:!1,layout:!0,className:" flex flex-col self-start ",children:[Object(x.jsx)(h,{}),Object(x.jsx)("div",{className:"flex flex-col rounded-lg overflow-hidden shadow-itemsSlider-shallow ",children:[{url:"",name:"my-profile"},{url:"/addresses",name:"my-addresses"},{url:"/orders",name:"my-orders"}].map((function(s){return Object(x.jsxs)("div",{children:[Object(x.jsx)(d.c,{exact:!0,className:"w-full text-lg font-semibold px-6 py-4 inline-block text-center ",activeClassName:"font-bold bg-main-color text-main-text transition duration-100 ",to:"".concat(t).concat(s.url),children:e({id:s.name})}),Object(x.jsx)("hr",{})]},s.name)}))})]})}var O=s(6),p=s(5),f=s(45),v=s(4),y=s.n(v),g=s(9),N=s(56),w=s(25),k=s(38),S=s(17),_=s.n(S),C=(s(37),s(21));function M(e){var t=e.userData,s=e.setProfileEditModalOpen,a=e.editMutation,c=i.a.useState(!1),l=Object(O.a)(c,2),d=l[0],o=l[1],j=i.a.useState(""),b=Object(O.a)(j,2),m=b[0],h=b[1],u=Object(r.a)(),p=u.formatMessage,f=u.locale,v=w.a({email:w.c().email(p({id:"email-validation"})),name:w.c().required(p({id:"fullname-empty"}))});return Object(x.jsxs)(n.a.div,{variants:{hidden:{y:"50%",opacity:0},visible:{y:0,opacity:1,transition:{type:"tween"}},exited:{x:"100%",opacity:0,transition:{type:"tween"}}},initial:"hidden",animate:"visible",exit:"exited",className:"fixed bg-body-light  z-50 top-0 w-full h-full left-0 ",children:[d&&Object(x.jsx)(N.a,{message:m,closeFunction:function(){o(!1)}}),Object(x.jsxs)("div",{className:" sticky top-0 p-3 flex items-center bg-main-color text-main-text z-1",children:[Object(x.jsx)("button",{className:"text-main-text text-center",onClick:function(){return s(!1)},children:"en"===f?Object(x.jsx)(C.f,{className:"w-6 h-6 "}):Object(x.jsx)(C.g,{className:"w-6 h-6 "})}),Object(x.jsx)("h1",{className:" text-lg mx-4",children:p({id:"edit-personal-information"})})]}),Object(x.jsx)(k.a,{initialValues:{email:t.email||"",name:t.name},validationSchema:v,onSubmit:function(){var e=Object(g.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(!1),e.prev=1,e.next=4,a(t);case 4:s(!1),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(1),o(!0),h(p({id:"something-went-wrong-snackbar"}));case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}(),children:function(e){var t=e.handleSubmit,s=e.values,a=e.isSubmitting;return Object(x.jsxs)("form",{className:"px-3 py-2 ",onSubmit:t,children:[Object(x.jsx)(P,{label:p({id:"full-name"}),name:"name",value:s.name,type:"text"}),Object(x.jsx)(P,{label:p({id:"email-address"}),name:"email",value:s.email,type:"email"}),Object(x.jsx)("div",{className:"mt-1",children:Object(x.jsxs)("button",{type:"submit",className:"\n                 \n                      bg-main-color text-second-nav-text-light hover:bg-red-800\n                   w-full rounded flex items-center justify-center text-sm  p-2 font-semibold  transition duration-150 uppercase ",children:[a&&Object(x.jsx)(_.a,{type:"ThreeDots",color:"#fff",height:20,width:20,visible:a}),!a&&p({id:"save-button"})]})})]})}})]})}var P=function(e){var t=e.label,s=(e.value,e.name),a=Object(f.a)(e,["label","value","name"]),i=Object(k.b)(s),c=Object(O.a)(i,2),n=c[0],r=c[1];return Object(x.jsxs)("div",{className:"mb-2",children:[Object(x.jsx)("label",{htmlFor:s,className:" font-semibold ",children:t}),Object(x.jsx)("input",Object(p.a)(Object(p.a)(Object(p.a)({},n),a),{},{onBlur:function(e){n.onBlur(e)},className:" w-full rounded-lg border p-2 mt-1"})),r.touched&&r.error?Object(x.jsx)("h1",{className:"text-xs text-main-color mt-1",children:r.error}):Object(x.jsx)("h1",{className:"text-xs text-main-color mt-1",style:{height:"18px"},children:" "})]})},D=s(144),A=s(466);function F(e){var t=e.setPasswordChangeModalOpen,s=e.changePasswordMutation,a=Object(r.a)(),c=a.formatMessage,l=a.locale,d=i.a.useState(!1),o=Object(O.a)(d,2),j=o[0],b=o[1],m=i.a.useState(""),h=Object(O.a)(m,2),u=h[0],p=h[1],f=i.a.useState(!1),v=Object(O.a)(f,2),S=v[0],M=v[1],P=i.a.useState(""),D=Object(O.a)(P,2),F=D[0],R=D[1],T=function(){b(!1)},L=w.a({newPassword:w.c().required(c({id:"password-empty"})).min(6,c({id:"password-min-6"})).max(15,c({id:"password-max-15"})),confirmPassword:w.c().required(c({id:"password-empty"})).when("newPassword",{is:function(e){return!!(e&&e.length>0)},then:w.c().oneOf([w.b("newPassword")],c({id:"same-password"}))})});return Object(x.jsxs)(n.a.div,{variants:{hidden:{y:"50%",opacity:0},visible:{y:0,opacity:1,transition:{type:"tween"}},exited:{x:"100%",opacity:0,transition:{type:"tween"}}},initial:"hidden",animate:"visible",exit:"exited",className:"fixed bg-body-light  z-50 top-0 w-full h-full left-0 ",children:[j&&Object(x.jsx)(N.a,{message:u,closeFunction:T}),S&&Object(x.jsx)(A.a,{message:F,closeFunction:T}),Object(x.jsxs)("div",{className:" sticky top-0 p-3 flex items-center bg-main-color text-main-text z-1",children:[Object(x.jsx)("button",{className:"text-main-text text-center",onClick:function(){return t(!1)},children:"en"===l?Object(x.jsx)(C.f,{className:"w-6 h-6 "}):Object(x.jsx)(C.g,{className:"w-6 h-6 "})}),Object(x.jsx)("h1",{className:" text-lg font-semibold mx-4",children:c({id:"change-password"})})]}),Object(x.jsx)(k.a,{initialValues:{oldPassword:"",newPassword:"",confirmPassword:""},validationSchema:L,onSubmit:function(){var e=Object(g.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(!1),e.prev=1,e.next=4,s(t);case 4:R(c({id:"password-change-success"})),M(!0),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),b(!0),p(c({id:"something-went-wrong-snackbar"}));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),children:function(e){var t=e.handleSubmit,s=e.values,a=e.isSubmitting;return Object(x.jsxs)("form",{className:"px-3 py-2 ",onSubmit:t,children:[Object(x.jsx)(z,{label:c({id:"old-password"}),name:"oldPassword",value:s.oldPassword,type:"password"}),Object(x.jsx)(z,{label:c({id:"new-password"}),name:"newPassword",value:s.newPassword,type:"password"}),Object(x.jsx)(z,{label:c({id:"confirm-password"}),name:"confirmPassword",value:s.confirmPassword,type:"password"}),Object(x.jsx)("div",{className:"mt-1",children:Object(x.jsxs)("button",{type:"submit",className:"\n                      bg-main-color text-main-text hover:bg-red-800\n                   w-full rounded flex items-center justify-center p-2 font-semibold  transition duration-150 uppercase ",children:[a&&Object(x.jsx)(_.a,{type:"ThreeDots",color:"#fff",height:25,width:25,visible:a}),!a&&c({id:"save-button"})]})})]})}})]})}var z=function(e){var t=e.label,s=(e.value,e.name),a=Object(f.a)(e,["label","value","name"]),i=Object(k.b)(s),c=Object(O.a)(i,2),n=c[0],r=c[1];return Object(x.jsxs)("div",{className:"mb-2",children:[Object(x.jsx)("label",{htmlFor:s,className:" font-semibold ",children:t}),Object(x.jsx)("input",Object(p.a)(Object(p.a)(Object(p.a)({},n),a),{},{onBlur:function(e){n.onBlur(e)},className:"".concat(r.touched&&r.error&&"border-main-color"," w-full rounded-lg border p-2 mt-1")})),r.touched&&r.error?Object(x.jsx)("h1",{className:"text-sm text-main-color mt-1",children:r.error}):Object(x.jsx)("h1",{className:"text-sm text-main-color mt-1",style:{height:"22px"},children:" "})]})},R=s(458),T=s.n(R);function L(){var e=Object(r.a)().formatMessage,t=i.a.useState(!1),s=Object(O.a)(t,2),a=s[0],c=s[1],l=i.a.useState(!1),d=Object(O.a)(l,2),j=d[0],b=d[1],m=i.a.useContext(o.a),h=m.userData,u=m.editMutation,p=m.authenticationLoading,f=m.authenticationFetching,v=m.changePasswordMutation,y={hidden:{x:"100%",opacity:0},visible:{x:0,opacity:1},exit:{x:"-100%",opacity:0}};return p||f?Object(x.jsx)(n.a.div,{variants:y,initial:"hidden",animate:"visible",exit:"exit",className:"relative",style:{height:"calc(-90px + 100vh)"},children:Object(x.jsx)("div",{className:"flex h-full justify-center items-center",children:Object(x.jsx)(_.a,{type:"ThreeDots",color:"#b72b2b",height:40,width:40,visible:!0})})}):Object(x.jsxs)(n.a.div,{variants:y,initial:"hidden",animate:"visible",exit:"exit",className:"relative",style:{height:"calc(-90px + 100vh)"},children:[Object(x.jsxs)("div",{className:"",children:[Object(x.jsxs)("div",{className:"bg-main-color text-main-text px-3 py-3 flex items center justify-between",children:[Object(x.jsx)("h1",{className:"text-lg",children:e({id:"general-information"})}),Object(x.jsx)("button",{onClick:function(){return c(!0)},className:"px-4 text-sm py-1 font-semibold bg-body-light text-btn-primary-light rounded",children:e({id:"edit"})})]}),Object(x.jsxs)("div",{className:" ",children:[Object(x.jsxs)("div",{children:[Object(x.jsxs)("div",{className:" py-4 px-3 flex    ",children:[Object(x.jsx)("h1",{className:" font-bold w-2/4",children:e({id:"full-name"})}),Object(x.jsx)("h1",{className:"",children:h.name})]}),Object(x.jsx)("hr",{})]}),Object(x.jsxs)("div",{children:[Object(x.jsxs)("div",{className:" py-4 px-3 flex    ",children:[Object(x.jsx)("h1",{className:" font-bold w-2/4",children:e({id:"phone-number"})}),Object(x.jsx)("h1",{className:"",children:h.mobile})]}),Object(x.jsx)("hr",{})]}),Object(x.jsxs)("div",{children:[Object(x.jsxs)("div",{className:" py-4 px-3 flex    ",children:[Object(x.jsx)("h1",{className:" font-bold w-2/4",children:e({id:"email-address"})}),Object(x.jsx)("h1",{className:"",children:h.email})]}),Object(x.jsx)("hr",{})]}),Object(x.jsxs)("div",{children:[Object(x.jsxs)("div",{className:" py-4 px-3 flex    ",children:[Object(x.jsx)("h1",{className:" font-bold w-2/4",children:e({id:"date-joined"})}),Object(x.jsx)("h1",{className:"",children:T()(h.created_at).format("DD/MM/YYYY")})]}),Object(x.jsx)("hr",{})]})]})]}),Object(x.jsx)("div",{className:"flex items-center justify-end  py-4 px-3",children:Object(x.jsx)("button",{onClick:function(){return b(!0)},className:"px-4 py-1 bg-main-color text-main-text font-semibold rounded uppercase",children:e({id:"change-password"})})}),Object(x.jsx)(D.a,{children:a&&Object(x.jsx)(M,{userData:h,setProfileEditModalOpen:c,editMutation:u})}),Object(x.jsx)(D.a,{children:j&&Object(x.jsx)(F,{setPasswordChangeModalOpen:b,changePasswordMutation:v})})]})}var B=s(463),Y=s(467);function q(e){var t=e.data,s=e.handleRemoveLocation,a=e.deleteButtonLoading,c=Object(r.a)().formatMessage,l=i.a.useState(null),d=Object(O.a)(l,2),o=d[0],j=d[1];return Object(x.jsxs)(n.a.div,{layout:!0,variants:{hidden:{opacity:0},visible:{opacity:1,clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)"},exited:{opacity:0,clipPath:"polygon(0 54%, 100% 53%, 100% 53%, 0 54%)"}},initial:"hidden",animate:"visible",exit:"exited",className:"rounded border shadow-itemsSlider-shallow flex flex-col bg-body-light",children:[Object(x.jsxs)(n.a.div,{layout:!0,style:{position:"relative"},children:["map"===t.type?Object(x.jsx)(Y.a,{height:150,width:200,lat:t.lat,lng:t.lng,alt:t.address_name}):Object(x.jsxs)("div",{className:"p-2 text-sm border-b",style:{height:"150px"},children:[Object(x.jsxs)("div",{children:[Object(x.jsxs)("h1",{children:[c({id:"maps-detailed-address-apartment-short"}),":"]}),Object(x.jsx)("h1",{children:t.apartment_house_number})]}),Object(x.jsxs)("div",{children:[Object(x.jsxs)("h1",{children:[c({id:"maps-detailed-address-building-short"}),":"]}),Object(x.jsx)("h1",{children:t.building_tower_number})]}),Object(x.jsxs)("div",{children:[Object(x.jsxs)("h1",{children:[c({id:"maps-detailed-address-phone-short"}),":"]}),Object(x.jsx)("h1",{children:t.phone_number})]})]}),"map"===t.type&&Object(x.jsxs)(n.a.div,{variants:{partial:{right:0,top:0,bottom:0,width:"20%"},full:{right:0,top:0,bottom:0,width:"100%"}},initial:"partial",animate:o===t.id?"full":"partial",layout:!0,exit:"partial",onClick:function(){return e=t.id,void j(o===e?null:e);var e},className:"absolute overflow-hidden p-2 text-main-text  transition cursor-pointer duration-150 opacity-50 bg-gray-800 hover:opacity-75",children:[Object(x.jsx)(C.m,{style:{left:"10px"},className:"absolute  top-1/2 transform  -translate-y-1/2  w-5 h-5"}),Object(x.jsx)(D.a,{children:o===t.id&&Object(x.jsxs)(n.a.div,{initial:{opacity:0},animate:{opacity:1,marginLeft:"35px"},exit:{opacity:0},layout:!0,className:"text-sm",children:[Object(x.jsxs)("div",{children:[Object(x.jsxs)("h1",{children:[c({id:"maps-detailed-address-apartment-short"}),":"]}),Object(x.jsx)("h1",{children:t.apartment_house_number})]}),Object(x.jsxs)("div",{children:[Object(x.jsxs)("h1",{children:[c({id:"maps-detailed-address-building-short"}),":"]}),Object(x.jsx)("h1",{children:t.building_tower_number})]}),Object(x.jsxs)("div",{children:[Object(x.jsxs)("h1",{children:[c({id:"maps-detailed-address-phone-short"}),":"]}),Object(x.jsx)("h1",{children:t.phone_number})]})]})})]})]}),Object(x.jsxs)(n.a.div,{layout:!0,className:"p-2 flex flex-1 flex-col",children:[Object(x.jsx)("div",{className:"text-xs text-gray-600 font-semibold",children:Object(x.jsx)("h1",{children:t.address_name})}),Object(x.jsxs)("div",{className:"text-sm mb-2 font-semibold flex-1",children:[Object(x.jsx)("h1",{children:"text"===t.type?t.userTyped_address:t.marked_address}),t.addition_direction&&Object(x.jsx)("h1",{children:t.addition_direction})]}),Object(x.jsx)("button",{onClick:function(){return s(t.id)},className:" ".concat(a===t.id?"bg-gray-300":"bg-main-color"," text-main-text rounded  p-2 uppercase   text-sm w-full flex justify-center mt-auto"),children:a===t.id?Object(x.jsx)(_.a,{type:"ThreeDots",color:"#b72b2b",height:20,width:20,visible:!0}):Object(x.jsx)("h1",{children:c({id:"remove-location"})})})]})]})}var E=s(452),H=s(130),V=s.n(H);function W(e){var t=e.locations,s=e.setShowMap,a=Object(r.a)().formatMessage,c=i.a.useContext(o.a).deleteAddressMutation,l=i.a.useState(null),d=Object(O.a)(l,2),j=d[0],b=d[1],m=i.a.useState(!1),h=Object(O.a)(m,2),u=h[0],p=h[1],f=i.a.useState(""),v=Object(O.a)(f,2),w=v[0],k=v[1],S=function(){var e=Object(g.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,b(t),e.next=4,c(t);case 4:s(!1),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),b(null),p(!0),k({id:"something-went-wrong-snackbar"});case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}();return Object(x.jsxs)("div",{className:"h-full",children:[u&&Object(x.jsx)(N.a,{message:w,closeFunction:function(){p(!1)}}),Object(x.jsx)("div",{className:" p-3  bg-main-color text-main-text",children:Object(x.jsx)("h1",{className:"text-lg font-semibold",children:a({id:"my-addresses"})})}),Object(x.jsx)(E.a,{children:Object(x.jsxs)(n.a.div,{layout:!0,className:"p-3 locations-grid__desktop",children:[Object(x.jsx)(D.a,{children:t.map((function(e){return Object(x.jsx)(q,{data:e,handleRemoveLocation:S,deleteButtonLoading:j},e.id)}))}),Object(x.jsxs)(n.a.button,{layout:!0,onClick:function(){return s(!0)},className:"p-3 flex items-center justify-center self-center justify-self-center bg-main-color hover:bg-red-900 transition duration-150 relative rounded-lg text-main-text",children:[Object(x.jsx)(V.a,{background:!0}),Object(x.jsx)(C.q,{className:"h-8 w-8"})]},"add-button")]})})]})}var I=s(484);function U(){var e=i.a.useState(!1),t=Object(O.a)(e,2),s=t[0],a=t[1],c=i.a.useContext(o.a),r=c.userAddresses;return c.userAddressesLoading?Object(x.jsx)("div",{className:"flex h-full justify-center items-center",children:Object(x.jsx)(_.a,{type:"ThreeDots",color:"#b72b2b",height:40,width:40,visible:!0})}):Object(x.jsxs)(n.a.div,{variants:{hidden:{x:"100%",opacity:0},visible:{x:0,opacity:1},exit:{x:"-100%",opacity:0}},initial:"hidden",animate:"visible",exit:"exit",className:"h-full",children:[!s&&(0===r.length?Object(x.jsx)(I.a,{setShowMap:a}):Object(x.jsx)(W,{locations:r,setShowMap:a})),s&&Object(x.jsx)("div",{className:"relative h-full",children:Object(x.jsx)(B.a,{setShowMap:a})})]})}var J=s(94),K=s(19),Q=s(482);function X(){var e=Object(r.a)(),t=e.formatMessage,s=e.locale;return Object(x.jsxs)("div",{className:"flex flex-col justify-center items-center h-full",children:[Object(x.jsx)("img",{src:Q.a,alt:"map",className:"mb-6",style:{height:"200px"}}),Object(x.jsxs)("div",{className:"flex flex-col items-center ",children:[Object(x.jsx)("h1",{className:"text-lg text-center font-bold",children:t({id:"no-orders-placed"})}),Object(x.jsxs)(d.b,{to:"/".concat(s,"/"),className:" mt-3  font-semibold flex items-center rounded px-4 py-2  \n            bg-main-color text-main-text",children:[Object(x.jsx)("h1",{className:"mx-2 uppercase",children:t({id:"start-shopping-now"})}),Object(x.jsx)(C.c,{className:"w-20p h-20p"})]})]})]})}var G=s(22),Z=s(145),$=s(146),ee=s(149),te=s(147),se=s(10);function ae(e){var t=e.order,s=e.handleShowAddReviews,a=e.index,c=Object(r.a)().formatMessage,l=i.a.useState(!1),d=Object(O.a)(l,2),o=d[0],j=d[1],b=t.status;return Object(x.jsxs)(n.a.div,{layout:!0,className:"rounded border",children:[function(){switch(b){case"completed":return Object(x.jsxs)(n.a.div,{layout:!0,className:" text-body-text-dark flex items-center  px-3 py-2 font-semibold bg-green-700  ",children:[Object(x.jsx)("h1",{children:c({id:"order-status"})}),":",Object(x.jsx)("h1",{className:"mx-1",children:c({id:"order-completed"})})]});case"canceled":return Object(x.jsxs)(n.a.div,{layout:!0,className:" text-body-text-dark flex items-center px-3 py-2 font-semibold bg-main-color  ",children:[Object(x.jsx)("h1",{children:c({id:"order-status"})}),":",Object(x.jsx)("h1",{className:"mx-1",children:c({id:"order-cancelled"})})]});case"pending":return Object(x.jsxs)(n.a.div,{layout:!0,className:" text-body-text-dark  flex items-center px-3 py-2 font-semibold bg-yellow-600  ",children:[Object(x.jsx)("h1",{children:c({id:"order-status"})}),":",Object(x.jsx)("h1",{className:"mx-1",children:c({id:"order-pending"})})]});case"delivery":return Object(x.jsxs)(n.a.div,{layout:!0,className:" text-body-text-dark  flex items-center px-3 py-2 font-semibold bg-blue-600  ",children:[Object(x.jsx)("h1",{children:c({id:"order-status"})}),":",Object(x.jsx)("h1",{className:"mx-1",children:c({id:"order-delivery"})})]});case"waiting_for_payment":return Object(x.jsxs)(n.a.div,{layout:!0,className:" text-body-text-dark flex items-center px-3 py-2 font-semibold bg-yellow-600  ",children:[Object(x.jsx)("h1",{children:c({id:"order-status"})}),":",Object(x.jsx)("h1",{className:"mx-1",children:c({id:"order-waiting-for-payment"})})]});case"confirmed":return Object(x.jsxs)(n.a.div,{layout:!0,className:" text-body-text-dark flex items-center px-3 py-2 font-semibold bg-blue-600  ",children:[Object(x.jsx)("h1",{children:c({id:"order-status"})}),":",Object(x.jsx)("h1",{className:"mx-1",children:c({id:"order-confirmed"})})]});case"new":return Object(x.jsxs)(n.a.div,{layout:!0,className:" text-body-text-dark flex items-center px-3 py-2 font-semibold bg-blue-600  ",children:[Object(x.jsx)("h1",{children:c({id:"order-status"})}),":",Object(x.jsx)("h1",{className:"mx-1",children:c({id:"order-new"})})]})}}(),Object(x.jsxs)(n.a.div,{layout:!0,className:"my-orders-grid__desktop p-3 bg-gray-900 text-main-text",children:[Object(x.jsxs)(n.a.div,{layout:!0,children:[Object(x.jsxs)("div",{className:"font-semibold",children:[Object(x.jsxs)("h1",{className:"text-gray-500",children:[c({id:"order-date"})," :"]}),Object(x.jsxs)("h1",{children:[" ",T()(t.created_at).format("DD/MM/YYYY - HH:MM")]})]}),Object(x.jsxs)("div",{children:[Object(x.jsxs)("h1",{className:"text-gray-500 font-semibold",children:[c({id:"payment-method"}),":"]}),"knet"===t.payment_method?Object(x.jsxs)("div",{className:"  flex  items-center justify-start  p-2 font-semibold",children:[Object(x.jsx)("img",{src:Z.a,alt:t.payment_method}),Object(x.jsx)("div",{className:"flex-1 mx-3 text-left",children:"K-net"})]}):"credit"===t.payment_method?Object(x.jsxs)("div",{className:"  flex  items-center justify-start  p-2 font-semibold",children:[Object(x.jsx)("img",{src:$.a,alt:t.payment_method}),Object(x.jsx)("div",{className:"flex-1 mx-3 text-left",children:"Credit Card"})]}):"amex"===t.payment_method?Object(x.jsxs)("div",{className:" flex  items-center justify-start  p-2 font-semibold",children:[Object(x.jsx)("img",{src:te.a,alt:t.payment_method}),Object(x.jsx)("div",{className:"flex-1 mx-3 text-left",children:"American Express"})]}):"cod"===t.payment_method?Object(x.jsxs)("div",{className:"  flex  items-center justify-start  p-2 font-semibold",children:[Object(x.jsx)("img",{src:ee.a,alt:t.payment_method}),Object(x.jsx)("div",{className:"flex-1 mx-3 text-left",children:c({id:"cash-on-delivery"})})]}):void 0]}),"canceled"!==b&&Object(x.jsx)("button",{onClick:function(){return s(a)},className:"rounded text-main-text p-2 font-semibold bg-green-700",children:c({id:"add-reviews"})})]}),Object(x.jsxs)(n.a.div,{className:"flex justify-between",layout:!0,children:[Object(x.jsxs)("div",{className:"mx-1",children:[Object(x.jsx)("h1",{className:"font-bold text-lg",children:c({id:"delivery-address"})}),Object(x.jsxs)("div",{className:" font-semibold",children:[Object(x.jsx)("h1",{className:"text-gray-500 ",children:c({id:"location"})}),Object(x.jsx)("h1",{children:"".concat("map"===t.address.type?t.address.marked_address:t.address.userTyped_address)})]}),Object(x.jsxs)("div",{className:"font-semibold",children:[Object(x.jsx)("h1",{className:"text-gray-500 ",children:c({id:"maps-detailed-address-apartment"})}),Object(x.jsx)("h1",{children:t.address.apartment_house_number})]}),t.address.building_tower_number&&Object(x.jsxs)("div",{className:"font-semibold",children:[Object(x.jsx)("h1",{className:"text-gray-500 ",children:c({id:"maps-detailed-address-building"})}),Object(x.jsx)("h1",{children:t.address.building_tower_number})]}),t.address.addition_direction&&Object(x.jsxs)("div",{className:"font-semibold",children:[Object(x.jsx)("h1",{className:"text-gray-500 ",children:c({id:"maps-details-extra-details"})}),Object(x.jsx)("h1",{children:t.address.addition_direction})]})]}),Object(x.jsx)(n.a.div,{layout:!0,children:"map"===t.address.type&&t.address.lat&&Object(x.jsx)("img",{src:"https://maps.googleapis.com/maps/api/staticmap?center=".concat(t.address.lat,",").concat(t.address.lng,"&zoom=15&size=150x150&\n              markers=color:blue%7C").concat(t.address.lat,"-").concat(t.address.lng,"&key=").concat("AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg"),alt:"map"})})]})]}),Object(x.jsxs)(n.a.div,{layout:!0,className:"p-2 font-semibold flex items-center bg-gray-200 ",children:[Object(x.jsx)("h1",{children:c({id:"show-order-receipt"})}),Object(x.jsx)("button",{onClick:function(){j(!o)},className:"p-1 mx-2 border rounded-full shadow-md",children:o?Object(x.jsx)(G.e,{className:"h-6 w-6"}):Object(x.jsx)(G.d,{className:"h-6 w-6"})})]}),o&&Object(x.jsx)("hr",{}),Object(x.jsx)(D.a,{children:o&&Object(x.jsx)(ie,{orderItems:t.items,orderSubtotal:t.subtotal,orderTotal:t.total,shippingCost:t.shipping_cost,coupon:t.coupon,couponCost:t.coupon_cost})})]})}var ie=function(e){var t=e.orderItems,s=e.orderTotal,a=e.orderSubtotal,c=e.shippingCost,l=e.coupon,o=e.couponCost,j=Object(r.a)(),b=j.locale,m=j.formatMessage,h=i.a.useContext(se.a).deliveryCountry;return Object(x.jsxs)(n.a.div,{variants:{hidden:{opacity:0},visible:{opacity:1},exited:{opacity:0}},initial:"hidden",animate:"visible",exit:"exited",className:"my-orders-items__grid-desktop p-2",children:[Object(x.jsxs)("div",{className:"my-orders-items__table-desktop font-semibold text-center mb-1",children:[Object(x.jsx)("h1",{children:"#"}),Object(x.jsx)("h1",{children:m({id:"the-item"})}),Object(x.jsx)("h1",{children:m({id:"quantity"})}),Object(x.jsx)("h1",{children:m({id:"price"})}),Object(x.jsx)("h1",{children:m({id:"total"})})]}),t.map((function(e,t){return Object(x.jsxs)("div",{className:"my-orders-item-desktop text-sm text-center",children:[Object(x.jsx)("div",{className:"",children:Object(x.jsx)("h1",{className:"",children:t+1})}),Object(x.jsx)(d.b,{to:"/".concat(b,"/products/").concat(e.product.slug,"/").concat(e.id),className:"hover:underline truncate uppercase font-semibold block",children:e.product.translation[b].title}),Object(x.jsx)("div",{className:"",children:Object(x.jsx)("h1",{className:"",children:e.qty})}),Object(x.jsx)("div",{style:{fontWeight:900},children:Object(x.jsxs)("h1",{className:"",children:[e.price," "]})}),Object(x.jsx)("div",{style:{fontWeight:900},className:"text-green-700",children:Object(x.jsxs)("h1",{className:"",children:[(e.price*e.qty).toFixed(3)," ",null===h||void 0===h?void 0:h.currency.translation[b].symbol]})})]},e.id)})),Object(x.jsx)("hr",{className:"my-1"}),Object(x.jsxs)("div",{className:"my-orders-receipt-summary font-bold",children:[Object(x.jsx)("h1",{children:m({id:"cart-total"})}),Object(x.jsxs)("h1",{className:"text-center",children:[a," ",Object(x.jsx)("span",{className:"mx-1",children:null===h||void 0===h?void 0:h.currency.translation[b].symbol})]}),Object(x.jsx)("h1",{children:m({id:"cart-delivery-cost"})}),Object(x.jsxs)("h1",{className:"text-center",children:["0"===c?m({id:"cart-free"}):c," ",Object(x.jsx)("span",{className:"mx-1",children:null===h||void 0===h?void 0:h.currency.translation[b].symbol})]}),l&&Object(x.jsx)("h1",{className:"mb-2",children:m({id:"coupon-sale"})}),l&&Object(x.jsxs)("h1",{className:"mb-2 text-center",children:[o,Object(x.jsx)("span",{className:"mx-1",children:null===h||void 0===h?void 0:h.currency.translation[b].symbol})]}),Object(x.jsx)("h1",{className:"text-green-700 text-lg font-bold",style:{fontWeight:900},children:m({id:"subtotal"})}),Object(x.jsxs)("h1",{className:"text-green-700 text-lg font-bold text-center",style:{fontWeight:900},children:[s," ",null===h||void 0===h?void 0:h.currency.translation[b].symbol]})]})]})};function ce(e){var t=e.data,s=e.handleShowAddReviews;return Object(x.jsx)(n.a.div,{layout:!0,initial:!1,className:"grid grid-cols-1 gap-2",children:t.map((function(e,t){return Object(x.jsx)(ae,{index:t,order:e,handleShowAddReviews:s},e.id)}))})}var ne=s(455);function re(e){var t=e.product,s=e.handleCloseReviewPage,a=Object(r.a)(),c=a.formatMessage,l=a.locale,d=i.a.useState(""),j=Object(O.a)(d,2),b=j[0],m=j[1],h=i.a.useState(2.5),u=Object(O.a)(h,2),p=u[0],f=u[1],v=i.a.useContext(o.a).addReviewMutation,w=i.a.useState(!1),k=Object(O.a)(w,2),S=k[0],M=k[1],P=i.a.useState(""),D=Object(O.a)(P,2),A=D[0],F=D[1],z=i.a.useState(!1),R=Object(O.a)(z,2),T=R[0],L=R[1],B=function(){var e=Object(g.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return L(!0),e.prev=1,e.next=4,v({id:t.id,review:b,rating:p});case 4:s("success"),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(1),M(!0),F(c({id:"something-went-wrong-snackbar"})),L(!1);case 12:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(){return e.apply(this,arguments)}}();return Object(x.jsxs)(n.a.div,{variants:{hidden:{x:"100%",opacity:0},visible:{x:0,opacity:1,transition:{type:"tween"}},exited:{x:"100%",opacity:0,transition:{type:"tween"}}},initial:"hidden",animate:"visible",exit:"exited",className:"fixed  top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden bg-body-light z-40",style:{height:"calc(100vh - 62px)"},children:[S&&Object(x.jsx)(N.a,{message:A,closeFunction:function(){M(!1)}}),Object(x.jsxs)("div",{className:" sticky top-0 p-3 flex items-center bg-main-color text-main-text z-1",children:[Object(x.jsx)("button",{className:"text-white text-center",onClick:s,children:"en"===l?Object(x.jsx)(C.f,{className:"w-6 h-6 "}):Object(x.jsx)(C.g,{className:"w-6 h-6 "})}),Object(x.jsxs)("h1",{className:"font-semibold text-lg mx-4",children:[c({id:"add-review"})," ",t.translation[l].title]})]}),Object(x.jsxs)("div",{className:"p-2",children:[Object(x.jsxs)("div",{className:"flex items-center",children:[Object(x.jsx)("h1",{className:"font-bold text-2xl",children:c({id:"what-is-your-rating"})}),Object(x.jsx)(ne.a,{emptySymbol:Object(x.jsx)(C.t,{className:"text-main-color w-8 h-8"}),fullSymbol:Object(x.jsx)(C.d,{className:"text-main-color w-8 h-8"}),className:"pt-1 mx-2",initialRating:p,onChange:function(e){return f(e)},fractions:2})]}),Object(x.jsxs)("h1",{className:"font-semibold text-lg my-2",children:[c({id:"add-feedback"})," :"]}),Object(x.jsx)("textarea",{rows:"6",id:"location",className:" mt-1 w-full rounded border  p-1  ",type:"textarea",value:b,onChange:function(e){return m(e.target.value)}}),Object(x.jsx)("div",{className:"flex justify-end",children:Object(x.jsxs)("button",{onClick:B,className:"p-2 uppercase font-semibold rounded ".concat(b?"bg-main-color text-main-text":"bg-gray-600 text-gray-400"," flex items-center justify-center "),style:{width:"80px"},disabled:!b,children:[T&&Object(x.jsx)(_.a,{type:"ThreeDots",color:"#fff",height:25,width:25,visible:!0}),!T&&c({id:"submit"})]})})]})]})}function le(e){var t=e.handleAddReviewClose,s=e.data,a=e.selectedOrder,c=Object(r.a)(),l=c.formatMessage,d=c.locale,o=i.a.useState(!1),j=Object(O.a)(o,2),b=j[0],m=j[1],h=i.a.useState(null),u=Object(O.a)(h,2),p=u[0],f=u[1],v=i.a.useState(!1),y=Object(O.a)(v,2),g=y[0],N=y[1],w=i.a.useState(""),k=Object(O.a)(w,2),S=k[0],_=k[1];return Object(x.jsxs)(n.a.div,{variants:{hidden:{x:"100%",opacity:0},visible:{x:0,opacity:1,transition:{type:"tween"}},exited:{x:"100%",opacity:0,transition:{type:"tween"}}},initial:"hidden",animate:"visible",exit:"exited",className:"fixed  top-0 left-0 right-0 bottom-0 \n      overflow-y-auto overflow-x-hidden\n       bg-body-light z-30",style:{height:"calc(100vh - 62px)"},children:[g&&Object(x.jsx)(A.a,{message:S,closeFunction:function(){N(!1)}}),!b&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)("div",{className:" sticky top-0 p-3 flex items-center bg-main-color text-main-text z-1",children:[Object(x.jsx)("button",{className:"text-white text-center",onClick:t,children:"en"===d?Object(x.jsx)(C.f,{className:"w-6 h-6 "}):Object(x.jsx)(C.g,{className:"w-6 h-6 "})}),Object(x.jsx)("h1",{className:"font-semibold text-lg mx-4",children:l({id:"add-reviews"})})]}),Object(x.jsx)("div",{className:"font-bold text-lg p-2",children:Object(x.jsx)("h1",{children:l({id:"select-product-to-review"})})}),Object(x.jsx)("div",{className:"grid grid-cols-1 gap-2 p-2",children:s[a].items.map((function(e){var t;return Object(x.jsxs)("div",{onClick:function(){return function(e){m(!0),f(e)}(e.product)},className:"p-3 border cursor-pointer flex items-center hover:shadow hover:bg-gray-100  transition duration-150  rounded-lg",children:[Object(x.jsx)("img",{src:"".concat("https://admin.royal-online.co/storage","/small/").concat(null===(t=e.product.image)||void 0===t?void 0:t.link),alt:e.product.translation[d].title,style:{width:"50px",height:"50px"}}),Object(x.jsx)("h1",{className:"mx-4",children:e.product.translation[d].title})]},e.id)}))})]}),Object(x.jsx)(D.a,{children:b&&Object(x.jsx)(re,{product:p,handleCloseReviewPage:function(e){m(!1),"success"===e&&setTimeout((function(){N(!0),_(l({id:"review-added"}))}),300)}})})]})}function de(){var e=Object(J.a)("userOrders",Object(g.a)(y.a.mark((function e(){var t;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(K.F)();case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),{retry:!0}),t=e.data,s=e.isLoading,a=i.a.useState(!1),c=Object(O.a)(a,2),r=c[0],l=c[1],d=i.a.useState(null),o=Object(O.a)(d,2),j=o[0],b=o[1];if(s)return Object(x.jsx)("div",{className:"flex h-full justify-center items-center",children:Object(x.jsx)(_.a,{type:"ThreeDots",color:"#b72b2b",height:40,width:40,visible:!0})});return Object(x.jsxs)(n.a.div,{variants:{hidden:{x:"100%",opacity:0},visible:{x:0,opacity:1},exit:{x:"-100%",opacity:0}},initial:"hidden",animate:"visible",exit:"exit",className:"relative overflow-y-auto",style:{height:"calc(100vh - 62px)"},children:[0===t.length&&Object(x.jsx)(X,{}),!r&&0!==t.length&&Object(x.jsx)(ce,{handleShowAddReviews:function(e){l(!0),b(e)},data:t}),Object(x.jsx)(D.a,{children:r&&Object(x.jsx)(le,{handleAddReviewClose:function(){l(!1)},data:t,selectedOrder:j})})]})}var oe=s(95);function je(){var e=Object(r.a)().formatMessage,t=Object(l.j)().path,s=Object(l.h)();return Object(x.jsxs)(oe.a,{children:[Object(x.jsx)(c.b,{children:Object(x.jsx)("title",{children:"".concat(e({id:"my-account"}))})}),Object(x.jsxs)("div",{className:"relative  overflow-hidden myaccount__grid p-4 pb-3 \n          bg-body-light text-body-text-light max-w-default mx-auto",style:{minHeight:"calc(-62px + 100vh)"},children:[Object(x.jsx)(u,{}),Object(x.jsx)(E.a,{children:Object(x.jsx)(n.a.div,{variants:{hidden:{opacity:0},visible:{opacity:1},exit:{x:"-100%",opacity:0}},initial:"hidden",animate:"visible",exit:"exit",className:"rounded-lg overflow-hidden h-full shadow-itemsSlider-shallow",children:Object(x.jsx)(D.a,{exitBeforeEnter:!0,children:Object(x.jsxs)(l.d,{location:s,children:[Object(x.jsx)(l.b,{path:"".concat(t),exact:!0,component:L}),Object(x.jsx)(l.b,{path:"".concat(t,"/addresses"),component:U}),Object(x.jsx)(l.b,{path:"".concat(t,"/orders"),component:de})]},s.key)})})})]})]})}}}]);
//# sourceMappingURL=23.ece6a608.chunk.js.map