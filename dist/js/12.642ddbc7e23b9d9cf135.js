(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{606:function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"my-index"},[e("div",{staticClass:"logo-header"},[t._v("\n  \t\t我的钱包\n\t\t"),e("div",{staticClass:"right-icon"},[e("zoo-icon",{attrs:{iconType:"mine-set",size:"18px"},nativeOn:{click:function(i){return t.gotoPage("./config")}}})],1)]),t._v(" "),e("zoo-common-card",{staticStyle:{margin:"-5px 0 30px 0 !important"}},[e("div",{staticClass:"my-info-header"},[e("div",{staticClass:"header-text"},[e("zoo-icon",{staticStyle:{"margin-right":"10px"},attrs:{iconType:"mine-headimg",size:"36px"}}),t._v("\n\t\t\t\tID/手机："+t._s(t.user.phone)+"\n\t\t\t")],1),t._v(" "),e("div",{staticClass:"header-text"},[t._v(t._s(1!=t.user.isverification?"已实名验证":2==t.user.isverification?"实名审核中":"未实名验证"))])])]),t._v(" "),e("div",{staticClass:"my-line"},[e("zoo-card-line",{staticClass:"half-line",nativeOn:{click:function(i){return t.gotoPage("./zoo")}}},[t._v("\n\t\t\tzoo币："+t._s(t.user.zooconin)+"\n\t\t")]),t._v(" "),e("zoo-card-line",{staticClass:"half-line",nativeOn:{click:function(i){return t.gotoPage("./point")}}},[t._v("\n\t\t\t积分："+t._s(t.user.integral)+"\n\t\t")]),t._v(" "),e("zoo-card-line",{staticClass:"half-line",nativeOn:{click:function(i){return t.gotoPage("./profit")}}},[t._v("\n\t\t\t推荐收益："+t._s(t.user.profitrecommand)+"\n\t\t")]),t._v(" "),e("zoo-card-line",{staticClass:"half-line",nativeOn:{click:function(i){return t.gotoPage("./profitAll")}}},[t._v("\n\t\t\t累计收益："+t._s(t.user.profitsum)+"\n\t\t")]),t._v(" "),e("zoo-card-line",{staticClass:"half-line"},[t._v("\n\t\t\t总资产："+t._s(t.user.property)+"\n\t\t")]),t._v(" "),e("zoo-card-line",{staticClass:"half-line"},[t._v("\n\t\t\t等级："+t._s(t.user.level)+"\n\t\t")])],1),t._v(" "),e("zoo-common-card",{staticStyle:{margin:"10px 0 !important"}},[e("div",{staticClass:"my-info-header"},[e("div",{staticClass:"flex-item",on:{click:function(i){return t.gotoPage("./lyList")}}},[e("zoo-icon",{class:t.user.tagappoint?"red-dot":"",attrs:{iconType:"animal-log",size:"36px"}}),t._v(" "),e("div",{staticClass:"flex-item-text"},[t._v("领养记录")])],1),t._v(" "),e("div",{staticClass:"flex-item",on:{click:function(i){return t.gotoPage("./zrList")}}},[e("zoo-icon",{class:t.user.tagtransfer?"red-dot":"",attrs:{iconType:"animal-interactive",size:"36px"}}),t._v(" "),e("div",{staticClass:"flex-item-text"},[t._v("转让记录")])],1),t._v(" "),e("div",{staticClass:"flex-item",on:{click:function(i){return t.gotoPage("./yyList")}}},[e("zoo-icon",{attrs:{iconType:"animal-signin",size:"36px"}}),t._v(" "),e("div",{staticClass:"flex-item-text"},[t._v("预约记录")])],1)])]),t._v(" "),e("zoo-common-card",{staticStyle:{margin:"10px 0 -10px 0 !important"}},[e("div",{staticClass:"my-info-header"},[e("div",{staticClass:"flex-item",on:{click:function(i){return t.gotoPage("./safe")}}},[e("zoo-icon",{attrs:{iconType:"security",size:"36px"}}),t._v(" "),e("div",{staticClass:"flex-item-text"},[t._v("安全中心")])],1),t._v(" "),e("div",{staticClass:"flex-item",on:{click:t.verification}},[e("zoo-icon",{attrs:{iconType:"verification",size:"36px"}}),t._v(" "),e("div",{staticClass:"flex-item-text"},[t._v("实名认证")])],1),t._v(" "),e("div",{staticClass:"flex-item",on:{click:function(i){return t.gotoPage("./card")}}},[e("zoo-icon",{attrs:{iconType:"card-bag",size:"36px"}}),t._v(" "),e("div",{staticClass:"flex-item-text"},[t._v("我的银行卡")])],1),t._v(" "),e("div",{staticClass:"flex-item",on:{click:function(i){return t.gotoPage("./group")}}},[e("zoo-icon",{attrs:{iconType:"my-group",size:"36px"}}),t._v(" "),e("div",{staticClass:"flex-item-text"},[t._v("我的团队")])],1),t._v(" "),e("div",{staticClass:"flex-item",on:{click:function(i){return t.gotoPage("./invite")}}},[e("zoo-icon",{attrs:{iconType:"share",size:"36px"}}),t._v(" "),e("div",{staticClass:"flex-item-text"},[t._v("邀请好友")])],1),t._v(" "),e("div",{staticClass:"flex-item",on:{click:function(i){return t.gotoPage("./msg")}}},[e("zoo-icon",{attrs:{iconType:"my-notice",size:"36px"}}),t._v(" "),e("div",{staticClass:"flex-item-text"},[t._v("系统消息")])],1)])])],1)};n._withStripped=!0;var s=e(174),o={name:"myIndex",data:function(){return{user:{}}},methods:{verification:function(){1==this.user.isverification?this.gotoPage("./verification"):2==this.user.isverification?this.$message.info("您的实名信息正在审核中，请耐心等待。"):this.$message.info("您已通过实名认证，不需要再次认证。")},getPersonInfo:function(){var t=this;Object(s.n)().then(function(i){t.user=i.data})},gotoPage:function(t){this.$router.push(t)}},mounted:function(){this.$util.doStopReturn(),this.getPersonInfo()},destroyed:function(){this.$util.removeStopReturn()}},a=(e(683),e(684),e(12)),c=Object(a.a)(o,n,[],!1,null,"7a3d5949",null);c.options.__file="src/views/my/index.vue";i.default=c.exports},630:function(t,i,e){},631:function(t,i,e){},683:function(t,i,e){"use strict";var n=e(630);e.n(n).a},684:function(t,i,e){"use strict";var n=e(631);e.n(n).a}}]);