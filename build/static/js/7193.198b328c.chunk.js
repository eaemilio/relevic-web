"use strict";(self.webpackChunk_ijm_relevic=self.webpackChunk_ijm_relevic||[]).push([[7193],{50103:function(e,n,t){t.d(n,{Z:function(){return f}});var i=t(1413),r=t(45987),o=t(9506),s=t(61113),l=t(90891),a=t(29466),c=t(3404),d=t(46417),h=["links","activeLast"];function x(e){var n=e.links,t=e.activeLast,l=void 0!==t&&t,a=(0,r.Z)(e,h),x=n[n.length-1].name,p=n.map((function(e){return(0,d.jsx)(u,{link:e},e.name)})),f=n.map((function(e){return(0,d.jsx)("div",{children:e.name!==x?(0,d.jsx)(u,{link:e}):(0,d.jsx)(s.Z,{variant:"body2",sx:{maxWidth:260,overflow:"hidden",whiteSpace:"nowrap",color:"text.disabled",textOverflow:"ellipsis"},children:x})},e.name)}));return(0,d.jsx)(c.Z,(0,i.Z)((0,i.Z)({separator:(0,d.jsx)(o.Z,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})},a),{},{children:l?p:f}))}function u(e){var n=e.link,t=n.href,i=n.name,r=n.icon;return(0,d.jsxs)(l.Z,{variant:"body2",component:a.rU,to:t||"#",sx:{lineHeight:2,display:"flex",alignItems:"center",color:"text.primary","& > div":{display:"inherit"}},children:[r&&(0,d.jsx)(o.Z,{sx:{mr:1,"& svg":{width:20,height:20}},children:r}),i]},i)}var p=["links","action","heading","moreLink","sx"];function f(e){var n=e.links,t=e.action,a=e.heading,c=e.moreLink,h=void 0===c?[]:c,u=e.sx,f=(0,r.Z)(e,p);return(0,d.jsxs)(o.Z,{sx:(0,i.Z)({mb:5},u),children:[(0,d.jsxs)(o.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,d.jsxs)(o.Z,{sx:{flexGrow:1},children:[(0,d.jsx)(s.Z,{variant:"h4",gutterBottom:!0,children:a}),(0,d.jsx)(x,(0,i.Z)({links:n},f))]}),t&&(0,d.jsx)(o.Z,{sx:{flexShrink:0},children:t})]}),(0,d.jsx)(o.Z,{sx:{mt:2},children:"string"===typeof h?(0,d.jsx)(l.Z,{href:h,target:"_blank",rel:"noopener",variant:"body2",children:h}):h.map((function(e){return(0,d.jsx)(l.Z,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}},36693:function(e,n,t){var i=t(4942),r=t(1413),o=t(17592),s=t(24631),l=(0,o.ZP)(s.Z,{shouldForwardProp:function(e){return"stretchStart"!==e}})((function(e){var n=e.stretchStart,t=e.theme;return{"& .MuiOutlinedInput-root":(0,r.Z)({transition:t.transitions.create(["box-shadow","width"],{easing:t.transitions.easing.easeInOut,duration:t.transitions.duration.shorter}),"&.Mui-focused":{boxShadow:t.customShadows.z12}},n&&{width:n,"&.Mui-focused":(0,i.Z)({boxShadow:t.customShadows.z12},t.breakpoints.up("sm"),{width:n+60})}),"& fieldset":{borderWidth:"1px !important",borderColor:"".concat(t.palette.grey[50032]," !important")}}}));n.Z=l},17240:function(e,n,t){t.d(n,{Z:function(){return p}});var i=t(1413),r=t(45987),o=t(17551),s=t(35898),l=t(90891),a=t(61689),c=t(47131),d=t(69099),h=t(24185),x=t(46417),u=["initialColor","simple","links","sx"];function p(e){var n=e.initialColor,t=void 0!==n&&n,p=e.simple,f=void 0===p||p,m=e.links,Z=void 0===m?{}:m,j=e.sx,g=(0,r.Z)(e,u),v=[{name:"FaceBook",icon:"eva:facebook-fill",socialColor:"#1877F2",path:Z.facebook||"#facebook-link"},{name:"Instagram",icon:"ant-design:instagram-filled",socialColor:"#E02D69",path:Z.instagram||"#instagram-link"},{name:"Linkedin",icon:"eva:linkedin-fill",socialColor:"#007EBB",path:Z.linkedin||"#linkedin-link"},{name:"Twitter",icon:"eva:twitter-fill",socialColor:"#00AAEC",path:Z.twitter||"#twitter-link"}];return(0,x.jsx)(s.Z,{direction:"row",flexWrap:"wrap",alignItems:"center",children:v.map((function(e){var n=e.name,r=e.icon,s=e.path,u=e.socialColor;return f?(0,x.jsx)(l.Z,{href:s,children:(0,x.jsx)(a.Z,{title:n,placement:"top",children:(0,x.jsx)(c.Z,(0,i.Z)((0,i.Z)({color:"inherit",sx:(0,i.Z)((0,i.Z)({},t&&{color:u,"&:hover":{bgcolor:(0,o.Fq)(u,.08)}}),j)},g),{},{children:(0,x.jsx)(h.Z,{icon:r,sx:{width:20,height:20}})}))})},n):(0,x.jsx)(d.Z,(0,i.Z)((0,i.Z)({href:s,color:"inherit",variant:"outlined",size:"small",startIcon:(0,x.jsx)(h.Z,{icon:r}),sx:(0,i.Z)((0,i.Z)({m:.5,flexShrink:0},t&&{color:u,borderColor:u,"&:hover":{borderColor:u,bgcolor:(0,o.Fq)(u,.08)}}),j)},g),{},{children:n}),n)}))})}},78908:function(e,n,t){t.d(n,{Z:function(){return o}});var i=t(29439),r=t(47313);function o(e){var n=(0,r.useState)(e||""),t=(0,i.Z)(n,2),o=t[0],s=t[1];return{currentTab:o,onChangeTab:function(e,n){s(n)},setCurrentTab:s}}},87193:function(e,n,t){t.r(n),t.d(n,{default:function(){return Pe}});var i=t(29439),r=t(4942),o=t(33972),s=t(47313),l=t(17592),a=t(57227),c=t(73428),d=t(5297),h=t(65280),x=t(9506),u=t(76025),p=t(1229),f=t(78908),m=t(50177),Z=t(18035),j=t(22227),g=t(24185),v=t(50103),b=t(9019),y=t(35898),w=t(54641),k=t(61113),C=t(90891),I=t(46417),S=(0,l.ZP)(g.Z)((function(e){return{width:20,height:20,marginTop:1,flexShrink:0,marginRight:e.theme.spacing(2)}}));function P(e){var n=e.profile,t=n.quote,i=n.country,r=n.email,o=n.role,s=n.company,l=n.school;return(0,I.jsxs)(c.Z,{children:[(0,I.jsx)(w.Z,{title:"About"}),(0,I.jsxs)(y.Z,{spacing:2,sx:{p:3},children:[(0,I.jsx)(k.Z,{variant:"body2",children:t}),(0,I.jsxs)(y.Z,{direction:"row",children:[(0,I.jsx)(S,{icon:"eva:pin-fill"}),(0,I.jsxs)(k.Z,{variant:"body2",children:["Live at \xa0",(0,I.jsx)(C.Z,{component:"span",variant:"subtitle2",color:"text.primary",children:i})]})]}),(0,I.jsxs)(y.Z,{direction:"row",children:[(0,I.jsx)(S,{icon:"eva:email-fill"}),(0,I.jsx)(k.Z,{variant:"body2",children:r})]}),(0,I.jsxs)(y.Z,{direction:"row",children:[(0,I.jsx)(S,{icon:"ic:round-business-center"}),(0,I.jsxs)(k.Z,{variant:"body2",children:[o," at \xa0",(0,I.jsx)(C.Z,{component:"span",variant:"subtitle2",color:"text.primary",children:s})]})]}),(0,I.jsxs)(y.Z,{direction:"row",children:[(0,I.jsx)(S,{icon:"ic:round-business-center"}),(0,I.jsxs)(k.Z,{variant:"body2",children:["Studied at \xa0",(0,I.jsx)(C.Z,{component:"span",variant:"subtitle2",color:"text.primary",children:l})]})]})]})]})}var F=t(47131),_=t(83929),L=t(44758),z=t(76017),B=t(63585),M=t(82295),R=t(24631),W=t(41727),E=t(28776),T=t(48148),A=t(25937),O=t(58998),D=t(1413),U=t(45987),q=t(26638),G=t(92612),N=t(19860),V=t(17551),K=t(70499),H=t(31685),Q=["value","setValue","disabled","sx"];function Y(e){var n=e.value,t=e.setValue,r=e.disabled,o=e.sx,l=(0,U.Z)(e,Q),a=(0,N.Z)(),c=(0,s.useRef)(null),d=(0,s.useState)(!1),h=(0,i.Z)(d,2),u=h[0],p=h[1];(0,s.useEffect)((function(){new G.cW((0,D.Z)({ref:c,data:q,onEmojiSelect:function(e){return t(n+(null===e||void 0===e?void 0:e.native))}},l))}),[u]);var f=function(e){return(0,V.oo)(e).replace("rgb(","").replace(")","")};return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(K.Z,{styles:{"#root":{"--color-border":a.palette.divider,"--rgb-accent":f(a.palette.primary.main),"--rgb-background":f(a.palette.background.paper),"--rgb-color":f(a.palette.text.secondary),"--rgb-input":"transparent"}}}),(0,I.jsx)(H.Z,{onClickAway:function(){return p(!1)},children:(0,I.jsxs)(x.Z,{sx:{position:"relative"},children:[(0,I.jsx)(F.Z,{disabled:r,size:"small",onClick:function(){return p(!u)},children:(0,I.jsx)(g.Z,{icon:"eva:smiling-face-fill",width:20,height:20})}),u&&(0,I.jsx)(M.Z,{ref:c,sx:(0,D.Z)({bottom:36,position:"absolute",boxShadow:function(e){return e.customShadows.dropdown}},o)})]})})]})}function J(e){var n=e.post,t=(0,p.Z)().user,r=(0,s.useRef)(null),o=(0,s.useRef)(null),l=(0,s.useState)(n.isLiked),a=(0,i.Z)(l,2),d=a[0],h=a[1],u=(0,s.useState)(n.personLikes.length),f=(0,i.Z)(u,2),m=f[0],Z=f[1],j=(0,s.useState)(""),v=(0,i.Z)(j,2),b=v[0],S=v[1],P=n.comments.length>0;return(0,I.jsxs)(c.Z,{children:[(0,I.jsx)(w.Z,{disableTypography:!0,avatar:(0,I.jsx)(O.Z,{}),title:(0,I.jsx)(C.Z,{variant:"subtitle2",color:"text.primary",children:null===t||void 0===t?void 0:t.displayName}),subheader:(0,I.jsx)(k.Z,{variant:"caption",sx:{display:"block",color:"text.secondary"},children:(0,E.Mu)(n.createdAt)}),action:(0,I.jsx)(F.Z,{children:(0,I.jsx)(g.Z,{icon:"eva:more-vertical-fill",width:20,height:20})})}),(0,I.jsxs)(y.Z,{spacing:3,sx:{p:3},children:[(0,I.jsx)(k.Z,{children:n.message}),(0,I.jsx)(A.Z,{alt:"post media",src:n.media,ratio:"16/9",sx:{borderRadius:1}}),(0,I.jsxs)(y.Z,{direction:"row",alignItems:"center",children:[(0,I.jsx)(_.Z,{control:(0,I.jsx)(L.Z,{size:"small",color:"error",checked:d,icon:(0,I.jsx)(g.Z,{icon:"eva:heart-fill"}),checkedIcon:(0,I.jsx)(g.Z,{icon:"eva:heart-fill"}),onChange:d?function(){h(!1),Z((function(e){return e-1}))}:function(){h(!0),Z((function(e){return e+1}))}}),label:(0,T.v1)(m),sx:{minWidth:72,mr:0}}),(0,I.jsx)(z.Z,{max:4,sx:{"& .MuiAvatar-root":{width:32,height:32}},children:n.personLikes.map((function(e){return(0,I.jsx)(B.Z,{alt:e.name,src:e.avatarUrl},e.name)}))}),(0,I.jsx)(x.Z,{sx:{flexGrow:1}}),(0,I.jsx)(F.Z,{onClick:function(){var e;null===(e=r.current)||void 0===e||e.focus()},children:(0,I.jsx)(g.Z,{icon:"eva:message-square-fill",width:20,height:20})}),(0,I.jsx)(F.Z,{children:(0,I.jsx)(g.Z,{icon:"eva:share-fill",width:20,height:20})})]}),P&&(0,I.jsx)(y.Z,{spacing:1.5,children:n.comments.map((function(e){return(0,I.jsxs)(y.Z,{direction:"row",spacing:2,children:[(0,I.jsx)(B.Z,{alt:e.author.name,src:e.author.avatarUrl}),(0,I.jsxs)(M.Z,{sx:{p:1.5,flexGrow:1,bgcolor:"background.neutral"},children:[(0,I.jsxs)(y.Z,{direction:{xs:"column",sm:"row"},alignItems:{sm:"center"},justifyContent:"space-between",sx:{mb:.5},children:[(0,I.jsx)(k.Z,{variant:"subtitle2",children:e.author.name}),(0,I.jsx)(k.Z,{variant:"caption",sx:{color:"text.disabled"},children:(0,E.Mu)(e.createdAt)})]}),(0,I.jsx)(k.Z,{variant:"body2",sx:{color:"text.secondary"},children:e.message})]})]},e.id)}))}),(0,I.jsxs)(y.Z,{direction:"row",alignItems:"center",children:[(0,I.jsx)(O.Z,{}),(0,I.jsx)(R.Z,{fullWidth:!0,size:"small",value:b,inputRef:r,placeholder:"Write a comment\u2026",onChange:function(e){return n=e.target.value,void S(n);var n},InputProps:{endAdornment:(0,I.jsxs)(W.Z,{position:"end",children:[(0,I.jsx)(F.Z,{size:"small",onClick:function(){var e;null===(e=o.current)||void 0===e||e.click()},children:(0,I.jsx)(g.Z,{icon:"ic:round-add-photo-alternate",width:24,height:24})}),(0,I.jsx)(Y,{value:b,setValue:S,sx:{right:{xs:-80,sm:0}}})]})},sx:{ml:2,mr:1,"& fieldset":{borderWidth:"1px !important",borderColor:function(e){return"".concat(e.palette.grey[50032]," !important")}}}}),(0,I.jsx)(F.Z,{children:(0,I.jsx)(g.Z,{icon:"ic:round-send",width:24,height:24})}),(0,I.jsx)("input",{type:"file",ref:o,style:{display:"none"}})]})]})]})}var X=t(69099);function $(){var e=(0,s.useRef)(null),n=function(){var n;null===(n=e.current)||void 0===n||n.click()};return(0,I.jsxs)(c.Z,{sx:{p:3},children:[(0,I.jsx)(R.Z,{multiline:!0,fullWidth:!0,rows:4,placeholder:"Share what you are thinking here...",sx:{"& fieldset":{borderWidth:"1px !important",borderColor:function(e){return"".concat(e.palette.grey[50032]," !important")}}}}),(0,I.jsxs)(x.Z,{sx:{mt:3,display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,I.jsxs)(x.Z,{sx:{display:"flex"},children:[(0,I.jsx)(F.Z,{size:"small",onClick:n,sx:{mr:1},children:(0,I.jsx)(g.Z,{icon:"ic:round-add-photo-alternate",width:24,height:24})}),(0,I.jsx)(F.Z,{size:"small",onClick:n,children:(0,I.jsx)(g.Z,{icon:"eva:attach-2-fill",width:24,height:24})})]}),(0,I.jsx)(X.Z,{variant:"contained",children:"Post"})]}),(0,I.jsx)("input",{ref:e,type:"file",style:{display:"none"}})]})}var ee=t(19536);function ne(e){var n=e.profile,t=n.follower,i=n.following;return(0,I.jsx)(c.Z,{sx:{py:3},children:(0,I.jsxs)(y.Z,{direction:"row",divider:(0,I.jsx)(ee.Z,{orientation:"vertical",flexItem:!0}),children:[(0,I.jsxs)(y.Z,{width:1,textAlign:"center",children:[(0,I.jsx)(k.Z,{variant:"h4",children:(0,T.FK)(t)}),(0,I.jsx)(k.Z,{variant:"body2",sx:{color:"text.secondary"},children:"Follower"})]}),(0,I.jsxs)(y.Z,{width:1,textAlign:"center",children:[(0,I.jsx)(k.Z,{variant:"h4",children:(0,T.FK)(i)}),(0,I.jsx)(k.Z,{variant:"body2",sx:{color:"text.secondary"},children:"Following"})]})]})})}var te=(0,l.ZP)(g.Z)((function(e){return{width:20,height:20,marginTop:1,flexShrink:0,marginRight:e.theme.spacing(2)}}));function ie(e){var n=e.profile,t=n.facebookLink,i=n.instagramLink,r=n.linkedinLink,o=n.twitterLink,s=[{name:"Linkedin",icon:(0,I.jsx)(te,{icon:"eva:linkedin-fill",color:"#006097"}),href:r},{name:"Twitter",icon:(0,I.jsx)(te,{icon:"eva:twitter-fill",color:"#1C9CEA"}),href:o},{name:"Instagram",icon:(0,I.jsx)(te,{icon:"ant-design:instagram-filled",color:"#D7336D"}),href:i},{name:"Facebook",icon:(0,I.jsx)(te,{icon:"eva:facebook-fill",color:"#1877F2"}),href:t}];return(0,I.jsxs)(c.Z,{children:[(0,I.jsx)(w.Z,{title:"Social"}),(0,I.jsx)(y.Z,{spacing:2,sx:{p:3},children:s.map((function(e){return(0,I.jsxs)(y.Z,{direction:"row",alignItems:"center",children:[e.icon,(0,I.jsx)(C.Z,{component:"span",variant:"body2",color:"text.primary",noWrap:!0,children:e.href})]},e.name)}))})]})}function re(e){var n=e.myProfile,t=e.posts;return(0,I.jsxs)(b.ZP,{container:!0,spacing:3,children:[(0,I.jsx)(b.ZP,{item:!0,xs:12,md:4,children:(0,I.jsxs)(y.Z,{spacing:3,children:[(0,I.jsx)(ne,{profile:n}),(0,I.jsx)(P,{profile:n}),(0,I.jsx)(ie,{profile:n})]})}),(0,I.jsx)(b.ZP,{item:!0,xs:12,md:8,children:(0,I.jsxs)(y.Z,{spacing:3,children:[(0,I.jsx)($,{}),t.map((function(e){return(0,I.jsx)(J,{post:e},e.id)}))]})})]})}var oe=t(18551),se=(0,l.ZP)("div")((function(e){var n=e.theme;return{"&:before":(0,D.Z)((0,D.Z)({},(0,oe.Z)().bgBlur({blur:2,color:n.palette.primary.darker})),{},{top:0,zIndex:9,content:"''",width:"100%",height:"100%",position:"absolute"})}})),le=(0,l.ZP)("div")((function(e){var n=e.theme;return(0,r.Z)({left:0,right:0,zIndex:99,position:"absolute",marginTop:n.spacing(5)},n.breakpoints.up("md"),{right:"auto",display:"flex",alignItems:"center",left:n.spacing(3),bottom:n.spacing(3)})}));function ae(e){var n=e.myProfile,t=(0,p.Z)().user,i=n.position,r=n.cover;return(0,I.jsxs)(se,{children:[(0,I.jsxs)(le,{children:[(0,I.jsx)(O.Z,{sx:{mx:"auto",borderWidth:2,borderStyle:"solid",borderColor:"common.white",width:{xs:80,md:128},height:{xs:80,md:128}}}),(0,I.jsxs)(x.Z,{sx:{ml:{md:3},mt:{xs:1,md:0},color:"common.white",textAlign:{xs:"center",md:"left"}},children:[(0,I.jsx)(k.Z,{variant:"h4",children:null===t||void 0===t?void 0:t.displayName}),(0,I.jsx)(k.Z,{sx:{opacity:.72},children:i})]})]}),(0,I.jsx)(A.Z,{alt:"profile cover",src:r,sx:{position:"absolute",top:0,left:0,right:0,bottom:0}})]})}var ce=t(51405),de=t(36693),he=t(45358),xe=t(17240),ue=t(52404);function pe(e){var n=e.friends,t=e.findFriends,i=e.onFindFriends,r=function(e,n){if(n)return e.filter((function(e){return-1!==e.name.toLowerCase().indexOf(n.toLowerCase())}));return e}(n,t),o=0===r.length;return(0,I.jsxs)(x.Z,{sx:{mt:5},children:[(0,I.jsx)(k.Z,{variant:"h4",sx:{mb:3},children:"Friends"}),(0,I.jsx)(de.Z,{stretchStart:240,value:t,onChange:function(e){return i(e.target.value)},placeholder:"Find friends...",InputProps:{startAdornment:(0,I.jsx)(W.Z,{position:"start",children:(0,I.jsx)(g.Z,{icon:"eva:search-fill",sx:{color:"text.disabled",width:20,height:20}})})},sx:{mb:5}}),(0,I.jsx)(b.ZP,{container:!0,spacing:3,children:r.map((function(e){return(0,I.jsx)(b.ZP,{item:!0,xs:12,md:4,children:(0,I.jsx)(fe,{friend:e})},e.id)}))}),o&&(0,I.jsx)(x.Z,{sx:{mt:5},children:(0,I.jsx)(ue.Z,{searchQuery:t})})]})}function fe(e){var n=e.friend,t=n.name,r=n.role,o=n.avatarUrl,l=(0,s.useState)(null),a=(0,i.Z)(l,2),d=a[0],h=a[1],x=function(){h(null)};return(0,I.jsxs)(c.Z,{sx:{py:5,display:"flex",position:"relative",alignItems:"center",flexDirection:"column"},children:[(0,I.jsx)(B.Z,{alt:t,src:o,sx:{width:64,height:64,mb:3}}),(0,I.jsx)(C.Z,{variant:"subtitle1",color:"text.primary",children:t}),(0,I.jsx)(k.Z,{variant:"body2",sx:{color:"text.secondary",mb:1},children:r}),(0,I.jsx)(xe.Z,{initialColor:!0}),(0,I.jsx)(me,{open:d,onOpen:function(e){h(e.currentTarget)},onClose:x,actions:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(ce.Z,{onClick:function(){x(),console.log("DELETE",t)},sx:{color:"error.main"},children:[(0,I.jsx)(g.Z,{icon:"eva:trash-2-outline"}),"Delete"]}),(0,I.jsxs)(ce.Z,{onClick:function(){x(),console.log("EDIT",t)},children:[(0,I.jsx)(g.Z,{icon:"eva:edit-fill"}),"Edit"]})]})})]})}function me(e){var n=e.actions,t=e.open,i=e.onOpen,r=e.onClose;return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(F.Z,{size:"large",color:"inherit",onClick:i,sx:{top:8,right:8,position:"absolute"},children:(0,I.jsx)(g.Z,{icon:"eva:more-vertical-fill",width:20,height:20})}),(0,I.jsx)(he.Z,{open:Boolean(t),anchorEl:t,onClose:r,sx:{ml:.5,width:"auto","& .MuiMenuItem-root":{px:1,typography:"body2",borderRadius:.75,"& svg":{mr:2,width:20,height:20}}},children:n})]})}var Ze=t(93405),je=t(68278),ge=["images","photoIndex","setPhotoIndex","isOpen"];function ve(){var e=(0,N.Z)(),n="rtl"===e.direction,t=e.palette.grey[600].replace("#",""),i=function(e){return"url(https://api.iconify.design/carbon/".concat(e,".svg?color=%23").concat(t,"&width=").concat(32,"&height=").concat(32,")")},r=function(n){return{opacity:1,alignItems:"center",display:"inline-flex",justifyContent:"center",backgroundImage:"unset",backgroundColor:"transparent",transition:e.transitions.create("opacity"),"&:before":{display:"block",width:32,height:32,content:i(n)},"&:hover":{opacity:.72}}};return(0,I.jsx)(K.Z,{styles:{"& .ReactModalPortal":{"& .ril__outer":{backgroundColor:(0,V.Fq)(e.palette.grey[900],.96)},"& .ril__toolbar":{height:"auto !important",padding:e.spacing(2,3),backgroundColor:"transparent"},"& .ril__toolbarLeftSide":{display:"none"},"& .ril__toolbarRightSide":{height:"auto !important",padding:0,flexGrow:1,display:"flex",alignItems:"center","& li":{display:"flex",alignItems:"center"},"& li:first-of-type":{flexGrow:1},"& li:not(:first-of-type)":{width:40,height:40,justifyContent:"center",marginLeft:e.spacing(2)}},"& button:focus":{outline:"none"},"& .ril__toolbarRightSide button":{width:"100%",height:"100%","&.ril__zoomInButton":r("zoom-in"),"&.ril__zoomOutButton":r("zoom-out"),"&.ril__closeButton":r("close")},"& .ril__navButtons":{padding:e.spacing(3),"&.ril__navButtonPrev":(0,D.Z)({right:"auto",left:e.spacing(2)},r(n?"arrow-right":"arrow-left")),"&.ril__navButtonNext":(0,D.Z)({left:"auto",right:e.spacing(2)},r(n?"arrow-left":"arrow-right"))}}}})}function be(e){var n=e.images,t=e.photoIndex,i=e.setPhotoIndex,r=e.isOpen,o=(0,U.Z)(e,ge);(0,s.useEffect)((function(){document.body.style.overflow=r?"hidden":""}),[r]);var l=[(0,I.jsx)(k.Z,{variant:"subtitle2",children:"".concat(t+1," / ").concat(n.length)})];return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(ve,{}),r&&(0,I.jsx)(je.Z,(0,D.Z)({animationDuration:160,nextSrc:n[(t+1)%n.length],prevSrc:n[(t+n.length-1)%n.length],onMovePrevRequest:function(){return i((t+n.length-1)%n.length)},onMoveNextRequest:function(){return i((t+1)%n.length)},toolbarButtons:l,reactModalStyle:{overlay:{zIndex:9999}}},o))]})}var ye=(0,l.ZP)(Ze.Z)((function(e){var n=e.theme;return(0,D.Z)((0,D.Z)({},(0,oe.Z)().bgBlur({blur:2,color:n.palette.grey[900]})),{},{bottom:0,width:"100%",display:"flex",alignItems:"center",position:"absolute",justifyContent:"space-between",color:n.palette.common.white})}));function we(e){var n=e.gallery,t=(0,s.useState)(!1),r=(0,i.Z)(t,2),o=r[0],l=r[1],a=(0,s.useState)(0),d=(0,i.Z)(a,2),h=d[0],u=d[1],p=n.map((function(e){return e.imageUrl})),f=function(e){var n=p.findIndex((function(n){return n===e}));l(!0),u(n)};return(0,I.jsxs)(x.Z,{sx:{mt:5},children:[(0,I.jsx)(k.Z,{variant:"h4",sx:{mb:3},children:"Gallery"}),(0,I.jsxs)(c.Z,{sx:{p:3},children:[(0,I.jsx)(x.Z,{sx:{display:"grid",gap:3,gridTemplateColumns:{xs:"repeat(1, 1fr)",sm:"repeat(2, 1fr)",md:"repeat(3, 1fr)"}},children:n.map((function(e){return(0,I.jsx)(ke,{image:e,onOpenLightbox:f},e.id)}))}),(0,I.jsx)(be,{images:p,mainSrc:p[h],photoIndex:h,setPhotoIndex:u,isOpen:o,onCloseRequest:function(){return l(!1)}})]})]})}function ke(e){var n=e.image,t=e.onOpenLightbox,i=n.imageUrl,r=n.title,o=n.postAt;return(0,I.jsxs)(c.Z,{sx:{cursor:"pointer",position:"relative"},children:[(0,I.jsx)(A.Z,{alt:"gallery image",ratio:"1/1",src:i,onClick:function(){return t(i)}}),(0,I.jsxs)(ye,{children:[(0,I.jsxs)("div",{children:[(0,I.jsx)(k.Z,{variant:"subtitle1",children:r}),(0,I.jsx)(k.Z,{variant:"body2",sx:{opacity:.72},children:(0,E.Mu)(o)})]}),(0,I.jsx)(F.Z,{color:"inherit",children:(0,I.jsx)(g.Z,{icon:"eva:more-vertical-fill",width:20,height:20})})]})]})}function Ce(e){var n=e.followers;return(0,I.jsxs)(x.Z,{sx:{mt:5},children:[(0,I.jsx)(k.Z,{variant:"h4",sx:{mb:3},children:"Followers"}),(0,I.jsx)(b.ZP,{container:!0,spacing:3,children:n.map((function(e){return(0,I.jsx)(b.ZP,{item:!0,xs:12,md:4,children:(0,I.jsx)(Ie,{follower:e})},e.id)}))})]})}function Ie(e){var n=e.follower,t=n.name,r=n.country,o=n.avatarUrl,l=n.isFollowed,a=(0,s.useState)(l),d=(0,i.Z)(a,2),h=d[0],u=d[1];return(0,I.jsxs)(c.Z,{sx:{display:"flex",alignItems:"center",p:3},children:[(0,I.jsx)(B.Z,{alt:t,src:o,sx:{width:48,height:48}}),(0,I.jsxs)(x.Z,{sx:{flexGrow:1,minWidth:0,pl:2,pr:1},children:[(0,I.jsx)(k.Z,{variant:"subtitle2",noWrap:!0,children:t}),(0,I.jsxs)(x.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,I.jsx)(g.Z,{icon:"eva:pin-fill",sx:{width:16,height:16,mr:.5,flexShrink:0}}),(0,I.jsx)(k.Z,{variant:"body2",sx:{color:"text.secondary"},noWrap:!0,children:r})]})]}),(0,I.jsx)(X.Z,{size:"small",onClick:function(){return u(!h)},variant:h?"text":"outlined",color:h?"primary":"inherit",startIcon:h&&(0,I.jsx)(g.Z,{icon:"eva:checkmark-fill"}),sx:{flexShrink:0},children:h?"Followed":"Follow"})]})}var Se=(0,l.ZP)("div")((function(e){var n,t=e.theme;return n={zIndex:9,bottom:0,width:"100%",display:"flex",position:"absolute",backgroundColor:t.palette.background.paper},(0,r.Z)(n,t.breakpoints.up("sm"),{justifyContent:"center"}),(0,r.Z)(n,t.breakpoints.up("md"),{justifyContent:"flex-end",paddingRight:t.spacing(3)}),n}));function Pe(){var e=(0,m.Z)().themeStretch,n=(0,p.Z)().user,t=(0,f.Z)("profile"),r=t.currentTab,l=t.onChangeTab,b=(0,s.useState)(""),y=(0,i.Z)(b,2),w=y[0],k=y[1],C=[{value:"profile",icon:(0,I.jsx)(g.Z,{icon:"ic:round-account-box",width:20,height:20}),component:(0,I.jsx)(re,{myProfile:Z.oE,posts:Z.c8})},{value:"followers",icon:(0,I.jsx)(g.Z,{icon:"eva:heart-fill",width:20,height:20}),component:(0,I.jsx)(Ce,{followers:Z.gY})},{value:"friends",icon:(0,I.jsx)(g.Z,{icon:"eva:people-fill",width:20,height:20}),component:(0,I.jsx)(pe,{friends:Z.fw,findFriends:w,onFindFriends:function(e){k(e)}})},{value:"gallery",icon:(0,I.jsx)(g.Z,{icon:"ic:round-perm-media",width:20,height:20}),component:(0,I.jsx)(we,{gallery:Z.BU})}];return(0,I.jsx)(j.Z,{title:"User: Profile",children:(0,I.jsxs)(a.Z,{maxWidth:!e&&"lg",children:[(0,I.jsx)(v.Z,{heading:"Profile",links:[{name:"Dashboard",href:u.vB.root},{name:"User",href:u.vB.user.root},{name:(null===n||void 0===n?void 0:n.displayName)||""}]}),(0,I.jsxs)(c.Z,{sx:{mb:3,height:280,position:"relative"},children:[(0,I.jsx)(ae,{myProfile:Z.oE}),(0,I.jsx)(Se,{children:(0,I.jsx)(d.Z,{allowScrollButtonsMobile:!0,variant:"scrollable",scrollButtons:"auto",value:r,onChange:l,children:C.map((function(e){return(0,I.jsx)(h.Z,{disableRipple:!0,value:e.value,icon:e.icon,label:(0,o.I)(e.value)},e.value)}))})})]}),C.map((function(e){return e.value===r&&(0,I.jsx)(x.Z,{children:e.component},e.value)}))]})})}},28776:function(e,n,t){t.d(n,{Mu:function(){return r}});var i=t(89600);function r(e){return(0,i.Z)(new Date(e),"dd MMMM yyyy")}}}]);