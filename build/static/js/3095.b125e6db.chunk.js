"use strict";(self.webpackChunk_ijm_relevic=self.webpackChunk_ijm_relevic||[]).push([[3095],{98905:function(e,n,t){var r;t.d(n,{G:function(){return r}}),function(e){e[e.ADMIN=3]="ADMIN",e[e.COORDINADOR=1]="COORDINADOR",e[e.AGENTE=2]="AGENTE"}(r||(r={}))},5769:function(e,n,t){t.d(n,{al:function(){return r},bQ:function(){return i},h8:function(){return a},Wu:function(){return o}});var r="/victim",i=[{label:"Soltera",value:1},{label:"Comprometida",value:2},{label:"Casada",value:3},{label:"Separada",value:4},{label:"Enviudada",value:5},{label:"Vive con Pareja",value:6},{label:"Divorciada",value:7}],a=[{label:"Femenino",value:0},{label:"Masculino",value:1}],o={name:"",otherName:"",age:0,verifiedAge:0,birthday:"",citizenship:"",ethnicity:"",nationality:"",children:0,currentAddress:"",maritalStatus:0,originAddress:"",phoneNumber:"",preferredLanguage:"",id:0,genre:0,email:""}},54737:function(e,n,t){t.d(n,{Z:function(){return p}});var r=t(1413),i=t(45987),a=t(68870),o=t(20890),l=t(50533),c=t(43504),s=t(93517),d=t(80184),u=["links","activeLast"];function h(e){var n=e.links,t=e.activeLast,l=void 0!==t&&t,c=(0,i.Z)(e,u),h=n[n.length-1].name,x=n.map((function(e){return(0,d.jsx)(f,{link:e},e.name)})),p=n.map((function(e){return(0,d.jsx)("div",{children:e.name!==h?(0,d.jsx)(f,{link:e}):(0,d.jsx)(o.Z,{variant:"body2",sx:{maxWidth:260,overflow:"hidden",whiteSpace:"nowrap",color:"text.disabled",textOverflow:"ellipsis"},children:h})},e.name)}));return(0,d.jsx)(s.Z,(0,r.Z)((0,r.Z)({separator:(0,d.jsx)(a.Z,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})},c),{},{children:l?x:p}))}function f(e){var n=e.link,t=n.href,r=n.name,i=n.icon;return(0,d.jsxs)(l.Z,{variant:"body2",component:c.rU,to:t||"#",sx:{lineHeight:2,display:"flex",alignItems:"center",color:"text.primary","& > div":{display:"inherit"}},children:[i&&(0,d.jsx)(a.Z,{sx:{mr:1,"& svg":{width:20,height:20}},children:i}),r]},r)}var x=["links","action","heading","moreLink","sx"];function p(e){var n=e.links,t=e.action,c=e.heading,s=e.moreLink,u=void 0===s?[]:s,f=e.sx,p=(0,i.Z)(e,x);return(0,d.jsxs)(a.Z,{sx:(0,r.Z)({mb:5},f),children:[(0,d.jsxs)(a.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,d.jsxs)(a.Z,{sx:{flexGrow:1},children:[(0,d.jsx)(o.Z,{variant:"h4",gutterBottom:!0,children:c}),(0,d.jsx)(h,(0,r.Z)({links:n},p))]}),t&&(0,d.jsx)(a.Z,{sx:{flexShrink:0},children:t})]}),(0,d.jsx)(a.Z,{sx:{mt:2},children:"string"===typeof u?(0,d.jsx)(l.Z,{href:u,target:"_blank",rel:"noopener",variant:"body2",children:u}):u.map((function(e){return(0,d.jsx)(l.Z,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}},71170:function(e,n,t){t.d(n,{$W:function(){return j},K:function(){return k},V7:function(){return Z},et:function(){return p},Nl:function(){return P}});var r=t(35855),i=t(53994),a=t(1413),o=t(45987),l=t(66934),c=t(68870),s=t(20890),d=t(4010),u=t(80184),h=["title","description","img"],f=(0,l.ZP)(c.Z)((function(e){return{height:"100%",display:"flex",textAlign:"center",alignItems:"center",flexDirection:"column",justifyContent:"center",padding:e.theme.spacing(8,2)}}));function x(e){var n=e.title,t=e.description,r=e.img,i=(0,o.Z)(e,h);return(0,u.jsxs)(f,(0,a.Z)((0,a.Z)({},i),{},{children:[(0,u.jsx)(d.Z,{disabledEffect:!0,visibleByDefault:!0,alt:"empty content",src:r||"/assets/illustrations/illustration_empty_content.svg",sx:{height:240,mb:3}}),(0,u.jsx)(s.Z,{variant:"h5",gutterBottom:!0,children:n}),t&&(0,u.jsx)(s.Z,{variant:"body2",sx:{color:"text.secondary"},children:t})]}))}function p(e){var n=e.isNotFound;return(0,u.jsx)(r.Z,{children:n?(0,u.jsx)(i.Z,{colSpan:12,children:(0,u.jsx)(x,{title:"No se encontraron resultados",sx:{"& span.MuiBox-root":{height:160}}})}):(0,u.jsx)(i.Z,{colSpan:12,sx:{p:0}})})}var g=t(13400),v=t(46865),m=t(82097);function Z(e){var n=e.actions,t=e.open,r=e.onClose,i=e.onOpen;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(g.Z,{onClick:i,children:(0,u.jsx)(v.Z,{icon:"eva:more-vertical-fill",width:20,height:20})}),(0,u.jsx)(m.Z,{open:Boolean(t),anchorEl:t,onClose:r,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},arrow:"right-top",sx:{mt:-1,width:260,"& .MuiMenuItem-root":{px:1,typography:"body2",borderRadius:.75,"& svg":{mr:2,width:20,height:20}}},children:n})]})}function j(e){var n=e.emptyRows,t=e.height;return n?(0,u.jsx)(r.Z,{sx:(0,a.Z)({},t&&{height:t*n}),children:(0,u.jsx)(i.Z,{colSpan:9})}):null}var w=t(56890),b=t(94454),y=t(80720),S={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function k(e){var n=e.order,t=e.orderBy,o=e.rowCount,l=void 0===o?0:o,s=e.headLabel,d=e.numSelected,h=void 0===d?0:d,f=e.onSort,x=e.onSelectAllRows,p=e.sx;return(0,u.jsx)(w.Z,{sx:p,children:(0,u.jsxs)(r.Z,{children:[x&&(0,u.jsx)(i.Z,{padding:"checkbox",children:(0,u.jsx)(b.Z,{indeterminate:h>0&&h<l,checked:l>0&&h===l,onChange:function(e){return x(e.target.checked)}})}),s.map((function(e){return(0,u.jsx)(i.Z,{align:e.align||"left",sortDirection:t===e.id&&n,sx:{width:e.width,minWidth:e.minWidth},children:f?(0,u.jsxs)(y.Z,{hideSortIcon:!0,active:t===e.id,direction:t===e.id?n:"asc",onClick:function(){return f(e.id)},sx:{textTransform:"capitalize"},children:[e.label,t===e.id?(0,u.jsx)(c.Z,{sx:(0,a.Z)({},S),children:"desc"===n?"sorted descending":"sorted ascending"}):null]}):e.label},e.id)}))]})})}var C=t(67414),R=["dense","actions","rowCount","numSelected","onSelectAllRows","sx"];function P(e){var n=e.dense,t=e.actions,r=e.rowCount,i=e.numSelected,l=e.onSelectAllRows,c=e.sx,d=(0,o.Z)(e,R);return(0,u.jsxs)(C.Z,(0,a.Z)((0,a.Z)({direction:"row",alignItems:"center",sx:(0,a.Z)((0,a.Z)({px:2,top:0,left:8,right:8,zIndex:9,height:58,borderRadius:1,position:"absolute",bgcolor:"primary.lighter"},n&&{pl:1,height:38}),c)},d),{},{children:[(0,u.jsx)(b.Z,{indeterminate:i>0&&i<r,checked:r>0&&i===r,onChange:function(e){return l(e.target.checked)}}),(0,u.jsxs)(s.Z,{variant:"subtitle1",sx:(0,a.Z)({ml:2,flexGrow:1,color:"primary.main"},n&&{ml:3}),children:[i," seleccionado"]}),t&&t]}))}},77762:function(e,n,t){t.d(n,{ZP:function(){return a},sQ:function(){return l},fQ:function(){return c}});var r=t(29439),i=t(72791);function a(e){var n=(0,i.useState)((null===e||void 0===e?void 0:e.defaultDense)||!1),t=(0,r.Z)(n,2),a=t[0],o=t[1],l=(0,i.useState)((null===e||void 0===e?void 0:e.defaultOrderBy)||"name"),c=(0,r.Z)(l,2),s=c[0],d=c[1],u=(0,i.useState)((null===e||void 0===e?void 0:e.defaultOrder)||"asc"),h=(0,r.Z)(u,2),f=h[0],x=h[1],p=(0,i.useState)((null===e||void 0===e?void 0:e.defaultCurrentPage)||0),g=(0,r.Z)(p,2),v=g[0],m=g[1],Z=(0,i.useState)((null===e||void 0===e?void 0:e.defaultRowsPerPage)||5),j=(0,r.Z)(Z,2),w=j[0],b=j[1],y=(0,i.useState)((null===e||void 0===e?void 0:e.defaultSelected)||[]),S=(0,r.Z)(y,2),k=S[0],C=S[1];return{dense:a,order:f,page:v,setPage:m,orderBy:s,rowsPerPage:w,selected:k,setSelected:C,onSelectRow:function(e){var n=k.indexOf(e),t=[];-1===n?t=t.concat(k,e):0===n?t=t.concat(k.slice(1)):n===k.length-1?t=t.concat(k.slice(0,-1)):n>0&&(t=t.concat(k.slice(0,n),k.slice(n+1))),C(t)},onSelectAllRows:function(e,n){C(e?n:[])},onSort:function(e){""!==e&&(x(s===e&&"asc"===f?"desc":"asc"),d(e))},onChangePage:function(e,n){m(n)},onChangeDense:function(e){o(e.target.checked)},onChangeRowsPerPage:function(e){b(parseInt(e.target.value,10)),m(0)}}}function o(e,n,t){return n[t]<e[t]?-1:n[t]>e[t]?1:0}function l(e,n){return"desc"===e?function(e,t){return o(e,t,n)}:function(e,t){return-o(e,t,n)}}function c(e,n,t){return e>0?Math.max(0,(1+e)*n-t):0}},3095:function(e,n,t){t.r(n),t.d(n,{default:function(){return _}});var r=t(15861),i=t(64687),a=t.n(i),o=t(10266),l=t(36151),c=t(57621),s=t(39281),d=t(20068),u=t(13400),h=t(79836),f=t(53382),x=t(68870),p=t(28178),g=t(43504),v=t(16871),m=t(5769),Z=t(54737),j=t(46865),w=t(53451),b=t(97145),y=t(71170),S=t(58561),k=t(77762),C=t(7055),R=t(29439),P=t(35855),D=t(53994),A=t(94454),N=t(23786),O=t(97892),z=t.n(O),E=t(72791),I=t(98905),B=t(44371),T=t(80184);function W(e){var n=e.row,t=e.selected,r=e.onEditRow,i=e.onSelectRow,a=e.onDeleteRow,o=n.id,l=n.name,c=n.birthday,s=n.citizenship,d=n.ethnicity,u=n.nationality,h=(0,B.Z)().user,f=(null===h||void 0===h?void 0:h.role.id)===I.G.AGENTE,x=(0,E.useState)(null),p=(0,R.Z)(x,2),g=p[0],v=p[1],m=function(){v(null)};return(0,T.jsxs)(P.Z,{hover:!0,selected:t,children:[(0,T.jsx)(D.Z,{padding:"checkbox",children:(0,T.jsx)(A.Z,{checked:t,onClick:i})}),(0,T.jsx)(D.Z,{align:"left",sx:{textTransform:"capitalize"},children:o}),(0,T.jsx)(D.Z,{align:"left",sx:{textTransform:"capitalize"},children:l}),(0,T.jsx)(D.Z,{align:"left",sx:{textTransform:"capitalize"},children:z()(c).format("DD/MM/YYYY")}),(0,T.jsx)(D.Z,{align:"left",sx:{textTransform:"capitalize"},children:s}),(0,T.jsx)(D.Z,{align:"left",sx:{textTransform:"capitalize"},children:d}),(0,T.jsx)(D.Z,{align:"left",sx:{textTransform:"capitalize"},children:u}),(0,T.jsx)(D.Z,{align:"right",children:(0,T.jsx)(y.V7,{open:g,onOpen:function(e){v(e.currentTarget)},onClose:m,actions:(0,T.jsxs)(T.Fragment,{children:[!f&&(0,T.jsxs)(N.Z,{onClick:function(){a(),m()},sx:{color:"error.main"},children:[(0,T.jsx)(j.Z,{icon:"eva:trash-2-outline"}),"Eliminar"]}),(0,T.jsxs)(N.Z,{onClick:function(){r(),m()},children:[(0,T.jsx)(j.Z,{icon:"eva:edit-fill"}),"Editar"]})]})})})]})}var G=t(25334),M=t(72419),L=[{id:"id",label:"ID",align:"left"},{id:"name",label:"Nombre",align:"left"},{id:"birthday",label:"Fecha de Nacimiento",align:"left"},{id:"citizenship",label:"Ciudadan\xeda",align:"left"},{id:"ethnicity",label:"Etnicidad",align:"left"},{id:"nationality",label:"Nacionalidad",align:"left"},{id:""}];function _(){var e=(0,S.Z)().themeStretch,n=(0,k.ZP)(),t=n.dense,i=n.page,R=n.order,P=n.orderBy,D=n.rowsPerPage,A=n.selected,N=n.setSelected,O=n.onSelectRow,z=n.onSelectAllRows,E=n.onSort,I=n.onChangePage,B=n.onChangeRowsPerPage,_=t?52:72,V=(0,M.ZP)(m.al),F=V.data,Q=void 0===F?[]:F,Y=V.mutate,H=!Q.length,K=(0,v.s0)(),U=function(){var e=(0,r.Z)(a().mark((function e(n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,G.G4)("".concat(m.al,"/").concat(n));case 2:Y(Q.filter((function(e){return e.id!==n}))),N([]);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,T.jsx)(w.Z,{title:"V\xedctimas",children:(0,T.jsxs)(o.Z,{maxWidth:!e&&"lg",children:[(0,T.jsx)(Z.Z,{heading:"Listado de V\xedctimas",links:[{name:"Dashboard",href:C.vB.root},{name:"V\xedctimas"}],action:(0,T.jsx)(l.Z,{variant:"contained",component:g.rU,to:C.vB.general.victims.new,startIcon:(0,T.jsx)(j.Z,{icon:"eva:plus-fill"}),children:"Nueva V\xedctima"})}),(0,T.jsxs)(c.Z,{children:[(0,T.jsx)(b.Z,{children:(0,T.jsxs)(s.Z,{sx:{minWidth:800,position:"relative",pt:1},children:[A.length>0&&(0,T.jsx)(y.Nl,{dense:t,numSelected:A.length,rowCount:Q.length,onSelectAllRows:function(e){return z(e,Q.map((function(e){return e.id})))},actions:(0,T.jsx)(d.Z,{title:"Delete",children:(0,T.jsx)(u.Z,{color:"primary",onClick:function(){N([])},children:(0,T.jsx)(j.Z,{icon:"eva:trash-2-outline"})})})}),(0,T.jsxs)(h.Z,{size:t?"small":"medium",children:[(0,T.jsx)(y.K,{order:R,orderBy:P,headLabel:L,rowCount:Q.length,numSelected:A.length,onSort:E,onSelectAllRows:function(e){return z(e,Q.map((function(e){return e.id})))}}),(0,T.jsxs)(f.Z,{children:[Q.slice(i*D,i*D+D).map((function(e){return(0,T.jsx)(W,{row:e,selected:A.includes(e.id),onSelectRow:function(){return O(e.id)},onDeleteRow:function(){return U(e.id)},onEditRow:function(){return n=e.id,void K(C.vB.general.victims.edit(n));var n}},e.id)})),(0,T.jsx)(y.$W,{height:_,emptyRows:(0,k.fQ)(i,D,Q.length)}),(0,T.jsx)(y.et,{isNotFound:H})]})]})]})}),(0,T.jsx)(x.Z,{sx:{position:"relative"},children:(0,T.jsx)(p.Z,{rowsPerPageOptions:[5,10,25],component:"div",count:Q.length,rowsPerPage:D,page:i,onPageChange:I,onRowsPerPageChange:B})})]})]})})}},25334:function(e,n,t){t.d(n,{CH:function(){return l},km:function(){return c},Wl:function(){return s},G4:function(){return d}});var r=t(15861),i=t(64687),a=t.n(i),o=t(92033),l=function(){var e=(0,r.Z)(a().mark((function e(n){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.get(n);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),c=function(){var e=(0,r.Z)(a().mark((function e(n,t){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.post(n,t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),s=function(){var e=(0,r.Z)(a().mark((function e(n,t){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.put(n,t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),d=function(){var e=(0,r.Z)(a().mark((function e(n){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.delete(n);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}}]);
//# sourceMappingURL=3095.b125e6db.chunk.js.map