"use strict";(self.webpackChunk_ijm_relevic=self.webpackChunk_ijm_relevic||[]).push([[7680],{50103:function(e,n,t){t.d(n,{Z:function(){return p}});var r=t(1413),i=t(45987),o=t(9506),a=t(61113),c=t(90891),s=t(29466),l=t(3404),d=t(46417),u=["links","activeLast"];function h(e){var n=e.links,t=e.activeLast,c=void 0!==t&&t,s=(0,i.Z)(e,u),h=n[n.length-1].name,f=n.map((function(e){return(0,d.jsx)(x,{link:e},e.name)})),p=n.map((function(e){return(0,d.jsx)("div",{children:e.name!==h?(0,d.jsx)(x,{link:e}):(0,d.jsx)(a.Z,{variant:"body2",sx:{maxWidth:260,overflow:"hidden",whiteSpace:"nowrap",color:"text.disabled",textOverflow:"ellipsis"},children:h})},e.name)}));return(0,d.jsx)(l.Z,(0,r.Z)((0,r.Z)({separator:(0,d.jsx)(o.Z,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})},s),{},{children:c?f:p}))}function x(e){var n=e.link,t=n.href,r=n.name,i=n.icon;return(0,d.jsxs)(c.Z,{variant:"body2",component:s.rU,to:t||"#",sx:{lineHeight:2,display:"flex",alignItems:"center",color:"text.primary","& > div":{display:"inherit"}},children:[i&&(0,d.jsx)(o.Z,{sx:{mr:1,"& svg":{width:20,height:20}},children:i}),r]},r)}var f=["links","action","heading","moreLink","sx"];function p(e){var n=e.links,t=e.action,s=e.heading,l=e.moreLink,u=void 0===l?[]:l,x=e.sx,p=(0,i.Z)(e,f);return(0,d.jsxs)(o.Z,{sx:(0,r.Z)({mb:5},x),children:[(0,d.jsxs)(o.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,d.jsxs)(o.Z,{sx:{flexGrow:1},children:[(0,d.jsx)(a.Z,{variant:"h4",gutterBottom:!0,children:s}),(0,d.jsx)(h,(0,r.Z)({links:n},p))]}),t&&(0,d.jsx)(o.Z,{sx:{flexShrink:0},children:t})]}),(0,d.jsx)(o.Z,{sx:{mt:2},children:"string"===typeof u?(0,d.jsx)(c.Z,{href:u,target:"_blank",rel:"noopener",variant:"body2",children:u}):u.map((function(e){return(0,d.jsx)(c.Z,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}},66973:function(e,n,t){t.d(n,{$W:function(){return j},K:function(){return y},V7:function(){return m},et:function(){return p},Nl:function(){return R}});var r=t(24076),i=t(67478),o=t(1413),a=t(45987),c=t(17592),s=t(9506),l=t(61113),d=t(25937),u=t(46417),h=["title","description","img"],x=(0,c.ZP)(s.Z)((function(e){return{height:"100%",display:"flex",textAlign:"center",alignItems:"center",flexDirection:"column",justifyContent:"center",padding:e.theme.spacing(8,2)}}));function f(e){var n=e.title,t=e.description,r=e.img,i=(0,a.Z)(e,h);return(0,u.jsxs)(x,(0,o.Z)((0,o.Z)({},i),{},{children:[(0,u.jsx)(d.Z,{disabledEffect:!0,visibleByDefault:!0,alt:"empty content",src:r||"/assets/illustrations/illustration_empty_content.svg",sx:{height:240,mb:3}}),(0,u.jsx)(l.Z,{variant:"h5",gutterBottom:!0,children:n}),t&&(0,u.jsx)(l.Z,{variant:"body2",sx:{color:"text.secondary"},children:t})]}))}function p(e){var n=e.isNotFound;return(0,u.jsx)(r.Z,{children:n?(0,u.jsx)(i.Z,{colSpan:12,children:(0,u.jsx)(f,{title:"No se encontraron resultados",sx:{"& span.MuiBox-root":{height:160}}})}):(0,u.jsx)(i.Z,{colSpan:12,sx:{p:0}})})}var v=t(47131),g=t(24185),Z=t(45358);function m(e){var n=e.actions,t=e.open,r=e.onClose,i=e.onOpen;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(v.Z,{onClick:i,children:(0,u.jsx)(g.Z,{icon:"eva:more-vertical-fill",width:20,height:20})}),(0,u.jsx)(Z.Z,{open:Boolean(t),anchorEl:t,onClose:r,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},arrow:"right-top",sx:{mt:-1,width:260,"& .MuiMenuItem-root":{px:1,typography:"body2",borderRadius:.75,"& svg":{mr:2,width:20,height:20}}},children:n})]})}function j(e){var n=e.emptyRows,t=e.height;return n?(0,u.jsx)(r.Z,{sx:(0,o.Z)({},t&&{height:t*n}),children:(0,u.jsx)(i.Z,{colSpan:9})}):null}var w=t(23477),b=t(44758),k=t(82558),S={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function y(e){var n=e.order,t=e.orderBy,a=e.rowCount,c=void 0===a?0:a,l=e.headLabel,d=e.numSelected,h=void 0===d?0:d,x=e.onSort,f=e.onSelectAllRows,p=e.sx;return(0,u.jsx)(w.Z,{sx:p,children:(0,u.jsxs)(r.Z,{children:[f&&(0,u.jsx)(i.Z,{padding:"checkbox",children:(0,u.jsx)(b.Z,{indeterminate:h>0&&h<c,checked:c>0&&h===c,onChange:function(e){return f(e.target.checked)}})}),l.map((function(e){return(0,u.jsx)(i.Z,{align:e.align||"left",sortDirection:t===e.id&&n,sx:{width:e.width,minWidth:e.minWidth},children:x?(0,u.jsxs)(k.Z,{hideSortIcon:!0,active:t===e.id,direction:t===e.id?n:"asc",onClick:function(){return x(e.id)},sx:{textTransform:"capitalize"},children:[e.label,t===e.id?(0,u.jsx)(s.Z,{sx:(0,o.Z)({},S),children:"desc"===n?"sorted descending":"sorted ascending"}):null]}):e.label},e.id)}))]})})}var P=t(35898),C=["dense","actions","rowCount","numSelected","onSelectAllRows","sx"];function R(e){var n=e.dense,t=e.actions,r=e.rowCount,i=e.numSelected,c=e.onSelectAllRows,s=e.sx,d=(0,a.Z)(e,C);return(0,u.jsxs)(P.Z,(0,o.Z)((0,o.Z)({direction:"row",alignItems:"center",sx:(0,o.Z)((0,o.Z)({px:2,top:0,left:8,right:8,zIndex:9,height:58,borderRadius:1,position:"absolute",bgcolor:"primary.lighter"},n&&{pl:1,height:38}),s)},d),{},{children:[(0,u.jsx)(b.Z,{indeterminate:i>0&&i<r,checked:r>0&&i===r,onChange:function(e){return c(e.target.checked)}}),(0,u.jsxs)(l.Z,{variant:"subtitle1",sx:(0,o.Z)({ml:2,flexGrow:1,color:"primary.main"},n&&{ml:3}),children:[i," seleccionado"]}),t&&t]}))}},60386:function(e,n,t){t.d(n,{ZP:function(){return o},sQ:function(){return c},fQ:function(){return s}});var r=t(29439),i=t(47313);function o(e){var n=(0,i.useState)((null===e||void 0===e?void 0:e.defaultDense)||!1),t=(0,r.Z)(n,2),o=t[0],a=t[1],c=(0,i.useState)((null===e||void 0===e?void 0:e.defaultOrderBy)||"name"),s=(0,r.Z)(c,2),l=s[0],d=s[1],u=(0,i.useState)((null===e||void 0===e?void 0:e.defaultOrder)||"asc"),h=(0,r.Z)(u,2),x=h[0],f=h[1],p=(0,i.useState)((null===e||void 0===e?void 0:e.defaultCurrentPage)||0),v=(0,r.Z)(p,2),g=v[0],Z=v[1],m=(0,i.useState)((null===e||void 0===e?void 0:e.defaultRowsPerPage)||5),j=(0,r.Z)(m,2),w=j[0],b=j[1],k=(0,i.useState)((null===e||void 0===e?void 0:e.defaultSelected)||[]),S=(0,r.Z)(k,2),y=S[0],P=S[1];return{dense:o,order:x,page:g,setPage:Z,orderBy:l,rowsPerPage:w,selected:y,setSelected:P,onSelectRow:function(e){var n=y.indexOf(e),t=[];-1===n?t=t.concat(y,e):0===n?t=t.concat(y.slice(1)):n===y.length-1?t=t.concat(y.slice(0,-1)):n>0&&(t=t.concat(y.slice(0,n),y.slice(n+1))),P(t)},onSelectAllRows:function(e,n){P(e?n:[])},onSort:function(e){""!==e&&(f(l===e&&"asc"===x?"desc":"asc"),d(e))},onChangePage:function(e,n){Z(n)},onChangeDense:function(e){a(e.target.checked)},onChangeRowsPerPage:function(e){b(parseInt(e.target.value,10)),Z(0)}}}function a(e,n,t){return n[t]<e[t]?-1:n[t]>e[t]?1:0}function c(e,n){return"desc"===e?function(e,t){return a(e,t,n)}:function(e,t){return-a(e,t,n)}}function s(e,n,t){return e>0?Math.max(0,(1+e)*n-t):0}},27680:function(e,n,t){t.r(n),t.d(n,{default:function(){return T}});var r=t(15861),i=t(64687),o=t.n(i),a=t(57227),c=t(69099),s=t(73428),l=t(51629),d=t(61689),u=t(47131),h=t(66835),x=t(57861),f=t(9506),p=t(23546),v=t(29466),g=t(97890),Z=t(95041),m=t(50103),j=t(24185),w=t(22227),b=t(95463),k=t(66973),S=t(82846),y=t(50177),P=t(60386),C=t(76025),R=t(29439),B=t(24076),D=t(67478),I=t(44758),O=t(51405),W=t(47313),z=t(46417);function A(e){var n=e.row,t=e.selected,r=e.onEditRow,i=e.onSelectRow,o=e.onDeleteRow,a=n.name,c=n.id,s=n.description,l=(0,W.useState)(null),d=(0,R.Z)(l,2),u=d[0],h=d[1],x=function(){h(null)};return(0,z.jsxs)(B.Z,{hover:!0,selected:t,children:[(0,z.jsx)(D.Z,{padding:"checkbox",children:(0,z.jsx)(I.Z,{checked:t,onClick:i})}),(0,z.jsx)(D.Z,{align:"left",sx:{textTransform:"capitalize"},children:c}),(0,z.jsx)(D.Z,{align:"left",sx:{textTransform:"capitalize"},children:a}),(0,z.jsx)(D.Z,{align:"left",sx:{textTransform:"capitalize"},children:s}),(0,z.jsx)(D.Z,{align:"right",children:(0,z.jsx)(k.V7,{open:u,onOpen:function(e){h(e.currentTarget)},onClose:x,actions:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(O.Z,{onClick:function(){o(),x()},sx:{color:"error.main"},children:[(0,z.jsx)(j.Z,{icon:"eva:trash-2-outline"}),"Eliminar"]}),(0,z.jsxs)(O.Z,{onClick:function(){r(),x()},children:[(0,z.jsx)(j.Z,{icon:"eva:edit-fill"}),"Editar"]})]})})})]})}var E=t(21190),_=t(92122),L=[{id:"id",label:"ID",align:"left"},{id:"name",label:"Provincia",align:"left"},{id:"description",label:"Descripci\xf3n",align:"left"},{id:""}],N="/province";function T(){var e=(0,y.Z)().themeStretch,n=(0,P.ZP)(),t=n.dense,i=n.page,R=n.order,B=n.orderBy,D=n.rowsPerPage,I=n.selected,O=n.setSelected,W=n.onSelectRow,T=n.onSelectAllRows,F=n.onSort,G=n.onChangePage,M=n.onChangeRowsPerPage,Q=t?52:72,V=(0,_.ZP)(N),H=V.data,K=void 0===H?[]:H,U=V.mutate,$=!K.length,q=(0,g.s0)();return(0,z.jsx)(S.Z,{hasContent:!0,moduleId:Z.P.PROVINCE,onlyRootProvider:!0,children:(0,z.jsx)(w.Z,{title:"Provincias",children:(0,z.jsxs)(a.Z,{maxWidth:!e&&"lg",children:[(0,z.jsx)(m.Z,{heading:"Listado",links:[{name:"Dashboard",href:C.vB.root},{name:"Provincias"}],action:(0,z.jsx)(c.Z,{variant:"contained",component:v.rU,to:C.vB.province.new,startIcon:(0,z.jsx)(j.Z,{icon:"eva:plus-fill"}),children:"Nueva Provincia"})}),(0,z.jsxs)(s.Z,{children:[(0,z.jsx)(b.Z,{children:(0,z.jsxs)(l.Z,{sx:{minWidth:800,position:"relative",pt:1},children:[I.length>0&&(0,z.jsx)(k.Nl,{dense:t,numSelected:I.length,rowCount:K.length,onSelectAllRows:function(e){return T(e,K.map((function(e){return e.id})))},actions:(0,z.jsx)(d.Z,{title:"Delete",children:(0,z.jsx)(u.Z,{color:"primary",onClick:function(){O([])},children:(0,z.jsx)(j.Z,{icon:"eva:trash-2-outline"})})})}),(0,z.jsxs)(h.Z,{size:t?"small":"medium",children:[(0,z.jsx)(k.K,{order:R,orderBy:B,headLabel:L,rowCount:K.length,numSelected:I.length,onSort:F,onSelectAllRows:function(e){return T(e,K.map((function(e){return e.id})))}}),(0,z.jsxs)(x.Z,{children:[K.slice(i*D,i*D+D).map((function(e){return(0,z.jsx)(A,{row:e,selected:I.includes(e.id),onSelectRow:function(){return W(e.id)},onDeleteRow:function(){return n=e.id,U((0,r.Z)(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,E.G4)("".concat(N,"/").concat(n)));case 1:case"end":return e.stop()}}),e)}))),{optimisticData:K.filter((function(e){return e.id!==n})),rollbackOnError:!0}),void O([]);var n},onEditRow:function(){return n=e.id,void q(C.vB.province.edit(n));var n}},e.id)})),(0,z.jsx)(k.$W,{height:Q,emptyRows:(0,P.fQ)(i,D,K.length)}),(0,z.jsx)(k.et,{isNotFound:$})]})]})]})}),(0,z.jsx)(f.Z,{sx:{position:"relative"},children:(0,z.jsx)(p.Z,{rowsPerPageOptions:[5,10,25],component:"div",count:K.length,rowsPerPage:D,page:i,onPageChange:G,onRowsPerPageChange:M})})]})]})})})}},21190:function(e,n,t){t.d(n,{CH:function(){return c},km:function(){return s},Wl:function(){return l},G4:function(){return d}});var r=t(15861),i=t(64687),o=t.n(i),a=t(59864),c=function(){var e=(0,r.Z)(o().mark((function e(n){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.Z.get(n);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),s=function(){var e=(0,r.Z)(o().mark((function e(n,t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.Z.post(n,t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),l=function(){var e=(0,r.Z)(o().mark((function e(n,t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.Z.put(n,t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),d=function(){var e=(0,r.Z)(o().mark((function e(n){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.Z.delete(n);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}}]);