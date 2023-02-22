"use strict";(self.webpackChunk_ijm_relevic=self.webpackChunk_ijm_relevic||[]).push([[5014],{60619:function(e,t,n){n.d(t,{Z:function(){return d}});var a=n(1413),r=n(66934),i=n(12065),o=n(13967),c=n(68870),s=n(80184),l=(0,r.ZP)("span")((function(e){var t=e.theme,n=e.ownerState,r="light"===t.palette.mode,o=n.color,c=n.variant;return(0,a.Z)({height:22,minWidth:22,lineHeight:0,borderRadius:6,cursor:"default",alignItems:"center",whiteSpace:"nowrap",display:"inline-flex",justifyContent:"center",padding:t.spacing(0,1),color:t.palette.grey[800],fontSize:t.typography.pxToRem(12),fontFamily:t.typography.fontFamily,backgroundColor:t.palette.grey[300],fontWeight:t.typography.fontWeightBold},"default"!==o?(0,a.Z)((0,a.Z)((0,a.Z)({},"filled"===c&&(0,a.Z)({},function(e){return{color:t.palette[e].contrastText,backgroundColor:t.palette[e].main}}(o))),"outlined"===c&&(0,a.Z)({},function(e){return{color:t.palette[e].main,backgroundColor:"transparent",border:"1px solid ".concat(t.palette[e].main)}}(o))),"ghost"===c&&(0,a.Z)({},function(e){return{color:t.palette[e][r?"dark":"light"],backgroundColor:(0,i.Fq)(t.palette[e].main,.16)}}(o))):(0,a.Z)((0,a.Z)({},"outlined"===c&&{backgroundColor:"transparent",color:t.palette.text.primary,border:"1px solid ".concat(t.palette.grey[50032])}),"ghost"===c&&{color:r?t.palette.text.secondary:t.palette.common.white,backgroundColor:t.palette.grey[50016]}))}));function d(e){var t=e.children,n=e.color,r=void 0===n?"default":n,i=e.variant,d=void 0===i?"ghost":i,h=e.startIcon,u=e.endIcon,p=e.sx,m=(0,o.Z)(),x={width:16,height:16,"& svg, img":{width:1,height:1,objectFit:"cover"}};return(0,s.jsxs)(l,{ownerState:{color:r,variant:d},sx:(0,a.Z)((0,a.Z)((0,a.Z)({},h&&{pl:.75}),u&&{pr:.75}),p),theme:m,children:[h&&(0,s.jsx)(c.Z,{sx:(0,a.Z)({mr:.75},x),children:h}),t,u&&(0,s.jsx)(c.Z,{sx:(0,a.Z)({ml:.75},x),children:u})]})}},75014:function(e,t,n){n.r(t),n.d(t,{default:function(){return H}});var a=n(66934),r=n(10266),i=n(68870),o=n(20890),c=n(61889),s=n(37306),l=n(53451),d=n(1413),h=n(29439),u=n(72791),p=n(10703),m=n(88970),x=n(67414),Z=n(85523),v=n(1503),g=n(56125),b=n(48550),f=n(36151),j=n(4010),y=n(46865),w=n(63466),k=n(13400),C=n(15473),S=n(80184);function P(e){var t=e.onCancel,n=(0,u.useState)(null),a=(0,h.Z)(n,2),r=a[0],i=a[1];return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(p.Z,{sx:{p:2.5,mb:2.5,bgcolor:"background.neutral"},children:(0,S.jsxs)(x.Z,{spacing:2,children:[(0,S.jsx)(o.Z,{variant:"subtitle1",children:"Add new card"}),(0,S.jsx)(b.Z,{fullWidth:!0,size:"small",label:"Name on card"}),(0,S.jsx)(b.Z,{fullWidth:!0,size:"small",label:"Card number"}),(0,S.jsxs)(x.Z,{direction:{xs:"column",sm:"row"},spacing:2,children:[(0,S.jsx)(b.Z,{size:"small",label:"MM/YY"}),(0,S.jsx)(b.Z,{size:"small",label:"CVV",InputProps:{endAdornment:(0,S.jsx)(w.Z,{position:"end",children:(0,S.jsx)(k.Z,{size:"small",edge:"end",onClick:function(e){return i(e.currentTarget)},children:(0,S.jsx)(y.Z,{icon:"eva:info-fill"})})})}})]}),(0,S.jsxs)(x.Z,{direction:"row",spacing:2,children:[(0,S.jsx)(f.Z,{fullWidth:!0,onClick:t,children:"Cancel"}),(0,S.jsx)(f.Z,{fullWidth:!0,variant:"contained",onClick:t,children:"Create"})]})]})}),(0,S.jsx)(C.ZP,{open:Boolean(r),anchorEl:r,onClose:function(){return i(null)},anchorOrigin:{vertical:"center",horizontal:"center"},transformOrigin:{vertical:"center",horizontal:"center"},PaperProps:{sx:{p:1,maxWidth:200}},children:(0,S.jsx)(o.Z,{variant:"body2",align:"center",children:"Three-digit number on the back of your VISA card"})})]})}var z=[{value:"paypal",title:"Pay with Paypal",icons:["https://minimal-assets-api-dev.vercel.app/assets/icons/ic_paypal.svg"]},{value:"credit_card",title:"Credit / Debit Card",icons:["https://minimal-assets-api-dev.vercel.app/assets/icons/ic_mastercard.svg","https://minimal-assets-api-dev.vercel.app/assets/icons/ic_visa.svg"]}],R=[{value:"visa1",label:"**** **** **** 1212 - Jimmy Holland"},{value:"visa2",label:"**** **** **** 2424 - Shawn Stokes"},{value:"mastercard",label:"**** **** **** 4545 - Cole Armstrong"}],I=(0,a.ZP)(p.Z)((function(e){var t=e.theme;return{position:"relative",display:"flex",alignItems:"center",justifyContent:"space-between",paddingLeft:t.spacing(2.5),paddingRight:t.spacing(2),transition:t.transitions.create("all"),border:"solid 1px ".concat(t.palette.divider),borderRadius:1.5*Number(t.shape.borderRadius)}}));function M(){var e=(0,u.useState)(!1),t=(0,h.Z)(e,2),n=t[0],a=t[1],r=(0,u.useState)("paypal"),i=(0,h.Z)(r,2),c=i[0],s=i[1],l=function(){"paypal"!==c&&a(!n)},p=function(){a(!1)};return(0,S.jsxs)("div",{children:[(0,S.jsx)(o.Z,{variant:"subtitle1",sx:{mb:5},children:"Payment Method"}),(0,S.jsx)(m.Z,{value:c,onChange:function(e){"paypal"===c&&a(!1),s(e.target.value)},children:(0,S.jsx)(x.Z,{spacing:3,children:z.map((function(e){var t=e.value,a=e.title,r=e.icons,i="credit_card"===t,s=c===t;return(0,S.jsxs)(I,{sx:(0,d.Z)((0,d.Z)({},s&&{boxShadow:function(e){return e.customShadows.z20}}),i&&{flexWrap:"wrap"}),children:[(0,S.jsx)(Z.Z,{value:t,control:(0,S.jsx)(v.Z,{checkedIcon:(0,S.jsx)(y.Z,{icon:"eva:checkmark-circle-2-fill"})}),label:(0,S.jsx)(o.Z,{variant:"subtitle2",sx:{ml:1},children:a}),sx:{py:3,mx:0}}),(0,S.jsx)(x.Z,{spacing:1,direction:"row",alignItems:"center",sx:{position:"absolute",right:20,top:32},children:r.map((function(e){return(0,S.jsx)(j.Z,{alt:"logo card",src:e},e)}))}),i&&(0,S.jsxs)(g.Z,{in:"credit_card"===c,sx:{width:1},children:[(0,S.jsx)(b.Z,{select:!0,fullWidth:!0,label:"Card",SelectProps:{native:!0},children:R.map((function(e){return(0,S.jsx)("option",{value:e.value,children:e.label},e.value)}))}),(0,S.jsx)(f.Z,{size:"small",startIcon:(0,S.jsx)(y.Z,{icon:"eva:plus-fill",width:20,height:20}),onClick:l,sx:{my:3},children:"Add new card"}),(0,S.jsx)(g.Z,{in:n,children:(0,S.jsx)(P,{onCancel:p})})]})]},a)}))})})]})}var W=n(89891),B=n(94721),T=n(39709),_=n(60619),A=(0,a.ZP)("div")((function(e){var t=e.theme;return{padding:t.spacing(5),backgroundColor:t.palette.background.neutral,borderRadius:2*Number(t.shape.borderRadius)}}));function N(){return(0,S.jsxs)(A,{children:[(0,S.jsx)(o.Z,{variant:"subtitle1",sx:{mb:5},children:"Summary"}),(0,S.jsxs)(x.Z,{spacing:2.5,children:[(0,S.jsxs)(x.Z,{direction:"row",justifyContent:"space-between",children:[(0,S.jsx)(o.Z,{variant:"subtitle2",component:"p",sx:{color:"text.secondary"},children:"Subscription"}),(0,S.jsx)(_.Z,{color:"error",variant:"filled",children:"PREMIUM"})]}),(0,S.jsxs)(x.Z,{direction:"row",justifyContent:"space-between",children:[(0,S.jsx)(o.Z,{component:"p",variant:"subtitle2",sx:{color:"text.secondary"},children:"Billed Monthly"}),(0,S.jsx)(W.Z,{defaultChecked:!0})]}),(0,S.jsxs)(x.Z,{direction:"row",justifyContent:"flex-end",children:[(0,S.jsx)(o.Z,{sx:{color:"text.secondary"},children:"$"}),(0,S.jsx)(o.Z,{variant:"h2",sx:{mx:1},children:"9.99"}),(0,S.jsx)(o.Z,{component:"span",variant:"body2",sx:{mb:1,alignSelf:"flex-end",color:"text.secondary"},children:"/mo"})]}),(0,S.jsx)(B.Z,{sx:{borderStyle:"dashed"}}),(0,S.jsxs)(x.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,S.jsx)(o.Z,{variant:"h6",component:"p",children:"Total Billed"}),(0,S.jsx)(o.Z,{variant:"h6",component:"p",children:"$9.99*"})]}),(0,S.jsx)(B.Z,{sx:{borderStyle:"dashed",mb:1}})]}),(0,S.jsx)(o.Z,{variant:"caption",sx:{color:"text.secondary",mt:1},children:"* Plus applicable taxes"}),(0,S.jsx)(T.Z,{fullWidth:!0,size:"large",type:"submit",variant:"contained",sx:{mt:5,mb:3},children:"Upgrade My Plan"}),(0,S.jsxs)(x.Z,{alignItems:"center",spacing:1,children:[(0,S.jsxs)(x.Z,{direction:"row",alignItems:"center",spacing:1.5,children:[(0,S.jsx)(y.Z,{icon:"eva:shield-fill",sx:{width:20,height:20,color:"primary.main"}}),(0,S.jsx)(o.Z,{variant:"subtitle2",children:"Secure credit card payment"})]}),(0,S.jsx)(o.Z,{variant:"caption",sx:{color:"text.secondary",textAlign:"center"},children:"This is a secure 128-bit SSL encrypted payment"})]})]})}function F(){return(0,S.jsxs)("div",{children:[(0,S.jsx)(o.Z,{variant:"subtitle1",children:"Billing Address"}),(0,S.jsxs)(x.Z,{spacing:3,mt:5,children:[(0,S.jsx)(b.Z,{fullWidth:!0,label:"Person name"}),(0,S.jsx)(b.Z,{fullWidth:!0,label:"Phone number"}),(0,S.jsx)(b.Z,{fullWidth:!0,label:"Email"}),(0,S.jsx)(b.Z,{fullWidth:!0,label:"Address"})]})]})}var O=(0,a.ZP)("div")((function(e){var t=e.theme;return{minHeight:"100%",paddingTop:t.spacing(15),paddingBottom:t.spacing(10)}}));function H(){var e=(0,s.Z)("up","md");return(0,S.jsx)(l.Z,{title:"Payment",children:(0,S.jsx)(O,{children:(0,S.jsxs)(r.Z,{children:[(0,S.jsxs)(i.Z,{sx:{mb:5},children:[(0,S.jsx)(o.Z,{variant:"h3",align:"center",paragraph:!0,children:"Let's finish powering you up!"}),(0,S.jsx)(o.Z,{align:"center",sx:{color:"text.secondary"},children:"Professional plan is right for you."})]}),(0,S.jsxs)(c.ZP,{container:!0,spacing:e?3:5,children:[(0,S.jsx)(c.ZP,{item:!0,xs:12,md:8,children:(0,S.jsxs)(i.Z,{sx:{display:"grid",gap:5,p:{md:5},borderRadius:2,border:function(e){return{md:"dashed 1px ".concat(e.palette.divider)}},gridTemplateColumns:{xs:"repeat(1, 1fr)",md:"repeat(2, 1fr)"}},children:[(0,S.jsx)(F,{}),(0,S.jsx)(M,{})]})}),(0,S.jsx)(c.ZP,{item:!0,xs:12,md:4,children:(0,S.jsx)(N,{})})]})]})})})}},89891:function(e,t,n){var a=n(4942),r=n(63366),i=n(87462),o=n(72791),c=n(28182),s=n(94419),l=n(12065),d=n(14036),h=n(97278),u=n(31402),p=n(66934),m=n(93785),x=n(80184),Z=["className","color","edge","size","sx"],v=(0,p.ZP)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.edge&&t["edge".concat((0,d.Z)(n.edge))],t["size".concat((0,d.Z)(n.size))]]}})((function(e){var t,n=e.ownerState;return(0,i.Z)({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},"start"===n.edge&&{marginLeft:-8},"end"===n.edge&&{marginRight:-8},"small"===n.size&&(t={width:40,height:24,padding:7},(0,a.Z)(t,"& .".concat(m.Z.thumb),{width:16,height:16}),(0,a.Z)(t,"& .".concat(m.Z.switchBase),(0,a.Z)({padding:4},"&.".concat(m.Z.checked),{transform:"translateX(16px)"})),t))})),g=(0,p.ZP)(h.Z,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:function(e,t){var n=e.ownerState;return[t.switchBase,(0,a.Z)({},"& .".concat(m.Z.input),t.input),"default"!==n.color&&t["color".concat((0,d.Z)(n.color))]]}})((function(e){var t,n=e.theme;return t={position:"absolute",top:0,left:0,zIndex:1,color:n.vars?n.vars.palette.Switch.defaultColor:"".concat("light"===n.palette.mode?n.palette.common.white:n.palette.grey[300]),transition:n.transitions.create(["left","transform"],{duration:n.transitions.duration.shortest})},(0,a.Z)(t,"&.".concat(m.Z.checked),{transform:"translateX(20px)"}),(0,a.Z)(t,"&.".concat(m.Z.disabled),{color:n.vars?n.vars.palette.Switch.defaultDisabledColor:"".concat("light"===n.palette.mode?n.palette.grey[100]:n.palette.grey[600])}),(0,a.Z)(t,"&.".concat(m.Z.checked," + .").concat(m.Z.track),{opacity:.5}),(0,a.Z)(t,"&.".concat(m.Z.disabled," + .").concat(m.Z.track),{opacity:n.vars?n.vars.opacity.switchTrackDisabled:"".concat("light"===n.palette.mode?.12:.2)}),(0,a.Z)(t,"& .".concat(m.Z.input),{left:"-100%",width:"300%"}),t}),(function(e){var t,n=e.theme,r=e.ownerState;return(0,i.Z)({"&:hover":{backgroundColor:n.vars?"rgba(".concat(n.vars.palette.action.activeChannel," / ").concat(n.vars.palette.action.hoverOpacity,")"):(0,l.Fq)(n.palette.action.active,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==r.color&&(t={},(0,a.Z)(t,"&.".concat(m.Z.checked),(0,a.Z)({color:(n.vars||n).palette[r.color].main,"&:hover":{backgroundColor:n.vars?"rgba(".concat(n.vars.palette[r.color].mainChannel," / ").concat(n.vars.palette.action.hoverOpacity,")"):(0,l.Fq)(n.palette[r.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&.".concat(m.Z.disabled),{color:n.vars?n.vars.palette.Switch["".concat(r.color,"DisabledColor")]:"".concat("light"===n.palette.mode?(0,l.$n)(n.palette[r.color].main,.62):(0,l._j)(n.palette[r.color].main,.55))})),(0,a.Z)(t,"&.".concat(m.Z.checked," + .").concat(m.Z.track),{backgroundColor:(n.vars||n).palette[r.color].main}),t))})),b=(0,p.ZP)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:function(e,t){return t.track}})((function(e){var t=e.theme;return{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:t.transitions.create(["opacity","background-color"],{duration:t.transitions.duration.shortest}),backgroundColor:t.vars?t.vars.palette.common.onBackground:"".concat("light"===t.palette.mode?t.palette.common.black:t.palette.common.white),opacity:t.vars?t.vars.opacity.switchTrack:"".concat("light"===t.palette.mode?.38:.3)}})),f=(0,p.ZP)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:function(e,t){return t.thumb}})((function(e){var t=e.theme;return{boxShadow:(t.vars||t).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}})),j=o.forwardRef((function(e,t){var n=(0,u.Z)({props:e,name:"MuiSwitch"}),a=n.className,o=n.color,l=void 0===o?"primary":o,h=n.edge,p=void 0!==h&&h,j=n.size,y=void 0===j?"medium":j,w=n.sx,k=(0,r.Z)(n,Z),C=(0,i.Z)({},n,{color:l,edge:p,size:y}),S=function(e){var t=e.classes,n=e.edge,a=e.size,r=e.color,o=e.checked,c=e.disabled,l={root:["root",n&&"edge".concat((0,d.Z)(n)),"size".concat((0,d.Z)(a))],switchBase:["switchBase","color".concat((0,d.Z)(r)),o&&"checked",c&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},h=(0,s.Z)(l,m.H,t);return(0,i.Z)({},t,h)}(C),P=(0,x.jsx)(f,{className:S.thumb,ownerState:C});return(0,x.jsxs)(v,{className:(0,c.Z)(S.root,a),sx:w,ownerState:C,children:[(0,x.jsx)(g,(0,i.Z)({type:"checkbox",icon:P,checkedIcon:P,ref:t,ownerState:C},k,{classes:(0,i.Z)({},S,{root:S.switchBase})})),(0,x.jsx)(b,{className:S.track,ownerState:C})]})}));t.Z=j},93785:function(e,t,n){n.d(t,{H:function(){return r}});var a=n(21217);function r(e){return(0,a.Z)("MuiSwitch",e)}var i=(0,n(75878).Z)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]);t.Z=i}}]);
//# sourceMappingURL=5014.145d89bf.chunk.js.map