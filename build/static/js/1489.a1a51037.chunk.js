"use strict";(self.webpackChunk_ijm_relevic=self.webpackChunk_ijm_relevic||[]).push([[1489],{41444:function(n,e,i){var r=i(4942),t=i(1413),o=i(66934),a=i(48550),s=(0,o.ZP)(a.Z,{shouldForwardProp:function(n){return"stretchStart"!==n}})((function(n){var e=n.stretchStart,i=n.theme;return{"& .MuiOutlinedInput-root":(0,t.Z)({transition:i.transitions.create(["box-shadow","width"],{easing:i.transitions.easing.easeInOut,duration:i.transitions.duration.shorter}),"&.Mui-focused":{boxShadow:i.customShadows.z12}},e&&{width:e,"&.Mui-focused":(0,r.Z)({boxShadow:i.customShadows.z12},i.breakpoints.up("sm"),{width:e+60})}),"& fieldset":{borderWidth:"1px !important",borderColor:"".concat(i.palette.grey[50032]," !important")}}}));e.Z=s},604:function(n,e,i){i.d(e,{Z:function(){return f}});var r=i(1413),t=i(45987),o=i(12065),a=i(67414),s=i(50533),l=i(20068),c=i(13400),d=i(36151),h=i(46865),u=i(80184),x=["initialColor","simple","links","sx"];function f(n){var e=n.initialColor,i=void 0!==e&&e,f=n.simple,Z=void 0===f||f,v=n.links,m=void 0===v?{}:v,p=n.sx,j=(0,t.Z)(n,x),g=[{name:"FaceBook",icon:"eva:facebook-fill",socialColor:"#1877F2",path:m.facebook||"#facebook-link"},{name:"Instagram",icon:"ant-design:instagram-filled",socialColor:"#E02D69",path:m.instagram||"#instagram-link"},{name:"Linkedin",icon:"eva:linkedin-fill",socialColor:"#007EBB",path:m.linkedin||"#linkedin-link"},{name:"Twitter",icon:"eva:twitter-fill",socialColor:"#00AAEC",path:m.twitter||"#twitter-link"}];return(0,u.jsx)(a.Z,{direction:"row",flexWrap:"wrap",alignItems:"center",children:g.map((function(n){var e=n.name,t=n.icon,a=n.path,x=n.socialColor;return Z?(0,u.jsx)(s.Z,{href:a,children:(0,u.jsx)(l.Z,{title:e,placement:"top",children:(0,u.jsx)(c.Z,(0,r.Z)((0,r.Z)({color:"inherit",sx:(0,r.Z)((0,r.Z)({},i&&{color:x,"&:hover":{bgcolor:(0,o.Fq)(x,.08)}}),p)},j),{},{children:(0,u.jsx)(h.Z,{icon:t,sx:{width:20,height:20}})}))})},e):(0,u.jsx)(d.Z,(0,r.Z)((0,r.Z)({href:a,color:"inherit",variant:"outlined",size:"small",startIcon:(0,u.jsx)(h.Z,{icon:t}),sx:(0,r.Z)((0,r.Z)({m:.5,flexShrink:0},i&&{color:x,borderColor:x,"&:hover":{borderColor:x,bgcolor:(0,o.Fq)(x,.08)}}),p)},j),{},{children:e}),e)}))})}},51489:function(n,e,i){i.r(e),i.d(e,{default:function(){return g}});var r=i(4942),t=i(66934),o=i(20890),a=i(10266),s=i(63466),l=i(36151),c=i(67414),d=i(29439),h=i(72791);var u=i(53451),x=i(41444),f=i(604),Z=i(70705),v=i(80184),m=(0,t.ZP)("div")((function(n){return{maxWidth:480,margin:"auto",minHeight:"100vh",display:"flex",justifyContent:"center",flexDirection:"column",padding:n.theme.spacing(12,0)}})),p=(0,t.ZP)("div")({display:"flex",justifyContent:"center"}),j=(0,t.ZP)(o.Z)((function(n){var e=n.theme;return(0,r.Z)({margin:e.spacing(0,1)},e.breakpoints.up("sm"),{margin:e.spacing(0,2.5)})}));function g(){var n=function(n){var e=(0,h.useState)({days:"00",hours:"00",minutes:"00",seconds:"00"}),i=(0,d.Z)(e,2),r=i[0],t=i[1];(0,h.useEffect)((function(){var n=setInterval((function(){return o()}),1e3);return function(){return clearInterval(n)}}),[]);var o=function(){var e=n,i=new Date,r=e.valueOf()-i.valueOf(),o=Math.floor(r/864e5),a="0".concat(Math.floor(r%864e5/36e5)).slice(-2),s="0".concat(Math.floor(r%36e5/6e4)).slice(-2),l="0".concat(Math.floor(r%6e4/1e3)).slice(-2);t({days:o.toString()||"000",hours:a||"000",minutes:s||"000",seconds:l||"000"})};return r}(new Date("07/07/2024 21:30"));return(0,v.jsx)(u.Z,{title:"Coming Soon",children:(0,v.jsx)(a.Z,{children:(0,v.jsxs)(m,{sx:{textAlign:"center"},children:[(0,v.jsx)(o.Z,{variant:"h3",paragraph:!0,children:"Coming Soon!"}),(0,v.jsx)(o.Z,{sx:{color:"text.secondary"},children:"We are currently working hard on this page!"}),(0,v.jsx)(Z.dD,{sx:{my:10,height:240}}),(0,v.jsxs)(p,{children:[(0,v.jsxs)("div",{children:[(0,v.jsx)(o.Z,{variant:"h2",children:n.days}),(0,v.jsx)(o.Z,{sx:{color:"text.secondary"},children:"Days"})]}),(0,v.jsx)(j,{variant:"h2",children:":"}),(0,v.jsxs)("div",{children:[(0,v.jsx)(o.Z,{variant:"h2",children:n.hours}),(0,v.jsx)(o.Z,{sx:{color:"text.secondary"},children:"Hours"})]}),(0,v.jsx)(j,{variant:"h2",children:":"}),(0,v.jsxs)("div",{children:[(0,v.jsx)(o.Z,{variant:"h2",children:n.minutes}),(0,v.jsx)(o.Z,{sx:{color:"text.secondary"},children:"Minutes"})]}),(0,v.jsx)(j,{variant:"h2",children:":"}),(0,v.jsxs)("div",{children:[(0,v.jsx)(o.Z,{variant:"h2",children:n.seconds}),(0,v.jsx)(o.Z,{sx:{color:"text.secondary"},children:"Seconds"})]})]}),(0,v.jsx)(x.Z,{fullWidth:!0,placeholder:"Enter your email",InputProps:{endAdornment:(0,v.jsx)(s.Z,{position:"end",children:(0,v.jsx)(l.Z,{variant:"contained",size:"large",children:"Notify Me"})})},sx:{my:5,"& .MuiOutlinedInput-root":{pr:.5}}}),(0,v.jsx)(c.Z,{alignItems:"center",children:(0,v.jsx)(f.Z,{size:"large",initialColor:!0})})]})})})}}}]);
//# sourceMappingURL=1489.a1a51037.chunk.js.map