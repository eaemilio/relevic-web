"use strict";(self.webpackChunk_ijm_relevic=self.webpackChunk_ijm_relevic||[]).push([[4380],{89891:function(e,t,o){var a=o(4942),r=o(63366),n=o(87462),c=o(72791),i=o(28182),s=o(94419),l=o(12065),d=o(14036),u=o(97278),h=o(31402),Z=o(66934),p=o(93785),v=o(80184),m=["className","color","edge","size","sx"],f=(0,Z.ZP)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState;return[t.root,o.edge&&t["edge".concat((0,d.Z)(o.edge))],t["size".concat((0,d.Z)(o.size))]]}})((function(e){var t,o=e.ownerState;return(0,n.Z)({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},"start"===o.edge&&{marginLeft:-8},"end"===o.edge&&{marginRight:-8},"small"===o.size&&(t={width:40,height:24,padding:7},(0,a.Z)(t,"& .".concat(p.Z.thumb),{width:16,height:16}),(0,a.Z)(t,"& .".concat(p.Z.switchBase),(0,a.Z)({padding:4},"&.".concat(p.Z.checked),{transform:"translateX(16px)"})),t))})),g=(0,Z.ZP)(u.Z,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:function(e,t){var o=e.ownerState;return[t.switchBase,(0,a.Z)({},"& .".concat(p.Z.input),t.input),"default"!==o.color&&t["color".concat((0,d.Z)(o.color))]]}})((function(e){var t,o=e.theme;return t={position:"absolute",top:0,left:0,zIndex:1,color:o.vars?o.vars.palette.Switch.defaultColor:"".concat("light"===o.palette.mode?o.palette.common.white:o.palette.grey[300]),transition:o.transitions.create(["left","transform"],{duration:o.transitions.duration.shortest})},(0,a.Z)(t,"&.".concat(p.Z.checked),{transform:"translateX(20px)"}),(0,a.Z)(t,"&.".concat(p.Z.disabled),{color:o.vars?o.vars.palette.Switch.defaultDisabledColor:"".concat("light"===o.palette.mode?o.palette.grey[100]:o.palette.grey[600])}),(0,a.Z)(t,"&.".concat(p.Z.checked," + .").concat(p.Z.track),{opacity:.5}),(0,a.Z)(t,"&.".concat(p.Z.disabled," + .").concat(p.Z.track),{opacity:o.vars?o.vars.opacity.switchTrackDisabled:"".concat("light"===o.palette.mode?.12:.2)}),(0,a.Z)(t,"& .".concat(p.Z.input),{left:"-100%",width:"300%"}),t}),(function(e){var t,o=e.theme,r=e.ownerState;return(0,n.Z)({"&:hover":{backgroundColor:o.vars?"rgba(".concat(o.vars.palette.action.activeChannel," / ").concat(o.vars.palette.action.hoverOpacity,")"):(0,l.Fq)(o.palette.action.active,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==r.color&&(t={},(0,a.Z)(t,"&.".concat(p.Z.checked),(0,a.Z)({color:(o.vars||o).palette[r.color].main,"&:hover":{backgroundColor:o.vars?"rgba(".concat(o.vars.palette[r.color].mainChannel," / ").concat(o.vars.palette.action.hoverOpacity,")"):(0,l.Fq)(o.palette[r.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&.".concat(p.Z.disabled),{color:o.vars?o.vars.palette.Switch["".concat(r.color,"DisabledColor")]:"".concat("light"===o.palette.mode?(0,l.$n)(o.palette[r.color].main,.62):(0,l._j)(o.palette[r.color].main,.55))})),(0,a.Z)(t,"&.".concat(p.Z.checked," + .").concat(p.Z.track),{backgroundColor:(o.vars||o).palette[r.color].main}),t))})),w=(0,Z.ZP)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:function(e,t){return t.track}})((function(e){var t=e.theme;return{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:t.transitions.create(["opacity","background-color"],{duration:t.transitions.duration.shortest}),backgroundColor:t.vars?t.vars.palette.common.onBackground:"".concat("light"===t.palette.mode?t.palette.common.black:t.palette.common.white),opacity:t.vars?t.vars.opacity.switchTrack:"".concat("light"===t.palette.mode?.38:.3)}})),k=(0,Z.ZP)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:function(e,t){return t.thumb}})((function(e){var t=e.theme;return{boxShadow:(t.vars||t).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}})),b=c.forwardRef((function(e,t){var o=(0,h.Z)({props:e,name:"MuiSwitch"}),a=o.className,c=o.color,l=void 0===c?"primary":c,u=o.edge,Z=void 0!==u&&u,b=o.size,y=void 0===b?"medium":b,S=o.sx,x=(0,r.Z)(o,m),z=(0,n.Z)({},o,{color:l,edge:Z,size:y}),C=function(e){var t=e.classes,o=e.edge,a=e.size,r=e.color,c=e.checked,i=e.disabled,l={root:["root",o&&"edge".concat((0,d.Z)(o)),"size".concat((0,d.Z)(a))],switchBase:["switchBase","color".concat((0,d.Z)(r)),c&&"checked",i&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},u=(0,s.Z)(l,p.H,t);return(0,n.Z)({},t,u)}(z),R=(0,v.jsx)(k,{className:C.thumb,ownerState:z});return(0,v.jsxs)(f,{className:(0,i.Z)(C.root,a),sx:S,ownerState:z,children:[(0,v.jsx)(g,(0,n.Z)({type:"checkbox",icon:R,checkedIcon:R,ref:t,ownerState:z},x,{classes:(0,n.Z)({},C,{root:C.switchBase})})),(0,v.jsx)(w,{className:C.track,ownerState:z})]})}));t.Z=b},93785:function(e,t,o){o.d(t,{H:function(){return r}});var a=o(21217);function r(e){return(0,a.Z)("MuiSwitch",e)}var n=(0,o(75878).Z)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]);t.Z=n},60958:function(e,t,o){o.d(t,{Z:function(){return s}});var a=o(39040),r=o(1104),n=o(38527),c=o(4522),i=o(29297);function s(e,t){if((0,c.Z)(2,arguments),!t||"object"!==typeof t)return new Date(NaN);var o=t.years?(0,i.Z)(t.years):0,s=t.months?(0,i.Z)(t.months):0,l=t.weeks?(0,i.Z)(t.weeks):0,d=t.days?(0,i.Z)(t.days):0,u=t.hours?(0,i.Z)(t.hours):0,h=t.minutes?(0,i.Z)(t.minutes):0,Z=t.seconds?(0,i.Z)(t.seconds):0,p=(0,n.Z)(e),v=s||o?(0,r.Z)(p,s+12*o):p,m=d||l?(0,a.Z)(v,d+7*l):v,f=h+60*u,g=Z+60*f,w=1e3*g,k=new Date(m.getTime()+w);return k}},53546:function(e,t,o){o.d(t,{Z:function(){return l}});var a=o(29297),r=o(39040),n=o(4522);function c(e,t){(0,n.Z)(2,arguments);var o=(0,a.Z)(t);return(0,r.Z)(e,-o)}var i=o(1104);function s(e,t){(0,n.Z)(2,arguments);var o=(0,a.Z)(t);return(0,i.Z)(e,-o)}function l(e,t){if((0,n.Z)(2,arguments),!t||"object"!==typeof t)return new Date(NaN);var o=t.years?(0,a.Z)(t.years):0,r=t.months?(0,a.Z)(t.months):0,i=t.weeks?(0,a.Z)(t.weeks):0,l=t.days?(0,a.Z)(t.days):0,d=t.hours?(0,a.Z)(t.hours):0,u=t.minutes?(0,a.Z)(t.minutes):0,h=t.seconds?(0,a.Z)(t.seconds):0,Z=s(e,r+12*o),p=c(Z,l+7*i),v=u+60*d,m=h+60*v,f=1e3*m,g=new Date(p.getTime()-f);return g}},17254:function(e,t,o){o.d(t,{B:function(){return c}});function a(e){return e.toLowerCase()}var r=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],n=/[^A-Z0-9]+/gi;function c(e,t){void 0===t&&(t={});for(var o=t.splitRegexp,c=void 0===o?r:o,s=t.stripRegexp,l=void 0===s?n:s,d=t.transform,u=void 0===d?a:d,h=t.delimiter,Z=void 0===h?" ":h,p=i(i(e,c,"$1\0$2"),l,"\0"),v=0,m=p.length;"\0"===p.charAt(v);)v++;for(;"\0"===p.charAt(m-1);)m--;return p.slice(v,m).split("\0").map(u).join(Z)}function i(e,t,o){return t instanceof RegExp?e.replace(t,o):t.reduce((function(e,t){return e.replace(t,o)}),e)}}}]);
//# sourceMappingURL=4380.2f34b7c2.chunk.js.map