(this.webpackJsonpshadowloop=this.webpackJsonpshadowloop||[]).push([[0],{511:function(e,t){},513:function(e,t){},540:function(e,t,c){"use strict";c.r(t);var n=c(3),a=(c(286),c(295),c(0)),i=c.n(a),r=c(86),s=c.n(r),o=c(107),j=c(23),d=c(557),l=c(558),b=c(559),O=c(556),u=c(560),h=c(67),x=c.n(h),m=x()((function(e){return{offset:e.mixins.toolbar}}));function f(e){var t=e.children,c=m();return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(O.a,{}),Object(n.jsx)(d.a,{children:Object(n.jsx)(l.a,{children:Object(n.jsx)(b.a,{variant:"h6",component:"h1",children:"Shadow loop"})})}),Object(n.jsx)("div",{className:c.offset}),Object(n.jsx)(u.a,{children:t})]})}var p=c(38),v=c(28),g=c(561),k=c(562),S=c(564),y=c(563),N=c(565),w=Object(g.a)({root:{minWidth:275}});function P(e){var t=e.name,c=w();return Object(n.jsxs)(k.a,{className:c.root,variant:"outlined",children:[Object(n.jsxs)(y.a,{children:[Object(n.jsx)(b.a,{variant:"overline",color:"textSecondary",children:"Z\xe1kladn\xed bal\xed\u010dek"}),Object(n.jsx)(b.a,{variant:"h5",component:"h2",children:t})]}),Object(n.jsxs)(S.a,{children:[Object(n.jsx)(N.a,{size:"small",color:"secondary",component:o.b,to:"decks/".concat(t),children:"Spustit od za\u010d\xe1tku"}),Object(n.jsx)(N.a,{size:"small",color:"secondary",disabled:!0,children:"Pokra\u010dovat"})]})]})}var E=c(566),C=Object(g.a)({root:{minWidth:275}});function T(){var e=C();return Object(n.jsxs)(k.a,{className:e.root,variant:"outlined",children:[Object(n.jsxs)(y.a,{children:[Object(n.jsx)(E.a,{children:Object(n.jsx)(b.a,{variant:"overline",color:"textSecondary",children:"Z\xe1kladn\xed bal\xed\u010dek"})}),Object(n.jsx)(E.a,{children:Object(n.jsx)(b.a,{variant:"h5",component:"h2",children:Object(p.a)(Array(Math.floor(11*Math.random())+10)).map((function(){return"a"})).join("")})})]}),Object(n.jsxs)(S.a,{children:[Object(n.jsx)(E.a,{children:Object(n.jsx)(N.a,{size:"small",color:"secondary",children:"Spustit od za\u010d\xe1tku"})}),Object(n.jsx)(E.a,{children:Object(n.jsx)(N.a,{size:"small",color:"secondary",disabled:!0,children:"Pokra\u010dovat"})})]})]})}var F=x()((function(e){return{deckPadding:{paddingTop:e.spacing(2)}}}));var L=function(){var e=F(),t=Object(a.useState)([]),c=Object(v.a)(t,2),i=c[0],r=c[1],s=Object(a.useState)(!0),o=Object(v.a)(s,2),j=o[0],d=o[1];return Object(a.useEffect)((function(){fetch("".concat("/decks","/decks.txt")).then((function(e){return e.text()})).then((function(e){r(e.split("\n").slice(0,-1)),d(!1)}),(function(e){console.log(e)}))}),[]),Object(n.jsx)(n.Fragment,{children:j?Object(n.jsx)(n.Fragment,{children:Object(p.a)(Array(4).keys()).map((function(t){return Object(n.jsx)("div",{className:e.deckPadding,children:Object(n.jsx)(T,{})},t)}))}):i.map((function(t){return Object(n.jsx)("div",{className:e.deckPadding,children:Object(n.jsx)(P,{name:t})},t)}))})};var z=function(){return Object(n.jsx)(n.Fragment,{children:"Error 404 :("})},B=c(272),W=c(571),M=c(274),R=c.n(M),A=Object(g.a)((function(e){return{root:{paddingTop:e.spacing(2)},container:{},card:{width:"fit-content"},media:{maxWidth:"100%"}}}));function D(e){var t=e.slideContent,c=e.deckName,i=e.onSlideFinished,r=e.isSlidePlaying,s=A(),o=Object(v.a)(t,4),j=o[0],d=o[1],l=o[2],O=o[3],u=Object(a.useState)(0),h=Object(v.a)(u,2),x=h[0],m=h[1],f=Object(a.useState)(!0),p=Object(v.a)(f,2),g=p[0],S=p[1],N=Object(a.useState)(!1),w=Object(v.a)(N,2),P=w[0],E=w[1],C=Object(a.useState)(!1),T=Object(v.a)(C,2),F=T[0],L=T[1];return Object(a.useEffect)((function(){m(0)}),[t]),Object(a.useEffect)((function(){x<3&&S(r&&!P)}),[r,P,x]),Object(a.useEffect)((function(){r&&F&&(L(!1),i())}),[r,F,i]),Object(n.jsx)("div",{className:s.root,children:Object(n.jsx)(W.a,{className:s.container,display:"flex",children:Object(n.jsx)(W.a,{m:"auto",children:Object(n.jsxs)(k.a,{className:s.card,children:[Object(n.jsx)("img",{className:s.media,src:"".concat("/decks","/").concat(c,"/").concat(O),alt:j}),Object(n.jsxs)(y.a,{children:[Object(n.jsx)(b.a,{gutterBottom:!0,variant:"h5",component:"h2",children:j}),Object(n.jsx)(b.a,{variant:"body2",color:"textSecondary",component:"p",children:d}),Object(n.jsx)(R.a,{url:"".concat("/decks","/").concat(c,"/").concat(l),playing:g,width:0,height:0,onEnded:function(){m(x+1),x<2?(E(!0),new Promise((function(e){return setTimeout(e,2e3)})).then((function(){return E(!1)}))):new Promise((function(e){return setTimeout(e,2e3)})).then((function(){return L(!0)}))}})]})]})})})})}var I=Object(g.a)((function(e){return{root:{paddingTop:e.spacing(2)},container:{},card:{},media:{maxWidth:"100%"}}}));function J(){var e=I();return Object(n.jsx)("div",{className:e.root,children:Object(n.jsx)(W.a,{className:e.container,display:"flex",children:Object(n.jsx)(W.a,{m:"auto",children:Object(n.jsxs)(k.a,{className:e.card,children:[Object(n.jsx)(E.a,{variant:"rect",children:Object(n.jsx)("div",{style:{paddingTop:"57%",width:"300px"}})}),Object(n.jsxs)(y.a,{children:[Object(n.jsx)(E.a,{children:Object(n.jsx)(b.a,{gutterBottom:!0,variant:"h5",component:"h2",children:"Lorem ipsum dolor sit amet"})}),Object(n.jsx)(E.a,{children:Object(n.jsx)(b.a,{variant:"body2",color:"textSecondary",component:"p",children:"Lorem ipsum dolor"})})]})]})})})})}var Z=c(567),H=c(570),q=c(568),G=c(569),K=x()((function(){return{box:{paddingTop:"20px"},slider:{marginLeft:"15px",marginRight:"15px",marginTop:"10px"}}}));function Q(e){var t=e.isPlaying,c=e.onResumePauseClick,a=e.onSlide,i=e.maxSLide,r=e.onSlideChange,s=K();return Object(n.jsx)(k.a,{children:Object(n.jsx)(y.a,{children:Object(n.jsxs)(W.a,{className:s.box,display:"flex",children:[Object(n.jsx)(Z.a,{onClick:c,children:t?Object(n.jsx)(q.a,{}):Object(n.jsx)(G.a,{})}),Object(n.jsx)(H.a,{className:s.slider,min:0,max:i-1,value:a,onChange:r,valueLabelDisplay:"on",valueLabelFormat:function(e){return e+1}})]})})})}var U=x()((function(e){return{root:{minHeight:"calc(100vh - 64px)",paddingBottom:e.spacing(2)}}}));var V=function(){var e=U(),t=Object(j.g)().deck,c=Object(a.useState)([]),i=Object(v.a)(c,2),r=i[0],s=i[1],o=Object(a.useState)(0),d=Object(v.a)(o,2),l=d[0],b=d[1],O=Object(a.useState)(!0),u=Object(v.a)(O,2),h=u[0],x=u[1],m=Object(a.useState)(!0),f=Object(v.a)(m,2),p=f[0],g=f[1];return Object(a.useEffect)((function(){Object(B.a)("".concat("/decks","/").concat(t,"/").concat(t,".csv"),{download:!0,complete:function(e){s(e.data.slice(0,-1)),x(!1)}})}),[t]),Object(a.useEffect)((function(){h||l+1<r.length&&((new Image).src="".concat("/decks","/").concat(t,"/").concat(r[l+1][3]))}),[r,t,h,l]),Object(n.jsxs)(W.a,{className:e.root,display:"flex",flexDirection:"column",children:[Object(n.jsx)(W.a,{flex:"1",children:h?Object(n.jsx)(J,{}):Object(n.jsx)(D,{slideContent:r[l],deckName:t,onSlideFinished:function(){l+1<r.length?b(l+1):g(!1)},isSlidePlaying:p})}),!h&&Object(n.jsx)(Q,{isPlaying:p,onResumePauseClick:function(){return g(!p)},onSlide:l,maxSLide:r.length,onSlideChange:function(e,t){return b(t)}})]})};var X=function(){return Object(n.jsx)(o.a,{basename:"/shadowloop",children:Object(n.jsx)(f,{children:Object(n.jsxs)(j.d,{children:[Object(n.jsx)(j.b,{exact:!0,path:"/",children:Object(n.jsx)(L,{})}),Object(n.jsx)(j.b,{exact:!0,path:"/decks",children:Object(n.jsx)(j.a,{to:"/"})}),Object(n.jsx)(j.b,{exact:!0,path:"/decks/:deck",children:Object(n.jsx)(V,{})}),Object(n.jsx)(j.b,{children:Object(n.jsx)(z,{})})]})})})};s.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(X,{})}),document.getElementById("root"))}},[[540,1,2]]]);
//# sourceMappingURL=main.a97915d9.chunk.js.map