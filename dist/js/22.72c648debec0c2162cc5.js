(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{589:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"back-content",on:{click:function(e){return t.$router.go(-1)}}},[i("div",{staticClass:"center-area"},[i("div",{staticStyle:{color:"white","font-size":"16px"}},[t._v(t._s(this.$store.state.userName))]),t._v(" "),i("img",{staticClass:"qrcode",attrs:{src:t.qrcodeImg}})])])};n._withStripped=!0;var s=i(705),r=i.n(s),c={name:"invite",data:function(){return{qrcodeImg:""}},methods:{getQrcode:function(){var t=window.location.href.split("#")[0]+"#/regist?invited="+this.$store.state.userName,e=this;r.a.toDataURL(t,{margin:2,scale:2.5}).then(function(t){e.qrcodeImg=t})}},mounted:function(){this.getQrcode()}},o=(i(726),i(12)),a=Object(o.a)(c,n,[],!1,null,"2a224bbc",null);a.options.__file="src/views/my/invite.vue";e.default=a.exports},656:function(t,e,i){},726:function(t,e,i){"use strict";var n=i(656);i.n(n).a}}]);