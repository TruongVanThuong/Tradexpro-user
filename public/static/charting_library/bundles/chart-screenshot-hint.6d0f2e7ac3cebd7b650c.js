(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[92],{4270:t=>{t.exports={"close-button":"close-button-1X92xTLv","close-icon":"close-icon-1X92xTLv","button-l":"button-l-1X92xTLv","button-m":"button-m-1X92xTLv","button-s":"button-s-1X92xTLv","button-xs":"button-xs-1X92xTLv","button-xxs":"button-xxs-1X92xTLv"}},47822:t=>{t.exports={container:"container-2EQh-XLR","container-danger":"container-danger-2EQh-XLR",icon:"icon-2EQh-XLR",header:"header-2EQh-XLR","container-warning":"container-warning-2EQh-XLR","container-success":"container-success-2EQh-XLR","container-default":"container-default-2EQh-XLR","text-wrap":"text-wrap-2EQh-XLR","close-button":"close-button-2EQh-XLR"}},68174:t=>{t.exports={container:"container-2PMGBrHh",bottomPadding:"bottomPadding-2PMGBrHh",centerElement:"centerElement-2PMGBrHh",notice:"notice-2PMGBrHh","notice-showed":"notice-showed-2PMGBrHh"}},49775:(t,e,n)=>{"use strict";n.d(e,{Icon:()=>s});var o=n(67294);const s=o.forwardRef((t,e)=>{const{icon:n="",...s}=t;return o.createElement("span",{...s,ref:e,dangerouslySetInnerHTML:{__html:n}})})},38868:(t,e,n)=>{"use strict";n.r(e),n.d(e,{ChartScreenshotHintRenderer:()=>k});var o=n(67294),s=n(73935),r=n(99479),a=n(94184),i=n(49775),c=n(65157),h=n(42314),l=n(66391),d=n(15836),w=n(66339),u=n(4270),m=n.n(u);function g(t="l"){switch(t){case"l":return c;case"m":return h;case"s":return l;case"xs":return d;case"xxs":return w;default:return h}}const v=o.forwardRef((t,e)=>{const{className:n,size:s,...r}=t,c=a(m()["close-button"],m()["button-"+s],n);return o.createElement("button",{...r,type:"button",className:c,ref:e},o.createElement(i.Icon,{icon:g(s),className:m()["close-icon"]}))});var x=n(72344),p=n(11344),b=n(61787),E=n(47822),f=n.n(E);const L={danger:x,warning:x,success:b,default:p};function _(t){const{informerIntent:e,content:n,className:s,header:r,isIconShown:c=!0,isCloseButtonShown:h,icon:l,onCloseClick:d,closeButtonLabel:w="Close"}=t;return o.createElement("div",{className:a(f().container,f()["container-"+e],s)},c&&o.createElement(i.Icon,{className:f().icon,icon:null!=l?l:L[e]}),o.createElement("div",{className:f()["text-wrap"]},o.createElement("span",{className:f().header},r)," ",n),h&&o.createElement(v,{"aria-label":w,onClick:d,className:f()["close-button"],size:"xs"}))}var C=n(68174);function M(t){const[e,n]=(0,o.useState)(!1);return(0,o.useLayoutEffect)(()=>{const t=setTimeout(()=>n(!0),50),e=setTimeout(()=>n(!1),2500);return()=>{clearTimeout(t),clearTimeout(e)}},[]),o.createElement("div",{className:a(C.container,t.bottomPadding&&C.bottomPadding)},o.createElement("div",{className:C.centerElement},o.createElement(_,{content:t.text,informerIntent:"success",className:a(C.notice,e&&C["notice-showed"])})))}class k{constructor(t,e){this._showed=!1,this._wrap=document.createElement("div"),this._container=t,this._debouncedHide=(0,r.default)(()=>this.hide(),3e3),this._bottomPadding=e.bottomPadding}show(t){this._wrap&&!this._showed&&(this._showed=!0,this._container.append(this._wrap),s.render(o.createElement(M,{text:t,
bottomPadding:this._bottomPadding}),this._wrap),this._debouncedHide())}hide(){this._wrap&&(this._showed=!1,s.unmountComponentAtNode(this._wrap),this._wrap.remove())}destroy(){this.hide(),delete this._wrap}}},61787:t=>{t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" fillRule="evenodd" d="M9 0a9 9 0 1 0 0 18A9 9 0 0 0 9 0zm4.15 5.87a.75.75 0 0 0-1.3-.74l-3.51 6.15-2.31-2.31a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.18-.16l4-7z"/></svg>'},72344:t=>{t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M9 0a9 9 0 1 0 0 18A9 9 0 0 0 9 0zM7.75 5.48a1.27 1.27 0 1 1 2.5 0l-.67 4.03a.59.59 0 0 1-1.16 0l-.67-4.03zM8 13a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/></svg>'},11344:t=>{t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M9 0a9 9 0 1 0 0 18A9 9 0 0 0 9 0zm1 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 8a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1z"/></svg>'},65157:t=>{t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="23" height="23"><path stroke="currentColor" strokeWidth="1.2" d="M1 1l21 21m0-21L1 22"/></svg>'},42314:t=>{t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" width="17" height="17"><path stroke="currentColor" strokeWidth="1.2" d="M1 1l15 15m0-15L1 16"/></svg>'},66391:t=>{t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="13" height="13"><path stroke="currentColor" strokeWidth="1.2" d="M1 1l11 11m0-11L1 12"/></svg>'},15836:t=>{t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11" width="11" height="11"><path stroke="currentColor" strokeWidth="1.2" d="M1 1l9 9m0-9l-9 9"/></svg>'},66339:t=>{t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 9" width="9" height="9"><path stroke="currentColor" strokeWidth="1.2" d="M1 1l7 7m0-7L1 8"/></svg>'}}]);