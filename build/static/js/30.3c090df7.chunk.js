(this["webpackJsonproyal-pharmacy"]=this["webpackJsonproyal-pharmacy"]||[]).push([[30],{312:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return E}));var n=t(2),l=t(5),i=t(1),o=t.n(i),r=t(145),c=t(103),s=t(64),d=t(150),m=t.n(d),u=t(13),p=t(31),v=t(109),b=t(151),g=t(148),y=t(149),h=t(70),N=t(152),f=t(7),C=t(17);function E(){var e,a,t,i,d,E=Object(s.a)(),x=E.formatMessage,k=E.locale,_=Object(p.i)().slug,O=o.a.useState(1),w=Object(n.a)(O,2),j=w[0],L=w[1],M=o.a.useContext(f.a),P=M.deliveryCountriesLoading,D=M.deliveryCountriesIdle,H=M.settings,S=o.a.useState(!1),I=Object(n.a)(S,2),J=I[0],z=I[1],F=Object(u.c)(["single-brand",{slug:_,page:j,number:42}],C.z,{retry:!0,refetchOnWindowFocus:!1,keepPreviousData:!0}),R=F.data,W=F.isLoading;return W||P||D?o.a.createElement("div",{key:"loader",className:"brand-grid__mobile py-2",style:{minHeight:"calc(100vh - 150px)"}},[0,1,2,3,4,5,6,7,8,9].map((function(e){return o.a.createElement(b.a,{key:e})}))):o.a.createElement(h.a,null,o.a.createElement("div",{className:"min-h-screen p-3"},o.a.createElement(r.a,null,o.a.createElement("title",null,R?"".concat(R.brandName[k].name):null===H||void 0===H?void 0:H.store_name_en),o.a.createElement("meta",{name:"description",content:R?"".concat(x({id:"shop"})," ").concat(null===R||void 0===R||null===(e=R.brandName)||void 0===e?void 0:e[k].name):null===H||void 0===H?void 0:H.store_name_en}),o.a.createElement("meta",{property:"og:title",content:R?"".concat(R.brandName[k].name," }"):null===H||void 0===H?void 0:H.store_name_en}),o.a.createElement("meta",{property:"og:description",content:R?"".concat(x({id:"shop"})," ").concat(null===R||void 0===R||null===(a=R.full_translation)||void 0===a?void 0:a[k].title):null===H||void 0===H?void 0:H.store_name_en})),o.a.createElement(l.a,null,J&&o.a.createElement(N.a,{key:"side-cart",setSideMenuOpen:z}),J&&o.a.createElement(l.c.div,{key:"sidecart-bg",initial:{opacity:0},animate:{opacity:.5},exit:{opacity:0},onClick:function(){return z(!1)},className:"side__addCart-bg"}),!W&&o.a.createElement("div",{key:"header",className:"flex justify-center flex-col items-center"},o.a.createElement("h1",{className:"font-bold text-xl mb-3"},x({id:"shop-brands"})," ",null===R||void 0===R||null===(t=R.brandName)||void 0===t?void 0:t[k].name," ",x({id:"at-mrg"})),o.a.createElement("img",{src:"".concat("https://admin.royal-online.co/storage","/original/").concat(null===R||void 0===R?void 0:R.brandLogo),alt:null===R||void 0===R||null===(i=R.brandName)||void 0===i?void 0:i[k].name,style:{maxHeight:"150px",width:"auto"}})),o.a.createElement("div",{key:"items",className:"brand-grid__mobile py-2 min-h-full",style:{minHeight:"calc(100vh - 150px)"}},null===R||void 0===R||null===(d=R.products)||void 0===d?void 0:d.map((function(e){return"variation"===e.type&&Object.entries(e.new_variation_addons).length>0?o.a.createElement(y.a,{key:e.id,setCartMenuOpen:z,item:e}):o.a.createElement(g.a,{key:e.id,setCartMenuOpen:z,item:e})})))),o.a.createElement(m.a,{previousLabel:o.a.createElement(c.a,{className:"w-6 h-6 inline"}),nextLabel:o.a.createElement(c.b,{className:"w-6 h-6 inline"}),breakLabel:"...",breakClassName:"inline",pageCount:null===R||void 0===R?void 0:R.pageCount,marginPagesDisplayed:2,pageRangeDisplayed:2,initialPage:j-1,disableInitialCallback:!0,onPageChange:function(e){Object(v.b)(window,{top:100}),L(e.selected+1)},containerClassName:"my-2 w-full text-center",subContainerClassName:"p-3 inline",pageLinkClassName:"p-3",activeClassName:"bg-main-color font-bold text-main-text",pageClassName:" inline-block mx-2 rounded-full text-lg",previousClassName:"p-3 inline font-bold",nextClassName:"p-3 inline font-bold",disabledClassName:"text-gray-500"})))}}}]);
//# sourceMappingURL=30.3c090df7.chunk.js.map